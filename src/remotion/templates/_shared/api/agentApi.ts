/**
 * Agent API - Programmatic interface for the video_generation_crew to list,
 * filter, and select valid composition combinations.
 *
 * Wraps a CompositionRegistry instance and provides:
 *   - listCombinations(filter?) - filtered combination listing
 *   - getCombinationProps(id) - full render props or AgentError
 *   - getCounts(filter?) - total + filtered counts
 *   - getRandomCombination(filter?) - random valid combination
 *   - getSimilar(unknownId) - string-similarity suggestions for unknown IDs
 *
 * Pure TypeScript - no React dependencies, no side effects.
 */

import type { Theme } from "../themes";
import type { GridConfig } from "../grid/GridSystem";
import {
  CompositionRegistry,
  type Combination,
  type CombinationFilter,
} from "../registry/CompositionRegistry";

// ── Interfaces ──────────────────────────────────────────────────

export interface CombinationProps {
  templateComponent: string;
  shellConfig: Record<string, unknown>;
  theme: Theme;
  gridConfig?: Partial<GridConfig>;
  durationInFrames: number;
  fps: 30;
  width: 1280;
  height: 720;
}

export interface AgentError {
  error: true;
  message: string;
  suggestions?: string[];
}

// ── String Similarity (Levenshtein) ─────────────────────────────

/**
 * Compute the Levenshtein edit distance between two strings.
 * Used to suggest similar valid IDs when an unknown ID is provided.
 */
function levenshtein(a: string, b: string): number {
  const la = a.length;
  const lb = b.length;

  // Fast paths
  if (la === 0) return lb;
  if (lb === 0) return la;

  // Use single-row DP for memory efficiency
  const prev = new Array<number>(lb + 1);
  for (let j = 0; j <= lb; j++) prev[j] = j;

  for (let i = 1; i <= la; i++) {
    let prevDiag = prev[0];
    prev[0] = i;
    for (let j = 1; j <= lb; j++) {
      const temp = prev[j];
      if (a[i - 1] === b[j - 1]) {
        prev[j] = prevDiag;
      } else {
        prev[j] = 1 + Math.min(prevDiag, prev[j - 1], prev[j]);
      }
      prevDiag = temp;
    }
  }

  return prev[lb];
}

// ── Agent API Class ─────────────────────────────────────────────

export class AgentAPI {
  private registry: CompositionRegistry;

  constructor(registry: CompositionRegistry) {
    this.registry = registry;
  }

  /**
   * List all valid combinations with optional filters.
   * Delegates to registry.queryCombinations.
   */
  listCombinations(filter?: Partial<CombinationFilter>): Combination[] {
    if (!filter) return [...this.registry.combinations];
    return this.registry.queryCombinations(filter);
  }

  /**
   * Get complete props for rendering a combination by its ID.
   * Returns CombinationProps on success, AgentError on failure.
   */
  getCombinationProps(id: string): CombinationProps | AgentError {
    // Empty registry guard
    if (this.registry.combinations.length === 0) {
      return {
        error: true,
        message: "Registry is empty - no combinations available",
        suggestions: [],
      };
    }

    const combo = this.registry.getCombination(id);
    if (!combo) {
      const suggestions = this.getSimilar(id).map((c) => c.id);
      return {
        error: true,
        message: `Unknown combination: ${id}`,
        suggestions: suggestions.length > 0 ? suggestions : this.getFallbackSuggestions(),
      };
    }

    const theme = this.registry.themes[combo.theme];
    if (!theme) {
      return {
        error: true,
        message: `Unknown combination: ${id}`,
        suggestions: this.getFallbackSuggestions(),
      };
    }

    // Build shell config from registry metadata
    const shellMeta = this.registry.shells.get(combo.shell);
    const shellConfig: Record<string, unknown> = shellMeta
      ? {
          name: shellMeta.name,
          maxChildren: shellMeta.maxChildren,
          compatibleAtomCategories: shellMeta.compatibleAtomCategories,
          compatibleMoleculeCategories: shellMeta.compatibleMoleculeCategories,
        }
      : { name: combo.shell };

    return {
      templateComponent: combo.template,
      shellConfig,
      theme,
      durationInFrames: 270, // default scene duration (9s at 30fps)
      fps: 30,
      width: 1280,
      height: 720,
    };
  }

  /**
   * Get total and filtered combination counts.
   */
  getCounts(filter?: Partial<CombinationFilter>): { total: number; filtered: number } {
    const total = this.registry.combinations.length;
    const filtered = filter
      ? this.registry.queryCombinations(filter).length
      : total;
    return { total, filtered };
  }

  /**
   * Get a random valid combination matching optional filter criteria.
   * Delegates to registry.getRandomCombination.
   */
  getRandomCombination(filter?: Partial<CombinationFilter>): Combination {
    return this.registry.getRandomCombination(filter);
  }

  /**
   * Suggest similar valid combination IDs using Levenshtein distance.
   * Returns up to 5 closest matches, sorted by similarity.
   */
  getSimilar(unknownId: string): Combination[] {
    const allCombos = this.registry.combinations;
    if (allCombos.length === 0) return [];

    const scored = allCombos.map((combo) => ({
      combo,
      distance: levenshtein(unknownId.toLowerCase(), combo.id.toLowerCase()),
    }));

    // Sort by distance ascending, take top 5
    scored.sort((a, b) => a.distance - b.distance);

    // Only include suggestions within a reasonable distance
    // (at most 60% of the longer string's length)
    const maxDistance = Math.max(unknownId.length, 10) * 0.6;
    const filtered = scored.filter((s) => s.distance <= maxDistance);

    return filtered.slice(0, 5).map((s) => s.combo);
  }

  // ── Private Helpers ─────────────────────────────────────────

  /**
   * Return a few fallback suggestion IDs when similarity search yields nothing.
   */
  private getFallbackSuggestions(): string[] {
    return this.registry.combinations.slice(0, 3).map((c) => c.id);
  }
}

/**
 * Atom Registry Core - Types & Registration
 *
 * Extracted from index.ts to break circular dependencies.
 * Atom files import from here instead of from index.ts.
 */

import type { Theme } from "../themes";

// ── Categories ──────────────────────────────────────────────────
export type AtomCategory =
  | "data-display"
  | "typography"
  | "decoration"
  | "media"
  | "interactive";

// ── Atom Metadata ───────────────────────────────────────────────
export interface AtomMeta {
  name: string;
  category: AtomCategory;
  compatibleShells: string[];
  requiredProps: string[];
  defaultProps: Record<string, unknown>;
}

// ── Atom Component Props ────────────────────────────────────────
export interface AtomProps {
  theme: Theme;
  frame: number;
  fps: number;
  delay?: number;
}

// ── Global Registry ─────────────────────────────────────────────
export const ATOM_REGISTRY: Map<string, AtomMeta> = new Map();

/**
 * Register an Atom in the global registry.
 */
export function registerAtom(meta: AtomMeta): AtomMeta {
  ATOM_REGISTRY.set(meta.name, meta);
  return meta;
}

/**
 * Unit Tests for Design System Explorer UI
 *
 * Since the Explorer components are React client components and the vitest
 * environment is Node (no jsdom), these tests verify non-UI aspects:
 *   - CSS custom property values match AgentCore Hub spec (Req 9.1)
 *   - Card styling constants match spec (Req 9.4)
 *   - Module exports exist and are importable
 *   - Pure utility function behaviour (hashToHue consistency)
 */

import { describe, it, expect } from "vitest";
import * as fs from "node:fs";
import * as path from "node:path";

// ── Helpers ─────────────────────────────────────────────────────

/** Read a source file relative to the workspace root. */
function readSource(relPath: string): string {
  const abs = path.resolve(__dirname, "../../../..", relPath);
  return fs.readFileSync(abs, "utf-8");
}

/**
 * Replicate the hashToHue function from PreviewGrid.tsx so we can
 * verify its determinism and distribution without needing React rendering.
 */
function hashToHue(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash) % 360;
}

// ── 1. CSS Custom Properties Match AgentCore Hub (Req 9.1) ─────

describe("Explorer CSS custom properties (Req 9.1)", () => {
  const pageSource = readSource("src/app/explorer/page.tsx");

  it("defines --color-bg as #1a1f27", () => {
    expect(pageSource).toContain("--color-bg: #1a1f27");
  });

  it("defines --color-bg-panel as #222831", () => {
    expect(pageSource).toContain("--color-bg-panel: #222831");
  });

  it("defines --color-bg-hover as #2a303a", () => {
    expect(pageSource).toContain("--color-bg-hover: #2a303a");
  });

  it("defines --color-accent as #27AE60", () => {
    expect(pageSource).toContain("--color-accent: #27AE60");
  });

  it("defines --color-text as #d4d8de", () => {
    expect(pageSource).toContain("--color-text: #d4d8de");
  });

  it("defines --color-text-muted as #8a919c", () => {
    expect(pageSource).toContain("--color-text-muted: #8a919c");
  });
});

// ── 2. Card Styling Constants Match Spec (Req 9.4) ─────────────

describe("Card styling constants", () => {
  const gridSource = readSource("src/app/explorer/components/PreviewGrid.tsx");
  const pageSource = readSource("src/app/explorer/page.tsx");

  it("card border is 1px solid rgba(255,255,255,0.06)", () => {
    expect(gridSource).toContain("1px solid rgba(255,255,255,0.06)");
  });

  it("card border-radius is 12px", () => {
    expect(gridSource).toContain("border-radius: 12px");
  });

  it("input border-radius is 8px", () => {
    // The search input in page.tsx uses 8px border-radius
    expect(pageSource).toContain("border-radius: 8px");
  });
});

// ── 3. FilterPanel Interface Completeness ───────────────────────

describe("FilterPanel module exports", () => {
  it("exports CombinationFilter interface (importable without error)", async () => {
    const mod = await import(
      "../../../app/explorer/components/FilterPanel"
    );
    // Default export is the component function
    expect(typeof mod.default).toBe("function");
  });

  it("FilterPanel source defines CombinationFilter with expected keys", () => {
    const src = readSource("src/app/explorer/components/FilterPanel.tsx");
    expect(src).toContain("templateCategory?: string");
    expect(src).toContain("shellType?: string");
    expect(src).toContain("themeName?: string");
    expect(src).toContain("stylePreset?: string");
  });
});

// ── 4. PreviewGrid hashToHue Function ───────────────────────────

describe("PreviewGrid hashToHue", () => {
  it("produces consistent results for the same input", () => {
    const hue1 = hashToHue("dark-ocean");
    const hue2 = hashToHue("dark-ocean");
    expect(hue1).toBe(hue2);
  });

  it("returns a value in [0, 360)", () => {
    const inputs = [
      "testimonial:HeroStatShell:dark-ocean",
      "pricing:CardGridShell:glassmorphism-sunset",
      "",
      "a",
      "A very long composition name that goes on and on",
    ];
    for (const input of inputs) {
      const hue = hashToHue(input);
      expect(hue).toBeGreaterThanOrEqual(0);
      expect(hue).toBeLessThan(360);
    }
  });

  it("different inputs generally produce different hues", () => {
    const hues = new Set<number>();
    const inputs = [
      "alpha",
      "beta",
      "gamma",
      "delta",
      "epsilon",
      "zeta",
      "eta",
      "theta",
      "iota",
      "kappa",
    ];
    for (const input of inputs) {
      hues.add(hashToHue(input));
    }
    // At least 5 distinct hues out of 10 inputs - reasonable distribution
    expect(hues.size).toBeGreaterThanOrEqual(5);
  });

  it("source file contains the hashToHue function", () => {
    const src = readSource("src/app/explorer/components/PreviewGrid.tsx");
    expect(src).toContain("function hashToHue(str: string): number");
  });
});

// ── 5. InspectorPanel Module Exports ────────────────────────────

describe("InspectorPanel module exports", () => {
  it("can be imported without errors", async () => {
    const mod = await import(
      "../../../app/explorer/components/InspectorPanel"
    );
    expect(typeof mod.default).toBe("function");
  });

  it("source defines InspectorPanelProps interface", () => {
    const src = readSource("src/app/explorer/components/InspectorPanel.tsx");
    expect(src).toContain("export interface InspectorPanelProps");
    expect(src).toContain("combination: Combination | null");
    expect(src).toContain("propsJson: string");
  });
});

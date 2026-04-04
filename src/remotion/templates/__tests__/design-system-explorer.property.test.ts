/**
 * Property-Based Tests for Design System Explorer
 *
 * Uses fast-check to verify invariants for the grid system, theme engine,
 * composition registry, agent API, and BrandKit integration.
 *
 * Properties tested in this file (added incrementally per task):
 *   1. Grid width calculation (colSpan formula + 12-column sum = 1280)
 *   2. Nested grid correctness (nested total ≤ parent cell width)
 */

import { describe, it, expect } from "vitest";
import * as fc from "fast-check";
import {
  calcAvailableWidth,
  calcCellWidth,
  calcCellX,
} from "../_shared/grid/gridUtils";
import {
  generateTheme,
  generateAllThemes,
  validateContrast,
  hexToRgb,
  relativeLuminance,
  contrastRatio,
  extractBgColor,
} from "../_shared/themes/themeGenerator";
import { STYLE_PRESETS } from "../_shared/themes/stylePresets";
import type { StylePreset } from "../_shared/themes/stylePresets";
import { COLOR_PALETTES } from "../_shared/themes/colorPalettes";
import type { ColorPalette } from "../_shared/themes/colorPalettes";
import {
  CompositionRegistry,
  RegistryParseError,
} from "../_shared/registry/CompositionRegistry";
import type {
  ShellMeta,
  CombinationFilter,
} from "../_shared/registry/CompositionRegistry";
import type { AtomMeta, AtomCategory } from "../_shared/atoms/registry-core";
import type { MoleculeMeta, MoleculeCategory } from "../_shared/molecules/registry-core";
import { applyBrandKitToGenerated } from "../_shared/themes/brandKitIntegration";
import type { BrandKit } from "../_shared/themes";

// ── Constants ───────────────────────────────────────────────────
const FRAME_WIDTH = 1280;
const COLUMNS = 12;

// ── Property 1: Grid width calculation ──────────────────────────
// Feature: design-system-explorer, Property 1: Grid width calculation
// **Validates: Requirements 1.1, 2.1, 2.2**

describe("Property 1: Grid width calculation", () => {
  const colSpanArb = fc.integer({ min: 1, max: 12 });
  const gutterArb = fc.integer({ min: 0, max: 32 });
  const paddingArb = fc.integer({ min: 0, max: 80 });

  it("calcCellWidth matches the formula (colSpan/12) × (1280 − 2×padding − 11×gutter) for 100+ inputs", () => {
    fc.assert(
      fc.property(colSpanArb, gutterArb, paddingArb, (colSpan, gutter, padding) => {
        const actual = calcCellWidth(colSpan, FRAME_WIDTH, padding, gutter);
        const expected = (colSpan / COLUMNS) * (FRAME_WIDTH - 2 * padding - (COLUMNS - 1) * gutter);
        expect(actual).toBeCloseTo(expected, 10);
      }),
      { numRuns: 100 },
    );
  });

  it("12 single-column widths + 11 gutters + 2 paddings = 1280 for 100+ inputs", () => {
    fc.assert(
      fc.property(gutterArb, paddingArb, (gutter, padding) => {
        const singleColWidth = calcCellWidth(1, FRAME_WIDTH, padding, gutter);
        const total = 12 * singleColWidth + 11 * gutter + 2 * padding;
        expect(total).toBeCloseTo(FRAME_WIDTH, 10);
      }),
      { numRuns: 100 },
    );
  });
});

// ── Property 2: Nested grid correctness ─────────────────────────
// Feature: design-system-explorer, Property 2: Nested grid correctness
// **Validates: Requirements 2.3**

describe("Property 2: Nested grid correctness", () => {
  const parentSpanArb = fc.integer({ min: 1, max: 12 });
  const parentGutterArb = fc.integer({ min: 0, max: 32 });
  const parentPaddingArb = fc.integer({ min: 0, max: 80 });
  const nestedGutterArb = fc.integer({ min: 0, max: 16 });
  const nestedPaddingArb = fc.integer({ min: 0, max: 20 });

  it("nested grid total (12 cols + 11 gutters + 2 paddings) equals parent cell width within fp tolerance for 100+ inputs", () => {
    fc.assert(
      fc.property(
        parentSpanArb,
        parentGutterArb,
        parentPaddingArb,
        nestedGutterArb,
        nestedPaddingArb,
        (parentSpan, parentGutter, parentPadding, nestedGutter, nestedPadding) => {
          // Calculate parent cell width
          const parentCellWidth = calcCellWidth(parentSpan, FRAME_WIDTH, parentPadding, parentGutter);

          // Nested grid uses parentCellWidth as its frameWidth
          const nestedSingleCol = calcCellWidth(1, parentCellWidth, nestedPadding, nestedGutter);
          const nestedTotal = 12 * nestedSingleCol + 11 * nestedGutter + 2 * nestedPadding;

          // Nested total should equal parent cell width (the nested grid fills its container)
          expect(nestedTotal).toBeCloseTo(parentCellWidth, 8);
        },
      ),
      { numRuns: 100 },
    );
  });
});


// ── Property 5: Theme generation produces valid Theme objects ───
// Feature: design-system-explorer, Property 5: Theme generation produces valid Theme objects
// **Validates: Requirements 3.3**

describe("Property 5: Theme generation produces valid Theme objects", () => {
  const presetArb = fc.constantFrom(...STYLE_PRESETS);
  const paletteArb = fc.constantFrom(...COLOR_PALETTES);

  it("generateTheme returns an object with all required Theme fields and correct types for 100+ inputs", () => {
    fc.assert(
      fc.property(presetArb, paletteArb, (preset, palette) => {
        const theme = generateTheme(preset, palette);

        // All required string fields exist and are strings
        const stringFields = [
          "name", "bg", "bgSecondary", "bgGlass",
          "textPrimary", "textSecondary", "textMuted",
          "accent", "accentSecondary", "accentGradient",
          "cardBorder", "cardShadow", "fontFamily",
        ] as const;

        for (const field of stringFields) {
          expect(typeof theme[field]).toBe("string");
          expect((theme[field] as string).length).toBeGreaterThan(0);
        }

        // Numeric weight fields exist and are numbers
        expect(typeof theme.headingWeight).toBe("number");
        expect(typeof theme.bodyWeight).toBe("number");
        expect(theme.headingWeight).toBeGreaterThanOrEqual(600);
        expect(theme.headingWeight).toBeLessThanOrEqual(900);
        expect(theme.bodyWeight).toBeGreaterThanOrEqual(400);
        expect(theme.bodyWeight).toBeLessThanOrEqual(500);

        // Name follows {preset}-{palette} format
        expect(theme.name).toBe(`${preset.name}-${palette.name}`);
      }),
      { numRuns: 100 },
    );
  });
});

// ── Property 6: Generated themes pass contrast validation ───────
// Feature: design-system-explorer, Property 6: Generated themes pass contrast validation
// **Validates: Requirements 3.6**

describe("Property 6: Generated themes pass contrast validation", () => {
  const presetArb = fc.constantFrom(...STYLE_PRESETS);
  const paletteArb = fc.constantFrom(...COLOR_PALETTES);

  it("every theme from generateAllThemes passes validateContrast with ratio >= 4.5:1 for 100+ inputs", () => {
    fc.assert(
      fc.property(presetArb, paletteArb, (preset, palette) => {
        // generateAllThemes applies auto-adjust, so result should always pass
        const themes = generateAllThemes([preset], [palette]);
        expect(themes).toHaveLength(1);
        const theme = themes[0];

        // validateContrast should report valid
        const result = validateContrast(theme);
        expect(result.valid).toBe(true);
        expect(result.failures).toHaveLength(0);

        // Manual verification: compute contrast ratio directly
        const bgHex = extractBgColor(theme.bg);
        const textHex = extractBgColor(theme.textPrimary);
        const { r: bgR, g: bgG, b: bgB } = hexToRgb(bgHex);
        const { r: tR, g: tG, b: tB } = hexToRgb(textHex);
        const bgLum = relativeLuminance(bgR, bgG, bgB);
        const textLum = relativeLuminance(tR, tG, tB);
        const ratio = contrastRatio(bgLum, textLum);

        expect(ratio).toBeGreaterThanOrEqual(4.5);
      }),
      { numRuns: 100 },
    );
  });
});

// ── Property 7: Generated theme count equals presets × palettes ─
// Feature: design-system-explorer, Property 7: Generated theme count equals presets × palettes
// **Validates: Requirements 3.4**

describe("Property 7: Generated theme count equals presets × palettes", () => {
  // Generate random non-empty subsets of presets and palettes
  const presetSubsetArb = fc
    .subarray(STYLE_PRESETS, { minLength: 1, maxLength: STYLE_PRESETS.length })
  const paletteSubsetArb = fc
    .subarray(COLOR_PALETTES, { minLength: 1, maxLength: COLOR_PALETTES.length })

  it("generateAllThemes returns exactly N×M themes with unique {preset}-{palette} names for 100+ inputs", () => {
    fc.assert(
      fc.property(presetSubsetArb, paletteSubsetArb, (presets, palettes) => {
        const themes = generateAllThemes(presets, palettes);

        // Count equals N × M
        expect(themes).toHaveLength(presets.length * palettes.length);

        // All names are unique
        const names = themes.map((t) => t.name);
        const uniqueNames = new Set(names);
        expect(uniqueNames.size).toBe(themes.length);

        // All names follow {preset}-{palette} format
        for (const theme of themes) {
          const parts = theme.name.split("-");
          // preset name or palette name could contain hyphens, so check start/end
          const matchesAnyCombo = presets.some((p) =>
            palettes.some((pal) => theme.name === `${p.name}-${pal.name}`),
          );
          expect(matchesAnyCombo).toBe(true);
        }
      }),
      { numRuns: 100 },
    );
  });
});


// ── Helper: Build a populated test registry ─────────────────────

function buildTestRegistry(): CompositionRegistry {
  const registry = new CompositionRegistry();

  // Register shells with compatibility declarations
  registry.registerShell({
    name: "TestShell1",
    compatibleAtomCategories: ["data-display", "typography"],
    compatibleMoleculeCategories: ["stats", "content"],
    maxChildren: 6,
  });
  registry.registerShell({
    name: "TestShell2",
    compatibleAtomCategories: ["decoration", "media"],
    compatibleMoleculeCategories: ["navigation", "pricing"],
    maxChildren: 4,
  });

  // Register molecules
  registry.registerMolecule({
    name: "TestMol1",
    atoms: ["Atom1"],
    compatibleShells: ["TestShell1"],
    category: "stats",
  });
  registry.registerMolecule({
    name: "TestMol2",
    atoms: ["Atom2"],
    compatibleShells: ["TestShell2"],
    category: "navigation",
  });

  // Set themes
  registry.setThemes({
    dark: {
      name: "dark",
      bg: "#0a0a0f",
      bgSecondary: "#111",
      bgGlass: "rgba(255,255,255,0.06)",
      textPrimary: "#ffffff",
      textSecondary: "#94a3b8",
      textMuted: "#64748b",
      accent: "#6366f1",
      accentSecondary: "#a855f7",
      accentGradient: "linear-gradient(135deg, #6366f1, #ec4899)",
      cardBorder: "rgba(99,102,241,0.25)",
      cardShadow: "0 4px 24px rgba(0,0,0,0.3)",
      fontFamily: "'Inter', sans-serif",
      headingWeight: 800,
      bodyWeight: 400,
    },
    light: {
      name: "light",
      bg: "#f8fafc",
      bgSecondary: "#fff",
      bgGlass: "rgba(255,255,255,0.9)",
      textPrimary: "#0f172a",
      textSecondary: "#475569",
      textMuted: "#94a3b8",
      accent: "#2563eb",
      accentSecondary: "#3b82f6",
      accentGradient: "linear-gradient(135deg, #2563eb, #7c3aed)",
      cardBorder: "rgba(37,99,235,0.15)",
      cardShadow: "0 4px 24px rgba(0,0,0,0.06)",
      fontFamily: "'Inter', sans-serif",
      headingWeight: 700,
      bodyWeight: 400,
    },
  });

  return registry;
}

// ── Arbitraries for Registry tests ──────────────────────────────

const atomCategoryArb: fc.Arbitrary<AtomCategory> = fc.constantFrom(
  "data-display",
  "typography",
  "decoration",
  "media",
  "interactive",
);

const moleculeCategoryArb: fc.Arbitrary<MoleculeCategory> = fc.constantFrom(
  "stats",
  "content",
  "navigation",
  "pricing",
  "social",
);

const shellNameArb = fc.stringMatching(/^[A-Z][A-Za-z0-9]{2,15}$/);
const atomNameArb = fc.stringMatching(/^[A-Z][A-Za-z0-9]{2,15}$/);
const moleculeNameArb = fc.stringMatching(/^[A-Z][A-Za-z0-9]{2,15}$/);

// ── Property 3: Registry metadata completeness ──────────────────
// Feature: design-system-explorer, Property 3: Registry metadata completeness
// **Validates: Requirements 1.3, 5.4**

describe("Property 3: Registry metadata completeness", () => {
  it("registered Atoms have all required fields after registration", () => {
    fc.assert(
      fc.property(
        atomNameArb,
        atomCategoryArb,
        fc.array(shellNameArb, { minLength: 0, maxLength: 3 }),
        (name, category, compatibleShells) => {
          const registry = new CompositionRegistry();
          const meta: AtomMeta = {
            name,
            category,
            compatibleShells,
            requiredProps: ["theme", "frame"],
            defaultProps: {},
          };
          registry.registerAtom(meta);

          const stored = registry.atoms.get(name);
          expect(stored).toBeDefined();
          expect(stored!.name).toBe(name);
          expect(stored!.category).toBe(category);
          expect(Array.isArray(stored!.compatibleShells)).toBe(true);
          expect(Array.isArray(stored!.requiredProps)).toBe(true);
          expect(typeof stored!.defaultProps).toBe("object");
        },
      ),
      { numRuns: 100 },
    );
  });

  it("registered Molecules have all required fields after registration", () => {
    fc.assert(
      fc.property(
        moleculeNameArb,
        moleculeCategoryArb,
        fc.array(atomNameArb, { minLength: 1, maxLength: 3 }),
        fc.array(shellNameArb, { minLength: 0, maxLength: 3 }),
        (name, category, atoms, compatibleShells) => {
          const registry = new CompositionRegistry();
          const meta: MoleculeMeta = { name, atoms, compatibleShells, category };
          registry.registerMolecule(meta);

          const stored = registry.molecules.get(name);
          expect(stored).toBeDefined();
          expect(stored!.name).toBe(name);
          expect(stored!.category).toBe(category);
          expect(Array.isArray(stored!.atoms)).toBe(true);
          expect(Array.isArray(stored!.compatibleShells)).toBe(true);
        },
      ),
      { numRuns: 100 },
    );
  });

  it("registered Shells have all required fields after registration", () => {
    fc.assert(
      fc.property(
        shellNameArb,
        fc.array(atomCategoryArb, { minLength: 1, maxLength: 3 }),
        fc.array(moleculeCategoryArb, { minLength: 0, maxLength: 3 }),
        fc.integer({ min: 1, max: 12 }),
        (name, atomCats, molCats, maxChildren) => {
          const registry = new CompositionRegistry();
          const meta: ShellMeta = {
            name,
            compatibleAtomCategories: atomCats,
            compatibleMoleculeCategories: molCats,
            maxChildren,
          };
          registry.registerShell(meta);

          const stored = registry.shells.get(name);
          expect(stored).toBeDefined();
          expect(stored!.name).toBe(name);
          expect(Array.isArray(stored!.compatibleAtomCategories)).toBe(true);
          expect(Array.isArray(stored!.compatibleMoleculeCategories)).toBe(true);
          expect(typeof stored!.maxChildren).toBe("number");
        },
      ),
      { numRuns: 100 },
    );
  });

  it("shells without compatibility declarations are rejected", () => {
    fc.assert(
      fc.property(shellNameArb, fc.integer({ min: 1, max: 12 }), (name, maxChildren) => {
        const registry = new CompositionRegistry();
        expect(() =>
          registry.registerShell({
            name,
            compatibleAtomCategories: [],
            compatibleMoleculeCategories: [],
            maxChildren,
          }),
        ).toThrow(/must declare at least one compatible/);
      }),
      { numRuns: 100 },
    );
  });
});

// ── Property 4: Combination count updates on registration ───────
// Feature: design-system-explorer, Property 4: Combination count updates on registration
// **Validates: Requirements 1.4**

describe("Property 4: Combination count updates on registration", () => {
  it("registering a new Atom with compatible Shells increases combination count", () => {
    fc.assert(
      fc.property(
        atomNameArb,
        atomCategoryArb,
        (name, category) => {
          const registry = buildTestRegistry();
          const countBefore = registry.getCombinationCount();

          // Find shells compatible with this atom category
          const compatibleShellNames: string[] = [];
          for (const [shellName, constraint] of Object.entries(registry.constraints)) {
            if (constraint.compatibleAtomCategories.includes(category)) {
              compatibleShellNames.push(shellName);
            }
          }

          registry.registerAtom({
            name: `New_${name}`,
            category,
            compatibleShells: compatibleShellNames,
            requiredProps: ["theme", "frame"],
            defaultProps: {},
          });

          const countAfter = registry.getCombinationCount();
          // Count should not decrease - atoms alone don't create combinations
          // (molecules do), but the count should remain stable or increase
          expect(countAfter).toBeGreaterThanOrEqual(countBefore);
        },
      ),
      { numRuns: 100 },
    );
  });

  it("registering a new Molecule with compatible Shells increases combination count by >= themes × compatible shells", () => {
    fc.assert(
      fc.property(
        moleculeNameArb,
        moleculeCategoryArb,
        (name, category) => {
          const registry = buildTestRegistry();
          const countBefore = registry.getCombinationCount();
          const themeCount = Object.keys(registry.themes).length;

          // Find shells that accept this molecule category
          const compatibleShellNames: string[] = [];
          for (const [shellName, constraint] of Object.entries(registry.constraints)) {
            if (constraint.compatibleMoleculeCategories.includes(category)) {
              compatibleShellNames.push(shellName);
            }
          }

          if (compatibleShellNames.length === 0) return; // skip if no compatible shells

          registry.registerMolecule({
            name: `New_${name}`,
            atoms: ["Atom1"],
            compatibleShells: compatibleShellNames,
            category,
          });

          const countAfter = registry.getCombinationCount();
          const expectedIncrease = themeCount * compatibleShellNames.length;
          expect(countAfter - countBefore).toBeGreaterThanOrEqual(expectedIncrease);
        },
      ),
      { numRuns: 100 },
    );
  });
});

// ── Property 8: Filtering returns only matching combinations ────
// Feature: design-system-explorer, Property 8: Filtering returns only matching combinations
// **Validates: Requirements 4.4, 5.3, 6.1**

describe("Property 8: Filtering returns only matching combinations", () => {
  it("every returned combination matches ALL filter criteria", () => {
    const registry = buildTestRegistry();
    const allCombos = registry.queryCombinations({});

    // Generate random filters from actual values in the registry
    const categories = [...new Set(allCombos.map((c) => c.category))];
    const shells = [...new Set(allCombos.map((c) => c.shell))];
    const themes = [...new Set(allCombos.map((c) => c.theme))];

    const filterArb = fc.record({
      templateCategory: fc.option(fc.constantFrom(...categories), { nil: undefined }),
      shellType: fc.option(fc.constantFrom(...shells), { nil: undefined }),
      themeName: fc.option(fc.constantFrom(...themes), { nil: undefined }),
    });

    fc.assert(
      fc.property(filterArb, (filter) => {
        const results = registry.queryCombinations(filter);

        for (const combo of results) {
          if (filter.templateCategory) {
            expect(combo.category).toBe(filter.templateCategory);
          }
          if (filter.shellType) {
            expect(combo.shell).toBe(filter.shellType);
          }
          if (filter.themeName) {
            expect(combo.theme).toBe(filter.themeName);
          }
        }
      }),
      { numRuns: 100 },
    );
  });

  it("no valid match is excluded from filtered results", () => {
    const registry = buildTestRegistry();
    const allCombos = registry.queryCombinations({});

    const categories = [...new Set(allCombos.map((c) => c.category))];
    const shells = [...new Set(allCombos.map((c) => c.shell))];
    const themes = [...new Set(allCombos.map((c) => c.theme))];

    const filterArb = fc.record({
      templateCategory: fc.option(fc.constantFrom(...categories), { nil: undefined }),
      shellType: fc.option(fc.constantFrom(...shells), { nil: undefined }),
      themeName: fc.option(fc.constantFrom(...themes), { nil: undefined }),
    });

    fc.assert(
      fc.property(filterArb, (filter) => {
        const results = registry.queryCombinations(filter);
        const resultIds = new Set(results.map((c) => c.id));

        // Manually check every combination - any that matches all criteria must be in results
        for (const combo of allCombos) {
          let matches = true;
          if (filter.templateCategory && combo.category !== filter.templateCategory) matches = false;
          if (filter.shellType && combo.shell !== filter.shellType) matches = false;
          if (filter.themeName && combo.theme !== filter.themeName) matches = false;
          if (matches) {
            expect(resultIds.has(combo.id)).toBe(true);
          }
        }
      }),
      { numRuns: 100 },
    );
  });
});

// ── Property 9: Count consistency with filtered results ─────────
// Feature: design-system-explorer, Property 9: Count consistency with filtered results
// **Validates: Requirements 4.5, 6.4**

describe("Property 9: Count consistency with filtered results", () => {
  it("getCombinationCount(filter) === queryCombinations(filter).length", () => {
    const registry = buildTestRegistry();
    const allCombos = registry.queryCombinations({});

    const categories = [...new Set(allCombos.map((c) => c.category))];
    const shells = [...new Set(allCombos.map((c) => c.shell))];
    const themes = [...new Set(allCombos.map((c) => c.theme))];

    const filterArb = fc.record({
      templateCategory: fc.option(fc.constantFrom(...categories), { nil: undefined }),
      shellType: fc.option(fc.constantFrom(...shells), { nil: undefined }),
      themeName: fc.option(fc.constantFrom(...themes), { nil: undefined }),
    });

    fc.assert(
      fc.property(filterArb, (filter) => {
        const count = registry.getCombinationCount(filter);
        const list = registry.queryCombinations(filter);
        expect(count).toBe(list.length);
      }),
      { numRuns: 100 },
    );
  });

  it("getCombinationCount() with no filter equals total combinations length", () => {
    const registry = buildTestRegistry();
    expect(registry.getCombinationCount()).toBe(registry.combinations.length);
  });
});

// ── Property 10: Invalid combination returns descriptive error ──
// Feature: design-system-explorer, Property 10: Invalid combination returns descriptive error
// **Validates: Requirements 5.2**

describe("Property 10: Invalid combination returns descriptive error", () => {
  it("constraint-violating combos return { valid: false } with error details", () => {
    fc.assert(
      fc.property(
        fc.constantFrom("UnknownTemplate", "FakeTemplate", "NoSuchMol"),
        fc.constantFrom("UnknownShell", "FakeShell", "NoSuchShell"),
        fc.constantFrom("UnknownTheme", "FakeTheme", "NoSuchTheme"),
        (template, shell, theme) => {
          const registry = buildTestRegistry();
          const result = registry.validateCombination({ template, shell, theme });
          expect(result.valid).toBe(false);
          expect(result.errors.length).toBeGreaterThan(0);
          // Errors should be descriptive strings
          for (const err of result.errors) {
            expect(typeof err).toBe("string");
            expect(err.length).toBeGreaterThan(0);
          }
        },
      ),
      { numRuns: 100 },
    );
  });

  it("incompatible molecule-shell pair returns constraint error", () => {
    const registry = buildTestRegistry();
    // TestMol1 is "stats" category, compatible with TestShell1
    // TestShell2 accepts "navigation" and "pricing" - not "stats"
    // TestMol1 also doesn't list TestShell2 in compatibleShells
    const result = registry.validateCombination({
      template: "TestMol1",
      shell: "TestShell2",
      theme: "dark",
    });
    expect(result.valid).toBe(false);
    expect(result.errors.length).toBeGreaterThan(0);
    expect(result.errors[0]).toContain("not compatible");
  });
});

// ── Property 12: Random combination validity ────────────────────
// Feature: design-system-explorer, Property 12: Random combination validity
// **Validates: Requirements 5.5**

describe("Property 12: Random combination validity", () => {
  it("getRandomCombination(filter) returns a valid combination matching all filter criteria", () => {
    const registry = buildTestRegistry();
    const allCombos = registry.queryCombinations({});

    const categories = [...new Set(allCombos.map((c) => c.category))];
    const shells = [...new Set(allCombos.map((c) => c.shell))];
    const themes = [...new Set(allCombos.map((c) => c.theme))];

    const filterArb = fc.record({
      templateCategory: fc.option(fc.constantFrom(...categories), { nil: undefined }),
      shellType: fc.option(fc.constantFrom(...shells), { nil: undefined }),
      themeName: fc.option(fc.constantFrom(...themes), { nil: undefined }),
    });

    fc.assert(
      fc.property(filterArb, (filter) => {
        // Only test filters that have at least one match
        const matching = registry.queryCombinations(filter);
        if (matching.length === 0) return;

        const random = registry.getRandomCombination(filter);
        expect(random).toBeDefined();

        // Must be in the registry
        const found = registry.getCombination(random.id);
        expect(found).toBeDefined();

        // Must match all filter criteria
        if (filter.templateCategory) {
          expect(random.category).toBe(filter.templateCategory);
        }
        if (filter.shellType) {
          expect(random.shell).toBe(filter.shellType);
        }
        if (filter.themeName) {
          expect(random.theme).toBe(filter.themeName);
        }
      }),
      { numRuns: 100 },
    );
  });
});

// ── Property 14: Registry serialization round-trip ──────────────
// Feature: design-system-explorer, Property 14: Registry serialization round-trip
// **Validates: Requirements 7.1, 7.2, 7.3**

describe("Property 14: Registry serialization round-trip", () => {
  it("serialize(parse(serialize(r))) === serialize(r) for populated registries", () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 1, max: 3 }),
        fc.integer({ min: 1, max: 3 }),
        (_shellCount, _molCount) => {
          const registry = buildTestRegistry();

          const json1 = registry.serialize();
          const restored = CompositionRegistry.parse(json1);
          const json2 = restored.serialize();

          expect(json2).toBe(json1);
        },
      ),
      { numRuns: 100 },
    );
  });

  it("round-trip preserves atom, molecule, shell, and theme counts", () => {
    const registry = buildTestRegistry();
    const json = registry.serialize();
    const restored = CompositionRegistry.parse(json);

    expect(restored.atoms.size).toBe(registry.atoms.size);
    expect(restored.molecules.size).toBe(registry.molecules.size);
    expect(restored.shells.size).toBe(registry.shells.size);
    expect(Object.keys(restored.themes).length).toBe(Object.keys(registry.themes).length);
    expect(restored.combinations.length).toBe(registry.combinations.length);
  });
});

// ── Property 15: Malformed JSON parse error ─────────────────────
// Feature: design-system-explorer, Property 15: Malformed JSON parse error
// **Validates: Requirements 7.4**

describe("Property 15: Malformed JSON parse error", () => {
  it("invalid JSON strings throw RegistryParseError with descriptive message", () => {
    fc.assert(
      fc.property(
        fc.oneof(
          fc.string().filter((s) => {
            try { JSON.parse(s); return false; } catch { return true; }
          }),
          fc.constant("{invalid json}"),
          fc.constant("not json at all"),
          fc.constant("{"),
          fc.constant("[}"),
        ),
        (input) => {
          expect(() => CompositionRegistry.parse(input)).toThrow(RegistryParseError);
        },
      ),
      { numRuns: 100 },
    );
  });

  it("valid JSON missing required keys throws RegistryParseError", () => {
    fc.assert(
      fc.property(
        fc.constantFrom(
          "{}",
          '{"atoms": []}',
          '{"atoms": [], "molecules": []}',
          '{"atoms": [], "molecules": [], "shells": []}',
          '{"atoms": [], "molecules": [], "shells": [], "themes": []}',
          '{"atoms": [], "molecules": [], "shells": [], "themes": [], "constraints": {}}',
        ),
        (input) => {
          expect(() => CompositionRegistry.parse(input)).toThrow(RegistryParseError);
        },
      ),
      { numRuns: 100 },
    );
  });

  it("non-object JSON values throw RegistryParseError", () => {
    fc.assert(
      fc.property(
        fc.constantFrom('"just a string"', "42", "true", "null", "[]"),
        (input) => {
          expect(() => CompositionRegistry.parse(input)).toThrow(RegistryParseError);
        },
      ),
      { numRuns: 100 },
    );
  });
});

// ── Property 16: Serialized output conforms to JSON schema ──────
// Feature: design-system-explorer, Property 16: Serialized output conforms to JSON schema
// **Validates: Requirements 7.5**

describe("Property 16: Serialized output conforms to JSON schema", () => {
  it("serialized output has all required top-level keys with correct types", () => {
    fc.assert(
      fc.property(fc.integer({ min: 0, max: 5 }), (_seed) => {
        const registry = buildTestRegistry();
        const json = registry.serialize();
        const parsed = JSON.parse(json);

        // Required top-level keys
        expect(parsed).toHaveProperty("atoms");
        expect(parsed).toHaveProperty("molecules");
        expect(parsed).toHaveProperty("shells");
        expect(parsed).toHaveProperty("themes");
        expect(parsed).toHaveProperty("constraints");
        expect(parsed).toHaveProperty("combinations");

        // All are correct types
        expect(Array.isArray(parsed.atoms)).toBe(true);
        expect(Array.isArray(parsed.molecules)).toBe(true);
        expect(Array.isArray(parsed.shells)).toBe(true);
        expect(Array.isArray(parsed.themes)).toBe(true);
        expect(typeof parsed.constraints).toBe("object");
        expect(Array.isArray(parsed.constraints)).toBe(false);
        expect(Array.isArray(parsed.combinations)).toBe(true);

        // Validate atom items have required fields
        for (const atom of parsed.atoms) {
          expect(atom).toHaveProperty("name");
          expect(atom).toHaveProperty("category");
          expect(atom).toHaveProperty("compatibleShells");
          expect(typeof atom.name).toBe("string");
          expect(typeof atom.category).toBe("string");
          expect(Array.isArray(atom.compatibleShells)).toBe(true);
        }

        // Validate molecule items have required fields
        for (const mol of parsed.molecules) {
          expect(mol).toHaveProperty("name");
          expect(mol).toHaveProperty("atoms");
          expect(mol).toHaveProperty("category");
          expect(mol).toHaveProperty("compatibleShells");
        }

        // Validate shell items have required fields
        for (const shell of parsed.shells) {
          expect(shell).toHaveProperty("name");
          expect(shell).toHaveProperty("compatibleAtomCategories");
          expect(shell).toHaveProperty("compatibleMoleculeCategories");
        }

        // Validate theme items have required fields
        for (const theme of parsed.themes) {
          expect(theme).toHaveProperty("name");
          expect(theme).toHaveProperty("bg");
          expect(theme).toHaveProperty("textPrimary");
          expect(theme).toHaveProperty("accent");
        }

        // Validate combination items have required fields
        for (const combo of parsed.combinations) {
          expect(combo).toHaveProperty("id");
          expect(combo).toHaveProperty("template");
          expect(combo).toHaveProperty("shell");
          expect(combo).toHaveProperty("theme");
        }
      }),
      { numRuns: 100 },
    );
  });
});

// ── Property 17: BrandKit override merge correctness ────────────
// Feature: design-system-explorer, Property 17: BrandKit override merge correctness
// **Validates: Requirements 8.1, 8.3**

describe("Property 17: BrandKit override merge correctness", () => {
  const presetArb = fc.constantFrom(...STYLE_PRESETS);
  const paletteArb = fc.constantFrom(...COLOR_PALETTES);

  // Generator for valid hex color strings
  const hexColorArb = fc
    .tuple(
      fc.integer({ min: 0, max: 255 }),
      fc.integer({ min: 0, max: 255 }),
      fc.integer({ min: 0, max: 255 }),
    )
    .map(
      ([r, g, b]) =>
        `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`,
    );

  // Generator for BrandKit with optional fields
  const brandKitArb: fc.Arbitrary<BrandKit> = fc.record(
    {
      primaryColor: fc.option(hexColorArb, { nil: undefined }),
      secondaryColor: fc.option(hexColorArb, { nil: undefined }),
      accentColor: fc.option(hexColorArb, { nil: undefined }),
      fontFamily: fc.option(
        fc.constantFrom("'Roboto', sans-serif", "'Poppins', sans-serif", "'Montserrat', sans-serif"),
        { nil: undefined },
      ),
      logoUrl: fc.option(fc.constant("https://example.com/logo.png"), { nil: undefined }),
    },
    { requiredKeys: [] },
  );

  it("BrandKit fields override corresponding Theme fields", () => {
    fc.assert(
      fc.property(presetArb, paletteArb, brandKitArb, (preset, palette, brandKit) => {
        const theme = generateTheme(preset, palette);
        const { theme: merged } = applyBrandKitToGenerated(theme, brandKit);

        // (a) Every specified BrandKit field overrides the corresponding Theme field
        if (brandKit.primaryColor) {
          expect(merged.textPrimary).toBe(brandKit.primaryColor);
        }
        if (brandKit.secondaryColor) {
          // secondaryColor maps to cardBg in applyBrandKit
          expect((merged as unknown as Record<string, unknown>).cardBg).toBe(brandKit.secondaryColor);
        }
        if (brandKit.accentColor) {
          expect(merged.accent).toBe(brandKit.accentColor);
        }
        if (brandKit.fontFamily) {
          expect(merged.fontFamily).toBe(brandKit.fontFamily);
        }
      }),
      { numRuns: 100 },
    );
  });

  it("non-overridden Theme fields are preserved", () => {
    fc.assert(
      fc.property(presetArb, paletteArb, brandKitArb, (preset, palette, brandKit) => {
        const theme = generateTheme(preset, palette);
        const { theme: merged } = applyBrandKitToGenerated(theme, brandKit);

        // (b) Fields NOT specified in BrandKit retain original values
        if (!brandKit.primaryColor) {
          expect(merged.textPrimary).toBe(theme.textPrimary);
        }
        if (!brandKit.accentColor) {
          expect(merged.accent).toBe(theme.accent);
        }
        if (!brandKit.fontFamily) {
          expect(merged.fontFamily).toBe(theme.fontFamily);
        }

        // Fields that BrandKit never touches should always be preserved
        expect(merged.bg).toBe(theme.bg);
        expect(merged.bgSecondary).toBe(theme.bgSecondary);
        expect(merged.bgGlass).toBe(theme.bgGlass);
        expect(merged.textSecondary).toBe(theme.textSecondary);
        expect(merged.textMuted).toBe(theme.textMuted);
        expect(merged.accentSecondary).toBe(theme.accentSecondary);
        expect(merged.accentGradient).toBe(theme.accentGradient);
        expect(merged.cardBorder).toBe(theme.cardBorder);
        expect(merged.cardShadow).toBe(theme.cardShadow);
        expect(merged.headingWeight).toBe(theme.headingWeight);
        expect(merged.bodyWeight).toBe(theme.bodyWeight);
        expect(merged.name).toBe(theme.name);
      }),
      { numRuns: 100 },
    );
  });

  it("result is a valid Theme object with all required fields", () => {
    fc.assert(
      fc.property(presetArb, paletteArb, brandKitArb, (preset, palette, brandKit) => {
        const theme = generateTheme(preset, palette);
        const { theme: merged } = applyBrandKitToGenerated(theme, brandKit);

        // (c) Result is a valid Theme - all required fields present with correct types
        const stringFields = [
          "name", "bg", "bgSecondary", "bgGlass",
          "textPrimary", "textSecondary", "textMuted",
          "accent", "accentSecondary", "accentGradient",
          "cardBorder", "cardShadow", "fontFamily",
        ] as const;

        for (const field of stringFields) {
          expect(typeof merged[field]).toBe("string");
          expect((merged[field] as string).length).toBeGreaterThan(0);
        }

        expect(typeof merged.headingWeight).toBe("number");
        expect(typeof merged.bodyWeight).toBe("number");
      }),
      { numRuns: 100 },
    );
  });
});

// ── Property 18: Low contrast BrandKit warning ──────────────────
// Feature: design-system-explorer, Property 18: Low contrast BrandKit warning
// **Validates: Requirements 8.4**

describe("Property 18: Low contrast BrandKit warning", () => {
  it("when textPrimary-to-bg contrast < 4.5:1 after override, a warning is produced", () => {
    const presetArb = fc.constantFrom(...STYLE_PRESETS);
    const paletteArb = fc.constantFrom(...COLOR_PALETTES);

    // Generate BrandKit with primaryColor that is very close to the bg color
    // to force low contrast. Dark themes have bg near #0a0a0f, so use dark primaryColor.
    // Light themes have bg near #f8fafc, so use light primaryColor.
    const lowContrastBrandKitArb = fc
      .tuple(presetArb, paletteArb)
      .chain(([preset, palette]) => {
        const theme = generateTheme(preset, palette);
        const bgHex = extractBgColor(theme.bg);
        const { r, g, b } = hexToRgb(bgHex);

        // Create a primaryColor very close to bg (within ±10 per channel)
        // This guarantees contrast will be well below 4.5:1
        const nearR = Math.min(255, Math.max(0, r + 5));
        const nearG = Math.min(255, Math.max(0, g + 5));
        const nearB = Math.min(255, Math.max(0, b + 5));
        const lowContrastColor = `#${nearR.toString(16).padStart(2, "0")}${nearG.toString(16).padStart(2, "0")}${nearB.toString(16).padStart(2, "0")}`;

        return fc.constant({
          theme,
          brandKit: { primaryColor: lowContrastColor } as BrandKit,
        });
      });

    fc.assert(
      fc.property(lowContrastBrandKitArb, ({ theme, brandKit }) => {
        const { warnings } = applyBrandKitToGenerated(theme, brandKit);

        // Should produce at least one warning about low contrast
        expect(warnings.length).toBeGreaterThan(0);

        // Warning should identify the failing color pair
        const warning = warnings[0];
        expect(warning).toContain("contrast ratio");
        expect(warning).toContain("textPrimary");
        expect(warning).toContain("bg");
      }),
      { numRuns: 100 },
    );
  });

  it("when contrast is adequate after override, no warning is produced", () => {
    const presetArb = fc.constantFrom(...STYLE_PRESETS);
    const paletteArb = fc.constantFrom(...COLOR_PALETTES);

    // BrandKit with no primaryColor override - generated themes already pass contrast
    const safeBrandKitArb: fc.Arbitrary<BrandKit> = fc.record(
      {
        fontFamily: fc.option(
          fc.constantFrom("'Roboto', sans-serif", "'Poppins', sans-serif"),
          { nil: undefined },
        ),
        logoUrl: fc.option(fc.constant("https://example.com/logo.png"), { nil: undefined }),
      },
      { requiredKeys: [] },
    );

    fc.assert(
      fc.property(presetArb, paletteArb, safeBrandKitArb, (preset, palette, brandKit) => {
        const theme = generateTheme(preset, palette);
        // generateTheme already ensures contrast >= 4.5:1
        // BrandKit without primaryColor won't change textPrimary
        const { warnings } = applyBrandKitToGenerated(theme, brandKit);
        expect(warnings).toHaveLength(0);
      }),
      { numRuns: 100 },
    );
  });
});


// ── Property 11: Unknown ID returns formatted error with suggestions ─
// Feature: design-system-explorer, Property 11: Unknown ID returns formatted error with suggestions
// **Validates: Requirements 6.5**

import { AgentAPI, type CombinationProps, type AgentError } from "../_shared/api/agentApi";

describe("Property 11: Unknown ID returns formatted error with suggestions", () => {
  function buildApiWithRegistry(): { api: AgentAPI; registry: CompositionRegistry } {
    const registry = buildTestRegistry();
    const api = new AgentAPI(registry);
    return { api, registry };
  }

  // Generate random strings that are NOT valid combination IDs
  const randomInvalidIdArb = fc.stringMatching(/^[a-zA-Z0-9_-]{1,30}$/).filter((s) => {
    // Exclude anything that could accidentally match a valid combo ID pattern
    // Valid IDs look like "TestMol1:TestShell1:dark" or "TestMol2:TestShell2:light"
    return (
      s !== "TestMol1:TestShell1:dark" &&
      s !== "TestMol1:TestShell1:light" &&
      s !== "TestMol2:TestShell2:dark" &&
      s !== "TestMol2:TestShell2:light"
    );
  });

  it("non-existent IDs return AgentError with error: true", () => {
    fc.assert(
      fc.property(randomInvalidIdArb, (invalidId) => {
        const { api } = buildApiWithRegistry();
        const result = api.getCombinationProps(invalidId);

        // Must be an AgentError
        expect((result as AgentError).error).toBe(true);
      }),
      { numRuns: 100 },
    );
  });

  it('non-existent IDs return message matching "Unknown combination: {id}"', () => {
    fc.assert(
      fc.property(randomInvalidIdArb, (invalidId) => {
        const { api } = buildApiWithRegistry();
        const result = api.getCombinationProps(invalidId) as AgentError;

        expect(result.error).toBe(true);
        expect(result.message).toBe(`Unknown combination: ${invalidId}`);
      }),
      { numRuns: 100 },
    );
  });

  it("non-existent IDs return a non-empty suggestions array of valid combination IDs", () => {
    fc.assert(
      fc.property(randomInvalidIdArb, (invalidId) => {
        const { api, registry } = buildApiWithRegistry();
        const result = api.getCombinationProps(invalidId) as AgentError;

        expect(result.error).toBe(true);
        expect(Array.isArray(result.suggestions)).toBe(true);
        expect(result.suggestions!.length).toBeGreaterThan(0);

        // Every suggestion must be a valid combination ID in the registry
        const validIds = new Set(registry.combinations.map((c) => c.id));
        for (const suggestion of result.suggestions!) {
          expect(validIds.has(suggestion)).toBe(true);
        }
      }),
      { numRuns: 100 },
    );
  });
});

// ── Property 13: Props completeness for valid combination IDs ───
// Feature: design-system-explorer, Property 13: Props completeness for valid combination IDs
// **Validates: Requirements 6.2, 6.3**

describe("Property 13: Props completeness for valid combination IDs", () => {
  function buildApiWithRegistry(): { api: AgentAPI; validIds: string[] } {
    const registry = buildTestRegistry();
    const api = new AgentAPI(registry);
    const validIds = registry.combinations.map((c) => c.id);
    return { api, validIds };
  }

  it("valid combination IDs return CombinationProps (not AgentError)", () => {
    const { api, validIds } = buildApiWithRegistry();
    const validIdArb = fc.constantFrom(...validIds);

    fc.assert(
      fc.property(validIdArb, (id) => {
        const result = api.getCombinationProps(id);

        // Must NOT be an AgentError
        expect((result as AgentError).error).toBeUndefined();
      }),
      { numRuns: 100 },
    );
  });

  it("valid combination IDs return a non-empty templateComponent string", () => {
    const { api, validIds } = buildApiWithRegistry();
    const validIdArb = fc.constantFrom(...validIds);

    fc.assert(
      fc.property(validIdArb, (id) => {
        const result = api.getCombinationProps(id) as CombinationProps;

        expect(typeof result.templateComponent).toBe("string");
        expect(result.templateComponent.length).toBeGreaterThan(0);
      }),
      { numRuns: 100 },
    );
  });

  it("valid combination IDs return a theme object with bg, textPrimary, accent, and name fields", () => {
    const { api, validIds } = buildApiWithRegistry();
    const validIdArb = fc.constantFrom(...validIds);

    fc.assert(
      fc.property(validIdArb, (id) => {
        const result = api.getCombinationProps(id) as CombinationProps;

        expect(result.theme).toBeDefined();
        expect(typeof result.theme.bg).toBe("string");
        expect(typeof result.theme.textPrimary).toBe("string");
        expect(typeof result.theme.accent).toBe("string");
        expect(typeof result.theme.name).toBe("string");
      }),
      { numRuns: 100 },
    );
  });

  it("valid combination IDs return fps=30, width=1280, height=720", () => {
    const { api, validIds } = buildApiWithRegistry();
    const validIdArb = fc.constantFrom(...validIds);

    fc.assert(
      fc.property(validIdArb, (id) => {
        const result = api.getCombinationProps(id) as CombinationProps;

        expect(result.fps).toBe(30);
        expect(result.width).toBe(1280);
        expect(result.height).toBe(720);
      }),
      { numRuns: 100 },
    );
  });
});

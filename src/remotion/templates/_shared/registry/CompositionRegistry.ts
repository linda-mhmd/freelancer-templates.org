/**
 * Composition Registry - Central index of all compositions, metadata, and constraints.
 *
 * Manages Atoms, Molecules, Shells, Themes, and their valid Combinations.
 * Provides query, filter, validation, and random-selection methods.
 *
 * Pure TypeScript - no React dependencies, no side effects except console warnings.
 *
 * Combination ID format: "{template}:{shell}:{theme}"
 */

import type { AtomMeta, AtomCategory } from "../atoms/registry-core";
import type { MoleculeMeta, MoleculeCategory } from "../molecules/registry-core";
import type { Theme } from "../themes";

// ── Interfaces ──────────────────────────────────────────────────

export interface ShellMeta {
  name: string;
  compatibleAtomCategories: AtomCategory[];
  compatibleMoleculeCategories: MoleculeCategory[];
  maxChildren: number;
}

export interface TemplateMeta {
  name: string;
  layouts: string[];
  compatibleShells: string[];
  journalCategories: string[];
}

export interface CombinationId {
  template: string;
  shell: string;
  theme: string;
}

export interface Combination {
  id: string; // "template:shell:theme" composite key
  template: string;
  shell: string;
  theme: string;
  category: string;
  metadata: {
    atomCount: number;
    moleculeCount: number;
    previewable: boolean;
  };
}

export interface ConstraintMap {
  [shellName: string]: {
    compatibleAtomCategories: AtomCategory[];
    compatibleMoleculeCategories: MoleculeCategory[];
    maxChildren: number;
  };
}

export interface CombinationFilter {
  templateCategory?: string;
  shellType?: string;
  themeName?: string;
  stylePreset?: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

// ── Parse Error ─────────────────────────────────────────────────

export class RegistryParseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "RegistryParseError";
  }
}

// ── Registry Class ──────────────────────────────────────────────

export class CompositionRegistry {
  atoms: Map<string, AtomMeta> = new Map();
  molecules: Map<string, MoleculeMeta> = new Map();
  shells: Map<string, ShellMeta> = new Map();
  templates: Map<string, TemplateMeta> = new Map();
  themes: Record<string, Theme> = {};
  constraints: ConstraintMap = {};
  combinations: Combination[] = [];

  // ── Registration ────────────────────────────────────────────

  /**
   * Register an Atom. Logs a warning if compatibleShells is empty
   * (the atom won't appear in any combinations).
   * Recalculates combinations after registration.
   */
  registerAtom(meta: AtomMeta): void {
    if (meta.compatibleShells.length === 0) {
      console.warn(
        `[CompositionRegistry] Atom "${meta.name}" has no compatible shells - it won't appear in combinations.`,
      );
    }
    this.atoms.set(meta.name, meta);
    this.recalculateCombinations();
  }

  /**
   * Register a Molecule. Recalculates combinations after registration.
   */
  registerMolecule(meta: MoleculeMeta): void {
    this.molecules.set(meta.name, meta);
    this.recalculateCombinations();
  }

  /**
   * Register a Shell. Rejects shells that don't declare compatibility.
   * Throws an error if compatibleAtomCategories and compatibleMoleculeCategories
   * are both missing or empty.
   * Updates the constraint map and recalculates combinations.
   */
  registerShell(meta: ShellMeta): void {
    if (
      (!meta.compatibleAtomCategories || meta.compatibleAtomCategories.length === 0) &&
      (!meta.compatibleMoleculeCategories || meta.compatibleMoleculeCategories.length === 0)
    ) {
      throw new Error(
        `InvalidShellError: Shell "${meta.name}" must declare at least one compatible atom or molecule category.`,
      );
    }

    this.shells.set(meta.name, meta);

    // Update constraint map
    this.constraints[meta.name] = {
      compatibleAtomCategories: meta.compatibleAtomCategories,
      compatibleMoleculeCategories: meta.compatibleMoleculeCategories,
      maxChildren: meta.maxChildren,
    };

    this.recalculateCombinations();
  }

  /**
   * Register a high-level Template (e.g. ThoughtLeadership, ConceptPitch).
   * Templates map journal categories to layout variants and compatible shells.
   */
  registerTemplate(meta: TemplateMeta): void {
    this.templates.set(meta.name, meta);
  }

  /**
   * Find templates that match a given journal category.
   */
  getTemplatesForCategory(category: string): TemplateMeta[] {
    return Array.from(this.templates.values()).filter((t) =>
      t.journalCategories.includes(category),
    );
  }

  // ── Bulk setters (no recalc per item) ───────────────────────

  /**
   * Set all themes at once. Recalculates combinations once.
   */
  setThemes(themes: Record<string, Theme>): void {
    this.themes = { ...themes };
    this.recalculateCombinations();
  }

  // ── Combination Generation ──────────────────────────────────

  /**
   * Recalculate all valid combinations from the current atoms, molecules,
   * shells, and themes.
   *
   * A "template" is derived from molecules that are compatible with a shell.
   * For each (molecule, shell, theme) triple where the molecule's category
   * is compatible with the shell, a combination is generated.
   */
  recalculateCombinations(): void {
    const combos: Combination[] = [];
    const themeNames = Object.keys(this.themes);

    if (themeNames.length === 0 || this.shells.size === 0) {
      this.combinations = [];
      return;
    }

    const shellEntries = Array.from(this.shells.entries());
    for (let si = 0; si < shellEntries.length; si++) {
      const shellName = shellEntries[si][0];
      const constraint = this.constraints[shellName];
      if (!constraint) continue;

      // Find compatible molecules for this shell
      const compatibleMolecules: MoleculeMeta[] = [];
      const molEntries = Array.from(this.molecules.values());
      for (let mi = 0; mi < molEntries.length; mi++) {
        const mol = molEntries[mi];
        if (
          constraint.compatibleMoleculeCategories.includes(mol.category) ||
          mol.compatibleShells.includes(shellName)
        ) {
          compatibleMolecules.push(mol);
        }
      }

      // Find compatible atoms for this shell
      const compatibleAtoms: AtomMeta[] = [];
      const atomEntries = Array.from(this.atoms.values());
      for (let ai = 0; ai < atomEntries.length; ai++) {
        const atom = atomEntries[ai];
        if (
          constraint.compatibleAtomCategories.includes(atom.category) ||
          atom.compatibleShells.includes(shellName)
        ) {
          compatibleAtoms.push(atom);
        }
      }

      // Generate combinations: each molecule acts as a "template"
      for (const mol of compatibleMolecules) {
        for (const themeName of themeNames) {
          const id = `${mol.name}:${shellName}:${themeName}`;
          combos.push({
            id,
            template: mol.name,
            shell: shellName,
            theme: themeName,
            category: mol.category,
            metadata: {
              atomCount: compatibleAtoms.length,
              moleculeCount: compatibleMolecules.length,
              previewable: true,
            },
          });
        }
      }
    }

    this.combinations = combos;
  }

  // ── Query Methods ───────────────────────────────────────────

  /**
   * Get a single combination by its composite ID ("template:shell:theme").
   */
  getCombination(id: string): Combination | undefined {
    return this.combinations.find((c) => c.id === id);
  }

  /**
   * Query combinations matching partial filter criteria.
   * Empty/undefined filter fields are ignored (match all).
   */
  queryCombinations(filter: Partial<CombinationFilter>): Combination[] {
    return this.combinations.filter((combo) => {
      if (filter.templateCategory && combo.category !== filter.templateCategory) {
        return false;
      }
      if (filter.shellType && combo.shell !== filter.shellType) {
        return false;
      }
      if (filter.themeName && combo.theme !== filter.themeName) {
        return false;
      }
      if (filter.stylePreset) {
        // Style preset is the prefix of generated theme names (e.g., "dark" in "dark-ocean")
        const themeNameLower = combo.theme.toLowerCase();
        const presetLower = filter.stylePreset.toLowerCase();
        if (
          !themeNameLower.startsWith(presetLower + "-") &&
          themeNameLower !== presetLower
        ) {
          return false;
        }
      }
      return true;
    });
  }

  /**
   * Get a random valid combination matching optional filter criteria.
   * Throws if no combinations match.
   */
  getRandomCombination(filter?: Partial<CombinationFilter>): Combination {
    const pool = filter ? this.queryCombinations(filter) : this.combinations;
    if (pool.length === 0) {
      throw new Error("No combinations match the provided filter criteria.");
    }
    const index = Math.floor(Math.random() * pool.length);
    return pool[index];
  }

  /**
   * Get the count of combinations matching optional filter criteria.
   * With no filter, returns total combination count.
   */
  getCombinationCount(filter?: Partial<CombinationFilter>): number {
    if (!filter) return this.combinations.length;
    return this.queryCombinations(filter).length;
  }

  /**
   * Validate whether a combination ID tuple is valid given current constraints.
   * Returns { valid: true } or { valid: false, errors: [...] }.
   */
  validateCombination(combo: CombinationId): ValidationResult {
    const errors: string[] = [];

    // Check template (molecule) exists
    const molecule = this.molecules.get(combo.template);
    if (!molecule) {
      errors.push(`Unknown template (molecule): "${combo.template}"`);
    }

    // Check shell exists
    const shell = this.shells.get(combo.shell);
    if (!shell) {
      errors.push(`Unknown shell: "${combo.shell}"`);
    }

    // Check theme exists
    if (!this.themes[combo.theme]) {
      errors.push(`Unknown theme: "${combo.theme}"`);
    }

    // If any component is missing, return early
    if (errors.length > 0) {
      return { valid: false, errors };
    }

    // Check compatibility: molecule category must be compatible with shell
    const constraint = this.constraints[combo.shell];
    if (constraint && molecule) {
      const moleculeCompatible =
        constraint.compatibleMoleculeCategories.includes(molecule.category) ||
        molecule.compatibleShells.includes(combo.shell);

      if (!moleculeCompatible) {
        errors.push(
          `Molecule "${combo.template}" (category: ${molecule.category}) is not compatible with shell "${combo.shell}". ` +
            `Shell accepts molecule categories: [${constraint.compatibleMoleculeCategories.join(", ")}].`,
        );
      }
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  // ── Serialization ─────────────────────────────────────────────

  /**
   * Serialize the full registry to a JSON string conforming to the documented schema.
   * Top-level keys: atoms, molecules, shells, themes, constraints, combinations.
   */
  serialize(): string {
    const atomsArray = Array.from(this.atoms.values()).map((a) => ({
      name: a.name,
      category: a.category,
      compatibleShells: a.compatibleShells,
      requiredProps: a.requiredProps,
      defaultProps: a.defaultProps,
    }));

    const moleculesArray = Array.from(this.molecules.values()).map((m) => ({
      name: m.name,
      atoms: m.atoms,
      category: m.category,
      compatibleShells: m.compatibleShells,
    }));

    const shellsArray = Array.from(this.shells.values()).map((s) => ({
      name: s.name,
      compatibleAtomCategories: s.compatibleAtomCategories,
      compatibleMoleculeCategories: s.compatibleMoleculeCategories,
      maxChildren: s.maxChildren,
    }));

    const themesArray = Object.values(this.themes).map((t) => ({
      name: t.name,
      bg: t.bg,
      bgSecondary: t.bgSecondary,
      bgGlass: t.bgGlass,
      textPrimary: t.textPrimary,
      textSecondary: t.textSecondary,
      textMuted: t.textMuted,
      accent: t.accent,
      accentSecondary: t.accentSecondary,
      accentGradient: t.accentGradient,
      cardBorder: t.cardBorder,
      cardShadow: t.cardShadow,
      fontFamily: t.fontFamily,
      headingWeight: t.headingWeight,
      bodyWeight: t.bodyWeight,
    }));

    const templatesArray = Array.from(this.templates.values()).map((t) => ({
      name: t.name,
      layouts: t.layouts,
      compatibleShells: t.compatibleShells,
      journalCategories: t.journalCategories,
    }));

    const combinationsArray = this.combinations.map((c) => ({
      id: c.id,
      template: c.template,
      shell: c.shell,
      theme: c.theme,
      category: c.category,
      metadata: c.metadata,
    }));

    return JSON.stringify({
      atoms: atomsArray,
      molecules: moleculesArray,
      shells: shellsArray,
      templates: templatesArray,
      themes: themesArray,
      constraints: this.constraints,
      combinations: combinationsArray,
    });
  }

  /**
   * Reconstruct a CompositionRegistry from a JSON string.
   * Validates required fields and throws RegistryParseError for malformed input.
   */
  static parse(json: string): CompositionRegistry {
    let data: unknown;
    try {
      data = JSON.parse(json);
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      throw new RegistryParseError(`Invalid JSON: ${msg}`);
    }

    if (typeof data !== "object" || data === null || Array.isArray(data)) {
      throw new RegistryParseError(
        "Expected a JSON object with keys: atoms, molecules, shells, themes, constraints, combinations",
      );
    }

    const obj = data as Record<string, unknown>;

    // Validate required top-level keys
    const requiredKeys = ["atoms", "molecules", "shells", "themes", "constraints", "combinations"] as const;
    const missingKeys = requiredKeys.filter((k) => !(k in obj));
    if (missingKeys.length > 0) {
      throw new RegistryParseError(
        `Missing required top-level keys: ${missingKeys.join(", ")}`,
      );
    }

    // Validate arrays
    for (const key of ["atoms", "molecules", "shells", "themes", "combinations"] as const) {
      if (!Array.isArray(obj[key])) {
        throw new RegistryParseError(
          `Expected "${key}" to be an array, got ${typeof obj[key]}`,
        );
      }
    }

    // Validate constraints is an object
    if (typeof obj.constraints !== "object" || obj.constraints === null || Array.isArray(obj.constraints)) {
      throw new RegistryParseError(
        `Expected "constraints" to be an object, got ${Array.isArray(obj.constraints) ? "array" : typeof obj.constraints}`,
      );
    }

    // Validate atom items
    const atoms = obj.atoms as Record<string, unknown>[];
    for (let i = 0; i < atoms.length; i++) {
      const a = atoms[i];
      if (!a || typeof a !== "object") {
        throw new RegistryParseError(`atoms[${i}]: expected an object`);
      }
      for (const field of ["name", "category", "compatibleShells"] as const) {
        if (!(field in a)) {
          throw new RegistryParseError(`atoms[${i}]: missing required field "${field}"`);
        }
      }
    }

    // Validate molecule items
    const molecules = obj.molecules as Record<string, unknown>[];
    for (let i = 0; i < molecules.length; i++) {
      const m = molecules[i];
      if (!m || typeof m !== "object") {
        throw new RegistryParseError(`molecules[${i}]: expected an object`);
      }
      for (const field of ["name", "atoms", "category", "compatibleShells"] as const) {
        if (!(field in m)) {
          throw new RegistryParseError(`molecules[${i}]: missing required field "${field}"`);
        }
      }
    }

    // Validate shell items
    const shells = obj.shells as Record<string, unknown>[];
    for (let i = 0; i < shells.length; i++) {
      const s = shells[i];
      if (!s || typeof s !== "object") {
        throw new RegistryParseError(`shells[${i}]: expected an object`);
      }
      for (const field of ["name", "compatibleAtomCategories", "compatibleMoleculeCategories"] as const) {
        if (!(field in s)) {
          throw new RegistryParseError(`shells[${i}]: missing required field "${field}"`);
        }
      }
    }

    // Validate theme items
    const themes = obj.themes as Record<string, unknown>[];
    for (let i = 0; i < themes.length; i++) {
      const t = themes[i];
      if (!t || typeof t !== "object") {
        throw new RegistryParseError(`themes[${i}]: expected an object`);
      }
      for (const field of ["name", "bg", "textPrimary", "accent"] as const) {
        if (!(field in t)) {
          throw new RegistryParseError(`themes[${i}]: missing required field "${field}"`);
        }
      }
    }

    // Validate combination items
    const combinations = obj.combinations as Record<string, unknown>[];
    for (let i = 0; i < combinations.length; i++) {
      const c = combinations[i];
      if (!c || typeof c !== "object") {
        throw new RegistryParseError(`combinations[${i}]: expected an object`);
      }
      for (const field of ["id", "template", "shell", "theme"] as const) {
        if (!(field in c)) {
          throw new RegistryParseError(`combinations[${i}]: missing required field "${field}"`);
        }
      }
    }

    // Build the registry - bypass registerAtom/registerMolecule/registerShell
    // to avoid repeated recalculateCombinations calls. We restore combinations
    // directly from the serialized data.
    const registry = new CompositionRegistry();

    for (const a of atoms) {
      const atomMeta = a as unknown as AtomMeta;
      registry.atoms.set(atomMeta.name, atomMeta);
    }

    for (const m of molecules) {
      const molMeta = m as unknown as MoleculeMeta;
      registry.molecules.set(molMeta.name, molMeta);
    }

    for (const s of shells) {
      const shellMeta = s as unknown as ShellMeta;
      registry.shells.set(shellMeta.name, shellMeta);
    }

    // Restore constraints directly
    registry.constraints = obj.constraints as ConstraintMap;

    // Restore themes
    const themesRecord: Record<string, Theme> = {};
    for (const t of themes) {
      const theme = t as unknown as Theme;
      themesRecord[theme.name] = theme;
    }
    registry.themes = themesRecord;

    // Restore combinations directly (already validated)
    registry.combinations = combinations as unknown as Combination[];

    // Restore templates if present (backward-compatible)
    if (Array.isArray(obj.templates)) {
      for (const t of obj.templates as Record<string, unknown>[]) {
        const tmpl = t as unknown as TemplateMeta;
        registry.templates.set(tmpl.name, tmpl);
      }
    }

    return registry;
  }
}

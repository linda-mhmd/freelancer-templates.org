/**
 * Molecule Registry Core - extracted to break circular dependency.
 *
 * Molecule .tsx files import from HERE (not from ./index) so that
 * MOLECULE_REGISTRY is guaranteed to be initialised before any
 * registerMolecule() call runs.
 */

// ── Categories ──────────────────────────────────────────────────
export type MoleculeCategory =
  | "stats"       // StatRow, MetricRow
  | "content"     // TestimonialCard, FAQItem, FeatureCard
  | "navigation"  // StepCard, TimelineEntry, NavItem
  | "pricing"     // PricingTier, ComparisonRow
  | "social";     // QuoteBlock, ReviewCard, ProfileCard

// ── Molecule Metadata ───────────────────────────────────────────
export interface MoleculeMeta {
  name: string;
  atoms: string[];                 // atom names used in this molecule
  compatibleShells: string[];
  category: MoleculeCategory;
}

// ── Global Registry ─────────────────────────────────────────────
export const MOLECULE_REGISTRY: Map<string, MoleculeMeta> = new Map();

/**
 * Register a Molecule in the global registry.
 * Returns the provided meta for chaining convenience.
 */
export function registerMolecule(meta: MoleculeMeta): MoleculeMeta {
  MOLECULE_REGISTRY.set(meta.name, meta);
  return meta;
}

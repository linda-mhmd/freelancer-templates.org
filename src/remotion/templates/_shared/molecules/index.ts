/**
 * Molecule Registry - Barrel file
 *
 * Molecules are composed groups of Atoms that form recognizable UI patterns.
 * Each Molecule declares which Atoms it uses and which Shells it's compatible with.
 *
 * Registry core (types, Map, registerMolecule) lives in ./registry-core.ts
 * to break the circular-dependency that occurs when molecule files import
 * from this barrel while this barrel re-exports from those same files.
 */

// Re-export registry core so external consumers keep the same import path
export {
  type MoleculeCategory,
  type MoleculeMeta,
  MOLECULE_REGISTRY,
  registerMolecule,
} from "./registry-core";

// ── Molecule Re-exports (trigger self-registration) ─────────────
export { StatRowMolecule } from "./StatRowMolecule";
export { TestimonialCardMolecule } from "./TestimonialCardMolecule";
export { PricingTierMolecule } from "./PricingTierMolecule";
export { FAQItemMolecule } from "./FAQItemMolecule";
export { TimelineEntryMolecule } from "./TimelineEntryMolecule";
export { MetricRowMolecule } from "./MetricRowMolecule";
export { ComparisonRowMolecule } from "./ComparisonRowMolecule";
export { QuoteBlockMolecule } from "./QuoteBlockMolecule";
export { ReviewCardMolecule } from "./ReviewCardMolecule";
export { StepCardMolecule } from "./StepCardMolecule";
export { FeatureCardMolecule } from "./FeatureCardMolecule";
export { ProfileCardMolecule } from "./ProfileCardMolecule";
export { CTABannerMolecule } from "./CTABannerMolecule";
export { NavItemMolecule } from "./NavItemMolecule";
export { DataTableRowMolecule } from "./DataTableRowMolecule";

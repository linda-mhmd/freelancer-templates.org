/**
 * Composition Registry - Fully populated registry index.
 *
 * Builds and exports a populated CompositionRegistry and AgentAPI
 * with all atoms, molecules, shells, and themes.
 *
 * NOTE: Atom and molecule metadata is declared inline here rather than
 * imported from the barrel files (atoms/index.ts, molecules/index.ts)
 * to avoid circular dependency issues caused by self-registration at
 * module evaluation time. The metadata is static and mirrors what each
 * atom/molecule file registers.
 *
 * Requirements covered: 1.4, 1.5, 3.4
 */

import { CompositionRegistry, type ShellMeta, type TemplateMeta } from "./CompositionRegistry";
import { AgentAPI } from "../api/agentApi";
import { buildFullThemeRegistry } from "../themes/themeRegistry";
import type { AtomMeta, AtomCategory } from "../atoms/registry-core";
import type { MoleculeMeta, MoleculeCategory } from "../molecules/registry-core";

// ── Category Constants ──────────────────────────────────────────

const ALL_ATOM_CATEGORIES: AtomCategory[] = [
  "data-display", "typography", "decoration", "media", "interactive",
];

const ALL_MOLECULE_CATEGORIES: MoleculeCategory[] = [
  "stats", "content", "navigation", "pricing", "social",
];

// ── Shell Names (for convenience) ───────────────────────────────

const ALL_SHELLS = [
  "HeroStatShell", "CardGridShell", "TimelineShell", "PipelineShell",
  "SplitPanelShell", "CategoryGroupShell", "StatusBoardShell",
  "ListDetailShell", "ComparisonShell", "ContributorShell",
];

// ── Shell Metadata (10 shells from shells.tsx) ──────────────────

const SHELL_METADATA: ShellMeta[] = [
  {
    name: "HeroStatShell",
    compatibleAtomCategories: ["data-display", "typography", "decoration"],
    compatibleMoleculeCategories: ["stats", "content", "social"],
    maxChildren: 6,
  },
  {
    name: "CardGridShell",
    compatibleAtomCategories: ALL_ATOM_CATEGORIES,
    compatibleMoleculeCategories: ALL_MOLECULE_CATEGORIES,
    maxChildren: 9,
  },
  {
    name: "TimelineShell",
    compatibleAtomCategories: ["data-display", "typography", "decoration"],
    compatibleMoleculeCategories: ["navigation", "content", "stats"],
    maxChildren: 8,
  },
  {
    name: "PipelineShell",
    compatibleAtomCategories: ["data-display", "typography", "interactive"],
    compatibleMoleculeCategories: ["navigation", "stats", "content"],
    maxChildren: 6,
  },
  {
    name: "SplitPanelShell",
    compatibleAtomCategories: ALL_ATOM_CATEGORIES,
    compatibleMoleculeCategories: ALL_MOLECULE_CATEGORIES,
    maxChildren: 2,
  },
  {
    name: "CategoryGroupShell",
    compatibleAtomCategories: ["data-display", "typography", "decoration"],
    compatibleMoleculeCategories: ["content", "stats", "pricing", "social"],
    maxChildren: 8,
  },
  {
    name: "StatusBoardShell",
    compatibleAtomCategories: ["data-display", "typography", "decoration"],
    compatibleMoleculeCategories: ["stats", "content"],
    maxChildren: 6,
  },
  {
    name: "ListDetailShell",
    compatibleAtomCategories: ALL_ATOM_CATEGORIES,
    compatibleMoleculeCategories: ALL_MOLECULE_CATEGORIES,
    maxChildren: 10,
  },
  {
    name: "ComparisonShell",
    compatibleAtomCategories: ["data-display", "typography", "interactive"],
    compatibleMoleculeCategories: ["pricing", "stats", "content"],
    maxChildren: 2,
  },
  {
    name: "ContributorShell",
    compatibleAtomCategories: ["data-display", "typography", "media"],
    compatibleMoleculeCategories: ["social", "content", "stats"],
    maxChildren: 8,
  },
];

// ── Atom Metadata (33 atoms, mirrors individual atom file registrations) ──

const ATOM_METADATA: AtomMeta[] = [
  // data-display atoms
  { name: "CountUp", category: "data-display", compatibleShells: ["HeroStatShell", "CardGridShell", "StatusBoardShell", "ComparisonShell", "SplitPanelShell", "ListDetailShell"], requiredProps: ["target"], defaultProps: { target: 0, suffix: "", duration: 60 } },
  { name: "ProgressBar", category: "data-display", compatibleShells: ["HeroStatShell", "CardGridShell", "StatusBoardShell", "ListDetailShell", "SplitPanelShell", "ComparisonShell"], requiredProps: ["value"], defaultProps: { value: 0, max: 100 } },
  { name: "StatusBadge", category: "data-display", compatibleShells: ["CardGridShell", "ListDetailShell", "StatusBoardShell", "TimelineShell", "PipelineShell", "ContributorShell"], requiredProps: ["status"], defaultProps: { status: "active" } },
  { name: "StarRating", category: "data-display", compatibleShells: ["CardGridShell", "ListDetailShell", "ContributorShell", "SplitPanelShell"], requiredProps: ["rating"], defaultProps: { rating: 0, maxStars: 5 } },
  { name: "MetricCard", category: "data-display", compatibleShells: ["HeroStatShell", "CardGridShell", "StatusBoardShell", "ListDetailShell", "SplitPanelShell", "ComparisonShell"], requiredProps: ["label", "value"], defaultProps: { label: "", value: 0 } },
  { name: "BarChart", category: "data-display", compatibleShells: ["HeroStatShell", "CardGridShell", "SplitPanelShell", "ComparisonShell", "ListDetailShell", "StatusBoardShell"], requiredProps: ["bars"], defaultProps: { bars: [] } },
  { name: "DonutChart", category: "data-display", compatibleShells: ["HeroStatShell", "CardGridShell", "SplitPanelShell", "StatusBoardShell", "ListDetailShell", "ComparisonShell"], requiredProps: ["segments"], defaultProps: { segments: [] } },
  { name: "Sparkline", category: "data-display", compatibleShells: ["HeroStatShell", "CardGridShell", "StatusBoardShell", "ListDetailShell", "SplitPanelShell"], requiredProps: ["data"], defaultProps: { data: [] } },
  { name: "NumberStat", category: "data-display", compatibleShells: ["HeroStatShell", "CardGridShell", "StatusBoardShell", "ComparisonShell", "SplitPanelShell", "ListDetailShell"], requiredProps: ["value"], defaultProps: { value: 0 } },
  { name: "PercentChange", category: "data-display", compatibleShells: ["HeroStatShell", "CardGridShell", "StatusBoardShell", "ComparisonShell", "SplitPanelShell", "ListDetailShell"], requiredProps: ["value"], defaultProps: { value: 0 } },
  { name: "CircleProgress", category: "data-display", compatibleShells: ["HeroStatShell", "CardGridShell", "StatusBoardShell", "ListDetailShell", "PipelineShell"], requiredProps: ["value"], defaultProps: { value: 0 } },
  { name: "Checkmark", category: "data-display", compatibleShells: ["CardGridShell", "TimelineShell", "PipelineShell", "StatusBoardShell", "ListDetailShell", "ComparisonShell"], requiredProps: [], defaultProps: { checked: true } },
  // typography atoms
  { name: "Heading", category: "typography", compatibleShells: ALL_SHELLS, requiredProps: ["text"], defaultProps: { text: "", level: 1 } },
  { name: "Label", category: "typography", compatibleShells: ALL_SHELLS, requiredProps: ["text"], defaultProps: { text: "" } },
  { name: "QuoteMarks", category: "typography", compatibleShells: ["CardGridShell", "SplitPanelShell", "ListDetailShell", "ContributorShell"], requiredProps: [], defaultProps: {} },
  { name: "SectionTitle", category: "typography", compatibleShells: ALL_SHELLS, requiredProps: ["text"], defaultProps: { text: "" } },
  { name: "Subtitle", category: "typography", compatibleShells: ALL_SHELLS, requiredProps: ["text"], defaultProps: { text: "" } },
  { name: "CodeBlock", category: "typography", compatibleShells: ["CardGridShell", "SplitPanelShell", "ListDetailShell", "ComparisonShell"], requiredProps: ["code"], defaultProps: { code: "" } },
  { name: "TagList", category: "typography", compatibleShells: ["CardGridShell", "ListDetailShell", "ContributorShell", "SplitPanelShell", "CategoryGroupShell"], requiredProps: ["tags"], defaultProps: { tags: [] } },

  // decoration atoms
  { name: "BackgroundGrid", category: "decoration", compatibleShells: ALL_SHELLS, requiredProps: [], defaultProps: { opacity: 0.04 } },
  { name: "GradientBadge", category: "decoration", compatibleShells: ALL_SHELLS, requiredProps: ["text"], defaultProps: { text: "", fontSize: 11 } },
  { name: "GlassCard", category: "decoration", compatibleShells: ["HeroStatShell", "CardGridShell", "TimelineShell", "PipelineShell", "SplitPanelShell", "CategoryGroupShell", "StatusBoardShell", "ListDetailShell", "ComparisonShell", "ContributorShell"], requiredProps: [], defaultProps: {} },
  { name: "TimelineDot", category: "decoration", compatibleShells: ["TimelineShell", "PipelineShell", "ListDetailShell"], requiredProps: [], defaultProps: { size: 12 } },
  { name: "IconBadge", category: "decoration", compatibleShells: ["CardGridShell", "ListDetailShell", "CategoryGroupShell", "SplitPanelShell", "HeroStatShell", "ContributorShell"], requiredProps: ["icon"], defaultProps: { icon: "★" } },
  { name: "Divider", category: "decoration", compatibleShells: ALL_SHELLS, requiredProps: [], defaultProps: {} },
  { name: "PillTag", category: "decoration", compatibleShells: ["CardGridShell", "ListDetailShell", "ContributorShell", "SplitPanelShell", "CategoryGroupShell", "HeroStatShell"], requiredProps: ["text"], defaultProps: { text: "" } },
  { name: "ArrowIndicator", category: "decoration", compatibleShells: ["HeroStatShell", "CardGridShell", "TimelineShell", "PipelineShell", "SplitPanelShell", "ListDetailShell", "ComparisonShell"], requiredProps: [], defaultProps: { direction: "right" } },
  { name: "RankBadge", category: "decoration", compatibleShells: ["CardGridShell", "ListDetailShell", "ContributorShell", "StatusBoardShell"], requiredProps: ["rank"], defaultProps: { rank: 1 } },
  { name: "HighlightBox", category: "decoration", compatibleShells: ["CardGridShell", "SplitPanelShell", "ListDetailShell", "HeroStatShell", "StatusBoardShell"], requiredProps: [], defaultProps: {} },
  { name: "GlowDot", category: "decoration", compatibleShells: ALL_SHELLS, requiredProps: [], defaultProps: { size: 8 } },
  // media atoms
  { name: "WaveformBars", category: "media", compatibleShells: ["HeroStatShell", "CardGridShell", "SplitPanelShell", "StatusBoardShell", "ListDetailShell", "ContributorShell"], requiredProps: [], defaultProps: { barCount: 32 } },
  { name: "BrandLogo", category: "media", compatibleShells: ALL_SHELLS, requiredProps: [], defaultProps: { text: "Brand" } },
  { name: "Avatar", category: "media", compatibleShells: ["CardGridShell", "ListDetailShell", "ContributorShell", "StatusBoardShell"], requiredProps: [], defaultProps: { initials: "?" } },

  // interactive atoms
  { name: "StepIndicator", category: "interactive", compatibleShells: ["PipelineShell", "TimelineShell", "ListDetailShell", "CardGridShell", "SplitPanelShell"], requiredProps: ["step", "total"], defaultProps: { step: 1, total: 5 } },
  { name: "ComparisonTable", category: "interactive", compatibleShells: ["ComparisonShell", "SplitPanelShell", "CardGridShell", "ListDetailShell"], requiredProps: ["rows"], defaultProps: { rows: [] } },
];

// ── Molecule Metadata (15 molecules, mirrors individual molecule file registrations) ──

const MOLECULE_METADATA: MoleculeMeta[] = [
  // stats molecules
  { name: "StatRow", atoms: ["CountUp", "Label"], category: "stats", compatibleShells: ["HeroStatShell", "CardGridShell", "StatusBoardShell", "ComparisonShell", "SplitPanelShell"] },
  { name: "MetricRow", atoms: ["NumberStat", "Label", "PercentChange"], category: "stats", compatibleShells: ["HeroStatShell", "StatusBoardShell", "ListDetailShell", "ComparisonShell", "SplitPanelShell"] },
  { name: "DataTableRow", atoms: ["Label", "StatusBadge"], category: "stats", compatibleShells: ["StatusBoardShell", "ListDetailShell", "ComparisonShell", "CardGridShell"] },

  // content molecules
  { name: "TestimonialCard", atoms: ["QuoteMarks", "Label", "Avatar"], category: "content", compatibleShells: ["CardGridShell", "SplitPanelShell", "ListDetailShell", "ContributorShell"] },
  { name: "FAQItem", atoms: ["Heading", "Label", "ArrowIndicator"], category: "content", compatibleShells: ["CardGridShell", "ListDetailShell", "CategoryGroupShell"] },
  { name: "FeatureCard", atoms: ["IconBadge", "Heading", "Label"], category: "content", compatibleShells: ["CardGridShell", "CategoryGroupShell", "SplitPanelShell", "HeroStatShell"] },
  { name: "CTABanner", atoms: ["Heading", "GradientBadge", "Label"], category: "content", compatibleShells: ["HeroStatShell", "SplitPanelShell", "CardGridShell"] },

  // navigation molecules
  { name: "TimelineEntry", atoms: ["TimelineDot", "Heading", "Label"], category: "navigation", compatibleShells: ["TimelineShell", "PipelineShell", "ListDetailShell"] },
  { name: "StepCard", atoms: ["StepIndicator", "Heading", "Label"], category: "navigation", compatibleShells: ["PipelineShell", "TimelineShell", "ListDetailShell", "CardGridShell"] },
  { name: "NavItem", atoms: ["IconBadge", "Label", "ArrowIndicator"], category: "navigation", compatibleShells: ["PipelineShell", "CategoryGroupShell", "ListDetailShell", "SplitPanelShell"] },

  // pricing molecules
  { name: "PricingTier", atoms: ["Heading", "Label", "Checkmark", "GradientBadge"], category: "pricing", compatibleShells: ["CardGridShell", "ComparisonShell", "SplitPanelShell"] },
  { name: "ComparisonRow", atoms: ["Label", "Checkmark"], category: "pricing", compatibleShells: ["ComparisonShell", "CardGridShell", "ListDetailShell"] },

  // social molecules
  { name: "QuoteBlock", atoms: ["QuoteMarks", "Label", "Divider"], category: "social", compatibleShells: ["CardGridShell", "SplitPanelShell", "ListDetailShell", "ContributorShell"] },
  { name: "ReviewCard", atoms: ["StarRating", "Label", "Avatar"], category: "social", compatibleShells: ["CardGridShell", "ListDetailShell", "ContributorShell", "SplitPanelShell"] },
  { name: "ProfileCard", atoms: ["Avatar", "Heading", "Label", "PillTag"], category: "social", compatibleShells: ["ContributorShell", "CardGridShell", "ListDetailShell", "SplitPanelShell"] },
];

// ── Build Registry ──────────────────────────────────────────────

function buildPopulatedRegistry(): CompositionRegistry {
  const reg = new CompositionRegistry();

  // 1. Register all shells (populates constraint map)
  for (const shellMeta of SHELL_METADATA) {
    reg.registerShell(shellMeta);
  }

  // 2. Load the unified theme registry (7 hand-crafted + 60 generated)
  const allThemes = buildFullThemeRegistry();
  reg.setThemes(allThemes);

  // 3. Register all atoms (bulk-set to avoid repeated recalculation)
  for (const atomMeta of ATOM_METADATA) {
    reg.atoms.set(atomMeta.name, atomMeta);
  }

  // 4. Register all molecules (bulk-set to avoid repeated recalculation)
  for (const molMeta of MOLECULE_METADATA) {
    reg.molecules.set(molMeta.name, molMeta);
  }

  // 5. Recalculate combinations once with everything loaded
  reg.recalculateCombinations();

  // 6. Register high-level templates with journal category mappings
  const TEMPLATE_METADATA: TemplateMeta[] = [
    {
      name: "ThoughtLeadership",
      layouts: ["editorial", "narrative", "keynote"],
      compatibleShells: ["ListDetailShell", "CardGridShell", "HeroStatShell"],
      journalCategories: ["reflective-essay", "blog-post", "opinion-piece", "personal-reflection"],
    },
    {
      name: "ConceptPitch",
      layouts: ["arc", "board", "brief"],
      compatibleShells: ["PipelineShell", "StatusBoardShell", "HeroStatShell"],
      journalCategories: ["idea-brainstorm", "concept-proposal", "internal-pitch", "automation-concept"],
    },
  ];

  for (const tmpl of TEMPLATE_METADATA) {
    reg.registerTemplate(tmpl);
  }

  return reg;
}

// ── Exports ─────────────────────────────────────────────────────

/** Fully populated CompositionRegistry with all atoms, molecules, shells, and themes. */
export const registry: CompositionRegistry = buildPopulatedRegistry();

/** AgentAPI instance wrapping the populated registry. */
export const agentApi: AgentAPI = new AgentAPI(registry);

/** Total number of valid combinations in the registry. */
export const COMBINATION_COUNT: number = registry.combinations.length;

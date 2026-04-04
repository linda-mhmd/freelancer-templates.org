/**
 * Atom Registry - Barrel File
 *
 * Re-exports registry core (types, ATOM_REGISTRY, registerAtom) from
 * registry-core.ts to break circular dependencies, then re-exports
 * all Atom components which self-register on import.
 */

// ── Registry core (no circular deps) ────────────────────────────
export {
  ATOM_REGISTRY,
  registerAtom,
  type AtomCategory,
  type AtomMeta,
  type AtomProps,
} from "./registry-core";

// ── Atom Re-exports (trigger self-registration) ────────────────
// Wrapper atoms (existing components)
export { CountUpAtom } from "./CountUpAtom";
export { GlassCardAtom } from "./GlassCardAtom";
export { GradientBadgeAtom } from "./GradientBadgeAtom";
export { StarRatingAtom } from "./StarRatingAtom";
export { QuoteMarksAtom } from "./QuoteMarksAtom";
export { BackgroundGridAtom } from "./BackgroundGridAtom";
export { ProgressBarAtom } from "./ProgressBarAtom";
export { StatusBadgeAtom } from "./StatusBadgeAtom";
export { TimelineDotAtom } from "./TimelineDotAtom";
export { WaveformBarsAtom } from "./WaveformBarsAtom";
export { BrandLogoAtom } from "./BrandLogoAtom";
export { StepIndicatorAtom } from "./StepIndicatorAtom";
export { ComparisonTableAtom } from "./ComparisonTableAtom";

// New atoms
export { HeadingAtom } from "./HeadingAtom";
export { LabelAtom } from "./LabelAtom";
export { MetricCardAtom } from "./MetricCardAtom";
export { IconBadgeAtom } from "./IconBadgeAtom";
export { DividerAtom } from "./DividerAtom";
export { SectionTitleAtom } from "./SectionTitleAtom";
export { SubtitleAtom } from "./SubtitleAtom";
export { PillTagAtom } from "./PillTagAtom";
export { AvatarAtom } from "./AvatarAtom";
export { CheckmarkAtom } from "./CheckmarkAtom";
export { ArrowIndicatorAtom } from "./ArrowIndicatorAtom";
export { SparklineAtom } from "./SparklineAtom";
export { BarChartAtom } from "./BarChartAtom";
export { DonutChartAtom } from "./DonutChartAtom";
export { RankBadgeAtom } from "./RankBadgeAtom";
export { HighlightBoxAtom } from "./HighlightBoxAtom";
export { CodeBlockAtom } from "./CodeBlockAtom";
export { NumberStatAtom } from "./NumberStatAtom";
export { PercentChangeAtom } from "./PercentChangeAtom";
export { CircleProgressAtom } from "./CircleProgressAtom";
export { TagListAtom } from "./TagListAtom";
export { GlowDotAtom } from "./GlowDotAtom";

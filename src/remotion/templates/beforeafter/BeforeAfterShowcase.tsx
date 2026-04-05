/**
 * Before/After Showcase - Pre-configured compositions for each layout × theme combo.
 *
 * 6 showcases: 3 layouts × 2 featured themes (dark, warm)
 * Duration: 270 frames (9s at 30fps)
 *
 * REGISTERED COMPOSITIONS:
 *   BeforeAfterDarkSplitScreen     - Dark theme, split-screen layout
 *   BeforeAfterWarmSplitScreen     - Warm theme, split-screen layout
 *   BeforeAfterDarkRevealWipe      - Dark theme, reveal-wipe layout
 *   BeforeAfterWarmRevealWipe      - Warm theme, reveal-wipe layout
 *   BeforeAfterDarkMetricsCompare  - Dark theme, metrics-compare layout
 *   BeforeAfterWarmMetricsCompare  - Warm theme, metrics-compare layout
 */

import React from "react";
import { BeforeAfter } from "./BeforeAfter";
import type { BeforeAfterSpec } from "./BeforeAfter";
import {
  THEME_DARK,
  THEME_WARM,
  BrandKit,
  applyBrandKit,
  THEME_OCEAN, THEME_SUNSET, THEME_FOREST, THEME_ROSE, THEME_GOLD, THEME_MIDNIGHT, THEME_CRIMSON, THEME_LAVENDER, THEME_ARCTIC, THEME_ESPRESSO
} from "../_shared/themes"

// ── Sample Data: Fitness Transformation ─────────────────────────
const SAMPLE_SPEC_FITNESS: BeforeAfterSpec = {
  title: "12-Week Fitness Transformation",
  before_label: "Week 1",
  after_label: "Week 12",
  description: "Real results from a structured training and nutrition program",
  metrics: [
    { label: "Body Fat", before: 28, after: 18, suffix: "%" },
    { label: "Bench Press", before: 135, after: 225, suffix: " lbs" },
    { label: "Mile Time", before: 10, after: 7, suffix: " min" },
  ],
};

// ── Sample Data: Business Growth ────────────────────────────────
const SAMPLE_SPEC_BUSINESS: BeforeAfterSpec = {
  title: "E-Commerce Store Redesign Results",
  before_label: "Before Redesign",
  after_label: "After Redesign",
  description: "How a UX overhaul transformed key business metrics in 90 days",
  metrics: [
    { label: "Conversion Rate", before: 2, after: 8, suffix: "%" },
    { label: "Avg Order Value", before: 45, after: 78, suffix: "$" },
    { label: "Bounce Rate", before: 65, after: 32, suffix: "%" },
    { label: "Monthly Revenue", before: 12, after: 47, suffix: "k" },
  ],
};

// ── Composition: Dark + Split Screen ────────────────────────────
export const BeforeAfterDarkSplitScreen: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <BeforeAfter spec={SAMPLE_SPEC_FITNESS} theme={applyBrandKit(THEME_DARK, brandKit)} layout="split-screen" />
);

// ── Composition: Warm + Split Screen ────────────────────────────
export const BeforeAfterWarmSplitScreen: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <BeforeAfter spec={SAMPLE_SPEC_FITNESS} theme={applyBrandKit(THEME_WARM, brandKit)} layout="split-screen" />
);

// ── Composition: Dark + Reveal Wipe ─────────────────────────────
export const BeforeAfterDarkRevealWipe: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <BeforeAfter spec={SAMPLE_SPEC_BUSINESS} theme={applyBrandKit(THEME_DARK, brandKit)} layout="reveal-wipe" />
);

// ── Composition: Warm + Reveal Wipe ─────────────────────────────
export const BeforeAfterWarmRevealWipe: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <BeforeAfter spec={SAMPLE_SPEC_BUSINESS} theme={applyBrandKit(THEME_WARM, brandKit)} layout="reveal-wipe" />
);

// ── Composition: Dark + Metrics Compare ─────────────────────────
export const BeforeAfterDarkMetricsCompare: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <BeforeAfter spec={SAMPLE_SPEC_BUSINESS} theme={applyBrandKit(THEME_DARK, brandKit)} layout="metrics-compare" />
);

// ── Composition: Warm + Metrics Compare ─────────────────────────
export const BeforeAfterWarmMetricsCompare: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <BeforeAfter spec={SAMPLE_SPEC_BUSINESS} theme={applyBrandKit(THEME_WARM, brandKit)} layout="metrics-compare" />
);

// ── Extended Themes ──────────────────────────────────────────────
export const BeforeAfterOceanSplitScreen: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <BeforeAfter spec={SAMPLE_SPEC_FITNESS} theme={applyBrandKit(THEME_OCEAN, brandKit)} layout="split-screen" bgPattern="grid" />
);
export const BeforeAfterSunsetSplitScreen: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <BeforeAfter spec={SAMPLE_SPEC_FITNESS} theme={applyBrandKit(THEME_SUNSET, brandKit)} layout="split-screen" bgPattern="none" />
);
export const BeforeAfterForestRevealWipe: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <BeforeAfter spec={SAMPLE_SPEC_BUSINESS} theme={applyBrandKit(THEME_FOREST, brandKit)} layout="reveal-wipe" bgPattern="hex" />
);
export const BeforeAfterRoseRevealWipe: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <BeforeAfter spec={SAMPLE_SPEC_BUSINESS} theme={applyBrandKit(THEME_ROSE, brandKit)} layout="reveal-wipe" bgPattern="dots" />
);
export const BeforeAfterGoldMetricsCompare: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <BeforeAfter spec={SAMPLE_SPEC_BUSINESS} theme={applyBrandKit(THEME_GOLD, brandKit)} layout="metrics-compare" bgPattern="none" />
);
export const BeforeAfterMidnightMetricsCompare: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <BeforeAfter spec={SAMPLE_SPEC_BUSINESS} theme={applyBrandKit(THEME_MIDNIGHT, brandKit)} layout="metrics-compare" bgPattern="grid" />
);
export const BeforeAfterCrimsonSplitScreen: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <BeforeAfter spec={SAMPLE_SPEC_FITNESS} theme={applyBrandKit(THEME_CRIMSON, brandKit)} layout="split-screen" bgPattern="none" />
);
export const BeforeAfterLavenderSplitScreen: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <BeforeAfter spec={SAMPLE_SPEC_FITNESS} theme={applyBrandKit(THEME_LAVENDER, brandKit)} layout="split-screen" bgPattern="hex" />
);
export const BeforeAfterArcticRevealWipe: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <BeforeAfter spec={SAMPLE_SPEC_BUSINESS} theme={applyBrandKit(THEME_ARCTIC, brandKit)} layout="reveal-wipe" bgPattern="dots" />
);
export const BeforeAfterEspressoRevealWipe: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <BeforeAfter spec={SAMPLE_SPEC_BUSINESS} theme={applyBrandKit(THEME_ESPRESSO, brandKit)} layout="reveal-wipe" bgPattern="none" />
);

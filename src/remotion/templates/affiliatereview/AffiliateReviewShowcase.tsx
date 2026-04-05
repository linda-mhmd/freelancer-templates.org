/**
 * Affiliate Review Showcase - Pre-configured compositions for each layout × theme combo.
 *
 * 6 showcases: 3 layouts × 2 featured themes (dark, bold)
 * Duration: 270 frames (9s at 30fps)
 *
 * REGISTERED COMPOSITIONS:
 *   AffiliateReviewDarkScorecard    - Dark theme, scorecard layout
 *   AffiliateReviewBoldScorecard    - Bold theme, scorecard layout
 *   AffiliateReviewDarkComparison   - Dark theme, comparison layout
 *   AffiliateReviewBoldComparison   - Bold theme, comparison layout
 *   AffiliateReviewDarkVerdict      - Dark theme, verdict layout
 *   AffiliateReviewBoldVerdict      - Bold theme, verdict layout
 */

import React from "react";
import { AffiliateReview } from "./AffiliateReview";
import type { AffiliateReviewSpec } from "./AffiliateReview";
import {
  THEME_DARK,
  THEME_BOLD,
  BrandKit,
  applyBrandKit,
  THEME_OCEAN, THEME_SUNSET, THEME_FOREST, THEME_ROSE, THEME_GOLD, THEME_MIDNIGHT, THEME_CRIMSON, THEME_LAVENDER, THEME_ARCTIC, THEME_ESPRESSO
} from "../_shared/themes"

// ── Sample Data: Wireless Headphones Review ─────────────────────
const SAMPLE_SPEC_HEADPHONES: AffiliateReviewSpec = {
  product_name: "SoundPro X1 Wireless Headphones",
  rating: 4,
  pros: [
    "40-hour battery life",
    "Active noise cancellation",
    "Premium build quality",
    "Multipoint Bluetooth 5.3",
  ],
  cons: [
    "No wired audio option",
    "Bulky carrying case",
  ],
  verdict: "Best-in-class ANC headphones for frequent travelers and remote workers.",
  cta: "Get 25% Off Today",
};

// ── Sample Data: Project Management Tool Review ─────────────────
const SAMPLE_SPEC_SOFTWARE: AffiliateReviewSpec = {
  product_name: "TaskFlow Pro - Project Management",
  rating: 5,
  pros: [
    "Intuitive drag-and-drop interface",
    "Real-time collaboration",
    "Unlimited integrations",
    "AI-powered task prioritization",
    "Generous free tier",
  ],
  cons: [
    "Steep learning curve for advanced features",
    "Mobile app lacks offline mode",
    "Custom reports require Pro plan",
  ],
  verdict: "The most complete project management solution for growing teams.",
  cta: "Start Free Trial",
};


// ── Composition: Dark + Scorecard ───────────────────────────────
export const AffiliateReviewDarkScorecard: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <AffiliateReview spec={SAMPLE_SPEC_HEADPHONES} theme={applyBrandKit(THEME_DARK, brandKit)} layout="scorecard" />
);

// ── Composition: Bold + Scorecard ───────────────────────────────
export const AffiliateReviewBoldScorecard: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <AffiliateReview spec={SAMPLE_SPEC_HEADPHONES} theme={applyBrandKit(THEME_BOLD, brandKit)} layout="scorecard" />
);

// ── Composition: Dark + Comparison ──────────────────────────────
export const AffiliateReviewDarkComparison: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <AffiliateReview spec={SAMPLE_SPEC_SOFTWARE} theme={applyBrandKit(THEME_DARK, brandKit)} layout="comparison" />
);

// ── Composition: Bold + Comparison ──────────────────────────────
export const AffiliateReviewBoldComparison: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <AffiliateReview spec={SAMPLE_SPEC_SOFTWARE} theme={applyBrandKit(THEME_BOLD, brandKit)} layout="comparison" />
);

// ── Composition: Dark + Verdict ─────────────────────────────────
export const AffiliateReviewDarkVerdict: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <AffiliateReview spec={SAMPLE_SPEC_SOFTWARE} theme={applyBrandKit(THEME_DARK, brandKit)} layout="verdict" />
);

// ── Composition: Bold + Verdict ─────────────────────────────────
export const AffiliateReviewBoldVerdict: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <AffiliateReview spec={SAMPLE_SPEC_SOFTWARE} theme={applyBrandKit(THEME_BOLD, brandKit)} layout="verdict" />
);

// ── Extended Themes ──────────────────────────────────────────────
export const AffiliateReviewOceanScorecard: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <AffiliateReview spec={SAMPLE_SPEC_HEADPHONES} theme={applyBrandKit(THEME_OCEAN, brandKit)} layout="scorecard" bgPattern="grid" />
);
export const AffiliateReviewSunsetScorecard: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <AffiliateReview spec={SAMPLE_SPEC_HEADPHONES} theme={applyBrandKit(THEME_SUNSET, brandKit)} layout="scorecard" bgPattern="none" />
);
export const AffiliateReviewForestComparison: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <AffiliateReview spec={SAMPLE_SPEC_SOFTWARE} theme={applyBrandKit(THEME_FOREST, brandKit)} layout="comparison" bgPattern="hex" />
);
export const AffiliateReviewRoseComparison: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <AffiliateReview spec={SAMPLE_SPEC_SOFTWARE} theme={applyBrandKit(THEME_ROSE, brandKit)} layout="comparison" bgPattern="dots" />
);
export const AffiliateReviewGoldVerdict: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <AffiliateReview spec={SAMPLE_SPEC_SOFTWARE} theme={applyBrandKit(THEME_GOLD, brandKit)} layout="verdict" bgPattern="none" />
);
export const AffiliateReviewMidnightVerdict: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <AffiliateReview spec={SAMPLE_SPEC_SOFTWARE} theme={applyBrandKit(THEME_MIDNIGHT, brandKit)} layout="verdict" bgPattern="grid" />
);
export const AffiliateReviewCrimsonScorecard: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <AffiliateReview spec={SAMPLE_SPEC_HEADPHONES} theme={applyBrandKit(THEME_CRIMSON, brandKit)} layout="scorecard" bgPattern="none" />
);
export const AffiliateReviewLavenderScorecard: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <AffiliateReview spec={SAMPLE_SPEC_HEADPHONES} theme={applyBrandKit(THEME_LAVENDER, brandKit)} layout="scorecard" bgPattern="hex" />
);
export const AffiliateReviewArcticComparison: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <AffiliateReview spec={SAMPLE_SPEC_SOFTWARE} theme={applyBrandKit(THEME_ARCTIC, brandKit)} layout="comparison" bgPattern="dots" />
);
export const AffiliateReviewEspressoComparison: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <AffiliateReview spec={SAMPLE_SPEC_SOFTWARE} theme={applyBrandKit(THEME_ESPRESSO, brandKit)} layout="comparison" bgPattern="none" />
);

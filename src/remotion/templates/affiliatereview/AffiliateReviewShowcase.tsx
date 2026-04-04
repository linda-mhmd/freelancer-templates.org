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
import { THEME_DARK, THEME_BOLD } from "../_shared/themes";

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
export const AffiliateReviewDarkScorecard: React.FC = () => (
  <AffiliateReview spec={SAMPLE_SPEC_HEADPHONES} theme={THEME_DARK} layout="scorecard" />
);

// ── Composition: Bold + Scorecard ───────────────────────────────
export const AffiliateReviewBoldScorecard: React.FC = () => (
  <AffiliateReview spec={SAMPLE_SPEC_HEADPHONES} theme={THEME_BOLD} layout="scorecard" />
);

// ── Composition: Dark + Comparison ──────────────────────────────
export const AffiliateReviewDarkComparison: React.FC = () => (
  <AffiliateReview spec={SAMPLE_SPEC_SOFTWARE} theme={THEME_DARK} layout="comparison" />
);

// ── Composition: Bold + Comparison ──────────────────────────────
export const AffiliateReviewBoldComparison: React.FC = () => (
  <AffiliateReview spec={SAMPLE_SPEC_SOFTWARE} theme={THEME_BOLD} layout="comparison" />
);

// ── Composition: Dark + Verdict ─────────────────────────────────
export const AffiliateReviewDarkVerdict: React.FC = () => (
  <AffiliateReview spec={SAMPLE_SPEC_SOFTWARE} theme={THEME_DARK} layout="verdict" />
);

// ── Composition: Bold + Verdict ─────────────────────────────────
export const AffiliateReviewBoldVerdict: React.FC = () => (
  <AffiliateReview spec={SAMPLE_SPEC_SOFTWARE} theme={THEME_BOLD} layout="verdict" />
);

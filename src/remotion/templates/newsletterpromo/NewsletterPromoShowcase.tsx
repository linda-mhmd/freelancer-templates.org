/**
 * Newsletter Promo Showcase - Pre-configured compositions for each layout × theme combo.
 *
 * 6 showcases: 3 layouts × 2 featured themes (dark, clean)
 * Duration: 270 frames (9s at 30fps)
 *
 * REGISTERED COMPOSITIONS:
 *   NewsletterPromoDarkSubscribeCta     - Dark theme, subscribe-cta layout
 *   NewsletterPromoCleanSubscribeCta    - Clean theme, subscribe-cta layout
 *   NewsletterPromoDarkIssuePreview     - Dark theme, issue-preview layout
 *   NewsletterPromoCleanIssuePreview    - Clean theme, issue-preview layout
 *   NewsletterPromoDarkTestimonialBlend - Dark theme, testimonial-blend layout
 *   NewsletterPromoCleanTestimonialBlend- Clean theme, testimonial-blend layout
 */

import React from "react";
import { NewsletterPromo } from "./NewsletterPromo";
import type { NewsletterPromoSpec } from "./NewsletterPromo";
import {
  THEME_DARK,
  THEME_CLEAN,
  BrandKit,
  applyBrandKit,
  THEME_OCEAN, THEME_SUNSET, THEME_FOREST, THEME_ROSE, THEME_GOLD, THEME_MIDNIGHT, THEME_CRIMSON, THEME_LAVENDER, THEME_ARCTIC, THEME_ESPRESSO
} from "../_shared/themes"

// ── Sample Data: Tech Newsletter ────────────────────────────────
const SAMPLE_SPEC_TECH: NewsletterPromoSpec = {
  newsletter_name: "The Weekly Dispatch",
  tagline: "Curated insights for modern builders - AI, cloud, and beyond",
  highlights: [
    { title: "AI in Production", description: "How top teams ship AI features 3x faster with structured prompts" },
    { title: "Remote Culture Playbook", description: "Building async-first teams that outperform co-located ones" },
    { title: "Cloud Cost Optimization", description: "5 strategies that saved startups $2M in annual AWS spend" },
    { title: "Developer Experience", description: "Why DX is the new competitive moat for platform teams" },
  ],
  subscriber_count: 25000,
  cta: "Subscribe Free",
};

// ── Sample Data: Creator Economy Newsletter ─────────────────────
const SAMPLE_SPEC_CREATOR: NewsletterPromoSpec = {
  newsletter_name: "Creator Fuel",
  tagline: "Weekly strategies for growing your audience and revenue",
  highlights: [
    { title: "Linda Mohamed, YouTuber", description: "This newsletter helped me double my sponsorship revenue in 6 months" },
    { title: "Linda Mohamed, Podcaster", description: "The monetization frameworks are pure gold - actionable every single week" },
    { title: "Mrs Lee G, Writer", description: "Finally a newsletter that understands the creator business model" },
  ],
  subscriber_count: 48000,
  cta: "Join 48k+ Creators",
};


// ── Composition: Dark + Subscribe CTA ───────────────────────────
export const NewsletterPromoDarkSubscribeCta: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <NewsletterPromo spec={SAMPLE_SPEC_TECH} theme={applyBrandKit(THEME_DARK, brandKit)} layout="subscribe-cta" />
);

// ── Composition: Clean + Subscribe CTA ──────────────────────────
export const NewsletterPromoCleanSubscribeCta: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <NewsletterPromo spec={SAMPLE_SPEC_TECH} theme={applyBrandKit(THEME_CLEAN, brandKit)} layout="subscribe-cta" />
);

// ── Composition: Dark + Issue Preview ───────────────────────────
export const NewsletterPromoDarkIssuePreview: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <NewsletterPromo spec={SAMPLE_SPEC_TECH} theme={applyBrandKit(THEME_DARK, brandKit)} layout="issue-preview" />
);

// ── Composition: Clean + Issue Preview ──────────────────────────
export const NewsletterPromoCleanIssuePreview: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <NewsletterPromo spec={SAMPLE_SPEC_TECH} theme={applyBrandKit(THEME_CLEAN, brandKit)} layout="issue-preview" />
);

// ── Composition: Dark + Testimonial Blend ───────────────────────
export const NewsletterPromoDarkTestimonialBlend: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <NewsletterPromo spec={SAMPLE_SPEC_CREATOR} theme={applyBrandKit(THEME_DARK, brandKit)} layout="testimonial-blend" />
);

// ── Composition: Clean + Testimonial Blend ──────────────────────
export const NewsletterPromoCleanTestimonialBlend: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <NewsletterPromo spec={SAMPLE_SPEC_CREATOR} theme={applyBrandKit(THEME_CLEAN, brandKit)} layout="testimonial-blend" />
);

// ── Extended Themes ──────────────────────────────────────────────
export const NewsletterPromoOceanSubscribeCta: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <NewsletterPromo spec={SAMPLE_SPEC_TECH} theme={applyBrandKit(THEME_OCEAN, brandKit)} layout="subscribe-cta" bgPattern="grid" />
);
export const NewsletterPromoSunsetSubscribeCta: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <NewsletterPromo spec={SAMPLE_SPEC_TECH} theme={applyBrandKit(THEME_SUNSET, brandKit)} layout="subscribe-cta" bgPattern="none" />
);
export const NewsletterPromoForestIssuePreview: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <NewsletterPromo spec={SAMPLE_SPEC_TECH} theme={applyBrandKit(THEME_FOREST, brandKit)} layout="issue-preview" bgPattern="hex" />
);
export const NewsletterPromoRoseIssuePreview: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <NewsletterPromo spec={SAMPLE_SPEC_TECH} theme={applyBrandKit(THEME_ROSE, brandKit)} layout="issue-preview" bgPattern="dots" />
);
export const NewsletterPromoGoldTestimonialBlend: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <NewsletterPromo spec={SAMPLE_SPEC_CREATOR} theme={applyBrandKit(THEME_GOLD, brandKit)} layout="testimonial-blend" bgPattern="none" />
);
export const NewsletterPromoMidnightTestimonialBlend: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <NewsletterPromo spec={SAMPLE_SPEC_CREATOR} theme={applyBrandKit(THEME_MIDNIGHT, brandKit)} layout="testimonial-blend" bgPattern="grid" />
);
export const NewsletterPromoCrimsonSubscribeCta: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <NewsletterPromo spec={SAMPLE_SPEC_TECH} theme={applyBrandKit(THEME_CRIMSON, brandKit)} layout="subscribe-cta" bgPattern="none" />
);
export const NewsletterPromoLavenderSubscribeCta: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <NewsletterPromo spec={SAMPLE_SPEC_TECH} theme={applyBrandKit(THEME_LAVENDER, brandKit)} layout="subscribe-cta" bgPattern="hex" />
);
export const NewsletterPromoArcticIssuePreview: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <NewsletterPromo spec={SAMPLE_SPEC_TECH} theme={applyBrandKit(THEME_ARCTIC, brandKit)} layout="issue-preview" bgPattern="dots" />
);
export const NewsletterPromoEspressoIssuePreview: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <NewsletterPromo spec={SAMPLE_SPEC_TECH} theme={applyBrandKit(THEME_ESPRESSO, brandKit)} layout="issue-preview" bgPattern="none" />
);

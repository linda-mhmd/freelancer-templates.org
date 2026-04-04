/**
 * Testimonial Showcase - Pre-configured compositions for each theme × layout combo.
 * 
 * These are ready-to-register compositions with sample data.
 * In production, the AgentCore crew would generate these dynamically
 * by passing a TestimonialSpec + theme name.
 * 
 * REGISTERED COMPOSITIONS:
 *   TestimonialDarkCentered     - Dark theme, centered layout
 *   TestimonialCleanSplit       - Clean/light theme, split layout
 *   TestimonialBoldEditorial    - Bold theme, editorial layout
 *   TestimonialWarmCentered     - Warm theme, centered layout
 *   TestimonialMinimalEditorial - Minimal theme, editorial layout
 *   TestimonialNeonSplit        - Neon theme, split layout
 */

import React from "react";
import { Testimonial } from "./Testimonial";
import type { TestimonialSpec } from "./Testimonial";
import {
  THEME_DARK,
  THEME_CLEAN,
  THEME_BOLD,
  THEME_WARM,
  THEME_MINIMAL,
  THEME_NEON,
} from "../_shared/themes";

// ── Sample Data ─────────────────────────────────────────────────
// Replace with real client data in production.
const SAMPLE_SPEC: TestimonialSpec = {
  client_name: "Mrs Lee G",
  client_title: "Head of Product",
  client_company: "TechFlow Inc.",
  quote: "Working with this team transformed our entire product pipeline. We shipped 3x faster and our users noticed the difference immediately.",
  rating: 5,
  project_type: "Product Strategy",
  freelancer_name: "Linda Mohamed",
  freelancer_title: "Product Consultant",
  cta_text: "Book a free consultation",
};

const SAMPLE_SPEC_SHORT: TestimonialSpec = {
  client_name: "Linda Mohamed",
  client_title: "CTO",
  client_company: "DataBridge",
  quote: "The best investment we made this year. Period.",
  rating: 5,
  project_type: "Cloud Architecture",
};

// ── Composition: Dark + Centered ────────────────────────────────
export const TestimonialDarkCentered: React.FC = () => (
  <Testimonial spec={SAMPLE_SPEC} theme={THEME_DARK} layout="centered" bgPattern="grid" />
);

// ── Composition: Clean + Split ──────────────────────────────────
export const TestimonialCleanSplit: React.FC = () => (
  <Testimonial spec={SAMPLE_SPEC} theme={THEME_CLEAN} layout="split" bgPattern="dots" />
);

// ── Composition: Bold + Editorial ───────────────────────────────
export const TestimonialBoldEditorial: React.FC = () => (
  <Testimonial spec={SAMPLE_SPEC_SHORT} theme={THEME_BOLD} layout="editorial" bgPattern="none" />
);

// ── Composition: Warm + Centered ────────────────────────────────
export const TestimonialWarmCentered: React.FC = () => (
  <Testimonial spec={SAMPLE_SPEC} theme={THEME_WARM} layout="centered" bgPattern="hex" />
);

// ── Composition: Minimal + Editorial ────────────────────────────
export const TestimonialMinimalEditorial: React.FC = () => (
  <Testimonial spec={SAMPLE_SPEC_SHORT} theme={THEME_MINIMAL} layout="editorial" bgPattern="none" />
);

// ── Composition: Neon + Split ───────────────────────────────────
export const TestimonialNeonSplit: React.FC = () => (
  <Testimonial spec={SAMPLE_SPEC} theme={THEME_NEON} layout="split" bgPattern="hex" />
);

/**
 * Product Launch Showcase - Pre-configured compositions for each layout × theme combo.
 *
 * 6 showcases: 3 layouts × 2 featured themes (dark, bold)
 * Duration: 270 frames (9s at 30fps)
 *
 * REGISTERED COMPOSITIONS:
 *   ProductLaunchDarkHeroReveal     - Dark theme, hero-reveal layout
 *   ProductLaunchBoldHeroReveal     - Bold theme, hero-reveal layout
 *   ProductLaunchDarkFeatureGrid    - Dark theme, feature-grid layout
 *   ProductLaunchBoldFeatureGrid    - Bold theme, feature-grid layout
 *   ProductLaunchDarkCountdown      - Dark theme, countdown layout
 *   ProductLaunchBoldCountdown      - Bold theme, countdown layout
 */

import React from "react";
import { ProductLaunch } from "./ProductLaunch";
import type { ProductLaunchSpec } from "./ProductLaunch";
import { THEME_DARK, THEME_BOLD } from "../_shared/themes";

// ── Sample Data ─────────────────────────────────────────────────
const SAMPLE_SPEC: ProductLaunchSpec = {
  title: "FlowBoard Pro",
  tagline: "The all-in-one project management tool for modern teams",
  features: [
    { label: "AI Task Prioritization", description: "Automatically rank tasks by impact and urgency using machine learning" },
    { label: "Real-Time Collaboration", description: "Work together with live cursors, comments, and instant sync" },
    { label: "Custom Workflows", description: "Build drag-and-drop pipelines tailored to your team's process" },
    { label: "Analytics Dashboard", description: "Track velocity, burndown, and team performance at a glance" },
  ],
  price: "$29/mo",
  cta: "Start Free Trial",
  launch_date: "2025-04-15",
};

const SAMPLE_SPEC_MINIMAL: ProductLaunchSpec = {
  title: "NightOwl VPN",
  tagline: "Browse privately. Stream freely. Stay protected.",
  features: [
    { label: "Zero-Log Policy", description: "We never store your browsing data" },
    { label: "500+ Servers", description: "Global coverage across 60 countries" },
    { label: "Lightning Fast", description: "WireGuard protocol for maximum speed" },
  ],
  price: "$4.99/mo",
  cta: "Get Protected Now",
};

// ── Composition: Dark + Hero Reveal ─────────────────────────────
export const ProductLaunchDarkHeroReveal: React.FC = () => (
  <ProductLaunch spec={SAMPLE_SPEC} theme={THEME_DARK} layout="hero-reveal" />
);

// ── Composition: Bold + Hero Reveal ─────────────────────────────
export const ProductLaunchBoldHeroReveal: React.FC = () => (
  <ProductLaunch spec={SAMPLE_SPEC} theme={THEME_BOLD} layout="hero-reveal" />
);

// ── Composition: Dark + Feature Grid ────────────────────────────
export const ProductLaunchDarkFeatureGrid: React.FC = () => (
  <ProductLaunch spec={SAMPLE_SPEC} theme={THEME_DARK} layout="feature-grid" />
);

// ── Composition: Bold + Feature Grid ────────────────────────────
export const ProductLaunchBoldFeatureGrid: React.FC = () => (
  <ProductLaunch spec={SAMPLE_SPEC} theme={THEME_BOLD} layout="feature-grid" />
);

// ── Composition: Dark + Countdown ───────────────────────────────
export const ProductLaunchDarkCountdown: React.FC = () => (
  <ProductLaunch spec={SAMPLE_SPEC_MINIMAL} theme={THEME_DARK} layout="countdown" />
);

// ── Composition: Bold + Countdown ───────────────────────────────
export const ProductLaunchBoldCountdown: React.FC = () => (
  <ProductLaunch spec={SAMPLE_SPEC_MINIMAL} theme={THEME_BOLD} layout="countdown" />
);

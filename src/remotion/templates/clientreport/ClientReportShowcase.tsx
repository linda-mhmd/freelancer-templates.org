/**
 * ClientReport Showcase - Pre-configured compositions for each theme.
 *
 * Each composition wraps ClientReport with a fixed theme and sample data.
 * In production, the AgentCore crew generates these dynamically from a
 * ClientReportSpec + theme name.
 *
 * PRIMARY VARIANTS (called out in the brief):
 *   ClientReportDarkDashboard  - Dark professional theme
 *   ClientReportBoldDashboard  - Bold / high-contrast theme
 *
 * ADDITIONAL THEMES (16 total, matching project convention):
 *   Clean, Warm, Minimal, Neon, Ocean, Sunset, Forest, Rose,
 *   Gold, Midnight, Crimson, Lavender, Arctic, Espresso
 */

import React from "react";
import { ClientReport } from "./ClientReport";
import type { ClientReportSpec } from "./ClientReport";
import {
  THEME_DARK,
  THEME_CLEAN,
  THEME_BOLD,
  THEME_WARM,
  THEME_MINIMAL,
  THEME_NEON,
  THEME_OCEAN,
  THEME_SUNSET,
  THEME_FOREST,
  THEME_ROSE,
  THEME_GOLD,
  THEME_MIDNIGHT,
  THEME_CRIMSON,
  THEME_LAVENDER,
  THEME_ARCTIC,
  THEME_ESPRESSO,
  BrandKit,
  applyBrandKit,
} from "../_shared/themes";

// ── Sample Data ─────────────────────────────────────────────────
// Realistic freelance consulting report — Q1 with strong results.
const SAMPLE_SPEC: ClientReportSpec = {
  title: "Client Performance Report",
  period: "Q1 2025",
  client_name: "Acme Corp",
  kpis: [
    {
      label: "Revenue Generated",
      value: 128,
      suffix: "k",
      change: 24,
      status: "up",
    },
    {
      label: "Active Users",
      value: 847,
      suffix: "",
      change: 18,
      status: "up",
    },
    {
      label: "Client Satisfaction",
      value: 96,
      suffix: "%",
      change: 4,
      status: "up",
    },
  ],
  summary:
    "An exceptional quarter across all key metrics. Revenue growth outpaced projections by 18%, driven by the redesigned onboarding flow shipped in February and the targeted email campaign that reached an industry-leading 41% open rate.",
  highlights: [
    "Launched redesigned checkout — drop-off reduced by 22%",
    "Email campaign hit 41% open rate, 2× the industry average",
    "Zero critical incidents for 87 consecutive days",
    "3 enterprise accounts upgraded to the premium tier",
  ],
  freelancer_name: "Linda Mohamed",
  freelancer_title: "Product & Growth Consultant",
};

// ── Primary Variants ────────────────────────────────────────────

/** Dark professional theme — the default project look. */
export const ClientReportDarkDashboard: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <ClientReport spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_DARK, brandKit)} bgPattern="grid" />
);

/** Bold / high-contrast theme — commands attention. */
export const ClientReportBoldDashboard: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <ClientReport spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_BOLD, brandKit)} bgPattern="dots" />
);

// ── Additional Theme Variants ────────────────────────────────────

export const ClientReportCleanDashboard: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <ClientReport spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_CLEAN, brandKit)} bgPattern="dots" />
);

export const ClientReportWarmDashboard: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <ClientReport spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_WARM, brandKit)} bgPattern="hex" />
);

export const ClientReportMinimalDashboard: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <ClientReport spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_MINIMAL, brandKit)} bgPattern="none" />
);

export const ClientReportNeonDashboard: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <ClientReport spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_NEON, brandKit)} bgPattern="grid" />
);

export const ClientReportOceanDashboard: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <ClientReport spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_OCEAN, brandKit)} bgPattern="grid" />
);

export const ClientReportSunsetDashboard: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <ClientReport spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_SUNSET, brandKit)} bgPattern="hex" />
);

export const ClientReportForestDashboard: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <ClientReport spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_FOREST, brandKit)} bgPattern="dots" />
);

export const ClientReportRoseDashboard: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <ClientReport spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_ROSE, brandKit)} bgPattern="none" />
);

export const ClientReportGoldDashboard: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <ClientReport spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_GOLD, brandKit)} bgPattern="hex" />
);

export const ClientReportMidnightDashboard: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <ClientReport spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_MIDNIGHT, brandKit)} bgPattern="grid" />
);

export const ClientReportCrimsonDashboard: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <ClientReport spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_CRIMSON, brandKit)} bgPattern="dots" />
);

export const ClientReportLavenderDashboard: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <ClientReport spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_LAVENDER, brandKit)} bgPattern="hex" />
);

export const ClientReportArcticDashboard: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <ClientReport spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_ARCTIC, brandKit)} bgPattern="dots" />
);

export const ClientReportEspressoDashboard: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <ClientReport spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_ESPRESSO, brandKit)} bgPattern="none" />
);

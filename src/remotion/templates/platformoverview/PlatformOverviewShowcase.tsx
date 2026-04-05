import React from "react";
import { PlatformOverview, PlatformOverviewSpec } from "./PlatformOverview";
import { BrandKit } from "../_shared/themes";

const BASE_SPEC: PlatformOverviewSpec = {
  platform_name: "Freelance Automation",
  tagline: "AI-powered freelance business operations",
  modules: [
    { name: "Video Generation", status: "completed", description: "Remotion + ElevenLabs pipeline", metric_label: "videos/mo", metric_value: 120 },
    { name: "Proposal Writer", status: "completed", description: "Claude-powered proposal drafting", metric_label: "proposals", metric_value: 45 },
    { name: "Invoice System", status: "in-progress", description: "Stripe integration + PDF export", metric_label: "invoices", metric_value: 89 },
    { name: "Agent Orchestration", status: "in-progress", description: "Multi-crew task routing", metric_label: "tasks/day", metric_value: 340 },
    { name: "S3 Media Store", status: "completed", description: "Presigned URL delivery", metric_label: "GB stored", metric_value: 28 },
    { name: "Bedrock Runtime", status: "on-track", description: "Claude model integration", metric_label: "calls/day", metric_value: 1500 },
  ],
  summary_stats: [
    { label: "Active Modules", value: 6 },
    { label: "API Calls / Day", value: 2400 },
    { label: "Uptime", value: 99, suffix: "%" },
  ],
};

export const PlatformOverviewCommandCenterDark: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <PlatformOverview spec={{ ...BASE_SPEC, layout: "command-center", theme: "dark" }} brandKit={brandKit} />;
export const PlatformOverviewCommandCenterNeon: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <PlatformOverview spec={{ ...BASE_SPEC, layout: "command-center", theme: "neon" }} brandKit={brandKit} />;
export const PlatformOverviewModuleGridDark: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <PlatformOverview spec={{ ...BASE_SPEC, layout: "module-grid", theme: "dark" }} brandKit={brandKit} />;
export const PlatformOverviewModuleGridNeon: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <PlatformOverview spec={{ ...BASE_SPEC, layout: "module-grid", theme: "neon" }} brandKit={brandKit} />;
export const PlatformOverviewStackDark: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <PlatformOverview spec={{ ...BASE_SPEC, layout: "stack", theme: "dark" }} brandKit={brandKit} />;
export const PlatformOverviewStackNeon: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <PlatformOverview spec={{ ...BASE_SPEC, layout: "stack", theme: "neon" }} brandKit={brandKit} />;

// ── Extended Themes ──────────────────────────────────────────────
export const PlatformOverviewOceanCommandCenter: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <PlatformOverview spec={{ ...BASE_SPEC, layout: "command-center", theme: "ocean" }} brandKit={brandKit} />;
export const PlatformOverviewSunsetCommandCenter: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <PlatformOverview spec={{ ...BASE_SPEC, layout: "command-center", theme: "sunset" }} brandKit={brandKit} />;
export const PlatformOverviewForestModuleGrid: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <PlatformOverview spec={{ ...BASE_SPEC, layout: "module-grid", theme: "forest" }} brandKit={brandKit} />;
export const PlatformOverviewRoseModuleGrid: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <PlatformOverview spec={{ ...BASE_SPEC, layout: "module-grid", theme: "rose" }} brandKit={brandKit} />;
export const PlatformOverviewGoldStack: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <PlatformOverview spec={{ ...BASE_SPEC, layout: "stack", theme: "gold" }} brandKit={brandKit} />;
export const PlatformOverviewMidnightStack: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <PlatformOverview spec={{ ...BASE_SPEC, layout: "stack", theme: "midnight" }} brandKit={brandKit} />;
export const PlatformOverviewCrimsonCommandCenter: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <PlatformOverview spec={{ ...BASE_SPEC, layout: "command-center", theme: "crimson" }} brandKit={brandKit} />;
export const PlatformOverviewLavenderCommandCenter: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <PlatformOverview spec={{ ...BASE_SPEC, layout: "command-center", theme: "lavender" }} brandKit={brandKit} />;
export const PlatformOverviewArcticModuleGrid: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <PlatformOverview spec={{ ...BASE_SPEC, layout: "module-grid", theme: "arctic" }} brandKit={brandKit} />;
export const PlatformOverviewEspressoModuleGrid: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <PlatformOverview spec={{ ...BASE_SPEC, layout: "module-grid", theme: "espresso" }} brandKit={brandKit} />;

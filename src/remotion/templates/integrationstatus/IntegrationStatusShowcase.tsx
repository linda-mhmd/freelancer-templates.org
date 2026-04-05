import React from "react";
import { IntegrationStatus, IntegrationStatusSpec } from "./IntegrationStatus";
import { BrandKit } from "../_shared/themes";

const BASE_SPEC: IntegrationStatusSpec = {
  board_title: "Freelance Automation - Integrations",
  integrations: [
    { service_name: "AWS Bedrock", status: "completed", category: "AI", last_sync: "2 min ago", uptime_percent: 99 },
    { service_name: "ElevenLabs", status: "completed", category: "AI", last_sync: "5 min ago", uptime_percent: 98 },
    { service_name: "Amazon S3", status: "completed", category: "Storage", last_sync: "1 min ago", uptime_percent: 100 },
    { service_name: "Stripe", status: "in-progress", category: "Payments", last_sync: "12 min ago", uptime_percent: 97 },
    { service_name: "SendGrid", status: "needs-attention", category: "Email", last_sync: "45 min ago", uptime_percent: 89 },
    { service_name: "GitHub Actions", status: "completed", category: "CI/CD", last_sync: "3 min ago", uptime_percent: 99 },
  ],
  summary: { total: 6, connected: 4, degraded: 1, disconnected: 1 },
};

export const IntegrationStatusStatusWallDark: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <IntegrationStatus spec={{ ...BASE_SPEC, layout: "status-wall", theme: "dark" }} brandKit={brandKit} />;
export const IntegrationStatusStatusWallClean: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <IntegrationStatus spec={{ ...BASE_SPEC, layout: "status-wall", theme: "clean" }} brandKit={brandKit} />;
export const IntegrationStatusCategoryGroupsDark: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <IntegrationStatus spec={{ ...BASE_SPEC, layout: "category-groups", theme: "dark" }} brandKit={brandKit} />;
export const IntegrationStatusCategoryGroupsClean: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <IntegrationStatus spec={{ ...BASE_SPEC, layout: "category-groups", theme: "clean" }} brandKit={brandKit} />;
export const IntegrationStatusHealthMonitorDark: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <IntegrationStatus spec={{ ...BASE_SPEC, layout: "health-monitor", theme: "dark" }} brandKit={brandKit} />;
export const IntegrationStatusHealthMonitorClean: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <IntegrationStatus spec={{ ...BASE_SPEC, layout: "health-monitor", theme: "clean" }} brandKit={brandKit} />;

// ── Extended Themes ──────────────────────────────────────────────
export const IntegrationStatusOceanStatusWall: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <IntegrationStatus spec={{ ...BASE_SPEC, layout: "status-wall", theme: "ocean" }} brandKit={brandKit} />;
export const IntegrationStatusSunsetStatusWall: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <IntegrationStatus spec={{ ...BASE_SPEC, layout: "status-wall", theme: "sunset" }} brandKit={brandKit} />;
export const IntegrationStatusForestCategoryGroups: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <IntegrationStatus spec={{ ...BASE_SPEC, layout: "category-groups", theme: "forest" }} brandKit={brandKit} />;
export const IntegrationStatusRoseCategoryGroups: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <IntegrationStatus spec={{ ...BASE_SPEC, layout: "category-groups", theme: "rose" }} brandKit={brandKit} />;
export const IntegrationStatusGoldHealthMonitor: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <IntegrationStatus spec={{ ...BASE_SPEC, layout: "health-monitor", theme: "gold" }} brandKit={brandKit} />;
export const IntegrationStatusMidnightHealthMonitor: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <IntegrationStatus spec={{ ...BASE_SPEC, layout: "health-monitor", theme: "midnight" }} brandKit={brandKit} />;
export const IntegrationStatusCrimsonStatusWall: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <IntegrationStatus spec={{ ...BASE_SPEC, layout: "status-wall", theme: "crimson" }} brandKit={brandKit} />;
export const IntegrationStatusLavenderStatusWall: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <IntegrationStatus spec={{ ...BASE_SPEC, layout: "status-wall", theme: "lavender" }} brandKit={brandKit} />;
export const IntegrationStatusArcticCategoryGroups: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <IntegrationStatus spec={{ ...BASE_SPEC, layout: "category-groups", theme: "arctic" }} brandKit={brandKit} />;
export const IntegrationStatusEspressoCategoryGroups: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <IntegrationStatus spec={{ ...BASE_SPEC, layout: "category-groups", theme: "espresso" }} brandKit={brandKit} />;

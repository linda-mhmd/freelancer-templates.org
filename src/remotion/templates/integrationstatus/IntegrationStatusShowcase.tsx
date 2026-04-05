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

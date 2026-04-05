import React from "react";
import { ClientPipeline, ClientPipelineSpec } from "./ClientPipeline";
import { BrandKit } from "../_shared/themes";

const BASE_SPEC: ClientPipelineSpec = {
  dashboard_title: "Freelance Automation - Client Pipeline",
  stages: [
    { stage_name: "Lead", count: 24, value: 180 },
    { stage_name: "Proposal", count: 12, value: 95 },
    { stage_name: "Negotiation", count: 6, value: 72 },
    { stage_name: "Closed", count: 4, value: 58 },
  ],
  total_revenue: 58,
  conversion_rate: 17,
  recent_deals: [
    { client_name: "Linda Mohamed", value: 15, status: "negotiation" },
    { client_name: "Linda Mohamed", value: 22, status: "proposal" },
    { client_name: "Mrs Lee G", value: 21, status: "closed" },
  ],
  time_period: "Q1 2026",
};

export const ClientPipelineFunnelDark: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <ClientPipeline spec={{ ...BASE_SPEC, layout: "funnel", theme: "dark" }} brandKit={brandKit} />;
export const ClientPipelineFunnelWarm: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <ClientPipeline spec={{ ...BASE_SPEC, layout: "funnel", theme: "warm" }} brandKit={brandKit} />;
export const ClientPipelinePipelineBoardDark: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <ClientPipeline spec={{ ...BASE_SPEC, layout: "pipeline-board", theme: "dark" }} brandKit={brandKit} />;
export const ClientPipelinePipelineBoardWarm: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <ClientPipeline spec={{ ...BASE_SPEC, layout: "pipeline-board", theme: "warm" }} brandKit={brandKit} />;
export const ClientPipelineMetricsDark: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <ClientPipeline spec={{ ...BASE_SPEC, layout: "metrics", theme: "dark" }} brandKit={brandKit} />;
export const ClientPipelineMetricsWarm: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <ClientPipeline spec={{ ...BASE_SPEC, layout: "metrics", theme: "warm" }} brandKit={brandKit} />;

// ── Extended Themes ──────────────────────────────────────────────
export const ClientPipelineOceanFunnel: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <ClientPipeline spec={{ ...BASE_SPEC, layout: "funnel", theme: "ocean" }} brandKit={brandKit} />;
export const ClientPipelineSunsetFunnel: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <ClientPipeline spec={{ ...BASE_SPEC, layout: "funnel", theme: "sunset" }} brandKit={brandKit} />;
export const ClientPipelineForestPipelineBoard: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <ClientPipeline spec={{ ...BASE_SPEC, layout: "pipeline-board", theme: "forest" }} brandKit={brandKit} />;
export const ClientPipelineRosePipelineBoard: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <ClientPipeline spec={{ ...BASE_SPEC, layout: "pipeline-board", theme: "rose" }} brandKit={brandKit} />;
export const ClientPipelineGoldMetrics: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <ClientPipeline spec={{ ...BASE_SPEC, layout: "metrics", theme: "gold" }} brandKit={brandKit} />;
export const ClientPipelineMidnightMetrics: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <ClientPipeline spec={{ ...BASE_SPEC, layout: "metrics", theme: "midnight" }} brandKit={brandKit} />;
export const ClientPipelineCrimsonFunnel: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <ClientPipeline spec={{ ...BASE_SPEC, layout: "funnel", theme: "crimson" }} brandKit={brandKit} />;
export const ClientPipelineLavenderFunnel: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <ClientPipeline spec={{ ...BASE_SPEC, layout: "funnel", theme: "lavender" }} brandKit={brandKit} />;
export const ClientPipelineArcticPipelineBoard: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <ClientPipeline spec={{ ...BASE_SPEC, layout: "pipeline-board", theme: "arctic" }} brandKit={brandKit} />;
export const ClientPipelineEspressoPipelineBoard: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <ClientPipeline spec={{ ...BASE_SPEC, layout: "pipeline-board", theme: "espresso" }} brandKit={brandKit} />;

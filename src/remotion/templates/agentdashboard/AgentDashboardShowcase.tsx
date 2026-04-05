import React from "react";
import { AgentDashboard, AgentDashboardSpec } from "./AgentDashboard";
import { BrandKit } from "../_shared/themes";

const BASE_SPEC: AgentDashboardSpec = {
  dashboard_title: "Freelance Automation - Agent Control",
  agents: [
    { name: "Video Crew", role: "Remotion + ElevenLabs", status: "in-progress", tasks_completed: 47, current_task: "Rendering Q4 report video" },
    { name: "Proposal Writer", role: "Claude proposal drafting", status: "completed", tasks_completed: 23, current_task: "Idle" },
    { name: "Invoice Crew", role: "Stripe + PDF generation", status: "in-progress", tasks_completed: 89, current_task: "Processing batch #12" },
    { name: "Orchestrator", role: "Multi-crew routing", status: "on-track", tasks_completed: 340, current_task: "Routing new request" },
  ],
  queue_stats: { pending: 12, processing: 3, completed: 156, failed: 2 },
  recent_completions: [
    { task_name: "Client proposal - Mrs Lee G", timestamp: "2 min ago" },
    { task_name: "Invoice #1089", timestamp: "8 min ago" },
  ],
};

export const AgentDashboardControlPanelDark: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <AgentDashboard spec={{ ...BASE_SPEC, layout: "control-panel", theme: "dark" }} brandKit={brandKit} />;
export const AgentDashboardControlPanelNeon: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <AgentDashboard spec={{ ...BASE_SPEC, layout: "control-panel", theme: "neon" }} brandKit={brandKit} />;
export const AgentDashboardFlowDark: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <AgentDashboard spec={{ ...BASE_SPEC, layout: "flow", theme: "dark" }} brandKit={brandKit} />;
export const AgentDashboardFlowNeon: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <AgentDashboard spec={{ ...BASE_SPEC, layout: "flow", theme: "neon" }} brandKit={brandKit} />;
export const AgentDashboardMatrixDark: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <AgentDashboard spec={{ ...BASE_SPEC, layout: "matrix", theme: "dark" }} brandKit={brandKit} />;
export const AgentDashboardMatrixNeon: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <AgentDashboard spec={{ ...BASE_SPEC, layout: "matrix", theme: "neon" }} brandKit={brandKit} />;

// ── Extended Themes ──────────────────────────────────────────────
export const AgentDashboardOceanControlPanel: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <AgentDashboard spec={{ ...BASE_SPEC, layout: "control-panel", theme: "ocean" }} brandKit={brandKit} />;
export const AgentDashboardSunsetControlPanel: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <AgentDashboard spec={{ ...BASE_SPEC, layout: "control-panel", theme: "sunset" }} brandKit={brandKit} />;
export const AgentDashboardForestFlow: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <AgentDashboard spec={{ ...BASE_SPEC, layout: "flow", theme: "forest" }} brandKit={brandKit} />;
export const AgentDashboardRoseFlow: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <AgentDashboard spec={{ ...BASE_SPEC, layout: "flow", theme: "rose" }} brandKit={brandKit} />;
export const AgentDashboardGoldMatrix: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <AgentDashboard spec={{ ...BASE_SPEC, layout: "matrix", theme: "gold" }} brandKit={brandKit} />;
export const AgentDashboardMidnightMatrix: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <AgentDashboard spec={{ ...BASE_SPEC, layout: "matrix", theme: "midnight" }} brandKit={brandKit} />;
export const AgentDashboardCrimsonControlPanel: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <AgentDashboard spec={{ ...BASE_SPEC, layout: "control-panel", theme: "crimson" }} brandKit={brandKit} />;
export const AgentDashboardLavenderControlPanel: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <AgentDashboard spec={{ ...BASE_SPEC, layout: "control-panel", theme: "lavender" }} brandKit={brandKit} />;
export const AgentDashboardArcticFlow: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <AgentDashboard spec={{ ...BASE_SPEC, layout: "flow", theme: "arctic" }} brandKit={brandKit} />;
export const AgentDashboardEspressoFlow: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <AgentDashboard spec={{ ...BASE_SPEC, layout: "flow", theme: "espresso" }} brandKit={brandKit} />;

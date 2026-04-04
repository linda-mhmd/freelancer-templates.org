import React from "react";
import { AgentDashboard, AgentDashboardSpec } from "./AgentDashboard";

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

export const AgentDashboardControlPanelDark: React.FC = () => <AgentDashboard spec={{ ...BASE_SPEC, layout: "control-panel", theme: "dark" }} />;
export const AgentDashboardControlPanelNeon: React.FC = () => <AgentDashboard spec={{ ...BASE_SPEC, layout: "control-panel", theme: "neon" }} />;
export const AgentDashboardFlowDark: React.FC = () => <AgentDashboard spec={{ ...BASE_SPEC, layout: "flow", theme: "dark" }} />;
export const AgentDashboardFlowNeon: React.FC = () => <AgentDashboard spec={{ ...BASE_SPEC, layout: "flow", theme: "neon" }} />;
export const AgentDashboardMatrixDark: React.FC = () => <AgentDashboard spec={{ ...BASE_SPEC, layout: "matrix", theme: "dark" }} />;
export const AgentDashboardMatrixNeon: React.FC = () => <AgentDashboard spec={{ ...BASE_SPEC, layout: "matrix", theme: "neon" }} />;

/**
 * Sprint Dashboard Showcase - 6 compositions (3 layouts × 2 themes)
 */

import React from "react";
import { SprintDashboard, SprintDashboardSpec } from "./SprintDashboard";

const BASE_SPEC: SprintDashboardSpec = {
  sprint_name: "Sprint 14 - Auth & Dashboard",
  sprint_number: 14,
  date_range: "Feb 10 – Feb 24, 2026",
  tasks_completed: 18,
  tasks_in_progress: 5,
  tasks_remaining: 3,
  velocity: 42,
  velocity_trend: "↑ 12% vs Sprint 13",
  team_members: [
    { name: "Linda Mohamed", allocation_percent: 85 },
    { name: "Linda Mohamed", allocation_percent: 70 },
    { name: "Mrs Lee G", allocation_percent: 90 },
  ],
  deliverables: [
    { title: "Auth Flow Redesign", status: "completed" },
    { title: "Dashboard Widgets", status: "in-progress" },
    { title: "API Rate Limiting", status: "in-progress" },
    { title: "User Preferences", status: "completed" },
    { title: "Notification System", status: "upcoming" },
    { title: "Search Indexing", status: "completed" },
  ],
};

export const SprintDashboardKanbanDark: React.FC = () => (
  <SprintDashboard spec={{ ...BASE_SPEC, layout: "kanban", theme: "dark" }} />
);
export const SprintDashboardKanbanBold: React.FC = () => (
  <SprintDashboard spec={{ ...BASE_SPEC, layout: "kanban", theme: "bold" }} />
);
export const SprintDashboardVelocityDark: React.FC = () => (
  <SprintDashboard spec={{ ...BASE_SPEC, layout: "velocity", theme: "dark" }} />
);
export const SprintDashboardVelocityBold: React.FC = () => (
  <SprintDashboard spec={{ ...BASE_SPEC, layout: "velocity", theme: "bold" }} />
);
export const SprintDashboardBurndownDark: React.FC = () => (
  <SprintDashboard spec={{ ...BASE_SPEC, layout: "burndown", theme: "dark" }} />
);
export const SprintDashboardBurndownBold: React.FC = () => (
  <SprintDashboard spec={{ ...BASE_SPEC, layout: "burndown", theme: "bold" }} />
);

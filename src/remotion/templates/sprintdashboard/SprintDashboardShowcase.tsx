/**
 * Sprint Dashboard Showcase - 6 compositions (3 layouts × 2 themes)
 */

import React from "react";
import { SprintDashboard, SprintDashboardSpec } from "./SprintDashboard";
import { BrandKit } from "../_shared/themes";

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

export const SprintDashboardKanbanDark: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <SprintDashboard spec={{ ...BASE_SPEC, layout: "kanban", theme: "dark" }} brandKit={brandKit} />
);
export const SprintDashboardKanbanBold: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <SprintDashboard spec={{ ...BASE_SPEC, layout: "kanban", theme: "bold" }} brandKit={brandKit} />
);
export const SprintDashboardVelocityDark: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <SprintDashboard spec={{ ...BASE_SPEC, layout: "velocity", theme: "dark" }} brandKit={brandKit} />
);
export const SprintDashboardVelocityBold: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <SprintDashboard spec={{ ...BASE_SPEC, layout: "velocity", theme: "bold" }} brandKit={brandKit} />
);
export const SprintDashboardBurndownDark: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <SprintDashboard spec={{ ...BASE_SPEC, layout: "burndown", theme: "dark" }} brandKit={brandKit} />
);
export const SprintDashboardBurndownBold: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <SprintDashboard spec={{ ...BASE_SPEC, layout: "burndown", theme: "bold" }} brandKit={brandKit} />
);

// ── Extended Themes ──────────────────────────────────────────────
export const SprintDashboardOceanKanban: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <SprintDashboard spec={{ ...BASE_SPEC, layout: "kanban", theme: "ocean" }} brandKit={brandKit} />;
export const SprintDashboardSunsetKanban: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <SprintDashboard spec={{ ...BASE_SPEC, layout: "kanban", theme: "sunset" }} brandKit={brandKit} />;
export const SprintDashboardForestVelocity: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <SprintDashboard spec={{ ...BASE_SPEC, layout: "velocity", theme: "forest" }} brandKit={brandKit} />;
export const SprintDashboardRoseVelocity: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <SprintDashboard spec={{ ...BASE_SPEC, layout: "velocity", theme: "rose" }} brandKit={brandKit} />;
export const SprintDashboardGoldBurndown: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <SprintDashboard spec={{ ...BASE_SPEC, layout: "burndown", theme: "gold" }} brandKit={brandKit} />;
export const SprintDashboardMidnightBurndown: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <SprintDashboard spec={{ ...BASE_SPEC, layout: "burndown", theme: "midnight" }} brandKit={brandKit} />;
export const SprintDashboardCrimsonKanban: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <SprintDashboard spec={{ ...BASE_SPEC, layout: "kanban", theme: "crimson" }} brandKit={brandKit} />;
export const SprintDashboardLavenderKanban: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <SprintDashboard spec={{ ...BASE_SPEC, layout: "kanban", theme: "lavender" }} brandKit={brandKit} />;
export const SprintDashboardArcticVelocity: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <SprintDashboard spec={{ ...BASE_SPEC, layout: "velocity", theme: "arctic" }} brandKit={brandKit} />;
export const SprintDashboardEspressoVelocity: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <SprintDashboard spec={{ ...BASE_SPEC, layout: "velocity", theme: "espresso" }} brandKit={brandKit} />;

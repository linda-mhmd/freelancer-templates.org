import React from "react";
import { ProjectHealth, ProjectHealthSpec } from "./ProjectHealth";
import { BrandKit } from "../_shared/themes";

const BASE_SPEC: ProjectHealthSpec = {
  project_name: "Freelance Automation",
  client_name: "Mrs Lee G",
  project_manager: "Linda Mohamed",
  health_status: "on-track",
  budget_total: 120000,
  budget_spent: 78000,
  timeline_start: "Sep 1, 2025",
  timeline_end: "Mar 31, 2026",
  completion_percent: 72,
  workstreams: [
    { name: "Video Engine", status: "on-track", progress_percent: 85 },
    { name: "Proposal System", status: "on-track", progress_percent: 70 },
    { name: "Billing Module", status: "needs-attention", progress_percent: 45 },
  ],
  risks: [
    { title: "Billing API integration delay", severity: "medium" },
    { title: "Third-party rate limit changes", severity: "low" },
  ],
};

export const ProjectHealthHealthScorecardDark: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <ProjectHealth spec={{ ...BASE_SPEC, layout: "health-scorecard", theme: "dark" }} brandKit={brandKit} />;
export const ProjectHealthHealthScorecardWarm: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <ProjectHealth spec={{ ...BASE_SPEC, layout: "health-scorecard", theme: "warm" }} brandKit={brandKit} />;
export const ProjectHealthWorkstreamViewDark: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <ProjectHealth spec={{ ...BASE_SPEC, layout: "workstream-view", theme: "dark" }} brandKit={brandKit} />;
export const ProjectHealthWorkstreamViewWarm: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <ProjectHealth spec={{ ...BASE_SPEC, layout: "workstream-view", theme: "warm" }} brandKit={brandKit} />;
export const ProjectHealthExecutiveSummaryDark: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <ProjectHealth spec={{ ...BASE_SPEC, layout: "executive-summary", theme: "dark" }} brandKit={brandKit} />;
export const ProjectHealthExecutiveSummaryWarm: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <ProjectHealth spec={{ ...BASE_SPEC, layout: "executive-summary", theme: "warm" }} brandKit={brandKit} />;

import React from "react";
import { BugTracker, BugTrackerSpec } from "./BugTracker";
import { BrandKit } from "../_shared/themes";

const BASE_SPEC: BugTrackerSpec = {
  project_name: "Sisy",
  time_period: "Feb 2026",
  severity_counts: { critical: 2, high: 8, medium: 15, low: 6 },
  status_counts: { open: 9, in_progress: 7, resolved: 12, closed: 3 },
  recent_bugs: [
    { title: "Auth token expiry crash", severity: "critical", assignee: "Linda Mohamed", status: "open" },
    { title: "Dashboard widget overlap", severity: "high", assignee: "Linda Mohamed", status: "in_progress" },
    { title: "API 500 on bulk export", severity: "critical", assignee: "Mrs Lee G", status: "in_progress" },
    { title: "Search index stale data", severity: "medium", assignee: "Linda Mohamed", status: "resolved" },
    { title: "Notification delay > 30s", severity: "high", assignee: "Linda Mohamed", status: "resolved" },
    { title: "CSS grid misalignment", severity: "low", assignee: "Mrs Lee G", status: "closed" },
  ],
  resolution_rate: 73,
};

export const BugTrackerSeverityMatrixDark: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <BugTracker spec={{ ...BASE_SPEC, layout: "severity-matrix", theme: "dark" }} brandKit={brandKit} />;
export const BugTrackerSeverityMatrixBold: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <BugTracker spec={{ ...BASE_SPEC, layout: "severity-matrix", theme: "bold" }} brandKit={brandKit} />;
export const BugTrackerTriageBoardDark: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <BugTracker spec={{ ...BASE_SPEC, layout: "triage-board", theme: "dark" }} brandKit={brandKit} />;
export const BugTrackerTriageBoardBold: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <BugTracker spec={{ ...BASE_SPEC, layout: "triage-board", theme: "bold" }} brandKit={brandKit} />;
export const BugTrackerOverviewDark: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <BugTracker spec={{ ...BASE_SPEC, layout: "overview", theme: "dark" }} brandKit={brandKit} />;
export const BugTrackerOverviewBold: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <BugTracker spec={{ ...BASE_SPEC, layout: "overview", theme: "bold" }} brandKit={brandKit} />;

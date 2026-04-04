/**
 * Recap Showcase - Pre-configured compositions for each theme × layout combo.
 * 
 * REGISTERED COMPOSITIONS:
 *   RecapDarkDashboard     - Dark theme, dashboard layout (stats grid + milestones)
 *   RecapCleanTimeline     - Clean/light theme, timeline layout
 *   RecapBoldCards         - Bold theme, cards layout
 *   RecapWarmDashboard     - Warm theme, dashboard layout
 *   RecapMinimalCards      - Minimal theme, cards layout
 *   RecapNeonTimeline      - Neon theme, timeline layout
 */

import React from "react";
import { Recap } from "./Recap";
import type { RecapSpec } from "./Recap";
import {
  THEME_DARK,
  THEME_CLEAN,
  THEME_BOLD,
  THEME_WARM,
  THEME_MINIMAL,
  THEME_NEON,
} from "../_shared/themes";

// ── Sample Data ─────────────────────────────────────────────────
const SAMPLE_SPEC: RecapSpec = {
  period: "January 2026",
  client_name: "TechFlow Inc.",
  highlights: [
    { label: "Tasks Completed", value: 24, suffix: "" },
    { label: "Hours Logged", value: 86, suffix: "h", progress: 72 },
    { label: "Client Satisfaction", value: 98, suffix: "%", progress: 98 },
    { label: "Revenue Generated", value: 12, suffix: "k" },
  ],
  milestones: [
    { title: "Project Kickoff", date: "Jan 3", status: "completed" },
    { title: "MVP Prototype", date: "Jan 10", status: "completed" },
    { title: "User Testing Round 1", date: "Jan 17", status: "completed" },
    { title: "API Integration", date: "Jan 24", status: "in-progress" },
    { title: "Production Deploy", date: "Feb 1", status: "upcoming" },
  ],
  next_steps: [
    "Finalize API documentation",
    "Complete user testing round 2",
    "Set up CI/CD pipeline",
    "Schedule stakeholder review",
  ],
  overall_status: "on-track",
  freelancer_name: "Linda Mohamed",
  cta_text: "View full report",
};

const SAMPLE_SPEC_SHORT: RecapSpec = {
  period: "Q4 2025",
  client_name: "DataBridge",
  highlights: [
    { label: "Features Shipped", value: 8, suffix: "" },
    { label: "Bugs Fixed", value: 47, suffix: "" },
    { label: "Uptime", value: 99, suffix: "%", progress: 99 },
  ],
  milestones: [
    { title: "Architecture Review", date: "Oct 5", status: "completed" },
    { title: "Database Migration", date: "Nov 12", status: "completed" },
    { title: "Performance Optimization", date: "Dec 8", status: "completed" },
    { title: "Security Audit", date: "Dec 20", status: "in-progress" },
  ],
  next_steps: [
    "Complete security audit findings",
    "Plan Q1 roadmap",
  ],
  overall_status: "ahead",
  cta_text: "Schedule review call",
};

// ── Composition: Dark + Dashboard ───────────────────────────────
export const RecapDarkDashboard: React.FC = () => (
  <Recap spec={SAMPLE_SPEC} theme={THEME_DARK} layout="dashboard" bgPattern="grid" />
);

// ── Composition: Clean + Timeline ───────────────────────────────
export const RecapCleanTimeline: React.FC = () => (
  <Recap spec={SAMPLE_SPEC} theme={THEME_CLEAN} layout="timeline" bgPattern="dots" />
);

// ── Composition: Bold + Cards ───────────────────────────────────
export const RecapBoldCards: React.FC = () => (
  <Recap spec={SAMPLE_SPEC_SHORT} theme={THEME_BOLD} layout="cards" bgPattern="none" />
);

// ── Composition: Warm + Dashboard ───────────────────────────────
export const RecapWarmDashboard: React.FC = () => (
  <Recap spec={SAMPLE_SPEC} theme={THEME_WARM} layout="dashboard" bgPattern="hex" />
);

// ── Composition: Minimal + Cards ────────────────────────────────
export const RecapMinimalCards: React.FC = () => (
  <Recap spec={SAMPLE_SPEC_SHORT} theme={THEME_MINIMAL} layout="cards" bgPattern="none" />
);

// ── Composition: Neon + Timeline ────────────────────────────────
export const RecapNeonTimeline: React.FC = () => (
  <Recap spec={SAMPLE_SPEC} theme={THEME_NEON} layout="timeline" bgPattern="hex" />
);

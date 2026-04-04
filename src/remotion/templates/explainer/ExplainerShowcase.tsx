/**
 * Explainer Showcase - Pre-configured compositions for each theme × layout combo.
 *
 * REGISTERED COMPOSITIONS:
 *   ExplainerDarkCinematic      - Dark theme, cinematic layout
 *   ExplainerCleanWhiteboard    - Clean theme, whiteboard layout
 *   ExplainerBoldProcess        - Bold theme, process layout
 *   ExplainerWarmWhiteboard     - Warm theme, whiteboard layout
 *   ExplainerMinimalProcess     - Minimal theme, process layout
 *   ExplainerNeonCinematic      - Neon theme, cinematic layout
 */

import React from "react";
import { Explainer } from "./Explainer";
import type { ExplainerSpec } from "./Explainer";
import {
  THEME_DARK,
  THEME_CLEAN,
  THEME_BOLD,
  THEME_WARM,
  THEME_MINIMAL,
  THEME_NEON,
} from "../_shared/themes";

// ── Sample Data: AI Consulting ──────────────────────────────────

const SAMPLE_AI_SPEC: ExplainerSpec = {
  service_name: "AI Automation Consulting",
  tagline: "I help businesses automate repetitive work with custom AI agents and workflows.",
  pain_points: [
    { icon: "⏰", text: "Teams waste 20+ hours/week on manual tasks" },
    { icon: "dollar", text: "Hiring more people doesn't scale" },
    { icon: "refresh", text: "Existing tools don't talk to each other" },
  ],
  solution_steps: [
    { number: 1, title: "Audit & Map", description: "I map your workflows and identify the highest-ROI automation opportunities" },
    { number: 2, title: "Build & Test", description: "Custom AI agents built with your tools - Slack, Notion, CRM, email" },
    { number: 3, title: "Deploy & Train", description: "Deployed to production with monitoring, docs, and team training" },
  ],
  results: [
    { stat: "60%", label: "Time Saved" },
    { stat: "3x", label: "Throughput" },
    { stat: "95%", label: "Satisfaction" },
  ],
  cta_text: "Book a Free Audit →",
};

// ── Sample Data: Web Development ────────────────────────────────

const SAMPLE_WEB_SPEC: ExplainerSpec = {
  service_name: "Full-Stack Web Development",
  tagline: "Modern, fast, accessible web apps built with Next.js, TypeScript, and AWS.",
  pain_points: [
    { icon: "clock", text: "Slow page loads killing conversions" },
    { icon: "smartphone", text: "Mobile experience is broken" },
    { icon: "lock", text: "Security vulnerabilities in legacy code" },
    { icon: "layers", text: "No CI/CD or automated testing" },
  ],
  solution_steps: [
    { number: 1, title: "Discovery", description: "Technical audit, user research, and architecture planning" },
    { number: 2, title: "Development", description: "Iterative sprints with weekly demos and feedback loops" },
    { number: 3, title: "Launch & Scale", description: "Production deployment with CDN, monitoring, and auto-scaling" },
  ],
  results: [
    { stat: "<2s", label: "Load Time" },
    { stat: "99.9%", label: "Uptime" },
    { stat: "40%", label: "More Conversions" },
  ],
  cta_text: "Start Your Project →",
};

// ── Composition: Dark + Cinematic ───────────────────────────────
export const ExplainerDarkCinematic: React.FC = () => (
  <Explainer spec={SAMPLE_AI_SPEC} theme={THEME_DARK} layout="cinematic" bgPattern="grid" />
);

// ── Composition: Clean + Whiteboard ─────────────────────────────
export const ExplainerCleanWhiteboard: React.FC = () => (
  <Explainer spec={SAMPLE_AI_SPEC} theme={THEME_CLEAN} layout="whiteboard" bgPattern="dots" />
);

// ── Composition: Bold + Process ─────────────────────────────────
export const ExplainerBoldProcess: React.FC = () => (
  <Explainer spec={SAMPLE_WEB_SPEC} theme={THEME_BOLD} layout="process" bgPattern="none" />
);

// ── Composition: Warm + Whiteboard ──────────────────────────────
export const ExplainerWarmWhiteboard: React.FC = () => (
  <Explainer spec={SAMPLE_WEB_SPEC} theme={THEME_WARM} layout="whiteboard" bgPattern="hex" />
);

// ── Composition: Minimal + Process ──────────────────────────────
export const ExplainerMinimalProcess: React.FC = () => (
  <Explainer spec={SAMPLE_AI_SPEC} theme={THEME_MINIMAL} layout="process" bgPattern="none" />
);

// ── Composition: Neon + Cinematic ───────────────────────────────
export const ExplainerNeonCinematic: React.FC = () => (
  <Explainer spec={SAMPLE_WEB_SPEC} theme={THEME_NEON} layout="cinematic" bgPattern="hex" />
);

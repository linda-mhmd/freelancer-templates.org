/**
 * Proposal Showcase — Pre-configured compositions for each theme × layout combo.
 *
 * REGISTERED COMPOSITIONS:
 *   ProposalDarkExecutive     — Dark theme, executive layout
 *   ProposalCleanCreative     — Clean theme, creative layout
 *   ProposalBoldPitch         — Bold theme, pitch layout
 *   ProposalWarmExecutive     — Warm theme, executive layout
 *   ProposalMinimalCreative   — Minimal theme, creative layout
 *   ProposalNeonPitch         — Neon theme, pitch layout
 */

import React from "react";
import { Proposal } from "./Proposal";
import type { ProposalSpec } from "./Proposal";
import {
  THEME_DARK,
  THEME_CLEAN,
  THEME_BOLD,
  THEME_WARM,
  THEME_MINIMAL,
  THEME_NEON,
} from "../_shared/themes";

// ── Sample Data ─────────────────────────────────────────────────

const SAMPLE_SPEC: ProposalSpec = {
  freelancer_name: "Linda Mohamed",
  freelancer_title: "AI & Cloud Consultant",
  client_name: "Mrs Lee G",
  project_title: "AI-Powered Customer Support Automation",
  problem_statement:
    "Your support team handles 500+ tickets/day manually. Response times average 4 hours. Customers are churning because they can't get fast answers.",
  solution_points: [
    {
      icon: "layers",
      title: "AI Triage Bot",
      description: "Auto-classify and route tickets by intent and urgency",
    },
    {
      icon: "zap",
      title: "Instant Responses",
      description: "Handle 60% of common questions with AI-generated answers",
    },
    {
      icon: "chart-bar",
      title: "Analytics Dashboard",
      description: "Real-time metrics on resolution time, satisfaction, and volume",
    },
  ],
  timeline: "4–6 weeks",
  budget_range: "$8,000 – $12,000",
  cta_text: "Let's Talk →",
};

const SAMPLE_SPEC_DESIGN: ProposalSpec = {
  freelancer_name: "Linda Mohamed",
  freelancer_title: "Full-Stack Developer",
  client_name: "Linda Mohamed",
  project_title: "E-Commerce Platform Redesign",
  problem_statement:
    "Your current site loads in 8+ seconds and has a 70% mobile bounce rate. The checkout flow loses 40% of users at step 3.",
  solution_points: [
    {
      icon: "palette",
      title: "Modern UI Overhaul",
      description: "Clean, fast interface built with Next.js and Tailwind",
    },
    {
      icon: "smartphone",
      title: "Mobile-First Design",
      description: "Responsive layouts optimized for thumb-friendly navigation",
    },
    {
      icon: "box",
      title: "Streamlined Checkout",
      description: "3-step checkout with Apple Pay, Google Pay, and Stripe",
    },
    {
      icon: "rocket",
      title: "Performance Boost",
      description: "Target sub-2s load time with edge caching and image optimization",
    },
  ],
  timeline: "6–8 weeks",
  budget_range: "$15,000 – $20,000",
  cta_text: "Start Project →",
};

// ── Composition: Dark + Executive ───────────────────────────────
export const ProposalDarkExecutive: React.FC = () => (
  <Proposal spec={SAMPLE_SPEC} theme={THEME_DARK} layout="executive" bgPattern="grid" />
);

// ── Composition: Clean + Creative ───────────────────────────────
export const ProposalCleanCreative: React.FC = () => (
  <Proposal spec={SAMPLE_SPEC} theme={THEME_CLEAN} layout="creative" bgPattern="dots" />
);

// ── Composition: Bold + Pitch ───────────────────────────────────
export const ProposalBoldPitch: React.FC = () => (
  <Proposal spec={SAMPLE_SPEC_DESIGN} theme={THEME_BOLD} layout="pitch" bgPattern="none" />
);

// ── Composition: Warm + Executive ───────────────────────────────
export const ProposalWarmExecutive: React.FC = () => (
  <Proposal spec={SAMPLE_SPEC} theme={THEME_WARM} layout="executive" bgPattern="hex" />
);

// ── Composition: Minimal + Creative ─────────────────────────────
export const ProposalMinimalCreative: React.FC = () => (
  <Proposal spec={SAMPLE_SPEC_DESIGN} theme={THEME_MINIMAL} layout="creative" bgPattern="none" />
);

// ── Composition: Neon + Pitch ───────────────────────────────────
export const ProposalNeonPitch: React.FC = () => (
  <Proposal spec={SAMPLE_SPEC_DESIGN} theme={THEME_NEON} layout="pitch" bgPattern="hex" />
);

/**
 * Milestone Showcase — Pre-configured compositions for each theme × layout combo.
 *
 * REGISTERED COMPOSITIONS:
 *   MilestoneDarkCelebration    — Dark theme, celebration layout
 *   MilestoneCleanJourney       — Clean theme, journey layout
 *   MilestoneBoldCelebration    — Bold theme, celebration layout
 *   MilestoneWarmGratitude      — Warm theme, gratitude layout
 *   MilestoneMinimalJourney     — Minimal theme, journey layout
 *   MilestoneNeonCelebration    — Neon theme, celebration layout
 */

import React from "react";
import { Milestone } from "./Milestone";
import type { MilestoneSpec } from "./Milestone";
import {
  THEME_DARK,
  THEME_CLEAN,
  THEME_BOLD,
  THEME_WARM,
  THEME_MINIMAL,
  THEME_NEON,
} from "../_shared/themes";

// ── Sample Data: 100 Clients ────────────────────────────────────

const SAMPLE_CLIENTS: MilestoneSpec = {
  headline: "100 Happy Clients!",
  subheadline: "From my first nervous Upwork proposal to building a thriving practice. Every project taught me something new.",
  achievement: { value: 100, label: "Clients Served", suffix: "+" },
  journey_points: [
    { title: "First Client", date: "Jan 2022", emoji: "arrow-up", description: "A simple WordPress site that changed everything" },
    { title: "Quit Day Job", date: "Aug 2022", emoji: "rocket", description: "Took the leap into full-time freelancing" },
    { title: "First $10k Month", date: "Mar 2023", emoji: "dollar", description: "Landed a major e-commerce rebuild" },
    { title: "50 Clients", date: "Nov 2024", emoji: "target", description: "Hired my first subcontractor" },
    { title: "100 Clients", date: "Feb 2026", emoji: "star", description: "And still loving every project" },
  ],
  thank_you_names: [
    "Mrs Lee G", "Linda Mohamed", "TechFlow", "StyleHouse", "DataPipe",
    "The Dev Community", "My Mentors", "Coffee",
  ],
  author_name: "Linda Mohamed",
  author_title: "Full-Stack Developer & Consultant",
  cta_text: "Let's build something together →",
};

// ── Sample Data: 1 Year Anniversary ─────────────────────────────

const SAMPLE_ANNIVERSARY: MilestoneSpec = {
  headline: "1 Year of Freelancing!",
  subheadline: "365 days of freedom, growth, and building things that matter. Here's to year two.",
  achievement: { value: 1, label: "Year of Independence", suffix: " yr" },
  journey_points: [
    { title: "Day 1: The Leap", date: "Feb 2025", emoji: "rocket", description: "Left corporate, started freelancing" },
    { title: "First Retainer Client", date: "Apr 2025", emoji: "handshake", description: "Stable income, less stress" },
    { title: "AWS Certification", date: "Jul 2025", emoji: "document", description: "Solutions Architect Professional" },
    { title: "Speaking at re:Invent", date: "Dec 2025", emoji: "mic", description: "From attendee to speaker" },
    { title: "Year 1 Complete", date: "Feb 2026", emoji: "star", description: "Revenue: 2.5× my old salary" },
  ],
  thank_you_names: [
    "AWS Community", "My First Client", "Dev Twitter", "Local Meetup Group",
    "Stack Overflow", "Open Source Contributors",
  ],
  author_name: "Linda Mohamed",
  author_title: "AI & Cloud Consultant",
  cta_text: "Follow my journey →",
};

// ── Compositions ────────────────────────────────────────────────

export const MilestoneDarkCelebration: React.FC = () => (
  <Milestone spec={SAMPLE_CLIENTS} theme={THEME_DARK} layout="celebration" bgPattern="grid" />
);

export const MilestoneCleanJourney: React.FC = () => (
  <Milestone spec={SAMPLE_ANNIVERSARY} theme={THEME_CLEAN} layout="journey" bgPattern="dots" />
);

export const MilestoneBoldCelebration: React.FC = () => (
  <Milestone spec={SAMPLE_CLIENTS} theme={THEME_BOLD} layout="celebration" bgPattern="none" />
);

export const MilestoneWarmGratitude: React.FC = () => (
  <Milestone spec={SAMPLE_CLIENTS} theme={THEME_WARM} layout="gratitude" bgPattern="hex" />
);

export const MilestoneMinimalJourney: React.FC = () => (
  <Milestone spec={SAMPLE_ANNIVERSARY} theme={THEME_MINIMAL} layout="journey" bgPattern="none" />
);

export const MilestoneNeonCelebration: React.FC = () => (
  <Milestone spec={SAMPLE_ANNIVERSARY} theme={THEME_NEON} layout="celebration" bgPattern="hex" />
);

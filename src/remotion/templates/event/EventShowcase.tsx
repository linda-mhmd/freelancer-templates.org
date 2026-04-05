/**
 * Event Showcase - Pre-configured compositions for each theme × layout combo.
 * 
 * REGISTERED COMPOSITIONS:
 *   EventDarkHero         - Dark theme, hero layout
 *   EventCleanSpeakers    - Clean theme, speakers layout
 *   EventBoldCountdown    - Bold theme, countdown layout
 *   EventWarmHero         - Warm theme, hero layout
 *   EventMinimalSpeakers  - Minimal theme, speakers layout
 *   EventNeonCountdown    - Neon theme, countdown layout
 */

import React from "react";
import { Event } from "./Event";
import type { EventSpec } from "./Event";
import {
  THEME_DARK,
  THEME_CLEAN,
  THEME_BOLD,
  THEME_WARM,
  THEME_MINIMAL,
  THEME_NEON,
  BrandKit,
  applyBrandKit,
  THEME_OCEAN, THEME_SUNSET, THEME_FOREST, THEME_ROSE, THEME_GOLD, THEME_MIDNIGHT, THEME_CRIMSON, THEME_LAVENDER, THEME_ARCTIC, THEME_ESPRESSO
} from "../_shared/themes"

// ── Sample Data ─────────────────────────────────────────────────
const SAMPLE_SPEC: EventSpec = {
  event_name: "AWS Community GameDay Europe",
  event_date: "March 15, 2026",
  event_location: "Vienna, Austria",
  event_type: "conference",
  description: "Join 200+ cloud professionals for a day of hands-on challenges, networking, and learning. Teams compete to solve real-world AWS scenarios.",
  speakers: [
    { name: "Linda Mohamed", title: "AI & Cloud Consultant" },
    { name: "Linda Mohamed", title: "Solutions Architect, AWS" },
    { name: "Mrs Lee G", title: "DevOps Lead, DataBridge" },
  ],
  stats: [
    { label: "Attendees", value: 200, suffix: "+" },
    { label: "User Groups", value: 57, suffix: "" },
    { label: "Countries", value: 12, suffix: "" },
  ],
  cta_text: "Register Now - Free",
};

const SAMPLE_SPEC_WORKSHOP: EventSpec = {
  event_name: "AI Agents Workshop",
  event_date: "April 5, 2026",
  event_location: "Online",
  event_type: "workshop",
  speakers: [
    { name: "Linda Mohamed", title: "Workshop Lead" },
    { name: "Linda Mohamed", title: "AI Engineer" },
  ],
  stats: [
    { label: "Spots Left", value: 15, suffix: "" },
    { label: "Hours", value: 4, suffix: "h" },
  ],
  cta_text: "Reserve Your Spot",
};

// ── Composition: Dark + Hero ────────────────────────────────────
export const EventDarkHero: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <Event spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_DARK, brandKit)} layout="hero" bgPattern="grid" />
);

// ── Composition: Clean + Speakers ───────────────────────────────
export const EventCleanSpeakers: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <Event spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_CLEAN, brandKit)} layout="speakers" bgPattern="dots" />
);

// ── Composition: Bold + Countdown ───────────────────────────────
export const EventBoldCountdown: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <Event spec={SAMPLE_SPEC_WORKSHOP} theme={applyBrandKit(THEME_BOLD, brandKit)} layout="countdown" bgPattern="none" />
);

// ── Composition: Warm + Hero ────────────────────────────────────
export const EventWarmHero: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <Event spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_WARM, brandKit)} layout="hero" bgPattern="hex" />
);

// ── Composition: Minimal + Speakers ─────────────────────────────
export const EventMinimalSpeakers: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <Event spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_MINIMAL, brandKit)} layout="speakers" bgPattern="none" />
);

// ── Composition: Neon + Countdown ───────────────────────────────
export const EventNeonCountdown: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <Event spec={SAMPLE_SPEC_WORKSHOP} theme={applyBrandKit(THEME_NEON, brandKit)} layout="countdown" bgPattern="hex" />
);

// ── Extended Themes ──────────────────────────────────────────────
export const EventOceanHero: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <Event spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_OCEAN, brandKit)} layout="hero" bgPattern="grid" />
);
export const EventSunsetSpeakers: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <Event spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_SUNSET, brandKit)} layout="speakers" bgPattern="none" />
);
export const EventForestCountdown: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <Event spec={SAMPLE_SPEC_WORKSHOP} theme={applyBrandKit(THEME_FOREST, brandKit)} layout="countdown" bgPattern="hex" />
);
export const EventRoseHero: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <Event spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_ROSE, brandKit)} layout="hero" bgPattern="dots" />
);
export const EventGoldSpeakers: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <Event spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_GOLD, brandKit)} layout="speakers" bgPattern="none" />
);
export const EventMidnightCountdown: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <Event spec={SAMPLE_SPEC_WORKSHOP} theme={applyBrandKit(THEME_MIDNIGHT, brandKit)} layout="countdown" bgPattern="grid" />
);
export const EventCrimsonHero: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <Event spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_CRIMSON, brandKit)} layout="hero" bgPattern="none" />
);
export const EventLavenderSpeakers: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <Event spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_LAVENDER, brandKit)} layout="speakers" bgPattern="hex" />
);
export const EventArcticCountdown: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <Event spec={SAMPLE_SPEC_WORKSHOP} theme={applyBrandKit(THEME_ARCTIC, brandKit)} layout="countdown" bgPattern="dots" />
);
export const EventEspressoHero: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <Event spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_ESPRESSO, brandKit)} layout="hero" bgPattern="none" />
);

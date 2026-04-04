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
} from "../_shared/themes";

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
export const EventDarkHero: React.FC = () => (
  <Event spec={SAMPLE_SPEC} theme={THEME_DARK} layout="hero" bgPattern="grid" />
);

// ── Composition: Clean + Speakers ───────────────────────────────
export const EventCleanSpeakers: React.FC = () => (
  <Event spec={SAMPLE_SPEC} theme={THEME_CLEAN} layout="speakers" bgPattern="dots" />
);

// ── Composition: Bold + Countdown ───────────────────────────────
export const EventBoldCountdown: React.FC = () => (
  <Event spec={SAMPLE_SPEC_WORKSHOP} theme={THEME_BOLD} layout="countdown" bgPattern="none" />
);

// ── Composition: Warm + Hero ────────────────────────────────────
export const EventWarmHero: React.FC = () => (
  <Event spec={SAMPLE_SPEC} theme={THEME_WARM} layout="hero" bgPattern="hex" />
);

// ── Composition: Minimal + Speakers ─────────────────────────────
export const EventMinimalSpeakers: React.FC = () => (
  <Event spec={SAMPLE_SPEC} theme={THEME_MINIMAL} layout="speakers" bgPattern="none" />
);

// ── Composition: Neon + Countdown ───────────────────────────────
export const EventNeonCountdown: React.FC = () => (
  <Event spec={SAMPLE_SPEC_WORKSHOP} theme={THEME_NEON} layout="countdown" bgPattern="hex" />
);

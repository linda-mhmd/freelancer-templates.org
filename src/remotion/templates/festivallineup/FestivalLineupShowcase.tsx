/**
 * Festival Lineup Showcase — 2 gradient variants
 *
 *   FestivalLineupNeonGradient → ID: FestivalLineup-NeonGradient
 *     purple (#7c3aed) → pink (#ec4899) overlay
 *
 *   FestivalLineupSunsetWarm   → ID: FestivalLineup-SunsetWarm
 *     orange (#f97316) → red (#ef4444) overlay
 *
 * 360 frames (12s) · 1080×1920 · 30fps
 */

import React from "react";
import { FestivalLineup } from "./FestivalLineup";

const SAMPLE_ARTISTS = [
  "HEADLINER ACT",
  "CO-HEADLINE",
  "ARTIST THREE",
  "ARTIST FOUR",
  "ARTIST FIVE",
  "SPECIAL GUEST",
];

// ── NeonGradient ─────────────────────────────────────────────────
export const FestivalLineupNeonGradient: React.FC = () => (
  <FestivalLineup
    festivalName="SOUND WAVE"
    tagline="2025 Edition"
    date="Aug 8–10, 2025"
    location="Riverside Park, Berlin"
    artists={SAMPLE_ARTISTS}
    gradientOverlay="linear-gradient(160deg, rgba(124,58,237,0.7) 0%, rgba(236,72,153,0.6) 100%)"
    accentColor="#ec4899"
    accentSecondary="#a855f7"
  />
);

// ── SunsetWarm ───────────────────────────────────────────────────
export const FestivalLineupSunsetWarm: React.FC = () => (
  <FestivalLineup
    festivalName="VOLTAGE"
    tagline="Electronic Weekend"
    date="Oct 18–19, 2025"
    location="Industrial Hall 7, Munich"
    artists={[
      "HEADLINER ACT",
      "MAIN STAGE",
      "ARTIST THREE",
      "ARTIST FOUR",
      "B2B SET",
      "CLOSING ACT",
    ]}
    gradientOverlay="linear-gradient(160deg, rgba(249,115,22,0.7) 0%, rgba(239,68,68,0.6) 100%)"
    accentColor="#f97316"
    accentSecondary="#ef4444"
  />
);

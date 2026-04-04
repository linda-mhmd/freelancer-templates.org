/**
 * Podcast Audiogram Showcase - Pre-configured compositions for each layout × theme combo.
 *
 * 6 showcases: 3 layouts × 2 featured themes (dark, warm)
 * Duration: 270 frames (9s at 30fps)
 *
 * REGISTERED COMPOSITIONS:
 *   PodcastAudiogramDarkWaveform     - Dark theme, waveform layout
 *   PodcastAudiogramWarmWaveform     - Warm theme, waveform layout
 *   PodcastAudiogramDarkQuoteCard    - Dark theme, quote-card layout
 *   PodcastAudiogramWarmQuoteCard    - Warm theme, quote-card layout
 *   PodcastAudiogramDarkEpisodePromo - Dark theme, episode-promo layout
 *   PodcastAudiogramWarmEpisodePromo - Warm theme, episode-promo layout
 */

import React from "react";
import { PodcastAudiogram } from "./PodcastAudiogram";
import type { PodcastAudiogramSpec } from "./PodcastAudiogram";
import { THEME_DARK, THEME_WARM } from "../_shared/themes";

// ── Sample Data: Tech Podcast ───────────────────────────────────
const SAMPLE_SPEC_TECH: PodcastAudiogramSpec = {
  episode_title: "The Future of AI Agents in Production",
  guest_name: "Linda Mohamed",
  quote: "Agents will replace 80% of manual workflows by 2027 - the question isn't if, but how gracefully we make the transition",
  episode_number: 42,
  podcast_name: "Build Things Podcast",
};

// ── Sample Data: Creator Podcast ────────────────────────────────
const SAMPLE_SPEC_CREATOR: PodcastAudiogramSpec = {
  episode_title: "From Side Hustle to Full-Time Creator",
  guest_name: "Mrs Lee G",
  quote: "The biggest mistake creators make is waiting for permission. Start shipping, start learning, start earning",
  episode_number: 87,
  podcast_name: "The Creator Lab",
};

// ── Composition: Dark + Waveform ────────────────────────────────
export const PodcastAudiogramDarkWaveform: React.FC = () => (
  <PodcastAudiogram spec={SAMPLE_SPEC_TECH} theme={THEME_DARK} layout="waveform" />
);

// ── Composition: Warm + Waveform ────────────────────────────────
export const PodcastAudiogramWarmWaveform: React.FC = () => (
  <PodcastAudiogram spec={SAMPLE_SPEC_TECH} theme={THEME_WARM} layout="waveform" />
);

// ── Composition: Dark + Quote Card ──────────────────────────────
export const PodcastAudiogramDarkQuoteCard: React.FC = () => (
  <PodcastAudiogram spec={SAMPLE_SPEC_CREATOR} theme={THEME_DARK} layout="quote-card" />
);

// ── Composition: Warm + Quote Card ──────────────────────────────
export const PodcastAudiogramWarmQuoteCard: React.FC = () => (
  <PodcastAudiogram spec={SAMPLE_SPEC_CREATOR} theme={THEME_WARM} layout="quote-card" />
);

// ── Composition: Dark + Episode Promo ───────────────────────────
export const PodcastAudiogramDarkEpisodePromo: React.FC = () => (
  <PodcastAudiogram spec={SAMPLE_SPEC_TECH} theme={THEME_DARK} layout="episode-promo" />
);

// ── Composition: Warm + Episode Promo ───────────────────────────
export const PodcastAudiogramWarmEpisodePromo: React.FC = () => (
  <PodcastAudiogram spec={SAMPLE_SPEC_CREATOR} theme={THEME_WARM} layout="episode-promo" />
);

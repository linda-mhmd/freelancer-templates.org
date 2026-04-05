/**
 * MusicVisualizer Showcase Compositions - 6 variants (3 layouts × 2 themes)
 */
import React from "react";
import { MusicVisualizer } from "./MusicVisualizer";
import {
  THEME_DARK,
  THEME_NEON,
  BrandKit,
  applyBrandKit,
  THEME_OCEAN, THEME_SUNSET, THEME_FOREST, THEME_ROSE, THEME_GOLD, THEME_MIDNIGHT, THEME_CRIMSON, THEME_LAVENDER, THEME_ARCTIC, THEME_ESPRESSO
} from "../_shared/themes"

const SAMPLE_SPEC = {
  track_title: "Neon Horizons",
  artist: "Synthwave Collective",
  album: "Digital Dreams",
  lyrics: [
    { text: "Racing through the neon night", startFrame: 40 },
    { text: "Chrome reflections burning bright", startFrame: 80 },
    { text: "Synthesizers fill the air", startFrame: 120 },
    { text: "Electric dreams everywhere", startFrame: 160 },
    { text: "We are the future now", startFrame: 200 },
  ],
  release_date: "2026",
};

export const MusicVisualizerDarkBars: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <MusicVisualizer spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_DARK, brandKit)} layout="bars" />
);
export const MusicVisualizerNeonBars: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <MusicVisualizer spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_NEON, brandKit)} layout="bars" />
);
export const MusicVisualizerDarkRadial: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <MusicVisualizer spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_DARK, brandKit)} layout="radial" />
);
export const MusicVisualizerNeonRadial: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <MusicVisualizer spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_NEON, brandKit)} layout="radial" />
);
export const MusicVisualizerDarkLyrics: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <MusicVisualizer spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_DARK, brandKit)} layout="lyrics" />
);
export const MusicVisualizerNeonLyrics: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <MusicVisualizer spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_NEON, brandKit)} layout="lyrics" />
);

// ── Extended Themes ──────────────────────────────────────────────
export const MusicVisualizerOceanBars: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <MusicVisualizer spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_OCEAN, brandKit)} layout="bars" bgPattern="grid" />
);
export const MusicVisualizerSunsetBars: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <MusicVisualizer spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_SUNSET, brandKit)} layout="bars" bgPattern="none" />
);
export const MusicVisualizerForestRadial: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <MusicVisualizer spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_FOREST, brandKit)} layout="radial" bgPattern="hex" />
);
export const MusicVisualizerRoseRadial: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <MusicVisualizer spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_ROSE, brandKit)} layout="radial" bgPattern="dots" />
);
export const MusicVisualizerGoldLyrics: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <MusicVisualizer spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_GOLD, brandKit)} layout="lyrics" bgPattern="none" />
);
export const MusicVisualizerMidnightLyrics: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <MusicVisualizer spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_MIDNIGHT, brandKit)} layout="lyrics" bgPattern="grid" />
);
export const MusicVisualizerCrimsonBars: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <MusicVisualizer spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_CRIMSON, brandKit)} layout="bars" bgPattern="none" />
);
export const MusicVisualizerLavenderBars: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <MusicVisualizer spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_LAVENDER, brandKit)} layout="bars" bgPattern="hex" />
);
export const MusicVisualizerArcticRadial: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <MusicVisualizer spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_ARCTIC, brandKit)} layout="radial" bgPattern="dots" />
);
export const MusicVisualizerEspressoRadial: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <MusicVisualizer spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_ESPRESSO, brandKit)} layout="radial" bgPattern="none" />
);

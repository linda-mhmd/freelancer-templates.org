/**
 * MusicVisualizer Showcase Compositions - 6 variants (3 layouts × 2 themes)
 */
import React from "react";
import { MusicVisualizer } from "./MusicVisualizer";
import { THEME_DARK, THEME_NEON } from "../_shared/themes";

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

export const MusicVisualizerDarkBars: React.FC = () => (
  <MusicVisualizer spec={SAMPLE_SPEC} theme={THEME_DARK} layout="bars" />
);
export const MusicVisualizerNeonBars: React.FC = () => (
  <MusicVisualizer spec={SAMPLE_SPEC} theme={THEME_NEON} layout="bars" />
);
export const MusicVisualizerDarkRadial: React.FC = () => (
  <MusicVisualizer spec={SAMPLE_SPEC} theme={THEME_DARK} layout="radial" />
);
export const MusicVisualizerNeonRadial: React.FC = () => (
  <MusicVisualizer spec={SAMPLE_SPEC} theme={THEME_NEON} layout="radial" />
);
export const MusicVisualizerDarkLyrics: React.FC = () => (
  <MusicVisualizer spec={SAMPLE_SPEC} theme={THEME_DARK} layout="lyrics" />
);
export const MusicVisualizerNeonLyrics: React.FC = () => (
  <MusicVisualizer spec={SAMPLE_SPEC} theme={THEME_NEON} layout="lyrics" />
);

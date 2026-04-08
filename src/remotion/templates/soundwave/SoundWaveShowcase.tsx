/**
 * Sound Wave Showcase - 16 themed compositions for the template library.
 *
 * Original inspiration: https://github.com/reactvideoeditor/remotion-templates
 * Adapted with full theme system + BrandKit support.
 */

import React from "react";
import { SoundWave } from "./SoundWave";
import type { SoundWaveSpec } from "./SoundWave";
import { SOUNDWAVE_SAMPLE } from "./SoundWave";
import {
  THEME_DARK,
  THEME_CLEAN,
  THEME_BOLD,
  THEME_WARM,
  THEME_MINIMAL,
  THEME_NEON,
  THEME_OCEAN,
  THEME_SUNSET,
  THEME_FOREST,
  THEME_ROSE,
  THEME_GOLD,
  THEME_MIDNIGHT,
  THEME_CRIMSON,
  THEME_LAVENDER,
  THEME_ARCTIC,
  THEME_ESPRESSO,
  BrandKit,
  applyBrandKit,
} from "../_shared/themes";

const SPEC = SOUNDWAVE_SAMPLE;

export const SoundWaveDark: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <SoundWave spec={SPEC} theme={applyBrandKit(THEME_DARK, brandKit)} />
);
export const SoundWaveClean: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <SoundWave spec={SPEC} theme={applyBrandKit(THEME_CLEAN, brandKit)} />
);
export const SoundWaveBold: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <SoundWave spec={SPEC} theme={applyBrandKit(THEME_BOLD, brandKit)} />
);
export const SoundWaveWarm: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <SoundWave spec={SPEC} theme={applyBrandKit(THEME_WARM, brandKit)} />
);
export const SoundWaveMinimal: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <SoundWave spec={SPEC} theme={applyBrandKit(THEME_MINIMAL, brandKit)} />
);
export const SoundWaveNeon: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <SoundWave spec={SPEC} theme={applyBrandKit(THEME_NEON, brandKit)} />
);
export const SoundWaveOcean: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <SoundWave spec={SPEC} theme={applyBrandKit(THEME_OCEAN, brandKit)} />
);
export const SoundWaveSunset: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <SoundWave spec={SPEC} theme={applyBrandKit(THEME_SUNSET, brandKit)} />
);
export const SoundWaveForest: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <SoundWave spec={SPEC} theme={applyBrandKit(THEME_FOREST, brandKit)} />
);
export const SoundWaveRose: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <SoundWave spec={SPEC} theme={applyBrandKit(THEME_ROSE, brandKit)} />
);
export const SoundWaveGold: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <SoundWave spec={SPEC} theme={applyBrandKit(THEME_GOLD, brandKit)} />
);
export const SoundWaveMidnight: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <SoundWave spec={SPEC} theme={applyBrandKit(THEME_MIDNIGHT, brandKit)} />
);
export const SoundWaveCrimson: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <SoundWave spec={SPEC} theme={applyBrandKit(THEME_CRIMSON, brandKit)} />
);
export const SoundWaveLavender: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <SoundWave spec={SPEC} theme={applyBrandKit(THEME_LAVENDER, brandKit)} />
);
export const SoundWaveArctic: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <SoundWave spec={SPEC} theme={applyBrandKit(THEME_ARCTIC, brandKit)} />
);
export const SoundWaveEspresso: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <SoundWave spec={SPEC} theme={applyBrandKit(THEME_ESPRESSO, brandKit)} />
);

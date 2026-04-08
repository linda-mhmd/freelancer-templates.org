/**
 * Liquid Wave Showcase - 16 themed compositions for the template library.
 *
 * Original inspiration: https://github.com/reactvideoeditor/remotion-templates
 * Adapted with full theme system + BrandKit support.
 */

import React from "react";
import { LiquidWave } from "./LiquidWave";
import type { LiquidWaveSpec } from "./LiquidWave";
import { LIQUIDWAVE_SAMPLE } from "./LiquidWave";
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

const SPEC = LIQUIDWAVE_SAMPLE;

export const LiquidWaveDark: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <LiquidWave spec={SPEC} theme={applyBrandKit(THEME_DARK, brandKit)} />
);
export const LiquidWaveClean: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <LiquidWave spec={SPEC} theme={applyBrandKit(THEME_CLEAN, brandKit)} />
);
export const LiquidWaveBold: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <LiquidWave spec={SPEC} theme={applyBrandKit(THEME_BOLD, brandKit)} />
);
export const LiquidWaveWarm: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <LiquidWave spec={SPEC} theme={applyBrandKit(THEME_WARM, brandKit)} />
);
export const LiquidWaveMinimal: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <LiquidWave spec={SPEC} theme={applyBrandKit(THEME_MINIMAL, brandKit)} />
);
export const LiquidWaveNeon: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <LiquidWave spec={SPEC} theme={applyBrandKit(THEME_NEON, brandKit)} />
);
export const LiquidWaveOcean: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <LiquidWave spec={SPEC} theme={applyBrandKit(THEME_OCEAN, brandKit)} />
);
export const LiquidWaveSunset: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <LiquidWave spec={SPEC} theme={applyBrandKit(THEME_SUNSET, brandKit)} />
);
export const LiquidWaveForest: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <LiquidWave spec={SPEC} theme={applyBrandKit(THEME_FOREST, brandKit)} />
);
export const LiquidWaveRose: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <LiquidWave spec={SPEC} theme={applyBrandKit(THEME_ROSE, brandKit)} />
);
export const LiquidWaveGold: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <LiquidWave spec={SPEC} theme={applyBrandKit(THEME_GOLD, brandKit)} />
);
export const LiquidWaveMidnight: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <LiquidWave spec={SPEC} theme={applyBrandKit(THEME_MIDNIGHT, brandKit)} />
);
export const LiquidWaveCrimson: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <LiquidWave spec={SPEC} theme={applyBrandKit(THEME_CRIMSON, brandKit)} />
);
export const LiquidWaveLavender: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <LiquidWave spec={SPEC} theme={applyBrandKit(THEME_LAVENDER, brandKit)} />
);
export const LiquidWaveArctic: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <LiquidWave spec={SPEC} theme={applyBrandKit(THEME_ARCTIC, brandKit)} />
);
export const LiquidWaveEspresso: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <LiquidWave spec={SPEC} theme={applyBrandKit(THEME_ESPRESSO, brandKit)} />
);

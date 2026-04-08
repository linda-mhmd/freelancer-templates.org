/**
 * Glitch Text Showcase - 16 themed compositions for the template library.
 *
 * Original inspiration: https://github.com/reactvideoeditor/remotion-templates
 * Adapted with full theme system + BrandKit support.
 */

import React from "react";
import { GlitchText } from "./GlitchText";
import type { GlitchTextSpec } from "./GlitchText";
import { GLITCHTEXT_SAMPLE } from "./GlitchText";
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

const SPEC = GLITCHTEXT_SAMPLE;

export const GlitchTextDark: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <GlitchText spec={SPEC} theme={applyBrandKit(THEME_DARK, brandKit)} />
);
export const GlitchTextClean: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <GlitchText spec={SPEC} theme={applyBrandKit(THEME_CLEAN, brandKit)} />
);
export const GlitchTextBold: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <GlitchText spec={SPEC} theme={applyBrandKit(THEME_BOLD, brandKit)} />
);
export const GlitchTextWarm: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <GlitchText spec={SPEC} theme={applyBrandKit(THEME_WARM, brandKit)} />
);
export const GlitchTextMinimal: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <GlitchText spec={SPEC} theme={applyBrandKit(THEME_MINIMAL, brandKit)} />
);
export const GlitchTextNeon: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <GlitchText spec={SPEC} theme={applyBrandKit(THEME_NEON, brandKit)} />
);
export const GlitchTextOcean: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <GlitchText spec={SPEC} theme={applyBrandKit(THEME_OCEAN, brandKit)} />
);
export const GlitchTextSunset: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <GlitchText spec={SPEC} theme={applyBrandKit(THEME_SUNSET, brandKit)} />
);
export const GlitchTextForest: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <GlitchText spec={SPEC} theme={applyBrandKit(THEME_FOREST, brandKit)} />
);
export const GlitchTextRose: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <GlitchText spec={SPEC} theme={applyBrandKit(THEME_ROSE, brandKit)} />
);
export const GlitchTextGold: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <GlitchText spec={SPEC} theme={applyBrandKit(THEME_GOLD, brandKit)} />
);
export const GlitchTextMidnight: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <GlitchText spec={SPEC} theme={applyBrandKit(THEME_MIDNIGHT, brandKit)} />
);
export const GlitchTextCrimson: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <GlitchText spec={SPEC} theme={applyBrandKit(THEME_CRIMSON, brandKit)} />
);
export const GlitchTextLavender: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <GlitchText spec={SPEC} theme={applyBrandKit(THEME_LAVENDER, brandKit)} />
);
export const GlitchTextArctic: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <GlitchText spec={SPEC} theme={applyBrandKit(THEME_ARCTIC, brandKit)} />
);
export const GlitchTextEspresso: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <GlitchText spec={SPEC} theme={applyBrandKit(THEME_ESPRESSO, brandKit)} />
);

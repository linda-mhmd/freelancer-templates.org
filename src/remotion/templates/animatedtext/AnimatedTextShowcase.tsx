/**
 * Animated Text Showcase - 16 themed compositions for the template library.
 *
 * Original inspiration: https://github.com/reactvideoeditor/remotion-templates
 * Adapted with full theme system + BrandKit support.
 */

import React from "react";
import { AnimatedText } from "./AnimatedText";
import type { AnimatedTextSpec } from "./AnimatedText";
import { ANIMATEDTEXT_SAMPLE } from "./AnimatedText";
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

const SPEC = ANIMATEDTEXT_SAMPLE;

export const AnimatedTextDark: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <AnimatedText spec={SPEC} theme={applyBrandKit(THEME_DARK, brandKit)} />
);
export const AnimatedTextClean: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <AnimatedText spec={SPEC} theme={applyBrandKit(THEME_CLEAN, brandKit)} />
);
export const AnimatedTextBold: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <AnimatedText spec={SPEC} theme={applyBrandKit(THEME_BOLD, brandKit)} />
);
export const AnimatedTextWarm: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <AnimatedText spec={SPEC} theme={applyBrandKit(THEME_WARM, brandKit)} />
);
export const AnimatedTextMinimal: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <AnimatedText spec={SPEC} theme={applyBrandKit(THEME_MINIMAL, brandKit)} />
);
export const AnimatedTextNeon: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <AnimatedText spec={SPEC} theme={applyBrandKit(THEME_NEON, brandKit)} />
);
export const AnimatedTextOcean: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <AnimatedText spec={SPEC} theme={applyBrandKit(THEME_OCEAN, brandKit)} />
);
export const AnimatedTextSunset: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <AnimatedText spec={SPEC} theme={applyBrandKit(THEME_SUNSET, brandKit)} />
);
export const AnimatedTextForest: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <AnimatedText spec={SPEC} theme={applyBrandKit(THEME_FOREST, brandKit)} />
);
export const AnimatedTextRose: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <AnimatedText spec={SPEC} theme={applyBrandKit(THEME_ROSE, brandKit)} />
);
export const AnimatedTextGold: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <AnimatedText spec={SPEC} theme={applyBrandKit(THEME_GOLD, brandKit)} />
);
export const AnimatedTextMidnight: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <AnimatedText spec={SPEC} theme={applyBrandKit(THEME_MIDNIGHT, brandKit)} />
);
export const AnimatedTextCrimson: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <AnimatedText spec={SPEC} theme={applyBrandKit(THEME_CRIMSON, brandKit)} />
);
export const AnimatedTextLavender: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <AnimatedText spec={SPEC} theme={applyBrandKit(THEME_LAVENDER, brandKit)} />
);
export const AnimatedTextArctic: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <AnimatedText spec={SPEC} theme={applyBrandKit(THEME_ARCTIC, brandKit)} />
);
export const AnimatedTextEspresso: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <AnimatedText spec={SPEC} theme={applyBrandKit(THEME_ESPRESSO, brandKit)} />
);

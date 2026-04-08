/**
 * Slide Text Showcase - 16 themed compositions for the template library.
 *
 * Original inspiration: https://github.com/reactvideoeditor/remotion-templates
 * Adapted with full theme system + BrandKit support.
 */

import React from "react";
import { SlideText } from "./SlideText";
import type { SlideTextSpec } from "./SlideText";
import { SLIDETEXT_SAMPLE } from "./SlideText";
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

const SPEC = SLIDETEXT_SAMPLE;

export const SlideTextDark: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <SlideText spec={SPEC} theme={applyBrandKit(THEME_DARK, brandKit)} />
);
export const SlideTextClean: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <SlideText spec={SPEC} theme={applyBrandKit(THEME_CLEAN, brandKit)} />
);
export const SlideTextBold: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <SlideText spec={SPEC} theme={applyBrandKit(THEME_BOLD, brandKit)} />
);
export const SlideTextWarm: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <SlideText spec={SPEC} theme={applyBrandKit(THEME_WARM, brandKit)} />
);
export const SlideTextMinimal: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <SlideText spec={SPEC} theme={applyBrandKit(THEME_MINIMAL, brandKit)} />
);
export const SlideTextNeon: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <SlideText spec={SPEC} theme={applyBrandKit(THEME_NEON, brandKit)} />
);
export const SlideTextOcean: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <SlideText spec={SPEC} theme={applyBrandKit(THEME_OCEAN, brandKit)} />
);
export const SlideTextSunset: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <SlideText spec={SPEC} theme={applyBrandKit(THEME_SUNSET, brandKit)} />
);
export const SlideTextForest: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <SlideText spec={SPEC} theme={applyBrandKit(THEME_FOREST, brandKit)} />
);
export const SlideTextRose: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <SlideText spec={SPEC} theme={applyBrandKit(THEME_ROSE, brandKit)} />
);
export const SlideTextGold: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <SlideText spec={SPEC} theme={applyBrandKit(THEME_GOLD, brandKit)} />
);
export const SlideTextMidnight: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <SlideText spec={SPEC} theme={applyBrandKit(THEME_MIDNIGHT, brandKit)} />
);
export const SlideTextCrimson: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <SlideText spec={SPEC} theme={applyBrandKit(THEME_CRIMSON, brandKit)} />
);
export const SlideTextLavender: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <SlideText spec={SPEC} theme={applyBrandKit(THEME_LAVENDER, brandKit)} />
);
export const SlideTextArctic: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <SlideText spec={SPEC} theme={applyBrandKit(THEME_ARCTIC, brandKit)} />
);
export const SlideTextEspresso: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <SlideText spec={SPEC} theme={applyBrandKit(THEME_ESPRESSO, brandKit)} />
);

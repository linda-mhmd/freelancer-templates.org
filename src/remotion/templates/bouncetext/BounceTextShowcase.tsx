/**
 * Bounce Text Showcase - 16 themed compositions for the template library.
 *
 * Original inspiration: https://github.com/reactvideoeditor/remotion-templates
 * Adapted with full theme system + BrandKit support.
 */

import React from "react";
import { BounceText } from "./BounceText";
import type { BounceTextSpec } from "./BounceText";
import { BOUNCETEXT_SAMPLE } from "./BounceText";
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

const SPEC = BOUNCETEXT_SAMPLE;

export const BounceTextDark: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <BounceText spec={SPEC} theme={applyBrandKit(THEME_DARK, brandKit)} />
);
export const BounceTextClean: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <BounceText spec={SPEC} theme={applyBrandKit(THEME_CLEAN, brandKit)} />
);
export const BounceTextBold: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <BounceText spec={SPEC} theme={applyBrandKit(THEME_BOLD, brandKit)} />
);
export const BounceTextWarm: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <BounceText spec={SPEC} theme={applyBrandKit(THEME_WARM, brandKit)} />
);
export const BounceTextMinimal: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <BounceText spec={SPEC} theme={applyBrandKit(THEME_MINIMAL, brandKit)} />
);
export const BounceTextNeon: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <BounceText spec={SPEC} theme={applyBrandKit(THEME_NEON, brandKit)} />
);
export const BounceTextOcean: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <BounceText spec={SPEC} theme={applyBrandKit(THEME_OCEAN, brandKit)} />
);
export const BounceTextSunset: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <BounceText spec={SPEC} theme={applyBrandKit(THEME_SUNSET, brandKit)} />
);
export const BounceTextForest: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <BounceText spec={SPEC} theme={applyBrandKit(THEME_FOREST, brandKit)} />
);
export const BounceTextRose: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <BounceText spec={SPEC} theme={applyBrandKit(THEME_ROSE, brandKit)} />
);
export const BounceTextGold: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <BounceText spec={SPEC} theme={applyBrandKit(THEME_GOLD, brandKit)} />
);
export const BounceTextMidnight: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <BounceText spec={SPEC} theme={applyBrandKit(THEME_MIDNIGHT, brandKit)} />
);
export const BounceTextCrimson: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <BounceText spec={SPEC} theme={applyBrandKit(THEME_CRIMSON, brandKit)} />
);
export const BounceTextLavender: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <BounceText spec={SPEC} theme={applyBrandKit(THEME_LAVENDER, brandKit)} />
);
export const BounceTextArctic: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <BounceText spec={SPEC} theme={applyBrandKit(THEME_ARCTIC, brandKit)} />
);
export const BounceTextEspresso: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <BounceText spec={SPEC} theme={applyBrandKit(THEME_ESPRESSO, brandKit)} />
);

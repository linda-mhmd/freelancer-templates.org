/**
 * Pulsing Text Showcase - 16 themed compositions for the template library.
 *
 * Original inspiration: https://github.com/reactvideoeditor/remotion-templates
 * Adapted with full theme system + BrandKit support.
 */

import React from "react";
import { PulsingText } from "./PulsingText";
import type { PulsingTextSpec } from "./PulsingText";
import { PULSINGTEXT_SAMPLE } from "./PulsingText";
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

const SPEC = PULSINGTEXT_SAMPLE;

export const PulsingTextDark: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <PulsingText spec={SPEC} theme={applyBrandKit(THEME_DARK, brandKit)} />
);
export const PulsingTextClean: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <PulsingText spec={SPEC} theme={applyBrandKit(THEME_CLEAN, brandKit)} />
);
export const PulsingTextBold: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <PulsingText spec={SPEC} theme={applyBrandKit(THEME_BOLD, brandKit)} />
);
export const PulsingTextWarm: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <PulsingText spec={SPEC} theme={applyBrandKit(THEME_WARM, brandKit)} />
);
export const PulsingTextMinimal: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <PulsingText spec={SPEC} theme={applyBrandKit(THEME_MINIMAL, brandKit)} />
);
export const PulsingTextNeon: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <PulsingText spec={SPEC} theme={applyBrandKit(THEME_NEON, brandKit)} />
);
export const PulsingTextOcean: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <PulsingText spec={SPEC} theme={applyBrandKit(THEME_OCEAN, brandKit)} />
);
export const PulsingTextSunset: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <PulsingText spec={SPEC} theme={applyBrandKit(THEME_SUNSET, brandKit)} />
);
export const PulsingTextForest: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <PulsingText spec={SPEC} theme={applyBrandKit(THEME_FOREST, brandKit)} />
);
export const PulsingTextRose: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <PulsingText spec={SPEC} theme={applyBrandKit(THEME_ROSE, brandKit)} />
);
export const PulsingTextGold: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <PulsingText spec={SPEC} theme={applyBrandKit(THEME_GOLD, brandKit)} />
);
export const PulsingTextMidnight: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <PulsingText spec={SPEC} theme={applyBrandKit(THEME_MIDNIGHT, brandKit)} />
);
export const PulsingTextCrimson: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <PulsingText spec={SPEC} theme={applyBrandKit(THEME_CRIMSON, brandKit)} />
);
export const PulsingTextLavender: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <PulsingText spec={SPEC} theme={applyBrandKit(THEME_LAVENDER, brandKit)} />
);
export const PulsingTextArctic: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <PulsingText spec={SPEC} theme={applyBrandKit(THEME_ARCTIC, brandKit)} />
);
export const PulsingTextEspresso: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <PulsingText spec={SPEC} theme={applyBrandKit(THEME_ESPRESSO, brandKit)} />
);

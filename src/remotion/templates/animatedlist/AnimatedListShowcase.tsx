/**
 * Animated List Showcase - 16 themed compositions for the template library.
 *
 * Original inspiration: https://github.com/reactvideoeditor/remotion-templates
 * Adapted with full theme system + BrandKit support.
 */

import React from "react";
import { AnimatedList } from "./AnimatedList";
import type { AnimatedListSpec } from "./AnimatedList";
import { ANIMATEDLIST_SAMPLE } from "./AnimatedList";
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

const SPEC = ANIMATEDLIST_SAMPLE;

export const AnimatedListDark: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <AnimatedList spec={SPEC} theme={applyBrandKit(THEME_DARK, brandKit)} />
);
export const AnimatedListClean: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <AnimatedList spec={SPEC} theme={applyBrandKit(THEME_CLEAN, brandKit)} />
);
export const AnimatedListBold: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <AnimatedList spec={SPEC} theme={applyBrandKit(THEME_BOLD, brandKit)} />
);
export const AnimatedListWarm: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <AnimatedList spec={SPEC} theme={applyBrandKit(THEME_WARM, brandKit)} />
);
export const AnimatedListMinimal: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <AnimatedList spec={SPEC} theme={applyBrandKit(THEME_MINIMAL, brandKit)} />
);
export const AnimatedListNeon: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <AnimatedList spec={SPEC} theme={applyBrandKit(THEME_NEON, brandKit)} />
);
export const AnimatedListOcean: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <AnimatedList spec={SPEC} theme={applyBrandKit(THEME_OCEAN, brandKit)} />
);
export const AnimatedListSunset: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <AnimatedList spec={SPEC} theme={applyBrandKit(THEME_SUNSET, brandKit)} />
);
export const AnimatedListForest: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <AnimatedList spec={SPEC} theme={applyBrandKit(THEME_FOREST, brandKit)} />
);
export const AnimatedListRose: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <AnimatedList spec={SPEC} theme={applyBrandKit(THEME_ROSE, brandKit)} />
);
export const AnimatedListGold: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <AnimatedList spec={SPEC} theme={applyBrandKit(THEME_GOLD, brandKit)} />
);
export const AnimatedListMidnight: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <AnimatedList spec={SPEC} theme={applyBrandKit(THEME_MIDNIGHT, brandKit)} />
);
export const AnimatedListCrimson: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <AnimatedList spec={SPEC} theme={applyBrandKit(THEME_CRIMSON, brandKit)} />
);
export const AnimatedListLavender: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <AnimatedList spec={SPEC} theme={applyBrandKit(THEME_LAVENDER, brandKit)} />
);
export const AnimatedListArctic: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <AnimatedList spec={SPEC} theme={applyBrandKit(THEME_ARCTIC, brandKit)} />
);
export const AnimatedListEspresso: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <AnimatedList spec={SPEC} theme={applyBrandKit(THEME_ESPRESSO, brandKit)} />
);

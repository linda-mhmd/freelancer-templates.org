/**
 * Card Flip Showcase - 16 themed compositions for the template library.
 *
 * Original inspiration: https://github.com/reactvideoeditor/remotion-templates
 * Adapted with full theme system + BrandKit support.
 */

import React from "react";
import { CardFlip } from "./CardFlip";
import type { CardFlipSpec } from "./CardFlip";
import { CARDFLIP_SAMPLE } from "./CardFlip";
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

const SPEC = CARDFLIP_SAMPLE;

export const CardFlipDark: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <CardFlip spec={SPEC} theme={applyBrandKit(THEME_DARK, brandKit)} />
);
export const CardFlipClean: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <CardFlip spec={SPEC} theme={applyBrandKit(THEME_CLEAN, brandKit)} />
);
export const CardFlipBold: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <CardFlip spec={SPEC} theme={applyBrandKit(THEME_BOLD, brandKit)} />
);
export const CardFlipWarm: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <CardFlip spec={SPEC} theme={applyBrandKit(THEME_WARM, brandKit)} />
);
export const CardFlipMinimal: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <CardFlip spec={SPEC} theme={applyBrandKit(THEME_MINIMAL, brandKit)} />
);
export const CardFlipNeon: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <CardFlip spec={SPEC} theme={applyBrandKit(THEME_NEON, brandKit)} />
);
export const CardFlipOcean: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <CardFlip spec={SPEC} theme={applyBrandKit(THEME_OCEAN, brandKit)} />
);
export const CardFlipSunset: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <CardFlip spec={SPEC} theme={applyBrandKit(THEME_SUNSET, brandKit)} />
);
export const CardFlipForest: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <CardFlip spec={SPEC} theme={applyBrandKit(THEME_FOREST, brandKit)} />
);
export const CardFlipRose: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <CardFlip spec={SPEC} theme={applyBrandKit(THEME_ROSE, brandKit)} />
);
export const CardFlipGold: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <CardFlip spec={SPEC} theme={applyBrandKit(THEME_GOLD, brandKit)} />
);
export const CardFlipMidnight: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <CardFlip spec={SPEC} theme={applyBrandKit(THEME_MIDNIGHT, brandKit)} />
);
export const CardFlipCrimson: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <CardFlip spec={SPEC} theme={applyBrandKit(THEME_CRIMSON, brandKit)} />
);
export const CardFlipLavender: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <CardFlip spec={SPEC} theme={applyBrandKit(THEME_LAVENDER, brandKit)} />
);
export const CardFlipArctic: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <CardFlip spec={SPEC} theme={applyBrandKit(THEME_ARCTIC, brandKit)} />
);
export const CardFlipEspresso: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <CardFlip spec={SPEC} theme={applyBrandKit(THEME_ESPRESSO, brandKit)} />
);

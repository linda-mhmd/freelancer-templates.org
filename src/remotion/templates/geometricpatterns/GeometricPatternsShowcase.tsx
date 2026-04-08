/**
 * Geometric Patterns Showcase - 16 themed compositions for the template library.
 *
 * Original inspiration: https://github.com/reactvideoeditor/remotion-templates
 * Adapted with full theme system + BrandKit support.
 */

import React from "react";
import { GeometricPatterns } from "./GeometricPatterns";
import type { GeometricPatternsSpec } from "./GeometricPatterns";
import { GEOMETRICPATTERNS_SAMPLE } from "./GeometricPatterns";
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

const SPEC = GEOMETRICPATTERNS_SAMPLE;

export const GeometricPatternsDark: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <GeometricPatterns spec={SPEC} theme={applyBrandKit(THEME_DARK, brandKit)} />
);
export const GeometricPatternsClean: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <GeometricPatterns spec={SPEC} theme={applyBrandKit(THEME_CLEAN, brandKit)} />
);
export const GeometricPatternsBold: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <GeometricPatterns spec={SPEC} theme={applyBrandKit(THEME_BOLD, brandKit)} />
);
export const GeometricPatternsWarm: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <GeometricPatterns spec={SPEC} theme={applyBrandKit(THEME_WARM, brandKit)} />
);
export const GeometricPatternsMinimal: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <GeometricPatterns spec={SPEC} theme={applyBrandKit(THEME_MINIMAL, brandKit)} />
);
export const GeometricPatternsNeon: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <GeometricPatterns spec={SPEC} theme={applyBrandKit(THEME_NEON, brandKit)} />
);
export const GeometricPatternsOcean: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <GeometricPatterns spec={SPEC} theme={applyBrandKit(THEME_OCEAN, brandKit)} />
);
export const GeometricPatternsSunset: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <GeometricPatterns spec={SPEC} theme={applyBrandKit(THEME_SUNSET, brandKit)} />
);
export const GeometricPatternsForest: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <GeometricPatterns spec={SPEC} theme={applyBrandKit(THEME_FOREST, brandKit)} />
);
export const GeometricPatternsRose: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <GeometricPatterns spec={SPEC} theme={applyBrandKit(THEME_ROSE, brandKit)} />
);
export const GeometricPatternsGold: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <GeometricPatterns spec={SPEC} theme={applyBrandKit(THEME_GOLD, brandKit)} />
);
export const GeometricPatternsMidnight: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <GeometricPatterns spec={SPEC} theme={applyBrandKit(THEME_MIDNIGHT, brandKit)} />
);
export const GeometricPatternsCrimson: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <GeometricPatterns spec={SPEC} theme={applyBrandKit(THEME_CRIMSON, brandKit)} />
);
export const GeometricPatternsLavender: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <GeometricPatterns spec={SPEC} theme={applyBrandKit(THEME_LAVENDER, brandKit)} />
);
export const GeometricPatternsArctic: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <GeometricPatterns spec={SPEC} theme={applyBrandKit(THEME_ARCTIC, brandKit)} />
);
export const GeometricPatternsEspresso: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <GeometricPatterns spec={SPEC} theme={applyBrandKit(THEME_ESPRESSO, brandKit)} />
);

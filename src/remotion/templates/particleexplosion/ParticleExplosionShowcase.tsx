/**
 * Particle Explosion Showcase - 16 themed compositions for the template library.
 *
 * Original inspiration: https://github.com/reactvideoeditor/remotion-templates
 * Adapted with full theme system + BrandKit support.
 */

import React from "react";
import { ParticleExplosion } from "./ParticleExplosion";
import type { ParticleExplosionSpec } from "./ParticleExplosion";
import { PARTICLEEXPLOSION_SAMPLE } from "./ParticleExplosion";
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

const SPEC = PARTICLEEXPLOSION_SAMPLE;

export const ParticleExplosionDark: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <ParticleExplosion spec={SPEC} theme={applyBrandKit(THEME_DARK, brandKit)} />
);
export const ParticleExplosionClean: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <ParticleExplosion spec={SPEC} theme={applyBrandKit(THEME_CLEAN, brandKit)} />
);
export const ParticleExplosionBold: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <ParticleExplosion spec={SPEC} theme={applyBrandKit(THEME_BOLD, brandKit)} />
);
export const ParticleExplosionWarm: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <ParticleExplosion spec={SPEC} theme={applyBrandKit(THEME_WARM, brandKit)} />
);
export const ParticleExplosionMinimal: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <ParticleExplosion spec={SPEC} theme={applyBrandKit(THEME_MINIMAL, brandKit)} />
);
export const ParticleExplosionNeon: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <ParticleExplosion spec={SPEC} theme={applyBrandKit(THEME_NEON, brandKit)} />
);
export const ParticleExplosionOcean: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <ParticleExplosion spec={SPEC} theme={applyBrandKit(THEME_OCEAN, brandKit)} />
);
export const ParticleExplosionSunset: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <ParticleExplosion spec={SPEC} theme={applyBrandKit(THEME_SUNSET, brandKit)} />
);
export const ParticleExplosionForest: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <ParticleExplosion spec={SPEC} theme={applyBrandKit(THEME_FOREST, brandKit)} />
);
export const ParticleExplosionRose: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <ParticleExplosion spec={SPEC} theme={applyBrandKit(THEME_ROSE, brandKit)} />
);
export const ParticleExplosionGold: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <ParticleExplosion spec={SPEC} theme={applyBrandKit(THEME_GOLD, brandKit)} />
);
export const ParticleExplosionMidnight: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <ParticleExplosion spec={SPEC} theme={applyBrandKit(THEME_MIDNIGHT, brandKit)} />
);
export const ParticleExplosionCrimson: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <ParticleExplosion spec={SPEC} theme={applyBrandKit(THEME_CRIMSON, brandKit)} />
);
export const ParticleExplosionLavender: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <ParticleExplosion spec={SPEC} theme={applyBrandKit(THEME_LAVENDER, brandKit)} />
);
export const ParticleExplosionArctic: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <ParticleExplosion spec={SPEC} theme={applyBrandKit(THEME_ARCTIC, brandKit)} />
);
export const ParticleExplosionEspresso: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <ParticleExplosion spec={SPEC} theme={applyBrandKit(THEME_ESPRESSO, brandKit)} />
);

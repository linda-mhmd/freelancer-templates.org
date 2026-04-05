/**
 * Collaboration Showcase Compositions - 6 variants (3 layouts × 2 themes)
 */
import React from "react";
import { Collaboration } from "./Collaboration";
import {
  THEME_DARK,
  THEME_BOLD,
  BrandKit,
  applyBrandKit,
  THEME_OCEAN, THEME_SUNSET, THEME_FOREST, THEME_ROSE, THEME_GOLD, THEME_MIDNIGHT, THEME_CRIMSON, THEME_LAVENDER, THEME_ARCTIC, THEME_ESPRESSO
} from "../_shared/themes"

const SAMPLE_SPEC = {
  collab_title: "Creative Fusion Project",
  creators: [
    { name: "Linda Mohamed", audience: 450000 },
    { name: "Linda Mohamed", audience: 320000 },
  ],
  description: "Two top creators unite for a groundbreaking content series",
  combined_audience: 770000,
};

export const CollaborationDarkSplitScreen: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <Collaboration spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_DARK, brandKit)} layout="split-screen" />
);
export const CollaborationBoldSplitScreen: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <Collaboration spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_BOLD, brandKit)} layout="split-screen" />
);
export const CollaborationDarkAnnouncement: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <Collaboration spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_DARK, brandKit)} layout="announcement" />
);
export const CollaborationBoldAnnouncement: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <Collaboration spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_BOLD, brandKit)} layout="announcement" />
);
export const CollaborationDarkStatsMerge: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <Collaboration spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_DARK, brandKit)} layout="stats-merge" />
);
export const CollaborationBoldStatsMerge: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <Collaboration spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_BOLD, brandKit)} layout="stats-merge" />
);

// ── Extended Themes ──────────────────────────────────────────────
export const CollaborationOceanSplitScreen: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <Collaboration spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_OCEAN, brandKit)} layout="split-screen" bgPattern="grid" />
);
export const CollaborationSunsetSplitScreen: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <Collaboration spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_SUNSET, brandKit)} layout="split-screen" bgPattern="none" />
);
export const CollaborationForestAnnouncement: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <Collaboration spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_FOREST, brandKit)} layout="announcement" bgPattern="hex" />
);
export const CollaborationRoseAnnouncement: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <Collaboration spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_ROSE, brandKit)} layout="announcement" bgPattern="dots" />
);
export const CollaborationGoldStatsMerge: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <Collaboration spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_GOLD, brandKit)} layout="stats-merge" bgPattern="none" />
);
export const CollaborationMidnightStatsMerge: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <Collaboration spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_MIDNIGHT, brandKit)} layout="stats-merge" bgPattern="grid" />
);
export const CollaborationCrimsonSplitScreen: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <Collaboration spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_CRIMSON, brandKit)} layout="split-screen" bgPattern="none" />
);
export const CollaborationLavenderSplitScreen: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <Collaboration spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_LAVENDER, brandKit)} layout="split-screen" bgPattern="hex" />
);
export const CollaborationArcticAnnouncement: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <Collaboration spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_ARCTIC, brandKit)} layout="announcement" bgPattern="dots" />
);
export const CollaborationEspressoAnnouncement: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <Collaboration spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_ESPRESSO, brandKit)} layout="announcement" bgPattern="none" />
);

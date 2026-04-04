/**
 * Collaboration Showcase Compositions - 6 variants (3 layouts × 2 themes)
 */
import React from "react";
import { Collaboration } from "./Collaboration";
import { THEME_DARK, THEME_BOLD } from "../_shared/themes";

const SAMPLE_SPEC = {
  collab_title: "Creative Fusion Project",
  creators: [
    { name: "Linda Mohamed", audience: 450000 },
    { name: "Linda Mohamed", audience: 320000 },
  ],
  description: "Two top creators unite for a groundbreaking content series",
  combined_audience: 770000,
};

export const CollaborationDarkSplitScreen: React.FC = () => (
  <Collaboration spec={SAMPLE_SPEC} theme={THEME_DARK} layout="split-screen" />
);
export const CollaborationBoldSplitScreen: React.FC = () => (
  <Collaboration spec={SAMPLE_SPEC} theme={THEME_BOLD} layout="split-screen" />
);
export const CollaborationDarkAnnouncement: React.FC = () => (
  <Collaboration spec={SAMPLE_SPEC} theme={THEME_DARK} layout="announcement" />
);
export const CollaborationBoldAnnouncement: React.FC = () => (
  <Collaboration spec={SAMPLE_SPEC} theme={THEME_BOLD} layout="announcement" />
);
export const CollaborationDarkStatsMerge: React.FC = () => (
  <Collaboration spec={SAMPLE_SPEC} theme={THEME_DARK} layout="stats-merge" />
);
export const CollaborationBoldStatsMerge: React.FC = () => (
  <Collaboration spec={SAMPLE_SPEC} theme={THEME_BOLD} layout="stats-merge" />
);

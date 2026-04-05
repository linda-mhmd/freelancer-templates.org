/**
 * ThoughtLeadership Showcase Compositions
 *
 * 6 showcase compositions: 3 layouts × 2 themes (THEME_DARK, THEME_CLEAN)
 * Sample data modeled on "The migration panic (and the compounding returns of staying put)"
 */

import React from "react";
import { ThoughtLeadership, calculateThoughtLeadershipDuration } from "./ThoughtLeadership";
import type { ThoughtLeadershipSpec } from "./ThoughtLeadership";
import {
  THEME_DARK,
  THEME_CLEAN,
  BrandKit,
  applyBrandKit,
} from "../_shared/themes";

const SAMPLE_SPEC: ThoughtLeadershipSpec = {
  title: "The Migration Panic",
  hook: "Why the compounding returns of staying put outweigh the siren call of the next shiny framework.",
  sections: [
    {
      heading: "The Grass Is Always Greener",
      body: "Every six months a new framework promises to solve all your problems. The migration cost is always underestimated by 3-5x, and the productivity dip lasts longer than anyone admits.",
    },
    {
      heading: "Compounding Expertise",
      body: "Deep knowledge of one stack compounds. You learn the edge cases, the performance tricks, the debugging shortcuts. Switching resets that clock to zero.",
    },
    {
      heading: "The Real Cost of Context Switching",
      body: "Migration isn't just code changes. It's rewriting tests, updating CI pipelines, retraining the team, and losing institutional knowledge embedded in the old codebase.",
    },
    {
      heading: "When Migration Actually Makes Sense",
      body: "Sometimes you must move: security vulnerabilities, end-of-life dependencies, or fundamental architecture mismatches. But these are rare - not the norm.",
    },
  ],
  closingThought: "Stay put. Go deep. The returns compound in ways that hopping never will.",
  authorName: "Linda Mohamed",
  authorTitle: "Engineering Lead",
  publishDate: "2026-02-28",
  tags: ["engineering", "strategy", "frameworks"],
};

const SECTIONS_COUNT = SAMPLE_SPEC.sections.length;

// ── Editorial × Dark ────────────────────────────────────────────
export const ThoughtLeadershipEditorialDark: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <ThoughtLeadership spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_DARK, brandKit)} layout="editorial" />
);
export const EDITORIAL_DARK_DURATION = calculateThoughtLeadershipDuration(SECTIONS_COUNT, "editorial");

// ── Editorial × Clean ───────────────────────────────────────────
export const ThoughtLeadershipEditorialClean: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <ThoughtLeadership spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_CLEAN, brandKit)} layout="editorial" />
);
export const EDITORIAL_CLEAN_DURATION = calculateThoughtLeadershipDuration(SECTIONS_COUNT, "editorial");

// ── Narrative × Dark ────────────────────────────────────────────
export const ThoughtLeadershipNarrativeDark: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <ThoughtLeadership spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_DARK, brandKit)} layout="narrative" />
);
export const NARRATIVE_DARK_DURATION = calculateThoughtLeadershipDuration(SECTIONS_COUNT, "narrative");

// ── Narrative × Clean ───────────────────────────────────────────
export const ThoughtLeadershipNarrativeClean: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <ThoughtLeadership spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_CLEAN, brandKit)} layout="narrative" />
);
export const NARRATIVE_CLEAN_DURATION = calculateThoughtLeadershipDuration(SECTIONS_COUNT, "narrative");

// ── Keynote × Dark ──────────────────────────────────────────────
export const ThoughtLeadershipKeynoteDark: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <ThoughtLeadership spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_DARK, brandKit)} layout="keynote" />
);
export const KEYNOTE_DARK_DURATION = calculateThoughtLeadershipDuration(SECTIONS_COUNT, "keynote");

// ── Keynote × Clean ─────────────────────────────────────────────
export const ThoughtLeadershipKeynoteClean: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <ThoughtLeadership spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_CLEAN, brandKit)} layout="keynote" />
);
export const KEYNOTE_CLEAN_DURATION = calculateThoughtLeadershipDuration(SECTIONS_COUNT, "keynote");

// ── Extended Themes ──────────────────────────────────────────────
export const ThoughtLeadershipOceanEditorial: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <ThoughtLeadership spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_OCEAN, brandKit)} layout="editorial" />
);
export const ThoughtLeadershipSunsetNarrative: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <ThoughtLeadership spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_SUNSET, brandKit)} layout="narrative" />
);
export const ThoughtLeadershipForestKeynote: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <ThoughtLeadership spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_FOREST, brandKit)} layout="keynote" />
);
export const ThoughtLeadershipRoseEditorial: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <ThoughtLeadership spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_ROSE, brandKit)} layout="editorial" />
);
export const ThoughtLeadershipGoldNarrative: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <ThoughtLeadership spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_GOLD, brandKit)} layout="narrative" />
);
export const ThoughtLeadershipMidnightKeynote: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <ThoughtLeadership spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_MIDNIGHT, brandKit)} layout="keynote" />
);
export const ThoughtLeadershipCrimsonEditorial: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <ThoughtLeadership spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_CRIMSON, brandKit)} layout="editorial" />
);
export const ThoughtLeadershipLavenderNarrative: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <ThoughtLeadership spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_LAVENDER, brandKit)} layout="narrative" />
);
export const ThoughtLeadershipArcticKeynote: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <ThoughtLeadership spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_ARCTIC, brandKit)} layout="keynote" />
);
export const ThoughtLeadershipEspressoEditorial: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <ThoughtLeadership spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_ESPRESSO, brandKit)} layout="editorial" />
);

/**
 * ConceptPitch Showcase Compositions
 *
 * 6 showcase compositions: 3 layouts × 2 themes (THEME_DARK, THEME_BOLD)
 * Sample data modeled on "Autonomous agents: daily Journal scan → capability gap log"
 */

import React from "react";
import { ConceptPitch } from "./ConceptPitch";
import type { ConceptPitchSpec } from "./ConceptPitch";
import {
  THEME_DARK,
  THEME_BOLD,
  BrandKit,
  applyBrandKit,
} from "../_shared/themes";

const SAMPLE_SPEC: ConceptPitchSpec = {
  title: "Journal-to-Capability Gap Agent",
  problemStatement:
    "Daily journal entries contain implicit signals about missing skills and tooling gaps, but nobody reviews them systematically. Insights decay within days.",
  proposedSolution:
    "An autonomous agent scans each journal entry nightly, extracts capability-gap signals using an LLM classifier, and appends structured entries to a living capability gap log.",
  tasks: [
    { title: "Build journal ingestion pipeline (S3 → Lambda → Bedrock)", done: true },
    { title: "Train gap-signal classifier on 200 labeled entries", done: true },
    { title: "Create capability-gap-log DynamoDB table + API", done: true },
    { title: "Wire nightly EventBridge schedule", done: false },
    { title: "Add Slack digest notification for new gaps", done: false },
  ],
  notes: [
    "Classifier accuracy target: ≥ 85% F1 on held-out set",
    "Gap log entries should link back to source journal entry ID",
    "Consider adding a confidence score threshold (0.7) before logging",
  ],
  status: "in-progress",
  finalResult: "A self-updating capability gap log that turns daily reflections into actionable growth signals.",
  tags: ["automation", "agents", "journal", "capability-gaps"],
};

// Duration constants
const ARC_DURATION = 420;   // ~14s for full arc flow
const BOARD_DURATION = 360; // ~12s for board view
const BRIEF_DURATION = 270; // max 270 per spec

// ── Arc × Dark ──────────────────────────────────────────────────
export const ConceptPitchArcDark: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <ConceptPitch spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_DARK, brandKit)} layout="arc" />
);
export const ARC_DARK_DURATION = ARC_DURATION;

// ── Arc × Bold ──────────────────────────────────────────────────
export const ConceptPitchArcBold: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <ConceptPitch spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_BOLD, brandKit)} layout="arc" />
);
export const ARC_BOLD_DURATION = ARC_DURATION;

// ── Board × Dark ────────────────────────────────────────────────
export const ConceptPitchBoardDark: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <ConceptPitch spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_DARK, brandKit)} layout="board" />
);
export const BOARD_DARK_DURATION = BOARD_DURATION;

// ── Board × Bold ────────────────────────────────────────────────
export const ConceptPitchBoardBold: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <ConceptPitch spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_BOLD, brandKit)} layout="board" />
);
export const BOARD_BOLD_DURATION = BOARD_DURATION;

// ── Brief × Dark ────────────────────────────────────────────────
export const ConceptPitchBriefDark: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <ConceptPitch spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_DARK, brandKit)} layout="brief" />
);
export const BRIEF_DARK_DURATION = BRIEF_DURATION;

// ── Brief × Bold ────────────────────────────────────────────────
export const ConceptPitchBriefBold: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <ConceptPitch spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_BOLD, brandKit)} layout="brief" />
);
export const BRIEF_BOLD_DURATION = BRIEF_DURATION;

// ── Extended Themes ──────────────────────────────────────────────
export const ConceptPitchOceanArc: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <ConceptPitch spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_OCEAN, brandKit)} layout="arc" />
);
export const ConceptPitchSunsetBoard: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <ConceptPitch spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_SUNSET, brandKit)} layout="board" />
);
export const ConceptPitchForestBrief: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <ConceptPitch spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_FOREST, brandKit)} layout="brief" />
);
export const ConceptPitchRoseArc: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <ConceptPitch spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_ROSE, brandKit)} layout="arc" />
);
export const ConceptPitchGoldBoard: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <ConceptPitch spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_GOLD, brandKit)} layout="board" />
);
export const ConceptPitchMidnightBrief: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <ConceptPitch spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_MIDNIGHT, brandKit)} layout="brief" />
);
export const ConceptPitchCrimsonArc: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <ConceptPitch spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_CRIMSON, brandKit)} layout="arc" />
);
export const ConceptPitchLavenderBoard: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <ConceptPitch spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_LAVENDER, brandKit)} layout="board" />
);
export const ConceptPitchArcticBrief: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <ConceptPitch spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_ARCTIC, brandKit)} layout="brief" />
);
export const ConceptPitchEspressoArc: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <ConceptPitch spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_ESPRESSO, brandKit)} layout="arc" />
);

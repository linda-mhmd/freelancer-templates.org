/**
 * Tutorial Showcase - Pre-configured compositions for each layout × theme combo.
 *
 * 6 showcases: 3 layouts × 2 featured themes (dark, clean)
 * Duration: 270 frames (9s at 30fps)
 *
 * REGISTERED COMPOSITIONS:
 *   TutorialDarkNumberedSteps     - Dark theme, numbered-steps layout
 *   TutorialCleanNumberedSteps    - Clean theme, numbered-steps layout
 *   TutorialDarkCardSequence      - Dark theme, card-sequence layout
 *   TutorialCleanCardSequence     - Clean theme, card-sequence layout
 *   TutorialDarkSplitDemo         - Dark theme, split-demo layout
 *   TutorialCleanSplitDemo        - Clean theme, split-demo layout
 */

import React from "react";
import { Tutorial } from "./Tutorial";
import type { TutorialSpec } from "./Tutorial";
import {
  THEME_DARK,
  THEME_CLEAN,
  BrandKit,
  applyBrandKit,
  THEME_OCEAN, THEME_SUNSET, THEME_FOREST, THEME_ROSE, THEME_GOLD, THEME_MIDNIGHT, THEME_CRIMSON, THEME_LAVENDER, THEME_ARCTIC, THEME_ESPRESSO
} from "../_shared/themes"

// ── Sample Data ─────────────────────────────────────────────────
const SAMPLE_SPEC: TutorialSpec = {
  title: "How to Set Up a CI/CD Pipeline",
  steps: [
    { title: "Install Dependencies", description: "Set up Node.js, Docker, and your preferred CI runner (GitHub Actions, GitLab CI, or Jenkins).", duration_estimate: "10 min" },
    { title: "Configure Build Scripts", description: "Add build, test, and lint scripts to your package.json. Ensure all tests pass locally before proceeding.", duration_estimate: "15 min" },
    { title: "Create Pipeline Config", description: "Write your CI/CD YAML config file with stages for build, test, and deploy. Define environment variables.", duration_estimate: "20 min" },
    { title: "Set Up Deployment", description: "Configure deployment targets (staging and production). Add secrets and access tokens to your CI environment.", duration_estimate: "15 min" },
    { title: "Test & Monitor", description: "Push a test commit to trigger the pipeline. Verify each stage completes successfully and set up alerts.", duration_estimate: "10 min" },
  ],
};

const SAMPLE_SPEC_ALT: TutorialSpec = {
  title: "Getting Started with TypeScript",
  steps: [
    { title: "Initialize Project", description: "Run npm init and install TypeScript as a dev dependency. Create a tsconfig.json with strict mode enabled.", duration_estimate: "5 min" },
    { title: "Configure Compiler", description: "Set target to ES2020, enable strict null checks, and configure path aliases for cleaner imports.", duration_estimate: "8 min" },
    { title: "Write Your First Types", description: "Define interfaces for your data models. Use union types and generics for flexible, type-safe code.", duration_estimate: "12 min" },
    { title: "Integrate with Tooling", description: "Set up ESLint with TypeScript parser, configure Prettier, and add pre-commit hooks with Husky.", duration_estimate: "10 min" },
  ],
};

// ── Composition: Dark + Numbered Steps ──────────────────────────
export const TutorialDarkNumberedSteps: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <Tutorial spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_DARK, brandKit)} layout="numbered-steps" />
);

// ── Composition: Clean + Numbered Steps ─────────────────────────
export const TutorialCleanNumberedSteps: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <Tutorial spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_CLEAN, brandKit)} layout="numbered-steps" />
);

// ── Composition: Dark + Card Sequence ───────────────────────────
export const TutorialDarkCardSequence: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <Tutorial spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_DARK, brandKit)} layout="card-sequence" />
);

// ── Composition: Clean + Card Sequence ──────────────────────────
export const TutorialCleanCardSequence: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <Tutorial spec={SAMPLE_SPEC_ALT} theme={applyBrandKit(THEME_CLEAN, brandKit)} layout="card-sequence" />
);

// ── Composition: Dark + Split Demo ──────────────────────────────
export const TutorialDarkSplitDemo: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <Tutorial spec={SAMPLE_SPEC_ALT} theme={applyBrandKit(THEME_DARK, brandKit)} layout="split-demo" />
);

// ── Composition: Clean + Split Demo ─────────────────────────────
export const TutorialCleanSplitDemo: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <Tutorial spec={SAMPLE_SPEC_ALT} theme={applyBrandKit(THEME_CLEAN, brandKit)} layout="split-demo" />
);

// ── Extended Themes ──────────────────────────────────────────────
export const TutorialOceanNumberedSteps: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <Tutorial spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_OCEAN, brandKit)} layout="numbered-steps" bgPattern="grid" />
);
export const TutorialSunsetNumberedSteps: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <Tutorial spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_SUNSET, brandKit)} layout="numbered-steps" bgPattern="none" />
);
export const TutorialForestCardSequence: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <Tutorial spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_FOREST, brandKit)} layout="card-sequence" bgPattern="hex" />
);
export const TutorialRoseCardSequence: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <Tutorial spec={SAMPLE_SPEC_ALT} theme={applyBrandKit(THEME_ROSE, brandKit)} layout="card-sequence" bgPattern="dots" />
);
export const TutorialGoldSplitDemo: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <Tutorial spec={SAMPLE_SPEC_ALT} theme={applyBrandKit(THEME_GOLD, brandKit)} layout="split-demo" bgPattern="none" />
);
export const TutorialMidnightSplitDemo: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <Tutorial spec={SAMPLE_SPEC_ALT} theme={applyBrandKit(THEME_MIDNIGHT, brandKit)} layout="split-demo" bgPattern="grid" />
);
export const TutorialCrimsonNumberedSteps: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <Tutorial spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_CRIMSON, brandKit)} layout="numbered-steps" bgPattern="none" />
);
export const TutorialLavenderNumberedSteps: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <Tutorial spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_LAVENDER, brandKit)} layout="numbered-steps" bgPattern="hex" />
);
export const TutorialArcticCardSequence: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <Tutorial spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_ARCTIC, brandKit)} layout="card-sequence" bgPattern="dots" />
);
export const TutorialEspressoCardSequence: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <Tutorial spec={SAMPLE_SPEC_ALT} theme={applyBrandKit(THEME_ESPRESSO, brandKit)} layout="card-sequence" bgPattern="none" />
);

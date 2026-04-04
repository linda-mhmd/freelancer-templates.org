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
import { THEME_DARK, THEME_CLEAN } from "../_shared/themes";

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
export const TutorialDarkNumberedSteps: React.FC = () => (
  <Tutorial spec={SAMPLE_SPEC} theme={THEME_DARK} layout="numbered-steps" />
);

// ── Composition: Clean + Numbered Steps ─────────────────────────
export const TutorialCleanNumberedSteps: React.FC = () => (
  <Tutorial spec={SAMPLE_SPEC} theme={THEME_CLEAN} layout="numbered-steps" />
);

// ── Composition: Dark + Card Sequence ───────────────────────────
export const TutorialDarkCardSequence: React.FC = () => (
  <Tutorial spec={SAMPLE_SPEC} theme={THEME_DARK} layout="card-sequence" />
);

// ── Composition: Clean + Card Sequence ──────────────────────────
export const TutorialCleanCardSequence: React.FC = () => (
  <Tutorial spec={SAMPLE_SPEC_ALT} theme={THEME_CLEAN} layout="card-sequence" />
);

// ── Composition: Dark + Split Demo ──────────────────────────────
export const TutorialDarkSplitDemo: React.FC = () => (
  <Tutorial spec={SAMPLE_SPEC_ALT} theme={THEME_DARK} layout="split-demo" />
);

// ── Composition: Clean + Split Demo ─────────────────────────────
export const TutorialCleanSplitDemo: React.FC = () => (
  <Tutorial spec={SAMPLE_SPEC_ALT} theme={THEME_CLEAN} layout="split-demo" />
);

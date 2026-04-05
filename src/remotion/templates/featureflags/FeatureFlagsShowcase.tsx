import React from "react";
import { FeatureFlags, FeatureFlagsSpec } from "./FeatureFlags";
import { BrandKit } from "../_shared/themes";

const BASE_SPEC: FeatureFlagsSpec = {
  project_name: "Sisy",
  flags: [
    { flag_name: "new-onboarding-flow", status: "in-progress", rollout_percent: 45, description: "Redesigned onboarding with guided tour", variant_count: 3 },
    { flag_name: "dark-mode-v2", status: "completed", rollout_percent: 100, description: "Updated dark theme with OLED support", variant_count: 2, winner: "Variant B" },
    { flag_name: "ai-task-suggestions", status: "in-progress", rollout_percent: 20, description: "AI-powered task prioritization hints", variant_count: 2 },
    { flag_name: "redesigned-dashboard", status: "upcoming", rollout_percent: 0, description: "New dashboard layout with widget system", variant_count: 4 },
  ],
  active_experiments: 2,
  total_flags: 4,
};

export const FeatureFlagsExperimentBoardDark: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <FeatureFlags spec={{ ...BASE_SPEC, layout: "experiment-board", theme: "dark" }} brandKit={brandKit} />;
export const FeatureFlagsExperimentBoardNeon: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <FeatureFlags spec={{ ...BASE_SPEC, layout: "experiment-board", theme: "neon" }} brandKit={brandKit} />;
export const FeatureFlagsResultsViewDark: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <FeatureFlags spec={{ ...BASE_SPEC, layout: "results-view", theme: "dark" }} brandKit={brandKit} />;
export const FeatureFlagsResultsViewNeon: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <FeatureFlags spec={{ ...BASE_SPEC, layout: "results-view", theme: "neon" }} brandKit={brandKit} />;
export const FeatureFlagsRolloutTrackerDark: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <FeatureFlags spec={{ ...BASE_SPEC, layout: "rollout-tracker", theme: "dark" }} brandKit={brandKit} />;
export const FeatureFlagsRolloutTrackerNeon: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <FeatureFlags spec={{ ...BASE_SPEC, layout: "rollout-tracker", theme: "neon" }} brandKit={brandKit} />;

// ── Extended Themes ──────────────────────────────────────────────
export const FeatureFlagsOceanExperimentBoard: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <FeatureFlags spec={{ ...BASE_SPEC, layout: "experiment-board", theme: "ocean" }} brandKit={brandKit} />;
export const FeatureFlagsSunsetExperimentBoard: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <FeatureFlags spec={{ ...BASE_SPEC, layout: "experiment-board", theme: "sunset" }} brandKit={brandKit} />;
export const FeatureFlagsForestResultsView: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <FeatureFlags spec={{ ...BASE_SPEC, layout: "results-view", theme: "forest" }} brandKit={brandKit} />;
export const FeatureFlagsRoseResultsView: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <FeatureFlags spec={{ ...BASE_SPEC, layout: "results-view", theme: "rose" }} brandKit={brandKit} />;
export const FeatureFlagsGoldRolloutTracker: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <FeatureFlags spec={{ ...BASE_SPEC, layout: "rollout-tracker", theme: "gold" }} brandKit={brandKit} />;
export const FeatureFlagsMidnightRolloutTracker: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <FeatureFlags spec={{ ...BASE_SPEC, layout: "rollout-tracker", theme: "midnight" }} brandKit={brandKit} />;
export const FeatureFlagsCrimsonExperimentBoard: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <FeatureFlags spec={{ ...BASE_SPEC, layout: "experiment-board", theme: "crimson" }} brandKit={brandKit} />;
export const FeatureFlagsLavenderExperimentBoard: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <FeatureFlags spec={{ ...BASE_SPEC, layout: "experiment-board", theme: "lavender" }} brandKit={brandKit} />;
export const FeatureFlagsArcticResultsView: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <FeatureFlags spec={{ ...BASE_SPEC, layout: "results-view", theme: "arctic" }} brandKit={brandKit} />;
export const FeatureFlagsEspressoResultsView: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <FeatureFlags spec={{ ...BASE_SPEC, layout: "results-view", theme: "espresso" }} brandKit={brandKit} />;

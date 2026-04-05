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

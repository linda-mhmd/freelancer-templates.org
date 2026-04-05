import React from "react";
import { FeatureRoadmap, FeatureRoadmapSpec } from "./FeatureRoadmap";
import { BrandKit } from "../_shared/themes";

const BASE_SPEC: FeatureRoadmapSpec = {
  product_name: "Sisy",
  roadmap_title: "Q1 2026 Feature Roadmap",
  time_horizon: "Jan – Mar 2026",
  features: [
    { name: "Auth Module v2", description: "SSO + MFA support", status: "completed", category: "Security", progress_percent: 100 },
    { name: "Dashboard Redesign", description: "New composable widget system", status: "in-progress", category: "Frontend", progress_percent: 65 },
    { name: "API Rate Limiting", description: "Per-tenant throttling", status: "in-progress", category: "Backend", progress_percent: 40 },
    { name: "Notification System", description: "Real-time push + email digest", status: "upcoming", category: "Backend", progress_percent: 0 },
    { name: "OTTO Integration", description: "Composable verb pipeline", status: "in-progress", category: "Platform", progress_percent: 55 },
    { name: "Analytics Dashboard", description: "Usage metrics & insights", status: "upcoming", category: "Frontend", progress_percent: 0 },
  ],
};

export const FeatureRoadmapTimelineDark: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <FeatureRoadmap spec={{ ...BASE_SPEC, layout: "timeline", theme: "dark" }} brandKit={brandKit} />;
export const FeatureRoadmapTimelineClean: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <FeatureRoadmap spec={{ ...BASE_SPEC, layout: "timeline", theme: "clean" }} brandKit={brandKit} />;
export const FeatureRoadmapSwimlaneDark: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <FeatureRoadmap spec={{ ...BASE_SPEC, layout: "swimlane", theme: "dark" }} brandKit={brandKit} />;
export const FeatureRoadmapSwimlaneClean: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <FeatureRoadmap spec={{ ...BASE_SPEC, layout: "swimlane", theme: "clean" }} brandKit={brandKit} />;
export const FeatureRoadmapGridDark: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <FeatureRoadmap spec={{ ...BASE_SPEC, layout: "grid", theme: "dark" }} brandKit={brandKit} />;
export const FeatureRoadmapGridClean: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <FeatureRoadmap spec={{ ...BASE_SPEC, layout: "grid", theme: "clean" }} brandKit={brandKit} />;

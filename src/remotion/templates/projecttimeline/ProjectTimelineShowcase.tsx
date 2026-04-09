/**
 * ProjectTimeline Showcase - Pre-configured compositions for each theme.
 */

import React from "react";
import { ProjectTimeline } from "./ProjectTimeline";
import type { ProjectTimelineSpec } from "./ProjectTimeline";
import {
  THEME_DARK, THEME_CLEAN, THEME_BOLD, THEME_WARM, THEME_MINIMAL, THEME_NEON,
  THEME_OCEAN, THEME_SUNSET, THEME_FOREST, THEME_ROSE, THEME_GOLD, THEME_MIDNIGHT,
  THEME_CRIMSON, THEME_LAVENDER, THEME_ARCTIC, THEME_ESPRESSO,
  BrandKit, applyBrandKit,
} from "../_shared/themes";

const SAMPLE_SPEC: ProjectTimelineSpec = {
  title: "Website Redesign",
  subtitle: "Apr – Jun 2025",
  overall_progress: 62,
  client_name: "Acme Corp",
  milestones: [
    { date: "Apr 1",  title: "Project Kickoff",    description: "Scope defined, contracts signed, team introduced", status: "done" },
    { date: "Apr 15", title: "UX Wireframes",       description: "12 screens reviewed and approved by stakeholders", status: "done" },
    { date: "May 5",  title: "Development Sprint",  description: "Core pages built, CMS integrated, QA in progress",  status: "active" },
    { date: "May 28", title: "User Testing",        description: "5 sessions scheduled, feedback loop with design",   status: "upcoming" },
    { date: "Jun 10", title: "Launch & Handover",   description: "Production deploy, analytics setup, docs delivery", status: "upcoming" },
  ],
};

export const ProjectTimelineDarkDashboard:     React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <ProjectTimeline spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_DARK,     brandKit)} bgPattern="dots" />;
export const ProjectTimelineBoldDashboard:     React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <ProjectTimeline spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_BOLD,     brandKit)} bgPattern="grid" />;
export const ProjectTimelineCleanDashboard:    React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <ProjectTimeline spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_CLEAN,    brandKit)} bgPattern="dots" />;
export const ProjectTimelineWarmDashboard:     React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <ProjectTimeline spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_WARM,     brandKit)} bgPattern="hex" />;
export const ProjectTimelineMinimalDashboard:  React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <ProjectTimeline spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_MINIMAL,  brandKit)} bgPattern="none" />;
export const ProjectTimelineNeonDashboard:     React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <ProjectTimeline spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_NEON,     brandKit)} bgPattern="grid" />;
export const ProjectTimelineOceanDashboard:    React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <ProjectTimeline spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_OCEAN,    brandKit)} bgPattern="dots" />;
export const ProjectTimelineSunsetDashboard:   React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <ProjectTimeline spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_SUNSET,   brandKit)} bgPattern="hex" />;
export const ProjectTimelineForestDashboard:   React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <ProjectTimeline spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_FOREST,   brandKit)} bgPattern="dots" />;
export const ProjectTimelineRoseDashboard:     React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <ProjectTimeline spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_ROSE,     brandKit)} bgPattern="none" />;
export const ProjectTimelineGoldDashboard:     React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <ProjectTimeline spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_GOLD,     brandKit)} bgPattern="hex" />;
export const ProjectTimelineMidnightDashboard: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <ProjectTimeline spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_MIDNIGHT, brandKit)} bgPattern="grid" />;
export const ProjectTimelineCrimsonDashboard:  React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <ProjectTimeline spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_CRIMSON,  brandKit)} bgPattern="dots" />;
export const ProjectTimelineLavenderDashboard: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <ProjectTimeline spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_LAVENDER, brandKit)} bgPattern="hex" />;
export const ProjectTimelineArcticDashboard:   React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <ProjectTimeline spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_ARCTIC,   brandKit)} bgPattern="dots" />;
export const ProjectTimelineEspressoDashboard: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <ProjectTimeline spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_ESPRESSO, brandKit)} bgPattern="none" />;

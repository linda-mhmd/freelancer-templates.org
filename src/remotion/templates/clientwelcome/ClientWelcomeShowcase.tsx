import React from "react";
import { ClientWelcome } from "./ClientWelcome";
import type { ClientWelcomeSpec } from "./ClientWelcome";
import {
  THEME_DARK, THEME_CLEAN, THEME_BOLD, THEME_WARM, THEME_MINIMAL, THEME_NEON,
  THEME_OCEAN, THEME_SUNSET, THEME_FOREST, THEME_ROSE, THEME_GOLD, THEME_MIDNIGHT,
  THEME_CRIMSON, THEME_LAVENDER, THEME_ARCTIC, THEME_ESPRESSO,
  BrandKit, applyBrandKit,
} from "../_shared/themes";

const SAMPLE_SPEC: ClientWelcomeSpec = {
  greeting: "Welcome aboard,",
  client_name: "Acme Corp",
  tagline: "We're thrilled to work together. Here's everything you need to hit the ground running.",
  freelancer_name: "Linda Mohamed",
  freelancer_title: "Product & Growth Consultant",
  next_steps: [
    { icon: "📅", title: "Kickoff Call",        description: "30 min session booked for Thursday 9 AM your time" },
    { icon: "📋", title: "Shared Workspace",    description: "Notion board invite already sent to your inbox" },
    { icon: "💬", title: "Slack Channel",        description: "#project-acme is live — say hello!" },
  ],
  cta: "Your journey starts now → Let's build something great together.",
};

export const ClientWelcomeDarkDashboard:     React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <ClientWelcome spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_DARK,     brandKit)} bgPattern="grid" />;
export const ClientWelcomeBoldDashboard:     React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <ClientWelcome spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_BOLD,     brandKit)} bgPattern="dots" />;
export const ClientWelcomeCleanDashboard:    React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <ClientWelcome spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_CLEAN,    brandKit)} bgPattern="dots" />;
export const ClientWelcomeWarmDashboard:     React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <ClientWelcome spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_WARM,     brandKit)} bgPattern="hex" />;
export const ClientWelcomeMinimalDashboard:  React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <ClientWelcome spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_MINIMAL,  brandKit)} bgPattern="none" />;
export const ClientWelcomeNeonDashboard:     React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <ClientWelcome spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_NEON,     brandKit)} bgPattern="grid" />;
export const ClientWelcomeOceanDashboard:    React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <ClientWelcome spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_OCEAN,    brandKit)} bgPattern="dots" />;
export const ClientWelcomeSunsetDashboard:   React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <ClientWelcome spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_SUNSET,   brandKit)} bgPattern="hex" />;
export const ClientWelcomeForestDashboard:   React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <ClientWelcome spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_FOREST,   brandKit)} bgPattern="dots" />;
export const ClientWelcomeRoseDashboard:     React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <ClientWelcome spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_ROSE,     brandKit)} bgPattern="none" />;
export const ClientWelcomeGoldDashboard:     React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <ClientWelcome spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_GOLD,     brandKit)} bgPattern="hex" />;
export const ClientWelcomeMidnightDashboard: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <ClientWelcome spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_MIDNIGHT, brandKit)} bgPattern="grid" />;
export const ClientWelcomeCrimsonDashboard:  React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <ClientWelcome spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_CRIMSON,  brandKit)} bgPattern="dots" />;
export const ClientWelcomeLavenderDashboard: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <ClientWelcome spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_LAVENDER, brandKit)} bgPattern="hex" />;
export const ClientWelcomeArcticDashboard:   React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <ClientWelcome spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_ARCTIC,   brandKit)} bgPattern="dots" />;
export const ClientWelcomeEspressoDashboard: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <ClientWelcome spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_ESPRESSO, brandKit)} bgPattern="none" />;

/**
 * SocialProof Showcase - 6 pre-configured compositions with sample data
 * Each pairs a theme with the layout that suits it best.
 */

import React from "react";
import { SocialProof, SocialProofSpec } from "./SocialProof";
import { THEME_DARK, THEME_CLEAN, THEME_BOLD, THEME_WARM, THEME_MINIMAL, THEME_NEON } from "../_shared/themes";

const SAMPLE_SPEC: SocialProofSpec = {
  headline: "A Milestone Worth Celebrating",
  subheadline: "What started as a side project is now a full-time mission.",
  mainStat: { label: "Happy Clients", value: 100, suffix: "+" },
  supportingStats: [
    { label: "Projects Delivered", value: 247 },
    { label: "Countries", value: 18 },
    { label: "5-Star Reviews", value: 94, suffix: "%" },
  ],
  context: "From my first Upwork gig to building a global practice - thank you to every client who trusted the process.",
  hashtags: ["Milestone", "Freelancing", "100Clients"],
  freelancerName: "Linda Mohamed",
  freelancerTitle: "Full-Stack Developer & Consultant",
};

// Dark + Milestone - the classic celebratory look
export const SocialProofDarkMilestone: React.FC = () => (
  <SocialProof spec={SAMPLE_SPEC} theme={THEME_DARK} layout="milestone" />
);

// Clean + Achievement - professional badge-centered
export const SocialProofCleanAchievement: React.FC = () => (
  <SocialProof spec={{
    ...SAMPLE_SPEC,
    headline: "AWS Certified Solutions Architect",
    subheadline: "Professional certification achieved",
    mainStat: { label: "Exam Score", value: 892, suffix: "/1000" },
    supportingStats: [
      { label: "Study Hours", value: 120 },
      { label: "Practice Tests", value: 8 },
    ],
  }} theme={THEME_CLEAN} layout="achievement" />
);

// Bold + Announcement - high-impact news
export const SocialProofBoldAnnouncement: React.FC = () => (
  <SocialProof spec={{
    ...SAMPLE_SPEC,
    headline: "Launching My New AI Automation Service",
    subheadline: "Helping businesses automate their workflows with custom AI agents.",
    mainStat: { label: "Early Signups", value: 50, suffix: "+" },
    supportingStats: [
      { label: "Avg. Time Saved", value: 40, suffix: "%" },
      { label: "ROI", value: 3, suffix: "x" },
    ],
    hashtags: ["Launch", "AIAutomation", "NewService"],
  }} theme={THEME_BOLD} layout="announcement" />
);

// Warm + Milestone - friendly celebration
export const SocialProofWarmMilestone: React.FC = () => (
  <SocialProof spec={{
    ...SAMPLE_SPEC,
    headline: "One Year of Freelancing",
    mainStat: { label: "Months", value: 12, prefix: "" },
    supportingStats: [
      { label: "Revenue", value: 85, suffix: "k", prefix: "$" },
      { label: "Repeat Clients", value: 67, suffix: "%" },
    ],
    context: "365 days of learning, building, and growing. Here's to year two.",
    hashtags: ["Anniversary", "FreelanceLife"],
  }} theme={THEME_WARM} layout="milestone" />
);

// Minimal + Achievement - understated elegance
export const SocialProofMinimalAchievement: React.FC = () => (
  <SocialProof spec={{
    ...SAMPLE_SPEC,
    headline: "Top Rated Plus on Upwork",
    subheadline: "Recognized for consistent quality and client satisfaction",
    mainStat: { label: "Job Success Score", value: 100, suffix: "%" },
    supportingStats: [
      { label: "Completed Jobs", value: 89 },
      { label: "Earnings", value: 150, suffix: "k+", prefix: "$" },
    ],
  }} theme={THEME_MINIMAL} layout="achievement" />
);

// Neon + Announcement - energetic tech launch
export const SocialProofNeonAnnouncement: React.FC = () => (
  <SocialProof spec={{
    ...SAMPLE_SPEC,
    headline: "Open-Sourcing My Video Engine",
    subheadline: "The same tool that powers 200+ client videos - now free for everyone.",
    mainStat: { label: "GitHub Stars", value: 2400 },
    supportingStats: [
      { label: "Contributors", value: 34 },
      { label: "Downloads", value: 12, suffix: "k" },
    ],
    hashtags: ["OpenSource", "DevTools", "Remotion"],
  }} theme={THEME_NEON} layout="announcement" />
);

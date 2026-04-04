/**
 * CaseStudy Showcase - 6 pre-configured compositions with sample data
 */

import React from "react";
import { CaseStudy, CaseStudySpec } from "./CaseStudy";
import { THEME_DARK, THEME_CLEAN, THEME_BOLD, THEME_WARM, THEME_MINIMAL, THEME_NEON } from "../_shared/themes";

const SAMPLE_SPEC: CaseStudySpec = {
  clientName: "TechFlow Inc.",
  projectTitle: "E-Commerce Platform Migration",
  industry: "SaaS / E-Commerce",
  duration: "3 months",
  problem: "Legacy monolith couldn't handle Black Friday traffic. Page load times exceeded 8 seconds, cart abandonment hit 73%, and the team spent 60% of sprint time on hotfixes.",
  approach: [
    "Migrated to microservices architecture on AWS ECS",
    "Implemented CDN + edge caching with CloudFront",
    "Built auto-scaling pipeline with load testing",
    "Redesigned checkout flow for mobile-first UX",
  ],
  results: [
    { label: "Page Load Time", before: 8, after: 1, suffix: "s", improvement: "-87%" },
    { label: "Cart Abandonment", before: 73, after: 31, suffix: "%", improvement: "-58%" },
    { label: "Revenue (Black Friday)", before: 120, after: 340, suffix: "k", improvement: "+183%" },
    { label: "Uptime", before: 96, after: 99, suffix: ".9%", improvement: "4 nines" },
  ],
  testimonialQuote: "The migration paid for itself in the first week of November. Best investment we made all year.",
  heroStat: { label: "Revenue Increase", value: 183, suffix: "%" },
};

// Dark + Narrative - detailed project walkthrough
export const CaseStudyDarkNarrative: React.FC = () => (
  <CaseStudy spec={SAMPLE_SPEC} theme={THEME_DARK} layout="narrative" />
);

// Clean + Comparison - professional before/after
export const CaseStudyCleanComparison: React.FC = () => (
  <CaseStudy spec={SAMPLE_SPEC} theme={THEME_CLEAN} layout="comparison" />
);

// Bold + Spotlight - hero stat impact
export const CaseStudyBoldSpotlight: React.FC = () => (
  <CaseStudy spec={{
    ...SAMPLE_SPEC,
    clientName: "GrowthLab",
    projectTitle: "AI-Powered Lead Scoring System",
    industry: "Marketing Tech",
    heroStat: { label: "Conversion Rate Increase", value: 340, suffix: "%" },
  }} theme={THEME_BOLD} layout="spotlight" />
);

// Warm + Narrative - friendly storytelling
export const CaseStudyWarmNarrative: React.FC = () => (
  <CaseStudy spec={{
    ...SAMPLE_SPEC,
    clientName: "Bloom Studio",
    projectTitle: "Brand Identity & Website Redesign",
    industry: "Creative Agency",
    duration: "6 weeks",
    problem: "Outdated branding was losing them enterprise clients. Website bounce rate was 68% and they had zero inbound leads from organic search.",
    approach: [
      "Full brand audit and competitor analysis",
      "New visual identity with design system",
      "Responsive website with SEO optimization",
    ],
    results: [
      { label: "Bounce Rate", before: 68, after: 29, suffix: "%", improvement: "-57%" },
      { label: "Organic Leads/mo", before: 0, after: 24, suffix: "", improvement: "New channel" },
      { label: "Client Inquiries", before: 3, after: 15, suffix: "/mo", improvement: "+400%" },
    ],
  }} theme={THEME_WARM} layout="narrative" />
);

// Minimal + Comparison - clean data presentation
export const CaseStudyMinimalComparison: React.FC = () => (
  <CaseStudy spec={{
    ...SAMPLE_SPEC,
    clientName: "DataPipe",
    projectTitle: "Database Performance Optimization",
    industry: "FinTech",
    results: [
      { label: "Query Time (avg)", before: 450, after: 12, suffix: "ms", improvement: "-97%" },
      { label: "Throughput", before: 500, after: 8000, suffix: " req/s", improvement: "+1500%" },
      { label: "Monthly Cost", before: 12, after: 4, suffix: "k", improvement: "-67%" },
    ],
  }} theme={THEME_MINIMAL} layout="comparison" />
);

// Neon + Spotlight - tech-forward impact
export const CaseStudyNeonSpotlight: React.FC = () => (
  <CaseStudy spec={{
    ...SAMPLE_SPEC,
    clientName: "NeuralOps",
    projectTitle: "ML Pipeline Automation",
    industry: "AI / MLOps",
    heroStat: { label: "Deployment Time Reduction", value: 95, suffix: "%" },
    results: [
      { label: "Deploy Time", before: 48, after: 2, suffix: "hrs", improvement: "-96%" },
      { label: "Model Accuracy", before: 82, after: 94, suffix: "%", improvement: "+15%" },
      { label: "Experiments/Week", before: 3, after: 40, suffix: "", improvement: "+1233%" },
    ],
    testimonialQuote: "We went from deploying once a week to multiple times a day. Game changer.",
  }} theme={THEME_NEON} layout="spotlight" />
);

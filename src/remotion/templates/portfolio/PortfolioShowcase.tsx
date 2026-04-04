/**
 * Portfolio Showcase - Pre-configured compositions for each theme × layout combo.
 *
 * REGISTERED COMPOSITIONS:
 *   PortfolioDarkGallery       - Dark theme, gallery layout
 *   PortfolioCleanCaseStudy    - Clean theme, case study layout
 *   PortfolioBoldReel          - Bold theme, reel layout
 *   PortfolioWarmGallery       - Warm theme, gallery layout
 *   PortfolioMinimalCaseStudy  - Minimal theme, case study layout
 *   PortfolioNeonReel          - Neon theme, reel layout
 */

import React from "react";
import { Portfolio } from "./Portfolio";
import type { PortfolioSpec } from "./Portfolio";
import {
  THEME_DARK,
  THEME_CLEAN,
  THEME_BOLD,
  THEME_WARM,
  THEME_MINIMAL,
  THEME_NEON,
} from "../_shared/themes";

// ── Sample Data: Design & Dev Freelancer ────────────────────────

const SAMPLE_DESIGN_SPEC: PortfolioSpec = {
  freelancer_name: "Linda Mohamed",
  freelancer_title: "Full-Stack Designer & Developer",
  projects: [
    {
      title: "SaaS Dashboard Redesign",
      client: "FinTrack",
      description: "Redesigned the analytics dashboard, improving user engagement by 45% and reducing churn.",
      tags: ["React", "Figma", "D3.js"],
    },
    {
      title: "E-Commerce Mobile App",
      client: "StyleHouse",
      description: "Built a cross-platform shopping app with AR try-on feature and real-time inventory sync.",
      tags: ["React Native", "AWS", "Stripe"],
    },
    {
      title: "AI Content Platform",
      client: "WriteFlow",
      description: "Developed an AI-powered writing assistant with collaborative editing and SEO optimization.",
      tags: ["Next.js", "OpenAI", "PostgreSQL"],
    },
    {
      title: "Healthcare Patient Portal",
      client: "MedConnect",
      description: "HIPAA-compliant patient portal with appointment scheduling and secure messaging.",
      tags: ["TypeScript", "Node.js", "FHIR"],
    },
  ],
  skills: ["React", "TypeScript", "AWS", "Figma", "Node.js", "PostgreSQL"],
  contact_url: "View My Work →",
};

// ── Sample Data: Cloud Consultant ───────────────────────────────

const SAMPLE_CLOUD_SPEC: PortfolioSpec = {
  freelancer_name: "Linda Mohamed",
  freelancer_title: "Cloud Architecture Consultant",
  projects: [
    {
      title: "Serverless Migration",
      client: "DataPipe Inc.",
      description: "Migrated monolithic API to serverless, cutting infrastructure costs by 60%.",
      tags: ["Lambda", "API Gateway", "DynamoDB"],
    },
    {
      title: "Real-Time Analytics Pipeline",
      client: "StreamMetrics",
      description: "Built event-driven analytics processing 2M events/sec with sub-second latency.",
      tags: ["Kinesis", "Flink", "Redshift"],
    },
    {
      title: "Multi-Region DR Setup",
      client: "GlobalBank",
      description: "Designed active-active disaster recovery across 3 regions with 99.99% uptime SLA.",
      tags: ["CloudFormation", "Route53", "Aurora"],
    },
    {
      title: "CI/CD Platform Overhaul",
      client: "DevForce",
      description: "Rebuilt deployment pipeline reducing release cycles from 2 weeks to 30 minutes.",
      tags: ["CDK", "CodePipeline", "ECS"],
    },
  ],
  skills: ["AWS", "Terraform", "Kubernetes", "Python", "Go", "CDK"],
  contact_url: "Let's Build Together →",
};

// ── Composition: Dark + Gallery ─────────────────────────────────
export const PortfolioDarkGallery: React.FC = () => (
  <Portfolio spec={SAMPLE_DESIGN_SPEC} theme={THEME_DARK} layout="gallery" bgPattern="grid" />
);

// ── Composition: Clean + Case Study ─────────────────────────────
export const PortfolioCleanCaseStudy: React.FC = () => (
  <Portfolio spec={SAMPLE_CLOUD_SPEC} theme={THEME_CLEAN} layout="caseStudy" bgPattern="dots" />
);

// ── Composition: Bold + Reel ────────────────────────────────────
export const PortfolioBoldReel: React.FC = () => (
  <Portfolio spec={SAMPLE_DESIGN_SPEC} theme={THEME_BOLD} layout="reel" bgPattern="none" />
);

// ── Composition: Warm + Gallery ─────────────────────────────────
export const PortfolioWarmGallery: React.FC = () => (
  <Portfolio spec={SAMPLE_CLOUD_SPEC} theme={THEME_WARM} layout="gallery" bgPattern="hex" />
);

// ── Composition: Minimal + Case Study ───────────────────────────
export const PortfolioMinimalCaseStudy: React.FC = () => (
  <Portfolio spec={SAMPLE_DESIGN_SPEC} theme={THEME_MINIMAL} layout="caseStudy" bgPattern="none" />
);

// ── Composition: Neon + Reel ────────────────────────────────────
export const PortfolioNeonReel: React.FC = () => (
  <Portfolio spec={SAMPLE_CLOUD_SPEC} theme={THEME_NEON} layout="reel" bgPattern="hex" />
);

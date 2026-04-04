/**
 * Pricing Showcase - 6 pre-configured compositions with sample data
 */

import React from "react";
import { Pricing, PricingSpec } from "./Pricing";
import { THEME_DARK, THEME_CLEAN, THEME_BOLD, THEME_WARM, THEME_MINIMAL, THEME_NEON } from "../_shared/themes";

const SAMPLE_SPEC: PricingSpec = {
  headline: "Simple, Transparent Pricing",
  subheadline: "Choose the plan that fits your project scope",
  tiers: [
    {
      name: "Starter",
      price: 499,
      period: "/project",
      description: "Perfect for small projects and quick wins",
      features: [
        { text: "Up to 5 pages", included: true },
        { text: "Responsive design", included: true },
        { text: "1 revision round", included: true },
        { text: "Source files", included: false },
        { text: "Priority support", included: false },
        { text: "Ongoing maintenance", included: false },
      ],
    },
    {
      name: "Professional",
      price: 1499,
      period: "/project",
      description: "Full-featured solution for growing businesses",
      highlighted: true,
      badge: "Most Popular",
      features: [
        { text: "Up to 15 pages", included: true },
        { text: "Responsive design", included: true },
        { text: "3 revision rounds", included: true },
        { text: "Source files", included: true },
        { text: "Priority support", included: true },
        { text: "Ongoing maintenance", included: false },
      ],
    },
    {
      name: "Enterprise",
      price: 3999,
      period: "/project",
      description: "Custom solutions with dedicated support",
      features: [
        { text: "Unlimited pages", included: true },
        { text: "Responsive design", included: true },
        { text: "Unlimited revisions", included: true },
        { text: "Source files", included: true },
        { text: "Priority support", included: true },
        { text: "Ongoing maintenance", included: true },
      ],
    },
  ],
  footnote: "All plans include a 30-day money-back guarantee",
  freelancerName: "Linda Mohamed",
};

// Dark + Tiers - classic pricing cards
export const PricingDarkTiers: React.FC = () => (
  <Pricing spec={SAMPLE_SPEC} theme={THEME_DARK} layout="tiers" />
);

// Clean + Comparison - professional feature table
export const PricingCleanComparison: React.FC = () => (
  <Pricing spec={SAMPLE_SPEC} theme={THEME_CLEAN} layout="comparison" />
);

// Bold + Spotlight - featured plan hero
export const PricingBoldSpotlight: React.FC = () => (
  <Pricing spec={{
    ...SAMPLE_SPEC,
    headline: "The Pro Plan - Built for Serious Growth",
    subheadline: "Everything you need, nothing you don't",
  }} theme={THEME_BOLD} layout="spotlight" />
);

// Warm + Tiers - friendly pricing
export const PricingWarmTiers: React.FC = () => (
  <Pricing spec={{
    ...SAMPLE_SPEC,
    headline: "Invest in Your Brand",
    subheadline: "Flexible packages for every budget",
    tiers: SAMPLE_SPEC.tiers.map(t => ({
      ...t,
      period: "/month",
      price: t.name === "Starter" ? 49 : t.name === "Professional" ? 149 : 399,
    })),
  }} theme={THEME_WARM} layout="tiers" />
);

// Minimal + Comparison - clean data table
export const PricingMinimalComparison: React.FC = () => (
  <Pricing spec={{
    ...SAMPLE_SPEC,
    headline: "Compare Plans",
    subheadline: undefined,
  }} theme={THEME_MINIMAL} layout="comparison" />
);

// Neon + Spotlight - tech-forward featured plan
export const PricingNeonSpotlight: React.FC = () => (
  <Pricing spec={{
    ...SAMPLE_SPEC,
    headline: "Ship Faster with the Pro Plan",
    subheadline: "Built for developers who mean business",
    tiers: [
      { ...SAMPLE_SPEC.tiers[0], name: "Solo", price: 29, period: "/mo" },
      { ...SAMPLE_SPEC.tiers[1], name: "Team", price: 99, period: "/mo", badge: "Best Value" },
      { ...SAMPLE_SPEC.tiers[2], name: "Scale", price: 299, period: "/mo" },
    ],
  }} theme={THEME_NEON} layout="spotlight" />
);

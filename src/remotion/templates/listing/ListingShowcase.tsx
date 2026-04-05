/**
 * Listing Showcase Compositions - 6 variants (3 layouts × 2 themes)
 */
import React from "react";
import { Listing } from "./Listing";
import {
  THEME_CLEAN,
  THEME_MINIMAL,
  BrandKit,
  applyBrandKit,
} from "../_shared/themes";

const SAMPLE_SPEC = {
  property_title: "Skyline Penthouse Suite",
  price: 1250000,
  currency: "$",
  location: "Manhattan, NY",
  features: [
    { label: "4 Bedrooms" },
    { label: "3 Bathrooms" },
    { label: "2,400 sq ft" },
    { label: "Rooftop Terrace" },
  ],
  cta: "Book a Viewing",
};

export const ListingCleanShowcase: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <Listing spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_CLEAN, brandKit)} layout="showcase" />
);
export const ListingMinimalShowcase: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <Listing spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_MINIMAL, brandKit)} layout="showcase" />
);
export const ListingCleanFeatureGrid: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <Listing spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_CLEAN, brandKit)} layout="feature-grid" />
);
export const ListingMinimalFeatureGrid: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <Listing spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_MINIMAL, brandKit)} layout="feature-grid" />
);
export const ListingCleanComparison: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <Listing spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_CLEAN, brandKit)} layout="comparison" />
);
export const ListingMinimalComparison: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <Listing spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_MINIMAL, brandKit)} layout="comparison" />
);

// ── Extended Themes ──────────────────────────────────────────────
export const ListingOceanShowcase: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <Listing spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_OCEAN, brandKit)} layout="showcase" bgPattern="grid" />
);
export const ListingSunsetShowcase: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <Listing spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_SUNSET, brandKit)} layout="showcase" bgPattern="none" />
);
export const ListingForestFeatureGrid: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <Listing spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_FOREST, brandKit)} layout="feature-grid" bgPattern="hex" />
);
export const ListingRoseFeatureGrid: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <Listing spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_ROSE, brandKit)} layout="feature-grid" bgPattern="dots" />
);
export const ListingGoldComparison: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <Listing spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_GOLD, brandKit)} layout="comparison" bgPattern="none" />
);
export const ListingMidnightComparison: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <Listing spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_MIDNIGHT, brandKit)} layout="comparison" bgPattern="grid" />
);
export const ListingCrimsonShowcase: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <Listing spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_CRIMSON, brandKit)} layout="showcase" bgPattern="none" />
);
export const ListingLavenderShowcase: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <Listing spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_LAVENDER, brandKit)} layout="showcase" bgPattern="hex" />
);
export const ListingArcticFeatureGrid: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <Listing spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_ARCTIC, brandKit)} layout="feature-grid" bgPattern="dots" />
);
export const ListingEspressoFeatureGrid: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <Listing spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_ESPRESSO, brandKit)} layout="feature-grid" bgPattern="none" />
);

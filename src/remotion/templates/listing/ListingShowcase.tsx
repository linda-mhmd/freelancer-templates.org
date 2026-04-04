/**
 * Listing Showcase Compositions - 6 variants (3 layouts × 2 themes)
 */
import React from "react";
import { Listing } from "./Listing";
import { THEME_CLEAN, THEME_MINIMAL } from "../_shared/themes";

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

export const ListingCleanShowcase: React.FC = () => (
  <Listing spec={SAMPLE_SPEC} theme={THEME_CLEAN} layout="showcase" />
);
export const ListingMinimalShowcase: React.FC = () => (
  <Listing spec={SAMPLE_SPEC} theme={THEME_MINIMAL} layout="showcase" />
);
export const ListingCleanFeatureGrid: React.FC = () => (
  <Listing spec={SAMPLE_SPEC} theme={THEME_CLEAN} layout="feature-grid" />
);
export const ListingMinimalFeatureGrid: React.FC = () => (
  <Listing spec={SAMPLE_SPEC} theme={THEME_MINIMAL} layout="feature-grid" />
);
export const ListingCleanComparison: React.FC = () => (
  <Listing spec={SAMPLE_SPEC} theme={THEME_CLEAN} layout="comparison" />
);
export const ListingMinimalComparison: React.FC = () => (
  <Listing spec={SAMPLE_SPEC} theme={THEME_MINIMAL} layout="comparison" />
);

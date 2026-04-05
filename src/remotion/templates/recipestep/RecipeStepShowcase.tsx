/**
 * RecipeStep Showcase Compositions - 6 variants (3 layouts × 2 themes)
 */
import React from "react";
import { RecipeStep } from "./RecipeStep";
import {
  THEME_WARM,
  THEME_CLEAN,
  BrandKit,
  applyBrandKit,
} from "../_shared/themes";

const SAMPLE_SPEC = {
  title: "Classic Pasta Carbonara",
  ingredients: [
    { name: "Spaghetti", quantity: "400g" },
    { name: "Guanciale", quantity: "200g" },
    { name: "Egg Yolks", quantity: "4" },
    { name: "Pecorino Romano", quantity: "100g" },
    { name: "Black Pepper", quantity: "2 tsp" },
    { name: "Salt", quantity: "to taste" },
  ],
  steps: [
    { instruction: "Bring a large pot of salted water to boil", time: 10 },
    { instruction: "Dice guanciale and cook until crispy", time: 8 },
    { instruction: "Whisk egg yolks with grated pecorino", time: 3 },
    { instruction: "Cook pasta until al dente and drain", time: 12 },
    { instruction: "Toss pasta with guanciale off heat", time: 2 },
    { instruction: "Add egg mixture and toss until creamy", time: 2 },
  ],
  prep_time: 15,
  cook_time: 25,
  servings: 4,
};

export const RecipeStepWarmIngredientList: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <RecipeStep spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_WARM, brandKit)} layout="ingredient-list" />
);
export const RecipeStepCleanIngredientList: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <RecipeStep spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_CLEAN, brandKit)} layout="ingredient-list" />
);
export const RecipeStepWarmStepSequence: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <RecipeStep spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_WARM, brandKit)} layout="step-sequence" />
);
export const RecipeStepCleanStepSequence: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <RecipeStep spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_CLEAN, brandKit)} layout="step-sequence" />
);
export const RecipeStepWarmSummaryCard: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <RecipeStep spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_WARM, brandKit)} layout="summary-card" />
);
export const RecipeStepCleanSummaryCard: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <RecipeStep spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_CLEAN, brandKit)} layout="summary-card" />
);

// ── Extended Themes ──────────────────────────────────────────────
export const RecipeStepOceanIngredientList: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <RecipeStep spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_OCEAN, brandKit)} layout="ingredient-list" bgPattern="grid" />
);
export const RecipeStepSunsetIngredientList: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <RecipeStep spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_SUNSET, brandKit)} layout="ingredient-list" bgPattern="none" />
);
export const RecipeStepForestStepSequence: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <RecipeStep spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_FOREST, brandKit)} layout="step-sequence" bgPattern="hex" />
);
export const RecipeStepRoseStepSequence: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <RecipeStep spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_ROSE, brandKit)} layout="step-sequence" bgPattern="dots" />
);
export const RecipeStepGoldSummaryCard: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <RecipeStep spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_GOLD, brandKit)} layout="summary-card" bgPattern="none" />
);
export const RecipeStepMidnightSummaryCard: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <RecipeStep spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_MIDNIGHT, brandKit)} layout="summary-card" bgPattern="grid" />
);
export const RecipeStepCrimsonIngredientList: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <RecipeStep spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_CRIMSON, brandKit)} layout="ingredient-list" bgPattern="none" />
);
export const RecipeStepLavenderIngredientList: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <RecipeStep spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_LAVENDER, brandKit)} layout="ingredient-list" bgPattern="hex" />
);
export const RecipeStepArcticStepSequence: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <RecipeStep spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_ARCTIC, brandKit)} layout="step-sequence" bgPattern="dots" />
);
export const RecipeStepEspressoStepSequence: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <RecipeStep spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_ESPRESSO, brandKit)} layout="step-sequence" bgPattern="none" />
);

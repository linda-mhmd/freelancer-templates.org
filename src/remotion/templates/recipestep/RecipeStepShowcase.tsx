/**
 * RecipeStep Showcase Compositions - 6 variants (3 layouts × 2 themes)
 */
import React from "react";
import { RecipeStep } from "./RecipeStep";
import { THEME_WARM, THEME_CLEAN } from "../_shared/themes";

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

export const RecipeStepWarmIngredientList: React.FC = () => (
  <RecipeStep spec={SAMPLE_SPEC} theme={THEME_WARM} layout="ingredient-list" />
);
export const RecipeStepCleanIngredientList: React.FC = () => (
  <RecipeStep spec={SAMPLE_SPEC} theme={THEME_CLEAN} layout="ingredient-list" />
);
export const RecipeStepWarmStepSequence: React.FC = () => (
  <RecipeStep spec={SAMPLE_SPEC} theme={THEME_WARM} layout="step-sequence" />
);
export const RecipeStepCleanStepSequence: React.FC = () => (
  <RecipeStep spec={SAMPLE_SPEC} theme={THEME_CLEAN} layout="step-sequence" />
);
export const RecipeStepWarmSummaryCard: React.FC = () => (
  <RecipeStep spec={SAMPLE_SPEC} theme={THEME_WARM} layout="summary-card" />
);
export const RecipeStepCleanSummaryCard: React.FC = () => (
  <RecipeStep spec={SAMPLE_SPEC} theme={THEME_CLEAN} layout="summary-card" />
);

/**
 * FitnessRoutine Showcase Compositions - 6 variants (3 layouts × 2 themes)
 */
import React from "react";
import { FitnessRoutine } from "./FitnessRoutine";
import {
  THEME_BOLD,
  THEME_NEON,
  BrandKit,
  applyBrandKit,
  THEME_OCEAN, THEME_SUNSET, THEME_FOREST, THEME_ROSE, THEME_GOLD, THEME_MIDNIGHT, THEME_CRIMSON, THEME_LAVENDER, THEME_ARCTIC, THEME_ESPRESSO
} from "../_shared/themes"

const SAMPLE_SPEC = {
  workout_title: "Full Body HIIT Blast",
  exercises: [
    { name: "Jumping Jacks", reps: 30, sets: 3 },
    { name: "Burpees", reps: 10, sets: 3 },
    { name: "Mountain Climbers", reps: 20, sets: 3 },
    { name: "Kettlebell Swings", reps: 15, sets: 3 },
    { name: "Box Jumps", reps: 12, sets: 3 },
  ],
  total_duration: 35,
  difficulty: "advanced" as const,
};

export const FitnessRoutineBoldExerciseList: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <FitnessRoutine spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_BOLD, brandKit)} layout="exercise-list" />
);
export const FitnessRoutineNeonExerciseList: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <FitnessRoutine spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_NEON, brandKit)} layout="exercise-list" />
);
export const FitnessRoutineBoldTimerFocus: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <FitnessRoutine spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_BOLD, brandKit)} layout="timer-focus" />
);
export const FitnessRoutineNeonTimerFocus: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <FitnessRoutine spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_NEON, brandKit)} layout="timer-focus" />
);
export const FitnessRoutineBoldCircuit: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <FitnessRoutine spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_BOLD, brandKit)} layout="circuit" />
);
export const FitnessRoutineNeonCircuit: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <FitnessRoutine spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_NEON, brandKit)} layout="circuit" />
);

// ── Extended Themes ──────────────────────────────────────────────
export const FitnessRoutineOceanExerciseList: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <FitnessRoutine spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_OCEAN, brandKit)} layout="exercise-list" bgPattern="grid" />
);
export const FitnessRoutineSunsetExerciseList: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <FitnessRoutine spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_SUNSET, brandKit)} layout="exercise-list" bgPattern="none" />
);
export const FitnessRoutineForestTimerFocus: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <FitnessRoutine spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_FOREST, brandKit)} layout="timer-focus" bgPattern="hex" />
);
export const FitnessRoutineRoseTimerFocus: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <FitnessRoutine spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_ROSE, brandKit)} layout="timer-focus" bgPattern="dots" />
);
export const FitnessRoutineGoldCircuit: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <FitnessRoutine spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_GOLD, brandKit)} layout="circuit" bgPattern="none" />
);
export const FitnessRoutineMidnightCircuit: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <FitnessRoutine spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_MIDNIGHT, brandKit)} layout="circuit" bgPattern="grid" />
);
export const FitnessRoutineCrimsonExerciseList: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <FitnessRoutine spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_CRIMSON, brandKit)} layout="exercise-list" bgPattern="none" />
);
export const FitnessRoutineLavenderExerciseList: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <FitnessRoutine spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_LAVENDER, brandKit)} layout="exercise-list" bgPattern="hex" />
);
export const FitnessRoutineArcticTimerFocus: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <FitnessRoutine spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_ARCTIC, brandKit)} layout="timer-focus" bgPattern="dots" />
);
export const FitnessRoutineEspressoTimerFocus: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <FitnessRoutine spec={SAMPLE_SPEC} theme={applyBrandKit(THEME_ESPRESSO, brandKit)} layout="timer-focus" bgPattern="none" />
);

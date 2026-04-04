/**
 * FitnessRoutine Showcase Compositions - 6 variants (3 layouts × 2 themes)
 */
import React from "react";
import { FitnessRoutine } from "./FitnessRoutine";
import { THEME_BOLD, THEME_NEON } from "../_shared/themes";

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

export const FitnessRoutineBoldExerciseList: React.FC = () => (
  <FitnessRoutine spec={SAMPLE_SPEC} theme={THEME_BOLD} layout="exercise-list" />
);
export const FitnessRoutineNeonExerciseList: React.FC = () => (
  <FitnessRoutine spec={SAMPLE_SPEC} theme={THEME_NEON} layout="exercise-list" />
);
export const FitnessRoutineBoldTimerFocus: React.FC = () => (
  <FitnessRoutine spec={SAMPLE_SPEC} theme={THEME_BOLD} layout="timer-focus" />
);
export const FitnessRoutineNeonTimerFocus: React.FC = () => (
  <FitnessRoutine spec={SAMPLE_SPEC} theme={THEME_NEON} layout="timer-focus" />
);
export const FitnessRoutineBoldCircuit: React.FC = () => (
  <FitnessRoutine spec={SAMPLE_SPEC} theme={THEME_BOLD} layout="circuit" />
);
export const FitnessRoutineNeonCircuit: React.FC = () => (
  <FitnessRoutine spec={SAMPLE_SPEC} theme={THEME_NEON} layout="circuit" />
);

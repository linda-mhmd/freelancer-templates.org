/**
 * Poll/Quiz Showcase - Pre-configured compositions for each layout × theme combo.
 *
 * 6 showcases: 3 layouts × 2 featured themes (dark, neon)
 * Duration: 270 frames (9s at 30fps)
 *
 * REGISTERED COMPOSITIONS:
 *   PollQuizDarkQuestionCard    - Dark theme, question-card layout
 *   PollQuizNeonQuestionCard    - Neon theme, question-card layout
 *   PollQuizDarkResultsBar      - Dark theme, results-bar layout
 *   PollQuizNeonResultsBar      - Neon theme, results-bar layout
 *   PollQuizDarkReveal          - Dark theme, reveal layout
 *   PollQuizNeonReveal          - Neon theme, reveal layout
 */

import React from "react";
import { PollQuiz } from "./PollQuiz";
import type { PollQuizSpec } from "./PollQuiz";
import { THEME_DARK, THEME_NEON } from "../_shared/themes";

// ── Sample Data: Programming Language Poll ──────────────────────
const SAMPLE_SPEC_POLL: PollQuizSpec = {
  question: "What is the most popular programming language in 2025?",
  options: [
    { text: "JavaScript", percentage: 42, isCorrect: true },
    { text: "Python", percentage: 35 },
    { text: "TypeScript", percentage: 15 },
    { text: "Rust", percentage: 8 },
  ],
};

// ── Sample Data: AI Knowledge Quiz ──────────────────────────────
const SAMPLE_SPEC_QUIZ: PollQuizSpec = {
  question: "Which AI model architecture powers most modern chatbots?",
  options: [
    { text: "Convolutional Neural Network", percentage: 8 },
    { text: "Transformer", percentage: 72, isCorrect: true },
    { text: "Recurrent Neural Network", percentage: 12 },
    { text: "Generative Adversarial Network", percentage: 8 },
  ],
};


// ── Composition: Dark + Question Card ───────────────────────────
export const PollQuizDarkQuestionCard: React.FC = () => (
  <PollQuiz spec={SAMPLE_SPEC_POLL} theme={THEME_DARK} layout="question-card" />
);

// ── Composition: Neon + Question Card ───────────────────────────
export const PollQuizNeonQuestionCard: React.FC = () => (
  <PollQuiz spec={SAMPLE_SPEC_POLL} theme={THEME_NEON} layout="question-card" />
);

// ── Composition: Dark + Results Bar ─────────────────────────────
export const PollQuizDarkResultsBar: React.FC = () => (
  <PollQuiz spec={SAMPLE_SPEC_POLL} theme={THEME_DARK} layout="results-bar" />
);

// ── Composition: Neon + Results Bar ─────────────────────────────
export const PollQuizNeonResultsBar: React.FC = () => (
  <PollQuiz spec={SAMPLE_SPEC_POLL} theme={THEME_NEON} layout="results-bar" />
);

// ── Composition: Dark + Reveal ──────────────────────────────────
export const PollQuizDarkReveal: React.FC = () => (
  <PollQuiz spec={SAMPLE_SPEC_QUIZ} theme={THEME_DARK} layout="reveal" />
);

// ── Composition: Neon + Reveal ──────────────────────────────────
export const PollQuizNeonReveal: React.FC = () => (
  <PollQuiz spec={SAMPLE_SPEC_QUIZ} theme={THEME_NEON} layout="reveal" />
);

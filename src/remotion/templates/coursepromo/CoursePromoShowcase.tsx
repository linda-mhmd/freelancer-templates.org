/**
 * Course Promo Showcase - Pre-configured compositions for each layout × theme combo.
 *
 * 6 showcases: 3 layouts × 2 featured themes (dark, clean)
 * Duration: 270 frames (9s at 30fps)
 *
 * REGISTERED COMPOSITIONS:
 *   CoursePromoDarkOverview      - Dark theme, overview layout
 *   CoursePromoCleanOverview     - Clean theme, overview layout
 *   CoursePromoDarkCurriculum    - Dark theme, curriculum layout
 *   CoursePromoCleanCurriculum   - Clean theme, curriculum layout
 *   CoursePromoDarkInstructor    - Dark theme, instructor layout
 *   CoursePromoCleanInstructor   - Clean theme, instructor layout
 */

import React from "react";
import { CoursePromo } from "./CoursePromo";
import type { CoursePromoSpec } from "./CoursePromo";
import {
  THEME_DARK,
  THEME_CLEAN,
  BrandKit,
  applyBrandKit,
  THEME_OCEAN, THEME_SUNSET, THEME_FOREST, THEME_ROSE, THEME_GOLD, THEME_MIDNIGHT, THEME_CRIMSON, THEME_LAVENDER, THEME_ARCTIC, THEME_ESPRESSO
} from "../_shared/themes"

// ── Sample Data: Web Development Course ─────────────────────────
const SAMPLE_SPEC_WEBDEV: CoursePromoSpec = {
  course_title: "Advanced React & TypeScript Masterclass",
  instructor: "Linda Mohamed",
  modules: [
    { title: "TypeScript Foundations", lesson_count: 12 },
    { title: "React Hooks Deep Dive", lesson_count: 8 },
    { title: "State Management Patterns", lesson_count: 10 },
    { title: "Performance Optimization", lesson_count: 6 },
    { title: "Testing & Deployment", lesson_count: 9 },
  ],
  student_count: 12500,
  rating: 4.8,
  cta: "Enroll Now - $49",
};

// ── Sample Data: Data Science Course ────────────────────────────
const SAMPLE_SPEC_DATASCIENCE: CoursePromoSpec = {
  course_title: "Machine Learning for Business Leaders",
  instructor: "Linda Mohamed",
  modules: [
    { title: "ML Fundamentals", lesson_count: 15 },
    { title: "Data Preprocessing", lesson_count: 10 },
    { title: "Supervised Learning", lesson_count: 12 },
    { title: "Neural Networks", lesson_count: 8 },
    { title: "Model Deployment", lesson_count: 7 },
    { title: "Ethics & Governance", lesson_count: 5 },
  ],
  student_count: 8400,
  rating: 4.6,
  cta: "Start Learning Free",
};

// ── Composition: Dark + Overview ────────────────────────────────
export const CoursePromoDarkOverview: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <CoursePromo spec={SAMPLE_SPEC_WEBDEV} theme={applyBrandKit(THEME_DARK, brandKit)} layout="overview" />
);

// ── Composition: Clean + Overview ───────────────────────────────
export const CoursePromoCleanOverview: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <CoursePromo spec={SAMPLE_SPEC_WEBDEV} theme={applyBrandKit(THEME_CLEAN, brandKit)} layout="overview" />
);

// ── Composition: Dark + Curriculum ──────────────────────────────
export const CoursePromoDarkCurriculum: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <CoursePromo spec={SAMPLE_SPEC_DATASCIENCE} theme={applyBrandKit(THEME_DARK, brandKit)} layout="curriculum" />
);

// ── Composition: Clean + Curriculum ─────────────────────────────
export const CoursePromoCleanCurriculum: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <CoursePromo spec={SAMPLE_SPEC_DATASCIENCE} theme={applyBrandKit(THEME_CLEAN, brandKit)} layout="curriculum" />
);

// ── Composition: Dark + Instructor ──────────────────────────────
export const CoursePromoDarkInstructor: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <CoursePromo spec={SAMPLE_SPEC_DATASCIENCE} theme={applyBrandKit(THEME_DARK, brandKit)} layout="instructor" />
);

// ── Composition: Clean + Instructor ─────────────────────────────
export const CoursePromoCleanInstructor: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <CoursePromo spec={SAMPLE_SPEC_DATASCIENCE} theme={applyBrandKit(THEME_CLEAN, brandKit)} layout="instructor" />
);

// ── Extended Themes ──────────────────────────────────────────────
export const CoursePromoOceanOverview: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <CoursePromo spec={SAMPLE_SPEC_WEBDEV} theme={applyBrandKit(THEME_OCEAN, brandKit)} layout="overview" bgPattern="grid" />
);
export const CoursePromoSunsetOverview: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <CoursePromo spec={SAMPLE_SPEC_WEBDEV} theme={applyBrandKit(THEME_SUNSET, brandKit)} layout="overview" bgPattern="none" />
);
export const CoursePromoForestCurriculum: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <CoursePromo spec={SAMPLE_SPEC_DATASCIENCE} theme={applyBrandKit(THEME_FOREST, brandKit)} layout="curriculum" bgPattern="hex" />
);
export const CoursePromoRoseCurriculum: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <CoursePromo spec={SAMPLE_SPEC_DATASCIENCE} theme={applyBrandKit(THEME_ROSE, brandKit)} layout="curriculum" bgPattern="dots" />
);
export const CoursePromoGoldInstructor: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <CoursePromo spec={SAMPLE_SPEC_DATASCIENCE} theme={applyBrandKit(THEME_GOLD, brandKit)} layout="instructor" bgPattern="none" />
);
export const CoursePromoMidnightInstructor: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <CoursePromo spec={SAMPLE_SPEC_DATASCIENCE} theme={applyBrandKit(THEME_MIDNIGHT, brandKit)} layout="instructor" bgPattern="grid" />
);
export const CoursePromoCrimsonOverview: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <CoursePromo spec={SAMPLE_SPEC_WEBDEV} theme={applyBrandKit(THEME_CRIMSON, brandKit)} layout="overview" bgPattern="none" />
);
export const CoursePromoLavenderOverview: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <CoursePromo spec={SAMPLE_SPEC_WEBDEV} theme={applyBrandKit(THEME_LAVENDER, brandKit)} layout="overview" bgPattern="hex" />
);
export const CoursePromoArcticCurriculum: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <CoursePromo spec={SAMPLE_SPEC_DATASCIENCE} theme={applyBrandKit(THEME_ARCTIC, brandKit)} layout="curriculum" bgPattern="dots" />
);
export const CoursePromoEspressoCurriculum: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => (
  <CoursePromo spec={SAMPLE_SPEC_DATASCIENCE} theme={applyBrandKit(THEME_ESPRESSO, brandKit)} layout="curriculum" bgPattern="none" />
);

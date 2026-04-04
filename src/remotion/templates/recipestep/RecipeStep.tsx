/**
 * Recipe / Step-by-Step Template - Creator Economy Templates (V6)
 *
 * A reusable, theme-aware recipe and step-by-step video template.
 * Renders ingredient lists, step sequences, and recipe summary cards.
 *
 * LAYOUT VARIANTS (via `layout` prop):
 *   "ingredient-list"  - Scrolling ingredient GlassCards with quantities (default)
 *   "step-sequence"    - Numbered steps with StepIndicator + timing indicators
 *   "summary-card"     - Recipe overview with CountUp stats
 *
 * DATA CONTRACT (RecipeStepSpec):
 *   {
 *     title: "Classic Pasta Carbonara",
 *     ingredients: [{ name: "Spaghetti", quantity: "400g" }],
 *     steps: [{ instruction: "Boil water", time: 10 }],
 *     prep_time: 15,
 *     cook_time: 25,
 *     servings: 4,
 *     theme: "warm",
 *     layout: "ingredient-list"
 *   }
 */

import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {
  springEntrance,
  fadeIn,
  staggerDelay,
  SPRING,
} from "../_shared/animations";
import type { Theme, BrandKit, PlatformHints, CollabMetadata } from "../_shared/themes";
import type { VideoFormat } from "../_shared/formats";
import { THEMES, THEME_DARK, applyBrandKit } from "../_shared/themes";
import { PADDING, TOP_SAFE, TYPE } from "../_shared/layouts";
import { SPACE } from "../_shared/DesignTokens";
import {
  GlassCard,
  BackgroundGrid,
  CountUp,
  StepIndicator,
  GradientBadge,
  CaptionItem,
} from "../_shared/components";

// ── Data Contract ───────────────────────────────────────────────
export interface RecipeStepSpec {
  title: string;
  ingredients: Array<{ name: string; quantity: string }>;
  steps: Array<{ instruction: string; time?: number }>;
  prep_time?: number;
  cook_time?: number;
  servings?: number;
  theme?: string;
  brandKit?: BrandKit;
  layout?: "ingredient-list" | "step-sequence" | "summary-card";
  format?: VideoFormat;
  captions?: CaptionItem[];
  captionLanguage?: string;
  platformHints?: PlatformHints;
  metadata?: CollabMetadata;
}

export interface RecipeStepProps {
  spec: RecipeStepSpec;
  theme?: Theme;
  layout?: "ingredient-list" | "step-sequence" | "summary-card";
}

// ── Scene Timing ────────────────────────────────────────────────
const TIMING = {
  titleStart: 5,
  itemsStart: 40,
  statsStart: 50,
  ctaStart: 200,
};

// ── QuickStart Defaults ─────────────────────────────────────────
/** Sensible defaults for QuickStart specs (title + theme only). */
const QUICKSTART_DEFAULTS: Omit<RecipeStepSpec, "title" | "theme" | "brandKit" | "layout"> = {
  ingredients: [
    { name: "Main Ingredient", quantity: "500g" },
    { name: "Seasoning", quantity: "2 tbsp" },
    { name: "Oil", quantity: "3 tbsp" },
    { name: "Fresh Herbs", quantity: "1 bunch" },
  ],
  steps: [
    { instruction: "Prepare and measure all ingredients", time: 5 },
    { instruction: "Heat oil in a large pan over medium heat", time: 3 },
    { instruction: "Cook the main ingredient until golden", time: 12 },
    { instruction: "Season and garnish with fresh herbs", time: 2 },
  ],
  prep_time: 15,
  cook_time: 25,
  servings: 4,
};

// ── Helper ──────────────────────────────────────────────────────
function formatTime(minutes: number): string {
  if (minutes >= 60) {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return m > 0 ? `${h} hr ${m} min` : `${h} hr`;
  }
  return `${minutes} min`;
}

// ── Main Component ──────────────────────────────────────────────
export const RecipeStep: React.FC<RecipeStepProps> = ({
  spec: rawSpec,
  theme,
  layout,
}) => {
  const spec = { ...QUICKSTART_DEFAULTS, ...rawSpec };
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const resolvedTheme = applyBrandKit(theme ?? THEMES[spec.theme ?? "dark"] ?? THEME_DARK, spec.brandKit);
  const resolvedLayout = layout ?? spec.layout ?? "ingredient-list";

  const bgStyle = resolvedTheme.bg.startsWith("linear-gradient")
    ? { background: resolvedTheme.bg }
    : { backgroundColor: resolvedTheme.bg };

  if (resolvedLayout === "step-sequence") {
    return <StepSequenceLayout spec={spec} theme={resolvedTheme} frame={frame} fps={fps} bgStyle={bgStyle} />;
  }
  if (resolvedLayout === "summary-card") {
    return <SummaryCardLayout spec={spec} theme={resolvedTheme} frame={frame} fps={fps} bgStyle={bgStyle} />;
  }
  return <IngredientListLayout spec={spec} theme={resolvedTheme} frame={frame} fps={fps} bgStyle={bgStyle} />;
};

// ── Layout: Ingredient List ─────────────────────────────────────
const IngredientListLayout: React.FC<{
  spec: RecipeStepSpec;
  theme: Theme;
  frame: number;
  fps: number;
  bgStyle: React.CSSProperties;
}> = ({ spec, theme, frame, fps, bgStyle }) => {
  const titleSpring = springEntrance(frame, fps, TIMING.titleStart, SPRING.default);
  const ingredients = spec.ingredients.slice(0, 8);

  return (
    <AbsoluteFill style={{ ...bgStyle, fontFamily: theme.fontFamily, color: theme.textPrimary }}>
      <BackgroundGrid pattern="dots" />
      <div style={{
        position: "absolute", inset: 0,
        display: "flex", flexDirection: "column",
        padding: `${TOP_SAFE}px ${PADDING}px`,
      }}>
        {/* Title */}
        <div style={{
          opacity: titleSpring,
          transform: `translateY(${(1 - titleSpring) * -20}px)`,
          fontSize: TYPE.hero, fontWeight: theme.headingWeight,
          marginBottom: 8,
        }}>
          {spec.title}
        </div>
        <div style={{
          opacity: fadeIn(frame, 15),
          fontSize: TYPE.subtitle, color: theme.textSecondary,
          marginBottom: 32,
        }}>
          {spec.ingredients.length} ingredients
        </div>

        {/* Ingredient cards */}
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr", gap: SPACE.md,
          alignContent: "start",
        }}>
          {ingredients.map((ing, i) => {
            const delay = staggerDelay(i, TIMING.itemsStart, 20);
            const s = springEntrance(frame, fps, delay, SPRING.default);
            return (
              <GlassCard key={i} theme={theme} style={{
                opacity: s,
                transform: `translateY(${(1 - s) * 20}px)`,
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: `${SPACE.md}px ${SPACE.lg}px`,
              }}>
                <span style={{ fontSize: TYPE.body, fontWeight: theme.bodyWeight }}>
                  {ing.name}
                </span>
                <span style={{ fontSize: TYPE.body, color: theme.accent, fontWeight: 600 }}>
                  {ing.quantity}
                </span>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ── Layout: Step Sequence ───────────────────────────────────────
const StepSequenceLayout: React.FC<{
  spec: RecipeStepSpec;
  theme: Theme;
  frame: number;
  fps: number;
  bgStyle: React.CSSProperties;
}> = ({ spec, theme, frame, fps, bgStyle }) => {
  const titleSpring = springEntrance(frame, fps, TIMING.titleStart, SPRING.default);
  const steps = spec.steps.slice(0, 6);

  return (
    <AbsoluteFill style={{ ...bgStyle, fontFamily: theme.fontFamily, color: theme.textPrimary }}>
      <BackgroundGrid pattern="grid" />
      <div style={{
        position: "absolute", inset: 0,
        display: "flex", flexDirection: "column",
        padding: `${TOP_SAFE}px ${PADDING}px`,
      }}>
        {/* Title */}
        <div style={{
          opacity: titleSpring,
          transform: `translateY(${(1 - titleSpring) * -20}px)`,
          fontSize: TYPE.hero, fontWeight: theme.headingWeight,
          marginBottom: 28,
        }}>
          {spec.title}
        </div>

        {/* Steps */}
        <div style={{ display: "flex", flexDirection: "column", gap: SPACE.md }}>
          {steps.map((step, i) => {
            const delay = staggerDelay(i, TIMING.itemsStart, 25);
            const s = springEntrance(frame, fps, delay, SPRING.default);
            const visibleSteps = steps.filter((_, j) => frame >= staggerDelay(j, TIMING.itemsStart, 25)).length;
            const status: "pending" | "active" | "completed" =
              i < visibleSteps - 1 ? "completed" : i === visibleSteps - 1 ? "active" : "pending";

            return (
              <div key={i} style={{
                opacity: s,
                transform: `translateX(${(1 - s) * -30}px)`,
                display: "flex", alignItems: "center", gap: 16,
              }}>
                <StepIndicator stepNumber={i + 1} status={status} label="" theme={theme} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: TYPE.body, fontWeight: 600 }}>
                    {step.instruction}
                  </div>
                  {step.time != null && (
                    <div style={{ fontSize: TYPE.caption, color: theme.textMuted, marginTop: 2 }}>
                      {formatTime(step.time)}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ── Layout: Summary Card ────────────────────────────────────────
const SummaryCardLayout: React.FC<{
  spec: RecipeStepSpec;
  theme: Theme;
  frame: number;
  fps: number;
  bgStyle: React.CSSProperties;
}> = ({ spec, theme, frame, fps, bgStyle }) => {
  const titleSpring = springEntrance(frame, fps, TIMING.titleStart, SPRING.default);
  const statsSpring = springEntrance(frame, fps, TIMING.statsStart, SPRING.default);
  const ctaSpring = springEntrance(frame, fps, TIMING.ctaStart, SPRING.snappy);

  const stats = [
    { label: "Prep Time", value: spec.prep_time ?? 0, suffix: " min" },
    { label: "Cook Time", value: spec.cook_time ?? 0, suffix: " min" },
    { label: "Servings", value: spec.servings ?? 0, suffix: "" },
    { label: "Ingredients", value: spec.ingredients.length, suffix: "" },
  ];

  return (
    <AbsoluteFill style={{ ...bgStyle, fontFamily: theme.fontFamily, color: theme.textPrimary }}>
      <BackgroundGrid pattern="dots" />
      <div style={{
        position: "absolute", inset: 0,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        padding: `${TOP_SAFE}px ${PADDING}px`,
        textAlign: "center",
      }}>
        {/* Title */}
        <div style={{
          opacity: titleSpring,
          transform: `translateY(${(1 - titleSpring) * -20}px)`,
          fontSize: TYPE.hero, fontWeight: theme.headingWeight,
          marginBottom: 12,
        }}>
          {spec.title}
        </div>
        <div style={{
          opacity: fadeIn(frame, 15),
          fontSize: TYPE.subtitle, color: theme.textSecondary,
          marginBottom: 40,
        }}>
          {spec.steps.length} easy steps
        </div>

        {/* Stats row */}
        <div style={{
          display: "flex", gap: 24,
          opacity: statsSpring,
          transform: `translateY(${(1 - statsSpring) * 20}px)`,
          marginBottom: 40,
        }}>
          {stats.map((stat, i) => (
            <GlassCard key={i} theme={theme} style={{
              padding: "20px 28px", textAlign: "center", minWidth: 120,
            }}>
              <div style={{ fontSize: TYPE.stat, fontWeight: theme.headingWeight, color: theme.accent }}>
                <CountUp target={stat.value} frame={frame} startFrame={TIMING.statsStart} suffix={stat.suffix} theme={theme} />
              </div>
              <div style={{ fontSize: TYPE.caption, color: theme.textMuted, marginTop: 4 }}>
                {stat.label}
              </div>
            </GlassCard>
          ))}
        </div>

        {/* CTA */}
        <div style={{ opacity: ctaSpring, transform: `scale(${ctaSpring})` }}>
          <GradientBadge theme={theme}>Let&apos;s Cook</GradientBadge>
        </div>
      </div>
    </AbsoluteFill>
  );
};

/**
 * Affiliate Review Template — Creator Economy Templates (V5)
 *
 * A reusable, theme-aware affiliate product review video template.
 * Renders product reviews with rating displays, comparison tables, and recommendation badges.
 *
 * LAYOUT VARIANTS (via `layout` prop):
 *   "scorecard"   — Large StarRating with pros/cons columns (default)
 *   "comparison"  — Side-by-side product comparison cards using ComparisonTable
 *   "verdict"     — Editorial-style review with GradientBadge recommendation
 *
 * DATA CONTRACT (AffiliateReviewSpec):
 *   {
 *     product_name: "Product X",
 *     rating: 4,
 *     pros: ["Fast", "Reliable"],
 *     cons: ["Expensive"],
 *     verdict: "Highly recommended for professionals",
 *     cta: "Get 20% Off",
 *     theme: "dark",
 *     layout: "scorecard"
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
  slideIn,
  staggerDelay,
  SPRING,
} from "../_shared/animations";
import type { Theme, BrandKit, PlatformHints, CollabMetadata } from "../_shared/themes";
import type { VideoFormat } from "../_shared/formats";
import { THEMES, THEME_DARK, applyBrandKit } from "../_shared/themes";
import { PADDING, TOP_SAFE, TYPE } from "../_shared/layouts";
import {
  GlassCard,
  BackgroundGrid,
  StarRating,
  GradientBadge,
  ComparisonTable,
  CaptionItem,
} from "../_shared/components";

// ── Data Contract ───────────────────────────────────────────────
export interface AffiliateReviewSpec {
  product_name: string;
  rating: number;
  pros: string[];
  cons: string[];
  verdict: string;
  cta: string;
  theme?: string;
  brandKit?: BrandKit;
  layout?: "scorecard" | "comparison" | "verdict";
  format?: VideoFormat;
  captions?: CaptionItem[];
  captionLanguage?: string;
  platformHints?: PlatformHints;
  metadata?: CollabMetadata;
}

export interface AffiliateReviewProps {
  spec: AffiliateReviewSpec;
  theme?: Theme;
  layout?: "scorecard" | "comparison" | "verdict";
}

// ── Scene Timing ────────────────────────────────────────────────
const TIMING = {
  bgStart: 0,
  titleStart: 5,
  ratingStart: 30,
  prosConsStart: 60,
  verdictStart: 140,
  ctaStart: 200,
};


// ── QuickStart Defaults ─────────────────────────────────────────
/** Sensible defaults for QuickStart specs (title + theme only). */
const QUICKSTART_DEFAULTS: Omit<AffiliateReviewSpec, "product_name" | "theme" | "brandKit" | "layout"> = {
  rating: 4,
  pros: ["Easy to use", "Great performance", "Excellent support"],
  cons: ["Premium pricing", "Learning curve"],
  verdict: "Highly recommended for professionals and teams",
  cta: "Get 20% Off",
};

// ── Main Component ──────────────────────────────────────────────
export const AffiliateReview: React.FC<AffiliateReviewProps> = ({
  spec: rawSpec,
  theme,
  layout,
}) => {
  const spec = { ...QUICKSTART_DEFAULTS, ...rawSpec };
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const resolvedTheme = applyBrandKit(theme ?? THEMES[spec.theme ?? "dark"] ?? THEME_DARK, spec.brandKit);
  const resolvedLayout = layout ?? spec.layout ?? "scorecard";

  const bgStyle = resolvedTheme.bg.startsWith("linear-gradient")
    ? { background: resolvedTheme.bg }
    : { backgroundColor: resolvedTheme.bg };

  if (resolvedLayout === "comparison") {
    return <ComparisonLayout spec={spec} theme={resolvedTheme} frame={frame} fps={fps} bgStyle={bgStyle} />;
  }
  if (resolvedLayout === "verdict") {
    return <VerdictLayout spec={spec} theme={resolvedTheme} frame={frame} fps={fps} bgStyle={bgStyle} />;
  }
  return <ScorecardLayout spec={spec} theme={resolvedTheme} frame={frame} fps={fps} bgStyle={bgStyle} />;
};


// ── Layout: Scorecard ───────────────────────────────────────────
// Large StarRating with pros/cons columns. Accent for pros, textMuted for cons.
const ScorecardLayout: React.FC<{
  spec: AffiliateReviewSpec;
  theme: Theme;
  frame: number;
  fps: number;
  bgStyle: React.CSSProperties;
}> = ({ spec, theme, frame, fps, bgStyle }) => {
  const titleSpring = springEntrance(frame, fps, TIMING.titleStart, SPRING.default);

  return (
    <AbsoluteFill style={{ ...bgStyle, fontFamily: theme.fontFamily, color: theme.textPrimary }}>
      <BackgroundGrid pattern="grid" />

      <div style={{
        position: "absolute", inset: 0,
        display: "flex", flexDirection: "column",
        padding: `${TOP_SAFE}px ${PADDING}px`,
      }}>
        {/* Header: Product Name */}
        <div style={{ textAlign: "center", marginBottom: 8 }}>
          <div style={{
            fontSize: TYPE.title,
            fontWeight: theme.headingWeight,
            opacity: titleSpring,
            transform: `translateY(${slideIn(titleSpring, "up", 20)}px)`,
          }}>
            {spec.product_name}
          </div>
        </div>

        {/* Star Rating */}
        <div style={{
          display: "flex", justifyContent: "center",
          marginBottom: 24,
        }}>
          <StarRating
            rating={spec.rating}
            frame={frame}
            startFrame={TIMING.ratingStart}
            fps={fps}
            size={36}
            color={theme.accent}
          />
        </div>

        {/* Pros / Cons Columns */}
        <div style={{
          flex: 1,
          display: "flex", gap: 24,
          maxWidth: 900, margin: "0 auto", width: "100%",
        }}>
          {/* Pros Column */}
          <div style={{ flex: 1 }}>
            <div style={{
              fontSize: TYPE.cardTitle,
              fontWeight: 700,
              color: theme.accent,
              textTransform: "uppercase" as const,
              letterSpacing: 2,
              marginBottom: 12,
              opacity: fadeIn(frame, TIMING.prosConsStart),
            }}>
              Pros
            </div>
            {spec.pros.slice(0, 5).map((pro, i) => {
              const delay = staggerDelay(i, TIMING.prosConsStart + 10, 20);
              const s = springEntrance(frame, fps, delay, SPRING.default);
              return (
                <GlassCard key={i} theme={theme} style={{
                  opacity: s,
                  transform: `translateX(${slideIn(s, "left", 30)}px)`,
                  marginBottom: 8,
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <svg viewBox="0 0 24 24" width={20} height={20} fill="none" stroke={theme.accent} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                    <span style={{ fontSize: TYPE.body, color: theme.textPrimary }}>{pro}</span>
                  </div>
                </GlassCard>
              );
            })}
          </div>

          {/* Cons Column */}
          <div style={{ flex: 1 }}>
            <div style={{
              fontSize: TYPE.cardTitle,
              fontWeight: 700,
              color: theme.textMuted,
              textTransform: "uppercase" as const,
              letterSpacing: 2,
              marginBottom: 12,
              opacity: fadeIn(frame, TIMING.prosConsStart),
            }}>
              Cons
            </div>
            {spec.cons.slice(0, 5).map((con, i) => {
              const delay = staggerDelay(i, TIMING.prosConsStart + 10, 20);
              const s = springEntrance(frame, fps, delay, SPRING.default);
              return (
                <GlassCard key={i} theme={theme} style={{
                  opacity: s,
                  transform: `translateX(${slideIn(s, "right", 30)}px)`,
                  marginBottom: 8,
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <svg viewBox="0 0 24 24" width={20} height={20} fill="none" stroke={theme.textMuted} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                    <span style={{ fontSize: TYPE.body, color: theme.textMuted }}>{con}</span>
                  </div>
                </GlassCard>
              );
            })}
          </div>
        </div>

        {/* Verdict + CTA */}
        <div style={{
          textAlign: "center",
          marginTop: 16,
          opacity: fadeIn(frame, TIMING.verdictStart),
        }}>
          <div style={{
            fontSize: TYPE.body,
            color: theme.textSecondary,
            marginBottom: 12,
          }}>
            {spec.verdict}
          </div>
          <div style={{ opacity: fadeIn(frame, TIMING.ctaStart) }}>
            <GradientBadge text={spec.cta} theme={theme} fontSize={14} />
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};



// ── Layout: Comparison ──────────────────────────────────────────
// Side-by-side product comparison cards using ComparisonTable.
const ComparisonLayout: React.FC<{
  spec: AffiliateReviewSpec;
  theme: Theme;
  frame: number;
  fps: number;
  bgStyle: React.CSSProperties;
}> = ({ spec, theme, frame, fps, bgStyle }) => {
  const titleSpring = springEntrance(frame, fps, TIMING.titleStart, SPRING.default);

  // Build comparison rows from pros/cons
  const maxRows = Math.max(spec.pros.length, spec.cons.length);
  const comparisonRows = Array.from({ length: Math.min(maxRows, 5) }, (_, i) => ({
    label: `Feature ${i + 1}`,
    left: spec.pros[i] ?? "—",
    right: spec.cons[i] ?? "—",
  }));

  return (
    <AbsoluteFill style={{ ...bgStyle, fontFamily: theme.fontFamily, color: theme.textPrimary }}>
      <BackgroundGrid pattern="dots" />

      <div style={{
        position: "absolute", inset: 0,
        display: "flex", flexDirection: "column",
        padding: `${TOP_SAFE}px ${PADDING}px`,
      }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 8 }}>
          <div style={{
            fontSize: TYPE.title,
            fontWeight: theme.headingWeight,
            opacity: titleSpring,
            transform: `translateY(${slideIn(titleSpring, "up", 20)}px)`,
          }}>
            {spec.product_name}
          </div>
          <div style={{
            fontSize: TYPE.subtitle,
            color: theme.textSecondary,
            marginTop: 6,
            opacity: fadeIn(frame, TIMING.titleStart + 10),
          }}>
            Product Comparison
          </div>
        </div>

        {/* Star Rating */}
        <div style={{
          display: "flex", justifyContent: "center",
          marginBottom: 20,
        }}>
          <StarRating
            rating={spec.rating}
            frame={frame}
            startFrame={TIMING.ratingStart}
            fps={fps}
            size={28}
            color={theme.accent}
          />
        </div>

        {/* Comparison Table */}
        <div style={{
          flex: 1,
          maxWidth: 800, margin: "0 auto", width: "100%",
          display: "flex", flexDirection: "column", justifyContent: "center",
        }}>
          <ComparisonTable
            rows={comparisonRows}
            leftHeader="Pros"
            rightHeader="Cons"
            frame={frame}
            startFrame={TIMING.prosConsStart}
            fps={fps}
            theme={theme}
          />
        </div>

        {/* Verdict + CTA */}
        <div style={{
          textAlign: "center",
          marginTop: 16,
          opacity: fadeIn(frame, TIMING.verdictStart),
        }}>
          <div style={{
            fontSize: TYPE.body,
            color: theme.textSecondary,
            marginBottom: 12,
          }}>
            {spec.verdict}
          </div>
          <div style={{ opacity: fadeIn(frame, TIMING.ctaStart) }}>
            <GradientBadge text={spec.cta} theme={theme} fontSize={14} />
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};



// ── Layout: Verdict ─────────────────────────────────────────────
// Editorial-style review with GradientBadge recommendation.
const VerdictLayout: React.FC<{
  spec: AffiliateReviewSpec;
  theme: Theme;
  frame: number;
  fps: number;
  bgStyle: React.CSSProperties;
}> = ({ spec, theme, frame, fps, bgStyle }) => {
  const titleSpring = springEntrance(frame, fps, TIMING.titleStart, SPRING.default);
  const verdictSpring = springEntrance(frame, fps, TIMING.verdictStart, SPRING.default);

  return (
    <AbsoluteFill style={{ ...bgStyle, fontFamily: theme.fontFamily, color: theme.textPrimary }}>
      <BackgroundGrid pattern="hex" />

      <div style={{
        position: "absolute", inset: 0,
        display: "flex", flexDirection: "column",
        padding: `${TOP_SAFE}px ${PADDING}px`,
        alignItems: "center",
      }}>
        {/* Header: Product Name */}
        <div style={{
          textAlign: "center",
          marginBottom: 12,
          opacity: titleSpring,
          transform: `translateY(${slideIn(titleSpring, "up", 20)}px)`,
        }}>
          <div style={{
            fontSize: TYPE.hero,
            fontWeight: theme.headingWeight,
          }}>
            {spec.product_name}
          </div>
        </div>

        {/* Star Rating */}
        <div style={{
          display: "flex", justifyContent: "center",
          marginBottom: 24,
        }}>
          <StarRating
            rating={spec.rating}
            frame={frame}
            startFrame={TIMING.ratingStart}
            fps={fps}
            size={32}
            color={theme.accent}
          />
        </div>

        {/* Editorial Review Card */}
        <GlassCard theme={theme} style={{
          maxWidth: 700, width: "100%",
          padding: "28px 36px",
          opacity: fadeIn(frame, TIMING.prosConsStart),
        }}>
          {/* Key highlights */}
          <div style={{ marginBottom: 16 }}>
            {spec.pros.slice(0, 3).map((pro, i) => {
              const delay = staggerDelay(i, TIMING.prosConsStart + 10, 20);
              const s = springEntrance(frame, fps, delay, SPRING.default);
              return (
                <div key={i} style={{
                  display: "flex", alignItems: "center", gap: 10,
                  marginBottom: 10,
                  opacity: s,
                  transform: `translateX(${slideIn(s, "left", 20)}px)`,
                }}>
                  <svg viewBox="0 0 24 24" width={20} height={20} fill="none" stroke={theme.accent} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                  <span style={{ fontSize: TYPE.body, color: theme.textPrimary }}>{pro}</span>
                </div>
              );
            })}
          </div>

          {/* Drawbacks */}
          {spec.cons.slice(0, 2).map((con, i) => {
            const delay = staggerDelay(i, TIMING.prosConsStart + 70, 20);
            const s = springEntrance(frame, fps, delay, SPRING.default);
            return (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 10,
                marginBottom: 10,
                opacity: s,
                transform: `translateX(${slideIn(s, "left", 20)}px)`,
              }}>
                <svg viewBox="0 0 24 24" width={20} height={20} fill="none" stroke={theme.textMuted} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                <span style={{ fontSize: TYPE.body, color: theme.textMuted }}>{con}</span>
              </div>
            );
          })}
        </GlassCard>

        {/* Verdict Badge */}
        <div style={{
          marginTop: 28,
          textAlign: "center",
          opacity: verdictSpring,
          transform: `translateY(${slideIn(verdictSpring, "up", 20)}px) scale(${0.8 + verdictSpring * 0.2})`,
        }}>
          <div style={{
            fontSize: TYPE.cardTitle,
            fontWeight: 700,
            color: theme.textSecondary,
            textTransform: "uppercase" as const,
            letterSpacing: 2,
            marginBottom: 12,
          }}>
            Our Verdict
          </div>
          <div style={{
            fontSize: TYPE.subtitle,
            color: theme.textPrimary,
            marginBottom: 16,
            maxWidth: 500,
          }}>
            {spec.verdict}
          </div>
          <div style={{ opacity: fadeIn(frame, TIMING.ctaStart) }}>
            <GradientBadge text={spec.cta} theme={theme} fontSize={16} />
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

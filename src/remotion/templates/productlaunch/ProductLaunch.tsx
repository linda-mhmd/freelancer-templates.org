/**
 * Product Launch Template - Creator Economy Templates (V4)
 *
 * A reusable, theme-aware product launch video template.
 * Renders a product reveal with features, pricing, and CTA.
 *
 * LAYOUT VARIANTS (via `layout` prop):
 *   "hero-reveal"   - Full-screen product name + tagline with animated feature callouts (default)
 *   "feature-grid"  - Product title with 2×2 GlassCard feature cards
 *   "countdown"     - CountdownTimer component with product teaser
 *
 * DATA CONTRACT (ProductLaunchSpec):
 *   {
 *     title: "Product Name",
 *     tagline: "Your tagline here",
 *     features: [{ label: "Feature", description: "Description" }],
 *     price: "$99/mo",
 *     cta: "Get Started",
 *     launch_date: "2025-03-01",
 *     theme: "dark",
 *     layout: "hero-reveal"
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
import { PADDING, TOP_SAFE, TYPE, GRID } from "../_shared/layouts";
import {
  GradientBadge,
  GlassCard,
  BackgroundGrid,
  CountdownTimer,
  CaptionItem,
} from "../_shared/components";

// ── Data Contract ───────────────────────────────────────────────
export interface ProductLaunchSpec {
  title: string;
  tagline: string;
  features: Array<{ label: string; description: string }>;
  price: string;
  cta: string;
  launch_date?: string;
  theme?: string;
  brandKit?: BrandKit;
  layout?: "hero-reveal" | "feature-grid" | "countdown";
  format?: VideoFormat;
  captions?: CaptionItem[];
  captionLanguage?: string;
  platformHints?: PlatformHints;
  metadata?: CollabMetadata;
}

export interface ProductLaunchProps {
  spec: ProductLaunchSpec;
  theme?: Theme;
  layout?: "hero-reveal" | "feature-grid" | "countdown";
}

// ── Scene Timing ────────────────────────────────────────────────
const TIMING = {
  bgStart: 0,
  titleStart: 5,
  taglineStart: 20,
  featuresStart: 60,
  priceStart: 160,
  ctaStart: 200,
  countdownStart: 30,
};

// ── QuickStart Defaults ─────────────────────────────────────────
/** Sensible defaults for QuickStart specs (title + theme only). */
const QUICKSTART_DEFAULTS: Omit<ProductLaunchSpec, "title" | "theme" | "brandKit" | "layout"> = {
  tagline: "The next generation of innovation",
  features: [
    { label: "Lightning Fast", description: "Built for speed and performance" },
    { label: "Secure by Default", description: "Enterprise-grade security built in" },
    { label: "Easy Integration", description: "Works with your existing tools" },
    { label: "24/7 Support", description: "Expert help whenever you need it" },
  ],
  price: "$49/mo",
  cta: "Get Started",
  launch_date: "Coming Soon",
};

// ── Main Component ──────────────────────────────────────────────
export const ProductLaunch: React.FC<ProductLaunchProps> = ({
  spec: rawSpec,
  theme,
  layout,
}) => {
  const spec = { ...QUICKSTART_DEFAULTS, ...rawSpec };
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const resolvedTheme = applyBrandKit(theme ?? THEMES[spec.theme ?? "dark"] ?? THEME_DARK, spec.brandKit);
  const resolvedLayout = layout ?? spec.layout ?? "hero-reveal";

  const bgStyle = resolvedTheme.bg.startsWith("linear-gradient")
    ? { background: resolvedTheme.bg }
    : { backgroundColor: resolvedTheme.bg };

  if (resolvedLayout === "feature-grid") {
    return <FeatureGridLayout spec={spec} theme={resolvedTheme} frame={frame} fps={fps} bgStyle={bgStyle} />;
  }
  if (resolvedLayout === "countdown") {
    return <CountdownLayout spec={spec} theme={resolvedTheme} frame={frame} fps={fps} bgStyle={bgStyle} />;
  }
  return <HeroRevealLayout spec={spec} theme={resolvedTheme} frame={frame} fps={fps} bgStyle={bgStyle} />;
};


// ── Layout: Hero Reveal ─────────────────────────────────────────
// Full-screen product name + tagline with animated feature callouts sliding in.
const HeroRevealLayout: React.FC<{
  spec: ProductLaunchSpec;
  theme: Theme;
  frame: number;
  fps: number;
  bgStyle: React.CSSProperties;
}> = ({ spec, theme, frame, fps, bgStyle }) => {
  const titleSpring = springEntrance(frame, fps, TIMING.titleStart, SPRING.default);
  const taglineSpring = springEntrance(frame, fps, TIMING.taglineStart, SPRING.default);
  const priceOpacity = fadeIn(frame, TIMING.priceStart);
  const ctaOpacity = fadeIn(frame, TIMING.ctaStart);

  return (
    <AbsoluteFill style={{ ...bgStyle, fontFamily: theme.fontFamily, color: theme.textPrimary }}>
      <BackgroundGrid pattern="grid" />

      {/* Hero content */}
      <div style={{
        position: "absolute", inset: 0,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        padding: `0 ${PADDING + 40}px`,
        textAlign: "center",
      }}>
        {/* Title */}
        <div style={{
          fontSize: TYPE.hero,
          fontWeight: theme.headingWeight,
          lineHeight: 1.2,
          opacity: titleSpring,
          transform: `translateY(${slideIn(titleSpring, "up", 30)}px)`,
        }}>
          {spec.title}
        </div>

        {/* Tagline */}
        <div style={{
          fontSize: TYPE.subtitle,
          color: theme.textSecondary,
          marginTop: 12,
          opacity: taglineSpring,
          transform: `translateY(${slideIn(taglineSpring, "up", 20)}px)`,
        }}>
          {spec.tagline}
        </div>

        {/* Feature callouts */}
        <div style={{
          display: "flex", gap: 24, marginTop: 40,
          flexWrap: "wrap", justifyContent: "center",
          maxWidth: 900,
        }}>
          {spec.features.map((feature, i) => {
            const delay = staggerDelay(i, TIMING.featuresStart, 20);
            const s = springEntrance(frame, fps, delay, SPRING.default);
            return (
              <div key={i} style={{
                opacity: s,
                transform: `translateX(${slideIn(s, "right", 40)}px)`,
                display: "flex", alignItems: "center", gap: 8,
              }}>
                <div style={{
                  width: 6, height: 6, borderRadius: "50%",
                  background: theme.accent, flexShrink: 0,
                }} />
                <span style={{ fontSize: TYPE.body, color: theme.textSecondary }}>
                  {feature.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Price */}
        <div style={{
          fontSize: TYPE.title,
          fontWeight: theme.headingWeight,
          marginTop: 32,
          opacity: priceOpacity,
          background: theme.accentGradient,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}>
          {spec.price}
        </div>
      </div>

      {/* CTA at bottom */}
      <div style={{
        position: "absolute", bottom: 40, left: 0, right: 0,
        display: "flex", justifyContent: "center",
        opacity: ctaOpacity,
      }}>
        <GradientBadge text={spec.cta} theme={theme} />
      </div>
    </AbsoluteFill>
  );
};

// ── Layout: Feature Grid ────────────────────────────────────────
// Product title with 2×2 GlassCard feature cards, staggered ≥20 frames.
const FeatureGridLayout: React.FC<{
  spec: ProductLaunchSpec;
  theme: Theme;
  frame: number;
  fps: number;
  bgStyle: React.CSSProperties;
}> = ({ spec, theme, frame, fps, bgStyle }) => {
  const titleSpring = springEntrance(frame, fps, TIMING.titleStart, SPRING.default);
  const taglineOpacity = fadeIn(frame, TIMING.taglineStart);
  const priceOpacity = fadeIn(frame, TIMING.priceStart);
  const ctaOpacity = fadeIn(frame, TIMING.ctaStart);

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
            {spec.title}
          </div>
          <div style={{
            fontSize: TYPE.subtitle,
            color: theme.textSecondary,
            marginTop: 8,
            opacity: taglineOpacity,
          }}>
            {spec.tagline}
          </div>
        </div>

        {/* 2×2 Feature Grid */}
        <div style={{
          ...GRID.twoByTwo,
          flex: 1,
          padding: "16px 0",
          maxWidth: 900,
          margin: "0 auto",
          width: "100%",
        }}>
          {spec.features.slice(0, 4).map((feature, i) => {
            const delay = staggerDelay(i, TIMING.featuresStart, 20);
            const s = springEntrance(frame, fps, delay, SPRING.default);
            return (
              <GlassCard key={i} theme={theme} style={{
                opacity: s,
                transform: `translateY(${slideIn(s, "up", 30)}px)`,
              }}>
                <div style={{
                  fontSize: TYPE.cardTitle,
                  fontWeight: 700,
                  color: theme.accent,
                  marginBottom: 8,
                }}>
                  {feature.label}
                </div>
                <div style={{
                  fontSize: TYPE.body,
                  color: theme.textSecondary,
                  lineHeight: 1.5,
                }}>
                  {feature.description}
                </div>
              </GlassCard>
            );
          })}
        </div>

        {/* Price + CTA row */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          gap: 24, paddingBottom: 8,
        }}>
          <div style={{
            fontSize: TYPE.stat,
            fontWeight: theme.headingWeight,
            opacity: priceOpacity,
            background: theme.accentGradient,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>
            {spec.price}
          </div>
          <div style={{ opacity: ctaOpacity }}>
            <GradientBadge text={spec.cta} theme={theme} />
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ── Layout: Countdown ───────────────────────────────────────────
// CountdownTimer component with product teaser (uses launch_date).
const CountdownLayout: React.FC<{
  spec: ProductLaunchSpec;
  theme: Theme;
  frame: number;
  fps: number;
  bgStyle: React.CSSProperties;
}> = ({ spec, theme, frame, fps, bgStyle }) => {
  const titleSpring = springEntrance(frame, fps, TIMING.titleStart, SPRING.default);
  const taglineOpacity = fadeIn(frame, TIMING.taglineStart);
  const ctaOpacity = fadeIn(frame, TIMING.ctaStart);

  // Parse a countdown value from launch_date or default to 30
  const countdownValue = spec.launch_date ? 30 : 30;

  return (
    <AbsoluteFill style={{ ...bgStyle, fontFamily: theme.fontFamily, color: theme.textPrimary }}>
      <BackgroundGrid pattern="hex" />

      <div style={{
        position: "absolute", inset: 0,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        padding: `0 ${PADDING}px`,
        textAlign: "center",
      }}>
        {/* "Launching Soon" label */}
        <div style={{
          fontSize: TYPE.label,
          color: theme.textMuted,
          textTransform: "uppercase" as const,
          letterSpacing: 2,
          marginBottom: 16,
          opacity: fadeIn(frame, TIMING.bgStart + 5),
        }}>
          {spec.launch_date ? `Launching ${spec.launch_date}` : "Launching Soon"}
        </div>

        {/* Countdown timer */}
        <div style={{
          fontSize: 96,
          fontWeight: theme.headingWeight,
          marginBottom: 24,
          opacity: springEntrance(frame, fps, TIMING.countdownStart, SPRING.default),
        }}>
          <CountdownTimer
            targetValue={countdownValue}
            frame={frame}
            startFrame={TIMING.countdownStart}
            theme={theme}
            duration={180}
          />
        </div>

        {/* Title */}
        <div style={{
          fontSize: TYPE.hero,
          fontWeight: theme.headingWeight,
          lineHeight: 1.2,
          opacity: titleSpring,
          transform: `translateY(${slideIn(titleSpring, "up", 20)}px)`,
        }}>
          {spec.title}
        </div>

        {/* Tagline */}
        <div style={{
          fontSize: TYPE.subtitle,
          color: theme.textSecondary,
          marginTop: 12,
          opacity: taglineOpacity,
        }}>
          {spec.tagline}
        </div>

        {/* Feature teaser list */}
        <div style={{
          display: "flex", gap: 20, marginTop: 32,
          flexWrap: "wrap", justifyContent: "center",
        }}>
          {spec.features.slice(0, 3).map((feature, i) => {
            const delay = staggerDelay(i, TIMING.featuresStart, 20);
            const s = springEntrance(frame, fps, delay, SPRING.default);
            return (
              <div key={i} style={{
                opacity: s,
                transform: `translateY(${slideIn(s, "up", 20)}px)`,
                padding: "6px 16px",
                borderRadius: 999,
                border: `1px solid ${theme.cardBorder}`,
                fontSize: TYPE.label,
                color: theme.textSecondary,
              }}>
                {feature.label}
              </div>
            );
          })}
        </div>
      </div>

      {/* CTA at bottom */}
      <div style={{
        position: "absolute", bottom: 40, left: 0, right: 0,
        display: "flex", justifyContent: "center",
        opacity: ctaOpacity,
      }}>
        <GradientBadge text={spec.cta} theme={theme} />
      </div>
    </AbsoluteFill>
  );
};

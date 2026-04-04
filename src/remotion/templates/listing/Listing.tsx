/**
 * Listing / Real Estate Template - Creator Economy Templates (V6)
 *
 * A reusable, theme-aware listing video template.
 * Renders property showcases, feature grids, and comparison layouts.
 *
 * LAYOUT VARIANTS (via `layout` prop):
 *   "showcase"      - Hero property title with CountUp price badge and feature icons (default)
 *   "feature-grid"  - 2×2 GlassCard grid of property features
 *   "comparison"    - Side-by-side listing comparison cards
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
import { PADDING, TOP_SAFE, TYPE, GRID } from "../_shared/layouts";
import {
  GlassCard,
  BackgroundGrid,
  CountUp,
  GradientBadge,
  ComparisonTable,
  CaptionItem,
} from "../_shared/components";

// ── Data Contract ───────────────────────────────────────────────
export interface ListingSpec {
  property_title: string;
  price: number;
  currency?: string;
  location: string;
  features: Array<{ label: string; icon?: string }>;
  cta: string;
  theme?: string;
  brandKit?: BrandKit;
  layout?: "showcase" | "feature-grid" | "comparison";
  format?: VideoFormat;
  captions?: CaptionItem[];
  captionLanguage?: string;
  platformHints?: PlatformHints;
  metadata?: CollabMetadata;
}

export interface ListingProps {
  spec: ListingSpec;
  theme?: Theme;
  layout?: "showcase" | "feature-grid" | "comparison";
}

// ── Scene Timing ────────────────────────────────────────────────
const TIMING = {
  titleStart: 5,
  locationStart: 20,
  priceStart: 40,
  featuresStart: 70,
  ctaStart: 200,
};

// ── QuickStart Defaults ─────────────────────────────────────────
const QUICKSTART_DEFAULTS: Omit<ListingSpec, "property_title" | "theme" | "brandKit" | "layout"> = {
  price: 450000,
  currency: "$",
  location: "Downtown District",
  features: [
    { label: "3 Bedrooms" },
    { label: "2 Bathrooms" },
    { label: "1,800 sq ft" },
    { label: "Parking Included" },
  ],
  cta: "Schedule a Tour",
};

// ── Helper ──────────────────────────────────────────────────────
function formatPrice(value: number, currency: string = "$"): string {
  if (value >= 1_000_000) return `${currency}${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `${currency}${(value / 1_000).toFixed(0)}k`;
  return `${currency}${value}`;
}

// ── Main Component ──────────────────────────────────────────────
export const Listing: React.FC<ListingProps> = ({
  spec: rawSpec,
  theme,
  layout,
}) => {
  const spec = { ...QUICKSTART_DEFAULTS, ...rawSpec };
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const resolvedTheme = applyBrandKit(theme ?? THEMES[spec.theme ?? "dark"] ?? THEME_DARK, spec.brandKit);
  const resolvedLayout = layout ?? spec.layout ?? "showcase";

  const bgStyle = resolvedTheme.bg.startsWith("linear-gradient")
    ? { background: resolvedTheme.bg }
    : { backgroundColor: resolvedTheme.bg };

  if (resolvedLayout === "feature-grid") {
    return <FeatureGridLayout spec={spec} theme={resolvedTheme} frame={frame} fps={fps} bgStyle={bgStyle} />;
  }
  if (resolvedLayout === "comparison") {
    return <ComparisonLayout spec={spec} theme={resolvedTheme} frame={frame} fps={fps} bgStyle={bgStyle} />;
  }
  return <ShowcaseLayout spec={spec} theme={resolvedTheme} frame={frame} fps={fps} bgStyle={bgStyle} />;
};

// ── Layout: Showcase ────────────────────────────────────────────
const ShowcaseLayout: React.FC<{
  spec: ListingSpec; theme: Theme; frame: number; fps: number; bgStyle: React.CSSProperties;
}> = ({ spec, theme, frame, fps, bgStyle }) => {
  const titleSpring = springEntrance(frame, fps, TIMING.titleStart, SPRING.default);
  const locOpacity = fadeIn(frame, TIMING.locationStart);
  const priceSpring = springEntrance(frame, fps, TIMING.priceStart, SPRING.default);
  const ctaSpring = springEntrance(frame, fps, TIMING.ctaStart, SPRING.snappy);
  const features = spec.features.slice(0, 6);

  return (
    <AbsoluteFill style={{ ...bgStyle, fontFamily: theme.fontFamily, color: theme.textPrimary }}>
      <BackgroundGrid pattern="grid" />
      <div style={{
        position: "absolute", inset: 0,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        padding: `${TOP_SAFE}px ${PADDING}px`, textAlign: "center",
      }}>
        <div style={{
          opacity: titleSpring, transform: `translateY(${(1 - titleSpring) * -20}px)`,
          fontSize: TYPE.hero, fontWeight: theme.headingWeight, marginBottom: 8,
        }}>
          {spec.property_title}
        </div>
        <div style={{ opacity: locOpacity, fontSize: TYPE.subtitle, color: theme.textSecondary, marginBottom: 24 }}>
          {spec.location}
        </div>
        <div style={{
          opacity: priceSpring, transform: `scale(${0.8 + priceSpring * 0.2})`,
          fontSize: TYPE.stat, fontWeight: theme.headingWeight, color: theme.accent, marginBottom: 32,
        }}>
          {formatPrice(spec.price, spec.currency)}
        </div>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center", marginBottom: 32 }}>
          {features.map((f, i) => {
            const delay = staggerDelay(i, TIMING.featuresStart, 20);
            const s = springEntrance(frame, fps, delay, SPRING.default);
            return (
              <GlassCard key={i} theme={theme} style={{
                opacity: s, transform: `translateY(${(1 - s) * 15}px)`,
                padding: "10px 20px", fontSize: TYPE.body,
              }}>
                {f.label}
              </GlassCard>
            );
          })}
        </div>
        <div style={{ opacity: ctaSpring, transform: `scale(${ctaSpring})` }}>
          <GradientBadge theme={theme}>{spec.cta}</GradientBadge>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ── Layout: Feature Grid ────────────────────────────────────────
const FeatureGridLayout: React.FC<{
  spec: ListingSpec; theme: Theme; frame: number; fps: number; bgStyle: React.CSSProperties;
}> = ({ spec, theme, frame, fps, bgStyle }) => {
  const titleSpring = springEntrance(frame, fps, TIMING.titleStart, SPRING.default);
  const features = spec.features.slice(0, 4);

  return (
    <AbsoluteFill style={{ ...bgStyle, fontFamily: theme.fontFamily, color: theme.textPrimary }}>
      <BackgroundGrid pattern="dots" />
      <div style={{
        position: "absolute", inset: 0,
        display: "flex", flexDirection: "column",
        padding: `${TOP_SAFE}px ${PADDING}px`,
      }}>
        <div style={{
          opacity: titleSpring, transform: `translateY(${(1 - titleSpring) * -20}px)`,
          fontSize: TYPE.hero, fontWeight: theme.headingWeight, marginBottom: 8,
        }}>
          {spec.property_title}
        </div>
        <div style={{ opacity: fadeIn(frame, 15), fontSize: TYPE.subtitle, color: theme.textSecondary, marginBottom: 32 }}>
          {spec.location} · {formatPrice(spec.price, spec.currency)}
        </div>
        <div style={{ ...GRID.twoByTwo, flex: 1 }}>
          {features.map((f, i) => {
            const delay = staggerDelay(i, TIMING.featuresStart, 20);
            const s = springEntrance(frame, fps, delay, SPRING.default);
            return (
              <GlassCard key={i} theme={theme} style={{
                opacity: s, transform: `translateY(${(1 - s) * 20}px)`,
                display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center",
                padding: 24,
              }}>
                <div style={{ fontSize: TYPE.title, fontWeight: theme.headingWeight, color: theme.accent, marginBottom: 8 }}>
                  {f.icon ?? "+"}
                </div>
                <div style={{ fontSize: TYPE.cardTitle, fontWeight: 600 }}>{f.label}</div>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ── Layout: Comparison ──────────────────────────────────────────
const ComparisonLayout: React.FC<{
  spec: ListingSpec; theme: Theme; frame: number; fps: number; bgStyle: React.CSSProperties;
}> = ({ spec, theme, frame, fps, bgStyle }) => {
  const titleSpring = springEntrance(frame, fps, TIMING.titleStart, SPRING.default);
  const rows = spec.features.slice(0, 6).map((f) => ({
    label: f.label, left: "+", right: "-",
  }));

  return (
    <AbsoluteFill style={{ ...bgStyle, fontFamily: theme.fontFamily, color: theme.textPrimary }}>
      <BackgroundGrid pattern="grid" />
      <div style={{
        position: "absolute", inset: 0,
        display: "flex", flexDirection: "column",
        padding: `${TOP_SAFE}px ${PADDING}px`,
      }}>
        <div style={{
          opacity: titleSpring, transform: `translateY(${(1 - titleSpring) * -20}px)`,
          fontSize: TYPE.hero, fontWeight: theme.headingWeight, marginBottom: 8,
        }}>
          {spec.property_title}
        </div>
        <div style={{ opacity: fadeIn(frame, 15), fontSize: TYPE.subtitle, color: theme.textSecondary, marginBottom: 32 }}>
          {formatPrice(spec.price, spec.currency)} · {spec.location}
        </div>
        <ComparisonTable
          rows={rows}
          leftHeader="This Property"
          rightHeader="Average"
          frame={frame}
          startFrame={TIMING.featuresStart}
          fps={fps}
          theme={theme}
        />
      </div>
    </AbsoluteFill>
  );
};

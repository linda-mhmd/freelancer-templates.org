/**
 * Pricing Template - Service Pricing Tables & Comparisons
 *
 * Freelancers need a visual way to present their pricing tiers.
 * This template turns pricing data into animated comparison videos.
 *
 * LAYOUTS:
 *   "tiers"     - 2–3 column pricing cards with feature lists
 *   "comparison" - Feature comparison table with checkmarks
 *   "spotlight"  - Single featured plan with value props
 *
 * USAGE:
 *   <Pricing spec={spec} theme={THEME_DARK} layout="tiers" />
 */

import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import type { Theme } from "../_shared/themes";
import {
  SPRING, springEntrance, fadeIn, slideIn, staggerDelay,
  GradientBadge, GlassCard, BackgroundGrid,
  PADDING, TOP_SAFE, TYPE,
} from "../_shared";

// ── Types ───────────────────────────────────────────────────────

export interface PricingFeature {
  text: string;
  included: boolean;
}

export interface PricingTier {
  name: string;
  price: number;
  currency?: string;
  period?: string; // e.g. "/month", "/project"
  description?: string;
  features: PricingFeature[];
  highlighted?: boolean;
  badge?: string; // e.g. "Most Popular", "Best Value"
}

export interface PricingSpec {
  headline: string;
  subheadline?: string;
  tiers: PricingTier[];
  footnote?: string;
  freelancerName?: string;
}

export interface PricingProps {
  spec: PricingSpec;
  theme: Theme;
  layout?: "tiers" | "comparison" | "spotlight";
}

// ── Main Component ──────────────────────────────────────────────

export const Pricing: React.FC<PricingProps> = ({
  spec, theme, layout = "tiers",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const bg = theme.bg.includes("gradient")
    ? { background: theme.bg }
    : { backgroundColor: theme.bg };

  return (
    <AbsoluteFill style={{ ...bg, fontFamily: theme.fontFamily }}>
      <BackgroundGrid opacity={0.03} />
      {layout === "tiers" && <TiersLayout spec={spec} theme={theme} frame={frame} fps={fps} />}
      {layout === "comparison" && <ComparisonLayout spec={spec} theme={theme} frame={frame} fps={fps} />}
      {layout === "spotlight" && <SpotlightLayout spec={spec} theme={theme} frame={frame} fps={fps} />}
    </AbsoluteFill>
  );
};

interface LayoutProps {
  spec: PricingSpec;
  theme: Theme;
  frame: number;
  fps: number;
}

/** Format price with currency */
function formatPrice(price: number, currency: string = "$"): string {
  if (price >= 1000) return `${currency}${(price / 1000).toFixed(price % 1000 === 0 ? 0 : 1)}k`;
  return `${currency}${price}`;
}

// ── Tiers Layout ────────────────────────────────────────────────
// Classic 2–3 column pricing cards. Highlighted tier gets accent border.
// Best for: service packages, subscription plans

const TiersLayout: React.FC<LayoutProps> = ({ spec, theme, frame, fps }) => {
  const headerS = springEntrance(frame, fps, 5, SPRING.default);
  const tierCount = spec.tiers.length;
  const cardWidth = tierCount <= 2 ? 420 : 320;

  return (
    <div style={{ padding: PADDING, paddingTop: TOP_SAFE, height: "100%", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <div style={{ textAlign: "center", opacity: headerS, transform: `translateY(${slideIn(headerS, "up", 20)}px)`, marginBottom: 32 }}>
        <div style={{ fontSize: TYPE.hero - 6, fontWeight: theme.headingWeight, color: theme.textPrimary, marginBottom: 8 }}>
          {spec.headline}
        </div>
        {spec.subheadline && (
          <div style={{ fontSize: TYPE.subtitle - 2, color: theme.textSecondary }}>{spec.subheadline}</div>
        )}
      </div>

      {/* Tier cards */}
      <div style={{ display: "flex", gap: 20, justifyContent: "center", flex: 1, alignItems: "stretch" }}>
        {spec.tiers.map((tier, i) => {
          const delay = staggerDelay(i, 40, 25);
          const s = springEntrance(frame, fps, delay, SPRING.default);
          const isHighlighted = tier.highlighted;

          return (
            <div key={i} style={{
              width: cardWidth,
              background: isHighlighted ? theme.bgGlass : theme.bgSecondary,
              border: `1px solid ${isHighlighted ? theme.accent : theme.cardBorder}`,
              borderRadius: 16,
              padding: "24px 28px",
              display: "flex", flexDirection: "column",
              opacity: s,
              transform: `translateY(${slideIn(s, "up", 30)}px) scale(${isHighlighted ? 1.02 : 1})`,
              boxShadow: isHighlighted ? `0 0 30px ${theme.accent}20` : theme.cardShadow,
              position: "relative" as const,
            }}>
              {/* Badge */}
              {tier.badge && (
                <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)" }}>
                  <GradientBadge text={tier.badge} theme={theme} fontSize={10} />
                </div>
              )}

              {/* Tier name */}
              <div style={{ fontSize: TYPE.cardTitle + 2, fontWeight: 700, color: isHighlighted ? theme.accent : theme.textSecondary, marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>
                {tier.name}
              </div>

              {/* Price */}
              <div style={{ marginBottom: 8 }}>
                <span style={{ fontSize: TYPE.stat + 8, fontWeight: theme.headingWeight, color: theme.textPrimary }}>
                  {formatPrice(tier.price, tier.currency)}
                </span>
                {tier.period && (
                  <span style={{ fontSize: TYPE.body, color: theme.textMuted, marginLeft: 4 }}>{tier.period}</span>
                )}
              </div>

              {/* Description */}
              {tier.description && (
                <div style={{ fontSize: TYPE.body - 1, color: theme.textSecondary, marginBottom: 16, lineHeight: 1.4 }}>
                  {tier.description}
                </div>
              )}

              {/* Divider */}
              <div style={{ height: 1, background: theme.cardBorder, marginBottom: 16 }} />

              {/* Features */}
              <div style={{ flex: 1 }}>
                {tier.features.map((feat, fi) => {
                  const featDelay = staggerDelay(fi, delay + 30, 8);
                  const featOpacity = fadeIn(frame, featDelay, 15);
                  return (
                    <div key={fi} style={{
                      display: "flex", alignItems: "center", gap: 8,
                      marginBottom: 10, opacity: featOpacity,
                    }}>
                      <span style={{
                        fontSize: 24,
                        color: feat.included ? "#22c55e" : theme.textMuted,
                      }}>
                        {feat.included ? "+" : "-"}
                      </span>
                      <span style={{
                        fontSize: TYPE.body - 1,
                        color: feat.included ? theme.textSecondary : theme.textMuted,
                        textDecoration: feat.included ? "none" : "line-through",
                      }}>
                        {feat.text}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footnote */}
      {spec.footnote && (
        <div style={{ textAlign: "center", fontSize: TYPE.caption, color: theme.textMuted, marginTop: 16, opacity: fadeIn(frame, 160, 20) }}>
          {spec.footnote}
        </div>
      )}
    </div>
  );
};


// ── Comparison Layout ───────────────────────────────────────────
// Feature comparison table with checkmarks across tiers.
// Best for: detailed feature-by-feature comparison

const ComparisonLayout: React.FC<LayoutProps> = ({ spec, theme, frame, fps }) => {
  const headerS = springEntrance(frame, fps, 5, SPRING.default);
  const tableS = springEntrance(frame, fps, 40, SPRING.default);

  // Collect all unique features across tiers
  const allFeatures: string[] = [];
  for (const tier of spec.tiers) {
    for (const feat of tier.features) {
      if (!allFeatures.includes(feat.text)) allFeatures.push(feat.text);
    }
  }

  return (
    <div style={{ padding: PADDING, paddingTop: TOP_SAFE, height: "100%", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <div style={{ textAlign: "center", opacity: headerS, transform: `translateY(${slideIn(headerS, "up", 20)}px)`, marginBottom: 28 }}>
        <div style={{ fontSize: TYPE.hero - 8, fontWeight: theme.headingWeight, color: theme.textPrimary, marginBottom: 6 }}>
          {spec.headline}
        </div>
        {spec.subheadline && (
          <div style={{ fontSize: TYPE.subtitle - 2, color: theme.textSecondary }}>{spec.subheadline}</div>
        )}
      </div>

      {/* Comparison table */}
      <GlassCard theme={theme} style={{
        flex: 1, padding: 0, overflow: "hidden",
        opacity: tableS, transform: `translateY(${slideIn(tableS, "up", 20)}px)`,
      }}>
        {/* Table header row */}
        <div style={{
          display: "grid",
          gridTemplateColumns: `2fr ${spec.tiers.map(() => "1fr").join(" ")}`,
          borderBottom: `1px solid ${theme.cardBorder}`,
          padding: "16px 24px",
        }}>
          <div style={{ fontSize: TYPE.body, color: theme.textMuted, fontWeight: 600 }}>Features</div>
          {spec.tiers.map((tier, i) => {
            const delay = staggerDelay(i, 50, 15);
            const s = springEntrance(frame, fps, delay, SPRING.snappy);
            return (
              <div key={i} style={{ textAlign: "center", opacity: s }}>
                <div style={{ fontSize: TYPE.cardTitle, fontWeight: 700, color: tier.highlighted ? theme.accent : theme.textPrimary }}>
                  {tier.name}
                </div>
                <div style={{ fontSize: TYPE.body, fontWeight: theme.headingWeight, color: theme.textPrimary, marginTop: 2 }}>
                  {formatPrice(tier.price, tier.currency)}
                  {tier.period && <span style={{ fontSize: TYPE.caption, color: theme.textMuted }}>{tier.period}</span>}
                </div>
              </div>
            );
          })}
        </div>

        {/* Feature rows */}
        {allFeatures.map((featText, fi) => {
          const rowDelay = staggerDelay(fi, 70, 10);
          const rowOpacity = fadeIn(frame, rowDelay, 15);
          return (
            <div key={fi} style={{
              display: "grid",
              gridTemplateColumns: `2fr ${spec.tiers.map(() => "1fr").join(" ")}`,
              padding: "10px 24px",
              borderBottom: fi < allFeatures.length - 1 ? `1px solid ${theme.cardBorder}` : "none",
              opacity: rowOpacity,
              background: fi % 2 === 0 ? "transparent" : theme.bgSecondary,
            }}>
              <div style={{ fontSize: TYPE.body - 1, color: theme.textSecondary }}>{featText}</div>
              {spec.tiers.map((tier, ti) => {
                const included = tier.features.some(f => f.text === featText && f.included);
                return (
                  <div key={ti} style={{ textAlign: "center", fontSize: 24, color: included ? "#22c55e" : theme.textMuted }}>
                    {included ? "+" : "-"}
                  </div>
                );
              })}
            </div>
          );
        })}
      </GlassCard>

      {spec.footnote && (
        <div style={{ textAlign: "center", fontSize: TYPE.caption, color: theme.textMuted, marginTop: 12, opacity: fadeIn(frame, 180, 20) }}>
          {spec.footnote}
        </div>
      )}
    </div>
  );
};


// ── Spotlight Layout ────────────────────────────────────────────
// Single featured plan with value propositions around it.
// Best for: promoting one specific package, upselling

const SpotlightLayout: React.FC<LayoutProps> = ({ spec, theme, frame, fps }) => {
  const headerS = springEntrance(frame, fps, 5, SPRING.default);
  const cardS = springEntrance(frame, fps, 30, SPRING.gentle);
  const featuresS = springEntrance(frame, fps, 80, SPRING.default);
  const footerOpacity = fadeIn(frame, 160, 25);

  // Use the highlighted tier, or the first one
  const featured = spec.tiers.find(t => t.highlighted) || spec.tiers[0];
  const otherTiers = spec.tiers.filter(t => t !== featured);

  return (
    <div style={{ padding: PADDING, paddingTop: TOP_SAFE, height: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
      {/* Header */}
      <div style={{ textAlign: "center", opacity: headerS, transform: `translateY(${slideIn(headerS, "up", 20)}px)`, marginBottom: 24 }}>
        <div style={{ fontSize: TYPE.hero - 8, fontWeight: theme.headingWeight, color: theme.textPrimary, marginBottom: 6 }}>
          {spec.headline}
        </div>
        {spec.subheadline && (
          <div style={{ fontSize: TYPE.subtitle - 2, color: theme.textSecondary }}>{spec.subheadline}</div>
        )}
      </div>

      {/* Featured plan card */}
      <div style={{
        background: theme.bgGlass,
        border: `2px solid ${theme.accent}`,
        borderRadius: 20,
        padding: "32px 48px",
        textAlign: "center",
        opacity: cardS,
        transform: `scale(${interpolate(cardS, [0, 1], [0.85, 1])})`,
        boxShadow: `0 0 40px ${theme.accent}15`,
        marginBottom: 24,
        minWidth: 400,
      }}>
        {featured.badge && (
          <div style={{ marginBottom: 12 }}>
            <GradientBadge text={featured.badge} theme={theme} fontSize={11} />
          </div>
        )}
        <div style={{ fontSize: TYPE.cardTitle + 4, fontWeight: 700, color: theme.accent, marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>
          {featured.name}
        </div>
        <div style={{ marginBottom: 12 }}>
          <span style={{ fontSize: 64, fontWeight: theme.headingWeight, color: theme.textPrimary }}>
            {formatPrice(featured.price, featured.currency)}
          </span>
          {featured.period && (
            <span style={{ fontSize: TYPE.subtitle, color: theme.textMuted, marginLeft: 4 }}>{featured.period}</span>
          )}
        </div>
        {featured.description && (
          <div style={{ fontSize: TYPE.body, color: theme.textSecondary, marginBottom: 16 }}>{featured.description}</div>
        )}

        {/* Features in 2 columns */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, textAlign: "left" }}>
          {featured.features.filter(f => f.included).map((feat, fi) => {
            const delay = staggerDelay(fi, 80, 8);
            const opacity = fadeIn(frame, delay, 12);
            return (
              <div key={fi} style={{ display: "flex", alignItems: "center", gap: 6, opacity }}>
                <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="#22c55e" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                <span style={{ fontSize: TYPE.body - 1, color: theme.textSecondary }}>{feat.text}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Other tiers as small cards below */}
      {otherTiers.length > 0 && (
        <div style={{ display: "flex", gap: 16, opacity: featuresS }}>
          {otherTiers.map((tier, i) => {
            const delay = staggerDelay(i, 120, 20);
            const s = springEntrance(frame, fps, delay, SPRING.snappy);
            return (
              <GlassCard key={i} theme={theme} style={{
                textAlign: "center", padding: "12px 24px", minWidth: 160,
                opacity: s, transform: `translateY(${slideIn(s, "up", 15)}px)`,
              }}>
                <div style={{ fontSize: TYPE.caption, color: theme.textMuted, fontWeight: 600, textTransform: "uppercase", marginBottom: 4 }}>
                  {tier.name}
                </div>
                <div style={{ fontSize: TYPE.stat - 8, fontWeight: theme.headingWeight, color: theme.textPrimary }}>
                  {formatPrice(tier.price, tier.currency)}
                  {tier.period && <span style={{ fontSize: TYPE.caption, color: theme.textMuted }}>{tier.period}</span>}
                </div>
              </GlassCard>
            );
          })}
        </div>
      )}

      {spec.footnote && (
        <div style={{ marginTop: "auto", textAlign: "center", fontSize: TYPE.caption, color: theme.textMuted, opacity: footerOpacity }}>
          {spec.footnote}
        </div>
      )}
    </div>
  );
};

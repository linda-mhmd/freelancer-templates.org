/**
 * Newsletter Promo Template — Creator Economy Templates (V5)
 *
 * A reusable, theme-aware newsletter promotion video template.
 * Renders subscribe CTAs, content previews, and testimonial blends.
 *
 * LAYOUT VARIANTS (via `layout` prop):
 *   "subscribe-cta"      — Hero title + CountUp subscriber count + GradientBadge CTA (default)
 *   "issue-preview"      — Content highlight cards from recent issues, staggered ≥20 frames
 *   "testimonial-blend"  — Subscriber quotes with newsletter stats
 *
 * DATA CONTRACT (NewsletterPromoSpec):
 *   {
 *     newsletter_name: "The Weekly Dispatch",
 *     tagline: "Curated insights for modern builders",
 *     highlights: [
 *       { title: "AI in Production", description: "How teams ship AI features faster" },
 *       { title: "Remote Culture", description: "Building async-first teams" }
 *     ],
 *     subscriber_count: 25000,
 *     cta: "Subscribe Free",
 *     theme: "dark",
 *     layout: "subscribe-cta"
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
  CountUp,
  GradientBadge,
  QuoteMarks,
  CaptionItem,
} from "../_shared/components";

// ── Data Contract ───────────────────────────────────────────────
export interface NewsletterPromoSpec {
  newsletter_name: string;
  tagline: string;
  highlights: Array<{ title: string; description: string }>;
  subscriber_count?: number;
  cta: string;
  theme?: string;
  brandKit?: BrandKit;
  layout?: "subscribe-cta" | "issue-preview" | "testimonial-blend";
  format?: VideoFormat;
  captions?: CaptionItem[];
  captionLanguage?: string;
  platformHints?: PlatformHints;
  metadata?: CollabMetadata;
}

export interface NewsletterPromoProps {
  spec: NewsletterPromoSpec;
  theme?: Theme;
  layout?: "subscribe-cta" | "issue-preview" | "testimonial-blend";
}

// ── Scene Timing ────────────────────────────────────────────────
const TIMING = {
  bgStart: 0,
  titleStart: 5,
  taglineStart: 20,
  statsStart: 50,
  cardsStart: 40,
  ctaStart: 180,
  quotesStart: 40,
};


// ── QuickStart Defaults ─────────────────────────────────────────
/** Sensible defaults for QuickStart specs (title + theme only). */
const QUICKSTART_DEFAULTS: Omit<NewsletterPromoSpec, "newsletter_name" | "theme" | "brandKit" | "layout"> = {
  tagline: "Your weekly dose of insights and inspiration",
  highlights: [
    { title: "Industry Trends", description: "Stay ahead with curated analysis" },
    { title: "Expert Interviews", description: "Learn from the best in the field" },
    { title: "Actionable Tips", description: "Practical advice you can use today" },
  ],
  subscriber_count: 25000,
  cta: "Subscribe Free",
};

// ── Main Component ──────────────────────────────────────────────
export const NewsletterPromo: React.FC<NewsletterPromoProps> = ({
  spec: rawSpec,
  theme,
  layout,
}) => {
  const spec = { ...QUICKSTART_DEFAULTS, ...rawSpec };
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const resolvedTheme = applyBrandKit(theme ?? THEMES[spec.theme ?? "dark"] ?? THEME_DARK, spec.brandKit);
  const resolvedLayout = layout ?? spec.layout ?? "subscribe-cta";

  const bgStyle = resolvedTheme.bg.startsWith("linear-gradient")
    ? { background: resolvedTheme.bg }
    : { backgroundColor: resolvedTheme.bg };

  if (resolvedLayout === "issue-preview") {
    return <IssuePreviewLayout spec={spec} theme={resolvedTheme} frame={frame} fps={fps} bgStyle={bgStyle} />;
  }
  if (resolvedLayout === "testimonial-blend") {
    return <TestimonialBlendLayout spec={spec} theme={resolvedTheme} frame={frame} fps={fps} bgStyle={bgStyle} />;
  }
  return <SubscribeCtaLayout spec={spec} theme={resolvedTheme} frame={frame} fps={fps} bgStyle={bgStyle} />;
};


// ── Layout: Subscribe CTA ───────────────────────────────────────
// Hero title + CountUp subscriber count + GradientBadge CTA.
const SubscribeCtaLayout: React.FC<{
  spec: NewsletterPromoSpec;
  theme: Theme;
  frame: number;
  fps: number;
  bgStyle: React.CSSProperties;
}> = ({ spec, theme, frame, fps, bgStyle }) => {
  const titleSpring = springEntrance(frame, fps, TIMING.titleStart, SPRING.default);
  const taglineSpring = springEntrance(frame, fps, TIMING.taglineStart, SPRING.default);
  const statsSpring = springEntrance(frame, fps, TIMING.statsStart, SPRING.default);
  const ctaOpacity = fadeIn(frame, TIMING.ctaStart);

  return (
    <AbsoluteFill style={{ ...bgStyle, fontFamily: theme.fontFamily, color: theme.textPrimary }}>
      <BackgroundGrid pattern="grid" />

      <div style={{
        position: "absolute", inset: 0,
        display: "flex", flexDirection: "column",
        padding: `${TOP_SAFE}px ${PADDING}px`,
        alignItems: "center",
        justifyContent: "center",
      }}>
        {/* Newsletter Icon */}
        <div style={{
          opacity: titleSpring,
          transform: `scale(${titleSpring})`,
          marginBottom: 16,
          fontSize: 48,
        }}>
          
        </div>

        {/* Newsletter Name */}
        <div style={{
          opacity: titleSpring,
          transform: `translateY(${slideIn(titleSpring, "up", 20)}px)`,
          textAlign: "center",
          marginBottom: 12,
        }}>
          <div style={{
            fontSize: TYPE.hero,
            fontWeight: theme.headingWeight,
            lineHeight: 1.2,
          }}>
            {spec.newsletter_name}
          </div>
        </div>

        {/* Tagline */}
        <div style={{
          opacity: taglineSpring,
          transform: `translateY(${slideIn(taglineSpring, "up", 16)}px)`,
          textAlign: "center",
          marginBottom: 32,
        }}>
          <div style={{
            fontSize: TYPE.subtitle,
            color: theme.textSecondary,
            maxWidth: 600,
            lineHeight: 1.5,
          }}>
            {spec.tagline}
          </div>
        </div>

        {/* Subscriber Count */}
        {spec.subscriber_count != null && (
          <div style={{
            opacity: statsSpring,
            transform: `translateY(${slideIn(statsSpring, "up", 16)}px)`,
            textAlign: "center",
            marginBottom: 32,
          }}>
            <div style={{
              fontSize: TYPE.stat,
              fontWeight: theme.headingWeight,
              color: theme.accent,
            }}>
              <CountUp target={spec.subscriber_count} frame={frame} startFrame={TIMING.statsStart + 5} suffix="+" />
            </div>
            <div style={{
              fontSize: TYPE.body,
              color: theme.textMuted,
              marginTop: 4,
            }}>
              subscribers
            </div>
          </div>
        )}

        {/* CTA Badge */}
        <div style={{ opacity: ctaOpacity }}>
          <GradientBadge text={spec.cta} theme={theme} fontSize={TYPE.cardTitle} />
        </div>
      </div>
    </AbsoluteFill>
  );
};


// ── Layout: Issue Preview ───────────────────────────────────────
// Content highlight cards from recent issues, staggered ≥20 frames.
const IssuePreviewLayout: React.FC<{
  spec: NewsletterPromoSpec;
  theme: Theme;
  frame: number;
  fps: number;
  bgStyle: React.CSSProperties;
}> = ({ spec, theme, frame, fps, bgStyle }) => {
  const titleSpring = springEntrance(frame, fps, TIMING.titleStart, SPRING.default);

  return (
    <AbsoluteFill style={{ ...bgStyle, fontFamily: theme.fontFamily, color: theme.textPrimary }}>
      <BackgroundGrid pattern="dots" />

      <div style={{
        position: "absolute", inset: 0,
        display: "flex", flexDirection: "column",
        padding: `${TOP_SAFE}px ${PADDING}px`,
      }}>
        {/* Header */}
        <div style={{
          opacity: titleSpring,
          transform: `translateY(${slideIn(titleSpring, "up", 20)}px)`,
          marginBottom: 8,
        }}>
          <div style={{
            fontSize: TYPE.label,
            fontWeight: 600,
            color: theme.accent,
            textTransform: "uppercase" as const,
            letterSpacing: 2,
            marginBottom: 8,
          }}>
            Latest Issues
          </div>
          <div style={{
            fontSize: TYPE.title,
            fontWeight: theme.headingWeight,
            lineHeight: 1.3,
          }}>
            {spec.newsletter_name}
          </div>
          <div style={{
            fontSize: TYPE.body,
            color: theme.textSecondary,
            marginTop: 6,
          }}>
            {spec.tagline}
          </div>
        </div>

        {/* Highlight Cards */}
        <div style={{
          flex: 1,
          display: "flex", flexDirection: "column",
          justifyContent: "center",
          gap: 14,
        }}>
          {spec.highlights.slice(0, 5).map((highlight, i) => {
            const delay = staggerDelay(i, TIMING.cardsStart, 20);
            const s = springEntrance(frame, fps, delay, SPRING.default);
            return (
              <GlassCard key={i} theme={theme} style={{
                opacity: s,
                transform: `translateX(${slideIn(s, "left", 30)}px)`,
                padding: "16px 24px",
              }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
                  <div style={{
                    width: 32, height: 32,
                    borderRadius: 8,
                    background: theme.accentGradient,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: TYPE.cardTitle, fontWeight: 700,
                    color: "#ffffff",
                    flexShrink: 0,
                    marginTop: 2,
                  }}>
                    {i + 1}
                  </div>
                  <div>
                    <div style={{
                      fontSize: TYPE.cardTitle,
                      fontWeight: 700,
                      marginBottom: 4,
                    }}>
                      {highlight.title}
                    </div>
                    <div style={{
                      fontSize: TYPE.body,
                      color: theme.textSecondary,
                      lineHeight: 1.4,
                    }}>
                      {highlight.description}
                    </div>
                  </div>
                </div>
              </GlassCard>
            );
          })}
        </div>

        {/* Footer CTA */}
        <div style={{
          opacity: fadeIn(frame, TIMING.ctaStart),
          display: "flex", justifyContent: "center",
          marginTop: 12,
        }}>
          <GradientBadge text={spec.cta} theme={theme} fontSize={TYPE.cardTitle} />
        </div>
      </div>
    </AbsoluteFill>
  );
};


// ── Layout: Testimonial Blend ───────────────────────────────────
// Subscriber quotes with newsletter stats.
const TestimonialBlendLayout: React.FC<{
  spec: NewsletterPromoSpec;
  theme: Theme;
  frame: number;
  fps: number;
  bgStyle: React.CSSProperties;
}> = ({ spec, theme, frame, fps, bgStyle }) => {
  const titleSpring = springEntrance(frame, fps, TIMING.titleStart, SPRING.default);

  // Use highlights as testimonial quotes
  const quotes = spec.highlights.slice(0, 3);

  return (
    <AbsoluteFill style={{ ...bgStyle, fontFamily: theme.fontFamily, color: theme.textPrimary }}>
      <BackgroundGrid pattern="hex" />

      <div style={{
        position: "absolute", inset: 0,
        display: "flex", flexDirection: "column",
        padding: `${TOP_SAFE}px ${PADDING}px`,
      }}>
        {/* Header */}
        <div style={{
          opacity: titleSpring,
          transform: `translateY(${slideIn(titleSpring, "up", 20)}px)`,
          textAlign: "center",
          marginBottom: 24,
        }}>
          <div style={{
            fontSize: TYPE.title,
            fontWeight: theme.headingWeight,
            lineHeight: 1.3,
          }}>
            {spec.newsletter_name}
          </div>
          <div style={{
            fontSize: TYPE.body,
            color: theme.textSecondary,
            marginTop: 6,
          }}>
            {spec.tagline}
          </div>
        </div>

        {/* Subscriber Stats Row */}
        {spec.subscriber_count != null && (
          <div style={{
            display: "flex", justifyContent: "center", gap: 32,
            marginBottom: 24,
          }}>
            <GlassCard theme={theme} style={{
              opacity: springEntrance(frame, fps, TIMING.statsStart, SPRING.default),
              padding: "12px 28px",
              textAlign: "center",
            }}>
              <div style={{
                fontSize: TYPE.stat,
                fontWeight: theme.headingWeight,
                color: theme.accent,
              }}>
                <CountUp target={spec.subscriber_count} frame={frame} startFrame={TIMING.statsStart + 5} suffix="+" />
              </div>
              <div style={{
                fontSize: TYPE.label,
                color: theme.textMuted,
                marginTop: 2,
              }}>
                subscribers
              </div>
            </GlassCard>
          </div>
        )}

        {/* Testimonial Quote Cards */}
        <div style={{
          flex: 1,
          display: "flex", flexDirection: "column",
          justifyContent: "center",
          gap: 14,
        }}>
          {quotes.map((quote, i) => {
            const delay = staggerDelay(i, TIMING.quotesStart, 20);
            const s = springEntrance(frame, fps, delay, SPRING.default);
            return (
              <GlassCard key={i} theme={theme} style={{
                opacity: s,
                transform: `translateX(${slideIn(s, "right", 30)}px)`,
                padding: "16px 24px",
              }}>
                <div style={{ display: "flex", gap: 12 }}>
                  <div style={{ flexShrink: 0, marginTop: -4, transform: "scale(0.2)", transformOrigin: "top left", width: 24, height: 24 }}>
                    <QuoteMarks theme={theme} frame={frame} fps={fps} startFrame={delay} />
                  </div>
                  <div>
                    <div style={{
                      fontSize: TYPE.body,
                      fontStyle: "italic",
                      color: theme.textSecondary,
                      lineHeight: 1.5,
                      marginBottom: 6,
                    }}>
                      {quote.description}
                    </div>
                    <div style={{
                      fontSize: TYPE.label,
                      fontWeight: 600,
                      color: theme.accent,
                    }}>
                      — {quote.title}
                    </div>
                  </div>
                </div>
              </GlassCard>
            );
          })}
        </div>

        {/* Footer CTA */}
        <div style={{
          opacity: fadeIn(frame, TIMING.ctaStart),
          display: "flex", justifyContent: "center",
          marginTop: 12,
        }}>
          <GradientBadge text={spec.cta} theme={theme} fontSize={TYPE.cardTitle} />
        </div>
      </div>
    </AbsoluteFill>
  );
};

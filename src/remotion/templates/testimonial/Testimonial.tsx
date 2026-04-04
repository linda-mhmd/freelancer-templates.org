/**
 * Testimonial Template - Freelancer Video Automation Platform
 * 
 * A reusable, theme-aware testimonial video template.
 * Renders a client quote with rating, name, and CTA.
 * 
 * USAGE:
 *   <Testimonial {...props} />
 * 
 * THEME VARIANTS:
 *   Pass any Theme from themes.ts to change the entire visual style.
 *   Built-in themes: dark, clean, bold, warm, minimal, neon
 * 
 * LAYOUT VARIANTS (via `layout` prop):
 *   "centered"  - Quote centered, name below (default)
 *   "split"     - Quote left, avatar/info right
 *   "editorial" - Large quote marks, serif feel, minimal info
 * 
 * DATA CONTRACT (TestimonialSpec):
 *   {
 *     client_name: "Jane Smith",
 *     client_title: "CEO",
 *     client_company: "Acme Corp",
 *     quote: "This changed everything for our team...",
 *     rating: 5,
 *     project_type: "Web Development",
 *     freelancer_name: "Your Name",
 *     freelancer_title: "Full-Stack Developer",
 *     cta_text: "Let's work together"
 *   }
 * 
 * CUSTOMIZATION POINTS (search for "CUSTOMIZE"):
 *   - Scene timing (frame ranges for each scene)
 *   - Typography sizes
 *   - Card border radius
 *   - Star rating size & color
 *   - Background pattern type
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
  SPRING,
} from "../_shared/animations";
import type { Theme } from "../_shared/themes";
import { THEME_DARK } from "../_shared/themes";
import { PADDING, TYPE } from "../_shared/layouts";
import {
  GradientBadge,
  GlassCard,
  StarRating,
  QuoteMarks,
  BackgroundGrid,
} from "../_shared/components";

// ── Data Contract ───────────────────────────────────────────────
export interface TestimonialSpec {
  client_name: string;
  client_title?: string;
  client_company?: string;
  quote: string;
  rating?: number;              // 1–5, default 5
  project_type?: string;
  freelancer_name?: string;
  freelancer_title?: string;
  cta_text?: string;            // e.g. "Let's work together"
}

export interface TestimonialProps {
  spec: TestimonialSpec;
  theme?: Theme;
  /** "centered" | "split" | "editorial" - default "centered" */
  layout?: "centered" | "split" | "editorial";
  /** Background pattern: "grid" | "dots" | "hex" | "none" */
  bgPattern?: "grid" | "dots" | "hex" | "none";
}

// ── CUSTOMIZE: Scene Timing ─────────────────────────────────────
// Adjust these to change when each element appears.
const TIMING = {
  bgGridStart: 0,
  quoteMarksStart: 5,
  quoteTextStart: 15,
  ratingStart: 60,
  clientInfoStart: 80,
  projectBadgeStart: 100,
  ctaStart: 130,
};

// ── CUSTOMIZE: Typography Overrides ─────────────────────────────
const QUOTE_SIZE = 28;           // quote text size
const QUOTE_SIZE_EDITORIAL = 36; // larger for editorial layout
const CLIENT_NAME_SIZE = 18;
const CLIENT_DETAIL_SIZE = 14;

// ── Main Component ──────────────────────────────────────────────
export const Testimonial: React.FC<TestimonialProps> = ({
  spec,
  theme = THEME_DARK,
  layout = "centered",
  bgPattern = "grid",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Determine if bg is a gradient or solid color
  const bgStyle = theme.bg.startsWith("linear-gradient")
    ? { background: theme.bg }
    : { backgroundColor: theme.bg };

  if (layout === "split") {
    return <SplitLayout spec={spec} theme={theme} bgPattern={bgPattern} frame={frame} fps={fps} bgStyle={bgStyle} />;
  }
  if (layout === "editorial") {
    return <EditorialLayout spec={spec} theme={theme} bgPattern={bgPattern} frame={frame} fps={fps} bgStyle={bgStyle} />;
  }
  return <CenteredLayout spec={spec} theme={theme} bgPattern={bgPattern} frame={frame} fps={fps} bgStyle={bgStyle} />;
};

// ── Layout: Centered ────────────────────────────────────────────
// Quote centered on screen, client info below, CTA at bottom.
const CenteredLayout: React.FC<{
  spec: TestimonialSpec;
  theme: Theme;
  bgPattern: string;
  frame: number;
  fps: number;
  bgStyle: React.CSSProperties;
}> = ({ spec, theme, bgPattern, frame, fps, bgStyle }) => {
  const quoteSpring = springEntrance(frame, fps, TIMING.quoteTextStart, SPRING.default);
  const clientSpring = springEntrance(frame, fps, TIMING.clientInfoStart, SPRING.default);
  const ctaOpacity = fadeIn(frame, TIMING.ctaStart);

  return (
    <AbsoluteFill style={{ ...bgStyle, fontFamily: theme.fontFamily, color: theme.textPrimary }}>
      {bgPattern !== "none" && <BackgroundGrid pattern={bgPattern as "grid" | "dots" | "hex"} />}

      {/* Content container */}
      <div style={{
        position: "absolute", inset: 0,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        padding: `0 ${PADDING + 40}px`,
        textAlign: "center",
      }}>
        {/* Quote marks */}
        <QuoteMarks theme={theme} frame={frame} fps={fps} startFrame={TIMING.quoteMarksStart} />

        {/* Quote text */}
        <div style={{
          fontSize: QUOTE_SIZE,
          fontWeight: theme.headingWeight,
          lineHeight: 1.4,
          maxWidth: 900,
          opacity: quoteSpring,
          transform: `translateY(${slideIn(quoteSpring, "up", 30)}px)`,
          marginTop: -20,
        }}>
          {spec.quote}
        </div>

        {/* Star rating */}
        {spec.rating && (
          <div style={{ marginTop: 24 }}>
            <StarRating
              rating={spec.rating}
              frame={frame}
              startFrame={TIMING.ratingStart}
              fps={fps}
            />
          </div>
        )}

        {/* Client info */}
        <div style={{
          marginTop: 28,
          opacity: clientSpring,
          transform: `translateY(${slideIn(clientSpring, "up", 20)}px)`,
        }}>
          <div style={{ fontSize: CLIENT_NAME_SIZE, fontWeight: 700, color: theme.textPrimary }}>
            {spec.client_name}
          </div>
          {(spec.client_title || spec.client_company) && (
            <div style={{ fontSize: CLIENT_DETAIL_SIZE, color: theme.textSecondary, marginTop: 4 }}>
              {[spec.client_title, spec.client_company].filter(Boolean).join(" · ")}
            </div>
          )}
        </div>

        {/* Project type badge */}
        {spec.project_type && (
          <div style={{
            marginTop: 16,
            opacity: fadeIn(frame, TIMING.projectBadgeStart),
          }}>
            <div style={{
              display: "inline-block",
              padding: "4px 14px",
              borderRadius: 999,
              border: `1px solid ${theme.cardBorder}`,
              fontSize: TYPE.label,
              color: theme.textSecondary,
              textTransform: "uppercase" as const,
              letterSpacing: 1,
            }}>
              {spec.project_type}
            </div>
          </div>
        )}
      </div>

      {/* CTA at bottom */}
      {spec.cta_text && (
        <div style={{
          position: "absolute", bottom: 40, left: 0, right: 0,
          display: "flex", justifyContent: "center",
          opacity: ctaOpacity,
        }}>
          <GradientBadge text={spec.cta_text} theme={theme} />
        </div>
      )}

      {/* Freelancer credit */}
      {spec.freelancer_name && (
        <div style={{
          position: "absolute", bottom: 40, right: PADDING,
          fontSize: TYPE.caption,
          color: theme.textMuted,
          opacity: ctaOpacity,
        }}>
          {spec.freelancer_name}{spec.freelancer_title ? ` · ${spec.freelancer_title}` : ""}
        </div>
      )}
    </AbsoluteFill>
  );
};

// ── Layout: Split ───────────────────────────────────────────────
// Quote on the left, client info card on the right.
const SplitLayout: React.FC<{
  spec: TestimonialSpec;
  theme: Theme;
  bgPattern: string;
  frame: number;
  fps: number;
  bgStyle: React.CSSProperties;
}> = ({ spec, theme, bgPattern, frame, fps, bgStyle }) => {
  const quoteSpring = springEntrance(frame, fps, TIMING.quoteTextStart, SPRING.default);
  const cardSpring = springEntrance(frame, fps, TIMING.clientInfoStart, SPRING.default);
  const ctaOpacity = fadeIn(frame, TIMING.ctaStart);

  return (
    <AbsoluteFill style={{ ...bgStyle, fontFamily: theme.fontFamily, color: theme.textPrimary }}>
      {bgPattern !== "none" && <BackgroundGrid pattern={bgPattern as "grid" | "dots" | "hex"} />}

      <div style={{
        position: "absolute", inset: 0,
        display: "flex", alignItems: "center",
        padding: `0 ${PADDING}px`,
        gap: 60,
      }}>
        {/* Left: Quote */}
        <div style={{
          flex: 1.2,
          opacity: quoteSpring,
          transform: `translateX(${slideIn(quoteSpring, "left", 40)}px)`,
        }}>
          <QuoteMarks theme={theme} frame={frame} fps={fps} startFrame={TIMING.quoteMarksStart} />
          <div style={{
            fontSize: QUOTE_SIZE,
            fontWeight: theme.headingWeight,
            lineHeight: 1.4,
            marginTop: -10,
          }}>
            {spec.quote}
          </div>
          {spec.rating && (
            <div style={{ marginTop: 20 }}>
              <StarRating rating={spec.rating} frame={frame} startFrame={TIMING.ratingStart} fps={fps} />
            </div>
          )}
        </div>

        {/* Right: Client card */}
        <div style={{
          flex: 0.8,
          opacity: cardSpring,
          transform: `translateX(${slideIn(cardSpring, "right", 40)}px)`,
        }}>
          <GlassCard theme={theme} style={{ textAlign: "center", padding: "32px 28px" }}>
            {/* Avatar placeholder - large initial */}
            <div style={{
              width: 72, height: 72, borderRadius: "50%",
              background: theme.accentGradient,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 28, fontWeight: 800, color: "#fff",
              margin: "0 auto 16px",
            }}>
              {spec.client_name.charAt(0)}
            </div>
            <div style={{ fontSize: CLIENT_NAME_SIZE, fontWeight: 700 }}>
              {spec.client_name}
            </div>
            {spec.client_title && (
              <div style={{ fontSize: CLIENT_DETAIL_SIZE, color: theme.textSecondary, marginTop: 4 }}>
                {spec.client_title}
              </div>
            )}
            {spec.client_company && (
              <div style={{ fontSize: CLIENT_DETAIL_SIZE, color: theme.textMuted, marginTop: 2 }}>
                {spec.client_company}
              </div>
            )}
            {spec.project_type && (
              <div style={{
                marginTop: 16,
                padding: "4px 14px",
                borderRadius: 999,
                border: `1px solid ${theme.cardBorder}`,
                fontSize: TYPE.label,
                color: theme.textSecondary,
                display: "inline-block",
              }}>
                {spec.project_type}
              </div>
            )}
          </GlassCard>
        </div>
      </div>

      {/* CTA */}
      {spec.cta_text && (
        <div style={{
          position: "absolute", bottom: 40, left: 0, right: 0,
          display: "flex", justifyContent: "center",
          opacity: ctaOpacity,
        }}>
          <GradientBadge text={spec.cta_text} theme={theme} />
        </div>
      )}
    </AbsoluteFill>
  );
};

// ── Layout: Editorial ───────────────────────────────────────────
// Large quote marks, serif-inspired feel, minimal client info.
// Best for short, impactful quotes.
const EditorialLayout: React.FC<{
  spec: TestimonialSpec;
  theme: Theme;
  bgPattern: string;
  frame: number;
  fps: number;
  bgStyle: React.CSSProperties;
}> = ({ spec, theme, bgPattern, frame, fps, bgStyle }) => {
  const quoteSpring = springEntrance(frame, fps, TIMING.quoteTextStart, SPRING.gentle);
  const clientOpacity = fadeIn(frame, TIMING.clientInfoStart, 30);
  const lineSpring = springEntrance(frame, fps, TIMING.ratingStart, SPRING.default);

  return (
    <AbsoluteFill style={{ ...bgStyle, fontFamily: theme.fontFamily, color: theme.textPrimary }}>
      {bgPattern !== "none" && <BackgroundGrid pattern={bgPattern as "grid" | "dots" | "hex"} opacity={0.02} />}

      <div style={{
        position: "absolute", inset: 0,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        padding: `0 ${PADDING + 80}px`,
        textAlign: "center",
      }}>
        {/* Large quote */}
        <div style={{
          fontSize: QUOTE_SIZE_EDITORIAL,
          fontWeight: theme.headingWeight,
          lineHeight: 1.5,
          fontStyle: "italic",
          opacity: quoteSpring,
          transform: `translateY(${slideIn(quoteSpring, "up", 20)}px)`,
        }}>
          &ldquo;{spec.quote}&rdquo;
        </div>

        {/* Decorative line */}
        <div style={{
          width: 60, height: 2,
          background: theme.accent,
          marginTop: 32,
          opacity: lineSpring,
          transform: `scaleX(${lineSpring})`,
        }} />

        {/* Client info - minimal */}
        <div style={{
          marginTop: 24,
          opacity: clientOpacity,
        }}>
          <div style={{ fontSize: CLIENT_NAME_SIZE, fontWeight: 600, letterSpacing: 1 }}>
            {spec.client_name}
          </div>
          {(spec.client_title || spec.client_company) && (
            <div style={{ fontSize: CLIENT_DETAIL_SIZE, color: theme.textSecondary, marginTop: 6 }}>
              {[spec.client_title, spec.client_company].filter(Boolean).join(", ")}
            </div>
          )}
        </div>
      </div>
    </AbsoluteFill>
  );
};

/**
 * ThoughtLeadership Template
 *
 * A journal-content video template for reflective essays, blog posts,
 * opinion pieces, and personal reflections. Supports three layout variants:
 *   - editorial: magazine-style with pull-quotes and accent dividers
 *   - narrative: story-flow with glass cards and reading-progress path
 *   - keynote: stage-presentation with typewriter headings and color shifts
 *
 * All layouts feature custom SVG illustrations and animated background decorations.
 */

import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  interpolateColors,
} from "remotion";
import { evolvePath, getPointAtLength, getLength } from "@remotion/paths";
import type { Theme } from "../_shared/themes";
import { THEME_DARK } from "../_shared/themes";
import { springEntrance, fadeIn, slideIn, SPRING } from "../_shared/animations";
import { BackgroundGrid, GlassCard, GradientBadge, QuoteMarks } from "../_shared/components";
import { BookOpenIllustration, QuillPenIllustration, SpotlightIllustration, ScrollIllustration } from "../_shared/illustrations";
import { FloatingOrbs, ParticleField, AccentLine } from "../_shared/decorations";

// ── Data Contracts ──────────────────────────────────────────────

export interface ThoughtLeadershipSection {
  heading: string;
  body: string;
}

export interface ThoughtLeadershipSpec {
  title: string;
  hook: string;
  sections: ThoughtLeadershipSection[];
  closingThought: string;
  authorName?: string;
  authorTitle?: string;
  publishDate?: string;
  tags?: string[];
}

export interface ThoughtLeadershipProps {
  spec: ThoughtLeadershipSpec;
  theme: Theme;
  layout?: "editorial" | "narrative" | "keynote";
}

// ── Duration Helper ─────────────────────────────────────────────

export function calculateThoughtLeadershipDuration(
  sections: number,
  layout: string,
): number {
  const framesPerSection = layout === "narrative" ? 75 : 90;
  return 60 + sections * framesPerSection + 60;
}

// ── Layout constants ────────────────────────────────────────────
const PADDING = 80;
const TOP_SAFE = 48;

// ── PillTag atom ────────────────────────────────────────────────
const PillTag: React.FC<{ text: string; theme: Theme; opacity: number }> = ({ text, theme, opacity }) => (
  <span
    style={{
      display: "inline-block",
      padding: "4px 12px",
      borderRadius: 999,
      fontSize: 11,
      fontWeight: 600,
      fontFamily: theme.fontFamily,
      background: `${theme.accent}20`,
      color: theme.accent,
      opacity,
      marginRight: 8,
    }}
  >
    {text}
  </span>
);

// ── Editorial Layout ────────────────────────────────────────────
const EditorialLayout: React.FC<{ spec: ThoughtLeadershipSpec; theme: Theme; frame: number; fps: number }> = ({
  spec, theme, frame, fps,
}) => {
  const stagger = spec.sections.length > 5 ? 20 : 25;
  const sectionBase = 60;
  // Show max 2 sections at a time - scroll through them over the timeline
  const visibleCount = 2;
  const scrollProgress = interpolate(
    frame,
    [sectionBase, sectionBase + spec.sections.length * stagger + 40],
    [0, Math.max(0, spec.sections.length - visibleCount)],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const scrollIndex = Math.floor(scrollProgress);

  return (
    <div style={{ position: "relative", zIndex: 1, height: 720, overflow: "hidden" }}>
      {/* ── Header band ── */}
      <div style={{
        padding: `${TOP_SAFE}px ${PADDING}px 0`,
        display: "flex", alignItems: "flex-start", justifyContent: "space-between",
      }}>
        {/* Left: title + hook */}
        <div style={{ flex: 1, maxWidth: 900 }}>
          <div style={{
            fontSize: 36,
            fontWeight: theme.headingWeight,
            fontFamily: theme.fontFamily,
            color: theme.textPrimary,
            lineHeight: 1.15,
            opacity: springEntrance(frame, fps, 5, SPRING.default),
            transform: `translateY(${slideIn(springEntrance(frame, fps, 5, SPRING.default), "up", 24)}px)`,
          }}>
            {spec.title}
          </div>
          <div style={{
            fontSize: 15,
            fontFamily: theme.fontFamily,
            color: theme.textSecondary,
            opacity: fadeIn(frame, 10, 20),
            marginTop: 8,
            lineHeight: 1.5,
          }}>
            {spec.hook}
          </div>
          {/* Tags */}
          {spec.tags && spec.tags.length > 0 && (
            <div style={{ marginTop: 10 }}>
              {spec.tags.map((tag, i) => (
                <PillTag key={i} text={tag} theme={theme} opacity={fadeIn(frame, 20 + i * 5, 15)} />
              ))}
            </div>
          )}
        </div>
        {/* Right: book illustration - larger, with glow */}
        <div style={{
          opacity: springEntrance(frame, fps, 12, SPRING.snappy),
          transform: `scale(${interpolate(springEntrance(frame, fps, 12, SPRING.snappy), [0, 1], [0.7, 1], { extrapolateRight: "clamp" })})`,
          flexShrink: 0, marginLeft: 24, position: "relative",
        }}>
          {/* Glow behind book */}
          <div style={{
            position: "absolute", inset: -20, borderRadius: "50%",
            background: `radial-gradient(circle, ${theme.accent}25 0%, transparent 70%)`,
          }} />
          <BookOpenIllustration size={96} color={theme.accent} />
        </div>
      </div>

      {/* ── Accent divider below header ── */}
      <div style={{ padding: `12px ${PADDING}px 0` }}>
        <AccentLine frame={frame} fps={fps} startFrame={30} color={theme.accent} colorSecondary={theme.accentSecondary} />
      </div>

      {/* ── Sections area - two-column magazine grid ── */}
      <div style={{
        padding: `16px ${PADDING}px 0`,
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 20,
        height: 340,
        overflow: "hidden",
      }}>
        {spec.sections.slice(scrollIndex, scrollIndex + visibleCount).map((section, vi) => {
          const actualIndex = scrollIndex + vi;
          const sectionStart = sectionBase + actualIndex * stagger;
          const s = springEntrance(frame, fps, sectionStart, SPRING.default);
          const isFirst = actualIndex === 0;

          return (
            <div
              key={actualIndex}
              style={{
                opacity: s,
                transform: `translateY(${slideIn(s, "up", 16)}px)`,
                background: theme.bgGlass,
                border: `1px solid ${theme.cardBorder}`,
                borderRadius: 12,
                padding: 20,
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
              }}
            >
              {/* Section number badge */}
              <div style={{
                width: 28, height: 28, borderRadius: "50%",
                background: theme.accentGradient,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 12, fontWeight: 700, color: "#fff",
                fontFamily: theme.fontFamily, marginBottom: 10, flexShrink: 0,
              }}>
                {actualIndex + 1}
              </div>

              {/* Section heading */}
              <div style={{
                fontSize: 20,
                fontWeight: theme.headingWeight,
                fontFamily: theme.fontFamily,
                color: theme.accent,
                lineHeight: 1.2,
                marginBottom: 8,
              }}>
                {section.heading}
              </div>

              {/* Body - with pull-quote treatment for first section */}
              {isFirst ? (
                <div style={{ display: "flex", alignItems: "flex-start", gap: 10, flex: 1, overflow: "hidden" }}>
                  <div style={{ flexShrink: 0, marginTop: 2 }}>
                    <QuillPenIllustration size={24} color={theme.accent} />
                  </div>
                  <div style={{ position: "relative", flex: 1 }}>
                    <QuoteMarks theme={theme} frame={frame} fps={fps} startFrame={sectionStart + 5} />
                    <div style={{
                      fontSize: 13,
                      fontFamily: theme.fontFamily,
                      color: theme.textSecondary,
                      lineHeight: 1.55,
                      position: "relative",
                    }}>
                      <span style={{ position: "relative", display: "inline" }}>
                        <span
                          data-testid="word-highlight-wipe"
                          style={{
                            position: "absolute", left: 0, top: -2, bottom: -2, right: 0,
                            background: `${theme.accent}4D`, borderRadius: 3,
                            transformOrigin: "left center",
                            transform: `scaleX(${interpolate(
                              spring({ frame: frame - (sectionStart + 10), fps, config: { damping: 200 }, durationInFrames: 18 }),
                              [0, 1], [0, 1], { extrapolateRight: "clamp" },
                            )})`,
                          }}
                        />
                        {section.body}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div style={{
                  fontSize: 13,
                  fontFamily: theme.fontFamily,
                  color: theme.textSecondary,
                  lineHeight: 1.55,
                  flex: 1,
                  overflow: "hidden",
                }}>
                  {section.body}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ── Footer: closing thought + author ── */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        padding: `16px ${PADDING}px 28px`,
        background: `linear-gradient(transparent, ${theme.bg}ee 30%)`,
      }}>
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <div style={{
            fontSize: 15,
            fontFamily: theme.fontFamily,
            fontWeight: 600,
            color: theme.textPrimary,
            opacity: fadeIn(frame, sectionBase + spec.sections.length * stagger + 10, 20),
            fontStyle: "italic",
            flex: 1,
            maxWidth: 800,
          }}>
            &ldquo;{spec.closingThought}&rdquo;
          </div>
          {/* Section progress dots */}
          <div style={{ display: "flex", gap: 6, flexShrink: 0, marginLeft: 16 }}>
            {spec.sections.map((_, i) => {
              const active = i >= scrollIndex && i < scrollIndex + visibleCount;
              return (
                <div key={i} style={{
                  width: active ? 16 : 6, height: 6, borderRadius: 3,
                  background: active ? theme.accent : `${theme.accent}40`,
                  transition: "width 0.3s, background 0.3s",
                }} />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};


// ── Narrative Layout ────────────────────────────────────────────
const PROGRESS_PATH = "M 80 690 L 1200 690";

const NarrativeLayout: React.FC<{ spec: ThoughtLeadershipSpec; theme: Theme; frame: number; fps: number }> = ({
  spec, theme, frame, fps,
}) => {
  const stagger = spec.sections.length > 5 ? 20 : 25;
  const sectionBase = 60;
  const totalSections = spec.sections.length;
  const pathLength = getLength(PROGRESS_PATH);

  return (
    <div style={{ padding: `${TOP_SAFE}px ${PADDING}px`, position: "relative", zIndex: 1, height: "100%" }}>
      {/* Title area */}
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 12 }}>
        <div
          style={{
            opacity: springEntrance(frame, fps, 8, SPRING.default),
            transform: `scale(${interpolate(springEntrance(frame, fps, 8, SPRING.default), [0, 1], [0.8, 1], { extrapolateRight: "clamp" })})`,
            flexShrink: 0,
          }}
        >
          <ScrollIllustration size={48} color={theme.accent} />
        </div>
        <div
          style={{
            fontSize: 44,
            fontWeight: theme.headingWeight,
            fontFamily: theme.fontFamily,
            color: theme.textPrimary,
            lineHeight: 1.1,
            opacity: springEntrance(frame, fps, 5, SPRING.default),
            transform: `translateY(${slideIn(springEntrance(frame, fps, 5, SPRING.default), "up", 25)}px)`,
          }}
        >
          {spec.title}
        </div>
      </div>

      {/* Hook */}
      <div
        style={{
          fontSize: 16,
          fontFamily: theme.fontFamily,
          color: theme.textSecondary,
          opacity: fadeIn(frame, 10, 20),
          marginBottom: 16,
          maxWidth: 800,
          lineHeight: 1.5,
        }}
      >
        {spec.hook}
      </div>

      {/* Tags */}
      {spec.tags && spec.tags.length > 0 && (
        <div style={{ marginBottom: 12 }}>
          {spec.tags.map((tag, i) => (
            <PillTag key={i} text={tag} theme={theme} opacity={fadeIn(frame, 20 + i * 5, 15)} />
          ))}
        </div>
      )}

      {/* Section cards */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
        {spec.sections.map((section, i) => {
          const sectionStart = sectionBase + i * stagger;
          const s = springEntrance(frame, fps, sectionStart, SPRING.default);
          const scaleVal = interpolate(s, [0, 1], [0.95, 1], { extrapolateRight: "clamp" });
          return (
            <div
              key={i}
              data-testid="narrative-section"
              style={{
                opacity: s,
                transform: `scale(${scaleVal}) translateY(${slideIn(s, "up", 15)}px)`,
                flex: "1 1 45%",
                minWidth: 300,
              }}
            >
              <GlassCard theme={theme}>
                <div
                  style={{
                    fontSize: 18,
                    fontWeight: 700,
                    fontFamily: theme.fontFamily,
                    color: theme.accent,
                    marginBottom: 6,
                  }}
                >
                  {section.heading}
                </div>
                <div
                  style={{
                    fontSize: 13,
                    fontFamily: theme.fontFamily,
                    color: theme.textSecondary,
                    lineHeight: 1.5,
                  }}
                >
                  {section.body}
                </div>
              </GlassCard>
            </div>
          );
        })}
      </div>

      {/* Closing thought */}
      <div
        style={{
          fontSize: 15,
          fontFamily: theme.fontFamily,
          fontWeight: 600,
          color: theme.textPrimary,
          opacity: fadeIn(frame, sectionBase + totalSections * stagger + 10, 20),
          marginTop: 16,
          fontStyle: "italic",
        }}
      >
        {spec.closingThought}
      </div>

      {/* Reading progress path */}
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1280 720"
        style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 2 }}
      >
        <defs>
          <filter id="pathGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" />
          </filter>
        </defs>
        {(() => {
          // Calculate how many sections have entered
          let sectionsEntered = 0;
          for (let i = 0; i < totalSections; i++) {
            const sectionStart = sectionBase + i * stagger;
            if (frame >= sectionStart) sectionsEntered = i + 1;
          }
          const progress = totalSections > 0 ? sectionsEntered / totalSections : 0;
          const evolved = evolvePath(progress, PROGRESS_PATH);
          const dotPos = progress > 0 ? getPointAtLength(PROGRESS_PATH, progress * pathLength) : null;
          const dotPulse = spring({ frame, fps, config: { damping: 5, stiffness: 150 } });
          const dotRadius = 4 + dotPulse * 2;

          return (
            <>
              {/* Glow layer */}
              <path d={PROGRESS_PATH} stroke={theme.accent} strokeWidth="3" fill="none" opacity={0.3}
                strokeDasharray={evolved.strokeDasharray} strokeDashoffset={evolved.strokeDashoffset}
                filter="url(#pathGlow)" />
              {/* Main path */}
              <path d={PROGRESS_PATH} stroke={theme.accent} strokeWidth="2" fill="none" opacity={0.7}
                strokeDasharray={evolved.strokeDasharray} strokeDashoffset={evolved.strokeDashoffset}
                strokeLinecap="round" />
              {/* Pulsing dot */}
              {dotPos && progress > 0 && (
                <circle cx={dotPos.x} cy={dotPos.y} r={dotRadius} fill={theme.accent} opacity={0.9} />
              )}
            </>
          );
        })()}
      </svg>
    </div>
  );
};


// ── Keynote Layout ──────────────────────────────────────────────
const KeynoteLayout: React.FC<{ spec: ThoughtLeadershipSpec; theme: Theme; frame: number; fps: number }> = ({
  spec, theme, frame, fps,
}) => {
  const stagger = spec.sections.length > 5 ? 20 : 25;
  const sectionBase = 60;
  const totalSections = spec.sections.length;

  return (
    <div
      style={{
        padding: `${TOP_SAFE}px ${PADDING}px`,
        position: "relative",
        zIndex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      {/* Spotlight behind title */}
      <div
        style={{
          position: "absolute",
          top: 10,
          left: "50%",
          transform: "translateX(-50%)",
          opacity: springEntrance(frame, fps, 0, SPRING.gentle) * 0.6,
        }}
      >
        <SpotlightIllustration size={80} color={theme.accent} />
      </div>

      {/* Title */}
      <div
        style={{
          fontSize: 52,
          fontWeight: theme.headingWeight,
          fontFamily: theme.fontFamily,
          color: theme.textPrimary,
          lineHeight: 1.1,
          opacity: springEntrance(frame, fps, 5, SPRING.default),
          transform: `translateY(${slideIn(springEntrance(frame, fps, 5, SPRING.default), "up", 30)}px)`,
          marginBottom: 8,
          position: "relative",
          zIndex: 1,
        }}
      >
        {spec.title}
      </div>

      {/* Hook */}
      <div
        style={{
          fontSize: 18,
          fontFamily: theme.fontFamily,
          color: theme.textSecondary,
          opacity: fadeIn(frame, 10, 20),
          marginBottom: 16,
          maxWidth: 800,
          lineHeight: 1.5,
        }}
      >
        {spec.hook}
      </div>

      {/* Tags */}
      {spec.tags && spec.tags.length > 0 && (
        <div style={{ marginBottom: 16 }}>
          {spec.tags.map((tag, i) => (
            <PillTag key={i} text={tag} theme={theme} opacity={fadeIn(frame, 20 + i * 5, 15)} />
          ))}
        </div>
      )}

      {/* Sections with typewriter headings */}
      {spec.sections.map((section, i) => {
        const sectionStart = sectionBase + i * stagger;
        const s = springEntrance(frame, fps, sectionStart, SPRING.default);

        // Typewriter: 2 frames per character
        const charsToShow = Math.min(
          section.heading.length,
          Math.max(0, Math.floor((frame - sectionStart) / 2)),
        );
        const typewriterDone = charsToShow >= section.heading.length;
        const cursorVisible = Math.floor(frame / 15) % 2 === 0;

        // Color shift from accent to accentSecondary across sections
        const colorProgress = totalSections > 1 ? i / (totalSections - 1) : 0;
        const headingColor = interpolateColors(
          colorProgress,
          [0, 1],
          [theme.accent, theme.accentSecondary],
        );

        return (
          <div
            key={i}
            style={{
              opacity: s,
              marginBottom: 20,
              width: "100%",
              maxWidth: 900,
            }}
          >
            {/* Typewriter heading */}
            <div
              style={{
                fontSize: 36,
                fontWeight: theme.headingWeight,
                fontFamily: theme.fontFamily,
                color: headingColor,
                lineHeight: 1.2,
                marginBottom: 8,
                minHeight: 44,
              }}
            >
              <span data-testid="typewriter-text">
                {section.heading.slice(0, charsToShow)}
              </span>
              {!typewriterDone && (
                <span style={{ opacity: cursorVisible ? 1 : 0 }}>|</span>
              )}
            </div>

            {/* Body fades in after typewriter completes */}
            <div
              style={{
                fontSize: 14,
                fontFamily: theme.fontFamily,
                color: theme.textSecondary,
                lineHeight: 1.6,
                opacity: typewriterDone
                  ? fadeIn(frame, sectionStart + section.heading.length * 2, 15)
                  : 0,
              }}
            >
              {section.body}
            </div>
          </div>
        );
      })}

      {/* Author card with closing thought */}
      {(() => {
        const authorStart = sectionBase + totalSections * stagger + 15;
        const authorS = springEntrance(frame, fps, authorStart, SPRING.default);
        return (
          <div
            style={{
              opacity: authorS,
              transform: `translateY(${slideIn(authorS, "up", 20)}px)`,
              marginTop: 12,
              position: "relative",
            }}
          >
            {/* Radial glow behind card */}
            <div
              style={{
                position: "absolute",
                inset: -40,
                background: `radial-gradient(circle, ${theme.accent}1A 0%, transparent 70%)`,
                pointerEvents: "none",
              }}
            />
            <GlassCard theme={theme} style={{ textAlign: "center", position: "relative" }}>
              <div
                style={{
                  fontSize: 16,
                  fontFamily: theme.fontFamily,
                  fontWeight: 600,
                  color: theme.textPrimary,
                  fontStyle: "italic",
                  marginBottom: 12,
                }}
              >
                {spec.closingThought}
              </div>
              {spec.authorName && (
                <div style={{ marginBottom: 4 }}>
                  <span
                    style={{
                      fontSize: 14,
                      fontFamily: theme.fontFamily,
                      fontWeight: 700,
                      color: theme.textPrimary,
                    }}
                  >
                    {spec.authorName}
                  </span>
                </div>
              )}
              {spec.authorTitle && (
                <div style={{ marginBottom: 8 }}>
                  <span
                    style={{
                      fontSize: 12,
                      fontFamily: theme.fontFamily,
                      color: theme.textSecondary,
                    }}
                  >
                    {spec.authorTitle}
                  </span>
                </div>
              )}
              <GradientBadge text={spec.publishDate || "Published"} theme={theme} fontSize={11} />
            </GlassCard>
          </div>
        );
      })()}
    </div>
  );
};

// ── Main Component ──────────────────────────────────────────────

export const ThoughtLeadership: React.FC<ThoughtLeadershipProps> = ({
  spec,
  theme: inputTheme,
  layout = "editorial",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const theme = inputTheme || THEME_DARK;

  return (
    <AbsoluteFill style={{ background: theme.bg, fontFamily: theme.fontFamily }}>
      <BackgroundGrid opacity={0.04} />

      {/* Animated background decorations */}
      {layout === "narrative" ? (
        <ParticleField frame={frame} count={8} color={theme.accent} />
      ) : (
        <FloatingOrbs frame={frame} count={3} color={theme.accent} />
      )}

      {/* Layout switch */}
      {layout === "editorial" && (
        <EditorialLayout spec={spec} theme={theme} frame={frame} fps={fps} />
      )}
      {layout === "narrative" && (
        <NarrativeLayout spec={spec} theme={theme} frame={frame} fps={fps} />
      )}
      {layout === "keynote" && (
        <KeynoteLayout spec={spec} theme={theme} frame={frame} fps={fps} />
      )}
    </AbsoluteFill>
  );
};

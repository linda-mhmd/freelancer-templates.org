/**
 * Course Promo Template - Creator Economy Templates (V4)
 *
 * A reusable, theme-aware course promotion video template.
 * Renders course overviews with curriculum highlights, instructor credentials, and enrollment CTAs.
 *
 * LAYOUT VARIANTS (via `layout` prop):
 *   "overview"     - Hero title + module list + stats row (StarRating + CountUp student count) (default)
 *   "curriculum"   - Expandable module cards with lesson counts, staggered ≥20 frames
 *   "instructor"   - Instructor bio card with credentials and course highlights
 *
 * DATA CONTRACT (CoursePromoSpec):
 *   {
 *     course_title: "Advanced React Patterns",
 *     instructor: "Sarah Chen",
 *     modules: [{ title: "Hooks Deep Dive", lesson_count: 8 }],
 *     student_count: 12500,
 *     rating: 4.8,
 *     cta: "Enroll Now",
 *     theme: "dark",
 *     layout: "overview"
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
  StarRating,
  GradientBadge,
  CaptionItem,
} from "../_shared/components";

// ── Data Contract ───────────────────────────────────────────────
export interface CoursePromoSpec {
  course_title: string;
  instructor: string;
  modules: Array<{ title: string; lesson_count: number }>;
  student_count?: number;
  rating?: number;
  cta: string;
  theme?: string;
  brandKit?: BrandKit;
  layout?: "overview" | "curriculum" | "instructor";
  format?: VideoFormat;
  captions?: CaptionItem[];
  captionLanguage?: string;
  platformHints?: PlatformHints;
  metadata?: CollabMetadata;
}

export interface CoursePromoProps {
  spec: CoursePromoSpec;
  theme?: Theme;
  layout?: "overview" | "curriculum" | "instructor";
}

// ── Scene Timing ────────────────────────────────────────────────
const TIMING = {
  bgStart: 0,
  titleStart: 5,
  subtitleStart: 20,
  modulesStart: 60,
  statsStart: 45,
  ctaStart: 200,
  instructorStart: 40,
  credentialsStart: 80,
  highlightsStart: 120,
};

// ── QuickStart Defaults ─────────────────────────────────────────
/** Sensible defaults for QuickStart specs (title + theme only). */
const QUICKSTART_DEFAULTS: Omit<CoursePromoSpec, "course_title" | "theme" | "brandKit" | "layout"> = {
  instructor: "Expert Instructor",
  modules: [
    { title: "Introduction & Setup", lesson_count: 5 },
    { title: "Core Fundamentals", lesson_count: 8 },
    { title: "Advanced Techniques", lesson_count: 6 },
    { title: "Real-World Projects", lesson_count: 4 },
  ],
  student_count: 12500,
  rating: 4.8,
  cta: "Enroll Now",
};

// ── Main Component ──────────────────────────────────────────────
export const CoursePromo: React.FC<CoursePromoProps> = ({
  spec: rawSpec,
  theme,
  layout,
}) => {
  const spec = { ...QUICKSTART_DEFAULTS, ...rawSpec };
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const resolvedTheme = applyBrandKit(theme ?? THEMES[spec.theme ?? "dark"] ?? THEME_DARK, spec.brandKit);
  const resolvedLayout = layout ?? spec.layout ?? "overview";

  const bgStyle = resolvedTheme.bg.startsWith("linear-gradient")
    ? { background: resolvedTheme.bg }
    : { backgroundColor: resolvedTheme.bg };

  if (resolvedLayout === "curriculum") {
    return <CurriculumLayout spec={spec} theme={resolvedTheme} frame={frame} fps={fps} bgStyle={bgStyle} />;
  }
  if (resolvedLayout === "instructor") {
    return <InstructorLayout spec={spec} theme={resolvedTheme} frame={frame} fps={fps} bgStyle={bgStyle} />;
  }
  return <OverviewLayout spec={spec} theme={resolvedTheme} frame={frame} fps={fps} bgStyle={bgStyle} />;
};


// ── Layout: Overview ────────────────────────────────────────────
// Hero title + module list + stats row (StarRating + CountUp student count).
const OverviewLayout: React.FC<{
  spec: CoursePromoSpec;
  theme: Theme;
  frame: number;
  fps: number;
  bgStyle: React.CSSProperties;
}> = ({ spec, theme, frame, fps, bgStyle }) => {
  const titleSpring = springEntrance(frame, fps, TIMING.titleStart, SPRING.default);
  const subtitleOpacity = fadeIn(frame, TIMING.subtitleStart);
  const statsSpring = springEntrance(frame, fps, TIMING.statsStart, SPRING.default);
  const ctaSpring = springEntrance(frame, fps, TIMING.ctaStart, SPRING.snappy);

  const totalLessons = spec.modules.reduce((sum, m) => sum + m.lesson_count, 0);

  return (
    <AbsoluteFill style={{ ...bgStyle, fontFamily: theme.fontFamily, color: theme.textPrimary }}>
      <BackgroundGrid pattern="grid" />

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
            {spec.course_title}
          </div>
          <div style={{
            fontSize: TYPE.subtitle,
            color: theme.textSecondary,
            marginTop: 8,
            opacity: subtitleOpacity,
          }}>
            by {spec.instructor}
          </div>
        </div>

        {/* Stats Row */}
        <div style={{
          display: "flex", justifyContent: "center", gap: 40,
          marginTop: 16, marginBottom: 16,
          opacity: statsSpring,
          transform: `translateY(${slideIn(statsSpring, "up", 15)}px)`,
        }}>
          {spec.rating != null && (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
              <StarRating rating={spec.rating} frame={frame} startFrame={TIMING.statsStart} fps={fps} size={20} color={theme.accent} />
              <div style={{ fontSize: TYPE.label, color: theme.textMuted }}>{spec.rating} / 5</div>
            </div>
          )}
          {spec.student_count != null && (
            <div style={{ textAlign: "center" }}>
              <div style={{
                fontSize: TYPE.stat,
                fontWeight: theme.headingWeight,
                background: theme.accentGradient,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>
                <CountUp target={spec.student_count} frame={frame} startFrame={TIMING.statsStart} />
              </div>
              <div style={{ fontSize: TYPE.label, color: theme.textMuted }}>students enrolled</div>
            </div>
          )}
          <div style={{ textAlign: "center" }}>
            <div style={{
              fontSize: TYPE.stat,
              fontWeight: theme.headingWeight,
              color: theme.textPrimary,
            }}>
              <CountUp target={totalLessons} frame={frame} startFrame={TIMING.statsStart + 10} />
            </div>
            <div style={{ fontSize: TYPE.label, color: theme.textMuted }}>total lessons</div>
          </div>
        </div>

        {/* Module List */}
        <div style={{
          flex: 1,
          display: "flex", flexDirection: "column",
          gap: 10, justifyContent: "center",
          maxWidth: 700, margin: "0 auto", width: "100%",
        }}>
          {spec.modules.slice(0, 5).map((mod, i) => {
            const delay = staggerDelay(i, TIMING.modulesStart, 20);
            const s = springEntrance(frame, fps, delay, SPRING.default);
            return (
              <GlassCard key={i} theme={theme} style={{
                opacity: s,
                transform: `translateX(${slideIn(s, "left", 30)}px)`,
                padding: "12px 20px",
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{
                      width: 28, height: 28, borderRadius: 14,
                      background: theme.accentGradient,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: TYPE.label, fontWeight: 700, color: "#fff",
                    }}>
                      {i + 1}
                    </div>
                    <div style={{ fontSize: TYPE.cardTitle, fontWeight: 600, color: theme.textPrimary }}>
                      {mod.title}
                    </div>
                  </div>
                  <div style={{ fontSize: TYPE.label, color: theme.textMuted }}>
                    {mod.lesson_count} lessons
                  </div>
                </div>
              </GlassCard>
            );
          })}
        </div>

        {/* CTA */}
        <div style={{
          textAlign: "center", marginTop: 12,
          opacity: ctaSpring,
          transform: `scale(${ctaSpring})`,
        }}>
          <GradientBadge text={spec.cta} theme={theme} />
        </div>
      </div>
    </AbsoluteFill>
  );
};


// ── Layout: Curriculum ──────────────────────────────────────────
// Expandable module cards with lesson counts, staggered ≥20 frames.
const CurriculumLayout: React.FC<{
  spec: CoursePromoSpec;
  theme: Theme;
  frame: number;
  fps: number;
  bgStyle: React.CSSProperties;
}> = ({ spec, theme, frame, fps, bgStyle }) => {
  const titleSpring = springEntrance(frame, fps, TIMING.titleStart, SPRING.default);
  const subtitleOpacity = fadeIn(frame, TIMING.subtitleStart);

  const totalLessons = spec.modules.reduce((sum, m) => sum + m.lesson_count, 0);

  return (
    <AbsoluteFill style={{ ...bgStyle, fontFamily: theme.fontFamily, color: theme.textPrimary }}>
      <BackgroundGrid pattern="dots" />

      <div style={{
        position: "absolute", inset: 0,
        display: "flex", flexDirection: "column",
        padding: `${TOP_SAFE}px ${PADDING}px`,
      }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 4 }}>
          <div style={{
            fontSize: TYPE.label,
            fontWeight: 600,
            color: theme.accent,
            textTransform: "uppercase" as const,
            letterSpacing: 2,
            opacity: subtitleOpacity,
          }}>
            CURRICULUM
          </div>
          <div style={{
            fontSize: TYPE.title,
            fontWeight: theme.headingWeight,
            opacity: titleSpring,
            transform: `translateY(${slideIn(titleSpring, "up", 20)}px)`,
            marginTop: 4,
          }}>
            {spec.course_title}
          </div>
          <div style={{
            fontSize: TYPE.body,
            color: theme.textSecondary,
            marginTop: 6,
            opacity: subtitleOpacity,
          }}>
            {spec.modules.length} modules · {totalLessons} lessons
          </div>
        </div>

        {/* Module Cards */}
        <div style={{
          flex: 1,
          display: "grid",
          gridTemplateColumns: spec.modules.length > 4 ? "1fr 1fr" : "1fr",
          gap: 12,
          alignContent: "center",
          maxWidth: 900, margin: "0 auto", width: "100%",
          marginTop: 8,
        }}>
          {spec.modules.slice(0, 8).map((mod, i) => {
            const delay = staggerDelay(i, TIMING.modulesStart, 20);
            const s = springEntrance(frame, fps, delay, SPRING.default);

            // Animated lesson count progress bar
            const barProgress = fadeIn(frame, delay + 15, 30);
            const maxLessons = Math.max(...spec.modules.map(m => m.lesson_count));
            const barWidth = maxLessons > 0 ? (mod.lesson_count / maxLessons) * 100 : 0;

            return (
              <GlassCard key={i} theme={theme} style={{
                opacity: s,
                transform: `translateY(${slideIn(s, "up", 25)}px)`,
                padding: "14px 18px",
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{
                      fontSize: TYPE.label,
                      fontWeight: 700,
                      color: theme.accent,
                    }}>
                      Module {i + 1}
                    </div>
                    <div style={{ fontSize: TYPE.cardTitle, fontWeight: 600, color: theme.textPrimary }}>
                      {mod.title}
                    </div>
                  </div>
                  <div style={{
                    fontSize: TYPE.label,
                    fontWeight: 600,
                    color: theme.textSecondary,
                  }}>
                    {mod.lesson_count} lessons
                  </div>
                </div>
                {/* Progress bar */}
                <div style={{
                  height: 3, borderRadius: 2,
                  background: theme.bgSecondary,
                  overflow: "hidden",
                }}>
                  <div style={{
                    height: "100%",
                    width: `${barWidth * barProgress}%`,
                    background: theme.accentGradient,
                    borderRadius: 2,
                  }} />
                </div>
              </GlassCard>
            );
          })}
        </div>

        {/* Footer: Instructor */}
        <div style={{
          textAlign: "center", marginTop: 8,
          opacity: fadeIn(frame, TIMING.ctaStart),
        }}>
          <div style={{ fontSize: TYPE.body, color: theme.textMuted }}>
            Taught by <span style={{ color: theme.textSecondary, fontWeight: 600 }}>{spec.instructor}</span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};


// ── Layout: Instructor ──────────────────────────────────────────
// Instructor bio card with credentials and course highlights.
const InstructorLayout: React.FC<{
  spec: CoursePromoSpec;
  theme: Theme;
  frame: number;
  fps: number;
  bgStyle: React.CSSProperties;
}> = ({ spec, theme, frame, fps, bgStyle }) => {
  const titleSpring = springEntrance(frame, fps, TIMING.titleStart, SPRING.default);
  const instructorSpring = springEntrance(frame, fps, TIMING.instructorStart, SPRING.default);
  const credentialsSpring = springEntrance(frame, fps, TIMING.credentialsStart, SPRING.default);
  const ctaSpring = springEntrance(frame, fps, TIMING.ctaStart, SPRING.snappy);

  const totalLessons = spec.modules.reduce((sum, m) => sum + m.lesson_count, 0);

  return (
    <AbsoluteFill style={{ ...bgStyle, fontFamily: theme.fontFamily, color: theme.textPrimary }}>
      <BackgroundGrid pattern="hex" />

      <div style={{
        position: "absolute", inset: 0,
        display: "flex", flexDirection: "column",
        padding: `${TOP_SAFE}px ${PADDING}px`,
      }}>
        {/* Course Title */}
        <div style={{
          textAlign: "center", marginBottom: 16,
          opacity: titleSpring,
          transform: `translateY(${slideIn(titleSpring, "up", 20)}px)`,
        }}>
          <div style={{ fontSize: TYPE.title, fontWeight: theme.headingWeight }}>
            {spec.course_title}
          </div>
        </div>

        {/* Instructor Bio Card */}
        <div style={{
          display: "flex", gap: 32,
          flex: 1, alignItems: "center", justifyContent: "center",
          maxWidth: 900, margin: "0 auto", width: "100%",
        }}>
          {/* Left: Instructor Info */}
          <GlassCard theme={theme} style={{
            flex: 1,
            opacity: instructorSpring,
            transform: `translateX(${slideIn(instructorSpring, "left", 30)}px)`,
            padding: "24px 28px",
          }}>
            <div style={{
              width: 56, height: 56, borderRadius: 28,
              background: theme.accentGradient,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 24, fontWeight: 700, color: "#fff",
              marginBottom: 12,
            }}>
              {spec.instructor.charAt(0)}
            </div>
            <div style={{ fontSize: TYPE.subtitle, fontWeight: theme.headingWeight, marginBottom: 4 }}>
              {spec.instructor}
            </div>
            <div style={{ fontSize: TYPE.body, color: theme.textSecondary, marginBottom: 12 }}>
              Course Instructor
            </div>

            {/* Credentials */}
            <div style={{
              opacity: credentialsSpring,
              transform: `translateY(${slideIn(credentialsSpring, "up", 15)}px)`,
            }}>
              <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: TYPE.cardTitle, fontWeight: 700, color: theme.accent }}>
                    {spec.modules.length}
                  </div>
                  <div style={{ fontSize: TYPE.label, color: theme.textMuted }}>Modules</div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: TYPE.cardTitle, fontWeight: 700, color: theme.accent }}>
                    {totalLessons}
                  </div>
                  <div style={{ fontSize: TYPE.label, color: theme.textMuted }}>Lessons</div>
                </div>
                {spec.student_count != null && (
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: TYPE.cardTitle, fontWeight: 700, color: theme.accent }}>
                      <CountUp target={spec.student_count} frame={frame} startFrame={TIMING.credentialsStart} />
                    </div>
                    <div style={{ fontSize: TYPE.label, color: theme.textMuted }}>Students</div>
                  </div>
                )}
              </div>
              {spec.rating != null && (
                <div style={{ marginTop: 12 }}>
                  <StarRating rating={spec.rating} frame={frame} startFrame={TIMING.credentialsStart + 10} fps={fps} size={18} color={theme.accent} />
                </div>
              )}
            </div>
          </GlassCard>

          {/* Right: Course Highlights */}
          <div style={{
            flex: 1,
            display: "flex", flexDirection: "column", gap: 10,
          }}>
            {spec.modules.slice(0, 4).map((mod, i) => {
              const delay = staggerDelay(i, TIMING.highlightsStart, 20);
              const s = springEntrance(frame, fps, delay, SPRING.default);
              return (
                <GlassCard key={i} theme={theme} style={{
                  opacity: s,
                  transform: `translateX(${slideIn(s, "right", 25)}px)`,
                  padding: "10px 16px",
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ fontSize: TYPE.cardTitle, fontWeight: 600, color: theme.textPrimary }}>
                      {mod.title}
                    </div>
                    <div style={{
                      fontSize: TYPE.label,
                      color: theme.accent,
                      fontWeight: 600,
                    }}>
                      {mod.lesson_count} lessons
                    </div>
                  </div>
                </GlassCard>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div style={{
          textAlign: "center", marginTop: 12,
          opacity: ctaSpring,
          transform: `scale(${ctaSpring})`,
        }}>
          <GradientBadge text={spec.cta} theme={theme} />
        </div>
      </div>
    </AbsoluteFill>
  );
};

/**
 * Portfolio Template - Visual showcase of freelancer work and projects.
 *
 * LAYOUTS:
 *   "gallery"     - Masonry-style grid, image-heavy, smooth transitions.
 *   "caseStudy"   - Split layout, detailed descriptions, before/after feel.
 *   "reel"        - Fast cuts, full-bleed cards, kinetic text overlays.
 *
 * BACKGROUND PATTERNS:
 *   "grid" | "dots" | "hex" | "none"
 *
 * DATA CONTRACT (PortfolioSpec):
 *   {
 *     freelancer_name: string,
 *     freelancer_title: string,
 *     projects: [{ title, client, description, tags: string[] }],
 *     skills: string[],
 *     contact_url: string,
 *   }
 *
 * USAGE:
 *   <Portfolio spec={mySpec} theme={THEME_DARK} layout="gallery" />
 */

import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  Sequence,
} from "remotion";
import type { Theme } from "../_shared/themes";
import {
  springEntrance,
  fadeIn,
  slideIn,
  staggerDelay,
  SPRING,
} from "../_shared/animations";
import { PADDING, TOP_SAFE, TYPE } from "../_shared/layouts";
import { GlassCard, GradientBadge, BackgroundGrid } from "../_shared/components";

// ── Data Contract ───────────────────────────────────────────────

export interface PortfolioProject {
  title: string;
  client: string;
  description: string;
  tags: string[];
}

export interface PortfolioSpec {
  freelancer_name: string;
  freelancer_title: string;
  projects: PortfolioProject[];
  skills: string[];
  contact_url: string;
}

export interface PortfolioProps {
  spec: PortfolioSpec;
  theme: Theme;
  layout: "gallery" | "caseStudy" | "reel";
  bgPattern?: "grid" | "dots" | "hex" | "none";
}

// ── Main Component ──────────────────────────────────────────────

export const Portfolio: React.FC<PortfolioProps> = ({
  spec,
  theme,
  layout,
  bgPattern = "grid",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const bgStyle: React.CSSProperties = theme.bg.startsWith("linear")
    ? { backgroundImage: theme.bg }
    : { backgroundColor: theme.bg };

  const layoutProps: LayoutProps = { spec, theme, bgPattern, frame, fps, bgStyle };

  return (
    <AbsoluteFill style={{ ...bgStyle, fontFamily: theme.fontFamily }}>
      {bgPattern !== "none" && <BackgroundGrid pattern={bgPattern} opacity={0.03} />}
      {layout === "gallery" && <GalleryLayout {...layoutProps} />}
      {layout === "caseStudy" && <CaseStudyLayout {...layoutProps} />}
      {layout === "reel" && <ReelLayout {...layoutProps} />}
    </AbsoluteFill>
  );
};

// ── Shared Layout Props ─────────────────────────────────────────

interface LayoutProps {
  spec: PortfolioSpec;
  theme: Theme;
  bgPattern: string;
  frame: number;
  fps: number;
  bgStyle: React.CSSProperties;
}

// ── Helper: Tag Pill ────────────────────────────────────────────

const TagPill: React.FC<{
  text: string;
  theme: Theme;
  opacity?: number;
}> = ({ text, theme, opacity = 1 }) => (
  <span style={{
    display: "inline-block",
    padding: "3px 10px",
    borderRadius: 999,
    fontSize: TYPE.caption,
    fontWeight: 600,
    background: theme.bgGlass,
    border: `1px solid ${theme.cardBorder}`,
    color: theme.accent,
    opacity,
    letterSpacing: 0.3,
  }}>
    {text}
  </span>
);

// ── Helper: Project Number ──────────────────────────────────────

const ProjectNumber: React.FC<{
  num: number;
  theme: Theme;
  size?: number;
}> = ({ num, theme, size = 28 }) => (
  <div style={{
    width: size,
    height: size,
    borderRadius: 6,
    background: theme.accentGradient,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: size * 0.45,
    fontWeight: 800,
    color: "#fff",
    flexShrink: 0,
  }}>
    {String(num).padStart(2, "0")}
  </div>
);


// ═══════════════════════════════════════════════════════════════
// LAYOUT 1: Gallery - Masonry-style grid, image-heavy feel
// Projects shown as cards in a 2×2 grid with staggered entrances.
// Best with: THEME_DARK, THEME_CLEAN, THEME_WARM
// ═══════════════════════════════════════════════════════════════

const GalleryLayout: React.FC<LayoutProps> = ({ spec, theme, frame, fps }) => {
  // Scene 1: Hero (frames 0–80)
  const heroS = springEntrance(frame, fps, 5, SPRING.gentle);
  const heroOp = fadeIn(frame, 5, 25);

  // Scene 2: Project grid (frames 80–350)
  // Scene 3: Skills + CTA (frames 380+)
  const ctaOp = fadeIn(frame, 420, 20);
  const ctaS = springEntrance(frame, fps, 420, SPRING.bouncy);

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      height: "100%",
      padding: PADDING,
      paddingTop: TOP_SAFE,
      justifyContent: "center",
      gap: 20,
    }}>
      {/* Hero: name + title */}
      <div style={{
        opacity: heroOp,
        transform: `translateY(${slideIn(heroS, "up", 25)}px)`,
        textAlign: "center" as const,
        marginBottom: 4,
      }}>
        <div style={{
          fontSize: TYPE.label,
          fontWeight: 700,
          letterSpacing: 2,
          textTransform: "uppercase" as const,
          color: theme.accent,
          marginBottom: 8,
        }}>
          Portfolio
        </div>
        <div style={{
          fontSize: TYPE.hero,
          fontWeight: theme.headingWeight,
          color: theme.textPrimary,
          lineHeight: 1.1,
          marginBottom: 6,
        }}>
          {spec.freelancer_name}
        </div>
        <div style={{
          fontSize: TYPE.subtitle,
          color: theme.textSecondary,
        }}>
          {spec.freelancer_title}
        </div>
      </div>

      {/* Project grid - 2×2 */}
      <Sequence from={80} layout="none">
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 14,
        }}>
          {spec.projects.slice(0, 4).map((proj, i) => {
            const delay = staggerDelay(i, 90, 25);
            const s = springEntrance(frame, fps, delay, SPRING.default);
            const op = fadeIn(frame, delay, 20);
            return (
              <GlassCard key={i} theme={theme} style={{
                opacity: op,
                transform: `scale(${0.9 + 0.1 * s})`,
                padding: "16px 20px",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                  <ProjectNumber num={i + 1} theme={theme} />
                  <div>
                    <div style={{
                      fontSize: TYPE.cardTitle,
                      fontWeight: 700,
                      color: theme.textPrimary,
                      lineHeight: 1.2,
                    }}>
                      {proj.title}
                    </div>
                    <div style={{
                      fontSize: TYPE.caption,
                      color: theme.textMuted,
                    }}>
                      {proj.client}
                    </div>
                  </div>
                </div>
                <div style={{
                  fontSize: TYPE.caption,
                  color: theme.textSecondary,
                  lineHeight: 1.4,
                  marginBottom: 8,
                }}>
                  {proj.description}
                </div>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" as const }}>
                  {proj.tags.slice(0, 3).map((tag, j) => (
                    <TagPill key={j} text={tag} theme={theme} />
                  ))}
                </div>
              </GlassCard>
            );
          })}
        </div>
      </Sequence>

      {/* Skills row + CTA */}
      <Sequence from={380} layout="none">
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
          <div style={{
            display: "flex",
            gap: 8,
            flexWrap: "wrap" as const,
            opacity: fadeIn(frame, 390, 20),
          }}>
            {spec.skills.slice(0, 6).map((skill, i) => {
              const op = fadeIn(frame, staggerDelay(i, 395, 8), 15);
              return (
                <span key={i} style={{
                  opacity: op,
                  padding: "4px 12px",
                  borderRadius: 6,
                  fontSize: TYPE.caption,
                  fontWeight: 600,
                  background: theme.bgSecondary,
                  color: theme.textSecondary,
                  border: `1px solid ${theme.cardBorder}`,
                }}>
                  {skill}
                </span>
              );
            })}
          </div>
          <div style={{
            opacity: ctaOp,
            transform: `scale(${0.85 + 0.15 * ctaS})`,
          }}>
            <GradientBadge text={spec.contact_url} theme={theme} fontSize={13} />
          </div>
        </div>
      </Sequence>
    </div>
  );
};


// ═══════════════════════════════════════════════════════════════
// LAYOUT 2: Case Study - Split layout, detailed project descriptions
// One project at a time, left info + right details. Professional feel.
// Best with: THEME_CLEAN, THEME_MINIMAL, THEME_BOLD
// ═══════════════════════════════════════════════════════════════

const CaseStudyLayout: React.FC<LayoutProps> = ({ spec, theme, frame, fps }) => {
  // Scene 1: Hero (frames 0–70)
  const heroS = springEntrance(frame, fps, 5, SPRING.snappy);
  const heroOp = fadeIn(frame, 5, 25);

  // Scene 2: Featured projects (frames 70–380)
  // Scene 3: Skills + CTA (frames 400+)
  const ctaOp = fadeIn(frame, 430, 20);
  const ctaS = springEntrance(frame, fps, 430, SPRING.bouncy);

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      height: "100%",
      padding: PADDING,
      paddingTop: TOP_SAFE,
      justifyContent: "center",
      gap: 22,
    }}>
      {/* Hero - left-aligned, professional */}
      <div style={{
        opacity: heroOp,
        transform: `translateX(${slideIn(heroS, "left", 25)}px)`,
        display: "flex",
        alignItems: "baseline",
        gap: 16,
      }}>
        <div>
          <div style={{
            fontSize: TYPE.hero,
            fontWeight: theme.headingWeight,
            color: theme.textPrimary,
            lineHeight: 1.1,
          }}>
            {spec.freelancer_name}
          </div>
          <div style={{
            fontSize: TYPE.subtitle,
            color: theme.textSecondary,
            marginTop: 4,
          }}>
            {spec.freelancer_title}
          </div>
        </div>
        <div style={{
          width: 60,
          height: 3,
          background: theme.accentGradient,
          borderRadius: 2,
          marginTop: 8,
        }} />
      </div>

      {/* Featured projects - stacked case study cards */}
      <Sequence from={70} layout="none">
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {spec.projects.slice(0, 3).map((proj, i) => {
            const delay = staggerDelay(i, 80, 30);
            const s = springEntrance(frame, fps, delay, SPRING.default);
            const op = fadeIn(frame, delay, 22);
            return (
              <GlassCard key={i} theme={theme} style={{
                opacity: op,
                transform: `translateX(${slideIn(s, "right", 30)}px)`,
                padding: "16px 24px",
                display: "flex",
                gap: 20,
                alignItems: "center",
              }}>
                {/* Left: project number + client */}
                <div style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 6,
                  minWidth: 60,
                }}>
                  <ProjectNumber num={i + 1} theme={theme} size={36} />
                  <div style={{
                    fontSize: TYPE.caption,
                    color: theme.textMuted,
                    textAlign: "center" as const,
                  }}>
                    {proj.client}
                  </div>
                </div>

                {/* Right: title + description + tags */}
                <div style={{ flex: 1 }}>
                  <div style={{
                    fontSize: TYPE.cardTitle + 2,
                    fontWeight: 700,
                    color: theme.textPrimary,
                    marginBottom: 4,
                  }}>
                    {proj.title}
                  </div>
                  <div style={{
                    fontSize: TYPE.body,
                    color: theme.textSecondary,
                    lineHeight: 1.5,
                    marginBottom: 8,
                  }}>
                    {proj.description}
                  </div>
                  <div style={{ display: "flex", gap: 6 }}>
                    {proj.tags.slice(0, 4).map((tag, j) => (
                      <TagPill key={j} text={tag} theme={theme} />
                    ))}
                  </div>
                </div>
              </GlassCard>
            );
          })}
        </div>
      </Sequence>

      {/* Skills bar + CTA */}
      <Sequence from={400} layout="none">
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
          <div style={{
            display: "flex",
            gap: 8,
            opacity: fadeIn(frame, 405, 20),
          }}>
            {spec.skills.slice(0, 5).map((skill, i) => {
              const op = fadeIn(frame, staggerDelay(i, 410, 8), 15);
              return (
                <span key={i} style={{
                  opacity: op,
                  padding: "4px 12px",
                  borderRadius: 6,
                  fontSize: TYPE.caption,
                  fontWeight: 600,
                  background: theme.bgSecondary,
                  color: theme.textSecondary,
                  border: `1px solid ${theme.cardBorder}`,
                }}>
                  {skill}
                </span>
              );
            })}
          </div>
          <div style={{
            opacity: ctaOp,
            transform: `scale(${0.85 + 0.15 * ctaS})`,
          }}>
            <GradientBadge text={spec.contact_url} theme={theme} fontSize={13} />
          </div>
        </div>
      </Sequence>
    </div>
  );
};


// ═══════════════════════════════════════════════════════════════
// LAYOUT 3: Reel - Fast cuts, kinetic text, dynamic feel
// Projects fly in one at a time with bold typography. High energy.
// Best with: THEME_BOLD, THEME_NEON, THEME_DARK
// ═══════════════════════════════════════════════════════════════

const ReelLayout: React.FC<LayoutProps> = ({ spec, theme, frame, fps }) => {
  // Scene 1: Hero splash (frames 0–60)
  const heroS = springEntrance(frame, fps, 0, SPRING.snappy);
  const heroOp = fadeIn(frame, 0, 20);

  // Scene 2: Projects fly in (frames 60–360)
  // Scene 3: Skills cloud + CTA (frames 380+)
  const ctaOp = fadeIn(frame, 420, 20);
  const ctaS = springEntrance(frame, fps, 420, SPRING.snappy);

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      height: "100%",
      padding: PADDING,
      paddingTop: TOP_SAFE,
      justifyContent: "center",
      gap: 18,
    }}>
      {/* Hero - big name, kinetic feel */}
      <div style={{
        opacity: heroOp,
        transform: `translateX(${slideIn(heroS, "left", 40)}px)`,
      }}>
        <div style={{
          fontSize: TYPE.hero + 8,
          fontWeight: theme.headingWeight,
          color: theme.textPrimary,
          lineHeight: 1.0,
          letterSpacing: -1,
        }}>
          {spec.freelancer_name}
        </div>
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginTop: 6,
        }}>
          <div style={{
            width: 40,
            height: 3,
            background: theme.accentGradient,
            borderRadius: 2,
          }} />
          <div style={{
            fontSize: TYPE.subtitle,
            fontWeight: 600,
            color: theme.accent,
            textTransform: "uppercase" as const,
            letterSpacing: 2,
          }}>
            {spec.freelancer_title}
          </div>
        </div>
      </div>

      {/* Projects - alternating left/right slide-ins */}
      <Sequence from={60} layout="none">
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {spec.projects.slice(0, 4).map((proj, i) => {
            const delay = staggerDelay(i, 70, 28);
            const direction = i % 2 === 0 ? "left" : "right";
            const s = springEntrance(frame, fps, delay, SPRING.snappy);
            const op = fadeIn(frame, delay, 18);
            return (
              <div key={i} style={{
                opacity: op,
                transform: `translateX(${slideIn(s, direction, 50)}px)`,
                display: "flex",
                alignItems: "center",
                gap: 16,
                padding: "12px 20px",
                background: theme.bgGlass,
                border: `1px solid ${theme.cardBorder}`,
                borderRadius: 10,
              }}>
                <div style={{
                  fontSize: TYPE.stat - 8,
                  fontWeight: theme.headingWeight,
                  color: theme.accent,
                  opacity: 0.6,
                  minWidth: 36,
                }}>
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{
                    fontSize: TYPE.cardTitle + 2,
                    fontWeight: 700,
                    color: theme.textPrimary,
                    lineHeight: 1.2,
                  }}>
                    {proj.title}
                    <span style={{
                      fontSize: TYPE.caption,
                      color: theme.textMuted,
                      fontWeight: 400,
                      marginLeft: 10,
                    }}>
                      - {proj.client}
                    </span>
                  </div>
                  <div style={{
                    fontSize: TYPE.caption,
                    color: theme.textSecondary,
                    marginTop: 3,
                    lineHeight: 1.4,
                  }}>
                    {proj.description}
                  </div>
                </div>
                <div style={{ display: "flex", gap: 5 }}>
                  {proj.tags.slice(0, 2).map((tag, j) => (
                    <TagPill key={j} text={tag} theme={theme} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </Sequence>

      {/* Skills + CTA */}
      <Sequence from={380} layout="none">
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
          <div style={{
            display: "flex",
            gap: 6,
            flexWrap: "wrap" as const,
            opacity: fadeIn(frame, 390, 20),
          }}>
            {spec.skills.slice(0, 6).map((skill, i) => {
              const delay = staggerDelay(i, 395, 6);
              const s = springEntrance(frame, fps, delay, SPRING.snappy);
              const op = fadeIn(frame, delay, 12);
              return (
                <span key={i} style={{
                  opacity: op,
                  transform: `scale(${0.8 + 0.2 * s})`,
                  padding: "4px 12px",
                  borderRadius: 6,
                  fontSize: TYPE.caption,
                  fontWeight: 700,
                  background: theme.bgSecondary,
                  color: theme.accent,
                  border: `1px solid ${theme.cardBorder}`,
                }}>
                  {skill}
                </span>
              );
            })}
          </div>
          <div style={{
            opacity: ctaOp,
            transform: `scale(${0.85 + 0.15 * ctaS})`,
          }}>
            <GradientBadge text={spec.contact_url} theme={theme} fontSize={14} />
          </div>
        </div>
      </Sequence>
    </div>
  );
};

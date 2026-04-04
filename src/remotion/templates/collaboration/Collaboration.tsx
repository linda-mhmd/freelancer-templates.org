/**
 * Collaboration / Duet Template - Creator Economy Templates (V6)
 *
 * A reusable, theme-aware collaboration announcement video template.
 * Renders split-screen creator cards, announcements, and combined stats.
 *
 * LAYOUT VARIANTS (via `layout` prop):
 *   "split-screen"   - SplitScreen with side-by-side creator cards (default)
 *   "announcement"   - Hero collab title with creator names and project details
 *   "stats-merge"    - Combined audience CountUp with individual creator stat cards
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
import {
  GlassCard,
  BackgroundGrid,
  CountUp,
  SplitScreen,
  GradientBadge,
  CaptionItem,
} from "../_shared/components";

// ── Data Contract ───────────────────────────────────────────────
export interface CollaborationSpec {
  creators: Array<{ name: string; audience?: number }>;
  collab_title: string;
  description: string;
  combined_audience?: number;
  theme?: string;
  brandKit?: BrandKit;
  layout?: "split-screen" | "announcement" | "stats-merge";
  format?: VideoFormat;
  captions?: CaptionItem[];
  captionLanguage?: string;
  platformHints?: PlatformHints;
  metadata?: CollabMetadata;
}

export interface CollaborationProps {
  spec: CollaborationSpec;
  theme?: Theme;
  layout?: "split-screen" | "announcement" | "stats-merge";
}

// ── Scene Timing ────────────────────────────────────────────────
const TIMING = {
  titleStart: 5,
  descStart: 25,
  creatorsStart: 50,
  statsStart: 60,
  ctaStart: 200,
};

// ── QuickStart Defaults ─────────────────────────────────────────
const QUICKSTART_DEFAULTS: Omit<CollaborationSpec, "collab_title" | "theme" | "brandKit" | "layout"> = {
  creators: [
    { name: "Creator A", audience: 150000 },
    { name: "Creator B", audience: 220000 },
  ],
  description: "Two creators join forces for an epic collaboration",
  combined_audience: 370000,
};

// ── Main Component ──────────────────────────────────────────────
export const Collaboration: React.FC<CollaborationProps> = ({
  spec: rawSpec,
  theme,
  layout,
}) => {
  const spec = { ...QUICKSTART_DEFAULTS, ...rawSpec };
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const resolvedTheme = applyBrandKit(theme ?? THEMES[spec.theme ?? "dark"] ?? THEME_DARK, spec.brandKit);
  const resolvedLayout = layout ?? spec.layout ?? "split-screen";

  const bgStyle = resolvedTheme.bg.startsWith("linear-gradient")
    ? { background: resolvedTheme.bg }
    : { backgroundColor: resolvedTheme.bg };

  if (resolvedLayout === "announcement") {
    return <AnnouncementLayout spec={spec} theme={resolvedTheme} frame={frame} fps={fps} bgStyle={bgStyle} />;
  }
  if (resolvedLayout === "stats-merge") {
    return <StatsMergeLayout spec={spec} theme={resolvedTheme} frame={frame} fps={fps} bgStyle={bgStyle} />;
  }
  return <SplitScreenLayout spec={spec} theme={resolvedTheme} frame={frame} fps={fps} bgStyle={bgStyle} />;
};

// ── Layout: Split Screen ────────────────────────────────────────
const SplitScreenLayout: React.FC<{
  spec: CollaborationSpec; theme: Theme; frame: number; fps: number; bgStyle: React.CSSProperties;
}> = ({ spec, theme, frame, fps, bgStyle }) => {
  const titleSpring = springEntrance(frame, fps, TIMING.titleStart, SPRING.default);
  const descOpacity = fadeIn(frame, TIMING.descStart);
  const creators = spec.creators.slice(0, 2);

  const leftContent = (
    <div style={{
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      height: "100%", padding: 24, textAlign: "center",
    }}>
      <div style={{
        width: 64, height: 64, borderRadius: "50%",
        background: theme.accentGradient,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: TYPE.title, fontWeight: theme.headingWeight, marginBottom: 12,
      }}>
        {(creators[0]?.name ?? "A").charAt(0)}
      </div>
      <div style={{ fontSize: TYPE.cardTitle, fontWeight: 600, marginBottom: 4 }}>
        {creators[0]?.name ?? "Creator A"}
      </div>
      {creators[0]?.audience != null && (
        <div style={{ fontSize: TYPE.caption, color: theme.textMuted }}>
          <CountUp target={creators[0].audience} frame={frame} startFrame={TIMING.creatorsStart} suffix=" followers" />
        </div>
      )}
    </div>
  );

  const rightContent = (
    <div style={{
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      height: "100%", padding: 24, textAlign: "center",
    }}>
      <div style={{
        width: 64, height: 64, borderRadius: "50%",
        background: theme.accentGradient,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: TYPE.title, fontWeight: theme.headingWeight, marginBottom: 12,
      }}>
        {(creators[1]?.name ?? "B").charAt(0)}
      </div>
      <div style={{ fontSize: TYPE.cardTitle, fontWeight: 600, marginBottom: 4 }}>
        {creators[1]?.name ?? "Creator B"}
      </div>
      {creators[1]?.audience != null && (
        <div style={{ fontSize: TYPE.caption, color: theme.textMuted }}>
          <CountUp target={creators[1].audience} frame={frame} startFrame={TIMING.creatorsStart} suffix=" followers" />
        </div>
      )}
    </div>
  );

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
          fontSize: TYPE.hero, fontWeight: theme.headingWeight,
          textAlign: "center", marginBottom: 8,
        }}>
          {spec.collab_title}
        </div>
        <div style={{
          opacity: descOpacity, fontSize: TYPE.subtitle, color: theme.textSecondary,
          textAlign: "center", marginBottom: 24,
        }}>
          {spec.description}
        </div>
        <div style={{ flex: 1 }}>
          <SplitScreen
            leftContent={leftContent}
            rightContent={rightContent}
            frame={frame}
            startFrame={TIMING.creatorsStart}
            fps={fps}
            theme={theme}
            dividerAnimated
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ── Layout: Announcement ────────────────────────────────────────
const AnnouncementLayout: React.FC<{
  spec: CollaborationSpec; theme: Theme; frame: number; fps: number; bgStyle: React.CSSProperties;
}> = ({ spec, theme, frame, fps, bgStyle }) => {
  const titleSpring = springEntrance(frame, fps, TIMING.titleStart, SPRING.default);
  const descOpacity = fadeIn(frame, TIMING.descStart);
  const ctaSpring = springEntrance(frame, fps, TIMING.ctaStart, SPRING.snappy);
  const creators = spec.creators;

  return (
    <AbsoluteFill style={{ ...bgStyle, fontFamily: theme.fontFamily, color: theme.textPrimary }}>
      <BackgroundGrid pattern="dots" />
      <div style={{
        position: "absolute", inset: 0,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        padding: `${TOP_SAFE}px ${PADDING}px`, textAlign: "center",
      }}>
        <div style={{
          opacity: fadeIn(frame, 0), fontSize: TYPE.label,
          color: theme.accent, textTransform: "uppercase" as const,
          letterSpacing: 3, marginBottom: 16, fontWeight: 700,
        }}>
          Collaboration Announcement
        </div>
        <div style={{
          opacity: titleSpring, transform: `translateY(${(1 - titleSpring) * -20}px)`,
          fontSize: TYPE.hero, fontWeight: theme.headingWeight, marginBottom: 12,
        }}>
          {spec.collab_title}
        </div>
        <div style={{ opacity: descOpacity, fontSize: TYPE.subtitle, color: theme.textSecondary, marginBottom: 32, maxWidth: 800 }}>
          {spec.description}
        </div>

        {/* Creator names */}
        <div style={{ display: "flex", gap: 16, marginBottom: 32 }}>
          {creators.map((c, i) => {
            const delay = staggerDelay(i, TIMING.creatorsStart, 20);
            const s = springEntrance(frame, fps, delay, SPRING.default);
            return (
              <GlassCard key={i} theme={theme} style={{
                opacity: s, transform: `translateY(${(1 - s) * 15}px)`,
                padding: "12px 24px",
              }}>
                <span style={{ fontSize: TYPE.body, fontWeight: 600 }}>{c.name}</span>
                {c.audience != null && (
                  <span style={{ fontSize: TYPE.caption, color: theme.textMuted, marginLeft: 8 }}>
                    <CountUp target={c.audience} frame={frame} startFrame={delay} suffix="" /> followers
                  </span>
                )}
              </GlassCard>
            );
          })}
        </div>

        <div style={{ opacity: ctaSpring, transform: `scale(${ctaSpring})` }}>
          <GradientBadge text="Coming Soon" theme={theme} />
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ── Layout: Stats Merge ─────────────────────────────────────────
const StatsMergeLayout: React.FC<{
  spec: CollaborationSpec; theme: Theme; frame: number; fps: number; bgStyle: React.CSSProperties;
}> = ({ spec, theme, frame, fps, bgStyle }) => {
  const titleSpring = springEntrance(frame, fps, TIMING.titleStart, SPRING.default);
  const statsSpring = springEntrance(frame, fps, TIMING.statsStart, SPRING.default);
  const creators = spec.creators.slice(0, 4);
  const combinedAudience = spec.combined_audience ?? creators.reduce((sum, c) => sum + (c.audience ?? 0), 0);

  return (
    <AbsoluteFill style={{ ...bgStyle, fontFamily: theme.fontFamily, color: theme.textPrimary }}>
      <BackgroundGrid pattern="grid" />
      <div style={{
        position: "absolute", inset: 0,
        display: "flex", flexDirection: "column",
        alignItems: "center",
        padding: `${TOP_SAFE}px ${PADDING}px`, textAlign: "center",
      }}>
        <div style={{
          opacity: titleSpring, transform: `translateY(${(1 - titleSpring) * -20}px)`,
          fontSize: TYPE.hero, fontWeight: theme.headingWeight, marginBottom: 12,
        }}>
          {spec.collab_title}
        </div>

        {/* Combined audience stat */}
        <div style={{
          opacity: statsSpring, transform: `scale(${0.8 + statsSpring * 0.2})`,
          marginBottom: 8,
        }}>
          <span style={{ fontSize: 64, fontWeight: theme.headingWeight, color: theme.accent }}>
            <CountUp target={combinedAudience} frame={frame} startFrame={TIMING.statsStart} suffix="" />
          </span>
        </div>
        <div style={{ opacity: fadeIn(frame, TIMING.statsStart + 10), fontSize: TYPE.subtitle, color: theme.textSecondary, marginBottom: 40 }}>
          Combined Audience
        </div>

        {/* Individual creator cards */}
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
          {creators.map((c, i) => {
            const delay = staggerDelay(i, TIMING.creatorsStart + 30, 20);
            const s = springEntrance(frame, fps, delay, SPRING.default);
            return (
              <GlassCard key={i} theme={theme} style={{
                opacity: s, transform: `translateY(${(1 - s) * 20}px)`,
                padding: "16px 28px", textAlign: "center", minWidth: 160,
              }}>
                <div style={{ fontSize: TYPE.cardTitle, fontWeight: 600, marginBottom: 4 }}>{c.name}</div>
                {c.audience != null && (
                  <div style={{ fontSize: TYPE.body, color: theme.accent }}>
                    <CountUp target={c.audience} frame={frame} startFrame={delay} suffix="" />
                  </div>
                )}
              </GlassCard>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};

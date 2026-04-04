/**
 * Behind The Scenes Template - Creator Economy Templates (V5)
 *
 * A reusable, theme-aware behind-the-scenes video template.
 * Renders scene cards, timelines, and process flows.
 *
 * LAYOUT VARIANTS (via `layout` prop):
 *   "scene-cards"   - Sequential GlassCard scene cards with captions (default)
 *   "timeline"      - Vertical timeline with dots and scene descriptions
 *   "process-flow"  - Horizontal process steps with connecting arrows
 *
 * DATA CONTRACT (BehindTheScenesSpec):
 *   {
 *     title: "Making of Our Brand Film",
 *     scenes: [
 *       { title: "Pre-Production", description: "Storyboarding and location scouting", caption: "Day 1" }
 *     ],
 *     closing_message: "Thanks for watching!",
 *     theme: "dark",
 *     layout: "scene-cards"
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
  GradientBadge,
  CaptionItem,
} from "../_shared/components";

// ── Data Contract ───────────────────────────────────────────────
export interface BehindTheScenesSpec {
  title: string;
  scenes: Array<{ title: string; description: string; caption?: string }>;
  closing_message?: string;
  theme?: string;
  brandKit?: BrandKit;
  layout?: "scene-cards" | "timeline" | "process-flow";
  format?: VideoFormat;
  captions?: CaptionItem[];
  captionLanguage?: string;
  platformHints?: PlatformHints;
  metadata?: CollabMetadata;
}

export interface BehindTheScenesProps {
  spec: BehindTheScenesSpec;
  theme?: Theme;
  layout?: "scene-cards" | "timeline" | "process-flow";
}

// ── Scene Timing ────────────────────────────────────────────────
const TIMING = {
  titleStart: 5,
  cardsStart: 40,
  closingStart: 200,
};

// ── QuickStart Defaults ─────────────────────────────────────────
/** Sensible defaults for QuickStart specs (title + theme only). */
const QUICKSTART_DEFAULTS: Omit<BehindTheScenesSpec, "title" | "theme" | "brandKit" | "layout"> = {
  scenes: [
    { title: "Concept & Planning", description: "Brainstorming ideas and mapping out the vision", caption: "Phase 1" },
    { title: "Production Setup", description: "Setting up equipment and preparing the workspace", caption: "Phase 2" },
    { title: "Creative Process", description: "Bringing the concept to life through iteration", caption: "Phase 3" },
    { title: "Final Touches", description: "Polishing details and preparing for launch", caption: "Phase 4" },
  ],
  closing_message: "Thanks for coming along on this journey",
};

// ── Main Component ──────────────────────────────────────────────
export const BehindTheScenes: React.FC<BehindTheScenesProps> = ({
  spec: rawSpec,
  theme,
  layout,
}) => {
  const spec = { ...QUICKSTART_DEFAULTS, ...rawSpec };
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const resolvedTheme = applyBrandKit(theme ?? THEMES[spec.theme ?? "dark"] ?? THEME_DARK, spec.brandKit);
  const resolvedLayout = layout ?? spec.layout ?? "scene-cards";

  const bgStyle = resolvedTheme.bg.startsWith("linear-gradient")
    ? { background: resolvedTheme.bg }
    : { backgroundColor: resolvedTheme.bg };

  if (resolvedLayout === "timeline") {
    return <TimelineLayout spec={spec} theme={resolvedTheme} frame={frame} fps={fps} bgStyle={bgStyle} />;
  }
  if (resolvedLayout === "process-flow") {
    return <ProcessFlowLayout spec={spec} theme={resolvedTheme} frame={frame} fps={fps} bgStyle={bgStyle} />;
  }
  return <SceneCardsLayout spec={spec} theme={resolvedTheme} frame={frame} fps={fps} bgStyle={bgStyle} />;
};

// ── Layout: Scene Cards ─────────────────────────────────────────
// Sequential GlassCard scene cards with captions, staggered ≥20 frames.
const SceneCardsLayout: React.FC<{
  spec: BehindTheScenesSpec;
  theme: Theme;
  frame: number;
  fps: number;
  bgStyle: React.CSSProperties;
}> = ({ spec, theme, frame, fps, bgStyle }) => {
  const titleSpring = springEntrance(frame, fps, TIMING.titleStart, SPRING.default);
  const closingOpacity = fadeIn(frame, TIMING.closingStart);
  const scenes = spec.scenes.slice(0, 6);
  const useGrid = scenes.length > 4;

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
            fontSize: TYPE.label, fontWeight: 600,
            color: theme.accent, textTransform: "uppercase" as const,
            letterSpacing: 2, marginBottom: 8,
          }}>
            Behind The Scenes
          </div>
          <div style={{
            fontSize: TYPE.title, fontWeight: theme.headingWeight, lineHeight: 1.3,
          }}>
            {spec.title}
          </div>
        </div>

        {/* Scene Cards */}
        <div style={{
          flex: 1, display: "flex",
          flexDirection: useGrid ? "row" : "column",
          flexWrap: useGrid ? "wrap" : "nowrap",
          justifyContent: "center", gap: 12,
          ...(useGrid ? { alignContent: "center" } : {}),
        }}>
          {scenes.map((scene, i) => {
            const delay = staggerDelay(i, TIMING.cardsStart, 20);
            const s = springEntrance(frame, fps, delay, SPRING.default);
            return (
              <GlassCard key={i} theme={theme} style={{
                opacity: s,
                transform: `translateX(${slideIn(s, "left", 30)}px)`,
                padding: "14px 20px",
                ...(useGrid ? { width: "calc(50% - 6px)", boxSizing: "border-box" as const } : {}),
              }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: 6,
                    background: theme.accentGradient,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: TYPE.label, fontWeight: 700, color: "#ffffff", flexShrink: 0,
                  }}>
                    {i + 1}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: TYPE.cardTitle, fontWeight: 700, marginBottom: 3 }}>
                      {scene.title}
                    </div>
                    <div style={{ fontSize: TYPE.body, color: theme.textSecondary, lineHeight: 1.4 }}>
                      {scene.description}
                    </div>
                    {scene.caption && (
                      <div style={{ fontSize: TYPE.label, color: theme.textMuted, marginTop: 4 }}>
                        {scene.caption}
                      </div>
                    )}
                  </div>
                </div>
              </GlassCard>
            );
          })}
        </div>

        {/* Closing */}
        {spec.closing_message && (
          <div style={{
            opacity: closingOpacity,
            display: "flex", justifyContent: "center", marginTop: 12,
          }}>
            <GradientBadge text={spec.closing_message} theme={theme} fontSize={TYPE.cardTitle} />
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};


// ── Layout: Timeline ────────────────────────────────────────────
// Vertical timeline with dots and scene descriptions.
const TimelineLayout: React.FC<{
  spec: BehindTheScenesSpec;
  theme: Theme;
  frame: number;
  fps: number;
  bgStyle: React.CSSProperties;
}> = ({ spec, theme, frame, fps, bgStyle }) => {
  const titleSpring = springEntrance(frame, fps, TIMING.titleStart, SPRING.default);
  const closingOpacity = fadeIn(frame, TIMING.closingStart);
  const scenes = spec.scenes.slice(0, 5);

  return (
    <AbsoluteFill style={{ ...bgStyle, fontFamily: theme.fontFamily, color: theme.textPrimary }}>
      <BackgroundGrid pattern="grid" />

      <div style={{
        position: "absolute", inset: 0,
        display: "flex", flexDirection: "column",
        padding: `${TOP_SAFE}px ${PADDING}px`,
      }}>
        {/* Header */}
        <div style={{
          opacity: titleSpring,
          transform: `translateY(${slideIn(titleSpring, "up", 20)}px)`,
          textAlign: "center", marginBottom: 24,
        }}>
          <div style={{ fontSize: TYPE.title, fontWeight: theme.headingWeight, lineHeight: 1.3 }}>
            {spec.title}
          </div>
        </div>

        {/* Timeline */}
        <div style={{
          flex: 1, display: "flex", flexDirection: "column",
          justifyContent: "center", position: "relative",
          paddingLeft: 40,
        }}>
          {/* Vertical line */}
          <div style={{
            position: "absolute", left: 18, top: 0, bottom: 0,
            width: 2, background: theme.cardBorder,
          }} />

          {scenes.map((scene, i) => {
            const delay = staggerDelay(i, TIMING.cardsStart, 25);
            const s = springEntrance(frame, fps, delay, SPRING.default);
            return (
              <div key={i} style={{
                opacity: s,
                transform: `translateX(${slideIn(s, "left", 20)}px)`,
                display: "flex", alignItems: "flex-start", gap: 16,
                marginBottom: i < scenes.length - 1 ? 20 : 0,
                position: "relative",
              }}>
                {/* Timeline dot */}
                <div style={{
                  position: "absolute", left: -30,
                  width: 14, height: 14, borderRadius: 7,
                  background: theme.accent,
                  border: `2px solid ${theme.bg.startsWith("linear") ? "#1a1520" : theme.bg}`,
                  marginTop: 3,
                }} />
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
                    <div style={{ fontSize: TYPE.cardTitle, fontWeight: 700 }}>
                      {scene.title}
                    </div>
                    {scene.caption && (
                      <div style={{
                        fontSize: TYPE.caption, color: theme.accent,
                        background: `${theme.accent}15`, padding: "2px 8px",
                        borderRadius: 4,
                      }}>
                        {scene.caption}
                      </div>
                    )}
                  </div>
                  <div style={{ fontSize: TYPE.body, color: theme.textSecondary, lineHeight: 1.4 }}>
                    {scene.description}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Closing */}
        {spec.closing_message && (
          <div style={{
            opacity: closingOpacity,
            display: "flex", justifyContent: "center", marginTop: 16,
          }}>
            <GradientBadge text={spec.closing_message} theme={theme} fontSize={TYPE.cardTitle} />
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};


// ── Layout: Process Flow ────────────────────────────────────────
// Horizontal process steps with connecting arrow SVGs.
const ProcessFlowLayout: React.FC<{
  spec: BehindTheScenesSpec;
  theme: Theme;
  frame: number;
  fps: number;
  bgStyle: React.CSSProperties;
}> = ({ spec, theme, frame, fps, bgStyle }) => {
  const titleSpring = springEntrance(frame, fps, TIMING.titleStart, SPRING.default);
  const closingOpacity = fadeIn(frame, TIMING.closingStart);
  const scenes = spec.scenes.slice(0, 4);

  return (
    <AbsoluteFill style={{ ...bgStyle, fontFamily: theme.fontFamily, color: theme.textPrimary }}>
      <BackgroundGrid pattern="hex" />

      <div style={{
        position: "absolute", inset: 0,
        display: "flex", flexDirection: "column",
        padding: `${TOP_SAFE}px ${PADDING}px`,
        alignItems: "center",
      }}>
        {/* Header */}
        <div style={{
          opacity: titleSpring,
          transform: `translateY(${slideIn(titleSpring, "up", 20)}px)`,
          textAlign: "center", marginBottom: 32,
        }}>
          <div style={{
            fontSize: TYPE.label, fontWeight: 600,
            color: theme.accent, textTransform: "uppercase" as const,
            letterSpacing: 2, marginBottom: 8,
          }}>
            The Process
          </div>
          <div style={{ fontSize: TYPE.title, fontWeight: theme.headingWeight, lineHeight: 1.3 }}>
            {spec.title}
          </div>
        </div>

        {/* Process Steps */}
        <div style={{
          flex: 1, display: "flex", alignItems: "center",
          justifyContent: "center", gap: 8, width: "100%",
        }}>
          {scenes.map((scene, i) => {
            const delay = staggerDelay(i, TIMING.cardsStart, 25);
            const s = springEntrance(frame, fps, delay, SPRING.default);
            return (
              <React.Fragment key={i}>
                <GlassCard theme={theme} style={{
                  opacity: s,
                  transform: `translateY(${slideIn(s, "up", 20)}px)`,
                  padding: "16px 14px",
                  flex: 1, textAlign: "center",
                }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: 16,
                    background: theme.accentGradient,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: TYPE.cardTitle, fontWeight: 700, color: "#ffffff",
                    margin: "0 auto 10px",
                  }}>
                    {i + 1}
                  </div>
                  <div style={{ fontSize: TYPE.cardTitle, fontWeight: 700, marginBottom: 4 }}>
                    {scene.title}
                  </div>
                  <div style={{
                    fontSize: TYPE.caption, color: theme.textSecondary, lineHeight: 1.4,
                  }}>
                    {scene.description}
                  </div>
                </GlassCard>
                {/* Arrow connector */}
                {i < scenes.length - 1 && (
                  <svg width="24" height="24" viewBox="0 0 24 24" style={{
                    opacity: springEntrance(frame, fps, staggerDelay(i, TIMING.cardsStart + 10, 25), SPRING.default),
                    flexShrink: 0,
                  }}>
                    <path d="M5 12h14M14 7l5 5-5 5" stroke={theme.accent} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Closing */}
        {spec.closing_message && (
          <div style={{
            opacity: closingOpacity,
            display: "flex", justifyContent: "center", marginTop: 16,
          }}>
            <GradientBadge text={spec.closing_message} theme={theme} fontSize={TYPE.cardTitle} />
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};

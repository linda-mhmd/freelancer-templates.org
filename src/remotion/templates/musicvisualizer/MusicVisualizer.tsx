/**
 * Music Visualizer Template — Creator Economy Templates (V6)
 *
 * A reusable, theme-aware music visualizer video template.
 * Renders waveform bars, radial pulsing, and animated lyrics.
 *
 * LAYOUT VARIANTS (via `layout` prop):
 *   "bars"    — WaveformBars with track info overlay (default)
 *   "radial"  — Circular pulsing visualization with album art placeholder
 *   "lyrics"  — Animated lyric lines with timed fade-in/fade-out
 */

import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
} from "remotion";
import {
  springEntrance,
  fadeIn,
  fadeOut,
  SPRING,
} from "../_shared/animations";
import type { Theme, BrandKit, PlatformHints, CollabMetadata } from "../_shared/themes";
import type { VideoFormat } from "../_shared/formats";
import { THEMES, THEME_DARK, applyBrandKit } from "../_shared/themes";
import { PADDING, TOP_SAFE, TYPE } from "../_shared/layouts";
import {
  BackgroundGrid,
  WaveformBars,
  CaptionItem,
} from "../_shared/components";

// ── Data Contract ───────────────────────────────────────────────
export interface MusicVisualizerSpec {
  track_title: string;
  artist: string;
  album?: string;
  lyrics?: Array<{ text: string; startFrame: number }>;
  release_date?: string;
  theme?: string;
  brandKit?: BrandKit;
  layout?: "bars" | "radial" | "lyrics";
  format?: VideoFormat;
  captions?: CaptionItem[];
  captionLanguage?: string;
  platformHints?: PlatformHints;
  metadata?: CollabMetadata;
}

export interface MusicVisualizerProps {
  spec: MusicVisualizerSpec;
  theme?: Theme;
  layout?: "bars" | "radial" | "lyrics";
}

// ── Scene Timing ────────────────────────────────────────────────
const TIMING = {
  titleStart: 5,
  artistStart: 20,
  waveformStart: 10,
  albumStart: 35,
  lyricsStart: 40,
};

// ── QuickStart Defaults ─────────────────────────────────────────
const QUICKSTART_DEFAULTS: Omit<MusicVisualizerSpec, "track_title" | "theme" | "brandKit" | "layout"> = {
  artist: "Unknown Artist",
  album: "Single Release",
  lyrics: [
    { text: "Feel the rhythm in the night", startFrame: 40 },
    { text: "Every beat a spark of light", startFrame: 80 },
    { text: "Moving through the sound", startFrame: 120 },
    { text: "Lost and finally found", startFrame: 160 },
  ],
  release_date: "2026",
};

// ── Main Component ──────────────────────────────────────────────
export const MusicVisualizer: React.FC<MusicVisualizerProps> = ({
  spec: rawSpec,
  theme,
  layout,
}) => {
  const spec = { ...QUICKSTART_DEFAULTS, ...rawSpec };
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const resolvedTheme = applyBrandKit(theme ?? THEMES[spec.theme ?? "dark"] ?? THEME_DARK, spec.brandKit);
  const resolvedLayout = layout ?? spec.layout ?? "bars";

  const bgStyle = resolvedTheme.bg.startsWith("linear-gradient")
    ? { background: resolvedTheme.bg }
    : { backgroundColor: resolvedTheme.bg };

  if (resolvedLayout === "radial") {
    return <RadialLayout spec={spec} theme={resolvedTheme} frame={frame} fps={fps} bgStyle={bgStyle} />;
  }
  if (resolvedLayout === "lyrics") {
    return <LyricsLayout spec={spec} theme={resolvedTheme} frame={frame} fps={fps} bgStyle={bgStyle} />;
  }
  return <BarsLayout spec={spec} theme={resolvedTheme} frame={frame} fps={fps} bgStyle={bgStyle} />;
};

// ── Layout: Bars ────────────────────────────────────────────────
const BarsLayout: React.FC<{
  spec: MusicVisualizerSpec; theme: Theme; frame: number; fps: number; bgStyle: React.CSSProperties;
}> = ({ spec, theme, frame, fps, bgStyle }) => {
  const titleSpring = springEntrance(frame, fps, TIMING.titleStart, SPRING.default);
  const artistOpacity = fadeIn(frame, TIMING.artistStart);

  return (
    <AbsoluteFill style={{ ...bgStyle, fontFamily: theme.fontFamily, color: theme.textPrimary }}>
      <BackgroundGrid pattern="dots" />
      <div style={{
        position: "absolute", inset: 0,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "flex-end",
        padding: `${TOP_SAFE}px ${PADDING}px`,
      }}>
        {/* Waveform in center */}
        <div style={{
          flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
          width: "100%",
        }}>
          <WaveformBars barCount={24} frame={frame} startFrame={TIMING.waveformStart} fps={fps} theme={theme} height={200} />
        </div>

        {/* Track info overlay at bottom */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{
            opacity: titleSpring, transform: `translateY(${(1 - titleSpring) * 15}px)`,
            fontSize: TYPE.title, fontWeight: theme.headingWeight, marginBottom: 6,
          }}>
            {spec.track_title}
          </div>
          <div style={{ opacity: artistOpacity, fontSize: TYPE.subtitle, color: theme.textSecondary }}>
            {spec.artist}{spec.album ? ` · ${spec.album}` : ""}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ── Layout: Radial ──────────────────────────────────────────────
const RadialLayout: React.FC<{
  spec: MusicVisualizerSpec; theme: Theme; frame: number; fps: number; bgStyle: React.CSSProperties;
}> = ({ spec, theme, frame, fps, bgStyle }) => {
  const titleSpring = springEntrance(frame, fps, TIMING.titleStart, SPRING.default);
  const artistOpacity = fadeIn(frame, TIMING.artistStart);

  // Pulsing circle
  const pulseScale = 1 + 0.08 * Math.sin(frame * 0.15);
  const glowOpacity = interpolate(
    Math.sin(frame * 0.1), [-1, 1], [0.3, 0.8],
    { extrapolateRight: "clamp", extrapolateLeft: "clamp" },
  );

  return (
    <AbsoluteFill style={{ ...bgStyle, fontFamily: theme.fontFamily, color: theme.textPrimary }}>
      <div style={{
        position: "absolute", inset: 0,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        padding: `${TOP_SAFE}px ${PADDING}px`,
      }}>
        {/* Radial pulse */}
        <div style={{
          width: 220, height: 220, borderRadius: "50%",
          background: theme.accentGradient,
          opacity: glowOpacity,
          transform: `scale(${pulseScale})`,
          display: "flex", alignItems: "center", justifyContent: "center",
          marginBottom: 32,
          boxShadow: `0 0 60px ${theme.accent}40`,
        }}>
          <div style={{
            width: 180, height: 180, borderRadius: "50%",
            backgroundColor: theme.bg.startsWith("linear") ? "#0a0a0f" : theme.bg,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: TYPE.stat, fontWeight: theme.headingWeight,
          }}>
            ~
          </div>
        </div>

        <div style={{
          opacity: titleSpring, transform: `translateY(${(1 - titleSpring) * 15}px)`,
          fontSize: TYPE.hero, fontWeight: theme.headingWeight, marginBottom: 8, textAlign: "center",
        }}>
          {spec.track_title}
        </div>
        <div style={{ opacity: artistOpacity, fontSize: TYPE.subtitle, color: theme.textSecondary }}>
          {spec.artist}
        </div>
        {spec.release_date && (
          <div style={{ opacity: fadeIn(frame, TIMING.albumStart), fontSize: TYPE.caption, color: theme.textMuted, marginTop: 8 }}>
            {spec.release_date}
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};

// ── Layout: Lyrics ──────────────────────────────────────────────
const LyricsLayout: React.FC<{
  spec: MusicVisualizerSpec; theme: Theme; frame: number; fps: number; bgStyle: React.CSSProperties;
}> = ({ spec, theme, frame, fps, bgStyle }) => {
  const titleSpring = springEntrance(frame, fps, TIMING.titleStart, SPRING.default);
  const lyrics = spec.lyrics ?? [];
  const LYRIC_DURATION = 35; // frames each lyric is visible

  return (
    <AbsoluteFill style={{ ...bgStyle, fontFamily: theme.fontFamily, color: theme.textPrimary }}>
      <BackgroundGrid pattern="dots" />
      <div style={{
        position: "absolute", inset: 0,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        padding: `${TOP_SAFE}px ${PADDING}px`, textAlign: "center",
      }}>
        {/* Track info at top */}
        <div style={{
          position: "absolute", top: TOP_SAFE, left: PADDING, right: PADDING,
          opacity: titleSpring, textAlign: "center",
        }}>
          <div style={{ fontSize: TYPE.cardTitle, color: theme.textMuted }}>
            {spec.artist} — {spec.track_title}
          </div>
        </div>

        {/* Lyrics */}
        <div style={{ position: "relative", minHeight: 120 }}>
          {lyrics.map((lyric, i) => {
            const endFrame = lyric.startFrame + LYRIC_DURATION;
            const lyricOpacity = frame >= lyric.startFrame && frame <= endFrame
              ? (frame < lyric.startFrame + 8
                ? fadeIn(frame, lyric.startFrame, 8)
                : frame > endFrame - 8
                ? fadeOut(frame, endFrame - 8, 8)
                : 1)
              : 0;

            return (
              <div key={i} style={{
                position: "absolute", left: 0, right: 0,
                opacity: lyricOpacity,
                transform: `translateY(${(1 - lyricOpacity) * 10}px)`,
                fontSize: TYPE.title, fontWeight: theme.headingWeight,
                color: theme.textPrimary,
              }}>
                {lyric.text}
              </div>
            );
          })}
        </div>

        {/* Small waveform at bottom */}
        <div style={{ position: "absolute", bottom: TOP_SAFE, left: PADDING, right: PADDING }}>
          <WaveformBars barCount={16} frame={frame} startFrame={TIMING.waveformStart} fps={fps} theme={theme} height={40} />
        </div>
      </div>
    </AbsoluteFill>
  );
};

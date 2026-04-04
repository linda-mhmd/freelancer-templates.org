/**
 * Podcast Audiogram Template — Creator Economy Templates (V5)
 *
 * A reusable, theme-aware podcast audiogram video template.
 * Renders waveform visualizations, quote cards, and episode promos.
 *
 * LAYOUT VARIANTS (via `layout` prop):
 *   "waveform"       — WaveformBars component with quote overlay text (default)
 *   "quote-card"     — Large QuoteMarks + quote text + guest attribution + episode info
 *   "episode-promo"  — Episode details with guest bio card and GradientBadge listen CTA
 *
 * DATA CONTRACT (PodcastAudiogramSpec):
 *   {
 *     episode_title: "The Future of AI Agents",
 *     guest_name: "Dr. Sarah Chen",
 *     quote: "Agents will replace 80% of manual workflows by 2027",
 *     episode_number: 42,
 *     podcast_name: "Build Things Podcast",
 *     theme: "dark",
 *     layout: "waveform"
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
  QuoteMarks,
  WaveformBars,
  CaptionItem,
} from "../_shared/components";

// ── Data Contract ───────────────────────────────────────────────
export interface PodcastAudiogramSpec {
  episode_title: string;
  guest_name: string;
  quote: string;
  episode_number: number;
  podcast_name: string;
  theme?: string;
  brandKit?: BrandKit;
  layout?: "waveform" | "quote-card" | "episode-promo";
  format?: VideoFormat;
  captions?: CaptionItem[];
  captionLanguage?: string;
  platformHints?: PlatformHints;
  metadata?: CollabMetadata;
}

export interface PodcastAudiogramProps {
  spec: PodcastAudiogramSpec;
  theme?: Theme;
  layout?: "waveform" | "quote-card" | "episode-promo";
}

// ── Scene Timing ────────────────────────────────────────────────
const TIMING = {
  bgStart: 0,
  titleStart: 5,
  waveformStart: 15,
  quoteStart: 30,
  guestStart: 50,
  episodeStart: 70,
  ctaStart: 180,
};

// ── QuickStart Defaults ─────────────────────────────────────────
/** Sensible defaults for QuickStart specs (title + theme only). */
const QUICKSTART_DEFAULTS: Omit<PodcastAudiogramSpec, "episode_title" | "theme" | "brandKit" | "layout"> = {
  guest_name: "Special Guest",
  quote: "This conversation changed the way I think about everything",
  episode_number: 1,
  podcast_name: "The Podcast",
};

// ── Main Component ──────────────────────────────────────────────
export const PodcastAudiogram: React.FC<PodcastAudiogramProps> = ({
  spec: rawSpec,
  theme,
  layout,
}) => {
  const spec = { ...QUICKSTART_DEFAULTS, ...rawSpec };
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const resolvedTheme = applyBrandKit(theme ?? THEMES[spec.theme ?? "dark"] ?? THEME_DARK, spec.brandKit);
  const resolvedLayout = layout ?? spec.layout ?? "waveform";

  const bgStyle = resolvedTheme.bg.startsWith("linear-gradient")
    ? { background: resolvedTheme.bg }
    : { backgroundColor: resolvedTheme.bg };

  if (resolvedLayout === "quote-card") {
    return <QuoteCardLayout spec={spec} theme={resolvedTheme} frame={frame} fps={fps} bgStyle={bgStyle} />;
  }
  if (resolvedLayout === "episode-promo") {
    return <EpisodePromoLayout spec={spec} theme={resolvedTheme} frame={frame} fps={fps} bgStyle={bgStyle} />;
  }
  return <WaveformLayout spec={spec} theme={resolvedTheme} frame={frame} fps={fps} bgStyle={bgStyle} />;
};

// ── Layout: Waveform ────────────────────────────────────────────
// WaveformBars component with quote overlay text.
const WaveformLayout: React.FC<{
  spec: PodcastAudiogramSpec;
  theme: Theme;
  frame: number;
  fps: number;
  bgStyle: React.CSSProperties;
}> = ({ spec, theme, frame, fps, bgStyle }) => {
  const titleSpring = springEntrance(frame, fps, TIMING.titleStart, SPRING.default);
  const quoteOpacity = fadeIn(frame, TIMING.quoteStart);
  const guestSpring = springEntrance(frame, fps, TIMING.guestStart, SPRING.default);

  return (
    <AbsoluteFill style={{ ...bgStyle, fontFamily: theme.fontFamily, color: theme.textPrimary }}>
      <BackgroundGrid pattern="dots" />

      <div style={{
        position: "absolute", inset: 0,
        display: "flex", flexDirection: "column",
        padding: `${TOP_SAFE}px ${PADDING}px`,
        justifyContent: "space-between",
      }}>
        {/* Header: Podcast Name + Episode */}
        <div style={{
          opacity: titleSpring,
          transform: `translateY(${slideIn(titleSpring, "up", 20)}px)`,
          display: "flex", alignItems: "center", gap: 12,
        }}>
          <div style={{
            width: 40, height: 40, borderRadius: 10,
            background: theme.accentGradient,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 24,
          }}>
            <svg viewBox="0 0 24 24" width={24} height={24} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" /><line x1="12" y1="19" x2="12" y2="23" /><line x1="8" y1="23" x2="16" y2="23" /></svg>
          </div>
          <div>
            <div style={{ fontSize: TYPE.cardTitle, fontWeight: 700 }}>
              {spec.podcast_name}
            </div>
            <div style={{ fontSize: TYPE.label, color: theme.textMuted }}>
              Episode {spec.episode_number}
            </div>
          </div>
        </div>

        {/* Center: Waveform + Quote */}
        <div style={{
          flex: 1, display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", gap: 24,
        }}>
          {/* Waveform */}
          <div style={{ width: "80%", maxWidth: 600 }}>
            <WaveformBars
              barCount={24}
              frame={frame}
              startFrame={TIMING.waveformStart}
              fps={fps}
              theme={theme}
              height={100}
            />
          </div>

          {/* Quote Overlay */}
          <div style={{
            opacity: quoteOpacity,
            textAlign: "center",
            maxWidth: 700,
            padding: "0 20px",
          }}>
            <div style={{
              fontSize: TYPE.subtitle,
              fontStyle: "italic",
              color: theme.textSecondary,
              lineHeight: 1.6,
            }}>
              &ldquo;{spec.quote}&rdquo;
            </div>
          </div>
        </div>

        {/* Footer: Guest + Episode Title */}
        <div style={{
          opacity: guestSpring,
          transform: `translateY(${slideIn(guestSpring, "down", 16)}px)`,
          display: "flex", justifyContent: "space-between", alignItems: "flex-end",
        }}>
          <div>
            <div style={{ fontSize: TYPE.cardTitle, fontWeight: 700, color: theme.accent }}>
              {spec.guest_name}
            </div>
            <div style={{ fontSize: TYPE.body, color: theme.textSecondary, marginTop: 2 }}>
              {spec.episode_title}
            </div>
          </div>
          <div style={{
            fontSize: TYPE.label,
            color: theme.textMuted,
            textAlign: "right",
          }}>
            ▶ Now Playing
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};


// ── Layout: Quote Card ──────────────────────────────────────────
// Large QuoteMarks + quote text + guest attribution + episode info.
const QuoteCardLayout: React.FC<{
  spec: PodcastAudiogramSpec;
  theme: Theme;
  frame: number;
  fps: number;
  bgStyle: React.CSSProperties;
}> = ({ spec, theme, frame, fps, bgStyle }) => {
  const titleSpring = springEntrance(frame, fps, TIMING.titleStart, SPRING.default);
  const quoteSpring = springEntrance(frame, fps, TIMING.quoteStart, SPRING.default);
  const guestSpring = springEntrance(frame, fps, TIMING.guestStart, SPRING.default);
  const episodeSpring = springEntrance(frame, fps, TIMING.episodeStart, SPRING.default);

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
        {/* Podcast Badge */}
        <div style={{
          opacity: titleSpring,
          transform: `scale(${titleSpring})`,
          marginBottom: 24,
        }}>
          <GlassCard theme={theme} style={{
            padding: "8px 20px",
            display: "flex", alignItems: "center", gap: 8,
          }}>
            <span style={{ fontSize: 24 }}><svg viewBox="0 0 24 24" width={24} height={24} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" /><line x1="12" y1="19" x2="12" y2="23" /><line x1="8" y1="23" x2="16" y2="23" /></svg></span>
            <span style={{ fontSize: TYPE.label, fontWeight: 600, color: theme.accent }}>
              {spec.podcast_name} · Ep. {spec.episode_number}
            </span>
          </GlassCard>
        </div>

        {/* Quote Marks */}
        <div style={{
          opacity: quoteSpring,
          transform: `scale(${quoteSpring})`,
          marginBottom: 16,
        }}>
          <QuoteMarks theme={theme} frame={frame} fps={fps} startFrame={TIMING.quoteStart} />
        </div>

        {/* Quote Text */}
        <div style={{
          opacity: quoteSpring,
          transform: `translateY(${slideIn(quoteSpring, "up", 16)}px)`,
          textAlign: "center",
          maxWidth: 800,
          marginBottom: 32,
        }}>
          <div style={{
            fontSize: TYPE.title,
            fontWeight: theme.headingWeight,
            lineHeight: 1.4,
            fontStyle: "italic",
          }}>
            &ldquo;{spec.quote}&rdquo;
          </div>
        </div>

        {/* Guest Attribution */}
        <div style={{
          opacity: guestSpring,
          transform: `translateY(${slideIn(guestSpring, "up", 12)}px)`,
          textAlign: "center",
          marginBottom: 16,
        }}>
          <div style={{
            fontSize: TYPE.subtitle,
            fontWeight: 700,
            color: theme.accent,
          }}>
            — {spec.guest_name}
          </div>
        </div>

        {/* Episode Title */}
        <div style={{
          opacity: episodeSpring,
          transform: `translateY(${slideIn(episodeSpring, "up", 10)}px)`,
          textAlign: "center",
        }}>
          <div style={{
            fontSize: TYPE.body,
            color: theme.textMuted,
          }}>
            {spec.episode_title}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};


// ── Layout: Episode Promo ───────────────────────────────────────
// Episode details with guest bio card and GradientBadge listen CTA.
const EpisodePromoLayout: React.FC<{
  spec: PodcastAudiogramSpec;
  theme: Theme;
  frame: number;
  fps: number;
  bgStyle: React.CSSProperties;
}> = ({ spec, theme, frame, fps, bgStyle }) => {
  const titleSpring = springEntrance(frame, fps, TIMING.titleStart, SPRING.default);
  const guestSpring = springEntrance(frame, fps, TIMING.guestStart, SPRING.default);
  const quoteSpring = springEntrance(frame, fps, TIMING.quoteStart, SPRING.default);
  const ctaOpacity = fadeIn(frame, TIMING.ctaStart);

  return (
    <AbsoluteFill style={{ ...bgStyle, fontFamily: theme.fontFamily, color: theme.textPrimary }}>
      <BackgroundGrid pattern="hex" />

      <div style={{
        position: "absolute", inset: 0,
        display: "flex", flexDirection: "column",
        padding: `${TOP_SAFE}px ${PADDING}px`,
      }}>
        {/* Header: Podcast Name */}
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
            {spec.podcast_name} · Episode {spec.episode_number}
          </div>
          <div style={{
            fontSize: TYPE.hero,
            fontWeight: theme.headingWeight,
            lineHeight: 1.2,
          }}>
            {spec.episode_title}
          </div>
        </div>

        {/* Content Area */}
        <div style={{
          flex: 1,
          display: "flex", flexDirection: "column",
          justifyContent: "center",
          gap: 20,
        }}>
          {/* Guest Card */}
          <GlassCard theme={theme} style={{
            opacity: guestSpring,
            transform: `translateX(${slideIn(guestSpring, "left", 30)}px)`,
            padding: "20px 28px",
            display: "flex", alignItems: "center", gap: 20,
          }}>
            <div style={{
              width: 56, height: 56, borderRadius: 28,
              background: theme.accentGradient,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 24, flexShrink: 0,
            }}>
              <svg viewBox="0 0 24 24" width={36} height={36} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" /><line x1="12" y1="19" x2="12" y2="23" /><line x1="8" y1="23" x2="16" y2="23" /></svg>
            </div>
            <div>
              <div style={{
                fontSize: TYPE.subtitle,
                fontWeight: 700,
                marginBottom: 4,
              }}>
                {spec.guest_name}
              </div>
              <div style={{
                fontSize: TYPE.body,
                color: theme.textSecondary,
              }}>
                Featured Guest
              </div>
            </div>
          </GlassCard>

          {/* Quote Preview */}
          <GlassCard theme={theme} style={{
            opacity: quoteSpring,
            transform: `translateX(${slideIn(quoteSpring, "right", 30)}px)`,
            padding: "20px 28px",
          }}>
            <div style={{
              fontSize: TYPE.body,
              fontStyle: "italic",
              color: theme.textSecondary,
              lineHeight: 1.6,
              marginBottom: 8,
            }}>
              &ldquo;{spec.quote}&rdquo;
            </div>
            <div style={{
              fontSize: TYPE.label,
              fontWeight: 600,
              color: theme.accent,
            }}>
              — {spec.guest_name}
            </div>
          </GlassCard>
        </div>

        {/* CTA */}
        <div style={{
          opacity: ctaOpacity,
          display: "flex", justifyContent: "center",
          marginTop: 12,
        }}>
          <GradientBadge text="▶ Listen Now" theme={theme} fontSize={TYPE.cardTitle} />
        </div>
      </div>
    </AbsoluteFill>
  );
};

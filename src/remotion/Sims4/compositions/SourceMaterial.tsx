// src/remotion/Sims4/compositions/SourceMaterial.tsx
// Source material / references slide with loading-screen gradient background

import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { Plumbob } from '../components/SimsUI';
import {
  SIMS_COLORS,
  SIMS_FONTS,
  SIMS_SIZES,
  SIMS_SPRING,
  SIMS_TIMING,
} from '../data/simsTheme';

// ── Types ────────────────────────────────────────────────────────────────────

export interface SourceReference {
  text: string;
}

export interface SourceMaterialProps {
  title?: string;
  sources?: SourceReference[];
  footerText?: string;
}

// ── Defaults ─────────────────────────────────────────────────────────────────

const DEFAULT_SOURCES: SourceReference[] = [
  { text: 'Google — Agents white paper (2025)' },
  { text: 'AWS — Bedrock Agents documentation' },
  { text: 'CrewAI — Multi-agent framework docs' },
  { text: 'LangChain — Agent toolkits reference' },
  { text: 'Anthropic — Claude tool use guide' },
];

// ── Component ────────────────────────────────────────────────────────────────

export const SourceMaterial: React.FC<SourceMaterialProps> = ({
  title = 'Source Material',
  sources = DEFAULT_SOURCES,
  footerText = 'All sources accessed January 2026',
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ── Plumbob gentle spring entrance (frames 0–20) ──
  const plumbobSpring = spring({
    frame,
    fps,
    config: SIMS_SPRING.gentle,
  });
  const plumbobOpacity = interpolate(plumbobSpring, [0, 1], [0, 1], {
    extrapolateRight: 'clamp',
  });
  const plumbobSlideY = interpolate(
    plumbobSpring,
    [0, 1],
    [SIMS_TIMING.entranceOffset, 0],
    { extrapolateRight: 'clamp' },
  );

  // ── Title spring entrance (frames 10–35) ──
  const titleSpring = spring({
    frame: frame - 10,
    fps,
    config: SIMS_SPRING.entrance,
  });
  const titleOpacity = interpolate(titleSpring, [0, 1], [0, 1], {
    extrapolateRight: 'clamp',
  });
  const titleSlideY = interpolate(
    titleSpring,
    [0, 1],
    [SIMS_TIMING.entranceOffset, 0],
    { extrapolateRight: 'clamp' },
  );

  // ── Footer fade-in (frame 200+) ──
  const footerOpacity = interpolate(
    frame,
    [200, 200 + SIMS_TIMING.fadeInFrames],
    [0, 1],
    { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' },
  );

  return (
    <AbsoluteFill>
      {/* Background — bgLoadingScreen gradient */}
      <AbsoluteFill style={{ background: SIMS_COLORS.bgLoadingScreen }} />

      {/* Centered content column */}
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px 80px',
        }}
      >
        {/* Plumbob */}
        <div
          style={{
            opacity: plumbobOpacity,
            transform: `translateY(${plumbobSlideY}px)`,
            marginBottom: 20,
          }}
        >
          <Plumbob size={70} animate />
        </div>

        {/* Title */}
        <div
          style={{
            fontFamily: SIMS_FONTS.display,
            fontWeight: 900,
            fontSize: 44,
            color: SIMS_COLORS.textLight,
            textAlign: 'center',
            lineHeight: 1.15,
            textShadow: '0 4px 30px rgba(0,0,0,0.5)',
            letterSpacing: '-0.5px',
            opacity: titleOpacity,
            transform: `translateY(${titleSlideY}px)`,
            marginBottom: 32,
          }}
        >
          {title}
        </div>

        {/* Source references list */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
            maxWidth: 800,
            width: '100%',
          }}
        >
          {sources.map((source, i) => {
            const sourceDelay = 30 + i * SIMS_TIMING.minStagger;
            const sourceSpring = spring({
              frame: frame - sourceDelay,
              fps,
              config: SIMS_SPRING.entrance,
            });
            const sourceOpacity = interpolate(
              sourceSpring,
              [0, 1],
              [0, 1],
              { extrapolateRight: 'clamp' },
            );
            const sourceSlideY = interpolate(
              sourceSpring,
              [0, 1],
              [SIMS_TIMING.entranceOffset, 0],
              { extrapolateRight: 'clamp' },
            );

            return (
              <div
                key={i}
                style={{
                  opacity: sourceOpacity,
                  transform: `translateY(${sourceSlideY}px)`,
                  background: SIMS_COLORS.panelGlass,
                  borderRadius: SIMS_SIZES.borderRadius.md,
                  padding: '14px 24px',
                  fontFamily: SIMS_FONTS.body,
                  fontSize: 16,
                  color: SIMS_COLORS.textLight,
                  lineHeight: 1.5,
                }}
              >
                {source.text}
              </div>
            );
          })}
        </div>
      </AbsoluteFill>

      {/* Footer */}
      {footerText && (
        <div
          style={{
            position: 'absolute',
            bottom: 32,
            left: 0,
            right: 0,
            textAlign: 'center',
            fontFamily: SIMS_FONTS.body,
            fontSize: 14,
            color: SIMS_COLORS.textMuted,
            opacity: footerOpacity,
          }}
        >
          {footerText}
        </div>
      )}
    </AbsoluteFill>
  );
};

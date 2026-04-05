// src/remotion/Sims4/compositions/LoadingScreenDivider.tsx
// Sims-style loading screen composition for section transitions
// Supports optional background image with dark overlay, fallback to bgLoadingScreen gradient

import React from 'react';
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {
  SIMS_COLORS,
  SIMS_FONTS,
  SIMS_SPRING,
  SIMS_TIMING,
} from '../data/simsTheme';
import { Plumbob } from '../components/SimsUI';

// ── Types ────────────────────────────────────────────────────────────────────

export interface LoadingScreenDividerProps {
  sectionTitle?: string;
  subtitle?: string;
  loadingTip?: string;
  backgroundImage?: string;
}

// ── Component ────────────────────────────────────────────────────────────────

export const LoadingScreenDivider: React.FC<LoadingScreenDividerProps> = ({
  sectionTitle = 'Lesson 1: Brain vs Body',
  subtitle = 'Understanding the difference between a model and an agent',
  loadingTip = 'Tip: A model is the brain. An agent is the whole body.',
  backgroundImage,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ── Plumbob gentle spring entrance (frames 5–25) ──
  const plumbobSpring = spring({
    frame: frame - 5,
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

  // ── Title spring entrance (frames 15–40) ──
  const titleSpring = spring({
    frame: frame - 15,
    fps,
    config: SIMS_SPRING.entrance,
  });
  const titleSlideY = interpolate(
    titleSpring,
    [0, 1],
    [SIMS_TIMING.entranceOffset, 0],
    { extrapolateRight: 'clamp' },
  );

  // ── Subtitle fade-in (frames 35–60) ──
  const subtitleOpacity = interpolate(
    frame,
    [35, 35 + SIMS_TIMING.fadeInFrames],
    [0, 1],
    { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' },
  );

  // ── Tip bar fade-in (frames 40–65) ──
  const tipOpacity = interpolate(
    frame,
    [40, 40 + SIMS_TIMING.fadeInFrames],
    [0, 1],
    { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' },
  );

  return (
    <AbsoluteFill>
      {/* Background layer */}
      {backgroundImage ? (
        <>
          <AbsoluteFill>
            <Img
              src={staticFile(backgroundImage)}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </AbsoluteFill>
          {/* Dark overlay for image background */}
          <AbsoluteFill
            style={{ backgroundColor: 'rgba(10, 15, 46, 0.7)' }}
          />
        </>
      ) : (
        <AbsoluteFill
          style={{ background: SIMS_COLORS.bgLoadingScreen }}
        />
      )}

      {/* Centered content column */}
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
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

        {/* Section title */}
        <div
          style={{
            fontFamily: SIMS_FONTS.display,
            fontWeight: 900,
            fontSize: 48,
            color: SIMS_COLORS.textLight,
            textAlign: 'center',
            lineHeight: 1.15,
            textShadow: '0 4px 30px rgba(0,0,0,0.5)',
            letterSpacing: '-0.5px',
            opacity: titleSpring,
            transform: `translateY(${titleSlideY}px)`,
            maxWidth: 900,
            padding: '0 80px',
          }}
        >
          {sectionTitle}
        </div>

        {/* Subtitle */}
        {subtitle && (
          <div
            style={{
              fontFamily: SIMS_FONTS.body,
              fontSize: 20,
              color: SIMS_COLORS.textAccent,
              fontWeight: 600,
              textAlign: 'center',
              marginTop: 12,
              opacity: subtitleOpacity,
              textShadow: '0 2px 12px rgba(0,0,0,0.4)',
              maxWidth: 700,
              padding: '0 80px',
            }}
          >
            {subtitle}
          </div>
        )}
      </AbsoluteFill>

      {/* Bottom tip bar */}
      {loadingTip && (
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 36,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0, 0, 0, 0.35)',
            opacity: tipOpacity,
          }}
        >
          <span
            style={{
              fontFamily: SIMS_FONTS.body,
              fontSize: 13,
              color: SIMS_COLORS.textMuted,
              letterSpacing: '0.3px',
            }}
          >
            {loadingTip}
          </span>
        </div>
      )}
    </AbsoluteFill>
  );
};

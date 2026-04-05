// src/remotion/Sims4/elements/TitleBlock.tsx
// Element: Animated title block with optional subtitle and badge pill
// Uses spring entrance for title, staggered fade-in for subtitle, badge below

import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';
import { SIMS_SPRING, SIMS_TIMING, SIMS_COLORS, SIMS_FONTS } from '../data/simsTheme';
import type { BaseElementProps } from './types';

export interface TitleBlockProps extends BaseElementProps {
  title: string;
  subtitle?: string;
  badge?: string;
  titleSize?: number;
  subtitleSize?: number;
  color?: string;
}

export const TitleBlock: React.FC<TitleBlockProps> = ({
  title,
  subtitle,
  badge,
  delay = 0,
  titleSize = 52,
  subtitleSize = 20,
  color = SIMS_COLORS.textLight,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title spring entrance
  const titleSpring = spring({
    frame: frame - delay,
    fps,
    config: SIMS_SPRING.entrance,
  });

  const titleOpacity = interpolate(titleSpring, [0, 1], [0, 1], {
    extrapolateRight: 'clamp',
  });
  const titleTranslateY = interpolate(titleSpring, [0, 1], [SIMS_TIMING.entranceOffset, 0], {
    extrapolateRight: 'clamp',
  });

  // Subtitle fades in minStagger frames after title
  const subtitleDelay = delay + SIMS_TIMING.minStagger;
  const subtitleOpacity = interpolate(
    frame,
    [subtitleDelay, subtitleDelay + SIMS_TIMING.fadeInFrames],
    [0, 1],
    { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' },
  );
  const subtitleTranslateY = interpolate(
    frame,
    [subtitleDelay, subtitleDelay + SIMS_TIMING.fadeInFrames],
    [SIMS_TIMING.entranceOffset, 0],
    { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' },
  );

  // Badge appears after subtitle
  const badgeDelay = subtitleDelay + SIMS_TIMING.minStagger;
  const badgeOpacity = interpolate(
    frame,
    [badgeDelay, badgeDelay + SIMS_TIMING.fadeInFrames],
    [0, 1],
    { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' },
  );

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      {/* Title */}
      <div
        style={{
          fontFamily: SIMS_FONTS.display,
          fontWeight: 900,
          fontSize: titleSize,
          color,
          lineHeight: 1.1,
          opacity: titleOpacity,
          transform: `translateY(${titleTranslateY}px)`,
          textShadow: '0 4px 30px rgba(0,0,0,0.6)',
          letterSpacing: '-0.5px',
        }}
      >
        {title}
      </div>

      {/* Subtitle */}
      {subtitle && (
        <div
          style={{
            fontFamily: SIMS_FONTS.body,
            fontSize: subtitleSize,
            color: SIMS_COLORS.textMuted,
            lineHeight: 1.5,
            marginTop: 12,
            opacity: subtitleOpacity,
            transform: `translateY(${subtitleTranslateY}px)`,
          }}
        >
          {subtitle}
        </div>
      )}

      {/* Badge pill */}
      {badge && (
        <div
          style={{
            marginTop: 16,
            padding: '6px 20px',
            borderRadius: 999,
            background: `linear-gradient(135deg, ${SIMS_COLORS.simsBlue}, ${SIMS_COLORS.simsBlueLight})`,
            fontFamily: SIMS_FONTS.body,
            fontSize: 13,
            fontWeight: 600,
            color: SIMS_COLORS.textLight,
            opacity: badgeOpacity,
            letterSpacing: 0.5,
          }}
        >
          {badge}
        </div>
      )}
    </div>
  );
};

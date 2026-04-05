// src/remotion/Sims4/elements/StatCounter.tsx
// Element: Animated count-up number with cubic ease-out, label, and optional suffix
// Uses the established CountUp pattern from the codebase adapted for the Sims4 design system

import React from 'react';
import { useCurrentFrame } from 'remotion';
import { SIMS_COLORS, SIMS_FONTS } from '../data/simsTheme';
import type { BaseElementProps } from './types';

export interface StatCounterProps extends BaseElementProps {
  target: number;
  label: string;
  suffix?: string;
  /** Duration of count-up in frames. Defaults to 60 */
  countDuration?: number;
}

/**
 * Cubic ease-out: fast start, slow finish.
 * easeOutCubic(t) = 1 - (1 - t)^3
 */
function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

export const StatCounter: React.FC<StatCounterProps> = ({
  target,
  label,
  suffix = '',
  delay = 0,
  countDuration = 60,
}) => {
  const frame = useCurrentFrame();

  // Clamp target to 0 for negative values
  const clampedTarget = Math.max(0, target);

  // Progress clamped between 0 and 1
  const progress = Math.min(1, Math.max(0, (frame - delay) / countDuration));
  const eased = easeOutCubic(progress);
  const displayedValue = Math.round(eased * clampedTarget);

  // Format large numbers as "Xk"
  const formatted =
    displayedValue >= 1000
      ? `${(displayedValue / 1000).toFixed(0)}k`
      : String(displayedValue);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          fontFamily: SIMS_FONTS.display,
          fontWeight: 900,
          fontSize: 42,
          color: SIMS_COLORS.textLight,
          lineHeight: 1.1,
        }}
      >
        {formatted}
        {suffix}
      </div>
      <div
        style={{
          fontFamily: SIMS_FONTS.body,
          fontSize: 13,
          color: SIMS_COLORS.textMuted,
          marginTop: 6,
          textTransform: 'uppercase',
          letterSpacing: '1px',
        }}
      >
        {label}
      </div>
    </div>
  );
};

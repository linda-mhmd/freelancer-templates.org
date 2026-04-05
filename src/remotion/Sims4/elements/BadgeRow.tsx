// src/remotion/Sims4/elements/BadgeRow.tsx
// Element: Horizontal row of TraitBadge components with staggered spring entrances

import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';
import { SIMS_SPRING, SIMS_TIMING } from '../data/simsTheme';
import { TraitBadge } from '../components/SimsUI';
import type { BaseElementProps } from './types';

export interface BadgeRowProps extends BaseElementProps {
  items: Array<{ icon: string; label: string }>;
  /** Frames between each badge entrance. Defaults to SIMS_TIMING.minStagger */
  staggerInterval?: number;
}

export const BadgeRow: React.FC<BadgeRowProps> = ({
  items,
  delay = 0,
  staggerInterval = SIMS_TIMING.minStagger,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
        alignItems: 'center',
      }}
    >
      {items.map((item, i) => {
        const badgeDelay = delay + i * staggerInterval;

        const s = spring({
          frame: frame - badgeDelay,
          fps,
          config: SIMS_SPRING.entrance,
        });

        const opacity = interpolate(s, [0, 1], [0, 1], {
          extrapolateRight: 'clamp',
        });

        const scale = interpolate(s, [0, 1], [0.7, 1], {
          extrapolateRight: 'clamp',
        });

        return (
          <div
            key={`${item.label}-${i}`}
            style={{
              opacity,
              transform: `scale(${scale})`,
            }}
          >
            <TraitBadge icon={item.icon} label={item.label} />
          </div>
        );
      })}
    </div>
  );
};

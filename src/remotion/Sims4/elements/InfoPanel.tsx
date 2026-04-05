// src/remotion/Sims4/elements/InfoPanel.tsx
// Element: Frosted-glass panel with spring entrance, header, body, and footer slots
// Wraps SimsPanel + PanelHeader with animated entrance

import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';
import { SIMS_SPRING, SIMS_TIMING } from '../data/simsTheme';
import { SimsPanel, PanelHeader } from '../components/SimsUI';
import type { BaseElementProps } from './types';

export interface InfoPanelProps extends BaseElementProps {
  header?: string;
  footer?: React.ReactNode;
  variant?: 'blue' | 'white' | 'dark' | 'glass';
  children?: React.ReactNode;
}

export const InfoPanel: React.FC<InfoPanelProps> = ({
  header,
  footer,
  variant = 'glass',
  children,
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Spring entrance animation starting at delay
  const entranceSpring = spring({
    frame: frame - delay,
    fps,
    config: SIMS_SPRING.entrance,
  });

  const opacity = interpolate(entranceSpring, [0, 1], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const translateY = interpolate(entranceSpring, [0, 1], [SIMS_TIMING.entranceOffset, 0], {
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${translateY}px)`,
      }}
    >
      <SimsPanel variant={variant}>
        {header && <PanelHeader title={header} />}
        {children && <div>{children}</div>}
        {footer && <div style={{ marginTop: 12 }}>{footer}</div>}
      </SimsPanel>
    </div>
  );
};

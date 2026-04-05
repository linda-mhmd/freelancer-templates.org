// src/remotion/Sims4/helpers/SimsComposition.tsx
// Wrapper that combines a Master Layout (base layer) with Element components (overlay layer)
// Frame context flows naturally via Remotion's useCurrentFrame() — no custom context needed

import React from 'react';
import { AbsoluteFill } from 'remotion';

export interface SimsCompositionProps {
  /** The Master Layout component to render as the base layer */
  layout: React.ReactElement;
  /** Element components layered on top of the layout */
  children?: React.ReactNode;
}

export const SimsComposition: React.FC<SimsCompositionProps> = ({
  layout,
  children,
}) => {
  return (
    <AbsoluteFill>
      {/* Base layer: Master Layout (handles its own background) */}
      <AbsoluteFill>{layout}</AbsoluteFill>

      {/* Overlay layer: Element components on top */}
      <AbsoluteFill style={{ pointerEvents: 'none' }}>
        {children}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

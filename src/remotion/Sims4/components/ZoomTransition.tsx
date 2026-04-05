// src/remotion/Sims4/components/ZoomTransition.tsx
// Zoom transition component that animates from a device-framed view to fullscreen content.
// Three phases: pre-zoom (children at original scale), transition (interpolated scale/position),
// and post-zoom (fullscreen content at 1280×720).

import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

export interface ZoomTransitionProps {
  /** Frame at which zoom begins */
  startFrame: number;
  /** Duration of the zoom transition in frames */
  durationFrames: number;
  /** The device-framed view (shown before/during zoom) */
  children: React.ReactNode;
  /** The fullscreen content (shown after zoom completes) */
  fullscreenContent: React.ReactNode;
}

export const ZoomTransition: React.FC<ZoomTransitionProps> = ({
  startFrame: rawStartFrame,
  durationFrames,
  children,
  fullscreenContent,
}) => {
  const frame = useCurrentFrame();
  const { width, height, fps } = useVideoConfig();

  // Edge case: startFrame < 0 treated as 0
  const startFrame = Math.max(0, rawStartFrame);

  // Edge case: durationFrames <= 0 means instant transition
  if (durationFrames <= 0) {
    if (frame >= startFrame) {
      return (
        <div style={{ width, height, position: 'relative' }}>
          {fullscreenContent}
        </div>
      );
    }
    return (
      <div style={{ width, height, position: 'relative' }}>
        {children}
      </div>
    );
  }

  const endFrame = startFrame + durationFrames;

  // Phase 3: After transition — render fullscreen content at viewport dimensions
  if (frame >= endFrame) {
    return (
      <div style={{ width, height, position: 'relative' }}>
        {fullscreenContent}
      </div>
    );
  }

  // Phase 1: Before transition — render children at original scale
  if (frame < startFrame) {
    return (
      <div style={{ width, height, position: 'relative' }}>
        {children}
      </div>
    );
  }

  // Phase 2: During transition — interpolate scale and opacity with spring easing
  const springProgress = spring({
    frame: frame - startFrame,
    fps,
    config: { damping: 16, stiffness: 100 },
    durationInFrames: durationFrames,
  });

  const progress = interpolate(springProgress, [0, 1], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  // Scale the device-framed view up toward filling the viewport.
  // A typical device (e.g. MacBook at 800px) sits inside 1280px width,
  // so scaling by ~1280/800 = 1.6 fills the width. We use a general
  // scale factor that works for any centered device content.
  const fullscreenScale = width / (width * 0.625); // ≈ 1.6
  const zoomScale = interpolate(progress, [0, 1], [1, fullscreenScale], {
    extrapolateRight: 'clamp',
  });

  // Crossfade: children fade out in the second half, fullscreen fades in
  const childrenOpacity = interpolate(progress, [0, 0.7, 1], [1, 1, 0], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  const fullscreenOpacity = interpolate(progress, [0, 0.7, 1], [0, 0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  return (
    <div style={{ width, height, position: 'relative', overflow: 'hidden' }}>
      {/* Children (device view) scaling up during transition */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width,
          height,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          transform: `scale(${zoomScale})`,
          opacity: childrenOpacity,
          transformOrigin: 'center center',
        }}
      >
        {children}
      </div>

      {/* Fullscreen content fading in at the end of transition */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width,
          height,
          opacity: fullscreenOpacity,
        }}
      >
        {fullscreenContent}
      </div>
    </div>
  );
};

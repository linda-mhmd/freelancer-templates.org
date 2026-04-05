import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import { CROSSFADE_FRAMES, ENTRANCE_OFFSET_Y } from './casStoryData';

export interface SceneContainerProps {
  startFrame: number;
  durationFrames: number;
  children: React.ReactNode;
}

export const SceneContainer: React.FC<SceneContainerProps> = ({
  startFrame,
  durationFrames,
  children,
}) => {
  const frame = useCurrentFrame();

  // Only render when frame is within [startFrame, startFrame + durationFrames)
  if (frame < startFrame || frame >= startFrame + durationFrames) {
    return null;
  }

  // Fade-in over first CROSSFADE_FRAMES (20 frames)
  const fadeInOpacity = interpolate(
    frame,
    [startFrame, startFrame + CROSSFADE_FRAMES],
    [0, 1],
    { extrapolateRight: 'clamp' },
  );

  const translateY = interpolate(
    frame,
    [startFrame, startFrame + CROSSFADE_FRAMES],
    [ENTRANCE_OFFSET_Y, 0],
    { extrapolateRight: 'clamp' },
  );

  // Fade-out over last CROSSFADE_FRAMES (20 frames)
  const fadeOutOpacity = interpolate(
    frame,
    [startFrame + durationFrames - CROSSFADE_FRAMES, startFrame + durationFrames],
    [1, 0],
    { extrapolateRight: 'clamp' },
  );

  const opacity = fadeInOpacity * fadeOutOpacity;

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        opacity,
        transform: `translateY(${translateY}px)`,
      }}
    >
      {children}
    </div>
  );
};

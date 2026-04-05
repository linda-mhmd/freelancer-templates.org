// src/remotion/Sims4/elements/CharacterSpot.tsx
// Element: Character placement with spring scale-in animation
// Renders LindaCharacter or AvatarDisplay based on mode prop

import React from 'react';
import { useCurrentFrame, useVideoConfig, spring } from 'remotion';
import { SIMS_SPRING } from '../data/simsTheme';
import { LindaCharacter } from '../components/SimsUI';
import { AvatarDisplay } from '../components/AvatarDisplay';
import type { BaseElementProps } from './types';

export interface CharacterSpotProps extends BaseElementProps {
  /** 'linda' uses LindaCharacter, 'avatar' uses AvatarDisplay with avatarSrc */
  mode: 'linda' | 'avatar';
  avatarSrc?: string;
  scale?: number;
  position?: { x?: number; y?: number };
  outfit?: string;
}

export const CharacterSpot: React.FC<CharacterSpotProps> = ({
  mode,
  avatarSrc,
  scale = 1,
  position,
  outfit,
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Spring scale-in from 0 → target scale
  const scaleSpring = spring({
    frame: frame - delay,
    fps,
    config: SIMS_SPRING.entrance,
  });

  const currentScale = scaleSpring * scale;

  return (
    <div
      style={{
        position: 'absolute',
        left: position?.x ?? 0,
        top: position?.y ?? 0,
        transform: `scale(${currentScale})`,
        transformOrigin: 'center bottom',
      }}
    >
      {mode === 'linda' ? (
        <LindaCharacter
          outfit={outfit as 'green-blazer' | 'casual' | 'formal' | 'aws' | 'notion' | 'reinvent' | undefined}
          avatarSrc={avatarSrc}
        />
      ) : (
        <AvatarDisplay
          mode="themed"
          src={avatarSrc}
          enterFrame={delay}
        />
      )}
    </div>
  );
};

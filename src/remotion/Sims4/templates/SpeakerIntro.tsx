import React from 'react';
import { AbsoluteFill } from 'remotion';
import { SimsBackground } from '../components/SimsBackground';
import type { BaseLayoutProps } from './types';

export interface SpeakerIntroProps extends BaseLayoutProps {
  /** Left content zone (name plate, facts) */
  left?: React.ReactNode;
  /** Center content zone (character/avatar) */
  center?: React.ReactNode;
  /** Right content zone (credentials, descriptions) */
  right?: React.ReactNode;
}

export const SpeakerIntro: React.FC<SpeakerIntroProps> = ({
  background,
  left,
  center,
  right,
}) => {
  return (
    <AbsoluteFill style={{ overflow: 'hidden' }}>
      <SimsBackground variant={background} />

      {/* Left zone — name plate, facts */}
      {left && (
        <div
          style={{
            position: 'absolute',
            left: 48,
            top: 60,
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
            maxWidth: 380,
          }}
        >
          {left}
        </div>
      )}

      {/* Center zone — character/avatar */}
      {center && (
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        >
          {center}
        </div>
      )}

      {/* Right zone — credentials, descriptions */}
      {right && (
        <div
          style={{
            position: 'absolute',
            right: 48,
            top: 60,
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
            maxWidth: 380,
          }}
        >
          {right}
        </div>
      )}
    </AbsoluteFill>
  );
};

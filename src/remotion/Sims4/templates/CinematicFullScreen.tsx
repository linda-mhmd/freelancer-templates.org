import React from 'react';
import { AbsoluteFill } from 'remotion';
import { SimsBackground } from '../components/SimsBackground';
import type { BaseLayoutProps } from './types';

export interface CinematicFullScreenProps extends BaseLayoutProps {
  /** Content rendered in the vertically/horizontally centered zone */
  children?: React.ReactNode;
}

export const CinematicFullScreen: React.FC<CinematicFullScreenProps> = ({
  background,
  children,
}) => {
  return (
    <AbsoluteFill>
      <SimsBackground variant={background} />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            maxWidth: 1120,
            width: '100%',
            padding: '48px 80px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {children}
        </div>
      </div>
    </AbsoluteFill>
  );
};

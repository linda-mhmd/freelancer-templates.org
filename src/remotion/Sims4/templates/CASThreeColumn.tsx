import React from 'react';
import { AbsoluteFill } from 'remotion';
import { SimsBackground } from '../components/SimsBackground';
import type { BaseLayoutProps } from './types';

export interface CASThreeColumnProps extends BaseLayoutProps {
  /** Left sidebar content (category tabs) — 100px wide */
  sidebar?: React.ReactNode;
  /** Center viewport content (avatar area) */
  viewport?: React.ReactNode;
  /** Right detail panel content — 258px wide */
  detail?: React.ReactNode;
  /** Top bar content — 56px height */
  topBar?: React.ReactNode;
  /** Bottom content (name plate area) */
  bottom?: React.ReactNode;
}

export const CASThreeColumn: React.FC<CASThreeColumnProps> = ({
  background,
  sidebar,
  viewport,
  detail,
  topBar,
  bottom,
}) => {
  return (
    <AbsoluteFill>
      <SimsBackground variant={background} />

      {/* Top bar zone — 56px height */}
      {topBar && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 56,
          }}
        >
          {topBar}
        </div>
      )}

      {/* Left sidebar — 100px wide */}
      {sidebar && (
        <div
          style={{
            position: 'absolute',
            left: 18,
            top: 124,
            bottom: 98,
            width: 100,
          }}
        >
          {sidebar}
        </div>
      )}

      {/* Center viewport — fills between sidebar and detail panel */}
      {viewport && (
        <div
          style={{
            position: 'absolute',
            left: 132,
            right: 292,
            top: 124,
            bottom: 98,
          }}
        >
          {viewport}
        </div>
      )}

      {/* Right detail panel — 258px wide */}
      {detail && (
        <div
          style={{
            position: 'absolute',
            right: 18,
            top: 124,
            bottom: 98,
            width: 258,
          }}
        >
          {detail}
        </div>
      )}

      {/* Bottom zone */}
      {bottom && (
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            height: 98,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {bottom}
        </div>
      )}
    </AbsoluteFill>
  );
};

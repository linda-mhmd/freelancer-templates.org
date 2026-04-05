import React from 'react';
import { AbsoluteFill } from 'remotion';
import { SimsBackground } from '../components/SimsBackground';
import { SIMS_SIZES } from '../data/simsTheme';
import type { BaseLayoutProps } from './types';

export interface ContentCardsProps extends BaseLayoutProps {
  /** Header zone content */
  header?: React.ReactNode;
  /** Grid zone content — renders children in a CSS grid */
  children?: React.ReactNode;
  /** Grid layout variant */
  gridLayout?: '2x2' | '3-column' | 'list';
}

const gridStyles: Record<
  NonNullable<ContentCardsProps['gridLayout']>,
  React.CSSProperties
> = {
  '2x2': {
    gridTemplateColumns: 'repeat(2, 1fr)',
    gridTemplateRows: 'repeat(2, 1fr)',
  },
  '3-column': {
    gridTemplateColumns: 'repeat(3, 1fr)',
  },
  list: {
    gridTemplateColumns: '1fr',
  },
};

export const ContentCards: React.FC<ContentCardsProps> = ({
  background,
  header,
  children,
  gridLayout = '2x2',
}) => {
  return (
    <AbsoluteFill>
      <SimsBackground variant={background} />

      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          padding: '48px 80px',
        }}
      >
        {/* Header zone */}
        {header && <div style={{ flexShrink: 0 }}>{header}</div>}

        {/* Grid zone */}
        <div
          style={{
            flex: 1,
            display: 'grid',
            gap: SIMS_SIZES.panel.gap,
            ...gridStyles[gridLayout],
          }}
        >
          {children}
        </div>
      </div>
    </AbsoluteFill>
  );
};

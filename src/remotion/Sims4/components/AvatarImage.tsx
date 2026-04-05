// src/remotion/Sims4/components/AvatarImage.tsx
// Reusable avatar image component for Remotion compositions.
// Uses staticFile() to reference the embedded SVG avatar in public/avatar/.

import React from 'react';
import { Img, staticFile } from 'remotion';

export interface AvatarImageProps {
  /** File name inside public/avatar/ (default: linda_avatar.svg) */
  src?: string;
  /** Height in pixels (width auto-scales to maintain aspect ratio) */
  height?: number;
  /** Optional inline styles */
  style?: React.CSSProperties;
}

export const AvatarImage: React.FC<AvatarImageProps> = ({
  src = 'linda_avatar.svg',
  height = 500,
  style,
}) => {
  return (
    <Img
      src={staticFile(`avatar/${src}`)}
      style={{
        height,
        width: 'auto',
        objectFit: 'contain',
        ...style,
      }}
    />
  );
};

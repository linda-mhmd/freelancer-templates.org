// src/remotion/Sims4/components/CinematicBackground.tsx
// Shared cinematic background — extracted from TitleScreenCinematic
// Renders: sky gradient, horizon glow, silhouette skyline, floating particles, vignette

import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { SIMS_COLORS } from '../data/simsTheme';

export interface CinematicBackgroundProps {
  /** Frames for initial fade-in of all layers. Default: 25 */
  fadeInDuration?: number;
}

export const CinematicBackground: React.FC<CinematicBackgroundProps> = ({
  fadeInDuration = 25,
}) => {
  const frame = useCurrentFrame();

  const fadeIn = interpolate(frame, [0, fadeInDuration], [0, 1], {
    extrapolateRight: 'clamp',
  });

  // Subtle sky color shift
  const skyShift = Math.sin(frame * 0.008) * 5;

  return (
    <AbsoluteFill style={{ overflow: 'hidden' }}>
      {/* ── Layer 1: SKY GRADIENT BACKGROUND ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(180deg, 
            hsl(${220 + skyShift}, 60%, 18%) 0%, 
            hsl(${230 + skyShift}, 55%, 25%) 30%, 
            hsl(${210 + skyShift}, 50%, 30%) 60%, 
            hsl(${200 + skyShift}, 45%, 22%) 100%)`,
        }}
      />

      {/* ── Layer 2: HORIZON GLOW ── */}
      <div
        style={{
          position: 'absolute',
          bottom: 80,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 1400,
          height: 300,
          background:
            'radial-gradient(ellipse at center, rgba(66,165,245,0.12) 0%, transparent 70%)',
          opacity: fadeIn,
        }}
      />

      {/* ── Layer 3: SILHOUETTE HOUSES (bottom skyline) ── */}
      <svg
        width="1280"
        height="200"
        viewBox="0 0 1280 200"
        style={{ position: 'absolute', bottom: 0, left: 0, opacity: 0.15 * fadeIn }}
      >
        {/* House 1 */}
        <polygon points="80,200 80,120 120,80 160,120 160,200" fill="#0D1B3E" />
        <rect x="100" y="140" width="20" height="30" fill="#1a2a5e" />
        {/* House 2 */}
        <polygon points="220,200 220,100 260,60 300,100 300,200" fill="#0D1B3E" />
        <rect x="245" y="130" width="18" height="25" fill="#1a2a5e" />
        {/* House 3 — larger */}
        <polygon points="400,200 400,90 460,50 520,90 520,200" fill="#0D1B3E" />
        <rect x="430" y="120" width="24" height="35" fill="#1a2a5e" />
        <rect x="470" y="130" width="18" height="25" fill="#1a2a5e" />
        {/* House 4 */}
        <polygon points="620,200 620,110 660,75 700,110 700,200" fill="#0D1B3E" />
        <rect x="645" y="140" width="20" height="28" fill="#1a2a5e" />
        {/* House 5 */}
        <polygon points="800,200 800,95 850,55 900,95 900,200" fill="#0D1B3E" />
        <rect x="830" y="125" width="22" height="30" fill="#1a2a5e" />
        {/* House 6 */}
        <polygon points="980,200 980,105 1020,70 1060,105 1060,200" fill="#0D1B3E" />
        <rect x="1005" y="135" width="18" height="25" fill="#1a2a5e" />
        {/* House 7 */}
        <polygon points="1140,200 1140,115 1180,80 1220,115 1220,200" fill="#0D1B3E" />
        <rect x="1165" y="140" width="16" height="22" fill="#1a2a5e" />
        {/* Trees scattered between houses */}
        <ellipse cx="180" cy="170" rx="25" ry="35" fill="#0a1530" />
        <ellipse cx="350" cy="165" rx="30" ry="40" fill="#0a1530" />
        <ellipse cx="560" cy="175" rx="22" ry="30" fill="#0a1530" />
        <ellipse cx="750" cy="168" rx="28" ry="38" fill="#0a1530" />
        <ellipse cx="940" cy="172" rx="24" ry="32" fill="#0a1530" />
        <ellipse cx="1100" cy="170" rx="26" ry="35" fill="#0a1530" />
        {/* Ground line */}
        <rect x="0" y="195" width="1280" height="5" fill="#0a1530" />
      </svg>

      {/* ── Layer 4: FLOATING PARTICLES (firefly-like) ── */}
      {Array.from({ length: 15 }, (_, i) => {
        const px = (i * 89 + 40) % 100;
        const py = 20 + ((i * 53) % 60);
        const drift = Math.sin(frame * 0.02 + i * 1.5) * 15;
        const bob = Math.cos(frame * 0.03 + i * 2) * 8;
        const pulse = 0.3 + Math.sin(frame * 0.04 + i) * 0.25;
        const color = i % 3 === 0 ? SIMS_COLORS.plumbobGlow : SIMS_COLORS.simsBlueLight;
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `${px}%`,
              top: `${py}%`,
              width: 3,
              height: 3,
              borderRadius: '50%',
              background: color,
              opacity: pulse * fadeIn,
              transform: `translate(${drift}px, ${bob}px)`,
              boxShadow: `0 0 8px ${color}`,
            }}
          />
        );
      })}

      {/* ── Layer 5: VIGNETTE ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.5) 100%)',
          opacity: fadeIn,
        }}
      />
    </AbsoluteFill>
  );
};

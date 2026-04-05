// src/remotion/Sims4/compositions/CrewArchitectureDiagram.tsx
// Multi-agent crew architecture — manager + specialized workers hierarchy
// Uses CinematicFullScreen + Plumbob + animated node connections

import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { Plumbob } from '../components/SimsUI';
import {
  SIMS_COLORS,
  SIMS_FONTS,
  SIMS_SIZES,
  SIMS_SPRING,
  SIMS_TIMING,
} from '../data/simsTheme';

// ── Types ────────────────────────────────────────────────────────────────────

export interface CrewAgent {
  icon: string;
  label: string;
  role: string;
  color: string;
}

export interface CrewArchitectureDiagramProps {
  title?: string;
  manager?: CrewAgent;
  workers?: CrewAgent[];
}

// ── Defaults ─────────────────────────────────────────────────────────────────

const DEFAULT_MANAGER: CrewAgent = {
  icon: '🎯',
  label: 'Orchestrator',
  role: 'Decomposes tasks & delegates',
  color: SIMS_COLORS.simsBlue,
};

const DEFAULT_WORKERS: CrewAgent[] = [
  { icon: '🔍', label: 'Researcher', role: 'Gathers context & data', color: SIMS_COLORS.plumbobGreen },
  { icon: '✍️', label: 'Writer', role: 'Generates content & code', color: SIMS_COLORS.needsYellow },
  { icon: '🛡️', label: 'Reviewer', role: 'Validates & refines output', color: SIMS_COLORS.needsOrange },
  { icon: '🚀', label: 'Deployer', role: 'Ships to production', color: SIMS_COLORS.needsPurple },
];

// ── Component ────────────────────────────────────────────────────────────────

export const CrewArchitectureDiagram: React.FC<CrewArchitectureDiagramProps> = ({
  title = 'Multi-Agent Crew Architecture',
  manager = DEFAULT_MANAGER,
  workers = DEFAULT_WORKERS,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ── Plumbob entrance ──
  const plumbobSpring = spring({ frame, fps, config: SIMS_SPRING.gentle });
  const plumbobOpacity = interpolate(plumbobSpring, [0, 1], [0, 1], { extrapolateRight: 'clamp' });
  const plumbobSlideY = interpolate(plumbobSpring, [0, 1], [SIMS_TIMING.entranceOffset, 0], { extrapolateRight: 'clamp' });

  // ── Title entrance ──
  const titleSpring = spring({ frame: frame - 10, fps, config: SIMS_SPRING.entrance });
  const titleOpacity = interpolate(titleSpring, [0, 1], [0, 1], { extrapolateRight: 'clamp' });
  const titleSlideY = interpolate(titleSpring, [0, 1], [SIMS_TIMING.entranceOffset, 0], { extrapolateRight: 'clamp' });

  // ── Manager node entrance ──
  const managerDelay = 30;
  const managerSpring = spring({ frame: frame - managerDelay, fps, config: SIMS_SPRING.entrance });
  const managerOpacity = interpolate(managerSpring, [0, 1], [0, 1], { extrapolateRight: 'clamp' });
  const managerScale = interpolate(managerSpring, [0, 1], [0.7, 1], { extrapolateRight: 'clamp' });

  // ── Connection lines progress ──
  const linesDelay = 50;
  const linesProgress = interpolate(frame, [linesDelay, linesDelay + 30], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  // Layout constants
  const managerY = 160;
  const workerY = 420;
  const centerX = 640;
  const workerSpacing = 240;
  const totalWorkerWidth = (workers.length - 1) * workerSpacing;
  const workerStartX = centerX - totalWorkerWidth / 2;

  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ background: SIMS_COLORS.bgLoadingScreen }} />

      {/* Plumbob */}
      <div style={{
        position: 'absolute', top: 30, left: '50%', transform: `translateX(-50%) translateY(${plumbobSlideY}px)`,
        opacity: plumbobOpacity,
      }}>
        <Plumbob size={40} animate />
      </div>

      {/* Title */}
      <div style={{
        position: 'absolute', top: 75, left: 0, right: 0, textAlign: 'center',
        fontFamily: SIMS_FONTS.display, fontWeight: 900, fontSize: 36,
        color: SIMS_COLORS.textLight, textShadow: '0 4px 30px rgba(0,0,0,0.5)',
        opacity: titleOpacity, transform: `translateY(${titleSlideY}px)`,
      }}>
        {title}
      </div>

      {/* SVG connection lines */}
      <svg style={{ position: 'absolute', inset: 0, width: 1280, height: 720, pointerEvents: 'none' }}>
        {workers.map((worker, i) => {
          const wx = workerStartX + i * workerSpacing;
          const pathLength = Math.sqrt((wx - centerX) ** 2 + (workerY - managerY - 60) ** 2);
          return (
            <line
              key={i}
              x1={centerX} y1={managerY + 60}
              x2={wx} y2={workerY - 40}
              stroke={worker.color}
              strokeWidth={2}
              strokeDasharray={pathLength}
              strokeDashoffset={pathLength * (1 - linesProgress)}
              opacity={0.6}
            />
          );
        })}
      </svg>

      {/* Manager node */}
      <div style={{
        position: 'absolute',
        top: managerY - 40,
        left: centerX - 100,
        width: 200,
        opacity: managerOpacity,
        transform: `scale(${managerScale})`,
        display: 'flex', flexDirection: 'column', alignItems: 'center',
      }}>
        <div style={{
          width: 80, height: 80, borderRadius: '50%',
          background: `linear-gradient(135deg, ${manager.color}, ${manager.color}88)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 36, boxShadow: `0 0 30px ${manager.color}44`,
          border: '3px solid rgba(255,255,255,0.3)',
        }}>
          {manager.icon}
        </div>
        <div style={{
          marginTop: 10, fontFamily: SIMS_FONTS.display, fontWeight: 800,
          fontSize: 18, color: SIMS_COLORS.textLight, textAlign: 'center',
        }}>
          {manager.label}
        </div>
        <div style={{
          fontFamily: SIMS_FONTS.body, fontSize: 12,
          color: SIMS_COLORS.textMuted, textAlign: 'center', marginTop: 2,
        }}>
          {manager.role}
        </div>
      </div>

      {/* Worker nodes */}
      {workers.map((worker, i) => {
        const workerDelay = 60 + i * SIMS_TIMING.minStagger;
        const wSpring = spring({ frame: frame - workerDelay, fps, config: SIMS_SPRING.entrance });
        const wOpacity = interpolate(wSpring, [0, 1], [0, 1], { extrapolateRight: 'clamp' });
        const wScale = interpolate(wSpring, [0, 1], [0.7, 1], { extrapolateRight: 'clamp' });
        const wx = workerStartX + i * workerSpacing;

        return (
          <div key={i} style={{
            position: 'absolute',
            top: workerY - 35,
            left: wx - 90,
            width: 180,
            opacity: wOpacity,
            transform: `scale(${wScale})`,
            display: 'flex', flexDirection: 'column', alignItems: 'center',
          }}>
            <div style={{
              width: 70, height: 70, borderRadius: SIMS_SIZES.borderRadius.lg,
              background: `linear-gradient(135deg, ${worker.color}22, ${worker.color}44)`,
              border: `2px solid ${worker.color}88`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 30, boxShadow: `0 0 20px ${worker.color}22`,
            }}>
              {worker.icon}
            </div>
            <div style={{
              marginTop: 10, fontFamily: SIMS_FONTS.display, fontWeight: 700,
              fontSize: 15, color: SIMS_COLORS.textLight, textAlign: 'center',
            }}>
              {worker.label}
            </div>
            <div style={{
              fontFamily: SIMS_FONTS.body, fontSize: 11,
              color: SIMS_COLORS.textMuted, textAlign: 'center', marginTop: 2,
            }}>
              {worker.role}
            </div>
          </div>
        );
      })}

      {/* "Crew Pattern" label at bottom */}
      <div style={{
        position: 'absolute', bottom: 80, left: 0, right: 0, textAlign: 'center',
        opacity: interpolate(frame, [140, 165], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }),
      }}>
        <div style={{
          display: 'inline-block',
          background: SIMS_COLORS.panelGlass, backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.15)', borderRadius: SIMS_SIZES.borderRadius.pill,
          padding: '10px 28px',
          fontFamily: SIMS_FONTS.body, fontSize: 14, fontWeight: 600,
          color: SIMS_COLORS.textLight, letterSpacing: 0.5,
        }}>
          🏗️ Manager → Worker pattern • Each agent has a single responsibility
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 36,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 24px', background: 'rgba(0,0,0,0.3)',
        opacity: interpolate(frame, [60, 80], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }),
      }}>
        <span style={{ fontFamily: SIMS_FONTS.body, fontSize: 12, color: SIMS_COLORS.textMuted }}>
          Lesson 5: Multi-Agent Crews
        </span>
        <span style={{ fontFamily: SIMS_FONTS.body, fontSize: 12, color: SIMS_COLORS.textMuted }}>
          Slide 1/4 — Architecture
        </span>
      </div>
    </AbsoluteFill>
  );
};

// src/remotion/Sims4/compositions/InterAgentCommunication.tsx
// Inter-agent communication patterns: shared memory, message passing, tool handoffs
// Network/mesh diagram with animated data flow pulses

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

export interface CommPattern {
  icon: string;
  label: string;
  description: string;
  pros: string;
  cons: string;
  color: string;
}

export interface InterAgentCommunicationProps {
  title?: string;
  patterns?: CommPattern[];
}

// ── Defaults ─────────────────────────────────────────────────────────────────

const DEFAULT_PATTERNS: CommPattern[] = [
  {
    icon: '💾',
    label: 'Shared Memory',
    description: 'Agents read/write to a common knowledge store',
    pros: 'Simple, persistent',
    cons: 'Race conditions',
    color: SIMS_COLORS.simsBlueLight,
  },
  {
    icon: '💬',
    label: 'Message Passing',
    description: 'Agents send structured messages to each other',
    pros: 'Decoupled, traceable',
    cons: 'Ordering complexity',
    color: SIMS_COLORS.plumbobGreen,
  },
  {
    icon: '🔧',
    label: 'Tool Handoff',
    description: 'One agent\'s output becomes another\'s tool input',
    pros: 'Type-safe, composable',
    cons: 'Tight coupling',
    color: SIMS_COLORS.needsYellow,
  },
];

// ── Component ────────────────────────────────────────────────────────────────

export const InterAgentCommunication: React.FC<InterAgentCommunicationProps> = ({
  title = 'Inter-Agent Communication',
  patterns = DEFAULT_PATTERNS,
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

  // Layout — 3 agent nodes in a triangle with center hub
  const centerX = 640;
  const centerY = 340;
  const radius = 170;
  const agentPositions = [
    { x: centerX, y: centerY - radius, icon: '🔍', label: 'Agent A' },
    { x: centerX - radius * 0.87, y: centerY + radius * 0.5, icon: '✍️', label: 'Agent B' },
    { x: centerX + radius * 0.87, y: centerY + radius * 0.5, icon: '🛡️', label: 'Agent C' },
  ];

  // ── Network mesh entrance ──
  const meshDelay = 30;
  const meshSpring = spring({ frame: frame - meshDelay, fps, config: SIMS_SPRING.entrance });
  const meshOpacity = interpolate(meshSpring, [0, 1], [0, 1], { extrapolateRight: 'clamp' });

  // ── Pulse animation (looping) ──
  const pulsePhase = (frame % 60) / 60;

  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ background: SIMS_COLORS.bgLoadingScreen }} />

      {/* Plumbob */}
      <div style={{
        position: 'absolute', top: 30, left: '50%',
        transform: `translateX(-50%) translateY(${plumbobSlideY}px)`,
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

      {/* Network mesh — SVG connections between agents */}
      <svg style={{ position: 'absolute', inset: 0, width: 1280, height: 720, pointerEvents: 'none', opacity: meshOpacity }}>
        {/* Triangle edges */}
        {agentPositions.map((from, i) => {
          const to = agentPositions[(i + 1) % agentPositions.length];
          return (
            <line key={`edge-${i}`}
              x1={from.x} y1={from.y} x2={to.x} y2={to.y}
              stroke="rgba(255,255,255,0.15)" strokeWidth={1.5}
            />
          );
        })}
        {/* Lines to center hub */}
        {agentPositions.map((pos, i) => (
          <line key={`hub-${i}`}
            x1={pos.x} y1={pos.y} x2={centerX} y2={centerY}
            stroke="rgba(255,255,255,0.1)" strokeWidth={1} strokeDasharray="4 4"
          />
        ))}
        {/* Animated pulse dots along edges */}
        {agentPositions.map((from, i) => {
          const to = agentPositions[(i + 1) % agentPositions.length];
          const t = (pulsePhase + i * 0.33) % 1;
          const px = from.x + (to.x - from.x) * t;
          const py = from.y + (to.y - from.y) * t;
          return (
            <circle key={`pulse-${i}`}
              cx={px} cy={py} r={4}
              fill={SIMS_COLORS.plumbobGlow} opacity={0.8}
            />
          );
        })}
      </svg>

      {/* Center hub */}
      <div style={{
        position: 'absolute',
        top: centerY - 25, left: centerX - 25,
        width: 50, height: 50, borderRadius: '50%',
        background: SIMS_COLORS.panelGlass, backdropFilter: 'blur(12px)',
        border: '2px solid rgba(255,255,255,0.2)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 22, opacity: meshOpacity,
        boxShadow: '0 0 20px rgba(105,240,174,0.15)',
      }}>
        🔄
      </div>

      {/* Agent nodes */}
      {agentPositions.map((pos, i) => {
        const nodeDelay = 40 + i * SIMS_TIMING.minStagger;
        const nSpring = spring({ frame: frame - nodeDelay, fps, config: SIMS_SPRING.entrance });
        const nOpacity = interpolate(nSpring, [0, 1], [0, 1], { extrapolateRight: 'clamp' });
        const nScale = interpolate(nSpring, [0, 1], [0.7, 1], { extrapolateRight: 'clamp' });

        return (
          <div key={i} style={{
            position: 'absolute',
            top: pos.y - 30, left: pos.x - 30,
            width: 60, height: 60, borderRadius: '50%',
            background: `linear-gradient(135deg, ${SIMS_COLORS.simsBlue}44, ${SIMS_COLORS.simsBlue}88)`,
            border: '2px solid rgba(255,255,255,0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 26, opacity: nOpacity, transform: `scale(${nScale})`,
            boxShadow: `0 0 20px ${SIMS_COLORS.simsBlue}22`,
          }}>
            {pos.icon}
          </div>
        );
      })}

      {/* Communication pattern cards */}
      <div style={{
        position: 'absolute', bottom: 80, left: 0, right: 0,
        display: 'flex', justifyContent: 'center', gap: 20, padding: '0 60px',
      }}>
        {patterns.map((pattern, i) => {
          const cardDelay = 100 + i * SIMS_TIMING.minStagger;
          const cSpring = spring({ frame: frame - cardDelay, fps, config: SIMS_SPRING.entrance });
          const cOpacity = interpolate(cSpring, [0, 1], [0, 1], { extrapolateRight: 'clamp' });
          const cSlideY = interpolate(cSpring, [0, 1], [20, 0], { extrapolateRight: 'clamp' });

          return (
            <div key={i} style={{
              opacity: cOpacity, transform: `translateY(${cSlideY}px)`,
              background: SIMS_COLORS.panelGlass, backdropFilter: 'blur(12px)',
              border: `1px solid ${pattern.color}33`,
              borderRadius: SIMS_SIZES.borderRadius.md,
              padding: '14px 20px', flex: 1, maxWidth: 280,
            }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6,
              }}>
                <span style={{ fontSize: 20 }}>{pattern.icon}</span>
                <span style={{
                  fontFamily: SIMS_FONTS.display, fontWeight: 700, fontSize: 15,
                  color: pattern.color,
                }}>
                  {pattern.label}
                </span>
              </div>
              <div style={{
                fontFamily: SIMS_FONTS.body, fontSize: 11,
                color: SIMS_COLORS.textLight, lineHeight: 1.4, marginBottom: 6,
              }}>
                {pattern.description}
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <span style={{
                  fontFamily: SIMS_FONTS.body, fontSize: 10,
                  color: SIMS_COLORS.plumbobGreen,
                }}>
                  ✓ {pattern.pros}
                </span>
                <span style={{
                  fontFamily: SIMS_FONTS.body, fontSize: 10,
                  color: SIMS_COLORS.needsOrange,
                }}>
                  ✗ {pattern.cons}
                </span>
              </div>
            </div>
          );
        })}
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
          Slide 3/4 — Communication
        </span>
      </div>
    </AbsoluteFill>
  );
};

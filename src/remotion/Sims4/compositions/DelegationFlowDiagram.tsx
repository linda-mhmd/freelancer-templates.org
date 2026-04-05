// src/remotion/Sims4/compositions/DelegationFlowDiagram.tsx
// Task delegation pipeline: decompose → assign → execute → aggregate
// Uses cinematic background + animated pipeline steps

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

export interface PipelineStep {
  icon: string;
  label: string;
  description: string;
  color: string;
}

export interface DelegationFlowDiagramProps {
  title?: string;
  steps?: PipelineStep[];
}

// ── Defaults ─────────────────────────────────────────────────────────────────

const DEFAULT_STEPS: PipelineStep[] = [
  { icon: '🧩', label: 'Decompose', description: 'Break complex task into subtasks', color: SIMS_COLORS.simsBlueLight },
  { icon: '📋', label: 'Assign', description: 'Route each subtask to best agent', color: SIMS_COLORS.plumbobGreen },
  { icon: '⚡', label: 'Execute', description: 'Agents work in parallel or sequence', color: SIMS_COLORS.needsYellow },
  { icon: '🔗', label: 'Aggregate', description: 'Combine results into final output', color: SIMS_COLORS.needsOrange },
];

// ── Component ────────────────────────────────────────────────────────────────

export const DelegationFlowDiagram: React.FC<DelegationFlowDiagramProps> = ({
  title = 'Task Delegation Pipeline',
  steps = DEFAULT_STEPS,
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

  // Layout
  const pipelineY = 300;
  const stepWidth = 220;
  const totalWidth = steps.length * stepWidth;
  const startX = (1280 - totalWidth) / 2 + stepWidth / 2;

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

      {/* Subtitle */}
      <div style={{
        position: 'absolute', top: 120, left: 0, right: 0, textAlign: 'center',
        fontFamily: SIMS_FONTS.body, fontSize: 16, color: SIMS_COLORS.textMuted,
        opacity: titleOpacity,
      }}>
        How a manager agent breaks down and distributes work
      </div>

      {/* Pipeline steps */}
      {steps.map((step, i) => {
        const stepDelay = 40 + i * 25;
        const sSpring = spring({ frame: frame - stepDelay, fps, config: SIMS_SPRING.entrance });
        const sOpacity = interpolate(sSpring, [0, 1], [0, 1], { extrapolateRight: 'clamp' });
        const sSlideY = interpolate(sSpring, [0, 1], [30, 0], { extrapolateRight: 'clamp' });
        const cx = startX + i * stepWidth;

        // Arrow between steps
        const arrowDelay = stepDelay + 15;
        const arrowOpacity = i < steps.length - 1
          ? interpolate(frame, [arrowDelay, arrowDelay + 15], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' })
          : 0;

        return (
          <React.Fragment key={i}>
            {/* Step card */}
            <div style={{
              position: 'absolute',
              top: pipelineY - 80,
              left: cx - 90,
              width: 180,
              opacity: sOpacity,
              transform: `translateY(${sSlideY}px)`,
              display: 'flex', flexDirection: 'column', alignItems: 'center',
            }}>
              {/* Step number badge */}
              <div style={{
                width: 28, height: 28, borderRadius: '50%',
                background: step.color, display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: SIMS_FONTS.display, fontWeight: 800, fontSize: 14, color: '#fff',
                marginBottom: 12, boxShadow: `0 0 15px ${step.color}44`,
              }}>
                {i + 1}
              </div>

              {/* Icon circle */}
              <div style={{
                width: 72, height: 72, borderRadius: SIMS_SIZES.borderRadius.lg,
                background: `linear-gradient(135deg, ${step.color}18, ${step.color}33)`,
                border: `2px solid ${step.color}66`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 32, marginBottom: 14,
              }}>
                {step.icon}
              </div>

              {/* Label */}
              <div style={{
                fontFamily: SIMS_FONTS.display, fontWeight: 700, fontSize: 17,
                color: SIMS_COLORS.textLight, textAlign: 'center', marginBottom: 6,
              }}>
                {step.label}
              </div>

              {/* Description */}
              <div style={{
                fontFamily: SIMS_FONTS.body, fontSize: 12,
                color: SIMS_COLORS.textMuted, textAlign: 'center', lineHeight: 1.4,
                maxWidth: 160,
              }}>
                {step.description}
              </div>
            </div>

            {/* Arrow connector */}
            {i < steps.length - 1 && (
              <div style={{
                position: 'absolute',
                top: pipelineY + 2,
                left: cx + 90 - 4,
                width: stepWidth - 180 + 8,
                opacity: arrowOpacity,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <div style={{
                  width: '100%', height: 2,
                  background: `linear-gradient(90deg, ${step.color}88, ${steps[i + 1].color}88)`,
                }} />
                <div style={{
                  width: 0, height: 0,
                  borderTop: '6px solid transparent',
                  borderBottom: '6px solid transparent',
                  borderLeft: `8px solid ${steps[i + 1].color}88`,
                  flexShrink: 0,
                }} />
              </div>
            )}
          </React.Fragment>
        );
      })}

      {/* Example task flow at bottom */}
      <div style={{
        position: 'absolute', bottom: 100, left: 0, right: 0,
        display: 'flex', justifyContent: 'center', gap: 12,
        opacity: interpolate(frame, [150, 175], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }),
      }}>
        {[
          { text: '"Generate a video report"', color: SIMS_COLORS.simsBlueLight },
          { text: '→ Extract spec', color: SIMS_COLORS.plumbobGreen },
          { text: '→ Write TSX + Audio', color: SIMS_COLORS.needsYellow },
          { text: '→ Render MP4', color: SIMS_COLORS.needsOrange },
        ].map((item, i) => (
          <div key={i} style={{
            background: SIMS_COLORS.panelGlass, backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.12)', borderRadius: SIMS_SIZES.borderRadius.md,
            padding: '8px 16px',
            fontFamily: SIMS_FONTS.body, fontSize: 13, color: item.color, fontWeight: 500,
          }}>
            {item.text}
          </div>
        ))}
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
          Slide 2/4 — Delegation
        </span>
      </div>
    </AbsoluteFill>
  );
};

// src/remotion/Sims4/compositions/CrewRealWorldExample.tsx
// Real-world crew example: the video generation crew from this project
// Shows actual agents, their roles, tools, and the pipeline output

import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { Plumbob, SimsPanel, PanelHeader } from '../components/SimsUI';
import {
  SIMS_COLORS,
  SIMS_FONTS,
  SIMS_SIZES,
  SIMS_SPRING,
  SIMS_TIMING,
} from '../data/simsTheme';

// ── Types ────────────────────────────────────────────────────────────────────

export interface CrewMember {
  icon: string;
  name: string;
  role: string;
  tools: string[];
  color: string;
}

export interface PipelineOutput {
  icon: string;
  label: string;
}

export interface CrewRealWorldExampleProps {
  crewName?: string;
  subtitle?: string;
  members?: CrewMember[];
  outputs?: PipelineOutput[];
  inputLabel?: string;
}

// ── Defaults ─────────────────────────────────────────────────────────────────

const DEFAULT_MEMBERS: CrewMember[] = [
  {
    icon: '🧠',
    name: 'Spec Extractor',
    role: 'Parses raw text into a structured VideoSpec',
    tools: ['Claude (Bedrock)', 'JSON Schema'],
    color: SIMS_COLORS.simsBlueLight,
  },
  {
    icon: '🎨',
    name: 'Composition Generator',
    role: 'Writes animated TSX from the VideoSpec',
    tools: ['Template Engine', 'Remotion API'],
    color: SIMS_COLORS.plumbobGreen,
  },
  {
    icon: '🎙️',
    name: 'Voiceover Agent',
    role: 'Generates narration audio from script',
    tools: ['ElevenLabs API', 'Audio Encoder'],
    color: SIMS_COLORS.needsYellow,
  },
  {
    icon: '🎬',
    name: 'Render Agent',
    role: 'Renders final MP4 and uploads to S3',
    tools: ['Remotion CLI', 'AWS S3'],
    color: SIMS_COLORS.needsOrange,
  },
];

const DEFAULT_OUTPUTS: PipelineOutput[] = [
  { icon: '📄', label: 'VideoSpec JSON' },
  { icon: '⚛️', label: 'React TSX' },
  { icon: '🔊', label: 'MP3 Audio' },
  { icon: '🎥', label: 'MP4 Video' },
];

// ── Component ────────────────────────────────────────────────────────────────

export const CrewRealWorldExample: React.FC<CrewRealWorldExampleProps> = ({
  crewName = 'Video Generation Crew',
  subtitle = 'A real multi-agent system powering this presentation',
  members = DEFAULT_MEMBERS,
  outputs = DEFAULT_OUTPUTS,
  inputLabel = '"Create a video about Q4 results"',
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

  // ── Input label entrance ──
  const inputDelay = 25;
  const inputSpring = spring({ frame: frame - inputDelay, fps, config: SIMS_SPRING.entrance });
  const inputOpacity = interpolate(inputSpring, [0, 1], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ background: SIMS_COLORS.bgLoadingScreen }} />

      {/* Plumbob */}
      <div style={{
        position: 'absolute', top: 20, left: '50%',
        transform: `translateX(-50%) translateY(${plumbobSlideY}px)`,
        opacity: plumbobOpacity,
      }}>
        <Plumbob size={36} animate />
      </div>

      {/* Title */}
      <div style={{
        position: 'absolute', top: 60, left: 0, right: 0, textAlign: 'center',
        opacity: titleOpacity, transform: `translateY(${titleSlideY}px)`,
      }}>
        <div style={{
          fontFamily: SIMS_FONTS.display, fontWeight: 900, fontSize: 32,
          color: SIMS_COLORS.textLight, textShadow: '0 4px 30px rgba(0,0,0,0.5)',
        }}>
          {crewName}
        </div>
        <div style={{
          fontFamily: SIMS_FONTS.body, fontSize: 14, color: SIMS_COLORS.textMuted, marginTop: 4,
        }}>
          {subtitle}
        </div>
      </div>

      {/* Input prompt */}
      <div style={{
        position: 'absolute', top: 130, left: '50%', transform: 'translateX(-50%)',
        opacity: inputOpacity,
      }}>
        <div style={{
          background: 'rgba(21,101,192,0.2)', border: '1px solid rgba(66,165,245,0.4)',
          borderRadius: SIMS_SIZES.borderRadius.pill, padding: '8px 24px',
          fontFamily: SIMS_FONTS.mono, fontSize: 13, color: SIMS_COLORS.simsBlueLight,
        }}>
          💬 {inputLabel}
        </div>
      </div>

      {/* Arrow from input to crew */}
      <div style={{
        position: 'absolute', top: 165, left: '50%', transform: 'translateX(-50%)',
        opacity: interpolate(frame, [40, 55], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }),
      }}>
        <div style={{
          width: 2, height: 20, background: 'rgba(255,255,255,0.2)', margin: '0 auto',
        }} />
        <div style={{
          width: 0, height: 0, margin: '0 auto',
          borderLeft: '5px solid transparent', borderRight: '5px solid transparent',
          borderTop: '6px solid rgba(255,255,255,0.3)',
        }} />
      </div>

      {/* Crew members — horizontal cards */}
      <div style={{
        position: 'absolute', top: 200, left: 0, right: 0,
        display: 'flex', justifyContent: 'center', gap: 16, padding: '0 40px',
      }}>
        {members.map((member, i) => {
          const memberDelay = 45 + i * SIMS_TIMING.minStagger;
          const mSpring = spring({ frame: frame - memberDelay, fps, config: SIMS_SPRING.entrance });
          const mOpacity = interpolate(mSpring, [0, 1], [0, 1], { extrapolateRight: 'clamp' });
          const mSlideY = interpolate(mSpring, [0, 1], [20, 0], { extrapolateRight: 'clamp' });

          return (
            <div key={i} style={{
              opacity: mOpacity, transform: `translateY(${mSlideY}px)`,
              background: SIMS_COLORS.panelGlass, backdropFilter: 'blur(12px)',
              border: `1px solid ${member.color}33`,
              borderRadius: SIMS_SIZES.borderRadius.md,
              padding: '16px 14px', flex: 1, maxWidth: 260,
              display: 'flex', flexDirection: 'column', alignItems: 'center',
            }}>
              {/* Icon */}
              <div style={{
                width: 50, height: 50, borderRadius: SIMS_SIZES.borderRadius.lg,
                background: `linear-gradient(135deg, ${member.color}18, ${member.color}33)`,
                border: `2px solid ${member.color}55`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 24, marginBottom: 10,
              }}>
                {member.icon}
              </div>

              {/* Name */}
              <div style={{
                fontFamily: SIMS_FONTS.display, fontWeight: 700, fontSize: 14,
                color: member.color, textAlign: 'center', marginBottom: 4,
              }}>
                {member.name}
              </div>

              {/* Role */}
              <div style={{
                fontFamily: SIMS_FONTS.body, fontSize: 11,
                color: SIMS_COLORS.textLight, textAlign: 'center',
                lineHeight: 1.3, marginBottom: 8,
              }}>
                {member.role}
              </div>

              {/* Tools */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, justifyContent: 'center' }}>
                {member.tools.map((tool, j) => (
                  <div key={j} style={{
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: SIMS_SIZES.borderRadius.sm,
                    padding: '2px 8px',
                    fontFamily: SIMS_FONTS.mono, fontSize: 9,
                    color: SIMS_COLORS.textMuted,
                  }}>
                    {tool}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Output pipeline */}
      <div style={{
        position: 'absolute', bottom: 90, left: 0, right: 0,
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        opacity: interpolate(frame, [160, 185], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }),
      }}>
        <div style={{
          fontFamily: SIMS_FONTS.display, fontWeight: 700, fontSize: 14,
          color: SIMS_COLORS.textMuted, marginBottom: 10, letterSpacing: 1,
        }}>
          OUTPUT PIPELINE
        </div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          {outputs.map((output, i) => (
            <React.Fragment key={i}>
              <div style={{
                background: SIMS_COLORS.panelGlass, backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: SIMS_SIZES.borderRadius.md,
                padding: '8px 16px', display: 'flex', alignItems: 'center', gap: 6,
              }}>
                <span style={{ fontSize: 16 }}>{output.icon}</span>
                <span style={{
                  fontFamily: SIMS_FONTS.body, fontSize: 12, fontWeight: 600,
                  color: SIMS_COLORS.textLight,
                }}>
                  {output.label}
                </span>
              </div>
              {i < outputs.length - 1 && (
                <span style={{ color: SIMS_COLORS.textMuted, fontSize: 14 }}>→</span>
              )}
            </React.Fragment>
          ))}
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
          Slide 4/4 — Real-World Example
        </span>
      </div>
    </AbsoluteFill>
  );
};

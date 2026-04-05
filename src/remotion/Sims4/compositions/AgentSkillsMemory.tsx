// src/remotion/Sims4/compositions/AgentSkillsMemory.tsx
// Agent memory types as skill bars with equipped tools below
// Uses CinematicFullScreen + Plumbob + SimsPanel variant="white" with SkillBars

import React from 'react';
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {
  SIMS_COLORS,
  SIMS_FONTS,
  SIMS_SPRING,
  SIMS_TIMING,
} from '../data/simsTheme';
import { Plumbob, SimsPanel, PanelHeader, SkillBar } from '../components/SimsUI';
import { CinematicFullScreen } from '../templates/CinematicFullScreen';

// ── Types ────────────────────────────────────────────────────────────────────

export interface MemoryType {
  icon: string;
  label: string;
  description: string;
  level: number; // 1–10
}

export interface EquippedTool {
  icon: React.ReactNode | string;
  label: string;
}

export interface AgentSkillsMemoryProps {
  panelTitle?: string;
  memoryTypes?: MemoryType[];
  equippedTools?: EquippedTool[];
}

// ── Defaults ─────────────────────────────────────────────────────────────────

const DEFAULT_MEMORY_TYPES: MemoryType[] = [
  { icon: '⚡', label: 'Short-term Memory', description: 'Current conversation context and working state.', level: 7 },
  { icon: '💾', label: 'Long-term Memory', description: 'Persistent knowledge stored across sessions.', level: 5 },
  { icon: '👤', label: 'Entity Memory', description: 'Facts about specific people, places, and things.', level: 4 },
];

const DEFAULT_EQUIPPED_TOOLS: EquippedTool[] = [
  { icon: '🔍', label: 'SerpAPI' },
  { icon: '📄', label: 'FileReadTool' },
];

// ── Component ────────────────────────────────────────────────────────────────

export const AgentSkillsMemory: React.FC<AgentSkillsMemoryProps> = ({
  panelTitle = 'Agent Memory & Skills',
  memoryTypes = DEFAULT_MEMORY_TYPES,
  equippedTools = DEFAULT_EQUIPPED_TOOLS,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ── Plumbob gentle entrance (frames 0–15) ──
  const plumbobSpring = spring({
    frame,
    fps,
    config: SIMS_SPRING.gentle,
  });
  const plumbobOpacity = interpolate(plumbobSpring, [0, 1], [0, 1], {
    extrapolateRight: 'clamp',
  });
  const plumbobSlideY = interpolate(
    plumbobSpring,
    [0, 1],
    [SIMS_TIMING.entranceOffset, 0],
    { extrapolateRight: 'clamp' },
  );

  // ── Panel + title entrance (frames 10–30) ──
  const panelSpring = spring({
    frame: frame - 10,
    fps,
    config: SIMS_SPRING.entrance,
  });
  const panelOpacity = interpolate(panelSpring, [0, 1], [0, 1], {
    extrapolateRight: 'clamp',
  });
  const panelSlideY = interpolate(
    panelSpring,
    [0, 1],
    [SIMS_TIMING.entranceOffset, 0],
    { extrapolateRight: 'clamp' },
  );

  // ── Equipped tools section entrance ──
  // Starts after all SkillBars: frame 30 + (memoryTypes.length × minStagger) + 10
  const toolsSectionStart =
    30 + memoryTypes.length * SIMS_TIMING.minStagger + 10;

  return (
    <CinematicFullScreen background="cinematic">
      {/* Plumbob above title */}
      <div
        style={{
          opacity: plumbobOpacity,
          transform: `translateY(${plumbobSlideY}px)`,
          marginBottom: 8,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Plumbob size={40} />
      </div>

      {/* Skills panel */}
      <div
        style={{
          opacity: panelOpacity,
          transform: `translateY(${panelSlideY}px)`,
          width: '100%',
          maxWidth: 680,
        }}
      >
        <SimsPanel variant="white" style={{ width: '100%', padding: 0 }}>
          <PanelHeader title={panelTitle} icon="🧠" />

          {/* Memory type skill bars */}
          <div style={{ padding: '24px 32px 16px' }}>
            {memoryTypes.map((mem, i) => (
              <div key={i} style={{ marginBottom: 4 }}>
                <SkillBar
                  label={mem.label}
                  level={mem.level}
                  maxLevel={10}
                  icon={mem.icon}
                  delayFrames={30 + i * SIMS_TIMING.minStagger}
                />
                <div
                  style={{
                    fontFamily: SIMS_FONTS.body,
                    fontSize: 11,
                    color: SIMS_COLORS.textMuted,
                    marginLeft: 28,
                    marginTop: -6,
                    marginBottom: 8,
                  }}
                >
                  {mem.description}
                </div>
              </div>
            ))}
          </div>
        </SimsPanel>

        {/* Equipped Tools section */}
        {equippedTools.length > 0 && (
          <div style={{ marginTop: 20 }}>
            <div
              style={{
                fontFamily: SIMS_FONTS.display,
                fontWeight: 800,
                fontSize: 16,
                color: SIMS_COLORS.textLight,
                textAlign: 'center',
                marginBottom: 12,
                opacity: interpolate(
                  frame,
                  [toolsSectionStart, toolsSectionStart + SIMS_TIMING.fadeInFrames],
                  [0, 1],
                  { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' },
                ),
              }}
            >
              Equipped Tools
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: 16,
                flexWrap: 'wrap',
              }}
            >
              {equippedTools.map((tool, i) => {
                const toolDelay =
                  toolsSectionStart + 10 + i * SIMS_TIMING.minStagger;
                const toolSpring = spring({
                  frame: frame - toolDelay,
                  fps,
                  config: SIMS_SPRING.entrance,
                });
                const toolOpacity = interpolate(
                  toolSpring,
                  [0, 1],
                  [0, 1],
                  { extrapolateRight: 'clamp' },
                );
                const toolScale = interpolate(
                  toolSpring,
                  [0, 1],
                  [0.85, 1],
                  { extrapolateRight: 'clamp' },
                );

                return (
                  <div
                    key={i}
                    style={{
                      opacity: toolOpacity,
                      transform: `scale(${toolScale})`,
                      background: SIMS_COLORS.panelGlass,
                      backdropFilter: 'blur(12px)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      borderRadius: 14,
                      padding: '14px 22px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
                    }}
                  >
                    <span style={{ fontSize: 22 }}>
                      {typeof tool.icon === 'string' ? tool.icon : tool.icon}
                    </span>
                    <span
                      style={{
                        fontFamily: SIMS_FONTS.body,
                        fontSize: 14,
                        fontWeight: 600,
                        color: SIMS_COLORS.textLight,
                      }}
                    >
                      {tool.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </CinematicFullScreen>
  );
};

/**
 * NewQuestAvailable - A new quest just unlocked
 *
 * GameDay quests often unlock in waves throughout the event, not all at once.
 * This is different from QuestFixed (which is about repairing a broken quest).
 * This is a fresh quest that wasn't available before - the "new level unlocked" moment.
 * Duration: ~30 seconds (900 frames at 30fps)
 */

import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { BackgroundLayer, HexGridOverlay, GlassCard, AudioBadge } from "../../../components";
import { GD_DARK, GD_ORANGE } from "../../../design/colors";
import { TYPOGRAPHY } from "../../../design/typography";
import { EVENT_NAME } from "../../../../config/event";

export interface NewQuestAvailableProps {
  questName?: string;
  description?: string;
}

const DEFAULT_PROPS: NewQuestAvailableProps = {
  questName: "Quest Name",
  description: "A new challenge is now available in your quest list. Check the platform for details.",
};

const TITLE = "NEW QUEST AVAILABLE";
const ACCENT_COLOR = GD_ORANGE;

const TOTAL_FRAMES = 900;
const FADE_OUT_START = 840;

const StatusBadge: React.FC<{ label: string; color: string }> = ({ label, color }) => (
  <div style={{
    display: "inline-flex", alignItems: "center",
    padding: "4px 14px", borderRadius: 20,
    background: `${color}22`, border: `1.5px solid ${color}70`,
    fontSize: TYPOGRAPHY.label, fontWeight: 800, color,
    letterSpacing: 2, textTransform: "uppercase" as const, marginBottom: 16,
  }}>{label}</div>
);

export const NewQuestAvailable: React.FC<NewQuestAvailableProps> = ({
  questName = DEFAULT_PROPS.questName,
  description = DEFAULT_PROPS.description,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrySpring = spring({ frame, fps, config: { damping: 14, stiffness: 100 } });
  const cardSpring = spring({ frame: Math.max(0, frame - 15), fps, config: { damping: 12, stiffness: 80 } });
  const iconSpring = spring({ frame, fps, config: { damping: 8, stiffness: 200 } });
  const pulse = interpolate(frame % 60, [0, 30, 60], [0.8, 1, 0.8], { extrapolateRight: "clamp" });
  const exitOpacity = interpolate(frame, [FADE_OUT_START, TOTAL_FRAMES], [1, 0], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ fontFamily: "'Inter', sans-serif", background: GD_DARK }}>
      <BackgroundLayer darken={0.75} />
      <HexGridOverlay />

      <AbsoluteFill style={{
        display: "flex", flexDirection: "column", justifyContent: "center",
        alignItems: "center", padding: 60, opacity: exitOpacity,
      }}>
        {/* Unlock icon - punchy entry */}
        <div style={{
          width: 72, height: 72, color: ACCENT_COLOR, marginBottom: 24,
          transform: `scale(${iconSpring})`,
          opacity: entrySpring,
        }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: "100%", height: "100%" }}>
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
            <path d="M7 11V7a5 5 0 0 1 9.9-1"/>
          </svg>
        </div>

        {/* Header */}
        <div style={{
          display: "flex", alignItems: "center", gap: 16, marginBottom: 40,
          opacity: entrySpring,
          transform: `translateY(${interpolate(entrySpring, [0, 1], [-30, 0])}px)`,
        }}>
          <div style={{
            width: 16, height: 16, borderRadius: "50%", background: ACCENT_COLOR,
            boxShadow: `0 0 ${20 * pulse}px ${ACCENT_COLOR}`, transform: `scale(${pulse})`,
          }} />
          <span style={{
            fontSize: TYPOGRAPHY.h3, fontWeight: 700, color: ACCENT_COLOR,
            letterSpacing: 3, textTransform: "uppercase",
          }}>{TITLE}</span>
          <div style={{
            width: 16, height: 16, borderRadius: "50%", background: ACCENT_COLOR,
            boxShadow: `0 0 ${20 * pulse}px ${ACCENT_COLOR}`, transform: `scale(${pulse})`,
          }} />
        </div>

        <div style={{
          opacity: cardSpring,
          transform: `translateY(${interpolate(cardSpring, [0, 1], [40, 0])}px)`,
        }}>
          <GlassCard style={{
            padding: "40px 56px", border: `2px solid ${ACCENT_COLOR}40`,
            textAlign: "center", maxWidth: 700,
          }}>
            <StatusBadge label="Now Available" color={ACCENT_COLOR} />
            <div style={{
              fontSize: TYPOGRAPHY.h3, fontWeight: 800, color: ACCENT_COLOR, marginBottom: 24,
            }}>
              {questName}
            </div>
            <div style={{
              width: 48, height: 1, background: `${ACCENT_COLOR}40`, margin: "0 auto 24px",
            }} />
            <p style={{
              fontSize: TYPOGRAPHY.h5, color: "rgba(255,255,255,0.85)",
              lineHeight: 1.6, margin: 0, fontWeight: 400,
            }}>{description}</p>
          </GlassCard>
        </div>

        <div style={{
          marginTop: 40,
          opacity: interpolate(frame, [45, 75], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
        }}>
          <span style={{ fontSize: TYPOGRAPHY.bodySmall, color: "rgba(255,255,255,0.5)", letterSpacing: 2 }}>
            {EVENT_NAME}
          </span>
        </div>
      </AbsoluteFill>

      <AudioBadge muted={false} />
    </AbsoluteFill>
  );
};

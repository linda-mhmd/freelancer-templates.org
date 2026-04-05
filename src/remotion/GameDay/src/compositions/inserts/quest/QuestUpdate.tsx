/**
 * QuestUpdate - EKS Quest fixed + New Quest announcement
 *
 * Quick announcement for quest status updates.
 * Duration: ~30 seconds (900 frames at 30fps)
 */

import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {
  BackgroundLayer,
  HexGridOverlay,
  GlassCard,
  AudioBadge,
} from "../../../components";
import {
  GD_DARK,
  GD_ORANGE,
  GD_GOLD,
  GD_GREEN,
} from "../../../design/colors";
import { TYPOGRAPHY } from "../../../design/typography";
import { EVENT_NAME } from "../../../../config/event";

export interface QuestUpdateProps {
  fixedQuestName?: string;
  newQuestName?: string;
}

const DEFAULT_PROPS: QuestUpdateProps = {
  fixedQuestName: "EKS Quest Fixed",
  newQuestName: "New Quest",
};

// -- Timing --
const TOTAL_FRAMES = 900;
const FADE_OUT = 60;

const StatusBadge: React.FC<{ label: string; color: string }> = ({ label, color }) => (
  <div style={{
    display: "inline-flex", alignItems: "center",
    padding: "4px 14px",
    borderRadius: 20,
    background: `${color}22`,
    border: `1.5px solid ${color}70`,
    fontSize: TYPOGRAPHY.label,
    fontWeight: 800,
    color: color,
    letterSpacing: 2,
    textTransform: "uppercase" as const,
    marginBottom: 12,
  }}>{label}</div>
);

export const QuestUpdate: React.FC<QuestUpdateProps> = ({
  fixedQuestName = DEFAULT_PROPS.fixedQuestName,
  newQuestName = DEFAULT_PROPS.newQuestName,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrySpring = spring({ frame, fps, config: { damping: 14, stiffness: 100 } });
  const exitOpacity = interpolate(
    frame,
    [TOTAL_FRAMES - FADE_OUT, TOTAL_FRAMES],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const card1Spring = spring({ frame: Math.max(0, frame - 15), fps, config: { damping: 12, stiffness: 80 } });
  const card2Spring = spring({ frame: Math.max(0, frame - 30), fps, config: { damping: 12, stiffness: 80 } });

  const pulse = interpolate(frame % 60, [0, 30, 60], [0.8, 1, 0.8], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ fontFamily: "'Inter', sans-serif", background: GD_DARK }}>
      <BackgroundLayer darken={0.75} />
      <HexGridOverlay />

      <AbsoluteFill style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 60,
        opacity: exitOpacity,
      }}>
        {/* Header */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          marginBottom: 40,
          opacity: entrySpring,
          transform: `translateY(${interpolate(entrySpring, [0, 1], [-30, 0])}px)`,
        }}>
          <div style={{
            width: 16,
            height: 16,
            borderRadius: "50%",
            background: GD_GOLD,
            boxShadow: `0 0 ${20 * pulse}px ${GD_GOLD}`,
            transform: `scale(${pulse})`,
          }} />
          <span style={{
            fontSize: TYPOGRAPHY.h3,
            fontWeight: 700,
            color: GD_GOLD,
            letterSpacing: 3,
            textTransform: "uppercase",
          }}>
            Quest Update
          </span>
          <div style={{
            width: 16,
            height: 16,
            borderRadius: "50%",
            background: GD_GOLD,
            boxShadow: `0 0 ${20 * pulse}px ${GD_GOLD}`,
            transform: `scale(${pulse})`,
          }} />
        </div>

        {/* Cards */}
        <div style={{
          display: "flex",
          gap: 32,
          maxWidth: 1100,
          alignItems: "stretch",
        }}>
          {/* Card 1: Fixed Quest */}
          <div style={{
            opacity: card1Spring,
            transform: `translateY(${interpolate(card1Spring, [0, 1], [40, 0])}px) scale(${interpolate(card1Spring, [0, 1], [0.9, 1])})`,
            flex: 1,
            display: "flex",
          }}>
            <GlassCard style={{
              padding: 32,
              border: `2px solid ${GD_GREEN}40`,
              width: 480,
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
            }}>
              <StatusBadge label="FIXED" color={GD_GREEN} />
              <span style={{
                fontSize: TYPOGRAPHY.h4,
                fontWeight: 700,
                color: GD_GREEN,
                marginBottom: 12,
                display: "block",
              }}>
                {fixedQuestName}
              </span>
              <p style={{
                fontSize: TYPOGRAPHY.body,
                color: "rgba(255,255,255,0.8)",
                lineHeight: 1.6,
                margin: "12px 0 0 0",
                flex: 1,
              }}>
                You can now complete this quest!
              </p>
              {/* Checkmark circle icon */}
              <div style={{ width: 64, height: 64, color: GD_GREEN, marginTop: 24 }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: "100%", height: "100%" }}>
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
              </div>
            </GlassCard>
          </div>

          {/* Card 2: New Quest */}
          <div style={{
            opacity: card2Spring,
            transform: `translateY(${interpolate(card2Spring, [0, 1], [40, 0])}px) scale(${interpolate(card2Spring, [0, 1], [0.9, 1])})`,
            flex: 1,
            display: "flex",
          }}>
            <GlassCard style={{
              padding: 32,
              border: `2px solid ${GD_ORANGE}40`,
              width: 480,
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
            }}>
              <StatusBadge label="NEW" color={GD_ORANGE} />
              <span style={{
                fontSize: TYPOGRAPHY.h4,
                fontWeight: 700,
                color: GD_ORANGE,
                marginBottom: 12,
                display: "block",
              }}>
                {newQuestName}
              </span>
              <p style={{
                fontSize: TYPOGRAPHY.body,
                color: "rgba(255,255,255,0.8)",
                lineHeight: 1.6,
                margin: "12px 0 0 0",
                flex: 1,
              }}>
                Check your quest list!
              </p>
              {/* Plus circle icon */}
              <div style={{ width: 64, height: 64, color: GD_ORANGE, marginTop: 24 }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: "100%", height: "100%" }}>
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" y1="8" x2="12" y2="16"/>
                  <line x1="8" y1="12" x2="16" y2="12"/>
                </svg>
              </div>
            </GlassCard>
          </div>
        </div>

        {/* Footer */}
        <div style={{
          marginTop: 40,
          opacity: interpolate(frame, [45, 75], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
        }}>
          <span style={{
            fontSize: TYPOGRAPHY.bodySmall,
            color: "rgba(255,255,255,0.5)",
            letterSpacing: 2,
          }}>
            {EVENT_NAME}
          </span>
        </div>
      </AbsoluteFill>

      <AudioBadge muted={false} />
    </AbsoluteFill>
  );
};

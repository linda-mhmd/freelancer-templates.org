/**
 * QuestHint - Gamemaster hint for stuck teams
 *
 * Orange = AWS gamemasters providing guidance.
 * Use when many teams are stuck on a quest and need a nudge
 * without giving away the full solution.
 * Duration: ~30 seconds (900 frames at 30fps)
 */

import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { BackgroundLayer, HexGridOverlay, GlassCard, AudioBadge } from "../../../components";
import { GD_DARK, GD_ORANGE } from "../../../design/colors";
import { TYPOGRAPHY } from "../../../design/typography";
import { EVENT_NAME } from "../../../../config/event";

export interface QuestHintProps {
  questName?: string;
  hintText?: string;
}

const DEFAULT_PROPS: QuestHintProps = {
  questName: "Quest Name",
  hintText: "Check your IAM permissions carefully. The service role may need additional trust policies.",
};

const TITLE = "QUEST HINT";
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

export const QuestHint: React.FC<QuestHintProps> = ({
  questName = DEFAULT_PROPS.questName,
  hintText = DEFAULT_PROPS.hintText,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrySpring = spring({ frame, fps, config: { damping: 14, stiffness: 100 } });
  const cardSpring = spring({ frame: Math.max(0, frame - 15), fps, config: { damping: 12, stiffness: 80 } });
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
        {/* Lightbulb icon */}
        <div style={{
          width: 72, height: 72, color: ACCENT_COLOR, marginBottom: 24,
          opacity: entrySpring,
          transform: `translateY(${interpolate(entrySpring, [0, 1], [-20, 0])}px)`,
        }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: "100%", height: "100%" }}>
            <line x1="9" y1="18" x2="15" y2="18"/>
            <line x1="10" y1="22" x2="14" y2="22"/>
            <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"/>
          </svg>
        </div>

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
            maxWidth: 700, textAlign: "center",
          }}>
            <StatusBadge label="From the Gamemasters" color={ACCENT_COLOR} />
            <div style={{
              fontSize: TYPOGRAPHY.caption, fontWeight: 700,
              color: "rgba(255,255,255,0.45)", letterSpacing: 2,
              textTransform: "uppercase", marginBottom: 20,
            }}>
              {questName}
            </div>
            <p style={{
              fontSize: TYPOGRAPHY.h5, color: "rgba(255,255,255,0.9)",
              lineHeight: 1.7, margin: 0, fontWeight: 400,
              fontStyle: "italic",
            }}>
              "{hintText}"
            </p>
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

/**
 * FirstCompletion - First team to complete a quest
 *
 * The "goal scored" moment of a GameDay. Show this the instant a team
 * becomes the first to finish a specific quest.
 * Duration: ~30 seconds (900 frames at 30fps)
 */

import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { BackgroundLayer, HexGridOverlay, GlassCard, AudioBadge } from "../../../components";
import { GD_DARK, GD_ACCENT } from "../../../design/colors";
import { TYPOGRAPHY } from "../../../design/typography";
import { EVENT_NAME } from "../../../../config/event";

export interface FirstCompletionProps {
  questName?: string;
  teamName?: string;
  teamGroup?: string;
}

const DEFAULT_PROPS: FirstCompletionProps = {
  questName: "Quest Name",
  teamName: "Team Name",
  teamGroup: "AWS User Group City",
};

const TOTAL_FRAMES = 900;
const FADE_OUT_START = 840;
const ACCENT_COLOR = GD_ACCENT;

const StatusBadge: React.FC<{ label: string; color: string }> = ({ label, color }) => (
  <div style={{
    display: "inline-flex", alignItems: "center",
    padding: "4px 14px", borderRadius: 20,
    background: `${color}22`, border: `1.5px solid ${color}70`,
    fontSize: TYPOGRAPHY.label, fontWeight: 800, color,
    letterSpacing: 2, textTransform: "uppercase" as const, marginBottom: 16,
  }}>{label}</div>
);

export const FirstCompletion: React.FC<FirstCompletionProps> = ({
  questName = DEFAULT_PROPS.questName,
  teamName = DEFAULT_PROPS.teamName,
  teamGroup = DEFAULT_PROPS.teamGroup,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrySpring = spring({ frame, fps, config: { damping: 14, stiffness: 100 } });
  const cardSpring = spring({ frame: Math.max(0, frame - 15), fps, config: { damping: 12, stiffness: 80 } });
  const pulse = interpolate(frame % 60, [0, 30, 60], [0.8, 1, 0.8], { extrapolateRight: "clamp" });
  const exitOpacity = interpolate(frame, [FADE_OUT_START, TOTAL_FRAMES], [1, 0], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  // Burst scale for the icon - punchy entry
  const iconScale = spring({ frame, fps, config: { damping: 8, stiffness: 200 } });

  return (
    <AbsoluteFill style={{ fontFamily: "'Inter', sans-serif", background: GD_DARK }}>
      <BackgroundLayer darken={0.75} />
      <HexGridOverlay />

      <AbsoluteFill style={{
        display: "flex", flexDirection: "column", justifyContent: "center",
        alignItems: "center", padding: 60, opacity: exitOpacity,
      }}>
        {/* Award / star icon - punchy scale-in */}
        <div style={{
          width: 80, height: 80, color: ACCENT_COLOR, marginBottom: 24,
          transform: `scale(${iconScale})`,
          opacity: entrySpring,
        }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: "100%", height: "100%" }}>
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
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
          }}>
            First Completion
          </span>
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
            textAlign: "center", maxWidth: 720,
          }}>
            <StatusBadge label="Achievement Unlocked" color={ACCENT_COLOR} />

            <div style={{
              fontSize: TYPOGRAPHY.caption, fontWeight: 600,
              color: "rgba(255,255,255,0.45)", letterSpacing: 2,
              textTransform: "uppercase", marginBottom: 10,
            }}>
              {questName}
            </div>

            <div style={{
              width: 48, height: 1,
              background: `${ACCENT_COLOR}40`,
              margin: "16px auto",
            }} />

            <div style={{
              fontSize: TYPOGRAPHY.h2, fontWeight: 800, color: ACCENT_COLOR, marginBottom: 8,
            }}>
              {teamName}
            </div>
            <div style={{
              fontSize: TYPOGRAPHY.body, color: "rgba(255,255,255,0.55)", marginBottom: 24,
            }}>
              {teamGroup}
            </div>

            <div style={{
              fontSize: TYPOGRAPHY.h5, color: "rgba(255,255,255,0.8)",
              fontWeight: 500, lineHeight: 1.5,
            }}>
              First team to complete this quest!
            </div>
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

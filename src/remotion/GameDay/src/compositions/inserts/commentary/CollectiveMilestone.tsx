/**
 * CollectiveMilestone - The crowd-wave moment
 *
 * "25 out of 57 teams have now completed Quest X."
 * This is about collective progress - not one team's achievement, but the field.
 * In live sports, this is the stat overlay: "73% possession", "45 laps completed".
 * Creates a sense of shared experience across all competing locations.
 * Duration: ~30 seconds (900 frames at 30fps)
 */

import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { BackgroundLayer, HexGridOverlay, GlassCard, AudioBadge } from "../../../components";
import { GD_DARK, GD_ACCENT } from "../../../design/colors";
import { TYPOGRAPHY } from "../../../design/typography";
import { EVENT_NAME } from "../../../../config/event";

export interface CollectiveMilestoneProps {
  questName?: string;
  completedCount?: number;
  totalCount?: number;
}

const DEFAULT_PROPS: CollectiveMilestoneProps = {
  questName: "Quest Name",
  completedCount: 25,
  totalCount: 57,
};

const TITLE = "QUEST MILESTONE";
const ACCENT_COLOR = GD_ACCENT;

const TOTAL_FRAMES = 900;
const FADE_OUT_START = 840;

export const CollectiveMilestone: React.FC<CollectiveMilestoneProps> = ({
  questName = DEFAULT_PROPS.questName,
  completedCount = DEFAULT_PROPS.completedCount,
  totalCount = DEFAULT_PROPS.totalCount,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const resolvedCompletedCount: number = completedCount ?? 25;
  const resolvedTotalCount: number = totalCount ?? 57;

  const entrySpring = spring({ frame, fps, config: { damping: 14, stiffness: 100 } });
  const cardSpring = spring({ frame: Math.max(0, frame - 15), fps, config: { damping: 12, stiffness: 80 } });
  const pulse = interpolate(frame % 60, [0, 30, 60], [0.8, 1, 0.8], { extrapolateRight: "clamp" });
  const exitOpacity = interpolate(frame, [FADE_OUT_START, TOTAL_FRAMES], [1, 0], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  // Animate the progress bar fill
  const barFill = interpolate(
    spring({ frame: Math.max(0, frame - 20), fps, config: { damping: 18, stiffness: 60 } }),
    [0, 1],
    [0, resolvedCompletedCount / resolvedTotalCount],
    { extrapolateRight: "clamp" }
  );

  const percentage = Math.round((resolvedCompletedCount / resolvedTotalCount) * 100);

  return (
    <AbsoluteFill style={{ fontFamily: "'Inter', sans-serif", background: GD_DARK }}>
      <BackgroundLayer darken={0.75} />
      <HexGridOverlay />

      <AbsoluteFill style={{
        display: "flex", flexDirection: "column", justifyContent: "center",
        alignItems: "center", padding: 60, opacity: exitOpacity,
      }}>
        {/* Users / crowd icon */}
        <div style={{
          width: 72, height: 72, color: ACCENT_COLOR, marginBottom: 24,
          opacity: entrySpring,
          transform: `translateY(${interpolate(entrySpring, [0, 1], [-20, 0])}px)`,
        }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: "100%", height: "100%" }}>
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
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
            textAlign: "center", minWidth: 600, maxWidth: 740,
          }}>
            {/* Quest label */}
            <div style={{
              fontSize: TYPOGRAPHY.caption, fontWeight: 600,
              color: "rgba(255,255,255,0.4)", letterSpacing: 2,
              textTransform: "uppercase", marginBottom: 20,
            }}>
              {questName}
            </div>

            {/* Big number */}
            <div style={{
              display: "flex", alignItems: "baseline", justifyContent: "center",
              gap: 8, marginBottom: 8,
            }}>
              <span style={{
                fontSize: 80, fontWeight: 900, color: ACCENT_COLOR,
                lineHeight: 1, letterSpacing: -2,
              }}>
                {resolvedCompletedCount}
              </span>
              <span style={{
                fontSize: TYPOGRAPHY.h4, color: "rgba(255,255,255,0.35)", fontWeight: 600,
              }}>
                / {resolvedTotalCount}
              </span>
            </div>

            <div style={{
              fontSize: TYPOGRAPHY.body, color: "rgba(255,255,255,0.6)",
              marginBottom: 32, fontWeight: 500,
            }}>
              teams have completed this quest
            </div>

            {/* Progress bar */}
            <div style={{
              width: "100%", height: 8, borderRadius: 4,
              background: "rgba(255,255,255,0.08)",
              overflow: "hidden",
            }}>
              <div style={{
                width: `${barFill * 100}%`,
                height: "100%",
                borderRadius: 4,
                background: `linear-gradient(90deg, ${ACCENT_COLOR}99, ${ACCENT_COLOR})`,
                boxShadow: `0 0 12px ${ACCENT_COLOR}80`,
                transition: "width 0.1s",
              }} />
            </div>
            <div style={{
              marginTop: 10,
              fontSize: TYPOGRAPHY.caption,
              color: "rgba(255,255,255,0.35)",
              textAlign: "right",
            }}>
              {percentage}%
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

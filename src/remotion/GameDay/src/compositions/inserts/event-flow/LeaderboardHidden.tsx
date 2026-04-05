/**
 * LeaderboardHidden - Scores go dark for the final stretch
 *
 * Real AWS GameDay mechanic: scores are hidden in the final phase so teams
 * have to commit to their strategy without knowing exactly where they stand.
 * From a broadcast perspective, this is the "blackout before the finale" -
 * it resets tension and forces teams to play to win, not play to protect.
 * Duration: ~30 seconds (900 frames at 30fps)
 */

import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { BackgroundLayer, HexGridOverlay, GlassCard, AudioBadge } from "../../../components";
import { GD_DARK, GD_GOLD } from "../../../design/colors";
import { TYPOGRAPHY } from "../../../design/typography";
import { EVENT_NAME } from "../../../../config/event";

const TITLE = "LEADERBOARD HIDDEN";
const MESSAGE = "Scores are now hidden for the final stretch. Play to win - you won't see standings again until the results are revealed.";
const ACCENT_COLOR = GD_GOLD;

const TOTAL_FRAMES = 900;
const FADE_OUT_START = 840;

export const LeaderboardHidden: React.FC = () => {
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
        {/* Eye-off icon */}
        <div style={{
          width: 72, height: 72, color: ACCENT_COLOR, marginBottom: 24,
          opacity: entrySpring,
          transform: `translateY(${interpolate(entrySpring, [0, 1], [-20, 0])}px)`,
        }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: "100%", height: "100%" }}>
            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
            <line x1="1" y1="1" x2="23" y2="23"/>
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
            padding: 48, border: `2px solid ${ACCENT_COLOR}40`, maxWidth: 700, textAlign: "center",
          }}>
            <p style={{
              fontSize: TYPOGRAPHY.h5, color: "rgba(255,255,255,0.9)",
              lineHeight: 1.6, margin: 0, fontWeight: 500,
            }}>{MESSAGE}</p>
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

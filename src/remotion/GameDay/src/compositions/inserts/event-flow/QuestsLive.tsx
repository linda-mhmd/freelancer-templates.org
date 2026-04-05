/**
 * QuestsLive - The kickoff moment
 *
 * The "whistle blows" insert. Show this the instant quests become accessible.
 * This is the emotional beat that starts the competition - equivalent to
 * "the game is on!" in sports commentary.
 * Duration: ~30 seconds (900 frames at 30fps)
 */

import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { BackgroundLayer, HexGridOverlay, GlassCard, AudioBadge } from "../../../components";
import { GD_DARK, GD_ORANGE } from "../../../design/colors";
import { TYPOGRAPHY } from "../../../design/typography";
import { EVENT_NAME } from "../../../../config/event";

const TITLE = "QUESTS ARE LIVE";
const MESSAGE = "All quests are now available. Log in, form your team, and give it everything you have. Good luck!";
const ACCENT_COLOR = GD_ORANGE;

const TOTAL_FRAMES = 900;
const FADE_OUT_START = 840;

export const QuestsLive: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrySpring = spring({ frame, fps, config: { damping: 14, stiffness: 100 } });
  const cardSpring = spring({ frame: Math.max(0, frame - 15), fps, config: { damping: 12, stiffness: 80 } });
  // Punchy scale-in for the icon - like a starting pistol
  const iconSpring = spring({ frame, fps, config: { damping: 7, stiffness: 220 } });
  const pulse = interpolate(frame % 60, [0, 30, 60], [0.9, 1.05, 0.9], { extrapolateRight: "clamp" });
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
        {/* Rocket / launch icon */}
        <div style={{
          width: 80, height: 80, color: ACCENT_COLOR, marginBottom: 24,
          transform: `scale(${iconSpring})`,
          opacity: entrySpring,
        }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: "100%", height: "100%" }}>
            <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
            <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
            <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/>
            <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
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
            boxShadow: `0 0 ${24 * pulse}px ${ACCENT_COLOR}`,
            transform: `scale(${pulse})`,
          }} />
          <span style={{
            fontSize: TYPOGRAPHY.h3, fontWeight: 700, color: ACCENT_COLOR,
            letterSpacing: 3, textTransform: "uppercase",
          }}>{TITLE}</span>
          <div style={{
            width: 16, height: 16, borderRadius: "50%", background: ACCENT_COLOR,
            boxShadow: `0 0 ${24 * pulse}px ${ACCENT_COLOR}`,
            transform: `scale(${pulse})`,
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

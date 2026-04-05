/**
 * StreamInterruption
 *
 * Two-card insert for simultaneous community + environment updates.
 * Card 1 (violet)  -  community / team-facing information
 * Card 2 (orange)  -  AWS environment / technical status
 *
 * Duration: 30 seconds (900 frames at 30fps)
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
  GD_VIOLET,
  GD_ACCENT,
  GD_ORANGE,
} from "../../../design/colors";
import { TYPOGRAPHY } from "../../../design/typography";
import { EVENT_NAME } from "../../../../config/event";

const TOTAL_FRAMES = 900;
const FADE_OUT_START = 840;

// ── Inline SVG icons  -  no emojis ──────────────────────────────────────────────

const IconUsers: React.FC<{ size: number; color: string }> = ({ size, color }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const IconWrench: React.FC<{ size: number; color: string }> = ({ size, color }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
  </svg>
);

const IconArrowRight: React.FC<{ size: number; color: string }> = ({ size, color }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const IconClock: React.FC<{ size: number; color: string }> = ({ size, color }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

// ── Component ──────────────────────────────────────────────────────────────────

export const StreamInterruption: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrySpring = spring({ frame, fps, config: { damping: 14, stiffness: 100 } });
  const card1Spring = spring({ frame: Math.max(0, frame - 15), fps, config: { damping: 12, stiffness: 80 } });
  const card2Spring = spring({ frame: Math.max(0, frame - 30), fps, config: { damping: 12, stiffness: 80 } });
  const pulse = interpolate(frame % 60, [0, 30, 60], [0.8, 1, 0.8], { extrapolateRight: "clamp" });
  const exitOpacity = interpolate(frame, [FADE_OUT_START, TOTAL_FRAMES], [1, 0], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ fontFamily: "'Inter', sans-serif", background: GD_DARK }}>
      <BackgroundLayer darken={0.75} />
      <HexGridOverlay />

      <AbsoluteFill style={{
        display: "flex", flexDirection: "column",
        justifyContent: "center", alignItems: "center",
        padding: 60, opacity: exitOpacity,
      }}>

        {/* Header */}
        <div style={{
          display: "flex", alignItems: "center", gap: 16, marginBottom: 40,
          opacity: entrySpring,
          transform: `translateY(${interpolate(entrySpring, [0, 1], [-30, 0])}px)`,
        }}>
          <div style={{
            width: 14, height: 14, borderRadius: "50%",
            background: GD_ORANGE,
            boxShadow: `0 0 ${18 * pulse}px ${GD_ORANGE}`,
            transform: `scale(${pulse})`,
          }} />
          <span style={{
            fontSize: TYPOGRAPHY.h3, fontWeight: 700, color: GD_ORANGE,
            letterSpacing: 4, textTransform: "uppercase",
          }}>
            Quick Update
          </span>
          <div style={{
            width: 14, height: 14, borderRadius: "50%",
            background: GD_ORANGE,
            boxShadow: `0 0 ${18 * pulse}px ${GD_ORANGE}`,
            transform: `scale(${pulse})`,
          }} />
        </div>

        {/* Cards */}
        <div style={{ display: "flex", gap: 28, width: "100%", maxWidth: 1080 }}>

          {/* Card 1  -  Community / Team (violet) */}
          <div style={{
            flex: 1,
            opacity: card1Spring,
            transform: `translateY(${interpolate(card1Spring, [0, 1], [40, 0])}px) scale(${interpolate(card1Spring, [0, 1], [0.95, 1])})`,
          }}>
            <GlassCard style={{
              padding: 32, height: "100%",
              border: `1.5px solid ${GD_VIOLET}60`,
              background: `linear-gradient(135deg, ${GD_VIOLET}12, ${GD_DARK}90)`,
              display: "flex", flexDirection: "column",
            }}>
              {/* Card header */}
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                <IconUsers size={28} color={GD_VIOLET} />
                <span style={{
                  fontSize: TYPOGRAPHY.h5, fontWeight: 700, color: GD_VIOLET,
                }}>
                  Set Your Team Name
                </span>
              </div>

              {/* Card body */}
              <p style={{
                fontSize: TYPOGRAPHY.body, color: "rgba(255,255,255,0.85)",
                lineHeight: 1.65, margin: 0, flex: 1,
              }}>
                Make sure your{" "}
                <span style={{ color: GD_ACCENT, fontWeight: 700 }}>team name is set</span>
                {" "}in the GameDay console so you can be seen on the leaderboard.
              </p>

              {/* Tip row  -  bottom aligned */}
              <div style={{
                marginTop: 20,
                display: "flex", alignItems: "center", gap: 10,
                padding: "10px 14px",
                background: `${GD_VIOLET}18`,
                borderRadius: 8,
                border: `1px solid ${GD_VIOLET}35`,
              }}>
                <IconArrowRight size={16} color={GD_ACCENT} />
                <span style={{ fontSize: TYPOGRAPHY.bodySmall, color: "rgba(255,255,255,0.75)" }}>
                  Go to{" "}
                  <span style={{ color: GD_ACCENT, fontWeight: 600 }}>Team Settings</span>
                  {" "}and edit your team name
                </span>
              </div>
            </GlassCard>
          </div>

          {/* Card 2  -  AWS Environment (orange) */}
          <div style={{
            flex: 1,
            opacity: card2Spring,
            transform: `translateY(${interpolate(card2Spring, [0, 1], [40, 0])}px) scale(${interpolate(card2Spring, [0, 1], [0.95, 1])})`,
          }}>
            <GlassCard style={{
              padding: 32, height: "100%",
              border: `1.5px solid ${GD_ORANGE}60`,
              background: `linear-gradient(135deg, ${GD_ORANGE}10, ${GD_DARK}90)`,
              display: "flex", flexDirection: "column",
            }}>
              {/* Card header */}
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                <IconWrench size={28} color={GD_ORANGE} />
                <span style={{
                  fontSize: TYPOGRAPHY.h5, fontWeight: 700, color: GD_ORANGE,
                }}>
                  Environment Update
                </span>
              </div>

              {/* Card body */}
              <p style={{
                fontSize: TYPOGRAPHY.body, color: "rgba(255,255,255,0.85)",
                lineHeight: 1.65, margin: 0, flex: 1,
              }}>
                One issue has been{" "}
                <span style={{ color: GD_ORANGE, fontWeight: 700 }}>fixed</span>
                . Our Gamemasters are working on the remaining fixes.
              </p>

              {/* Status row  -  bottom aligned via flex */}
              <div style={{
                marginTop: 20,
                display: "flex", alignItems: "center", gap: 10,
                padding: "10px 14px",
                background: `${GD_ORANGE}18`,
                borderRadius: 8,
                border: `1px solid ${GD_ORANGE}35`,
              }}>
                <IconClock size={16} color={GD_ORANGE} />
                <span style={{ fontSize: TYPOGRAPHY.bodySmall, color: "rgba(255,255,255,0.75)" }}>
                  Stay tuned  -  we will update you soon
                </span>
              </div>
            </GlassCard>
          </div>

        </div>

        {/* Footer */}
        <div style={{
          marginTop: 36,
          opacity: interpolate(frame, [45, 75], [0, 1], {
            extrapolateLeft: "clamp", extrapolateRight: "clamp",
          }),
        }}>
          <span style={{
            fontSize: TYPOGRAPHY.bodySmall,
            color: "rgba(255,255,255,0.4)",
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

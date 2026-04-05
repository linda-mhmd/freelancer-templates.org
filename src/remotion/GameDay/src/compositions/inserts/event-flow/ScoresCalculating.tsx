/**
 * ScoresCalculating - Final scores are being tallied
 *
 * Show this after gameplay ends, while waiting for the final results.
 * Builds suspense between the end of quests and the winner announcement.
 * Duration: ~30 seconds (900 frames at 30fps)
 */

import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { BackgroundLayer, HexGridOverlay, GlassCard, AudioBadge } from "../../../components";
import { GD_DARK, GD_GOLD } from "../../../design/colors";
import { TYPOGRAPHY } from "../../../design/typography";
import { EVENT_NAME } from "../../../../config/event";

const TITLE = "SCORES CALCULATING";
const MESSAGE = "Final scores are being tallied. The results will be announced shortly. Stand by...";
const ACCENT_COLOR = GD_GOLD;

const TOTAL_FRAMES = 900;
const FADE_OUT_START = 840;

export const ScoresCalculating: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrySpring = spring({ frame, fps, config: { damping: 14, stiffness: 100 } });
  const cardSpring = spring({ frame: Math.max(0, frame - 15), fps, config: { damping: 12, stiffness: 80 } });
  const pulse = interpolate(frame % 60, [0, 30, 60], [0.8, 1, 0.8], { extrapolateRight: "clamp" });
  const exitOpacity = interpolate(frame, [FADE_OUT_START, TOTAL_FRAMES], [1, 0], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  // Three animated dots cycling at different offsets
  const dot1 = interpolate(frame % 90, [0, 30, 60, 90], [0.3, 1, 0.3, 0.3], { extrapolateRight: "clamp" });
  const dot2 = interpolate(frame % 90, [0, 15, 45, 75, 90], [0.3, 0.3, 1, 0.3, 0.3], { extrapolateRight: "clamp" });
  const dot3 = interpolate(frame % 90, [0, 30, 60, 90], [0.3, 0.3, 0.3, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ fontFamily: "'Inter', sans-serif", background: GD_DARK }}>
      <BackgroundLayer darken={0.75} />
      <HexGridOverlay />

      <AbsoluteFill style={{
        display: "flex", flexDirection: "column", justifyContent: "center",
        alignItems: "center", padding: 60, opacity: exitOpacity,
      }}>
        {/* Hourglass icon */}
        <div style={{
          width: 72, height: 72, color: ACCENT_COLOR, marginBottom: 24,
          opacity: entrySpring,
          transform: `translateY(${interpolate(entrySpring, [0, 1], [-20, 0])}px)`,
        }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: "100%", height: "100%" }}>
            <path d="M5 22h14"/><path d="M5 2h14"/>
            <path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22"/>
            <path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2"/>
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
              lineHeight: 1.6, margin: "0 0 32px 0", fontWeight: 500,
            }}>{MESSAGE}</p>

            {/* Animated dots */}
            <div style={{ display: "flex", justifyContent: "center", gap: 12 }}>
              {[dot1, dot2, dot3].map((opacity, i) => (
                <div key={i} style={{
                  width: 12, height: 12, borderRadius: "50%",
                  background: ACCENT_COLOR,
                  opacity,
                  boxShadow: `0 0 10px ${ACCENT_COLOR}`,
                }} />
              ))}
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

import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { BackgroundLayer, HexGridOverlay, GlassCard, AudioBadge } from "../../components";
import { GD_DARK, GD_ORANGE, GD_GOLD, GD_VIOLET } from "../../design/colors";
import { TYPOGRAPHY } from "../../design/typography";
import { springConfig } from "../../design/animations";
import { STREAM_FPS, EVENT_NAME } from "../../../config/event";

// ─── CUSTOMIZE THESE 3 VALUES ─────────────────────────────────────────────────
const TITLE = "Your Title Here";
const MESSAGE = "Your message here. Keep it short  -  this is shown for 30 seconds.";
const ACCENT: "orange" | "gold" | "violet" = "orange";
// ──────────────────────────────────────────────────────────────────────────────

const ACCENT_COLOR = { orange: GD_ORANGE, gold: GD_GOLD, violet: GD_VIOLET }[ACCENT];
const DURATION_FRAMES = 900; // 30 seconds at 30fps  -  match this in Root.tsx
const EXIT_FRAME = 840;      // fade-to-black starts 2 seconds before end

export const InsertTemplate: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entry animation
  const entrySpring = spring({ frame, fps, config: springConfig.entry });

  // Fade out near the end
  const exitOpacity = interpolate(
    frame,
    [EXIT_FRAME, DURATION_FRAMES],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Staggered card entry
  const cardSpring = spring({
    frame: Math.max(0, frame - 15),
    fps,
    config: { damping: 12, stiffness: 80 },
  });

  // Pulsing attention dot
  const pulse = interpolate(frame % 60, [0, 30, 60], [0.8, 1, 0.8], {
    extrapolateRight: "clamp",
  });

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
        {/* Header with pulsing dot */}
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
            background: ACCENT_COLOR,
            boxShadow: `0 0 ${20 * pulse}px ${ACCENT_COLOR}`,
            transform: `scale(${pulse})`,
          }} />
          <span style={{
            fontSize: TYPOGRAPHY.h3,
            fontWeight: 700,
            color: ACCENT_COLOR,
            letterSpacing: 3,
            textTransform: "uppercase",
          }}>
            {TITLE}
          </span>
          <div style={{
            width: 16,
            height: 16,
            borderRadius: "50%",
            background: ACCENT_COLOR,
            boxShadow: `0 0 ${20 * pulse}px ${ACCENT_COLOR}`,
            transform: `scale(${pulse})`,
          }} />
        </div>

        {/* Message card */}
        <div style={{
          opacity: cardSpring,
          transform: `translateY(${interpolate(cardSpring, [0, 1], [40, 0])}px)`,
        }}>
          <GlassCard style={{
            padding: 48,
            border: `2px solid ${ACCENT_COLOR}40`,
            maxWidth: 800,
            textAlign: "center",
          }}>
            <p style={{
              fontSize: TYPOGRAPHY.h5,
              color: "rgba(255,255,255,0.9)",
              lineHeight: 1.6,
              margin: 0,
              fontWeight: 500,
            }}>
              {MESSAGE}
            </p>
          </GlassCard>
        </div>

        {/* Footer */}
        <div style={{
          marginTop: 40,
          opacity: interpolate(frame, [45, 75], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
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

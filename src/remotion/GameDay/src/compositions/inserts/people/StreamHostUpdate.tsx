/**
 * StreamHostUpdate - Announcement from the stream host
 *
 * Set streamHostName to match an entry in the ORGANIZERS config.
 * The face photo, role, and user group are pulled automatically.
 * Duration: ~30 seconds (900 frames at 30fps)
 */

import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Img,
  staticFile,
} from "remotion";
import {
  BackgroundLayer,
  HexGridOverlay,
  GlassCard,
  AudioBadge,
} from "../../../components";
import { GD_DARK, GD_VIOLET } from "../../../design/colors";
import { TYPOGRAPHY } from "../../../design/typography";
import { ORGANIZERS, AWS_SUPPORTERS, getOrganizerRole } from "../../../../config/participants";

const ALL_PEOPLE = [...ORGANIZERS, ...AWS_SUPPORTERS];
import { EVENT_NAME } from "../../../../config/event";

export interface StreamHostUpdateProps {
  message?: string;
}

const DEFAULT_PROPS: StreamHostUpdateProps = {
  message: "has an update for you",
};

const TOTAL_FRAMES = 900;
const FADE_OUT = 60;
const ACCENT_COLOR = GD_VIOLET;

export const StreamHostUpdate: React.FC<StreamHostUpdateProps> = ({
  message = DEFAULT_PROPS.message,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const HOST = ALL_PEOPLE.find((o) => o.streamRole === "host");

  const entrySpring = spring({ frame, fps, config: { damping: 14, stiffness: 100 } });
  const cardSpring = spring({ frame: Math.max(0, frame - 15), fps, config: { damping: 12, stiffness: 80 } });
  const exitOpacity = interpolate(
    frame,
    [TOTAL_FRAMES - FADE_OUT, TOTAL_FRAMES],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
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
        {/* Video/broadcast icon */}
        <div style={{
          width: 72, height: 72, color: ACCENT_COLOR, marginBottom: 24,
          opacity: entrySpring,
          transform: `translateY(${interpolate(entrySpring, [0, 1], [-20, 0])}px)`,
        }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: "100%", height: "100%" }}>
            <path d="M23 7l-7 5 7 5V7z"/>
            <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
          </svg>
        </div>

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
            width: 16, height: 16, borderRadius: "50%", background: ACCENT_COLOR,
            boxShadow: `0 0 ${20 * pulse}px ${ACCENT_COLOR}`, transform: `scale(${pulse})`,
          }} />
          <span style={{
            fontSize: TYPOGRAPHY.h3, fontWeight: 700, color: ACCENT_COLOR,
            letterSpacing: 3, textTransform: "uppercase",
          }}>
            From Your Stream Host
          </span>
          <div style={{
            width: 16, height: 16, borderRadius: "50%", background: ACCENT_COLOR,
            boxShadow: `0 0 ${20 * pulse}px ${ACCENT_COLOR}`, transform: `scale(${pulse})`,
          }} />
        </div>

        {/* Card */}
        <div style={{
          opacity: cardSpring,
          transform: `translateY(${interpolate(cardSpring, [0, 1], [40, 0])}px)`,
        }}>
          <GlassCard style={{
            padding: "40px 56px",
            border: `2px solid ${ACCENT_COLOR}40`,
            textAlign: "center",
            maxWidth: 700,
          }}>
            {HOST && (
              <>
                <div style={{
                  width: 112, height: 112,
                  borderRadius: "50%",
                  overflow: "hidden",
                  border: `3px solid ${ACCENT_COLOR}`,
                  boxShadow: `0 0 24px ${ACCENT_COLOR}50`,
                  margin: "0 auto 20px",
                }}>
                  <Img
                    src={staticFile(HOST.face)}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>
                <div style={{
                  fontSize: TYPOGRAPHY.h3,
                  fontWeight: 800,
                  color: ACCENT_COLOR,
                  marginBottom: 6,
                }}>
                  {HOST.name}
                </div>
                <div style={{
                  fontSize: TYPOGRAPHY.caption,
                  color: "rgba(255,255,255,0.45)",
                  letterSpacing: 1,
                  marginBottom: 28,
                }}>
                  {HOST && getOrganizerRole(HOST)}
                </div>
                <div style={{
                  width: 60, height: 1,
                  background: `${ACCENT_COLOR}40`,
                  margin: "0 auto 24px",
                }} />
              </>
            )}
            <div style={{
              fontSize: TYPOGRAPHY.h5,
              color: "rgba(255,255,255,0.85)",
              lineHeight: 1.5,
            }}>
              {message}
            </div>
          </GlassCard>
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

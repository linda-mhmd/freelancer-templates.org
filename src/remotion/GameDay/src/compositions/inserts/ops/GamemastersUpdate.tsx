/**
 * GamemastersUpdate - Important announcement from the Gamemasters
 *
 * Pulls gamemaster names, roles, and face photos from AWS_SUPPORTERS config.
 * Only people with country === "Gamemaster" are shown.
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
import { GD_DARK, GD_ORANGE } from "../../../design/colors";
import { TYPOGRAPHY } from "../../../design/typography";
import { AWS_SUPPORTERS, ORGANIZERS, getOrganizerRole } from "../../../../config/participants";

const ALL_PEOPLE = [...ORGANIZERS, ...AWS_SUPPORTERS];
import { EVENT_NAME } from "../../../../config/event";

export interface GamemastersUpdateProps {
  message?: string;
}

const DEFAULT_PROPS: GamemastersUpdateProps = {
  message: "have an important announcement",
};

const GAMEMASTERS = ALL_PEOPLE.filter((p) => p.streamRole === "gamemaster");

const TOTAL_FRAMES = 900;
const FADE_OUT = 60;
const ACCENT_COLOR = GD_ORANGE;

export const GamemastersUpdate: React.FC<GamemastersUpdateProps> = ({
  message = DEFAULT_PROPS.message,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

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
        {/* Microphone icon */}
        <div style={{
          width: 72, height: 72, color: ACCENT_COLOR, marginBottom: 24,
          opacity: entrySpring,
          transform: `translateY(${interpolate(entrySpring, [0, 1], [-20, 0])}px)`,
        }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: "100%", height: "100%" }}>
            <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
            <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
            <line x1="12" y1="19" x2="12" y2="23"/>
            <line x1="8" y1="23" x2="16" y2="23"/>
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
            Gamemasters Update
          </span>
          <div style={{
            width: 16, height: 16, borderRadius: "50%", background: ACCENT_COLOR,
            boxShadow: `0 0 ${20 * pulse}px ${ACCENT_COLOR}`, transform: `scale(${pulse})`,
          }} />
        </div>

        {/* Main card */}
        <div style={{
          opacity: cardSpring,
          transform: `translateY(${interpolate(cardSpring, [0, 1], [40, 0])}px)`,
        }}>
          <GlassCard style={{
            padding: "40px 56px",
            border: `2px solid ${ACCENT_COLOR}40`,
            textAlign: "center",
            maxWidth: 800,
          }}>
            <div style={{
              fontSize: TYPOGRAPHY.caption,
              fontWeight: 600,
              color: "rgba(255,255,255,0.45)",
              letterSpacing: 3,
              textTransform: "uppercase",
              marginBottom: 32,
            }}>
              Your Gamemasters
            </div>

            {/* Gamemaster avatars */}
            <div style={{
              display: "flex",
              justifyContent: "center",
              gap: 56,
              marginBottom: 32,
            }}>
              {GAMEMASTERS.map((gm) => (
                <div key={gm.name} style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 14,
                }}>
                  <div style={{
                    width: 96, height: 96,
                    borderRadius: "50%",
                    overflow: "hidden",
                    border: `3px solid ${ACCENT_COLOR}`,
                    boxShadow: `0 0 20px ${ACCENT_COLOR}40`,
                    flexShrink: 0,
                  }}>
                    <Img
                      src={staticFile(gm.face)}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </div>
                  <div>
                    <div style={{
                      fontSize: TYPOGRAPHY.h4,
                      fontWeight: 800,
                      color: ACCENT_COLOR,
                      marginBottom: 4,
                    }}>
                      {gm.name}
                    </div>
                    <div style={{
                      fontSize: TYPOGRAPHY.caption,
                      color: "rgba(255,255,255,0.45)",
                      lineHeight: 1.4,
                    }}>
                      {getOrganizerRole(gm)}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{
              width: 60, height: 1,
              background: `${ACCENT_COLOR}40`,
              margin: "0 auto 24px",
            }} />

            <div style={{
              fontSize: TYPOGRAPHY.h5,
              color: "rgba(255,255,255,0.8)",
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

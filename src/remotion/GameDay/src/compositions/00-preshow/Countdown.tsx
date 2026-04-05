import React from "react";
import {
  AbsoluteFill,
  interpolate,
  Sequence,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {
  BackgroundLayer,
  HexGridOverlay,
  GlassCard,
  AudioBadge,
} from "../../components";
import {
  GD_DARK,
  GD_VIOLET,
  GD_PINK,
  GD_ACCENT,
  GD_ORANGE,
  GD_GOLD,
} from "../../design/colors";
import { TYPOGRAPHY } from "../../design/typography";
import { springConfig } from "../../design/animations";
import {
  calculateCountdown,
  formatTime,
  staggeredEntry,
} from "../../utils/timing";
import {
  STREAM_START_OFFSET_MINUTES as STREAM_START,
  GAME_START_OFFSET_MINUTES as GAME_START,
  EVENT_EDITION,
  EDITION_LABEL,
  EVENT_DATE,
} from "../../../config/event";

const [_cy, _cm, _cd] = EVENT_DATE.split("-").map(Number);
const _countdownDate = new Date(_cy, _cm - 1, _cd);
const EVENT_DATE_DISPLAY = _countdownDate.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

// ── Audio Cue Banner Visibility ──
export function isAudioCueBannerVisible(frame: number): boolean {
  return frame >= 14400;
}

// ── Schedule Data (relative durations only  -  no absolute times due to 4+ timezones) ──
const SCHEDULE_PHASES = [
  { label: "Pre-Show", time: "30 min", color: GD_ACCENT },
  { label: "Introductions", time: "30 min", color: GD_VIOLET },
  { label: "Gameplay", time: "2 hours", color: GD_PINK },
  { label: "Closing", time: "15 min", color: GD_GOLD },
];

// ── Pre-Show Composition ──
interface PreShowProps extends Record<string, unknown> {
  loopIteration?: number;
}

export const Countdown: React.FC<PreShowProps> = ({
  loopIteration = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Clamp loopIteration to [0, 2], default to 0 for invalid values
  const clampedLoop =
    typeof loopIteration === "number" &&
    Number.isFinite(loopIteration) &&
    loopIteration >= 0 &&
    loopIteration <= 2
      ? Math.floor(loopIteration)
      : 0;

  // ── Countdowns ──
  const streamCountdown = calculateCountdown(
    frame,
    clampedLoop * 10,
    STREAM_START,
    fps,
  );
  const gameCountdown = calculateCountdown(
    frame,
    clampedLoop * 10,
    GAME_START,
    fps,
  );

  // ── Staggered Spring Entries ──
  const titleEntry = spring({
    frame: frame - staggeredEntry(0, 0),
    fps,
    config: springConfig.entry,
  });
  const streamTimerEntry = spring({
    frame: frame - staggeredEntry(0, 1),
    fps,
    config: springConfig.entry,
  });
  const gameTimerEntry = spring({
    frame: frame - staggeredEntry(0, 2),
    fps,
    config: springConfig.entry,
  });
  const scheduleEntry = spring({
    frame: frame - staggeredEntry(0, 3),
    fps,
    config: springConfig.entry,
  });

  // ── Audio Cue Banner ──
  const showAudioCue = isAudioCueBannerVisible(frame);
  const audioCueEntry = showAudioCue
    ? spring({
        frame: frame - 14400,
        fps,
        config: springConfig.entry,
      })
    : 0;
  const audioCuePulse = showAudioCue
    ? interpolate(frame % 60, [0, 30, 60], [1, 1.03, 1], {
        extrapolateRight: "clamp",
      })
    : 1;

  // ── Countdown pulse ──
  const timerPulse = interpolate(frame % 60, [0, 30, 60], [1, 1.02, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        fontFamily: "'Inter', sans-serif",
        background: GD_DARK,
      }}
    >
      {/* Layer 1: Background */}
      <BackgroundLayer darken={0.6} />
      <HexGridOverlay />

      {/* Layer 2: Audio Badge */}
      <AudioBadge muted />

      {/* Layer 3: Event Title */}
      <div
        style={{
          position: "absolute",
          top: 60,
          left: 0,
          right: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          opacity: titleEntry,
          transform: `translateY(${interpolate(titleEntry, [0, 1], [30, 0])}px)`,
        }}
      >
        <div
          style={{
            fontSize: TYPOGRAPHY.bodySmall,
            fontWeight: 700,
            color: GD_ACCENT,
            letterSpacing: 4,
            textTransform: "uppercase",
            marginBottom: 12,
          }}
        >
          AWS Community
        </div>
        <div
          style={{
            fontSize: TYPOGRAPHY.timerSmall,
            fontWeight: 900,
            letterSpacing: 4,
            textTransform: "uppercase",
            background: `linear-gradient(135deg, #ffffff 0%, ${GD_ACCENT} 50%, ${GD_PINK} 100%)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          GameDay Europe
        </div>
        <div
          style={{
            fontSize: TYPOGRAPHY.caption,
            fontWeight: 600,
            color: "#94a3b8",
            letterSpacing: 3,
            marginTop: 8,
          }}
        >
          {`${EVENT_EDITION} · ${EDITION_LABEL}`}
        </div>
      </div>

      {/* Layer 4: Countdown Timers */}
      <div
        style={{
          position: "absolute",
          top: 220,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 80,
        }}
      >
        {/* Stream Start Countdown */}
        <div
          style={{
            textAlign: "center",
            opacity: streamTimerEntry,
            transform: `translateY(${interpolate(streamTimerEntry, [0, 1], [20, 0])}px) scale(${timerPulse})`,
          }}
        >
          <GlassCard
            style={{
              padding: "24px 40px",
              borderTop: `3px solid ${GD_PINK}60`,
            }}
          >
            <div
              style={{
                fontSize: TYPOGRAPHY.captionSmall,
                fontWeight: 700,
                color: GD_PINK,
                letterSpacing: 3,
                textTransform: "uppercase",
                marginBottom: 8,
              }}
            >
              Stream Starts In
            </div>
            <div
              style={{
                fontSize: TYPOGRAPHY.timer,
                fontWeight: 900,
                color: GD_PINK,
                fontFamily: "'Inter', monospace",
                letterSpacing: 4,
                textShadow: `0 0 40px ${GD_PINK}60`,
              }}
            >
              {formatTime(streamCountdown)}
            </div>
          </GlassCard>
        </div>

        {/* Game Start Countdown */}
        <div
          style={{
            textAlign: "center",
            opacity: gameTimerEntry,
            transform: `translateY(${interpolate(gameTimerEntry, [0, 1], [20, 0])}px) scale(${timerPulse})`,
          }}
        >
          <GlassCard
            style={{
              padding: "24px 40px",
              borderTop: `3px solid ${GD_VIOLET}60`,
            }}
          >
            <div
              style={{
                fontSize: TYPOGRAPHY.captionSmall,
                fontWeight: 700,
                color: GD_ACCENT,
                letterSpacing: 3,
                textTransform: "uppercase",
                marginBottom: 8,
              }}
            >
              GameDay Countdown
            </div>
            <div
              style={{
                fontSize: TYPOGRAPHY.timer,
                fontWeight: 900,
                color: "white",
                fontFamily: "'Inter', monospace",
                letterSpacing: 4,
                textShadow: `0 0 40px ${GD_VIOLET}60`,
              }}
            >
              {formatTime(gameCountdown)}
            </div>
          </GlassCard>
        </div>
      </div>

      {/* Layer 5: Schedule Preview */}
      <div
        style={{
          position: "absolute",
          bottom: 80,
          left: "50%",
          transform: `translateX(-50%) translateY(${interpolate(scheduleEntry, [0, 1], [30, 0])}px)`,
          opacity: scheduleEntry,
          width: 700,
        }}
      >
        <div
          style={{
            fontSize: TYPOGRAPHY.captionSmall,
            fontWeight: 700,
            color: GD_ACCENT,
            letterSpacing: 3,
            textTransform: "uppercase",
            marginBottom: 16,
            textAlign: "center",
          }}
        >
          Event Schedule
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {SCHEDULE_PHASES.map((phase, i) => {
            const cardSpring = spring({
              frame: frame - staggeredEntry(0, 4 + i),
              fps,
              config: springConfig.entry,
            });
            return (
              <div
                key={phase.label}
                style={{
                  opacity: cardSpring,
                  transform: `translateX(${interpolate(cardSpring, [0, 1], [40, 0])}px)`,
                }}
              >
                <GlassCard
                  style={{
                    padding: "12px 24px",
                    borderRadius: 14,
                    borderLeft: `4px solid ${phase.color}`,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      fontSize: TYPOGRAPHY.bodySmall,
                      fontWeight: 700,
                      color: "white",
                    }}
                  >
                    {phase.label}
                  </div>
                  <div
                    style={{
                      fontSize: TYPOGRAPHY.caption,
                      fontWeight: 600,
                      color: "#94a3b8",
                      fontFamily: "'Inter', monospace",
                    }}
                  >
                    {phase.time}
                  </div>
                </GlassCard>
              </div>
            );
          })}
        </div>
      </div>

      {/* Layer 6: Audio Cue Banner (final 2 minutes) */}
      {showAudioCue && (
        <div
          style={{
            position: "absolute",
            bottom: 20,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
            opacity: audioCueEntry,
            transform: `scale(${audioCuePulse})`,
            zIndex: 100,
          }}
        >
          <div
            style={{
              background: `linear-gradient(90deg, ${GD_ORANGE}dd, ${GD_GOLD}dd)`,
              borderRadius: 16,
              padding: "10px 28px",
              boxShadow: `0 8px 32px ${GD_ORANGE}40`,
              display: "flex",
              alignItems: "center",
              gap: 14,
            }}
          >
            <svg width="22" height="20" viewBox="0 0 22 20" fill="none" style={{ flexShrink: 0 }}>
              <path d="M11 0L0 20h22L11 0z" fill={GD_DARK} />
              <path d="M11 3L2 18h18L11 3z" stroke={GD_DARK} strokeWidth="2" fill="none" />
              <path d="M10 8h2v5h-2V8zm0 7h2v2h-2v-2z" fill={GD_DARK} />
            </svg>
            <div
              style={{
                fontSize: TYPOGRAPHY.bodySmall,
                fontWeight: 700,
                color: GD_DARK,
              }}
            >
              Audio will be needed soon  -  Prepare your speakers
            </div>
          </div>
        </div>
      )}

      {/* ── Timeline Sequences (Remotion Studio chapter markers) ── */}
      <Sequence from={0} durationInFrames={5400} name="Title & Countdowns" layout="none" />
      <Sequence from={5400} durationInFrames={5400} name="Schedule Preview" layout="none" />
      <Sequence from={10800} durationInFrames={3600} name="Community Info" layout="none" />
      <Sequence from={14400} durationInFrames={3600} name="Audio Cue  -  Prepare Speakers" layout="none" />
    </AbsoluteFill>
  );
};

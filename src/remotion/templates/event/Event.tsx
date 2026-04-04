/**
 * Event Announcement Template - Freelancer Video Automation Platform
 * 
 * A reusable, theme-aware event promo video template.
 * Renders event name, date/location, speakers, stats, and registration CTA.
 * 
 * USAGE:
 *   <Event spec={eventSpec} theme={THEME_DARK} layout="hero" />
 * 
 * LAYOUT VARIANTS (via `layout` prop):
 *   "hero"      - Large event name, date/location below, speakers grid, CTA (default)
 *   "speakers"  - Speaker-focused: large speaker cards with bios
 *   "countdown" - Urgency-focused: big date, stats, pulsing CTA
 * 
 * DATA CONTRACT (EventSpec):
 *   {
 *     event_name: "AWS Community GameDay",
 *     event_date: "March 15, 2026",
 *     event_location: "Vienna, Austria",
 *     event_type: "meetup",
 *     description: "Join us for...",
 *     speakers: [{ name: "Jane Doe", title: "CTO", avatar_url: "" }],
 *     stats: [{ label: "Attendees", value: 200, suffix: "+" }],
 *     register_url: "https://...",
 *     cta_text: "Register Now",
 *     logo_url: ""
 *   }
 * 
 * CUSTOMIZATION POINTS (search for "CUSTOMIZE"):
 *   - Scene timing (TIMING object)
 *   - Speaker card size
 *   - Background pattern
 */

import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {
  springEntrance,
  fadeIn,
  slideIn,
  staggerDelay,
  SPRING,
} from "../_shared/animations";
import type { Theme } from "../_shared/themes";
import { THEME_DARK } from "../_shared/themes";
import { PADDING, TOP_SAFE, TYPE } from "../_shared/layouts";
import {
  CountUp,
  GradientBadge,
  GlassCard,
  BackgroundGrid,
} from "../_shared/components";

// ── Data Contract ───────────────────────────────────────────────
export interface EventSpeaker {
  name: string;
  title?: string;
  avatar_url?: string;       // optional - shows initial if missing
}

export interface EventStat {
  label: string;
  value: number;
  suffix?: string;
}

export interface EventSpec {
  event_name: string;
  event_date: string;
  event_location?: string;
  event_type?: "meetup" | "workshop" | "conference" | "webinar";
  description?: string;
  speakers?: EventSpeaker[];
  stats?: EventStat[];
  register_url?: string;
  cta_text?: string;
  logo_url?: string;
}

export interface EventProps {
  spec: EventSpec;
  theme?: Theme;
  layout?: "hero" | "speakers" | "countdown";
  bgPattern?: "grid" | "dots" | "hex" | "none";
}

// ── CUSTOMIZE: Scene Timing ─────────────────────────────────────
const TIMING = {
  typeBadgeStart: 5,
  titleStart: 15,
  dateStart: 40,
  descriptionStart: 65,
  statsStart: 90,
  statsStagger: 25,
  speakersStart: 160,
  speakerStagger: 25,
  ctaStart: 280,
};

// ── Main Component ──────────────────────────────────────────────
export const Event: React.FC<EventProps> = ({
  spec,
  theme = THEME_DARK,
  layout = "hero",
  bgPattern = "grid",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const bgStyle = theme.bg.startsWith("linear-gradient")
    ? { background: theme.bg }
    : { backgroundColor: theme.bg };

  if (layout === "speakers") {
    return <SpeakersLayout spec={spec} theme={theme} bgPattern={bgPattern} frame={frame} fps={fps} bgStyle={bgStyle} />;
  }
  if (layout === "countdown") {
    return <CountdownLayout spec={spec} theme={theme} bgPattern={bgPattern} frame={frame} fps={fps} bgStyle={bgStyle} />;
  }
  return <HeroLayout spec={spec} theme={theme} bgPattern={bgPattern} frame={frame} fps={fps} bgStyle={bgStyle} />;
};

// ── Shared Props ────────────────────────────────────────────────
interface LayoutProps {
  spec: EventSpec;
  theme: Theme;
  bgPattern: string;
  frame: number;
  fps: number;
  bgStyle: React.CSSProperties;
}

// ── Event Type Badge ────────────────────────────────────────────
const EventTypeBadge: React.FC<{ type?: string; theme: Theme; opacity: number }> = ({ type, theme, opacity }) => {
  if (!type) return null;
  const labels: Record<string, string> = {
    meetup: "Meetup", workshop: "Workshop",
    conference: "Conference", webinar: "Webinar",
  };
  return (
    <div style={{
      display: "inline-block", padding: "4px 14px", borderRadius: 999,
      border: `1px solid ${theme.cardBorder}`, fontSize: TYPE.label,
      color: theme.textSecondary, textTransform: "uppercase" as const,
      letterSpacing: 1, opacity,
    }}>
      {labels[type] || type}
    </div>
  );
};

// ── Speaker Avatar ──────────────────────────────────────────────
const SpeakerAvatar: React.FC<{ speaker: EventSpeaker; theme: Theme; size?: number }> = ({ speaker, theme, size = 48 }) => (
  <div style={{
    width: size, height: size, borderRadius: "50%",
    background: theme.accentGradient,
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: size * 0.4, fontWeight: 800, color: "#fff", flexShrink: 0,
  }}>
    {speaker.name.charAt(0)}
  </div>
);


// ── Layout: Hero ────────────────────────────────────────────────
// Large event name, date/location, optional speakers row, stats, CTA.
const HeroLayout: React.FC<LayoutProps> = ({ spec, theme, bgPattern, frame, fps, bgStyle }) => {
  const titleSpring = springEntrance(frame, fps, TIMING.titleStart, SPRING.default);
  const dateSpring = springEntrance(frame, fps, TIMING.dateStart, SPRING.default);
  const ctaOpacity = fadeIn(frame, TIMING.ctaStart);

  return (
    <AbsoluteFill style={{ ...bgStyle, fontFamily: theme.fontFamily, color: theme.textPrimary }}>
      {bgPattern !== "none" && <BackgroundGrid pattern={bgPattern as "grid" | "dots" | "hex"} />}

      <div style={{
        position: "absolute", inset: 0,
        padding: `${TOP_SAFE}px ${PADDING}px`,
        display: "flex", flexDirection: "column",
      }}>
        {/* Event type badge */}
        <EventTypeBadge type={spec.event_type} theme={theme} opacity={fadeIn(frame, TIMING.typeBadgeStart)} />

        {/* Title */}
        <div style={{
          fontSize: TYPE.hero, fontWeight: theme.headingWeight,
          marginTop: 12,
          opacity: titleSpring,
          transform: `translateY(${slideIn(titleSpring, "up", 24)}px)`,
        }}>
          {spec.event_name}
        </div>

        {/* Date + Location */}
        <div style={{
          display: "flex", alignItems: "center", gap: 16, marginTop: 12,
          opacity: dateSpring,
          transform: `translateY(${slideIn(dateSpring, "up", 16)}px)`,
        }}>
          <span style={{ fontSize: TYPE.subtitle, color: theme.accent, fontWeight: 600 }}>
            {spec.event_date}
          </span>
          {spec.event_location && (
            <span style={{ fontSize: TYPE.subtitle, color: theme.textSecondary }}>
               {spec.event_location}
            </span>
          )}
        </div>

        {/* Description */}
        {spec.description && (
          <div style={{
            fontSize: TYPE.body, color: theme.textSecondary,
            maxWidth: 700, lineHeight: 1.5, marginTop: 12,
            opacity: fadeIn(frame, TIMING.descriptionStart),
          }}>
            {spec.description}
          </div>
        )}

        {/* Stats row */}
        {spec.stats && spec.stats.length > 0 && (
          <div style={{ display: "flex", gap: 20, marginTop: 20 }}>
            {spec.stats.map((s, i) => {
              const delay = staggerDelay(i, TIMING.statsStart, TIMING.statsStagger);
              const sp = springEntrance(frame, fps, delay, SPRING.default);
              return (
                <GlassCard key={i} theme={theme} style={{
                  opacity: sp,
                  transform: `translateY(${slideIn(sp, "up", 20)}px)`,
                  textAlign: "center", padding: "14px 24px", minWidth: 120,
                }}>
                  <div style={{ fontSize: TYPE.stat, fontWeight: theme.headingWeight, color: theme.accent }}>
                    <CountUp target={s.value} frame={frame} startFrame={delay + 10} suffix={s.suffix || ""} />
                  </div>
                  <div style={{ fontSize: TYPE.caption, color: theme.textSecondary, marginTop: 4, textTransform: "uppercase" as const, letterSpacing: 1 }}>
                    {s.label}
                  </div>
                </GlassCard>
              );
            })}
          </div>
        )}

        {/* Speakers row */}
        {spec.speakers && spec.speakers.length > 0 && (
          <div style={{ display: "flex", gap: 16, marginTop: 20, flexWrap: "wrap" as const }}>
            {spec.speakers.map((speaker, i) => {
              const delay = staggerDelay(i, TIMING.speakersStart, TIMING.speakerStagger);
              const sp = springEntrance(frame, fps, delay, SPRING.default);
              return (
                <GlassCard key={i} theme={theme} style={{
                  opacity: sp,
                  transform: `translateX(${slideIn(sp, "left", 24)}px)`,
                  display: "flex", alignItems: "center", gap: 12,
                  padding: "12px 18px",
                }}>
                  <SpeakerAvatar speaker={speaker} theme={theme} size={40} />
                  <div>
                    <div style={{ fontSize: TYPE.body, fontWeight: 600 }}>{speaker.name}</div>
                    {speaker.title && (
                      <div style={{ fontSize: TYPE.caption, color: theme.textSecondary }}>{speaker.title}</div>
                    )}
                  </div>
                </GlassCard>
              );
            })}
          </div>
        )}

        {/* Spacer */}
        <div style={{ flex: 1 }} />

        {/* CTA */}
        {spec.cta_text && (
          <div style={{
            display: "flex", justifyContent: "center",
            opacity: ctaOpacity, marginBottom: 8,
          }}>
            <GradientBadge text={spec.cta_text} theme={theme} fontSize={15} />
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};

// ── Layout: Speakers ────────────────────────────────────────────
// Speaker-focused: large speaker cards with avatars and titles.
const SpeakersLayout: React.FC<LayoutProps> = ({ spec, theme, bgPattern, frame, fps, bgStyle }) => {
  const titleSpring = springEntrance(frame, fps, TIMING.titleStart, SPRING.default);

  return (
    <AbsoluteFill style={{ ...bgStyle, fontFamily: theme.fontFamily, color: theme.textPrimary }}>
      {bgPattern !== "none" && <BackgroundGrid pattern={bgPattern as "grid" | "dots" | "hex"} />}

      <div style={{
        position: "absolute", inset: 0,
        padding: `${TOP_SAFE}px ${PADDING}px`,
        display: "flex", flexDirection: "column",
      }}>
        {/* Header row */}
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "flex-start",
          opacity: titleSpring,
          transform: `translateY(${slideIn(titleSpring, "up", 20)}px)`,
        }}>
          <div>
            <EventTypeBadge type={spec.event_type} theme={theme} opacity={1} />
            <div style={{ fontSize: TYPE.title, fontWeight: theme.headingWeight, marginTop: 8 }}>
              {spec.event_name}
            </div>
            <div style={{ fontSize: TYPE.body, color: theme.textSecondary, marginTop: 4 }}>
              {spec.event_date}{spec.event_location ? ` · ${spec.event_location}` : ""}
            </div>
          </div>
          {/* Stats on the right */}
          {spec.stats && spec.stats.length > 0 && (
            <div style={{ display: "flex", gap: 16 }}>
              {spec.stats.map((s, i) => {
                const delay = staggerDelay(i, TIMING.statsStart, 20);
                return (
                  <div key={i} style={{
                    textAlign: "center",
                    opacity: fadeIn(frame, delay),
                  }}>
                    <div style={{ fontSize: TYPE.stat - 8, fontWeight: theme.headingWeight, color: theme.accent }}>
                      <CountUp target={s.value} frame={frame} startFrame={delay} suffix={s.suffix || ""} />
                    </div>
                    <div style={{ fontSize: TYPE.caption, color: theme.textMuted }}>{s.label}</div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Speaker label */}
        <div style={{
          fontSize: TYPE.cardTitle, color: theme.textMuted, fontWeight: 600,
          textTransform: "uppercase" as const, letterSpacing: 1,
          marginTop: 24, marginBottom: 12,
          opacity: fadeIn(frame, TIMING.speakersStart - 20),
        }}>
          Speakers
        </div>

        {/* Speaker grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: `repeat(${Math.min(spec.speakers?.length || 1, 3)}, 1fr)`,
          gap: 16, flex: 1,
        }}>
          {spec.speakers?.map((speaker, i) => {
            const delay = staggerDelay(i, TIMING.speakersStart, TIMING.speakerStagger);
            const sp = springEntrance(frame, fps, delay, SPRING.default);
            return (
              <GlassCard key={i} theme={theme} style={{
                opacity: sp,
                transform: `translateY(${slideIn(sp, "up", 20)}px)`,
                display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center",
                textAlign: "center", padding: "24px 16px",
              }}>
                <SpeakerAvatar speaker={speaker} theme={theme} size={64} />
                <div style={{ fontSize: TYPE.body + 2, fontWeight: 700, marginTop: 12 }}>{speaker.name}</div>
                {speaker.title && (
                  <div style={{ fontSize: TYPE.body, color: theme.textSecondary, marginTop: 4 }}>{speaker.title}</div>
                )}
              </GlassCard>
            );
          })}
        </div>

        {/* CTA */}
        {spec.cta_text && (
          <div style={{
            display: "flex", justifyContent: "center",
            marginTop: 16,
            opacity: fadeIn(frame, TIMING.ctaStart),
          }}>
            <GradientBadge text={spec.cta_text} theme={theme} fontSize={15} />
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};

// ── Layout: Countdown ───────────────────────────────────────────
// Urgency-focused: big date, stats prominently displayed, pulsing CTA.
const CountdownLayout: React.FC<LayoutProps> = ({ spec, theme, bgPattern, frame, fps, bgStyle }) => {
  const titleSpring = springEntrance(frame, fps, TIMING.titleStart, SPRING.default);
  const dateSpring = springEntrance(frame, fps, TIMING.dateStart, SPRING.bouncy);
  const ctaOpacity = fadeIn(frame, TIMING.ctaStart);
  // Subtle pulse for CTA
  const pulse = 1 + Math.sin(frame * 0.08) * 0.03;

  return (
    <AbsoluteFill style={{ ...bgStyle, fontFamily: theme.fontFamily, color: theme.textPrimary }}>
      {bgPattern !== "none" && <BackgroundGrid pattern={bgPattern as "grid" | "dots" | "hex"} />}

      <div style={{
        position: "absolute", inset: 0,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        padding: `0 ${PADDING}px`,
        textAlign: "center",
      }}>
        {/* Event type */}
        <EventTypeBadge type={spec.event_type} theme={theme} opacity={fadeIn(frame, TIMING.typeBadgeStart)} />

        {/* Event name */}
        <div style={{
          fontSize: TYPE.hero + 4, fontWeight: theme.headingWeight,
          marginTop: 16,
          opacity: titleSpring,
          transform: `translateY(${slideIn(titleSpring, "up", 20)}px)`,
        }}>
          {spec.event_name}
        </div>

        {/* Big date */}
        <div style={{
          fontSize: TYPE.stat + 8, fontWeight: theme.headingWeight,
          color: theme.accent, marginTop: 16,
          opacity: dateSpring,
          transform: `scale(${dateSpring})`,
        }}>
          {spec.event_date}
        </div>

        {/* Location */}
        {spec.event_location && (
          <div style={{
            fontSize: TYPE.subtitle, color: theme.textSecondary, marginTop: 8,
            opacity: fadeIn(frame, TIMING.dateStart + 15),
          }}>
             {spec.event_location}
          </div>
        )}

        {/* Stats row */}
        {spec.stats && spec.stats.length > 0 && (
          <div style={{ display: "flex", gap: 32, marginTop: 28 }}>
            {spec.stats.map((s, i) => {
              const delay = staggerDelay(i, TIMING.statsStart, TIMING.statsStagger);
              const sp = springEntrance(frame, fps, delay, SPRING.default);
              return (
                <div key={i} style={{
                  textAlign: "center", opacity: sp,
                  transform: `translateY(${slideIn(sp, "up", 16)}px)`,
                }}>
                  <div style={{ fontSize: TYPE.stat, fontWeight: theme.headingWeight, color: theme.textPrimary }}>
                    <CountUp target={s.value} frame={frame} startFrame={delay + 10} suffix={s.suffix || ""} />
                  </div>
                  <div style={{ fontSize: TYPE.caption, color: theme.textMuted, marginTop: 4, textTransform: "uppercase" as const, letterSpacing: 1 }}>
                    {s.label}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* CTA with pulse */}
        {spec.cta_text && (
          <div style={{
            marginTop: 32,
            opacity: ctaOpacity,
            transform: `scale(${ctaOpacity > 0.5 ? pulse : 1})`,
          }}>
            <GradientBadge text={spec.cta_text} theme={theme} fontSize={16} style={{ padding: "12px 36px" }} />
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};

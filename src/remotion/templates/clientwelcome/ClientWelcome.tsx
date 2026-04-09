/**
 * ClientWelcome Template - Warm onboarding greeting for new clients.
 *
 * Layout:
 *   - Large greeting headline with client name highlighted in accent color
 *   - Freelancer avatar initial + name/title credit
 *   - 3 "what to expect" cards (icon + title + description) in a row
 *   - CTA line at the bottom: "Your journey starts now"
 *
 * DATA CONTRACT (ClientWelcomeSpec):
 *   {
 *     greeting: "Welcome aboard,",
 *     client_name: "Sarah",
 *     tagline: "We're thrilled to work with you.",
 *     freelancer_name: "Linda Mohamed",
 *     freelancer_title: "Product Consultant",
 *     next_steps: [
 *       { icon: "📅", title: "Kickoff Call", description: "30 min intro Thu 9am" },
 *       { icon: "📋", title: "Shared Workspace", description: "Notion board invite sent" },
 *       { icon: "💬", title: "Slack Channel", description: "#project-acme is ready" },
 *     ],
 *     cta: "Let's build something great together →",
 *   }
 */

import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { springEntrance, fadeIn, slideIn, staggerDelay, SPRING } from "../_shared/animations";
import type { Theme } from "../_shared/themes";
import { THEME_WARM } from "../_shared/themes";
import { PADDING, TOP_SAFE, TYPE, makeType } from "../_shared/layouts";
import { GlassCard, BackgroundGrid } from "../_shared/components";

// ── Data Contract ───────────────────────────────────────────────

export interface NextStepItem {
  icon: string;       // emoji or short symbol
  title: string;
  description: string;
}

export interface ClientWelcomeSpec {
  greeting: string;
  client_name: string;
  tagline: string;
  freelancer_name: string;
  freelancer_title: string;
  next_steps: NextStepItem[];
  cta: string;
}

export interface ClientWelcomeProps {
  spec: ClientWelcomeSpec;
  theme?: Theme;
  bgPattern?: "grid" | "dots" | "hex" | "none";
  fontScale?: number;
}

// ── Timing ──────────────────────────────────────────────────────
const TIMING = {
  greetStart: 0,
  nameStart: 14,
  taglineStart: 28,
  avatarStart: 42,
  cardBase: 65,
  cardStagger: 22,
  ctaStart: 180,
};

// ── Avatar ───────────────────────────────────────────────────────
const InitialAvatar: React.FC<{ name: string; theme: Theme; size?: number }> = ({
  name, theme, size = 52,
}) => (
  <div style={{
    width: size,
    height: size,
    borderRadius: "50%",
    background: theme.accentGradient,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: size * 0.42,
    fontWeight: 800,
    color: "#fff",
    flexShrink: 0,
  }}>
    {name.charAt(0).toUpperCase()}
  </div>
);

// ── Main Component ──────────────────────────────────────────────
export const ClientWelcome: React.FC<ClientWelcomeProps> = ({
  spec,
  theme = THEME_WARM,
  bgPattern = "hex",
  fontScale = 1.0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const T = makeType(fontScale);

  const bgStyle = theme.bg.startsWith("linear-gradient")
    ? { background: theme.bg }
    : { backgroundColor: theme.bg };

  const greetSpring = springEntrance(frame, fps, TIMING.greetStart, SPRING.gentle);
  const nameSpring  = springEntrance(frame, fps, TIMING.nameStart,  SPRING.bouncy);
  const taglineFade = fadeIn(frame, TIMING.taglineStart, 22);
  const avatarSpring = springEntrance(frame, fps, TIMING.avatarStart, SPRING.default);
  const ctaFade = fadeIn(frame, TIMING.ctaStart, 22);

  const steps = spec.next_steps.slice(0, 3);

  return (
    <AbsoluteFill style={{ ...bgStyle, fontFamily: theme.fontFamily, color: theme.textPrimary }}>
      {bgPattern !== "none" && <BackgroundGrid pattern={bgPattern as "grid" | "dots" | "hex"} />}

      <div style={{
        position: "absolute",
        inset: 0,
        padding: `${TOP_SAFE}px ${PADDING}px 48px`,
        display: "flex",
        flexDirection: "column",
        gap: 20,
        justifyContent: "center",
      }}>

        {/* ── Greeting block ────────────────────────────────────── */}
        <div>
          {/* "Welcome aboard," */}
          <div style={{
            fontSize: T.title,
            fontWeight: theme.headingWeight,
            color: theme.textSecondary,
            opacity: greetSpring,
            transform: `translateY(${slideIn(greetSpring, "up", 20)}px)`,
          }}>
            {spec.greeting}
          </div>

          {/* Client name — large, accented */}
          <div style={{
            fontSize: T.hero + 4,
            fontWeight: theme.headingWeight,
            color: theme.accent,
            lineHeight: 1.05,
            opacity: nameSpring,
            transform: `translateY(${slideIn(nameSpring, "up", 28)}px) scale(${0.94 + nameSpring * 0.06})`,
            marginTop: 4,
          }}>
            {spec.client_name}
          </div>

          {/* Tagline */}
          <div style={{
            fontSize: T.subtitle,
            color: theme.textSecondary,
            marginTop: 10,
            opacity: taglineFade,
            lineHeight: 1.4,
          }}>
            {spec.tagline}
          </div>
        </div>

        {/* ── Freelancer credit ─────────────────────────────────── */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          opacity: avatarSpring,
          transform: `translateX(${slideIn(avatarSpring, "left", 24)}px)`,
        }}>
          <InitialAvatar name={spec.freelancer_name} theme={theme} size={48} />
          <div>
            <div style={{ fontSize: T.body, fontWeight: 700, color: theme.textPrimary }}>
              {spec.freelancer_name}
            </div>
            <div style={{ fontSize: T.caption, color: theme.textMuted }}>
              {spec.freelancer_title}
            </div>
          </div>
        </div>

        {/* ── Next Steps cards ──────────────────────────────────── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 16,
          alignContent: "start",
        }}>
          {steps.map((step, i) => {
            const delay = staggerDelay(i, TIMING.cardBase, TIMING.cardStagger);
            const s = springEntrance(frame, fps, delay, SPRING.default);
            return (
              <GlassCard
                key={i}
                theme={theme}
                style={{
                  opacity: s,
                  transform: `translateY(${slideIn(s, "up", 28)}px) scale(${0.95 + s * 0.05})`,
                  padding: "18px 20px",
                  textAlign: "center" as const,
                }}
              >
                <div style={{ fontSize: 32, marginBottom: 8 }}>{step.icon}</div>
                <div style={{ fontSize: T.body, fontWeight: 700, color: theme.textPrimary, marginBottom: 6 }}>
                  {step.title}
                </div>
                <div style={{ fontSize: T.caption, color: theme.textSecondary, lineHeight: 1.4 }}>
                  {step.description}
                </div>
              </GlassCard>
            );
          })}
        </div>

        {/* ── CTA ───────────────────────────────────────────────── */}
        <div style={{
          opacity: ctaFade,
          fontSize: T.body,
          color: theme.accent,
          fontWeight: 600,
          borderLeft: `3px solid ${theme.accent}`,
          paddingLeft: 16,
        }}>
          {spec.cta}
        </div>
      </div>
    </AbsoluteFill>
  );
};

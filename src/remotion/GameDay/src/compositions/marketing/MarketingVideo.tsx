import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Img, staticFile } from "remotion";
import {
  BackgroundLayer,
} from "../../components";
import {
  GD_DARK,
  GD_PURPLE,
  GD_VIOLET,
  GD_GOLD,
  GD_ORANGE,
  TYPOGRAPHY,
  springConfig,
} from "../../design";
import { ORGANIZERS, AWS_SUPPORTERS, getOrganizerRole } from "../../../config/participants";
import { EVENT_NAME, EVENT_DATE } from "../../../config/event";

// ── SVG Icons ──
const MapPinIcon: React.FC<{ size?: number; color?: string }> = ({ size = 16, color = GD_ORANGE }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
  </svg>
);
const HeartIcon: React.FC<{ size?: number; color?: string }> = ({ size = 20, color = GD_ORANGE }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} stroke="none">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
);
const ServerIcon: React.FC<{ size?: number; color?: string }> = ({ size = 22, color = GD_ORANGE }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="8" x="2" y="2" rx="2" ry="2"/><rect width="20" height="8" x="2" y="14" rx="2" ry="2"/>
    <line x1="6" x2="6.01" y1="6" y2="6"/><line x1="6" x2="6.01" y1="18" y2="18"/>
  </svg>
);
const UsersIcon: React.FC<{ size?: number; color?: string }> = ({ size = 22, color = GD_ORANGE }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
    <path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);
const StarIcon: React.FC<{ size?: number; color?: string }> = ({ size = 22, color = GD_ORANGE }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} stroke="none">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);

// ── Frame Constants ──
const INTRO_START = 0;
const INTRO_END = 59;
const ORG_START = 45;
const ORG_END = 265;       // ~7.3 seconds for organizers
const AWS_START = 245;
const AWS_END = 509;
const OUTRO_START = 490;
const OUTRO_END = 639;

const F = "'Inter', sans-serif";

// ── IntroScene (frames 0 - 59) ──
const IntroScene: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const logoSpring = spring({ frame, fps, config: { damping: 14, stiffness: 120, mass: 0.8 }, durationInFrames: 30 });
  const logoScale = interpolate(logoSpring, [0, 1], [0.3, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const logo2Spring = spring({ frame: Math.max(0, frame - 8), fps, config: { damping: 14, stiffness: 120, mass: 0.8 }, durationInFrames: 30 });
  const logo2Scale = interpolate(logo2Spring, [0, 1], [0.3, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const exitOpacity = interpolate(frame, [45, 59], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ opacity: exitOpacity }}>
      <AbsoluteFill style={{ background: `radial-gradient(ellipse at center, ${GD_PURPLE}40 0%, ${GD_VIOLET}20 40%, transparent 70%)` }} />
      <AbsoluteFill style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 24 }}>
        <Img src={staticFile("assets/logos/gameday-logo-white.png")} style={{ width: 320, objectFit: "contain", opacity: logoSpring, transform: `scale(${logoScale})` }} />
        <Img src={staticFile("assets/aws-community-logo.png")} style={{ width: 220, objectFit: "contain", opacity: logo2Spring, transform: `scale(${logo2Scale})` }} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ── OrganizerScene: Quick 5-second flash (frames 45 - 199) ──
const OrganizerScene: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const relFrame = frame - ORG_START;
  const sceneOpacity = interpolate(frame, [ORG_START, ORG_START + 10, ORG_END - 15, ORG_END], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const orgTitleSpring = spring({ frame: Math.max(0, relFrame - 3), fps, config: { damping: 18, stiffness: 80 } });

  return (
    <AbsoluteFill style={{ opacity: sceneOpacity }}>
      <div style={{ position: "absolute", top: 40, left: 0, right: 0, textAlign: "center", opacity: orgTitleSpring, transform: `translateY(${interpolate(orgTitleSpring, [0, 1], [20, 0])}px)` }}>
        <div style={{ fontSize: TYPOGRAPHY.bodySmall, fontWeight: 600, color: "rgba(255,255,255,0.5)", fontFamily: F, letterSpacing: 5 }}>COMMUNITY GAMEDAY EUROPE ORGANIZERS</div>
        <div style={{ fontSize: TYPOGRAPHY.h4, fontWeight: 900, fontFamily: F, marginTop: 8, color: GD_VIOLET, letterSpacing: 1 }}>From the Community, for the Community</div>
      </div>
      <div style={{ position: "absolute", top: "25%", left: "50%", transform: "translateX(-50%)", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "36px 80px", maxWidth: 1250 }}>
        {ORGANIZERS.map((org, i) => {
          const cardSpring = spring({ frame: Math.max(0, relFrame - 5 - i * 18), fps, config: { damping: 18, stiffness: 80, mass: 1 } });
          const cardScale = interpolate(cardSpring, [0, 1], [0.5, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          return (
            <div key={org.name} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, opacity: cardSpring, transform: `scale(${cardScale}) translateY(${interpolate(cardSpring, [0, 1], [20, 0])}px)` }}>
              <div style={{ width: 130, height: 130, borderRadius: "50%", overflow: "hidden", boxShadow: `0 0 30px ${GD_VIOLET}70, 0 0 60px ${GD_PURPLE}40, 0 4px 16px rgba(0,0,0,0.4)` }}>
                <Img src={staticFile(org.face)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: TYPOGRAPHY.h6, fontWeight: 800, color: "#ffffff", fontFamily: F }}>{org.name}</div>
                <div style={{ fontSize: TYPOGRAPHY.bodySmall, color: "rgba(255,255,255,0.55)", fontFamily: F, marginTop: 3, whiteSpace: "nowrap" }}>{getOrganizerRole(org)}</div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 4, marginTop: 2 }}>
                  <span style={{ fontSize: 16 }}>{org.flag}</span>
                  <span style={{ fontSize: TYPOGRAPHY.caption, color: "rgba(255,255,255,0.4)", fontFamily: F }}>{org.location}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// ── AWSScene: Rich thank-you page (frames 180 - 799) ──
const AWSScene: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const relFrame = frame - AWS_START;
  const sceneOpacity = interpolate(frame, [AWS_START, AWS_START + 15, AWS_END - 15, AWS_END], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const titleSpring = spring({ frame: Math.max(0, relFrame - 5), fps, config: { damping: 18, stiffness: 80 } });
  const subtitleOpacity = interpolate(relFrame, [15, 35], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const cardsStart = 30;
  const thanksStart = 120;
  const thanksOpacity = interpolate(relFrame, [thanksStart, thanksStart + 25], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const thankYouItems = [
    { icon: <ServerIcon size={28} />, text: "The GameDay environment & infrastructure" },
    { icon: <UsersIcon size={28} />, text: "Local and remote supporters across Europe" },
    { icon: <StarIcon size={28} />, text: "Outstanding support during organization & preparation" },
    { icon: <HeartIcon size={28} />, text: "And many more AWS colleagues who made this possible" },
  ];

  return (
    <AbsoluteFill style={{ opacity: sceneOpacity }}>
      {/* Title */}
      <div style={{ position: "absolute", top: 36, left: 0, right: 0, textAlign: "center", opacity: titleSpring, transform: `translateY(${interpolate(titleSpring, [0, 1], [20, 0])}px)` }}>
        <div style={{ fontSize: TYPOGRAPHY.h3, fontWeight: 900, fontFamily: F, marginTop: 8, color: GD_ORANGE, letterSpacing: 1 }}>Thank You, AWS</div>
      </div>

      {/* Subtitle */}
      <div style={{ position: "absolute", top: 100, left: 0, right: 0, textAlign: "center", opacity: subtitleOpacity }}>
        <span style={{ fontSize: TYPOGRAPHY.body, color: "rgba(255,255,255,0.45)", fontFamily: F, letterSpacing: 1 }}>
          Orga Support & Gamemasters making this event possible
        </span>
      </div>

      {/* Supporter cards */}
      <div style={{ position: "absolute", top: "25%", left: "50%", transform: "translateX(-50%)", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "36px 80px", maxWidth: 1250 }}>
        {AWS_SUPPORTERS.map((person, i) => {
          const cardSpring = spring({ frame: Math.max(0, relFrame - cardsStart - i * 18), fps, config: { damping: 18, stiffness: 80, mass: 1 } });
          const cardScale = interpolate(cardSpring, [0, 1], [0.5, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          return (
            <div key={person.name} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, opacity: cardSpring, transform: `scale(${cardScale}) translateY(${interpolate(cardSpring, [0, 1], [20, 0])}px)` }}>
              <div style={{ width: 130, height: 130, borderRadius: "50%", overflow: "hidden", boxShadow: `0 0 30px ${GD_ORANGE}70, 0 0 60px ${GD_ORANGE}40, 0 4px 16px rgba(0,0,0,0.4)`, border: `2px solid ${GD_ORANGE}40` }}>
                <Img src={staticFile(person.face)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: TYPOGRAPHY.h6, fontWeight: 800, color: "#ffffff", fontFamily: F }}>{person.name}</div>
                <div style={{ fontSize: TYPOGRAPHY.bodySmall, color: "rgba(255,255,255,0.55)", fontFamily: F, marginTop: 3, whiteSpace: "nowrap" }}>{getOrganizerRole(person)}</div>
                <div style={{ fontSize: TYPOGRAPHY.caption, color: "rgba(255,255,255,0.4)", fontFamily: F, marginTop: 2 }}>{person.location}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Thank-you details */}
      <div style={{ position: "absolute", bottom: 80, left: 60, right: 60, display: "flex", flexDirection: "column", gap: 16, alignItems: "center", opacity: thanksOpacity }}>
        {thankYouItems.map((item, i) => {
          const itemSpring = spring({ frame: Math.max(0, relFrame - thanksStart - 10 - i * 15), fps, config: { damping: 18, stiffness: 80 } });
          return (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, opacity: itemSpring, transform: `translateY(${interpolate(itemSpring, [0, 1], [10, 0])}px)` }}>
              {item.icon}
              <span style={{ fontSize: TYPOGRAPHY.bodySmall, fontWeight: 600, color: "rgba(255,255,255,0.6)", fontFamily: F, letterSpacing: 0.5 }}>{item.text}</span>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// ── OutroScene (frames 780 - 929) ──
const OutroScene: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const relFrame = frame - OUTRO_START;
  const logoSpring = spring({ frame: relFrame, fps, config: springConfig.entry, durationInFrames: 40 });
  const logoScale = interpolate(logoSpring, [0, 1], [0.7, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const taglineOpacity = interpolate(relFrame, [20, 40], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const ctaOpacity = interpolate(relFrame, [40, 60], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const fadeToBlack = interpolate(frame, [OUTRO_END - 29, OUTRO_END], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ background: `radial-gradient(ellipse at center, ${GD_PURPLE}60 0%, ${GD_VIOLET}30 40%, transparent 70%)` }} />
      <AbsoluteFill style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 20 }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, opacity: logoSpring, transform: `scale(${logoScale})` }}>
          <Img src={staticFile("assets/logos/gameday-logo-white.png")} style={{ width: 280, objectFit: "contain" }} />
          <Img src={staticFile("assets/aws-community-logo.png")} style={{ width: 180, objectFit: "contain" }} />
        </div>
        <div style={{ opacity: taglineOpacity, fontSize: TYPOGRAPHY.h6, fontWeight: 600, color: "white", letterSpacing: 1, textAlign: "center", marginTop: 12 }}>
          {EVENT_NAME} · 17 March 2026
        </div>
        <div style={{ opacity: ctaOpacity, fontSize: TYPOGRAPHY.body, fontWeight: 700, color: GD_GOLD, letterSpacing: 2, textAlign: "center" }}>
          www.awsgameday.eu
        </div>
      </AbsoluteFill>
      <AbsoluteFill style={{ backgroundColor: "black", opacity: fadeToBlack }} />
    </AbsoluteFill>
  );
};

// ── Main Composition ──
export const MarketingVideo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ fontFamily: F, background: GD_DARK }}>
      <BackgroundLayer darken={0.65} />
      {frame >= INTRO_START && frame <= INTRO_END && <IntroScene frame={frame} fps={fps} />}
      {frame >= ORG_START && frame <= ORG_END && <OrganizerScene frame={frame} fps={fps} />}
      {frame >= AWS_START && frame <= AWS_END && <AWSScene frame={frame} fps={fps} />}
      {frame >= OUTRO_START && frame <= OUTRO_END && <OutroScene frame={frame} fps={fps} />}
    </AbsoluteFill>
  );
};

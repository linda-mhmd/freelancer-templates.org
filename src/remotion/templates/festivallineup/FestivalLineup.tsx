/**
 * Festival Lineup — 1080×1920 portrait
 *
 * Animated lineup poster with:
 *   - WavyText headliner at the top
 *   - 2-column artist grid, each name animating in with stagger
 *   - Stock festival image as backdrop with colored gradient overlay
 *   - Subtle AnimatedSparkles for festival energy
 *
 * Two overlay flavors:
 *   NeonGradient:  purple (#7c3aed) → pink (#ec4899) gradient
 *   SunsetWarm:    orange (#f97316) → red (#ef4444) gradient
 *
 * Total: 360 frames (12s @ 30fps)
 */

import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {
  PORTRAIT_TYPE,
  PORTRAIT_PADDING,
  PORTRAIT_SPACE,
  PORTRAIT_TOP_SAFE,
  PORTRAIT_BOTTOM_SAFE,
} from "../_shared/PortraitTypes";
import { getStockImage } from "../_shared/StockImages";
import { AnimatedSparkles, WavyText } from "../_shared/PlayfulElements";
import { SPRING } from "../_shared/animations";

// ── Data Contract ────────────────────────────────────────────────

export interface FestivalLineupProps {
  festivalName?: string;
  tagline?: string;
  date?: string;
  location?: string;
  /** 4–8 artist names split into 2 columns automatically */
  artists?: string[];
  imageUrl?: string;
  /** CSS gradient applied as color overlay (e.g. "linear-gradient(...)") */
  gradientOverlay: string;
  /** Primary color for accents (artist names, sparkles) */
  accentColor: string;
  /** Secondary accent */
  accentSecondary?: string;
}

// ── Default content ──────────────────────────────────────────────

const DEFAULT_ARTISTS = [
  "HEADLINER ACT",
  "MAIN STAGE CO-HEADLINE",
  "ARTIST THREE",
  "ARTIST FOUR",
  "ARTIST FIVE",
  "SPECIAL GUEST",
];

// ── Timing ───────────────────────────────────────────────────────

const HERO_ENTER_AT = 0;
const DATE_ENTER_AT = 45;
const ARTISTS_START_AT = 80;
const ARTIST_STAGGER = 18;

// ── Main Component ───────────────────────────────────────────────

export const FestivalLineup: React.FC<FestivalLineupProps> = ({
  festivalName = "SOUND WAVE",
  tagline = "2025 Edition",
  date = "Aug 8–10, 2025",
  location = "Riverside Park",
  artists = DEFAULT_ARTISTS,
  imageUrl,
  gradientOverlay,
  accentColor,
  accentSecondary,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const imgSrc = imageUrl || getStockImage("festival", 1080, 1920, 1);
  const acc2 = accentSecondary ?? accentColor;

  // Headliner entrance
  const heroEnter = spring({ frame: frame - HERO_ENTER_AT, fps, config: SPRING.bouncy });

  // Date/location reveal
  const dateEnter = spring({ frame: frame - DATE_ENTER_AT, fps, config: SPRING.default });

  // Artist entrances — staggered
  const displayArtists = artists.slice(0, 8);
  const artistEnters = displayArtists.map((_, i) =>
    spring({
      frame: frame - (ARTISTS_START_AT + i * ARTIST_STAGGER),
      fps,
      config: SPRING.snappy,
    })
  );

  // Split into 2 columns
  const half = Math.ceil(displayArtists.length / 2);
  const col1 = displayArtists.slice(0, half);
  const col2 = displayArtists.slice(half);
  const col1Enters = artistEnters.slice(0, half);
  const col2Enters = artistEnters.slice(half);

  return (
    <AbsoluteFill
      style={{
        fontFamily: "Inter, system-ui, sans-serif",
        backgroundColor: "#050505",
      }}
    >
      {/* Backdrop image */}
      <Img
        src={imgSrc}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center center",
          opacity: 0.3,
        }}
      />

      {/* Dark base overlay */}
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.5) 45%, rgba(0,0,0,0.85) 100%)",
        }}
      />

      {/* Colored gradient overlay — the variant differentiator */}
      <AbsoluteFill style={{ background: gradientOverlay, opacity: 0.55 }} />

      {/* Subtle festival sparkles */}
      <AnimatedSparkles count={10} color={accentColor} startAt={40} seed="festival-lineup" />

      {/* ── Content container ── */}
      <div
        style={{
          position: "absolute",
          top: PORTRAIT_TOP_SAFE + 20,
          bottom: PORTRAIT_BOTTOM_SAFE + 20,
          left: PORTRAIT_PADDING,
          right: PORTRAIT_PADDING,
          display: "flex",
          flexDirection: "column",
          gap: PORTRAIT_SPACE.md,
        }}
      >
        {/* Tagline above headliner */}
        <div
          style={{
            fontSize: PORTRAIT_TYPE.label,
            fontWeight: 700,
            color: accentColor,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            opacity: interpolate(heroEnter, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(heroEnter, [0, 1], [-10, 0])}px)`,
          }}
        >
          {tagline}
        </div>

        {/* WavyText headliner — the eye-catching hero */}
        <div
          style={{
            opacity: interpolate(heroEnter, [0, 1], [0, 1]),
            transform: `scale(${interpolate(heroEnter, [0, 1], [0.8, 1])})`,
          }}
        >
          <WavyText
            text={festivalName}
            color="#ffffff"
            fontSize={
              festivalName.length > 10 ? PORTRAIT_TYPE.title : PORTRAIT_TYPE.hero
            }
            amplitude={10}
            speed={0.6}
          />
        </div>

        {/* Date + location bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: PORTRAIT_SPACE.md,
            opacity: interpolate(dateEnter, [0, 1], [0, 1]),
            transform: `translateX(${interpolate(dateEnter, [0, 1], [-20, 0])}px)`,
            borderLeft: `4px solid ${accentColor}`,
            paddingLeft: 16,
          }}
        >
          <div>
            <div
              style={{
                fontSize: PORTRAIT_TYPE.body,
                fontWeight: 700,
                color: "#ffffff",
              }}
            >
              {date}
            </div>
            <div
              style={{
                fontSize: PORTRAIT_TYPE.label,
                fontWeight: 500,
                color: "rgba(255,255,255,0.65)",
                marginTop: 4,
              }}
            >
              {location}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div
          style={{
            height: 1,
            background: `linear-gradient(90deg, ${accentColor}, transparent)`,
            opacity: dateEnter,
          }}
        />

        {/* 2-column artist grid */}
        <div
          style={{
            flex: 1,
            display: "flex",
            gap: PORTRAIT_SPACE.lg,
          }}
        >
          {/* Column 1 */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: PORTRAIT_SPACE.sm,
            }}
          >
            {col1.map((artist, i) => {
              const e = col1Enters[i];
              const isHeadliner = i === 0 && artists[0] === col1[0];
              return (
                <div
                  key={i}
                  style={{
                    fontSize: isHeadliner ? PORTRAIT_TYPE.subtitle : PORTRAIT_TYPE.body,
                    fontWeight: isHeadliner ? 900 : 700,
                    color: isHeadliner ? "#ffffff" : `rgba(255,255,255,${0.85 - i * 0.08})`,
                    letterSpacing: isHeadliner ? "0.04em" : "0.08em",
                    textTransform: "uppercase",
                    opacity: e,
                    transform: `translateX(${interpolate(e, [0, 1], [-24, 0])}px)`,
                  }}
                >
                  {artist}
                </div>
              );
            })}
          </div>

          {/* Column 2 */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: PORTRAIT_SPACE.sm,
            }}
          >
            {col2.map((artist, i) => {
              const e = col2Enters[i];
              return (
                <div
                  key={i}
                  style={{
                    fontSize: PORTRAIT_TYPE.body,
                    fontWeight: 700,
                    color: `rgba(255,255,255,${0.82 - i * 0.07})`,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    opacity: e,
                    transform: `translateX(${interpolate(e, [0, 1], [24, 0])}px)`,
                  }}
                >
                  {artist}
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer CTA */}
        <div
          style={{
            fontSize: PORTRAIT_TYPE.caption,
            fontWeight: 600,
            color: acc2,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            opacity: artistEnters[displayArtists.length - 1] ?? 0,
          }}
        >
          TICKETS ON SALE NOW ↗
        </div>
      </div>
    </AbsoluteFill>
  );
};

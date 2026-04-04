/**
 * LindaMohamed Template - Packages & Workshops Slide Deck
 *
 * Recreates the 22-slide corporate presentation as animated Remotion compositions.
 * Design language: white/light backgrounds, dark green (#2E7D32) accents,
 * black text, Inter font, clean corporate style with photos and tables.
 *
 * Each slide is a separate scene component. The main LindaMohamedDeck
 * composition sequences them together.
 *
 * SLIDE MAP:
 *   Folie 1  - Cover: "Intro & Packages"
 *   Folie 2  - About Me: Bio + experience stats
 *   Folie 3  - What I Offer: 3-step workshop flow
 *   Folie 4  - Costs & Packages: Pricing table
 *   Folie 5  - Section Divider: "Workshops"
 *   Folie 6  - Workshop Modules: 3-row table
 *   Folie 7  - The First Workshop: Agenda
 *   Folie 8  - Next Steps: Journey roadmap
 *   Folie 9  - Next Steps: Customer-specific (Nov 2025)
 *   Folie 10 - Results: Horizontal maturity flow
 *   Folie 11 - Results: Staircase visualization
 *   Folie 12 - Results Step by Step: Detailed staircase
 *   Folie 13 - Results Step by Step: Flexible deep-dive
 *   Folie 14 - Results Step by Step: Video-focused
 *   Folie 15 - Section Divider: "More Information"
 *   Folie 16 - Idea-to-Prototype Pipeline: Timeline
 *   Folie 17 - Idea-to-Prototype Pipeline: Detailed
 *   Folie 18 - Components: AI Systems (concentric arcs)
 *   Folie 19 - Components: Cloud (pyramid)
 *   Folie 20 - Collaboration in Teams
 *   Folie 21 - Cloud Fundings
 *   Folie 22 - Thank You / Contact
 */

import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  Img,
  staticFile,
  Sequence,
  interpolate,
} from "remotion";
import {
  springEntrance,
  fadeIn,
  slideIn,
  staggerDelay,
  SPRING,
} from "../_shared/animations";
import { PADDING, TOP_SAFE } from "../_shared/layouts";
import { Icon, IconName } from "../_shared/Icon";

// ── Design Tokens (matching slide deck) ─────────────────────────
const GREEN = "#2E7D32";
const GREEN_LIGHT = "#43A047";
const GREEN_LIGHTER = "#66BB6A";
const GREEN_BG = "#f5f7f5";
const TEXT_BLACK = "#1a1a1a";
const TEXT_GRAY = "#4a4a4a";
const TEXT_MUTED = "#8a8a8a";
const WHITE = "#ffffff";
const CARD_BORDER = "rgba(46,125,50,0.15)";
const FONT = "'Inter', sans-serif";

// ── Shared: Hand-drawn infinity logo (SVG) ──────────────────────
const InfinityLogo: React.FC<{ size?: number; color?: string }> = ({
  size = 48,
  color = GREEN,
}) => (
  <svg width={size} height={size * 0.5} viewBox="0 0 100 50">
    <path
      d="M25 25 C25 10, 45 10, 50 25 C55 40, 75 40, 75 25 C75 10, 55 10, 50 25 C45 40, 25 40, 25 25Z"
      fill="none"
      stroke={color}
      strokeWidth={3}
      strokeLinecap="round"
    />
  </svg>
);


// ═══════════════════════════════════════════════════════════════
// FOLIE 1 - Cover: "Intro & Packages"
// Full-bleed photo, dark gradient left, logo top-left,
// large all-caps title bottom-left - matches original PPTX slide.
// ═══════════════════════════════════════════════════════════════

export const Folie1Cover: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const bgScale = interpolate(frame, [0, 150], [1.06, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });
  const overlayOpacity = fadeIn(frame, 0, 20);
  const logoOpacity = springEntrance(frame, fps, 8, SPRING.gentle);
  const line1Spring = springEntrance(frame, fps, 18, SPRING.default);
  const line2Spring = springEntrance(frame, fps, 28, SPRING.default);
  const taglineOpacity = fadeIn(frame, 50, 30);

  return (
    <AbsoluteFill style={{ backgroundColor: "#0a0a0a", fontFamily: FONT }}>

      {/* Full-bleed background photo with Ken Burns zoom */}
      <AbsoluteFill style={{ transform: `scale(${bgScale})`, transformOrigin: "60% 50%" }}>
        <Img
          src={staticFile("slides/lindamohamed/linda-speaking.jpg")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center top",
          }}
        />
      </AbsoluteFill>

      {/* Gradient overlay: heavy left for text legibility, fades to transparent right */}
      <AbsoluteFill
        style={{
          background: "linear-gradient(to right, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.65) 45%, rgba(0,0,0,0.18) 100%)",
          opacity: overlayOpacity,
        }}
      />

      {/* Logo + domain - top left */}
      <div
        style={{
          position: "absolute",
          top: TOP_SAFE,
          left: PADDING,
          display: "flex",
          flexDirection: "column",
          gap: 6,
          opacity: logoOpacity,
          transform: `translateY(${slideIn(logoOpacity, "up", 16)}px)`,
        }}
      >
        <InfinityLogo size={52} color={WHITE} />
        <div
          style={{
            fontSize: 24,
            fontWeight: 400,
            color: "rgba(255,255,255,0.65)",
            letterSpacing: 0.5,
          }}
        >
          lindamohamed.com
        </div>
      </div>

      {/* Title block - bottom left, matching PPTX layout */}
      <div
        style={{
          position: "absolute",
          bottom: 64,
          left: PADDING,
          right: "45%",
        }}
      >
        {/* INTRO & */}
        <div
          style={{
            fontSize: 88,
            fontWeight: 900,
            color: WHITE,
            lineHeight: 0.92,
            textTransform: "uppercase" as const,
            letterSpacing: -2,
            opacity: line1Spring,
            transform: `translateY(${slideIn(line1Spring, "up", 32)}px)`,
          }}
        >
          INTRO &
        </div>

        {/* PACKAGES */}
        <div
          style={{
            fontSize: 88,
            fontWeight: 900,
            color: WHITE,
            lineHeight: 0.92,
            textTransform: "uppercase" as const,
            letterSpacing: -2,
            opacity: line2Spring,
            transform: `translateY(${slideIn(line2Spring, "up", 32)}px)`,
            marginBottom: 28,
          }}
        >
          PACKAGES
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 24,
            fontWeight: 400,
            color: "rgba(255,255,255,0.80)",
            lineHeight: 1.45,
            opacity: taglineOpacity,
            maxWidth: 560,
          }}
        >
          AI & Cloud Consulting with focus on Data,{"\n"}
          Prototyping & PoC Fundings for AI- und Cloud Projects
        </div>
      </div>
    </AbsoluteFill>
  );
};


// ═══════════════════════════════════════════════════════════════
// FOLIE 2 - About Me: Bio, experience stats, logos
// Split layout: photo left, content right
// ═══════════════════════════════════════════════════════════════

interface StatBadgeProps {
  value: string;
  label: string;
  frame: number;
  delay: number;
  fps: number;
}

const StatBadge: React.FC<StatBadgeProps> = ({ value, label, frame, delay, fps }) => {
  const s = springEntrance(frame, fps, delay, SPRING.default);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "12px 16px",
        backgroundColor: GREEN_BG,
        borderRadius: 12,
        border: `1px solid ${CARD_BORDER}`,
        opacity: s,
        transform: `translateY(${slideIn(s, "up", 20)}px)`,
        minWidth: 100,
      }}
    >
      <div style={{ fontSize: 28, fontWeight: 800, color: GREEN }}>{value}</div>
      <div style={{ fontSize: 24, fontWeight: 500, color: TEXT_GRAY, marginTop: 4, textAlign: "center" }}>
        {label}
      </div>
    </div>
  );
};

export const Folie2AboutMe: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const photoOpacity = fadeIn(frame, 0, 22);
  const titleSpring = springEntrance(frame, fps, 18, SPRING.default);
  const expOpacity = fadeIn(frame, 35, 20);
  const logosOpacity = fadeIn(frame, 60, 20);
  const bottomOpacity = fadeIn(frame, 50, 20);

  const expItems: { icon: IconName; text: string }[] = [
    { icon: "code", text: "Software Development & IT (12+ Years)" },
    { icon: "cloud", text: "Cloud & AI/ML Experience (6+ Years)" },
    { icon: "laptop", text: "Enterprise IT Consulting (6+ Years)" },
  ];
  const companies = ["iTEC", "Drei", "EY", "creative-it", "ebcont", "lindamohamed.com"];

  const BOTTOM_H = 200;

  return (
    <AbsoluteFill style={{ backgroundColor: WHITE, fontFamily: FONT }}>

      {/* ── Left: Photo ──────────────────────────────── */}
      <div style={{
        position: "absolute", left: 0, top: 0,
        width: "38%", height: `calc(100% - ${BOTTOM_H}px)`,
        overflow: "hidden", opacity: photoOpacity,
      }}>
        <Img
          src={staticFile("slides/lindamohamed/linda-portrait.jpg")}
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }}
        />
      </div>

      {/* ── Right: Main content ───────────────────────── */}
      <div style={{
        position: "absolute",
        left: "38%", top: 0, right: 0,
        height: `calc(100% - ${BOTTOM_H}px)`,
        padding: `${TOP_SAFE}px ${PADDING}px 0 48px`,
        display: "flex", flexDirection: "column", justifyContent: "center",
      }}>
        {/* Title */}
        <div style={{
          fontSize: 76, fontWeight: 900, color: TEXT_BLACK,
          lineHeight: 0.95, letterSpacing: -2,
          opacity: titleSpring,
          transform: `translateY(${slideIn(titleSpring, "up", 22)}px)`,
        }}>
          HI, I AM LINDA
        </div>

        {/* Subtitle */}
        <div style={{
          fontSize: 24, fontWeight: 400, color: TEXT_MUTED,
          textTransform: "uppercase" as const, letterSpacing: 1,
          marginTop: 12, marginBottom: 28,
          opacity: titleSpring,
        }}>
          AI & Cloud Consultant and AWS Hero
        </div>

        {/* Experience pill */}
        <div style={{
          display: "inline-flex", alignSelf: "flex-start",
          backgroundColor: GREEN, color: WHITE,
          borderRadius: 20, padding: "6px 20px",
          fontSize: 24, fontWeight: 700,
          marginBottom: 18, opacity: expOpacity,
        }}>
          Experience
        </div>

        {/* Experience items */}
        {expItems.map((item, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "center", gap: 14,
            marginBottom: 12,
            opacity: fadeIn(frame, 35 + i * 12, 18),
          }}>
            <Icon name={item.icon} size={26} color={GREEN} />
            <div style={{ fontSize: 24, color: TEXT_BLACK }}>{item.text}</div>
          </div>
        ))}

        {/* Company logos (text badges - no image assets available) */}
        <div style={{
          display: "flex", gap: 10, flexWrap: "wrap" as const,
          marginTop: 22, opacity: logosOpacity,
        }}>
          {companies.map((c, i) => (
            <div key={i} style={{
              padding: "5px 12px",
              border: `1px solid ${CARD_BORDER}`,
              borderRadius: 6,
              fontSize: 24, fontWeight: 600, color: TEXT_BLACK,
              backgroundColor: "#f8f8f8",
            }}>{c}</div>
          ))}
        </div>
      </div>

      {/* ── Bottom bar: full-width, 3 columns ─────────── */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        height: BOTTOM_H,
        backgroundColor: "#f0f0ee",
        display: "flex", alignItems: "stretch",
        opacity: bottomOpacity,
      }}>
        {/* Volunteering */}
        <div style={{
          flex: 1, padding: "20px 28px",
          display: "flex", flexDirection: "column", justifyContent: "center",
        }}>
          <div style={{ fontSize: 24, fontWeight: 700, color: GREEN, marginBottom: 8 }}>Volunteering</div>
          <div style={{ fontSize: 24, color: TEXT_GRAY }}>AWS User Group Leader</div>
          <div style={{ fontSize: 24, color: TEXT_GRAY }}>Forverein AWS Community DACH</div>
          <div style={{ fontSize: 24, color: TEXT_GRAY }}>AWS Community HERO</div>
        </div>

        {/* About Me */}
        <div style={{
          flex: 1, padding: "20px 28px",
          borderLeft: "1px solid rgba(0,0,0,0.1)",
          display: "flex", flexDirection: "column", justifyContent: "center",
        }}>
          <div style={{
            display: "inline-flex", alignSelf: "flex-start",
            backgroundColor: GREEN, color: WHITE,
            borderRadius: 20, padding: "4px 16px",
            fontSize: 24, fontWeight: 700, marginBottom: 10,
          }}>About Me</div>
          {["I love building prototypes.", "I am a process nerd.", "Juggling is my passion."].map((t, i) => (
            <div key={i} style={{ fontSize: 24, color: TEXT_BLACK, marginBottom: 4 }}>{i + 1}. {t}</div>
          ))}
        </div>

        {/* Education */}
        <div style={{
          flex: 1, padding: "20px 28px",
          borderLeft: "1px solid rgba(0,0,0,0.1)",
          display: "flex", flexDirection: "column", justifyContent: "center",
        }}>
          <div style={{ fontSize: 24, fontWeight: 700, color: GREEN, marginBottom: 8 }}>Education</div>
          <div style={{ fontSize: 24, fontWeight: 600, color: TEXT_BLACK }}>HTL Pinkafeld</div>
          <div style={{ fontSize: 24, fontWeight: 600, color: TEXT_BLACK, marginTop: 6 }}>FH Technikum Wien</div>
          <div style={{ fontSize: 24, color: TEXT_MUTED, marginTop: 4 }}>MSc Computer Science</div>
        </div>
      </div>

    </AbsoluteFill>
  );
};


// ═══════════════════════════════════════════════════════════════
// FOLIE 3 - What I Offer: 3-step workshop flow + MVP support
// ═══════════════════════════════════════════════════════════════

interface StepCardProps {
  number: number;
  title: string;
  description: string;
  icon: IconName;
  frame: number;
  delay: number;
  fps: number;
}

const StepCard: React.FC<StepCardProps> = ({ number, title, description, icon, frame, delay, fps }) => {
  const s = springEntrance(frame, fps, delay, SPRING.default);
  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 24,
        backgroundColor: WHITE,
        borderRadius: 16,
        border: `1px solid ${CARD_BORDER}`,
        boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
        opacity: s,
        transform: `translateY(${slideIn(s, "up", 30)}px)`,
      }}
    >
      {/* Step number circle */}
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: "50%",
          backgroundColor: GREEN,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 24,
          fontWeight: 700,
          color: WHITE,
          marginBottom: 12,
        }}
      >
        {number}
      </div>
      <div style={{ marginBottom: 10 }}><Icon name={icon} size={32} color={GREEN} /></div>
      <div style={{ fontSize: 24, fontWeight: 700, color: TEXT_BLACK, textAlign: "center", marginBottom: 8 }}>
        {title}
      </div>
      <div style={{ fontSize: 24, color: TEXT_GRAY, textAlign: "center", lineHeight: 1.5 }}>
        {description}
      </div>
    </div>
  );
};

export const Folie3WhatIOffer: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = springEntrance(frame, fps, 10, SPRING.default);
  const arrowOpacity = fadeIn(frame, 90, 20);
  const mvpOpacity = fadeIn(frame, 120, 25);

  const steps = [
    { icon: "target" as IconName, title: "Goal", description: "Define your vision,\nidentify challenges" },
    { icon: "lightbulb" as IconName, title: "Concept", description: "Develop solutions,\nevaluate options" },
    { icon: "check-circle" as IconName, title: "Decision", description: "Choose approach,\nplan next steps" },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: GREEN_BG, fontFamily: FONT }}>
      <div
        style={{
          padding: PADDING,
          paddingTop: TOP_SAFE,
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        {/* Header */}
        <div
          style={{
            fontSize: 24,
            fontWeight: 600,
            color: GREEN,
            textTransform: "uppercase" as const,
            letterSpacing: 2,
            opacity: titleSpring,
            marginBottom: 6,
          }}
        >
          Services
        </div>
        <div
          style={{
            fontSize: 36,
            fontWeight: 800,
            color: TEXT_BLACK,
            opacity: titleSpring,
            transform: `translateX(${slideIn(titleSpring, "left", 25)}px)`,
            marginBottom: 40,
          }}
        >
          What I Offer
        </div>

        {/* 3-step flow */}
        <div style={{ display: "flex", gap: 24, alignItems: "stretch" }}>
          {steps.map((step, i) => (
            <React.Fragment key={i}>
              <StepCard
                number={i + 1}
                title={step.title}
                description={step.description}
                icon={step.icon}
                frame={frame}
                delay={staggerDelay(i, 40, 25)}
                fps={fps}
              />
              {i < steps.length - 1 && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    opacity: arrowOpacity,
                    color: GREEN,
                    fontSize: 28,
                    fontWeight: 700,
                  }}
                >
                  →
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* MVP support badge */}
        <div
          style={{
            marginTop: 32,
            display: "flex",
            justifyContent: "center",
            opacity: mvpOpacity,
          }}
        >
          <div
            style={{
              padding: "12px 28px",
              borderRadius: 24,
              background: `linear-gradient(135deg, ${GREEN}, ${GREEN_LIGHTER})`,
              color: WHITE,
              fontSize: 24,
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <Icon name="rocket" size={20} color={WHITE} /> + MVP Development Support
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};


// ═══════════════════════════════════════════════════════════════
// FOLIE 4 - Costs & Packages: Pricing table + package examples
// ═══════════════════════════════════════════════════════════════

interface PricingRowProps {
  service: string;
  price: string;
  note?: string;
  frame: number;
  delay: number;
  fps: number;
  isHighlighted?: boolean;
}

const PricingRow: React.FC<PricingRowProps> = ({ service, price, note, frame, delay, fps, isHighlighted }) => {
  const s = springEntrance(frame, fps, delay, SPRING.default);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "14px 20px",
        backgroundColor: isHighlighted ? "rgba(46,125,50,0.08)" : WHITE,
        borderRadius: 10,
        border: `1px solid ${isHighlighted ? GREEN : CARD_BORDER}`,
        opacity: s,
        transform: `translateX(${slideIn(s, "right", 20)}px)`,
      }}
    >
      <div>
        <div style={{ fontSize: 24, fontWeight: 600, color: TEXT_BLACK }}>{service}</div>
        {note && <div style={{ fontSize: 24, color: TEXT_MUTED, marginTop: 2 }}>{note}</div>}
      </div>
      <div style={{ fontSize: 24, fontWeight: 800, color: GREEN }}>{price}</div>
    </div>
  );
};

export const Folie4CostsPackages: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = springEntrance(frame, fps, 10, SPRING.default);
  const packagesOpacity = fadeIn(frame, 120, 25);

  const rates = [
    { service: "Workshop (half-day)", price: "~2.000€", note: "3-4 hours, interactive" },
    { service: "Result Document", price: "~1.000€", note: "Presentation, concept, roadmap" },
    { service: "Consulting", price: "250€/h", isHighlighted: true },
    { service: "Stage / Speaking", price: "500€/h" },
  ];

  const packages = [
    { name: "Discovery", price: "~4.000€", items: "1 Workshop + Result" },
    { name: "Strategy", price: "~8.000€", items: "2 Workshops + Results + Consulting" },
    { name: "Comprehensive", price: "~16.000€", items: "Full engagement + MVP support" },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: WHITE, fontFamily: FONT }}>
      <div
        style={{
          padding: PADDING,
          paddingTop: TOP_SAFE,
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        {/* Header */}
        <div
          style={{
            fontSize: 24,
            fontWeight: 600,
            color: GREEN,
            textTransform: "uppercase" as const,
            letterSpacing: 2,
            opacity: titleSpring,
            marginBottom: 6,
          }}
        >
          Investment
        </div>
        <div
          style={{
            fontSize: 36,
            fontWeight: 800,
            color: TEXT_BLACK,
            opacity: titleSpring,
            transform: `translateX(${slideIn(titleSpring, "left", 25)}px)`,
            marginBottom: 28,
          }}
        >
          Costs & Packages
        </div>

        <div style={{ display: "flex", gap: 32, flex: 1 }}>
          {/* Left: Rate card */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ fontSize: 24, fontWeight: 700, color: TEXT_BLACK, marginBottom: 4 }}>
              Rates
            </div>
            {rates.map((r, i) => (
              <PricingRow
                key={i}
                service={r.service}
                price={r.price}
                note={r.note}
                frame={frame}
                delay={staggerDelay(i, 30, 20)}
                fps={fps}
                isHighlighted={r.isHighlighted}
              />
            ))}
          </div>

          {/* Right: Package examples */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: 12,
              opacity: packagesOpacity,
            }}
          >
            <div style={{ fontSize: 24, fontWeight: 700, color: TEXT_BLACK, marginBottom: 4 }}>
              Package Examples
            </div>
            {packages.map((pkg, i) => {
              const pkgSpring = springEntrance(frame, fps, staggerDelay(i, 130, 25), SPRING.default);
              return (
                <div
                  key={i}
                  style={{
                    padding: "16px 20px",
                    borderRadius: 12,
                    background: `linear-gradient(135deg, rgba(46,125,50,${0.04 + i * 0.04}), rgba(46,125,50,${0.08 + i * 0.04}))`,
                    border: `1px solid ${CARD_BORDER}`,
                    opacity: pkgSpring,
                    transform: `translateY(${slideIn(pkgSpring, "up", 20)}px)`,
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ fontSize: 24, fontWeight: 700, color: TEXT_BLACK }}>{pkg.name}</div>
                    <div style={{ fontSize: 24, fontWeight: 800, color: GREEN }}>{pkg.price}</div>
                  </div>
                  <div style={{ fontSize: 24, color: TEXT_GRAY, marginTop: 4 }}>{pkg.items}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};


// ═══════════════════════════════════════════════════════════════
// FOLIE 5 - Section Divider: "Workshops" (photo + title)
// Reusable for Folie 15 ("More Information") too
// ═══════════════════════════════════════════════════════════════

// White-left / photo-right section divider - matches Folie5 and Folie15 layouts
interface SectionDividerProps {
  titleLine1: string;
  titleLine2?: string;
  subtitle: string;
  photo: string; // staticFile path
}

const SectionDivider: React.FC<SectionDividerProps> = ({ titleLine1, titleLine2, subtitle, photo }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoSpring = springEntrance(frame, fps, 8, SPRING.gentle);
  const titleSpring = springEntrance(frame, fps, 22, SPRING.default);
  const subtitleOpacity = fadeIn(frame, 45, 22);
  const photoScale = interpolate(frame, [0, 180], [1.06, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
  const photoOpacity = fadeIn(frame, 0, 25);

  return (
    <AbsoluteFill style={{ backgroundColor: WHITE, fontFamily: FONT }}>
      {/* Left: White panel ~48% */}
      <div style={{
        position: "absolute", left: 0, top: 0,
        width: "48%", height: "100%",
        display: "flex", flexDirection: "column",
        justifyContent: "center",
        padding: `0 ${PADDING}px`,
      }}>
        {/* Infinity logo */}
        <div style={{ opacity: logoSpring, marginBottom: 32 }}>
          <InfinityLogo size={64} color={TEXT_BLACK} />
        </div>

        {/* Title - large bold, matches original PPTX typography */}
        <div style={{
          fontSize: 96, fontWeight: 900, color: TEXT_BLACK,
          lineHeight: 0.88, letterSpacing: -3, textTransform: "uppercase" as const,
          opacity: titleSpring,
          transform: `translateY(${slideIn(titleSpring, "up", 24)}px)`,
        }}>
          {titleLine1}
        </div>
        {titleLine2 && (
          <div style={{
            fontSize: 96, fontWeight: 900, color: TEXT_BLACK,
            lineHeight: 0.88, letterSpacing: -3, textTransform: "uppercase" as const,
            opacity: titleSpring,
            transform: `translateY(${slideIn(titleSpring, "up", 24)}px)`,
            marginBottom: 28,
          }}>
            {titleLine2}
          </div>
        )}

        {/* Subtitle */}
        <div style={{
          fontSize: 24, fontWeight: 400, color: TEXT_MUTED,
          textTransform: "uppercase" as const, letterSpacing: 0.5,
          lineHeight: 1.4, marginTop: titleLine2 ? 0 : 24,
          maxWidth: 420, opacity: subtitleOpacity,
        }}>
          {subtitle}
        </div>
      </div>

      {/* Right: Photo ~52% */}
      <div style={{
        position: "absolute", right: 0, top: 0,
        width: "52%", height: "100%",
        overflow: "hidden", opacity: photoOpacity,
      }}>
        <div style={{ width: "100%", height: "100%", transform: `scale(${photoScale})`, transformOrigin: "center center" }}>
          <Img
            src={staticFile(photo)}
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }}
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const Folie5Workshops: React.FC = () => (
  <SectionDivider
    titleLine1="WORK-"
    titleLine2="SHOPS"
    subtitle="Details about workshop modules, results and next steps"
    photo="slides/lindamohamed/linda-portrait.jpg"
  />
);

export const Folie15MoreInfo: React.FC = () => (
  <SectionDivider
    titleLine1="MORE"
    titleLine2="INFORMATION"
    subtitle="More about technologies, results, continuous prototyping pipelines and collaboration with customers and partners"
    photo="slides/lindamohamed/linda-portrait.jpg"
  />
);


// ═══════════════════════════════════════════════════════════════
// FOLIE 6 - Workshop Modules: 3-row table
// Content/Result/Perspective columns
// ═══════════════════════════════════════════════════════════════

export const Folie6WorkshopModules: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = springEntrance(frame, fps, 10, SPRING.default);

  const modules = [
    {
      module: "Module 1: Discovery",
      content: "Goal definition, use case mapping, stakeholder alignment",
      result: "Vision document, prioritized use cases",
      perspective: "Strategic clarity",
    },
    {
      module: "Module 2: Concept",
      content: "Solution design, architecture options, feasibility check",
      result: "Technical concept, architecture diagram",
      perspective: "Technical direction",
    },
    {
      module: "Module 3: Decision",
      content: "Evaluation matrix, risk assessment, roadmap planning",
      result: "Decision paper, implementation roadmap",
      perspective: "Actionable next steps",
    },
  ];

  const columns = ["Content", "Result", "Perspective"];

  return (
    <AbsoluteFill style={{ backgroundColor: WHITE, fontFamily: FONT }}>
      <div
        style={{
          padding: PADDING,
          paddingTop: TOP_SAFE,
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        {/* Header */}
        <div
          style={{
            fontSize: 24,
            fontWeight: 600,
            color: GREEN,
            textTransform: "uppercase" as const,
            letterSpacing: 2,
            opacity: titleSpring,
            marginBottom: 6,
          }}
        >
          Workshop Structure
        </div>
        <div
          style={{
            fontSize: 36,
            fontWeight: 800,
            color: TEXT_BLACK,
            opacity: titleSpring,
            transform: `translateX(${slideIn(titleSpring, "left", 25)}px)`,
            marginBottom: 32,
          }}
        >
          Workshop Modules
        </div>

        {/* Table header */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "180px 1fr 1fr 1fr",
            gap: 2,
            marginBottom: 2,
          }}
        >
          <div
            style={{
              padding: "12px 16px",
              backgroundColor: GREEN,
              borderRadius: "8px 0 0 0",
              fontSize: 24,
              fontWeight: 700,
              color: WHITE,
              opacity: fadeIn(frame, 20, 15),
            }}
          >
            Module
          </div>
          {columns.map((col, i) => (
            <div
              key={col}
              style={{
                padding: "12px 16px",
                backgroundColor: GREEN,
                borderRadius: i === columns.length - 1 ? "0 8px 0 0" : 0,
                fontSize: 24,
                fontWeight: 700,
                color: WHITE,
                opacity: fadeIn(frame, 20 + (i + 1) * 5, 15),
              }}
            >
              {col}
            </div>
          ))}
        </div>

        {/* Table rows */}
        {modules.map((mod, rowIdx) => {
          const rowDelay = staggerDelay(rowIdx, 40, 25);
          const rowSpring = springEntrance(frame, fps, rowDelay, SPRING.default);
          const isLast = rowIdx === modules.length - 1;
          return (
            <div
              key={rowIdx}
              style={{
                display: "grid",
                gridTemplateColumns: "180px 1fr 1fr 1fr",
                gap: 2,
                marginBottom: 2,
                opacity: rowSpring,
                transform: `translateX(${slideIn(rowSpring, "right", 20)}px)`,
              }}
            >
              <div
                style={{
                  padding: "14px 16px",
                  backgroundColor: "rgba(46,125,50,0.08)",
                  borderRadius: isLast ? "0 0 0 8px" : 0,
                  fontSize: 24,
                  fontWeight: 700,
                  color: GREEN,
                }}
              >
                {mod.module}
              </div>
              {[mod.content, mod.result, mod.perspective].map((cell, colIdx) => (
                <div
                  key={colIdx}
                  style={{
                    padding: "14px 16px",
                    backgroundColor: rowIdx % 2 === 0 ? GREEN_BG : WHITE,
                    borderRadius: isLast && colIdx === 2 ? "0 0 8px 0" : 0,
                    fontSize: 24,
                    color: TEXT_GRAY,
                    lineHeight: 1.5,
                  }}
                >
                  {cell}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};


// ═══════════════════════════════════════════════════════════════
// FOLIE 7 - The First Workshop: Agenda table
// ═══════════════════════════════════════════════════════════════

export const Folie7FirstWorkshop: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = springEntrance(frame, fps, 10, SPRING.default);

  const agenda = [
    { time: "~0.5h", topic: "Goal Definition", desc: "Align on objectives, define success criteria" },
    { time: "~1h", topic: "Use Cases", desc: "Map out concrete use cases, prioritize by impact" },
    { time: "~1h", topic: "Test Data & Feasibility", desc: "Identify data sources, check technical feasibility" },
    { time: "~0.5h", topic: "Next Steps", desc: "Define action items, assign responsibilities" },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: GREEN_BG, fontFamily: FONT }}>
      <div
        style={{
          padding: PADDING,
          paddingTop: TOP_SAFE,
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        {/* Header */}
        <div
          style={{
            fontSize: 24,
            fontWeight: 600,
            color: GREEN,
            textTransform: "uppercase" as const,
            letterSpacing: 2,
            opacity: titleSpring,
            marginBottom: 6,
          }}
        >
          Getting Started
        </div>
        <div
          style={{
            fontSize: 36,
            fontWeight: 800,
            color: TEXT_BLACK,
            opacity: titleSpring,
            transform: `translateX(${slideIn(titleSpring, "left", 25)}px)`,
            marginBottom: 8,
          }}
        >
          The First Workshop
        </div>
        <div
          style={{
            fontSize: 24,
            color: TEXT_GRAY,
            opacity: fadeIn(frame, 25, 20),
            marginBottom: 32,
          }}
        >
          Half-day interactive session (~3 hours)
        </div>

        {/* Agenda items */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {agenda.map((item, i) => {
            const s = springEntrance(frame, fps, staggerDelay(i, 40, 22), SPRING.default);
            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 20,
                  padding: "16px 24px",
                  backgroundColor: WHITE,
                  borderRadius: 14,
                  border: `1px solid ${CARD_BORDER}`,
                  boxShadow: "0 1px 6px rgba(0,0,0,0.04)",
                  opacity: s,
                  transform: `translateX(${slideIn(s, "right", 25)}px)`,
                }}
              >
                {/* Time badge */}
                <div
                  style={{
                    minWidth: 64,
                    padding: "6px 12px",
                    borderRadius: 8,
                    backgroundColor: GREEN,
                    color: WHITE,
                    fontSize: 24,
                    fontWeight: 700,
                    textAlign: "center",
                  }}
                >
                  {item.time}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 24, fontWeight: 700, color: TEXT_BLACK }}>{item.topic}</div>
                  <div style={{ fontSize: 24, color: TEXT_GRAY, marginTop: 2 }}>{item.desc}</div>
                </div>
                {/* Step number */}
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    border: `2px solid ${GREEN}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 24,
                    fontWeight: 700,
                    color: GREEN,
                  }}
                >
                  {i + 1}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};


// ═══════════════════════════════════════════════════════════════
// FOLIE 8 - Next Steps: Generic journey roadmap (0→1→2→3)
// ═══════════════════════════════════════════════════════════════

export const Folie8NextSteps: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = springEntrance(frame, fps, 10, SPRING.default);

  const milestones = [
    { step: "0", label: "Workshop", result: "Presentation" },
    { step: "1", label: "Concept", result: "Video / Prototype" },
    { step: "2", label: "Build", result: "POC / MVP" },
    { step: "3", label: "Launch", result: "Functional Product" },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: WHITE, fontFamily: FONT }}>
      <div
        style={{
          padding: PADDING,
          paddingTop: TOP_SAFE,
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        {/* Header */}
        <div
          style={{
            fontSize: 24,
            fontWeight: 600,
            color: GREEN,
            textTransform: "uppercase" as const,
            letterSpacing: 2,
            opacity: titleSpring,
            marginBottom: 6,
          }}
        >
          Roadmap
        </div>
        <div
          style={{
            fontSize: 36,
            fontWeight: 800,
            color: TEXT_BLACK,
            opacity: titleSpring,
            transform: `translateX(${slideIn(titleSpring, "left", 25)}px)`,
            marginBottom: 48,
          }}
        >
          Next Steps
        </div>

        {/* Journey timeline */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 0,
            position: "relative",
          }}
        >
          {milestones.map((m, i) => {
            const s = springEntrance(frame, fps, staggerDelay(i, 35, 25), SPRING.default);
            const isLast = i === milestones.length - 1;
            return (
              <React.Fragment key={i}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    opacity: s,
                    transform: `translateY(${slideIn(s, "up", 25)}px)`,
                    minWidth: 140,
                  }}
                >
                  {/* Circle */}
                  <div
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: "50%",
                      backgroundColor: i === 0 ? GREEN : WHITE,
                      border: `3px solid ${GREEN}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 24,
                      fontWeight: 800,
                      color: i === 0 ? WHITE : GREEN,
                    }}
                  >
                    {m.step}
                  </div>
                  <div
                    style={{
                      fontSize: 24,
                      fontWeight: 700,
                      color: TEXT_BLACK,
                      marginTop: 12,
                      textAlign: "center",
                    }}
                  >
                    {m.label}
                  </div>
                  <div
                    style={{
                      fontSize: 24,
                      color: TEXT_MUTED,
                      marginTop: 4,
                      textAlign: "center",
                      padding: "4px 10px",
                      backgroundColor: GREEN_BG,
                      borderRadius: 6,
                    }}
                  >
                    {m.result}
                  </div>
                </div>
                {/* Connector arrow */}
                {!isLast && (
                  <div
                    style={{
                      width: 60,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      opacity: fadeIn(frame, staggerDelay(i, 60, 25), 15),
                      marginBottom: 40,
                    }}
                  >
                    <div
                      style={{
                        width: 40,
                        height: 2,
                        backgroundColor: GREEN_LIGHT,
                      }}
                    />
                    <div
                      style={{
                        width: 0,
                        height: 0,
                        borderTop: "6px solid transparent",
                        borderBottom: "6px solid transparent",
                        borderLeft: `8px solid ${GREEN_LIGHT}`,
                      }}
                    />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};


// ═══════════════════════════════════════════════════════════════
// FOLIE 10 - Results: Horizontal maturity flow
// Clarity → Concept → Prototype → MVP → Product
// ═══════════════════════════════════════════════════════════════

export const Folie10Results: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = springEntrance(frame, fps, 10, SPRING.default);

  const stages: { icon: IconName; label: string; desc: string }[] = [
    { icon: "lightbulb", label: "Clarity", desc: "Understand the problem" },
    { icon: "pencil", label: "Concept", desc: "Design the solution" },
    { icon: "wrench", label: "Prototype", desc: "Build a demo" },
    { icon: "rocket", label: "MVP", desc: "Ship minimum viable" },
    { icon: "check-circle", label: "Product", desc: "Production-ready" },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: GREEN_BG, fontFamily: FONT }}>
      <div
        style={{
          padding: PADDING,
          paddingTop: TOP_SAFE,
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        {/* Header */}
        <div
          style={{
            fontSize: 24,
            fontWeight: 600,
            color: GREEN,
            textTransform: "uppercase" as const,
            letterSpacing: 2,
            opacity: titleSpring,
            marginBottom: 6,
          }}
        >
          Deliverables
        </div>
        <div
          style={{
            fontSize: 36,
            fontWeight: 800,
            color: TEXT_BLACK,
            opacity: titleSpring,
            transform: `translateX(${slideIn(titleSpring, "left", 25)}px)`,
            marginBottom: 48,
          }}
        >
          Results
        </div>

        {/* Maturity flow */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
            gap: 0,
          }}
        >
          {stages.map((stage, i) => {
            const s = springEntrance(frame, fps, staggerDelay(i, 35, 22), SPRING.default);
            const isLast = i === stages.length - 1;
            // Gradient green intensity increases with each stage
            const greenIntensity = 0.06 + i * 0.06;
            return (
              <React.Fragment key={i}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    opacity: s,
                    transform: `translateY(${slideIn(s, "up", 20)}px)`,
                    minWidth: 130,
                  }}
                >
                  <div
                    style={{
                      width: 64,
                      height: 64,
                      borderRadius: 16,
                      backgroundColor: `rgba(46,125,50,${greenIntensity})`,
                      border: `2px solid rgba(46,125,50,${0.2 + i * 0.1})`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Icon name={stage.icon} size={28} color={GREEN} />
                  </div>
                  <div
                    style={{
                      fontSize: 24,
                      fontWeight: 700,
                      color: TEXT_BLACK,
                      marginTop: 12,
                      textAlign: "center",
                    }}
                  >
                    {stage.label}
                  </div>
                  <div
                    style={{
                      fontSize: 24,
                      color: TEXT_GRAY,
                      marginTop: 4,
                      textAlign: "center",
                    }}
                  >
                    {stage.desc}
                  </div>
                </div>
                {!isLast && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginTop: 28,
                      opacity: fadeIn(frame, staggerDelay(i, 55, 22), 15),
                    }}
                  >
                    <div style={{ width: 24, height: 2, backgroundColor: GREEN_LIGHT }} />
                    <div
                      style={{
                        width: 0,
                        height: 0,
                        borderTop: "5px solid transparent",
                        borderBottom: "5px solid transparent",
                        borderLeft: `7px solid ${GREEN_LIGHT}`,
                      }}
                    />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Progress bar underneath */}
        <div
          style={{
            marginTop: 40,
            height: 6,
            backgroundColor: "rgba(46,125,50,0.1)",
            borderRadius: 3,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${interpolate(frame, [80, 180], [0, 100], { extrapolateRight: "clamp", extrapolateLeft: "clamp" })}%`,
              background: `linear-gradient(90deg, ${GREEN}, ${GREEN_LIGHTER})`,
              borderRadius: 3,
            }}
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};


// ═══════════════════════════════════════════════════════════════
// FOLIE 11 - Results: Staircase visualization of maturity levels
// ═══════════════════════════════════════════════════════════════

export const Folie11Staircase: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = springEntrance(frame, fps, 10, SPRING.default);

  const steps = [
    { label: "Clarity", height: 80 },
    { label: "Concept", height: 140 },
    { label: "Prototype", height: 200 },
    { label: "MVP", height: 260 },
    { label: "Product", height: 320 },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: WHITE, fontFamily: FONT }}>
      <div
        style={{
          padding: PADDING,
          paddingTop: TOP_SAFE,
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        {/* Header */}
        <div
          style={{
            fontSize: 24,
            fontWeight: 600,
            color: GREEN,
            textTransform: "uppercase" as const,
            letterSpacing: 2,
            opacity: titleSpring,
            marginBottom: 6,
          }}
        >
          Maturity Levels
        </div>
        <div
          style={{
            fontSize: 36,
            fontWeight: 800,
            color: TEXT_BLACK,
            opacity: titleSpring,
            transform: `translateX(${slideIn(titleSpring, "left", 25)}px)`,
            marginBottom: 24,
          }}
        >
          Results
        </div>

        {/* Staircase */}
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            gap: 8,
            paddingBottom: 40,
          }}
        >
          {steps.map((step, i) => {
            const s = springEntrance(frame, fps, staggerDelay(i, 30, 22), SPRING.default);
            const greenAlpha = 0.15 + i * 0.18;
            const barHeight = interpolate(s, [0, 1], [0, step.height]);
            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: 100,
                }}
              >
                {/* Label on top */}
                <div
                  style={{
                    fontSize: 24,
                    fontWeight: 700,
                    color: GREEN,
                    marginBottom: 8,
                    opacity: s,
                  }}
                >
                  {step.label}
                </div>
                {/* Bar */}
                <div
                  style={{
                    width: "100%",
                    height: barHeight,
                    backgroundColor: `rgba(46,125,50,${greenAlpha})`,
                    borderRadius: "8px 8px 0 0",
                    border: `1px solid rgba(46,125,50,${greenAlpha + 0.1})`,
                    borderBottom: "none",
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* Base line */}
        <div
          style={{
            height: 3,
            backgroundColor: GREEN,
            borderRadius: 2,
            marginLeft: 60,
            marginRight: 60,
          }}
        />
      </div>
    </AbsoluteFill>
  );
};


// ═══════════════════════════════════════════════════════════════
// FOLIE 16 - Idea-to-Prototype Pipeline: Timeline with tech stack
// ═══════════════════════════════════════════════════════════════

export const Folie16Pipeline: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = springEntrance(frame, fps, 10, SPRING.default);

  const phases = [
    { phase: "Ideation", duration: "1-2 weeks", tools: ["Workshops", "Miro"], color: "rgba(46,125,50,0.1)" },
    { phase: "Design", duration: "1-2 weeks", tools: ["Architecture", "Diagrams"], color: "rgba(46,125,50,0.18)" },
    { phase: "Prototype", duration: "2-4 weeks", tools: ["Python", "AWS/Azure"], color: "rgba(46,125,50,0.28)" },
    { phase: "MVP", duration: "4-8 weeks", tools: ["Terraform", "CI/CD"], color: "rgba(46,125,50,0.4)" },
  ];

  const techStack = [
    "AWS", "Azure", "OpenShift", "Terraform", "Python", "Java", "GitLab", "GitHub",
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: WHITE, fontFamily: FONT }}>
      <div
        style={{
          padding: PADDING,
          paddingTop: TOP_SAFE,
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        {/* Header */}
        <div
          style={{
            fontSize: 24,
            fontWeight: 600,
            color: GREEN,
            textTransform: "uppercase" as const,
            letterSpacing: 2,
            opacity: titleSpring,
            marginBottom: 6,
          }}
        >
          Process
        </div>
        <div
          style={{
            fontSize: 36,
            fontWeight: 800,
            color: TEXT_BLACK,
            opacity: titleSpring,
            transform: `translateX(${slideIn(titleSpring, "left", 25)}px)`,
            marginBottom: 36,
          }}
        >
          Idea-to-Prototype Pipeline
        </div>

        {/* Timeline phases */}
        <div style={{ display: "flex", gap: 12, marginBottom: 32 }}>
          {phases.map((p, i) => {
            const s = springEntrance(frame, fps, staggerDelay(i, 30, 22), SPRING.default);
            return (
              <div
                key={i}
                style={{
                  flex: 1,
                  padding: "20px 16px",
                  backgroundColor: p.color,
                  borderRadius: 14,
                  border: `1px solid ${CARD_BORDER}`,
                  opacity: s,
                  transform: `translateY(${slideIn(s, "up", 20)}px)`,
                }}
              >
                <div style={{ fontSize: 24, fontWeight: 700, color: TEXT_BLACK }}>{p.phase}</div>
                <div style={{ fontSize: 24, color: GREEN, fontWeight: 600, marginTop: 4 }}>{p.duration}</div>
                <div style={{ fontSize: 24, color: TEXT_GRAY, marginTop: 8 }}>
                  {p.tools.join(" · ")}
                </div>
              </div>
            );
          })}
        </div>

        {/* Connecting arrow */}
        <div
          style={{
            height: 3,
            background: `linear-gradient(90deg, ${GREEN}, ${GREEN_LIGHTER})`,
            borderRadius: 2,
            marginBottom: 28,
            opacity: fadeIn(frame, 100, 20),
          }}
        />

        {/* Tech stack badges */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap" as const,
            gap: 10,
            justifyContent: "center",
          }}
        >
          {techStack.map((tech, i) => {
            const badgeOpacity = fadeIn(frame, staggerDelay(i, 110, 8), 15);
            return (
              <div
                key={tech}
                style={{
                  padding: "6px 16px",
                  borderRadius: 20,
                  backgroundColor: GREEN_BG,
                  border: `1px solid ${CARD_BORDER}`,
                  fontSize: 24,
                  fontWeight: 600,
                  color: GREEN,
                  opacity: badgeOpacity,
                }}
              >
                {tech}
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};


// ═══════════════════════════════════════════════════════════════
// FOLIE 18 - Components: AI Systems
// AI/ML/DL/GenAI breakdown with concentric arcs
// ═══════════════════════════════════════════════════════════════

export const Folie18AISystems: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = springEntrance(frame, fps, 10, SPRING.default);

  const layers = [
    { label: "Artificial Intelligence", radius: 160, alpha: 0.08 },
    { label: "Machine Learning", radius: 125, alpha: 0.15 },
    { label: "Deep Learning", radius: 90, alpha: 0.25 },
    { label: "Generative AI", radius: 55, alpha: 0.4 },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: WHITE, fontFamily: FONT }}>
      <div
        style={{
          padding: PADDING,
          paddingTop: TOP_SAFE,
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        {/* Header */}
        <div
          style={{
            fontSize: 24,
            fontWeight: 600,
            color: GREEN,
            textTransform: "uppercase" as const,
            letterSpacing: 2,
            opacity: titleSpring,
            marginBottom: 6,
          }}
        >
          Technology
        </div>
        <div
          style={{
            fontSize: 36,
            fontWeight: 800,
            color: TEXT_BLACK,
            opacity: titleSpring,
            transform: `translateX(${slideIn(titleSpring, "left", 25)}px)`,
            marginBottom: 16,
          }}
        >
          Components: AI Systems
        </div>

        {/* Concentric circles */}
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          {layers.map((layer, i) => {
            const s = springEntrance(frame, fps, staggerDelay(i, 30, 25), SPRING.gentle);
            const size = layer.radius * 2;
            return (
              <div
                key={i}
                style={{
                  position: "absolute",
                  width: size,
                  height: size,
                  borderRadius: "50%",
                  backgroundColor: `rgba(46,125,50,${layer.alpha})`,
                  border: `2px solid rgba(46,125,50,${layer.alpha + 0.1})`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  opacity: s,
                  transform: `scale(${interpolate(s, [0, 1], [0.7, 1])})`,
                }}
              >
                {/* Label only on the innermost visible ring */}
                {i === layers.length - 1 && (
                  <div
                    style={{
                      fontSize: 24,
                      fontWeight: 700,
                      color: GREEN,
                      textAlign: "center",
                    }}
                  >
                    {layer.label}
                  </div>
                )}
              </div>
            );
          })}

          {/* Labels positioned outside rings */}
          {layers.slice(0, -1).map((layer, i) => {
            const labelOpacity = fadeIn(frame, staggerDelay(i, 80, 20), 15);
            const yOffset = -(layer.radius + 12);
            return (
              <div
                key={`label-${i}`}
                style={{
                  position: "absolute",
                  top: `calc(50% + ${yOffset}px)`,
                  left: "calc(50% + 10px)",
                  fontSize: 24,
                  fontWeight: 600,
                  color: GREEN,
                  opacity: labelOpacity,
                  whiteSpace: "nowrap" as const,
                }}
              >
                {layer.label}
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};


// ═══════════════════════════════════════════════════════════════
// FOLIE 19 - Components: Cloud (SaaS/PaaS/IaaS/On-Prem pyramid)
// ═══════════════════════════════════════════════════════════════

export const Folie19Cloud: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = springEntrance(frame, fps, 10, SPRING.default);

  const layers = [
    { label: "SaaS", desc: "Software as a Service", width: 280, alpha: 0.4 },
    { label: "PaaS", desc: "Platform as a Service", width: 400, alpha: 0.28 },
    { label: "IaaS", desc: "Infrastructure as a Service", width: 520, alpha: 0.18 },
    { label: "On-Premises", desc: "Self-managed infrastructure", width: 640, alpha: 0.08 },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: GREEN_BG, fontFamily: FONT }}>
      <div
        style={{
          padding: PADDING,
          paddingTop: TOP_SAFE,
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        {/* Header */}
        <div
          style={{
            fontSize: 24,
            fontWeight: 600,
            color: GREEN,
            textTransform: "uppercase" as const,
            letterSpacing: 2,
            opacity: titleSpring,
            marginBottom: 6,
          }}
        >
          Technology
        </div>
        <div
          style={{
            fontSize: 36,
            fontWeight: 800,
            color: TEXT_BLACK,
            opacity: titleSpring,
            transform: `translateX(${slideIn(titleSpring, "left", 25)}px)`,
            marginBottom: 24,
          }}
        >
          Components: Cloud
        </div>

        {/* Pyramid */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
          }}
        >
          {layers.map((layer, i) => {
            const s = springEntrance(frame, fps, staggerDelay(i, 30, 22), SPRING.default);
            return (
              <div
                key={i}
                style={{
                  width: layer.width,
                  padding: "16px 24px",
                  backgroundColor: `rgba(46,125,50,${layer.alpha})`,
                  borderRadius: i === 0 ? "16px 16px 4px 4px" : i === layers.length - 1 ? "4px 4px 16px 16px" : 4,
                  border: `1px solid rgba(46,125,50,${layer.alpha + 0.08})`,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  opacity: s,
                  transform: `translateY(${slideIn(s, "up", 15)}px)`,
                }}
              >
                <div style={{ fontSize: 24, fontWeight: 700, color: TEXT_BLACK }}>{layer.label}</div>
                <div style={{ fontSize: 24, color: TEXT_GRAY }}>{layer.desc}</div>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};


// ═══════════════════════════════════════════════════════════════
// FOLIE 20 - Collaboration in Teams: 5 service areas + partners
// ═══════════════════════════════════════════════════════════════

export const Folie20Collaboration: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = springEntrance(frame, fps, 10, SPRING.default);

  const services: { icon: IconName; title: string; desc: string }[] = [
    { icon: "layers", title: "AI & ML", desc: "Model development, fine-tuning, deployment" },
    { icon: "cloud", title: "Cloud", desc: "Architecture, migration, optimization" },
    { icon: "wrench", title: "DevOps", desc: "CI/CD, IaC, monitoring" },
    { icon: "chart-bar", title: "Data", desc: "Analytics, pipelines, governance" },
    { icon: "target", title: "Strategy", desc: "Workshops, roadmaps, consulting" },
  ];

  const partners = ["ebcont", "auvaria", "kawa", "sviss", "devoteam", "orbit", "adversary"];

  return (
    <AbsoluteFill style={{ backgroundColor: WHITE, fontFamily: FONT }}>
      <div
        style={{
          padding: PADDING,
          paddingTop: TOP_SAFE,
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        {/* Header */}
        <div
          style={{
            fontSize: 24,
            fontWeight: 600,
            color: GREEN,
            textTransform: "uppercase" as const,
            letterSpacing: 2,
            opacity: titleSpring,
            marginBottom: 6,
          }}
        >
          Network
        </div>
        <div
          style={{
            fontSize: 36,
            fontWeight: 800,
            color: TEXT_BLACK,
            opacity: titleSpring,
            transform: `translateX(${slideIn(titleSpring, "left", 25)}px)`,
            marginBottom: 28,
          }}
        >
          Collaboration in Teams
        </div>

        {/* Service cards - 5 columns */}
        <div style={{ display: "flex", gap: 12, marginBottom: 28 }}>
          {services.map((svc, i) => {
            const s = springEntrance(frame, fps, staggerDelay(i, 30, 20), SPRING.default);
            return (
              <div
                key={i}
                style={{
                  flex: 1,
                  padding: "18px 14px",
                  backgroundColor: GREEN_BG,
                  borderRadius: 14,
                  border: `1px solid ${CARD_BORDER}`,
                  textAlign: "center",
                  opacity: s,
                  transform: `translateY(${slideIn(s, "up", 20)}px)`,
                }}
              >
                <div style={{ marginBottom: 8 }}><Icon name={svc.icon} size={28} color={GREEN} /></div>
                <div style={{ fontSize: 24, fontWeight: 700, color: TEXT_BLACK, marginBottom: 4 }}>{svc.title}</div>
                <div style={{ fontSize: 24, color: TEXT_GRAY, lineHeight: 1.4 }}>{svc.desc}</div>
              </div>
            );
          })}
        </div>

        {/* Partner logos as text badges */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 12,
            flexWrap: "wrap" as const,
            opacity: fadeIn(frame, 120, 25),
          }}
        >
          <div style={{ fontSize: 24, fontWeight: 600, color: TEXT_MUTED, marginRight: 8, alignSelf: "center" }}>
            Partners:
          </div>
          {partners.map((p, i) => (
            <div
              key={p}
              style={{
                padding: "5px 14px",
                borderRadius: 16,
                backgroundColor: WHITE,
                border: `1px solid ${CARD_BORDER}`,
                fontSize: 24,
                fontWeight: 600,
                color: TEXT_GRAY,
                opacity: fadeIn(frame, staggerDelay(i, 130, 8), 12),
              }}
            >
              {p}
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};


// ═══════════════════════════════════════════════════════════════
// FOLIE 21 - Cloud Fundings: Funding models (€10K–€500K)
// ═══════════════════════════════════════════════════════════════

export const Folie21CloudFundings: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = springEntrance(frame, fps, 10, SPRING.default);

  const fundings = [
    { provider: "AWS", program: "Activate", amount: "Up to €100K", desc: "Credits for startups" },
    { provider: "AWS", program: "Migration Acceleration", amount: "Up to €500K", desc: "Enterprise migration credits" },
    { provider: "Azure", program: "Startup Program", amount: "Up to €150K", desc: "Credits + technical support" },
    { provider: "Azure", program: "Innovation Hub", amount: "€10K–€50K", desc: "PoC funding" },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: GREEN_BG, fontFamily: FONT }}>
      <div
        style={{
          padding: PADDING,
          paddingTop: TOP_SAFE,
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        {/* Header */}
        <div
          style={{
            fontSize: 24,
            fontWeight: 600,
            color: GREEN,
            textTransform: "uppercase" as const,
            letterSpacing: 2,
            opacity: titleSpring,
            marginBottom: 6,
          }}
        >
          Funding
        </div>
        <div
          style={{
            fontSize: 36,
            fontWeight: 800,
            color: TEXT_BLACK,
            opacity: titleSpring,
            transform: `translateX(${slideIn(titleSpring, "left", 25)}px)`,
            marginBottom: 32,
          }}
        >
          Cloud Fundings
        </div>

        {/* Funding cards - 2×2 grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 16,
          }}
        >
          {fundings.map((f, i) => {
            const s = springEntrance(frame, fps, staggerDelay(i, 30, 22), SPRING.default);
            return (
              <div
                key={i}
                style={{
                  padding: "22px 24px",
                  backgroundColor: WHITE,
                  borderRadius: 16,
                  border: `1px solid ${CARD_BORDER}`,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                  opacity: s,
                  transform: `translateY(${slideIn(s, "up", 20)}px)`,
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <div
                    style={{
                      padding: "3px 10px",
                      borderRadius: 6,
                      backgroundColor: f.provider === "AWS" ? "rgba(255,153,0,0.1)" : "rgba(0,120,212,0.1)",
                      fontSize: 24,
                      fontWeight: 700,
                      color: f.provider === "AWS" ? "#FF9900" : "#0078D4",
                    }}
                  >
                    {f.provider}
                  </div>
                  <div style={{ fontSize: 24, fontWeight: 800, color: GREEN }}>{f.amount}</div>
                </div>
                <div style={{ fontSize: 24, fontWeight: 700, color: TEXT_BLACK, marginBottom: 4 }}>{f.program}</div>
                <div style={{ fontSize: 24, color: TEXT_GRAY }}>{f.desc}</div>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};


// ═══════════════════════════════════════════════════════════════
// FOLIE 22 - Thank You: Contact info, social links, projects
// ═══════════════════════════════════════════════════════════════

export const Folie22ThankYou: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoSpring = springEntrance(frame, fps, 8, SPRING.gentle);
  const titleSpring = springEntrance(frame, fps, 20, SPRING.default);
  const contactOpacity = fadeIn(frame, 40, 22);
  const socialsOpacity = fadeIn(frame, 65, 22);
  const projectsOpacity = fadeIn(frame, 85, 22);
  const photoOpacity = fadeIn(frame, 5, 30);
  const photoScale = interpolate(frame, [0, 180], [1.05, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

  const socials = [
    "sessionize.com/linda-mohamed",
    "linkedin.com/in/linda-mohamed",
    "youtube.com/@mrs_lee_g",
    "instagram.com/mrs_lee_g",
  ];
  const projects = [
    "thejugglingcompany.com",
    "meet-the-aws-community.com",
    "youtube.com/@womenofcloudcommunity",
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: WHITE, fontFamily: FONT }}>

      {/* Left: Content ~55% */}
      <div style={{
        position: "absolute", left: 0, top: 0,
        width: "55%", height: "100%",
        padding: `${TOP_SAFE}px ${PADDING}px`,
        display: "flex", flexDirection: "column", justifyContent: "center",
      }}>
        {/* Logo row */}
        <div style={{ display: "flex", gap: 24, alignItems: "center", marginBottom: 28, opacity: logoSpring }}>
          <InfinityLogo size={48} color={TEXT_BLACK} />
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <div style={{ fontSize: 24, fontWeight: 600, color: TEXT_BLACK }}>lindamohamed.com</div>
            <div style={{ fontSize: 24, color: TEXT_MUTED }}>thejugglingcompany.com</div>
          </div>
        </div>

        {/* THANK YOU! */}
        <div style={{
          fontSize: 96, fontWeight: 900, color: TEXT_BLACK,
          lineHeight: 0.9, letterSpacing: -3,
          opacity: titleSpring,
          transform: `translateY(${slideIn(titleSpring, "up", 20)}px)`,
          marginBottom: 28,
        }}>
          THANK YOU!
        </div>

        {/* Contact */}
        <div style={{ opacity: contactOpacity }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
            <Icon name="paper-plane" size={22} color={GREEN} />
            <div style={{ fontSize: 24, color: TEXT_BLACK }}>hello@lindamohamed.com</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
            <Icon name="globe" size={22} color={GREEN} />
            <div style={{ fontSize: 24, color: TEXT_BLACK, fontWeight: 600 }}>lindamohamed.com</div>
            <div style={{ fontSize: 24, color: TEXT_MUTED, fontStyle: "italic" }}>- Website freshly relaunched</div>
          </div>
        </div>

        {/* Socials */}
        <div style={{ marginTop: 20, opacity: socialsOpacity }}>
          <div style={{ fontSize: 24, fontWeight: 700, color: TEXT_BLACK, marginBottom: 8 }}>Socials and more</div>
          {socials.map((s, i) => (
            <div key={i} style={{ fontSize: 24, color: TEXT_GRAY, marginBottom: 4 }}>{s}</div>
          ))}
        </div>

        {/* More projects */}
        <div style={{ marginTop: 16, opacity: projectsOpacity }}>
          <div style={{ fontSize: 24, fontWeight: 700, color: TEXT_BLACK, marginBottom: 8 }}>More of my projects</div>
          {projects.map((p, i) => (
            <div key={i} style={{ fontSize: 24, color: TEXT_GRAY, marginBottom: 4 }}>
              {p}{p.includes("womenofcloud") ? " *coming soon" : ""}
            </div>
          ))}
        </div>
      </div>

      {/* Right: Photo ~45% */}
      <div style={{
        position: "absolute", right: 0, top: 0,
        width: "45%", height: "100%",
        overflow: "hidden", opacity: photoOpacity,
      }}>
        <div style={{ width: "100%", height: "100%", transform: `scale(${photoScale})`, transformOrigin: "center center" }}>
          <Img
            src={staticFile("slides/lindamohamed/linda-speaking.jpg")}
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }}
          />
        </div>
      </div>

    </AbsoluteFill>
  );
};


// ═══════════════════════════════════════════════════════════════
// FOLIE 9 - Next Steps: Customer-specific variant (Nov 2025 dates)
// ═══════════════════════════════════════════════════════════════

export const Folie9NextStepsCustomer: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = springEntrance(frame, fps, 10, SPRING.default);

  const milestones = [
    { date: "Nov 4", label: "Workshop 1", result: "Goal & Use Cases", done: true },
    { date: "Nov 11", label: "Result Delivery", result: "Presentation + Concept", done: true },
    { date: "Nov 18", label: "Workshop 2", result: "Deep-dive & Architecture", done: false },
    { date: "Nov 25", label: "Prototype", result: "Working Demo", done: false },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: WHITE, fontFamily: FONT }}>
      <div
        style={{
          padding: PADDING,
          paddingTop: TOP_SAFE,
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <div
          style={{
            fontSize: 24,
            fontWeight: 600,
            color: GREEN,
            textTransform: "uppercase" as const,
            letterSpacing: 2,
            opacity: titleSpring,
            marginBottom: 6,
          }}
        >
          Customer Roadmap
        </div>
        <div
          style={{
            fontSize: 36,
            fontWeight: 800,
            color: TEXT_BLACK,
            opacity: titleSpring,
            transform: `translateX(${slideIn(titleSpring, "left", 25)}px)`,
            marginBottom: 8,
          }}
        >
          Next Steps
        </div>
        <div
          style={{
            fontSize: 24,
            color: TEXT_MUTED,
            opacity: fadeIn(frame, 20, 15),
            marginBottom: 36,
          }}
        >
          November 2025 - Customer-specific timeline
        </div>

        {/* Timeline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {milestones.map((m, i) => {
            const s = springEntrance(frame, fps, staggerDelay(i, 35, 22), SPRING.default);
            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 20,
                  padding: "16px 24px",
                  backgroundColor: m.done ? "rgba(46,125,50,0.06)" : WHITE,
                  borderRadius: 14,
                  border: `1px solid ${m.done ? GREEN : CARD_BORDER}`,
                  opacity: s,
                  transform: `translateX(${slideIn(s, "right", 25)}px)`,
                }}
              >
                {/* Date badge */}
                <div
                  style={{
                    minWidth: 72,
                    padding: "6px 12px",
                    borderRadius: 8,
                    backgroundColor: m.done ? GREEN : GREEN_BG,
                    color: m.done ? WHITE : GREEN,
                    fontSize: 24,
                    fontWeight: 700,
                    textAlign: "center",
                  }}
                >
                  {m.date}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 24, fontWeight: 700, color: TEXT_BLACK }}>{m.label}</div>
                  <div style={{ fontSize: 24, color: TEXT_GRAY, marginTop: 2 }}>{m.result}</div>
                </div>
                {/* Status */}
                <Icon name={m.done ? "check-circle" : "clock"} size={24} color={m.done ? GREEN : TEXT_MUTED} />
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════════════
// FOLIE 12 - Results Step by Step: Detailed staircase with personas
// ═══════════════════════════════════════════════════════════════

export const Folie12StaircaseDetailed: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = springEntrance(frame, fps, 10, SPRING.default);

  const steps = [
    { level: "Clarity", persona: "Stakeholder", question: "What problem are we solving?", height: 70 },
    { level: "Concept", persona: "Architect", question: "How should we build it?", height: 130 },
    { level: "Prototype", persona: "Developer", question: "Does it work?", height: 190 },
    { level: "MVP", persona: "Product Owner", question: "Do users want it?", height: 250 },
    { level: "Product", persona: "Team", question: "Can we scale it?", height: 310 },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: GREEN_BG, fontFamily: FONT }}>
      <div
        style={{
          padding: PADDING,
          paddingTop: TOP_SAFE,
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <div
          style={{
            fontSize: 24,
            fontWeight: 600,
            color: GREEN,
            textTransform: "uppercase" as const,
            letterSpacing: 2,
            opacity: titleSpring,
            marginBottom: 6,
          }}
        >
          Detailed View
        </div>
        <div
          style={{
            fontSize: 36,
            fontWeight: 800,
            color: TEXT_BLACK,
            opacity: titleSpring,
            transform: `translateX(${slideIn(titleSpring, "left", 25)}px)`,
            marginBottom: 20,
          }}
        >
          Results Step by Step
        </div>

        {/* Staircase with persona labels */}
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            gap: 10,
            paddingBottom: 40,
          }}
        >
          {steps.map((step, i) => {
            const s = springEntrance(frame, fps, staggerDelay(i, 30, 22), SPRING.default);
            const greenAlpha = 0.12 + i * 0.15;
            const barHeight = interpolate(s, [0, 1], [0, step.height]);
            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: 120,
                }}
              >
                <div style={{ fontSize: 24, fontWeight: 600, color: TEXT_GRAY, opacity: s, marginBottom: 2 }}>
                  {step.persona}
                </div>
                <div style={{ fontSize: 24, color: TEXT_MUTED, opacity: s, marginBottom: 6, textAlign: "center", fontStyle: "italic" }}>
                  "{step.question}"
                </div>
                <div style={{ fontSize: 24, fontWeight: 700, color: GREEN, marginBottom: 6, opacity: s }}>
                  {step.level}
                </div>
                <div
                  style={{
                    width: "100%",
                    height: barHeight,
                    backgroundColor: `rgba(46,125,50,${greenAlpha})`,
                    borderRadius: "8px 8px 0 0",
                    border: `1px solid rgba(46,125,50,${greenAlpha + 0.1})`,
                    borderBottom: "none",
                  }}
                />
              </div>
            );
          })}
        </div>
        <div style={{ height: 3, backgroundColor: GREEN, borderRadius: 2, marginLeft: 40, marginRight: 40 }} />
      </div>
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════════════
// FOLIE 13 - Results Step by Step: Flexible deep-dive
// (Prototype/Demo, Business, TCO)
// ═══════════════════════════════════════════════════════════════

export const Folie13FlexibleDeepDive: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = springEntrance(frame, fps, 10, SPRING.default);

  const tracks: { icon: IconName; title: string; items: string[] }[] = [
    {
      icon: "wrench",
      title: "Prototype / Demo",
      items: ["Interactive prototype", "Live demo environment", "User testing feedback"],
    },
    {
      icon: "layers",
      title: "Business Case",
      items: ["ROI calculation", "Market analysis", "Competitive positioning"],
    },
    {
      icon: "dollar",
      title: "TCO Analysis",
      items: ["Infrastructure costs", "Licensing & operations", "3-year projection"],
    },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: WHITE, fontFamily: FONT }}>
      <div
        style={{
          padding: PADDING,
          paddingTop: TOP_SAFE,
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <div
          style={{
            fontSize: 24,
            fontWeight: 600,
            color: GREEN,
            textTransform: "uppercase" as const,
            letterSpacing: 2,
            opacity: titleSpring,
            marginBottom: 6,
          }}
        >
          Deep Dive Options
        </div>
        <div
          style={{
            fontSize: 36,
            fontWeight: 800,
            color: TEXT_BLACK,
            opacity: titleSpring,
            transform: `translateX(${slideIn(titleSpring, "left", 25)}px)`,
            marginBottom: 32,
          }}
        >
          Results Step by Step
        </div>

        {/* 3-column deep-dive tracks */}
        <div style={{ display: "flex", gap: 20, flex: 1 }}>
          {tracks.map((track, i) => {
            const s = springEntrance(frame, fps, staggerDelay(i, 35, 25), SPRING.default);
            return (
              <div
                key={i}
                style={{
                  flex: 1,
                  padding: 24,
                  backgroundColor: GREEN_BG,
                  borderRadius: 16,
                  border: `1px solid ${CARD_BORDER}`,
                  opacity: s,
                  transform: `translateY(${slideIn(s, "up", 25)}px)`,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div style={{ marginBottom: 12 }}><Icon name={track.icon} size={32} color={GREEN} /></div>
                <div style={{ fontSize: 24, fontWeight: 700, color: TEXT_BLACK, marginBottom: 16 }}>
                  {track.title}
                </div>
                {track.items.map((item, j) => (
                  <div
                    key={j}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      marginBottom: 10,
                      opacity: fadeIn(frame, staggerDelay(j, staggerDelay(i, 60, 25), 15), 12),
                    }}
                  >
                    <div
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        backgroundColor: GREEN,
                        flexShrink: 0,
                      }}
                    />
                    <div style={{ fontSize: 24, color: TEXT_GRAY }}>{item}</div>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════════════
// FOLIE 14 - Results Step by Step: Video-focused variant
// ═══════════════════════════════════════════════════════════════

export const Folie14VideoFocused: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = springEntrance(frame, fps, 10, SPRING.default);

  const deliverables: { icon: IconName; title: string; desc: string; duration: string }[] = [
    { icon: "film", title: "Explainer Video", desc: "2-3 min animated overview of the solution", duration: "1 week" },
    { icon: "chart-bar", title: "Data Story Video", desc: "Visualized metrics and business impact", duration: "3-5 days" },
    { icon: "laptop", title: "Demo Recording", desc: "Screen recording of prototype walkthrough", duration: "2-3 days" },
    { icon: "smartphone", title: "Social Clips", desc: "Short-form clips for LinkedIn / social media", duration: "1-2 days" },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: GREEN_BG, fontFamily: FONT }}>
      <div
        style={{
          padding: PADDING,
          paddingTop: TOP_SAFE,
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <div
          style={{
            fontSize: 24,
            fontWeight: 600,
            color: GREEN,
            textTransform: "uppercase" as const,
            letterSpacing: 2,
            opacity: titleSpring,
            marginBottom: 6,
          }}
        >
          Video Deliverables
        </div>
        <div
          style={{
            fontSize: 36,
            fontWeight: 800,
            color: TEXT_BLACK,
            opacity: titleSpring,
            transform: `translateX(${slideIn(titleSpring, "left", 25)}px)`,
            marginBottom: 32,
          }}
        >
          Results Step by Step
        </div>

        {/* 2×2 grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {deliverables.map((d, i) => {
            const s = springEntrance(frame, fps, staggerDelay(i, 30, 22), SPRING.default);
            return (
              <div
                key={i}
                style={{
                  padding: "20px 24px",
                  backgroundColor: WHITE,
                  borderRadius: 16,
                  border: `1px solid ${CARD_BORDER}`,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                  opacity: s,
                  transform: `translateY(${slideIn(s, "up", 20)}px)`,
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                  <Icon name={d.icon} size={28} color={GREEN} />
                  <div
                    style={{
                      padding: "3px 10px",
                      borderRadius: 6,
                      backgroundColor: "rgba(46,125,50,0.08)",
                      fontSize: 24,
                      fontWeight: 600,
                      color: GREEN,
                    }}
                  >
                    {d.duration}
                  </div>
                </div>
                <div style={{ fontSize: 24, fontWeight: 700, color: TEXT_BLACK, marginBottom: 4 }}>{d.title}</div>
                <div style={{ fontSize: 24, color: TEXT_GRAY, lineHeight: 1.4 }}>{d.desc}</div>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════════════
// FOLIE 17 - Idea-to-Prototype Pipeline: Detailed with durations
// ═══════════════════════════════════════════════════════════════

export const Folie17PipelineDetailed: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = springEntrance(frame, fps, 10, SPRING.default);

  const phases = [
    {
      phase: "Ideation",
      duration: "1-2 weeks",
      activities: ["Stakeholder interviews", "Problem framing", "Opportunity mapping"],
      color: "rgba(46,125,50,0.08)",
    },
    {
      phase: "Design",
      duration: "1-2 weeks",
      activities: ["Architecture design", "Tech stack selection", "Security review"],
      color: "rgba(46,125,50,0.15)",
    },
    {
      phase: "Prototype",
      duration: "2-4 weeks",
      activities: ["Core feature build", "API integration", "User testing"],
      color: "rgba(46,125,50,0.25)",
    },
    {
      phase: "MVP",
      duration: "4-8 weeks",
      activities: ["Production setup", "CI/CD pipeline", "Monitoring & logging"],
      color: "rgba(46,125,50,0.38)",
    },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: WHITE, fontFamily: FONT }}>
      <div
        style={{
          padding: PADDING,
          paddingTop: TOP_SAFE,
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <div
          style={{
            fontSize: 24,
            fontWeight: 600,
            color: GREEN,
            textTransform: "uppercase" as const,
            letterSpacing: 2,
            opacity: titleSpring,
            marginBottom: 6,
          }}
        >
          Detailed Process
        </div>
        <div
          style={{
            fontSize: 36,
            fontWeight: 800,
            color: TEXT_BLACK,
            opacity: titleSpring,
            transform: `translateX(${slideIn(titleSpring, "left", 25)}px)`,
            marginBottom: 28,
          }}
        >
          Idea-to-Prototype Pipeline
        </div>

        {/* Detailed phase cards */}
        <div style={{ display: "flex", gap: 14, flex: 1 }}>
          {phases.map((p, i) => {
            const s = springEntrance(frame, fps, staggerDelay(i, 30, 22), SPRING.default);
            return (
              <div
                key={i}
                style={{
                  flex: 1,
                  padding: "20px 18px",
                  backgroundColor: p.color,
                  borderRadius: 16,
                  border: `1px solid ${CARD_BORDER}`,
                  opacity: s,
                  transform: `translateY(${slideIn(s, "up", 20)}px)`,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div style={{ fontSize: 24, fontWeight: 700, color: TEXT_BLACK, marginBottom: 4 }}>{p.phase}</div>
                <div
                  style={{
                    fontSize: 24,
                    fontWeight: 700,
                    color: GREEN,
                    marginBottom: 14,
                    padding: "3px 8px",
                    backgroundColor: "rgba(46,125,50,0.1)",
                    borderRadius: 4,
                    alignSelf: "flex-start",
                  }}
                >
                  {p.duration}
                </div>
                {p.activities.map((act, j) => (
                  <div
                    key={j}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      marginBottom: 8,
                      opacity: fadeIn(frame, staggerDelay(j, staggerDelay(i, 55, 22), 12), 12),
                    }}
                  >
                    <div style={{ width: 5, height: 5, borderRadius: "50%", backgroundColor: GREEN, flexShrink: 0 }} />
                    <div style={{ fontSize: 24, color: TEXT_GRAY }}>{act}</div>
                  </div>
                ))}
              </div>
            );
          })}
        </div>

        {/* Timeline arrow */}
        <div
          style={{
            height: 3,
            background: `linear-gradient(90deg, ${GREEN}, ${GREEN_LIGHTER})`,
            borderRadius: 2,
            marginTop: 16,
            opacity: fadeIn(frame, 100, 20),
          }}
        />
      </div>
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════════════
// MAIN DECK - Sequences all slides together
// Each slide gets 150 frames (5 seconds at 30fps)
// Total: 22 slides × 150 = 3300 frames (110 seconds)
// ═══════════════════════════════════════════════════════════════

const SLIDE_DURATION = 150; // 5 seconds per slide

export const LindaMohamedDeck: React.FC = () => {
  let offset = 0;
  const slide = (component: React.ReactNode, key: string) => {
    const from = offset;
    offset += SLIDE_DURATION;
    return (
      <Sequence key={key} from={from} durationInFrames={SLIDE_DURATION} name={key}>
        {component}
      </Sequence>
    );
  };

  return (
    <AbsoluteFill style={{ backgroundColor: WHITE, fontFamily: FONT }}>
      {slide(<Folie1Cover />, "Folie1-Cover")}
      {slide(<Folie2AboutMe />, "Folie2-AboutMe")}
      {slide(<Folie3WhatIOffer />, "Folie3-WhatIOffer")}
      {slide(<Folie4CostsPackages />, "Folie4-CostsPackages")}
      {slide(<Folie5Workshops />, "Folie5-Workshops")}
      {slide(<Folie6WorkshopModules />, "Folie6-WorkshopModules")}
      {slide(<Folie7FirstWorkshop />, "Folie7-FirstWorkshop")}
      {slide(<Folie8NextSteps />, "Folie8-NextSteps")}
      {slide(<Folie9NextStepsCustomer />, "Folie9-NextStepsCustomer")}
      {slide(<Folie10Results />, "Folie10-Results")}
      {slide(<Folie11Staircase />, "Folie11-Staircase")}
      {slide(<Folie12StaircaseDetailed />, "Folie12-StaircaseDetailed")}
      {slide(<Folie13FlexibleDeepDive />, "Folie13-FlexibleDeepDive")}
      {slide(<Folie14VideoFocused />, "Folie14-VideoFocused")}
      {slide(<Folie15MoreInfo />, "Folie15-MoreInfo")}
      {slide(<Folie16Pipeline />, "Folie16-Pipeline")}
      {slide(<Folie17PipelineDetailed />, "Folie17-PipelineDetailed")}
      {slide(<Folie18AISystems />, "Folie18-AISystems")}
      {slide(<Folie19Cloud />, "Folie19-Cloud")}
      {slide(<Folie20Collaboration />, "Folie20-Collaboration")}
      {slide(<Folie21CloudFundings />, "Folie21-CloudFundings")}
      {slide(<Folie22ThankYou />, "Folie22-ThankYou")}
    </AbsoluteFill>
  );
};

// Total frames for the full deck (22 slides × 150 frames)
export const LINDAMOHAMED_DECK_DURATION = 22 * SLIDE_DURATION; // 3300 frames = 110 seconds

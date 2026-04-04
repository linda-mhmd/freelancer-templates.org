/**
 * LindaMohamed V2 - Packages & Workshops Slide Deck (Bugfix Version)
 *
 * Fixes six categories of visual defects from V1:
 *   1. Section dividers: split-panel layout (white left + photo right) instead of full-bleed overlay
 *   2. Typography: increased font sizes for readability at 1280×720
 *   3. Canvas balance: content distributed across full canvas
 *   4. Logo watermark: infinity logo on every slide
 *   5. SVG icons: inline SVG instead of emoji
 *   6. Content fidelity: complete content from original PowerPoint
 *
 * SLIDE MAP (same as V1):
 *   Folie 1–22, 150 frames each, 3300 total
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

// ── Design Tokens (THEME_LINDAMOHAMED - unchanged from V1) ─────
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

// ── V2 Typography Scale (increased for readability) ─────────────
const V2_TYPE = {
  sectionLabel: 14,
  title: 36,
  body: 18,
  cardDesc: 15,
  tableCell: 14,
  statLabel: 13,
  footerMuted: 13,
} as const;

// ── Shared: Linda Logo (real PNG) ───────────────────────────────
const LINDA_LOGO_PATH = "slides/lindamohamed/linda-logo.png";

const LindaLogo: React.FC<{ size?: number }> = ({ size = 48 }) => (
  <Img
    src={staticFile(LINDA_LOGO_PATH)}
    style={{ width: size, height: "auto", objectFit: "contain" }}
  />
);

// ── Logo Watermark (bottom-right on every slide) ────────────────
const LogoWatermark: React.FC<{ frame: number }> = ({ frame }) => (
  <div
    style={{
      position: "absolute",
      bottom: 20,
      right: 24,
      opacity: fadeIn(frame, 10, 15) * 0.3,
      zIndex: 10,
    }}
  >
    <LindaLogo size={36} />
  </div>
);

// ── SVG Icon Library (replaces emoji) ───────────────────────────
const iconStyle = { fill: "none", stroke: GREEN, strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

const TargetIcon: React.FC<{ size?: number }> = ({ size = 24 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} {...iconStyle}>
    <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" fill={GREEN} />
  </svg>
);
const LightbulbIcon: React.FC<{ size?: number }> = ({ size = 24 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} {...iconStyle}>
    <path d="M9 21h6M12 3a6 6 0 0 0-4 10.5V17h8v-3.5A6 6 0 0 0 12 3z" />
  </svg>
);
const CheckIcon: React.FC<{ size?: number }> = ({ size = 24 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} {...iconStyle}>
    <circle cx="12" cy="12" r="10" /><path d="M8 12l3 3 5-5" />
  </svg>
);
const RocketIcon: React.FC<{ size?: number }> = ({ size = 24 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} {...iconStyle}>
    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z" fill="none" stroke="none" />
    <path d="M4.5 16.5c1.5 1.5 4 .5 4 .5s-1-2.5.5-4l6-6c1-1 2.5-.5 2.5-.5s.5-1.5-.5-2.5-2.5-.5-2.5-.5-1 1.5-.5 2.5l-6 6c-1.5 1.5-4-.5-4-.5z" />
  </svg>
);
const GearIcon: React.FC<{ size?: number }> = ({ size = 24 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} {...iconStyle}>
    <circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);
const CloudIcon: React.FC<{ size?: number }> = ({ size = 24 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} {...iconStyle}>
    <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
  </svg>
);
const ChartIcon: React.FC<{ size?: number }> = ({ size = 24 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} {...iconStyle}>
    <rect x="3" y="12" width="4" height="9" rx="1" /><rect x="10" y="6" width="4" height="15" rx="1" /><rect x="17" y="2" width="4" height="19" rx="1" />
  </svg>
);
const CodeIcon: React.FC<{ size?: number }> = ({ size = 24 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} {...iconStyle}>
    <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
  </svg>
);
const PersonIcon: React.FC<{ size?: number }> = ({ size = 24 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} {...iconStyle}>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
  </svg>
);
const PaperPlaneIcon: React.FC<{ size?: number }> = ({ size = 24 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} {...iconStyle}>
    <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);
const DataIcon: React.FC<{ size?: number }> = ({ size = 24 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} {...iconStyle}>
    <ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
  </svg>
);


// ═══════════════════════════════════════════════════════════════
// SECTION DIVIDER V2 - Split-panel layout (white left + photo right)
// Used for Folie 1, 5, 15
// ═══════════════════════════════════════════════════════════════

interface SectionDividerV2Props {
  title: string;
  slideImage: string;
}

const SectionDividerV2: React.FC<SectionDividerV2Props> = ({ title, slideImage }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoSpring = springEntrance(frame, fps, 10, SPRING.gentle);
  const titleSpring = springEntrance(frame, fps, 25, SPRING.default);
  const lineWidth = interpolate(frame, [35, 70], [0, 120], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });
  const photoOpacity = fadeIn(frame, 5, 25);

  return (
    <AbsoluteFill style={{ backgroundColor: WHITE, fontFamily: FONT }}>
      {/* Left panel - white, logo + title */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: "50%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: 60,
        }}
      >
        <div
          style={{
            opacity: logoSpring,
            transform: `scale(${interpolate(logoSpring, [0, 1], [0.6, 1])})`,
            marginBottom: 24,
          }}
        >
          <LindaLogo size={72} />
        </div>
        <div
          style={{
            fontSize: 44,
            fontWeight: 800,
            color: TEXT_BLACK,
            textAlign: "center",
            opacity: titleSpring,
            transform: `translateY(${slideIn(titleSpring, "up", 20)}px)`,
            letterSpacing: -0.5,
          }}
        >
          {title}
        </div>
        <div
          style={{
            width: lineWidth,
            height: 3,
            backgroundColor: GREEN,
            borderRadius: 2,
            marginTop: 16,
          }}
        />
      </div>

      {/* Green accent strip at boundary */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: 0,
          width: 4,
          height: "100%",
          backgroundColor: GREEN,
          zIndex: 2,
        }}
      />

      {/* Right panel - photo (cropped to show only the right portion of the original slide) */}
      <div
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          width: "50%",
          height: "100%",
          overflow: "hidden",
          opacity: photoOpacity,
        }}
      >
        <Img
          src={staticFile(slideImage)}
          style={{
            width: "200%",
            height: "120%",
            objectFit: "cover",
            objectPosition: "right 20%",
          }}
        />
      </div>

      <LogoWatermark frame={frame} />
    </AbsoluteFill>
  );
};


// ═══════════════════════════════════════════════════════════════
// FOLIE 1 - Cover: "Intro & Packages" (split-panel)
// ═══════════════════════════════════════════════════════════════

export const Folie1CoverV2: React.FC = () => (
  <SectionDividerV2 title="Intro & Packages" slideImage="slides/lindamohamed/Folie1.png" />
);


// ═══════════════════════════════════════════════════════════════
// FOLIE 2 - About Me: Bio + experience stats (no overlay card)
// ═══════════════════════════════════════════════════════════════

interface StatBadgeV2Props {
  value: string;
  label: string;
  frame: number;
  delay: number;
  fps: number;
}

const StatBadgeV2: React.FC<StatBadgeV2Props> = ({ value, label, frame, delay, fps }) => {
  const s = springEntrance(frame, fps, delay, SPRING.default);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "14px 18px",
        backgroundColor: GREEN_BG,
        borderRadius: 12,
        border: `1px solid ${CARD_BORDER}`,
        opacity: s,
        transform: `translateY(${slideIn(s, "up", 20)}px)`,
        minWidth: 110,
      }}
    >
      <div style={{ fontSize: 28, fontWeight: 800, color: GREEN }}>{value}</div>
      <div style={{ fontSize: V2_TYPE.statLabel, fontWeight: 500, color: TEXT_GRAY, marginTop: 4, textAlign: "center", whiteSpace: "pre-line" as const }}>
        {label}
      </div>
    </div>
  );
};

export const Folie2AboutMeV2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const photoOpacity = fadeIn(frame, 5, 25);
  const nameSpring = springEntrance(frame, fps, 20, SPRING.default);
  const bioOpacity = fadeIn(frame, 40, 25);

  const stats = [
    { value: "12+", label: "Years\nSoftware" },
    { value: "6+", label: "Years\nCloud & AI" },
    { value: "6+", label: "Years\nConsulting" },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: WHITE, fontFamily: FONT }}>
      {/* Left: Photo area */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: "40%",
          height: "100%",
          opacity: photoOpacity,
          overflow: "hidden",
        }}
      >
        <Img
          src={staticFile("slides/lindamohamed/Folie2.png")}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            width: 4,
            height: "100%",
            backgroundColor: GREEN,
          }}
        />
      </div>

      {/* Right: Content - no overlay card */}
      <div
        style={{
          position: "absolute",
          left: "42%",
          top: 48,
          right: 60,
          bottom: 48,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            fontSize: V2_TYPE.sectionLabel,
            fontWeight: 600,
            color: GREEN,
            textTransform: "uppercase" as const,
            letterSpacing: 2,
            opacity: nameSpring,
            marginBottom: 8,
          }}
        >
          About Me
        </div>

        <div
          style={{
            fontSize: 38,
            fontWeight: 800,
            color: TEXT_BLACK,
            opacity: nameSpring,
            transform: `translateX(${slideIn(nameSpring, "right", 30)}px)`,
          }}
        >
          Linda Mohamed
        </div>

        <div
          style={{
            fontSize: V2_TYPE.body,
            fontWeight: 500,
            color: GREEN,
            marginTop: 4,
            opacity: nameSpring,
          }}
        >
          AI & Cloud Consultant
        </div>

        <div
          style={{
            fontSize: V2_TYPE.body,
            fontWeight: 400,
            color: TEXT_GRAY,
            lineHeight: 1.6,
            marginTop: 20,
            opacity: bioOpacity,
            maxWidth: 520,
          }}
        >
          Passionate about helping businesses leverage AI and Cloud technologies.
          Specializing in workshops, consulting, and hands-on implementation
          from idea to production. Experienced in AWS, Azure, and hybrid cloud
          environments with a focus on practical, results-driven solutions.
        </div>

        <div
          style={{
            display: "flex",
            gap: 16,
            marginTop: 24,
          }}
        >
          {stats.map((stat, i) => (
            <StatBadgeV2
              key={i}
              value={stat.value}
              label={stat.label}
              frame={frame}
              delay={staggerDelay(i, 25, 10)}
              fps={fps}
            />
          ))}
        </div>

        <div
          style={{
            fontSize: V2_TYPE.footerMuted,
            color: TEXT_MUTED,
            marginTop: 20,
            opacity: fadeIn(frame, 45, 15),
          }}
        >
          AWS Community Builder · Volunteer Mentor · MSc Computer Science
        </div>
      </div>

      <LogoWatermark frame={frame} />
    </AbsoluteFill>
  );
};


// ═══════════════════════════════════════════════════════════════
// FOLIE 3 - What I Offer: 3-step workshop flow + MVP support
// SVG icons, full descriptions, full canvas width
// ═══════════════════════════════════════════════════════════════

interface StepCardV2Props {
  number: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  frame: number;
  delay: number;
  fps: number;
}

const StepCardV2: React.FC<StepCardV2Props> = ({ number, title, description, icon, frame, delay, fps }) => {
  const s = springEntrance(frame, fps, delay, SPRING.default);
  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "24px 20px",
        backgroundColor: WHITE,
        borderRadius: 16,
        border: `1px solid ${CARD_BORDER}`,
        boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
        opacity: s,
        transform: `translateY(${slideIn(s, "up", 30)}px)`,
      }}
    >
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: "50%",
          backgroundColor: GREEN,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 20,
          fontWeight: 700,
          color: WHITE,
          marginBottom: 12,
        }}
      >
        {number}
      </div>
      <div style={{ marginBottom: 10 }}>{icon}</div>
      <div style={{ fontSize: 18, fontWeight: 700, color: TEXT_BLACK, textAlign: "center", marginBottom: 8 }}>
        {title}
      </div>
      <div style={{ fontSize: V2_TYPE.cardDesc, color: TEXT_GRAY, textAlign: "center", lineHeight: 1.6 }}>
        {description}
      </div>
    </div>
  );
};

export const Folie3WhatIOfferV2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = springEntrance(frame, fps, 10, SPRING.default);
  const arrowOpacity = fadeIn(frame, 30, 15);
  const mvpOpacity = fadeIn(frame, 40, 20);

  const steps = [
    { icon: <TargetIcon size={28} />, title: "Goal", description: "Define your vision, identify challenges, align stakeholders on objectives and success criteria" },
    { icon: <LightbulbIcon size={28} />, title: "Concept", description: "Develop solutions, evaluate architecture options, assess feasibility and technical direction" },
    { icon: <CheckIcon size={28} />, title: "Decision", description: "Choose approach, create evaluation matrix, plan implementation roadmap with clear next steps" },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: GREEN_BG, fontFamily: FONT }}>
      <div
        style={{
          padding: 60,
          paddingTop: 48,
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <div
          style={{
            fontSize: V2_TYPE.sectionLabel,
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
            fontSize: V2_TYPE.title,
            fontWeight: 800,
            color: TEXT_BLACK,
            opacity: titleSpring,
            transform: `translateX(${slideIn(titleSpring, "left", 25)}px)`,
            marginBottom: 36,
          }}
        >
          What I Offer
        </div>

        <div style={{ display: "flex", gap: 24, alignItems: "stretch" }}>
          {steps.map((step, i) => (
            <React.Fragment key={i}>
              <StepCardV2
                number={i + 1}
                title={step.title}
                description={step.description}
                icon={step.icon}
                frame={frame}
                delay={staggerDelay(i, 10, 10)}
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

        <div
          style={{
            marginTop: 28,
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
              fontSize: V2_TYPE.cardDesc,
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <RocketIcon size={20} /> + MVP Development Support
          </div>
        </div>
      </div>

      <LogoWatermark frame={frame} />
    </AbsoluteFill>
  );
};


// ═══════════════════════════════════════════════════════════════
// FOLIE 4 - Costs & Packages: Complete pricing table
// ═══════════════════════════════════════════════════════════════

interface PricingRowV2Props {
  service: string;
  price: string;
  note?: string;
  frame: number;
  delay: number;
  fps: number;
  isHighlighted?: boolean;
}

const PricingRowV2: React.FC<PricingRowV2Props> = ({ service, price, note, frame, delay, fps, isHighlighted }) => {
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
        <div style={{ fontSize: 16, fontWeight: 600, color: TEXT_BLACK }}>{service}</div>
        {note && <div style={{ fontSize: V2_TYPE.statLabel, color: TEXT_MUTED, marginTop: 2 }}>{note}</div>}
      </div>
      <div style={{ fontSize: 20, fontWeight: 800, color: GREEN }}>{price}</div>
    </div>
  );
};

export const Folie4CostsPackagesV2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = springEntrance(frame, fps, 10, SPRING.default);
  const packagesOpacity = fadeIn(frame, 25, 20);

  const rates = [
    { service: "Workshop (half-day)", price: "~2.000€", note: "3-4 hours, interactive session" },
    { service: "Result Document", price: "~1.000€", note: "Presentation, concept paper, roadmap" },
    { service: "Consulting", price: "250€/h", isHighlighted: true, note: "Hourly rate, flexible engagement" },
    { service: "Stage / Speaking", price: "500€/h", note: "Keynotes, panels, tech talks" },
  ];

  const packages = [
    { name: "Discovery", price: "~4.000€", items: "1 Workshop + Result Document + Follow-up" },
    { name: "Strategy", price: "~8.000€", items: "2 Workshops + Results + 8h Consulting" },
    { name: "Comprehensive", price: "~16.000€", items: "Full engagement + MVP support + ongoing consulting" },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: WHITE, fontFamily: FONT }}>
      <div
        style={{
          padding: 60,
          paddingTop: 48,
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <div
          style={{
            fontSize: V2_TYPE.sectionLabel,
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
            fontSize: V2_TYPE.title,
            fontWeight: 800,
            color: TEXT_BLACK,
            opacity: titleSpring,
            transform: `translateX(${slideIn(titleSpring, "left", 25)}px)`,
            marginBottom: 24,
          }}
        >
          Costs & Packages
        </div>

        <div style={{ display: "flex", gap: 28, flex: 1 }}>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: TEXT_BLACK, marginBottom: 4 }}>
              Rates
            </div>
            {rates.map((r, i) => (
              <PricingRowV2
                key={i}
                service={r.service}
                price={r.price}
                note={r.note}
                frame={frame}
                delay={staggerDelay(i, 10, 10)}
                fps={fps}
                isHighlighted={r.isHighlighted}
              />
            ))}
          </div>

          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: 12,
              opacity: packagesOpacity,
            }}
          >
            <div style={{ fontSize: 16, fontWeight: 700, color: TEXT_BLACK, marginBottom: 4 }}>
              Package Examples
            </div>
            {packages.map((pkg, i) => {
              const pkgSpring = springEntrance(frame, fps, staggerDelay(i, 35, 12), SPRING.default);
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
                    <div style={{ fontSize: 18, fontWeight: 700, color: TEXT_BLACK }}>{pkg.name}</div>
                    <div style={{ fontSize: 22, fontWeight: 800, color: GREEN }}>{pkg.price}</div>
                  </div>
                  <div style={{ fontSize: V2_TYPE.cardDesc, color: TEXT_GRAY, marginTop: 4 }}>{pkg.items}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <LogoWatermark frame={frame} />
    </AbsoluteFill>
  );
};


// ═══════════════════════════════════════════════════════════════
// FOLIE 5 - Section Divider: "Workshops" (split-panel)
// ═══════════════════════════════════════════════════════════════

export const Folie5WorkshopsV2: React.FC = () => (
  <SectionDividerV2 title="Workshops" slideImage="slides/lindamohamed/Folie5.png" />
);

// ═══════════════════════════════════════════════════════════════
// FOLIE 6 - Workshop Modules: Full table with all columns
// ═══════════════════════════════════════════════════════════════

export const Folie6WorkshopModulesV2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = springEntrance(frame, fps, 10, SPRING.default);

  const modules = [
    {
      module: "Module 1: Discovery",
      duration: "Half-day",
      content: "Goal definition, use case mapping, stakeholder alignment, problem framing",
      result: "Vision document, prioritized use cases, success criteria",
      perspective: "Strategic clarity & shared understanding",
    },
    {
      module: "Module 2: Concept",
      duration: "Half-day",
      content: "Solution design, architecture options, feasibility check, tech stack evaluation",
      result: "Technical concept, architecture diagram, evaluation matrix",
      perspective: "Technical direction & confidence",
    },
    {
      module: "Module 3: Decision",
      duration: "Half-day",
      content: "Evaluation matrix, risk assessment, roadmap planning, resource estimation",
      result: "Decision paper, implementation roadmap, timeline",
      perspective: "Actionable next steps & commitment",
    },
  ];

  const columns = ["Duration", "Content", "Result", "Perspective"];

  return (
    <AbsoluteFill style={{ backgroundColor: WHITE, fontFamily: FONT }}>
      <div
        style={{
          padding: 60,
          paddingTop: 48,
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <div
          style={{
            fontSize: V2_TYPE.sectionLabel,
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
            fontSize: V2_TYPE.title,
            fontWeight: 800,
            color: TEXT_BLACK,
            opacity: titleSpring,
            transform: `translateX(${slideIn(titleSpring, "left", 25)}px)`,
            marginBottom: 28,
          }}
        >
          Workshop Modules
        </div>

        {/* Table header */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "160px 80px 1fr 1fr 1fr",
            gap: 2,
            marginBottom: 2,
          }}
        >
          {["Module", ...columns].map((col, i) => (
            <div
              key={col}
              style={{
                padding: "10px 14px",
                backgroundColor: GREEN,
                borderRadius: i === 0 ? "8px 0 0 0" : i === columns.length ? "0 8px 0 0" : 0,
                fontSize: V2_TYPE.statLabel,
                fontWeight: 700,
                color: WHITE,
                opacity: fadeIn(frame, 10 + i * 3, 12),
              }}
            >
              {col}
            </div>
          ))}
        </div>

        {/* Table rows */}
        {modules.map((mod, rowIdx) => {
          const rowDelay = staggerDelay(rowIdx, 15, 10);
          const rowSpring = springEntrance(frame, fps, rowDelay, SPRING.default);
          const isLast = rowIdx === modules.length - 1;
          return (
            <div
              key={rowIdx}
              style={{
                display: "grid",
                gridTemplateColumns: "160px 80px 1fr 1fr 1fr",
                gap: 2,
                marginBottom: 2,
                opacity: rowSpring,
                transform: `translateX(${slideIn(rowSpring, "right", 20)}px)`,
              }}
            >
              <div
                style={{
                  padding: "12px 14px",
                  backgroundColor: "rgba(46,125,50,0.08)",
                  borderRadius: isLast ? "0 0 0 8px" : 0,
                  fontSize: V2_TYPE.statLabel,
                  fontWeight: 700,
                  color: GREEN,
                }}
              >
                {mod.module}
              </div>
              {[mod.duration, mod.content, mod.result, mod.perspective].map((cell, colIdx) => (
                <div
                  key={colIdx}
                  style={{
                    padding: "12px 14px",
                    backgroundColor: rowIdx % 2 === 0 ? GREEN_BG : WHITE,
                    borderRadius: isLast && colIdx === 3 ? "0 0 8px 0" : 0,
                    fontSize: V2_TYPE.tableCell,
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

      <LogoWatermark frame={frame} />
    </AbsoluteFill>
  );
};


// ═══════════════════════════════════════════════════════════════
// FOLIE 7 - The First Workshop: Complete agenda
// ═══════════════════════════════════════════════════════════════

export const Folie7FirstWorkshopV2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = springEntrance(frame, fps, 10, SPRING.default);

  const agenda = [
    { time: "~0.5h", topic: "Goal Definition", desc: "Align on objectives, define success criteria, identify key stakeholders and their expectations" },
    { time: "~1h", topic: "Use Case Mapping", desc: "Map out concrete use cases, prioritize by business impact and technical feasibility, identify quick wins" },
    { time: "~1h", topic: "Test Data & Feasibility", desc: "Identify data sources, check technical feasibility, evaluate existing infrastructure and integration points" },
    { time: "~0.5h", topic: "Next Steps & Action Items", desc: "Define action items with owners and deadlines, plan follow-up sessions, agree on deliverables timeline" },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: GREEN_BG, fontFamily: FONT }}>
      <div
        style={{
          padding: 60,
          paddingTop: 48,
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <div
          style={{
            fontSize: V2_TYPE.sectionLabel,
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
            fontSize: V2_TYPE.title,
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
            fontSize: V2_TYPE.cardDesc,
            color: TEXT_GRAY,
            opacity: fadeIn(frame, 25, 20),
            marginBottom: 28,
          }}
        >
          Half-day interactive session (~3 hours)
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {agenda.map((item, i) => {
            const s = springEntrance(frame, fps, staggerDelay(i, 10, 10), SPRING.default);
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
                <div
                  style={{
                    minWidth: 64,
                    padding: "6px 12px",
                    borderRadius: 8,
                    backgroundColor: GREEN,
                    color: WHITE,
                    fontSize: V2_TYPE.tableCell,
                    fontWeight: 700,
                    textAlign: "center",
                  }}
                >
                  {item.time}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 16, fontWeight: 700, color: TEXT_BLACK }}>{item.topic}</div>
                  <div style={{ fontSize: V2_TYPE.cardDesc, color: TEXT_GRAY, marginTop: 3, lineHeight: 1.5 }}>{item.desc}</div>
                </div>
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    border: `2px solid ${GREEN}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: V2_TYPE.tableCell,
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

      <LogoWatermark frame={frame} />
    </AbsoluteFill>
  );
};


// ═══════════════════════════════════════════════════════════════
// FOLIE 8 - Next Steps: Generic journey roadmap (0→1→2→3)
// ═══════════════════════════════════════════════════════════════

export const Folie8NextStepsV2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = springEntrance(frame, fps, 10, SPRING.default);

  const milestones = [
    { step: "0", label: "Workshop", result: "Presentation & Concept", icon: <TargetIcon size={22} /> },
    { step: "1", label: "Concept", result: "Video / Prototype Demo", icon: <LightbulbIcon size={22} /> },
    { step: "2", label: "Build", result: "POC / MVP Application", icon: <GearIcon size={22} /> },
    { step: "3", label: "Launch", result: "Functional Product", icon: <RocketIcon size={22} /> },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: WHITE, fontFamily: FONT }}>
      <div
        style={{
          padding: 60,
          paddingTop: 48,
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <div
          style={{
            fontSize: V2_TYPE.sectionLabel,
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
            fontSize: V2_TYPE.title,
            fontWeight: 800,
            color: TEXT_BLACK,
            opacity: titleSpring,
            transform: `translateX(${slideIn(titleSpring, "left", 25)}px)`,
            marginBottom: 48,
          }}
        >
          Next Steps
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 0,
          }}
        >
          {milestones.map((m, i) => {
            const s = springEntrance(frame, fps, staggerDelay(i, 10, 12), SPRING.default);
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
                    minWidth: 160,
                  }}
                >
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
                      fontSize: 22,
                      fontWeight: 800,
                      color: i === 0 ? WHITE : GREEN,
                    }}
                  >
                    {m.step}
                  </div>
                  <div style={{ marginTop: 8 }}>{m.icon}</div>
                  <div
                    style={{
                      fontSize: 16,
                      fontWeight: 700,
                      color: TEXT_BLACK,
                      marginTop: 8,
                      textAlign: "center",
                    }}
                  >
                    {m.label}
                  </div>
                  <div
                    style={{
                      fontSize: V2_TYPE.statLabel,
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
                {!isLast && (
                  <div
                    style={{
                      width: 60,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      opacity: fadeIn(frame, staggerDelay(i, 25, 10), 12),
                      marginBottom: 50,
                    }}
                  >
                    <div style={{ width: 40, height: 2, backgroundColor: GREEN_LIGHT }} />
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

      <LogoWatermark frame={frame} />
    </AbsoluteFill>
  );
};


// ═══════════════════════════════════════════════════════════════
// FOLIE 9 - Next Steps: Customer-specific (Nov 2025)
// ═══════════════════════════════════════════════════════════════

export const Folie9NextStepsCustomerV2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = springEntrance(frame, fps, 10, SPRING.default);

  const milestones = [
    { date: "Nov 4", label: "Workshop 1", result: "Goal definition, use case mapping, stakeholder alignment", done: true },
    { date: "Nov 11", label: "Result Delivery", result: "Presentation + concept paper + prioritized roadmap", done: true },
    { date: "Nov 18", label: "Workshop 2", result: "Deep-dive architecture, tech stack evaluation, feasibility", done: false },
    { date: "Nov 25", label: "Prototype", result: "Working demo with core features, user testing feedback", done: false },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: WHITE, fontFamily: FONT }}>
      <div
        style={{
          padding: 60,
          paddingTop: 48,
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <div
          style={{
            fontSize: V2_TYPE.sectionLabel,
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
            fontSize: V2_TYPE.title,
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
            fontSize: V2_TYPE.cardDesc,
            color: TEXT_MUTED,
            opacity: fadeIn(frame, 20, 15),
            marginBottom: 32,
          }}
        >
          November 2025 - Customer-specific timeline
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {milestones.map((m, i) => {
            const s = springEntrance(frame, fps, staggerDelay(i, 10, 10), SPRING.default);
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
                <div
                  style={{
                    minWidth: 72,
                    padding: "6px 12px",
                    borderRadius: 8,
                    backgroundColor: m.done ? GREEN : GREEN_BG,
                    color: m.done ? WHITE : GREEN,
                    fontSize: V2_TYPE.statLabel,
                    fontWeight: 700,
                    textAlign: "center",
                  }}
                >
                  {m.date}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 16, fontWeight: 700, color: TEXT_BLACK }}>{m.label}</div>
                  <div style={{ fontSize: V2_TYPE.cardDesc, color: TEXT_GRAY, marginTop: 3, lineHeight: 1.5 }}>{m.result}</div>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  {m.done ? <CheckIcon size={24} /> : <GearIcon size={24} />}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <LogoWatermark frame={frame} />
    </AbsoluteFill>
  );
};


// ═══════════════════════════════════════════════════════════════
// FOLIE 10 - Results: Horizontal maturity flow with SVG icons
// ═══════════════════════════════════════════════════════════════

export const Folie10ResultsV2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = springEntrance(frame, fps, 10, SPRING.default);

  const stages: { icon: React.ReactNode; label: string; desc: string }[] = [
    { icon: <LightbulbIcon size={28} />, label: "Clarity", desc: "Understand the problem, align stakeholders" },
    { icon: <ChartIcon size={28} />, label: "Concept", desc: "Design the solution, evaluate options" },
    { icon: <GearIcon size={28} />, label: "Prototype", desc: "Build a working demo, test feasibility" },
    { icon: <RocketIcon size={28} />, label: "MVP", desc: "Ship minimum viable product to users" },
    { icon: <CheckIcon size={28} />, label: "Product", desc: "Production-ready, scalable solution" },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: GREEN_BG, fontFamily: FONT }}>
      <div
        style={{
          padding: 60,
          paddingTop: 48,
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <div
          style={{
            fontSize: V2_TYPE.sectionLabel,
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
            fontSize: V2_TYPE.title,
            fontWeight: 800,
            color: TEXT_BLACK,
            opacity: titleSpring,
            transform: `translateX(${slideIn(titleSpring, "left", 25)}px)`,
            marginBottom: 40,
          }}
        >
          Results
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
            gap: 0,
          }}
        >
          {stages.map((stage, i) => {
            const s = springEntrance(frame, fps, staggerDelay(i, 10, 10), SPRING.default);
            const isLast = i === stages.length - 1;
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
                    minWidth: 140,
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
                    {stage.icon}
                  </div>
                  <div
                    style={{
                      fontSize: 16,
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
                      fontSize: V2_TYPE.statLabel,
                      color: TEXT_GRAY,
                      marginTop: 4,
                      textAlign: "center",
                      maxWidth: 130,
                      lineHeight: 1.4,
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
                      opacity: fadeIn(frame, staggerDelay(i, 25, 10), 12),
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

        <div
          style={{
            marginTop: 36,
            height: 6,
            backgroundColor: "rgba(46,125,50,0.1)",
            borderRadius: 3,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${interpolate(frame, [30, 80], [0, 100], { extrapolateRight: "clamp", extrapolateLeft: "clamp" })}%`,
              background: `linear-gradient(90deg, ${GREEN}, ${GREEN_LIGHTER})`,
              borderRadius: 3,
            }}
          />
        </div>
      </div>

      <LogoWatermark frame={frame} />
    </AbsoluteFill>
  );
};


// ═══════════════════════════════════════════════════════════════
// FOLIE 11 - Results: Staircase visualization
// ═══════════════════════════════════════════════════════════════

export const Folie11StaircaseV2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = springEntrance(frame, fps, 10, SPRING.default);

  const steps = [
    { label: "Clarity", desc: "Problem understood", height: 80 },
    { label: "Concept", desc: "Solution designed", height: 140 },
    { label: "Prototype", desc: "Demo built", height: 200 },
    { label: "MVP", desc: "Users onboarded", height: 260 },
    { label: "Product", desc: "Production-ready", height: 320 },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: WHITE, fontFamily: FONT }}>
      <div
        style={{
          padding: 60,
          paddingTop: 48,
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <div
          style={{
            fontSize: V2_TYPE.sectionLabel,
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
            fontSize: V2_TYPE.title,
            fontWeight: 800,
            color: TEXT_BLACK,
            opacity: titleSpring,
            transform: `translateX(${slideIn(titleSpring, "left", 25)}px)`,
            marginBottom: 20,
          }}
        >
          Results
        </div>

        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            gap: 12,
            paddingBottom: 40,
          }}
        >
          {steps.map((step, i) => {
            const s = springEntrance(frame, fps, staggerDelay(i, 8, 10), SPRING.default);
            const greenAlpha = 0.15 + i * 0.18;
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
                <div style={{ fontSize: V2_TYPE.statLabel, fontWeight: 700, color: GREEN, marginBottom: 4, opacity: s }}>
                  {step.label}
                </div>
                <div style={{ fontSize: 12, color: TEXT_MUTED, marginBottom: 8, opacity: s, textAlign: "center" }}>
                  {step.desc}
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

      <LogoWatermark frame={frame} />
    </AbsoluteFill>
  );
};


// ═══════════════════════════════════════════════════════════════
// FOLIE 12 - Results Step by Step: Detailed staircase with personas
// ═══════════════════════════════════════════════════════════════

export const Folie12StaircaseDetailedV2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = springEntrance(frame, fps, 10, SPRING.default);

  const steps = [
    { level: "Clarity", persona: "Stakeholder", icon: <PersonIcon size={18} />, question: "What problem are we solving?", height: 70 },
    { level: "Concept", persona: "Architect", icon: <CodeIcon size={18} />, question: "How should we build it?", height: 130 },
    { level: "Prototype", persona: "Developer", icon: <GearIcon size={18} />, question: "Does it work?", height: 190 },
    { level: "MVP", persona: "Product Owner", icon: <ChartIcon size={18} />, question: "Do users want it?", height: 250 },
    { level: "Product", persona: "Team", icon: <RocketIcon size={18} />, question: "Can we scale it?", height: 310 },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: GREEN_BG, fontFamily: FONT }}>
      <div
        style={{
          padding: 60,
          paddingTop: 48,
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <div
          style={{
            fontSize: V2_TYPE.sectionLabel,
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
            fontSize: V2_TYPE.title,
            fontWeight: 800,
            color: TEXT_BLACK,
            opacity: titleSpring,
            transform: `translateX(${slideIn(titleSpring, "left", 25)}px)`,
            marginBottom: 16,
          }}
        >
          Results Step by Step
        </div>

        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            gap: 12,
            paddingBottom: 40,
          }}
        >
          {steps.map((step, i) => {
            const s = springEntrance(frame, fps, staggerDelay(i, 8, 10), SPRING.default);
            const greenAlpha = 0.12 + i * 0.15;
            const barHeight = interpolate(s, [0, 1], [0, step.height]);
            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: 130,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 4, opacity: s, marginBottom: 2 }}>
                  {step.icon}
                  <span style={{ fontSize: V2_TYPE.statLabel, fontWeight: 600, color: TEXT_GRAY }}>{step.persona}</span>
                </div>
                <div style={{ fontSize: 12, color: TEXT_MUTED, opacity: s, marginBottom: 6, textAlign: "center", fontStyle: "italic" }}>
                  &ldquo;{step.question}&rdquo;
                </div>
                <div style={{ fontSize: V2_TYPE.tableCell, fontWeight: 700, color: GREEN, marginBottom: 6, opacity: s }}>
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

      <LogoWatermark frame={frame} />
    </AbsoluteFill>
  );
};


// ═══════════════════════════════════════════════════════════════
// FOLIE 13 - Results Step by Step: Flexible deep-dive
// ═══════════════════════════════════════════════════════════════

export const Folie13FlexibleDeepDiveV2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = springEntrance(frame, fps, 10, SPRING.default);

  const tracks: { icon: React.ReactNode; title: string; items: string[] }[] = [
    {
      icon: <GearIcon size={28} />,
      title: "Prototype / Demo",
      items: ["Interactive prototype with core features", "Live demo environment for stakeholders", "User testing feedback and iteration plan"],
    },
    {
      icon: <ChartIcon size={28} />,
      title: "Business Case",
      items: ["ROI calculation with 3-year projection", "Market analysis and competitive positioning", "Risk assessment and mitigation strategies"],
    },
    {
      icon: <DataIcon size={28} />,
      title: "TCO Analysis",
      items: ["Infrastructure and compute costs breakdown", "Licensing, operations, and maintenance costs", "3-year total cost of ownership projection"],
    },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: WHITE, fontFamily: FONT }}>
      <div
        style={{
          padding: 60,
          paddingTop: 48,
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <div
          style={{
            fontSize: V2_TYPE.sectionLabel,
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
            fontSize: V2_TYPE.title,
            fontWeight: 800,
            color: TEXT_BLACK,
            opacity: titleSpring,
            transform: `translateX(${slideIn(titleSpring, "left", 25)}px)`,
            marginBottom: 28,
          }}
        >
          Results Step by Step
        </div>

        <div style={{ display: "flex", gap: 20, flex: 1 }}>
          {tracks.map((track, i) => {
            const s = springEntrance(frame, fps, staggerDelay(i, 10, 12), SPRING.default);
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
                <div style={{ marginBottom: 12 }}>{track.icon}</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: TEXT_BLACK, marginBottom: 16 }}>
                  {track.title}
                </div>
                {track.items.map((item, j) => (
                  <div
                    key={j}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 8,
                      marginBottom: 10,
                      opacity: fadeIn(frame, staggerDelay(j, staggerDelay(i, 20, 12), 8), 10),
                    }}
                  >
                    <div
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        backgroundColor: GREEN,
                        flexShrink: 0,
                        marginTop: 6,
                      }}
                    />
                    <div style={{ fontSize: V2_TYPE.cardDesc, color: TEXT_GRAY, lineHeight: 1.5 }}>{item}</div>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>

      <LogoWatermark frame={frame} />
    </AbsoluteFill>
  );
};


// ═══════════════════════════════════════════════════════════════
// FOLIE 14 - Results Step by Step: Video-focused variant
// ═══════════════════════════════════════════════════════════════

export const Folie14VideoFocusedV2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = springEntrance(frame, fps, 10, SPRING.default);

  const deliverables: { icon: React.ReactNode; title: string; desc: string; duration: string }[] = [
    { icon: <CodeIcon size={24} />, title: "Explainer Video", desc: "2-3 min animated overview of the solution concept and business value proposition", duration: "1 week" },
    { icon: <ChartIcon size={24} />, title: "Data Story Video", desc: "Visualized metrics, business impact analysis, and ROI projections", duration: "3-5 days" },
    { icon: <GearIcon size={24} />, title: "Demo Recording", desc: "Screen recording of prototype walkthrough with narrated feature highlights", duration: "2-3 days" },
    { icon: <PaperPlaneIcon size={24} />, title: "Social Clips", desc: "Short-form clips optimized for LinkedIn and social media distribution", duration: "1-2 days" },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: GREEN_BG, fontFamily: FONT }}>
      <div
        style={{
          padding: 60,
          paddingTop: 48,
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <div
          style={{
            fontSize: V2_TYPE.sectionLabel,
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
            fontSize: V2_TYPE.title,
            fontWeight: 800,
            color: TEXT_BLACK,
            opacity: titleSpring,
            transform: `translateX(${slideIn(titleSpring, "left", 25)}px)`,
            marginBottom: 28,
          }}
        >
          Results Step by Step
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {deliverables.map((d, i) => {
            const s = springEntrance(frame, fps, staggerDelay(i, 8, 10), SPRING.default);
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
                  {d.icon}
                  <div
                    style={{
                      padding: "3px 10px",
                      borderRadius: 6,
                      backgroundColor: "rgba(46,125,50,0.08)",
                      fontSize: V2_TYPE.statLabel,
                      fontWeight: 600,
                      color: GREEN,
                    }}
                  >
                    {d.duration}
                  </div>
                </div>
                <div style={{ fontSize: 16, fontWeight: 700, color: TEXT_BLACK, marginBottom: 4 }}>{d.title}</div>
                <div style={{ fontSize: V2_TYPE.cardDesc, color: TEXT_GRAY, lineHeight: 1.5 }}>{d.desc}</div>
              </div>
            );
          })}
        </div>
      </div>

      <LogoWatermark frame={frame} />
    </AbsoluteFill>
  );
};


// ═══════════════════════════════════════════════════════════════
// FOLIE 15 - Section Divider: "More Information" (split-panel)
// ═══════════════════════════════════════════════════════════════

export const Folie15MoreInfoV2: React.FC = () => (
  <SectionDividerV2 title="More Information" slideImage="slides/lindamohamed/Folie15.png" />
);


// ═══════════════════════════════════════════════════════════════
// FOLIE 16 - Idea-to-Prototype Pipeline: Timeline with tech stack
// ═══════════════════════════════════════════════════════════════

export const Folie16PipelineV2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = springEntrance(frame, fps, 10, SPRING.default);

  const phases = [
    { phase: "Ideation", duration: "1-2 weeks", tools: ["Workshops", "Miro", "Stakeholder Interviews"], color: "rgba(46,125,50,0.1)", icon: <LightbulbIcon size={20} /> },
    { phase: "Design", duration: "1-2 weeks", tools: ["Architecture", "Diagrams", "Security Review"], color: "rgba(46,125,50,0.18)", icon: <CodeIcon size={20} /> },
    { phase: "Prototype", duration: "2-4 weeks", tools: ["Python", "AWS/Azure", "API Integration"], color: "rgba(46,125,50,0.28)", icon: <GearIcon size={20} /> },
    { phase: "MVP", duration: "4-8 weeks", tools: ["Terraform", "CI/CD", "Monitoring"], color: "rgba(46,125,50,0.4)", icon: <RocketIcon size={20} /> },
  ];

  const techStack = [
    "AWS", "Azure", "OpenShift", "Terraform", "Python", "Java", "GitLab", "GitHub",
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: WHITE, fontFamily: FONT }}>
      <div
        style={{
          padding: 60,
          paddingTop: 48,
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <div
          style={{
            fontSize: V2_TYPE.sectionLabel,
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
            fontSize: V2_TYPE.title,
            fontWeight: 800,
            color: TEXT_BLACK,
            opacity: titleSpring,
            transform: `translateX(${slideIn(titleSpring, "left", 25)}px)`,
            marginBottom: 32,
          }}
        >
          Idea-to-Prototype Pipeline
        </div>

        <div style={{ display: "flex", gap: 14, marginBottom: 28 }}>
          {phases.map((p, i) => {
            const s = springEntrance(frame, fps, staggerDelay(i, 8, 10), SPRING.default);
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
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                  {p.icon}
                  <span style={{ fontSize: 16, fontWeight: 700, color: TEXT_BLACK }}>{p.phase}</span>
                </div>
                <div style={{ fontSize: V2_TYPE.tableCell, color: GREEN, fontWeight: 600, marginBottom: 8 }}>{p.duration}</div>
                <div style={{ fontSize: V2_TYPE.statLabel, color: TEXT_GRAY, lineHeight: 1.5 }}>
                  {p.tools.join(" · ")}
                </div>
              </div>
            );
          })}
        </div>

        <div
          style={{
            height: 3,
            background: `linear-gradient(90deg, ${GREEN}, ${GREEN_LIGHTER})`,
            borderRadius: 2,
            marginBottom: 24,
            opacity: fadeIn(frame, 35, 15),
          }}
        />

        <div
          style={{
            display: "flex",
            flexWrap: "wrap" as const,
            gap: 10,
            justifyContent: "center",
          }}
        >
          {techStack.map((tech, i) => {
            const badgeOpacity = fadeIn(frame, staggerDelay(i, 40, 4), 12);
            return (
              <div
                key={tech}
                style={{
                  padding: "6px 16px",
                  borderRadius: 20,
                  backgroundColor: GREEN_BG,
                  border: `1px solid ${CARD_BORDER}`,
                  fontSize: V2_TYPE.statLabel,
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

      <LogoWatermark frame={frame} />
    </AbsoluteFill>
  );
};


// ═══════════════════════════════════════════════════════════════
// FOLIE 17 - Idea-to-Prototype Pipeline: Detailed with activities
// ═══════════════════════════════════════════════════════════════

export const Folie17PipelineDetailedV2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = springEntrance(frame, fps, 10, SPRING.default);

  const phases = [
    {
      phase: "Ideation",
      duration: "1-2 weeks",
      activities: ["Stakeholder interviews & alignment", "Problem framing & opportunity mapping", "Use case prioritization"],
      color: "rgba(46,125,50,0.08)",
      icon: <LightbulbIcon size={20} />,
    },
    {
      phase: "Design",
      duration: "1-2 weeks",
      activities: ["Architecture design & tech stack", "Security review & compliance check", "Integration point mapping"],
      color: "rgba(46,125,50,0.15)",
      icon: <CodeIcon size={20} />,
    },
    {
      phase: "Prototype",
      duration: "2-4 weeks",
      activities: ["Core feature implementation", "API integration & data pipeline", "User testing & feedback loops"],
      color: "rgba(46,125,50,0.25)",
      icon: <GearIcon size={20} />,
    },
    {
      phase: "MVP",
      duration: "4-8 weeks",
      activities: ["Production infrastructure setup", "CI/CD pipeline & automation", "Monitoring, logging & alerting"],
      color: "rgba(46,125,50,0.38)",
      icon: <RocketIcon size={20} />,
    },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: WHITE, fontFamily: FONT }}>
      <div
        style={{
          padding: 60,
          paddingTop: 48,
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <div
          style={{
            fontSize: V2_TYPE.sectionLabel,
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
            fontSize: V2_TYPE.title,
            fontWeight: 800,
            color: TEXT_BLACK,
            opacity: titleSpring,
            transform: `translateX(${slideIn(titleSpring, "left", 25)}px)`,
            marginBottom: 24,
          }}
        >
          Idea-to-Prototype Pipeline
        </div>

        <div style={{ display: "flex", gap: 14, flex: 1 }}>
          {phases.map((p, i) => {
            const s = springEntrance(frame, fps, staggerDelay(i, 8, 10), SPRING.default);
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
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                  {p.icon}
                  <span style={{ fontSize: 17, fontWeight: 700, color: TEXT_BLACK }}>{p.phase}</span>
                </div>
                <div
                  style={{
                    fontSize: V2_TYPE.statLabel,
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
                      alignItems: "flex-start",
                      gap: 8,
                      marginBottom: 8,
                      opacity: fadeIn(frame, staggerDelay(j, staggerDelay(i, 20, 10), 8), 10),
                    }}
                  >
                    <div style={{ width: 5, height: 5, borderRadius: "50%", backgroundColor: GREEN, flexShrink: 0, marginTop: 6 }} />
                    <div style={{ fontSize: V2_TYPE.tableCell, color: TEXT_GRAY, lineHeight: 1.5 }}>{act}</div>
                  </div>
                ))}
              </div>
            );
          })}
        </div>

        <div
          style={{
            height: 3,
            background: `linear-gradient(90deg, ${GREEN}, ${GREEN_LIGHTER})`,
            borderRadius: 2,
            marginTop: 16,
            opacity: fadeIn(frame, 35, 15),
          }}
        />
      </div>

      <LogoWatermark frame={frame} />
    </AbsoluteFill>
  );
};


// ═══════════════════════════════════════════════════════════════
// FOLIE 18 - Components: AI Systems (concentric arcs)
// ═══════════════════════════════════════════════════════════════

export const Folie18AISystemsV2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = springEntrance(frame, fps, 10, SPRING.default);

  const layers = [
    { label: "Artificial Intelligence", desc: "Rule-based systems, expert systems, search algorithms", radius: 160, alpha: 0.08 },
    { label: "Machine Learning", desc: "Supervised, unsupervised, reinforcement learning", radius: 125, alpha: 0.15 },
    { label: "Deep Learning", desc: "Neural networks, CNNs, RNNs, transformers", radius: 90, alpha: 0.25 },
    { label: "Generative AI", desc: "LLMs, diffusion models, multimodal AI", radius: 55, alpha: 0.4 },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: WHITE, fontFamily: FONT }}>
      <div
        style={{
          padding: 60,
          paddingTop: 48,
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <div
          style={{
            fontSize: V2_TYPE.sectionLabel,
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
            fontSize: V2_TYPE.title,
            fontWeight: 800,
            color: TEXT_BLACK,
            opacity: titleSpring,
            transform: `translateX(${slideIn(titleSpring, "left", 25)}px)`,
            marginBottom: 12,
          }}
        >
          Components: AI Systems
        </div>

        <div style={{ display: "flex", flex: 1, gap: 32 }}>
          {/* Left: concentric circles */}
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
              const s = springEntrance(frame, fps, staggerDelay(i, 8, 10), SPRING.gentle);
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
                  {i === layers.length - 1 && (
                    <div style={{ fontSize: V2_TYPE.statLabel, fontWeight: 700, color: GREEN, textAlign: "center" }}>
                      {layer.label}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right: legend with descriptions */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: 14,
            }}
          >
            {layers.map((layer, i) => {
              const labelOpacity = fadeIn(frame, staggerDelay(i, 18, 10), 12);
              return (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 12,
                    opacity: labelOpacity,
                  }}
                >
                  <div
                    style={{
                      width: 16,
                      height: 16,
                      borderRadius: "50%",
                      backgroundColor: `rgba(46,125,50,${layer.alpha + 0.15})`,
                      flexShrink: 0,
                      marginTop: 3,
                    }}
                  />
                  <div>
                    <div style={{ fontSize: V2_TYPE.cardDesc, fontWeight: 700, color: TEXT_BLACK }}>{layer.label}</div>
                    <div style={{ fontSize: V2_TYPE.statLabel, color: TEXT_GRAY, marginTop: 2, lineHeight: 1.4 }}>{layer.desc}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <LogoWatermark frame={frame} />
    </AbsoluteFill>
  );
};


// ═══════════════════════════════════════════════════════════════
// FOLIE 19 - Components: Cloud (SaaS/PaaS/IaaS/On-Prem pyramid)
// ═══════════════════════════════════════════════════════════════

export const Folie19CloudV2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = springEntrance(frame, fps, 10, SPRING.default);

  const layers = [
    { label: "SaaS", desc: "Software as a Service - ready-to-use applications", width: 300, alpha: 0.4, icon: <CloudIcon size={18} /> },
    { label: "PaaS", desc: "Platform as a Service - managed runtime & middleware", width: 420, alpha: 0.28, icon: <CodeIcon size={18} /> },
    { label: "IaaS", desc: "Infrastructure as a Service - virtual machines & storage", width: 540, alpha: 0.18, icon: <GearIcon size={18} /> },
    { label: "On-Premises", desc: "Self-managed infrastructure - full control & responsibility", width: 660, alpha: 0.08, icon: <DataIcon size={18} /> },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: GREEN_BG, fontFamily: FONT }}>
      <div
        style={{
          padding: 60,
          paddingTop: 48,
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <div
          style={{
            fontSize: V2_TYPE.sectionLabel,
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
            fontSize: V2_TYPE.title,
            fontWeight: 800,
            color: TEXT_BLACK,
            opacity: titleSpring,
            transform: `translateX(${slideIn(titleSpring, "left", 25)}px)`,
            marginBottom: 24,
          }}
        >
          Components: Cloud
        </div>

        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
          }}
        >
          {layers.map((layer, i) => {
            const s = springEntrance(frame, fps, staggerDelay(i, 8, 10), SPRING.default);
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
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  {layer.icon}
                  <span style={{ fontSize: 17, fontWeight: 700, color: TEXT_BLACK }}>{layer.label}</span>
                </div>
                <div style={{ fontSize: V2_TYPE.statLabel, color: TEXT_GRAY, maxWidth: 320, textAlign: "right" }}>{layer.desc}</div>
              </div>
            );
          })}
        </div>
      </div>

      <LogoWatermark frame={frame} />
    </AbsoluteFill>
  );
};


// ═══════════════════════════════════════════════════════════════
// FOLIE 20 - Collaboration in Teams: SVG icons + partners
// ═══════════════════════════════════════════════════════════════

export const Folie20CollaborationV2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = springEntrance(frame, fps, 10, SPRING.default);

  const services: { icon: React.ReactNode; title: string; desc: string }[] = [
    { icon: <GearIcon size={24} />, title: "AI & ML", desc: "Model development, fine-tuning, deployment pipelines" },
    { icon: <CloudIcon size={24} />, title: "Cloud", desc: "Architecture, migration, cost optimization" },
    { icon: <CodeIcon size={24} />, title: "DevOps", desc: "CI/CD, Infrastructure as Code, monitoring" },
    { icon: <DataIcon size={24} />, title: "Data", desc: "Analytics, pipelines, governance frameworks" },
    { icon: <TargetIcon size={24} />, title: "Strategy", desc: "Workshops, roadmaps, consulting sessions" },
  ];

  const partners = ["ebcont", "auvaria", "kawa", "sviss", "devoteam", "orbit", "adversary"];

  return (
    <AbsoluteFill style={{ backgroundColor: WHITE, fontFamily: FONT }}>
      <div
        style={{
          padding: 60,
          paddingTop: 48,
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <div
          style={{
            fontSize: V2_TYPE.sectionLabel,
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
            fontSize: V2_TYPE.title,
            fontWeight: 800,
            color: TEXT_BLACK,
            opacity: titleSpring,
            transform: `translateX(${slideIn(titleSpring, "left", 25)}px)`,
            marginBottom: 24,
          }}
        >
          Collaboration in Teams
        </div>

        <div style={{ display: "flex", gap: 14, marginBottom: 24 }}>
          {services.map((svc, i) => {
            const s = springEntrance(frame, fps, staggerDelay(i, 8, 10), SPRING.default);
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
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <div style={{ marginBottom: 8 }}>{svc.icon}</div>
                <div style={{ fontSize: V2_TYPE.cardDesc, fontWeight: 700, color: TEXT_BLACK, marginBottom: 4 }}>{svc.title}</div>
                <div style={{ fontSize: V2_TYPE.statLabel, color: TEXT_GRAY, lineHeight: 1.4 }}>{svc.desc}</div>
              </div>
            );
          })}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 12,
            flexWrap: "wrap" as const,
            opacity: fadeIn(frame, 40, 15),
          }}
        >
          <div style={{ fontSize: V2_TYPE.statLabel, fontWeight: 600, color: TEXT_MUTED, marginRight: 8, alignSelf: "center" }}>
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
                fontSize: V2_TYPE.statLabel,
                fontWeight: 600,
                color: TEXT_GRAY,
                opacity: fadeIn(frame, staggerDelay(i, 42, 4), 10),
              }}
            >
              {p}
            </div>
          ))}
        </div>
      </div>

      <LogoWatermark frame={frame} />
    </AbsoluteFill>
  );
};


// ═══════════════════════════════════════════════════════════════
// FOLIE 21 - Cloud Fundings: Complete funding programs + partner logos
// ═══════════════════════════════════════════════════════════════

const PartnerBadge: React.FC<{ name: string; color: string; bgColor: string }> = ({ name, color, bgColor }) => (
  <div
    style={{
      padding: "4px 12px",
      borderRadius: 6,
      backgroundColor: bgColor,
      fontSize: 12,
      fontWeight: 700,
      color: color,
    }}
  >
    {name}
  </div>
);

export const Folie21CloudFundingsV2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = springEntrance(frame, fps, 10, SPRING.default);

  const fundings = [
    { provider: "AWS", program: "Activate", amount: "Up to €100K", desc: "Credits for startups and early-stage companies", providerColor: "#FF9900", providerBg: "rgba(255,153,0,0.1)" },
    { provider: "AWS", program: "Migration Acceleration", amount: "Up to €500K", desc: "Enterprise migration credits and technical support", providerColor: "#FF9900", providerBg: "rgba(255,153,0,0.1)" },
    { provider: "Azure", program: "Startup Program", amount: "Up to €150K", desc: "Credits, technical support, and co-sell opportunities", providerColor: "#0078D4", providerBg: "rgba(0,120,212,0.1)" },
    { provider: "Azure", program: "Innovation Hub", amount: "€10K–€50K", desc: "PoC funding for innovative cloud solutions", providerColor: "#0078D4", providerBg: "rgba(0,120,212,0.1)" },
    { provider: "RedHat", program: "OpenShift Partner", amount: "Varies", desc: "Partner program credits and certification support", providerColor: "#EE0000", providerBg: "rgba(238,0,0,0.08)" },
    { provider: "GitLab", program: "Partner Program", amount: "Varies", desc: "DevOps platform credits and integration support", providerColor: "#FC6D26", providerBg: "rgba(252,109,38,0.08)" },
  ];

  const partnerLogos = [
    { name: "AWS", color: "#FF9900", bg: "rgba(255,153,0,0.1)" },
    { name: "Azure", color: "#0078D4", bg: "rgba(0,120,212,0.1)" },
    { name: "OpenShift", color: "#EE0000", bg: "rgba(238,0,0,0.08)" },
    { name: "RedHat", color: "#EE0000", bg: "rgba(238,0,0,0.08)" },
    { name: "GitLab", color: "#FC6D26", bg: "rgba(252,109,38,0.08)" },
    { name: "GitHub", color: "#333333", bg: "rgba(0,0,0,0.06)" },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: GREEN_BG, fontFamily: FONT }}>
      <div
        style={{
          padding: 60,
          paddingTop: 48,
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <div
          style={{
            fontSize: V2_TYPE.sectionLabel,
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
            fontSize: V2_TYPE.title,
            fontWeight: 800,
            color: TEXT_BLACK,
            opacity: titleSpring,
            transform: `translateX(${slideIn(titleSpring, "left", 25)}px)`,
            marginBottom: 24,
          }}
        >
          Cloud Fundings
        </div>

        {/* Funding cards - 3×2 grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 12,
            marginBottom: 20,
          }}
        >
          {fundings.map((f, i) => {
            const s = springEntrance(frame, fps, staggerDelay(i, 8, 8), SPRING.default);
            return (
              <div
                key={i}
                style={{
                  padding: "16px 18px",
                  backgroundColor: WHITE,
                  borderRadius: 14,
                  border: `1px solid ${CARD_BORDER}`,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                  opacity: s,
                  transform: `translateY(${slideIn(s, "up", 20)}px)`,
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                  <PartnerBadge name={f.provider} color={f.providerColor} bgColor={f.providerBg} />
                  <div style={{ fontSize: 16, fontWeight: 800, color: GREEN }}>{f.amount}</div>
                </div>
                <div style={{ fontSize: V2_TYPE.tableCell, fontWeight: 700, color: TEXT_BLACK, marginBottom: 3 }}>{f.program}</div>
                <div style={{ fontSize: V2_TYPE.statLabel, color: TEXT_GRAY, lineHeight: 1.4 }}>{f.desc}</div>
              </div>
            );
          })}
        </div>

        {/* Partner logo badges */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 10,
            flexWrap: "wrap" as const,
            opacity: fadeIn(frame, 40, 15),
          }}
        >
          <div style={{ fontSize: V2_TYPE.statLabel, fontWeight: 600, color: TEXT_MUTED, alignSelf: "center", marginRight: 4 }}>
            Technology Partners:
          </div>
          {partnerLogos.map((p, i) => (
            <PartnerBadge key={i} name={p.name} color={p.color} bgColor={p.bg} />
          ))}
        </div>
      </div>

      <LogoWatermark frame={frame} />
    </AbsoluteFill>
  );
};


// ═══════════════════════════════════════════════════════════════
// FOLIE 22 - Thank You: Contact info, social links
// ═══════════════════════════════════════════════════════════════

export const Folie22ThankYouV2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoSpring = springEntrance(frame, fps, 10, SPRING.gentle);
  const titleSpring = springEntrance(frame, fps, 25, SPRING.default);
  const contactOpacity = fadeIn(frame, 25, 15);
  const socialOpacity = fadeIn(frame, 35, 15);

  const socials = [
    { platform: "LinkedIn", handle: "/in/lindamohamed" },
    { platform: "GitHub", handle: "github.com/lindamohamed" },
    { platform: "Web", handle: "lindamohamed.com" },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: WHITE, fontFamily: FONT }}>
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 200,
          background: "linear-gradient(180deg, transparent, rgba(46,125,50,0.04))",
        }}
      />

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: 60,
        }}
      >
        <div
          style={{
            opacity: logoSpring,
            transform: `scale(${interpolate(logoSpring, [0, 1], [0.6, 1])})`,
            marginBottom: 20,
          }}
        >
          <LindaLogo size={72} />
        </div>

        <div
          style={{
            fontSize: 48,
            fontWeight: 800,
            color: TEXT_BLACK,
            opacity: titleSpring,
            transform: `translateY(${slideIn(titleSpring, "up", 20)}px)`,
            marginBottom: 8,
          }}
        >
          Thank You
        </div>

        <div
          style={{
            width: interpolate(frame, [35, 65], [0, 120], {
              extrapolateRight: "clamp",
              extrapolateLeft: "clamp",
            }),
            height: 3,
            backgroundColor: GREEN,
            borderRadius: 2,
            marginBottom: 24,
          }}
        />

        <div
          style={{
            fontSize: V2_TYPE.body,
            color: TEXT_GRAY,
            textAlign: "center",
            opacity: contactOpacity,
            marginBottom: 8,
          }}
        >
          Linda Mohamed · AI & Cloud Consultant
        </div>
        <div
          style={{
            fontSize: V2_TYPE.cardDesc,
            color: TEXT_MUTED,
            textAlign: "center",
            opacity: contactOpacity,
            marginBottom: 24,
          }}
        >
          Workshops · Consulting · MVP Development · Cloud & AI Strategy
        </div>

        <div
          style={{
            display: "flex",
            gap: 20,
            opacity: socialOpacity,
          }}
        >
          {socials.map((s, i) => (
            <div
              key={i}
              style={{
                padding: "10px 24px",
                borderRadius: 20,
                backgroundColor: GREEN_BG,
                border: `1px solid ${CARD_BORDER}`,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                opacity: fadeIn(frame, staggerDelay(i, 35, 8), 12),
              }}
            >
              <div style={{ fontSize: V2_TYPE.statLabel, fontWeight: 700, color: GREEN }}>{s.platform}</div>
              <div style={{ fontSize: 12, color: TEXT_MUTED, marginTop: 2 }}>{s.handle}</div>
            </div>
          ))}
        </div>
      </AbsoluteFill>

      <LogoWatermark frame={frame} />
    </AbsoluteFill>
  );
};


// ═══════════════════════════════════════════════════════════════
// MAIN DECK V2 - Sequences all 22 V2 slides
// Each slide: 150 frames (5 seconds at 30fps)
// Total: 22 × 150 = 3300 frames (110 seconds)
// ═══════════════════════════════════════════════════════════════

const SLIDE_DURATION = 150;

export const LindaMohamedDeckV2: React.FC = () => {
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
      {slide(<Folie1CoverV2 />, "Folie1-Cover-V2")}
      {slide(<Folie2AboutMeV2 />, "Folie2-AboutMe-V2")}
      {slide(<Folie3WhatIOfferV2 />, "Folie3-WhatIOffer-V2")}
      {slide(<Folie4CostsPackagesV2 />, "Folie4-CostsPackages-V2")}
      {slide(<Folie5WorkshopsV2 />, "Folie5-Workshops-V2")}
      {slide(<Folie6WorkshopModulesV2 />, "Folie6-WorkshopModules-V2")}
      {slide(<Folie7FirstWorkshopV2 />, "Folie7-FirstWorkshop-V2")}
      {slide(<Folie8NextStepsV2 />, "Folie8-NextSteps-V2")}
      {slide(<Folie9NextStepsCustomerV2 />, "Folie9-NextStepsCustomer-V2")}
      {slide(<Folie10ResultsV2 />, "Folie10-Results-V2")}
      {slide(<Folie11StaircaseV2 />, "Folie11-Staircase-V2")}
      {slide(<Folie12StaircaseDetailedV2 />, "Folie12-StaircaseDetailed-V2")}
      {slide(<Folie13FlexibleDeepDiveV2 />, "Folie13-FlexibleDeepDive-V2")}
      {slide(<Folie14VideoFocusedV2 />, "Folie14-VideoFocused-V2")}
      {slide(<Folie15MoreInfoV2 />, "Folie15-MoreInfo-V2")}
      {slide(<Folie16PipelineV2 />, "Folie16-Pipeline-V2")}
      {slide(<Folie17PipelineDetailedV2 />, "Folie17-PipelineDetailed-V2")}
      {slide(<Folie18AISystemsV2 />, "Folie18-AISystems-V2")}
      {slide(<Folie19CloudV2 />, "Folie19-Cloud-V2")}
      {slide(<Folie20CollaborationV2 />, "Folie20-Collaboration-V2")}
      {slide(<Folie21CloudFundingsV2 />, "Folie21-CloudFundings-V2")}
      {slide(<Folie22ThankYouV2 />, "Folie22-ThankYou-V2")}
    </AbsoluteFill>
  );
};

export const LINDAMOHAMED_DECK_V2_DURATION = 22 * SLIDE_DURATION; // 3300 frames

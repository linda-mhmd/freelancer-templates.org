/**
 * Comic Strip — 1080×1920 portrait
 *
 * 4-panel comic layout with thick black borders, halftone dot background,
 * speech bubbles, and kinetic panel transitions. Each panel pops in with
 * a bouncy spring. Action text ("POW!", "ZAP!") slams in on panel 3.
 *
 * Timeline:
 *   0–60f   Panel 1 enters
 *   30–90f  Panel 2 enters
 *   60–120f Panel 3 enters + action word
 *   90–240f Panel 4 enters (wide) + CTA
 *
 * Total: 240 frames (8s @ 30fps)
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
import { PORTRAIT_TYPE, PORTRAIT_PADDING } from "../_shared/PortraitTypes";
import { getStockImage } from "../_shared/StockImages";
import {
  SpeechBubble,
  HalftoneBackground,
  AnimatedSparkles,
  StickerBadge,
} from "../_shared/PlayfulElements";
import { SPRING } from "../_shared/animations";
import type { Theme } from "../_shared/themes";

// ── Constants ──────────────────────────────────────────────────

export const CS_TOTAL_FRAMES = 240;

// ── Props ──────────────────────────────────────────────────────

export interface ComicStripProps {
  theme: Theme;
  panels?: ComicPanel[];
  actionWord?: string;
  cta?: string;
  /** "color" = vibrant panels; "noir" = black & white with yellow accent */
  style?: "color" | "noir";
}

export interface ComicPanel {
  speech?: string;
  imageUrl?: string;
  caption?: string;
}

const PANEL_IMAGES = [
  getStockImage("lifestyle", 540, 480, 1),
  getStockImage("work", 540, 480, 2),
  getStockImage("fitness", 540, 480, 3),
  getStockImage("party", 1080, 480, 4),
];

const DEFAULT_PANELS: ComicPanel[] = [
  { speech: "Wait, this is actually easy?!", caption: "Scene 1" },
  { speech: "Let me try this...", caption: "Scene 2" },
  { speech: "IT WORKS!!!", caption: "Scene 3" },
  { caption: "And that's how you do it 👇" },
];

// ── Panel component ────────────────────────────────────────────

const ComicPanel_: React.FC<{
  panel: ComicPanel;
  index: number;
  enterAt: number;
  x: number;
  y: number;
  w: number;
  h: number;
  theme: Theme;
  style: "color" | "noir";
  isLast?: boolean;
  actionWord?: string;
}> = ({ panel, index, enterAt, x, y, w, h, theme, style, isLast, actionWord }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = spring({ frame: Math.max(0, frame - enterAt), fps, config: SPRING.bouncy });
  const scale = interpolate(enter, [0, 1], [0.85, 1]);
  const opacity = enter;

  const border = 6;
  const accentColor = style === "noir" ? "#fbbf24" : theme.accent;
  const imgUrl = panel.imageUrl ?? PANEL_IMAGES[index % PANEL_IMAGES.length];

  // Action word entrance (panel 3 only)
  const actionEnter = index === 2
    ? spring({ frame: Math.max(0, frame - (enterAt + 15)), fps, config: { damping: 6, stiffness: 200 } })
    : 0;

  return (
    <div style={{
      position: "absolute",
      left: x,
      top: y,
      width: w,
      height: h,
      transform: `scale(${scale})`,
      opacity,
      transformOrigin: "center center",
    }}>
      {/* Black border */}
      <div style={{
        position: "absolute",
        inset: 0,
        border: `${border}px solid #000000`,
        overflow: "hidden",
        backgroundColor: style === "noir" ? "#e8e8e8" : "#fff",
        boxShadow: "4px 4px 0 #000",
      }}>
        {/* Stock image */}
        <Img
          src={imgUrl}
          style={{ width: "100%", height: "100%", objectFit: "cover",
            filter: style === "noir" ? "grayscale(100%)" : "saturate(1.3) contrast(1.1)" }}
        />

        {/* Color tint for last panel */}
        {isLast && (
          <div style={{ position: "absolute", inset: 0, backgroundColor: accentColor, opacity: 0.3 }} />
        )}

        {/* Speech bubble */}
        {panel.speech && enter > 0.5 && (
          <div style={{ position: "absolute", top: 12, left: 12, zIndex: 10 }}>
            <SpeechBubble
              text={panel.speech}
              color="#ffffff"
              textColor="#000000"
              borderColor="#000000"
              tail="bl"
              enterAt={enterAt + 5}
              fontSize={28}
              maxWidth={w - 30}
            />
          </div>
        )}

        {/* Action word — panel 3 */}
        {index === 2 && actionWord && (
          <div style={{
            position: "absolute",
            bottom: 20,
            right: 10,
            fontFamily: "'Inter', sans-serif",
            fontWeight: 900,
            fontSize: PORTRAIT_TYPE.subtitle,
            color: accentColor,
            WebkitTextStroke: `6px #000000`,
            transform: `rotate(-8deg) scale(${actionEnter})`,
            transformOrigin: "center",
            letterSpacing: "-0.02em",
            textTransform: "uppercase",
          }}>
            {actionWord}
          </div>
        )}
      </div>

      {/* Panel caption below */}
      {panel.caption && (
        <div style={{
          position: "absolute",
          bottom: -36,
          left: 0,
          right: 0,
          textAlign: "center",
          fontFamily: "'Inter', sans-serif",
          fontWeight: 700,
          fontSize: PORTRAIT_TYPE.caption,
          color: style === "noir" ? "#000" : theme.textPrimary,
          opacity: enter,
        }}>
          {panel.caption}
        </div>
      )}
    </div>
  );
};

// ── Main composition ───────────────────────────────────────────

export const ComicStrip: React.FC<ComicStripProps> = ({
  theme,
  panels = DEFAULT_PANELS,
  actionWord = "BOOM!",
  cta = "Follow for more tips →",
  style = "color",
}) => {
  const { width, height } = useVideoConfig();
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const pad = 12;
  const halfW = (width - pad * 3) / 2;
  const panelH = (height * 0.55 - pad * 3) / 2;
  const wideH = height * 0.35;

  // CTA entrance
  const ctaEnter = spring({ frame: Math.max(0, frame - 100), fps, config: SPRING.snappy });

  return (
    <AbsoluteFill style={{ backgroundColor: style === "noir" ? "#f5f5f0" : theme.bg }}>
      <HalftoneBackground
        color={style === "noir" ? "#000000" : theme.accent}
        dotSize={style === "noir" ? 5 : 4}
        spacing={20}
        opacity={style === "noir" ? 0.08 : 0.06}
      />

      {/* Top 2-column panels */}
      <ComicPanel_
        panel={panels[0]} index={0} enterAt={0}
        x={pad} y={pad} w={halfW} h={panelH}
        theme={theme} style={style}
      />
      <ComicPanel_
        panel={panels[1]} index={1} enterAt={20}
        x={halfW + pad * 2} y={pad} w={halfW} h={panelH}
        theme={theme} style={style}
      />
      {/* Middle 2-column */}
      <ComicPanel_
        panel={panels[2]} index={2} enterAt={40}
        x={pad} y={panelH + pad * 2} w={halfW} h={panelH}
        theme={theme} style={style} actionWord={actionWord}
      />
      <ComicPanel_
        panel={panels[2]} index={1} enterAt={55}
        x={halfW + pad * 2} y={panelH + pad * 2} w={halfW} h={panelH}
        theme={theme} style={style}
      />
      {/* Bottom wide panel */}
      <ComicPanel_
        panel={panels[3]} index={3} enterAt={80}
        x={pad} y={panelH * 2 + pad * 3} w={width - pad * 2} h={wideH}
        theme={theme} style={style} isLast
      />

      {/* CTA */}
      <div style={{
        position: "absolute",
        bottom: 60,
        left: PORTRAIT_PADDING,
        right: PORTRAIT_PADDING,
        textAlign: "center",
        opacity: ctaEnter,
        transform: `translateY(${(1 - ctaEnter) * 30}px)`,
      }}>
        <StickerBadge
          text={cta}
          color={style === "noir" ? "#fbbf24" : theme.accent}
          textColor={style === "noir" ? "#000" : "#ffffff"}
          rotation={-2}
          enterAt={100}
          size="md"
        />
      </div>

      {/* Sparkles on panel 3 enter */}
      {frame > 40 && (
        <AnimatedSparkles count={8} color={style === "noir" ? "#fbbf24" : theme.accentSecondary} startAt={50} seed="cs-sparks" />
      )}
    </AbsoluteFill>
  );
};

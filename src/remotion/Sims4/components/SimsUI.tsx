// src/remotion/Sims4/components/SimsUI.tsx
// Reusable Sims 4 UI building blocks for all slide templates

import React from 'react';
import { Img, staticFile, useCurrentFrame, spring, useVideoConfig } from 'remotion';
import { SIMS_COLORS, SIMS_FONTS, SIMS_SIZES } from '../data/simsTheme';

// ─── OUTFIT CONFIGURATION ────────────────────────────────────────────────────
export interface OutfitConfig {
  blazerColor: string | null;
  shirtColor: string;
  tieColor: string | null;
  accentColor: string;
  showShirtText: boolean;
  pantsColor: string;
  bootColor: string;
  collarStyle: 'v-neck' | 'crew' | 'blazer-lapel';
}

const OUTFITS: Record<string, OutfitConfig> = {
  'green-blazer': {
    blazerColor: '#1A8C28',
    shirtColor: '#1A1A1A',
    tieColor: '#1A1A1A',
    accentColor: '#0E6B18',
    showShirtText: true,
    pantsColor: '#181820',
    bootColor: '#5A6462',
    collarStyle: 'blazer-lapel',
  },
  'casual': {
    blazerColor: null,
    shirtColor: '#1565C0',
    tieColor: null,
    accentColor: '#1E88E5',
    showShirtText: false,
    pantsColor: '#181820',
    bootColor: '#5A6462',
    collarStyle: 'crew',
  },
  'formal': {
    blazerColor: '#263238',
    shirtColor: '#FFFFFF',
    tieColor: '#1565C0',
    accentColor: '#37474F',
    showShirtText: false,
    pantsColor: '#263238',
    bootColor: '#212121',
    collarStyle: 'blazer-lapel',
  },
  'aws': {
    blazerColor: '#2E7D32',
    shirtColor: '#232F3E',
    tieColor: null,
    accentColor: '#FF9900',
    showShirtText: true,
    pantsColor: '#181820',
    bootColor: '#5A6462',
    collarStyle: 'blazer-lapel',
  },
  'notion': {
    blazerColor: '#2E7D32',
    shirtColor: '#1A1A1A',
    tieColor: null,
    accentColor: '#FFFFFF',
    showShirtText: true,
    pantsColor: '#181820',
    bootColor: '#5A6462',
    collarStyle: 'blazer-lapel',
  },
  'reinvent': {
    blazerColor: '#2E7D32',
    shirtColor: '#1B1B1B',
    tieColor: null,
    accentColor: '#FF9900',
    showShirtText: true,
    pantsColor: '#181820',
    bootColor: '#5A6462',
    collarStyle: 'blazer-lapel',
  },
};

export function getOutfitConfig(outfit?: string): OutfitConfig {
  return OUTFITS[outfit ?? 'green-blazer'] ?? OUTFITS['green-blazer'];
}

// ─── ANIMATION CALCULATOR ─────────────────────────────────────────────────────
export interface AnimationState {
  breatheScaleY: number;    // 0.998–1.002 range
  weightShiftX: number;     // -1.5 to 1.5 px
  armSwayLeft: number;      // rotation degrees, -2 to 2
  armSwayRight: number;     // rotation degrees, -2 to 2 (opposite phase)
  blinkProgress: number;    // 0 = open, 1 = closed
  hairSwayX: number;        // -1 to 1 px
}

export function calculateAnimations(frame: number, animate: boolean): AnimationState {
  if (!animate) {
    return {
      breatheScaleY: 1,
      weightShiftX: 0,
      armSwayLeft: 0,
      armSwayRight: 0,
      blinkProgress: 0,
      hairSwayX: 0,
    };
  }

  // Breathing: very subtle torso scale, slow cycle (~2.1s period)
  const breatheScaleY = 1 + Math.sin(frame * 0.05) * 0.002;

  // Weight shift: gentle side-to-side, slower than breathing (~3.5s period)
  const weightShiftX = Math.sin(frame * 0.03) * 1.5;

  // Arm sway: opposite phase for natural look (~2.8s period)
  const armSwayLeft = Math.sin(frame * 0.037) * 2;
  const armSwayRight = Math.sin(frame * 0.037 + Math.PI) * 2;

  // Blink: rapid close/open every ~90 frames (3 seconds)
  const blinkCycle = frame % 90;
  let blinkProgress = 0;
  if (blinkCycle >= 0 && blinkCycle < 2) {
    blinkProgress = blinkCycle / 2;           // closing: 0 → 1
  } else if (blinkCycle >= 2 && blinkCycle < 4) {
    blinkProgress = 1 - (blinkCycle - 2) / 2; // opening: 1 → 0
  }

  // Hair sway: follows weight shift with slight delay and damping
  const hairSwayX = Math.sin(frame * 0.03 - 0.3) * 1;

  return { breatheScaleY, weightShiftX, armSwayLeft, armSwayRight, blinkProgress, hairSwayX };
}

// ─── SKIN COLOR PALETTE ───────────────────────────────────────────────────────
export const SKIN = {
  base: '#E8A882',
  shadow: '#C4876A',
  highlight: '#F0B898',
  blush: '#E09888',
};

// ─── FACE RENDERER ────────────────────────────────────────────────────────────
/**
 * Renders a detailed, 3D-styled face with realistic features.
 * Head center is at (100, 55) in the 200×420 viewBox.
 *
 * @param blinkProgress 0 = eyes fully open, 1 = eyes fully closed
 */
export function renderFace(blinkProgress: number): React.ReactElement {
  const eyeY = 53;
  const leftEyeX = 86;
  const rightEyeX = 114;
  const eyeRadiusX = 6.5;
  const eyeRadiusY = 4.5;

  const eyeOpenness = 1 - blinkProgress;
  const currentEyeRadiusY = Math.max(0.5, eyeRadiusY * eyeOpenness);

  const irisRadius = 3.2;
  const pupilRadius = 1.6;

  return (
    <g>
      {/* ── Eyebrows — defined, slightly arched, auburn-tinted ── */}
      <path
        d={`M ${leftEyeX - 9} ${eyeY - 10} Q ${leftEyeX - 3} ${eyeY - 15}, ${leftEyeX + 7} ${eyeY - 10}`}
        stroke="#4A1515"
        strokeWidth={2}
        strokeLinecap="round"
        fill="none"
      />
      <path
        d={`M ${leftEyeX - 8} ${eyeY - 10} Q ${leftEyeX - 2} ${eyeY - 14}, ${leftEyeX + 6} ${eyeY - 10}`}
        stroke="#6B2020"
        strokeWidth={0.8}
        strokeLinecap="round"
        fill="none"
        opacity={0.4}
      />
      <path
        d={`M ${rightEyeX - 7} ${eyeY - 10} Q ${rightEyeX + 3} ${eyeY - 15}, ${rightEyeX + 9} ${eyeY - 10}`}
        stroke="#4A1515"
        strokeWidth={2}
        strokeLinecap="round"
        fill="none"
      />
      <path
        d={`M ${rightEyeX - 6} ${eyeY - 10} Q ${rightEyeX + 2} ${eyeY - 14}, ${rightEyeX + 8} ${eyeY - 10}`}
        stroke="#6B2020"
        strokeWidth={0.8}
        strokeLinecap="round"
        fill="none"
        opacity={0.4}
      />

      {/* ── Left Eye ── */}
      {/* Upper eyelid line */}
      <path
        d={`M ${leftEyeX - eyeRadiusX} ${eyeY} Q ${leftEyeX} ${eyeY - currentEyeRadiusY - 1.5}, ${leftEyeX + eyeRadiusX} ${eyeY}`}
        stroke="#3D2020"
        strokeWidth={0.8}
        fill="none"
      />
      {/* Sclera — almond shape */}
      <ellipse
        cx={leftEyeX}
        cy={eyeY}
        rx={eyeRadiusX}
        ry={currentEyeRadiusY}
        fill="white"
        stroke={SKIN.shadow}
        strokeWidth={0.3}
      />
      {eyeOpenness > 0.2 && (
        <>
          {/* Iris — warm brown */}
          <circle
            cx={leftEyeX}
            cy={eyeY}
            r={Math.min(irisRadius, currentEyeRadiusY - 0.5)}
            fill="#5C3317"
          />
          {/* Iris inner ring */}
          <circle
            cx={leftEyeX}
            cy={eyeY}
            r={Math.min(irisRadius * 0.65, currentEyeRadiusY - 0.8)}
            fill="#7A4422"
            opacity={0.6}
          />
          {/* Pupil */}
          <circle
            cx={leftEyeX}
            cy={eyeY}
            r={Math.min(pupilRadius, currentEyeRadiusY - 1)}
            fill="#1A1A1A"
          />
          {/* Highlight */}
          <circle
            cx={leftEyeX - 1}
            cy={eyeY - 1}
            r={0.9}
            fill="white"
            opacity={0.9}
          />
          {/* Eyelashes — 3 short lines on upper lid */}
          <line x1={leftEyeX - 5} y1={eyeY - currentEyeRadiusY + 0.5} x2={leftEyeX - 6} y2={eyeY - currentEyeRadiusY - 1.5} stroke="#2D1010" strokeWidth={0.6} strokeLinecap="round" />
          <line x1={leftEyeX - 2} y1={eyeY - currentEyeRadiusY} x2={leftEyeX - 2.5} y2={eyeY - currentEyeRadiusY - 2} stroke="#2D1010" strokeWidth={0.6} strokeLinecap="round" />
          <line x1={leftEyeX + 1} y1={eyeY - currentEyeRadiusY + 0.3} x2={leftEyeX + 0.5} y2={eyeY - currentEyeRadiusY - 1.5} stroke="#2D1010" strokeWidth={0.6} strokeLinecap="round" />
        </>
      )}

      {/* ── Right Eye ── */}
      <path
        d={`M ${rightEyeX - eyeRadiusX} ${eyeY} Q ${rightEyeX} ${eyeY - currentEyeRadiusY - 1.5}, ${rightEyeX + eyeRadiusX} ${eyeY}`}
        stroke="#3D2020"
        strokeWidth={0.8}
        fill="none"
      />
      <ellipse
        cx={rightEyeX}
        cy={eyeY}
        rx={eyeRadiusX}
        ry={currentEyeRadiusY}
        fill="white"
        stroke={SKIN.shadow}
        strokeWidth={0.3}
      />
      {eyeOpenness > 0.2 && (
        <>
          <circle
            cx={rightEyeX}
            cy={eyeY}
            r={Math.min(irisRadius, currentEyeRadiusY - 0.5)}
            fill="#5C3317"
          />
          <circle
            cx={rightEyeX}
            cy={eyeY}
            r={Math.min(irisRadius * 0.65, currentEyeRadiusY - 0.8)}
            fill="#7A4422"
            opacity={0.6}
          />
          <circle
            cx={rightEyeX}
            cy={eyeY}
            r={Math.min(pupilRadius, currentEyeRadiusY - 1)}
            fill="#1A1A1A"
          />
          <circle
            cx={rightEyeX + 1}
            cy={eyeY - 1}
            r={0.9}
            fill="white"
            opacity={0.9}
          />
          <line x1={rightEyeX - 1} y1={eyeY - currentEyeRadiusY + 0.3} x2={rightEyeX - 0.5} y2={eyeY - currentEyeRadiusY - 1.5} stroke="#2D1010" strokeWidth={0.6} strokeLinecap="round" />
          <line x1={rightEyeX + 2} y1={eyeY - currentEyeRadiusY} x2={rightEyeX + 2.5} y2={eyeY - currentEyeRadiusY - 2} stroke="#2D1010" strokeWidth={0.6} strokeLinecap="round" />
          <line x1={rightEyeX + 5} y1={eyeY - currentEyeRadiusY + 0.5} x2={rightEyeX + 6} y2={eyeY - currentEyeRadiusY - 1.5} stroke="#2D1010" strokeWidth={0.6} strokeLinecap="round" />
        </>
      )}

      {/* ── Nose — defined bridge with highlight and rounded tip ── */}
      {/* Bridge shadow */}
      <path
        d="M 99 44 Q 98.5 50, 97 56 Q 96 60, 95 63"
        stroke={SKIN.shadow}
        strokeWidth={0.8}
        fill="none"
        opacity={0.35}
      />
      {/* Bridge highlight */}
      <path
        d="M 100.5 44 Q 101 50, 100.5 56"
        stroke={SKIN.highlight}
        strokeWidth={0.8}
        fill="none"
        opacity={0.5}
      />
      {/* Nose tip — small rounded shape */}
      <path
        d="M 96 64 Q 95 67, 97 68.5 Q 100 70, 103 68.5 Q 105 67, 104 64"
        fill={SKIN.shadow}
        opacity={0.3}
      />
      {/* Nostril hints */}
      <circle cx={97} cy={67} r={1.2} fill={SKIN.shadow} opacity={0.25} />
      <circle cx={103} cy={67} r={1.2} fill={SKIN.shadow} opacity={0.25} />

      {/* ── Mouth — friendly confident smile with cupid's bow ── */}
      {/* Upper lip with cupid's bow */}
      <path
        d="M 92 74 Q 95 73, 97.5 74 Q 99 72.5, 100 72.5 Q 101 72.5, 102.5 74 Q 105 73, 108 74"
        fill="#D4736A"
        stroke="#C0605A"
        strokeWidth={0.3}
      />
      {/* Lower lip — fuller */}
      <path
        d="M 92 74 Q 96 75, 100 79 Q 104 75, 108 74"
        fill="#E08878"
        stroke="#C0605A"
        strokeWidth={0.3}
      />
      {/* Lip highlight */}
      <path
        d="M 97 76 Q 100 77.5, 103 76"
        stroke="white"
        strokeWidth={0.4}
        fill="none"
        opacity={0.2}
      />

      {/* ── Blush — very subtle on cheekbones ── */}
      <ellipse cx={77} cy={62} rx={7} ry={4} fill={SKIN.blush} opacity={0.15} />
      <ellipse cx={123} cy={62} rx={7} ry={4} fill={SKIN.blush} opacity={0.15} />

      {/* ── Chin definition ── */}
      <path
        d="M 92 85 Q 100 92, 108 85"
        stroke={SKIN.shadow}
        strokeWidth={0.6}
        fill="none"
        opacity={0.2}
      />
    </g>
  );
}

// ─── HAIR COLOR PALETTE ───────────────────────────────────────────────────────
export const HAIR = {
  base: '#7A3520',
  highlight: '#9E5038',
  shadow: '#4A1808',
};

// ─── HAIR RENDERER ────────────────────────────────────────────────────────────
/**
 * Renders voluminous auburn waves as an SVG <g> group.
 * Head center at (100, 55), head radii ~38×42 in the 200×420 viewBox.
 *
 * @param layer 'back' or 'front'
 * @param hairSwayX translation offset for flowing strands, range [-1, 1]
 */
export function renderHair(layer: 'back' | 'front', hairSwayX: number): React.ReactElement {
  if (layer === 'back') {
    return (
      <g>
        {/* Main hair volume — large, voluminous mass behind head */}
        <path
          d={`
            M 54 35
            Q 50 10, 100 5
            Q 150 10, 146 35
            Q 150 55, 148 75
            Q 146 95, 144 110
            L 144 130
            Q 142 145, 138 155
            L 62 155
            Q 58 145, 56 130
            L 56 110
            Q 54 95, 52 75
            Q 50 55, 54 35
            Z
          `}
          fill={HAIR.base}
        />
        {/* Deep shadow layer — left side */}
        <path
          d={`
            M 54 35
            Q 50 10, 72 8
            L 62 45
            Q 56 65, 54 90
            L 54 120
            Q 55 140, 58 150
            L 62 155
            Q 58 145, 56 130
            L 56 110
            Q 54 80, 54 35
            Z
          `}
          fill={HAIR.shadow}
          opacity={0.7}
        />
        {/* Deep shadow layer — right side */}
        <path
          d={`
            M 146 35
            Q 150 10, 128 8
            L 138 45
            Q 144 65, 146 90
            L 146 120
            Q 145 140, 142 150
            L 138 155
            Q 142 145, 144 130
            L 144 110
            Q 146 80, 146 35
            Z
          `}
          fill={HAIR.shadow}
          opacity={0.7}
        />
        {/* Mid-tone wave layer — left */}
        <path
          d={`
            M 58 50
            Q 55 70, 56 95
            Q 57 115, 60 135
            Q 62 145, 65 150
            L 70 148
            Q 66 135, 64 115
            Q 62 95, 62 70
            Q 62 55, 58 50
            Z
          `}
          fill={HAIR.base}
          opacity={0.8}
        />
        {/* Mid-tone wave layer — right */}
        <path
          d={`
            M 142 50
            Q 145 70, 144 95
            Q 143 115, 140 135
            Q 138 145, 135 150
            L 130 148
            Q 134 135, 136 115
            Q 138 95, 138 70
            Q 138 55, 142 50
            Z
          `}
          fill={HAIR.base}
          opacity={0.8}
        />
        {/* Top highlight — crown area */}
        <path
          d={`
            M 78 10
            Q 100 3, 122 10
            Q 118 22, 108 30
            Q 100 18, 92 30
            Q 82 22, 78 10
            Z
          `}
          fill={HAIR.highlight}
          opacity={0.5}
        />
        {/* Secondary highlight streak — left */}
        <path
          d={`
            M 68 25
            Q 72 40, 70 60
            Q 68 75, 66 85
            L 63 82
            Q 65 70, 66 55
            Q 67 38, 68 25
            Z
          `}
          fill={HAIR.highlight}
          opacity={0.3}
        />

        {/* Flowing strands past shoulders — animated with hairSwayX */}
        <g transform={`translate(${hairSwayX}, 0)`}>
          {/* Left flowing strand — main */}
          <path
            d={`
              M 58 130
              Q 52 145, 48 160
              Q 45 172, 48 178
              Q 50 168, 54 155
              Q 56 145, 60 135
              Z
            `}
            fill={HAIR.base}
          />
          {/* Left flowing strand — outer */}
          <path
            d={`
              M 55 125
              Q 48 140, 44 158
              Q 41 170, 43 175
              Q 46 162, 50 148
              L 55 132
              Z
            `}
            fill={HAIR.shadow}
            opacity={0.6}
          />
          {/* Left flowing strand — inner wisp */}
          <path
            d={`
              M 64 140
              Q 60 152, 57 165
              Q 55 172, 57 175
              Q 59 168, 62 155
              Z
            `}
            fill={HAIR.highlight}
            opacity={0.35}
          />
          {/* Right flowing strand — main */}
          <path
            d={`
              M 142 130
              Q 148 145, 152 160
              Q 155 172, 152 178
              Q 150 168, 146 155
              Q 144 145, 140 135
              Z
            `}
            fill={HAIR.base}
          />
          {/* Right flowing strand — outer */}
          <path
            d={`
              M 145 125
              Q 152 140, 156 158
              Q 159 170, 157 175
              Q 154 162, 150 148
              L 145 132
              Z
            `}
            fill={HAIR.shadow}
            opacity={0.6}
          />
          {/* Right flowing strand — inner wisp */}
          <path
            d={`
              M 136 140
              Q 140 152, 143 165
              Q 145 172, 143 175
              Q 141 168, 138 155
              Z
            `}
            fill={HAIR.highlight}
            opacity={0.35}
          />
          {/* Center-left wave strand */}
          <path
            d={`
              M 70 148
              Q 65 158, 62 168
              Q 60 174, 62 177
              Q 64 170, 67 160
              Z
            `}
            fill={HAIR.base}
            opacity={0.7}
          />
          {/* Center-right wave strand */}
          <path
            d={`
              M 130 148
              Q 135 158, 138 168
              Q 140 174, 138 177
              Q 136 170, 133 160
              Z
            `}
            fill={HAIR.base}
            opacity={0.7}
          />
        </g>
      </g>
    );
  }

  // layer === 'front': side-swept bangs with volume
  return (
    <g>
      {/* Main bangs — side-swept from left, more volume */}
      <path
        d={`
          M 62 28
          Q 68 14, 88 16
          Q 100 18, 105 25
          Q 98 32, 88 36
          Q 76 34, 62 28
          Z
        `}
        fill={HAIR.base}
      />
      {/* Bangs continuation — right side */}
      <path
        d={`
          M 105 25
          Q 115 17, 130 20
          Q 140 24, 142 30
          Q 135 34, 125 35
          Q 115 33, 105 25
          Z
        `}
        fill={HAIR.base}
      />
      {/* Volume on top — puff */}
      <path
        d={`
          M 70 18
          Q 80 10, 95 12
          Q 105 14, 110 20
          Q 100 26, 88 28
          Q 78 25, 70 18
          Z
        `}
        fill={HAIR.base}
      />
      {/* Highlight streak on bangs */}
      <path
        d={`
          M 74 20
          Q 85 15, 96 20
          Q 90 27, 80 28
          Z
        `}
        fill={HAIR.highlight}
        opacity={0.45}
      />
      {/* Secondary highlight streak */}
      <path
        d={`
          M 108 22
          Q 118 18, 126 23
          Q 120 28, 112 28
          Z
        `}
        fill={HAIR.highlight}
        opacity={0.3}
      />
      {/* Side fringe — left, framing face */}
      <path
        d={`
          M 60 30
          Q 55 22, 60 15
          Q 65 20, 64 30
          Q 62 40, 60 48
          Q 58 42, 60 30
          Z
        `}
        fill={HAIR.shadow}
        opacity={0.75}
      />
      {/* Side fringe — right, framing face */}
      <path
        d={`
          M 140 30
          Q 145 22, 140 15
          Q 135 20, 136 30
          Q 138 40, 140 48
          Q 142 42, 140 30
          Z
        `}
        fill={HAIR.shadow}
        opacity={0.75}
      />
      {/* Subtle strand over forehead */}
      <path
        d={`
          M 72 26
          Q 68 32, 66 38
          Q 65 34, 68 28
          Z
        `}
        fill={HAIR.base}
        opacity={0.6}
      />
    </g>
  );
}

// ─── HEAD & NECK RENDERER ─────────────────────────────────────────────────────
/**
 * Renders a softer, more 3D head shape with subtle ears and jaw definition.
 * Head center at (100, 55) with radii ~38×42 in the 200×420 viewBox.
 *
 * @returns SVG <g> group containing the neck, ears, and head
 */
export function renderHead(): React.ReactElement {
  return (
    <g>
      {/* Neck — slightly more elegant/slender trapezoid */}
      <path
        d="M 90 92 L 86 110 L 114 110 L 110 92 Z"
        fill={SKIN.base}
      />
      {/* Neck shadow — left side */}
      <path
        d="M 90 92 L 86 110 L 91 110 L 94 92 Z"
        fill={SKIN.shadow}
        opacity={0.45}
      />
      {/* Neck shadow — right side */}
      <path
        d="M 110 92 L 114 110 L 109 110 L 106 92 Z"
        fill={SKIN.shadow}
        opacity={0.45}
      />
      {/* Neck center highlight */}
      <path
        d="M 96 94 L 95 108 L 105 108 L 104 94 Z"
        fill={SKIN.highlight}
        opacity={0.2}
      />
      {/* Under-chin shadow */}
      <ellipse cx={100} cy={93} rx={14} ry={3} fill={SKIN.shadow} opacity={0.3} />

      {/* Ears — small curved shapes on sides */}
      {/* Left ear */}
      <path
        d="M 63 48 Q 58 52, 58 58 Q 58 64, 63 66 Q 62 60, 63 54 Z"
        fill={SKIN.base}
      />
      <path
        d="M 63 50 Q 60 54, 60 58 Q 60 62, 63 64"
        stroke={SKIN.shadow}
        strokeWidth={0.8}
        fill="none"
        opacity={0.4}
      />
      {/* Right ear */}
      <path
        d="M 137 48 Q 142 52, 142 58 Q 142 64, 137 66 Q 138 60, 137 54 Z"
        fill={SKIN.base}
      />
      <path
        d="M 137 50 Q 140 54, 140 58 Q 140 62, 137 64"
        stroke={SKIN.shadow}
        strokeWidth={0.8}
        fill="none"
        opacity={0.4}
      />

      {/* Head ellipse — Sims 4 proportions with 3D shading */}
      <ellipse
        cx={100}
        cy={55}
        rx={38}
        ry={42}
        fill="url(#skinRadialGradient)"
      />
      {/* Forehead highlight */}
      <ellipse
        cx={100}
        cy={38}
        rx={22}
        ry={12}
        fill={SKIN.highlight}
        opacity={0.25}
      />
      {/* Cheek shadow — left */}
      <ellipse
        cx={72}
        cy={65}
        rx={10}
        ry={14}
        fill={SKIN.shadow}
        opacity={0.12}
      />
      {/* Cheek shadow — right */}
      <ellipse
        cx={128}
        cy={65}
        rx={10}
        ry={14}
        fill={SKIN.shadow}
        opacity={0.12}
      />
      {/* Jaw definition — subtle shadow along jawline */}
      <path
        d="M 68 75 Q 80 90, 100 94 Q 120 90, 132 75"
        stroke={SKIN.shadow}
        strokeWidth={0.8}
        fill="none"
        opacity={0.15}
      />
    </g>
  );
}

// ─── BODY RENDERER ────────────────────────────────────────────────────────────
/**
 * Renders the torso with a tailored oversized blazer or shirt.
 * Proportions (200×420 viewBox):
 *   Shoulders at ~Y110, shoulder width ~120 (slightly narrower, dropped shoulder)
 *   Waist at ~Y200, waist width ~80 (more defined)
 *   Hips at ~Y240, hip width ~100 (blazer extends to mid-hip)
 *
 * @param outfitConfig  Complete outfit configuration
 * @param shirtText     Text to render on chest when showShirtText is true
 * @param breatheScaleY Breathing animation scale (0.998–1.002)
 */
export function renderBody(
  outfitConfig: OutfitConfig,
  shirtText: string,
  breatheScaleY: number,
): React.ReactElement {
  const { blazerColor, shirtColor, tieColor, accentColor, showShirtText, collarStyle } = outfitConfig;

  const centerX = 100;
  const torsoMidY = 175;

  // Proportions (200×420 viewBox):
  //   Shoulders at ~Y110, shoulder width ~116 (X=42..158) — aligns with arm attachment
  //   Waist at ~Y200, waist width ~76 (X=62..138) — tapered inward
  //   Hips at ~Y240, hip width ~88 (X=56..144) — slight flare
  const torsoPath =
    'M 42 110 C 40 130, 50 165, 62 200 Q 58 218, 56 240 L 144 240 Q 142 218, 138 200 C 150 165, 160 130, 158 110 Z';

  // Slimmer non-blazer torso (proportional to blazer)
  const shirtTorsoPath =
    'M 44 110 C 42 135, 52 175, 64 210 Q 60 220, 58 230 L 142 230 Q 140 220, 136 210 C 148 175, 158 135, 156 110 Z';

  // Wider V-opening for blazer lapels
  const shirtVPath = 'M 86 110 L 100 175 L 114 110 Z';

  // Wider, more prominent lapels (adjusted outward to match wider torso)
  const leftLapelPath = 'M 86 110 L 62 150 L 82 165 L 100 138 Z';
  const rightLapelPath = 'M 114 110 L 138 150 L 118 165 L 100 138 Z';

  // Subtle fabric fold lines
  const foldLines = [
    'M 48 135 Q 52 155, 50 180',
    'M 152 135 Q 148 155, 150 180',
    'M 95 190 Q 100 210, 105 230',
  ];

  // Crew neck collar path
  const crewCollarPath = 'M 86 110 Q 100 118, 114 110';

  // V-neck collar path
  const vNeckCollarPath = 'M 86 110 L 100 132 L 114 110';

  // Tie shape
  const tiePath = 'M 97 135 L 100 130 L 103 135 L 101 190 L 100 193 L 99 190 Z';

  return (
    <g transform={`translate(0, ${torsoMidY * (1 - breatheScaleY)}) scale(1, ${breatheScaleY})`}
       style={{ transformOrigin: `${centerX}px ${torsoMidY}px` }}>

      {blazerColor !== null ? (
        <>
          {/* Shirt visible at V-opening */}
          <path d={shirtVPath} fill={shirtColor} />

          {/* Blazer outer shape */}
          <path d={torsoPath} fill="url(#blazerFabricGradient)" />
          {/* Blazer base color fallback layer */}
          <path d={torsoPath} fill={blazerColor} opacity={0.85} />

          {/* Shoulder definition — dropped shoulder seam lines */}
          <path d="M 42 112 Q 62 108, 86 110" stroke={accentColor} strokeWidth={0.4} fill="none" opacity={0.3} />
          <path d="M 158 112 Q 138 108, 114 110" stroke={accentColor} strokeWidth={0.4} fill="none" opacity={0.3} />

          {/* Cut out V-opening to reveal shirt */}
          <path d={shirtVPath} fill={shirtColor} />

          {/* Lapels — wider, more prominent */}
          <path d={leftLapelPath} fill={blazerColor} stroke={accentColor} strokeWidth={0.5} opacity={0.92} />
          <path d={rightLapelPath} fill={blazerColor} stroke={accentColor} strokeWidth={0.5} opacity={0.92} />

          {/* Lapel inner edge highlight */}
          <path d="M 86 110 L 100 138" stroke={accentColor} strokeWidth={0.9} fill="none" opacity={0.5} />
          <path d="M 114 110 L 100 138" stroke={accentColor} strokeWidth={0.9} fill="none" opacity={0.5} />

          {/* Lapel shading — subtle 3D fold */}
          <path d="M 65 125 Q 72 140, 84 155" stroke="rgba(0,0,0,0.15)" strokeWidth={1.5} fill="none" />
          <path d="M 135 125 Q 128 140, 116 155" stroke="rgba(0,0,0,0.15)" strokeWidth={1.5} fill="none" />

          {/* Tie (if present) */}
          {tieColor !== null && (
            <path d={tiePath} fill={tieColor} />
          )}

          {/* Fabric fold lines */}
          {foldLines.map((d, i) => (
            <path
              key={`fold-${i}`}
              d={d}
              stroke="rgba(0,0,0,0.12)"
              strokeWidth={0.8}
              fill="none"
            />
          ))}

          {/* Single button at waist */}
          <circle cx={100} cy={200} r={2.8} fill={accentColor} opacity={0.7} />
          <circle cx={100} cy={200} r={1.5} fill={accentColor} opacity={0.4} />

          {/* Paspel pocket details at hip level */}
          <line x1={62} y1={218} x2={80} y2={218} stroke="rgba(0,0,0,0.15)" strokeWidth={0.8} />
          <line x1={120} y1={218} x2={138} y2={218} stroke="rgba(0,0,0,0.15)" strokeWidth={0.8} />

          {/* Blazer hem shadow */}
          <path d="M 56 238 Q 100 244, 144 238" stroke="rgba(0,0,0,0.1)" strokeWidth={1} fill="none" />
        </>
      ) : (
        <>
          {/* Shirt (no blazer) — slimmer torso */}
          <path d={shirtTorsoPath} fill={shirtColor} />

          {/* Collar based on style */}
          {collarStyle === 'crew' && (
            <path d={crewCollarPath} stroke={shirtColor} strokeWidth={3} fill="none" />
          )}
          {collarStyle === 'crew' && (
            <path d={crewCollarPath} stroke={SKIN.base} strokeWidth={1.5} fill="none" opacity={0.5} />
          )}
          {collarStyle === 'v-neck' && (
            <>
              <path d={vNeckCollarPath} fill={SKIN.base} />
              <path d={vNeckCollarPath} stroke={shirtColor} strokeWidth={1} fill="none" opacity={0.6} />
            </>
          )}

          {/* Fold lines on shirt */}
          {foldLines.map((d, i) => (
            <path
              key={`fold-${i}`}
              d={d}
              stroke="#000000"
              strokeWidth={0.6}
              fill="none"
              opacity={0.1}
            />
          ))}
        </>
      )}

      {/* Shirt text (centered on chest) */}
      {showShirtText && (
        <text
          x={100}
          y={170}
          textAnchor="middle"
          dominantBaseline="central"
          fill="white"
          fontSize={11}
          fontFamily="Arial, sans-serif"
          fontWeight="bold"
          opacity={0.9}
        >
          {shirtText}
        </text>
      )}
    </g>
  );
}

// ─── LEGS RENDERER ────────────────────────────────────────────────────────────
/**
 * Renders slim straight pants and metallic silver boots.
 *
 * @param outfitConfig Contains pantsColor and bootColor
 * @param weightShiftX Hip-level translateX for weight shift animation (-1.5 to 1.5)
 */
export function renderLegs(
  outfitConfig: OutfitConfig,
  weightShiftX: number,
): React.ReactElement {
  const { pantsColor, bootColor } = outfitConfig;

  // Darker shade for boot sole
  const soleDarken = (hex: string): string => {
    const r = Math.max(0, parseInt(hex.slice(1, 3), 16) - 40);
    const g = Math.max(0, parseInt(hex.slice(3, 5), 16) - 40);
    const b = Math.max(0, parseInt(hex.slice(5, 7), 16) - 40);
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  };

  const soleColor = soleDarken(bootColor);

  // Lighter shade for boot upper highlight
  const upperHighlight = (hex: string): string => {
    const r = Math.min(255, parseInt(hex.slice(1, 3), 16) + 30);
    const g = Math.min(255, parseInt(hex.slice(3, 5), 16) + 30);
    const b = Math.min(255, parseInt(hex.slice(5, 7), 16) + 30);
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  };

  const bootHighlight = upperHighlight(bootColor);

  // Even lighter for metallic streaks
  const metallicHighlight = (hex: string): string => {
    const r = Math.min(255, parseInt(hex.slice(1, 3), 16) + 70);
    const g = Math.min(255, parseInt(hex.slice(3, 5), 16) + 70);
    const b = Math.min(255, parseInt(hex.slice(5, 7), 16) + 70);
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  };

  const metalShine = metallicHighlight(bootColor);

  return (
    <g transform={`translate(${weightShiftX}, 0)`}>
      {/* ── Left leg: wide hip tapering to narrower thigh ── */}
      <path
        d="M 60 235 C 62 260, 64 285, 68 310 C 70 340, 70 360, 70 380 L 90 380 C 90 360, 89 340, 87 310 C 85 285, 88 260, 92 235 Z"
        fill={pantsColor}
      />
      {/* Left knee highlight */}
      <ellipse cx={79} cy={310} rx={10} ry={5} fill="white" opacity={0.05} />
      {/* Left leg seam */}
      <path
        d="M 74 242 Q 76 290, 78 372"
        stroke={pantsColor}
        strokeWidth={0.5}
        fill="none"
        opacity={0.3}
        style={{ mixBlendMode: 'multiply' }}
      />
      {/* Left inner seam */}
      <path
        d="M 91 240 Q 91 290, 91 372"
        stroke="rgba(0,0,0,0.06)"
        strokeWidth={0.4}
        fill="none"
      />

      {/* ── Right leg: wide hip tapering to narrower thigh ── */}
      <path
        d="M 108 235 C 112 260, 115 285, 113 310 C 111 340, 110 360, 110 380 L 130 380 C 130 360, 131 340, 133 310 C 135 285, 138 260, 140 235 Z"
        fill={pantsColor}
      />
      {/* Right knee highlight */}
      <ellipse cx={121} cy={310} rx={10} ry={5} fill="white" opacity={0.05} />
      {/* Right leg seam */}
      <path
        d="M 126 242 Q 124 290, 122 372"
        stroke={pantsColor}
        strokeWidth={0.5}
        fill="none"
        opacity={0.3}
        style={{ mixBlendMode: 'multiply' }}
      />
      {/* Right inner seam */}
      <path
        d="M 109 240 Q 109 290, 109 372"
        stroke="rgba(0,0,0,0.06)"
        strokeWidth={0.4}
        fill="none"
      />

      {/* ── Left boot — metallic silver look ── */}
      {/* Boot upper — flares from leg bottom outward */}
      <path
        d="M 66 374 C 62 378, 58 386, 56 395 L 94 395 C 94 388, 92 380, 90 374 Z"
        fill={bootColor}
      />
      {/* Metallic highlight streak — brushed metal effect */}
      <path
        d="M 62 378 C 60 383, 58 388, 57 393 L 62 393 C 62 388, 63 383, 64 378 Z"
        fill={metalShine}
        opacity={0.3}
      />
      <path
        d="M 74 376 L 74 392 L 77 392 L 77 376 Z"
        fill={bootHighlight}
        opacity={0.15}
      />
      {/* Boot stitching line */}
      <path
        d="M 58 386 Q 75 383, 92 386"
        stroke={bootHighlight}
        strokeWidth={0.5}
        fill="none"
        opacity={0.4}
        strokeDasharray="2,1.5"
      />
      {/* Boot heel definition */}
      <rect x={54} y={393} width={8} height={7} rx={1} fill={soleColor} opacity={0.8} />
      {/* Boot sole */}
      <rect x={54} y={395} width={42} height={5} rx={2.5} fill={soleColor} />
      {/* Sole edge highlight */}
      <line x1={56} y1={395} x2={94} y2={395} stroke={bootHighlight} strokeWidth={0.4} opacity={0.3} />

      {/* ── Right boot — metallic silver look ── */}
      <path
        d="M 110 374 C 108 380, 108 388, 106 395 L 144 395 C 140 386, 138 378, 134 374 Z"
        fill={bootColor}
      />
      {/* Metallic highlight streak */}
      <path
        d="M 138 378 C 140 383, 141 388, 143 393 L 138 393 C 138 388, 137 383, 136 378 Z"
        fill={metalShine}
        opacity={0.3}
      />
      <path
        d="M 124 376 L 124 392 L 127 392 L 127 376 Z"
        fill={bootHighlight}
        opacity={0.15}
      />
      {/* Boot stitching line */}
      <path
        d="M 108 386 Q 125 383, 142 386"
        stroke={bootHighlight}
        strokeWidth={0.5}
        fill="none"
        opacity={0.4}
        strokeDasharray="2,1.5"
      />
      {/* Boot heel definition */}
      <rect x={138} y={393} width={8} height={7} rx={1} fill={soleColor} opacity={0.8} />
      {/* Boot sole */}
      <rect x={104} y={395} width={42} height={5} rx={2.5} fill={soleColor} />
      {/* Sole edge highlight */}
      <line x1={106} y1={395} x2={144} y2={395} stroke={bootHighlight} strokeWidth={0.4} opacity={0.3} />
    </g>
  );
}

// ─── ARMS RENDERER ────────────────────────────────────────────────────────────
/**
 * Renders more defined arms with visible sleeve cuffs.
 *
 * @param outfitConfig  Resolved outfit configuration
 * @param armSwayLeft   Rotation degrees for left arm (-2 to 2)
 * @param armSwayRight  Rotation degrees for right arm (-2 to 2)
 */
export function renderArms(
  outfitConfig: OutfitConfig,
  armSwayLeft: number,
  armSwayRight: number,
): React.ReactElement {
  const sleeveColor = outfitConfig.blazerColor ?? outfitConfig.shirtColor;
  const hasBlazer = outfitConfig.blazerColor !== null;

  return (
    <g>
      {/* ── Left arm: shoulder (42,115) → wrist (32,252) ── */}
      <g transform={`rotate(${armSwayLeft}, 42, 115)`}>
        {/* Main arm shape — more organic curve, slightly slimmer */}
        <path
          d="M 42 115 C 36 142, 30 182, 28 218 C 27 232, 30 246, 32 252"
          stroke={sleeveColor}
          strokeWidth={14}
          fill="none"
          strokeLinecap="round"
        />
        {/* Arm shadow — inner edge */}
        <path
          d="M 46 120 C 41 148, 36 185, 34 220"
          stroke="rgba(0,0,0,0.1)"
          strokeWidth={3}
          fill="none"
          strokeLinecap="round"
        />
        {/* Sleeve cuff — blazer sleeve slightly shorter showing shirt cuff */}
        {hasBlazer && (
          <>
            <path
              d="M 29 242 C 28 246, 30 250, 32 252"
              stroke={outfitConfig.shirtColor}
              strokeWidth={15}
              fill="none"
              strokeLinecap="round"
              opacity={0.9}
            />
            <path
              d="M 29 240 C 28 243, 29 246, 31 248"
              stroke={sleeveColor}
              strokeWidth={15}
              fill="none"
              strokeLinecap="round"
              opacity={0.85}
            />
          </>
        )}
        {!hasBlazer && (
          <path
            d="M 29 240 C 28 245, 30 250, 32 252"
            stroke={sleeveColor}
            strokeWidth={15}
            fill="none"
            strokeLinecap="round"
            opacity={0.85}
          />
        )}
      </g>

      {/* ── Right arm: shoulder (158,115) → wrist (168,252) ── */}
      <g transform={`rotate(${armSwayRight}, 158, 115)`}>
        <path
          d="M 158 115 C 164 142, 170 182, 172 218 C 173 232, 170 246, 168 252"
          stroke={sleeveColor}
          strokeWidth={14}
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M 154 120 C 159 148, 164 185, 166 220"
          stroke="rgba(0,0,0,0.1)"
          strokeWidth={3}
          fill="none"
          strokeLinecap="round"
        />
        {hasBlazer && (
          <>
            <path
              d="M 171 242 C 172 246, 170 250, 168 252"
              stroke={outfitConfig.shirtColor}
              strokeWidth={15}
              fill="none"
              strokeLinecap="round"
              opacity={0.9}
            />
            <path
              d="M 171 240 C 172 243, 171 246, 169 248"
              stroke={sleeveColor}
              strokeWidth={15}
              fill="none"
              strokeLinecap="round"
              opacity={0.85}
            />
          </>
        )}
        {!hasBlazer && (
          <path
            d="M 171 240 C 172 245, 170 250, 168 252"
            stroke={sleeveColor}
            strokeWidth={15}
            fill="none"
            strokeLinecap="round"
            opacity={0.85}
          />
        )}
      </g>
    </g>
  );
}

// ─── HANDS RENDERER ───────────────────────────────────────────────────────────
/**
 * Renders slightly more defined, relaxed hands at wrist positions.
 *
 * @param armSwayLeft   Rotation degrees for left arm (-2 to 2)
 * @param armSwayRight  Rotation degrees for right arm (-2 to 2)
 */
export function renderHands(
  armSwayLeft: number,
  armSwayRight: number,
): React.ReactElement {
  return (
    <g>
      {/* ── Left hand — relaxed, slightly more defined ── */}
      <g transform={`rotate(${armSwayLeft}, 42, 115)`}>
        {/* Palm */}
        <path
          d="M 26 253 Q 23 257, 24 263 Q 26 268, 32 268 Q 37 267, 38 262 Q 38 257, 34 253 Z"
          fill={SKIN.base}
        />
        {/* Thumb hint */}
        <path
          d="M 36 258 Q 38 256, 39 258 Q 39 261, 37 262"
          fill={SKIN.base}
          stroke={SKIN.shadow}
          strokeWidth={0.3}
        />
        {/* Knuckle highlight */}
        <ellipse cx={30} cy={256} rx={4} ry={2.5} fill={SKIN.highlight} opacity={0.25} />
        {/* Finger separation hints */}
        <line x1={27} y1={266} x2={27} y2={268} stroke={SKIN.shadow} strokeWidth={0.3} opacity={0.3} />
        <line x1={30} y1={267} x2={30} y2={269} stroke={SKIN.shadow} strokeWidth={0.3} opacity={0.3} />
      </g>

      {/* ── Right hand — relaxed, slightly more defined ── */}
      <g transform={`rotate(${armSwayRight}, 158, 115)`}>
        <path
          d="M 166 253 Q 163 257, 164 263 Q 166 268, 172 268 Q 177 267, 178 262 Q 178 257, 174 253 Z"
          fill={SKIN.base}
        />
        <path
          d="M 164 258 Q 162 256, 161 258 Q 161 261, 163 262"
          fill={SKIN.base}
          stroke={SKIN.shadow}
          strokeWidth={0.3}
        />
        <ellipse cx={170} cy={256} rx={4} ry={2.5} fill={SKIN.highlight} opacity={0.25} />
        <line x1={169} y1={266} x2={169} y2={268} stroke={SKIN.shadow} strokeWidth={0.3} opacity={0.3} />
        <line x1={172} y1={267} x2={172} y2={269} stroke={SKIN.shadow} strokeWidth={0.3} opacity={0.3} />
      </g>
    </g>
  );
}

// ─── PLUMBOB ──────────────────────────────────────────────────────────────────
interface PlumbobProps {
  size?: number;
  color?: string;
  glowColor?: string;
  animate?: boolean;
  style?: React.CSSProperties;
}

export const Plumbob: React.FC<PlumbobProps> = ({
  size = 60,
  glowColor = SIMS_COLORS.plumbobGlow,
  animate = true,
  style,
}) => {
  const frame = useCurrentFrame();
  const PLUMBOB_ROTATION_SPEED = 1.5;
  const bobOffset = animate ? Math.sin(frame * 0.06) * 5 : 0;
  const rotation = animate ? (frame * PLUMBOB_ROTATION_SPEED) % 360 : 0;
  const glowPulse = animate ? 0.7 + Math.sin(frame * 0.08) * 0.3 : 1;
  const glowSize = animate ? 18 + Math.sin(frame * 0.1) * 8 : 18;

  const rad = (rotation * Math.PI) / 180;
  const cosR = Math.cos(rad);
  const sinR = Math.sin(rad);

  // 3D vertices of the octahedron (Y-axis vertical, negative Y = up for SVG)
  // Taller than wide — stretched Y by ~1.6
  const hw = 40; // half-width at equator
  const hh = 65; // half-height (apex to center)

  // 6 vertices: top, bottom, and 4 equator points at 90° intervals
  const vertices3D: [number, number, number][] = [
    [0, -hh, 0],    // 0: top apex
    [0, hh, 0],     // 1: bottom apex
    [hw, 0, 0],     // 2: equator right (0°)
    [0, 0, hw],     // 3: equator front (90°)
    [-hw, 0, 0],    // 4: equator left (180°)
    [0, 0, -hw],    // 5: equator back (270°)
  ];

  // Rotate around Y-axis
  const rotateY = (v: [number, number, number]): [number, number, number] => [
    v[0] * cosR + v[2] * sinR,
    v[1],
    -v[0] * sinR + v[2] * cosR,
  ];

  const rotated = vertices3D.map(rotateY);

  // Project to 2D (orthographic — drop Z, offset to SVG center)
  const cx = 50;
  const cy = 70;
  const project = (v: [number, number, number]): [number, number] => [cx + v[0], cy + v[1]];
  const projected = rotated.map(project);

  // 8 triangular faces: 4 upper (top apex + adjacent equator pairs), 4 lower
  const faces = [
    { verts: [0, 2, 3], baseColor: [82, 212, 99] },
    { verts: [0, 3, 4], baseColor: [46, 168, 61] },
    { verts: [0, 4, 5], baseColor: [31, 138, 46] },
    { verts: [0, 5, 2], baseColor: [40, 160, 56] },
    { verts: [1, 3, 2], baseColor: [71, 201, 87] },
    { verts: [1, 4, 3], baseColor: [29, 144, 48] },
    { verts: [1, 5, 4], baseColor: [22, 96, 36] },
    { verts: [1, 2, 5], baseColor: [34, 160, 53] },
  ];

  // Light direction (upper-left-front, normalized)
  const lightDir: [number, number, number] = [0.3, -0.5, 0.8];
  const lightLen = Math.sqrt(lightDir[0] ** 2 + lightDir[1] ** 2 + lightDir[2] ** 2);
  const light: [number, number, number] = [lightDir[0] / lightLen, lightDir[1] / lightLen, lightDir[2] / lightLen];

  // Compute face data: normal, visibility, depth, shading, projected points
  const faceData = faces.map((face) => {
    const [i0, i1, i2] = face.verts;
    const v0 = rotated[i0];
    const v1 = rotated[i1];
    const v2 = rotated[i2];

    // Edge vectors
    const e1: [number, number, number] = [v1[0] - v0[0], v1[1] - v0[1], v1[2] - v0[2]];
    const e2: [number, number, number] = [v2[0] - v0[0], v2[1] - v0[1], v2[2] - v0[2]];

    // Cross product = face normal
    const nx = e1[1] * e2[2] - e1[2] * e2[1];
    const ny = e1[2] * e2[0] - e1[0] * e2[2];
    const nz = e1[0] * e2[1] - e1[1] * e2[0];
    const nLen = Math.sqrt(nx * nx + ny * ny + nz * nz) || 1;
    const normal: [number, number, number] = [nx / nLen, ny / nLen, nz / nLen];

    // Backface culling: visible if normal points toward camera (positive Z)
    const visible = normal[2] > 0;

    // Average Z depth for painter's algorithm
    const avgZ = (v0[2] + v1[2] + v2[2]) / 3;

    // Diffuse shading
    const dot = normal[0] * light[0] + normal[1] * light[1] + normal[2] * light[2];
    const shade = Math.max(0.25, Math.min(1.0, 0.4 + dot * 0.6));

    const [br, bg, bb] = face.baseColor;
    const sr = Math.round(br * shade);
    const sg = Math.round(bg * shade);
    const sb = Math.round(bb * shade);

    const points = [projected[i0], projected[i1], projected[i2]];

    return { visible, avgZ, color: `rgb(${sr},${sg},${sb})`, points };
  });

  // Filter visible faces and sort by depth (furthest first — painter's algorithm)
  const visibleFaces = faceData
    .filter((f) => f.visible)
    .sort((a, b) => a.avgZ - b.avgZ);

  const svgH = size * 1.4;

  // Padding to prevent glow + bob clipping.
  // Max glow radius is 26px (18 + 8), bob is ±5px.
  const pad = Math.ceil(Math.max(26, size * 0.45));

  return (
    <div
      style={{
        position: 'relative',
        width: size + pad * 2,
        height: svgH + pad * 2,
        margin: -pad,
        padding: pad,
        transform: `translateY(${bobOffset}px)`,
        filter: `drop-shadow(0 0 ${glowSize}px ${glowColor}) drop-shadow(0 0 ${glowSize * 0.5}px ${glowColor})`,
        opacity: 0.85 + glowPulse * 0.15,
        zIndex: 50,
        ...style,
      }}
    >
      <svg
        viewBox="0 0 100 140"
        width={size}
        height={svgH}
        style={{ overflow: 'visible' }}
      >
        <defs>
          <radialGradient id={`plumbob-glow-${size}`} cx="50%" cy="40%" r="55%">
            <stop offset="0%" stopColor="#a8ffb8" stopOpacity={0.5 * glowPulse} />
            <stop offset="100%" stopColor="#22a035" stopOpacity={0} />
          </radialGradient>
          <radialGradient id={`plumbob-spec-${size}`} cx="35%" cy="25%" r="40%">
            <stop offset="0%" stopColor="white" stopOpacity={0.4} />
            <stop offset="100%" stopColor="white" stopOpacity={0} />
          </radialGradient>
        </defs>

        {/* Render visible faces back-to-front */}
        {visibleFaces.map((face, i) => (
          <polygon
            key={i}
            points={face.points.map((p) => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ')}
            fill={face.color}
            stroke="rgba(0,0,0,0.15)"
            strokeWidth="0.5"
          />
        ))}

        {/* Specular highlight overlay on frontmost face */}
        {visibleFaces.length > 0 && (
          <polygon
            points={visibleFaces[visibleFaces.length - 1].points.map((p) => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ')}
            fill={`url(#plumbob-spec-${size})`}
          />
        )}

        {/* Top apex highlight */}
        <circle cx={projected[0][0]} cy={projected[0][1]} r="2.5" fill="white" opacity={0.6 * glowPulse} />
      </svg>
    </div>
  );
};

// ─── SIMS PANEL ──────────────────────────────────────────────────────────────
interface SimsPanelProps {
  children: React.ReactNode;
  variant?: 'blue' | 'white' | 'dark' | 'glass';
  style?: React.CSSProperties;
}

export const SimsPanel: React.FC<SimsPanelProps> = ({
  children,
  variant = 'white',
  style,
}) => {
  const backgrounds: Record<string, string> = {
    blue: SIMS_COLORS.panelBlue,
    white: SIMS_COLORS.panelWhite,
    dark: SIMS_COLORS.panelDark,
    glass: SIMS_COLORS.panelGlass,
  };

  const textColors: Record<string, string> = {
    blue: SIMS_COLORS.textLight,
    white: SIMS_COLORS.textPrimary,
    dark: SIMS_COLORS.textLight,
    glass: SIMS_COLORS.textLight,
  };

  return (
    <div
      style={{
        background: backgrounds[variant],
        borderRadius: SIMS_SIZES.borderRadius.lg,
        padding: SIMS_SIZES.panel.padding,
        color: textColors[variant],
        border: variant === 'glass'
          ? '1px solid rgba(255,255,255,0.2)'
          : variant === 'white'
          ? '2px solid rgba(21,101,192,0.15)'
          : 'none',
        backdropFilter: variant === 'glass' ? 'blur(12px)' : undefined,
        boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
        fontFamily: SIMS_FONTS.body,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

// ─── PANEL HEADER ────────────────────────────────────────────────────────────
interface PanelHeaderProps {
  title: string;
  icon?: React.ReactNode;
  style?: React.CSSProperties;
}

export const PanelHeader: React.FC<PanelHeaderProps> = ({ title, icon, style }) => (
  <div
    style={{
      background: SIMS_COLORS.simsBlue,
      borderRadius: `${SIMS_SIZES.borderRadius.md}px ${SIMS_SIZES.borderRadius.md}px 0 0`,
      padding: '14px 24px',
      color: 'white',
      fontFamily: SIMS_FONTS.display,
      fontWeight: 800,
      fontSize: 22,
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      ...style,
    }}
  >
    {icon && <span style={{ fontSize: 20, display: 'flex', alignItems: 'center' }}>{icon}</span>}
    {title}
  </div>
);

// ─── NEED BAR ─────────────────────────────────────────────────────────────────
interface NeedBarProps {
  label: string;
  value: number;
  color?: string;
  animateFrom?: number;
  delayFrames?: number;
  icon?: string;
}

export const NeedBar: React.FC<NeedBarProps> = ({
  label,
  value,
  color = SIMS_COLORS.needsGreen,
  animateFrom = 0,
  delayFrames = 0,
  icon,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const animatedValue = spring({
    frame: frame - delayFrames,
    fps,
    config: { damping: 20, stiffness: 80 },
    from: animateFrom,
    to: value,
    durationInFrames: 40,
  });

  const clampedValue = Math.max(0, Math.min(100, animatedValue));

  let barColor = color;
  if (value < 30) barColor = SIMS_COLORS.needsRed;
  else if (value < 60) barColor = SIMS_COLORS.needsYellow;

  return (
    <div style={{ marginBottom: 12 }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 6,
          fontFamily: SIMS_FONTS.body,
          fontSize: 14,
          fontWeight: 600,
          color: SIMS_COLORS.textPrimary,
        }}
      >
        <span>{icon && `${icon} `}{label}</span>
        <span style={{ color: barColor }}>{Math.round(clampedValue)}%</span>
      </div>
      <div
        style={{
          height: 18,
          background: 'rgba(0,0,0,0.1)',
          borderRadius: 9,
          overflow: 'hidden',
          border: '1px solid rgba(0,0,0,0.1)',
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${clampedValue}%`,
            background: `linear-gradient(90deg, ${barColor}, ${barColor}cc)`,
            borderRadius: 9,
            boxShadow: `0 0 8px ${barColor}88`,
          }}
        />
      </div>
    </div>
  );
};

// ─── MOODLET ──────────────────────────────────────────────────────────────────
interface MoodletProps {
  emotion?: string;
  icon?: React.ReactNode;
  label: string;
  color?: string;
  style?: React.CSSProperties;
}

export const Moodlet: React.FC<MoodletProps> = ({
  emotion,
  icon,
  label,
  color = SIMS_COLORS.plumbobGreen,
  style,
}) => (
  <div
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      background: `${color}22`,
      border: `2px solid ${color}`,
      borderRadius: SIMS_SIZES.borderRadius.pill,
      padding: '6px 16px',
      fontFamily: SIMS_FONTS.body,
      fontSize: 13,
      fontWeight: 700,
      color,
      ...style,
    }}
  >
    <span style={{ fontSize: 16 }}>{icon || emotion}</span>
    {label}
  </div>
);

// ─── NOTIFICATION TOAST ──────────────────────────────────────────────────────
interface NotificationToastProps {
  icon: React.ReactNode;
  title?: string;
  subtitle?: string;
  /** Convenience alias — used as title when title is not provided */
  text?: string;
  variant?: 'success' | 'warning' | 'error' | 'info';
  startFrame?: number;
  style?: React.CSSProperties;
}

export const NotificationToast: React.FC<NotificationToastProps> = ({
  icon,
  title,
  subtitle,
  text,
  variant = 'success',
  startFrame = 0,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const colors = {
    success: SIMS_COLORS.plumbobGreen,
    warning: SIMS_COLORS.needsOrange,
    error: SIMS_COLORS.needsRed,
    info: SIMS_COLORS.simsBlueLight,
  };

  const slideIn = spring({
    frame: frame - startFrame,
    fps,
    config: { damping: 25, stiffness: 150 },
    from: -120,
    to: 0,
    durationInFrames: 20,
  });

  const accentColor = colors[variant];
  const displayTitle = title || text || '';

  return (
    <div
      style={{
        transform: `translateY(${slideIn}px)`,
        background: 'rgba(20,30,70,0.95)',
        borderRadius: SIMS_SIZES.borderRadius.md,
        padding: '14px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        border: `2px solid ${accentColor}`,
        boxShadow: `0 4px 24px rgba(0,0,0,0.5), 0 0 16px ${accentColor}44`,
        minWidth: 280,
        ...style,
      }}
    >
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: SIMS_SIZES.borderRadius.sm,
          background: `${accentColor}33`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 22,
          border: `2px solid ${accentColor}`,
          flexShrink: 0,
        }}
      >
        {icon}
      </div>
      <div>
        <div
          style={{
            fontFamily: SIMS_FONTS.display,
            fontWeight: 800,
            fontSize: 15,
            color: 'white',
            marginBottom: 2,
          }}
        >
          {displayTitle}
        </div>
        {subtitle && (
          <div
            style={{
              fontFamily: SIMS_FONTS.body,
              fontSize: 12,
              color: 'rgba(255,255,255,0.7)',
            }}
          >
            {subtitle}
          </div>
        )}
      </div>
    </div>
  );
};

// ─── SKILL BAR ───────────────────────────────────────────────────────────────
interface SkillBarProps {
  skill?: string;
  label?: string;
  level: number;
  maxLevel?: number;
  icon?: React.ReactNode;
  delayFrames?: number;
  /** Use dark styling (light text on dark bg) instead of default light panel styling */
  dark?: boolean;
}

export const SkillBar: React.FC<SkillBarProps> = ({
  skill,
  label,
  level,
  maxLevel = 10,
  icon,
  delayFrames = 0,
  dark = false,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const displayLabel = label || skill || '';

  const animatedLevel = spring({
    frame: frame - delayFrames,
    fps,
    config: { damping: 20, stiffness: 60 },
    from: 0,
    to: level,
    durationInFrames: 45,
  });

  const fillPercent = Math.min(1, Math.max(0, animatedLevel / maxLevel)) * 100;

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        marginBottom: 12,
        fontFamily: SIMS_FONTS.body,
      }}
    >
      {icon && (
        <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 24, flexShrink: 0 }}>
          {icon}
        </span>
      )}
      <span
        style={{
          fontSize: 13,
          fontWeight: 600,
          width: 150,
          flexShrink: 0,
          color: dark ? SIMS_COLORS.textLight : SIMS_COLORS.textPrimary,
        }}
      >
        {displayLabel}
      </span>
      <div
        style={{
          flex: 1,
          height: 14,
          borderRadius: 7,
          background: dark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.12)',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <div
          style={{
            width: `${fillPercent}%`,
            height: '100%',
            borderRadius: 7,
            background: `linear-gradient(90deg, ${SIMS_COLORS.plumbobGreen}, ${SIMS_COLORS.plumbobGlow})`,
            boxShadow: `0 0 8px ${SIMS_COLORS.plumbobGlow}66`,
          }}
        />
      </div>
      <span
        style={{
          fontSize: 13,
          fontWeight: 700,
          width: 28,
          textAlign: 'right',
          flexShrink: 0,
          color: dark ? SIMS_COLORS.textLight : SIMS_COLORS.textPrimary,
          fontFamily: SIMS_FONTS.body,
        }}
      >
        {Math.round(animatedLevel)}
      </span>
    </div>
  );
};

// ─── TRAIT BADGE ─────────────────────────────────────────────────────────────
interface TraitBadgeProps {
  icon: string;
  label: string;
}

export const TraitBadge: React.FC<TraitBadgeProps> = ({ icon, label }) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '10px 16px',
      background: 'rgba(21,101,192,0.12)',
      borderRadius: SIMS_SIZES.borderRadius.md,
      marginBottom: 10,
      fontFamily: SIMS_FONTS.body,
    }}
  >
    <div
      style={{
        width: 36,
        height: 36,
        borderRadius: '50%',
        background: SIMS_COLORS.simsBlue,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 18,
        flexShrink: 0,
      }}
    >
      {icon}
    </div>
    <span style={{ fontWeight: 600, fontSize: 15, color: SIMS_COLORS.textPrimary }}>
      {label}
    </span>
  </div>
);

// ─── SLIDE TITLE BAR ─────────────────────────────────────────────────────────
interface SlideTitleBarProps {
  title: string;
  subtitle?: string;
}

export const SlideTitleBar: React.FC<SlideTitleBarProps> = ({ title, subtitle }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const slideDown = spring({
    frame,
    fps,
    config: { damping: 25, stiffness: 120 },
    from: -60,
    to: 0,
    durationInFrames: 20,
  });

  return (
    <div
      style={{
        transform: `translateY(${slideDown}px)`,
        background: SIMS_COLORS.simsBlue,
        padding: '20px 48px',
        marginBottom: 0,
      }}
    >
      <h1
        style={{
          margin: 0,
          fontFamily: SIMS_FONTS.display,
          fontWeight: 900,
          fontSize: 42,
          color: 'white',
          textShadow: '0 2px 8px rgba(0,0,0,0.3)',
          letterSpacing: '-0.5px',
        }}
      >
        {title}
      </h1>
      {subtitle && (
        <p
          style={{
            margin: '4px 0 0',
            fontFamily: SIMS_FONTS.body,
            fontSize: 18,
            color: 'rgba(255,255,255,0.8)',
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};

// ─── LINDA CHARACTER SVG ─────────────────────────────────────────────────────
interface LindaCharacterProps {
  size?: number;
  outfit?: 'green-blazer' | 'casual' | 'formal' | 'aws' | 'notion' | 'reinvent';
  shirtText?: string;
  animate?: boolean;
  avatarSrc?: string;
  style?: React.CSSProperties;
}

export const LindaCharacter: React.FC<LindaCharacterProps> = ({
  size = 200,
  outfit = 'green-blazer',
  animate = true,
  avatarSrc = 'linda_avatar.svg',
  style,
}) => {
  const frame = useCurrentFrame();
  const anim = calculateAnimations(frame, animate);
  const config = getOutfitConfig(outfit);
  const floatY = Math.sin(frame * 0.045) * 1.8;
  const shadowScale = 1 - Math.sin(frame * 0.045) * 0.03;
  const glowColor = config.accentColor;

  return (
    <div
      style={{
        width: size,
        height: size * 2.1,
        position: 'relative',
        ...style,
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: '50%',
          bottom: 2,
          width: size * 0.48,
          height: size * 0.1,
          transform: `translateX(-50%) scale(${shadowScale})`,
          borderRadius: '50%',
          background: 'rgba(8,16,38,0.34)',
          filter: 'blur(4px)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: size * 0.11,
          background: `radial-gradient(circle at 30% 18%, ${glowColor}2B 0%, rgba(255,255,255,0) 50%)`,
          border: 'none',
          boxShadow: `0 12px 30px ${glowColor}33`,
        }}
      />
      <Img
        src={staticFile(`avatar/${avatarSrc}`)}
        style={{
          position: 'absolute',
          left: '50%',
          bottom: size * 0.055,
          width: size * 0.86,
          height: size * 1.92,
          transform: `translateX(-50%) translateY(${anim.weightShiftX * 0.35 + floatY}px) scaleY(${anim.breatheScaleY})`,
          transformOrigin: 'center bottom',
          objectFit: 'contain',
          filter: `drop-shadow(0 14px 22px rgba(0,0,0,0.35)) drop-shadow(0 0 16px ${glowColor}55)`,
        }}
      />
    </div>
  );
};

// ─── SIMS CURSOR ─────────────────────────────────────────────────────────────
export const SimsCursor: React.FC<{ x: number; y: number; style?: React.CSSProperties }> = ({
  x,
  y,
  style,
}) => (
  <div
    style={{
      position: 'absolute',
      left: x,
      top: y,
      width: 30,
      height: 30,
      pointerEvents: 'none',
      zIndex: 100,
      ...style,
    }}
  >
    <svg viewBox="0 0 30 35" width={30} height={35}>
      <path
        d="M2 2 L2 22 L8 16 L12 26 L16 24 L12 14 L20 14 Z"
        fill="white"
        stroke="#333"
        strokeWidth={1.5}
      />
    </svg>
  </div>
);

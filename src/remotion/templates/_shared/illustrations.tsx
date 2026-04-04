/**
 * Shared SVG Illustrations for Journal Content Templates
 *
 * Hand-crafted inline SVG illustrations used across ThoughtLeadership
 * and ConceptPitch templates. Each illustration:
 *   - Uses `color` prop for accent elements (defaults to theme accent)
 *   - Uses `size` prop for dimensions (default 48)
 *   - Multi-layer SVG with semi-transparent fills for depth
 *   - Detail strokes at 1–1.5px
 *   - NO emoji - all visual indicators are SVG
 */

import React from "react";

interface IllustrationProps {
  size?: number;
  color?: string;
}

// ── BookOpenIllustration ────────────────────────────────────────
// Open book with cover (accent color), pages (white/translucent), spine shadow.
export const BookOpenIllustration: React.FC<IllustrationProps> = ({
  size = 48,
  color = "#6366f1",
}) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Left cover with curve */}
    <path d="M6 14C6 11.8 7.8 10 10 10H22C22 10 23 10 23 11V37C23 37 22 38 21 37.5C18 36 12 35 10 35H8C6.9 35 6 34.1 6 33V14Z"
      fill={color} opacity={0.75} />
    {/* Right cover with curve */}
    <path d="M42 14C42 11.8 40.2 10 38 10H26C26 10 25 10 25 11V37C25 37 26 38 27 37.5C30 36 36 35 38 35H40C41.1 35 42 34.1 42 33V14Z"
      fill={color} opacity={0.75} />
    {/* Left page - curved */}
    <path d="M9 13C9 13 14 12.5 21 13V34C14 33.5 9 34 9 34V13Z" fill="white" opacity={0.92} />
    {/* Right page - curved */}
    <path d="M39 13C39 13 34 12.5 27 13V34C34 33.5 39 34 39 34V13Z" fill="white" opacity={0.92} />
    {/* Page lines left */}
    <line x1="11" y1="17" x2="19" y2="16.8" stroke={color} strokeWidth="0.7" opacity={0.25} />
    <line x1="11" y1="20" x2="19" y2="19.8" stroke={color} strokeWidth="0.7" opacity={0.25} />
    <line x1="11" y1="23" x2="18" y2="22.8" stroke={color} strokeWidth="0.7" opacity={0.2} />
    <line x1="11" y1="26" x2="19" y2="25.8" stroke={color} strokeWidth="0.7" opacity={0.25} />
    <line x1="11" y1="29" x2="17" y2="28.8" stroke={color} strokeWidth="0.7" opacity={0.2} />
    {/* Page lines right */}
    <line x1="29" y1="16.8" x2="37" y2="17" stroke={color} strokeWidth="0.7" opacity={0.25} />
    <line x1="29" y1="19.8" x2="37" y2="20" stroke={color} strokeWidth="0.7" opacity={0.25} />
    <line x1="29" y1="22.8" x2="36" y2="23" stroke={color} strokeWidth="0.7" opacity={0.2} />
    <line x1="29" y1="25.8" x2="37" y2="26" stroke={color} strokeWidth="0.7" opacity={0.25} />
    {/* Spine - center fold */}
    <path d="M24 9V38" stroke={color} strokeWidth="1.5" opacity={0.4} />
    {/* Spine glow */}
    <path d="M24 10V37" stroke="white" strokeWidth="0.5" opacity={0.15} />
    {/* Page curl - bottom left */}
    <path d="M9 34Q12 36 15 34.5" stroke={color} strokeWidth="0.6" opacity={0.2} fill="none" />
    {/* Page curl - bottom right */}
    <path d="M39 34Q36 36 33 34.5" stroke={color} strokeWidth="0.6" opacity={0.2} fill="none" />
    {/* Bookmark ribbon */}
    <path d="M20 10V18L18.5 16L17 18V10" fill={color} opacity={0.5} />
  </svg>
);

// ── QuillPenIllustration ────────────────────────────────────────
// Stylized quill with nib detail, feather barbs, ink drop with glow.
export const QuillPenIllustration: React.FC<IllustrationProps> = ({
  size = 48,
  color = "#6366f1",
}) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Feather body */}
    <path d="M34 4C34 4 38 8 36 16C34 24 26 32 20 36L18 34C22 28 28 18 30 12C32 6 34 4 34 4Z"
      fill={color} opacity={0.7} />
    {/* Feather barbs */}
    <path d="M32 8L28 14" stroke="white" strokeWidth="0.8" opacity={0.4} />
    <path d="M34 10L29 18" stroke="white" strokeWidth="0.8" opacity={0.3} />
    <path d="M33 14L27 22" stroke="white" strokeWidth="0.8" opacity={0.3} />
    <path d="M31 18L25 26" stroke="white" strokeWidth="0.8" opacity={0.25} />
    {/* Quill shaft */}
    <line x1="20" y1="36" x2="12" y2="44" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    {/* Nib */}
    <path d="M12 44L10 42L14 38L16 40L12 44Z" fill={color} opacity={0.9} />
    <path d="M13 43L11.5 41.5" stroke="white" strokeWidth="0.5" opacity={0.5} />
    {/* Ink drop */}
    <circle cx="10" cy="44" r="2.5" fill={color} opacity={0.6} />
    {/* Ink glow */}
    <circle cx="10" cy="44" r="4" fill={color} opacity={0.15} />
  </svg>
);


// ── SpotlightIllustration ───────────────────────────────────────
// Stage spotlight cone with volumetric light rays, lens flare at source.
export const SpotlightIllustration: React.FC<IllustrationProps> = ({
  size = 48,
  color = "#6366f1",
}) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="spotBeam" x1="24" y1="8" x2="24" y2="44" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor={color} stopOpacity={0.5} />
        <stop offset="100%" stopColor={color} stopOpacity={0.02} />
      </linearGradient>
      <radialGradient id="spotFlare" cx="24" cy="6" r="6" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="white" stopOpacity={0.8} />
        <stop offset="50%" stopColor={color} stopOpacity={0.3} />
        <stop offset="100%" stopColor={color} stopOpacity={0} />
      </radialGradient>
    </defs>
    {/* Light cone / beam */}
    <path d="M18 12L6 44H42L30 12Z" fill="url(#spotBeam)" />
    {/* Volumetric rays */}
    <path d="M24 10L14 40" stroke={color} strokeWidth="0.5" opacity={0.15} />
    <path d="M24 10L34 40" stroke={color} strokeWidth="0.5" opacity={0.15} />
    <path d="M24 10L20 42" stroke={color} strokeWidth="0.5" opacity={0.1} />
    <path d="M24 10L28 42" stroke={color} strokeWidth="0.5" opacity={0.1} />
    {/* Spotlight housing */}
    <rect x="19" y="4" width="10" height="8" rx="2" fill={color} opacity={0.85} />
    <rect x="21" y="6" width="6" height="4" rx="1" fill="white" opacity={0.2} />
    {/* Lens flare */}
    <circle cx="24" cy="6" r="5" fill="url(#spotFlare)" />
    {/* Lens center */}
    <circle cx="24" cy="8" r="2" fill="white" opacity={0.6} />
  </svg>
);

// ── ScrollIllustration ──────────────────────────────────────────
// Unfurling scroll with curved edges, horizontal text-line placeholders.
export const ScrollIllustration: React.FC<IllustrationProps> = ({
  size = 48,
  color = "#6366f1",
}) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Scroll body */}
    <rect x="10" y="8" width="28" height="32" rx="2" fill="white" opacity={0.9} />
    {/* Top curl */}
    <path d="M8 10C8 6 12 4 14 6C12 4 10 6 10 8V10H38V8C38 6 36 4 34 6C36 4 40 6 40 10V12H8V10Z"
      fill={color} opacity={0.7} />
    <ellipse cx="9" cy="10" rx="3" ry="4" fill={color} opacity={0.5} />
    <ellipse cx="39" cy="10" rx="3" ry="4" fill={color} opacity={0.5} />
    {/* Bottom curl */}
    <path d="M8 38C8 42 12 44 14 42C12 44 10 42 10 40V38H38V40C38 42 36 44 34 42C36 44 40 42 40 38V36H8V38Z"
      fill={color} opacity={0.6} />
    <ellipse cx="9" cy="38" rx="3" ry="4" fill={color} opacity={0.4} />
    <ellipse cx="39" cy="38" rx="3" ry="4" fill={color} opacity={0.4} />
    {/* Text lines */}
    <line x1="14" y1="16" x2="34" y2="16" stroke={color} strokeWidth="1" opacity={0.25} />
    <line x1="14" y1="20" x2="32" y2="20" stroke={color} strokeWidth="1" opacity={0.25} />
    <line x1="14" y1="24" x2="34" y2="24" stroke={color} strokeWidth="1" opacity={0.25} />
    <line x1="14" y1="28" x2="30" y2="28" stroke={color} strokeWidth="1" opacity={0.25} />
    <line x1="14" y1="32" x2="33" y2="32" stroke={color} strokeWidth="1" opacity={0.25} />
  </svg>
);

// ── LightbulbIllustration ───────────────────────────────────────
// Detailed lightbulb with glass outline, tungsten filament, radial glow.
export const LightbulbIllustration: React.FC<IllustrationProps> = ({
  size = 48,
  color = "#6366f1",
}) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="bulbGlow" cx="24" cy="18" r="16" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor={color} stopOpacity={0.25} />
        <stop offset="60%" stopColor={color} stopOpacity={0.08} />
        <stop offset="100%" stopColor={color} stopOpacity={0} />
      </radialGradient>
    </defs>
    {/* Radial glow */}
    <circle cx="24" cy="18" r="18" fill="url(#bulbGlow)" />
    {/* Glass bulb */}
    <path d="M24 4C16.3 4 10 10.3 10 18C10 23.5 13 28 17 30V34H31V30C35 28 38 23.5 38 18C38 10.3 31.7 4 24 4Z"
      fill="white" stroke={color} strokeWidth="1.5" opacity={0.7} style={{ fillOpacity: 0.12 }} />
    {/* Filament */}
    <path d="M20 24C20 24 21 18 24 16C27 18 28 24 28 24" stroke={color} strokeWidth="1.2" strokeLinecap="round" fill="none" opacity={0.8} />
    <path d="M22 22C22 20 24 18 24 16C24 18 26 20 26 22" stroke={color} strokeWidth="0.8" strokeLinecap="round" fill="none" opacity={0.5} />
    {/* Filament glow center */}
    <circle cx="24" cy="17" r="2" fill={color} opacity={0.4} />
    {/* Base / screw */}
    <rect x="18" y="34" width="12" height="3" rx="1" fill={color} opacity={0.6} />
    <rect x="19" y="37" width="10" height="2" rx="1" fill={color} opacity={0.5} />
    <rect x="20" y="39" width="8" height="2" rx="1" fill={color} opacity={0.4} />
    <rect x="21" y="41" width="6" height="2" rx="1" fill={color} opacity={0.35} />
    {/* Base lines */}
    <line x1="18" y1="35.5" x2="30" y2="35.5" stroke="white" strokeWidth="0.5" opacity={0.2} />
    <line x1="19" y1="38" x2="29" y2="38" stroke="white" strokeWidth="0.5" opacity={0.2} />
  </svg>
);


// ── GearMechanismIllustration ───────────────────────────────────
// 2–3 interlocking gears with teeth detail, different sizes, center axle dots.
export const GearMechanismIllustration: React.FC<IllustrationProps> = ({
  size = 48,
  color = "#6366f1",
}) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Large gear */}
    <circle cx="20" cy="22" r="12" fill={color} opacity={0.15} />
    <circle cx="20" cy="22" r="10" stroke={color} strokeWidth="1.2" opacity={0.7} fill="none" />
    {/* Large gear teeth */}
    <rect x="18" y="9" width="4" height="4" rx="0.5" fill={color} opacity={0.6} />
    <rect x="18" y="31" width="4" height="4" rx="0.5" fill={color} opacity={0.6} />
    <rect x="7" y="20" width="4" height="4" rx="0.5" fill={color} opacity={0.6} />
    <rect x="29" y="20" width="4" height="4" rx="0.5" fill={color} opacity={0.6} />
    <rect x="9.5" y="12.5" width="3.5" height="3.5" rx="0.5" fill={color} opacity={0.5} transform="rotate(-45 11.25 14.25)" />
    <rect x="27" y="12.5" width="3.5" height="3.5" rx="0.5" fill={color} opacity={0.5} transform="rotate(-45 28.75 14.25)" />
    <rect x="9.5" y="28" width="3.5" height="3.5" rx="0.5" fill={color} opacity={0.5} transform="rotate(-45 11.25 29.75)" />
    <rect x="27" y="28" width="3.5" height="3.5" rx="0.5" fill={color} opacity={0.5} transform="rotate(-45 28.75 29.75)" />
    {/* Large gear axle */}
    <circle cx="20" cy="22" r="3" fill={color} opacity={0.5} />
    <circle cx="20" cy="22" r="1.5" fill="white" opacity={0.3} />
    {/* Small gear */}
    <circle cx="35" cy="32" r="7" fill={color} opacity={0.12} />
    <circle cx="35" cy="32" r="6" stroke={color} strokeWidth="1" opacity={0.6} fill="none" />
    {/* Small gear teeth */}
    <rect x="33.5" y="24.5" width="3" height="3" rx="0.5" fill={color} opacity={0.5} />
    <rect x="33.5" y="36.5" width="3" height="3" rx="0.5" fill={color} opacity={0.5} />
    <rect x="27.5" y="30.5" width="3" height="3" rx="0.5" fill={color} opacity={0.5} />
    <rect x="39.5" y="30.5" width="3" height="3" rx="0.5" fill={color} opacity={0.5} />
    {/* Small gear axle */}
    <circle cx="35" cy="32" r="2" fill={color} opacity={0.5} />
    <circle cx="35" cy="32" r="1" fill="white" opacity={0.3} />
    {/* Tiny gear */}
    <circle cx="34" cy="14" r="4.5" fill={color} opacity={0.1} />
    <circle cx="34" cy="14" r="3.5" stroke={color} strokeWidth="0.8" opacity={0.5} fill="none" />
    <rect x="32.8" y="9" width="2.4" height="2" rx="0.5" fill={color} opacity={0.4} />
    <rect x="32.8" y="17" width="2.4" height="2" rx="0.5" fill={color} opacity={0.4} />
    <rect x="29" y="12.8" width="2" height="2.4" rx="0.5" fill={color} opacity={0.4} />
    <rect x="37" y="12.8" width="2" height="2.4" rx="0.5" fill={color} opacity={0.4} />
    <circle cx="34" cy="14" r="1.5" fill={color} opacity={0.4} />
  </svg>
);

// ── ChecklistBoardIllustration ──────────────────────────────────
// Clipboard with clip at top, 3–4 lines with checkmark/circle indicators.
export const ChecklistBoardIllustration: React.FC<IllustrationProps> = ({
  size = 48,
  color = "#6366f1",
}) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Board */}
    <rect x="8" y="8" width="32" height="36" rx="3" fill="white" stroke={color} strokeWidth="1.2" opacity={0.6} style={{ fillOpacity: 0.1 }} />
    {/* Clip */}
    <rect x="18" y="4" width="12" height="8" rx="2" fill={color} opacity={0.7} />
    <rect x="20" y="6" width="8" height="4" rx="1" fill="white" opacity={0.25} />
    {/* Row 1 - checked */}
    <circle cx="16" cy="20" r="3" fill={color} opacity={0.2} />
    <path d="M14 20L15.5 21.5L18 18.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity={0.8} />
    <line x1="22" y1="20" x2="36" y2="20" stroke={color} strokeWidth="1" opacity={0.3} />
    {/* Row 2 - checked */}
    <circle cx="16" cy="28" r="3" fill={color} opacity={0.2} />
    <path d="M14 28L15.5 29.5L18 26.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity={0.8} />
    <line x1="22" y1="28" x2="34" y2="28" stroke={color} strokeWidth="1" opacity={0.3} />
    {/* Row 3 - unchecked */}
    <circle cx="16" cy="36" r="3" stroke={color} strokeWidth="1" opacity={0.4} fill="none" />
    <line x1="22" y1="36" x2="35" y2="36" stroke={color} strokeWidth="1" opacity={0.2} />
  </svg>
);

// ── TrophyIllustration ──────────────────────────────────────────
// Trophy cup with handles, base/pedestal, star emblem on cup face.
export const TrophyIllustration: React.FC<IllustrationProps> = ({
  size = 48,
  color = "#6366f1",
}) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Cup body */}
    <path d="M14 8H34V20C34 26.6 29.5 30 24 30C18.5 30 14 26.6 14 20V8Z" fill={color} opacity={0.7} />
    {/* Cup shine */}
    <path d="M16 10H20V18C20 22 18 24 16 24V10Z" fill="white" opacity={0.15} />
    {/* Left handle */}
    <path d="M14 12H10C8 12 6 14 6 16V18C6 20 8 22 10 22H14" stroke={color} strokeWidth="1.5" fill="none" opacity={0.6} />
    {/* Right handle */}
    <path d="M34 12H38C40 12 42 14 42 16V18C42 20 40 22 38 22H34" stroke={color} strokeWidth="1.5" fill="none" opacity={0.6} />
    {/* Star emblem */}
    <path d="M24 14L25.5 17.5L29 18L26.5 20.5L27 24L24 22.5L21 24L21.5 20.5L19 18L22.5 17.5L24 14Z"
      fill="white" opacity={0.5} />
    {/* Stem */}
    <rect x="22" y="30" width="4" height="6" fill={color} opacity={0.6} />
    {/* Base */}
    <rect x="16" y="36" width="16" height="3" rx="1.5" fill={color} opacity={0.5} />
    {/* Pedestal */}
    <rect x="14" y="39" width="20" height="4" rx="2" fill={color} opacity={0.4} />
    <line x1="16" y1="41" x2="32" y2="41" stroke="white" strokeWidth="0.5" opacity={0.2} />
  </svg>
);


// ── RocketIllustration ──────────────────────────────────────────
// Rocket with nose cone, body, fins, circular window, exhaust flame.
export const RocketIllustration: React.FC<IllustrationProps> = ({
  size = 48,
  color = "#6366f1",
}) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Exhaust flame - layered triangles */}
    <path d="M20 38L24 46L28 38" fill="#ef4444" opacity={0.6} />
    <path d="M21 38L24 44L27 38" fill="#f97316" opacity={0.7} />
    <path d="M22 38L24 42L26 38" fill="#fbbf24" opacity={0.8} />
    {/* Rocket body */}
    <path d="M18 18C18 18 20 6 24 4C28 6 30 18 30 18V36H18V18Z" fill={color} opacity={0.8} />
    {/* Body highlight */}
    <path d="M20 14C20 14 21 8 24 6V36H20V14Z" fill="white" opacity={0.1} />
    {/* Nose cone tip */}
    <path d="M22 10C22 10 23 6 24 4C25 6 26 10 26 10" stroke="white" strokeWidth="0.8" opacity={0.3} fill="none" />
    {/* Window */}
    <circle cx="24" cy="20" r="4" fill="white" stroke="white" strokeWidth="1" opacity={0.4} style={{ fillOpacity: 0.15 }} />
    <circle cx="24" cy="20" r="2.5" fill={color} opacity={0.3} />
    <circle cx="23" cy="19" r="1" fill="white" opacity={0.3} />
    {/* Left fin */}
    <path d="M18 30L12 38L18 36V30Z" fill={color} opacity={0.6} />
    {/* Right fin */}
    <path d="M30 30L36 38L30 36V30Z" fill={color} opacity={0.6} />
    {/* Body band */}
    <rect x="18" y="32" width="12" height="2" fill="white" opacity={0.15} />
    <rect x="18" y="28" width="12" height="1" fill="white" opacity={0.1} />
  </svg>
);

// ── KanbanBoardIllustration ─────────────────────────────────────
// Mini kanban board with 2–3 columns, card placeholders, subtle grid lines.
export const KanbanBoardIllustration: React.FC<IllustrationProps> = ({
  size = 48,
  color = "#6366f1",
}) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Board background */}
    <rect x="4" y="6" width="40" height="36" rx="3" fill="white" stroke={color} strokeWidth="1" opacity={0.4} style={{ fillOpacity: 0.08 }} />
    {/* Column dividers */}
    <line x1="17.5" y1="12" x2="17.5" y2="38" stroke={color} strokeWidth="0.8" opacity={0.2} />
    <line x1="31.5" y1="12" x2="31.5" y2="38" stroke={color} strokeWidth="0.8" opacity={0.2} />
    {/* Column headers */}
    <rect x="6" y="8" width="10" height="3" rx="1" fill={color} opacity={0.4} />
    <rect x="19" y="8" width="11" height="3" rx="1" fill={color} opacity={0.3} />
    <rect x="33" y="8" width="9" height="3" rx="1" fill={color} opacity={0.25} />
    {/* Column 1 cards */}
    <rect x="6" y="14" width="10" height="6" rx="1.5" fill={color} opacity={0.2} />
    <rect x="6" y="22" width="10" height="6" rx="1.5" fill={color} opacity={0.15} />
    <rect x="6" y="30" width="10" height="5" rx="1.5" fill={color} opacity={0.1} />
    {/* Column 2 cards */}
    <rect x="19" y="14" width="11" height="7" rx="1.5" fill={color} opacity={0.2} />
    <rect x="19" y="23" width="11" height="5" rx="1.5" fill={color} opacity={0.15} />
    {/* Column 3 cards */}
    <rect x="33" y="14" width="9" height="5" rx="1.5" fill={color} opacity={0.2} />
    <rect x="33" y="21" width="9" height="6" rx="1.5" fill={color} opacity={0.12} />
    <rect x="33" y="29" width="9" height="5" rx="1.5" fill={color} opacity={0.08} />
    {/* Card detail lines */}
    <line x1="7.5" y1="16" x2="14" y2="16" stroke="white" strokeWidth="0.5" opacity={0.2} />
    <line x1="7.5" y1="18" x2="12" y2="18" stroke="white" strokeWidth="0.5" opacity={0.15} />
    <line x1="20.5" y1="16" x2="28" y2="16" stroke="white" strokeWidth="0.5" opacity={0.2} />
    <line x1="20.5" y1="18.5" x2="26" y2="18.5" stroke="white" strokeWidth="0.5" opacity={0.15} />
  </svg>
);

// ── PieChartIllustration ────────────────────────────────────────
// Simple decorative pie chart for the brief layout's completion summary.
export const PieChartIllustration: React.FC<IllustrationProps & { progress?: number }> = ({
  size = 48,
  color = "#6366f1",
  progress = 0.6,
}) => {
  const r = 16;
  const cx = 24;
  const cy = 24;
  const circumference = 2 * Math.PI * r;
  const filled = circumference * progress;
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Background ring */}
      <circle cx={cx} cy={cy} r={r} stroke="white" strokeWidth="3" opacity={0.1} fill="none" />
      {/* Progress arc */}
      <circle
        cx={cx} cy={cy} r={r}
        stroke={color} strokeWidth="3" opacity={0.7}
        fill="none"
        strokeDasharray={`${filled} ${circumference - filled}`}
        strokeDashoffset={circumference * 0.25}
        strokeLinecap="round"
      />
      {/* Center dot */}
      <circle cx={cx} cy={cy} r="3" fill={color} opacity={0.3} />
    </svg>
  );
};

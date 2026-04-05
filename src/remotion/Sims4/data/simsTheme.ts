// src/remotion/Sims4/data/simsTheme.ts
// Sims 4 Design System — all colors, fonts, and UI constants used across templates

export const SIMS_COLORS = {
  // Primary Sims blue palette
  simsBlue: '#1565C0',
  simsBlueLight: '#42A5F5',
  simsBlueDark: '#0D47A1',
  simsBluePanel: 'rgba(13, 71, 161, 0.92)',

  // Plumbob greens
  plumbobGreen: '#00C853',
  plumbobDark: '#1B5E20',
  plumbobGlow: '#69F0AE',

  // Alert / needs colors (Sims moodlet style)
  needsGreen: '#4CAF50',
  needsYellow: '#FFC107',
  needsOrange: '#FF9800',
  needsRed: '#F44336',
  needsPurple: '#7B1FA2',

  // UI panels
  panelWhite: 'rgba(255,255,255,0.92)',
  panelBlue: 'rgba(30, 80, 180, 0.88)',
  panelDark: 'rgba(10, 20, 50, 0.90)',
  panelGlass: 'rgba(255,255,255,0.12)',

  // Text
  textPrimary: '#0D1B3E',
  textLight: '#FFFFFF',
  textMuted: '#90A4AE',
  textAccent: '#42A5F5',

  // Linda's signature outfit
  lindaGreenBlazer: '#2E7D32',
  lindaGreenLight: '#388E3C',

  // Background gradients
  bgBlueDark: 'linear-gradient(135deg, #0D1B3E 0%, #1565C0 60%, #0D47A1 100%)',
  bgBlueLight: 'linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 50%, #90CAF9 100%)',
  bgSims: 'linear-gradient(160deg, #1A237E 0%, #283593 40%, #1565C0 100%)',
  bgLoadingScreen: 'linear-gradient(180deg, #0a0f2e 0%, #1a2060 50%, #243080 100%)',
};

export const SIMS_FONTS = {
  // Primary display — bold, playful like Sims UI
  display: '"Nunito", "Varela Round", "Trebuchet MS", sans-serif',
  // Body text in panels
  body: '"Open Sans", "Segoe UI", sans-serif',
  // Monospace for "cheat codes" / system messages
  mono: '"Courier New", monospace',
  // The actual Sims-like rounded bold font (closest Google Font)
  simsLike: '"Nunito", sans-serif',
};

export const SIMS_SIZES = {
  borderRadius: {
    sm: 8,
    md: 14,
    lg: 22,
    xl: 32,
    pill: 999,
  },
  panel: {
    padding: 32,
    gap: 16,
  },
  plumbob: {
    small: 40,
    medium: 70,
    large: 100,
  },
};

// Sims 4 slide template types
export type SimsTemplate =
  | 'title-screen'
  | 'character-select'
  | 'loading-screen'
  | 'live-mode'
  | 'build-mode'
  | 'neighborhood-map'
  | 'need-bars'
  | 'notification-toast'
  | 'skill-panel'
  | 'moodlet-panel';

// Character outfit configurations for Linda
export type LindaOutfit =
  | 'green-blazer-aws'
  | 'green-blazer-notion'
  | 'green-blazer-redinvent'
  | 'casual-blue-jeans'
  | 'enterprise-formal';

export const LINDA_OUTFITS: Record<LindaOutfit, { shirt: string; blazer: string; description: string }> = {
  'green-blazer-aws': {
    shirt: '#232F3E',
    blazer: '#2E7D32',
    description: 'Green blazer + AWS conference shirt',
  },
  'green-blazer-notion': {
    shirt: '#1A1A1A',
    blazer: '#2E7D32',
    description: 'Green blazer + Notion shirt',
  },
  'green-blazer-redinvent': {
    shirt: '#1B1B1B',
    blazer: '#2E7D32',
    description: 'Green blazer + re:Invent shirt',
  },
  'casual-blue-jeans': {
    shirt: '#1565C0',
    blazer: 'none',
    description: 'Casual look — no blazer',
  },
  'enterprise-formal': {
    shirt: '#263238',
    blazer: '#2E7D32',
    description: 'Smart formal with green blazer',
  },
};

export type UserPersona = {
  name: string;
  role: string;
  quote: string;
  hairColor: string;
  skinTone: string;
  outfit: string;
  plumbobColor: string;
  emotion: 'happy' | 'stressed' | 'skeptical' | 'confused' | 'angry';
};

export const USER_PERSONAS: UserPersona[] = [
  {
    name: 'The Skeptic',
    role: 'Senior Manager',
    quote: "I don't trust this bot.",
    hairColor: '#F5F5F5',
    skinTone: '#FDBCB4',
    outfit: '#37474F',
    plumbobColor: '#FF9800',
    emotion: 'skeptical',
  },
  {
    name: 'The Power User',
    role: 'Data Engineer',
    quote: 'Just give me raw data.',
    hairColor: '#8D6E63',
    skinTone: '#FFCCBC',
    outfit: '#5D4037',
    plumbobColor: '#4CAF50',
    emotion: 'happy',
  },
  {
    name: 'The End Customer',
    role: 'External Client',
    quote: 'I need a refund.',
    hairColor: '#795548',
    skinTone: '#FFE0B2',
    outfit: '#F3E5F5',
    plumbobColor: '#F44336',
    emotion: 'confused',
  },
  {
    name: 'The Admin',
    role: 'IT Administrator',
    quote: 'I need total control.',
    hairColor: '#1A1A1A',
    skinTone: '#4E342E',
    outfit: '#1565C0',
    plumbobColor: '#2196F3',
    emotion: 'stressed',
  },
  {
    name: 'The News Reporter',
    role: 'B2B2C User: Media',
    quote: 'If this works, everything changes.',
    hairColor: '#C62828',
    skinTone: '#FDBCB4',
    outfit: '#1A1A2E',
    plumbobColor: '#4CAF50',
    emotion: 'happy',
  },
  {
    name: 'The Sports Athlete',
    role: 'B2B2C User: Sports',
    quote: 'Can we get near real-time?',
    hairColor: '#1A1A1A',
    skinTone: '#6D4C41',
    outfit: '#1565C0',
    plumbobColor: '#69F0AE',
    emotion: 'happy',
  },
];

// ── Animation Spring Configs ────────────────────────────────────────────────
// Use these instead of defining local SPRING_CONFIG constants in compositions.

export const SIMS_SPRING = {
  /** Standard entrance — cards, panels, text blocks */
  entrance: { damping: 16, stiffness: 100 },
  /** Snappy — buttons, small interactive elements, tabs */
  snappy: { damping: 20, stiffness: 150 },
  /** Gentle — large panels, background layers, slow reveals */
  gentle: { damping: 12, stiffness: 80 },
} as const;

// ── Animation Timing Constants ──────────────────────────────────────────────

export const SIMS_TIMING = {
  /** Frames for scene crossfade overlap */
  crossfade: 20,
  /** Minimum frames between staggered item entrances */
  minStagger: 20,
  /** translateY offset (px) for fade-in entrance */
  entranceOffset: 15,
  /** Standard fade-in duration in frames */
  fadeInFrames: 25,
} as const;

// ── Background Presets ──────────────────────────────────────────────────────
// These define the 3 canonical Sims4 background styles.
// Use with <SimsBackground variant="..." /> or reference directly.

export type SimsBackgroundVariant = 'cinematic' | 'cas-light' | 'cas-dark';

export const SIMS_BACKGROUNDS = {
  /** HSL sky gradient with animated skyShift — title screens, main menu, chapter headers */
  cinematic: {
    type: 'cinematic' as const,
    description: 'Animated night sky with horizon glow, skyline silhouettes, and firefly particles',
  },
  /** Light blue gradient — CAS panels, appearance editor, trait selection */
  casLight: {
    type: 'cas-light' as const,
    gradient: 'linear-gradient(180deg, #e6f3ff 0%, #cae3f8 60%, #b7d6f1 100%)',
  },
  /** Dark teal gradient — CAS initial scene, scenario selection, modals */
  casDark: {
    type: 'cas-dark' as const,
    gradient: 'linear-gradient(180deg, #0a2a3f 0%, #1a6b5a 100%)',
  },
} as const;

/**
 * Design Tips Preset - Video design tips slide configuration
 *
 * This file contains the video design tips preset for the video-design-tips page.
 * The preset defines a sequence of slides demonstrating key video design principles
 * including typography, color, composition, motion, and brand consistency.
 *
 * Requirements: 3.1, 3.2, 3.3
 */

import type { SlideConfig } from './types';

// ═══════════════════════════════════════════════════════════════════════════
// VIDEO DESIGN TIPS PRESET
// Key video design principles for creating professional videos
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Slide configurations for the video-design-tips preset.
 * Each slide demonstrates a key design principle with annotations explaining the concept.
 *
 * Validates: Requirements 3.1, 3.2, 3.3
 */
export const VIDEO_DESIGN_TIPS_SLIDES: SlideConfig[] = [
  {
    screenshot: 'tutorials/design-tips/typography-hierarchy.png',
    annotation: '1. Typography Hierarchy - Use clear font size contrast between headings and body text to guide viewer attention and establish visual importance',
    clickTarget: { x: 50, y: 40, label: 'Font Sizes' },
    zoomRegion: { x: 50, y: 40, scale: 1.6 },
  },
  {
    screenshot: 'tutorials/design-tips/color-contrast.png',
    annotation: '2. Color & Contrast - Choose colors with sufficient contrast for readability and use accent colors strategically to highlight key information',
    clickTarget: { x: 50, y: 50, label: 'Color Palette' },
    zoomRegion: { x: 50, y: 50, scale: 1.8 },
  },
  {
    screenshot: 'tutorials/design-tips/visual-balance.png',
    annotation: '3. Visual Balance & Composition - Arrange elements using grids and alignment to create harmonious layouts that feel stable and professional',
    clickTarget: { x: 50, y: 45, label: 'Layout Grid' },
    zoomRegion: { x: 50, y: 45, scale: 1.6 },
  },
  {
    screenshot: 'tutorials/design-tips/motion-timing.png',
    annotation: '4. Motion & Timing - Apply smooth easing curves and consistent timing to animations for natural, polished transitions that enhance storytelling',
    clickTarget: { x: 50, y: 55, label: 'Easing Curves' },
    zoomRegion: { x: 50, y: 55, scale: 1.8 },
  },
  {
    screenshot: 'tutorials/design-tips/brand-consistency.png',
    annotation: '5. Brand Consistency - Maintain consistent use of colors, fonts, and visual elements throughout your video to reinforce brand identity',
    clickTarget: { x: 50, y: 50, label: 'Brand Guide' },
  },
];

// ═══════════════════════════════════════════════════════════════════════════
// COMBINED DESIGN TIPS PRESETS OBJECT
// Maps preset names to their slide configurations
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Combined object mapping design tips preset names to their slide arrays.
 * Used for easy lookup by preset name.
 */
export const DESIGN_TIPS_PRESETS: Record<string, SlideConfig[]> = {
  'video-design-tips': VIDEO_DESIGN_TIPS_SLIDES,
};

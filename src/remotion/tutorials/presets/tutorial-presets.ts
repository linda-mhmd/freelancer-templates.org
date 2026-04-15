/**
 * Tutorial Presets - 8 existing tutorial slide configurations
 *
 * This file contains the original 8 tutorial presets extracted from
 * ScreencastSlideshow.tsx. Each preset defines a sequence of slides
 * for a specific tutorial topic.
 *
 * Presets:
 * - studio-basics: Remotion Studio interface navigation
 * - editing-props: Props panel interaction workflow
 * - cli-rendering: Terminal command workflow
 * - composition-structure: Understanding compositions
 * - custom-themes: Theme customization
 * - brand-integration: Adding brand assets
 * - layout-modifications: Adjusting layouts
 * - lambda-deployment: Cloud rendering setup
 *
 * Requirements: 1.5, 8.3
 */

import type { SlideConfig } from './types';

// ═══════════════════════════════════════════════════════════════════════════
// STUDIO BASICS PRESET
// Remotion Studio interface navigation and timeline
// ═══════════════════════════════════════════════════════════════════════════

export const STUDIO_BASICS_SLIDES: SlideConfig[] = [
  {
    screenshot: 'assets/tutorials/demo/studio-overview.png',
    annotation: '1. Studio Overview',
    clickTarget: { x: 15, y: 50, label: 'Compositions' },
  },
  {
    screenshot: 'assets/tutorials/demo/props-panel.png',
    annotation: '2. Props Panel',
    clickTarget: { x: 85, y: 30, label: 'Props' },
    zoomRegion: { x: 85, y: 35, scale: 1.8 },
  },
  {
    screenshot: 'assets/tutorials/demo/timeline-start.png',
    annotation: '3. Timeline Start',
    clickTarget: { x: 50, y: 92, label: 'Timeline' },
    zoomRegion: { x: 50, y: 88, scale: 2 },
  },
  {
    screenshot: 'assets/tutorials/demo/timeline-middle.png',
    annotation: '4. Scrub Timeline',
    clickTarget: { x: 55, y: 92, label: 'Playhead' },
    zoomRegion: { x: 55, y: 88, scale: 2 },
  },
  {
    screenshot: 'assets/tutorials/demo/timeline-end.png',
    annotation: '5. Timeline End',
    clickTarget: { x: 75, y: 92, label: 'End' },
    zoomRegion: { x: 70, y: 88, scale: 2 },
  },
];

// ═══════════════════════════════════════════════════════════════════════════
// EDITING PROPS PRESET
// Props panel interaction workflow
// ═══════════════════════════════════════════════════════════════════════════

export const EDITING_PROPS_SLIDES: SlideConfig[] = [
  {
    screenshot: 'assets/tutorials/demo/studio-overview.png',
    annotation: '1. Open Studio',
    clickTarget: { x: 85, y: 15, label: 'Props Tab' },
  },
  {
    screenshot: 'assets/tutorials/demo/props-open.png',
    annotation: '2. Open Props Panel',
    clickTarget: { x: 85, y: 30, label: 'Click Props' },
    zoomRegion: { x: 85, y: 35, scale: 1.8 },
  },
  {
    screenshot: 'assets/tutorials/demo/props-hover.png',
    annotation: '3. Find Property',
    clickTarget: { x: 85, y: 45, label: 'Text Field' },
    zoomRegion: { x: 85, y: 45, scale: 2 },
  },
  {
    screenshot: 'assets/tutorials/demo/text-field-focus.png',
    annotation: '4. Click to Edit',
    clickTarget: { x: 85, y: 50, label: 'Edit Value' },
    zoomRegion: { x: 85, y: 50, scale: 2.2 },
  },
  {
    screenshot: 'assets/tutorials/demo/text-edited.png',
    annotation: '5. See Changes',
    clickTarget: { x: 50, y: 50, label: 'Preview Updates' },
  },
];

// ═══════════════════════════════════════════════════════════════════════════
// CLI RENDERING PRESET
// Terminal command workflow
// ═══════════════════════════════════════════════════════════════════════════

export const CLI_RENDERING_SLIDES: SlideConfig[] = [
  {
    screenshot: 'assets/tutorials/demo/terminal-empty.png',
    annotation: '1. Open Terminal',
    clickTarget: { x: 50, y: 50, label: 'Terminal' },
  },
  {
    screenshot: 'assets/tutorials/demo/terminal-command.png',
    annotation: '2. Enter Command',
    clickTarget: { x: 50, y: 55, label: 'npx remotion render' },
    zoomRegion: { x: 50, y: 55, scale: 1.8 },
  },
  {
    screenshot: 'assets/tutorials/demo/terminal-progress.png',
    annotation: '3. Watch Progress',
    clickTarget: { x: 50, y: 60, label: 'Rendering...' },
    zoomRegion: { x: 50, y: 60, scale: 1.6 },
  },
  {
    screenshot: 'assets/tutorials/demo/terminal-complete.png',
    annotation: '4. Complete!',
    clickTarget: { x: 50, y: 65, label: 'Output File' },
    zoomRegion: { x: 50, y: 65, scale: 1.8 },
  },
];

// ═══════════════════════════════════════════════════════════════════════════
// COMPOSITION STRUCTURE PRESET
// Understanding compositions
// ═══════════════════════════════════════════════════════════════════════════

export const COMPOSITION_STRUCTURE_SLIDES: SlideConfig[] = [
  {
    screenshot: 'assets/tutorials/demo/studio-overview.png',
    annotation: '1. Composition List',
    clickTarget: { x: 15, y: 30, label: 'Compositions' },
    zoomRegion: { x: 15, y: 40, scale: 1.8 },
  },
  {
    screenshot: 'assets/tutorials/demo/studio-overview.png',
    annotation: '2. Select Composition',
    clickTarget: { x: 15, y: 50, label: 'Click to Select' },
    zoomRegion: { x: 15, y: 50, scale: 2 },
  },
  {
    screenshot: 'assets/tutorials/demo/props-panel.png',
    annotation: '3. View Properties',
    clickTarget: { x: 85, y: 30, label: 'Composition Props' },
    zoomRegion: { x: 85, y: 35, scale: 1.8 },
  },
  {
    screenshot: 'assets/tutorials/demo/timeline-start.png',
    annotation: '4. Timeline Structure',
    clickTarget: { x: 50, y: 92, label: 'Sequences' },
    zoomRegion: { x: 50, y: 88, scale: 2 },
  },
];

// ═══════════════════════════════════════════════════════════════════════════
// CUSTOM THEMES PRESET
// Theme customization
// ═══════════════════════════════════════════════════════════════════════════

export const CUSTOM_THEMES_SLIDES: SlideConfig[] = [
  {
    screenshot: 'assets/tutorials/demo/props-panel.png',
    annotation: '1. Find Theme Props',
    clickTarget: { x: 85, y: 25, label: 'Theme Settings' },
    zoomRegion: { x: 85, y: 30, scale: 1.8 },
  },
  {
    screenshot: 'assets/tutorials/demo/props-hover.png',
    annotation: '2. Color Properties',
    clickTarget: { x: 85, y: 40, label: 'Primary Color' },
    zoomRegion: { x: 85, y: 40, scale: 2 },
  },
  {
    screenshot: 'assets/tutorials/demo/text-field-focus.png',
    annotation: '3. Edit Colors',
    clickTarget: { x: 85, y: 45, label: 'Enter Hex Code' },
    zoomRegion: { x: 85, y: 45, scale: 2.2 },
  },
  {
    screenshot: 'assets/tutorials/demo/text-edited.png',
    annotation: '4. Preview Theme',
    clickTarget: { x: 50, y: 50, label: 'See Changes' },
  },
];

// ═══════════════════════════════════════════════════════════════════════════
// BRAND INTEGRATION PRESET
// Adding brand assets
// ═══════════════════════════════════════════════════════════════════════════

export const BRAND_INTEGRATION_SLIDES: SlideConfig[] = [
  {
    screenshot: 'assets/tutorials/demo/props-panel.png',
    annotation: '1. Find Logo Prop',
    clickTarget: { x: 85, y: 35, label: 'Logo URL' },
    zoomRegion: { x: 85, y: 35, scale: 1.8 },
  },
  {
    screenshot: 'assets/tutorials/demo/props-hover.png',
    annotation: '2. Enter Asset Path',
    clickTarget: { x: 85, y: 45, label: '/images/logo.png' },
    zoomRegion: { x: 85, y: 45, scale: 2 },
  },
  {
    screenshot: 'assets/tutorials/demo/text-edited.png',
    annotation: '3. Logo Appears',
    clickTarget: { x: 30, y: 30, label: 'Brand Logo' },
    zoomRegion: { x: 30, y: 30, scale: 1.8 },
  },
  {
    screenshot: 'assets/tutorials/demo/props-panel.png',
    annotation: '4. Brand Colors',
    clickTarget: { x: 85, y: 50, label: 'Brand Palette' },
    zoomRegion: { x: 85, y: 50, scale: 1.8 },
  },
];

// ═══════════════════════════════════════════════════════════════════════════
// LAYOUT MODIFICATIONS PRESET
// Adjusting layouts
// ═══════════════════════════════════════════════════════════════════════════

export const LAYOUT_MODIFICATIONS_SLIDES: SlideConfig[] = [
  {
    screenshot: 'assets/tutorials/demo/props-panel.png',
    annotation: '1. Layout Props',
    clickTarget: { x: 85, y: 30, label: 'Layout Settings' },
    zoomRegion: { x: 85, y: 35, scale: 1.8 },
  },
  {
    screenshot: 'assets/tutorials/demo/props-hover.png',
    annotation: '2. Adjust Spacing',
    clickTarget: { x: 85, y: 45, label: 'Padding/Margin' },
    zoomRegion: { x: 85, y: 45, scale: 2 },
  },
  {
    screenshot: 'assets/tutorials/demo/text-field-focus.png',
    annotation: '3. Change Values',
    clickTarget: { x: 85, y: 50, label: 'Enter Number' },
    zoomRegion: { x: 85, y: 50, scale: 2.2 },
  },
  {
    screenshot: 'assets/tutorials/demo/text-edited.png',
    annotation: '4. See Layout Change',
    clickTarget: { x: 50, y: 50, label: 'Updated Layout' },
  },
];

// ═══════════════════════════════════════════════════════════════════════════
// LAMBDA DEPLOYMENT PRESET
// Cloud rendering setup
// ═══════════════════════════════════════════════════════════════════════════

export const LAMBDA_DEPLOYMENT_SLIDES: SlideConfig[] = [
  {
    screenshot: 'assets/tutorials/demo/terminal-empty.png',
    annotation: '1. Configure AWS',
    clickTarget: { x: 50, y: 40, label: 'AWS Credentials' },
  },
  {
    screenshot: 'assets/tutorials/demo/terminal-command.png',
    annotation: '2. Deploy Function',
    clickTarget: { x: 50, y: 55, label: 'npx remotion lambda' },
    zoomRegion: { x: 50, y: 55, scale: 1.8 },
  },
  {
    screenshot: 'assets/tutorials/demo/terminal-progress.png',
    annotation: '3. Deploying...',
    clickTarget: { x: 50, y: 60, label: 'Upload Progress' },
    zoomRegion: { x: 50, y: 60, scale: 1.6 },
  },
  {
    screenshot: 'assets/tutorials/demo/terminal-complete.png',
    annotation: '4. Ready to Render',
    clickTarget: { x: 50, y: 65, label: 'Function ARN' },
    zoomRegion: { x: 50, y: 65, scale: 1.8 },
  },
];

// ═══════════════════════════════════════════════════════════════════════════
// COMBINED TUTORIAL PRESETS OBJECT
// Maps preset names to their slide configurations
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Combined object mapping tutorial preset names to their slide arrays.
 * Used for easy lookup by preset name.
 */
export const TUTORIAL_PRESETS: Record<string, SlideConfig[]> = {
  'studio-basics': STUDIO_BASICS_SLIDES,
  'editing-props': EDITING_PROPS_SLIDES,
  'cli-rendering': CLI_RENDERING_SLIDES,
  'composition-structure': COMPOSITION_STRUCTURE_SLIDES,
  'custom-themes': CUSTOM_THEMES_SLIDES,
  'brand-integration': BRAND_INTEGRATION_SLIDES,
  'layout-modifications': LAYOUT_MODIFICATIONS_SLIDES,
  'lambda-deployment': LAMBDA_DEPLOYMENT_SLIDES,
};

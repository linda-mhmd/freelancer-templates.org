/**
 * Showcase Presets - 4 showcase page slide configurations
 *
 * This file contains the 4 showcase presets for the showcase tips pages.
 * Each preset defines a sequence of slides demonstrating template workflows
 * for specific use cases.
 *
 * Presets:
 * - showcase-testimonials: Client testimonial template workflows
 * - showcase-product-launches: Product launch template workflows
 * - showcase-social-content: Social media content template workflows
 * - showcase-educational: Educational content template workflows
 *
 * Requirements: 1.1, 1.2, 1.3, 1.4, 1.5
 */

import type { SlideConfig } from './types';

// ═══════════════════════════════════════════════════════════════════════════
// SHOWCASE TESTIMONIALS PRESET
// Client testimonial template workflows
// ═══════════════════════════════════════════════════════════════════════════

export const SHOWCASE_TESTIMONIALS_SLIDES: SlideConfig[] = [
  {
    screenshot: 'tutorials/showcase/testimonials/browse-templates.png',
    annotation: '1. Browse Testimonial Templates',
    clickTarget: { x: 50, y: 50, label: 'Template Library' },
  },
  {
    screenshot: 'tutorials/showcase/testimonials/select-template.png',
    annotation: '2. Select a Template',
    clickTarget: { x: 30, y: 40, label: 'Testimonial' },
    zoomRegion: { x: 30, y: 40, scale: 1.8 },
  },
  {
    screenshot: 'tutorials/showcase/testimonials/customize-quote.png',
    annotation: '3. Add Customer Quote',
    clickTarget: { x: 85, y: 35, label: 'Quote Text' },
    zoomRegion: { x: 85, y: 35, scale: 2.0 },
  },
  {
    screenshot: 'tutorials/showcase/testimonials/add-branding.png',
    annotation: '4. Apply Brand Colors',
    clickTarget: { x: 85, y: 50, label: 'Theme' },
    zoomRegion: { x: 85, y: 50, scale: 1.8 },
  },
  {
    screenshot: 'tutorials/showcase/testimonials/render-video.png',
    annotation: '5. Render & Share',
    clickTarget: { x: 50, y: 50, label: 'Export' },
  },
];

// ═══════════════════════════════════════════════════════════════════════════
// SHOWCASE PRODUCT LAUNCHES PRESET
// Product launch template workflows
// ═══════════════════════════════════════════════════════════════════════════

export const SHOWCASE_PRODUCT_LAUNCHES_SLIDES: SlideConfig[] = [
  {
    screenshot: 'tutorials/showcase/product-launches/select-launch-template.png',
    annotation: '1. Choose Launch Template',
    clickTarget: { x: 40, y: 45, label: 'Product Launch' },
  },
  {
    screenshot: 'tutorials/showcase/product-launches/add-product-image.png',
    annotation: '2. Add Product Image',
    clickTarget: { x: 85, y: 30, label: 'Image URL' },
    zoomRegion: { x: 85, y: 35, scale: 1.8 },
  },
  {
    screenshot: 'tutorials/showcase/product-launches/set-features.png',
    annotation: '3. Highlight Features',
    clickTarget: { x: 85, y: 45, label: 'Features List' },
    zoomRegion: { x: 85, y: 45, scale: 2.0 },
  },
  {
    screenshot: 'tutorials/showcase/product-launches/add-countdown.png',
    annotation: '4. Set Launch Date',
    clickTarget: { x: 85, y: 55, label: 'Countdown' },
    zoomRegion: { x: 85, y: 55, scale: 1.8 },
  },
  {
    screenshot: 'tutorials/showcase/product-launches/preview-render.png',
    annotation: '5. Preview & Render',
    clickTarget: { x: 50, y: 50, label: 'Preview' },
  },
];

// ═══════════════════════════════════════════════════════════════════════════
// SHOWCASE SOCIAL CONTENT PRESET
// Social media content template workflows
// ═══════════════════════════════════════════════════════════════════════════

export const SHOWCASE_SOCIAL_CONTENT_SLIDES: SlideConfig[] = [
  {
    screenshot: 'tutorials/showcase/social-content/browse-social-templates.png',
    annotation: '1. Browse Social Templates',
    clickTarget: { x: 45, y: 50, label: 'Social Media' },
  },
  {
    screenshot: 'tutorials/showcase/social-content/select-format.png',
    annotation: '2. Select Format',
    clickTarget: { x: 30, y: 45, label: 'Story/Reel/Post' },
    zoomRegion: { x: 30, y: 45, scale: 1.8 },
  },
  {
    screenshot: 'tutorials/showcase/social-content/add-content.png',
    annotation: '3. Add Your Content',
    clickTarget: { x: 85, y: 40, label: 'Text & Media' },
    zoomRegion: { x: 85, y: 40, scale: 2.0 },
  },
  {
    screenshot: 'tutorials/showcase/social-content/customize-style.png',
    annotation: '4. Customize Style',
    clickTarget: { x: 85, y: 55, label: 'Colors & Fonts' },
    zoomRegion: { x: 85, y: 55, scale: 1.8 },
  },
  {
    screenshot: 'tutorials/showcase/social-content/export-share.png',
    annotation: '5. Export & Share',
    clickTarget: { x: 50, y: 50, label: 'Download' },
  },
];

// ═══════════════════════════════════════════════════════════════════════════
// SHOWCASE EDUCATIONAL PRESET
// Educational content template workflows
// ═══════════════════════════════════════════════════════════════════════════

export const SHOWCASE_EDUCATIONAL_SLIDES: SlideConfig[] = [
  {
    screenshot: 'tutorials/showcase/educational/browse-educational-templates.png',
    annotation: '1. Browse Educational Templates',
    clickTarget: { x: 45, y: 50, label: 'Educational' },
  },
  {
    screenshot: 'tutorials/showcase/educational/select-lesson-type.png',
    annotation: '2. Select Lesson Type',
    clickTarget: { x: 30, y: 45, label: 'Tutorial/Course' },
    zoomRegion: { x: 30, y: 45, scale: 1.8 },
  },
  {
    screenshot: 'tutorials/showcase/educational/add-lesson-content.png',
    annotation: '3. Add Lesson Content',
    clickTarget: { x: 85, y: 40, label: 'Slides & Text' },
    zoomRegion: { x: 85, y: 40, scale: 2.0 },
  },
  {
    screenshot: 'tutorials/showcase/educational/add-visuals.png',
    annotation: '4. Add Visual Aids',
    clickTarget: { x: 85, y: 55, label: 'Diagrams & Charts' },
    zoomRegion: { x: 85, y: 55, scale: 1.8 },
  },
  {
    screenshot: 'tutorials/showcase/educational/render-course.png',
    annotation: '5. Render Course Video',
    clickTarget: { x: 50, y: 50, label: 'Render All' },
  },
];

// ═══════════════════════════════════════════════════════════════════════════
// COMBINED SHOWCASE PRESETS OBJECT
// Maps preset names to their slide configurations
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Combined object mapping showcase preset names to their slide arrays.
 * Used for easy lookup by preset name.
 */
export const SHOWCASE_PRESETS: Record<string, SlideConfig[]> = {
  'showcase-testimonials': SHOWCASE_TESTIMONIALS_SLIDES,
  'showcase-product-launches': SHOWCASE_PRODUCT_LAUNCHES_SLIDES,
  'showcase-social-content': SHOWCASE_SOCIAL_CONTENT_SLIDES,
  'showcase-educational': SHOWCASE_EDUCATIONAL_SLIDES,
};

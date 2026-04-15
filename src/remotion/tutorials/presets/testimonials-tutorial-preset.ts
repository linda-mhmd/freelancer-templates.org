/**
 * Testimonials Tutorial Preset - 6-slide tutorial for creating testimonial videos
 *
 * This preset demonstrates the complete end-to-end workflow:
 * 1. Visit freelancer-templates.org homepage
 * 2. Select Testimonials Template from library
 * 3. Customize Brand Colors in Remotion Studio
 * 4. Edit Testimonial Content
 * 5. Preview Your Video
 * 6. Export Final Video
 *
 * Requirements: 1.1-1.9, 2.1-2.5, 3.1-3.9, 4.1-4.6, 5.1-5.6, 10.1-10.7
 */

import type { SlideConfig } from './types';

// ═══════════════════════════════════════════════════════════════════════════
// TESTIMONIALS TUTORIAL PRESET
// Complete end-to-end workflow for creating testimonial videos
// ═══════════════════════════════════════════════════════════════════════════

export const TESTIMONIALS_TUTORIAL_SLIDES: SlideConfig[] = [
  // Slide 1: Visit freelancer-templates.org Homepage
  {
    screenshot: 'assets/tutorials/testimonials-tutorial/01-landing-page.png',
    annotation: 'Step 1: Visit freelancer-templates.org',
    clickTarget: {
      x: 75,
      y: 8,
      label: 'Template Library',
    },
  },

  // Slide 2: Select Testimonials Template from Library
  {
    screenshot: 'assets/tutorials/testimonials-tutorial/02-template-library.png',
    annotation: 'Step 2: Select Testimonials Template',
    clickTarget: {
      x: 30,
      y: 45,
    },
    zoomRegion: {
      x: 30,
      y: 45,
      scale: 1.8,
    },
  },

  // Slide 3: Customize Brand Colors in Remotion Studio
  {
    screenshot: 'assets/tutorials/testimonials-tutorial/03-brand-settings.png',
    annotation: 'Step 3: Customize Brand Colors',
    clickTarget: {
      x: 85,
      y: 35,
    },
    zoomRegion: {
      x: 85,
      y: 35,
      scale: 2.0,
    },
  },

  // Slide 4: Edit Testimonial Content
  {
    screenshot: 'assets/tutorials/testimonials-tutorial/04-testimonial-content.png',
    annotation: 'Step 4: Edit Testimonial Content',
    clickTarget: {
      x: 85,
      y: 50,
    },
    zoomRegion: {
      x: 85,
      y: 50,
      scale: 2.0,
    },
  },

  // Slide 5: Preview Your Video
  {
    screenshot: 'assets/tutorials/testimonials-tutorial/05-preview-video.png',
    annotation: 'Step 5: Preview Your Video',
    clickTarget: {
      x: 50,
      y: 85,
      label: 'Play Preview',
    },
  },

  // Slide 6: Export Final Video
  {
    screenshot: 'assets/tutorials/testimonials-tutorial/06-export-video.png',
    annotation: 'Step 6: Export Final Video',
    clickTarget: {
      x: 50,
      y: 50,
      label: 'Render Video',
    },
  },
];

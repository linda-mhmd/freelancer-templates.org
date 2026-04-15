/**
 * Preset Index - Barrel exports for all screencast slideshow presets
 *
 * This file serves as the central export point for all preset modules.
 * It combines all 17 presets into a single SLIDE_PRESETS record and
 * exports preset metadata for batch rendering.
 *
 * Requirements: 1.5, 2.5, 9.1
 */

// Re-export all types
export * from './types';

import type { SlideConfig, PresetDefinition } from './types';

// ═══════════════════════════════════════════════════════════════════════════
// PRESET IMPORTS
// These imports will be uncommented as the preset files are created
// ═══════════════════════════════════════════════════════════════════════════

// Tutorial presets (8 existing) - Task 2.1
import {
  STUDIO_BASICS_SLIDES,
  EDITING_PROPS_SLIDES,
  CLI_RENDERING_SLIDES,
  COMPOSITION_STRUCTURE_SLIDES,
  CUSTOM_THEMES_SLIDES,
  BRAND_INTEGRATION_SLIDES,
  LAYOUT_MODIFICATIONS_SLIDES,
  LAMBDA_DEPLOYMENT_SLIDES,
  TUTORIAL_PRESETS,
} from './tutorial-presets';

// Showcase presets (4 new) - Task 4.1
import {
  SHOWCASE_TESTIMONIALS_SLIDES,
  SHOWCASE_PRODUCT_LAUNCHES_SLIDES,
  SHOWCASE_SOCIAL_CONTENT_SLIDES,
  SHOWCASE_EDUCATIONAL_SLIDES,
  SHOWCASE_PRESETS,
} from './showcase-presets';

// Project presets (4 new) - Task 5.1
import {
  PROJECT_AGENCY_WORKFLOW_SLIDES,
  PROJECT_CONTENT_CREATOR_SLIDES,
  PROJECT_FREELANCER_PORTFOLIO_SLIDES,
  PROJECT_SAAS_MARKETING_SLIDES,
  PROJECT_PRESETS,
} from './project-presets';

// Design tips preset (1 new) - Task 6.1
import {
  VIDEO_DESIGN_TIPS_SLIDES,
  DESIGN_TIPS_PRESETS,
} from './design-tips-preset';

// Testimonials tutorial preset - Task 5.1
import { TESTIMONIALS_TUTORIAL_SLIDES } from './testimonials-tutorial-preset';

// ═══════════════════════════════════════════════════════════════════════════
// COMBINED SLIDE PRESETS
// This record will be populated as preset files are created
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Combined record of all 17 slide presets.
 * Maps preset names (kebab-case) to their slide configurations.
 *
 * Categories:
 * - Tutorial presets (8): studio-basics, editing-props, cli-rendering,
 *   composition-structure, custom-themes, brand-integration,
 *   layout-modifications, lambda-deployment
 * - Showcase presets (4): showcase-testimonials, showcase-product-launches,
 *   showcase-social-content, showcase-educational
 * - Project presets (4): project-agency-workflow, project-content-creator,
 *   project-freelancer-portfolio, project-saas-marketing
 * - Special presets (1): video-design-tips
 */
export const SLIDE_PRESETS: Record<string, SlideConfig[]> = {
  // Tutorial presets (8) - populated from tutorial-presets.ts
  'studio-basics': STUDIO_BASICS_SLIDES,
  'editing-props': EDITING_PROPS_SLIDES,
  'cli-rendering': CLI_RENDERING_SLIDES,
  'composition-structure': COMPOSITION_STRUCTURE_SLIDES,
  'custom-themes': CUSTOM_THEMES_SLIDES,
  'brand-integration': BRAND_INTEGRATION_SLIDES,
  'layout-modifications': LAYOUT_MODIFICATIONS_SLIDES,
  'lambda-deployment': LAMBDA_DEPLOYMENT_SLIDES,

  // Showcase presets (4) - populated from showcase-presets.ts
  'showcase-testimonials': SHOWCASE_TESTIMONIALS_SLIDES,
  'showcase-product-launches': SHOWCASE_PRODUCT_LAUNCHES_SLIDES,
  'showcase-social-content': SHOWCASE_SOCIAL_CONTENT_SLIDES,
  'showcase-educational': SHOWCASE_EDUCATIONAL_SLIDES,

  // Project presets (4) - populated from project-presets.ts
  'project-agency-workflow': PROJECT_AGENCY_WORKFLOW_SLIDES,
  'project-content-creator': PROJECT_CONTENT_CREATOR_SLIDES,
  'project-freelancer-portfolio': PROJECT_FREELANCER_PORTFOLIO_SLIDES,
  'project-saas-marketing': PROJECT_SAAS_MARKETING_SLIDES,

  // Special presets (1) - populated from design-tips-preset.ts
  'video-design-tips': VIDEO_DESIGN_TIPS_SLIDES,

  // Testimonials tutorial preset
  'testimonials-tutorial': TESTIMONIALS_TUTORIAL_SLIDES,
};

// ═══════════════════════════════════════════════════════════════════════════
// PRESET METADATA FOR BATCH RENDERING
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Metadata for all 17 presets, used by batch rendering scripts.
 * Each entry contains the preset ID, display name, category, and slide count.
 *
 * Requirements: 9.1
 */
export const PRESET_METADATA: PresetDefinition[] = [
  // Tutorial presets (8 existing)
  {
    id: 'studio-basics',
    name: 'Remotion Studio Basics',
    category: 'tutorial',
    slides: [], // Will be populated when tutorial-presets.ts is created
    frameDuration: 90,
    transitionDuration: 15,
  },
  {
    id: 'editing-props',
    name: 'Editing Props',
    category: 'tutorial',
    slides: [],
    frameDuration: 90,
    transitionDuration: 15,
  },
  {
    id: 'cli-rendering',
    name: 'CLI Rendering',
    category: 'tutorial',
    slides: [],
    frameDuration: 90,
    transitionDuration: 15,
  },
  {
    id: 'composition-structure',
    name: 'Composition Structure',
    category: 'tutorial',
    slides: [],
    frameDuration: 90,
    transitionDuration: 15,
  },
  {
    id: 'custom-themes',
    name: 'Custom Themes',
    category: 'tutorial',
    slides: [],
    frameDuration: 90,
    transitionDuration: 15,
  },
  {
    id: 'brand-integration',
    name: 'Brand Integration',
    category: 'tutorial',
    slides: [],
    frameDuration: 90,
    transitionDuration: 15,
  },
  {
    id: 'layout-modifications',
    name: 'Layout Modifications',
    category: 'tutorial',
    slides: [],
    frameDuration: 90,
    transitionDuration: 15,
  },
  {
    id: 'lambda-deployment',
    name: 'Lambda Deployment',
    category: 'tutorial',
    slides: [],
    frameDuration: 90,
    transitionDuration: 15,
  },

  // Showcase presets (4 new)
  {
    id: 'showcase-testimonials',
    name: 'Testimonial Showcase',
    category: 'showcase',
    slides: [],
    frameDuration: 90,
    transitionDuration: 15,
  },
  {
    id: 'showcase-product-launches',
    name: 'Product Launch Showcase',
    category: 'showcase',
    slides: [],
    frameDuration: 90,
    transitionDuration: 15,
  },
  {
    id: 'showcase-social-content',
    name: 'Social Content Showcase',
    category: 'showcase',
    slides: [],
    frameDuration: 90,
    transitionDuration: 15,
  },
  {
    id: 'showcase-educational',
    name: 'Educational Showcase',
    category: 'showcase',
    slides: [],
    frameDuration: 90,
    transitionDuration: 15,
  },

  // Project presets (4 new)
  {
    id: 'project-agency-workflow',
    name: 'Agency Workflow',
    category: 'project',
    slides: [],
    frameDuration: 90,
    transitionDuration: 15,
  },
  {
    id: 'project-content-creator',
    name: 'Content Creator',
    category: 'project',
    slides: [],
    frameDuration: 90,
    transitionDuration: 15,
  },
  {
    id: 'project-freelancer-portfolio',
    name: 'Freelancer Portfolio',
    category: 'project',
    slides: [],
    frameDuration: 90,
    transitionDuration: 15,
  },
  {
    id: 'project-saas-marketing',
    name: 'SaaS Marketing',
    category: 'project',
    slides: [],
    frameDuration: 90,
    transitionDuration: 15,
  },

  // Special presets (1 new)
  {
    id: 'video-design-tips',
    name: 'Video Design Tips',
    category: 'special',
    slides: [],
    frameDuration: 90,
    transitionDuration: 15,
  },

  // Testimonials tutorial preset
  {
    id: 'testimonials-tutorial',
    name: 'Testimonials Tutorial',
    category: 'tutorial',
    slides: [],
    frameDuration: 90,
    transitionDuration: 15,
  },
];

// ═══════════════════════════════════════════════════════════════════════════
// HELPER FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Get all preset IDs as an array.
 */
export function getAllPresetIds(): string[] {
  return PRESET_METADATA.map((preset) => preset.id);
}

/**
 * Get presets filtered by category.
 */
export function getPresetsByCategory(
  category: 'tutorial' | 'showcase' | 'project' | 'special'
): PresetDefinition[] {
  return PRESET_METADATA.filter((preset) => preset.category === category);
}

/**
 * Get a preset definition by ID.
 */
export function getPresetById(id: string): PresetDefinition | undefined {
  return PRESET_METADATA.find((preset) => preset.id === id);
}

/**
 * Check if a preset ID exists.
 */
export function isValidPresetId(id: string): boolean {
  return PRESET_METADATA.some((preset) => preset.id === id);
}

/**
 * Get the slide count for a preset.
 * Returns the actual slide count from SLIDE_PRESETS if available,
 * otherwise returns 5 as the default expected count.
 */
export function getPresetSlideCount(id: string): number {
  const slides = SLIDE_PRESETS[id];
  return slides ? slides.length : 5; // Default to 5 slides per preset
}

/**
 * Calculate the duration in frames for a preset.
 * Uses frameDuration (default 90) × slideCount.
 */
export function getPresetDurationInFrames(
  id: string,
  frameDuration: number = 90
): number {
  return getPresetSlideCount(id) * frameDuration;
}

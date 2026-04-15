/**
 * Project Presets - 4 project page slide configurations
 *
 * This file contains the 4 project presets for the project tips pages.
 * Each preset defines a sequence of slides demonstrating template workflows
 * for specific professional use cases.
 *
 * Presets:
 * - project-agency-workflow: Agency workflow automation
 * - project-content-creator: Content creator setup and workflows
 * - project-freelancer-portfolio: Freelancer portfolio creation
 * - project-saas-marketing: SaaS marketing video production
 *
 * Requirements: 2.1, 2.2, 2.3, 2.4, 2.5
 */

import type { SlideConfig } from './types';

// ═══════════════════════════════════════════════════════════════════════════
// PROJECT AGENCY WORKFLOW PRESET
// Agency workflow automation demonstrating client-to-delivery pipeline
// ═══════════════════════════════════════════════════════════════════════════

export const PROJECT_AGENCY_WORKFLOW_SLIDES: SlideConfig[] = [
  {
    screenshot: 'tutorials/project/agency-workflow/client-brief.png',
    annotation: '1. Receive Client Brief',
    clickTarget: { x: 50, y: 40, label: 'Brief Document' },
  },
  {
    screenshot: 'tutorials/project/agency-workflow/template-selection.png',
    annotation: '2. Select Template',
    clickTarget: { x: 30, y: 50, label: 'Client Report' },
    zoomRegion: { x: 30, y: 50, scale: 1.8 },
  },
  {
    screenshot: 'tutorials/project/agency-workflow/brand-setup.png',
    annotation: '3. Apply Client Brand',
    clickTarget: { x: 85, y: 35, label: 'Brand Colors' },
    zoomRegion: { x: 85, y: 35, scale: 2.0 },
  },
  {
    screenshot: 'tutorials/project/agency-workflow/content-entry.png',
    annotation: '4. Enter Content',
    clickTarget: { x: 85, y: 50, label: 'Props Panel' },
    zoomRegion: { x: 85, y: 50, scale: 1.8 },
  },
  {
    screenshot: 'tutorials/project/agency-workflow/batch-render.png',
    annotation: '5. Batch Render Deliverables',
    clickTarget: { x: 50, y: 60, label: 'Render All' },
  },
];

// ═══════════════════════════════════════════════════════════════════════════
// PROJECT CONTENT CREATOR PRESET
// Content creator setup demonstrating streamlined content production
// ═══════════════════════════════════════════════════════════════════════════

export const PROJECT_CONTENT_CREATOR_SLIDES: SlideConfig[] = [
  {
    screenshot: 'tutorials/project/content-creator/setup-workspace.png',
    annotation: '1. Set Up Workspace',
    clickTarget: { x: 45, y: 45, label: 'Project Folder' },
  },
  {
    screenshot: 'tutorials/project/content-creator/choose-format.png',
    annotation: '2. Choose Content Format',
    clickTarget: { x: 30, y: 50, label: 'Video Format' },
    zoomRegion: { x: 30, y: 50, scale: 1.8 },
  },
  {
    screenshot: 'tutorials/project/content-creator/customize-template.png',
    annotation: '3. Customize Template',
    clickTarget: { x: 85, y: 40, label: 'Style Options' },
    zoomRegion: { x: 85, y: 40, scale: 2.0 },
  },
  {
    screenshot: 'tutorials/project/content-creator/add-media.png',
    annotation: '4. Add Your Media',
    clickTarget: { x: 85, y: 55, label: 'Media Upload' },
    zoomRegion: { x: 85, y: 55, scale: 1.8 },
  },
  {
    screenshot: 'tutorials/project/content-creator/export-platforms.png',
    annotation: '5. Export for Platforms',
    clickTarget: { x: 50, y: 50, label: 'Export Options' },
  },
];

// ═══════════════════════════════════════════════════════════════════════════
// PROJECT FREELANCER PORTFOLIO PRESET
// Freelancer portfolio creation demonstrating professional showcase
// ═══════════════════════════════════════════════════════════════════════════

export const PROJECT_FREELANCER_PORTFOLIO_SLIDES: SlideConfig[] = [
  {
    screenshot: 'tutorials/project/freelancer-portfolio/select-portfolio-template.png',
    annotation: '1. Select Portfolio Template',
    clickTarget: { x: 40, y: 45, label: 'Portfolio' },
  },
  {
    screenshot: 'tutorials/project/freelancer-portfolio/add-projects.png',
    annotation: '2. Add Your Projects',
    clickTarget: { x: 85, y: 35, label: 'Project List' },
    zoomRegion: { x: 85, y: 35, scale: 1.8 },
  },
  {
    screenshot: 'tutorials/project/freelancer-portfolio/customize-branding.png',
    annotation: '3. Customize Branding',
    clickTarget: { x: 85, y: 45, label: 'Personal Brand' },
    zoomRegion: { x: 85, y: 45, scale: 2.0 },
  },
  {
    screenshot: 'tutorials/project/freelancer-portfolio/add-testimonials.png',
    annotation: '4. Add Client Testimonials',
    clickTarget: { x: 85, y: 55, label: 'Testimonials' },
    zoomRegion: { x: 85, y: 55, scale: 1.8 },
  },
  {
    screenshot: 'tutorials/project/freelancer-portfolio/render-showreel.png',
    annotation: '5. Render Showreel',
    clickTarget: { x: 50, y: 50, label: 'Render Video' },
  },
];

// ═══════════════════════════════════════════════════════════════════════════
// PROJECT SAAS MARKETING PRESET
// SaaS marketing video production demonstrating product promotion
// ═══════════════════════════════════════════════════════════════════════════

export const PROJECT_SAAS_MARKETING_SLIDES: SlideConfig[] = [
  {
    screenshot: 'tutorials/project/saas-marketing/choose-marketing-template.png',
    annotation: '1. Choose Marketing Template',
    clickTarget: { x: 40, y: 45, label: 'SaaS Promo' },
  },
  {
    screenshot: 'tutorials/project/saas-marketing/add-product-screenshots.png',
    annotation: '2. Add Product Screenshots',
    clickTarget: { x: 85, y: 35, label: 'Screenshots' },
    zoomRegion: { x: 85, y: 35, scale: 1.8 },
  },
  {
    screenshot: 'tutorials/project/saas-marketing/highlight-features.png',
    annotation: '3. Highlight Key Features',
    clickTarget: { x: 85, y: 45, label: 'Feature List' },
    zoomRegion: { x: 85, y: 45, scale: 2.0 },
  },
  {
    screenshot: 'tutorials/project/saas-marketing/add-cta.png',
    annotation: '4. Add Call-to-Action',
    clickTarget: { x: 85, y: 55, label: 'CTA Button' },
    zoomRegion: { x: 85, y: 55, scale: 1.8 },
  },
  {
    screenshot: 'tutorials/project/saas-marketing/render-ad-formats.png',
    annotation: '5. Render Ad Formats',
    clickTarget: { x: 50, y: 50, label: 'Export Ads' },
  },
];

// ═══════════════════════════════════════════════════════════════════════════
// COMBINED PROJECT PRESETS OBJECT
// Maps preset names to their slide configurations
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Combined object mapping project preset names to their slide arrays.
 * Used for easy lookup by preset name.
 */
export const PROJECT_PRESETS: Record<string, SlideConfig[]> = {
  'project-agency-workflow': PROJECT_AGENCY_WORKFLOW_SLIDES,
  'project-content-creator': PROJECT_CONTENT_CREATOR_SLIDES,
  'project-freelancer-portfolio': PROJECT_FREELANCER_PORTFOLIO_SLIDES,
  'project-saas-marketing': PROJECT_SAAS_MARKETING_SLIDES,
};

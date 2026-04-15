---
title: "Screencast Slideshow"
description: "Animated tutorial slideshow with screenshots, cursor animations, click indicators, zoom effects, and step annotations. Perfect for software tutorials and product demos."
slug: "screencastslideshow"
camel: "ScreencastSlideshow"
icon: "film"
color: "blue"
primaryVariant: "StudioBasics"
primaryId: "ScreencastSlideshow-StudioBasics"
variantCount: 17
variants:
  # ══════════════════════════════════════════════════════════════════
  # TUTORIAL PRESETS (8 presets)
  # Core Remotion Studio tutorials for learning the platform
  # ══════════════════════════════════════════════════════════════════
  - id: "ScreencastSlideshow-StudioBasics"
    name: "Studio Basics"
    style: "tutorial"
  - id: "ScreencastSlideshow-EditingProps"
    name: "Editing Props"
    style: "tutorial"
  - id: "ScreencastSlideshow-CliRendering"
    name: "CLI Rendering"
    style: "tutorial"
  - id: "ScreencastSlideshow-CompositionStructure"
    name: "Composition Structure"
    style: "tutorial"
  - id: "ScreencastSlideshow-CustomThemes"
    name: "Custom Themes"
    style: "tutorial"
  - id: "ScreencastSlideshow-BrandIntegration"
    name: "Brand Integration"
    style: "tutorial"
  - id: "ScreencastSlideshow-LayoutModifications"
    name: "Layout Modifications"
    style: "tutorial"
  - id: "ScreencastSlideshow-LambdaDeployment"
    name: "Lambda Deployment"
    style: "tutorial"
  # ══════════════════════════════════════════════════════════════════
  # SHOWCASE PRESETS (4 presets)
  # Use case inspiration galleries demonstrating template applications
  # ══════════════════════════════════════════════════════════════════
  - id: "ScreencastSlideshow-ShowcaseTestimonials"
    name: "Showcase Testimonials"
    style: "showcase"
  - id: "ScreencastSlideshow-ShowcaseProductLaunches"
    name: "Showcase Product Launches"
    style: "showcase"
  - id: "ScreencastSlideshow-ShowcaseSocialContent"
    name: "Showcase Social Content"
    style: "showcase"
  - id: "ScreencastSlideshow-ShowcaseEducational"
    name: "Showcase Educational"
    style: "showcase"
  # ══════════════════════════════════════════════════════════════════
  # PROJECT PRESETS (4 presets)
  # Professional workflow case studies for different industries
  # ══════════════════════════════════════════════════════════════════
  - id: "ScreencastSlideshow-ProjectAgencyWorkflow"
    name: "Project Agency Workflow"
    style: "project"
  - id: "ScreencastSlideshow-ProjectContentCreator"
    name: "Project Content Creator"
    style: "project"
  - id: "ScreencastSlideshow-ProjectFreelancerPortfolio"
    name: "Project Freelancer Portfolio"
    style: "project"
  - id: "ScreencastSlideshow-ProjectSaasMarketing"
    name: "Project SaaS Marketing"
    style: "project"
  # ══════════════════════════════════════════════════════════════════
  # DESIGN TIPS PRESET (1 preset)
  # Video design principles and best practices
  # ══════════════════════════════════════════════════════════════════
  - id: "ScreencastSlideshow-VideoDesignTips"
    name: "Video Design Tips"
    style: "design-tips"
---

Create animated UI walkthroughs that guide viewers through software workflows. Each preset includes cursor animations, click indicators, zoom effects, and step annotations to highlight important interactions.

## Use cases

- Software tutorial videos showing UI workflows
- Product demo screencasts for marketing
- Onboarding videos for new users
- Documentation walkthroughs
- Feature announcement videos

## What you get

### Tutorial Presets

Step-by-step guides for learning Remotion Studio:

- **Studio Basics** - Introduction to the Remotion Studio interface
- **Editing Props** - How to modify component properties
- **CLI Rendering** - Command-line rendering workflows
- **Composition Structure** - Understanding composition organization
- **Custom Themes** - Creating and applying custom themes
- **Brand Integration** - Adding brand colors and assets
- **Layout Modifications** - Customizing template layouts
- **Lambda Deployment** - Deploying to AWS Lambda

### Showcase Presets

Inspiration galleries demonstrating template applications:

- **Testimonials** - Creating client testimonial videos
- **Product Launches** - Building product announcement content
- **Social Content** - Producing social media video content
- **Educational** - Developing educational video materials

### Project Presets

Professional workflow case studies:

- **Agency Workflow** - Multi-client video production automation
- **Content Creator** - YouTube and social media content pipelines
- **Freelancer Portfolio** - Building a video portfolio showcase
- **SaaS Marketing** - Product marketing video production

### Design Tips Preset

- **Video Design Tips** - Typography, color, composition, motion, and brand consistency principles

## Features

- **Smooth Crossfade Transitions** - Professional transitions between screenshots
- **Animated Cursor** - Realistic cursor movement with easing
- **Click Indicators** - Visual feedback for click interactions
- **Zoom Effects** - Focus attention on important UI elements
- **Step Annotations** - Numbered callouts explaining each step

## Specifications

- **Dimensions**: 1280×720 (HD)
- **Frame Rate**: 30fps
- **Default Duration**: 15 seconds (5 slides × 3 seconds each)
- **Transition Duration**: 0.5 seconds

## Usage

Select a preset to load pre-configured slides with screenshots, click targets, and annotations. Each preset is designed for a specific tutorial topic or use case.

```typescript
// Using a preset
<ScreencastSlideshow preset="studio-basics" />

// Custom configuration
<ScreencastSlideshow
  preset="showcase-testimonials"
  frameDuration={120}  // 4 seconds per slide
  transitionDuration={20}  // Longer transitions
/>
```

## Batch Rendering

All 17 presets can be rendered in batch using the tutorial render script:

```bash
# Render all presets
npm run tutorial:render:all

# Render specific category
npm run tutorial:render -- --category=showcase
npm run tutorial:render -- --category=project
npm run tutorial:render -- --category=tutorial
```

Each render produces MP4, GIF, and poster image outputs.

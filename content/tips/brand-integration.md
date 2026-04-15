---
title: "Brand Integration"
description: "Learn how to incorporate your brand assets, logos, colors, and style guidelines into templates for consistent, professional videos."
layout: "premium-tips"

hero:
  category: "Template Customization"
  icon: "briefcase"
  title: "Master Brand Integration"
  description: "Your complete guide to incorporating brand identity into video templates. Learn to place logos correctly, apply brand colors consistently, integrate custom fonts, manage assets efficiently, and maintain style guide compliance across all your video content."
  tags:
    - "Branding"
    - "Logos"
    - "Colors"
    - "Typography"
    - "Assets"
  video:
    composition: "ScreencastSlideshow"
    props:
      preset: "brand-integration"

sections:
  - title: "Logo Placement and Sizing"
    description: "Master the art of positioning and sizing logos to maintain brand integrity while ensuring visual balance in your videos."
    columns: 3
    cards:
      - type: "rule"
        title: "Logo Clear Space"
        body: "Always maintain minimum clear space around your logo—typically equal to the height of a letter in your wordmark. This breathing room ensures your logo remains legible and impactful."
        source: "Brand Identity Guidelines"

      - type: "tip"
        title: "Common Placement Zones"
        body: "Position logos in consistent locations across your videos. The most common placements are top-left for persistent branding, bottom-right for subtle presence, and centered for intro/outro sequences."

      - type: "example"
        title: "Before: Oversized Logo"
        body: "A logo that's too large dominates the frame and distracts from the content."
        list:
          - "logoWidth: 400 (too large)"
          - "Crowds other elements"
          - "Feels unprofessional"

      - type: "example"
        title: "After: Properly Sized"
        body: "A well-sized logo complements the content without overwhelming it."
        list:
          - "logoWidth: 160 (balanced)"
          - "Maintains clear space"
          - "Professional appearance"

      - type: "rule"
        title: "Minimum Logo Size"
        body: "Never shrink logos below their minimum readable size—typically 80-100px width for horizontal logos. Smaller sizes compromise legibility and brand recognition."
        source: "Logo Usage Standards"

      - type: "tip"
        title: "Logo Variants for Context"
        body: "Prepare multiple logo versions: full color for light backgrounds, white/reversed for dark backgrounds, and a simplified mark for small spaces or watermarks."

  - title: "Brand Color Application"
    description: "Apply your brand palette strategically to create videos that are instantly recognizable while maintaining visual hierarchy."
    columns: 2
    cards:
      - type: "rule"
        title: "Color Hierarchy"
        body: "Use your primary brand color for key elements (CTAs, headlines, accents), secondary colors for supporting elements, and neutral colors for backgrounds and body text. This creates visual hierarchy and brand consistency."
        source: "Brand Color Guidelines"

      - type: "example"
        title: "Before: Generic Colors"
        body: "Default template colors don't reflect your brand identity."
        list:
          - "backgroundColor: \"#1a1a2e\""
          - "primaryColor: \"#4361ee\""
          - "accentColor: \"#f72585\""

      - type: "example"
        title: "After: Brand Colors"
        body: "Your brand palette creates instant recognition and consistency."
        list:
          - "backgroundColor: \"#0f172a\""
          - "primaryColor: \"#6366f1\""
          - "accentColor: \"#22c55e\""

      - type: "tip"
        title: "Contrast for Accessibility"
        body: "Ensure text has sufficient contrast against backgrounds. Light text on dark backgrounds (or vice versa) should have a contrast ratio of at least 4.5:1 for readability."

      - type: "rule"
        title: "Consistent Hex Codes"
        body: "Always use exact hex codes from your brand guidelines. Approximations like \"blue\" or \"green\" can vary across systems. Precise values ensure consistency: <code>#6366f1</code> not \"indigo\"."
        source: "Digital Brand Standards"

      - type: "tip"
        title: "Background Variations"
        body: "Create light and dark background variants using your brand colors. A dark mode might use your primary color at 10% opacity, while light mode uses white with colored accents."

  - title: "Font Integration"
    description: "Integrate your brand typography to maintain consistent voice and visual identity across all video content."
    columns: 2
    cards:
      - type: "rule"
        title: "Font Loading Methods"
        body: "Load brand fonts using Google Fonts integration for common typefaces, or import custom font files (TTF, OTF, WOFF2) directly into your project's public folder for proprietary fonts."
        source: "Remotion Font Documentation"

      - type: "example"
        title: "Google Fonts Integration"
        body: "For fonts available on Google Fonts, use Remotion's built-in loader for optimal performance."
        list:
          - "import { loadFont } from \"@remotion/google-fonts/Inter\""
          - "const { fontFamily } = loadFont()"
          - "Apply fontFamily to text elements"

      - type: "example"
        title: "Custom Font Files"
        body: "For proprietary brand fonts, load them from your project's static files."
        list:
          - "Place font files in public/fonts/"
          - "Use @font-face CSS declaration"
          - "Reference with staticFile() helper"

      - type: "tip"
        title: "Font Weight Consistency"
        body: "Match your brand's typography specifications exactly. If your brand uses Inter at 600 weight for headlines and 400 for body, configure these values in your template props."

      - type: "rule"
        title: "Limit Font Families"
        body: "Stick to your brand's designated font families—typically one for headlines and one for body text. Using too many fonts creates visual chaos and dilutes brand identity."
        source: "Typography Best Practices"

      - type: "tip"
        title: "Fallback Fonts"
        body: "Always specify fallback fonts in case your primary font fails to load. Use system fonts that closely match your brand font's characteristics: <code>fontFamily: \"Inter, system-ui, sans-serif\"</code>"

  - title: "Asset Management"
    description: "Organize and manage brand assets efficiently to streamline video production and ensure consistency across projects."
    columns: 3
    cards:
      - type: "rule"
        title: "Asset Organization"
        body: "Structure your brand assets in a dedicated folder hierarchy: <code>/public/brand/logos/</code>, <code>/public/brand/images/</code>, <code>/public/brand/fonts/</code>. This makes assets easy to find and update."
        source: "Project Organization Guide"

      - type: "tip"
        title: "Naming Conventions"
        body: "Use descriptive, consistent file names: <code>logo-primary-white.png</code>, <code>logo-mark-dark.svg</code>, <code>brand-pattern-01.png</code>. Clear names prevent confusion and speed up production."

      - type: "example"
        title: "Before: Scattered Assets"
        body: "Disorganized assets slow down production and cause inconsistencies."
        list:
          - "logo.png (which version?)"
          - "new-logo-final-v2.png"
          - "Assets in random folders"

      - type: "example"
        title: "After: Organized Structure"
        body: "A clear folder structure makes assets easy to find and maintain."
        list:
          - "/brand/logos/logo-primary.png"
          - "/brand/logos/logo-white.png"
          - "/brand/logos/logo-mark.svg"

      - type: "tip"
        title: "Optimize File Sizes"
        body: "Compress images appropriately for video use. Logos should be under 100KB, background images under 500KB, and full-screen assets under 2MB. Large files slow down preview rendering."

      - type: "rule"
        title: "Version Control"
        body: "Keep brand assets in version control alongside your code. When logos or colors update, commit the changes so all team members have access to the latest approved assets."
        source: "Asset Management Best Practices"

  - title: "Style Guide Compliance"
    description: "Create a centralized brand configuration to ensure every video adheres to your style guide automatically."
    columns: 2
    cards:
      - type: "rule"
        title: "Brand Config File"
        body: "Create a centralized <code>brand-config.ts</code> file that defines all brand values: colors, fonts, logo paths, spacing, and any other brand-specific settings. Import this config into every template."
        source: "Configuration Best Practices"

      - type: "example"
        title: "Brand Configuration"
        body: "A comprehensive brand config ensures consistency across all videos."
        table:
          headers:
            - "Category"
            - "Properties"
          rows:
            - ["Colors", "primary, secondary, accent, background, text"]
            - ["Typography", "fontFamily, headingWeight, bodyWeight"]
            - ["Logos", "primary, white, dark, mark"]
            - ["Spacing", "logoMargin, contentPadding, cardGap"]

      - type: "tip"
        title: "Props File for Rendering"
        body: "Create a <code>brand-props.json</code> file with your brand settings for CLI rendering. Use <code>--props=./brand-props.json</code> to apply brand values consistently across batch renders."

      - type: "example"
        title: "Before: Inconsistent Videos"
        body: "Without a brand config, each video may have slight variations."
        list:
          - "Different logo sizes per video"
          - "Color values vary slightly"
          - "Inconsistent font weights"

      - type: "example"
        title: "After: Unified Branding"
        body: "A centralized config ensures every video matches your style guide."
        list:
          - "Consistent logo placement"
          - "Exact brand colors everywhere"
          - "Typography matches guidelines"

      - type: "rule"
        title: "Regular Audits"
        body: "Periodically review your video output against your brand style guide. Check logo usage, color accuracy, typography, and overall brand feel. Update your brand config when guidelines change."
        source: "Brand Compliance Guidelines"

cta:
  title: "Ready to build your brand system?"
  description: "Now that you understand brand integration, explore our template library to find templates designed for easy brand customization. Each template supports comprehensive branding through props."
  buttons:
    - text: "Browse Templates"
      href: "/library/"
      style: "primary"
      icon: "grid"
    - text: "Custom Themes Guide"
      href: "/tips/custom-themes/"
      style: "outline"
      icon: "palette"

relatedTips:
  - slug: "editing-props"
    title: "Editing Props"
    description: "Customize text, colors, images, and timing through the props interface."
    icon: "sliders"
  - slug: "custom-themes"
    title: "Creating Custom Themes"
    description: "Build custom themes with colors, gradients, and typography that match your brand."
    icon: "palette"
  - slug: "layout-modifications"
    title: "Layout Modifications"
    description: "Adjust positioning, sizing, and element arrangement in templates."
    icon: "layout"
---

## Learn More

For comprehensive documentation on brand integration and asset management, visit the official resources:

- [Remotion Asset Documentation](https://www.remotion.dev/docs/assets)
- [Font Loading Guide](https://www.remotion.dev/docs/fonts)
- [Static Files Reference](https://www.remotion.dev/docs/staticfile)
- [Props and Configuration](https://www.remotion.dev/docs/props)

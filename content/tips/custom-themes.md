---
title: "Creating Custom Themes"
description: "Build custom themes with colors, gradients, and typography to create a cohesive visual identity across all your videos."
layout: "premium-tips"

hero:
  category: "Template Customization"
  icon: "palette"
  title: "Create Custom Themes"
  description: "Master the art of building cohesive visual themes with coordinated color palettes, typography systems, gradients, and effects. Learn to save and reuse themes across all your video projects for consistent brand identity."
  tags:
    - "Colors"
    - "Typography"
    - "Gradients"
    - "Branding"
    - "Presets"
  video:
    composition: "ScreencastSlideshow"
    props:
      preset: "custom-themes"

sections:
  - title: "Theme Structure and Tokens"
    description: "Understand how themes are organized and learn the design token system that powers consistent styling across templates."
    columns: 3
    cards:
      - type: "rule"
        title: "What is a Theme?"
        body: "A theme is a coordinated set of visual styles—colors, typography, spacing, and effects—that creates a consistent look across your videos. Themes use design tokens to ensure every element follows the same visual language."
        source: "Design Systems Principles"

      - type: "tip"
        title: "Theme Anatomy"
        body: "A complete theme includes several key components that work together to create visual harmony."
        list:
          - "Color palette: Primary, secondary, accent, and neutral colors"
          - "Typography: Font families, sizes, and weights"
          - "Gradients: Background and overlay gradients"
          - "Spacing: Consistent padding and margins"
          - "Effects: Shadows, borders, and animations"

      - type: "rule"
        title: "Design Tokens"
        body: "Design tokens are named values that represent visual properties. Instead of using raw values like <code>#6366f1</code>, use semantic names like <code>primary</code> or <code>brandColor</code>. This makes themes easier to maintain and swap."
        source: "Design Token Specification"

      - type: "example"
        title: "Basic Theme Object"
        body: "Start with a simple theme structure that organizes your visual properties into logical groups. This object becomes the foundation for all your customizations."

      - type: "tip"
        title: "Semantic Naming"
        body: "Name tokens by their purpose, not their value. Use <code>textPrimary</code> instead of <code>darkGray</code>, and <code>surfaceElevated</code> instead of <code>lightBlue</code>. This makes themes more flexible and easier to update."

      - type: "rule"
        title: "Token Hierarchy"
        body: "Organize tokens in layers: primitive tokens (raw values), semantic tokens (purpose-based), and component tokens (specific to UI elements). This hierarchy enables systematic theme changes."
        source: "Design Systems Best Practices"

  - title: "Color Palette Creation"
    description: "Build harmonious color palettes with primary, secondary, accent, and neutral colors that work together beautifully."
    columns: 2
    cards:
      - type: "rule"
        title: "Primary Colors"
        body: "Your primary color is the dominant brand color used for key elements like buttons, links, and highlights. Include light and dark variants for flexibility."
        source: "Color Theory for UI Design"

      - type: "example"
        title: "Before: Single Color"
        body: "Using just one color value limits your design options and makes it hard to create visual hierarchy or indicate different states."

      - type: "example"
        title: "After: Color Scale"
        body: "A complete color scale with light, base, and dark variants enables hover states, backgrounds, and text on colored surfaces while maintaining brand consistency."

      - type: "tip"
        title: "Secondary & Accent Colors"
        body: "Add supporting colors for variety and emphasis. Secondary colors complement your primary, while accent colors draw attention to specific elements like success states or calls-to-action."

      - type: "rule"
        title: "Neutral Colors"
        body: "Neutrals provide backgrounds, text colors, and borders. Build a scale from near-white to near-black with 8-10 steps for maximum flexibility in both light and dark themes."
        source: "Accessible Color Systems"

      - type: "tip"
        title: "Dark Theme Neutrals"
        body: "For dark themes, use cool-tinted neutrals (slight blue undertone) for backgrounds. This creates depth and feels more natural than pure grays. Example: <code>#0f172a</code> instead of <code>#1a1a1a</code>."

      - type: "example"
        title: "Complete Palette"
        body: "A production-ready palette includes primary (3 shades), secondary, accent, and neutrals (background, surface, text, textMuted, border). This covers all common UI needs."

      - type: "rule"
        title: "Color Contrast"
        body: "Ensure sufficient contrast for readability. Large text needs minimum 3:1 contrast ratio, body text needs 4.5:1. Use tools like WebAIM Contrast Checker to verify."
        source: "WCAG 2.1 Guidelines"

  - title: "Typography Configuration"
    description: "Define a consistent type system with font families, size scales, and weights that create clear visual hierarchy."
    columns: 3
    cards:
      - type: "rule"
        title: "Font Families"
        body: "Choose fonts that reflect your brand personality. Most themes need two families: one for headings (often bolder, more distinctive) and one for body text (optimized for readability)."
        source: "Typography Best Practices"

      - type: "tip"
        title: "Font Pairing"
        body: "Pair fonts with contrasting characteristics. A geometric sans-serif heading with a humanist body font creates visual interest while maintaining readability."
        list:
          - "Inter + Inter (clean, modern)"
          - "Space Grotesk + Inter (tech, creative)"
          - "Playfair Display + Source Sans (elegant)"

      - type: "example"
        title: "Before: Arbitrary Sizes"
        body: "Using random font sizes like 17px, 23px, 41px creates visual chaos. There's no clear hierarchy, and the design feels inconsistent."

      - type: "example"
        title: "After: Type Scale"
        body: "A harmonious scale like 14, 16, 18, 24, 30, 36, 48, 60, 72 creates clear hierarchy. Each size has a purpose, from captions to hero headlines."

      - type: "rule"
        title: "Type Scale Ratios"
        body: "Build your scale using a consistent ratio. Common ratios include 1.25 (Major Third), 1.333 (Perfect Fourth), and 1.5 (Perfect Fifth). Multiply your base size by the ratio for each step."
        source: "Modular Scale Typography"

      - type: "tip"
        title: "Font Weights"
        body: "Limit weights to 3-4 options: regular (400) for body, medium (500) for emphasis, semibold (600) for subheadings, and bold (700) for headings. Too many weights dilute hierarchy."

      - type: "rule"
        title: "Line Height"
        body: "Set line height based on context. Headings use tight line height (1.1-1.2), body text uses comfortable spacing (1.5-1.6), and small text may need more (1.6-1.8)."
        source: "Readability Guidelines"

      - type: "tip"
        title: "Video Typography"
        body: "For video, increase font sizes 20-30% compared to web. Viewers watch from a distance, and text appears on screen briefly. Prioritize legibility over density."

      - type: "example"
        title: "Complete Typography System"
        body: "A production typography config includes heading and body font families, a size scale (xs through 6xl), weight options, and line height values for different contexts."

  - title: "Gradients and Effects"
    description: "Add depth and visual interest with gradients, shadows, and other effects that enhance your theme without overwhelming it."
    columns: 2
    cards:
      - type: "rule"
        title: "Linear Gradients"
        body: "Linear gradients transition colors along a straight line. Use them for backgrounds, buttons, and overlays. Specify direction (180deg = top to bottom) and color stops."
        source: "CSS Gradient Specification"

      - type: "tip"
        title: "Gradient Directions"
        body: "Choose direction based on content flow. Vertical gradients (180deg) work for full-screen backgrounds. Diagonal gradients (135deg) add energy. Horizontal gradients (90deg) suit wide banners."

      - type: "example"
        title: "Before: Flat Background"
        body: "A solid color background can feel static and uninteresting, especially for video content that benefits from visual depth and movement."

      - type: "example"
        title: "After: Gradient Background"
        body: "A subtle gradient from <code>#6366f1</code> to <code>#4f46e5</code> adds depth while maintaining brand color. The transition creates visual interest without distraction."

      - type: "rule"
        title: "Radial Gradients"
        body: "Radial gradients emanate from a center point. Use them for spotlight effects, glows, and vignettes. Control shape (circle/ellipse) and position (center, top right, etc.)."
        source: "CSS Gradient Specification"

      - type: "tip"
        title: "Gradient Overlays"
        body: "Use gradient overlays to improve text readability over images. A dark gradient from transparent to 80% black ensures text remains legible regardless of the underlying image."

      - type: "rule"
        title: "Multi-Stop Gradients"
        body: "Create complex gradients with multiple color stops. A sunset gradient might transition through orange, pink, and purple. Keep stops harmonious—use adjacent colors on the color wheel."
        source: "Color Theory for Gradients"

      - type: "tip"
        title: "Shadow Effects"
        body: "Shadows add depth and hierarchy. Use subtle shadows for cards and elevated surfaces. For video, increase shadow opacity slightly as screens vary in contrast."
        list:
          - "Subtle: 0 2px 4px rgba(0,0,0,0.1)"
          - "Medium: 0 4px 12px rgba(0,0,0,0.15)"
          - "Strong: 0 8px 24px rgba(0,0,0,0.2)"

      - type: "example"
        title: "Glow Effects"
        body: "Create glows using radial gradients or box shadows with your brand color. A subtle glow around key elements draws attention without harsh edges. Example: <code>0 0 40px rgba(99,102,241,0.4)</code>."

      - type: "tip"
        title: "Animation Timing"
        body: "Define consistent easing curves for animations. Use ease-out for entrances, ease-in for exits, and ease-in-out for state changes. Store these as theme tokens for consistency."

  - title: "Saving and Reusing Themes"
    description: "Learn to save your themes as reusable presets and apply them consistently across all your video projects."
    columns: 3
    cards:
      - type: "rule"
        title: "Theme File Structure"
        body: "Save themes as separate files that can be imported into any project. Use a consistent structure with colors, typography, gradients, and effects sections."
        source: "Code Organization Best Practices"

      - type: "tip"
        title: "Theme Presets"
        body: "Create preset themes for different contexts: corporate (professional blues), creative (vibrant gradients), minimal (clean neutrals). Switch between them by changing a single import."

      - type: "example"
        title: "Corporate Theme Preset"
        body: "A corporate preset uses trustworthy blues, clean typography, and subtle effects. Colors: primary <code>#1e40af</code>, background <code>#ffffff</code>, text <code>#1e293b</code>. Font: Inter for both headings and body."

      - type: "example"
        title: "Creative Theme Preset"
        body: "A creative preset uses bold colors and dynamic gradients. Colors: primary <code>#f97316</code>, secondary <code>#8b5cf6</code>, dark background <code>#18181b</code>. Font: Space Grotesk for headings."

      - type: "tip"
        title: "Dark/Light Variants"
        body: "Create both dark and light versions of your theme. Store them in a themes object with <code>dark</code> and <code>light</code> keys. Switch based on context or user preference."

      - type: "rule"
        title: "Theme Application"
        body: "Apply themes through props or a theme provider. Pass individual values for simple templates, or pass the entire theme object for templates with full theme support."
        source: "React Theming Patterns"

      - type: "tip"
        title: "CSS Variables Export"
        body: "Export your theme as CSS custom properties for maximum flexibility. This enables theming of any CSS-based styling and works across different component libraries."

      - type: "example"
        title: "Theme Switching"
        body: "Implement theme switching by storing the current theme in state. Change the entire look of your video by updating a single variable. Great for A/B testing different brand treatments."

      - type: "rule"
        title: "Version Control"
        body: "Track theme changes in version control. Document what changed and why. This creates a history of your brand evolution and makes it easy to revert if needed."
        source: "Design System Governance"

cta:
  title: "Ready to build your theme?"
  description: "Start with our template library and apply your custom theme to create videos that perfectly match your brand identity."
  buttons:
    - text: "Browse Templates"
      href: "/library/"
      style: "primary"
      icon: "grid"
    - text: "Brand Integration Guide"
      href: "/tips/brand-integration/"
      style: "outline"
      icon: "briefcase"

relatedTips:
  - slug: "editing-props"
    title: "Editing Props"
    description: "Customize text, colors, images, and timing through the props interface."
    icon: "sliders"
  - slug: "brand-integration"
    title: "Brand Integration"
    description: "Incorporate brand assets, logos, and style guidelines into your videos."
    icon: "briefcase"
  - slug: "layout-modifications"
    title: "Layout Modifications"
    description: "Adjust positioning, sizing, and element arrangement in templates."
    icon: "layout"
---

## Theme Resources

For more information on building design systems and themes:

- [Design Tokens W3C Specification](https://www.w3.org/community/design-tokens/)
- [Tailwind CSS Color Palette](https://tailwindcss.com/docs/customizing-colors)
- [Type Scale Calculator](https://type-scale.com/)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)


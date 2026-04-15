---
title: "Editing Props"
description: "Learn how to customize text, colors, images, and timing through the props interface to make any template your own."
layout: "premium-tips"

hero:
  category: "Template Customization"
  icon: "sliders"
  title: "Master Props Editing"
  description: "Your complete guide to customizing templates through the props interface. Learn to modify text, adjust colors, replace media, and fine-tune timing to transform any template into exactly what you need."
  tags:
    - "Props"
    - "Text"
    - "Colors"
    - "Media"
    - "Timing"
  video:
    composition: "ScreencastSlideshow"
    props:
      preset: "editing-props"

sections:
  - title: "Understanding the Props Interface"
    description: "Get familiar with how props work and how they enable powerful customization without touching code."
    columns: 3
    cards:
      - type: "rule"
        title: "What Are Props?"
        body: "Props (properties) are the customizable inputs that control what appears in your video. Think of them as the knobs and dials that let you adjust a template's content and appearance without modifying the underlying code."
        source: "Remotion Props Documentation"

      - type: "tip"
        title: "Accessing the Props Panel"
        body: "Open Remotion Studio with <code>npx remotion studio</code>, select your composition from the sidebar, and find the props panel on the right. All editable properties appear here with appropriate input controls."

      - type: "rule"
        title: "Zod Schema Integration"
        body: "Templates define their props using Zod schemas. This enables the Studio to automatically generate form controls—text fields, color pickers, sliders, and checkboxes—based on the property types."
        source: "Remotion Visual Editing Guide"

      - type: "example"
        title: "Common Prop Types"
        body: "Most templates expose these configurable property types that you can adjust through the props panel."
        table:
          headers:
            - "Type"
            - "Description"
            - "Example"
          rows:
            - ["Text", "Headlines, body copy", "title: \"Welcome\""]
            - ["Color", "Background, accent", "primaryColor: \"#0066cc\""]
            - ["Image", "Logos, photos", "logoUrl: \"/logo.png\""]
            - ["Number", "Duration, sizes", "durationInSeconds: 5"]
            - ["Boolean", "Show/hide", "showLogo: true"]

      - type: "tip"
        title: "Real-Time Preview"
        body: "As you adjust props in the Studio, changes appear instantly in the preview. This immediate feedback loop makes experimentation fast and intuitive."

      - type: "tip"
        title: "Saving Your Changes"
        body: "After adjusting props, click the save icon to update your <code>defaultProps</code> in the source file. You can also copy the props object as JSON for use in CLI rendering."

  - title: "Text Customization"
    description: "Master text props to craft compelling headlines, descriptions, and calls-to-action that match your brand voice."
    columns: 2
    cards:
      - type: "rule"
        title: "Text Prop Basics"
        body: "Text props control all written content in your video—headlines, subtitles, body copy, labels, and CTAs. Most templates expose multiple text props for different content areas."
        source: "Template Customization Guide"

      - type: "example"
        title: "Before: Default Text"
        body: "Templates ship with placeholder text that demonstrates the layout and timing."
        list:
          - "headline: \"Your Headline Here\""
          - "subtitle: \"Add your subtitle\""
          - "ctaText: \"Learn More\""

      - type: "example"
        title: "After: Customized Text"
        body: "Replace placeholders with your actual content to make the template your own."
        list:
          - "headline: \"Introducing Our New Feature\""
          - "subtitle: \"The fastest way to create videos\""
          - "ctaText: \"Get Started Free\""

      - type: "tip"
        title: "Headline Best Practices"
        body: "Keep headlines concise—3 to 7 words work best for readability. Longer headlines may get truncated or require smaller font sizes that reduce impact."

      - type: "tip"
        title: "Match Your Brand Voice"
        body: "Adjust language to fit your brand's tone. A playful brand might use casual language, while a professional service might prefer formal phrasing."

      - type: "rule"
        title: "Test Different Lengths"
        body: "Some templates handle long text better than others. Always preview your video with actual content to ensure text fits properly and animations work as expected."
        source: "Template Testing Guidelines"

  - title: "Color Adjustments"
    description: "Transform templates to match your brand palette by customizing background, accent, and text colors."
    columns: 2
    cards:
      - type: "rule"
        title: "Color Prop Format"
        body: "Most templates expect colors in hex format (<code>#RRGGBB</code>). Some also support RGB, HSL, or named colors, but hex codes provide the most consistent results across all templates."
        source: "Remotion Color Documentation"

      - type: "example"
        title: "Before: Default Colors"
        body: "Templates include a default color scheme that works well together but may not match your brand."
        list:
          - "backgroundColor: \"#1a1a2e\""
          - "primaryColor: \"#4361ee\""
          - "textColor: \"#ffffff\""

      - type: "example"
        title: "After: Brand Colors"
        body: "Replace default colors with your brand palette to create a cohesive visual identity."
        list:
          - "backgroundColor: \"#0f172a\""
          - "primaryColor: \"#22c55e\""
          - "textColor: \"#f8fafc\""

      - type: "tip"
        title: "Maintain Contrast"
        body: "Ensure text remains readable against backgrounds. Light text on dark backgrounds (or vice versa) should have a contrast ratio of at least 4.5:1 for accessibility."

      - type: "rule"
        title: "Color Hierarchy"
        body: "Most templates use three color levels: primary (main brand color), secondary (supporting color), and accent (highlights and CTAs). Adjust all three for a cohesive look."
        source: "Design System Guidelines"

      - type: "tip"
        title: "Use the Color Picker"
        body: "The Studio's built-in color picker makes it easy to experiment with colors. Click any color prop to open the picker, then adjust hue, saturation, and lightness visually."

  - title: "Media Replacement"
    description: "Swap out placeholder images, logos, and backgrounds with your own assets to personalize templates."
    columns: 3
    cards:
      - type: "rule"
        title: "Image Prop Types"
        body: "Image props accept URLs pointing to your assets. You can use local files from your project's <code>public</code> folder or fully qualified URLs for hosted images."
        source: "Remotion Asset Documentation"

      - type: "example"
        title: "Local Images"
        body: "Place images in your project's <code>public</code> folder and reference them with a leading slash."
        list:
          - "logoUrl: \"/images/my-logo.png\""
          - "backgroundImage: \"/images/hero-bg.jpg\""
          - "productPhoto: \"/images/product.png\""

      - type: "example"
        title: "Remote Images"
        body: "Use fully qualified URLs for images hosted on CDNs or external services."
        list:
          - "logoUrl: \"https://example.com/logo.png\""
          - "productImage: \"https://cdn.example.com/product.jpg\""

      - type: "tip"
        title: "Check Dimensions"
        body: "Review the template's expected image dimensions before replacing assets. Using images with the correct aspect ratio prevents stretching or cropping issues."

      - type: "tip"
        title: "Optimize File Size"
        body: "Large images can slow down preview rendering. Compress images appropriately—aim for under 500KB for most assets, under 2MB for full-screen backgrounds."

      - type: "rule"
        title: "Use PNG for Logos"
        body: "PNG format supports transparency, making logos more versatile. They can be placed on any background color without visible edges or artifacts."
        source: "Asset Best Practices"

  - title: "Timing Changes"
    description: "Fine-tune video duration, animation timing, and pacing to match your content and platform requirements."
    columns: 2
    cards:
      - type: "rule"
        title: "Duration Props"
        body: "Timing props control how long elements appear and when animations occur. The main duration prop is typically <code>durationInFrames</code>, calculated as seconds × fps (e.g., 5 seconds at 30fps = 150 frames)."
        source: "Remotion Timing Documentation"

      - type: "example"
        title: "Before: Default Duration"
        body: "Templates ship with default timing optimized for common use cases."
        list:
          - "durationInFrames: 150 (5 seconds at 30fps)"
          - "introDuration: 30 (1 second intro)"
          - "outroDuration: 30 (1 second outro)"

      - type: "example"
        title: "After: Extended Duration"
        body: "Adjust timing to fit your content needs and platform requirements."
        list:
          - "durationInFrames: 300 (10 seconds at 30fps)"
          - "introDuration: 60 (2 second intro)"
          - "outroDuration: 45 (1.5 second outro)"

      - type: "tip"
        title: "Platform Considerations"
        body: "Different platforms have different ideal lengths. Instagram Reels work well at 15-30 seconds, TikTok at 15-60 seconds, and YouTube Shorts at up to 60 seconds."

      - type: "tip"
        title: "Allow Reading Time"
        body: "Give viewers enough time to read text. A good rule of thumb: 3-4 seconds for headlines, 5-7 seconds for longer text blocks. Test playback to ensure comfortable pacing."

      - type: "rule"
        title: "Frame Rate Awareness"
        body: "Most templates use 30fps. When calculating duration, multiply seconds by the frame rate. For 60fps compositions, the same 5-second video requires 300 frames instead of 150."
        source: "Remotion Frame Rate Guide"

cta:
  title: "Ready to customize your first template?"
  description: "Now that you understand props editing, explore our template library to find the perfect starting point. Each template includes comprehensive props for full customization."
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
  - slug: "custom-themes"
    title: "Creating Custom Themes"
    description: "Build custom themes with colors, gradients, and typography that match your brand."
    icon: "palette"
  - slug: "remotion-studio-basics"
    title: "Remotion Studio Basics"
    description: "Navigate the Studio interface and preview compositions in real-time."
    icon: "monitor-play"
  - slug: "brand-integration"
    title: "Brand Integration"
    description: "Incorporate brand assets, logos, and style guidelines into your videos."
    icon: "briefcase"
---

## Learn More

For comprehensive documentation on props and customization, visit the official resources:

- [Remotion Props Documentation](https://www.remotion.dev/docs/props)
- [Visual Editing Guide](https://www.remotion.dev/docs/visual-editing)
- [Zod Schema Reference](https://www.remotion.dev/docs/zod-types)
- [Asset Handling Guide](https://www.remotion.dev/docs/assets)

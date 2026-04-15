---
title: "Layout Modifications"
description: "Learn how to adjust positioning, sizing, and element arrangement to create the perfect composition for your videos."
layout: "premium-tips"

hero:
  category: "Template Customization"
  icon: "layout"
  title: "Master Layout Modifications"
  description: "Your complete guide to modifying template layouts. Learn to position elements precisely, adjust sizing and spacing, leverage grid and flexbox layouts, and create responsive compositions that work across all aspect ratios."
  tags:
    - "Positioning"
    - "Sizing"
    - "Spacing"
    - "Grid"
    - "Flexbox"
    - "Responsive"
  video:
    composition: "ScreencastSlideshow"
    props:
      preset: "layout-modifications"

sections:
  - title: "Understanding Layout Components"
    description: "Learn the fundamental building blocks of template layouts and how they work together to create compelling compositions."
    columns: 3
    cards:
      - type: "rule"
        title: "The Coordinate System"
        body: "Remotion uses absolute positioning within a fixed canvas. The origin (0, 0) is at the top-left corner. All positions are measured in pixels from this point, with X increasing rightward and Y increasing downward."
        source: "Remotion Layout Documentation"

      - type: "tip"
        title: "Common Canvas Sizes"
        body: "Choose your canvas size based on your target platform and content type."
        table:
          headers:
            - "Format"
            - "Dimensions"
            - "Aspect Ratio"
          rows:
            - ["1080p Landscape", "1920 × 1080", "16:9"]
            - ["1080p Portrait", "1080 × 1920", "9:16"]
            - ["Square", "1080 × 1080", "1:1"]
            - ["4K Landscape", "3840 × 2160", "16:9"]

      - type: "rule"
        title: "Layout Containers"
        body: "Templates organize content in nested containers. The root container matches the canvas size, while child containers group related elements. Understanding this hierarchy is key to making effective modifications."
        source: "Template Architecture Guide"

      - type: "example"
        title: "Before: Flat Structure"
        body: "A flat layout with all elements at the same level makes it difficult to move groups of related content together or apply consistent styling."

      - type: "example"
        title: "After: Nested Containers"
        body: "Grouping related elements in containers (header, content, footer) enables you to move entire sections at once and apply consistent spacing within each group."

      - type: "tip"
        title: "Identify Layout Layers"
        body: "Most templates have three main layers: background (images, gradients), content (text, cards), and overlay (logos, watermarks). Each layer uses different positioning strategies."

  - title: "Positioning and Alignment"
    description: "Master precise element positioning with absolute coordinates, centering techniques, and edge alignment strategies."
    columns: 2
    cards:
      - type: "rule"
        title: "Absolute Positioning"
        body: "Use <code>position: 'absolute'</code> with <code>left</code>, <code>top</code>, <code>right</code>, or <code>bottom</code> values to place elements at exact pixel coordinates. This gives you precise control over element placement."
        source: "CSS Positioning Specification"

      - type: "example"
        title: "Before: Default Position"
        body: "An element positioned at the default location may not align with your design intent."
        list:
          - "position: 'absolute'"
          - "left: 100"
          - "top: 100"

      - type: "example"
        title: "After: Repositioned"
        body: "Adjust coordinates to place the element exactly where you need it in your composition."
        list:
          - "position: 'absolute'"
          - "left: 200"
          - "top: 150"

      - type: "tip"
        title: "Centering Elements"
        body: "Center elements using the transform technique: set <code>left: '50%'</code> and <code>transform: 'translateX(-50%)'</code> for horizontal centering. Add <code>top: '50%'</code> and <code>translateY(-50%)</code> for vertical centering."

      - type: "rule"
        title: "Edge Alignment"
        body: "Align elements to canvas edges using <code>right</code> and <code>bottom</code> instead of <code>left</code> and <code>top</code>. This anchors elements to the opposite edges, useful for logos and watermarks."
        source: "Layout Best Practices"

      - type: "example"
        title: "Corner Positioning"
        body: "Place elements in corners with consistent padding from the edges."
        list:
          - "Bottom-right: right: 60, bottom: 60"
          - "Top-left: left: 60, top: 60"
          - "Top-right: right: 60, top: 60"
          - "Bottom-left: left: 60, bottom: 60"

      - type: "tip"
        title: "Z-Index Layering"
        body: "Control stacking order with <code>zIndex</code>. Background elements use low values (0-10), content uses medium values (10-50), and overlays use high values (50+). This ensures elements appear in the correct order."

      - type: "rule"
        title: "Safe Zones"
        body: "Keep important content within safe zones—typically 60px from all edges. This prevents cropping on different platforms and ensures text remains readable when UI elements overlay the video."
        source: "Broadcast Safe Guidelines"

  - title: "Sizing and Spacing"
    description: "Control element dimensions and spacing to create balanced, visually appealing compositions with proper breathing room."
    columns: 3
    cards:
      - type: "rule"
        title: "Fixed Dimensions"
        body: "Set explicit <code>width</code> and <code>height</code> values in pixels for precise control. This is ideal for elements that should maintain exact sizes regardless of content."
        source: "CSS Box Model"

      - type: "example"
        title: "Before: Default Size"
        body: "An element at its default size may not fit your design requirements."
        list:
          - "width: 400"
          - "height: 300"

      - type: "example"
        title: "After: Adjusted Size"
        body: "Increase dimensions to give content more visual prominence."
        list:
          - "width: 600"
          - "height: 400"

      - type: "tip"
        title: "Percentage-Based Sizing"
        body: "Use percentages for responsive sizing: <code>width: '100%'</code> fills the container width, <code>width: '50%'</code> takes half. This adapts to different canvas sizes automatically."

      - type: "rule"
        title: "Aspect Ratio Preservation"
        body: "Maintain proportions when resizing with <code>aspectRatio: '16 / 9'</code>. Set one dimension and let the other calculate automatically. Essential for images and video containers."
        source: "CSS Aspect Ratio Property"

      - type: "tip"
        title: "Consistent Spacing Scale"
        body: "Use a spacing scale for consistency: 8, 16, 24, 32, 48, 64, 96 pixels. Apply these values for padding, margins, and gaps. Consistent spacing creates visual rhythm and professionalism."

      - type: "example"
        title: "Spacing Application"
        body: "Apply spacing consistently across your layout for visual harmony."
        list:
          - "Small gaps: 8-16px (between related items)"
          - "Medium gaps: 24-32px (between sections)"
          - "Large gaps: 48-64px (major separations)"
          - "Padding: 60px (from canvas edges)"

      - type: "rule"
        title: "Object Fit for Media"
        body: "Control how images fill their containers with <code>objectFit</code>: 'cover' fills the container (may crop), 'contain' fits entirely (may letterbox), 'fill' stretches to fit."
        source: "CSS Object Fit Property"

      - type: "tip"
        title: "Max Width for Text"
        body: "Limit text container width with <code>maxWidth</code> for better readability. Aim for 60-80 characters per line. For video, this typically means 600-900px depending on font size."

  - title: "Grid and Flexbox Layouts"
    description: "Leverage CSS Grid and Flexbox for flexible, powerful layouts that adapt to content and simplify complex arrangements."
    columns: 2
    cards:
      - type: "rule"
        title: "Flexbox Basics"
        body: "Flexbox arranges items along a single axis. Use <code>display: 'flex'</code> with <code>flexDirection: 'row'</code> for horizontal layouts or <code>'column'</code> for vertical. Add <code>gap</code> for consistent spacing."
        source: "CSS Flexbox Specification"

      - type: "example"
        title: "Before: Stacked Elements"
        body: "Elements stack vertically by default, requiring manual positioning for horizontal layouts."

      - type: "example"
        title: "After: Flex Row"
        body: "Flexbox creates a horizontal row with automatic spacing."
        list:
          - "display: 'flex'"
          - "flexDirection: 'row'"
          - "gap: 20"
          - "alignItems: 'center'"

      - type: "tip"
        title: "Flex Alignment"
        body: "Control alignment with <code>justifyContent</code> (main axis) and <code>alignItems</code> (cross axis). Common values: 'flex-start', 'center', 'flex-end', 'space-between', 'space-around'."

      - type: "rule"
        title: "CSS Grid Basics"
        body: "Grid creates two-dimensional layouts. Use <code>display: 'grid'</code> with <code>gridTemplateColumns</code> to define columns. <code>repeat(3, 1fr)</code> creates three equal columns."
        source: "CSS Grid Specification"

      - type: "example"
        title: "3-Column Grid"
        body: "Create a responsive grid for card layouts or galleries."
        list:
          - "display: 'grid'"
          - "gridTemplateColumns: 'repeat(3, 1fr)'"
          - "gap: 24"

      - type: "tip"
        title: "Asymmetric Grids"
        body: "Create sidebar layouts with mixed column sizes: <code>gridTemplateColumns: '300px 1fr'</code> creates a fixed sidebar with flexible main content."

      - type: "example"
        title: "Split Screen Layout"
        body: "Use flexbox for equal split-screen compositions."
        list:
          - "display: 'flex'"
          - "height: '100%'"
          - "Child 1: flex: 1"
          - "Child 2: flex: 1"

      - type: "rule"
        title: "When to Use Each"
        body: "Use Flexbox for one-dimensional layouts (navigation bars, card rows, centered content). Use Grid for two-dimensional layouts (galleries, dashboards, complex page structures)."
        source: "CSS Layout Best Practices"

      - type: "tip"
        title: "Nested Layouts"
        body: "Combine Grid and Flexbox for complex layouts. Use Grid for the overall page structure, then Flexbox within individual cells for content alignment."

  - title: "Responsive Considerations"
    description: "Create layouts that adapt gracefully to different aspect ratios and canvas sizes for maximum flexibility."
    columns: 3
    cards:
      - type: "rule"
        title: "Aspect Ratio Detection"
        body: "Detect orientation by comparing width and height: <code>const isPortrait = height > width</code>. Use this to conditionally apply different layouts for landscape vs portrait compositions."
        source: "Responsive Design Principles"

      - type: "example"
        title: "Before: Fixed Layout"
        body: "A layout designed for landscape may not work well when rendered in portrait orientation, with elements overlapping or extending beyond the canvas."

      - type: "example"
        title: "After: Adaptive Layout"
        body: "Conditional positioning adapts the layout based on aspect ratio."
        list:
          - "left: isPortrait ? '50%' : 100"
          - "top: isPortrait ? 200 : '50%'"
          - "transform: isPortrait ? 'translateX(-50%)' : 'translateY(-50%)'"

      - type: "tip"
        title: "Content Scaling"
        body: "Scale content proportionally with <code>transform: scale()</code>. Calculate scale factor: <code>Math.min(width / 1920, height / 1080)</code> to fit content designed for 1080p into any canvas size."

      - type: "rule"
        title: "Platform-Specific Safe Zones"
        body: "Different platforms have different UI overlays. Instagram/TikTok need larger top (120px) and bottom (180px) margins for usernames and captions. YouTube uses standard 60px margins."
        source: "Social Media Design Guidelines"

      - type: "tip"
        title: "Test Multiple Sizes"
        body: "Always preview your layout at different aspect ratios before finalizing. Create test compositions at 16:9, 9:16, and 1:1 to ensure your layout adapts correctly."

      - type: "example"
        title: "Responsive Text Sizing"
        body: "Scale text based on canvas dimensions for consistent visual weight."
        list:
          - "Base size: 48px at 1920 width"
          - "Scale factor: width / 1920"
          - "Responsive size: 48 * scaleFactor"

      - type: "rule"
        title: "Flexible vs Fixed Elements"
        body: "Identify which elements should scale (backgrounds, containers) and which should remain fixed (logos, icons, minimum text sizes). This prevents tiny unreadable text or oversized UI elements."
        source: "Responsive Typography Guidelines"

      - type: "tip"
        title: "Breakpoint Patterns"
        body: "Define layout breakpoints for major aspect ratio changes. Common patterns: stack vertically below 1:1, use sidebar above 4:3, full horizontal layout above 16:9."

cta:
  title: "Ready to modify your layouts?"
  description: "Now that you understand layout principles, explore our template library to find templates with flexible layouts you can customize to your exact specifications."
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
  - slug: "custom-themes"
    title: "Creating Custom Themes"
    description: "Build custom themes with colors, gradients, and typography that match your brand."
    icon: "palette"
  - slug: "composition-structure"
    title: "Composition Structure"
    description: "Understand how compositions, sequences, and scenes work together in Remotion."
    icon: "layers"
---

## Layout Resources

For more information on CSS layouts and responsive design:

- [CSS Flexbox Guide](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
- [CSS Grid Guide](https://css-tricks.com/snippets/css/complete-guide-grid/)
- [Remotion Layout Documentation](https://www.remotion.dev/docs/layout)
- [Safe Zone Guidelines](https://www.remotion.dev/docs/safe-zones)


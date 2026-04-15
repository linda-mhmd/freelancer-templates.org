---
title: "Remotion Studio Basics"
description: "Learn how to navigate the Remotion Studio interface, preview your compositions in real-time, and adjust props interactively."
layout: "premium-tips"

hero:
  category: "Remotion Tutorials"
  icon: "monitor-play"
  title: "Master Remotion Studio"
  description: "Your complete guide to navigating the Remotion Studio interface, previewing compositions in real-time, editing props visually, and mastering keyboard shortcuts for a faster workflow."
  tags:
    - "Interface"
    - "Preview"
    - "Props"
    - "Timeline"
    - "Shortcuts"
  video:
    composition: "ScreencastSlideshow"
    props:
      preset: "studio-basics"

sections:
  - title: "Interface Navigation and Panels"
    description: "Get familiar with the Studio's layout and understand how each panel contributes to your video development workflow."
    columns: 3
    cards:
      - type: "tip"
        title: "Launching the Studio"
        body: "Start the Remotion Studio from your project directory with <code>npx remotion studio</code>. The Studio opens in your default browser at localhost:3000. Use <code>--port 3001</code> to specify a custom port."

      - type: "rule"
        title: "Composition Sidebar"
        body: "The left sidebar displays all registered compositions. Each entry shows the composition ID, duration (frames and time), and dimensions (width × height in pixels)."
        source: "Remotion Studio Documentation"

      - type: "tip"
        title: "Preview Area"
        body: "The central preview area renders your composition in real-time. This is where you'll see your video come to life as you make changes to your code."

      - type: "rule"
        title: "Props Panel"
        body: "The right sidebar displays editable controls when you define your composition props using a Zod schema. This enables visual editing without touching code."
        source: "Remotion Visual Editing Guide"

      - type: "tip"
        title: "Timeline Panel"
        body: "The timeline at the bottom shows the full duration of your composition. Sequences and layers are visualized here, making it easy to understand your video's structure."

      - type: "example"
        title: "Hot Reload Workflow"
        body: "The Studio renders your composition in real-time as you make changes. Edit your React components, save the file, and see changes instantly in the preview—no manual refresh needed."

  - title: "Preview and Playback Controls"
    description: "Learn how to control video playback, navigate through frames, and preview your compositions at different speeds."
    columns: 2
    cards:
      - type: "rule"
        title: "Play/Pause Controls"
        body: "Use the spacebar or click the play button to toggle playback. The preview renders in real-time, so you can see exactly how your video will look when exported."
        source: "Remotion Studio Documentation"

      - type: "tip"
        title: "Timeline Scrubbing"
        body: "Drag the playhead along the timeline to jump to any frame instantly. This is useful for checking specific moments in your composition without playing through the entire video."

      - type: "rule"
        title: "Playback Speed"
        body: "Adjust playback speed using J (slower) and L (faster) keys. This helps you review animations in slow motion or quickly scan through longer compositions."
        source: "Remotion Keyboard Shortcuts"

      - type: "example"
        title: "Frame-by-Frame Navigation"
        body: "Use the left and right arrow keys to step through your composition one frame at a time. This precision is essential for fine-tuning animation timing and transitions."

  - title: "Props Editing in Real-Time"
    description: "Harness the power of visual props editing to experiment with different values without modifying your source code."
    columns: 2
    cards:
      - type: "rule"
        title: "Zod Schema Integration"
        body: "Define your composition props using a Zod schema to enable visual editing. The Studio automatically generates form controls based on your schema types."
        source: "Remotion Visual Editing Guide"

      - type: "tip"
        title: "Defining Props with Zod"
        body: "Create a schema using <code>z.object()</code> that describes your composition's configurable properties. Include types like <code>z.string()</code>, <code>z.number()</code>, and <code>z.boolean()</code> for different control types."

      - type: "example"
        title: "Registering with Schema"
        body: "Pass your schema to the <code>Composition</code> component along with <code>defaultProps</code>. The Studio will display editable controls in the right sidebar for each property defined in your schema."

      - type: "tip"
        title: "Control Types"
        body: "The Studio generates appropriate controls based on your schema: text fields for strings, number sliders for numeric values, color pickers for color strings, checkboxes for booleans, and dropdowns for enums."
        list:
          - "Text fields for strings"
          - "Number sliders for numeric values"
          - "Color pickers for color strings"
          - "Checkboxes for booleans"
          - "Dropdowns for enums"

      - type: "rule"
        title: "Saving Props to Code"
        body: "After adjusting props in the Studio, click the save icon to update your <code>defaultProps</code> in the source file. This bridges the gap between visual experimentation and code."
        source: "Remotion Visual Editing Guide"

  - title: "Timeline and Frame Navigation"
    description: "Master the timeline to understand your composition's structure and navigate precisely to any point in your video."
    columns: 3
    cards:
      - type: "rule"
        title: "Timeline Overview"
        body: "The timeline displays your composition's full duration with visual markers for sequences and layers. This bird's-eye view helps you understand the overall structure."
        source: "Remotion Studio Documentation"

      - type: "tip"
        title: "Jump to Start/End"
        body: "Press Home to jump to the first frame or End to jump to the last frame. These shortcuts are essential for quickly reviewing the beginning and end of your composition."

      - type: "example"
        title: "Frame Counter"
        body: "The current frame number is displayed in the timeline controls. Use this to note specific frames for animation timing or to communicate precise moments with collaborators."

      - type: "tip"
        title: "Sequence Visualization"
        body: "When your composition uses Sequence components, the timeline shows each sequence as a distinct block. This makes it easy to see how different parts of your video are organized."

      - type: "rule"
        title: "Duration Display"
        body: "The timeline shows both frame count and time duration. For a 30fps composition with 150 frames, you'll see both '150 frames' and '5.0s' displayed."
        source: "Remotion Studio Documentation"

      - type: "tip"
        title: "Zoom Controls"
        body: "Zoom in on the timeline to see more detail for precise frame selection, or zoom out to see the full composition at a glance."

  - title: "Keyboard Shortcuts and Productivity Tips"
    description: "Speed up your workflow with essential keyboard shortcuts and productivity techniques for efficient video development."
    columns: 2
    cards:
      - type: "rule"
        title: "Essential Shortcuts"
        body: "Master these keyboard shortcuts to dramatically speed up your Studio workflow."
        source: "Remotion Keyboard Shortcuts"
        table:
          headers:
            - "Shortcut"
            - "Action"
          rows:
            - ["Space", "Play/Pause"]
            - ["← / →", "Previous/Next frame"]
            - ["J / L", "Decrease/Increase speed"]
            - ["Home", "Jump to start"]
            - ["End", "Jump to end"]

      - type: "tip"
        title: "Render from Studio"
        body: "Click the 'Render' button to open the render dialog. Choose output format, set quality options, configure output location, and monitor render progress—all without leaving the Studio."

      - type: "example"
        title: "Best Practices"
        body: "Follow these practices to get the most out of Remotion Studio and maintain an efficient development workflow."
        list:
          - "Use Zod schemas for all compositions to enable visual editing"
          - "Keep compositions focused on single scenes for easier preview"
          - "Leverage hot reload by keeping the Studio open while coding"
          - "Test at different frame rates using playback speed controls"

      - type: "tip"
        title: "Quick Preview Renders"
        body: "Use the Studio's built-in render interface for quick preview renders during development. This is often faster than typing CLI commands for iterative testing."

cta:
  title: "Ready to start creating?"
  description: "Now that you understand the Studio interface, explore our template library to find the perfect starting point for your next video project."
  buttons:
    - text: "Browse Templates"
      href: "/library/"
      style: "primary"
      icon: "grid"
    - text: "CLI Rendering Guide"
      href: "/tips/cli-rendering/"
      style: "outline"
      icon: "terminal"

relatedTips:
  - slug: "cli-rendering"
    title: "CLI Rendering Guide"
    description: "Master command-line video rendering with custom settings, output formats, and quality options."
    icon: "terminal"
  - slug: "composition-structure"
    title: "Composition Structure"
    description: "Understand how compositions, sequences, and scenes work together in Remotion."
    icon: "layers"
  - slug: "editing-props"
    title: "Editing Props"
    description: "Customize text, colors, images, and timing through the props interface."
    icon: "sliders"
---

## Learn More

For comprehensive documentation on Remotion Studio, visit the official resources:

- [Remotion Studio Documentation](https://www.remotion.dev/docs/studio)
- [Visual Editing Guide](https://www.remotion.dev/docs/visual-editing)
- [Composition API Reference](https://www.remotion.dev/docs/composition)
- [Keyboard Shortcuts Reference](https://www.remotion.dev/docs/studio/keyboard-shortcuts)

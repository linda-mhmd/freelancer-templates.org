---
title: "Composition Structure"
description: "Understand how compositions, sequences, and scenes work together to build complex video projects in Remotion."
layout: "premium-tips"

hero:
  category: "Remotion Tutorials"
  icon: "layers"
  title: "Master Composition Structure"
  description: "Your complete guide to understanding Remotion's composition architecture—from basic composition setup to advanced sequence timing, scene organization, shared components, and best practices for scalable video projects."
  tags:
    - "Compositions"
    - "Sequences"
    - "Scenes"
    - "Timing"
    - "Organization"
  video:
    composition: "ScreencastSlideshow"
    props:
      preset: "composition-structure"

sections:
  - title: "Composition Basics"
    description: "Learn the fundamentals of Remotion compositions—the top-level containers that define your video's dimensions, duration, and frame rate."
    columns: 3
    cards:
      - type: "rule"
        title: "What is a Composition?"
        body: "A composition is the top-level container for a renderable video. It defines dimensions (width × height), frame rate (fps), duration (in frames), and the React component to render."
        source: "Remotion Composition API"

      - type: "tip"
        title: "Creating Your First Composition"
        body: "Use the <code>&lt;Composition&gt;</code> component in your Root file. Specify <code>id</code>, <code>component</code>, <code>durationInFrames</code>, <code>fps</code>, <code>width</code>, and <code>height</code> props to define your video."

      - type: "example"
        title: "Basic Composition Setup"
        body: "A 10-second 1080p video at 30fps: <code>durationInFrames={300}</code>, <code>fps={30}</code>, <code>width={1920}</code>, <code>height={1080}</code>. Duration in seconds = frames ÷ fps."

      - type: "rule"
        title: "Composition ID"
        body: "Each composition requires a unique <code>id</code> string. This ID is used when rendering from the CLI (<code>npx remotion render MyVideoId</code>) and appears in the Studio sidebar."
        source: "Remotion CLI Documentation"

      - type: "tip"
        title: "Multiple Compositions"
        body: "Register multiple compositions in your Root file using React fragments. Each composition can be rendered independently, making it easy to manage intros, main content, and outros separately."

      - type: "tip"
        title: "Using Stills"
        body: "For single-frame outputs like thumbnails, use <code>&lt;Still&gt;</code> instead of <code>&lt;Composition&gt;</code>. Stills don't require duration or fps props and render with <code>npx remotion still</code>."

  - title: "Sequences and Timing"
    description: "Master the Sequence component to control when elements appear and disappear on your video timeline."
    columns: 2
    cards:
      - type: "rule"
        title: "Sequence Fundamentals"
        body: "The <code>&lt;Sequence&gt;</code> component controls when child elements appear on the timeline. Use <code>from</code> to set the start frame and <code>durationInFrames</code> to set how long it displays."
        source: "Remotion Sequence API"

      - type: "tip"
        title: "Basic Sequence Usage"
        body: "Wrap any component in a Sequence to control its timing: <code>&lt;Sequence from={60} durationInFrames={120}&gt;</code> makes content appear at frame 60 and last for 120 frames (4 seconds at 30fps)."

      - type: "example"
        title: "Sequential Content"
        body: "Chain sequences for a slideshow effect: first sequence from frame 0-60, second from 60-120, third from 120-180. Each section appears after the previous one ends."

      - type: "rule"
        title: "Overlapping Sequences"
        body: "Sequences can overlap for transitions and layered effects. A fade transition might have the outgoing element from frames 60-90 and incoming element from frames 75-135, creating a 15-frame crossfade."
        source: "Remotion Animation Guide"

      - type: "tip"
        title: "Named Sequences"
        body: "Add a <code>name</code> prop to sequences for better debugging: <code>&lt;Sequence name=\"Title Card\"&gt;</code>. Named sequences appear labeled in the Studio timeline for easier navigation."

      - type: "tip"
        title: "Open-Ended Sequences"
        body: "Omit <code>durationInFrames</code> to make a sequence last until the composition ends. Useful for background elements or persistent UI that should remain visible throughout."

  - title: "Scenes and Transitions"
    description: "Build reusable scene components and create smooth transitions between different parts of your video."
    columns: 3
    cards:
      - type: "rule"
        title: "Scene Components"
        body: "Scenes are reusable React components that encapsulate a portion of your video. They use <code>useCurrentFrame()</code> for internal timing, which resets to 0 at the scene's start within a Sequence."
        source: "Remotion Component Patterns"

      - type: "tip"
        title: "Creating Reusable Scenes"
        body: "Design scenes as self-contained components with props for customization. A TitleScene might accept <code>title</code>, <code>subtitle</code>, and <code>backgroundColor</code> props for flexibility."

      - type: "example"
        title: "Scene with Internal Animation"
        body: "Inside a scene, <code>useCurrentFrame()</code> returns frames relative to the scene start. Frame 0 is when the scene begins, regardless of where it's placed in the composition timeline."

      - type: "tip"
        title: "Fade Transitions"
        body: "Create fade transitions using <code>interpolate()</code> with opacity. Fade in: <code>interpolate(frame, [0, 20], [0, 1])</code>. Fade out: <code>interpolate(frame, [0, 20], [1, 0])</code>."

      - type: "rule"
        title: "Transition Timing"
        body: "For smooth transitions, overlap sequences by the transition duration. A 15-frame crossfade needs the outgoing scene to extend 15 frames into the incoming scene's start time."
        source: "Remotion Animation Best Practices"

      - type: "example"
        title: "Slide Transitions"
        body: "Animate <code>translateX</code> or <code>translateY</code> for slide effects. Slide in from right: <code>interpolate(frame, [0, 30], [width, 0])</code> applied to the transform property."

  - title: "Shared Components and Layouts"
    description: "Create consistent video projects with shared components, layout systems, and reusable design patterns."
    columns: 2
    cards:
      - type: "rule"
        title: "useVideoConfig Hook"
        body: "Access composition metadata anywhere with <code>useVideoConfig()</code>. Returns <code>width</code>, <code>height</code>, <code>fps</code>, and <code>durationInFrames</code> for responsive component design."
        source: "Remotion Hooks API"

      - type: "tip"
        title: "Responsive Components"
        body: "Use <code>useVideoConfig()</code> to create components that adapt to any composition size. Calculate font sizes, spacing, and positions as percentages of width/height."

      - type: "example"
        title: "Shared Layout Component"
        body: "Create a Layout component that provides consistent padding, background, and positioning. All scenes can use this layout for visual consistency across your video."

      - type: "tip"
        title: "Theme Objects"
        body: "Define a theme object with colors, fonts, and spacing values. Pass it through props or React context to maintain consistent styling across all scenes and components."

      - type: "rule"
        title: "calculateMetadata Function"
        body: "Use <code>calculateMetadata</code> for dynamic composition properties. Calculate duration based on content length, adjust dimensions based on props, or fetch data before rendering."
        source: "Remotion Dynamic Compositions"

      - type: "example"
        title: "Dynamic Duration"
        body: "For a slideshow, calculate duration from slide count: <code>durationInFrames: slides.length * framesPerSlide</code>. The composition automatically adjusts to content length."

  - title: "Best Practices"
    description: "Follow these proven patterns for organizing, scaling, and maintaining complex Remotion video projects."
    columns: 3
    cards:
      - type: "rule"
        title: "File Organization"
        body: "Organize your project with clear folder structure: <code>/compositions</code> for top-level videos, <code>/scenes</code> for reusable scene components, <code>/components</code> for UI elements, <code>/utils</code> for helpers."
        source: "Remotion Project Structure Guide"

      - type: "tip"
        title: "Single Responsibility"
        body: "Keep compositions focused on one main purpose. Instead of one massive composition, create separate compositions for intro, main content, and outro that can be combined or rendered independently."

      - type: "example"
        title: "Naming Conventions"
        body: "Use descriptive, consistent names: compositions as <code>ProductLaunchVideo</code>, scenes as <code>FeatureShowcaseScene</code>, components as <code>AnimatedTitle</code>. Clear names improve maintainability."

      - type: "tip"
        title: "Props Over Hardcoding"
        body: "Make components configurable through props rather than hardcoding values. This enables visual editing in the Studio and makes components reusable across different videos."

      - type: "rule"
        title: "Timing Constants"
        body: "Define timing values as constants at the top of your files: <code>const FADE_DURATION = 15</code>, <code>const SCENE_GAP = 5</code>. This makes timing adjustments easy and keeps values consistent."
        source: "Remotion Code Organization"

      - type: "tip"
        title: "Documentation"
        body: "Add JSDoc comments to scene components describing their purpose, expected props, and duration requirements. Future you (and collaborators) will thank you when revisiting the project."

cta:
  title: "Ready to build complex videos?"
  description: "Now that you understand composition structure, explore our template library to see these patterns in action, or dive into CLI rendering to export your creations."
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
  - slug: "remotion-studio-basics"
    title: "Remotion Studio Basics"
    description: "Navigate the Studio interface and preview compositions in real-time."
    icon: "monitor-play"
  - slug: "cli-rendering"
    title: "CLI Rendering Guide"
    description: "Master command-line video rendering with custom settings and output formats."
    icon: "terminal"
  - slug: "editing-props"
    title: "Editing Props"
    description: "Customize text, colors, images, and timing through the props interface."
    icon: "sliders"
---

## Learn More

For comprehensive documentation on Remotion composition structure, visit the official resources:

- [Composition API Reference](https://www.remotion.dev/docs/composition)
- [Sequence Documentation](https://www.remotion.dev/docs/sequence)
- [useVideoConfig Hook](https://www.remotion.dev/docs/use-video-config)
- [calculateMetadata Guide](https://www.remotion.dev/docs/calculate-metadata)

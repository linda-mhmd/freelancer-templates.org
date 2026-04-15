---
title: "CLI Rendering Guide"
description: "Master command-line video rendering with custom settings, output formats, quality options, and advanced configuration."
layout: "premium-tips"

hero:
  category: "Remotion Tutorials"
  icon: "terminal"
  title: "Master CLI Rendering"
  description: "Your complete guide to rendering videos from the command line. Learn essential commands, output formats, quality settings, batch rendering, and automation techniques for production-ready video workflows."
  tags:
    - "Commands"
    - "Formats"
    - "Quality"
    - "Batch"
    - "Automation"
  video:
    composition: "ScreencastSlideshow"
    props:
      preset: "cli-rendering"

sections:
  - title: "Basic Commands"
    description: "Get started with the essential Remotion CLI commands for rendering videos and generating stills from your compositions."
    columns: 3
    cards:
      - type: "tip"
        title: "The Render Command"
        body: "The core command for rendering videos is <code>npx remotion render &lt;composition-id&gt;</code>. This renders your composition to the default <code>out</code> folder as an MP4 file."

      - type: "rule"
        title: "Specifying Output Path"
        body: "Control where your video is saved by adding an output path: <code>npx remotion render MyVideo ./output/video.mp4</code>. You can also use the <code>--output</code> flag for clarity."
        source: "Remotion CLI Documentation"

      - type: "example"
        title: "Quick Render Example"
        body: "Render a composition named 'Intro' to a specific location: <code>npx remotion render Intro ./renders/intro-final.mp4</code>"

      - type: "tip"
        title: "Rendering Stills"
        body: "Generate a single frame as an image with <code>npx remotion still MyVideo output.png</code>. Use <code>--frame=30</code> to specify which frame to capture."

      - type: "rule"
        title: "Passing Props"
        body: "Pass custom props to your composition using <code>--props='{ \"title\": \"Hello\" }'</code> for inline JSON, or <code>--props=./props.json</code> to load from a file."
        source: "Remotion Props Documentation"

      - type: "tip"
        title: "Environment Variables"
        body: "Load environment variables from a file with <code>--env-file=.env.production</code>. This is useful for managing API keys and configuration across environments."

  - title: "Output Formats"
    description: "Choose the right video codec and container format for your use case, from web-optimized MP4 to professional ProRes masters."
    columns: 2
    cards:
      - type: "rule"
        title: "Video Codecs"
        body: "Select your codec with the <code>--codec</code> flag. Each codec offers different tradeoffs between quality, file size, and compatibility."
        source: "Remotion Encoding Guide"
        table:
          headers:
            - "Codec"
            - "Format"
            - "Best For"
          rows:
            - ["h264", "MP4", "Web, universal playback"]
            - ["h265", "MP4", "Smaller files, modern devices"]
            - ["vp8", "WebM", "Web, open format"]
            - ["vp9", "WebM", "High quality web video"]
            - ["prores", "MOV", "Professional editing"]

      - type: "tip"
        title: "H.264 for Web"
        body: "Use <code>--codec=h264</code> for maximum compatibility. This is the default codec and works on virtually all devices and platforms."

      - type: "example"
        title: "ProRes for Editing"
        body: "For professional workflows, render with ProRes: <code>npx remotion render MyVideo --codec=prores --prores-profile=hq</code>. Available profiles: 4444-xq, 4444, hq, standard, light, proxy."

      - type: "rule"
        title: "Audio Codecs"
        body: "Set the audio codec independently with <code>--audio-codec</code>. Options include <code>aac</code> (default, best compatibility), <code>mp3</code>, and <code>wav</code> (uncompressed)."
        source: "Remotion Audio Documentation"

      - type: "tip"
        title: "Image Sequences"
        body: "Export as individual frames instead of a video with <code>--sequence</code>. Customize naming with <code>--image-sequence-pattern='frame_[frame].[ext]'</code>."

      - type: "example"
        title: "WebM for Modern Web"
        body: "For modern browsers with smaller file sizes: <code>npx remotion render MyVideo output.webm --codec=vp9</code>"

  - title: "Quality Settings"
    description: "Fine-tune video quality, compression, and file size to achieve the perfect balance for your delivery requirements."
    columns: 3
    cards:
      - type: "rule"
        title: "Constant Rate Factor (CRF)"
        body: "CRF controls the quality-to-size ratio. Lower values mean higher quality and larger files. The scale is 0-51, with 23 being the default."
        source: "FFmpeg CRF Guide"
        list:
          - "CRF 18: High quality, larger file"
          - "CRF 23: Balanced (default)"
          - "CRF 28: Lower quality, smaller file"

      - type: "tip"
        title: "Setting CRF"
        body: "Use <code>--crf=18</code> for high-quality renders where file size isn't a concern. For web delivery, <code>--crf=23</code> offers a good balance."

      - type: "example"
        title: "High Quality Master"
        body: "Create a high-quality master file: <code>npx remotion render MyVideo master.mp4 --crf=18 --image-format=png</code>"

      - type: "rule"
        title: "Video Bitrate"
        body: "For precise file size control, use bitrate instead of CRF: <code>--video-bitrate=5M</code> for 5 Mbps or <code>--video-bitrate=2500K</code> for 2.5 Mbps."
        source: "Remotion Encoding Guide"

      - type: "tip"
        title: "Audio Bitrate"
        body: "Control audio quality with <code>--audio-bitrate=320k</code> for high quality or <code>--audio-bitrate=192k</code> for standard quality. Higher bitrates preserve audio fidelity."

      - type: "example"
        title: "Web-Optimized Output"
        body: "Optimize for web delivery: <code>npx remotion render MyVideo web.mp4 --codec=h264 --crf=23 --audio-codec=aac --audio-bitrate=192k</code>"

  - title: "Batch Rendering"
    description: "Render multiple compositions efficiently using scripts, loops, and parallel processing techniques."
    columns: 2
    cards:
      - type: "tip"
        title: "Shell Script Approach"
        body: "Create a shell script to render multiple compositions sequentially. This is the simplest approach for batch rendering a known set of videos."

      - type: "example"
        title: "Batch Script Example"
        body: "Create a <code>render-all.sh</code> script that renders each composition with consistent settings. Run with <code>bash render-all.sh</code> to process all videos."
        list:
          - "npx remotion render Intro ./out/intro.mp4"
          - "npx remotion render Main ./out/main.mp4"
          - "npx remotion render Outro ./out/outro.mp4"

      - type: "rule"
        title: "Concurrency Control"
        body: "Control CPU usage with <code>--concurrency</code>. Use <code>--concurrency=4</code> for 4 threads, <code>--concurrency=50%</code> for half your cores, or <code>--concurrency=100%</code> for maximum speed."
        source: "Remotion Performance Guide"

      - type: "tip"
        title: "Props-Based Batch Rendering"
        body: "Render the same composition with different props by creating multiple JSON files and looping through them: <code>for f in props/*.json; do npx remotion render MyVideo --props=\"$f\"; done</code>"

      - type: "example"
        title: "Parallel Rendering"
        body: "Use GNU Parallel for concurrent batch rendering: <code>parallel npx remotion render {} ::: Comp1 Comp2 Comp3</code>. This renders multiple compositions simultaneously."

      - type: "rule"
        title: "Memory Management"
        body: "For large batches, reduce concurrency to prevent out-of-memory errors: <code>--concurrency=2 --image-format=jpeg</code>. JPEG frames use less memory than PNG."
        source: "Remotion Troubleshooting Guide"

  - title: "Automation"
    description: "Integrate Remotion rendering into automated workflows, CI/CD pipelines, and programmatic video generation systems."
    columns: 2
    cards:
      - type: "rule"
        title: "Exit Codes"
        body: "The CLI returns exit code 0 on success and non-zero on failure. Use this in scripts to detect errors: <code>npx remotion render MyVideo || echo 'Render failed'</code>"
        source: "Remotion CLI Reference"

      - type: "tip"
        title: "CI/CD Integration"
        body: "Add rendering to your CI pipeline by installing dependencies and running the render command. Use <code>--gl=angle</code> on Linux servers without GPU for software rendering."

      - type: "example"
        title: "GitHub Actions Workflow"
        body: "In your workflow file, install dependencies with <code>npm ci</code>, then render with <code>npx remotion render MyVideo --gl=angle</code>. Upload artifacts to store the output."

      - type: "rule"
        title: "Programmatic Rendering"
        body: "Use the <code>@remotion/renderer</code> package for Node.js integration. The <code>renderMedia()</code> function provides full control over rendering with TypeScript support."
        source: "Remotion Renderer API"

      - type: "tip"
        title: "Progress Callbacks"
        body: "When using the Node.js API, pass an <code>onProgress</code> callback to track rendering progress. This enables progress bars and status updates in your application."

      - type: "example"
        title: "Webhook Integration"
        body: "Trigger renders via webhooks by creating an API endpoint that calls <code>renderMedia()</code>. Return the video URL or upload to cloud storage when complete."

cta:
  title: "Ready to render at scale?"
  description: "Now that you've mastered CLI rendering, explore Lambda deployment for serverless video generation or browse our template library for your next project."
  buttons:
    - text: "Lambda Deployment"
      href: "/tips/lambda-deployment/"
      style: "primary"
      icon: "cloud"
    - text: "Browse Templates"
      href: "/library/"
      style: "outline"
      icon: "grid"

relatedTips:
  - slug: "remotion-studio-basics"
    title: "Remotion Studio Basics"
    description: "Navigate the Studio interface and preview compositions in real-time."
    icon: "monitor-play"
  - slug: "lambda-deployment"
    title: "Lambda Deployment"
    description: "Deploy rendering pipelines to AWS Lambda for serverless video generation."
    icon: "cloud"
  - slug: "composition-structure"
    title: "Composition Structure"
    description: "Understand how compositions, sequences, and scenes work together."
    icon: "layers"
---

## Learn More

For comprehensive documentation on Remotion CLI rendering, visit the official resources:

- [CLI Render Reference](https://www.remotion.dev/docs/cli/render)
- [Encoding Guide](https://www.remotion.dev/docs/encoding)
- [Passing Props](https://www.remotion.dev/docs/passing-props)
- [Renderer API](https://www.remotion.dev/docs/renderer)

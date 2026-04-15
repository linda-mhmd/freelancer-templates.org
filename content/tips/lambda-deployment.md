---
title: "Lambda Deployment"
description: "Deploy scalable, serverless video rendering pipelines to AWS Lambda for on-demand video generation at scale."
layout: "premium-tips"

hero:
  category: "Remotion Tutorials"
  icon: "cloud"
  title: "Deploy Serverless Video Rendering"
  description: "Your complete guide to deploying Remotion Lambda on AWS for scalable, on-demand video generation. Learn AWS setup, function deployment, API integration, cost optimization, and monitoring strategies."
  tags:
    - "AWS"
    - "Lambda"
    - "Serverless"
    - "Scaling"
    - "API"
  video:
    composition: "ScreencastSlideshow"
    props:
      preset: "lambda-deployment"

sections:
  - title: "AWS Setup and Prerequisites"
    description: "Configure your AWS environment with the proper permissions and credentials to deploy Remotion Lambda functions."
    columns: 3
    cards:
      - type: "rule"
        title: "Required AWS Permissions"
        body: "Remotion Lambda requires specific IAM permissions for Lambda, S3, and CloudWatch. Use the built-in policy generator to create the exact permissions needed."
        source: "Remotion Lambda Documentation"

      - type: "tip"
        title: "Install Lambda Package"
        body: "Add the Lambda package to your project with <code>npm install @remotion/lambda</code>. This provides both CLI commands and the Node.js API for programmatic rendering."

      - type: "example"
        title: "Generate IAM Policy"
        body: "Run <code>npx remotion lambda policies user</code> to output the required IAM policy JSON. Create a dedicated IAM user and attach this policy for secure, scoped access."

      - type: "tip"
        title: "Configure Credentials"
        body: "Set your AWS credentials via environment variables: <code>REMOTION_AWS_ACCESS_KEY_ID</code>, <code>REMOTION_AWS_SECRET_ACCESS_KEY</code>, and <code>REMOTION_AWS_REGION</code>."

      - type: "rule"
        title: "Region Selection"
        body: "Choose an AWS region close to your users for faster video delivery. Lambda is available in most regions, but us-east-1 offers the most capacity."
        source: "AWS Lambda Best Practices"

      - type: "tip"
        title: "Prerequisites Checklist"
        body: "Before deploying, ensure you have all requirements in place for a smooth setup process."
        list:
          - "AWS account with billing enabled"
          - "Node.js 18+ installed locally"
          - "AWS CLI configured (optional)"
          - "Remotion project ready to deploy"

  - title: "Deploying the Lambda Function"
    description: "Deploy your Remotion rendering function and upload your project to S3 for serverless video generation."
    columns: 2
    cards:
      - type: "rule"
        title: "Deploy the Function"
        body: "Run <code>npx remotion lambda functions deploy</code> to create the Lambda function with the Remotion runtime. Note the function name returned—you'll need it for rendering."
        source: "Remotion Lambda CLI Reference"

      - type: "tip"
        title: "Function Configuration"
        body: "Customize your function with deployment flags: <code>--memory=2048</code> for RAM allocation, <code>--timeout=240</code> for max duration, and <code>--disk=2048</code> for temp storage."

      - type: "example"
        title: "Deploy Your Site"
        body: "Upload your Remotion project to S3 with <code>npx remotion lambda sites create src/index.ts --site-name=my-video-site</code>. This bundles and hosts your compositions for Lambda access."

      - type: "rule"
        title: "Site Versioning"
        body: "Use meaningful site names for version control. Deploy staging and production sites separately to safely test changes before going live."
        source: "Remotion Deployment Best Practices"

      - type: "tip"
        title: "Verify Deployment"
        body: "List your deployed functions with <code>npx remotion lambda functions ls</code>. Confirm the function name, memory allocation, and timeout match your requirements."

      - type: "example"
        title: "Update Deployments"
        body: "When updating your project, redeploy the site with the same name. For Remotion version upgrades, also redeploy the function with <code>npx remotion lambda functions deploy</code>."

  - title: "Triggering Renders via API"
    description: "Integrate Lambda rendering into your applications using the Node.js API for programmatic video generation."
    columns: 2
    cards:
      - type: "rule"
        title: "renderMediaOnLambda API"
        body: "Use <code>renderMediaOnLambda()</code> from <code>@remotion/lambda/client</code> to start renders programmatically. Pass your function name, serve URL, composition ID, and input props."
        source: "Remotion Lambda API Reference"

      - type: "tip"
        title: "Essential Parameters"
        body: "Every render requires these core parameters for successful execution."
        list:
          - "<code>region</code>: AWS region (e.g., 'us-east-1')"
          - "<code>functionName</code>: Your deployed function name"
          - "<code>serveUrl</code>: S3 URL from site deployment"
          - "<code>composition</code>: Composition ID to render"
          - "<code>inputProps</code>: Dynamic data for the video"

      - type: "example"
        title: "Start a Render"
        body: "Call <code>renderMediaOnLambda()</code> with your configuration. It returns a <code>renderId</code> and <code>bucketName</code> for tracking progress and retrieving the output."

      - type: "rule"
        title: "Track Render Progress"
        body: "Poll <code>getRenderProgress()</code> with the render ID to check status. The response includes <code>overallProgress</code> (0-1), <code>done</code> flag, and <code>outputFile</code> URL when complete."
        source: "Remotion Lambda API Reference"

      - type: "tip"
        title: "Output Configuration"
        body: "Customize your render output with codec, quality, and privacy settings: <code>codec: 'h264'</code>, <code>jpegQuality: 80</code>, <code>privacy: 'public'</code>."

      - type: "example"
        title: "Complete Render Flow"
        body: "Implement a polling loop that starts the render, checks progress every second, and returns the output URL when done. Handle <code>fatalErrorEncountered</code> for error cases."

  - title: "Cost Optimization Strategies"
    description: "Minimize AWS costs while maintaining render performance with these optimization techniques."
    columns: 3
    cards:
      - type: "rule"
        title: "Right-Size Memory"
        body: "Lambda pricing scales with memory allocation. Start with 1024MB and increase only if renders are slow. More memory also means more CPU, so find the sweet spot."
        source: "AWS Lambda Pricing"

      - type: "tip"
        title: "Memory Recommendations"
        body: "Choose memory based on your composition complexity."
        table:
          headers:
            - "Complexity"
            - "Memory"
            - "Use Case"
          rows:
            - ["Simple", "1024MB", "Text animations, basic graphics"]
            - ["Medium", "2048MB", "Images, moderate effects"]
            - ["Complex", "3008MB", "Video overlays, heavy processing"]

      - type: "example"
        title: "Use JPEG Frames"
        body: "Set <code>imageFormat: 'jpeg'</code> instead of PNG when transparency isn't needed. JPEG frames are smaller and faster to process, reducing both time and cost."

      - type: "tip"
        title: "Optimize Compositions"
        body: "Reduce render costs by optimizing your Remotion compositions."
        list:
          - "Minimize external asset fetching"
          - "Use lower resolution for previews"
          - "Avoid unnecessary re-renders"
          - "Cache frequently used assets"

      - type: "rule"
        title: "Clean Up Old Renders"
        body: "S3 storage costs accumulate over time. Use <code>npx remotion lambda renders rm &lt;render-id&gt;</code> to delete old renders, or set up S3 lifecycle policies for automatic cleanup."
        source: "AWS S3 Pricing"

      - type: "tip"
        title: "Batch Similar Renders"
        body: "Group renders with similar configurations to maximize Lambda warm starts. Warm functions start faster and cost less than cold starts."

  - title: "Monitoring and Debugging"
    description: "Monitor your Lambda renders, debug issues, and implement production-ready error handling."
    columns: 2
    cards:
      - type: "rule"
        title: "CloudWatch Logs"
        body: "Lambda automatically logs to CloudWatch. View logs in the AWS Console or use <code>npx remotion lambda functions ls</code> to see function status and recent activity."
        source: "AWS CloudWatch Documentation"

      - type: "tip"
        title: "List Recent Renders"
        body: "Run <code>npx remotion lambda renders ls</code> to view recent render jobs. This shows render IDs, status, duration, and output locations for troubleshooting."

      - type: "example"
        title: "Error Handling"
        body: "Check <code>progress.fatalErrorEncountered</code> in your polling loop. When true, <code>progress.errors</code> contains error details. Implement retry logic with <code>maxRetries</code> parameter."

      - type: "rule"
        title: "Set Up Alarms"
        body: "Create CloudWatch alarms for Lambda errors and duration. Get notified when renders fail or take longer than expected, enabling quick response to issues."
        source: "AWS CloudWatch Alarms"

      - type: "tip"
        title: "Production Best Practices"
        body: "Follow these practices for reliable production deployments."
        list:
          - "Use environment variables for configuration"
          - "Implement exponential backoff for retries"
          - "Separate staging and production sites"
          - "Version deployments with meaningful names"
          - "Monitor costs with AWS Budgets"

      - type: "example"
        title: "Debug Failed Renders"
        body: "When a render fails, check the error message in <code>progress.errors</code>. Common issues include missing assets, invalid props, or timeout exceeded. CloudWatch logs provide detailed stack traces."

cta:
  title: "Ready to scale your video rendering?"
  description: "Now that you understand Lambda deployment, explore our template library to find compositions ready for serverless rendering at scale."
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
  - slug: "remotion-studio-basics"
    title: "Remotion Studio Basics"
    description: "Navigate the Studio interface and preview compositions in real-time."
    icon: "monitor-play"
  - slug: "composition-structure"
    title: "Composition Structure"
    description: "Understand how compositions, sequences, and scenes work together in Remotion."
    icon: "layers"
---

## Learn More

For comprehensive documentation on Remotion Lambda, visit the official resources:

- [Lambda Setup Guide](https://www.remotion.dev/docs/lambda/setup)
- [renderMediaOnLambda API](https://www.remotion.dev/docs/lambda/rendermediaonlambda)
- [Lambda Permissions](https://www.remotion.dev/docs/lambda/permissions)
- [Lambda Pricing](https://www.remotion.dev/docs/lambda/pricing)

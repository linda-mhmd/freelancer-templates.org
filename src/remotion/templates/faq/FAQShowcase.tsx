/**
 * FAQ Showcase - 6 pre-configured compositions with sample data
 */

import React from "react";
import { FAQ, FAQSpec } from "./FAQ";
import { THEME_DARK, THEME_CLEAN, THEME_BOLD, THEME_WARM, THEME_MINIMAL, THEME_NEON } from "../_shared/themes";

const SAMPLE_SPEC: FAQSpec = {
  headline: "Frequently Asked Questions",
  subheadline: "Everything you need to know before we start working together",
  items: [
    {
      question: "What's your typical turnaround time?",
      answer: "Most projects are delivered within 2–4 weeks depending on scope. Rush delivery is available for an additional fee.",
      icon: "⏱️",
    },
    {
      question: "Do you offer revisions?",
      answer: "Yes - all packages include at least one round of revisions. Pro and Enterprise plans include unlimited revisions.",
      icon: "refresh",
    },
    {
      question: "What technologies do you work with?",
      answer: "React, Next.js, TypeScript, Node.js, AWS, and Python are my core stack. I also work with Remotion for video generation.",
      icon: "laptop",
    },
    {
      question: "How do we communicate during the project?",
      answer: "I use Slack or Discord for daily updates, with weekly video check-ins. You'll always know where things stand.",
      icon: "chat",
    },
  ],
  ctaText: "Ready to get started? Let's talk →",
  freelancerName: "Linda Mohamed - Full-Stack Developer",
};

// Dark + Accordion - classic FAQ stack
export const FAQDarkAccordion: React.FC = () => (
  <FAQ spec={SAMPLE_SPEC} theme={THEME_DARK} layout="accordion" />
);

// Clean + Cards - professional grid
export const FAQCleanCards: React.FC = () => (
  <FAQ spec={SAMPLE_SPEC} theme={THEME_CLEAN} layout="cards" />
);

// Bold + Interview - high-impact split
export const FAQBoldInterview: React.FC = () => (
  <FAQ spec={{
    ...SAMPLE_SPEC,
    headline: "Got Questions? We've Got Answers.",
    subheadline: undefined,
  }} theme={THEME_BOLD} layout="interview" />
);

// Warm + Accordion - friendly FAQ
export const FAQWarmAccordion: React.FC = () => (
  <FAQ spec={{
    ...SAMPLE_SPEC,
    headline: "Let's Clear Things Up",
    subheadline: "No question is too small - here are the ones I hear most",
    items: [
      { question: "Can I see examples of your work?", answer: "Absolutely! Check out my portfolio for recent projects, or I can send you case studies relevant to your industry.", icon: "palette" },
      { question: "What if I'm not happy with the result?", answer: "Your satisfaction is my priority. We'll iterate until you love it, and I offer a money-back guarantee for the first milestone.", icon: "handshake" },
      { question: "Do you work with small businesses?", answer: "Yes! In fact, small businesses are my favorite clients. I love helping founders bring their vision to life.", icon: "box" },
      { question: "Can you help with ongoing maintenance?", answer: "I offer monthly retainer packages for ongoing support, updates, and feature additions.", icon: "wrench" },
    ],
  }} theme={THEME_WARM} layout="accordion" />
);

// Minimal + Cards - understated elegance
export const FAQMinimalCards: React.FC = () => (
  <FAQ spec={{
    ...SAMPLE_SPEC,
    headline: "Common Questions",
    subheadline: undefined,
    ctaText: undefined,
  }} theme={THEME_MINIMAL} layout="cards" />
);

// Neon + Interview - tech-forward Q&A
export const FAQNeonInterview: React.FC = () => (
  <FAQ spec={{
    ...SAMPLE_SPEC,
    headline: "The Dev FAQ",
    subheadline: "Technical questions, straight answers",
    items: [
      { question: "What's your CI/CD setup?", answer: "GitHub Actions for CI, AWS CDK for infrastructure. Every PR gets automated tests, linting, and preview deployments.", icon: "rocket" },
      { question: "How do you handle security?", answer: "OWASP Top 10 compliance, automated dependency scanning, and regular penetration testing for production apps.", icon: "lock" },
      { question: "Can you work with our existing codebase?", answer: "Yes - I'll start with a code audit to understand the architecture, then propose improvements alongside new features.", icon: "box" },
      { question: "What about scalability?", answer: "I design for scale from day one. Serverless architectures, auto-scaling groups, and load testing are standard practice.", icon: "trending-up" },
    ],
  }} theme={THEME_NEON} layout="interview" />
);

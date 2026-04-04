/**
 * YouTubeTutorial Template - "Linda Mohamed explains her projects"
 *
 * A data-driven template for 15-minute YouTube explainer videos about
 * Linda's technical projects. Each video follows a consistent structure:
 *   Hook → Problem → Scale → Solution → Deep Dive → Demo → Use Cases → Economics → Outro
 *
 * LAYOUTS:
 *   "cinematic"  - Dark, tech-forward. For cloud/AI projects. (default)
 *   "clean"      - Light, educational. For broad audiences.
 *
 * DATA CONTRACT (TutorialSpec):
 *   {
 *     project_name: string,              // e.g. "AI Video Pipeline"
 *     partner: { name, color },          // e.g. { name: "NetApp", color: "#0072CE" }
 *     co_brand: { name, color },         // e.g. { name: "AWS", color: "#FF9900" }
 *     hook_stats: [{ value, label }],    // 3 stats for the hook card
 *     chapters: Chapter[],               // ordered chapter definitions
 *     voiceover_src?: string,            // staticFile path or URL
 *     outro: { tagline, cta },
 *   }
 *
 * USAGE in Root.tsx:
 *   <Composition id="YouTubeTutorial-VideoFlow" component={VideoFlowTutorial} ... />
 *
 * ADD A NEW TUTORIAL:
 *   1. Create a new file in /templates/youtubetuorial/tutorials/MyProject.tsx
 *   2. Define a TutorialSpec with your chapters
 *   3. Export a wrapped component: export const MyProjectTutorial = () => <YouTubeTutorial spec={mySpec} />
 *   4. Register in Root.tsx
 */

import React from "react";
import {
  AbsoluteFill,
  Audio,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
  staticFile,
} from "remotion";
import type { Theme } from "../_shared/themes";
import { THEME_DARK, THEME_CLEAN } from "../_shared/themes";
import { fadeIn, springEntrance, SPRING } from "../_shared/animations";
import { spring, interpolate } from "remotion";

// ── Data Contract ─────────────────────────────────────────────────────────────

export interface HookStat {
  value: string;   // e.g. "€0.42"
  label: string;   // e.g. "per video"
  color?: string;  // override accent color for this stat
}

export interface ChapterContent {
  /** Rendered inside the chapter - use ChapterSlide components below */
  type: "stats" | "diagram" | "comparison" | "list" | "demo" | "blank";
  /** Generic data payload - each type reads what it needs */
  data?: Record<string, unknown>;
}

export interface Chapter {
  id: number;
  name: string;
  number: string;  // display label e.g. "01"
  title: string;   // display title e.g. "Why Videos Never Get Published"
  start_sec: number;
  end_sec: number;
  bg?: "video" | "dark" | "gradient"; // background style
  video_src?: string;  // staticFile path if bg="video"
  content: ChapterContent;
}

export interface TutorialSpec {
  project_name: string;
  partner: { name: string; color: string };
  co_brand: { name: string; color: string };
  hook_stats: HookStat[];
  chapters: Chapter[];
  voiceover_src?: string;  // staticFile path - omit if audio not yet generated
  outro: {
    tagline: string;
    sub: string;
    presenter: string;  // e.g. "Linda Mohamed, AWS Hero"
  };
}

export interface YouTubeTutorialProps {
  spec: TutorialSpec;
  layout?: "cinematic" | "clean";
}

// ── Design helpers ─────────────────────────────────────────────────────────────

const FONT = "system-ui, -apple-system, sans-serif";

function themeFromLayout(layout: string): Theme {
  return layout === "clean" ? THEME_CLEAN : THEME_DARK;
}

// ── Shared sub-components ─────────────────────────────────────────────────────

const DarkOverlay: React.FC<{ opacity?: number }> = ({ opacity = 0.65 }) => (
  <div style={{ position: "absolute", inset: 0, background: `rgba(0,0,0,${opacity})`, pointerEvents: "none" }} />
);

const ChapterTitle: React.FC<{
  number: string;
  title: string;
  partnerColor: string;
  theme: Theme;
}> = ({ number, title, partnerColor, theme }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = springEntrance(frame, fps, 0);
  const translateY = interpolate(s, [0, 1], [20, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const opacity = fadeIn(frame, 0, 18);

  return (
    <div style={{ position: "absolute", top: 48, left: 64, display: "flex", alignItems: "center", gap: 12, opacity, transform: `translateY(${translateY}px)` }}>
      <div style={{ background: partnerColor, borderRadius: 8, padding: "4px 14px", fontSize: 12, fontWeight: 800, color: "#fff", fontFamily: FONT, letterSpacing: 1.5, textTransform: "uppercase" }}>
        {number}
      </div>
      <div style={{ fontSize: 17, fontWeight: 700, color: theme.textPrimary, fontFamily: FONT }}>
        {title}
      </div>
    </div>
  );
};

interface StatCardProps {
  value: string;
  label: string;
  source?: string;
  color: string;
  delay?: number;
  theme: Theme;
}

const StatCard: React.FC<StatCardProps> = ({ value, label, source, color, delay = 0, theme }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const localFrame = Math.max(0, frame - delay);
  const s = springEntrance(localFrame, fps, 0, SPRING.snappy);
  const scale = interpolate(s, [0, 1], [0.85, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const opacity = fadeIn(localFrame, 0, 12);

  return (
    <div style={{ opacity, transform: `scale(${scale})`, background: theme.bgGlass, backdropFilter: "blur(16px)", border: `1.5px solid ${theme.cardBorder}`, borderRadius: 14, padding: "20px 28px", textAlign: "center", minWidth: 220 }}>
      <div style={{ fontSize: 40, fontWeight: 900, color, fontFamily: FONT, lineHeight: 1, marginBottom: 6 }}>{value}</div>
      <div style={{ fontSize: 14, color: theme.textSecondary, fontFamily: FONT, lineHeight: 1.4 }}>{label}</div>
      {source && <div style={{ fontSize: 11, color: theme.textMuted, fontFamily: FONT, marginTop: 6 }}>{source}</div>}
    </div>
  );
};

// ── Chapter renderers ─────────────────────────────────────────────────────────

const StatsChapter: React.FC<{ chapter: Chapter; spec: TutorialSpec; theme: Theme }> = ({ chapter, spec, theme }) => {
  const totalFrames = (chapter.end_sec - chapter.start_sec) * 30;
  const stats = (chapter.content.data?.stats as Array<{ value: string; label: string; source?: string; color?: string }>) ?? [];

  return (
    <AbsoluteFill style={{ background: theme.bg }}>
      <ChapterTitle number={chapter.number} title={chapter.title} partnerColor={spec.partner.color} theme={theme} />
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", gap: 32, padding: "120px 64px 80px" }}>
        {stats.map((s, i) => (
          <StatCard key={i} value={s.value} label={s.label} source={s.source} color={s.color ?? theme.accent} delay={i * 12} theme={theme} />
        ))}
      </div>
    </AbsoluteFill>
  );
};

const ListChapter: React.FC<{ chapter: Chapter; spec: TutorialSpec; theme: Theme }> = ({ chapter, spec, theme }) => {
  const frame = useCurrentFrame();
  const items = (chapter.content.data?.items as Array<{ icon: string; title: string; desc: string; color?: string }>) ?? [];

  return (
    <AbsoluteFill style={{ background: theme.bg }}>
      <ChapterTitle number={chapter.number} title={chapter.title} partnerColor={spec.partner.color} theme={theme} />
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", gap: 24, padding: "120px 64px 80px" }}>
        {items.map((item, i) => {
          const localFrame = Math.max(0, frame - i * 10);
          const opacity = fadeIn(localFrame, 0, 15);
          const translateY = interpolate(localFrame, [0, 15], [28, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          const color = item.color ?? theme.accent;
          return (
            <div key={i} style={{ opacity, transform: `translateY(${translateY}px)`, background: `${color}12`, border: `1.5px solid ${color}44`, borderRadius: 16, padding: "24px 20px", flex: 1, textAlign: "center" }}>
              <div style={{ fontSize: 36, marginBottom: 10 }}>{item.icon}</div>
              <div style={{ fontSize: 14, fontWeight: 800, color, fontFamily: FONT, marginBottom: 8 }}>{item.title}</div>
              <div style={{ fontSize: 12, color: theme.textMuted, fontFamily: FONT, lineHeight: 1.5 }}>{item.desc}</div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

const ComparisonChapter: React.FC<{ chapter: Chapter; spec: TutorialSpec; theme: Theme }> = ({ chapter, spec, theme }) => {
  const frame = useCurrentFrame();
  const rows = (chapter.content.data?.rows as Array<{ label: string; value: string; unit: string; color: string; highlight?: boolean }>) ?? [];
  const headline = (chapter.content.data?.headline as string) ?? "";

  return (
    <AbsoluteFill style={{ background: theme.bg }}>
      <ChapterTitle number={chapter.number} title={chapter.title} partnerColor={spec.partner.color} theme={theme} />
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 28, padding: "120px 64px 60px" }}>
        {headline && (
          <div style={{ fontSize: 22, fontWeight: 800, color: theme.textPrimary, fontFamily: FONT, textAlign: "center", marginBottom: 8 }}>{headline}</div>
        )}
        <div style={{ display: "flex", gap: 24 }}>
          {rows.map((row, i) => {
            const localFrame = Math.max(0, frame - i * 12);
            const opacity = fadeIn(localFrame, 0, 15);
            return (
              <div key={i} style={{ opacity, background: row.highlight ? `${row.color}18` : theme.bgGlass, border: `${row.highlight ? 2 : 1.5}px solid ${row.highlight ? row.color : theme.cardBorder}`, borderRadius: 16, padding: "24px 32px", minWidth: 220, textAlign: "center" }}>
                <div style={{ fontSize: 12, color: theme.textMuted, fontFamily: FONT, marginBottom: 10, textTransform: "uppercase", letterSpacing: 1 }}>{row.label}</div>
                <div style={{ fontSize: 38, fontWeight: 900, color: row.color, fontFamily: FONT, lineHeight: 1 }}>{row.value}</div>
                <div style={{ fontSize: 12, color: theme.textMuted, fontFamily: FONT, marginTop: 8, lineHeight: 1.4 }}>{row.unit}</div>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};

const BlankChapter: React.FC<{ chapter: Chapter; spec: TutorialSpec; theme: Theme }> = ({ chapter, spec, theme }) => (
  <AbsoluteFill style={{ background: theme.bg }}>
    {chapter.bg === "video" && chapter.video_src && (
      // eslint-disable-next-line @remotion/warn-native-media-tag
      <video src={staticFile(chapter.video_src)} style={{ width: "100%", height: "100%", objectFit: "cover" }} autoPlay muted />
    )}
    {chapter.bg === "video" && <DarkOverlay />}
    <ChapterTitle number={chapter.number} title={chapter.title} partnerColor={spec.partner.color} theme={theme} />
  </AbsoluteFill>
);

// ── Hook card (first chapter always) ─────────────────────────────────────────

const HookCard: React.FC<{ spec: TutorialSpec; theme: Theme; totalFrames: number }> = ({ spec, theme, totalFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const opacity = interpolate(frame, [0, 20, totalFrames - 25, totalFrames], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "center", paddingLeft: 96, paddingRight: 400, opacity }}>
      {/* Co-brand badge */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
        <span style={{ fontSize: 12, fontWeight: 800, color: spec.partner.color, letterSpacing: 2, fontFamily: FONT }}>{spec.partner.name.toUpperCase()}</span>
        <span style={{ color: theme.textMuted, fontSize: 16 }}>×</span>
        <span style={{ fontSize: 12, fontWeight: 800, color: spec.co_brand.color, letterSpacing: 2, fontFamily: FONT }}>{spec.co_brand.name.toUpperCase()}</span>
      </div>
      {/* Stats */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 32 }}>
        {spec.hook_stats.map((s, i) => {
          const localFrame = Math.max(0, frame - i * 8);
          const so = springEntrance(localFrame, fps, 0, SPRING.snappy);
          const sc = interpolate(so, [0, 1], [0.9, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          return (
            <div key={i} style={{ transform: `scale(${sc})` }}>
              <span style={{ fontSize: 56, fontWeight: 900, color: s.color ?? theme.accent, fontFamily: FONT, lineHeight: 1 }}>{s.value}</span>
              <span style={{ fontSize: 22, color: theme.textSecondary, fontFamily: FONT, marginLeft: 14 }}>{s.label}</span>
            </div>
          );
        })}
      </div>
      <div style={{ fontSize: 14, color: theme.textMuted, fontFamily: FONT }}>
        Built by <span style={{ color: theme.textPrimary, fontWeight: 700 }}>{spec.outro.presenter}</span>
      </div>
    </div>
  );
};

// ── Outro card ────────────────────────────────────────────────────────────────

const OutroCard: React.FC<{ spec: TutorialSpec; theme: Theme }> = ({ spec, theme }) => {
  const frame = useCurrentFrame();
  const opacity = fadeIn(frame, 0, 25);

  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 20, opacity }}>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <span style={{ fontSize: 14, fontWeight: 800, color: spec.partner.color, letterSpacing: 2, fontFamily: FONT }}>{spec.partner.name.toUpperCase()}</span>
        <span style={{ color: theme.textMuted, fontSize: 20 }}>×</span>
        <span style={{ fontSize: 14, fontWeight: 800, color: spec.co_brand.color, letterSpacing: 2, fontFamily: FONT }}>{spec.co_brand.name.toUpperCase()}</span>
      </div>
      <div style={{ fontSize: 34, fontWeight: 900, color: theme.textPrimary, fontFamily: FONT, textAlign: "center", lineHeight: 1.2, maxWidth: 700 }}>
        {spec.outro.tagline}
      </div>
      <div style={{ fontSize: 15, color: theme.textSecondary, fontFamily: FONT, textAlign: "center" }}>{spec.outro.sub}</div>
      <div style={{ fontSize: 13, color: theme.textMuted, fontFamily: FONT, marginTop: 12 }}>
        {spec.outro.presenter}  ·  Links in description
      </div>
    </div>
  );
};

// ── Chapter dispatcher ─────────────────────────────────────────────────────────

const ChapterFrame: React.FC<{ chapter: Chapter; spec: TutorialSpec; theme: Theme; isFirst: boolean; isLast: boolean }> = ({ chapter, spec, theme, isFirst, isLast }) => {
  const totalFrames = (chapter.end_sec - chapter.start_sec) * 30;

  if (isFirst) {
    return (
      <AbsoluteFill>
        {chapter.video_src && (
          // eslint-disable-next-line @remotion/warn-native-media-tag
          <video src={staticFile(chapter.video_src)} style={{ width: "100%", height: "100%", objectFit: "cover" }} autoPlay muted />
        )}
        {!chapter.video_src && <div style={{ position: "absolute", inset: 0, background: theme.bg }} />}
        <DarkOverlay opacity={0.7} />
        <HookCard spec={spec} theme={theme} totalFrames={totalFrames} />
      </AbsoluteFill>
    );
  }

  if (isLast) {
    return (
      <AbsoluteFill>
        {chapter.video_src && (
          // eslint-disable-next-line @remotion/warn-native-media-tag
          <video src={staticFile(chapter.video_src)} style={{ width: "100%", height: "100%", objectFit: "cover" }} autoPlay muted />
        )}
        {!chapter.video_src && <div style={{ position: "absolute", inset: 0, background: theme.bg }} />}
        <DarkOverlay opacity={0.8} />
        <OutroCard spec={spec} theme={theme} />
      </AbsoluteFill>
    );
  }

  switch (chapter.content.type) {
    case "stats":    return <StatsChapter chapter={chapter} spec={spec} theme={theme} />;
    case "list":     return <ListChapter chapter={chapter} spec={spec} theme={theme} />;
    case "comparison": return <ComparisonChapter chapter={chapter} spec={spec} theme={theme} />;
    default:         return <BlankChapter chapter={chapter} spec={spec} theme={theme} />;
  }
};

// ── Main composition ──────────────────────────────────────────────────────────

export const YouTubeTutorial: React.FC<YouTubeTutorialProps> = ({ spec, layout = "cinematic" }) => {
  const theme = themeFromLayout(layout);
  const totalChapters = spec.chapters.length;

  return (
    <AbsoluteFill style={{ backgroundColor: theme.bg }}>
      {spec.voiceover_src && <Audio src={staticFile(spec.voiceover_src)} volume={1.0} />}

      {spec.chapters.map((chapter, idx) => (
        <Sequence
          key={chapter.id}
          from={chapter.start_sec * 30}
          durationInFrames={(chapter.end_sec - chapter.start_sec) * 30}
          layout="none"
        >
          <ChapterFrame
            chapter={chapter}
            spec={spec}
            theme={theme}
            isFirst={idx === 0}
            isLast={idx === totalChapters - 1}
          />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};

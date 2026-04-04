/**
 * Tutorial - "From AI Demo to Enterprise Solutions"
 * 18-minute YouTube explainer - built chapter by chapter
 *
 * Voice: Linda Mohamed custom clone (ElevenLabs ttn4VvmCIm5phDs4dj5o)
 * Voiceover: voiceover-full-explainer-v1.txt
 *
 * ── Status ────────────────────────────────────────────────────────
 * Scene 1  HOOK         f0–1138       ✅ done
 * Scene 2  ORIGIN       pending
 * Scene 3  CUSTOMERS    pending
 * ...
 * ─────────────────────────────────────────────────────────────────
 *
 * Timecodes are approximate - update from ElevenLabs subtitle data
 * once voiceover is regenerated (no colon in "re:Invent" → "AWS re Invent").
 *
 * Clips live in public/clips/ - symlink or copy from netapp-video-overlay/public/clips
 */

import React from "react";
import {
  AbsoluteFill,
  Audio,
  Sequence,
  Video,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { fadeIn, slideIn, springEntrance, SPRING } from "../_shared/animations";

// ── Design tokens (matches lindamohamed.com) ──────────────────────
const G     = "#27ae60"; // primary green
const G2    = "#2ecc71"; // lighter green
const WHITE = "#ffffff";
const MUTED = "rgba(255,255,255,0.50)";
const BG    = "#080808"; // near-black
const FONT_DISPLAY = '"Fira Sans","Inter",sans-serif';
const FONT_BODY    = '"Open Sans","Inter",sans-serif';

// ── Total frames (grows as scenes are added) ──────────────────────
// Scene 1: HOOK 0–1138 (37.9s)
export const TOTAL_FRAMES = 1138;

// ── Scene offsets ─────────────────────────────────────────────────
const S_HOOK = 0;
// const S_ORIGIN = 1138; // next scene - uncomment when building

// ── Helpers ───────────────────────────────────────────────────────

/** Fade in at frame `at`, over `dur` frames */
function fi(frame: number, at: number, dur = 12): number {
  return interpolate(frame, [at, at + dur], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
}

/** Fade in then hold - text that stays on screen */
function fih(frame: number, at: number, dur = 12): number {
  return interpolate(frame, [at, at + dur], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
}

// ── Video background helper ───────────────────────────────────────
const VideoBg: React.FC<{ src: string; startFrom?: number; opacity?: number }> = ({
  src,
  startFrom = 0,
  opacity = 0.45,
}) => (
  <AbsoluteFill style={{ opacity }}>
    <Video
      src={staticFile(src)}
      startFrom={startFrom}
      style={{ width: "100%", height: "100%", objectFit: "cover" }}
      muted
    />
  </AbsoluteFill>
);

// ── Scene 1: HOOK ─────────────────────────────────────────────────
// Voiceover text (Scene 1):
//   "Las Vegas. AWS re Invent 2024."
//   "I land in Vienna at two in the morning."
//   "I open my photo roll."
//   "One year. / Twelve conferences. / Six countries."
//   "Four hundred and ninety-three unedited clips."
//   "I had told myself I'd make a yearly recap video."
//   "You know the kind. Conference highlights. Best moments. The story of the year."
//   "I opened the folder. / I looked at the files."
//   "And then I did what every engineer does when they should be editing."
//   "I started overengineering." ← IMPACT MOMENT
//   "Six months later - I had four enterprise customers. An open-source community project.
//    And an AI pipeline that runs on AWS."
//   "This is that story."
//
// ⚠️  Frame numbers below are APPROXIMATE.
//     Update from ElevenLabs subtitle JSON once audio is regenerated.

const SceneHook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ── Video background - phase-based clips ──
  // Las Vegas / re:Invent clips first, then conference clips
  const clips: Array<{ src: string; from: number; dur: number; startFrom?: number }> = [
    { src: "clips/reinvent_clip_1.mov", from: 0,   dur: 192 },
    { src: "clips/reinvent_10.mp4",     from: 192, dur: 150 },
    { src: "clips/reinvent_5.mp4",      from: 342, dur: 150 },
    { src: "clips/reinvent_80.mp4",     from: 492, dur: 120 },
    { src: "clips/reinvent_clip_3.mov", from: 612, dur: 130 },
    { src: "clips/prague_25.mp4",       from: 742, dur: 124, startFrom: 180 },
    { src: "clips/prague_11.mp4",       from: 866, dur: 272 },
  ];

  // "I started overengineering." impact pulse
  const impactAt = 870;
  const impactScale = interpolate(
    frame,
    [impactAt, impactAt + 8, impactAt + 20, impactAt + 60],
    [0.7, 1.08, 1.0, 1.0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const impactOpacity = fi(frame, impactAt, 8);
  const impactFlash = interpolate(
    frame,
    [impactAt, impactAt + 4, impactAt + 18],
    [0.18, 0, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill style={{ background: BG }}>

      {/* ── Video clips ── */}
      {clips.map((c) => (
        <Sequence key={c.src + c.from} from={c.from} durationInFrames={c.dur} layout="none">
          <VideoBg src={c.src} startFrom={c.startFrom ?? 0} opacity={0.45} />
        </Sequence>
      ))}

      {/* ── Gradient overlay - dark vignette, always on ── */}
      <AbsoluteFill style={{
        background: "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.20) 40%, rgba(0,0,0,0.70) 100%)",
        pointerEvents: "none",
      }} />

      {/* ── Impact flash on "I started overengineering." ── */}
      <AbsoluteFill style={{
        background: `rgba(255,255,255,${impactFlash})`,
        pointerEvents: "none",
      }} />

      {/* ── Content layer ── */}
      <AbsoluteFill style={{ padding: "80px 100px" }}>

        {/* Location tag - "Las Vegas. AWS re:Invent 2024." */}
        <div style={{
          position: "absolute",
          top: 80,
          left: 100,
          opacity: fih(frame, 0),
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}>
          {/* Green accent bar */}
          <div style={{ width: 4, height: 28, background: G, borderRadius: 2, opacity: fi(frame, 4, 10) }} />
          <span style={{
            fontFamily: FONT_DISPLAY,
            fontWeight: 700,
            fontSize: 22,
            color: MUTED,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}>
            Las Vegas · AWS re:Invent 2024
          </span>
        </div>

        {/* ── Main narrative stack - lines appear sequentially ── */}
        <div style={{
          position: "absolute",
          bottom: 200,
          left: 100,
          right: 200,
          display: "flex",
          flexDirection: "column",
          gap: 0,
        }}>

          {/* "I land in Vienna at two in the morning." */}
          <div style={{
            opacity: fih(frame, 55),
            transform: `translateY(${interpolate(fi(frame, 55), [0, 1], [16, 0])}px)`,
            fontFamily: FONT_BODY,
            fontSize: 38,
            fontWeight: 400,
            color: WHITE,
            lineHeight: 1.5,
            marginBottom: 6,
          }}>
            I land in Vienna at two in the morning.
          </div>

          {/* "I open my photo roll." */}
          <div style={{
            opacity: fih(frame, 145),
            transform: `translateY(${interpolate(fi(frame, 145), [0, 1], [14, 0])}px)`,
            fontFamily: FONT_BODY,
            fontSize: 38,
            fontWeight: 400,
            color: WHITE,
            lineHeight: 1.5,
            marginBottom: 24,
          }}>
            I open my photo roll.
          </div>

          {/* Stats trio: "One year. / Twelve conferences. / Six countries." */}
          <div style={{
            opacity: fih(frame, 210),
            display: "flex",
            gap: 48,
            marginBottom: 24,
          }}>
            {[
              { num: "1",   label: "year" },
              { num: "12",  label: "conferences" },
              { num: "6",   label: "countries" },
            ].map((s, i) => (
              <div
                key={s.label}
                style={{
                  opacity: fi(frame, 210 + i * 20, 14),
                  transform: `translateY(${interpolate(fi(frame, 210 + i * 20, 14), [0, 1], [14, 0])}px)`,
                }}
              >
                <span style={{
                  fontFamily: FONT_DISPLAY,
                  fontWeight: 900,
                  fontSize: 64,
                  color: G2,
                  lineHeight: 1,
                  display: "block",
                }}>
                  {s.num}
                </span>
                <span style={{
                  fontFamily: FONT_BODY,
                  fontSize: 20,
                  color: MUTED,
                  display: "block",
                  marginTop: 2,
                }}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>

          {/* "Four hundred and ninety-three unedited clips." */}
          <div style={{
            opacity: fih(frame, 310),
            transform: `translateY(${interpolate(fi(frame, 310), [0, 1], [14, 0])}px)`,
            fontFamily: FONT_DISPLAY,
            fontWeight: 800,
            fontSize: 52,
            color: WHITE,
            marginBottom: 8,
          }}>
            493 unedited clips.
          </div>

        </div>

        {/* ── "I had told myself..." - mid-scene text ── */}
        <Sequence from={390} durationInFrames={260} layout="none">
          <HookMidText frame={frame} />
        </Sequence>

        {/* ── "I started overengineering." - IMPACT ── */}
        {frame >= impactAt && frame < 990 && (
          <AbsoluteFill style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}>
            <div style={{
              opacity: impactOpacity,
              transform: `scale(${impactScale})`,
              textAlign: "center",
            }}>
              <div style={{
                fontFamily: FONT_DISPLAY,
                fontWeight: 900,
                fontSize: 110,
                color: WHITE,
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
              }}>
                I started
              </div>
              <div style={{
                fontFamily: FONT_DISPLAY,
                fontWeight: 900,
                fontSize: 110,
                color: G,
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
              }}>
                overengineering.
              </div>
            </div>
          </AbsoluteFill>
        )}

        {/* ── "Six months later..." - outcome stats ── */}
        <Sequence from={990} durationInFrames={90} layout="none">
          <HookOutcome frame={frame - 990} />
        </Sequence>

        {/* ── "This is that story." ── */}
        {frame >= 1080 && (
          <AbsoluteFill style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
            <div style={{
              opacity: fi(frame, 1080, 16),
              fontFamily: FONT_DISPLAY,
              fontWeight: 700,
              fontSize: 56,
              color: WHITE,
              textAlign: "center",
              letterSpacing: "0.01em",
            }}>
              This is that story.
            </div>
          </AbsoluteFill>
        )}

      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ── "I had told myself..." mid-section ───────────────────────────
const HookMidText: React.FC<{ frame: number }> = ({ frame }) => {
  const localF = frame - 390;
  return (
    <AbsoluteFill style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      padding: "0 100px",
      gap: 16,
    }}>
      <div style={{
        opacity: fi(localF, 0, 14),
        transform: `translateY(${interpolate(fi(localF, 0, 14), [0, 1], [18, 0])}px)`,
        fontFamily: FONT_BODY,
        fontSize: 38,
        fontWeight: 400,
        color: "rgba(255,255,255,0.75)",
        lineHeight: 1.5,
      }}>
        I had told myself I'd make a yearly recap video.
      </div>
      <div style={{
        opacity: fi(localF, 60, 14),
        transform: `translateY(${interpolate(fi(localF, 60, 14), [0, 1], [14, 0])}px)`,
        fontFamily: FONT_BODY,
        fontSize: 34,
        fontWeight: 400,
        color: MUTED,
        lineHeight: 1.5,
      }}>
        You know the kind. Conference highlights. Best moments. The story of the year.
      </div>
      <div style={{
        opacity: fi(localF, 140, 14),
        fontFamily: FONT_BODY,
        fontSize: 38,
        fontWeight: 400,
        color: WHITE,
        lineHeight: 1.5,
      }}>
        I opened the folder.
      </div>
      <div style={{
        opacity: fi(localF, 175, 14),
        fontFamily: FONT_BODY,
        fontSize: 38,
        fontWeight: 400,
        color: WHITE,
        lineHeight: 1.5,
      }}>
        I looked at the files.
      </div>
      <div style={{
        opacity: fi(localF, 210, 14),
        fontFamily: FONT_BODY,
        fontSize: 34,
        fontWeight: 400,
        color: MUTED,
        lineHeight: 1.5,
      }}>
        And then I did what every engineer does when they should be editing.
      </div>
    </AbsoluteFill>
  );
};

// ── "Six months later..." outcome ────────────────────────────────
const HookOutcome: React.FC<{ frame: number }> = ({ frame }) => {
  const outcomes = [
    { value: "4",        label: "enterprise customers" },
    { value: "1",        label: "open-source community project" },
    { value: "AWS",      label: "AI pipeline running on" },
  ];

  return (
    <AbsoluteFill style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 20,
      padding: "0 120px",
    }}>
      <div style={{
        opacity: fi(frame, 0, 12),
        fontFamily: FONT_BODY,
        fontSize: 28,
        color: MUTED,
        textAlign: "center",
        marginBottom: 16,
      }}>
        Six months later -
      </div>
      <div style={{ display: "flex", gap: 48, alignItems: "flex-start" }}>
        {outcomes.map((o, i) => (
          <div
            key={o.label}
            style={{
              opacity: fi(frame, 12 + i * 16, 14),
              transform: `translateY(${interpolate(fi(frame, 12 + i * 16, 14), [0, 1], [20, 0])}px)`,
              textAlign: "center",
              flex: 1,
              padding: "20px 24px",
              background: "rgba(39,174,96,0.08)",
              border: `1px solid rgba(39,174,96,0.30)`,
              borderRadius: 14,
            }}
          >
            <div style={{
              fontFamily: FONT_DISPLAY,
              fontWeight: 900,
              fontSize: 56,
              color: G,
              lineHeight: 1,
              marginBottom: 8,
            }}>
              {o.value}
            </div>
            <div style={{
              fontFamily: FONT_BODY,
              fontSize: 18,
              color: MUTED,
              lineHeight: 1.4,
            }}>
              {o.label}
            </div>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};

// ── Main composition ──────────────────────────────────────────────

export const AIDemoToEnterpriseTutorial: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: BG }}>
      {/* Voiceover - uncomment when audio is ready */}
      {/* <Audio src={staticFile("audio/ai-demo-enterprise-v1.mp3")} volume={1.0} /> */}

      {/* ── Scene 1: HOOK (f0–1138) ── */}
      <Sequence from={S_HOOK} durationInFrames={1138} layout="none">
        <SceneHook />
      </Sequence>

      {/* ── Scene 2: ORIGIN - coming next ── */}
      {/* <Sequence from={1138} durationInFrames={...} layout="none">
        <SceneOrigin />
      </Sequence> */}
    </AbsoluteFill>
  );
};

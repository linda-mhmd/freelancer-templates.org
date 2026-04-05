import React, { useState, useCallback, useRef, useEffect } from "react";
import { Player, PlayerRef } from "@remotion/player";
import {
  COMPOSITIONS, COMP_BY_ID, CATEGORIES,
  TOTAL_COMPOSITIONS, TOTAL_TEMPLATE_TYPES,
  type CompSpec,
} from "./registry";
import { type BrandKit } from "@templates/_shared/themes";

// ── URL param helpers ─────────────────────────────────────────────

function getCompFromUrl(): string {
  return new URLSearchParams(window.location.search).get("comp") ?? "";
}

function isEmbed(): boolean {
  return new URLSearchParams(window.location.search).get("embed") === "1";
}

/** Read brand color URL params and return a BrandKit, or undefined if none present.
 *  Params use bare hex values without the # prefix: brandPrimary=ff0000
 */
function getBrandKitFromUrl(): BrandKit | undefined {
  const params = new URLSearchParams(window.location.search);
  const primary   = params.get("brandPrimary");
  const secondary = params.get("brandSecondary");
  const accent    = params.get("brandAccent");
  const bg        = params.get("brandBg");
  const text      = params.get("brandText");
  if (!primary && !secondary && !accent && !bg && !text) return undefined;
  return {
    ...(primary   ? { primaryColor:   `#${primary}`   } : {}),
    ...(secondary ? { secondaryColor: `#${secondary}` } : {}),
    ...(accent    ? { accentColor:    `#${accent}`    } : {}),
    ...(bg        ? { bgColor:        `#${bg}`        } : {}),
    ...(text      ? { textColor:      `#${text}`      } : {}),
  };
}

function setCompInUrl(id: string) {
  const url = new URL(window.location.href);
  url.searchParams.set("comp", id);
  window.history.replaceState({}, "", url.toString());
}

// ── Display helpers ───────────────────────────────────────────────

function formatCategory(cat: string): string {
  return cat.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/^./, (c) => c.toUpperCase());
}

function formatCompName(id: string): string {
  const parts = id.split("-");
  return parts.slice(1).join(" - ");
}

// ── Main App ──────────────────────────────────────────────────────

const THEME_FILTERS = [
  "all",
  // Original 6
  "dark", "clean", "bold", "warm", "minimal", "neon",
  // Extended 10
  "ocean", "sunset", "forest", "rose", "gold",
  "midnight", "crimson", "lavender", "arctic", "espresso",
] as const;
type ThemeFilter = (typeof THEME_FILTERS)[number];

export const App: React.FC = () => {
  const embed = isEmbed();
  const initialId = getCompFromUrl();
  const initialComp = COMP_BY_ID[initialId] ?? COMPOSITIONS[0];
  const brandKit = getBrandKitFromUrl();

  const [active, setActive] = useState<CompSpec>(initialComp);
  const [search, setSearch] = useState("");
  const [themeFilter, setThemeFilter] = useState<ThemeFilter>("all");
  const playerRef = useRef<PlayerRef>(null);

  const select = useCallback((comp: CompSpec) => {
    setActive(comp);
    setCompInUrl(comp.id);
    playerRef.current?.seekTo(0);
  }, []);

  // Keyboard navigation + theme shortcuts (1-9 for first 9 filters)
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement) return;
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        const idx = COMPOSITIONS.indexOf(active);
        if (idx < COMPOSITIONS.length - 1) select(COMPOSITIONS[idx + 1]);
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        const idx = COMPOSITIONS.indexOf(active);
        if (idx > 0) select(COMPOSITIONS[idx - 1]);
      } else {
        const num = parseInt(e.key, 10);
        if (num >= 1 && num <= THEME_FILTERS.length) {
          setThemeFilter(THEME_FILTERS[num - 1]);
        }
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [active, select]);

  const filtered = COMPOSITIONS.filter((c) => {
    const matchesSearch = !search.trim() || c.id.toLowerCase().includes(search.toLowerCase());
    const matchesTheme = themeFilter === "all" || c.id.toLowerCase().includes(`-${themeFilter}`);
    return matchesSearch && matchesTheme;
  });

  // Embed mode - player only
  if (embed) {
    return (
      <div style={{ width: "100vw", height: "100vh", background: "#0f172a", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Player
          ref={playerRef}
          component={active.component}
          inputProps={{ brandKit }}
          durationInFrames={active.durationInFrames}
          fps={active.fps}
          compositionWidth={active.width}
          compositionHeight={active.height}
          style={{ width: "100%", aspectRatio: "16/9" }}
          controls
          loop
          autoPlay
        />
      </div>
    );
  }

  return (
    <div style={styles.root}>
      {/* Sidebar */}
      <aside style={styles.sidebar}>
        {/* Header */}
        <div style={styles.sidebarHead}>
          <div style={styles.siteTitle}>freelancer-templates.org</div>
          <div style={styles.counts}>
            {TOTAL_COMPOSITIONS} compositions - {TOTAL_TEMPLATE_TYPES} types
          </div>
          <input
            style={styles.search}
            placeholder="Search templates..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div style={styles.themeFilters}>
            {THEME_FILTERS.map((t) => (
              <button
                key={t}
                style={{
                  ...styles.themeBtn,
                  ...(themeFilter === t ? styles.themeBtnActive : {}),
                }}
                onClick={() => setThemeFilter(t)}
                title={t === "all" ? "Show all themes" : `Show ${t} theme only`}
              >
                {t === "all" ? "All" : t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Composition list grouped by category */}
        <div style={styles.compList}>
          {CATEGORIES.map((cat) => {
            const comps = filtered.filter((c) => c.category === cat);
            if (!comps.length) return null;
            return (
              <div key={cat} style={styles.catGroup}>
                <div style={styles.catLabel}>{formatCategory(cat)}</div>
                {comps.map((comp) => (
                  <button
                    key={comp.id}
                    style={{
                      ...styles.compBtn,
                      ...(comp.id === active.id ? styles.compBtnActive : {}),
                    }}
                    onClick={() => select(comp)}
                  >
                    {formatCompName(comp.id)}
                  </button>
                ))}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div style={styles.sidebarFoot}>
          <a href="/" style={styles.footLink}>
            Back to library
          </a>
          <a
            href="https://github.com/mzzavaa/freelancer-templates.org"
            target="_blank"
            rel="noopener"
            style={styles.footLink}
          >
            GitHub
          </a>
        </div>
      </aside>

      {/* Main area */}
      <main style={styles.main}>
        {/* Composition header */}
        <div style={styles.compHeader}>
          <div style={styles.compTitle}>{active.id}</div>
          <div style={styles.compMeta}>
            {active.width}x{active.height} - {active.fps}fps - {active.durationInFrames / active.fps}s
          </div>
          <div style={styles.navHint}>
            ← → to navigate between compositions
          </div>
        </div>

        {/* Player */}
        <div style={styles.playerWrap}>
          <Player
            ref={playerRef}
            key={active.id}
            component={active.component}
            inputProps={{ brandKit }}
            durationInFrames={active.durationInFrames}
            fps={active.fps}
            compositionWidth={active.width}
            compositionHeight={active.height}
            style={styles.player}
            controls
            loop
            autoPlay
            clickToPlay
          />
        </div>

        {/* Usage code block */}
        <div style={styles.codeBlock}>
          <div style={styles.codeHeader}>
            <span style={{ color: "#ef4444" }}>●</span>
            <span style={{ color: "#f59e0b" }}>●</span>
            <span style={{ color: "#22c55e" }}>●</span>
            <span style={styles.codeLabel}>Remotion CLI</span>
          </div>
          <pre style={styles.codePre}>
            <span style={{ color: "#94a3b8" }}># Render this composition</span>{"\n"}
            <span style={{ color: "#60a5fa" }}>npx remotion render</span>
            {" "}
            <span style={{ color: "#4ade80" }}>{active.id}</span>
            {" "}
            <span style={{ color: "#a78bfa" }}>out/{active.id.toLowerCase().replace(/-/g, "_")}.mp4</span>
            {"\n\n"}
            <span style={{ color: "#94a3b8" }}># Or render all variants</span>{"\n"}
            <span style={{ color: "#60a5fa" }}>npx remotion render</span>
            {" "}
            <span style={{ color: "#4ade80" }}>{active.category.charAt(0).toUpperCase() + active.category.slice(1)}*</span>
            {" "}
            <span style={{ color: "#a78bfa" }}>out/</span>
          </pre>
        </div>
      </main>
    </div>
  );
};

// ── Styles ────────────────────────────────────────────────────────

const styles: Record<string, React.CSSProperties> = {
  root: {
    display: "flex",
    height: "100vh",
    background: "#0f172a",
    color: "#e2e8f0",
    fontFamily: "'Inter', system-ui, sans-serif",
    overflow: "hidden",
  },
  sidebar: {
    width: 260,
    minWidth: 260,
    borderRight: "1px solid #1e293b",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },
  sidebarHead: {
    padding: "16px 14px 12px",
    borderBottom: "1px solid #1e293b",
    flexShrink: 0,
  },
  siteTitle: {
    fontSize: 13,
    fontWeight: 700,
    color: "#4a90d9",
    marginBottom: 4,
    letterSpacing: 0.3,
  },
  counts: {
    fontSize: 11,
    color: "#64748b",
    marginBottom: 10,
  },
  search: {
    width: "100%",
    background: "#1e293b",
    border: "1px solid #334155",
    borderRadius: 6,
    padding: "6px 10px",
    fontSize: 12,
    color: "#e2e8f0",
    outline: "none",
  },
  themeFilters: {
    display: "flex",
    flexWrap: "wrap" as const,
    gap: 4,
    marginTop: 8,
  },
  themeBtn: {
    padding: "3px 7px",
    fontSize: 10,
    fontWeight: 600,
    letterSpacing: 0.3,
    border: "1px solid #1e293b",
    borderRadius: 4,
    background: "transparent",
    color: "#475569",
    cursor: "pointer",
    transition: "all .1s",
  },
  themeBtnActive: {
    background: "#1e293b",
    color: "#e2e8f0",
    borderColor: "#4a90d9",
  },
  compList: {
    flex: 1,
    overflowY: "auto",
    padding: "8px 0",
  },
  catGroup: {
    marginBottom: 4,
  },
  catLabel: {
    fontSize: 10,
    fontWeight: 700,
    color: "#475569",
    textTransform: "uppercase",
    letterSpacing: 1,
    padding: "8px 14px 4px",
  },
  compBtn: {
    display: "block",
    width: "100%",
    textAlign: "left",
    padding: "5px 14px",
    fontSize: 12,
    color: "#94a3b8",
    background: "transparent",
    border: "none",
    cursor: "pointer",
    borderRadius: 0,
    transition: "background .1s, color .1s",
  },
  compBtnActive: {
    background: "#1e293b",
    color: "#e2e8f0",
    borderLeft: "2px solid #4a90d9",
    paddingLeft: 12,
  },
  sidebarFoot: {
    padding: "12px 14px",
    borderTop: "1px solid #1e293b",
    display: "flex",
    gap: 12,
    flexShrink: 0,
  },
  footLink: {
    fontSize: 12,
    color: "#64748b",
    textDecoration: "none",
  },
  main: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    padding: "20px 24px",
    gap: 16,
  },
  compHeader: {
    display: "flex",
    alignItems: "baseline",
    gap: 16,
    flexShrink: 0,
  },
  compTitle: {
    fontSize: 18,
    fontWeight: 700,
    color: "#f1f5f9",
  },
  compMeta: {
    fontSize: 12,
    color: "#64748b",
  },
  navHint: {
    fontSize: 11,
    color: "#475569",
    marginLeft: "auto",
  },
  playerWrap: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 0,
  },
  player: {
    width: "100%",
    maxWidth: "calc((100vh - 220px) * 16 / 9)",
    aspectRatio: "16/9",
    borderRadius: 8,
    overflow: "hidden",
    boxShadow: "0 20px 60px rgba(0,0,0,.6)",
  },
  codeBlock: {
    background: "#020617",
    border: "1px solid #1e293b",
    borderRadius: 8,
    overflow: "hidden",
    flexShrink: 0,
  },
  codeHeader: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    padding: "8px 14px",
    borderBottom: "1px solid #1e293b",
    fontSize: 12,
  },
  codeLabel: {
    color: "#475569",
    marginLeft: 4,
    fontSize: 11,
  },
  codePre: {
    padding: "12px 14px",
    margin: 0,
    fontSize: 12,
    lineHeight: 1.7,
    fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
    color: "#e2e8f0",
    overflowX: "auto",
  },
};

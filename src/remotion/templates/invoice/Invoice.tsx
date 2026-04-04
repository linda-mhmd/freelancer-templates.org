/**
 * Invoice Template — Animated payment reminder videos for freelancers.
 *
 * LAYOUTS:
 *   "friendly"      — Soft, gentle reminder tone. Warm colors, friendly icons.
 *   "professional"   — Clean, business-like invoice layout. Structured grid.
 *   "urgent"         — Bold, attention-grabbing. Red accents for overdue emphasis.
 *
 * BACKGROUND PATTERNS:
 *   "grid" | "dots" | "hex" | "none"
 *
 * DATA CONTRACT (InvoiceSpec):
 *   {
 *     client_name: string,
 *     freelancer_name: string,
 *     invoice_number: string,
 *     amount: number,
 *     currency: string,
 *     due_date: string,
 *     status: "due" | "overdue" | "paid",
 *     items: [{ description: string, amount: number }],
 *     payment_link: string,
 *     note: string,
 *   }
 *
 * USAGE:
 *   <Invoice spec={mySpec} theme={THEME_CLEAN} layout="professional" />
 */

import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  Sequence,
} from "remotion";
import type { Theme } from "../_shared/themes";
import {
  springEntrance,
  fadeIn,
  slideIn,
  staggerDelay,
  SPRING,
} from "../_shared/animations";
import { PADDING, TOP_SAFE, TYPE } from "../_shared/layouts";
import {
  GlassCard,
  GradientBadge,
  BackgroundGrid,
  CountUp,
} from "../_shared/components";

// ── Data Contract ───────────────────────────────────────────────

export interface InvoiceItem {
  description: string;
  amount: number;
}

export interface InvoiceSpec {
  client_name: string;
  freelancer_name: string;
  invoice_number: string;
  amount: number;
  currency: string;
  due_date: string;
  status: "due" | "overdue" | "paid";
  items: InvoiceItem[];
  payment_link: string;
  note: string;
}

export interface InvoiceProps {
  spec: InvoiceSpec;
  theme: Theme;
  layout: "friendly" | "professional" | "urgent";
  bgPattern?: "grid" | "dots" | "hex" | "none";
}

// ── Main Component ──────────────────────────────────────────────

export const Invoice: React.FC<InvoiceProps> = ({
  spec,
  theme,
  layout,
  bgPattern = "grid",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const bgStyle: React.CSSProperties = theme.bg.startsWith("linear")
    ? { backgroundImage: theme.bg }
    : { backgroundColor: theme.bg };

  const layoutProps: LayoutProps = { spec, theme, bgPattern, frame, fps, bgStyle };

  return (
    <AbsoluteFill style={{ ...bgStyle, fontFamily: theme.fontFamily }}>
      {bgPattern !== "none" && <BackgroundGrid pattern={bgPattern} opacity={0.03} />}
      {layout === "friendly" && <FriendlyLayout {...layoutProps} />}
      {layout === "professional" && <ProfessionalLayout {...layoutProps} />}
      {layout === "urgent" && <UrgentLayout {...layoutProps} />}
    </AbsoluteFill>
  );
};

// ── Shared Layout Props ─────────────────────────────────────────

interface LayoutProps {
  spec: InvoiceSpec;
  theme: Theme;
  bgPattern: string;
  frame: number;
  fps: number;
  bgStyle: React.CSSProperties;
}

// ── Helper: Currency Formatter ──────────────────────────────────

function formatCurrency(amount: number, currency: string): string {
  const symbols: Record<string, string> = {
    USD: "$", EUR: "€", GBP: "£", CAD: "CA$", AUD: "A$",
  };
  const sym = symbols[currency] || currency + " ";
  return `${sym}${amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}`;
}

// ── Helper: Status Indicator ────────────────────────────────────

const InvoiceStatus: React.FC<{
  status: InvoiceSpec["status"];
  theme: Theme;
}> = ({ status }) => {
  const map: Record<string, { bg: string; text: string; label: string; icon: string }> = {
    due: { bg: "rgba(59,130,246,0.15)", text: "#3b82f6", label: "Payment Due", icon: "" },
    overdue: { bg: "rgba(239,68,68,0.15)", text: "#ef4444", label: "Overdue", icon: "" },
    paid: { bg: "rgba(34,197,94,0.15)", text: "#22c55e", label: "Paid", icon: "" },
  };
  const s = map[status] || map.due;
  return (
    <span style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      padding: "5px 14px",
      borderRadius: 999,
      fontSize: 24,
      fontWeight: 700,
      background: s.bg,
      color: s.text,
      letterSpacing: 0.5,
    }}>
      <span>{s.icon}</span> {s.label}
    </span>
  );
};


// ═══════════════════════════════════════════════════════════════
// LAYOUT 1: Friendly — Soft, gentle reminder. "Just a heads up" tone.
// Centered, warm icons, rounded cards, non-threatening.
// Best with: THEME_WARM, THEME_CLEAN, THEME_DARK
// ═══════════════════════════════════════════════════════════════

const FriendlyLayout: React.FC<LayoutProps> = ({ spec, theme, frame, fps }) => {
  // Scene 1: Greeting (frames 0–80)
  const greetS = springEntrance(frame, fps, 5, SPRING.gentle);
  const greetOp = fadeIn(frame, 5, 25);

  // Scene 2: Invoice details (frames 80–260)
  // Scene 3: Note + CTA (frames 280+)
  const noteOp = fadeIn(frame, 320, 20);
  const noteS = springEntrance(frame, fps, 320, SPRING.default);

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      height: "100%",
      padding: PADDING,
      paddingTop: TOP_SAFE,
      justifyContent: "center",
      gap: 22,
    }}>
      {/* Greeting — centered, warm */}
      <div style={{
        opacity: greetOp,
        transform: `translateY(${slideIn(greetS, "up", 25)}px)`,
        textAlign: "center" as const,
      }}>
        <svg viewBox="0 0 24 24" width={36} height={36} fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
        <div style={{
          fontSize: TYPE.hero,
          fontWeight: theme.headingWeight,
          color: theme.textPrimary,
          lineHeight: 1.1,
          marginBottom: 6,
        }}>
          Hi {spec.client_name}
        </div>
        <div style={{
          fontSize: TYPE.subtitle,
          color: theme.textSecondary,
          lineHeight: 1.4,
        }}>
          Just a friendly reminder about your invoice
        </div>
      </div>

      {/* Invoice card — centered, big amount */}
      <Sequence from={80} layout="none">
        <div style={{ display: "flex", justifyContent: "center" }}>
          <GlassCard theme={theme} style={{
            opacity: fadeIn(frame, 80, 20),
            transform: `translateY(${slideIn(springEntrance(frame, fps, 80, SPRING.default), "down", 20)}px)`,
            maxWidth: 600,
            width: "100%",
            padding: "24px 32px",
            textAlign: "center" as const,
          }}>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 16,
            }}>
              <div style={{
                fontSize: TYPE.label,
                fontWeight: 600,
                color: theme.textMuted,
                letterSpacing: 1,
                textTransform: "uppercase" as const,
              }}>
                Invoice #{spec.invoice_number}
              </div>
              <InvoiceStatus status={spec.status} theme={theme} />
            </div>

            {/* Amount */}
            <div style={{
              fontSize: 56,
              fontWeight: 900,
              color: theme.textPrimary,
              lineHeight: 1,
              marginBottom: 8,
            }}>
              {spec.currency === "USD" ? "$" : spec.currency === "EUR" ? "€" : spec.currency === "GBP" ? "£" : spec.currency + " "}
              <CountUp target={spec.amount} frame={frame} startFrame={100} duration={50} />
            </div>

            <div style={{
              fontSize: TYPE.body,
              color: theme.textSecondary,
              marginBottom: 16,
            }}>
              Due: {spec.due_date}
            </div>

            {/* Line items */}
            <div style={{ borderTop: `1px solid ${theme.cardBorder}`, paddingTop: 12 }}>
              {spec.items.slice(0, 4).map((item, i) => {
                const op = fadeIn(frame, staggerDelay(i, 140, 20), 15);
                return (
                  <div key={i} style={{
                    opacity: op,
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "6px 0",
                    fontSize: TYPE.body,
                  }}>
                    <span style={{ color: theme.textSecondary }}>{item.description}</span>
                    <span style={{ color: theme.textPrimary, fontWeight: 600 }}>
                      {formatCurrency(item.amount, spec.currency)}
                    </span>
                  </div>
                );
              })}
            </div>
          </GlassCard>
        </div>
      </Sequence>

      {/* Note + payment CTA */}
      <Sequence from={280} layout="none">
        <div style={{
          opacity: noteOp,
          transform: `translateY(${slideIn(noteS, "up", 15)}px)`,
          textAlign: "center" as const,
        }}>
          <div style={{
            fontSize: TYPE.body,
            color: theme.textSecondary,
            marginBottom: 14,
            fontStyle: "italic",
          }}>
            "{spec.note}"
          </div>
          <div style={{
            fontSize: TYPE.caption,
            color: theme.textMuted,
            marginBottom: 10,
          }}>
            From {spec.freelancer_name}
          </div>
          <GradientBadge text="Pay Now →" theme={theme} fontSize={14} />
        </div>
      </Sequence>
    </div>
  );
};


// ═══════════════════════════════════════════════════════════════
// LAYOUT 2: Professional — Clean, structured invoice layout.
// Left-aligned header, itemized table, business-like footer.
// Best with: THEME_CLEAN, THEME_MINIMAL, THEME_DARK
// ═══════════════════════════════════════════════════════════════

const ProfessionalLayout: React.FC<LayoutProps> = ({ spec, theme, frame, fps }) => {
  // Scene 1: Header (frames 0–70)
  const headerS = springEntrance(frame, fps, 5, SPRING.snappy);
  const headerOp = fadeIn(frame, 5, 25);

  // Scene 2: Items table (frames 80–280)
  // Scene 3: Total + CTA (frames 300+)
  const totalOp = fadeIn(frame, 320, 20);
  const totalS = springEntrance(frame, fps, 320, SPRING.default);

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      height: "100%",
      padding: PADDING,
      paddingTop: TOP_SAFE,
      justifyContent: "center",
      gap: 20,
    }}>
      {/* Header — left-aligned, professional */}
      <div style={{
        opacity: headerOp,
        transform: `translateX(${slideIn(headerS, "left", 25)}px)`,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
      }}>
        <div>
          <div style={{
            fontSize: TYPE.label,
            fontWeight: 700,
            letterSpacing: 2,
            textTransform: "uppercase" as const,
            color: theme.accent,
            marginBottom: 6,
          }}>
            Invoice
          </div>
          <div style={{
            fontSize: TYPE.hero,
            fontWeight: theme.headingWeight,
            color: theme.textPrimary,
            lineHeight: 1.1,
          }}>
            #{spec.invoice_number}
          </div>
          <div style={{
            fontSize: TYPE.subtitle,
            color: theme.textSecondary,
            marginTop: 4,
          }}>
            For {spec.client_name}
          </div>
        </div>
        <div style={{ textAlign: "right" as const }}>
          <InvoiceStatus status={spec.status} theme={theme} />
          <div style={{
            fontSize: TYPE.caption,
            color: theme.textMuted,
            marginTop: 8,
          }}>
            Due: {spec.due_date}
          </div>
          <div style={{
            fontSize: TYPE.caption,
            color: theme.textMuted,
            marginTop: 2,
          }}>
            From: {spec.freelancer_name}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div style={{
        height: 2,
        background: theme.accentGradient,
        borderRadius: 1,
        opacity: fadeIn(frame, 50, 20),
      }} />

      {/* Items table */}
      <Sequence from={80} layout="none">
        <div>
          {/* Table header */}
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "8px 0",
            borderBottom: `1px solid ${theme.cardBorder}`,
            fontSize: TYPE.label,
            fontWeight: 700,
            letterSpacing: 1,
            textTransform: "uppercase" as const,
            color: theme.textMuted,
            opacity: fadeIn(frame, 85, 15),
          }}>
            <span>Description</span>
            <span>Amount</span>
          </div>

          {/* Items */}
          {spec.items.slice(0, 5).map((item, i) => {
            const delay = staggerDelay(i, 100, 22);
            const s = springEntrance(frame, fps, delay, SPRING.default);
            const op = fadeIn(frame, delay, 18);
            return (
              <div key={i} style={{
                opacity: op,
                transform: `translateX(${slideIn(s, "left", 15)}px)`,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px 0",
                borderBottom: `1px solid ${theme.cardBorder}`,
              }}>
                <span style={{
                  fontSize: TYPE.body,
                  color: theme.textPrimary,
                  fontWeight: 500,
                }}>
                  {item.description}
                </span>
                <span style={{
                  fontSize: TYPE.body,
                  color: theme.textPrimary,
                  fontWeight: 700,
                  fontVariantNumeric: "tabular-nums",
                }}>
                  {formatCurrency(item.amount, spec.currency)}
                </span>
              </div>
            );
          })}
        </div>
      </Sequence>

      {/* Total + CTA */}
      <Sequence from={280} layout="none">
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
          <div style={{
            opacity: totalOp,
            transform: `translateX(${slideIn(totalS, "left", 15)}px)`,
          }}>
            <div style={{
              fontSize: TYPE.label,
              fontWeight: 700,
              letterSpacing: 1.5,
              textTransform: "uppercase" as const,
              color: theme.textMuted,
              marginBottom: 4,
            }}>
              Total Due
            </div>
            <div style={{
              fontSize: TYPE.stat,
              fontWeight: 900,
              color: theme.textPrimary,
            }}>
              {formatCurrency(spec.amount, spec.currency)}
            </div>
          </div>
          <div style={{
            opacity: fadeIn(frame, 350, 20),
            transform: `scale(${0.85 + 0.15 * springEntrance(frame, fps, 350, SPRING.snappy)})`,
          }}>
            <GradientBadge text="Pay Now →" theme={theme} fontSize={14} />
          </div>
        </div>
      </Sequence>
    </div>
  );
};


// ═══════════════════════════════════════════════════════════════
// LAYOUT 3: Urgent — Bold, attention-grabbing. Red accents for overdue.
// Big numbers, pulsing status, strong CTA. High urgency feel.
// Best with: THEME_BOLD, THEME_NEON, THEME_DARK
// ═══════════════════════════════════════════════════════════════

const UrgentLayout: React.FC<LayoutProps> = ({ spec, theme, frame, fps }) => {
  // Scene 1: Big status + amount (frames 0–100)
  const heroS = springEntrance(frame, fps, 0, SPRING.bouncy);
  const heroOp = fadeIn(frame, 0, 20);

  // Scene 2: Details (frames 100–280)
  // Scene 3: CTA (frames 300+)
  const ctaOp = fadeIn(frame, 340, 20);
  const ctaS = springEntrance(frame, fps, 340, SPRING.bouncy);

  // Urgent red override for overdue
  const urgentColor = spec.status === "overdue" ? "#ef4444" : theme.accent;
  const urgentGlow = spec.status === "overdue"
    ? "0 0 40px rgba(239,68,68,0.3)"
    : theme.cardShadow;

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      height: "100%",
      padding: PADDING,
      paddingTop: TOP_SAFE,
      justifyContent: "center",
      gap: 24,
    }}>
      {/* Hero — big amount + status */}
      <div style={{
        opacity: heroOp,
        transform: `scale(${0.85 + 0.15 * heroS})`,
        textAlign: "center" as const,
      }}>
        <div style={{
          fontSize: 32,
          marginBottom: 8,
        }}>
          {spec.status === "overdue" ? "" : spec.status === "paid" ? "" : ""}
        </div>
        <div style={{
          fontSize: TYPE.label,
          fontWeight: 700,
          letterSpacing: 2,
          textTransform: "uppercase" as const,
          color: urgentColor,
          marginBottom: 8,
        }}>
          {spec.status === "overdue" ? "Payment Overdue" : spec.status === "paid" ? "Payment Received" : "Payment Due"}
        </div>
        <div style={{
          fontSize: 72,
          fontWeight: 900,
          color: theme.textPrimary,
          lineHeight: 1,
          textShadow: spec.status === "overdue" ? "0 0 30px rgba(239,68,68,0.4)" : "none",
        }}>
          {spec.currency === "USD" ? "$" : spec.currency === "EUR" ? "€" : spec.currency === "GBP" ? "£" : spec.currency + " "}
          <CountUp target={spec.amount} frame={frame} startFrame={15} duration={45} />
        </div>
        <div style={{
          fontSize: TYPE.subtitle,
          color: theme.textSecondary,
          marginTop: 8,
        }}>
          Invoice #{spec.invoice_number} · Due {spec.due_date}
        </div>
      </div>

      {/* Details — two-column: client info + line items */}
      <Sequence from={100} layout="none">
        <div style={{ display: "flex", gap: 16 }}>
          {/* Client info card */}
          <GlassCard theme={theme} style={{
            opacity: fadeIn(frame, 105, 20),
            transform: `translateX(${slideIn(springEntrance(frame, fps, 105, SPRING.default), "left", 20)}px)`,
            flex: "0 0 280px",
            padding: "16px 20px",
            borderColor: spec.status === "overdue" ? "rgba(239,68,68,0.3)" : theme.cardBorder,
            boxShadow: urgentGlow,
          }}>
            <div style={{
              fontSize: TYPE.label,
              fontWeight: 700,
              letterSpacing: 1.5,
              textTransform: "uppercase" as const,
              color: theme.textMuted,
              marginBottom: 12,
            }}>
              Bill To
            </div>
            <div style={{
              fontSize: TYPE.cardTitle,
              fontWeight: 700,
              color: theme.textPrimary,
              marginBottom: 4,
            }}>
              {spec.client_name}
            </div>
            <div style={{
              fontSize: TYPE.caption,
              color: theme.textSecondary,
              marginBottom: 12,
            }}>
              From: {spec.freelancer_name}
            </div>
            <InvoiceStatus status={spec.status} theme={theme} />
          </GlassCard>

          {/* Line items card */}
          <GlassCard theme={theme} style={{
            opacity: fadeIn(frame, 130, 20),
            transform: `translateX(${slideIn(springEntrance(frame, fps, 130, SPRING.default), "right", 20)}px)`,
            flex: 1,
            padding: "16px 20px",
            borderColor: spec.status === "overdue" ? "rgba(239,68,68,0.3)" : theme.cardBorder,
            boxShadow: urgentGlow,
          }}>
            <div style={{
              fontSize: TYPE.label,
              fontWeight: 700,
              letterSpacing: 1.5,
              textTransform: "uppercase" as const,
              color: theme.textMuted,
              marginBottom: 10,
            }}>
              Items
            </div>
            {spec.items.slice(0, 4).map((item, i) => {
              const op = fadeIn(frame, staggerDelay(i, 150, 20), 15);
              return (
                <div key={i} style={{
                  opacity: op,
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "5px 0",
                  borderBottom: i < spec.items.length - 1 ? `1px solid ${theme.cardBorder}` : "none",
                  fontSize: TYPE.body,
                }}>
                  <span style={{ color: theme.textSecondary }}>{item.description}</span>
                  <span style={{ color: theme.textPrimary, fontWeight: 700 }}>
                    {formatCurrency(item.amount, spec.currency)}
                  </span>
                </div>
              );
            })}
          </GlassCard>
        </div>
      </Sequence>

      {/* CTA — big, bold */}
      <Sequence from={300} layout="none">
        <div style={{
          opacity: ctaOp,
          transform: `scale(${0.85 + 0.15 * ctaS})`,
          textAlign: "center" as const,
        }}>
          {spec.note && (
            <div style={{
              fontSize: TYPE.body,
              color: theme.textSecondary,
              marginBottom: 12,
            }}>
              {spec.note}
            </div>
          )}
          <GradientBadge
            text={spec.status === "overdue" ? "Pay Now - Overdue" : "Pay Now →"}
            theme={theme}
            fontSize={15}
            style={spec.status === "overdue" ? {
              background: "linear-gradient(135deg, #ef4444, #dc2626)",
              boxShadow: "0 0 20px rgba(239,68,68,0.4)",
            } : undefined}
          />
        </div>
      </Sequence>
    </div>
  );
};

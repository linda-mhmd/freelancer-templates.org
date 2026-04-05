// src/remotion/Sims4/compositions/CASPanel.tsx
// Template: CAS Panel — Create-a-Sim styling screen
// Refactored to use SimsComposition + CASThreeColumn layout + InfoPanel element

import React from 'react';
import {
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { CAS_CATEGORIES } from '../components/AvatarDisplay';
import {
  SIMS_COLORS,
  SIMS_FONTS,
  SIMS_SIZES,
  SIMS_SPRING,
} from '../data/simsTheme';
import { SimsComposition } from '../helpers/SimsComposition';
import { CASThreeColumn } from '../templates';
import { InfoPanel } from '../elements';

// ── Props Interface ──

export interface CASPanelProps {
  characterName?: string;
  avatarSrc?: string;
}

// ── Static Data ──

const OUTFIT_PILLS = ['👗 Everyday', '💼 Career', '🎉 Party'];
const CLOTHING_ITEMS = ['Blazer', 'Shirt', 'Pants', 'Boots', 'Necklace', 'Hair'];

// ── Sub-components for layout slots ──

const TopBarContent: React.FC = () => (
  <div
    style={{
      width: '100%',
      height: '100%',
      background: 'rgba(255,255,255,0.76)',
      borderBottom: '1px solid rgba(21,101,192,0.2)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 18px',
      fontFamily: SIMS_FONTS.body,
      color: SIMS_COLORS.simsBlueDark,
      fontWeight: 800,
      fontSize: 14,
    }}
  >
    <span>CREATE A SIM</span>
    <span>Outfits • Hair • Face • Body</span>
  </div>
);

const SecondBar: React.FC = () => (
  <div
    style={{
      position: 'absolute',
      top: 56,
      left: 0,
      right: 0,
      height: 56,
      background: SIMS_COLORS.simsBlue,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 16px',
      color: '#fff',
    }}
  >
    <span style={{ fontWeight: 800, fontSize: 22 }}>Create-a-Sim — Styling</span>
    <div style={{ display: 'flex', gap: 8 }}>
      {OUTFIT_PILLS.map((pill, i) => (
        <div
          key={pill}
          style={{
            padding: '7px 10px',
            borderRadius: 12,
            background: i === 0 ? 'rgba(255,255,255,0.28)' : 'rgba(255,255,255,0.14)',
            fontFamily: SIMS_FONTS.body,
            fontWeight: 700,
            fontSize: 12,
          }}
        >
          {pill}
        </div>
      ))}
    </div>
  </div>
);

// ── Sidebar content with spring entrance ──

const SidebarContent: React.FC<{ enter: number }> = ({ enter }) => (
  <div
    style={{
      width: '100%',
      height: '100%',
      borderRadius: 16,
      background: 'rgba(255,255,255,0.76)',
      border: '1px solid rgba(21,101,192,0.2)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 10,
      paddingTop: 10,
      transform: `translateX(${(1 - enter) * -20}px)`,
      opacity: enter,
    }}
  >
    {CAS_CATEGORIES.map((cat, i) => (
      <div
        key={cat.label}
        style={{
          width: 64,
          height: 64,
          borderRadius: 14,
          background: i === 3 ? SIMS_COLORS.simsBlue : 'rgba(255,255,255,0.92)',
          color: i === 3 ? '#fff' : SIMS_COLORS.simsBlueDark,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 20,
          gap: 2,
          boxShadow: '0 4px 10px rgba(0,0,0,0.12)',
        }}
      >
        <span>{cat.icon}</span>
        <span style={{ fontSize: 9, fontFamily: SIMS_FONTS.body, fontWeight: 700 }}>{cat.label}</span>
      </div>
    ))}
  </div>
);

// ── Viewport content with avatar and dashed circle ──

const ViewportContent: React.FC<{ enter: number; avatarSrc: string }> = ({ enter, avatarSrc }) => (
  <div
    style={{
      width: '100%',
      height: '100%',
      borderRadius: SIMS_SIZES.borderRadius.lg,
      background: 'rgba(255,255,255,0.55)',
      border: '1px solid rgba(21,101,192,0.2)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      transform: `scale(${0.97 + enter * 0.03})`,
      transformOrigin: 'center',
    }}
  >
    <div
      style={{
        position: 'absolute',
        width: 470,
        height: 470,
        borderRadius: '50%',
        border: '2px dashed rgba(21,101,192,0.25)',
        background:
          'radial-gradient(circle at center, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.1) 68%, transparent 100%)',
      }}
    />
    <Img
      src={staticFile(`avatar/${avatarSrc}`)}
      style={{
        height: 520,
        width: 'auto',
        objectFit: 'contain',
        filter: 'drop-shadow(0 12px 16px rgba(0,0,0,0.24))',
      }}
    />
  </div>
);

// ── Detail panel content (rendered inside InfoPanel) ──

const DetailContent: React.FC = () => (
  <>
    <div style={{ marginTop: 8, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
      {CLOTHING_ITEMS.map((item) => (
        <div
          key={item}
          style={{
            borderRadius: 10,
            background: 'rgba(21,101,192,0.08)',
            padding: '10px 8px',
            textAlign: 'center',
            color: SIMS_COLORS.simsBlueDark,
            fontFamily: SIMS_FONTS.body,
            fontSize: 11,
            fontWeight: 700,
          }}
        >
          {item}
        </div>
      ))}
    </div>

    <div style={{ marginTop: 14, fontSize: 14, fontWeight: 800, color: SIMS_COLORS.simsBlueDark }}>
      Style Notes
    </div>
    <div
      style={{
        marginTop: 6,
        fontFamily: SIMS_FONTS.body,
        color: SIMS_COLORS.textPrimary,
        fontSize: 12,
        lineHeight: 1.45,
      }}
    >
      Professional creator fit: green blazer signature, dark tee, rugged boots. Keeps recognizable
      silhouette in gameplay camera.
    </div>
  </>
);

// ── Name plate (bottom zone) ──

const NamePlate: React.FC<{ characterName: string; opacity: number }> = ({
  characterName,
  opacity,
}) => (
  <div
    data-testid="cas-name-plate"
    style={{
      background: SIMS_COLORS.panelBlue,
      color: SIMS_COLORS.textLight,
      borderRadius: SIMS_SIZES.borderRadius.pill,
      padding: '12px 28px',
      fontSize: 24,
      fontWeight: 800,
      letterSpacing: 0.2,
      opacity,
      border: '1px solid rgba(255,255,255,0.35)',
      boxShadow: '0 8px 20px rgba(13,71,161,0.2)',
    }}
  >
    {characterName}
  </div>
);

// ── Main Component ──

export const CASPanel: React.FC<CASPanelProps> = ({
  characterName = 'Linda Mohamed',
  avatarSrc = 'linda_avatar.svg',
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = spring({
    frame,
    fps,
    from: 0,
    to: 1,
    config: SIMS_SPRING.snappy,
    durationInFrames: 22,
  });
  const namePlateOpacity = interpolate(frame, [28, 44], [0, 1], {
    extrapolateRight: 'clamp',
  });

  return (
    <SimsComposition
      layout={
        <CASThreeColumn
          background="cas-light"
          topBar={<TopBarContent />}
          sidebar={<SidebarContent enter={enter} />}
          viewport={<ViewportContent enter={enter} avatarSrc={avatarSrc} />}
          detail={
            <InfoPanel header="Current Outfit" variant="white" delay={0}>
              <DetailContent />
            </InfoPanel>
          }
          bottom={<NamePlate characterName={characterName} opacity={namePlateOpacity} />}
        />
      }
    >
      {/* Second bar overlay — positioned at top:56, outside the CASThreeColumn topBar zone */}
      <SecondBar />
    </SimsComposition>
  );
};

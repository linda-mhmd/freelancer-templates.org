// src/remotion/Sims4/compositions/CASStorySequence.tsx
// Top-level composition orchestrating all four CAS scenes with crossfade transitions
// Refactored to use SimsComposition wrapper with SceneContainer for per-scene layouts
// Each scene provides its own Master Layout internally (cas-dark, cas-light, etc.)

import React from 'react';
import { AbsoluteFill } from 'remotion';
import { computeSceneTimings } from '../components/casStoryData';
import { SceneContainer } from '../components/SceneContainer';
import { CASInitialScene } from '../components/CASInitialScene';
import { TraitSelectionScene } from '../components/TraitSelectionScene';
import { AppearanceScene } from '../components/AppearanceScene';
import { ScenarioSelectionScene } from '../components/ScenarioSelectionScene';
import { SimsComposition } from '../helpers/SimsComposition';

export interface CASStorySequenceProps {
  totalDurationInFrames?: number;
}

export const CASStorySequence: React.FC<CASStorySequenceProps> = ({
  totalDurationInFrames = 1800,
}) => {
  let duration = totalDurationInFrames;
  if (duration < 200) {
    console.warn('CASStorySequence: totalDurationInFrames clamped to minimum 200');
    duration = 200;
  }

  const timings = computeSceneTimings(duration);

  return (
    <SimsComposition layout={<AbsoluteFill />}>
      <SceneContainer startFrame={timings.initial.startFrame} durationFrames={timings.initial.durationFrames}>
        <CASInitialScene startFrame={timings.initial.startFrame} durationFrames={timings.initial.durationFrames} />
      </SceneContainer>
      <SceneContainer startFrame={timings.traits.startFrame} durationFrames={timings.traits.durationFrames}>
        <TraitSelectionScene startFrame={timings.traits.startFrame} durationFrames={timings.traits.durationFrames} />
      </SceneContainer>
      <SceneContainer startFrame={timings.appearance.startFrame} durationFrames={timings.appearance.durationFrames}>
        <AppearanceScene startFrame={timings.appearance.startFrame} durationFrames={timings.appearance.durationFrames} />
      </SceneContainer>
      <SceneContainer startFrame={timings.scenario.startFrame} durationFrames={timings.scenario.durationFrames}>
        <ScenarioSelectionScene startFrame={timings.scenario.startFrame} durationFrames={timings.scenario.durationFrames} />
      </SceneContainer>
    </SimsComposition>
  );
};

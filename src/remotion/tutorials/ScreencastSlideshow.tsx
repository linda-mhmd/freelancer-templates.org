/**
 * ScreencastSlideshow - Simple stop-motion style tutorial from screenshots
 * 
 * Displays a sequence of screenshots with smooth crossfade transitions
 * and optional overlay annotations.
 */

import { AbsoluteFill, Img, interpolate, useCurrentFrame, staticFile } from 'remotion';

export interface ScreencastSlideshowProps {
  /** Array of screenshot paths (relative to public folder) */
  screenshots: string[];
  /** Duration per screenshot in frames (default: 45 = 1.5s at 30fps) */
  frameDuration?: number;
  /** Transition duration in frames (default: 15 = 0.5s) */
  transitionDuration?: number;
  /** Optional title overlay */
  title?: string;
  /** Optional step annotations */
  annotations?: Array<{
    text: string;
    x: number;
    y: number;
    startSlide: number;
    endSlide?: number;
  }>;
}

export const ScreencastSlideshow: React.FC<ScreencastSlideshowProps> = ({
  screenshots,
  frameDuration = 45,
  transitionDuration = 15,
  title,
  annotations = [],
}) => {
  const frame = useCurrentFrame();
  const totalSlidesFrames = screenshots.length * frameDuration;
  
  // Calculate which slide we're on
  const currentSlideIndex = Math.min(
    Math.floor(frame / frameDuration),
    screenshots.length - 1
  );
  
  const frameInSlide = frame % frameDuration;
  
  // Calculate opacity for crossfade
  const currentOpacity = interpolate(
    frameInSlide,
    [0, transitionDuration, frameDuration - transitionDuration, frameDuration],
    [0, 1, 1, 1],
    { extrapolateRight: 'clamp' }
  );
  
  const nextSlideIndex = Math.min(currentSlideIndex + 1, screenshots.length - 1);
  const nextOpacity = interpolate(
    frameInSlide,
    [frameDuration - transitionDuration, frameDuration],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // Filter annotations for current slide
  const activeAnnotations = annotations.filter(
    (a) => currentSlideIndex >= a.startSlide && 
           (a.endSlide === undefined || currentSlideIndex <= a.endSlide)
  );

  return (
    <AbsoluteFill style={{ backgroundColor: '#1a1a2e' }}>
      {/* Current screenshot */}
      <AbsoluteFill style={{ opacity: currentOpacity }}>
        <Img
          src={staticFile(screenshots[currentSlideIndex])}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
          }}
        />
      </AbsoluteFill>
      
      {/* Next screenshot (for crossfade) */}
      {nextSlideIndex !== currentSlideIndex && (
        <AbsoluteFill style={{ opacity: nextOpacity }}>
          <Img
            src={staticFile(screenshots[nextSlideIndex])}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
            }}
          />
        </AbsoluteFill>
      )}
      
      {/* Title overlay */}
      {title && frame < 60 && (
        <div
          style={{
            position: 'absolute',
            bottom: 40,
            left: 0,
            right: 0,
            textAlign: 'center',
            opacity: interpolate(frame, [0, 15, 45, 60], [0, 1, 1, 0]),
          }}
        >
          <div
            style={{
              display: 'inline-block',
              background: 'rgba(59, 130, 246, 0.9)',
              color: 'white',
              padding: '12px 24px',
              borderRadius: 8,
              fontSize: 24,
              fontWeight: 600,
              fontFamily: 'Inter, system-ui, sans-serif',
            }}
          >
            {title}
          </div>
        </div>
      )}
      
      {/* Annotations */}
      {activeAnnotations.map((annotation, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: annotation.x,
            top: annotation.y,
            background: 'rgba(16, 185, 129, 0.95)',
            color: 'white',
            padding: '8px 16px',
            borderRadius: 6,
            fontSize: 16,
            fontWeight: 500,
            fontFamily: 'Inter, system-ui, sans-serif',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            opacity: interpolate(
              frameInSlide,
              [0, 10],
              [0, 1],
              { extrapolateRight: 'clamp' }
            ),
          }}
        >
          {annotation.text}
        </div>
      ))}
      
      {/* Progress indicator */}
      <div
        style={{
          position: 'absolute',
          bottom: 12,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: 8,
        }}
      >
        {screenshots.map((_, i) => (
          <div
            key={i}
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: i === currentSlideIndex ? '#3b82f6' : 'rgba(255,255,255,0.3)',
              transition: 'background 0.2s',
            }}
          />
        ))}
      </div>
    </AbsoluteFill>
  );
};

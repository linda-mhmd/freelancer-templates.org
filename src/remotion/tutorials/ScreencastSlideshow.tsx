/**
 * ScreencastSlideshow - Animated tutorial with click indicators and zoom effects
 * 
 * Displays a sequence of screenshots with:
 * - Smooth crossfade transitions
 * - Animated cursor with click indicators
 * - Zoom effects on important UI elements
 * - Step annotations with callouts
 * 
 * Works in both Remotion Studio (using staticFile) and the standalone player app.
 */

import { AbsoluteFill, Img, interpolate, useCurrentFrame, staticFile, spring, useVideoConfig } from 'remotion';
import { SLIDE_PRESETS, type SlideConfig } from './presets';

export type { ClickTarget, ZoomRegion, SlideConfig } from './presets';

export interface ScreencastSlideshowProps {
  /** Preset name to use (e.g., 'studio-basics', 'editing-props', 'cli-rendering') */
  preset?: string;
  /** Array of slide configurations (overrides preset if provided) */
  slides?: SlideConfig[];
  /** Duration per screenshot in frames (default: 90 = 3s at 30fps) */
  frameDuration?: number;
  /** Transition duration in frames (default: 15 = 0.5s) */
  transitionDuration?: number;
  /** Optional title overlay */
  title?: string;
}

// Default slides (fallback to studio basics)
const DEFAULT_SLIDES = SLIDE_PRESETS['studio-basics'] ?? [];

/**
 * Get the correct image URL for both Remotion Studio and player app contexts.
 */
function getImageUrl(path: string): string {
  const isPlayerContext = typeof window !== 'undefined' && 
    !window.location.href.includes(':3001') &&
    !window.location.href.includes('localhost:3001') &&
    !window.location.href.includes(':3000') &&
    !window.location.href.includes('localhost:3000');
  
  if (isPlayerContext) {
    return `./${path}`;
  }
  return staticFile(path);
}

/**
 * Animated cursor component with click ripple effect
 */
const AnimatedCursor: React.FC<{
  x: number;
  y: number;
  isClicking: boolean;
  clickProgress: number;
}> = ({ x, y, isClicking, clickProgress }) => {
  const rippleScale = interpolate(clickProgress, [0, 0.5, 1], [0.5, 1.5, 2]);
  const rippleOpacity = interpolate(clickProgress, [0, 0.3, 1], [0.8, 0.5, 0]);
  
  return (
    <div
      style={{
        position: 'absolute',
        left: `${x}%`,
        top: `${y}%`,
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
        zIndex: 100,
      }}
    >
      {/* Click ripple effect */}
      {isClicking && (
        <>
          <div
            style={{
              position: 'absolute',
              width: 60,
              height: 60,
              borderRadius: '50%',
              border: '3px solid #3b82f6',
              transform: `translate(-50%, -50%) scale(${rippleScale})`,
              opacity: rippleOpacity,
              left: '50%',
              top: '50%',
            }}
          />
          <div
            style={{
              position: 'absolute',
              width: 40,
              height: 40,
              borderRadius: '50%',
              backgroundColor: 'rgba(59, 130, 246, 0.3)',
              transform: `translate(-50%, -50%) scale(${rippleScale * 0.8})`,
              opacity: rippleOpacity,
              left: '50%',
              top: '50%',
            }}
          />
        </>
      )}
      
      {/* Cursor pointer */}
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        style={{
          filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.5))',
          transform: isClicking ? 'scale(0.9)' : 'scale(1)',
          transition: 'transform 0.1s',
        }}
      >
        <path
          d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.87c.48 0 .72-.58.38-.92L6.35 2.85a.5.5 0 0 0-.85.36z"
          fill="#ffffff"
          stroke="#000000"
          strokeWidth="1.5"
        />
      </svg>
    </div>
  );
};

/**
 * Click target highlight with pulsing animation
 */
const ClickTargetHighlight: React.FC<{
  x: number;
  y: number;
  label?: string;
  pulseProgress: number;
}> = ({ x, y, label, pulseProgress }) => {
  const pulseScale = interpolate(pulseProgress, [0, 0.5, 1], [1, 1.15, 1]);
  const pulseOpacity = interpolate(pulseProgress, [0, 0.5, 1], [0.6, 0.9, 0.6]);
  
  return (
    <div
      style={{
        position: 'absolute',
        left: `${x}%`,
        top: `${y}%`,
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
        zIndex: 50,
      }}
    >
      {/* Pulsing ring */}
      <div
        style={{
          width: 80,
          height: 80,
          borderRadius: '50%',
          border: '4px solid #10b981',
          transform: `translate(-50%, -50%) scale(${pulseScale})`,
          opacity: pulseOpacity,
          position: 'absolute',
          left: '50%',
          top: '50%',
          boxShadow: '0 0 20px rgba(16, 185, 129, 0.5)',
        }}
      />
      
      {/* Inner dot */}
      <div
        style={{
          width: 16,
          height: 16,
          borderRadius: '50%',
          backgroundColor: '#10b981',
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          boxShadow: '0 0 10px rgba(16, 185, 129, 0.8)',
        }}
      />
      
      {/* Label */}
      {label && (
        <div
          style={{
            position: 'absolute',
            top: 50,
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: 'rgba(16, 185, 129, 0.95)',
            color: 'white',
            padding: '6px 14px',
            borderRadius: 6,
            fontSize: 14,
            fontWeight: 600,
            fontFamily: 'Inter, system-ui, sans-serif',
            whiteSpace: 'nowrap',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          }}
        >
          {label}
        </div>
      )}
    </div>
  );
};

/**
 * Step annotation badge - larger, more readable with semi-transparent background
 */
const StepAnnotation: React.FC<{
  text: string;
  opacity: number;
}> = ({ text, opacity }) => (
  <div
    style={{
      position: 'absolute',
      top: 24,
      left: 24,
      backgroundColor: 'rgba(15, 23, 42, 0.85)',
      color: 'white',
      padding: '14px 28px',
      borderRadius: 12,
      fontSize: 24,
      fontWeight: 700,
      fontFamily: 'Inter, system-ui, sans-serif',
      boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
      opacity,
      zIndex: 60,
      border: '2px solid rgba(59, 130, 246, 0.6)',
      backdropFilter: 'blur(8px)',
    }}
  >
    {text}
  </div>
);

export const ScreencastSlideshow: React.FC<ScreencastSlideshowProps> = ({
  preset,
  slides: customSlides,
  frameDuration = 90,
  transitionDuration = 15,
  title,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  // Resolve slides: custom slides > preset > default
  // Add validation for unknown presets with console warning (Requirements 8.1, 8.2)
  let resolvedSlides: SlideConfig[];
  
  if (customSlides) {
    resolvedSlides = customSlides;
  } else if (preset && SLIDE_PRESETS[preset]) {
    resolvedSlides = SLIDE_PRESETS[preset];
  } else {
    if (preset) {
      console.warn(`[ScreencastSlideshow] Unknown preset: "${preset}". Falling back to default slides.`);
    }
    resolvedSlides = DEFAULT_SLIDES;
  }
  
  // Runtime validation for slide configurations (Requirements 8.4, 8.5)
  const slides = resolvedSlides.map((slide, index) => {
    // Validate click target coordinates are within 0-100 range
    if (slide.clickTarget) {
      const { x, y } = slide.clickTarget;
      if (x < 0 || x > 100) {
        console.warn(`[ScreencastSlideshow] Slide ${index}: Click target x coordinate (${x}) out of range (0-100)`);
      }
      if (y < 0 || y > 100) {
        console.warn(`[ScreencastSlideshow] Slide ${index}: Click target y coordinate (${y}) out of range (0-100)`);
      }
    }
    
    // Validate zoom region scale is within 1.0-4.0 range
    if (slide.zoomRegion) {
      const { scale } = slide.zoomRegion;
      if (scale < 1.0 || scale > 4.0) {
        console.warn(`[ScreencastSlideshow] Slide ${index}: Zoom scale (${scale}) out of range (1.0-4.0)`);
      }
    }
    
    return slide;
  });
  
  // Calculate which slide we're on
  const currentSlideIndex = Math.min(
    Math.floor(frame / frameDuration),
    slides.length - 1
  );
  
  const frameInSlide = frame % frameDuration;
  const currentSlide = slides[currentSlideIndex];
  const nextSlideIndex = Math.min(currentSlideIndex + 1, slides.length - 1);
  
  // Animation phases within each slide
  const zoomInEnd = 20;
  const holdEnd = Math.max(zoomInEnd + 1, frameDuration - 25); // Ensure holdEnd > zoomInEnd
  const clickStart = 30;
  const clickEnd = 50;
  
  // Zoom animation - ensure strictly monotonic input range
  const zoomProgress = currentSlide.zoomRegion
    ? interpolate(
        frameInSlide,
        [0, zoomInEnd, holdEnd, Math.max(holdEnd + 1, frameDuration)],
        [1, currentSlide.zoomRegion.scale, currentSlide.zoomRegion.scale, 1],
        { extrapolateRight: 'clamp' }
      )
    : 1;
  
  const zoomX = currentSlide.zoomRegion?.x ?? 50;
  const zoomY = currentSlide.zoomRegion?.y ?? 50;
  
  // Click animation progress (0-1 during click phase)
  const isClickPhase = frameInSlide >= clickStart && frameInSlide <= clickEnd;
  const clickProgress = interpolate(
    frameInSlide,
    [clickStart, clickEnd],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );
  
  // Pulse animation for click target (continuous)
  const pulseProgress = (frameInSlide % 30) / 30;
  
  // Cursor position animation (moves toward click target)
  const cursorStartX = currentSlide.clickTarget ? currentSlide.clickTarget.x - 15 : 50;
  const cursorStartY = currentSlide.clickTarget ? currentSlide.clickTarget.y - 10 : 50;
  const cursorEndX = currentSlide.clickTarget?.x ?? 50;
  const cursorEndY = currentSlide.clickTarget?.y ?? 50;
  
  const cursorX = interpolate(
    frameInSlide,
    [0, clickStart - 5, clickStart],
    [cursorStartX, cursorEndX, cursorEndX],
    { extrapolateRight: 'clamp' }
  );
  const cursorY = interpolate(
    frameInSlide,
    [0, clickStart - 5, clickStart],
    [cursorStartY, cursorEndY, cursorEndY],
    { extrapolateRight: 'clamp' }
  );
  
  // Crossfade opacity
  const currentOpacity = interpolate(
    frameInSlide,
    [0, transitionDuration, frameDuration - transitionDuration, frameDuration],
    [0, 1, 1, 0.5],
    { extrapolateRight: 'clamp' }
  );
  
  const nextOpacity = interpolate(
    frameInSlide,
    [frameDuration - transitionDuration, frameDuration],
    [0, 0.5],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );
  
  // Annotation fade in
  const annotationOpacity = interpolate(
    frameInSlide,
    [5, 20],
    [0, 1],
    { extrapolateRight: 'clamp' }
  );

  return (
    <AbsoluteFill style={{ backgroundColor: '#1a1a2e', overflow: 'hidden' }}>
      {/* Zoomed screenshot container */}
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          transform: `scale(${zoomProgress})`,
          transformOrigin: `${zoomX}% ${zoomY}%`,
          transition: 'transform-origin 0.3s ease-out',
        }}
      >
        {/* Current screenshot */}
        <AbsoluteFill style={{ opacity: currentOpacity }}>
          <Img
            src={getImageUrl(currentSlide.screenshot)}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
            }}
            onError={() => {
              console.warn(`[ScreencastSlideshow] Failed to load screenshot: ${currentSlide.screenshot}`);
            }}
          />
        </AbsoluteFill>
        
        {/* Next screenshot (for crossfade) */}
        {nextSlideIndex !== currentSlideIndex && (
          <AbsoluteFill style={{ opacity: nextOpacity }}>
            <Img
              src={getImageUrl(slides[nextSlideIndex].screenshot)}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
              }}
              onError={() => {
                console.warn(`[ScreencastSlideshow] Failed to load screenshot: ${slides[nextSlideIndex].screenshot}`);
              }}
            />
          </AbsoluteFill>
        )}
      </div>
      
      {/* Click target highlight */}
      {currentSlide.clickTarget && frameInSlide > 10 && (
        <ClickTargetHighlight
          x={currentSlide.clickTarget.x}
          y={currentSlide.clickTarget.y}
          label={currentSlide.clickTarget.label}
          pulseProgress={pulseProgress}
        />
      )}
      
      {/* Animated cursor */}
      {currentSlide.clickTarget && (
        <AnimatedCursor
          x={cursorX}
          y={cursorY}
          isClicking={isClickPhase}
          clickProgress={clickProgress}
        />
      )}
      
      {/* Step annotation */}
      {currentSlide.annotation && (
        <StepAnnotation
          text={currentSlide.annotation}
          opacity={annotationOpacity}
        />
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
            zIndex: 70,
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
      
      {/* Progress indicator */}
      <div
        style={{
          position: 'absolute',
          bottom: 12,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: 8,
          zIndex: 80,
        }}
      >
        {slides.map((_, i) => (
          <div
            key={i}
            style={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              background: i === currentSlideIndex ? '#3b82f6' : 'rgba(255,255,255,0.4)',
              border: i === currentSlideIndex ? '2px solid white' : 'none',
              boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
            }}
          />
        ))}
      </div>
    </AbsoluteFill>
  );
};

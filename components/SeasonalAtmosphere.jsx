"use client";
import React, { useEffect, useRef, useSyncExternalStore } from 'react';
import { useSeason } from '../lib/SeasonContext.jsx';
import SeasonExplorerModal from './SeasonExplorerModal.jsx';

const subscribeReducedMotion = (callback) => {
  if (typeof window === 'undefined') return () => {};
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
  mq.addEventListener('change', callback);
  return () => mq.removeEventListener('change', callback);
};

const getReducedMotionSnapshot = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * SeasonalAtmosphere
 * Living canvas particle engine & ambient light aura reflecting the 72 Japanese microseasons:
 * - Spring: Soft sakura petals floating and spinning in the vernal breeze.
 * - Summer: Luminous firefly motes floating up into the twilight.
 * - Autumn: Tumbling golden & crimson momiji maple leaves.
 * - Winter: Crisp crystalline snowflakes descending softly.
 */
export default function SeasonalAtmosphere() {
  const {
    activeSeason,
    liveSeason,
    atmosphere,
    selectSeason,
    resetToLive,
    isExplorerOpen,
    setIsExplorerOpen,
  } = useSeason();

  const canvasRef = useRef(null);
  const motionDisabled = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    () => false
  );

  // Canvas particle animation loop
  useEffect(() => {
    if (motionDisabled) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    let isPaused = false;
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
    const type = atmosphere.particleType || 'sakura';
    const baseCount = type === 'firefly' ? 16 : 24;
    const count = isMobile ? Math.floor(baseCount * 0.45) : baseCount;

    // Initialize particles
    const particles = Array.from({ length: count }, () => {
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 6 + 4,
        speedX: type === 'firefly' ? (Math.random() - 0.5) * 0.8 : (Math.random() - 0.5) * 1.5 - 0.5,
        speedY: type === 'firefly' ? -Math.random() * 0.6 - 0.2 : Math.random() * 1.2 + 0.6,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.03,
        opacity: Math.random() * 0.6 + 0.2,
        pulse: Math.random() * Math.PI,
        color:
          type === 'sakura'
            ? Math.random() > 0.4 ? '#F48FB1' : '#F8BBD0'
            : type === 'firefly'
            ? Math.random() > 0.5 ? '#FFEE58' : '#81C784'
            : type === 'maple'
            ? Math.random() > 0.5 ? '#D32F2F' : '#F57C00'
            : '#FFFFFF',
      };
    });

    const handleVisibilityChange = () => {
      if (document.hidden) {
        isPaused = true;
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
      } else if (isPaused) {
        isPaused = false;
        animationFrameId = requestAnimationFrame(render);
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const render = () => {
      if (isPaused || document.hidden) return;
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.rotation += p.rotationSpeed;
        p.pulse += 0.04;

        // Wrap around boundaries
        if (type === 'firefly') {
          if (p.y < -20) p.y = height + 20;
          if (p.x < -20) p.x = width + 20;
          if (p.x > width + 20) p.x = -20;
        } else {
          if (p.y > height + 20) {
            p.y = -20;
            p.x = Math.random() * width;
          }
          if (p.x < -20) p.x = width + 20;
          if (p.x > width + 20) p.x = -20;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);

        if (type === 'sakura') {
          ctx.beginPath();
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.opacity;
          ctx.ellipse(0, 0, p.size, p.size * 0.55, 0, 0, Math.PI * 2);
          ctx.fill();
        } else if (type === 'firefly') {
          const glow = (Math.sin(p.pulse) + 1) * 0.5;
          ctx.beginPath();
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.opacity * (0.3 + glow * 0.7);
          ctx.shadowBlur = 12 * glow;
          ctx.shadowColor = p.color;
          ctx.arc(0, 0, p.size * 0.4, 0, Math.PI * 2);
          ctx.fill();
        } else if (type === 'maple') {
          ctx.beginPath();
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.opacity * 0.85;
          ctx.moveTo(0, -p.size);
          ctx.lineTo(p.size * 0.6, 0);
          ctx.lineTo(p.size * 0.3, p.size * 0.8);
          ctx.lineTo(-p.size * 0.3, p.size * 0.8);
          ctx.lineTo(-p.size * 0.6, 0);
          ctx.closePath();
          ctx.fill();
        } else {
          ctx.beginPath();
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.opacity * 0.75;
          ctx.arc(0, 0, p.size * 0.3, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [atmosphere.particleType, motionDisabled]);

  return (
    <>

      {/* 2. Living Canvas Particles */}
      {!motionDisabled && (
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="fixed inset-0 pointer-events-none z-2"
        />
      )}

      {/* 3. Global Season Explorer Modal mounted at root */}
      <SeasonExplorerModal
        isOpen={isExplorerOpen}
        onClose={() => setIsExplorerOpen(false)}
        currentLiveSeason={liveSeason}
        activeSeason={activeSeason}
        onSelectSeason={selectSeason}
        onResetToLive={resetToLive}
      />
    </>
  );
}

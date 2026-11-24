"use client";
import React, { useEffect, useRef, useSyncExternalStore } from 'react';
import { useSeason } from '../lib/SeasonContext.jsx';

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
 * Immersive particle engine & ambient light aura reflecting the 4 Japanese seasonal atmospheres:
 * - Spring: Soft sakura petals floating and spinning in the vernal breeze across the screen.
 * - Summer: Luminous glowing firefly motes floating up into the twilight with pulsing halos.
 * - Autumn: Tumbling golden & crimson momiji maple leaves.
 * - Winter: Crisp crystalline snowflakes descending softly across the entire vista.
 */
export default function SeasonalAtmosphere() {
  const { atmosphere } = useSeason();

  const canvasRef = useRef(null);
  const motionDisabled = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    () => false
  );

  // Synchronize dynamic paper tint across root HTML elements
  useEffect(() => {
    if (typeof document !== 'undefined' && atmosphere?.paperBg) {
      document.documentElement.style.setProperty('--color-paper', atmosphere.paperBg);
    }
  }, [atmosphere?.paperBg]);

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
    const baseCount = type === 'firefly' ? 28 : type === 'snow' ? 48 : 36;
    const count = isMobile ? Math.floor(baseCount * 0.5) : baseCount;

    // Initialize particles tailored to the active season
    const particles = Array.from({ length: count }, () => {
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        size:
          type === 'snow'
            ? Math.random() * 4 + 2.5
            : type === 'firefly'
            ? Math.random() * 5 + 3
            : Math.random() * 8 + 6,
        speedX:
          type === 'firefly'
            ? (Math.random() - 0.5) * 0.8
            : type === 'snow'
            ? (Math.random() - 0.5) * 0.8
            : (Math.random() - 0.5) * 1.6 - 0.4,
        speedY:
          type === 'firefly'
            ? -Math.random() * 0.7 - 0.2
            : type === 'snow'
            ? Math.random() * 1.0 + 0.5
            : Math.random() * 1.2 + 0.6,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.035,
        opacity: Math.random() * 0.5 + 0.35,
        pulse: Math.random() * Math.PI * 2,
        color:
          type === 'sakura'
            ? Math.random() > 0.4 ? '#F472B6' : '#FB7185'
            : type === 'firefly'
            ? Math.random() > 0.5 ? '#FBBF24' : '#34D399'
            : type === 'maple'
            ? Math.random() > 0.4 ? '#DC2626' : '#EA580C'
            : Math.random() > 0.3 ? '#FFFFFF' : '#BAE6FD',
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

        // Boundary wrapping
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
          // Delicate fluttering cherry petal with notch
          ctx.beginPath();
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.opacity;
          ctx.ellipse(0, 0, p.size, p.size * 0.6, 0, 0, Math.PI * 2);
          ctx.fill();
        } else if (type === 'firefly') {
          // Luminous pulsing firefly with radiant halo
          const glow = (Math.sin(p.pulse) + 1) * 0.5;
          ctx.beginPath();
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.opacity * (0.35 + glow * 0.65);
          ctx.shadowBlur = 14 * glow;
          ctx.shadowColor = p.color;
          ctx.arc(0, 0, p.size * 0.45, 0, Math.PI * 2);
          ctx.fill();
        } else if (type === 'maple') {
          // 5-point Japanese Momiji leaf
          ctx.beginPath();
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.opacity * 0.85;
          ctx.moveTo(0, -p.size);
          ctx.lineTo(p.size * 0.6, -p.size * 0.2);
          ctx.lineTo(p.size * 0.4, p.size * 0.4);
          ctx.lineTo(0, p.size * 0.8);
          ctx.lineTo(-p.size * 0.4, p.size * 0.4);
          ctx.lineTo(-p.size * 0.6, -p.size * 0.2);
          ctx.closePath();
          ctx.fill();
        } else {
          // Crisp soft snowflakes
          ctx.beginPath();
          ctx.fillStyle = '#FFFFFF';
          ctx.globalAlpha = p.opacity * 0.8;
          ctx.arc(0, 0, p.size * 0.5, 0, Math.PI * 2);
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
  }, [atmosphere.quarter, atmosphere.particleType, motionDisabled]);

  return (
    <>
      {/* 1. Ambient Seasonal Mist Light Wash (Changes page atmosphere per season) */}
      <div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none z-0 transition-colors duration-700 ease-out"
        style={{ backgroundColor: atmosphere.mistOverlay }}
      />

      {/* 2. Living Canvas Particles (Floating over vista with z-30) */}
      {!motionDisabled && (
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="fixed inset-0 pointer-events-none z-30"
        />
      )}
    </>
  );
}

"use client";

import React, { useEffect, useState, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { useSeason } from '@/lib/SeasonContext';

export default function CustomCursor() {
  const pathname = usePathname();
  const { atmosphere } = useSeason();
  const accentColor = atmosphere?.accentColor || '#DF4F73';

  const [mounted, setMounted] = useState(false);
  const [isFinePointer, setIsFinePointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  // Direct mouse target coordinates
  const targetRef = useRef({ x: -100, y: -100 });
  // Dot coordinates (snappy/instant)
  const dotPosRef = useRef({ x: -100, y: -100 });
  // Outer magnetic trailing ring coordinates (smooth lerp)
  const ringPosRef = useRef({ x: -100, y: -100 });

  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const rafRef = useRef(null);
  const lastCoordUpdate = useRef(0);

  useEffect(() => {
    setMounted(true);
    const media = window.matchMedia('(pointer: fine)');
    const updateFinePointer = () => setIsFinePointer(media.matches);
    updateFinePointer();
    media.addEventListener('change', updateFinePointer);

    return () => media.removeEventListener('change', updateFinePointer);
  }, []);

  useEffect(() => {
    if (!mounted || !isFinePointer) return;

    document.documentElement.classList.add('custom-cursor-active');

    const onMouseMove = (e) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      // Throttled telemetry for /about page
      const now = performance.now();
      if (now - lastCoordUpdate.current > 80) {
        lastCoordUpdate.current = now;
        setCoords({
          x: Math.round(e.clientX),
          y: Math.round(e.clientY),
        });
      }
    };

    const onMouseEnter = () => setIsVisible(true);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseDown = () => setIsPressed(true);
    const onMouseUp = () => setIsPressed(false);

    // Interactive target detection (buttons, links, inputs, chips)
    const onMouseOver = (e) => {
      const target = e.target;
      if (!target) return;
      const isInteractive = target.closest(
        'a, button, [role="button"], input, textarea, select, [data-interactive="true"], [data-ui]'
      );
      setIsHovered(Boolean(isInteractive));
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseover', onMouseOver, { passive: true });

    // 60-120fps RAF physics loop
    const animate = () => {
      const target = targetRef.current;
      const dot = dotPosRef.current;
      const ring = ringPosRef.current;

      // 1. Crisp dot tracks mouse instantly (no lag)
      dot.x = target.x;
      dot.y = target.y;

      // 2. Trailing magnetic ring follows with fluid damping (0.18 factor)
      ring.x += (target.x - ring.x) * 0.18;
      ring.y += (target.y - ring.y) * 0.18;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dot.x}px, ${dot.y}px, 0)`;
      }

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      document.documentElement.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseover', onMouseOver);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [mounted, isFinePointer, isVisible]);

  if (!mounted || !isFinePointer) return null;

  return (
    <>
      {/* 1. Trailing Magnetic Halo Ring */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className={`fixed top-0 left-0 pointer-events-none z-[9998] will-change-transform transition-opacity duration-200 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          transform: `translate3d(${ringPosRef.current.x}px, ${ringPosRef.current.y}px, 0)`,
        }}
      >
        <div
          className={`-translate-x-1/2 -translate-y-1/2 rounded-full transition-[width,height,transform,background-color,border-color] duration-300 ease-out flex items-center justify-center ${
            isHovered ? 'w-11 h-11' : 'w-7 h-7'
          } ${isPressed ? 'scale-75' : 'scale-100'}`}
          style={{
            borderWidth: '1.5px',
            borderStyle: 'solid',
            borderColor: isHovered ? accentColor : 'rgba(23, 24, 28, 0.35)',
            backgroundColor: isHovered ? `${accentColor}12` : 'rgba(23, 24, 28, 0.03)',
          }}
        />
      </div>

      {/* 2. Razor-Sharp Precision Ink Dot + Route Accents */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className={`fixed top-0 left-0 pointer-events-none z-[9999] will-change-transform transition-opacity duration-150 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          transform: `translate3d(${dotPosRef.current.x}px, ${dotPosRef.current.y}px, 0)`,
        }}
      >
        {/* Core Dot (pinned to center) */}
        <div className="relative -top-1/2 -left-1/2 flex items-center justify-center">
          <div
            className={`rounded-full transition-[transform,background-color] duration-150 ease-out ${
              isHovered ? 'w-2 h-2 scale-125' : 'w-1.5 h-1.5 scale-100'
            } ${isPressed ? 'scale-75' : ''}`}
            style={{
              backgroundColor: isHovered ? accentColor : '#17181C',
            }}
          />

          {/* Route Special: /about live telemetry coordinates */}
          {pathname === '/about' && (
            <div className="absolute left-6 top-1 pointer-events-none select-none text-[9px] tracking-widest px-1.5 py-0.5 rounded bg-prussian text-paper whitespace-nowrap">
              X:{String(coords.x).padStart(4, '0')} Y:{String(coords.y).padStart(4, '0')}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

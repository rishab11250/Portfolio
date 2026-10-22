"use client";

import React, { useEffect, useState, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { useSeason } from '@/lib/SeasonContext';

export default function CustomCursor() {
  const pathname = usePathname();
  const { atmosphere } = useSeason();
  const accentColor = atmosphere?.accentColor || '#C91F37';

  const [mounted, setMounted] = useState(false);
  const [isFinePointer, setIsFinePointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [stamps, setStamps] = useState([]);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const targetRef = useRef({ x: -100, y: -100 });
  const posRef = useRef({ x: -100, y: -100 });

  const cursorRef = useRef(null);
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

    const onMouseDown = (e) => {
      setIsPressed(true);
      // Leave temporary vermilion seal imprint on click
      const id = Date.now() + Math.random();
      setStamps((prev) => [...prev.slice(-4), { id, x: e.clientX, y: e.clientY }]);
      setTimeout(() => {
        setStamps((prev) => prev.filter((s) => s.id !== id));
      }, 650);
    };

    const onMouseUp = () => setIsPressed(false);

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

    // Snappy responsive tracking
    const animate = () => {
      const target = targetRef.current;
      const pos = posRef.current;

      pos.x += (target.x - pos.x) * 0.85;
      pos.y += (target.y - pos.y) * 0.85;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
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
      {/* Click Vermilion Hanko Stamp Imprints */}
      {stamps.map((stamp) => (
        <div
          key={stamp.id}
          className="fixed pointer-events-none z-[9998] animate-stamp-imprint select-none"
          style={{
            left: stamp.x,
            top: stamp.y,
          }}
        >
          <div data-ui="hanko-imprint" className="w-6 h-6 border-[1.5px] border-seal/80 bg-seal/15 rounded flex items-center justify-center font-display font-black text-seal text-[11px] leading-none">
            印
          </div>
        </div>
      ))}

      {/* Primary Hardware-Accelerated Floating Stamp Pointer */}
      <div
        ref={cursorRef}
        aria-hidden="true"
        className={`fixed top-0 left-0 pointer-events-none z-[9999] will-change-transform transition-opacity duration-150 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          transform: `translate3d(${posRef.current.x}px, ${posRef.current.y}px, 0)`,
        }}
      >
        <div className="relative -top-1 -left-1">
          {/* Hanko Stamp Vessel */}
          <div
            className={`transition-[transform,border-color,background-color] duration-150 ease-out origin-top-left flex items-center justify-center ${
              isHovered
                ? 'scale-110 -rotate-3'
                : 'scale-100 rotate-0'
            } ${isPressed ? 'scale-90 translate-x-0.5 translate-y-0.5' : ''}`}
          >
            {/* Square vermilion seal with traditional character */}
            <div
              className={`w-6 h-6 rounded border-[1.5px] flex items-center justify-center font-display font-black text-[11px] leading-none transition-colors duration-150 ${
                isHovered
                  ? 'border-seal bg-seal text-paper'
                  : 'border-seal/80 bg-paper/90 text-seal'
              }`}
              style={{
                boxShadow: isHovered
                  ? '0 2px 8px rgba(201, 31, 55, 0.35)'
                  : '0 1px 3px rgba(201, 31, 55, 0.2)',
              }}
            >
              印
            </div>

            {/* Pinned Micro Precision Red Aim Dot at top-left (0,0) */}
            <span className="absolute -top-0.5 -left-0.5 w-1.5 h-1.5 rounded-full bg-seal" />

            {/* Telemetry coords for /about */}
            {pathname === '/about' && (
              <div className="absolute left-8 top-0 pointer-events-none select-none text-[9px] tracking-widest px-1.5 py-0.5 rounded bg-prussian text-paper whitespace-nowrap">
                X:{String(coords.x).padStart(4, '0')} Y:{String(coords.y).padStart(4, '0')}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

"use client";

import React, { useEffect, useState, useRef, useCallback } from 'react';
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
  const [ripples, setRipples] = useState([]);
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

      // Throttled coordinate telemetry for /about page HUD
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
      // Spawn ripple on Home route (Sumi-e ink drop)
      if (pathname === '/') {
        const id = Date.now() + Math.random();
        setRipples((prev) => [...prev.slice(-3), { id, x: e.clientX, y: e.clientY }]);
        setTimeout(() => {
          setRipples((prev) => prev.filter((r) => r.id !== id));
        }, 700);
      }
    };

    const onMouseUp = () => setIsPressed(false);

    // Interactive target detection
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

    // 60-120fps RAF spring physics loop (Instantaneous responsive tracking)
    const lerpFactor = pathname === '/' ? 0.9 : 0.85;
    const animate = () => {
      const target = targetRef.current;
      const pos = posRef.current;

      pos.x += (target.x - pos.x) * lerpFactor;
      pos.y += (target.y - pos.y) * lerpFactor;

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
  }, [mounted, isFinePointer, isVisible, pathname]);

  if (!mounted || !isFinePointer) return null;

  return (
    <>
      {/* Organic Sumi-e Ink Wash Bleed on Click */}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="fixed pointer-events-none rounded-full z-[9998] animate-ink-bleed"
          style={{
            left: ripple.x,
            top: ripple.y,
            backgroundColor: 'rgba(23, 24, 28, 0.35)',
            filter: 'blur(2px)',
          }}
        />
      ))}

      {/* Primary Hardware-Accelerated Floating Pointer Container */}
      <div
        ref={cursorRef}
        aria-hidden="true"
        className={`fixed top-0 left-0 pointer-events-none z-[9999] will-change-transform transition-opacity duration-200 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          transform: `translate3d(${posRef.current.x}px, ${posRef.current.y}px, 0)`,
        }}
      >
        {/* ================= 1. HOME (/): TRADITIONAL JAPANESE FUDE BRUSH (筆) ================= */}
        {pathname === '/' && (
          <div className="relative -top-0.5 -left-0.5">
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={`transition-transform duration-150 ease-out origin-top-left ${
                isHovered ? 'scale-110 -rotate-6' : 'scale-100 rotate-0'
              } ${isPressed ? 'scale-90 translate-x-0.5 translate-y-0.5' : ''}`}
            >
              {/* Bamboo Handle / Shaft */}
              <path
                d="M10 10 L24 24 C25 25 26.5 25 27.5 24 C28.5 23 28.5 21.5 27.5 20.5 L13.5 6.5 Z"
                fill="#36251B"
                stroke="#17181C"
                strokeWidth="0.8"
                strokeLinejoin="round"
              />
              {/* Bamboo Segment Node */}
              <line
                x1="18"
                y1="16"
                x2="21"
                y2="19"
                stroke="#251A13"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
              {/* Antique Brass Ferrule Collar */}
              <path
                d="M8 8 L13.5 6.5 L11 11.5 L6.5 9.5 Z"
                fill="#C6A868"
                stroke="#17181C"
                strokeWidth="0.75"
                strokeLinejoin="round"
              />
              {/* Ferrule Highlight */}
              <line
                x1="8.5"
                y1="8"
                x2="10.5"
                y2="10"
                stroke="#E6D3A3"
                strokeWidth="0.75"
                strokeLinecap="round"
              />
              {/* Sable / Goat Hair Tuft */}
              <path
                d="M0 0 C1.8 3.5 4.5 6.8 8 8 L7 9.5 C3.8 7.5 1.8 4.5 0 0 Z"
                fill="#2E2421"
              />
              {/* Deep Pine-Soot Ink Needle Tip (Hotspot directly at 0,0) */}
              <path
                d="M0 0 C0.8 1.8 2.2 3.6 4 4.5 C2.8 4.5 1.4 3.2 0 0 Z"
                fill="#17181C"
              />
              {/* Wet Ink Highlight Sheen */}
              <circle cx="1.2" cy="1.2" r="0.6" fill="#FFFFFF" opacity="0.65" />
              {/* Ink Bead Swell on Hover */}
              {isHovered && (
                <circle cx="0.5" cy="0.5" r="1.2" fill={accentColor} opacity="0.9" />
              )}
            </svg>
          </div>
        )}

        {/* ================= 2. SKILLS (/skills): 8/16-BIT PIXEL GAUNTLET ================= */}
        {pathname === '/skills' && (
          <div className="relative -top-1 -left-1">
            {isHovered ? (
              /* Pixel Index Finger Pointing */
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="pixelated"
                shapeRendering="crispEdges"
              >
                <rect x="8" y="2" width="4" height="12" fill="#FFFFFF" />
                <rect x="6" y="8" width="8" height="12" fill="#FFFFFF" />
                <rect x="4" y="10" width="12" height="8" fill="#FFFFFF" />
                <rect x="8" y="2" width="4" height="2" fill="#17181C" />
                <rect x="6" y="4" width="2" height="10" fill="#17181C" />
                <rect x="12" y="4" width="2" height="10" fill="#17181C" />
                <rect x="4" y="10" width="2" height="8" fill="#17181C" />
                <rect x="14" y="10" width="2" height="8" fill="#17181C" />
                <rect x="6" y="18" width="8" height="2" fill="#17181C" />
                <rect x="9" y="6" width="2" height="6" fill="#0D9488" />
              </svg>
            ) : (
              /* Pixel Dagger / Arrow Gauntlet */
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="pixelated"
                shapeRendering="crispEdges"
              >
                <path
                  d="M0 0 L0 16 L4 12 L8 18 L11 16 L7 10 L13 10 Z"
                  fill="#FFFFFF"
                  stroke="#17181C"
                  strokeWidth="1.5"
                />
                <circle cx="4" cy="4" r="1.5" fill="#0D9488" />
              </svg>
            )}
          </div>
        )}

        {/* ================= 3. PROJECTS (/projects): MANGA G-PEN NIB ================= */}
        {pathname === '/projects' && (
          <div className="relative -top-2 -left-2">
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              className={`transition-transform duration-200 ease-out origin-top-left ${
                isHovered ? 'scale-110 rotate-[-10deg]' : 'rotate-0'
              } ${isPressed ? 'scale-90 translate-y-0.5' : ''}`}
            >
              {/* Metallic G-Pen Nib Body */}
              <polygon
                points="2,2 14,8 18,22 10,24 6,14"
                fill="#F1ECE0"
                stroke="#17181C"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
              {/* Breather Slit & Hole */}
              <line x1="2" y1="2" x2="11" y2="15" stroke="#17181C" strokeWidth="1.2" />
              <circle cx="11" cy="15" r="2" fill="#17181C" />
              {/* Inked Tip Point */}
              <polygon points="2,2 5,3.5 3.5,5" fill="#17181C" />
              {/* Crosshair Ticks when Hovering */}
              {isHovered && (
                <g stroke="#C91F37" strokeWidth="1.5" opacity="0.85">
                  <line x1="20" y1="6" x2="26" y2="6" />
                  <line x1="23" y1="3" x2="23" y2="9" />
                </g>
              )}
            </svg>
          </div>
        )}

        {/* ================= 4. ABOUT (/about): TACTICAL HUD RETICLE ================= */}
        {pathname === '/about' && (
          <div className="relative -top-4 -left-4">
            <div
              className={`w-8 h-8 relative flex items-center justify-center transition-transform duration-200 ease-out ${
                isHovered ? 'scale-125 rotate-45' : 'scale-100 rotate-0'
              }`}
            >
              {/* Corner Targeting Brackets */}
              <span className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-prussian" />
              <span className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-prussian" />
              <span className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-prussian" />
              <span className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-prussian" />
              {/* Central Target Dot */}
              <span className="w-1.5 h-1.5 rounded-full bg-prussian" />
            </div>

            {/* Live Telemetry Coordinates Readout */}
            <div className="absolute left-8 top-1 pointer-events-none select-none text-[9px] tracking-widest px-1.5 py-0.5 rounded bg-prussian text-paper whitespace-nowrap">
              X:{String(coords.x).padStart(4, '0')} Y:{String(coords.y).padStart(4, '0')}
            </div>
          </div>
        )}

        {/* ================= 5. CERTIFICATES (/certificates): ARCADE COIN CROSSHAIR ================= */}
        {pathname === '/certificates' && (
          <div className="relative -top-4 -left-4">
            <div
              className={`w-8 h-8 rounded-full border border-glow-gold/60 flex items-center justify-center transition-[transform,border-color,background-color] duration-200 ${
                isHovered ? 'scale-125 border-glow-gold bg-glow-gold/15' : 'scale-100'
              } ${isPressed ? 'scale-90' : ''}`}
            >
              {/* 4 Arcade Ticks */}
              <span className="absolute -top-1 w-0.5 h-1.5 bg-glow-gold" />
              <span className="absolute -bottom-1 w-0.5 h-1.5 bg-glow-gold" />
              <span className="absolute -left-1 w-1.5 h-0.5 bg-glow-gold" />
              <span className="absolute -right-1 w-1.5 h-0.5 bg-glow-gold" />
              {/* Coin / Star Emblem SVG */}
              <svg width="10" height="10" viewBox="0 0 10 10" fill="#F2B84B" className="select-none leading-none">
                <polygon points="5,0 6.5,3.5 10,4 7.5,6.5 8,10 5,8 2,10 2.5,6.5 0,4 3.5,3.5" />
              </svg>
            </div>
          </div>
        )}

        {/* ================= 6. CONTACT (/contact): BRASS FOUNTAIN PEN NIB ================= */}
        {pathname === '/contact' && (
          <div className="relative -top-1 -left-1">
            <svg
              width="26"
              height="26"
              viewBox="0 0 26 26"
              className={`transition-transform duration-200 ease-out origin-top-left ${
                isHovered ? 'scale-110 rotate-[-8deg]' : 'rotate-0'
              } ${isPressed ? 'scale-90 translate-y-1' : ''}`}
            >
              {/* Brass Nib Body */}
              <path
                d="M1 1 L12 6 L16 19 L8 21 L5 12 Z"
                fill="#C6A868"
                stroke="#17181C"
                strokeWidth="1.6"
                strokeLinejoin="round"
              />
              {/* Calligraphy Slit */}
              <line x1="1" y1="1" x2="10" y2="13" stroke="#17181C" strokeWidth="1.2" />
              {/* Vermilion Wax Ink Bead at the Tip */}
              <circle cx="2" cy="2" r="2.2" fill="#C91F37" />
            </svg>
          </div>
        )}
      </div>
    </>
  );
}

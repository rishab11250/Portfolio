"use client";
import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SealMark from './primitives/SealMark';
import { useSeason } from '../lib/SeasonContext.jsx';

/**
 * Hero Section - "Mist & Indigo"
 * Paper panel, asymmetrical layout, name in display font,
 * vermilion red seal brand mark, ink art layers revealed via pointer tracking,
 * and seasonal dusk-glow gradient band.
 * Framer-motion removed to minimize client bundle size.
 */
export default function Hero() {
  const heroRef = useRef(null);
  const { atmosphere } = useSeason();

  // Pointer tracking for desktop ink reveal (rAF-throttled)
  useEffect(() => {
    let rAF = null;
    const handlePointerMove = (e) => {
      if (rAF) cancelAnimationFrame(rAF);
      rAF = requestAnimationFrame(() => {
        if (!heroRef.current) return;
        const rect = heroRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        heroRef.current.style.setProperty('--mx', `${x.toFixed(1)}%`);
        heroRef.current.style.setProperty('--my', `${y.toFixed(1)}%`);
      });
    };

    const handleScroll = () => {
      if (!heroRef.current) return;
      const progress = Math.min(window.scrollY / 450, 1);
      const radius = 280 + progress * 400;
      heroRef.current.style.setProperty('--mask-radius', `${radius}px`);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('scroll', handleScroll);
      if (rAF) cancelAnimationFrame(rAF);
    };
  }, []);

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-[85vh] sm:min-h-[90vh] bg-paper text-ink flex flex-col justify-between pt-8 sm:pt-16 overflow-hidden select-none"
      style={{
        '--mx': '50%',
        '--my': '45%',
        '--mask-radius': '380px',
      }}
    >
      {/* 1. Ink Landscape Artwork Layer (Revealed via pointer mask / scroll) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-90 transition-opacity duration-300 motion-reduce:opacity-85"
        style={{
          WebkitMaskImage:
            ['radial', '-gradient(circle var(--mask-radius, 380px) at var(--mx, 50%) var(--my, 50%), black 20%, transparent 90%)'].join(''),
          maskImage:
            ['radial', '-gradient(circle var(--mask-radius, 380px) at var(--mx, 50%) var(--my, 50%), black 20%, transparent 90%)'].join(''),
        }}
      >
        {/* Layer 1: Distant Mist Ridge */}
        <div className="absolute inset-x-0 bottom-0 h-80 sm:h-96 opacity-60">
          <Image
            src="/ink/ridge-back.svg"
            alt=""
            fill
            sizes="100vw"
            priority
            className="object-cover object-bottom"
          />
        </div>

        {/* Drifting Mist Band */}
        <div className="absolute inset-x-0 bottom-24 h-48 opacity-45 motion-safe:animate-[mistDrift_24s_ease-in-out_infinite_alternate] motion-reduce:transform-none">
          <Image
            src="/ink/mist.svg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-bottom"
          />
        </div>

        {/* Layer 2: Midground Ridge */}
        <div className="absolute inset-x-0 bottom-0 h-64 sm:h-80 opacity-75">
          <Image
            src="/ink/ridge-mid.svg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-bottom"
          />
        </div>

        {/* Mid Pines Silhouettes */}
        <div className="absolute inset-x-0 bottom-0 h-64 sm:h-80 opacity-80">
          <Image
            src="/ink/pines.svg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-bottom"
          />
        </div>

        {/* Layer 3: Foreground Ink Ridge */}
        <div className="absolute inset-x-0 bottom-0 h-44 sm:h-60 opacity-95">
          <Image
            src="/ink/ridge-front.svg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-bottom"
          />
        </div>
      </div>

      {/* 2. Hero Content (Asymmetrical Layout, High-Contrast Typography) */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 w-full flex-1 flex flex-col justify-center my-auto">
        <div className="max-w-3xl">
          {/* Header Mark */}
          <div className="mb-6 animate-enter" style={{ animationDelay: '50ms' }}>
            <SealMark size={52} />
          </div>

          {/* Name in Display Font */}
          <h1 className="font-display font-black text-5xl sm:text-7xl md:text-8xl text-ink tracking-tight leading-[1.05] mb-6 break-words animate-enter">
            Rishab
            <br />
            <span className="text-seal">Chandgothia</span>
          </h1>

          <p className="font-body text-ink text-lg sm:text-xl font-normal leading-relaxed max-w-2xl mb-8 sm:mb-10 animate-enter" style={{ animationDelay: '100ms' }}>
            I build full-stack web platforms and interactive systems with clean architecture, resilient data pipelines, and responsive engineering.
          </p>

          {/* Action Call-to-Actions (Responsive Stack on Mobile) */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
            <Link
              href="/projects"
              className="w-full sm:w-auto inline-flex items-center justify-center h-12 px-7 rounded-xl bg-ink text-paper font-body text-sm font-semibold hover:bg-seal active:scale-95 transition-colors duration-150 ease-[var(--ease-twos)] focus-visible:ring-2 focus-visible:ring-seal motion-reduce:transition-none animate-enter"
              style={{ animationDelay: '150ms' }}
            >
              Explore Projects ↗
            </Link>
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center h-12 px-7 rounded-xl bg-ink/10 text-ink font-body text-sm font-semibold hover:bg-ink/15 active:scale-95 transition-colors duration-150 ease-[var(--ease-twos)] focus-visible:ring-2 focus-visible:ring-seal motion-reduce:transition-none animate-enter"
              style={{ animationDelay: '200ms' }}
            >
              Contact Me ↗
            </Link>
            <a
              href="/Rishab-Chandgothia-Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center h-12 px-5 text-ink hover:text-seal font-body text-sm font-medium underline underline-offset-4 transition-colors duration-150 ease-[var(--ease-twos)] focus-visible:ring-2 focus-visible:ring-seal animate-enter"
              style={{ animationDelay: '250ms' }}
            >
              Resume (PDF)
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

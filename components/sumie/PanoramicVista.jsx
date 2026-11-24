'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SealMark from '../primitives/SealMark';

const WAYPOINTS = [
  {
    href: '/projects',
    kanji: '創',
    title: 'Projects',
    role: 'Production Systems',
    desc: 'Scalable platforms & hackathon podiums',
    sealColor: 'bg-seal text-paper',
    hoverText: 'group-hover:text-seal',
  },
  {
    href: '/skills',
    kanji: '技',
    title: 'Skills',
    role: 'Technical Stack',
    desc: 'Frontend, backend, data & cloud runtimes',
    sealColor: 'bg-indigo text-paper',
    hoverText: 'group-hover:text-indigo',
  },
  {
    href: '/about',
    kanji: '志',
    title: 'About',
    role: 'Roots & Bio',
    desc: 'Engineering ethos & academic foundations',
    sealColor: 'bg-pine text-paper',
    hoverText: 'group-hover:text-pine',
  },
  {
    href: '/certificates',
    kanji: '証',
    title: 'Certificates',
    role: 'Verified Proof',
    desc: 'HackerRank, open-source & honors',
    sealColor: 'bg-seal text-paper',
    hoverText: 'group-hover:text-seal',
  },
  {
    href: '/contact',
    kanji: '墨',
    title: 'Contact',
    role: 'Direct Dispatch',
    desc: 'Letter stationery & verified delivery',
    sealColor: 'bg-ink text-paper',
    hoverText: 'group-hover:text-ink',
  },
];

const SOCIAL_LINKS = [
  { label: 'GitHub', href: 'https://github.com/rishab11250' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/rishab-chandgothia-8823112a4/' },
  { label: 'X (Twitter)', href: 'https://x.com/Rishab25361722' },
  { label: 'Email', href: 'mailto:rishab.chandgothia.cg@gmail.com' },
];

export default function PanoramicVista() {
  const vistaRef = useRef(null);

  // Smooth pointer tracking for interactive ink landscape reveal
  useEffect(() => {
    let rAF = null;
    const handlePointerMove = (e) => {
      if (rAF) cancelAnimationFrame(rAF);
      rAF = requestAnimationFrame(() => {
        if (!vistaRef.current) return;
        const rect = vistaRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        vistaRef.current.style.setProperty('--mx', `${x.toFixed(1)}%`);
        vistaRef.current.style.setProperty('--my', `${y.toFixed(1)}%`);
      });
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      if (rAF) cancelAnimationFrame(rAF);
    };
  }, []);

  const currentYear = new Date().getFullYear();

  return (
    <div
      ref={vistaRef}
      className="relative w-full h-[calc(100dvh-4.25rem)] sm:h-[calc(100dvh-5rem)] overflow-hidden flex flex-col justify-between px-4 sm:px-8 lg:px-12 py-3 sm:py-5 select-none"
      style={{
        '--mx': '50%',
        '--my': '50%',
        '--mask-radius': '520px',
      }}
    >
      {/* 1. Full-Bleed Atmospheric Japanese Ink Mountain Landscape */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
      >
        {/* Layer A: Ambient Mountain Horizon (Always visible) */}
        <div className="absolute inset-x-0 bottom-0 h-full max-h-[850px] opacity-45">
          <Image
            src="/ink/ridge-back.svg"
            alt=""
            fill
            sizes="100vw"
            priority
            className="object-cover object-bottom"
          />
        </div>

        {/* Layer B: Drifting Mountain Mist Ribbon */}
        <div className="absolute inset-x-0 bottom-44 sm:bottom-64 h-44 opacity-40 motion-safe:animate-[mistDrift_28s_ease-in-out_infinite_alternate]">
          <Image
            src="/ink/mist.svg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-bottom"
          />
        </div>

        {/* Layer C: Interactive Pointer Brush Reveal (Reveals rich deep ink on cursor hover) */}
        <div
          className="absolute inset-0 transition-opacity duration-300"
          style={{
            WebkitMaskImage:
              ['radial', '-gradient(circle var(--mask-radius, 520px) at var(--mx, 50%) var(--my, 50%), black 30%, transparent 85%)'].join(''),
            maskImage:
              ['radial', '-gradient(circle var(--mask-radius, 520px) at var(--mx, 50%) var(--my, 50%), black 30%, transparent 85%)'].join(''),
          }}
        >
          {/* Midground Ridge */}
          <div className="absolute inset-x-0 bottom-0 h-[65%] max-h-[600px] opacity-75">
            <Image
              src="/ink/ridge-mid.svg"
              alt=""
              fill
              sizes="100vw"
              className="object-cover object-bottom"
            />
          </div>

          {/* Pine Silhouettes */}
          <div className="absolute inset-x-0 bottom-0 h-[55%] max-h-[500px] opacity-85">
            <Image
              src="/ink/pines.svg"
              alt=""
              fill
              sizes="100vw"
              className="object-cover object-bottom"
            />
          </div>

          {/* Foreground Deep Ink Ridge */}
          <div className="absolute inset-x-0 bottom-0 h-[45%] max-h-[400px] opacity-95">
            <Image
              src="/ink/ridge-front.svg"
              alt=""
              fill
              sizes="100vw"
              className="object-cover object-bottom"
            />
          </div>
        </div>

        {/* Permanent Foreground Base Silhouettes (Grounding the Landscape) */}
        <div className="absolute inset-x-0 bottom-0 h-28 sm:h-36 opacity-90 pointer-events-none">
          <Image
            src="/ink/ridge-front.svg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-bottom"
          />
        </div>
      </div>

      {/* 2. Top-Left Calligraphic Identity & Ethos */}
      <div className="relative z-10 max-w-2xl pt-2 sm:pt-4">
        {/* Seal Mark Brand Emblem */}
        <div className="mb-3 animate-enter" style={{ animationDelay: '50ms' }}>
          <SealMark size={48} />
        </div>

        {/* Display Typography Name */}
        <h1 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl text-ink tracking-tight leading-[1.05] mb-3 animate-enter" style={{ animationDelay: '100ms' }}>
          Rishab
          <span className="text-seal ml-2 sm:ml-3">Chandgothia</span>
        </h1>

        <p className="font-body text-ink text-base sm:text-lg font-normal leading-relaxed max-w-xl mb-4 sm:mb-5 animate-enter" style={{ animationDelay: '150ms' }}>
          Full-Stack Developer crafting reliable, high-performance web applications with clean design and solid engineering foundations.
        </p>

        {/* Quick Identity Actions */}
        <div className="flex flex-wrap items-center gap-3 animate-enter" style={{ animationDelay: '200ms' }}>
          <a
            href="/Rishab-Chandgothia-Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center h-10 px-5 rounded-xl bg-ink text-paper font-body text-[13px] font-semibold hover:bg-seal transition-colors duration-150 ease-[var(--ease-twos)] focus-visible:ring-2 focus-visible:ring-seal"
          >
            Resume (PDF) ↗
          </a>
          <span className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-ink/5 font-body text-[13px] font-medium text-ink">
            <span className="w-2 h-2 rounded-full bg-pine inline-block" />
            <span>Open for Engineering Roles</span>
          </span>
        </div>
      </div>

      {/* 3. Bottom Landscape Waypoint Stelae (Clean Pure Typographic Hanging Scrolls) */}
      <div className="relative z-10 w-full pt-4 pb-2">
        {/* Section Headline Cue */}
        <div className="flex items-center justify-between mb-3 animate-enter" style={{ animationDelay: '250ms' }}>
          <span className="font-display font-bold text-sm text-ink/80">
            Scenic Waypoints
          </span>
          <span className="font-body text-[13px] text-ink/60 hidden sm:inline">
            Each page possesses its own aesthetic world
          </span>
        </div>

        {/* 5 Minimal Japanese Hanging Scroll Waypoints (Pure Typographic & Seal Marks) */}
        <nav aria-label="Portfolio Waypoints" className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3.5">
          {WAYPOINTS.map((item, idx) => (
            <Link
              key={item.href}
              href={item.href}
              className="group relative p-3.5 sm:p-4 rounded-2xl bg-paper/85 hover:bg-paper transition-[transform,background-color] duration-200 hover:-translate-y-2 flex flex-col justify-between overflow-hidden focus-visible:ring-2 focus-visible:ring-seal animate-enter"
              style={{ animationDelay: `${idx * 50 + 300}ms` }}
            >
              <div>
                {/* Waypoint Header */}
                <div className="flex items-center justify-between mb-3">
                  <span className={`w-8 h-8 rounded-lg ${item.sealColor} flex items-center justify-center font-bold text-sm font-serif`}>
                    {item.kanji}
                  </span>
                  <span className="font-body text-[13px] text-ink/50 group-hover:text-ink font-semibold">
                    0{idx + 1} ↗
                  </span>
                </div>

                {/* Waypoint Title & Description */}
                <h2 className={`font-display font-black text-xl sm:text-2xl text-ink ${item.hoverText} transition-colors tracking-tight mb-1`}>
                  {item.title}
                </h2>
                <span className="font-body text-[13px] font-semibold text-mist block mb-1.5">
                  {item.role}
                </span>
                <p className="font-body text-[13px] text-ink/75 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </Link>
          ))}
        </nav>
      </div>

      {/* 4. Bottom Telemetry Bar: Social Links + Copyright + Season Tag */}
      <div className="relative z-10 pt-2 flex flex-col sm:flex-row items-center justify-between gap-2 text-[13px] font-body text-ink/75 animate-enter" style={{ animationDelay: '550ms' }}>
        <ul className="flex flex-wrap items-center gap-4 list-none">
          {SOCIAL_LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-seal font-medium transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          <p>© {currentYear} Rishab Chandgothia</p>
        </div>
      </div>
    </div>
  );
}

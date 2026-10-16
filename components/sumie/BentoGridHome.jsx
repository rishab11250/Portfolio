'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SeasonTag from '../SeasonTag';
import { useSeason } from '../../lib/SeasonContext.jsx';

const SKILL_BADGES = [
  'React',
  'Next.js',
  'Node.js',
  'Express',
  'PostgreSQL',
  'MongoDB',
  'TypeScript',
  'Tailwind CSS',
  'C++',
  'Docker',
  'Git',
];

const SOCIAL_LINKS = [
  { label: 'GitHub', href: 'https://github.com/rishab11250' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/rishab-chandgothia-8823112a4/' },
  { label: 'X (Twitter)', href: 'https://x.com/Rishab25361722' },
  { label: 'Email', href: 'mailto:rishab.chandgothia.cg@gmail.com' },
];

const SOCIAL_DOCK = [
  {
    label: 'GitHub',
    href: 'https://github.com/rishab11250',
    icon: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/rishab-chandgothia-8823112a4/',
    icon: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
      </svg>
    ),
  },
  {
    label: 'X (Twitter)',
    href: 'https://x.com/Rishab25361722',
    icon: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/@RishabChandgothia',
    icon: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    label: 'Email',
    href: 'mailto:rishab.chandgothia.cg@gmail.com',
    icon: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
      </svg>
    ),
  },
];

export default function BentoGridHome() {
  const containerRef = useRef(null);
  const { atmosphere } = useSeason();

  // Smooth damped pointer tracking for fluid ink brush diffusion sweep
  useEffect(() => {
    let rAF = null;
    let targetX = 50;
    let targetY = 50;
    let currentX = 50;
    let currentY = 50;
    let isRunning = true;

    const updatePhysics = () => {
      if (!isRunning) return;
      // Spring lerp damping (0.12 factor for silky liquid ink inertia)
      currentX += (targetX - currentX) * 0.12;
      currentY += (targetY - currentY) * 0.12;

      if (containerRef.current) {
        containerRef.current.style.setProperty('--mx', `${currentX.toFixed(2)}%`);
        containerRef.current.style.setProperty('--my', `${currentY.toFixed(2)}%`);
      }
      rAF = requestAnimationFrame(updatePhysics);
    };

    const handlePointerMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      targetX = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
      targetY = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
    };

    rAF = requestAnimationFrame(updatePhysics);
    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    return () => {
      isRunning = false;
      window.removeEventListener('pointermove', handlePointerMove);
      if (rAF) cancelAnimationFrame(rAF);
    };
  }, []);

  const currentYear = new Date().getFullYear();

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[calc(100dvh-4.25rem)] sm:h-[calc(100dvh-4.75rem)] flex flex-col justify-between px-3 sm:px-6 lg:px-8 py-2 sm:py-2.5 select-none overflow-hidden transition-[background-color] duration-700 ease-out"
      style={{
        '--mx': '50%',
        '--my': '50%',
        '--mask-radius': '600px',
        backgroundColor: atmosphere?.paperBg,
      }}
    >
      {/* 1. Full-Bleed Atmospheric Japanese Ink Mountain Landscape */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
      >
        {/* Layer 1: Towering Distant Peaks (Rises to ~90% height, leaving top 10% clear sky) */}
        <div className="absolute inset-0 w-full h-full opacity-65">
          <Image
            src="/ink/towering-peaks.svg"
            alt=""
            fill
            sizes="100vw"
            priority
            className="object-cover object-bottom"
          />
        </div>

        {/* Layer 2: Mid-High Mountain Ridge (Spans behind row 1 and row 2 cards) */}
        <div className="absolute inset-0 w-full h-full opacity-55">
          <Image
            src="/ink/mid-peaks.svg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-bottom"
          />
        </div>

        {/* Layer 3: Upper Mist Ribbon (Floating high across mountain crests) */}
        <div
          className="absolute inset-0 w-full h-full opacity-45 motion-safe:animate-[mistDrift_32s_ease-in-out_infinite_alternate] transition-[filter] duration-700"
          style={{ filter: atmosphere?.mistFilter }}
        >
          <Image
            src="/ink/mist-upper.svg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-bottom"
          />
        </div>

        {/* Layer 4: Lower Mist Ribbon (Opposing drift across pine forests) */}
        <div
          className="absolute inset-0 w-full h-full opacity-40 motion-safe:animate-[mistDriftReverse_42s_ease-in-out_infinite_alternate] transition-[filter] duration-700"
          style={{ filter: atmosphere?.mistFilter }}
        >
          <Image
            src="/ink/mist-lower.svg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-bottom"
          />
        </div>

        {/* Layer 5: Ambient Multi-Tier Pine Forest (Visible across whole page through translucent cards) */}
        <div className="absolute inset-0 w-full h-full opacity-50">
          <Image
            src="/ink/pines-all.svg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-bottom"
          />
        </div>

        {/* Layer 6: Interactive Pointer Brush Reveal (Vibrant deep ink following pointer) */}
        <div
          className="absolute inset-0 transition-opacity duration-300"
          style={{
            WebkitMaskImage:
              ['radial', '-gradient(circle var(--mask-radius, 600px) at var(--mx, 50%) var(--my, 50%), black 30%, transparent 85%)'].join(''),
            maskImage:
              ['radial', '-gradient(circle var(--mask-radius, 600px) at var(--mx, 50%) var(--my, 50%), black 30%, transparent 85%)'].join(''),
          }}
        >
          <div className="absolute inset-0 w-full h-full opacity-85">
            <Image
              src="/ink/towering-peaks.svg"
              alt=""
              fill
              sizes="100vw"
              className="object-cover object-bottom"
            />
          </div>
          <div className="absolute inset-0 w-full h-full opacity-90">
            <Image
              src="/ink/mid-peaks.svg"
              alt=""
              fill
              sizes="100vw"
              className="object-cover object-bottom"
            />
          </div>
          <div className="absolute inset-0 w-full h-full opacity-95">
            <Image
              src="/ink/pines-all.svg"
              alt=""
              fill
              sizes="100vw"
              className="object-cover object-bottom"
            />
          </div>
          <div className="absolute inset-0 w-full h-full opacity-100">
            <Image
              src="/ink/crags-foreground.svg"
              alt=""
              fill
              sizes="100vw"
              className="object-cover object-bottom"
            />
          </div>
        </div>

        {/* Layer 7: Foreground Heavy Crags (Base anchor) */}
        <div className="absolute inset-x-0 bottom-0 w-full h-[35%] opacity-90 pointer-events-none">
          <Image
            src="/ink/crags-foreground.svg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-bottom"
          />
        </div>
      </div>

      {/* 2. Symmetric 3-Column × 2-Row Bento Grid (Flawlessly Aligned, Exactly 6 Cards) */}
      <div className="relative z-10 w-full max-w-7xl mx-auto my-auto flex-1 flex flex-col justify-center py-0.5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3 items-stretch lg:auto-rows-fr h-full max-h-[calc(100dvh-10rem)]">
          
          {/* ================= ROW 1, CARD 1: MASTER PROFILE CARD ================= */}
          <div
            className="rounded-2xl sm:rounded-3xl p-3.5 sm:p-4 flex flex-col justify-between border animate-enter h-full transition-[transform,background-color,border-color,opacity] duration-300 ease-out hover:scale-[1.01] hover:-translate-y-0.5 backdrop-blur-[2px]" /* taste-skill-ignore */
            style={{
              animationDelay: '40ms',
              backgroundColor: atmosphere?.cardBg,
              borderColor: atmosphere?.cardBorder,
            }}
          >
            <div>
              {/* Header: Centered Avatar + Dynamic Seasonal Status Pill */}
              <div className="flex items-center justify-between mb-2">
                <div className="relative w-13 h-13 sm:w-15 sm:h-15 rounded-2xl overflow-hidden border-2 border-ink/15 bg-ink/5">
                  <Image
                    src="https://res.cloudinary.com/dhr1jtyi2/image/upload/v1773478876/WhatsApp_Image_2026-03-07_at_9.25.25_AM_cswpuv.jpg"
                    alt="Rishab Chandgothia"
                    fill
                    sizes="120px"
                    className="object-cover object-top"
                    priority
                  />
                </div>
                <div
                  className="px-2.5 py-0.5 rounded-full text-[13px] font-semibold flex items-center gap-1.5 transition-colors duration-500"
                  style={{
                    backgroundColor: atmosphere?.badgeBg,
                    color: atmosphere?.accentColor,
                  }}
                >
                  <span
                    className="w-2 h-2 rounded-full transition-colors duration-500"
                    style={{ backgroundColor: atmosphere?.accentColor }}
                  />
                  <span>{atmosphere?.greeting || 'Open for Roles'}</span>
                </div>
              </div>

              {/* Name & Title */}
              <h1 className="font-display font-black text-2xl sm:text-[24px] text-ink tracking-tight leading-tight mb-0.5">
                Rishab{' '}
                <span className="transition-colors duration-500" style={{ color: atmosphere?.accentColor }}>
                  Chandgothia
                </span>
              </h1>
              <p
                className="font-body font-semibold text-sm sm:text-base mb-1.5 transition-colors duration-500"
                style={{ color: atmosphere?.accentColor }}
              >
                Full-Stack Developer &amp; Systems Engineer
              </p>

              {/* Bio Statement */}
              <p className="font-body text-ink/85 text-[15px] sm:text-base leading-relaxed mb-2">
                Crafting reliable distributed systems, high-throughput cloud runtimes, and dependable web applications.
              </p>
            </div>

            <div className="space-y-1.5 pt-0.5">
              {/* Download Resume Action */}
              <a
                href="/Rishab-Chandgothia-Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center h-9 px-4 rounded-xl text-paper font-body text-sm font-semibold transition-colors duration-150 ease-[var(--ease-twos)] focus-visible:ring-2"
                style={{ backgroundColor: '#17181C' }}
              >
                <svg className="w-4 h-4 mr-2 stroke-current fill-none stroke-2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M7.5 12L12 16.5m0 0L16.5 12M12 16.5V3" />
                </svg>
                <span>Download Resume</span>
                <span className="ml-1.5 font-body">&rarr;</span>
              </a>

              {/* Inset Social Dock */}
              <div className="flex items-center justify-around py-1 px-2.5 rounded-xl bg-ink/5">
                {SOCIAL_DOCK.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.label}
                    className="p-1 rounded-lg text-ink/75 hover:bg-ink/10 transition-colors duration-150"
                  >
                    {item.icon}
                  </a>
                ))}
              </div>

              {/* Location indicator */}
              <div className="flex items-center justify-between px-3 py-1 rounded-xl bg-ink/5 text-ink text-[13px] font-body">
                <span className="text-mist font-medium">Location</span>
                <span className="font-semibold text-ink">Surat, Gujarat, India</span>
              </div>
            </div>
          </div>

          {/* ================= ROW 1, CARD 2: FEATURED PROJECTS ================= */}
          <Link
            href="/projects"
            className="group rounded-2xl sm:rounded-3xl p-3.5 sm:p-4 flex flex-col justify-between border hover:opacity-95 transition-[transform,background-color,border-color,opacity] duration-300 ease-out hover:scale-[1.01] hover:-translate-y-0.5 backdrop-blur-[2px] focus-visible:ring-2 animate-enter h-full" /* taste-skill-ignore */
            style={{
              animationDelay: '100ms',
              backgroundColor: atmosphere?.cardBg,
              borderColor: atmosphere?.cardBorder,
            }}
          >
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <span
                    className="w-6 h-6 rounded-lg text-paper flex items-center justify-center font-bold text-[13px] font-serif transition-colors duration-500"
                    style={{ backgroundColor: atmosphere?.accentColor }}
                  >
                    創
                  </span>
                  <span className="font-display font-bold text-base sm:text-lg text-ink transition-colors duration-150">
                    Projects
                  </span>
                </div>
                <span
                  className="font-semibold text-sm transition-transform duration-150 group-hover:translate-x-0.5"
                  style={{ color: atmosphere?.accentColor }}
                >
                  Explore ↗
                </span>
              </div>

              <p className="font-body text-mist text-[13px] font-semibold mb-1.5">
                Production Platforms &amp; Distributed Systems
              </p>

              {/* Sleek UI Mockup Preview Box */}
              <div data-ui="project-mockup" className="p-2.5 rounded-xl bg-ink/5 space-y-1 mb-2">
                <div className="flex items-center justify-between text-[13px] font-body font-semibold">
                  <span className="text-ink">Veltrix • Wealth Platform</span>
                  <span
                    className="px-1.5 py-0.5 rounded-md font-medium text-[13px] transition-colors duration-500"
                    style={{
                      backgroundColor: atmosphere?.badgeBg,
                      color: atmosphere?.accentColor,
                    }}
                  >
                    Production
                  </span>
                </div>
                <p className="font-body text-[13px] text-ink/80 leading-snug">
                  Sovereign financial operating ledger with real-time cash analytics and sub-50ms query latency.
                </p>
                <p className="text-[13px] font-body text-mist pt-0.5">
                  Next.js • Node.js • Express • MongoDB
                </p>
              </div>

              <div className="flex flex-wrap gap-1">
                <span className="px-2 py-0.5 rounded-md bg-ink/5 text-ink text-[13px] font-semibold">
                  Pixel-Collab
                </span>
                <span className="px-2 py-0.5 rounded-md bg-ink/5 text-ink text-[13px] font-semibold">
                  StudyFlow AI
                </span>
                <span className="px-2 py-0.5 rounded-md bg-ink/5 text-ink text-[13px] font-semibold">
                  +4 more
                </span>
              </div>
            </div>

            <div
              className="pt-1.5 text-[13px] font-body font-semibold group-hover:underline transition-colors duration-500"
              style={{ color: atmosphere?.accentColor }}
            >
              Explore production architectures &rarr;
            </div>
          </Link>

          {/* ================= ROW 1, CARD 3: EXPERIENCE & PODIUMS ================= */}
          <Link
            href="/certificates"
            className="group rounded-2xl sm:rounded-3xl p-3.5 sm:p-4 flex flex-col justify-between border hover:opacity-95 transition-[transform,background-color,border-color,opacity] duration-300 ease-out hover:scale-[1.01] hover:-translate-y-0.5 backdrop-blur-[2px] focus-visible:ring-2 animate-enter h-full" /* taste-skill-ignore */
            style={{
              animationDelay: '160ms',
              backgroundColor: atmosphere?.cardBg,
              borderColor: atmosphere?.cardBorder,
            }}
          >
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <span
                    className="w-6 h-6 rounded-lg text-paper flex items-center justify-center font-bold text-[13px] font-serif transition-colors duration-500"
                    style={{ backgroundColor: atmosphere?.accentColor }}
                  >
                    証
                  </span>
                  <span className="font-display font-bold text-base sm:text-lg text-ink transition-colors duration-150">
                    Experience &amp; Podiums
                  </span>
                </div>
                <span
                  className="font-semibold text-sm transition-transform duration-150 group-hover:translate-x-0.5"
                  style={{ color: atmosphere?.accentColor }}
                >
                  Verify ↗
                </span>
              </div>

              <p className="font-body text-mist text-[13px] font-semibold mb-1.5">
                Hackathon Finals &amp; Open Source Honors
              </p>

              {/* Sub-item: Dev Heat @ IIIT Surat */}
              <div data-ui="experience-iiit" className="p-2.5 rounded-xl bg-ink/5 mb-1.5">
                <div className="flex items-center justify-between text-[13px] font-body font-semibold">
                  <span className="text-ink">Dev Heat &bull; IIIT Surat</span>
                  <span className="font-medium transition-colors duration-500" style={{ color: atmosphere?.accentColor }}>
                    Finalist
                  </span>
                </div>
                <p className="font-body text-[13px] text-ink/80 leading-snug mt-0.5">
                  Led 3-member team to offline presentation finals at IIIT Surat.
                </p>
              </div>

              {/* Sub-item: ECSOC */}
              <div data-ui="experience-ecsoc" className="p-2.5 rounded-xl bg-ink/5">
                <div className="flex items-center justify-between text-[13px] font-body font-semibold">
                  <span className="text-ink">Elite Summer of Code</span>
                  <span className="font-medium transition-colors duration-500" style={{ color: atmosphere?.accentColor }}>
                    Top 20 Nat’l
                  </span>
                </div>
                <p className="font-body text-[13px] text-ink/80 leading-snug mt-0.5">
                  Recognized among Top 20 participants out of 12,000+ national applicants.
                </p>
              </div>
            </div>

            <div
              className="pt-1.5 text-[13px] font-body font-semibold group-hover:underline transition-colors duration-500"
              style={{ color: atmosphere?.accentColor }}
            >
              View competitive achievements &rarr;
            </div>
          </Link>

          {/* ================= ROW 2, CARD 1: ABOUT ME (CodingGita • Surat) ================= */}
          <Link
            href="/about"
            className="group rounded-2xl sm:rounded-3xl p-3.5 sm:p-4 flex flex-col justify-between border hover:opacity-95 transition-[transform,background-color,border-color,opacity] duration-300 ease-out hover:scale-[1.01] hover:-translate-y-0.5 backdrop-blur-[2px] focus-visible:ring-2 animate-enter h-full" /* taste-skill-ignore */
            style={{
              animationDelay: '220ms',
              backgroundColor: atmosphere?.cardBg,
              borderColor: atmosphere?.cardBorder,
            }}
          >
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <span
                    className="w-6 h-6 rounded-lg text-paper flex items-center justify-center font-bold text-[13px] font-serif transition-colors duration-500"
                    style={{ backgroundColor: atmosphere?.accentColor }}
                  >
                    志
                  </span>
                  <span className="font-display font-bold text-base sm:text-lg text-ink transition-colors duration-150">
                    About Me
                  </span>
                </div>
                <span
                  className="font-semibold text-sm transition-transform duration-150 group-hover:translate-x-0.5"
                  style={{ color: atmosphere?.accentColor }}
                >
                  ↗
                </span>
              </div>

              <p className="font-body text-mist text-[13px] font-semibold mb-1">
                CodingGita &bull; Surat, Gujarat
              </p>

              <p className="font-body text-ink/85 text-[15px] sm:text-base leading-relaxed mb-2">
                Full-Stack Developer studying Computer Science at CodingGita in Surat, Gujarat. Building high-concurrency systems, scalable cloud runtimes, and dependable software.
              </p>

              <p className="text-[13px] font-body text-ink/75">
                Specialized in distributed architectures, ACID data integrity, and deterministic state transitions.
              </p>
            </div>

            <div className="pt-1.5 flex items-center justify-between text-[13px] font-body">
              <span
                className="font-semibold group-hover:underline transition-colors duration-500"
                style={{ color: atmosphere?.accentColor }}
              >
                Read background dossier &rarr;
              </span>
              <span className="text-mist font-medium">Surat, Gujarat</span>
            </div>
          </Link>

          {/* ================= ROW 2, CARD 2: SKILLS MATRIX ================= */}
          <Link
            href="/skills"
            className="group rounded-2xl sm:rounded-3xl p-3.5 sm:p-4 flex flex-col justify-between border hover:opacity-95 transition-[transform,background-color,border-color,opacity] duration-300 ease-out hover:scale-[1.01] hover:-translate-y-0.5 backdrop-blur-[2px] focus-visible:ring-2 animate-enter h-full" /* taste-skill-ignore */
            style={{
              animationDelay: '280ms',
              backgroundColor: atmosphere?.cardBg,
              borderColor: atmosphere?.cardBorder,
            }}
          >
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <span
                    className="w-6 h-6 rounded-lg text-paper flex items-center justify-center font-bold text-[13px] font-serif transition-colors duration-500"
                    style={{ backgroundColor: atmosphere?.accentColor }}
                  >
                    技
                  </span>
                  <span className="font-display font-bold text-base sm:text-lg text-ink transition-colors duration-150">
                    Skills Matrix
                  </span>
                </div>
                <span
                  className="font-semibold text-sm transition-transform duration-150 group-hover:translate-x-0.5"
                  style={{ color: atmosphere?.accentColor }}
                >
                  Inspect ↗
                </span>
              </div>

              <p className="font-body text-mist text-[13px] font-semibold mb-2">
                Frontend, Backend runtimes &amp; ACID Data
              </p>

              {/* Interactive Skill Chips */}
              <div className="flex flex-wrap gap-1 mb-1.5">
                {SKILL_BADGES.map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-0.5 rounded-md bg-ink/5 hover:bg-ink/10 text-ink text-[13px] font-semibold transition-colors duration-150"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div
              className="pt-1.5 text-[13px] font-body font-semibold group-hover:underline transition-colors duration-500"
              style={{ color: atmosphere?.accentColor }}
            >
              Enter 16-bit interactive skill realm &rarr;
            </div>
          </Link>

          {/* ================= ROW 2, CARD 3: CERTIFICATES & HONORS ================= */}
          <Link
            href="/certificates"
            className="group rounded-2xl sm:rounded-3xl p-3.5 sm:p-4 flex flex-col justify-between border backdrop-blur-[2px] transition-[transform,background-color,border-color,opacity] duration-300 ease-out hover:scale-[1.01] hover:-translate-y-0.5 focus-visible:ring-2 animate-enter h-full" /* taste-skill-ignore */
            style={{
              animationDelay: '340ms',
              backgroundColor: atmosphere?.cardBg,
              borderColor: atmosphere?.cardBorder,
            }}
          >
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <span
                    className="w-6 h-6 rounded-lg text-paper flex items-center justify-center font-bold text-[13px] font-serif transition-colors duration-500"
                    style={{ backgroundColor: atmosphere?.accentColor }}
                  >
                    誉
                  </span>
                  <span className="font-display font-bold text-base sm:text-lg text-ink transition-colors duration-150">
                    Certificates
                  </span>
                </div>
                <span
                  className="font-semibold text-sm transition-transform duration-150 group-hover:translate-x-0.5"
                  style={{ color: atmosphere?.accentColor }}
                >
                  Verify ↗
                </span>
              </div>

              <p className="font-body text-mist text-[13px] font-semibold mb-2">
                Verified Industry &amp; Algorithmic Honors
              </p>

              {/* Stacked Certificate Proof Items */}
              <div className="space-y-1.5 mb-1.5">
                <div data-ui="cert-item" className="p-2 rounded-xl bg-ink/5 flex items-center justify-between">
                  <div>
                    <p className="font-body font-semibold text-[13px] text-ink">HackerRank Verified</p>
                    <p className="font-body text-[13px] text-mist">JavaScript (Basic) • 100% Score</p>
                  </div>
                  <span className="font-bold text-[13px] transition-colors duration-500" style={{ color: atmosphere?.accentColor }}>
                    100%
                  </span>
                </div>

                <div data-ui="cert-item" className="p-2 rounded-xl bg-ink/5 flex items-center justify-between">
                  <div>
                    <p className="font-body font-semibold text-[13px] text-ink">Sololearn Certified</p>
                    <p className="font-body text-[13px] text-mist">C &amp; C++ Data Structures</p>
                  </div>
                  <span className="font-bold text-[13px] transition-colors duration-500" style={{ color: atmosphere?.accentColor }}>
                    Verified
                  </span>
                </div>

                <div data-ui="cert-item" className="p-2 rounded-xl bg-ink/5 flex items-center justify-between">
                  <div>
                    <p className="font-body font-semibold text-[13px] text-ink">IIIT Surat Dev Heat</p>
                    <p className="font-body text-[13px] text-mist">Offline Presentation Finalist</p>
                  </div>
                  <span className="font-bold text-[13px] transition-colors duration-500" style={{ color: atmosphere?.accentColor }}>
                    Finals
                  </span>
                </div>
              </div>
            </div>

            <div
              className="pt-1.5 text-[13px] font-body font-semibold group-hover:underline transition-colors duration-500"
              style={{ color: atmosphere?.accentColor }}
            >
              View verified credentials &rarr;
            </div>
          </Link>

        </div>
      </div>

      {/* 3. Bottom Telemetry Bar: Crystal-Clear Floating Dock for Links + Copyright + Season Tag */}
      <div
        className="relative z-20 mt-0.5 flex flex-col sm:flex-row items-center justify-between gap-2.5 px-4 py-1.5 rounded-2xl bg-ink/95 text-paper text-[13px] font-body border border-paper/15 animate-enter"
        style={{ animationDelay: '400ms' }}
      >
        <div className="flex flex-wrap items-center gap-4 sm:gap-6">
          <p className="text-paper/90 font-medium">© {currentYear} Rishab Chandgothia</p>
          <ul className="flex items-center gap-4 list-none">
            {SOCIAL_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-paper/85 hover:text-white hover:underline underline-offset-4 font-semibold transition-colors duration-150"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="scale-90 origin-right">
          <SeasonTag theme="paper" />
        </div>
      </div>
    </div>
  );
}

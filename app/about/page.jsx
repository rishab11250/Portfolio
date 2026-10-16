import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SealMark from '@/components/primitives/SealMark';

export const metadata = {
  title: 'About & Philosophy | Rishab Chandgothia',
  description:
    'Academic foundations at Arya College, engineering philosophy, problem-solving mindset, and full-stack development journey of Rishab Chandgothia.',
  alternates: { canonical: '/about' },
  openGraph: {
    url: '/about',
    title: 'About & Philosophy | Rishab Chandgothia',
    description:
      'Academic foundations at Arya College, engineering philosophy, problem-solving mindset, and full-stack development journey of Rishab Chandgothia.',
  },
};

export default function AboutPage() {
  return (
    <main id="main-content" className="flex-1 max-w-5xl mx-auto px-4 sm:px-8 py-10 sm:py-16">
      {/* 1. Quiet Foundations Banner */}
      <section className="relative p-6 sm:p-10 mb-12 rounded-3xl bg-paper text-ink border border-ink/20 overflow-hidden">
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pine/10 text-pine text-xs font-semibold border border-pine/20">
              <span className="w-2 h-2 rounded-full bg-pine" />
              <span>Foundation &amp; Academic Roots</span>
            </div>

            <h1 className="font-display font-bold text-3xl sm:text-5xl text-ink tracking-tight leading-[1.1]">
              Quiet Foundations &amp; Living Systems
            </h1>

            <p className="font-body text-mist text-sm sm:text-base leading-relaxed">
              Approach software engineering with discipline: building resilient database structures, deterministic state transitions, and clean render cycles that hold production systems together reliably.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-body font-semibold text-pine">
              <span>Parul University (AIML)</span>
              <span>&bull;</span>
              <span>9.14 &amp; 8.04 SGPA</span>
              <span>&bull;</span>
              <span>Full-Stack Resilience</span>
            </div>
          </div>

          {/* Clean Landscape Ink Preview */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm aspect-4/3 rounded-2xl bg-paper border border-ink/20 overflow-hidden">
              <Image
                src="/ink/ink-landscape.svg"
                alt="Landscape pines and ink ridges"
                fill
                sizes="(max-width: 768px) 100vw, 360px"
                className="object-cover object-bottom"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Main Grid: Framed Portrait & Story */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-14">
        {/* Left: Deckled Frame Portrait */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="relative group">
            <div className="relative w-64 sm:w-76 aspect-square rounded-3xl p-3 bg-paper border border-ink/20">
              <div className="relative w-full h-full rounded-2xl overflow-hidden bg-ink/5">
                <Image
                  src="https://res.cloudinary.com/dhr1jtyi2/image/upload/v1773478876/WhatsApp_Image_2026-03-07_at_9.25.25_AM_cswpuv.jpg"
                  alt="Portrait of Rishab Chandgothia"
                  fill
                  sizes="(max-width: 640px) 256px, 304px"
                  className="object-cover"
                  priority
                />
              </div>

              {/* Seal Mark */}
              <div className="absolute -bottom-3 -right-3 z-10">
                <SealMark size={48} interactive={false} />
              </div>
            </div>
          </div>
        </div>

        {/* Right: Background Prose & Foundation Badges */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-4 font-body text-ink text-base sm:text-lg leading-relaxed">
            <p className="first-letter:text-4xl first-letter:font-display first-letter:font-black first-letter:text-pine first-letter:mr-2">
              Software engineering requires reverence for the unseen: establishing typed API contracts, structuring clean schemas, and eliminating rendering waste before an interface ever reaches production.
            </p>
            <p>
              I am pursuing my B.Tech in Computer Engineering with an AI and Machine Learning specialization at Parul University, maintaining an academic record of 9.14 and 8.04 SGPA across foundational semesters.
            </p>
            <p>
              Outside lecture halls, I build under tight constraints: leading hackathon squads to offline finals at IIIT Surat and advancing through competitive rounds at LNMIIT Jaipur and Charusat.
            </p>
          </div>

          {/* Academic Foundation Badges (Min 12px font) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4">
            <div className="p-4 rounded-2xl bg-paper border border-ink/20">
              <span className="block text-xs font-semibold text-pine mb-1">
                Degree Spec
              </span>
              <span className="font-body text-sm font-bold text-ink">
                B.Tech CSE (AIML)
              </span>
              <span className="block text-xs text-mist mt-0.5">
                Parul University
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-paper border border-ink/20">
              <span className="block text-xs font-semibold text-pine mb-1">
                Academics
              </span>
              <span className="font-body text-sm font-bold text-ink">
                9.14 &amp; 8.04 SGPA
              </span>
              <span className="block text-xs text-mist mt-0.5">
                Top Decile Record
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-paper border border-ink/20 col-span-2 sm:col-span-1">
              <span className="block text-xs font-semibold text-pine mb-1">
                Engineering Focus
              </span>
              <span className="font-body text-sm font-bold text-ink">
                React 19 &amp; Node.js
              </span>
              <span className="block text-xs text-mist mt-0.5">
                Full-Stack Architecture
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Three Engineering Pillars */}
      <section className="space-y-6 mb-14">
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-ink tracking-tight">
          Engineering Principles
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-paper border border-ink/20 space-y-3">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pine" aria-hidden="true">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <path d="M3 9h18M9 21V9" />
            </svg>
            <h3 className="font-display font-bold text-base sm:text-lg text-ink">
              Patience in Architecture
            </h3>
            <p className="font-body text-xs sm:text-sm text-mist leading-relaxed">
              Prioritizing typed contracts, deterministic error handling, and zero-flicker UI rendering over hurried shortcuts.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-paper border border-ink/20 space-y-3">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pine" aria-hidden="true">
              <circle cx="12" cy="12" r="10" />
              <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
            </svg>
            <h3 className="font-display font-bold text-base sm:text-lg text-ink">
              Competitive Exploration
            </h3>
            <p className="font-body text-xs sm:text-sm text-mist leading-relaxed">
              Tested under rapid 24-to-36 hour hackathon pressure—architecting real-time whiteboards and predictive health systems.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-paper border border-ink/20 space-y-3">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pine" aria-hidden="true">
              <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
            </svg>
            <h3 className="font-display font-bold text-base sm:text-lg text-ink">
              Continuous Craft
            </h3>
            <p className="font-body text-xs sm:text-sm text-mist leading-relaxed">
              Consistently sharpening core foundations across modern JavaScript engines, reactive loops, and distributed backend endpoints.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Navigation CTA to Certificates */}
      <div className="p-6 sm:p-8 rounded-3xl bg-paper border border-ink/20 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-seal">
            Next Section
          </span>
          <h3 className="font-display font-bold text-xl text-ink">
            Inspect Verified Credentials &amp; Certifications
          </h3>
        </div>
        <Link
          href="/certificates"
          className="h-11 px-6 rounded-2xl bg-ink text-paper font-body text-sm font-semibold hover:bg-seal transition-colors flex items-center gap-2 cursor-pointer"
        >
          Open Certificates &rarr;
        </Link>
      </div>
    </main>
  );
}

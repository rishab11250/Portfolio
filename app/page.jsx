import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Hero from '@/components/Hero';
import BrushDivider from '@/components/primitives/BrushDivider';

export default function Home() {
  return (
    <div className="flex-1 flex flex-col">
      {/* Traditional Ink & Atmosphere Hero */}
      <Hero />

      {/* Main Content Area */}
      <main id="main-content" className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 py-12 sm:py-20 w-full space-y-16">
        <BrushDivider variant={1} />

        {/* Ink Landscape Scenery Banner */}
        <section
          aria-label="Ink Landscape Scenery"
          className="relative p-6 sm:p-10 rounded-3xl bg-ink/5 overflow-hidden animate-enter"
        >
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-4">
              <h2 className="font-display font-black text-3xl sm:text-5xl text-ink tracking-tight leading-[1.1] animate-enter" style={{ animationDelay: '100ms' }}>
                Disciplined Craft &amp; Proven Foundations
              </h2>

              <p className="font-body text-ink/85 text-base sm:text-lg leading-relaxed animate-enter" style={{ animationDelay: '150ms' }}>
                A clean, performance-first portfolio built on Next.js App Router, verified academic metrics, truthful project architectures, and seasonal atmosphere.
              </p>
            </div>

            {/* Ink Landscape Artwork using generated SVGs */}
            <div className="lg:col-span-6 flex justify-center animate-enter" style={{ animationDelay: '200ms' }}>
              <div className="relative w-full max-w-md aspect-16/10 rounded-2xl bg-paper overflow-hidden">
                <Image
                  src="/ink/ink-landscape.svg"
                  alt="Atmospheric ink mountain landscape with pine silhouettes"
                  fill
                  sizes="(max-width: 768px) 100vw, 450px"
                  className="object-cover object-bottom"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* Portfolio Sections Navigation */}
        <section aria-label="Portfolio Sections" className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="font-display font-black text-3xl sm:text-5xl text-ink tracking-tight animate-enter" style={{ animationDelay: '100ms' }}>
              Portfolio
            </h2>
            <p className="font-body text-ink/80 text-base sm:text-lg animate-enter" style={{ animationDelay: '150ms' }}>
              Select any section below to review production projects, technical skills, academic roots, verified certificates, and direct contact.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-4">
            {/* CARD 1: PROJECTS */}
            <Link
              href="/projects"
              className="group relative bg-ink/5 text-ink rounded-3xl hover:bg-ink/10 transition-colors overflow-hidden flex flex-col justify-between focus-visible:ring-2 focus-visible:ring-seal animate-enter"
              style={{ animationDelay: '100ms' }}
            >
              <div className="p-7">
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-lg bg-seal text-paper font-semibold text-sm">
                    Production Systems
                  </span>
                  <span className="font-body text-sm text-ink/70 group-hover:text-ink font-semibold">
                    Featured Work
                  </span>
                </div>

                <div className="relative w-full h-40 rounded-xl bg-ink/10 mb-4 overflow-hidden">
                  <Image
                    src="https://res.cloudinary.com/dhr1jtyi2/image/upload/v1779563152/1777913719527_oq6rka.jpg"
                    alt="Veltrix project interface preview"
                    fill
                    sizes="(max-width: 768px) 100vw, 360px"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <h3 className="font-display font-black text-2xl text-ink tracking-tight mb-2 group-hover:text-seal transition-colors">
                  Projects
                </h3>

                <p className="font-body text-base text-ink/85 leading-relaxed font-normal">
                  Production web applications, real-time collaboration engines, and verified competitive hackathon podiums.
                </p>
              </div>

              <div className="p-5 bg-ink/10 flex items-center justify-between font-body text-sm font-semibold text-ink animate-enter" style={{ animationDelay: '150ms' }}>
                <span>View Projects</span>
                <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
              </div>
            </Link>

            {/* CARD 2: SKILLS */}
            <Link
              href="/skills"
              className="group relative bg-ink/5 text-ink rounded-3xl hover:bg-ink/10 transition-colors overflow-hidden flex flex-col justify-between focus-visible:ring-2 focus-visible:ring-seal animate-enter"
              style={{ animationDelay: '150ms' }}
            >
              <div className="p-7">
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-lg bg-indigo text-paper font-semibold text-sm">
                    Engineering Stack
                  </span>
                  <span className="font-body text-sm text-ink/70 group-hover:text-ink font-semibold">
                    Technical Foundation
                  </span>
                </div>

                <div className="relative w-full h-40 rounded-xl bg-ink/10 mb-4 overflow-hidden">
                  <Image
                    src="https://res.cloudinary.com/dhr1jtyi2/image/upload/v1779563418/1778356615747_epy9dg.jpg"
                    alt="Pixel-Collab interactive canvas preview"
                    fill
                    sizes="(max-width: 768px) 100vw, 360px"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <h3 className="font-display font-black text-2xl text-ink tracking-tight mb-2 group-hover:text-indigo transition-colors">
                  Skills
                </h3>

                <p className="font-body text-base text-ink/85 leading-relaxed font-normal">
                  Structured stack across frontend (React, Next.js, React Native), backend (Node.js, Express), databases, deployment, and tools.
                </p>
              </div>

              <div className="p-5 bg-ink/10 flex items-center justify-between font-body text-sm font-semibold text-ink animate-enter" style={{ animationDelay: '200ms' }}>
                <span>View Skills</span>
                <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
              </div>
            </Link>

            {/* CARD 3: ABOUT */}
            <Link
              href="/about"
              className="group relative bg-ink/5 text-ink rounded-3xl hover:bg-ink/10 transition-colors overflow-hidden flex flex-col justify-between focus-visible:ring-2 focus-visible:ring-seal animate-enter"
              style={{ animationDelay: '200ms' }}
            >
              <div className="p-7">
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-lg bg-pine text-paper font-semibold text-sm">
                    Bio &amp; Philosophy
                  </span>
                  <span className="font-body text-sm text-ink/70 group-hover:text-ink font-semibold">
                    Background &amp; Roots
                  </span>
                </div>

                <div className="relative w-full h-40 rounded-xl bg-ink/10 mb-4 overflow-hidden">
                  <Image
                    src="https://res.cloudinary.com/dhr1jtyi2/image/upload/v1773478876/WhatsApp_Image_2026-03-07_at_9.25.25_AM_cswpuv.jpg"
                    alt="Rishab Chandgothia"
                    fill
                    sizes="(max-width: 768px) 100vw, 360px"
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <h3 className="font-display font-black text-2xl text-ink tracking-tight mb-2 group-hover:text-pine transition-colors">
                  About
                </h3>

                <p className="font-body text-base text-ink/85 leading-relaxed font-normal">
                  Full-Stack Engineer building resilient web systems, scalable backend architectures, and deliberate user experiences.
                </p>
              </div>

              <div className="p-5 bg-ink/10 flex items-center justify-between font-body text-sm font-semibold text-ink animate-enter" style={{ animationDelay: '250ms' }}>
                <span>Read About</span>
                <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
              </div>
            </Link>

            {/* CARD 4: CERTIFICATES */}
            <Link
              href="/certificates"
              className="group relative bg-ink/5 text-ink rounded-3xl hover:bg-ink/10 transition-colors overflow-hidden flex flex-col justify-between focus-visible:ring-2 focus-visible:ring-seal animate-enter"
              style={{ animationDelay: '250ms' }}
            >
              <div className="p-7">
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-lg bg-seal text-paper font-semibold text-sm">
                    Verified Credentials
                  </span>
                  <span className="font-body text-sm text-ink/70 group-hover:text-ink font-semibold">
                    Verified Proof
                  </span>
                </div>

                <div className="relative w-full h-40 rounded-xl bg-ink/10 mb-4 overflow-hidden">
                  <Image
                    src="https://res.cloudinary.com/dhr1jtyi2/image/upload/v1774602122/download_gc3rvx.png"
                    alt="HackerRank JavaScript verified certificate"
                    fill
                    sizes="(max-width: 768px) 100vw, 360px"
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <h3 className="font-display font-black text-2xl text-ink tracking-tight mb-2 group-hover:text-seal transition-colors">
                  Certificates
                </h3>

                <p className="font-body text-base text-ink/85 leading-relaxed font-normal">
                  Verified credentials across HackerRank, competitive hackathons, open-source programs, and foundational coursework.
                </p>
              </div>

              <div className="p-5 bg-ink/10 flex items-center justify-between font-body text-sm font-semibold text-ink animate-enter" style={{ animationDelay: '300ms' }}>
                <span>View Certificates</span>
                <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
              </div>
            </Link>

            {/* CARD 5: CONTACT (Spans 2 columns) */}
            <Link
              href="/contact"
              className="group relative bg-ink/5 text-ink rounded-3xl hover:bg-ink/10 transition-colors overflow-hidden flex flex-col justify-between focus-visible:ring-2 focus-visible:ring-seal md:col-span-2 lg:col-span-2 animate-enter"
              style={{ animationDelay: '300ms' }}
            >
              <div className="p-7 sm:p-9 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="max-w-md space-y-3">
                  <h3 className="font-display font-bold text-3xl text-ink tracking-tight group-hover:text-seal transition-colors">
                    Contact
                  </h3>

                  <p className="font-body text-ink/85 text-base sm:text-lg leading-relaxed">
                    Compose a message or connect directly via email and phone. Clean letter stationery layout with verified EmailJS delivery.
                  </p>
                </div>

                <div className="relative w-full lg:w-72 h-36 rounded-xl bg-ink/10 overflow-hidden shrink-0">
                  <Image
                    src="https://res.cloudinary.com/dhr1jtyi2/image/upload/v1792122666/ecsoc-excellence-certificate-rishab_chandgothi_pc6fhu.png"
                    alt="ECSOC Open Source excellence certificate preview"
                    fill
                    sizes="288px"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>

              <div className="p-5 bg-ink/10 flex items-center justify-between font-body text-sm font-semibold text-ink animate-enter" style={{ animationDelay: '350ms' }}>
                <span>Send Message</span>
                <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
              </div>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

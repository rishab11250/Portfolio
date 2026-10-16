import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { projects } from '@/data/projects';
import { hackathons } from '@/data/hackathons';
import DuotoneImage from '@/components/primitives/DuotoneImage';
import ProjectDialog from '@/components/ProjectDialog';

export const metadata = {
  title: 'Projects & Systems | Rishab Chandgothia',
  description:
    'Explore production web applications, real-time collaboration engines, and verified competitive hackathon podiums built by Rishab Chandgothia.',
  alternates: { canonical: '/projects' },
  openGraph: {
    url: '/projects',
    title: 'Projects & Systems | Rishab Chandgothia',
    description:
      'Explore production web applications, real-time collaboration engines, and verified competitive hackathon podiums built by Rishab Chandgothia.',
  },
};

export default function ProjectsPage() {
  return (
    <main id="main-content" className="flex-1 max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 py-10 sm:py-16">
      {/* 1. Header Banner */}
      <section className="relative p-6 sm:p-10 mb-12 rounded-3xl bg-paper text-ink border border-ink/20 overflow-hidden">
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-seal/10 text-seal text-xs font-semibold border border-seal/20">
              <span className="w-2 h-2 rounded-full bg-seal" />
              <span>Production Systems • {projects.length} Architectures</span>
            </div>

            <h1 className="font-display font-black text-3xl sm:text-5xl text-ink tracking-tight leading-[1.1]">
              Projects &amp; Systems
            </h1>

            <p className="font-body text-mist text-sm sm:text-base leading-relaxed">
              Production web applications, real-time collaboration engines, predictive machine learning models, and competitive hackathon systems built with performance and resilience.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-body font-medium text-mist">
              <span className="font-semibold text-ink">React 19 Core</span>
              <span>&bull;</span>
              <span className="text-seal font-semibold">Next.js Engine</span>
              <span>&bull;</span>
              <span className="text-indigo font-semibold">Full-Stack APIs</span>
            </div>
          </div>

          {/* Clean Landscape Ink Preview */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm aspect-16/10 rounded-2xl bg-paper border border-ink/20 overflow-hidden">
              <Image
                src="/ink/ridge-mid.svg"
                alt="Architectural landscape preview"
                fill
                sizes="(max-width: 768px) 100vw, 360px"
                className="object-cover object-bottom"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Projects Grid */}
      <section className="space-y-6 mb-16 content-visibility-auto" aria-label="Projects Grid">
        <div className="pb-3">
          <h2 className="font-display font-bold text-2xl text-ink">
            Featured Systems ({projects.length})
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <article
              key={project.slug}
              className="group flex flex-col bg-paper rounded-2xl border border-ink/20 hover:border-seal transition-colors overflow-hidden focus-within:ring-2 focus-within:ring-seal"
            >
              {/* Card Header Strip */}
              <div className="px-4 py-2 bg-ink/5 text-ink flex items-center justify-between font-body text-xs font-semibold">
                <span className="text-seal font-bold">System {idx + 1}</span>
                <span className="text-mist font-medium">
                  {project.category}
                </span>
              </div>

              {/* Project Image Frame */}
              <div className="relative aspect-16/10 w-full overflow-hidden bg-ink/10 group-hover:scale-[1.01] transition-transform duration-200">
                <DuotoneImage
                  src={project.image}
                  alt={`${project.title} screenshot`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-display font-black text-2xl text-ink tracking-tight mb-2 group-hover:text-seal transition-colors">
                    {project.title}
                  </h3>
                  <p className="font-body text-mist text-xs sm:text-sm leading-relaxed line-clamp-3 mb-4 font-normal">
                    {project.summary}
                  </p>
                </div>

                <div>
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.skills.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 text-xs font-medium rounded bg-ink/5 text-ink border border-ink/20 font-body"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.skills.length > 4 && (
                      <span className="px-2 py-0.5 text-xs font-medium text-mist font-body">
                        +{project.skills.length - 4}
                      </span>
                    )}
                  </div>

                  <a
                    href={`#${project.slug}`}
                    className="w-full h-11 rounded-xl bg-ink text-paper hover:bg-seal font-body text-sm font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer focus-visible:ring-2 focus-visible:ring-seal"
                  >
                    <span>Inspect Architecture</span>
                    <span aria-hidden="true">&rarr;</span>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 3. Verified Hackathon Podiums */}
      <section className="space-y-6 mb-16 content-visibility-auto" aria-label="Competitive Hackathon Podiums">
        <div className="flex items-center justify-between pb-3">
          <div>
            <h2 className="font-display font-bold text-2xl text-ink">
              Verified Hackathon Achievements
            </h2>
          </div>
          <span className="font-body text-xs font-semibold text-mist hidden sm:inline">
            {hackathons.length} Podiums
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {hackathons.map((hack, idx) => (
            <article
              key={hack.name}
              className="group flex flex-col bg-paper rounded-2xl border border-ink/20 hover:border-seal transition-colors overflow-hidden"
            >
              <div className="px-4 py-2 bg-ink/5 text-ink flex items-center justify-between font-body text-xs font-semibold">
                <span className="text-seal font-bold">Stage {idx + 1}</span>
                <span className="text-mist font-medium">{hack.organizer}</span>
                <span className="px-2 py-0.5 rounded bg-seal text-paper text-xs">
                  {hack.badge}
                </span>
              </div>

              <div className="relative aspect-16/10 w-full overflow-hidden bg-ink/10">
                <Image
                  src={hack.images[0] || hack.images[1]}
                  alt={`${hack.name} event photograph`}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-display font-bold text-xl text-ink tracking-tight mb-2 group-hover:text-seal transition-colors">
                    {hack.name}
                  </h3>
                  <p className="font-body text-xs font-semibold text-seal mb-3">
                    {hack.achievement}
                  </p>
                  <p className="font-body text-xs sm:text-sm text-mist leading-relaxed mb-4">
                    {hack.description}
                  </p>
                </div>

                <div>
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {hack.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 text-xs font-medium rounded bg-ink/5 text-ink border border-ink/20 font-body"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-3 pt-3">
                    {hack.demoLink && (
                      <a
                        href={hack.demoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 h-10 rounded-xl bg-seal text-paper font-body text-sm font-semibold hover:bg-seal/90 flex items-center justify-center gap-1 transition-colors"
                      >
                        Live Demo ↗
                      </a>
                    )}
                    {hack.codeLink && (
                      <a
                        href={hack.codeLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 h-10 rounded-xl bg-paper border border-ink/20 text-ink font-body text-sm font-semibold hover:bg-ink/5 flex items-center justify-center gap-1 transition-colors"
                      >
                        Source ↗
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 4. Navigation CTA to Skills Page */}
      <div className="p-8 rounded-3xl bg-paper border border-ink/20 flex flex-col sm:flex-row items-center justify-between gap-4 font-body">
        <div>
          <span className="text-xs font-semibold text-seal font-body">Next Section</span>
          <h3 className="font-display font-bold text-xl text-ink">Explore Technical Skills &amp; Stack</h3>
        </div>
        <Link
          href="/skills"
          className="h-11 px-6 rounded-xl bg-ink text-paper text-sm font-semibold hover:bg-indigo transition-colors flex items-center gap-2 cursor-pointer"
        >
          Open Skills Matrix &rarr;
        </Link>
      </div>

      {/* Interactive Project Modal Island */}
      <ProjectDialog projects={projects} />
    </main>
  );
}

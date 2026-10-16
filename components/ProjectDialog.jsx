"use client";
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

export default function ProjectDialog({ projects }) {
  const [selectedProject, setSelectedProject] = useState(null);
  const dialogRef = useRef(null);

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (!hash) {
        if (dialogRef.current?.open) {
          dialogRef.current.close();
          setSelectedProject(null);
        }
        return;
      }
      const match = projects.find((p) => p.slug === hash);
      if (match) {
        setSelectedProject(match);
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    window.addEventListener('popstate', handleHash);
    return () => {
      window.removeEventListener('hashchange', handleHash);
      window.removeEventListener('popstate', handleHash);
    };
  }, [projects]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (selectedProject) {
      if (!dialog.open) {
        dialog.showModal();
        document.body.style.overflow = 'hidden';
      }
    } else {
      if (dialog.open) {
        dialog.close();
      }
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedProject]);

  const closeDialog = () => {
    if (window.location.hash) {
      window.history.pushState(null, '', window.location.pathname + window.location.search);
    }
    setSelectedProject(null);
  };

  return (
    <dialog
      ref={dialogRef}
      onCancel={closeDialog}
      className="backdrop:bg-ink/80 bg-paper text-ink p-0 w-[94%] max-w-3xl rounded-3xl border border-ink/20 m-auto focus:outline-none overflow-hidden"
    >
      {selectedProject && (
        <div className="flex flex-col max-h-[88vh] overflow-y-auto">
          <div className="sticky top-0 z-20 bg-ink text-paper flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 bg-seal text-paper font-semibold text-xs rounded">
                Architecture Blueprint
              </span>
              <span className="font-body text-xs font-medium text-paper/80">
                {selectedProject.category}
              </span>
            </div>
            <button
              type="button"
              onClick={closeDialog}
              aria-label="Close architecture breakdown"
              className="w-8 h-8 rounded-full flex items-center justify-center text-paper hover:bg-paper/20 text-sm font-bold border border-paper/40 cursor-pointer"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="relative aspect-16/9 w-full bg-ink/10">
            <Image
              src={selectedProject.image}
              alt={`${selectedProject.title} preview`}
              fill
              sizes="(max-width: 768px) 100vw, 800px"
              className="object-cover"
              priority
            />
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            <div>
              <span className="font-body text-xs font-semibold text-seal">
                System Breakdown
              </span>
              <h3 className="font-display font-black text-2xl sm:text-3xl text-ink tracking-tight mb-2">
                {selectedProject.title}
              </h3>
              <p className="font-body text-ink/80 text-sm sm:text-base leading-relaxed">
                {selectedProject.description}
              </p>
            </div>

            <div>
              <h4 className="font-body text-xs font-semibold text-ink mb-3">
                Stack &amp; Technologies
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedProject.stack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-xs font-body font-medium rounded-lg bg-ink text-paper"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-6">
              {selectedProject.demoLink && (
                <a
                  href={selectedProject.demoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 min-w-[150px] h-12 rounded-xl bg-seal text-paper font-body text-sm font-semibold hover:bg-seal/90 flex items-center justify-center gap-2 transition-colors"
                >
                  Launch System ↗
                </a>
              )}
              {selectedProject.codeLink && (
                <a
                  href={selectedProject.codeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 min-w-[150px] h-12 rounded-xl bg-paper border border-ink/20 text-ink font-body text-sm font-semibold hover:bg-ink/5 flex items-center justify-center gap-2 transition-colors"
                >
                  Inspect Source ↗
                </a>
              )}
              <button
                type="button"
                onClick={closeDialog}
                className="h-12 px-5 rounded-xl border border-ink/20 text-mist hover:text-ink font-body text-sm font-medium cursor-pointer transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </dialog>
  );
}

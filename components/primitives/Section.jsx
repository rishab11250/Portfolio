import React from 'react';

/**
 * Section - Standard semantic layout wrapper for portfolio sections.
 * Features fluid display headings, optional non-essential vertical decorative English labels,
 * and standard responsive padding.
 */
export default function Section({
  id,
  title,
  subtitle,
  verticalLabel,
  children,
  className = '',
  containerClassName = '',
}) {
  return (
    <section
      id={id}
      className={`relative py-20 sm:py-28 scroll-mt-20 ${className}`}
    >
      <div className={`relative max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 ${containerClassName}`}>
        {/* Optional decorative vertical label (md and up only, English words, aria-hidden) */}
        {verticalLabel && (
          <div
            aria-hidden="true"
            className="hidden md:flex absolute -left-8 lg:-left-12 top-28 select-none pointer-events-none items-center text-xs tracking-[0.2em] font-medium uppercase text-mist/40"
            style={{ writingMode: 'vertical-rl' }}
          >
            {verticalLabel}
          </div>
        )}

        {/* Section Header */}
        {(title || subtitle) && (
          <header className="mb-12 sm:mb-16">
            {title && (
              <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-ink tracking-tight mb-3">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="font-body text-mist text-base sm:text-lg max-w-2xl font-normal leading-relaxed">
                {subtitle}
              </p>
            )}
          </header>
        )}

        {/* Section Content */}
        {children}
      </div>
    </section>
  );
}

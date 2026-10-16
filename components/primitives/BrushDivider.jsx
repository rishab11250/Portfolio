import React from 'react';

/**
 * BrushDivider - Decorative ink line that spans the page.
 * Pure Server Component - 0kB client JS.
 */
export default function BrushDivider({
  className = '',
  color = 'var(--color-ink)',
  opacity = 0.2,
  variant = 1,
}) {
  const paths = {
    1: 'M 10 12 Q 250 8 500 13 T 990 12',
    2: 'M 10 13 Q 280 16 520 10 T 990 13',
    3: 'M 10 11 Q 220 14 480 9 T 990 12',
  };

  const d = paths[variant] || paths[1];

  return (
    <div
      aria-hidden="true"
      className={`w-full overflow-hidden flex items-center justify-center my-8 sm:my-12 pointer-events-none select-none ${className}`}
    >
      <svg
        viewBox="0 0 1000 24"
        width="100%"
        height="24"
        preserveAspectRatio="none"
        className="w-full max-w-5xl h-6"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d={d}
          fill="none"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeOpacity={opacity}
        />
      </svg>
    </div>
  );
}

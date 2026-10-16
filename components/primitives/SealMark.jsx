import React from 'react';

/**
 * SealMark - Traditional vermilion red ink stamp ("RC")
 * Used as a distinctive brand seal accent.
 * Pure Server Component - 0kB client JS.
 */
export default function SealMark({
  size = 48,
  className = '',
  interactive = true,
  ariaLabel = 'Rishab Chandgothia seal mark',
}) {
  return (
    <div
      role="img"
      aria-label={ariaLabel}
      className={`inline-flex items-center justify-center select-none ${
        interactive
          ? 'cursor-pointer transition-transform duration-150 ease-[var(--ease-twos)] hover:-rotate-2 hover:scale-105 active:scale-90 active:rotate-1 motion-reduce:transform-none motion-reduce:transition-none'
          : ''
      } ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 48 48"
        width={size}
        height={size}
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Organic seal boundary (rounded-square impression) */}
        <rect
          x="2"
          y="2"
          width="44"
          height="44"
          rx="10"
          fill="var(--color-seal)"
        />
        {/* Inner seal frame line */}
        <rect
          x="5"
          y="5"
          width="38"
          height="38"
          rx="7"
          fill="none"
          stroke="var(--color-paper)"
          strokeWidth="1.2"
          strokeOpacity="0.45"
        />
        {/* Initials: RC */}
        <text
          x="24"
          y="31"
          textAnchor="middle"
          fill="var(--color-paper)"
          fontFamily="var(--font-display), serif"
          fontSize="20"
          fontWeight="900"
          letterSpacing="0.05em"
        >
          RC
        </text>
      </svg>
    </div>
  );
}

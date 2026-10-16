import React from 'react';
import Image from 'next/image';

/**
 * DuotoneImage - Two stacked next/image layers using the same src.
 * Top layer is processed with the indigo duotone CSS class.
 * Cross-fades to full color on hover/focus via CSS transition.
 * Pure Server Component - 0kB client JS.
 */
export default function DuotoneImage({
  src,
  alt,
  width,
  height,
  fill = false,
  sizes = '(max-width: 768px) 100vw, 500px',
  priority = false,
  className = '',
  imageClassName = '',
}) {
  return (
    <div
      className={`group relative overflow-hidden select-none ${className}`}
    >
      {/* 1. Underlying full-color image */}
      <Image
        src={src}
        alt={alt}
        width={!fill ? width : undefined}
        height={!fill ? height : undefined}
        fill={fill}
        sizes={sizes}
        priority={priority}
        className={`w-full h-full object-cover ${imageClassName}`}
      />

      {/* 2. Top indigo duotone image (cross-fades to 0 opacity on hover/focus via pure CSS) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 w-full h-full pointer-events-none opacity-100 group-hover:opacity-0 group-focus-within:opacity-0 transition-opacity duration-300 ease-[var(--ease-twos)] motion-reduce:transition-none"
      >
        <Image
          src={src}
          alt=""
          width={!fill ? width : undefined}
          height={!fill ? height : undefined}
          fill={fill}
          sizes={sizes}
          priority={priority}
          className={`w-full h-full object-cover indigo-duotone ${imageClassName}`}
        />
      </div>
    </div>
  );
}

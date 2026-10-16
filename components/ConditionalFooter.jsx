'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Footer from './Footer';

/**
 * ConditionalFooter
 * Renders the global footer on all subpages, but keeps the Home page (/)
 * a pure single-screen panoramic vista without vertical scroll.
 */
export default function ConditionalFooter() {
  const pathname = usePathname();

  // On Home (/), footer controls are integrated into the panoramic vista dock
  if (pathname === '/') {
    return null;
  }

  return <Footer />;
}

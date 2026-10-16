"use client";
import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import SealMark from './primitives/SealMark';
import { useSeason } from '../lib/SeasonContext.jsx';

const NAV_LINKS = [
  { label: 'Home', href: '/', themeTag: 'Traditional Ink' },
  { label: 'Projects', href: '/projects', themeTag: 'Systems' },
  { label: 'Skills', href: '/skills', themeTag: 'Matrix' },
  { label: 'About', href: '/about', themeTag: 'Journal' },
  { label: 'Certificates', href: '/certificates', themeTag: 'Archive' },
  { label: 'Contact', href: '/contact', themeTag: 'Dispatch' },
];

export default function Navbar() {
  const dialogRef = useRef(null);
  const openButtonRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { activeSeason, atmosphere, selectQuarter, setIsExplorerOpen } = useSeason();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openMobileMenu = () => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  };

  const closeMobileMenu = () => {
    if (dialogRef.current) {
      dialogRef.current.close();
      if (openButtonRef.current) {
        openButtonRef.current.focus();
      }
    }
  };

  return (
    <>
      {/* Skip link for keyboard accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-seal focus:text-paper focus:rounded-md focus:font-semibold"
      >
        Skip to main content
      </a>

      {/* Desktop & Top Navigation Bar */}
      <nav
        aria-label="Main Navigation"
        className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-200 ease-[var(--ease-twos)] motion-reduce:transition-none ${
          scrolled
            ? 'bg-paper/90 backdrop-blur-md py-3'
            : 'bg-transparent py-4 sm:py-5'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Mark (Seal + Name) */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group focus-visible:ring-2 focus-visible:ring-seal rounded-lg p-1 shrink-0"
            aria-label="Rishab Chandgothia — Home"
          >
            <SealMark size={34} interactive={false} />
            <span className="font-display font-bold text-lg sm:text-xl text-ink tracking-tight group-hover:text-indigo transition-colors duration-150 ease-[var(--ease-twos)]">
              Rishab
            </span>
          </Link>

          {/* Mobile Header Controls */}
          <div className="flex lg:hidden items-center gap-2">
            {activeSeason && (
              <button
                type="button"
                onClick={() => setIsExplorerOpen(true)}
                aria-label="Season Explorer"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-paper/95 border border-ink/20 text-sm font-semibold text-ink max-w-[180px]"
              >
                <span>{atmosphere.icon}</span>
                <span className="truncate">{activeSeason.name}</span>
                <span className="text-sm text-seal font-semibold">72↗</span>
              </button>
            )}
            <button
              type="button"
              onClick={openMobileMenu}
              aria-label="Open navigation menu"
              aria-haspopup="dialog"
              className="h-9 px-3 rounded-xl bg-ink text-paper text-sm font-medium flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-seal cursor-pointer"
            >
              Menu
            </button>
          </div>

          {/* Desktop Navigation Links & Enhanced Top Bar Season Station */}
          <div className="hidden lg:flex items-center gap-3 xl:gap-5">
            <ul className="flex items-center gap-1 xl:gap-2 list-none">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className={`font-body text-sm font-medium rounded-md px-2.5 py-1 transition-colors duration-150 ease-[var(--ease-twos)] focus-visible:ring-2 focus-visible:ring-seal ${
                        isActive
                          ? 'text-seal bg-seal/10 font-semibold'
                          : 'text-mist hover:text-ink hover:bg-ink/5'
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Interactive Top Bar Season Station */}
            {activeSeason && (
              <div
                role="region"
                aria-label="Seasonal Atmosphere Controller"
                className="flex items-center p-1 rounded-full bg-paper/95 border border-ink/20"
              >
                {/* 4 Direct Season Buttons */}
                <div className="flex items-center gap-1 pr-2">
                  {[
                    { key: 'Spring', label: '春', title: 'Switch to Spring' },
                    { key: 'Summer', label: '夏', title: 'Switch to Summer' },
                    { key: 'Autumn', label: '秋', title: 'Switch to Autumn' },
                    { key: 'Winter', label: '冬', title: 'Switch to Winter' },
                  ].map((q) => {
                    const isActive = atmosphere.quarter === q.key;
                    return (
                      <button
                        key={q.key}
                        type="button"
                        onClick={() => selectQuarter(q.key)}
                        title={q.title}
                        aria-label={q.title}
                        className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-semibold transition-transform duration-150 cursor-pointer ${
                          isActive
                            ? 'bg-ink text-paper scale-105'
                            : 'hover:bg-ink/10 opacity-70 hover:opacity-100 hover:scale-105'
                        }`}
                      >
                        <span>{q.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Season Label & 72 Calendar Trigger */}
                <button
                  type="button"
                  onClick={() => setIsExplorerOpen(true)}
                  title="Explore all 72 Japanese microseasons"
                  aria-label="Active microseason, click to explore all 72"
                  className="inline-flex items-center gap-1.5 px-2.5 py-0.5 text-sm font-semibold text-ink hover:text-seal transition-colors cursor-pointer"
                >
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: atmosphere.accentColor }}
                  />
                  <span className="max-w-[130px] truncate text-sm font-semibold">
                    {activeSeason.name}
                  </span>
                  <span className="text-sm text-seal font-semibold pl-0.5">
                    72 ↗
                  </span>
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Fixed Menu Button (Bottom-Right, 44px+ touch target) */}
      <div className="md:hidden fixed bottom-6 right-6 z-40">
        <button
          ref={openButtonRef}
          type="button"
          onClick={openMobileMenu}
          aria-label="Open navigation menu"
          aria-haspopup="dialog"
          className="h-12 px-5 rounded-full bg-ink text-paper border border-paper/20 flex items-center justify-center gap-2 text-sm font-semibold active:scale-95 transition-transform duration-150 ease-[var(--ease-twos)] focus-visible:ring-2 focus-visible:ring-seal motion-reduce:transition-none"
        >
          <span className="w-2 h-2 rounded-full bg-seal" />
          Menu
        </button>
      </div>

      {/* Native Mobile Dialog Sheet */}
      <dialog
        ref={dialogRef}
        onClose={() => {
          if (openButtonRef.current) openButtonRef.current.focus();
        }}
        aria-label="Mobile Navigation Menu"
        className="backdrop:bg-ink/65 bg-paper text-ink p-8 w-[90%] max-w-sm rounded-3xl border border-ink/15 m-auto focus:outline-none open:animate-fadeIn"
      >
        <div className="flex flex-col gap-6">
          {/* Dialog Header */}
          <div className="flex items-center justify-between pb-4">
            <div className="flex items-center gap-2">
              <SealMark size={32} interactive={false} />
              <span className="font-display font-bold text-base text-ink">Navigation</span>
            </div>
            <button
              type="button"
              onClick={closeMobileMenu}
              aria-label="Close navigation menu"
              className="w-10 h-10 rounded-full flex items-center justify-center text-mist hover:text-ink hover:bg-ink/5 text-sm font-bold transition-colors focus-visible:ring-2 focus-visible:ring-seal cursor-pointer"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Dialog Links (min 48px target) */}
          <ul className="flex flex-col gap-2 list-none">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    onClick={closeMobileMenu}
                    className={`flex items-center justify-between h-12 px-4 rounded-xl font-display text-xl font-bold transition-colors duration-150 ease-[var(--ease-twos)] focus-visible:ring-2 focus-visible:ring-seal ${
                      isActive
                        ? 'text-seal bg-seal/10'
                        : 'text-ink hover:text-indigo hover:bg-indigo/5'
                    }`}
                  >
                    <span>{link.label}</span>
                    <span className="text-sm font-body font-medium text-mist">
                      {link.themeTag}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Mobile Season Quick Access */}
          {activeSeason && (
            <div className="pt-4">
              <button
                type="button"
                onClick={() => {
                  closeMobileMenu();
                  setIsExplorerOpen(true);
                }}
                className="w-full p-3 rounded-xl bg-ink/5 hover:bg-ink/10 flex items-center justify-between text-left text-sm text-ink"
              >
                <div>
                  <span className="block text-mist text-sm font-medium">Active Season</span>
                  <span className="font-semibold text-base">{activeSeason.name}</span>
                </div>
                <span className="text-seal font-semibold">Explore 72 ↗</span>
              </button>
            </div>
          )}
        </div>
      </dialog>
    </>
  );
}

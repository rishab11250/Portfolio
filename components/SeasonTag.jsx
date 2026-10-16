"use client";
import React from 'react';
import { useSeason } from '../lib/SeasonContext.jsx';

/**
 * SeasonTag - Displays the active 72 microseason in plain English.
 * Synchronized to Asia/Tokyo calendar day so all visitors observe the same season.
 * Connects directly to global SeasonContext so selecting any season updates Navbar, Hero, and Footer.
 * Supports theme="paper" (light text for dark footers) or theme="ink" (dark text for paper pages).
 */
export default function SeasonTag({ theme = 'paper' }) {
  const {
    activeSeason,
    isCustom,
    resetToLive,
    setIsExplorerOpen,
  } = useSeason();

  const isInk = theme === 'ink';

  if (!activeSeason) {
    return (
      <span className={`font-body text-sm ${isInk ? 'text-mist' : 'text-paper/40'}`}>
        Observing season...
      </span>
    );
  }

  return (
    <div className="inline-flex flex-wrap items-center gap-2">
      <button
        type="button"
        onClick={() => setIsExplorerOpen(true)}
        aria-haspopup="dialog"
        aria-label="View and explore all 72 microseasons"
        className={`font-body text-sm tracking-wide inline-flex items-center gap-1.5 transition-colors focus-visible:ring-2 py-1 px-2.5 rounded-lg border cursor-pointer ${
          isInk
            ? 'text-ink hover:text-ink border-ink/20 hover:bg-ink/5 focus-visible:ring-ink'
            : 'text-paper/85 hover:text-paper border-paper/10 hover:bg-paper/10 focus-visible:ring-paper'
        }`}
      >
        <span>
          Season:{' '}
          <strong className={isInk ? 'text-ink font-bold' : 'text-paper font-semibold'}>
            {activeSeason.name}
          </strong>{' '}
          <span className={isInk ? 'text-mist' : 'text-paper/50'}>
            ({activeSeason.majorSeason}, {activeSeason.approximateRange})
          </span>
        </span>
        <span
          className={`text-sm font-medium px-2 py-0.5 rounded border ${
            isInk
              ? 'text-ink bg-ink/5 border-ink/15'
              : 'text-paper/70 bg-paper/15 border-paper/20'
          }`}
        >
          Explore 72 ↗
        </span>
      </button>

      {isCustom && (
        <button
          type="button"
          onClick={resetToLive}
          className={`text-sm font-body underline underline-offset-2 transition-colors cursor-pointer ${
            isInk ? 'text-mist hover:text-ink' : 'text-paper/60 hover:text-paper'
          }`}
        >
          Reset to Today
        </button>
      )}
    </div>
  );
}

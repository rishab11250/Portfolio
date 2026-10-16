"use client";
import React from 'react';
import { useSeason } from '../lib/SeasonContext.jsx';

/**
 * SeasonTag - Displays the active 72 microseason in plain English in the Footer.
 * Synchronized to Asia/Tokyo calendar day so all visitors observe the same season.
 * Connects directly to global SeasonContext so selecting any season updates Navbar, Hero, and Footer.
 */
export default function SeasonTag() {
  const {
    activeSeason,
    isCustom,
    resetToLive,
    setIsExplorerOpen,
  } = useSeason();

  if (!activeSeason) {
    return (
      <span className="font-body text-sm text-paper/40">
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
        className="font-body text-sm text-paper/85 hover:text-paper tracking-wide inline-flex items-center gap-1.5 transition-colors focus-visible:ring-2 focus-visible:ring-paper py-1 px-2.5 rounded-lg hover:bg-paper/10 border border-paper/10 cursor-pointer"
      >
        <span>
          Season: <strong className="text-paper font-semibold">{activeSeason.name}</strong>{' '}
          <span className="text-paper/50">({activeSeason.majorSeason}, {activeSeason.approximateRange})</span>
        </span>
        <span className="text-paper/70 text-sm font-medium px-2 py-0.5 rounded bg-paper/15 border border-paper/20">
          Explore 72 ↗
        </span>
      </button>

      {isCustom && (
        <button
          type="button"
          onClick={resetToLive}
          className="text-sm font-body text-paper/60 hover:text-paper underline underline-offset-2 transition-colors cursor-pointer"
        >
          Reset to Today
        </button>
      )}
    </div>
  );
}

"use client";
import React, { useState, useEffect, useRef } from 'react';
import { seasons } from '../data/seasons.js';
import SealMark from './primitives/SealMark.jsx';

const seasonGroups = [
  { label: 'All (72)', range: [1, 72] },
  { label: 'Spring (1–18)', range: [1, 18] },
  { label: 'Summer (19–36)', range: [19, 36] },
  { label: 'Autumn (37–54)', range: [37, 54] },
  { label: 'Winter (55–72)', range: [55, 72] },
];

export default function SeasonExplorerModal({
  isOpen,
  onClose,
  currentLiveSeason,
  activeSeason,
  onSelectSeason,
  onResetToLive,
}) {
  const dialogRef = useRef(null);
  const [selectedSeasonId, setSelectedSeasonId] = useState(activeSeason?.id || 1);
  const [activeTab, setActiveTab] = useState('All (72)');
  const [searchQuery, setSearchQuery] = useState('');

  // Handle native dialog open / close and body scroll lock
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
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
  }, [isOpen]);

  const selectedSeason = seasons.find((s) => s.id === selectedSeasonId) || seasons[0];

  // Filter seasons based on tab and search query
  const filteredSeasons = seasons.filter((s) => {
    const group = seasonGroups.find((g) => g.label === activeTab);
    const inRange = group ? s.id >= group.range[0] && s.id <= group.range[1] : true;
    if (!inRange) return false;

    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      s.name.toLowerCase().includes(query) ||
      s.majorSeason.toLowerCase().includes(query) ||
      s.approximateRange.toLowerCase().includes(query)
    );
  });

  return (
    <dialog
      ref={dialogRef}
      onCancel={onClose}
      className="backdrop:bg-ink/70 bg-paper text-ink p-0 w-[95%] max-w-4xl rounded-3xl border border-ink/20 m-auto focus:outline-none overflow-hidden"
    >
      <div className="flex flex-col max-h-[88vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 sm:px-8 py-5 bg-paper/95">
          <div className="flex items-center gap-3">
            <SealMark size={32} interactive={false} />
            <div>
              <h2 className="font-display font-bold text-xl sm:text-2xl text-ink tracking-tight">
                The 72 Microseasons
              </h2>
              <p className="font-body text-xs text-mist">
                Traditional calendar dividing the solar year into poetic five-day natural rhythms.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close season explorer dialog"
            className="w-9 h-9 rounded-full flex items-center justify-center text-mist hover:text-ink hover:bg-ink/5 text-sm font-bold transition-colors focus-visible:ring-2 focus-visible:ring-seal cursor-pointer"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8">
          {/* Featured / Active Season Card */}
          <div className="p-6 sm:p-7 rounded-2xl bg-ink/5 border border-ink/15 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 text-xs font-medium rounded-md bg-seal text-paper">
                  Microseason #{selectedSeason.id} of 72
                </span>
                <span className="text-xs font-medium text-mist">
                  {selectedSeason.majorSeason}
                </span>
                {currentLiveSeason?.id === selectedSeason.id && (
                  <span className="px-2 py-0.5 text-xs font-semibold rounded bg-indigo/15 text-prussian border border-indigo/25">
                    Live Today
                  </span>
                )}
              </div>

              <h3 className="font-display font-bold text-2xl sm:text-3xl text-ink tracking-tight">
                {selectedSeason.name}
              </h3>

              <p className="font-body text-sm text-mist">
                Calendar Period: <strong className="text-ink font-medium">{selectedSeason.approximateRange}</strong> (Asia/Tokyo Solar Cycle)
              </p>
            </div>

            {/* Actions for selected season */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  onSelectSeason(selectedSeason);
                  onClose();
                }}
                className="h-11 px-5 rounded-xl font-body text-sm font-semibold transition-colors duration-150 ease-[var(--ease-twos)] flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-seal bg-seal text-paper hover:bg-seal/90 cursor-pointer"
              >
                Experience This Season ↗
              </button>

              {activeSeason?.id !== currentLiveSeason?.id && (
                <button
                  type="button"
                  onClick={() => {
                    onResetToLive();
                    onClose();
                  }}
                  className="h-11 px-4 rounded-xl text-mist hover:text-ink font-body text-sm font-medium border border-ink/15 hover:bg-ink/5 transition-colors focus-visible:ring-2 focus-visible:ring-seal cursor-pointer"
                >
                  Reset to Live Date
                </button>
              )}
            </div>
          </div>

          {/* Scrubber / Slider Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-medium text-mist">
              <span>Calendar Scrubber (1..72)</span>
              <span>Season #{selectedSeasonId}: {selectedSeason.approximateRange}</span>
            </div>
            <input
              type="range"
              min="1"
              max="72"
              value={selectedSeasonId}
              onChange={(e) => setSelectedSeasonId(parseInt(e.target.value, 10))}
              aria-label="Scrub through all 72 seasons"
              className="w-full accent-seal cursor-pointer h-2 bg-ink/15 rounded-lg appearance-none"
            />
            <div className="flex justify-between text-xs text-mist font-medium pt-1">
              <span>Spring (Feb 4)</span>
              <span>Summer (May 5)</span>
              <span>Autumn (Aug 8)</span>
              <span>Winter (Nov 7)</span>
            </div>
          </div>

          {/* Controls: Search & Quarter Tabs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-2">
            {/* Tabs */}
            <div className="flex flex-wrap items-center gap-1.5">
              {seasonGroups.map((group) => (
                <button
                  key={group.label}
                  type="button"
                  onClick={() => setActiveTab(group.label)}
                  className={`px-3 py-1.5 rounded-lg font-body text-xs font-semibold transition-colors duration-150 ease-[var(--ease-twos)] focus-visible:ring-2 focus-visible:ring-seal ${
                    activeTab === group.label
                      ? 'bg-indigo text-paper'
                      : 'bg-ink/5 text-ink hover:bg-ink/10'
                  }`}
                >
                  {group.label}
                </button>
              ))}
            </div>

            {/* Keyword Search */}
            <div className="relative min-w-[200px]">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search seasons..."
                className="w-full h-9 px-3 text-xs rounded-lg bg-ink/5 border border-ink/15 text-ink placeholder-mist/60 font-body focus:outline-none focus:border-indigo"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-mist hover:text-ink text-xs font-bold"
                  aria-label="Clear search"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Season Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {filteredSeasons.map((s) => {
              const isSelected = s.id === selectedSeasonId;
              const isCurrent = s.id === currentLiveSeason?.id;

              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setSelectedSeasonId(s.id)}
                  className={`p-4 rounded-xl text-left border transition-colors duration-150 ease-[var(--ease-twos)] flex flex-col justify-between gap-2 focus-visible:ring-2 focus-visible:ring-seal cursor-pointer ${
                    isSelected
                      ? 'bg-paper border-seal ring-1 ring-seal'
                      : 'bg-paper hover:bg-ink/5 border-ink/10'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-semibold text-mist">
                        #{s.id} • {s.majorSeason}
                      </span>
                      {isCurrent && (
                        <span className="px-1.5 py-0.2 rounded text-xs font-semibold bg-indigo/15 text-prussian">
                          Live
                        </span>
                      )}
                    </div>
                    <h4 className="font-display font-bold text-sm text-ink leading-snug">
                      {s.name}
                    </h4>
                  </div>
                  <span className="text-xs font-medium text-mist font-body">
                    {s.approximateRange}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 sm:px-8 py-4 bg-paper/95 flex items-center justify-between">
          <span className="text-xs text-mist font-body">
            Showing {filteredSeasons.length} of 72 microseasons
          </span>
          <button
            type="button"
            onClick={onClose}
            className="h-10 px-5 rounded-xl bg-ink text-paper font-body text-sm font-semibold hover:bg-indigo transition-colors focus-visible:ring-2 focus-visible:ring-seal"
          >
            Close Explorer
          </button>
        </div>
      </div>
    </dialog>
  );
}

"use client";
import React, { createContext, useContext, useState, useSyncExternalStore } from 'react';
import { getCurrentSeason } from './season.js';
import { seasons } from '../data/seasons.js';

const emptySubscribe = () => () => {};

/**
 * Seasonal atmospheric lighting palettes based on the 4 seasonal quarters:
 * - Spring (1–18): Soft cherry blossom & pale morning gold (Sakura petal drift)
 * - Summer (19–36): Fresh bamboo jade & warm sun gold (Firefly twilight)
 * - Autumn (37–54): Persimmon dusk & rich amber harvest (Momiji maple drift)
 * - Winter (55–72): Frost blue & crisp snow silver (Crystalline snowfall)
 */
function getAtmosphereForSeason(seasonId) {
  if (seasonId <= 18) {
    return {
      quarter: 'Spring',
      quarterId: 1,
      glow1: 'rgba(244, 143, 177, 0.28)',
      glow2: 'rgba(255, 224, 130, 0.20)',
      accentColor: '#DF4F73', // Sakura crimson
      secondaryColor: '#BE185D',
      paperBg: '#FAF1F4', // Soft cherry washi tint
      cardBg: '#FFFDFE',
      cardBorder: 'rgba(223, 79, 115, 0.24)',
      mistOverlay: 'rgba(244, 143, 177, 0.18)',
      mistFilter: 'hue-rotate(310deg) saturate(1.4)',
      particleType: 'sakura',
      themeClass: 'theme-spring',
      greeting: 'Haru • Vernal Bloom',
      icon: '春',
      badgeBg: 'rgba(223, 79, 115, 0.14)',
      badgeText: '#DF4F73',
    };
  }
  if (seasonId <= 36) {
    return {
      quarter: 'Summer',
      quarterId: 19,
      glow1: 'rgba(13, 148, 136, 0.25)',
      glow2: 'rgba(245, 158, 11, 0.22)',
      accentColor: '#0D9488', // Bamboo teal / emerald
      secondaryColor: '#047857',
      paperBg: '#EDF6F2', // Fresh bamboo mist tint
      cardBg: '#FAFCFB',
      cardBorder: 'rgba(13, 148, 136, 0.24)',
      mistOverlay: 'rgba(13, 148, 136, 0.18)',
      mistFilter: 'hue-rotate(110deg) saturate(1.3)',
      particleType: 'firefly',
      themeClass: 'theme-summer',
      greeting: 'Natsu • Lush Bamboo',
      icon: '夏',
      badgeBg: 'rgba(13, 148, 136, 0.14)',
      badgeText: '#0D9488',
    };
  }
  if (seasonId <= 54) {
    return {
      quarter: 'Autumn',
      quarterId: 37,
      glow1: 'rgba(201, 31, 55, 0.22)',
      glow2: 'rgba(245, 158, 11, 0.24)',
      accentColor: '#C91F37', // Traditional Hanko Vermilion
      secondaryColor: '#C2410C',
      paperBg: '#F9F3E8', // Classic warm harvest washi
      cardBg: '#FCFAF5',
      cardBorder: 'rgba(201, 31, 55, 0.24)',
      mistOverlay: 'rgba(245, 158, 11, 0.18)',
      mistFilter: 'hue-rotate(15deg) saturate(1.5)',
      particleType: 'maple',
      themeClass: 'theme-autumn',
      greeting: 'Aki • Golden Harvest',
      icon: '秋',
      badgeBg: 'rgba(201, 31, 55, 0.14)',
      badgeText: '#C91F37',
    };
  }
  return {
    quarter: 'Winter',
    quarterId: 55,
    glow1: 'rgba(59, 130, 246, 0.26)',
    glow2: 'rgba(224, 231, 255, 0.32)',
    accentColor: '#2563EB', // Crystalline frost cobalt
    secondaryColor: '#1D4ED8',
    paperBg: '#EBF2F9', // Crisp glacial frost tint
    cardBg: '#F7FAFD',
    cardBorder: 'rgba(37, 99, 235, 0.24)',
    mistOverlay: 'rgba(59, 130, 246, 0.18)',
    mistFilter: 'hue-rotate(195deg) saturate(1.4)',
    particleType: 'snow',
    themeClass: 'theme-winter',
    greeting: 'Fuyu • Crisp Frost',
    icon: '冬',
    badgeBg: 'rgba(37, 99, 235, 0.14)',
    badgeText: '#2563EB',
  };
}

const SeasonContext = createContext(null);

export function SeasonProvider({ children }) {
  const [customSeason, setCustomSeason] = useState(null);
  const [isExplorerOpen, setIsExplorerOpen] = useState(false);

  const liveSeason = useSyncExternalStore(
    emptySubscribe,
    () => getCurrentSeason(),
    () => null
  );

  const activeSeason = customSeason || liveSeason;
  const atmosphere = activeSeason ? getAtmosphereForSeason(activeSeason.id) : getAtmosphereForSeason(50);
  const isCustom = customSeason !== null && customSeason.id !== liveSeason?.id;

  const selectSeason = (season) => {
    setCustomSeason(season);
  };

  const selectQuarter = (quarterName) => {
    const targetId =
      quarterName === 'Spring' ? 1 :
      quarterName === 'Summer' ? 19 :
      quarterName === 'Autumn' ? 37 : 55;
    const match = seasons.find((s) => s.id === targetId);
    if (match) {
      setCustomSeason(match);
    }
  };

  const resetToLive = () => {
    setCustomSeason(null);
  };

  return (
    <SeasonContext.Provider
      value={{
        liveSeason,
        activeSeason,
        atmosphere,
        isCustom,
        selectSeason,
        selectQuarter,
        resetToLive,
        isExplorerOpen,
        setIsExplorerOpen,
      }}
    >
      {children}
    </SeasonContext.Provider>
  );
}

export function useSeason() {
  const ctx = useContext(SeasonContext);
  if (!ctx) {
    throw new Error('useSeason must be used within a SeasonProvider');
  }
  return ctx;
}

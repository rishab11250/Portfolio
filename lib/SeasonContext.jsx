"use client";
import React, { createContext, useContext, useState, useSyncExternalStore } from 'react';
import { getCurrentSeason } from './season.js';
import { seasons } from '../data/seasons.js';

const emptySubscribe = () => () => {};

/**
 * Seasonal atmospheric lighting palettes based on the 4 seasonal quarters:
 * - Spring (1–18): Soft cherry blossom & pale morning gold (Sakura petal drift)
 * - Summer (19–36): Fresh bamboo turquoise & warm sun gold (Firefly twilight)
 * - Autumn (37–54): Persimmon dusk & rich amber harvest (Momiji maple drift)
 * - Winter (55–72): Frost blue & crisp snow silver (Crystalline snowfall)
 */
function getAtmosphereForSeason(seasonId) {
  if (seasonId <= 18) {
    return {
      quarter: 'Spring',
      quarterId: 1,
      glow1: '#F48FB1',
      glow2: '#FFE082',
      accentColor: '#E95295',
      particleType: 'sakura',
      themeClass: 'theme-spring',
      greeting: 'Vernal Awakening',
      icon: '春',
    };
  }
  if (seasonId <= 36) {
    return {
      quarter: 'Summer',
      quarterId: 19,
      glow1: '#4DD0E1',
      glow2: '#FFD54F',
      accentColor: '#1E3A5F',
      particleType: 'firefly',
      themeClass: 'theme-summer',
      greeting: 'Lush High Summer',
      icon: '夏',
    };
  }
  if (seasonId <= 54) {
    return {
      quarter: 'Autumn',
      quarterId: 37,
      glow1: '#E95295',
      glow2: '#F2B84B',
      accentColor: '#C91F37',
      particleType: 'maple',
      themeClass: 'theme-autumn',
      greeting: 'Harvest Twilight',
      icon: '秋',
    };
  }
  return {
    quarter: 'Winter',
    quarterId: 55,
    glow1: '#90CAF9',
    glow2: '#E0E0E0',
    accentColor: '#0B2545',
    particleType: 'snow',
    themeClass: 'theme-winter',
    greeting: 'Crystalline Slumber',
    icon: '冬',
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

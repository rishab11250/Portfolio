"use client";
import React, { createContext, useContext, useState, useSyncExternalStore } from 'react';
import { getCurrentSeason } from './season.js';

const emptySubscribe = () => () => {};

export const SEASON_ATMOSPHERES = {
  Spring: {
    quarter: 'Spring',
    name: 'Spring',
    glow1: 'rgba(244, 143, 177, 0.28)',
    glow2: 'rgba(255, 224, 130, 0.20)',
    accentColor: '#DF4F73', // Sakura crimson
    secondaryColor: '#BE185D',
    paperBg: '#FAF1F4', // Soft cherry washi tint
    cardBg: 'rgba(255, 252, 254, 0.72)', // Translucent washi glass
    cardBorder: 'rgba(223, 79, 115, 0.28)',
    mistOverlay: 'rgba(244, 143, 177, 0.18)',
    mistFilter: 'hue-rotate(310deg) saturate(1.4)',
    particleType: 'sakura',
    themeClass: 'theme-spring',
    greeting: 'Haru • Vernal Bloom',
    icon: '春',
    badgeBg: 'rgba(223, 79, 115, 0.14)',
    badgeText: '#DF4F73',
  },
  Summer: {
    quarter: 'Summer',
    name: 'Summer',
    glow1: 'rgba(13, 148, 136, 0.25)',
    glow2: 'rgba(245, 158, 11, 0.22)',
    accentColor: '#0D9488', // Bamboo teal / emerald
    secondaryColor: '#047857',
    paperBg: '#EDF6F2', // Fresh bamboo mist tint
    cardBg: 'rgba(247, 252, 250, 0.70)', // Translucent bamboo glass
    cardBorder: 'rgba(13, 148, 136, 0.28)',
    mistOverlay: 'rgba(13, 148, 136, 0.18)',
    mistFilter: 'hue-rotate(110deg) saturate(1.3)',
    particleType: 'firefly',
    themeClass: 'theme-summer',
    greeting: 'Natsu • Lush Bamboo',
    icon: '夏',
    badgeBg: 'rgba(13, 148, 136, 0.14)',
    badgeText: '#0D9488',
  },
  Autumn: {
    quarter: 'Autumn',
    name: 'Autumn',
    glow1: 'rgba(201, 31, 55, 0.22)',
    glow2: 'rgba(245, 158, 11, 0.24)',
    accentColor: '#C91F37', // Traditional Hanko Vermilion
    secondaryColor: '#C2410C',
    paperBg: '#F9F3E8', // Classic warm harvest washi
    cardBg: 'rgba(253, 251, 247, 0.70)', // Translucent harvest glass
    cardBorder: 'rgba(201, 31, 55, 0.28)',
    mistOverlay: 'rgba(245, 158, 11, 0.18)',
    mistFilter: 'hue-rotate(15deg) saturate(1.5)',
    particleType: 'maple',
    themeClass: 'theme-autumn',
    greeting: 'Aki • Golden Harvest',
    icon: '秋',
    badgeBg: 'rgba(201, 31, 55, 0.14)',
    badgeText: '#C91F37',
  },
  Winter: {
    quarter: 'Winter',
    name: 'Winter',
    glow1: 'rgba(59, 130, 246, 0.26)',
    glow2: 'rgba(224, 231, 255, 0.32)',
    accentColor: '#2563EB', // Crystalline frost cobalt
    secondaryColor: '#1D4ED8',
    paperBg: '#EBF2F9', // Crisp glacial frost tint
    cardBg: 'rgba(246, 250, 253, 0.70)', // Translucent frost glass
    cardBorder: 'rgba(37, 99, 235, 0.28)',
    mistOverlay: 'rgba(59, 130, 246, 0.18)',
    mistFilter: 'hue-rotate(195deg) saturate(1.4)',
    particleType: 'snow',
    themeClass: 'theme-winter',
    greeting: 'Fuyu • Crisp Frost',
    icon: '冬',
    badgeBg: 'rgba(37, 99, 235, 0.14)',
    badgeText: '#2563EB',
  },
};

const SeasonContext = createContext(null);

export function SeasonProvider({ children }) {
  const [customQuarter, setCustomQuarter] = useState(null);

  const liveQuarter = useSyncExternalStore(
    emptySubscribe,
    () => getCurrentSeason(),
    () => 'Autumn'
  );

  const activeQuarter = customQuarter || liveQuarter || 'Autumn';
  const atmosphere = SEASON_ATMOSPHERES[activeQuarter] || SEASON_ATMOSPHERES.Autumn;

  const selectQuarter = (quarterName) => {
    if (SEASON_ATMOSPHERES[quarterName]) {
      setCustomQuarter(quarterName);
    }
  };

  const resetToLive = () => {
    setCustomQuarter(null);
  };

  return (
    <SeasonContext.Provider
      value={{
        quarter: activeQuarter,
        atmosphere,
        selectQuarter,
        resetToLive,
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

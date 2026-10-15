"use client";
import React, { useState, useEffect, useSyncExternalStore } from 'react';
import LoadingScreen from './LoadingScreen';

const emptySubscribe = () => () => {};

function getClientSnapshot() {
  try {
    return !sessionStorage.getItem('portfolio_visited');
  } catch {
    return false;
  }
}

function getServerSnapshot() {
  return false;
}

const SessionLoader = () => {
  const [closed, setClosed] = useState(false);
  const showLoader = useSyncExternalStore(emptySubscribe, getClientSnapshot, getServerSnapshot);

  useEffect(() => {
    if (!showLoader) {
      document.documentElement.classList.remove('loading-active');
    }
  }, [showLoader]);

  const handleComplete = () => {
    try {
      sessionStorage.setItem('portfolio_visited', 'true');
    } catch {
      // ignore
    }
    document.documentElement.classList.remove('loading-active');
    setClosed(true);
  };

  if (!showLoader || closed) {
    return null;
  }

  return <LoadingScreen onComplete={handleComplete} />;
};

export default SessionLoader;

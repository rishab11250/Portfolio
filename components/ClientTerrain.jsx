"use client";
import dynamic from 'next/dynamic';

const SciFiTerrain = dynamic(() => import('./SciFiTerrain'), {
  ssr: false,
  loading: () => (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        background: 'var(--bg-color)',
      }}
    />
  ),
});

export default function ClientTerrain() {
  return <SciFiTerrain />;
}

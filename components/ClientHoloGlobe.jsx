"use client";
import dynamic from 'next/dynamic';

const HoloGlobe = dynamic(() => import('./HoloGlobe'), {
  ssr: false,
  loading: () => null,
});

export default function ClientHoloGlobe() {
  return <HoloGlobe />;
}

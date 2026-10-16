import React from 'react';
import PanoramicVista from '@/components/sumie/PanoramicVista';

export const metadata = {
  title: 'Rishab Chandgothia | Full Stack Developer',
  description:
    'Full-Stack Developer crafting reliable, high-performance web applications with clean design and solid engineering foundations.',
  alternates: { canonical: '/' },
};

export default function Home() {
  return (
    <main id="main-content" data-page="sumie" className="w-full flex-1 flex flex-col justify-between overflow-hidden">
      <PanoramicVista />
    </main>
  );
}

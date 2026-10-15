import { Inter, Orbitron, Share_Tech_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Toaster } from 'react-hot-toast';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const orbitron = Orbitron({
  subsets: ['latin'],
  weight: ['700', '900'],
  variable: '--font-orbitron',
  display: 'swap',
});

const shareTechMono = Share_Tech_Mono({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-share-tech-mono',
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL('https://www.itsrishab.xyz'),
  title: 'Rishab | Full Stack Developer',
  description:
    'Portfolio of Rishab, a Full Stack Developer specializing in React, Node.js, and modern web technologies. View my projects and skills.',
  keywords: [
    'Rishab',
    'Full Stack Developer',
    'Web Developer',
    'React',
    'Node.js',
    'JavaScript',
    'Portfolio',
  ],
  authors: [{ name: 'Rishab Chandgothia' }],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: '/',
    title: 'Rishab | Full Stack Developer',
    description:
      'Crafting high-performance, modern web applications. Check out my latest projects and tech stack.',
    siteName: 'Rishab Chandgothia',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rishab | Full Stack Developer',
    description:
      'Crafting high-performance, modern web applications. Check out my latest projects and tech stack.',
  },
  robots: { index: true, follow: true },
  verification: {
    google: '0lvYx0RQIY_REfNUbc7B0lggcAN74uU1JlElYgKWe-Q',
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${inter.variable} ${orbitron.variable} ${shareTechMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{if(!sessionStorage.getItem('portfolio_visited')){document.documentElement.classList.add('loading-active');}}catch(e){}})();`,
          }}
        />
        <noscript>
          <style>{`html.loading-active body > .app-container > .content-container, html.loading-active body > .app-container > .navbar { opacity: 1 !important; visibility: visible !important; }`}</style>
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Rishab Chandgothia',
              url: 'https://www.itsrishab.xyz/',
              jobTitle: 'Full Stack Developer',
              sameAs: [
                'https://github.com/rishab11250',
                'https://www.linkedin.com/in/rishab-chandgothia-8823112a4/',
              ],
            }),
          }}
        />
      </head>
      <body>
        {children}
        <Toaster
          position="bottom-center"
          toastOptions={{
            style: {
              background: 'var(--card-bg)',
              color: 'var(--text-color)',
              border: '1px solid var(--glass-border)',
            },
          }}
        />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

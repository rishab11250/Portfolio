import { Zen_Old_Mincho, Zen_Kaku_Gothic_New } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { SeasonProvider } from '@/lib/SeasonContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SeasonalAtmosphere from '@/components/SeasonalAtmosphere';
import './globals.css';

const zenOldMincho = Zen_Old_Mincho({
  subsets: ['latin'],
  weight: ['700', '900'],
  variable: '--font-display',
  display: 'swap',
});

const zenKakuGothic = Zen_Kaku_Gothic_New({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL('https://www.itsrishab.xyz'),
  title: 'Rishab Chandgothia | Full Stack Developer',
  description:
    'Full-Stack Developer crafting clean, dependable web applications with modern frontend engineering and tested backend systems.',
  keywords: [
    'Rishab',
    'Rishab Chandgothia',
    'Full Stack Developer',
    'Web Developer',
    'React',
    'Node.js',
    'Next.js',
    'JavaScript',
    'Portfolio',
  ],
  authors: [{ name: 'Rishab Chandgothia' }],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: '/',
    title: 'Rishab Chandgothia | Full Stack Developer',
    description:
      'Full-Stack Developer crafting clean, dependable web applications with modern frontend engineering and tested backend systems.',
    siteName: 'Rishab Chandgothia',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rishab Chandgothia | Full Stack Developer',
    description:
      'Full-Stack Developer crafting clean, dependable web applications with modern frontend engineering and tested backend systems.',
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
      className={`${zenOldMincho.variable} ${zenKakuGothic.variable}`}
    >
      <head>
        {/* SVG Filter for Indigo Duotone Image Processing */}
        <svg width="0" height="0" className="sr-only" aria-hidden="true">
          <filter id="duotone" colorInterpolationFilters="sRGB">
            <feColorMatrix type="saturate" values="0" />
            <feComponentTransfer>
              <feFuncR type="table" tableValues="0.043 0.945" />
              <feFuncG type="table" tableValues="0.145 0.925" />
              <feFuncB type="table" tableValues="0.271 0.878" />
            </feComponentTransfer>
          </filter>
        </svg>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': 'WebSite',
                  '@id': 'https://www.itsrishab.xyz/#website',
                  url: 'https://www.itsrishab.xyz',
                  name: 'Rishab Chandgothia Portfolio',
                  description:
                    'Full-Stack Developer crafting clean, dependable web applications with modern frontend engineering and tested backend systems.',
                  publisher: { '@id': 'https://www.itsrishab.xyz/#person' },
                },
                {
                  '@type': 'Person',
                  '@id': 'https://www.itsrishab.xyz/#person',
                  name: 'Rishab Chandgothia',
                  url: 'https://www.itsrishab.xyz/',
                  jobTitle: 'Full Stack Developer',
                  alumniOf: {
                    '@type': 'CollegeOrUniversity',
                    name: 'Arya College of Engineering & IT',
                  },
                  knowsAbout: [
                    'React',
                    'Next.js',
                    'Node.js',
                    'Express.js',
                    'MongoDB',
                    'MySQL',
                    'PostgreSQL',
                    'JavaScript',
                    'C',
                    'C++',
                    'Tailwind CSS',
                  ],
                  sameAs: [
                    'https://github.com/rishab11250',
                    'https://www.linkedin.com/in/rishab-chandgothia-8823112a4/',
                  ],
                },
              ],
            }),
          }}
        />
      </head>
      <body className="min-h-dvh bg-paper text-ink flex flex-col selection:bg-indigo selection:text-paper">
        <SeasonProvider>
          <SeasonalAtmosphere />
          <Navbar />
          <div className="flex-1 flex flex-col pt-16 sm:pt-20">
            {children}
          </div>
          <Footer />
        </SeasonProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

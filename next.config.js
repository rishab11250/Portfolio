/** @type {import('next').NextConfig} */

const isDev = process.env.NODE_ENV === 'development';

const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-inline' ${isDev ? "'unsafe-eval'" : ''} https://va.vercel-scripts.com;
    style-src 'self' 'unsafe-inline';
    img-src 'self' data: blob: https://res.cloudinary.com https://api2.sololearn.com https://d8it4huxumps7.cloudfront.net https://img.shields.io https://camo.githubusercontent.com;
    font-src 'self' data:;
    connect-src 'self' https://api.emailjs.com https://va.vercel-scripts.com https://vitals.vercel-insights.com;
    frame-ancestors 'none';
    form-action 'self' https://api.emailjs.com;
    base-uri 'self';
`.replace(/\s{2,}/g, ' ').trim();

const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'https', hostname: 'api2.sololearn.com' },
      { protocol: 'https', hostname: 'd8it4huxumps7.cloudfront.net' },
      { protocol: 'https', hostname: 'img.shields.io' },
      { protocol: 'https', hostname: 'camo.githubusercontent.com' },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: cspHeader,
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];
  },
};

export default nextConfig;

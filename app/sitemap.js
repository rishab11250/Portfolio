const BASE_URL = 'https://www.itsrishab.xyz';

export default function sitemap() {
  const routes = [
    '',
    '/projects',
    '/skills',
    '/about',
    '/certificates',
    '/contact',
  ];
  const now = new Date().toISOString();

  return routes.map((route, index) => ({
    url: `${BASE_URL}${route}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: index === 0 ? 1.0 : 0.8,
  }));
}

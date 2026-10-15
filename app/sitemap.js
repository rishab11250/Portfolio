const BASE_URL = 'https://www.itsrishab.xyz';

export default function sitemap() {
  return [
    {
      url: `${BASE_URL}/`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
  ];
}

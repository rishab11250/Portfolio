import { projects } from '../data/projects';

const BASE_URL = 'https://www.itsrishab.xyz';

export default function sitemap() {
  const projectEntries = projects.map((p) => ({
    url: `${BASE_URL}/projects/${p.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [
    {
      url: `${BASE_URL}/`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    ...projectEntries,
  ];
}

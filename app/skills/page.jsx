import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Skills & Architecture | Rishab Chandgothia',
  description:
    'Technical skills matrix across frontend engineering, Node.js server runtimes, databases, deployment platforms, and core programming languages.',
  alternates: { canonical: '/skills' },
  openGraph: {
    url: '/skills',
    title: 'Skills & Architecture | Rishab Chandgothia',
    description:
      'Technical skills matrix across frontend engineering, Node.js server runtimes, databases, deployment platforms, and core programming languages.',
  },
};

const skillCategories = [
  {
    id: 'frontend',
    name: 'Frontend',
    tag: 'Client Interface',
    description: 'Modern component systems, responsive layouts, and cross-platform mobile views.',
    skills: [
      {
        name: 'HTML',
        tag: 'Markup Standard',
        scope: 'Semantic document structure, accessibility (ARIA) standards, and SEO-optimized markup.',
        snippet: `<section aria-labelledby="skills-hd">\n  <h2 id="skills-hd">Core Stack</h2>\n  <p>Accessible semantics</p>\n</section>`,
        projects: ['Veltrix', 'Portfolio', 'StudyFlow AI'],
      },
      {
        name: 'CSS',
        tag: 'Styling & Layout',
        scope: 'Responsive designs, CSS Grid, Flexbox, custom design tokens, and fluid animations.',
        snippet: `@theme {\n  --color-ink: #17181c;\n  --color-paper: #f1ece0;\n}\n@media (prefers-reduced-motion) { ... }`,
        projects: ['Portfolio', 'Pixel-Collab', 'Veltrix'],
      },
      {
        name: 'JavaScript',
        tag: 'Client Scripting',
        scope: 'ES6+ standards, DOM manipulation, asynchronous microtask handling, and event delegation.',
        snippet: `const observer = new IntersectionObserver(([entry]) => {\n  if (entry.isIntersecting) reveal(entry.target);\n}, { threshold: 0.2 });`,
        projects: ['Pixel-Collab', 'DataTime Machine', 'Veltrix'],
      },
      {
        name: 'React',
        tag: 'UI Library',
        scope: 'Reusable component architecture, state management with hooks, and virtual DOM diffing.',
        snippet: `const [state, dispatch] = useReducer(appReducer, init);\nuseOptimistic(state, (cur, update) => ({\n  ...cur, ...update\n}));`,
        projects: ['Veltrix', 'Pixel-Collab', 'StudyFlow AI'],
      },
      {
        name: 'Next.js',
        tag: 'Full-Stack Framework',
        scope: 'App Router architecture, React Server Components (RSC), SSR, and static prerendering.',
        snippet: `export const revalidate = 3600;\nexport default async function Page() {\n  const data = await fetchCachedData();\n  return <Feed items={data} />;\n}`,
        projects: ['Portfolio', 'StudyFlow AI'],
      },
      {
        name: 'React Native',
        tag: 'Mobile Development',
        scope: 'Cross-platform mobile UI development, native component primitives, and device styling.',
        snippet: `<SafeAreaView style={styles.container}>\n  <FlatList\n    data={systems}\n    renderItem={({ item }) => <Card {...item} />}\n  />\n</SafeAreaView>`,
        projects: ['Mobile Prototypes', 'Cura Mobile'],
      },
    ],
  },
  {
    id: 'backend',
    name: 'Backend',
    tag: 'Server & APIs',
    description: 'Server runtimes, RESTful routing pipelines, and defensive middleware.',
    skills: [
      {
        name: 'JavaScript',
        tag: 'Server Scripting',
        scope: 'Asynchronous event loops, JSON data pipelines, and modular backend codebases.',
        snippet: `import { pipeline } from 'node:stream/promises';\nawait pipeline(\n  sourceStream,\n  transformFilter,\n  destinationStream\n);`,
        projects: ['DataTime Machine', 'Cura'],
      },
      {
        name: 'Node.js',
        tag: 'Server Runtime',
        scope: 'Non-blocking I/O architecture, stream handling, and scalable backend microservices.',
        snippet: `import http from 'node:http';\nconst server = http.createServer(appHandler);\nserver.listen(port, () => {\n  console.log('Production server online');\n});`,
        projects: ['DataTime Machine', 'Cura', 'StudyFlow AI'],
      },
      {
        name: 'Express.js',
        tag: 'HTTP Framework',
        scope: 'Contract-first REST endpoints, route authentication, custom middleware, and error handling.',
        snippet: `app.use(helmet());\napp.use('/api/v1/auth', authRouter);\napp.use((err, req, res, next) => {\n  res.status(500).json({ error: err.message });\n});`,
        projects: ['Cura', 'DataTime Machine', 'StudyFlow AI'],
      },
    ],
  },
  {
    id: 'databases',
    name: 'Databases',
    tag: 'Data Persistence',
    description: 'Document and relational persistence layers for high-integrity storage.',
    skills: [
      {
        name: 'MongoDB',
        tag: 'NoSQL Document Store',
        scope: 'Document schema design, aggregation pipelines, flexible models, and index optimization.',
        snippet: `await db.collection('orders').aggregate([\n  { $match: { active: true } },\n  { $group: { _id: '$asset', total: { $sum: '$qty' } } },\n  { $sort: { total: -1 } }\n]).toArray();`,
        projects: ['StudyFlow AI', 'Cura', 'AadhaarPulse'],
      },
      {
        name: 'MySQL',
        tag: 'Relational Database',
        scope: 'Relational schema normalization, complex SQL joins, foreign key constraints, and indexing.',
        snippet: `SELECT u.id, u.email, COUNT(p.id) AS project_count\nFROM users u\nINNER JOIN projects p ON u.id = p.user_id\nGROUP BY u.id HAVING project_count > 0;`,
        projects: ['Relational DB Schemas', 'Enterprise Models'],
      },
      {
        name: 'PostgreSQL',
        tag: 'Relational Database',
        scope: 'ACID-compliant transactions, structured relational modeling, data integrity, and queries.',
        snippet: `CREATE INDEX idx_user_metrics ON metrics USING gin (payload);\nSELECT * FROM metrics\nWHERE payload @> '{"status": "verified"}';`,
        projects: ['Enterprise Architecture', 'Data Pipelines'],
      },
    ],
  },
  {
    id: 'deployment',
    name: 'Deployment',
    tag: 'Cloud Infrastructure',
    description: 'Automated CI/CD pipelines, edge networks, and cloud application hosting.',
    skills: [
      {
        name: 'Render',
        tag: 'Cloud Web Services',
        scope: 'Automated container deployments, web service management, persistent databases, and health checks.',
        snippet: `services:\n  - type: web\n    name: api-runtime\n    env: node\n    buildCommand: pnpm build\n    startCommand: pnpm start`,
        projects: ['Cura Backend', 'DataTime Engine'],
      },
      {
        name: 'Vercel',
        tag: 'Edge Deployment',
        scope: 'Zero-config edge hosting, serverless execution, instant previews, and global CDN caching.',
        snippet: `export const config = { runtime: 'edge' };\nexport default async function handler(req) {\n  return new Response(JSON.stringify({ ok: true }));\n}`,
        projects: ['Portfolio', 'StudyFlow AI', 'Veltrix'],
      },
      {
        name: 'Netlify',
        tag: 'Hosting & CDN',
        scope: 'Continuous deployment pipelines, static site distribution, edge redirects, and serverless functions.',
        snippet: `[[redirects]]\n  from = "/api/*"\n  to = "/.netlify/functions/:splat"\n  status = 200`,
        projects: ['Static Demos'],
      },
    ],
  },
  {
    id: 'languages',
    name: 'Programming Languages',
    tag: 'Core Computational Foundations',
    description: 'Algorithmic problem solving, low-level memory control, and application logic.',
    skills: [
      {
        name: 'C',
        tag: 'Systems Language',
        scope: 'Procedural fundamentals, pointer manipulation, memory allocation, and core data structures.',
        snippet: `typedef struct Node {\n    int val;\n    struct Node* next;\n} Node;\nNode* head = (Node*)malloc(sizeof(Node));`,
        projects: ['Sololearn Certified', 'DSA Foundations'],
      },
      {
        name: 'C++',
        tag: 'Object-Oriented Language',
        scope: 'Object-oriented programming, Standard Template Library (STL), and algorithmic efficiency.',
        snippet: `#include <vector>\n#include <algorithm>\nstd::vector<int> v = {4, 1, 8};\nstd::sort(v.begin(), v.end(), std::greater<int>());`,
        projects: ['Sololearn Certified', 'Competitive Algorithms'],
      },
      {
        name: 'JavaScript',
        tag: 'Dynamic Language',
        scope: 'Prototypal inheritance, functional paradigms, closures, and full-stack execution.',
        snippet: `const uniqueTags = [...new Set(projects.flatMap(p => p.skills))];\nconst activeStacks = uniqueTags.filter(Boolean);`,
        projects: ['HackerRank (100% Score)', 'Full-Stack Portfolio'],
      },
    ],
  },
  {
    id: 'tools',
    name: 'Tools',
    tag: 'Developer Utilities & Services',
    description: 'Digital asset management, API development, and endpoint testing.',
    skills: [
      {
        name: 'Cloudinary',
        tag: 'Asset Management',
        scope: 'Cloud media hosting, on-the-fly image transformations, format optimization, and CDN delivery.',
        snippet: `cloudinary.url('portfolio/avatar', {\n  width: 500,\n  crop: 'fill',\n  format: 'auto',\n  quality: 'auto'\n});`,
        projects: ['Portfolio Media', 'Certificates Archive'],
      },
      {
        name: 'Postman',
        tag: 'API Platform',
        scope: 'REST endpoint verification, automated test scripts, mock servers, and environment profiles.',
        snippet: `pm.test("Status code is 200", function () {\n    pm.response.to.have.status(200);\n    pm.expect(pm.response.json().status).to.eql("success");\n});`,
        projects: ['Cura API Suite', 'Auth Verification'],
      },
    ],
  },
];

export default function SkillsPage() {
  return (
    <main id="main-content" className="flex-1 max-w-6xl mx-auto px-4 sm:px-8 py-10 sm:py-16">
      {/* 1. Header Banner */}
      <section className="relative p-6 sm:p-10 mb-10 rounded-3xl bg-paper text-ink border border-ink/20 overflow-hidden">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo/10 text-indigo text-xs font-semibold border border-indigo/20">
            <span className="w-2 h-2 rounded-full bg-indigo" />
            <span>Interactive Technical Matrix • Hover Cards to Inspect Code</span>
          </div>

          <h1 className="font-display font-black text-3xl sm:text-5xl text-ink tracking-tight">
            Skills &amp; Architecture
          </h1>

          <p className="font-body text-mist text-sm sm:text-base leading-relaxed max-w-2xl">
            A comprehensive breakdown of frontend engineering, server backends, database layers, cloud deployment, and programming languages.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-body text-mist">
            <span className="px-2.5 py-1 rounded bg-ink/5 border border-ink/15 font-medium text-ink inline-flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="shrink-0 text-indigo">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
              <span>Hover or tap any skill card to expand idiomatic code snippets and production project references</span>
            </span>
          </div>
        </div>
      </section>

      {/* 2. Category Navigation Quick-Jump Pills */}
      <nav aria-label="Skill Categories Quick Jump" className="mb-12">
        <div className="flex flex-wrap items-center gap-2">
          {skillCategories.map((cat) => (
            <a
              key={cat.id}
              href={`#${cat.id}`}
              className="px-4 py-2 rounded-xl bg-paper border border-ink/20 text-sm font-semibold font-body text-ink hover:border-indigo hover:text-indigo transition-colors cursor-pointer"
            >
              #{cat.name}
            </a>
          ))}
        </div>
      </nav>

      {/* 3. Categorized Interactive Skills Matrix */}
      <div className="space-y-16 mb-16">
        {skillCategories.map((cat, idx) => (
          <section key={cat.id} id={cat.id} className="space-y-6 scroll-mt-24 content-visibility-auto" aria-label={cat.name}>
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between pb-3 gap-2">
              <div className="flex items-center gap-3">
                <span className="font-body text-sm font-semibold text-indigo">
                  Section {idx + 1}
                </span>
                <h2 className="font-display font-bold text-2xl sm:text-3xl text-ink">
                  {cat.name}
                </h2>
                <span className="px-2.5 py-1 rounded bg-ink/5 border border-ink/15 text-xs font-body font-semibold text-mist">
                  {cat.skills.length} Skills
                </span>
              </div>
              <span className="font-body text-sm text-mist font-normal">
                {cat.description}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cat.skills.map((skill) => (
                <article
                  key={`${cat.id}-${skill.name}`}
                  tabIndex={0}
                  className="group relative p-6 rounded-2xl bg-paper border border-ink/20 hover:border-indigo transition-colors duration-200 flex flex-col justify-between cursor-pointer focus:outline-none focus:ring-2 focus:ring-seal"
                >
                  <div>
                    {/* Top Header Strip */}
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-display font-black text-xl text-ink group-hover:text-indigo transition-colors">
                        {skill.name}
                      </h3>
                      <span className="px-2.5 py-1 rounded bg-ink/5 border border-ink/15 font-body text-xs text-mist font-semibold">
                        {skill.tag}
                      </span>
                    </div>

                    {/* Scope description */}
                    <p className="font-body text-sm text-ink/85 leading-relaxed font-normal mb-3">
                      {skill.scope}
                    </p>
                  </div>

                  <div>
                    {/* Hover Prompt Cue */}
                    <div className="pt-3 flex items-center justify-between text-sm font-body text-mist group-hover:text-indigo transition-colors">
                      <span className="inline-flex items-center gap-1 font-semibold">
                        <span>Terminal Inspector</span>
                        <span className="inline-block transition-transform duration-200 group-hover:rotate-90 group-focus-within:rotate-90">
                          &rsaquo;
                        </span>
                      </span>
                      <span className="text-mist font-normal text-xs">Hover or tap</span>
                    </div>

                    {/* Interactive Code & Architecture Drawer (Reveals smoothly on hover & focus) */}
                    <div className="max-h-0 opacity-0 group-hover:max-h-80 group-hover:opacity-100 group-focus-within:max-h-80 group-focus-within:opacity-100 transition-[max-height,opacity] duration-300 ease-[var(--ease-twos)] overflow-hidden">
                      <div data-ui className="mt-3 p-4 rounded-xl bg-ink text-paper text-xs space-y-3 border border-ink">
                        {/* Terminal Window Header */}
                        <div className="flex items-center justify-between border-b border-paper/15 pb-2 text-paper/60 text-xs">
                          <div className="flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-seal inline-block" />
                            <span className="w-2.5 h-2.5 rounded-full bg-glow-gold inline-block" />
                            <span className="w-2.5 h-2.5 rounded-full bg-pine inline-block" />
                          </div>
                          <span className="font-medium text-xs">
                            {skill.name.toLowerCase()}.snippet
                          </span>
                        </div>

                        {/* Code Snippet Box */}
                        <pre className="overflow-x-auto text-paper/90 font-mono text-[13px] leading-relaxed py-1 whitespace-pre selection:bg-seal selection:text-paper">
                          <code>{skill.snippet}</code>
                        </pre>

                        {/* Projects Used In */}
                        <div className="pt-2 flex flex-wrap items-center gap-2 text-xs font-body">
                          <span className="text-paper/60 font-semibold text-xs">
                            Used In:
                          </span>
                          {skill.projects.map((proj) => (
                            <Link
                              key={proj}
                              href="/projects"
                              className="px-2.5 py-1 rounded bg-paper/15 hover:bg-seal text-paper text-xs font-semibold transition-colors"
                            >
                              {proj} ↗
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* 4. Navigation CTA to About */}
      <div className="p-8 rounded-3xl bg-paper border border-ink/20 flex flex-col sm:flex-row items-center justify-between gap-4 font-body">
        <div>
          <span className="text-xs font-semibold text-indigo font-body">Next Section</span>
          <h3 className="font-display font-bold text-xl text-ink">
            Explore Background, Academic Roots &amp; Foundations
          </h3>
        </div>
        <Link
          href="/about"
          className="h-11 px-6 rounded-xl bg-ink text-paper text-sm font-semibold hover:bg-indigo transition-colors flex items-center gap-2 cursor-pointer"
        >
          Open About &rarr;
        </Link>
      </div>
    </main>
  );
}

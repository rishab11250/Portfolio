# Rishab Chandgothia — Portfolio

Full-Stack Developer portfolio built with **Next.js (App Router)**, **React 19**, **Three.js**, and **Framer Motion**. Features interactive 3D elements, dynamic project case studies, and a dedicated dark cyberpunk aesthetic.

- **Live URL**: [https://www.itsrishab.xyz/](https://www.itsrishab.xyz/)
- **Vercel Deployment**: Configured with Next.js App Router preset

---

## Tech Stack

- **Framework**: Next.js 16 (App Router, JavaScript)
- **UI Library**: React 19
- **Styling**: CSS Custom Properties (dedicated cyberpunk dark theme with glassmorphism)
- **3D Graphics**: Three.js, React Three Fiber (lazy-loaded dynamically with `ssr: false`)
- **Animations**: Framer Motion
- **Tour**: Driver.js (8 guided steps)
- **Analytics**: `@vercel/analytics`, `@vercel/speed-insights`
- **Contact**: EmailJS with honeypot spam protection and client-side cooldown

---

## Features

- **Dynamic Case Studies**: Static routes generated at `/projects/[slug]` with dedicated metadata and Open Graph images.
- **Unified SEO & Security**: Content Security Policy (CSP) with standard Next.js bootstrap script allowances, automated `robots.js`, and dynamic `sitemap.js` containing all project URLs generated from the canonical domain `https://www.itsrishab.xyz/`.
- **Honeypot & Rate-Limited Contact**: Contact form with honeypot field and 30-second client-side cooldown.
- **Session-Aware Loader**: Intro starfield displays once per session via `sessionStorage` with instant `SKIP [ESC]` shortcut; crawlers receive full static HTML immediately.
- **Interactive 3D**: `SciFiTerrain` horizon mesh and `HoloGlobe` tech globe with interactive controls and lazy-loaded WebGL canvas.

---

## Measured Performance & Metrics

### Mobile Lighthouse Audit (Measured Locally on Production Build)

| Category | Score |
|---|---|
| **SEO** | 100 / 100 |
| **Best Practices** | 96 / 100 |
| **Accessibility** | 91 / 100 |
| **Performance** | 64 / 100 (mobile emulation, includes 3D canvas initialization) |

### Bundle & Payload Comparison

| Metric | Vite Build | Next.js App Router Build |
|---|---|---|
| **HTML Rendering** | Client-only (empty `<div id="root">`) | Pre-rendered Static HTML (SSG) across all routes |
| **Initial Client JS** | ~143 kB gzipped | ~265 kB gzipped (sum of initial scripts referenced in HTML) |
| **Three.js / 3D Chunk** | 718.6 kB raw (186.7 kB gzip) | 854.6 kB raw (228.8 kB gzip) lazy-loaded via `next/dynamic` |
| **Static Pages** | 1 (`index.html`) | 15 pre-rendered static routes (Home, Not Found, 7 Case Studies, Robots, Sitemap, Icon, OG Image) |

> **Architecture Trade-off**: Next.js App Router increases the initial hydration bundle from ~143 kB to ~265 kB gzipped due to the framework runtime and router. In exchange, every route receives full pre-rendered HTML on the initial response, enabling instant search engine indexability, rich crawler previews, and dedicated static case study pages.

---

## Getting Started

### Prerequisites

- Node.js 18+ (Node 20+ recommended)
- `pnpm` (or `npm`)

### Installation

```bash
# Clone the repository
git clone https://github.com/rishab11250/Portfolio.git
cd Portfolio

# Install dependencies
pnpm install

# Configure environment variables
cp .env.example .env
```

### Environment Variables

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_EMAIL_SERVICE_ID` | EmailJS Service ID |
| `NEXT_PUBLIC_EMAIL_TEMPLATE_ID` | EmailJS Template ID |
| `NEXT_PUBLIC_EMAIL_PUBLIC_KEY` | EmailJS Public API Key |

> **Note**: For production deployments, ensure the canonical domain `https://www.itsrishab.xyz` is added to the allowed origins list in your [EmailJS Dashboard](https://dashboard.emailjs.com/).

### Running Locally

```bash
# Start development server
pnpm run dev

# Run ESLint check
pnpm run lint

# Build for production
pnpm run build

# Start production server
pnpm run start
```

---

## Deployment & Vercel Settings

When deploying to Vercel:
1. Ensure the **Framework Preset** is set to **Next.js** (auto-detected).
2. Set Environment Variables in Project Settings (`NEXT_PUBLIC_EMAIL_*`).
3. Custom Domain is mapped to `www.itsrishab.xyz` with 308 redirect from apex `itsrishab.xyz`.

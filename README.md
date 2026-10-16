# Rishab Chandgothia — Portfolio

Full-Stack Developer portfolio engineered with **Next.js 16 (App Router)**, **React 19**, **Tailwind CSS v4**, and **Framer Motion**. Designed with the **"Mist & Indigo"** paper-and-ink aesthetic: warm paper surfaces, black-ink typography, indigo print duotones, vermilion seal accents, and anime-style stepping animation.

- **Live URL**: [https://www.itsrishab.xyz/](https://www.itsrishab.xyz/)
- **Vercel Deployment**: Pre-rendered static Next.js App Router export

---

## Design System: "Mist & Indigo"

The portfolio follows a paper-and-ink visual language paired with anime-style light and timing:

* **Color Palette**:
  * **Paper** (`#F1ECE0`): Warm washi-style paper background with subtle procedural turbulence grain (`opacity: 0.05`).
  * **Ink** (`#17181C`): Deep sumi black for high-contrast typography (15.5:1 contrast ratio, WCAG AAA).
  * **Indigo** (`#1E3A5F`): Traditional blue-black dye for print imagery and interactive highlights (9.8:1 contrast ratio).
  * **Prussian Sky** (`#0B2545`): Deep twilight navy for the footer skyline.
  * **Vermilion Seal** (`#C91F37`): Traditional red ink stamp ("RC") brand mark and button accents.
  * **Mist** (`#5E636D`): Neutral graphite tone for secondary captions and metadata (5.1:1 contrast ratio).
* **Typography**:
  * **Headings**: `Zen_Old_Mincho` (weights 700 and 900, Latin subset only).
  * **Body / UI**: `Zen_Kaku_Gothic_New` (weights 400 and 500, Latin subset only).
* **Motion & Timing**:
  * Stepping easings (`--ease-twos: steps(4)`, `--ease-threes: steps(6)`).
  * Full accessibility fallback via `prefers-reduced-motion` (instant reveal, zero forced motion).
* **Language**:
  * Plain English exclusively across all UI copy, navigation labels, alt text, and metadata.

---

## Architecture & Pages

The application is structured into 6 focused pages using Next.js App Router and React Server Components (RSC):

1. **Home (`/`)**:
   * Traditional ink landscape aesthetic with pointer-tracked ink mask revealing distant ridge, mid ridge, and pine artwork layers.
   * Asymmetrical layout featuring verified engineering summary, resume links, and navigation cards to all core pages.
   * Prerendered as a pure React Server Component (zero client-side JS for the page body).
2. **Projects (`/projects`)**:
   * 6 production systems detailed with architecture summaries, tech stacks, and live links (Veltrix, DataTime Machine, Pixel-Collab, AadhaarPulse, StudyFlow AI, Cura).
   * Verified competitive hackathon podiums (IIIT Surat, LNMIIT Jaipur, OceanLab Charusat).
   * Isolated client island modal (`ProjectDialog.jsx`) synced with URL hash (`#<slug>`).
3. **Skills (`/skills`)**:
   * Categorized technical matrix covering Frontend Engineering, Backend & Systems, Databases & AI Integration, and Deployment & Tooling.
   * Real, practical scopes without gameified stats or unmeasured benchmarks.
   * Pure React Server Component.
4. **About (`/about`)**:
   * Academic record at Parul University (AIML, 9.14 & 8.04 SGPA), engineering philosophy, and deckled-frame portrait.
   * Pure React Server Component.
5. **Certificates (`/certificates`)**:
   * Clean contact-sheet archive of verified credentials, including HackerRank (100% Score) and course completions.
   * Pure React Server Component.
6. **Contact (`/contact`)**:
   * Letter stationery layout with direct email, LinkedIn, GitHub, and phone channels.
   * EmailJS form dispatch with honeypot spam protection, 30s cooldown timer, and vermilion seal stamp confirmation.

---

## Measured Performance & Bundle Metrics

Measurements conducted against the production static build (`pnpm run build` and `pnpm run measure`):

| Metric | Previous Architecture | Redesign (Multi-Page Server Components) | Impact |
|---|---|---|---|
| **Runtime 3D / WebGL** | Three.js + React Three Fiber (~854 kB raw) | None (Tailwind CSS + vector SVGs) | **-100% 3D overhead** |
| **Component Architecture** | 100% Client Components (`"use client"`) | Server Components with 5 isolated client islands | **Eliminated page JS execution** |
| **Initial Client JS** | ~265.0 kB gzipped | **192.1 kB gzipped** | **-27.5% reduction** |
| **Pages** | Single-page monolithic scroll | 6 dedicated pages (`/`, `/projects`, `/skills`, `/about`, `/certificates`, `/contact`) | Deep URLs, clean navigation |
| **Typography & Sizing** | Inconsistent sub-10px text | 12px minimum font size (`text-xs`) everywhere | Legible across all mobile devices |
| **Color System** | Hard-coded arbitrary hexes | System design tokens (`bg-paper`, `text-ink`, `text-seal`, etc.) | Verified contrast ratios |

---

## Tech Stack

* **Framework**: Next.js 16.4 (App Router, Turbopack, JavaScript)
* **UI & Styling**: React 19, Tailwind CSS v4, PostCSS
* **Animation**: Framer Motion (LazyMotion, scroll transforms, reduced-motion fallbacks)
* **Email Service**: `@emailjs/browser`
* **Analytics**: `@vercel/analytics`, `@vercel/speed-insights`
* **Linter**: ESLint 9 (`components`, `data`, `app`, `scripts`, `lib`)

---

## Local Development

### Prerequisites

* Node.js 20+
* `pnpm`

### Setup

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

### Commands

```bash
# Run local development server
pnpm run dev

# Run ESLint validation across all source folders
pnpm run lint

# Verify 72 microseasons calendar mapping (365 days, 0 gaps, 0 overlaps)
pnpm run check:seasons

# Measure exact client JS bundle sizes
pnpm run measure

# Build production static export
pnpm run build

# Start production server
pnpm run start
```

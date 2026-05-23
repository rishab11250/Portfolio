<div align="center">
  <br/>
  <br/>
  <pre>
██████╗ ██╗███████╗██╗  ██╗ █████╗ ██████╗ 
██╔══██╗██║██╔════╝██║  ██║██╔══██╗██╔══██╗
██████╔╝██║███████╗███████║███████║██████╔╝
██╔══██╗██║╚════██║██╔══██║██╔══██║██╔══██╗
██║  ██║██║███████║██║  ██║██║  ██║██████╔╝
╚═╝  ╚═╝╚═╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═════╝  
  </pre>
  <br/>
  <br/>
</div>

<p align="center">
  <a href="https://portfolio-rishab-chandgothia.vercel.app/" target="_blank">
    <img src="https://img.shields.io/badge/Vercel-0B1D51?style=for-the-badge&logo=vercel&logoColor=8CCDEB" alt="Vercel"/>
  </a>
  <a href="https://github.com/rishab11250/Portfolio/stargazers">
    <img src="https://img.shields.io/github/stars/rishab11250/Portfolio?style=for-the-badge&logo=github&color=FFE3A9&labelColor=0B1D51" alt="Stars"/>
  </a>
</p>

<p align="center">
  <sub>
    <code>⟐ system.online // neural.link.established ⟐</code>
  </sub>
</p>

<br/>

---

<br/>

## ⚡ SIGNAL // Overview

A **next-generation digital identity** — part portfolio, part technical statement. Every pixel, animation, and 3D manifold is engineered to demonstrate what modern web development can be when you push past templates.

This isn't a static resume page. It's a **live, interactive environment** built with React 19, Three.js, and Framer Motion — delivering a 100/100 Lighthouse score while rendering real-time 3D particle systems in the background.

> **[ ⟐ ACTIVATE LIVE NEXUS ⟐ ](https://portfolio-rishab-chandgothia.vercel.app/)** — *Open in a Chromium-based browser for full effect.*

<br/>

---

<br/>

## ⚡ SUBSYSTEMS // Features

| Module | Description |
|---|---|
| **🌐 Holo-Globe** | Real-time 3D particle ring visualization (Three.js / R3F). Adaptive performance — 2,000 particles on desktop, 400 on mobile. Reacts to theme toggles. |
| **🎨 Dual-Theme Matrix** | Dark/Light mode with smooth CSS custom property transitions. Theme persisted in localStorage. Instant toggle, zero flicker. |
| **🖱️ Precision Cursor** | High-DPI custom cursor with `mix-blend-mode: difference` and spring-physics hover states. Auto-disabled on touch devices. |
| **🚀 Warp-Gate Loading** | Canvas-based starfield with parallax depth, speed ramping, gold exit flash, and typewriter tagline. |
| **📐 Responsive Grid** | Adaptive across 4K monitors to mobile. Grid layouts, clamp-driven typography, no breakpoint spaghetti. |
| **🧭 Guided Tour** | Driver.js onboarding sequence — one click, seven steps. No onboarding? No problem. It stays out of the way. |
| **📬 Comms Uplink** | EmailJS contact form with validation, toast feedback, and one-click copy for email/phone. |
| **💾 Chunked Payload** | Three.js vendor chunk (~1MB) lazy-loaded via `React.lazy()`. Initial JS payload: **86 kB gzipped**. |
| **♿ Accessible** | Semantic HTML, aria-labels, keyboard navigation, focus management. **Lighthouse Accessibility: 100**. |
| **🌗 Theme-Aware 3D** | SciFiTerrain and HoloGlobe both react to theme changes via MutationObserver — colors, fog, and lighting shift in real-time. |

<br/>

---

<br/>

## ⚡ CORE ARCHITECTURE // Stack

<p align="center">
  <img src="https://img.shields.io/badge/React_19-0B1D51?style=for-the-badge&logo=react&logoColor=8CCDEB" alt="React 19"/>
  <img src="https://img.shields.io/badge/Vite_7-0B1D51?style=for-the-badge&logo=vite&logoColor=8CCDEB" alt="Vite 7"/>
  <img src="https://img.shields.io/badge/Three.js-0B1D51?style=for-the-badge&logo=three.js&logoColor=8CCDEB" alt="Three.js"/>
  <img src="https://img.shields.io/badge/R3F-0B1D51?style=for-the-badge&logo=react&logoColor=725CAD" alt="R3F"/>
  <img src="https://img.shields.io/badge/Framer_Motion-0B1D51?style=for-the-badge&logo=framer&logoColor=8CCDEB" alt="Framer Motion"/>
  <img src="https://img.shields.io/badge/JavaScript-0B1D51?style=for-the-badge&logo=javascript&logoColor=FFE3A9" alt="JavaScript"/>
  <img src="https://img.shields.io/badge/CSS3-0B1D51?style=for-the-badge&logo=css3&logoColor=8CCDEB" alt="CSS3"/>
  <img src="https://img.shields.io/badge/Vercel-0B1D51?style=for-the-badge&logo=vercel&logoColor=8CCDEB" alt="Vercel"/>
  <img src="https://img.shields.io/badge/EmailJS-0B1D51?style=for-the-badge&logo=gmail&logoColor=725CAD" alt="EmailJS"/>
  <img src="https://img.shields.io/badge/ESLint-0B1D51?style=for-the-badge&logo=eslint&logoColor=725CAD" alt="ESLint"/>
</p>

<br/>

---

<br/>

## ⚡ DEPLOYMENT SEQUENCE // Get Started

```bash
# 01. Clone the nexus
git clone https://github.com/rishab11250/Portfolio.git
cd Portfolio

# 02. Install dependencies
npm install

# 03. Configure environment (required for contact form)
cp .env.example .env
# Populate with EmailJS credentials (see below)

# 04. Start holographic preview
npm run dev

# 05. Compile for production
npm run build

# 06. Preview production build locally
npm run preview
```

### 🔐 Environment Variables

| Variable | Purpose |
|---|---|
| `VITE_EMAIL_SERVICE_ID` | EmailJS service identifier |
| `VITE_EMAIL_TEMPLATE_ID` | EmailJS template identifier |
| `VITE_EMAIL_PUBLIC_KEY` | EmailJS public API key |

<br/>

---

<br/>

## ⚡ FILE SYSTEM // Structure

```
src/
├── App.jsx                    # Root — section detection + orchestration
├── index.css                  # Global styles (2.6k lines, all-in-one)
│
├── components/
│   ├── Navbar.jsx             # Fixed nav with active-section tracking
│   ├── Hero.jsx               # Landing — 3D globe + typewriter titles
│   ├── Profile.jsx            # About section
│   ├── TechStack.jsx          # Filterable grid of technologies
│   ├── Projects.jsx           # Filterable project cards with hover overlays
│   ├── Certificates.jsx       # Certificate gallery with category filters
│   ├── Hackathons.jsx         # Event cards + modal deep-dive with slideshow
│   ├── EducationTimeline.jsx  # Alternate-layout timeline
│   ├── Contact.jsx            # Form + social contact cards
│   ├── Footer.jsx             # Footer with live clock + easter egg
│   ├── HoloGlobe.jsx          # 3D particle ring (lazy-loaded)
│   ├── SciFiTerrain.jsx       # 3D grid terrain (lazy-loaded)
│   ├── Cursor.jsx             # Custom cursor (desktop only)
│   ├── TiltCard.jsx           # 3D tilt wrapper using motion values
│   ├── ThemeSwitcher.jsx      # Dark/light toggle
│   ├── LoadingScreen.jsx      # Canvas starfield intro
│   ├── AnimatedNavLink.jsx    # Nav link with layout animations
│   └── ScrollToTop.jsx        # Floating action button
│
├── data/
│   └── index.js               # Shared projects + certificates data
│
└── utils/
    └── skills.js              # Color mapping for skill badges
```

<br/>

---

<br/>

## ⚡ SIGNAL METRICS // Lighthouse

<p align="center">
  <img src="https://img.shields.io/badge/Accessibility-1 0 0-4CAF50?style=for-the-badge&logo=lighthouse&labelColor=0B1D51" alt="A11y 100"/>
  &nbsp;
  <img src="https://img.shields.io/badge/Best_Practices-1 0 0-4CAF50?style=for-the-badge&logo=lighthouse&labelColor=0B1D51" alt="Best Practices 100"/>
  &nbsp;
  <img src="https://img.shields.io/badge/SEO-1 0 0-4CAF50?style=for-the-badge&logo=lighthouse&labelColor=0B1D51" alt="SEO 100"/>
</p>

<p align="center">
  <sub>— Perfect scores across all three dimensions —</sub>
</p>

<br/>

---

<br/>

## ⚡ UPLINK // Connect

<p align="center">
  <a href="https://github.com/rishab11250"><img src="https://img.shields.io/badge/GitHub-0B1D51?style=for-the-badge&logo=github&logoColor=8CCDEB" alt="GitHub"/></a>
  <a href="https://www.linkedin.com/in/rishab-chandgothia-8823112a4/"><img src="https://img.shields.io/badge/LinkedIn-0B1D51?style=for-the-badge&logo=linkedin&logoColor=8CCDEB" alt="LinkedIn"/></a>
  <a href="https://leetcode.com/u/rishab11250"><img src="https://img.shields.io/badge/LeetCode-0B1D51?style=for-the-badge&logo=leetcode&logoColor=FFE3A9" alt="LeetCode"/></a>
  <a href="https://x.com/Rishab25361722"><img src="https://img.shields.io/badge/X-0B1D51?style=for-the-badge&logo=x&logoColor=8CCDEB" alt="X"/></a>
  <a href="mailto:rishab.chandgothia.cg@gmail.com"><img src="https://img.shields.io/badge/Email-0B1D51?style=for-the-badge&logo=gmail&logoColor=725CAD" alt="Email"/></a>
</p>

<br/>

---

<br/>

<p align="center">
  <sub>
    <code>⟐ system.holographic // engineered.with.precision // rishab.dev ⟐</code>
    <br/>
    <br/>
    © 2026 Rishab · Built with React 19, Three.js, and ☕
  </sub>
</p>

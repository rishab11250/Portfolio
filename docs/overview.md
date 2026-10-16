# Multi-Aesthetic Portfolio Architecture

## Executive Concept
Transform the portfolio from a uniform template into a 6-world digital exhibition. Each page is a distinct aesthetic reality while maintaining unified navigation, performance benchmarks, and seasonal atmosphere.

---

## 1. Aesthetic Matrix

| Route | Aesthetic World | Core Visual Metaphor | Bespoke Pointer / Cursor | Key Technical Primitives |
|---|---|---|---|---|
| `/` | **Sumi-e Mist Sanctuary** | Living Japanese ink landscape & drifting mist | **Sumi-e Ink Droplet (`fude`)** with fluid water-wash ring | Radial mask pointer reveal, lerp physics, translucent washi cards, opposing mist ribbons, seasonal wind |
| `/skills` | **8/16-Bit Pixel Realm** | Retro game terminal & animated pixel waterfall | **8-Bit Pixel Gauntlet / Sword** (`image-rendering: pixelated`) | 60fps Canvas pixel waterfall (droplets + foam), NES hard-shadow window chrome, `Press Start 2P` font, scanline overlay |
| `/projects` | **Shonen Manga / Anime** | Explosive comic spread & action panels | **Manga G-Pen Nib (`G-ペン`)** with speed-crosshair | Asymmetric CSS manga grid, halftone SVG dot pattern, speed lines SVG, cel-shading filter, `Dela Gothic One` |
| `/about` | **Cybernetic Blueprint Dossier** | Mecha schematic & engineering spec | **Tactical HUD Reticle** with live `[X:### Y:###]` telemetry | Architectural millimeter grid, technical crosshairs, live coordinate telemetry, schematic timeline |
| `/certificates` | **Arcade Trophy Vault** | High-score hall of credentials | **Insert-Coin Crosshair** with gold coin shimmer | CRT scanlines, pixel brass/gold badges, 3D trophy medal flip, arcade cabinet leaderboard cards |
| `/contact` | **Letterpress / Stationery Desk** | Physical correspondence & red wax seal | **Brass Fountain Pen Nib** with wax seal bead | Textured stationery card, interactive wax seal press, ink spill ripple animation, typewriter focus |

> Full master specification for all per-page pointers and motion choreography is detailed in [Pointers & Animations Guide](pointers-and-animations.md).

---

## 2. Technical Scoping Strategy (Next.js App Router + Tailwind v4)

### A. Zero Global Style Pollution
Every page tags its root container with `data-page="<aesthetic-id>"`:
```html
<main id="main-content" data-page="pixel" class="min-h-screen ...">
```
Styles in `app/globals.css` are scoped via attribute selector:
```css
[data-page="pixel"] {
  /* Scoped CSS variables, typography, and borders */
}
[data-page="manga"] {
  /* Scoped halftone background and ink borders */
}
```

### B. Font Scoping via `next/font/google`
Page-specific fonts are loaded exclusively within per-page `layout.jsx` files. Next.js App Router self-hosts these at build time, adhering strictly to CSP (`font-src 'self' data:`):
- `/skills/layout.jsx` → loads `Press_Start_2P`
- `/projects/layout.jsx` → loads `Dela_Gothic_One`
- Root layout retains `Zen_Old_Mincho` and `Zen_Kaku_Gothic_New`.

### C. Animation Engine
- **No `framer-motion`**: 0kB client bundle overhead.
- **Canvas API (RAF)**: Pixel waterfall running at 60fps with lightweight GPU paint (~0.1ms/frame).
- **CSS Keyframes + `@starting-style`**: Stepped animation (`steps(4)`) for retro feels, smooth spring bezier for ink/parchment.
- **Client boundaries**: Kept strictly at leaf nodes (`PixelWaterfall.jsx`, `ContactForm.jsx`). All page data renders via Server Components.

---

## 3. Implementation Roadmap
1. `docs/pages/home.md` — Sumi-e landscape expansion
2. `docs/pages/skills.md` — Pixel realm + Waterfall canvas
3. `docs/pages/projects.md` — Shonen manga panels
4. `docs/pages/about.md` — Mecha blueprint dossier
5. `docs/pages/certificates.md` — Arcade trophy vault
6. `docs/pages/contact.md` — Letterpress stationery desk
remove
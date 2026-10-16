# Page Spec: Home (`/`) — Sumi-e Mist Sanctuary

## 1. Aesthetic Direction
- **Atmosphere**: Traditional Japanese ink wash painting (*suibokuga*) permeating every viewport pixel.
- **Requirement**: Scenery must NOT be confined to the hero header. The ink mountains, drifting mist strips, and pine silhouettes must span the entire scroll length from hero to footer.
- **Color Palette**:
  - Paper: `#F1ECE0`
  - Deep Ink: `#17181C`
  - Pine Needle: `#2D5A27`
  - Seal Vermilion: `#C91F37`
  - Indigo Wash: `#1E3A5F`
  - Mountain Mist: `#5E636D`

---

## 2. Full-Page Scenery Architecture

### A. Persistent Background Ink Panorama (`FullPageInkScenery.jsx`)
- Fixed/absolute multi-layered landscape spanning `100%` height of `/`:
  - **Top layer (Hero)**: Distant peaks (`ridge-back.svg`) with pointer-reveal ink wash.
  - **Mid-scroll layer (Content/Cards)**: Drifting mist bands (`mist.svg`) floating between section breaks, with semi-transparent pine tree groupings (`pines.svg`) emerging along the flanks.
  - **Bottom layer (Footer/Outro)**: Deep foreground mountain ridges (`ridge-front.svg`) rising up behind the footer and section navigation, grounding the page in solid ink.

### B. Translucent Washi Bento Cards
- Bento grid cards use translucent washi glass (`rgba(..., 0.70)` to `0.74` with `backdrop-blur-[2px]`) so the majestic ink mountain ridges, pine tree groupings, and drifting mist ribbons are clearly visible directly beneath the cards.
- Interactive 3D micro-tilt on mouse hover (`transform: perspective(1000px) scale3d(1.01, 1.01, 1.01)`) with smooth GPU-accelerated transition.

### C. Atmospheric Mist Ribbons
- Dual-opposing mist ribbons: Primary mist band drifting at 28s (`mistDrift`) and secondary opposing ribbon at 38s (`mistDriftReverse`) for organic spatial depth.
- Filter hue-rotation synchronized to active season (vernal bloom pink, bamboo teal, harvest amber, crystalline frost blue).

### D. Fluid Inertial Pointer Physics
- Radial ink wash mask (`WebkitMaskImage: radial-gradient(...)`) tracks cursor using RAF spring lerp (`current += (target - current) * 0.12`), producing a silky, natural ink-flow diffusion across the canvas.

### E. Bespoke Sumi-e Cursor (`CustomCursor.jsx`)
- Deep ink droplet core (`#17181C`) surrounded by an expanding water-wash capillary halo that radiates outward on mouse click and expands over interactive buttons.

---

## 3. Technical Specs
- **Page Container**: `<div data-page="sumie" className="relative h-[calc(100dvh-4.25rem)] overflow-hidden">`
- **Background Component**: Embedded in `components/sumie/BentoGridHome.jsx`
- **Pointer System**: `components/CustomCursor.jsx` (smooth RAF physics, auto-adapting per route)
- **Typography**: `Zen Old Mincho` (display) + `Zen Kaku Gothic New` (body)
- **Asset Dependencies**: `/public/ink/ridge-*.svg`, `/public/ink/mist.svg`, `/public/ink/pines.svg`.

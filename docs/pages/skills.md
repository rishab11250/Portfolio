# Page Spec: Skills (`/skills`) — 16-Bit Pixel Realm & Waterfall

## 1. Aesthetic Direction
- **Atmosphere**: 90s retro RPG / NES cartridge game interface.
- **Core Attraction**: Real-time **animated pixel art waterfall** cascading behind a rocky pixelated shrine of technical skills.
- **Color Palette**:
  - Sky/Navy: `#0d1322`
  - NES Surface: `#162036`
  - Water Cyan: `#a8d8f0` / `#5ab4e8` / `#1e6fa8`
  - Pixel Gold: `#ffd700`
  - Health/Seal Red: `#e63946`
  - Border Black: `#080c14`

---

## 2. Key Visual & Interactive Features

### A. Animated Canvas Pixel Waterfall (`PixelWaterfall.jsx`)
- **Render Engine**: Canvas API with `requestAnimationFrame`.
- **Dimensions**: Logical grid of `80 × 140` pixels scaled up 4× via CSS `image-rendering: pixelated;`.
- **Physics**:
  - 80 vertical pixel columns with randomized downward droplet velocities (0.8px – 2.2px / frame).
  - Foam splash particles generated at the bottom pool boundary with horizontal dissipation.
  - Multi-tone shading (white highlight, cyan crest, dark-blue depth, foaming froth).
- **Reduced Motion Support**: If `prefers-reduced-motion` matches, renders a crisp static pixel-art snapshot.

### B. NES Hard-Border Windows & Dialogue Boxes
- All skill cards and dialog boxes use pure CSS 4px-stepped borders (no rounded corners, no soft drop-shadows):
```css
.nes-window {
  border: 4px solid #080c14;
  box-shadow: 
    -4px 0 0 0 #080c14,
     4px 0 0 0 #080c14,
     0 -4px 0 0 #080c14,
     0  4px 0 0 #080c14,
     inset 4px 4px 0 0 #ffffff22,
     inset -4px -4px 0 0 #00000066;
  image-rendering: pixelated;
}
```

### C. CRT Scanlines & CRT Power-On Flicker
- Subtle repeating CSS scanline overlay (`repeating-linear-gradient` with 2px line interval).
- Slight pixel phosphor glow effect on category tab selection.

### D. 8-Bit Interactive Skill Inspection
- Hovering or selecting a skill triggers an 8-bit sound prompt cue (visual-only pulse) and reveals:
  - Pixelated HP/MP-style proficiency bars (`[████████░░] 80%`).
  - Monospace code snippet styled like an in-game inventory item inspect screen.
  - Pixel quest links pointing to related projects.

---

## 3. Technical Specs
- **Font**: `Press Start 2P` imported via `next/font/google` in `app/skills/layout.jsx`.
- **Base Typography Rules**:
  - Font size: `8px` to `10px` with `line-height: 2` (due to Press Start 2P glyph dimensions).
  - Headings: `14px` to `18px` with hard 2px/4px black drop-shadows.
- **Client Boundaries**:
  - `components/pixel/PixelWaterfall.jsx` (`'use client'`)
  - `components/pixel/PixelSkillsClient.jsx` (`'use client'` for interactive card inspection)
- **Data Page Attribute**: `data-page="pixel"`

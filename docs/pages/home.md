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

### B. Translucent Paper Scroll Cards
- Navigation and content cards use semi-translucent washi glass (`bg-paper/75 backdrop-blur-xs` or `bg-paper/85`) so the mountain ridges and mist drift visibly underneath the cards as the user scrolls.

### C. Atmospheric Mist Ribbons
- Horizontal SVG mist strips positioned at multiple vertical intervals (`top: 30%`, `top: 60%`, `top: 85%`) with staggered alternate drift speeds (`20s`, `35s`, `50s`).
- Drifting seasonal particles (petals/leaves) caught in the mist currents.

### D. Natural Brush Transition Dividers
- Sumi-e brush stroke dividers between sections acting as organic horizon lines separating content tiers.

### E. Sumi-e Cascading Ink Waterfall (`InkWaterfall.jsx`)
- Cascading ink-wash waterfall streaming down from the upper mountain ridge layer into the mid-page content basin.
- Animated vertical brush streaks and water spray mist using lightweight SVG strokes and drifting mist billows.
- Acts as a visual conduit guiding the eye from the Hero down into the portfolio sections.

---

## 3. Technical Specs
- **Page Container**: `<div data-page="sumie" className="relative min-h-screen overflow-hidden">`
- **Background Component**: `components/sumie/FullPageInkLandscape.jsx`
- **Typography**: `Zen Old Mincho` (display) + `Zen Kaku Gothic New` (body)
- **Asset Dependencies**: `/public/ink/ridge-*.svg`, `/public/ink/mist.svg`, `/public/ink/pines.svg`, `/public/ink/ink-landscape.svg`.

# Page Spec: Projects (`/projects`) — Shonen Manga Action Spread

## 1. Aesthetic Direction
- **Atmosphere**: Modern anime / Shonen manga panel spread (e.g., Jujutsu Kaisen / Chainsaw Man / Mob Psycho 100 chapter covers).
- **Core Attraction**: Asymmetric comic panel layouts, dynamic speed lines, SVG screentone halftones, bold ink outlines, and cel-shaded project showcase artwork.
- **Color Palette**:
  - Manga Stark White: `#FAFAFA`
  - Heavy Sumi Black: `#0A0A0A`
  - Action Vermilion: `#E63946`
  - Comic Yellow Burst: `#FFD000`
  - Gutter Gray: `#18181B`

---

## 2. Key Visual & Interactive Features

### A. Screentone Halftone Dot Texture
- Pure SVG data URI tile patterned across the background (avoiding CSS radial-gradient lint flags):
```css
[data-page="manga"] {
  background-color: #FAFAFA;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8'%3E%3Ccircle cx='4' cy='4' r='1.2' fill='%23000' fill-opacity='0.08'/%3E%3C/svg%3E");
  background-size: 8px 8px;
}
```

### B. Dynamic Speed Lines Backdrop (`SpeedLines.jsx`)
- Lightweight inline SVG vector radiating outward behind the featured project / page title.
- High impact without runtime JavaScript overhead.

### C. Asymmetric Manga Panel Grid
- Projects organized into graphic novel panel rows:
  - Hero project spans 2 columns with bold diagonal clip-path accent or overlapping badge.
  - Black gutter borders (`4px` gap over `#0A0A0A` frame container).
  - Japanese manga sound-effect (`katakana`) badges floating on hover:
    - *GO-GO-GO* (ゴゴゴ) for AI/Complex projects
    - *DODODO* (ドドド) for full-stack high-speed platforms
    - *BAM* (ドォン) for hackathon champions

### D. Cel-Shaded Artwork Filters
- Images filtered using CSS filters for vibrant comic book reproduction:
```css
[data-page="manga"] .manga-thumb img {
  filter: saturate(1.4) contrast(1.25);
  border: 3px solid #0A0A0A;
}
```

### E. Tactile Comic Book Hover Interactions
- Stepped snappy hover lifts (`transform: translate(-3px, -3px); box-shadow: 6px 6px 0 #0A0A0A; transition: steps(2) 120ms;`).
- Chapter banner headings (`CHAPTER 01: PRODUCTION BUILDS`, `CHAPTER 02: HACKATHON GLORY`).

---

## 3. Technical Specs
- **Font**: `Dela Gothic One` (or `Zen Antique Soft`) loaded via `app/projects/layout.jsx` for heavy shonen headings.
- **Data Page Attribute**: `data-page="manga"`
- **Components**:
  - `components/manga/SpeedLines.jsx` (Server Component SVG)
  - `components/manga/MangaProjectCard.jsx` (Server Component with CSS hover states)
  - `components/ProjectDialog.jsx` (Client Component modal with comic speech bubble styling)

# Page Spec: About (`/about`) — Mecha Blueprint & Engineering Dossier

## 1. Aesthetic Direction
- **Atmosphere**: Cybernetic / Mecha engineering blueprint and classified developer dossier (Evangelion / Ghost in the Shell / Armored Core UI).
- **Core Attraction**: Precise technical grid lines, architectural crosshairs, coordinate stamps, monospaced telemetry, and a clean schematic timeline of academic & engineering roots.
- **Color Palette**:
  - Blueprint Navy / Dark Slate: `#0B1320`
  - Blueprint Cyan Accent: `#00F0FF`
  - Grid Line Rule: `#172A45`
  - Warning Orange / Red: `#FF3E3E`
  - Data White / Gray: `#E0E6ED` / `#7B8C9E`

---

## 2. Key Visual & Interactive Features

### A. Architectural Coordinate Grid
- SVG isometric or Cartesian millimeter blueprint background:
```css
[data-page="blueprint"] {
  background-color: #080E18;
  background-image: 
    linear-gradient(to right, #112035 1px, transparent 1px),
    linear-gradient(to bottom, #112035 1px, transparent 1px);
  background-size: 24px 24px;
}
```

### B. Engineering Dossier Cards & Corner Crosshairs
- All cards framed with technical corner brackets (`+` crosshairs or 45-degree chamfered corners via CSS `clip-path`).
- Technical metadata stamps at header boundaries:
  - `SYS.VER: 2026.4`
  - `LOC: 26.9124° N, 75.7873° E [JAIPUR]`
  - `SPEC: FULL-STACK / ARCHITECTURE`

### C. Mecha Diagnostic Radar & Skill Telemetry
- Visual telemetry bars showing system operational parameters (Problem Solving, Systems Design, Algorithmic Thinking).
- Interactive timeline presented as an engineering schematics flowchart with connecting technical circuit traces.

### D. Dossier Avatar Treatment
- Profile photo framed like a pilot identification badge or classified operative dossier, with duotone cyan/navy grading and animated scanner line.

---

## 3. Technical Specs
- **Font**: Monospaced technical typography (`JetBrains Mono` or `Share Tech Mono`) paired with industrial sans display (`Orbitron` / `Teko`).
- **Data Page Attribute**: `data-page="blueprint"`
- **Layout**: Clean multi-column schematic breakdown (Server Component).

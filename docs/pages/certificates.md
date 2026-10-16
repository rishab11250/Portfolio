# Page Spec: Certificates (`/certificates`) — Arcade Trophy Vault & High-Score Hall

## 1. Aesthetic Direction
- **Atmosphere**: Neo-retro arcade trophy room / Hall of Fame leaderboard.
- **Core Attraction**: High-score table layout, glowing coin-op medals, pixelated achievement badges, and interactive filter controls.
- **Color Palette**:
  - Vault Black: `#0A0910`
  - High-Score Gold: `#F5B700`
  - Neon Cyan / Amber: `#00E5FF` / `#FF8A00`
  - Token Gray: `#22212C`
  - Score White: `#F8F8F2`

---

## 2. Key Visual & Interactive Features

### A. Arcade Cabinet High-Score Header
- Header designed like an arcade game top-marquee (`INSERT COIN TO VIEW CREDENTIALS` / `TOP RANK ARCHIVE`).
- Flashing "STAGE CLEARED" indicator and total certificates unlocked counter (`12 / 12 UNLOCKED`).

### B. Credential Cards as Arcade Collectibles / Game Cartridges
- Each certificate card styled like a retro cartridge or arcade high-score entry:
  - Rank slot marker (`RANK 01`, `RANK 02`, etc.).
  - Achievement badge stamp (`100% SCORE`, `SOLOLEARN CERTIFIED`, `SIH 2024`).
  - Scanline gloss across certificate previews.
  - Verification link styled as "INSERT TOKEN / VERIFY RECORD ↗".

### C. Retro Soundless Score Ticker
- Category filter buttons (`ALL`, `PROBLEM SOLVING`, `FULL STACK`, `ACADEMIC`) styled like arcade push-buttons with tactile inset click states.

---

## 3. Technical Specs
- **Font**: `Press Start 2P` or `Share Tech Mono` for arcade scores, paired with clean sans for readability.
- **Data Page Attribute**: `data-page="arcade"`
- **Client Boundaries**: Filter and modal viewer client components.

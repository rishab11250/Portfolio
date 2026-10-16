# Page Spec: Contact (`/contact`) — Letterpress & Wax Seal Desk

## 1. Aesthetic Direction
- **Atmosphere**: Antique stationery desk meets tactile Japanese letterpress (*washi* paper stationery, crimson wax seal, fountain pen ink flourishes).
- **Core Attraction**: Physical letter interaction, tactile wax seal stamp submit button, interactive ink ripple on input focus, and clean envelope folding animation.
- **Color Palette**:
  - Aged Stationery Parchment: `#FAF6EE`
  - Deep Walnut / Calligraphy Ink: `#1C1917`
  - Imperial Vermilion Wax: `#B91C1C`
  - Gold Foil Inlay: `#D97706`
  - Postage Stamp Blue: `#1E3A8A`

---

## 2. Key Visual & Interactive Features

### A. Washi Paper Letter Container
- The contact form is rendered as a handcrafted letter or folded telegram:
  - Subtle deckle-edge / torn-paper border effect.
  - Lined ruled paper background (`repeating-linear-gradient` with soft parchment ink rules).
  - Vintage airmail chevron border or Japanese postage stamp motif in the top corner.

### B. Interactive Wax Seal Button (`WaxSealSubmit.jsx`)
- The send button is an embossed crimson wax seal:
  - Resting state: 3D embossed stamp impression with Rishab's initials or seasonal icon.
  - Hover: Subtle heat shimmer or golden foil glint.
  - Press / Submit: Physical stamp pressing animation (`sealPress` keyframe) with expanding red ink ring ripple.

### C. Direct Channels as Telegram / Wax-Sealed Envelopes
- Email, LinkedIn, and GitHub links presented as wax-sealed calling cards or mini correspondence envelopes.
- Instant copy-to-clipboard trigger gives tactile "Copied to Dispatch" feedback.

---

## 3. Technical Specs
- **Font**: `Zen Old Mincho` display font for elegant editorial typography + `Zen Kaku Gothic New` for readable inputs.
- **Data Page Attribute**: `data-page="stationery"`
- **Client Boundaries**: `components/contact/ContactLetter.jsx` (`'use client'` for EmailJS integration and tactile seal interaction).

# Multi-Aesthetic Pointers & Animation Architecture

## Design Philosophy
Each of the 6 portfolio worlds possesses a distinct physical reality. Rather than relying on generic browser pointers or uniform transitions, every route features a bespoke **Thematic Cursor** and **Motion Choreography** engineered to reinforce its specific narrative universe while maintaining 60fps performance and zero layout shift.

---

## 1. Master Matrix: Pointers & Animations Across All 6 Worlds

| Route | Aesthetic World | Bespoke Pointer / Cursor | Primary Motion Physics | Signature Page Animations | Interactive State (Hover/Click) |
|---|---|---|---|---|---|
| `/` | **Sumi-e Mist Sanctuary** | **Sumi-e Ink Droplet (`fude` 筆)**<br>Fluid ink core with expanding water-diffusion aura | Damped spring lerp (`0.12` factor), fluid inertial glide | Multi-plane drifting mist ribbons, seasonal canvas wind particles, translucent washi glass tilt | Ink bead expands; capillary water ring radiates outward on click; cards tilt in 3D perspective |
| `/skills` | **8/16-Bit Pixel Realm** | **Pixel Gauntlet / 8-Bit Dagger**<br>Crisp pixelated icon (`image-rendering: pixelated`) | Stepped coordinates (`steps(4)` quantization option), instantaneous snap | 60fps Canvas animated pixel waterfall (falling droplets + foam splash), CRT scanline jitter | Pixel pointer animates to pressing index finger; retro floating chip hover bobbing (`translateY(-4px)`) |
| `/projects` | **Shonen Manga / Anime** | **Manga Inking Nib (`G-pen` G-ペン)**<br>Stylized metallic inking nib with dynamic speed-crosshair | Sharp action response, velocity-weighted tilt angle | Asymmetric comic panel break & pop, radial SVG speed-line burst on hero cards, halftone parallax | Action-line burst trails behind cursor on rapid sweep; project panel breaks comic border (`scale(1.02)`) |
| `/about` | **Cybernetic Blueprint** | **HUD Tactical Crosshair**<br>Precision targeting reticle with live `[X:### Y:###]` telemetry | Linear precision tracking with micro-accelerometer drift | Wireframe vector assembly (`stroke-dasharray` SVG draw), oscilloscope waveform sweep, radar sonar sweep | Target brackets rotate 45° and lock on interactive dossier chips; live coordinate telemetry ticks |
| `/certificates` | **Arcade Trophy Vault** | **Insert-Coin Crosshair / Joystick**<br>Retro arcade target ring with golden coin shimmer | Snappy arcade response, subtle spring overshoot | "HIGH SCORE" marquee strobe, 3D medal flip with specular reflection sweep, CRT phosphor bloom | Golden coin flips on click with sparkle burst; certificate badge glints with metallic light pass |
| `/contact` | **Letterpress / Stationery** | **Brass Fountain Pen Nib**<br>Slanted calligraphic pen tip with crimson sealing wax bead | Smooth analog fluid tracking, subtle rotation along drag angle | Physical wax seal compression on submit, paper fold/unfold on mount, ink capillary bleed on input focus | Pen nib depresses on click, leaving a temporary crimson seal mark; input borders bleed ink outward |

---

## 2. In-Depth World Specifications

### A. Home (`/`) — Sumi-e Mist Sanctuary
- **Bespoke Pointer**:
  - Center: Solid ink core (`#17181C` in dark / seasonal accent) with `mix-blend-mode: multiply`.
  - Outer: Faint seasonal water-wash aura (`36px` diameter) with `rgba(...)` halo that gently breathes.
  - Hover: Water-wash ring scales to `48px`, aura intensifies with seasonal accent color (`#DF4F73`, `#0D9488`, `#C91F37`, `#2563EB`).
  - Click: Radiates a capillary ripple wave that dissolves into the washi paper.
- **Page Motion Choreography**:
  - **Inertial Pointer Reveal**: Radial mask (`--mask-radius: 600px`) smoothly trails mouse coordinates using requestAnimationFrame linear damping (`current += (target - current) * 0.12`).
  - **Translucent Washi Bento Cards**: Cards are rendered with `rgba(..., 0.72)` semi-translucency and `backdrop-blur-[2px]`, allowing background pine trees (`pines.svg`) and mountain contours (`ridge-*.svg`) to visibly float underneath the text.
  - **Opposing Mist Parallax**: Two staggered horizontal mist ribbons drift across the vista (`mistDrift` at 28s and `mistDriftReverse` at 38s), generating genuine three-dimensional spatial depth.
  - **Tactile Card Tilt**: Cards subtly tilt in 3D perspective (`perspective(1000px) rotateX(...) rotateY(...) scale3d(1.01, 1.01, 1.01)`) as the pointer passes over them.

### B. Skills (`/skills`) — 8/16-Bit Pixel Realm
- **Bespoke Pointer**:
  - Hand-drawn SVG pixel cursor styled like classic 16-bit JRPG gauntlet / cursor sword.
  - Pixel crispness enforced via `image-rendering: pixelated; shape-rendering: crispEdges`.
  - Hover: Switches sprite frame to "action select" pointing finger.
  - Click: 1-frame downward press animation with 8-bit particle sparks.
- **Page Motion Choreography**:
  - **60fps Canvas Pixel Waterfall**: Procedural falling blue/cyan/white pixel streams with variable column speeds, pooling foam collision physics, and vapor motes.
  - **Stepped Micro-Interactions**: Hover states use `transition-timing-function: steps(3)` to eliminate smooth modern gradients in favor of authentic NES hardware stepping.
  - **Floating Chip Bob**: Skill badge chips float gently on an alternating `translateY(-4px)` 8-bit bobbing cycle.

### C. Projects (`/projects`) — Shonen Manga / Anime
- **Bespoke Pointer**:
  - Traditional Japanese manga G-pen nib (`G-ペン`) tilted at 45°.
  - Trailing speed-line micro-sparks on velocity spikes (>800px/s).
  - Hover: Expands into an explosive crosshair target.
  - Click: Ink splatter burst (`ink-splat.svg`) that quickly evaporates.
- **Page Motion Choreography**:
  - **Asymmetric Comic Panel Break**: On hover, project panels scale up (`scale(1.025)`) and break out of their grid cell with a bold 3px black ink drop-shadow.
  - **Speed-Line Radial Burst**: Hovering project headers triggers an SVG speed-line radial burst behind the thumbnail.
  - **Halftone Parallax**: Background dot matrix shifts at 0.2x scroll rate, creating an authentic printed tankobon comic feel.

### D. About (`/about`) — Cybernetic Blueprint Dossier
- **Bespoke Pointer**:
  - Tactical HUD crosshair: central `+` reticle surrounded by 4 orbital corner brackets.
  - Miniature telemetry readout: displays live cursor coordinates `X: 0842 Y: 0418` in high-contrast technical font.
  - Hover: Corner brackets rotate 45° and lock inward onto the target.
  - Click: Sonar ping ring expands and dissipates.
- **Page Motion Choreography**:
  - **Blueprint Schematic Assembly**: SVG architectural outlines draw themselves on initial viewport entry using `stroke-dasharray` and `stroke-dashoffset` transitions.
  - **Oscilloscope Waveform**: Telemetry bars modulate rhythmically in the background.
  - **Terminal Decrypt Stagger**: Career timeline entries decrypt from scrambled hex characters into readable plaintext.

### E. Certificates (`/certificates`) — Arcade Trophy Vault
- **Bespoke Pointer**:
  - Arcade cabinet crosshair styled with a shimmering gold coin insignia.
  - Hover: Coin spins 180° with a metallic glint pass.
  - Click: "1-UP" / Coin insert soundless flash effect.
- **Page Motion Choreography**:
  - **High-Score Marquee Glow**: Pulsing neon border wash around verified credential podiums.
  - **3D Trophy Flip**: Certificate proof cards perform a smooth 3D flip card tilt to reveal verification hashes and credential metadata.
  - **CRT Phosphor Bloom**: Subtle horizontal line scanlines with faint chromatic edge separation.

### F. Contact (`/contact`) — Letterpress / Stationery Desk
- **Bespoke Pointer**:
  - Hand-crafted brass fountain pen nib oriented at writing angle.
  - Tip carries a droplet of scarlet seal vermilion (`#C91F37`).
  - Hover: Pen nib aligns vertically over input fields and action buttons.
  - Click: Leaves a brief impression mark as if pressing paper.
- **Page Motion Choreography**:
  - **Stationery Paper Unfold**: Contact card unfolds on page mount with realistic paper creasing shadows.
  - **Capillary Ink Bleed**: Focusing form input fields causes the border line to bleed outward like ink penetrating rag paper.
  - **Wax Seal Stamp Press**: Clicking "Send Message" triggers a heavy compression stamp animation with realistic wax cooling settle.

---

## 3. Performance & Accessibility Standards
1. **60 FPS Hardware Acceleration**:
   - Custom cursors update exclusively via `transform: translate3d(x, y, 0)` on an isolated GPU composite layer (`will-change: transform; pointer-events: none`).
   - Zero DOM reflows or style recalculations during mouse movement.
2. **Touch Device Deactivation**:
   - Pointers automatically hide on touch devices via `@media (pointer: coarse) { display: none; }` to preserve native mobile touch ergonomics.
3. **Reduced Motion Compliance**:
   - When `prefers-reduced-motion: reduce` is active:
     - Custom pointers degrade to standard OS cursors or static icons without physics lerp.
     - Parallax mist drifts, canvas particle physics, and 3D card tilts are disabled (`transform: none !important; animation: none !important`).

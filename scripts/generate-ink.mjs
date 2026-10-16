import fs from 'node:fs';
import path from 'node:path';

// Seeded PRNG (Mulberry32) for deterministic reproducible SVG generation
function mulberry32(seed) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const random = mulberry32(0x1e3a5f);

function generateRidgePath(width, height, baseY, variance, octaves, roughness) {
  const points = [];
  const step = 20;
  for (let x = 0; x <= width + step; x += step) {
    let y = baseY;
    let amp = variance;
    let freq = 0.003;
    for (let o = 0; o < octaves; o++) {
      const noise = (random() - 0.5) * 2;
      y += Math.sin(x * freq) * amp + noise * (amp * roughness);
      amp *= 0.45;
      freq *= 2.2;
    }
    points.push({ x: Math.min(x, width), y: Math.max(20, Math.min(y, height - 10)) });
  }

  let d = `M 0,${points[0].y.toFixed(1)}`;
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1];
    const curr = points[i];
    const cpX = (prev.x + curr.x) / 2;
    d += ` Q ${prev.x.toFixed(1)},${prev.y.toFixed(1)} ${cpX.toFixed(1)},${((prev.y + curr.y) / 2).toFixed(1)}`;
  }
  const last = points[points.length - 1];
  d += ` L ${width},${last.y.toFixed(1)} L ${width},${height} L 0,${height} Z`;
  return { d, points };
}

function generatePines(ridgePoints, count, pineHeight) {
  let d = '';
  const selectedIndices = [];
  const spacing = Math.floor(ridgePoints.length / count);

  for (let i = 2; i < ridgePoints.length - 2; i += spacing) {
    if (random() > 0.3) {
      selectedIndices.push(i);
    }
  }

  for (const idx of selectedIndices) {
    const pt = ridgePoints[idx];
    const x = pt.x + (random() - 0.5) * 10;
    const y = pt.y;
    const h = pineHeight * (0.7 + random() * 0.6);
    const w = h * 0.45;

    // A tiered Japanese black pine silhouette
    d += ` M ${x.toFixed(1)},${(y - h).toFixed(1)}`;
    // Tier 1 (top)
    d += ` L ${(x - w * 0.3).toFixed(1)},${(y - h * 0.6).toFixed(1)}`;
    d += ` L ${(x - w * 0.15).toFixed(1)},${(y - h * 0.6).toFixed(1)}`;
    // Tier 2 (middle)
    d += ` L ${(x - w * 0.5).toFixed(1)},${(y - h * 0.25).toFixed(1)}`;
    d += ` L ${(x - w * 0.2).toFixed(1)},${(y - h * 0.25).toFixed(1)}`;
    // Tier 3 (base)
    d += ` L ${(x - w * 0.6).toFixed(1)},${y.toFixed(1)}`;
    // Trunk / right side
    d += ` L ${(x + w * 0.6).toFixed(1)},${y.toFixed(1)}`;
    d += ` L ${(x + w * 0.2).toFixed(1)},${(y - h * 0.25).toFixed(1)}`;
    d += ` L ${(x + w * 0.5).toFixed(1)},${(y - h * 0.25).toFixed(1)}`;
    d += ` L ${(x + w * 0.15).toFixed(1)},${(y - h * 0.6).toFixed(1)}`;
    d += ` L ${(x + w * 0.3).toFixed(1)},${(y - h * 0.6).toFixed(1)} Z`;
  }
  return d;
}

function generateMistBands(width, height) {
  let d = '';
  const bands = [
    { y: height * 0.45, amp: 18, length: width },
    { y: height * 0.62, amp: 24, length: width },
    { y: height * 0.78, amp: 15, length: width },
  ];

  for (const band of bands) {
    d += ` M 0,${band.y.toFixed(1)}`;
    for (let x = 0; x <= band.length; x += 100) {
      const yOffset = Math.sin((x / band.length) * Math.PI * 3) * band.amp;
      d += ` Q ${(x + 50).toFixed(1)},${(band.y + yOffset).toFixed(1)} ${(x + 100).toFixed(1)},${band.y.toFixed(1)}`;
    }
  }
  return d;
}

const WIDTH = 1440;
const HEIGHT = 500;

// 1. Back Ridge (distant mist mountain)
const backRidge = generateRidgePath(WIDTH, HEIGHT, 160, 90, 4, 0.2);
// 2. Mid Ridge (indigo midground mountain)
const midRidge = generateRidgePath(WIDTH, HEIGHT, 260, 80, 5, 0.3);
// 3. Front Ridge (sharp ink foreground mountain)
const frontRidge = generateRidgePath(WIDTH, HEIGHT, 360, 60, 6, 0.4);

// Pines along the mid and front ridges
const pinesMid = generatePines(midRidge.points, 24, 28);
const pinesFront = generatePines(frontRidge.points, 18, 36);

// Mist bands
const mistBands = generateMistBands(WIDTH, HEIGHT);

const outputDir = path.join(process.cwd(), 'public', 'ink');
fs.mkdirSync(outputDir, { recursive: true });

// Standalone SVGs
fs.writeFileSync(
  path.join(outputDir, 'ridge-back.svg'),
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${WIDTH} ${HEIGHT}" width="100%" height="100%">
  <path d="${backRidge.d}" fill="#5E636D" fill-opacity="0.3" />
</svg>\n`
);

fs.writeFileSync(
  path.join(outputDir, 'ridge-mid.svg'),
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${WIDTH} ${HEIGHT}" width="100%" height="100%">
  <path d="${midRidge.d}" fill="#1E3A5F" fill-opacity="0.6" />
</svg>\n`
);

fs.writeFileSync(
  path.join(outputDir, 'ridge-front.svg'),
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${WIDTH} ${HEIGHT}" width="100%" height="100%">
  <path d="${frontRidge.d}" fill="#17181C" fill-opacity="0.95" />
</svg>\n`
);

fs.writeFileSync(
  path.join(outputDir, 'pines.svg'),
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${WIDTH} ${HEIGHT}" width="100%" height="100%">
  <path d="${pinesMid}" fill="#0B2545" fill-opacity="0.7" />
  <path d="${pinesFront}" fill="#17181C" fill-opacity="0.95" />
</svg>\n`
);

fs.writeFileSync(
  path.join(outputDir, 'mist.svg'),
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${WIDTH} ${HEIGHT}" width="100%" height="100%">
  <path d="${mistBands}" fill="none" stroke="#F1ECE0" stroke-width="28" stroke-opacity="0.35" stroke-linecap="round" />
</svg>\n`
);

// Combined Layered Ink Landscape SVG
fs.writeFileSync(
  path.join(outputDir, 'ink-landscape.svg'),
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${WIDTH} ${HEIGHT}" width="100%" height="100%" preserveAspectRatio="xMidYMax slice">
  <defs>
    <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#F1ECE0" stop-opacity="0" />
      <stop offset="70%" stop-color="#E95295" stop-opacity="0.12" />
      <stop offset="100%" stop-color="#F2B84B" stop-opacity="0.22" />
    </linearGradient>
  </defs>
  <!-- Dusk Sky Ambient Glow -->
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#skyGrad)" />
  <!-- Layer 1: Distant Mist Ridge -->
  <path id="ink-ridge-back" d="${backRidge.d}" fill="#5E636D" fill-opacity="0.25" />
  <!-- Mist Drift 1 -->
  <path d="${mistBands}" fill="none" stroke="#F1ECE0" stroke-width="24" stroke-opacity="0.35" stroke-linecap="round" />
  <!-- Layer 2: Midground Indigo Ridge -->
  <path id="ink-ridge-mid" d="${midRidge.d}" fill="#1E3A5F" fill-opacity="0.55" />
  <!-- Mid Pines -->
  <path id="ink-pines-mid" d="${pinesMid}" fill="#0B2545" fill-opacity="0.65" />
  <!-- Layer 3: Foreground Ink Ridge -->
  <path id="ink-ridge-front" d="${frontRidge.d}" fill="#17181C" fill-opacity="0.95" />
  <!-- Foreground Pines -->
  <path id="ink-pines-front" d="${pinesFront}" fill="#17181C" fill-opacity="0.98" />
</svg>\n`
);

console.log('Successfully generated deterministic ink SVGs into public/ink/');

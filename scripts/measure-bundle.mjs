import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

const htmlPath = path.resolve('.next/server/app/index.html');
const chunksDir = path.resolve('.next/static/chunks');

if (!fs.existsSync(htmlPath)) {
  console.error('index.html not found. Run next build first.');
  process.exit(1);
}

const html = fs.readFileSync(htmlPath, 'utf8');
const scriptMatches = [...html.matchAll(/src="\/_next\/static\/chunks\/([^"]+\.js)"/g)];
const scriptFiles = [...new Set(scriptMatches.map((m) => m[1]))];

console.log('Script chunks referenced in pre-rendered index.html:');
let totalRaw = 0;
let totalGzip = 0;

for (const file of scriptFiles) {
  const filePath = path.join(chunksDir, file);
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath);
    const rawSize = content.length;
    const gzipSize = zlib.gzipSync(content).length;
    totalRaw += rawSize;
    totalGzip += gzipSize;
    console.log(`- ${file}: ${(rawSize / 1024).toFixed(1)} kB raw (${(gzipSize / 1024).toFixed(1)} kB gzip)`);
  } else {
    console.warn(`- ${file} not found on disk`);
  }
}

console.log('\n--- Measured Totals ---');
console.log(`Initial Client JS (Raw):  ${(totalRaw / 1024).toFixed(1)} kB`);
console.log(`Initial Client JS (Gzip): ${(totalGzip / 1024).toFixed(1)} kB`);

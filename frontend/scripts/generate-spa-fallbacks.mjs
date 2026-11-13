import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '../dist');
const indexPath = path.join(distDir, 'index.html');

if (!fs.existsSync(indexPath)) {
  console.error('[generate-spa-fallbacks] Error: dist/index.html not found. Run vite build first.');
  process.exit(1);
}

const indexHtml = fs.readFileSync(indexPath, 'utf-8');

// Core routes
const routes = [
  'ledarna',
  'truppen',
  'matcher',
  'schema',
  'galleri',
  'blogg',
  'instagram',
  '404',
  'sponsorer',
  'merch',
];

// Match detail routes
const matchIds = [
  'm1',
  'm2',
  'm3',
  'ev-4',
  'ev-match-fargelanda',
  'ev-match-framstad',
  'ev-match-frandefors',
  'ev-5',
];

// Schedule / Blog detail routes
const detailIds = [
  'fargelanda-cup-2026',
  'ytterby-cup-2027',
  'tossecupen-2027',
  'ev-1',
  'ev-2',
  'ev-3',
  'ev-4',
  'ev-5',
  'ev-6',
  'ev-7',
  'ev-8',
  'ev-polhem-4dec',
  'ev-match-fargelanda',
  'ev-match-framstad',
  'ev-match-frandefors',
  'historisk-premiar-forsta-traningen',
  'nya-cuper-2027',
  'vinterschema-2026',
];

// Collect all route paths
const allRoutePaths = [...routes];

for (const id of matchIds) {
  allRoutePaths.push(`matcher/${id}`);
  allRoutePaths.push(`matcher/resultat/${id}`);
}

for (const id of detailIds) {
  allRoutePaths.push(`schema/${id}`);
  allRoutePaths.push(`blogg/${id}`);
}

console.log(`[generate-spa-fallbacks] Generating static fallbacks for ${allRoutePaths.length} routes...`);

for (const route of allRoutePaths) {
  const dirPath = path.join(distDir, route);
  fs.mkdirSync(dirPath, { recursive: true });
  fs.writeFileSync(path.join(dirPath, 'index.html'), indexHtml, 'utf-8');
  
  // Also create flat {route}.html file (e.g. dist/ledarna.html) for cleanUrls
  if (!route.includes('/')) {
    fs.writeFileSync(path.join(distDir, `${route}.html`), indexHtml, 'utf-8');
  }
}

// Ensure 404.html in dist also falls back or restores route
const fallback404 = path.join(distDir, '404.html');
if (!fs.existsSync(fallback404)) {
  fs.writeFileSync(fallback404, indexHtml, 'utf-8');
}

console.log(`[generate-spa-fallbacks] Successfully generated all static fallbacks in dist/!`);


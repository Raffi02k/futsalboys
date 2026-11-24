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

// Core top-level routes
const coreRoutes = [
  'truppen',
  'matcher',
  'schema',
  'galleri',
  'blogg',
  'instagram',
  'sponsorer',
  'merch',
  'integritet',
  '404',
];

// Dynamically extract all match, schedule, and blog slugs and IDs
const futsalPath = path.resolve(__dirname, '../src/content/futsalData.ts');
const matchesPath = path.resolve(__dirname, '../src/content/matchesData.ts');

const allIdentifiers = new Set([
  // Static known routes and fallbacks
  'm1',
  'm2',
  'm3',
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
  'match-funk',
  'funk',
  'funkgrabbarna',
  'match-fargelanda',
  'fargelanda',
  'match-framstad',
  'framstad',
  'match-frandefors',
  'frandefors',
  'match-tif-polhem',
  'match-tif',
  'tif',
  'traning-sylte',
  'traning-torsbohallen',
  'traning-nevshallen',
  'traning-polhem-4dec',
  'fc-vanersborg',
  'uddevalla-city',
  'goteborg-united',
  'fargelanda-cup',
  'fargelanda-cup-2026',
  'ytterby-cup',
  'ytterby-cup-2027',
  'tossecupen',
  'tossecupen-2027',
  'historisk-premiar-forsta-traningen',
  'nya-cuper-2027',
  'vinterschema-2026',
  'intro-video',
  'p4-vast-julinsamling',
]);

const regex = /(?:id|slug|cupSlug|scheduleSlug):\s*['"]([^'"]+)['"]/g;

for (const filePath of [futsalPath, matchesPath]) {
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf-8');
    let m;
    while ((m = regex.exec(content)) !== null) {
      const val = m[1].trim();
      if (val && !val.startsWith('p-') && !val.startsWith('p1') && !val.startsWith('p2') && !val.startsWith('p3')) {
        allIdentifiers.add(val);
      }
    }
  }
}

// Build list of all route paths
const allRoutePaths = new Set([...coreRoutes]);

for (const id of allIdentifiers) {
  allRoutePaths.add(`matcher/${id}`);
  allRoutePaths.add(`matcher/resultat/${id}`);
  allRoutePaths.add(`schema/${id}`);
  allRoutePaths.add(`blogg/${id}`);
}

console.log(`[generate-spa-fallbacks] Generating static fallbacks for ${allRoutePaths.size} routes...`);

for (const route of allRoutePaths) {
  // 1. Directory with index.html (e.g. dist/schema/traning-nevshallen/index.html)
  const dirPath = path.join(distDir, route);
  fs.mkdirSync(dirPath, { recursive: true });
  fs.writeFileSync(path.join(dirPath, 'index.html'), indexHtml, 'utf-8');

  // 2. Flat .html file for cleanUrls (e.g. dist/schema/traning-nevshallen.html)
  const flatHtmlPath = path.join(distDir, `${route}.html`);
  const flatParentDir = path.dirname(flatHtmlPath);
  if (!fs.existsSync(flatParentDir)) {
    fs.mkdirSync(flatParentDir, { recursive: true });
  }
  fs.writeFileSync(flatHtmlPath, indexHtml, 'utf-8');
}

// Ensure 404.html in dist also falls back or restores route
const fallback404 = path.join(distDir, '404.html');
if (!fs.existsSync(fallback404)) {
  fs.writeFileSync(fallback404, indexHtml, 'utf-8');
}

console.log(`[generate-spa-fallbacks] Successfully generated all static fallbacks in dist/!`);

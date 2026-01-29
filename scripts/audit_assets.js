import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.join(__dirname, '..');

const indexHtmlPath = path.join(root, 'index.html');
const indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');

// Regex to find potential local file paths in href/src
const assetRegex = /(?:href|src)=["'](?!\/\/|http|#)([^"']+)["']/g;
const assets = [];
let match;

while ((match = assetRegex.exec(indexHtml)) !== null) {
  assets.push(match[1]);
}

console.log(`Checking ${assets.length} assets...`);

let missingCount = 0;
const uniqueAssets = [...new Set(assets)].filter((asset) => {
  return !asset.startsWith('data:') && !asset.startsWith('tel:') && !asset.startsWith('mailto:');
});

uniqueAssets.forEach((asset) => {
  // Ignore query strings like ?v=v171
  const cleanPath = asset.split('?')[0];
  const absolutePath = path.join(root, cleanPath.startsWith('/') ? cleanPath.slice(1) : cleanPath);

  if (!fs.existsSync(absolutePath)) {
    console.error(`❌ Missing asset: ${asset}`);
    missingCount++;
  } else {
    // console.log(`✅ OK: ${asset}`);
  }
});

if (missingCount === 0) {
  console.log('✅ All assets found successfully!');
  process.exit(0);
} else {
  console.error(`❌ Found ${missingCount} missing assets.`);
  process.exit(1);
}

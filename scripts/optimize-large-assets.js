import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ASSETS_DIR = path.join(__dirname, '../src/assets');

const IMAGES = [
  { name: 'Bolt.webp', optName: 'Bolt_opt.webp', width: 320, height: 320 },
  { name: 'Star.webp', optName: 'Star_opt.webp', width: 320, height: 320 },
  { name: 'avatar.webp', optName: 'avatar_opt.webp', width: 640, height: 1138 }
];

async function run() {
  console.log('Resizing and optimizing large assets to new filenames...');
  for (const img of IMAGES) {
    const inputPath = path.join(ASSETS_DIR, img.name);
    const outputPath = path.join(ASSETS_DIR, img.optName);

    if (fs.existsSync(inputPath)) {
      try {
        const oldSize = fs.statSync(inputPath).size / 1024;
        console.log(`Resizing ${img.name} -> ${img.optName} (${img.width}x${img.height})...`);

        await sharp(inputPath)
          .resize(img.width, img.height, { fit: 'cover' })
          .webp({ quality: 80, effort: 6 })
          .toFile(outputPath);

        const newSize = fs.statSync(outputPath).size / 1024;
        console.log(`  Success! Size reduced from ${oldSize.toFixed(1)}KB to ${newSize.toFixed(1)}KB (${((1 - newSize/oldSize) * 100).toFixed(1)}% savings)`);
      } catch (err) {
        console.error(`  Error processing ${img.name}:`, err.message);
      }
    } else {
      console.warn(`  Warning: File ${img.name} does not exist at ${inputPath}`);
    }
  }
}

run();

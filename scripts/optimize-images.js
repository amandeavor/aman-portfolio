import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ASSETS_DIR = path.join(__dirname, '../src/assets');

const IMAGES = [
  { input: 'hero.png', output: 'hero.webp' },
  { input: 'Bolt.png', output: 'Bolt.webp' },
  { input: 'Star.png', output: 'Star.webp' },
  { input: 'obsidiankit-cover (2).png', output: 'obsidiankit-cover.webp' },
  { input: 'gurunanakacademy.png', output: 'gurunanakacademy.webp' },
  { input: 'aman-intelligence-cli.png', output: 'aman-intelligence-cli.webp' },
  { input: 'sweepr (2).png', output: 'sweepr.webp' },
  { input: 'momentum.png', output: 'momentum.webp' },
  { input: 'aetheris.png', output: 'aetheris.webp' },
  { input: 'aetheris-blog.png', output: 'aetheris-blog.webp' },
  { input: 'amanintelligence-blog.png', output: 'amanintelligence-blog.webp' },
  { input: 'privacy-blog.png', output: 'privacy-blog.webp' },
  { input: 'avatar.png', output: 'avatar.webp' }
];

async function run() {
  console.log('Starting image WebP conversion and optimization...');
  for (const img of IMAGES) {
    const inputPath = path.join(ASSETS_DIR, img.input);
    const outputPath = path.join(ASSETS_DIR, img.output);

    if (fs.existsSync(inputPath)) {
      try {
        console.log(`Converting ${img.input} -> ${img.output}...`);
        await sharp(inputPath)
          .webp({ quality: 80, effort: 4 })
          .toFile(outputPath);

        const oldSize = fs.statSync(inputPath).size / (1024 * 1024);
        const newSize = fs.statSync(outputPath).size / (1024 * 1024);
        console.log(`  Success! Size reduced from ${oldSize.toFixed(2)}MB to ${newSize.toFixed(2)}MB (${((1 - newSize/oldSize) * 100).toFixed(1)}% savings)`);
      } catch (err) {
        console.error(`  Error converting ${img.input}:`, err.message);
      }
    } else {
      console.warn(`  Warning: Input file ${img.input} does not exist at ${inputPath}`);
    }
  }
  console.log('Image optimization complete!');
}

run();

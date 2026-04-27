import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const ICON_SOURCE = 'public/icon-bg-remover.png';
const BG_COLOR = '#03A9F4';
const ICONS_DIR = 'public/icons';
const SPLASH_DIR = 'public/splash';

// Ensure directories exist
[ICONS_DIR, SPLASH_DIR].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

const iconSizes = [
  { size: 192, name: 'icon-192x192.png' },
  { size: 512, name: 'icon-512x512.png' },
  { size: 180, name: 'apple-touch-icon.png' },
];

const splashScreens = [
  { width: 640, height: 1136, name: 'iphone5_splash.png' },
  { width: 750, height: 1334, name: 'iphone6_splash.png' },
  { width: 1242, height: 2208, name: 'iphoneplus_splash.png' },
  { width: 1125, height: 2436, name: 'iphonex_splash.png' },
  { width: 1242, height: 2688, name: 'iphonexr_splash.png' },
  { width: 1242, height: 2688, name: 'iphonexsmax_splash.png' },
  { width: 828, height: 1792, name: 'iphone11_splash.png' },
  { width: 1170, height: 2532, name: 'iphone12_splash.png' },
  { width: 1284, height: 2778, name: 'iphone12pro_splash.png' },
  { width: 1179, height: 2556, name: 'iphone14pro_splash.png' },
  { width: 1290, height: 2796, name: 'iphone14promax_splash.png' },
  { width: 768, height: 1024, name: 'ipad_splash.png' },
  { width: 834, height: 1112, name: 'ipadpro1_splash.png' },
  { width: 834, height: 1194, name: 'ipadpro2_splash.png' },
  { width: 1024, height: 1366, name: 'ipadpro3_splash.png' },
];

async function generateIcons() {
  console.log('Generating icons...');
  for (const { size, name } of iconSizes) {
    await sharp(ICON_SOURCE)
      .resize(size, size)
      .toFile(path.join(ICONS_DIR, name));
    console.log(`Generated ${name}`);
  }

  // Favicon (32x32)
  await sharp(ICON_SOURCE)
    .resize(32, 32)
    .toFile('public/favicon.ico');
  console.log('Generated favicon.ico');
}

async function generateSplashScreens() {
  console.log('Generating splash screens...');
  const sourceIcon = await sharp(ICON_SOURCE).resize(200, 200).toBuffer();

  for (const { width, height, name } of splashScreens) {
    await sharp({
      create: {
        width,
        height,
        channels: 4,
        background: BG_COLOR
      }
    })
    .composite([{ input: sourceIcon, gravity: 'center' }])
    .toFile(path.join(SPLASH_DIR, name));
    console.log(`Generated ${name}`);
  }
}

async function run() {
  try {
    await generateIcons();
    await generateSplashScreens();
    console.log('PWA assets generated successfully!');
  } catch (error) {
    console.error('Error generating PWA assets:', error);
  }
}

run();

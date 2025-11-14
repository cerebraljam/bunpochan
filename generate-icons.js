#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Since we don't have sharp or other image libraries, we'll create PNG files using canvas
// First, let's try to use a simple approach with node-canvas if available,
// otherwise we'll provide the SVG and instructions

async function generateIcons() {
  const sizes = [16, 48, 128];

  try {
    // Try to use canvas if available
    const { createCanvas } = require('canvas');

    for (const size of sizes) {
      const canvas = createCanvas(size, size);
      const ctx = canvas.getContext('2d');

      // Create gradient (light green to yellow, bottom-left to top-right)
      const gradient = ctx.createLinearGradient(0, size, size, 0);
      gradient.addColorStop(0, '#7ED957'); // Light green
      gradient.addColorStop(1, '#FFD700'); // Yellow/gold

      // Draw rounded rectangle background
      const radius = size * 0.1875; // 24/128 ratio for rounded corners
      ctx.beginPath();
      ctx.moveTo(radius, 0);
      ctx.lineTo(size - radius, 0);
      ctx.quadraticCurveTo(size, 0, size, radius);
      ctx.lineTo(size, size - radius);
      ctx.quadraticCurveTo(size, size, size - radius, size);
      ctx.lineTo(radius, size);
      ctx.quadraticCurveTo(0, size, 0, size - radius);
      ctx.lineTo(0, radius);
      ctx.quadraticCurveTo(0, 0, radius, 0);
      ctx.closePath();
      ctx.fillStyle = gradient;
      ctx.fill();

      // Draw text 文
      ctx.fillStyle = '#000000';
      ctx.font = `500 ${size * 0.625}px "Noto Sans JP", "Yu Gothic", sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('文', size / 2, size / 2 + size * 0.05);

      // Save to file
      const buffer = canvas.toBuffer('image/png');
      fs.writeFileSync(path.join(__dirname, `src/icons/icon${size}.png`), buffer);
      console.log(`✓ Generated icon${size}.png`);
    }

    console.log('\n✓ All icons generated successfully!');
  } catch (err) {
    console.error('canvas module not available. Installing it...');
    console.log('Run: npm install canvas');
    process.exit(1);
  }
}

generateIcons().catch(console.error);

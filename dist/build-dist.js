const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, 'dist');

if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Files & directories to copy to dist for Cloudflare Pages
const items = fs.readdirSync(__dirname);

items.forEach(item => {
  // Skip git, node_modules, and dist itself
  if (item === '.git' || item === 'node_modules' || item === 'dist' || item === '.gemini') {
    return;
  }
  const src = path.join(__dirname, item);
  const dest = path.join(distDir, item);
  try {
    fs.cpSync(src, dest, { recursive: true });
  } catch (err) {
    console.error(`Warning copying ${item}:`, err.message);
  }
});

console.log('📦 Cloudflare Pages "dist" output directory successfully populated!');

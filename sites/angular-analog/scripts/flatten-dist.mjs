#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

// Goal: Move contents of dist/analog/public into dist root, leaving dist/client intact.

const distDir = path.resolve(process.cwd(), 'dist');
const analogPublicDir = path.join(distDir, 'analog', 'public');

if (!fs.existsSync(distDir)) {
  console.error('[flatten-dist] dist directory does not exist, nothing to do.');
  process.exit(1);
}

if (!fs.existsSync(analogPublicDir)) {
  console.log('[flatten-dist] No dist/analog/public directory found, nothing to flatten.');
  process.exit(0);
}

console.log('[flatten-dist] Moving dist/analog/public contents to dist root...');

for (const entry of fs.readdirSync(analogPublicDir)) {
  const src = path.join(analogPublicDir, entry);
  const dest = path.join(distDir, entry);
  // Remove existing destination to avoid stale merges.
  if (fs.existsSync(dest)) {
    fs.rmSync(dest, { recursive: true, force: true });
  }
  fs.cpSync(src, dest, { recursive: true });
}

// Optionally remove the public directory entirely to avoid confusion.
fs.rmSync(analogPublicDir, { recursive: true, force: true });

console.log('[flatten-dist] Public assets flattened.');

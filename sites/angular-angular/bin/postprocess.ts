#!/usr/bin/env node

import fs from 'fs-extra';
import path from 'path';

const distDir = path.join(import.meta.dirname, '..', 'dist');
const angularDir = path.join(distDir, 'angular');
const browserDir = path.join(angularDir, 'browser');

const indexCsrPath = path.join(distDir, 'index.csr.html');
const indexPath = path.join(distDir, 'index.html');

console.log('Running postprocess steps to make file structure conformant..');

// Step 1: Remove `angular/browser` top-level path
if (await fs.pathExists(browserDir)) {
  await fs.copy(browserDir, distDir, { overwrite: true });
  await fs.remove(angularDir);
} else {
  throw new Error(
    "❌ No 'angular/browser' folder found, maybe the postprocessing step has already been executed?",
  );
}

// Step 2: Rename the index.csr.html file
if (await fs.pathExists(indexCsrPath)) {
  await fs.copy(indexCsrPath, indexPath, { overwrite: true });
  await fs.remove(indexCsrPath);
} else {
  throw new Error(
    "❌ Could not find 'index.csr.html', maybe the postprocessing step has already been executed?",
  );
}

console.log('✅ Output was succesfully transformed.');

#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting FRESH Angular build process...');
console.log('📅 Build timestamp:', new Date().toISOString());

try {
  // Clean everything first
  console.log('🧹 Cleaning previous builds...');
  if (fs.existsSync('dist')) {
    fs.rmSync('dist', { recursive: true, force: true });
  }
  
  // Clean npm cache and node_modules
  console.log('🧹 Cleaning npm cache and node_modules...');
  if (fs.existsSync('node_modules')) {
    fs.rmSync('node_modules', { recursive: true, force: true });
  }
  if (fs.existsSync('package-lock.json')) {
    fs.unlinkSync('package-lock.json');
  }
  
  // Install dependencies with clean slate
  console.log('📦 Installing dependencies (clean install)...');
  execSync('npm install --legacy-peer-deps --no-cache --force', { stdio: 'inherit' });
  
  // Build Angular application
  console.log('🔨 Building Angular application...');
  execSync('npx ng build --configuration production --source-map=false', { stdio: 'inherit' });
  
  // Verify build output
  const distPath = path.join(__dirname, 'dist', 'FrontSlack', 'browser');
  if (fs.existsSync(distPath)) {
    console.log('✅ Angular build completed successfully!');
    console.log('📁 Output directory:', distPath);
    console.log('📄 Files generated:', fs.readdirSync(distPath));
  } else {
    throw new Error('Build output directory not found');
  }
  
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}

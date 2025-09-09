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
  
  // Install dependencies with no cache
  console.log('📦 Installing dependencies (no cache)...');
  execSync('npm ci --legacy-peer-deps --no-cache', { stdio: 'inherit' });
  
  // Build Angular application
  console.log('🔨 Building Angular application...');
  execSync('npx ng build --configuration production --source-map=false --verbose', { stdio: 'inherit' });
  
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

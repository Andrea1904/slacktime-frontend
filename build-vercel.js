#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting Vercel Angular build process...');
console.log('📅 Build timestamp:', new Date().toISOString());

try {
  // Clean everything first
  console.log('🧹 Cleaning previous builds...');
  if (fs.existsSync('dist')) {
    fs.rmSync('dist', { recursive: true, force: true });
  }
  
  // Install dependencies with specific flags for Vercel
  console.log('📦 Installing dependencies...');
  execSync('npm install --legacy-peer-deps --force', { stdio: 'inherit' });
  
  // Ensure listr2 is properly installed
  console.log('🔧 Ensuring listr2 is properly installed...');
  try {
    execSync('npm install listr2@^9.0.1 --save-dev --legacy-peer-deps', { stdio: 'inherit' });
  } catch (error) {
    console.log('⚠️  listr2 install warning (continuing):', error.message);
  }
  
  // Build Angular application
  console.log('🔨 Building Angular application...');
  execSync('npx ng build --configuration production --source-map=false', { stdio: 'inherit' });
  
  // Verify build output
  const distPath = path.join(__dirname, 'dist', 'FrontSlack', 'browser');
  if (fs.existsSync(distPath)) {
    console.log('✅ Angular build completed successfully!');
    console.log('📁 Output directory:', distPath);
    console.log('�� Files generated:', fs.readdirSync(distPath));
  } else {
    throw new Error('Build output directory not found');
  }
  
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}

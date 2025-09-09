#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting Angular build process...');

try {
  // Install dependencies first
  console.log('📦 Installing dependencies...');
  execSync('npm ci --legacy-peer-deps', { stdio: 'inherit' });
  
  // Build Angular application
  console.log('🔨 Building Angular application...');
  execSync('npx ng build --configuration production --source-map=false', { stdio: 'inherit' });
  
  console.log('✅ Angular build completed successfully!');
  
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}

#!/bin/bash

echo "🚀 Deploying Bogle to Production..."

# Step 1: Deploy backend to Vercel
echo "📡 Deploying backend to Vercel..."
cd server
vercel --prod
cd ..

echo "⚠️  IMPORTANT: After backend deployment:"
echo "1. Copy the Vercel URL from the output above"
echo "2. Update src/config.js with your new API URL"
echo "3. Set environment variables in Vercel dashboard"
echo "4. Then run the frontend build"

# Step 2: Build frontend for production
echo "🏗️  Building frontend..."
npm run build

echo "✅ Frontend built! Upload the 'dist' folder contents to GoDaddy"
echo "📁 Files to upload are in: ./dist/"
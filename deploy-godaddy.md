# GoDaddy Deployment Guide

## For Shared Hosting (Static Files Only)

### 1. Build the React App
```bash
npm run build
```

### 2. Upload Files
- Access GoDaddy File Manager or use FTP
- Upload contents of `dist/` folder to `public_html/`
- Your site will be live at your domain

### 3. Backend Hosting Options
Since GoDaddy shared hosting doesn't support Node.js:
- Deploy backend to Vercel, Railway, or Render
- Update API endpoints in your React app

## For VPS/Dedicated Server

### 1. Server Setup
```bash
# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2 for process management
sudo npm install -g pm2
```

### 2. Upload Project
```bash
# Upload entire project via FTP/SFTP
# Or use git clone if you have a repository
```

### 3. Install Dependencies
```bash
# Frontend
npm install
npm run build

# Backend
cd server
npm install
```

### 4. Configure Environment
```bash
# Copy and configure environment variables
cp server/.env.example server/.env
# Edit .env with your production values
```

### 5. Start Services
```bash
# Start backend with PM2
cd server
pm2 start server.js --name "bogle-api"

# Serve frontend with nginx or Apache
# Copy dist/ contents to web root
```

### 6. Configure Web Server
Set up nginx/Apache to:
- Serve static files from dist/
- Proxy API requests to Node.js server
- Handle SSL certificates

## Quick Deploy Script for VPS
```bash
#!/bin/bash
npm run build
cd server
pm2 restart bogle-api || pm2 start server.js --name "bogle-api"
cd ..
sudo cp -r dist/* /var/www/html/
```
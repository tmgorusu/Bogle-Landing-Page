# Deploy Backend to Render.com (Free & Easy)

## Step 1: Push your code to GitHub
1. Create a GitHub repository
2. Push your entire project to GitHub

## Step 2: Deploy on Render
1. Go to https://render.com
2. Sign up/login with GitHub
3. Click "New +" → "Web Service"
4. Connect your GitHub repository
5. Configure:
   - **Name**: bogle-backend
   - **Root Directory**: server
   - **Environment**: Node
   - **Build Command**: npm install
   - **Start Command**: npm start

## Step 3: Set Environment Variables
In Render dashboard, add these environment variables:
- `EMAIL_HOST`: smtp.gmail.com
- `EMAIL_PORT`: 587
- `EMAIL_USER`: general@boglepay.com
- `EMAIL_PASS`: your-gmail-app-password
- `FRONTEND_URL`: https://yourdomain.com

## Step 4: Get Your API URL
Render will give you a URL like: `https://bogle-backend.onrender.com`

## Step 5: Update Frontend Config
Update `src/config.js` with your Render URL.

## Alternative: Use Vercel Functions (Simpler)
Instead of the complex server setup, let's create Vercel functions...
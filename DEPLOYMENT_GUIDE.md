# Backend Deployment to Vercel

## Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

## Step 2: Deploy Backend
```bash
cd server
vercel login
vercel --prod
```

## Step 3: Set Environment Variables in Vercel
After deployment, go to your Vercel dashboard and set these environment variables:

- `EMAIL_HOST`: smtp.gmail.com
- `EMAIL_PORT`: 587
- `EMAIL_USER`: general@boglepay.com
- `EMAIL_PASS`: your-actual-gmail-app-password
- `FRONTEND_URL`: https://yourdomain.com (your GoDaddy domain)

## Step 4: Get Your API URL
After deployment, Vercel will give you a URL like:
`https://your-project-name.vercel.app`

## Step 5: Update Frontend
Replace the API URL in your React app with the Vercel URL.

## Alternative: One-Click Deploy
Click this button to deploy to Vercel:
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/yourrepo)
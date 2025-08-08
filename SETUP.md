# Bogle Waitlist Setup Guide

Complete setup guide for the Bogle landing page with backend waitlist functionality.

## 🚀 Quick Start

### 1. Install Dependencies

Install frontend dependencies:
```bash
npm install
```

Install backend dependencies:
```bash
cd server
npm install
cd ..
```

### 2. Configure Email (Required for waitlist)

1. **Copy environment file:**
   ```bash
   cp server/.env.example server/.env
   ```

2. **Set up Gmail App Password:**
   - Go to [Google Account Settings](https://myaccount.google.com/)
   - Navigate to Security → 2-Step Verification
   - Click "App passwords" at the bottom
   - Generate password for "Mail"
   - Copy the 16-character password

3. **Edit `server/.env`:**
   ```env
   PORT=3002
   FRONTEND_URL=http://localhost:5173
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-16-character-app-password
   ```

### 3. Start Development Environment

**Option A: Use the convenience script**
```bash
./start-dev.sh
```

**Option B: Use npm script**
```bash
npm run dev:full
```

**Option C: Start manually**
```bash
# Terminal 1 - Backend
cd server && npm run dev

# Terminal 2 - Frontend  
npm run dev
```

### 4. Test the Setup

1. **Frontend**: Open http://localhost:5173
2. **Backend**: Check http://localhost:3002/api/health
3. **Waitlist**: Submit an email on the landing page
4. **Email**: Check your inbox for confirmation email

## 📁 Project Structure

```
Bogle-Landing-Page/
├── src/                    # React frontend
│   ├── Homepage.jsx        # Main landing page
│   ├── Homepage.css        # Styles and animations
│   └── assets/            # Images and assets
├── server/                # Node.js backend
│   ├── server.js          # Express API server
│   ├── package.json       # Backend dependencies
│   ├── .env               # Environment variables
│   └── data/              # CSV storage (auto-created)
│       └── waitlist.csv   # Waitlist data
├── package.json           # Frontend dependencies
└── start-dev.sh          # Development startup script
```

## ✨ Features Implemented

### Frontend Animations
- ✅ Scroll-triggered section animations
- ✅ Staggered card reveals
- ✅ Animated counters with progress bars
- ✅ Gradient text effects
- ✅ Hover micro-interactions
- ✅ Loading states for form submission

### Backend API
- ✅ Waitlist email collection
- ✅ Email validation and sanitization
- ✅ Duplicate email prevention
- ✅ Rate limiting (5 requests per 15 min)
- ✅ Beautiful confirmation emails
- ✅ CSV data storage
- ✅ Admin stats endpoint

### Security
- ✅ CORS protection
- ✅ Input validation
- ✅ Rate limiting
- ✅ Security headers (Helmet)
- ✅ Environment variable protection

## 🔧 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/waitlist` | Submit email to waitlist |
| GET | `/api/waitlist/stats` | Get waitlist count |
| GET | `/api/health` | Health check |

## 📧 Email Configuration

### Gmail (Recommended for Development)
```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

### Alternative Email Services

**SendGrid:**
```env
EMAIL_SERVICE=sendgrid
EMAIL_API_KEY=your-sendgrid-api-key
```

**Mailgun:**
```env
EMAIL_SERVICE=mailgun
EMAIL_DOMAIN=your-domain.com
EMAIL_API_KEY=your-mailgun-api-key
```

## 🚀 Production Deployment

### Frontend (Vercel/Netlify)
1. Build the frontend: `npm run build`
2. Deploy the `dist` folder
3. Update backend CORS settings with production URL

### Backend (Railway/Heroku)
1. Push the `server` folder to your hosting service
2. Set environment variables in hosting dashboard
3. Update frontend API calls to production URL

### Environment Variables for Production
```env
PORT=3001
FRONTEND_URL=https://your-domain.com
EMAIL_USER=your-production-email@gmail.com
EMAIL_PASS=your-production-app-password
```

## 🐛 Troubleshooting

### Common Issues

**"CORS Error"**
- Check `FRONTEND_URL` in server/.env matches your React app URL
- Ensure both servers are running

**"Email not sending"**
- Verify Gmail app password is correct
- Check 2FA is enabled on Google account
- Look at server console for error messages

**"Rate limit exceeded"**
- Wait 15 minutes or restart backend server
- Adjust rate limiting in server.js if needed

**"Module not found"**
- Run `npm install` in both root and server directories
- Check Node.js version (requires Node 16+)

### Testing Endpoints

Test the backend directly:
```bash
# Health check
curl http://localhost:3002/api/health

# Submit to waitlist
curl -X POST http://localhost:3002/api/waitlist \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'

# Get stats
curl http://localhost:3002/api/waitlist/stats
```

## 📊 Monitoring

### Waitlist Data
- Stored in `server/data/waitlist.csv`
- Includes email, timestamp, IP, and user agent
- Automatically created on first signup

### Logs
- Server logs all signups and errors to console
- Consider using a logging service for production

## 🔒 Security Best Practices

- ✅ Never commit `.env` files
- ✅ Use strong app passwords
- ✅ Enable rate limiting
- ✅ Validate all inputs
- ✅ Use HTTPS in production
- ✅ Regular security updates

## 📈 Next Steps

Consider adding:
- Database integration (PostgreSQL/MongoDB)
- Admin dashboard for waitlist management
- Email templates customization
- Analytics integration
- A/B testing for conversion optimization
- Social media integration
- Referral tracking

## 💬 Support

If you encounter issues:
1. Check this guide
2. Review server logs in terminal
3. Test API endpoints directly
4. Verify environment variables
5. Check network connectivity

The setup includes comprehensive error handling and logging to help diagnose issues quickly.
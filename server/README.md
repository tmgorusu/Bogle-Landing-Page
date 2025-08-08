# Bogle Backend API

A Node.js/Express backend for handling waitlist signups with email notifications and CSV storage.

## Features

- ✅ **Waitlist Management**: Store email signups in CSV format
- ✅ **Email Notifications**: Send beautiful confirmation emails
- ✅ **Rate Limiting**: Prevent spam with IP-based rate limiting
- ✅ **Input Validation**: Validate and sanitize email addresses
- ✅ **Duplicate Prevention**: Check for existing email addresses
- ✅ **Security**: CORS, Helmet, and other security middleware
- ✅ **Admin Stats**: Get waitlist count via API endpoint

## Quick Start

### 1. Install Dependencies

```bash
cd server
npm install
```

### 2. Environment Setup

Copy the example environment file:

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
PORT=3001
FRONTEND_URL=http://localhost:5173

# Gmail setup (recommended for testing)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

### 3. Gmail App Password Setup

1. Go to your [Google Account settings](https://myaccount.google.com/)
2. Navigate to Security → 2-Step Verification
3. At the bottom, click "App passwords"
4. Generate a new app password for "Mail"
5. Use this password in your `.env` file

### 4. Start the Server

Development mode (with auto-restart):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

The server will start on `http://localhost:3002`

## API Endpoints

### POST `/api/waitlist`
Submit an email to the waitlist.

**Request:**
```json
{
  "email": "user@example.com"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Successfully joined the waitlist! Check your email for confirmation."
}
```

**Response (Error):**
```json
{
  "success": false,
  "message": "This email is already on our waitlist!"
}
```

### GET `/api/waitlist/stats`
Get waitlist statistics (admin endpoint).

**Response:**
```json
{
  "success": true,
  "count": 42,
  "message": "42 people on the waitlist"
}
```

### GET `/api/health`
Health check endpoint.

**Response:**
```json
{
  "success": true,
  "message": "Bogle API is running",
  "timestamp": "2025-01-08T10:30:00.000Z"
}
```

## Data Storage

Waitlist data is stored in `server/data/waitlist.csv` with the following format:

| Email | Timestamp | IP Address | User Agent |
|-------|-----------|------------|------------|
| user@example.com | 2025-01-08T10:30:00.000Z | 192.168.1.1 | Mozilla/5.0... |

## Security Features

- **Rate Limiting**: 5 requests per 15 minutes per IP
- **Input Validation**: Email format and length validation
- **CORS Protection**: Only allows requests from configured frontend URL
- **Helmet**: Security headers for protection against common attacks
- **Duplicate Prevention**: Checks for existing emails before adding

## Email Templates

The confirmation email includes:
- Welcome message with Bogle branding
- Feature highlights (80% lower fees, zero setup costs, etc.)
- Professional HTML styling
- Call-to-action for social media follow

## Development

### File Structure
```
server/
├── server.js          # Main server file
├── package.json       # Dependencies and scripts
├── .env.example       # Environment variables template
├── .gitignore        # Git ignore rules
├── data/             # CSV storage directory
│   └── waitlist.csv  # Waitlist data (auto-created)
└── README.md         # This file
```

### Adding New Features

1. **New Endpoints**: Add routes in `server.js`
2. **Email Templates**: Modify the `sendConfirmationEmail` function
3. **Data Fields**: Update CSV writer configuration
4. **Validation**: Add new validation rules using express-validator

## Production Deployment

### Environment Variables
Set these in your production environment:

```env
PORT=3001
FRONTEND_URL=https://your-domain.com
EMAIL_USER=your-production-email@gmail.com
EMAIL_PASS=your-production-app-password
```

### Recommended Services
- **Hosting**: Railway, Heroku, DigitalOcean App Platform
- **Email**: Gmail (for small scale), SendGrid, Mailgun (for production)
- **Database**: For larger scale, consider PostgreSQL or MongoDB

### Security Checklist
- [ ] Use HTTPS in production
- [ ] Set strong environment variables
- [ ] Configure proper CORS origins
- [ ] Monitor rate limiting logs
- [ ] Regular backup of CSV data
- [ ] Use a proper email service for high volume

## Troubleshooting

### Common Issues

**"Error sending email"**
- Check your Gmail app password
- Ensure 2FA is enabled on your Google account
- Verify EMAIL_USER and EMAIL_PASS in .env

**"CORS error"**
- Check FRONTEND_URL matches your React app URL
- Ensure the frontend is running on the correct port

**"Rate limit exceeded"**
- Wait 15 minutes or restart the server
- Adjust rate limiting in server.js if needed

### Logs
The server logs all waitlist signups and errors to the console. In production, consider using a proper logging service.

## Support

For questions or issues:
1. Check this README
2. Review the server logs
3. Test endpoints with curl or Postman
4. Verify environment variables are set correctly
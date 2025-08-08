import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { body, validationResult } from 'express-validator';
import dotenv from 'dotenv';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import nodemailer from 'nodemailer';
import createCsvWriter from 'csv-writer';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: {
    error: 'Too many waitlist submissions, please try again later.'
  }
});

app.use('/api/waitlist', limiter);
app.use(express.json({ limit: '10mb' }));

// Email transporter setup
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: process.env.EMAIL_PORT || 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false
  }
});

// CSV writer setup
const csvWriter = createCsvWriter.createObjectCsvWriter({
  path: path.join(__dirname, 'data', 'waitlist.csv'),
  header: [
    { id: 'email', title: 'Email' },
    { id: 'timestamp', title: 'Timestamp' },
    { id: 'ip', title: 'IP Address' },
    { id: 'userAgent', title: 'User Agent' }
  ],
  append: true
});

// Ensure data directory exists
async function ensureDataDirectory() {
  const dataDir = path.join(__dirname, 'data');
  try {
    await fs.access(dataDir);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
  }
}

// Validation middleware
const validateEmail = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  body('email')
    .isLength({ min: 5, max: 254 })
    .withMessage('Email must be between 5 and 254 characters')
];

// Check if email already exists
async function emailExists(email) {
  const csvPath = path.join(__dirname, 'data', 'waitlist.csv');
  try {
    const data = await fs.readFile(csvPath, 'utf8');
    return data.includes(email);
  } catch {
    return false; // File doesn't exist yet
  }
}

// Send confirmation email
async function sendConfirmationEmail(email) {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.log('Email credentials not configured, skipping email send');
    return;
  }

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Welcome to Bogle Waitlist! 🚀',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #22c55e, #16a34a); padding: 40px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 28px;">Welcome to Bogle!</h1>
          <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 16px;">You're on the waitlist for smart payments</p>
        </div>
        
        <div style="background: white; padding: 40px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          <h2 style="color: #1f2937; margin-top: 0;">Thanks for joining our waitlist!</h2>
          
          <p style="color: #4b5563; line-height: 1.6;">
            We're excited to have you on board. You'll be among the first to know when Bogle launches and get early access to:
          </p>
          
          <ul style="color: #4b5563; line-height: 1.8; padding-left: 20px;">
            <li><strong>80% lower payment fees</strong> with Pay by Bank and crypto options</li>
            <li><strong>Zero setup costs</strong> - only pay when you process payments</li>
            <li><strong>Smart discount strategies</strong> that save you and your customers money</li>
            <li><strong>Complete chargeback protection</strong> with alternative payment methods</li>
          </ul>
          
          <div style="background: #f0fdf4; padding: 20px; border-radius: 8px; margin: 30px 0; border-left: 4px solid #22c55e;">
            <p style="margin: 0; color: #15803d; font-weight: 600;">
              💡 Pro tip: Follow us on social media for updates and payment industry insights!
            </p>
          </div>
          
          <p style="color: #4b5563; line-height: 1.6;">
            We'll keep you updated on our progress and notify you as soon as we're ready to launch.
          </p>
          
          <div style="text-align: center; margin-top: 30px;">
            <p style="color: #6b7280; font-size: 14px;">
              Questions? Reply to this email - we'd love to hear from you!
            </p>
          </div>
        </div>
        
        <div style="text-align: center; padding: 20px; color: #9ca3af; font-size: 12px;">
          <p>© 2025 Bogle. Smart payments for modern businesses.</p>
        </div>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Confirmation email sent to:', email);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

// Waitlist submission endpoint
app.post('/api/waitlist', validateEmail, async (req, res) => {
  try {
    // Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email address',
        errors: errors.array()
      });
    }

    const { email } = req.body;
    const ip = req.ip || req.connection.remoteAddress;
    const userAgent = req.get('User-Agent') || '';

    // Check if email already exists
    if (await emailExists(email)) {
      return res.status(409).json({
        success: false,
        message: 'This email is already on our waitlist!'
      });
    }

    // Prepare data for CSV
    const waitlistEntry = {
      email,
      timestamp: new Date().toISOString(),
      ip,
      userAgent
    };

    // Write to CSV
    await csvWriter.writeRecords([waitlistEntry]);

    // Send confirmation email
    await sendConfirmationEmail(email);

    // Send success response
    res.status(201).json({
      success: true,
      message: 'Successfully joined the waitlist! Check your email for confirmation.'
    });

    console.log('New waitlist signup:', email);

  } catch (error) {
    console.error('Error processing waitlist submission:', error);
    res.status(500).json({
      success: false,
      message: 'Something went wrong. Please try again later.'
    });
  }
});

// Get waitlist stats (admin endpoint)
app.get('/api/waitlist/stats', async (req, res) => {
  try {
    const csvPath = path.join(__dirname, 'data', 'waitlist.csv');
    const data = await fs.readFile(csvPath, 'utf8');
    const lines = data.split('\n').filter(line => line.trim());
    const count = Math.max(0, lines.length - 1); // Subtract header row

    res.json({
      success: true,
      count,
      message: `${count} people on the waitlist`
    });
  } catch {
    res.json({
      success: true,
      count: 0,
      message: '0 people on the waitlist'
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Bogle API is running',
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found'
  });
});

// Start server
async function startServer() {
  await ensureDataDirectory();
  
  app.listen(PORT, () => {
    console.log(`🚀 Bogle API server running on port ${PORT}`);
    console.log(`📧 Email notifications: ${process.env.EMAIL_USER ? 'Enabled' : 'Disabled (set EMAIL_USER and EMAIL_PASS)'}`);
  });
}

startServer().catch(console.error);
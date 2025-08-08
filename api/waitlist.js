import { body, validationResult } from 'express-validator';
import nodemailer from 'nodemailer';

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

// Simple in-memory storage (for demo - use a database in production)
let waitlistEmails = [];

// Email transporter setup
const transporter = nodemailer.createTransporter({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: process.env.EMAIL_PORT || 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false
  }
});

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
            We're excited to have you on board. You'll be among the first to know when Bogle launches!
          </p>
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

export default async function handler(req, res) {
  // Handle CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'POST') {
    try {
      const { email } = req.body;

      // Basic validation
      if (!email || !email.includes('@')) {
        return res.status(400).json({
          success: false,
          message: 'Invalid email address'
        });
      }

      // Check if email already exists
      if (waitlistEmails.includes(email)) {
        return res.status(409).json({
          success: false,
          message: 'This email is already on our waitlist!'
        });
      }

      // Add to waitlist
      waitlistEmails.push(email);

      // Send confirmation email
      await sendConfirmationEmail(email);

      res.status(201).json({
        success: true,
        message: 'Successfully joined the waitlist! Check your email for confirmation.'
      });

    } catch (error) {
      console.error('Error processing waitlist submission:', error);
      res.status(500).json({
        success: false,
        message: 'Something went wrong. Please try again later.'
      });
    }
  } else {
    res.status(405).json({
      success: false,
      message: 'Method not allowed'
    });
  }
}
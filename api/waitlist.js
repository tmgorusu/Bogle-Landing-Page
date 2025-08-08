// Simple waitlist API function for Vercel

// Simple in-memory storage (for demo - use a database in production)
let waitlistEmails = [];

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
      console.log('Added to waitlist:', email);

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
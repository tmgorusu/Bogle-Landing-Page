import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

async function testEmail() {
  console.log('🧪 Testing email configuration...');
  
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.log('❌ EMAIL_USER or EMAIL_PASS not configured');
    return;
  }

  const transporter = nodemailer.createTransport({
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

  try {
    // Verify connection
    await transporter.verify();
    console.log('✅ SMTP connection verified successfully');

    // Send test email
    const testEmail = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Send to yourself for testing
      subject: 'Bogle Email Test 🚀',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #22c55e, #16a34a); padding: 40px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px;">Email Test Successful!</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 16px;">Your Bogle email system is working</p>
          </div>
          
          <div style="background: white; padding: 40px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <h2 style="color: #1f2937; margin-top: 0;">Configuration Test</h2>
            <p style="color: #4b5563; line-height: 1.6;">
              If you're reading this, your email configuration is working correctly!
            </p>
            <div style="background: #f0fdf4; padding: 20px; border-radius: 8px; margin: 30px 0; border-left: 4px solid #22c55e;">
              <p style="margin: 0; color: #15803d; font-weight: 600;">
                ✅ Email system is ready for waitlist confirmations
              </p>
            </div>
          </div>
        </div>
      `
    };

    const result = await transporter.sendMail(testEmail);
    console.log('✅ Test email sent successfully!');
    console.log('📧 Message ID:', result.messageId);
    console.log('📬 Check your inbox at:', process.env.EMAIL_USER);

  } catch (error) {
    console.log('❌ Email test failed:');
    console.log('Error:', error.message);
    
    if (error.code === 'EAUTH') {
      console.log('\n💡 Authentication failed. Please check:');
      console.log('   - Your email and password are correct');
      console.log('   - 2-Step Verification is enabled (for Gmail)');
      console.log('   - You\'re using an App Password (not your regular password)');
    }
  }
}

testEmail();
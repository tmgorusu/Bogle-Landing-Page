const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, PutCommand, GetCommand, ScanCommand } = require('@aws-sdk/lib-dynamodb');
const { SESClient, SendEmailCommand } = require('@aws-sdk/client-ses');

const dynamoClient = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(dynamoClient);
const sesClient = new SESClient({});

const WAITLIST_TABLE = process.env.WAITLIST_TABLE;
const EMAIL_TRACKING_TABLE = process.env.EMAIL_TRACKING_TABLE;
const FROM_EMAIL = process.env.FROM_EMAIL;
const FRONTEND_URL = process.env.FRONTEND_URL;

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': FRONTEND_URL || '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Max-Age': '86400'
};

// Email validation
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length >= 5 && email.length <= 254;
}

// Send confirmation email
async function sendConfirmationEmail(email) {
  const emailParams = {
    Source: FROM_EMAIL,
    Destination: {
      ToAddresses: [email]
    },
    Message: {
      Subject: {
        Data: 'Welcome to Bogle Pay Waitlist! 🚀',
        Charset: 'UTF-8'
      },
      Body: {
        Html: {
          Data: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <div style="background: linear-gradient(135deg, #22c55e, #16a34a); padding: 40px; text-align: center; border-radius: 10px 10px 0 0;">
                <h1 style="color: white; margin: 0; font-size: 28px;">Welcome to Bogle Pay!</h1>
                <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 16px;">You're on the waitlist for smart payments</p>
              </div>
              
              <div style="background: white; padding: 40px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                <h2 style="color: #1f2937; margin-top: 0;">Thanks for joining our waitlist!</h2>
                
                <p style="color: #4b5563; line-height: 1.6;">
                  We're excited to have you on board. You'll be among the first to know when Bogle Pay launches and get early access to:
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
                <p>© 2025 Bogle Pay. Smart payments for modern businesses.</p>
              </div>
            </div>
          `,
          Charset: 'UTF-8'
        }
      }
    }
  };

  try {
    await sesClient.send(new SendEmailCommand(emailParams));
    
    // Track email sent
    await docClient.send(new PutCommand({
      TableName: EMAIL_TRACKING_TABLE,
      Item: {
        email,
        timestamp: new Date().toISOString(),
        type: 'confirmation',
        status: 'sent'
      }
    }));
    
    console.log('Confirmation email sent to:', email);
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}

exports.handler = async (event) => {
  console.log('Event:', JSON.stringify(event, null, 2));

  try {
    const { httpMethod, path, body, headers } = event;

    // Handle CORS preflight
    if (httpMethod === 'OPTIONS') {
      return {
        statusCode: 200,
        headers: corsHeaders,
        body: ''
      };
    }

    // Handle POST /waitlist - Add to waitlist
    if (httpMethod === 'POST' && path === '/waitlist') {
      const requestBody = JSON.parse(body || '{}');
      const { email } = requestBody;

      // Validate email
      if (!email || !isValidEmail(email)) {
        return {
          statusCode: 400,
          headers: corsHeaders,
          body: JSON.stringify({
            success: false,
            message: 'Please enter a valid email address'
          })
        };
      }

      const normalizedEmail = email.toLowerCase().trim();

      // Check if email already exists
      try {
        const existingItem = await docClient.send(new GetCommand({
          TableName: WAITLIST_TABLE,
          Key: { email: normalizedEmail }
        }));

        if (existingItem.Item) {
          return {
            statusCode: 409,
            headers: corsHeaders,
            body: JSON.stringify({
              success: false,
              message: 'This email is already on our waitlist!'
            })
          };
        }
      } catch (error) {
        console.error('Error checking existing email:', error);
      }

      // Add to waitlist
      const timestamp = new Date().toISOString();
      const waitlistEntry = {
        email: normalizedEmail,
        timestamp,
        ip: event.requestContext?.identity?.sourceIp || 'unknown',
        userAgent: headers?.['User-Agent'] || headers?.['user-agent'] || 'unknown'
      };

      await docClient.send(new PutCommand({
        TableName: WAITLIST_TABLE,
        Item: waitlistEntry
      }));

      // Send confirmation email
      try {
        await sendConfirmationEmail(normalizedEmail);
      } catch (emailError) {
        console.error('Email sending failed, but user was added to waitlist:', emailError);
      }

      return {
        statusCode: 201,
        headers: corsHeaders,
        body: JSON.stringify({
          success: true,
          message: 'Successfully joined the waitlist! Check your email for confirmation.'
        })
      };
    }

    // Handle GET /waitlist/stats - Get waitlist statistics
    if (httpMethod === 'GET' && path === '/waitlist/stats') {
      try {
        const result = await docClient.send(new ScanCommand({
          TableName: WAITLIST_TABLE,
          Select: 'COUNT'
        }));

        return {
          statusCode: 200,
          headers: corsHeaders,
          body: JSON.stringify({
            success: true,
            count: result.Count || 0,
            message: `${result.Count || 0} people on the waitlist`
          })
        };
      } catch (error) {
        console.error('Error getting stats:', error);
        return {
          statusCode: 200,
          headers: corsHeaders,
          body: JSON.stringify({
            success: true,
            count: 0,
            message: '0 people on the waitlist'
          })
        };
      }
    }

    // Handle GET /health - Health check
    if (httpMethod === 'GET' && path === '/health') {
      return {
        statusCode: 200,
        headers: corsHeaders,
        body: JSON.stringify({
          success: true,
          message: 'Bogle Pay API is running',
          timestamp: new Date().toISOString()
        })
      };
    }

    // 404 for unknown routes
    return {
      statusCode: 404,
      headers: corsHeaders,
      body: JSON.stringify({
        success: false,
        message: 'Endpoint not found'
      })
    };

  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({
        success: false,
        message: 'Something went wrong. Please try again later.'
      })
    };
  }
};
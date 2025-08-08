exports.handler = async (event, context) => {
  // Handle CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod === 'POST') {
    try {
      const { email } = JSON.parse(event.body);
      
      // Basic validation
      if (!email || !email.includes('@')) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({
            success: false,
            message: 'Invalid email address'
          })
        };
      }

      // For now, just return success (you can add email service later)
      return {
        statusCode: 201,
        headers,
        body: JSON.stringify({
          success: true,
          message: 'Successfully joined the waitlist! Check your email for confirmation.'
        })
      };

    } catch (error) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          success: false,
          message: 'Something went wrong. Please try again later.'
        })
      };
    }
  }

  return {
    statusCode: 405,
    headers,
    body: JSON.stringify({
      success: false,
      message: 'Method not allowed'
    })
  };
};
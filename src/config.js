// API Configuration
const config = {
  // Development API URL (your local server)
  development: {
    apiUrl: 'http://localhost:3002'
  },

  // Production API URL - Choose one:
  production: {
    // Option 1: Vercel functions (current)
    apiUrl: 'https://bogle-landing-page-29roage8x-tmgorusus-projects.vercel.app',
    
    // Option 2: AWS API Gateway (uncomment after AWS deployment)
    // apiUrl: 'https://YOUR_API_ID.execute-api.us-east-1.amazonaws.com/dev'
  }
};

// Determine environment
const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
const environment = isDevelopment ? 'development' : 'production';

export const API_URL = config[environment].apiUrl;
export default config;
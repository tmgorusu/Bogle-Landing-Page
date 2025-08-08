// API Configuration
const config = {
  // Development API URL (your local server)
  development: {
    apiUrl: 'http://localhost:3002'
  },

  // Production API URL (replace with your Vercel URL after deployment)
  production: {
    apiUrl: 'https://your-site-name.netlify.app'
  }
};

// Determine environment
const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
const environment = isDevelopment ? 'development' : 'production';

export const API_URL = config[environment].apiUrl;
export default config;
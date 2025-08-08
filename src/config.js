// API Configuration
const config = {
  // Development API URL (your local server)
  development: {
    apiUrl: 'http://localhost:3002'
  },

  // Production API URL - Vercel functions
  production: {
    apiUrl: 'https://bogle-landing-page-29roage8x-tmgorusus-projects.vercel.app'
  }
};

// Determine environment
const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
const environment = isDevelopment ? 'development' : 'production';

export const API_URL = config[environment].apiUrl;
export default config;
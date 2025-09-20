// API Configuration
const config = {
  // Development API URL (use AWS for development too)
  development: {
    apiUrl: "https://psu7qowms4.execute-api.us-east-1.amazonaws.com/prod",
  },

  // Production API URL - Choose one:
  production: {
    // Option 1: Vercel functions (current)
    // apiUrl:
    //   "https://bogle-landing-page-29roage8x-tmgorusus-projects.vercel.app",

    // Option 2: AWS API Gateway (current)
    apiUrl: "https://psu7qowms4.execute-api.us-east-1.amazonaws.com/prod",
  },
};

// Determine environment
const isDevelopment =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1";
const environment = isDevelopment ? "development" : "production";

export const API_URL = config[environment].apiUrl;
export const API_BASE_URL = API_URL;

console.log("Environment:", environment);
console.log("API_BASE_URL:", API_BASE_URL);
export default config;

// API Configuration
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
  TIMEOUT: 10000,
};

// Fallback for development
export const getApiUrl = () => {
  return API_CONFIG.BASE_URL;
};

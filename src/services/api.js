import axios from 'axios';

// Base API configuration
//  const API_BASE_URL = 'https://centumacademy.com';
  const API_BASE_URL = 'http://localhost:8080';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds
});

// Request interceptor - Add auth token if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;
      
      if (status === 401) {
        // Unauthorized - clear token
        localStorage.removeItem('authToken');
        
        // ✅ FIX: Only redirect to login if the user isn't already on the login page!
        // This prevents the page from refreshing when they type a wrong password,
        // allowing the "Invalid Credentials" toast message to finally show up.
        if (!window.location.pathname.includes('/login')) {
          window.location.href = '/login';
        }
      }
      
      // Return error message from backend or default message
      return Promise.reject(data?.message || 'An error occurred');
    } else if (error.request) {
      // Request made but no response received
      return Promise.reject('Network error. Please check your connection.');
    } else {
      // Something else happened
      return Promise.reject(error.message);
    }
  }
);

export default api;
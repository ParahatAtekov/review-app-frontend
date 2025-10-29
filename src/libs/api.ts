// frontend/src/lib/api.ts
import axios from 'axios';

const api = axios.create({
  // BACKEND runs on port 5000 (or whatever you set in backend/server.ts)
  baseURL: 'http://localhost:5001/api',
  // Optional: Add timeout to catch issues faster
  timeout: 10000,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.message);
    return Promise.reject(error);
  }
);

export default api;
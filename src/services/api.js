// services/api.js
import axios from 'axios';

// Gunakan proxy di development, langsung di production
const API_BASE_URL = import.meta.env.DEV 
  ? '/api'  // proxy
  : 'https://horus-ryan-backend.onrender.com';

// Create axios instance dengan config default
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 detik timeout
});

// Request interceptor untuk menambahkan token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor untuk handle errors
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token expired atau invalid
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login'; // Redirect ke login
    }
    return Promise.reject(error);
  }
);

// Auth endpoints
export const authAPI = {
  async register(userData) {
    try {
      const response = await apiClient.post('/users/register', userData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  async login(credentials) {
    try {
      const response = await apiClient.post('/users/login', credentials);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  async logout() {
    try {
      const response = await apiClient.post('/users/logout');
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  async getProfile() {
    try {
      const response = await apiClient.get('/users/profile');
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  handleError(error) {
    if (error.response) {
      // Server responded dengan error status
      const message = error.response.data?.message || error.response.data?.error || 'Request failed';
      const status = error.response.status;
      return new Error(`${status}: ${message}`);
    } else if (error.request) {
      // Request dibuat tapi tidak ada response
      return new Error('No response from server. Please check your connection.');
    } else {
      // Error lainnya
      return new Error(error.message || 'An unexpected error occurred');
    }
  }
};

// User endpoints
export const userAPI = {
  async getUsers() {
    try {
      const response = await apiClient.get('/users');
      return response.data.data;
    } catch (error) {
      throw authAPI.handleError(error);
    }
  },

  async getUserById(userId) {
    try {
      const response = await apiClient.get('/users');
      const allUsers = response.data.data;
      const foundUser = allUsers.find(user => user.id == userId);
      
      if (foundUser) {
        return foundUser;
      } else {
        throw new Error(`User with ID ${userId} not found`);
      }
    } catch (error) {
      throw authAPI.handleError(error);
    }
  },

  async updateUser(userId, userData) {
    try {
      const response = await apiClient.put(`/users/${userId}`, userData);
      return response.data;
    } catch (error) {
      throw authAPI.handleError(error);
    }
  },

  async deleteUser(userId) {
    try {
      const response = await apiClient.delete(`/users/${userId}`);
      return response.data;
    } catch (error) {
      throw authAPI.handleError(error);
    }
  }
};

export { API_BASE_URL, apiClient };
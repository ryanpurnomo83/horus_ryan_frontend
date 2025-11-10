// services/auth.js
import { authAPI } from '../services/api';

export const authService = {
  async register(userData) {
    try {
      const response = await authAPI.register(userData);
      
      // Jika register berhasil dan langsung login, simpan token
      if (response && response.user) {
        this.setUserData(response.user);
      }
      
      return {
        success: true,
        data: response,
        message: 'Registration successful'
      };
    } catch (error) {
      console.error('Registration error:', error);
      return {
        success: false,
        error: error.message,
        message: 'Registration failed: ' + error.message
      };
    }
  },

  // Login user
  async login(credentials) {
    try {
      const response = await authAPI.login(credentials);
      console.log(credentials);
      // Simpan token dan user data
      if (response.token) {
        this.setAuthToken(response.token);
        this.setUserData(response.user);
        
        return {
          success: true,
          data: response,
          message: 'Login successful'
        };
      } else {
        throw new Error('No token received from server');
      }
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        error: error.message,
        message: 'Login failed: ' + error.message
      };
    }
  },

  // Logout user
  async logout() {
    try {
      await authAPI.logout();
    } catch (error) {
      console.error('Logout error:', error);
      // Tetap lanjutkan logout meskipun API call gagal
    } finally {
      this.clearAuth();
      // Redirect ke login page
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
  },

  // Get user profile
  async getProfile() {
    try {
      const response = await authAPI.getProfile();
      return {
        success: true,
        data: response,
        message: 'Profile retrieved successfully'
      };
    } catch (error) {
      console.error('Get profile error:', error);
      return {
        success: false,
        error: error.message,
        message: 'Failed to get profile'
      };
    }
  },

  // Set authentication token
  setAuthToken(token) {
    localStorage.setItem('token', token);
    // Token akan otomatis ditambahkan ke header via interceptor
  },

  // Set user data
  setUserData(user) {
    localStorage.setItem('user', JSON.stringify(user));
  },

  // Clear authentication data
  clearAuth() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  // Check if user is authenticated
  isAuthenticated() {
    const token = localStorage.getItem('token');
    if (!token) return false;

    return true;
  },

  // Get current user
  getCurrentUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  // Get auth token
  getToken() {
    return localStorage.getItem('token');
  },

  // Check if user has specific role
  hasRole(role) {
    const user = this.getCurrentUser();
    return user && user.role === role;
  }
};

export default authService;
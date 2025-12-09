// Real API Client for RoboTech Backend
import axios from 'axios';

// API Base URL - change based on environment
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';


// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - Add auth token to requests
apiClient.interceptors.request.use(
  (config) => {
    let token = localStorage.getItem('token');
    try {
      const parsed = JSON.parse(token);
      if (parsed) token = parsed;
    } catch (e) {
      // Token is likely a raw string, use as is
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle responses and errors
apiClient.interceptors.response.use(
  (response) => {
    // Return the data directly from our backend format { success, data }
    return response.data;
  },
  (error) => {
    // Handle 401 Unauthorized
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('admin');

      // Redirect to login if on admin page
      if (window.location.pathname.startsWith('/admin')) {
        window.location.href = '/admin/login';
      }
    }

    // Return formatted error
    const message = error.response?.data?.message || 'An error occurred';
    return Promise.reject({
      message,
      status: error.response?.status,
      ...error.response?.data
    });
  }
);

// API object with all endpoints
const api = {
  // Authentication
  auth: {
    login: async (email, password) => {
      const response = await apiClient.post('/auth/login', { email, password });
      return response;
    },
    register: async (data) => {
      const response = await apiClient.post('/auth/register', data);
      return response;
    },
    getMe: async () => {
      const response = await apiClient.get('/auth/me');
      return response;
    },
    updateProfile: async (data) => {
      const response = await apiClient.put('/auth/profile', data);
      return response;
    },
    changePassword: async (currentPassword, newPassword) => {
      const response = await apiClient.put('/auth/change-password', {
        currentPassword,
        newPassword
      });
      return response;
    },
  },

  // Products
  products: {
    getAll: async (filters = {}) => {
      const response = await apiClient.get('/products', { params: filters });
      return response;
    },
    getFeatured: async () => {
      const response = await apiClient.get('/products/featured');
      return response;
    },
    getById: async (id) => {
      const response = await apiClient.get(`/products/${id}`);
      return response;
    },
    create: async (formData) => {
      const response = await apiClient.post('/products', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return response;
    },
    update: async (id, formData) => {
      const response = await apiClient.put(`/products/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return response;
    },
    delete: async (id) => {
      const response = await apiClient.delete(`/products/${id}`);
      return response;
    },
  },

  // Categories
  categories: {
    getAll: async (filters = {}) => {
      const response = await apiClient.get('/categories', { params: filters });
      return response;
    },
    getById: async (id) => {
      const response = await apiClient.get(`/categories/${id}`);
      return response;
    },
    create: async (formData) => {
      const response = await apiClient.post('/categories', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return response;
    },
    update: async (id, formData) => {
      const response = await apiClient.put(`/categories/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return response;
    },
    delete: async (id) => {
      const response = await apiClient.delete(`/categories/${id}`);
      return response;
    },
  },

  // Reviews
  reviews: {
    getAll: async (filters = {}) => {
      const response = await apiClient.get('/reviews', { params: filters });
      return response;
    },
    getByProduct: async (productId, filters = {}) => {
      const response = await apiClient.get(`/reviews/product/${productId}`, { params: filters });
      return response;
    },
    create: async (data) => {
      const response = await apiClient.post('/reviews', data);
      return response;
    },
    approve: async (id) => {
      const response = await apiClient.put(`/reviews/${id}/approve`);
      return response;
    },
    reject: async (id) => {
      const response = await apiClient.put(`/reviews/${id}/reject`);
      return response;
    },
    markHelpful: async (id) => {
      const response = await apiClient.put(`/reviews/${id}/helpful`);
      return response;
    },
    delete: async (id) => {
      const response = await apiClient.delete(`/reviews/${id}`);
      return response;
    },
  },

  // Messages/Contact
  messages: {
    getAll: async (filters = {}) => {
      const response = await apiClient.get('/messages', { params: filters });
      return response;
    },
    getById: async (id) => {
      const response = await apiClient.get(`/messages/${id}`);
      return response;
    },
    create: async (data) => {
      const response = await apiClient.post('/messages', data);
      return response;
    },
    markAsRead: async (id) => {
      const response = await apiClient.put(`/messages/${id}/read`);
      return response;
    },
    markAsReplied: async (id, notes) => {
      const response = await apiClient.put(`/messages/${id}/reply`, { notes });
      return response;
    },
    archive: async (id) => {
      const response = await apiClient.put(`/messages/${id}/archive`);
      return response;
    },
    updatePriority: async (id, priority) => {
      const response = await apiClient.put(`/messages/${id}/priority`, { priority });
      return response;
    },
    delete: async (id) => {
      const response = await apiClient.delete(`/messages/${id}`);
      return response;
    },
  },
};

export default api;
export { apiClient, API_BASE_URL };
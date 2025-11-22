// API Client
// This is the main API client that your components should use
// Switch between mock API and real API by changing the import

// For development with mock data:
import mockAPI from './mockAPI';
export const api = mockAPI;

// For production with real backend, uncomment and configure:
/*
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle errors globally
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized - redirect to login
      localStorage.removeItem('authToken');
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

// Real API implementation
export const api = {
  products: {
    getAll: async (filters) => {
      const response = await apiClient.get('/products', { params: filters });
      return response.data;
    },
    getById: async (id) => {
      const response = await apiClient.get(`/products/${id}`);
      return response.data;
    },
    create: async (data) => {
      const response = await apiClient.post('/products', data);
      return response.data;
    },
    update: async (id, data) => {
      const response = await apiClient.put(`/products/${id}`, data);
      return response.data;
    },
    delete: async (id) => {
      const response = await apiClient.delete(`/products/${id}`);
      return response.data;
    },
  },
  
  categories: {
    getAll: async () => {
      const response = await apiClient.get('/categories');
      return response.data;
    },
    getById: async (id) => {
      const response = await apiClient.get(`/categories/${id}`);
      return response.data;
    },
    create: async (data) => {
      const response = await apiClient.post('/categories', data);
      return response.data;
    },
    update: async (id, data) => {
      const response = await apiClient.put(`/categories/${id}`, data);
      return response.data;
    },
    delete: async (id) => {
      const response = await apiClient.delete(`/categories/${id}`);
      return response.data;
    },
  },
  
  reviews: {
    getAll: async (filters) => {
      const response = await apiClient.get('/reviews', { params: filters });
      return response.data;
    },
    approve: async (id) => {
      const response = await apiClient.post(`/reviews/${id}/approve`);
      return response.data;
    },
    reject: async (id) => {
      const response = await apiClient.post(`/reviews/${id}/reject`);
      return response.data;
    },
    delete: async (id) => {
      const response = await apiClient.delete(`/reviews/${id}`);
      return response.data;
    },
  },
  
  messages: {
    getAll: async (filters) => {
      const response = await apiClient.get('/messages', { params: filters });
      return response.data;
    },
    getById: async (id) => {
      const response = await apiClient.get(`/messages/${id}`);
      return response.data;
    },
    markAsRead: async (id) => {
      const response = await apiClient.post(`/messages/${id}/read`);
      return response.data;
    },
    archive: async (id) => {
      const response = await apiClient.post(`/messages/${id}/archive`);
      return response.data;
    },
    delete: async (id) => {
      const response = await apiClient.delete(`/messages/${id}`);
      return response.data;
    },
    send: async (data) => {
      const response = await apiClient.post('/messages', data);
      return response.data;
    },
  },
  
  orders: {
    getAll: async () => {
      const response = await apiClient.get('/orders');
      return response.data;
    },
  },
};
*/

// Export for easy imports
export default api;
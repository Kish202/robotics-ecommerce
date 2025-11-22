// Mock API Service
// Simulates API calls with delays to mimic real network requests
// Replace this with actual API calls when backend is ready

import {
  mockProducts,
  mockCategories,
  mockReviews,
  mockMessages,
  mockOrders,
} from './mockData';

// Simulate network delay
const delay = (ms = 500) => new Promise((resolve) => setTimeout(resolve, ms));

// Products API
export const productsAPI = {
  // Get all products
  getAll: async (filters = {}) => {
    await delay();
    let products = [...mockProducts];

    // Apply filters
    if (filters.category && filters.category !== 'all') {
      products = products.filter((p) => p.category === filters.category);
    }

    if (filters.minPrice) {
      products = products.filter((p) => p.price >= filters.minPrice);
    }

    if (filters.maxPrice) {
      products = products.filter((p) => p.price <= filters.maxPrice);
    }

    if (filters.minRating) {
      products = products.filter((p) => p.rating >= filters.minRating);
    }

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      products = products.filter(
        (p) =>
          p.name.toLowerCase().includes(searchLower) ||
          p.description.toLowerCase().includes(searchLower)
      );
    }

    return {
      success: true,
      data: products,
      total: products.length,
    };
  },

  // Get product by ID
  getById: async (id) => {
    await delay();
    const product = mockProducts.find((p) => p.id === parseInt(id));

    if (!product) {
      return {
        success: false,
        error: 'Product not found',
      };
    }

    return {
      success: true,
      data: product,
    };
  },

  // Create product
  create: async (productData) => {
    await delay();
    const newProduct = {
      id: mockProducts.length + 1,
      ...productData,
      createdAt: new Date().toISOString(),
    };

    mockProducts.push(newProduct);

    return {
      success: true,
      data: newProduct,
      message: 'Product created successfully',
    };
  },

  // Update product
  update: async (id, productData) => {
    await delay();
    const index = mockProducts.findIndex((p) => p.id === parseInt(id));

    if (index === -1) {
      return {
        success: false,
        error: 'Product not found',
      };
    }

    mockProducts[index] = {
      ...mockProducts[index],
      ...productData,
      updatedAt: new Date().toISOString(),
    };

    return {
      success: true,
      data: mockProducts[index],
      message: 'Product updated successfully',
    };
  },

  // Delete product
  delete: async (id) => {
    await delay();
    const index = mockProducts.findIndex((p) => p.id === parseInt(id));

    if (index === -1) {
      return {
        success: false,
        error: 'Product not found',
      };
    }

    mockProducts.splice(index, 1);

    return {
      success: true,
      message: 'Product deleted successfully',
    };
  },
};

// Categories API
export const categoriesAPI = {
  getAll: async () => {
    await delay();
    return {
      success: true,
      data: mockCategories,
    };
  },

  getById: async (id) => {
    await delay();
    const category = mockCategories.find((c) => c.id === parseInt(id));

    if (!category) {
      return {
        success: false,
        error: 'Category not found',
      };
    }

    return {
      success: true,
      data: category,
    };
  },

  create: async (categoryData) => {
    await delay();
    const newCategory = {
      id: mockCategories.length + 1,
      ...categoryData,
      productCount: 0,
    };

    mockCategories.push(newCategory);

    return {
      success: true,
      data: newCategory,
      message: 'Category created successfully',
    };
  },

  update: async (id, categoryData) => {
    await delay();
    const index = mockCategories.findIndex((c) => c.id === parseInt(id));

    if (index === -1) {
      return {
        success: false,
        error: 'Category not found',
      };
    }

    mockCategories[index] = {
      ...mockCategories[index],
      ...categoryData,
    };

    return {
      success: true,
      data: mockCategories[index],
      message: 'Category updated successfully',
    };
  },

  delete: async (id) => {
    await delay();
    const index = mockCategories.findIndex((c) => c.id === parseInt(id));

    if (index === -1) {
      return {
        success: false,
        error: 'Category not found',
      };
    }

    mockCategories.splice(index, 1);

    return {
      success: true,
      message: 'Category deleted successfully',
    };
  },
};

// Reviews API
export const reviewsAPI = {
  getAll: async (filters = {}) => {
    await delay();
    let reviews = [...mockReviews];

    if (filters.productId) {
      reviews = reviews.filter((r) => r.productId === parseInt(filters.productId));
    }

    if (filters.status) {
      reviews = reviews.filter((r) => r.status === filters.status);
    }

    if (filters.rating) {
      reviews = reviews.filter((r) => r.rating === parseInt(filters.rating));
    }

    return {
      success: true,
      data: reviews,
      total: reviews.length,
    };
  },

  getById: async (id) => {
    await delay();
    const review = mockReviews.find((r) => r.id === parseInt(id));

    if (!review) {
      return {
        success: false,
        error: 'Review not found',
      };
    }

    return {
      success: true,
      data: review,
    };
  },

  approve: async (id) => {
    await delay();
    const review = mockReviews.find((r) => r.id === parseInt(id));

    if (!review) {
      return {
        success: false,
        error: 'Review not found',
      };
    }

    review.status = 'approved';

    return {
      success: true,
      data: review,
      message: 'Review approved successfully',
    };
  },

  reject: async (id) => {
    await delay();
    const review = mockReviews.find((r) => r.id === parseInt(id));

    if (!review) {
      return {
        success: false,
        error: 'Review not found',
      };
    }

    review.status = 'rejected';

    return {
      success: true,
      data: review,
      message: 'Review rejected successfully',
    };
  },

  delete: async (id) => {
    await delay();
    const index = mockReviews.findIndex((r) => r.id === parseInt(id));

    if (index === -1) {
      return {
        success: false,
        error: 'Review not found',
      };
    }

    mockReviews.splice(index, 1);

    return {
      success: true,
      message: 'Review deleted successfully',
    };
  },
};

// Messages API
export const messagesAPI = {
  getAll: async (filters = {}) => {
    await delay();
    let messages = [...mockMessages];

    if (filters.status && filters.status !== 'all') {
      messages = messages.filter((m) => m.status === filters.status);
    }

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      messages = messages.filter(
        (m) =>
          m.name.toLowerCase().includes(searchLower) ||
          m.email.toLowerCase().includes(searchLower) ||
          m.subject.toLowerCase().includes(searchLower)
      );
    }

    return {
      success: true,
      data: messages,
      total: messages.length,
    };
  },

  getById: async (id) => {
    await delay();
    const message = mockMessages.find((m) => m.id === parseInt(id));

    if (!message) {
      return {
        success: false,
        error: 'Message not found',
      };
    }

    return {
      success: true,
      data: message,
    };
  },

  markAsRead: async (id) => {
    await delay();
    const message = mockMessages.find((m) => m.id === parseInt(id));

    if (!message) {
      return {
        success: false,
        error: 'Message not found',
      };
    }

    message.status = 'read';

    return {
      success: true,
      data: message,
    };
  },

  archive: async (id) => {
    await delay();
    const message = mockMessages.find((m) => m.id === parseInt(id));

    if (!message) {
      return {
        success: false,
        error: 'Message not found',
      };
    }

    message.status = 'archived';

    return {
      success: true,
      data: message,
    };
  },

  delete: async (id) => {
    await delay();
    const index = mockMessages.findIndex((m) => m.id === parseInt(id));

    if (index === -1) {
      return {
        success: false,
        error: 'Message not found',
      };
    }

    mockMessages.splice(index, 1);

    return {
      success: true,
      message: 'Message deleted successfully',
    };
  },

  // Send message (from contact form)
  send: async (messageData) => {
    await delay();
    const newMessage = {
      id: mockMessages.length + 1,
      ...messageData,
      date: new Date().toLocaleString(),
      status: 'unread',
      priority: 'normal',
      starred: false,
    };

    mockMessages.push(newMessage);

    return {
      success: true,
      data: newMessage,
      message: 'Message sent successfully',
    };
  },
};

// Orders API
export const ordersAPI = {
  getAll: async () => {
    await delay();
    return {
      success: true,
      data: mockOrders,
    };
  },
};

// Export all APIs
export default {
  products: productsAPI,
  categories: categoriesAPI,
  reviews: reviewsAPI,
  messages: messagesAPI,
  orders: ordersAPI,
};
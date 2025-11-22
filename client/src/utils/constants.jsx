// Application Constants

// API Configuration
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

// App Information
export const APP_NAME = import.meta.env.VITE_APP_NAME || 'RoboTech';
export const APP_VERSION = import.meta.env.VITE_APP_VERSION || '1.0.0';

// Pagination
export const DEFAULT_PAGE_SIZE = 12;
export const ITEMS_PER_PAGE_OPTIONS = [12, 24, 36, 48];

// Product Categories
export const PRODUCT_CATEGORIES = [
  'Robot Cleaners',
  'Kitchen Robots',
  'Lawn Care',
  'Service Robots',
  'Smart Home',
];

// Product Status
export const PRODUCT_STATUS = {
  ACTIVE: 'active',
  DRAFT: 'draft',
  OUT_OF_STOCK: 'out_of_stock',
  DISCONTINUED: 'discontinued',
};

// Order Status
export const ORDER_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
  REFUNDED: 'refunded',
};

// Review Status
export const REVIEW_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
};

// Message Status
export const MESSAGE_STATUS = {
  UNREAD: 'unread',
  READ: 'read',
  ARCHIVED: 'archived',
};

// Message Priority
export const MESSAGE_PRIORITY = {
  LOW: 'low',
  NORMAL: 'normal',
  HIGH: 'high',
  URGENT: 'urgent',
};

// Badge Variants
export const BADGE_VARIANTS = {
  DEFAULT: 'default',
  PRIMARY: 'primary',
  SUCCESS: 'success',
  WARNING: 'warning',
  DANGER: 'danger',
  INFO: 'info',
  PURPLE: 'purple',
};

// Button Variants
export const BUTTON_VARIANTS = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  OUTLINE: 'outline',
  GHOST: 'ghost',
  DANGER: 'danger',
  SUCCESS: 'success',
};

// Sort Options
export const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'popular', label: 'Most Popular' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'newest', label: 'Newest First' },
];

// Price Ranges
export const PRICE_RANGES = [
  { id: 'under-500', label: 'Under $500', min: 0, max: 500 },
  { id: '500-1000', label: '$500 - $1,000', min: 500, max: 1000 },
  { id: '1000-1500', label: '$1,000 - $1,500', min: 1000, max: 1500 },
  { id: '1500-2000', label: '$1,500 - $2,000', min: 1500, max: 2000 },
  { id: 'over-2000', label: 'Over $2,000', min: 2000, max: Infinity },
];

// Rating Filters
export const RATING_FILTERS = [5, 4, 3, 2, 1];

// Features
export const PRODUCT_FEATURES = [
  { id: 'ai-powered', name: 'AI Powered' },
  { id: 'voice-control', name: 'Voice Control' },
  { id: 'app-control', name: 'App Control' },
  { id: 'auto-charging', name: 'Auto Charging' },
  { id: 'mapping', name: 'Smart Mapping' },
  { id: 'scheduling', name: 'Scheduling' },
];

// Social Media Links
export const SOCIAL_LINKS = {
  FACEBOOK: 'https://facebook.com/robotech',
  TWITTER: 'https://twitter.com/robotech',
  INSTAGRAM: 'https://instagram.com/robotech',
  LINKEDIN: 'https://linkedin.com/company/robotech',
  YOUTUBE: 'https://youtube.com/robotech',
};

// Contact Information
export const CONTACT_INFO = {
  EMAIL: 'info@robotech.com',
  PHONE: '+1 (234) 567-890',
  ADDRESS: '123 Tech Street, Silicon Valley, CA 94025',
  WORKING_HOURS: 'Mon - Fri: 9:00 AM - 6:00 PM',
};

// Local Storage Keys
export const STORAGE_KEYS = {
  CART: 'cart',
  USER: 'user',
  AUTH_TOKEN: 'authToken',
  THEME: 'theme',
  WISHLIST: 'wishlist',
  RECENTLY_VIEWED: 'recentlyViewed',
};

// Routes
export const ROUTES = {
  HOME: '/',
  PRODUCTS: '/products',
  PRODUCT_DETAIL: '/products/:id',
  ABOUT: '/about',
  CONTACT: '/contact',
  CART: '/cart',
  CHECKOUT: '/checkout',
  ADMIN: '/admin',
  ADMIN_PRODUCTS: '/admin/products',
  ADMIN_CATEGORIES: '/admin/categories',
  ADMIN_REVIEWS: '/admin/reviews',
  ADMIN_MESSAGES: '/admin/messages',
};

// Error Messages
export const ERROR_MESSAGES = {
  GENERIC: 'Something went wrong. Please try again.',
  NETWORK: 'Network error. Please check your connection.',
  NOT_FOUND: 'The requested resource was not found.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  VALIDATION: 'Please check your input and try again.',
};

// Success Messages
export const SUCCESS_MESSAGES = {
  PRODUCT_ADDED: 'Product added to cart successfully!',
  PRODUCT_REMOVED: 'Product removed from cart.',
  ORDER_PLACED: 'Order placed successfully!',
  MESSAGE_SENT: 'Message sent successfully!',
  SUBSCRIBED: 'Successfully subscribed to newsletter!',
};

// Regex Patterns
export const REGEX_PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^[\d\s\-\+\(\)]+$/,
  URL: /^https?:\/\/.+/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
};

// Animation Durations (in milliseconds)
export const ANIMATION_DURATION = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
};

// Breakpoints (matches Tailwind CSS)
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536,
};

export default {
  API_BASE_URL,
  APP_NAME,
  APP_VERSION,
  DEFAULT_PAGE_SIZE,
  PRODUCT_CATEGORIES,
  PRODUCT_STATUS,
  ORDER_STATUS,
  REVIEW_STATUS,
  MESSAGE_STATUS,
  MESSAGE_PRIORITY,
  BADGE_VARIANTS,
  BUTTON_VARIANTS,
  SORT_OPTIONS,
  PRICE_RANGES,
  RATING_FILTERS,
  PRODUCT_FEATURES,
  SOCIAL_LINKS,
  CONTACT_INFO,
  STORAGE_KEYS,
  ROUTES,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  REGEX_PATTERNS,
  ANIMATION_DURATION,
  BREAKPOINTS,
  
};
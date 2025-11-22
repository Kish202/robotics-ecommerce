// Form Validation Functions
import { REGEX_PATTERNS } from './constants';

/**
 * Validate email address
 * @param {string} email - Email to validate
 * @returns {Object} - { isValid: boolean, error: string }
 */
export const validateEmail = (email) => {
  if (!email || email.trim() === '') {
    return { isValid: false, error: 'Email is required' };
  }

  if (!REGEX_PATTERNS.EMAIL.test(email)) {
    return { isValid: false, error: 'Invalid email format' };
  }

  return { isValid: true, error: null };
};

/**
 * Validate password
 * @param {string} password - Password to validate
 * @returns {Object} - { isValid: boolean, error: string }
 */
export const validatePassword = (password) => {
  if (!password || password.trim() === '') {
    return { isValid: false, error: 'Password is required' };
  }

  if (password.length < 8) {
    return { isValid: false, error: 'Password must be at least 8 characters' };
  }

  if (!REGEX_PATTERNS.PASSWORD.test(password)) {
    return {
      isValid: false,
      error: 'Password must contain uppercase, lowercase, and number',
    };
  }

  return { isValid: true, error: null };
};

/**
 * Validate required field
 * @param {string} value - Value to validate
 * @param {string} fieldName - Name of the field for error message
 * @returns {Object} - { isValid: boolean, error: string }
 */
export const validateRequired = (value, fieldName = 'This field') => {
  if (!value || (typeof value === 'string' && value.trim() === '')) {
    return { isValid: false, error: `${fieldName} is required` };
  }

  return { isValid: true, error: null };
};

/**
 * Validate phone number
 * @param {string} phone - Phone number to validate
 * @returns {Object} - { isValid: boolean, error: string }
 */
export const validatePhone = (phone) => {
  if (!phone || phone.trim() === '') {
    return { isValid: false, error: 'Phone number is required' };
  }

  if (!REGEX_PATTERNS.PHONE.test(phone)) {
    return { isValid: false, error: 'Invalid phone number format' };
  }

  return { isValid: true, error: null };
};

/**
 * Validate URL
 * @param {string} url - URL to validate
 * @returns {Object} - { isValid: boolean, error: string }
 */
export const validateURL = (url) => {
  if (!url || url.trim() === '') {
    return { isValid: false, error: 'URL is required' };
  }

  if (!REGEX_PATTERNS.URL.test(url)) {
    return { isValid: false, error: 'Invalid URL format' };
  }

  return { isValid: true, error: null };
};

/**
 * Validate minimum length
 * @param {string} value - Value to validate
 * @param {number} minLength - Minimum length
 * @param {string} fieldName - Field name for error message
 * @returns {Object} - { isValid: boolean, error: string }
 */
export const validateMinLength = (value, minLength, fieldName = 'This field') => {
  if (!value) {
    return { isValid: false, error: `${fieldName} is required` };
  }

  if (value.length < minLength) {
    return {
      isValid: false,
      error: `${fieldName} must be at least ${minLength} characters`,
    };
  }

  return { isValid: true, error: null };
};

/**
 * Validate maximum length
 * @param {string} value - Value to validate
 * @param {number} maxLength - Maximum length
 * @param {string} fieldName - Field name for error message
 * @returns {Object} - { isValid: boolean, error: string }
 */
export const validateMaxLength = (value, maxLength, fieldName = 'This field') => {
  if (value && value.length > maxLength) {
    return {
      isValid: false,
      error: `${fieldName} must be at most ${maxLength} characters`,
    };
  }

  return { isValid: true, error: null };
};

/**
 * Validate number range
 * @param {number} value - Value to validate
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @param {string} fieldName - Field name for error message
 * @returns {Object} - { isValid: boolean, error: string }
 */
export const validateRange = (value, min, max, fieldName = 'This field') => {
  const num = parseFloat(value);

  if (isNaN(num)) {
    return { isValid: false, error: `${fieldName} must be a number` };
  }

  if (num < min || num > max) {
    return {
      isValid: false,
      error: `${fieldName} must be between ${min} and ${max}`,
    };
  }

  return { isValid: true, error: null };
};

/**
 * Validate product form
 * @param {Object} data - Product form data
 * @returns {Object} - { isValid: boolean, errors: Object }
 */
export const validateProductForm = (data) => {
  const errors = {};

  // Name
  const nameValidation = validateRequired(data.name, 'Product name');
  if (!nameValidation.isValid) {
    errors.name = nameValidation.error;
  }

  // Category
  const categoryValidation = validateRequired(data.category, 'Category');
  if (!categoryValidation.isValid) {
    errors.category = categoryValidation.error;
  }

  // Price
  if (!data.price || parseFloat(data.price) <= 0) {
    errors.price = 'Valid price is required';
  }

  // Description
  const descValidation = validateMinLength(data.description, 10, 'Description');
  if (!descValidation.isValid) {
    errors.description = descValidation.error;
  }

  // Stock
  if (data.stock === undefined || parseInt(data.stock) < 0) {
    errors.stock = 'Valid stock quantity is required';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Validate contact form
 * @param {Object} data - Contact form data
 * @returns {Object} - { isValid: boolean, errors: Object }
 */
export const validateContactForm = (data) => {
  const errors = {};

  // Name
  const nameValidation = validateRequired(data.name, 'Name');
  if (!nameValidation.isValid) {
    errors.name = nameValidation.error;
  }

  // Email
  const emailValidation = validateEmail(data.email);
  if (!emailValidation.isValid) {
    errors.email = emailValidation.error;
  }

  // Subject
  const subjectValidation = validateRequired(data.subject, 'Subject');
  if (!subjectValidation.isValid) {
    errors.subject = subjectValidation.error;
  }

  // Message
  const messageValidation = validateMinLength(data.message, 10, 'Message');
  if (!messageValidation.isValid) {
    errors.message = messageValidation.error;
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export default {
  validateEmail,
  validatePassword,
  validateRequired,
  validatePhone,
  validateURL,
  validateMinLength,
  validateMaxLength,
  validateRange,
  validateProductForm,
  validateContactForm,
};
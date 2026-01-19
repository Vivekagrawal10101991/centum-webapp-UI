/**
 * Validation utility functions
 */

export const validators = {
  /**
   * Validate email format
   * @param {string} email
   * @returns {boolean}
   */
  isValidEmail: (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  /**
   * Validate phone number (Indian format)
   * @param {string} phone
   * @returns {boolean}
   */
  isValidPhone: (phone) => {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phone.replace(/\s+/g, ''));
  },

  /**
   * Validate required field
   * @param {string} value
   * @returns {boolean}
   */
  isRequired: (value) => {
    return value && value.trim().length > 0;
  },

  /**
   * Validate minimum length
   * @param {string} value
   * @param {number} minLength
   * @returns {boolean}
   */
  minLength: (value, minLength) => {
    return value && value.length >= minLength;
  },

  /**
   * Validate maximum length
   * @param {string} value
   * @param {number} maxLength
   * @returns {boolean}
   */
  maxLength: (value, maxLength) => {
    return value && value.length <= maxLength;
  },
};

export default validators;

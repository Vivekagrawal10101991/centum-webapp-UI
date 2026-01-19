/**
 * Formatting utility functions
 */

export const formatters = {
  /**
   * Format date to readable string
   * @param {string|Date} date
   * @returns {string}
   */
  formatDate: (date) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  },

  /**
   * Format phone number
   * @param {string} phone
   * @returns {string}
   */
  formatPhone: (phone) => {
    if (!phone) return '';
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 10) {
      return `+91 ${cleaned.slice(0, 5)} ${cleaned.slice(5)}`;
    }
    return phone;
  },

  /**
   * Truncate text to specified length
   * @param {string} text
   * @param {number} maxLength
   * @returns {string}
   */
  truncate: (text, maxLength = 100) => {
    if (!text || text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  },
};

export default formatters;

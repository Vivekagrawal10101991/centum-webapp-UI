const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

/**
 * Get authentication headers
 * @returns {Object} Headers with auth token
 */
const getAuthHeaders = () => {
  const token = localStorage.getItem('adminToken');
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
  };
};

/**
 * Fetch all blogs
 * @returns {Promise<Array>} Array of blog objects
 */
export const getAllBlogs = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/tech/blogs/all`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch blogs: ${response.status} ${response.statusText}`);
    }
    
    // Check if response is JSON or text
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const data = await response.json();
      return data;
    } else {
      // If not JSON, return empty array
      return [];
    }
  } catch (error) {
    console.error('Error fetching blogs:', error);
    throw error;
  }
};

/**
 * Add a new blog
 * @param {Object} blogData - Blog data object
 * @param {string} blogData.title - Blog title
 * @param {string} blogData.content - Blog content
 * @param {string} blogData.author - Blog author
 * @param {string} blogData.imageUrl - Blog image URL
 * @param {string} blogData.category - Blog category
 * @param {boolean} blogData.published - Published status
 * @returns {Promise<Object>} Created blog object
 */
export const addBlog = async (blogData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/tech/blogs/add`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(blogData),
    });
    if (!response.ok) {
      throw new Error(`Failed to add blog: ${response.status} ${response.statusText}`);
    }
    
    // Check if response is JSON or text
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const data = await response.json();
      return data;
    } else {
      const text = await response.text();
      return { message: text };
    }
  } catch (error) {
    console.error('Error adding blog:', error);
    throw error;
  }
};

/**
 * Update an existing blog
 * @param {string} id - Blog ID
 * @param {Object} blogData - Blog data object
 * @param {string} blogData.title - Blog title
 * @param {string} blogData.content - Blog content
 * @param {string} blogData.author - Blog author
 * @param {string} blogData.imageUrl - Blog image URL
 * @param {string} blogData.category - Blog category
 * @param {boolean} blogData.published - Published status
 * @returns {Promise<Object>} Updated blog object
 */
export const updateBlog = async (id, blogData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/tech/blogs/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(blogData),
    });
    if (!response.ok) {
      throw new Error(`Failed to update blog: ${response.status} ${response.statusText}`);
    }
    
    // Check if response is JSON or text
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const data = await response.json();
      return data;
    } else {
      const text = await response.text();
      return { message: text };
    }
  } catch (error) {
    console.error('Error updating blog:', error);
    throw error;
  }
};

/**
 * Delete a blog
 * @param {string} id - Blog ID
 * @returns {Promise<void>}
 */
export const deleteBlog = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/tech/blogs/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    if (!response.ok) {
      throw new Error(`Failed to delete blog: ${response.status} ${response.statusText}`);
    }
    
    // Check if response has content
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const data = await response.json();
      return data;
    } else {
      const text = await response.text();
      return { message: text || 'Blog deleted successfully' };
    }
  } catch (error) {
    console.error('Error deleting blog:', error);
    throw error;
  }
};

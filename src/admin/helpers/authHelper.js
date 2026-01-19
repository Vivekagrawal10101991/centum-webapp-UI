import { authService } from '../services/authService';
import { ROLE_PERMISSIONS } from './permissions';

/**
 * Get current user from localStorage
 * @returns {Object|null} User object with role and permissions
 */
export const getCurrentUser = () => {
  return authService.getCurrentUser();
};

/**
 * Get user's permissions based on their role
 * @param {Object} user - User object with role property
 * @returns {Array} Array of permission strings
 */
export const getUserPermissions = (user) => {
  if (!user || !user.role) return [];
  
  const permissions = ROLE_PERMISSIONS[user.role];
  return permissions || [];
};

/**
 * Check if current user has a specific permission
 * @param {string} permission - Permission to check (e.g., PERMISSIONS.ADD_BLOG)
 * @returns {boolean} True if user has permission, false otherwise
 */
export const hasPermission = (permission) => {
  const user = getCurrentUser();
  
  if (!user) return false;
  
  // Super admin has all permissions
  if (user.role === 'SUPER_ADMIN') return true;
  
  // Get user's permissions based on role
  const userPermissions = getUserPermissions(user);
  
  // Check if permission exists in user's permissions
  return userPermissions.includes(permission);
};

/**
 * Check if current user has any of the given permissions
 * @param {Array<string>} permissions - Array of permissions to check
 * @returns {boolean} True if user has at least one permission
 */
export const hasAnyPermission = (permissions) => {
  if (!Array.isArray(permissions)) return false;
  
  return permissions.some(permission => hasPermission(permission));
};

/**
 * Check if current user has all of the given permissions
 * @param {Array<string>} permissions - Array of permissions to check
 * @returns {boolean} True if user has all permissions
 */
export const hasAllPermissions = (permissions) => {
  if (!Array.isArray(permissions)) return false;
  
  return permissions.every(permission => hasPermission(permission));
};

/**
 * Check if current user has a specific role
 * @param {string} role - Role to check (e.g., 'ADMIN', 'TECHNICAL_HEAD')
 * @returns {boolean} True if user has the role
 */
export const hasRole = (role) => {
  const user = getCurrentUser();
  return user && user.role === role;
};

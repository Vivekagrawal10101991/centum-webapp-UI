import { PERMISSIONS } from './rolePermissions';
import { ROLE_PERMISSIONS } from './permissions';

/**
 * Maps navigation items to required permissions
 * Each navigation item can have:
 * - requiredPermissions: Array of permissions (user needs at least one)
 * - requiredRole: Specific role requirement
 */
export const NAVIGATION_PERMISSIONS = {
  // Super Admin - Overview
  '/dashboard/super-admin': {
    requiredRole: 'SUPER_ADMIN',
  },

  // Super Admin - Dashboard Analytics
  '/dashboard/super-admin/dashboard': {
    requiredPermissions: [PERMISSIONS.VIEW_REPORTS, PERMISSIONS.SYSTEM_ADMIN],
  },

  // Super Admin - User Management
  '/dashboard/super-admin/add-user': {
    requiredPermissions: [PERMISSIONS.ADD_USER, PERMISSIONS.SYSTEM_ADMIN],
  },
  '/dashboard/super-admin/get-users': {
    requiredPermissions: [PERMISSIONS.VIEW_USER, PERMISSIONS.SYSTEM_ADMIN],
  },
  '/dashboard/super-admin/delete-user': {
    requiredPermissions: [PERMISSIONS.DELETE_USER, PERMISSIONS.SYSTEM_ADMIN],
  },

  // Super Admin - Content Management
  '/dashboard/super-admin/promotions-banners': {
    requiredPermissions: [PERMISSIONS.MANAGE_BANNERS, PERMISSIONS.MANAGE_CMS, PERMISSIONS.SYSTEM_ADMIN],
  },
  '/dashboard/super-admin/academics-results': {
    requiredPermissions: [PERMISSIONS.VIEW_ACADEMIC, PERMISSIONS.MANAGE_ACADEMIC, PERMISSIONS.SYSTEM_ADMIN],
  },
  '/dashboard/super-admin/course-management': {
    requiredPermissions: [PERMISSIONS.VIEW_COURSES, PERMISSIONS.MANAGE_CMS, PERMISSIONS.SYSTEM_ADMIN],
  },
  '/dashboard/super-admin/social-proof': {
    requiredPermissions: [PERMISSIONS.VIEW_SOCIAL, PERMISSIONS.MANAGE_SOCIAL, PERMISSIONS.SYSTEM_ADMIN],
  },
  '/dashboard/super-admin/media-center': {
    requiredPermissions: [PERMISSIONS.VIEW_BLOGS, PERMISSIONS.VIEW_VIDEOS, PERMISSIONS.MANAGE_CMS, PERMISSIONS.SYSTEM_ADMIN],
  },
  '/dashboard/super-admin/leads-enquiries': {
    requiredPermissions: [PERMISSIONS.ENQUIRE_LIST, PERMISSIONS.SYSTEM_ADMIN],
  },
  '/dashboard/super-admin/settings': {
    requiredPermissions: [PERMISSIONS.VIEW_SETTINGS, PERMISSIONS.MANAGE_SETTINGS, PERMISSIONS.SYSTEM_ADMIN],
  },

  // Admin Routes
  '/dashboard/admin': {
    requiredRole: 'ADMIN',
  },
  '/dashboard/admin/users': {
    requiredPermissions: [PERMISSIONS.VIEW_USER],
  },
  '/dashboard/admin/courses': {
    requiredPermissions: [PERMISSIONS.VIEW_COURSES],
  },
  '/dashboard/admin/content': {
    requiredPermissions: [PERMISSIONS.MANAGE_CMS],
  },
  '/dashboard/admin/announcements': {
    requiredPermissions: [PERMISSIONS.VIEW_ANNOUNCEMENTS],
  },
  '/dashboard/admin/testimonials': {
    requiredPermissions: [PERMISSIONS.VIEW_SOCIAL],
  },
  '/dashboard/admin/analytics': {
    requiredPermissions: [PERMISSIONS.VIEW_REPORTS],
  },
  '/dashboard/admin/settings': {
    requiredPermissions: [PERMISSIONS.VIEW_SETTINGS],
  },

  // Admin Routes - Media Center
  '/dashboard/admin/media-center': {
    requiredPermissions: [PERMISSIONS.VIEW_BLOGS, PERMISSIONS.VIEW_VIDEOS],
  },

  // Technical Head Routes
  '/dashboard/technical': {
    requiredRole: 'TECHNICAL_HEAD',
  },
  '/dashboard/technical/content': {
    requiredPermissions: [PERMISSIONS.MANAGE_CMS],
  },
  '/dashboard/technical/courses': {
    requiredPermissions: [PERMISSIONS.VIEW_COURSES],
  },
  '/dashboard/technical/course-management': {
    requiredPermissions: [PERMISSIONS.VIEW_COURSES],
  },
  '/dashboard/technical/media-center': {
    requiredPermissions: [PERMISSIONS.VIEW_BLOGS, PERMISSIONS.VIEW_VIDEOS],
  },
  '/dashboard/technical/teachers': {
    requiredPermissions: [PERMISSIONS.MANAGE_FACULTY], // Updated
  },
  '/dashboard/technical/announcements': {
    requiredPermissions: [PERMISSIONS.VIEW_ANNOUNCEMENTS],
  },
  '/dashboard/technical/analytics': {
    requiredPermissions: [PERMISSIONS.VIEW_REPORTS],
  },
  '/dashboard/technical/reports': {
    requiredPermissions: [PERMISSIONS.VIEW_REPORTS],
  },
  '/dashboard/technical/settings': {
    requiredPermissions: [],
  },
};

/**
 * Get user's permissions based on their role
 * @param {Object} user - User object with role property
 * @returns {Array} Array of permission strings
 */
const getUserPermissions = (user) => {
  if (!user || !user.role) return [];
  
  // Super admin has all permissions
  if (user.role === 'SUPER_ADMIN') {
    return Object.values(PERMISSIONS);
  }
  
  // Get permissions for the user's role
  const permissions = ROLE_PERMISSIONS[user.role];
  return permissions || [];
};

/**
 * Check if user has access to a navigation item
 * @param {string} path - Navigation path
 * @param {Object} user - User object with role property
 * @returns {boolean}
 */
export const canAccessRoute = (path, user) => {
  if (!user) return false;

  const navPermission = NAVIGATION_PERMISSIONS[path];
  
  // If no permission config, allow access (public route)
  if (!navPermission) return true;

  // Check role requirement
  if (navPermission.requiredRole && user.role !== navPermission.requiredRole) {
    // Super admin has access to everything
    if (user.role === 'SUPER_ADMIN') return true;
    return false;
  }

  // Check permission requirement
  if (navPermission.requiredPermissions) {
    // Get user's permissions based on their role
    const userPermissions = getUserPermissions(user);
    
    // User needs at least one of the required permissions
    return navPermission.requiredPermissions.some(permission => 
      userPermissions.includes(permission)
    );
  }

  return true;
};

/**
 * Filter navigation items based on user permissions
 * @param {Array} navigationItems - Array of navigation items
 * @param {Object} user - User object with role and permissions
 * @returns {Array} Filtered navigation items
 */
export const filterNavigationByPermissions = (navigationItems, user) => {
  if (!user || !navigationItems) return [];

  return navigationItems.filter(item => canAccessRoute(item.path, user));
};
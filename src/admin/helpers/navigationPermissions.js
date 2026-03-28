import { PERMISSIONS } from './rolePermissions';
import { ROLE_PERMISSIONS } from './permissions';

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
  
  // Super Admin - Batch Management
  '/dashboard/super-admin/batch-management': {
    requiredPermissions: [PERMISSIONS.MANAGE_BATCHES, PERMISSIONS.SYSTEM_ADMIN],
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

  // Admin Routes - Media Center
  '/dashboard/admin/media-center': {
    requiredPermissions: [PERMISSIONS.VIEW_BLOGS, PERMISSIONS.VIEW_VIDEOS],
  },

  // Technical Head Routes
  '/dashboard/technical': {
    requiredRole: 'TECHNICAL_HEAD',
  },
  
  '/dashboard/technical/promotions-banners': {
    requiredPermissions: [PERMISSIONS.MANAGE_BANNERS, PERMISSIONS.MANAGE_CMS],
  },
  '/dashboard/technical/academics-results': {
    requiredPermissions: [PERMISSIONS.VIEW_ACADEMIC, PERMISSIONS.MANAGE_ACADEMIC],
  },
  '/dashboard/technical/social-proof': {
    requiredPermissions: [PERMISSIONS.VIEW_SOCIAL, PERMISSIONS.MANAGE_SOCIAL],
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
    requiredPermissions: [PERMISSIONS.MANAGE_FACULTY],
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

  // HR Routes
  '/dashboard/hr': {
    requiredRole: 'HR',
  },
  '/dashboard/hr/user-management': {
    requiredRole: 'HR',
  },
  '/dashboard/hr/add-user': {
    requiredRole: 'HR',
  },
  '/dashboard/hr/get-users': {
    requiredRole: 'HR',
  },
  '/dashboard/hr/delete-user': {
    requiredRole: 'HR',
  },

  // Graphic Designer Routes
  '/dashboard/graphic-designer': {
    requiredRole: 'GRAPHIC_DESIGNER',
  },
  '/dashboard/graphic-designer/promotions-banners': {
    requiredPermissions: [PERMISSIONS.MANAGE_BANNERS],
  },
  '/dashboard/graphic-designer/media-center': {
    requiredPermissions: [PERMISSIONS.VIEW_BLOGS, PERMISSIONS.VIEW_VIDEOS],
  },

  // Operations Manager Routes
  '/dashboard/operations': {
    requiredRole: 'OPERATIONS_MANAGER',
  },
  '/dashboard/operations/batches': {
    requiredPermissions: [PERMISSIONS.MANAGE_BATCHES],
  },

  // Zonal Head Routes
  '/dashboard/zonal-head': {
    requiredRole: 'ZONAL_HEAD',
  },

  // DTP Routes
  '/dashboard/dtp': {
    requiredRole: 'DTP',
  }
};

/**
 * Get user's permissions based on their role
 * @param {Object} user - User object with role property
 * @returns {Array} Array of permission strings
 */
const getUserPermissions = (user) => {
  if (!user || !user.role) return [];
  
  if (user.role === 'SUPER_ADMIN') {
    return Object.values(PERMISSIONS);
  }
  
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

  // ✅ GLOBAL OVERRIDE: Every user MUST be able to access their own Settings (Profile/Password changes).
  if (path.endsWith('/settings')) return true;

  const navPermission = NAVIGATION_PERMISSIONS[path];
  
  // If no permission config, allow access (public route)
  if (!navPermission) return true;

  // Check role requirement
  if (navPermission.requiredRole && user.role !== navPermission.requiredRole) {
    if (user.role === 'SUPER_ADMIN') return true;
    return false;
  }

  // Check permission requirement
  if (navPermission.requiredPermissions) {
    const userPermissions = getUserPermissions(user);
    
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
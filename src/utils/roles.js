/**
 * Role-Based Access Control (RBAC) Configuration
 * Defines all user roles and their permissions
 */

// User Roles
export const ROLES = {
  SUPER_ADMIN: 'SUPER_ADMIN',
  ADMIN: 'ADMIN',
  TECHNICAL_HEAD: 'TECHNICAL_HEAD',
  FACULTY: 'FACULTY', // Updated
  STUDENT: 'STUDENT',
  PARENT: 'PARENT',
  COORDINATOR: 'COORDINATOR',
  OPERATIONS_MANAGER: 'OPERATIONS_MANAGER',
  HR: 'HR',
};

// Role Display Names
export const ROLE_NAMES = {
  [ROLES.SUPER_ADMIN]: 'Super Administrator',
  [ROLES.ADMIN]: 'Administrator',
  [ROLES.TECHNICAL_HEAD]: 'Technical Head',
  [ROLES.FACULTY]: 'Faculty', // Updated
  [ROLES.STUDENT]: 'Student',
  [ROLES.PARENT]: 'Parent',
  [ROLES.COORDINATOR]: 'Coordinator',
  [ROLES.OPERATIONS_MANAGER]: 'Operations Manager',
  [ROLES.HR]: 'HR',
};

// Dashboard Routes for Each Role
export const ROLE_DASHBOARDS = {
  [ROLES.SUPER_ADMIN]: '/dashboard/super-admin',
  [ROLES.ADMIN]: '/dashboard/admin',
  [ROLES.TECHNICAL_HEAD]: '/dashboard/technical',
  [ROLES.FACULTY]: '/dashboard/faculty', // Updated path
  [ROLES.STUDENT]: '/dashboard/student',
  [ROLES.PARENT]: '/dashboard/parent',
  [ROLES.COORDINATOR]: '/dashboard/coordinator',
  [ROLES.OPERATIONS_MANAGER]: '/dashboard/operations', // FIXED THIS PATH
  [ROLES.HR]: '/dashboard/hr',
};

// Permissions for Each Role
export const PERMISSIONS = {
  // Super Admin Permissions
  [ROLES.SUPER_ADMIN]: [
    'manage_all_users',
    'manage_all_roles',
    'system_configuration',
    'full_access',
  ],

  // Admin Permissions
  [ROLES.ADMIN]: [
    'manage_users',
    'manage_courses',
    'manage_content',
    'view_analytics',
    'manage_settings',
    'manage_roles',
    'manage_payments',
    'manage_announcements',
    'manage_testimonials',
    'view_all_data',
  ],

  // Technical Head Permissions
  [ROLES.TECHNICAL_HEAD]: [
    'manage_content',
    'manage_courses',
    'view_analytics',
    'manage_announcements',
    'manage_testimonials',
    'manage_faculty', 
    'view_technical_reports',
  ],

  // Faculty Permissions
  [ROLES.FACULTY]: [ 
    'view_courses',
    'manage_assignments',
    'grade_students',
    'view_students',
    'create_content',
    'view_analytics',
  ],

  // Student Permissions
  [ROLES.STUDENT]: [
    'view_courses',
    'submit_assignments',
    'view_grades',
    'view_content',
    'take_tests',
  ],

  // Parent Permissions
  [ROLES.PARENT]: [
    'view_child_progress',
    'view_courses',
    'view_grades',
    'contact_teachers',
  ],

  // Coordinator Permissions
  [ROLES.COORDINATOR]: [
    'view_dashboard',
    'manage_schedules',
    'view_reports',
  ],

  // Operations Head Permissions
  [ROLES.OPERATIONS_MANAGER]: [
    'view_dashboard',
    'manage_operations',
    'view_analytics',
  ],

  // HR Permissions
  [ROLES.HR]: [
    'view_dashboard',
    'manage_employees',
    'view_reports',
  ],
};

/**
 * Check if user has a specific permission
 * @param {string} userRole - User's role
 * @param {string} permission - Permission to check
 * @returns {boolean}
 */
export const hasPermission = (userRole, permission) => {
  const rolePermissions = PERMISSIONS[userRole] || [];
  return rolePermissions.includes(permission);
};

/**
 * Check if user has any of the specified roles
 * @param {string} userRole - User's role
 * @param {Array<string>} allowedRoles - Array of allowed roles
 * @returns {boolean}
 */
export const hasRole = (userRole, allowedRoles) => {
  return allowedRoles.includes(userRole);
};

/**
 * Get dashboard route for user's role
 * @param {string} userRole - User's role
 * @returns {string}
 */
export const getDashboardRoute = (userRole) => {
  return ROLE_DASHBOARDS[userRole] || '/';
};

export default {
  ROLES,
  ROLE_NAMES,
  ROLE_DASHBOARDS,
  PERMISSIONS,
  hasPermission,
  hasRole,
  getDashboardRoute,
};
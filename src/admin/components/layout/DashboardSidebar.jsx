import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Users, BookOpen, Settings, FileText, BarChart, Megaphone, Star,
  GraduationCap, Award, Video, MessageCircle, ClipboardList, Calendar,
  TrendingUp, UserCog, Clock, Building2, Briefcase, Activity, CheckCircle, Layers, Image as ImageIcon
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { ROLES } from '../../../utils/roles';
import { filterNavigationByPermissions } from '../../helpers/navigationPermissions';
import { dashboardService } from '../../services/dashboardService';

const DashboardSidebar = () => {
  const location = useLocation();
  const { user } = useAuth();
  const [badgeCounts, setBadgeCounts] = useState({});

  const fetchNotifications = async () => {
    try {
      const data = await dashboardService.getNotificationCounts();
      setBadgeCounts(data.badges || {});
    } catch (error) {
      console.error("Failed to fetch notification counts", error);
    }
  };

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 60000);
    return () => clearInterval(interval);
  }, []);

  const navigationItems = {
    [ROLES.SUPER_ADMIN]: [
      { name: 'Overview', path: '/dashboard/super-admin/dashboard', icon: BarChart },
      { name: 'User Management', path: '/dashboard/super-admin/user-management', icon: Users },
      { name: 'Batch Management', path: '/dashboard/super-admin/batch-management', icon: Layers },
      { name: 'LMS Center', path: '/dashboard/super-admin/lms-center', icon: GraduationCap },
      { name: 'Promotions & Banners', path: '/dashboard/super-admin/promotions-banners', icon: Megaphone },
      { name: 'Academics & Results', path: '/dashboard/super-admin/academics-results', icon: Award },
      { name: 'Course Management', path: '/dashboard/super-admin/course-management', icon: BookOpen },
      { name: 'Social Proof', path: '/dashboard/super-admin/social-proof', icon: Star },
      { name: 'Media Center', path: '/dashboard/super-admin/media-center', icon: Video },
      { name: 'Library Content', path: '/dashboard/super-admin/library-content', icon: FileText }, 
      { 
        name: 'Leads & Enquiries', 
        path: '/dashboard/super-admin/leads-enquiries', 
        icon: MessageCircle,
        badgeKey: 'leads' 
      },
      { 
        name: 'Leave Approvals', 
        path: '/dashboard/super-admin/leave-approvals', 
        icon: CheckCircle,
        badgeKey: 'leaves' 
      },
      { name: 'Settings', path: '/dashboard/super-admin/settings', icon: Settings },
    ],

    [ROLES.ADMIN]: [
      { name: 'Overview', path: '/dashboard/admin', icon: BarChart },
      { name: 'Users', path: '/dashboard/admin/users', icon: Users },
      { name: 'Courses', path: '/dashboard/admin/courses', icon: BookOpen },
      { 
        name: 'Leads & Enquiries', 
        path: '/dashboard/admin/leads', 
        icon: MessageCircle,
        badgeKey: 'leads'
      },
      { 
        name: 'Leave Directory', 
        path: '/dashboard/admin/leave-approvals', 
        icon: CheckCircle,
        badgeKey: 'leaves'
      }, 
      { name: 'Settings', path: '/dashboard/admin/settings', icon: Settings },
    ],

    [ROLES.TECHNICAL_HEAD]: [
      { name: 'Overview', path: '/dashboard/technical', icon: BarChart },
      { name: 'Course Management', path: '/dashboard/technical/course-management', icon: BookOpen },
      { name: 'Promotions & Banners', path: '/dashboard/technical/promotions-banners', icon: Megaphone },
      { name: 'Media Center', path: '/dashboard/technical/media-center', icon: Video },
      { name: 'Academics & Results', path: '/dashboard/technical/academics-results', icon: Award },
      { name: 'Social Proof', path: '/dashboard/technical/social-proof', icon: Star },
      { name: 'Settings', path: '/dashboard/technical/settings', icon: Settings },
    ],

    [ROLES.FACULTY]: [ 
      { name: 'Overview', path: '/dashboard/faculty', icon: BarChart },
      { name: 'My Courses', path: '/dashboard/faculty/courses', icon: BookOpen },
      { name: 'Students', path: '/dashboard/faculty/students', icon: Users },
      { name: 'Settings', path: '/dashboard/faculty/settings', icon: Settings },
    ],

    [ROLES.STUDENT]: [
      { name: 'Overview', path: '/dashboard/student', icon: BarChart },
      { name: 'My Courses', path: '/dashboard/student/courses', icon: BookOpen },
      { name: 'Assignments', path: '/dashboard/student/assignments', icon: ClipboardList },
      { name: 'Grades', path: '/dashboard/student/grades', icon: GraduationCap },
      { name: 'Schedule', path: '/dashboard/student/schedule', icon: Calendar },
      { name: 'Settings', path: '/dashboard/student/settings', icon: Settings },
    ],

    [ROLES.PARENT]: [
      { name: 'Overview', path: '/dashboard/parent', icon: BarChart },
      { name: 'Child Progress', path: '/dashboard/parent/progress', icon: TrendingUp },
      { name: 'Settings', path: '/dashboard/parent/settings', icon: Settings },
    ],

    [ROLES.HR]: [
      { name: 'Overview', path: '/dashboard/hr', icon: BarChart },
      { name: 'User Management', path: '/dashboard/hr/user-management', icon: Users },
      { 
        name: 'Leads & Enquiries', 
        path: '/dashboard/hr/leads', 
        icon: MessageCircle,
        badgeKey: 'leads'
      },
      { name: 'Employees', path: '/dashboard/hr/employees', icon: Users },
      { name: 'Attendance', path: '/dashboard/hr/attendance', icon: Clock },
      { name: 'Leaves', path: '/dashboard/hr/leaves', icon: Calendar },
      { 
        name: 'Leave Directory', 
        path: '/dashboard/hr/leave-approvals', 
        icon: CheckCircle,
        badgeKey: 'leaves'
      }, 
      { name: 'Recruitment', path: '/dashboard/hr/recruitment', icon: Briefcase },
      { name: 'Settings', path: '/dashboard/hr/settings', icon: Settings }, // ✅ ADDED HR SETTINGS
    ],

    [ROLES.OPERATIONS_MANAGER]: [
      { name: 'Overview', path: '/dashboard/operations', icon: BarChart },
      { name: 'Batch Management', path: '/dashboard/operations/batches', icon: Layers },
      { 
        name: 'Leads & Enquiries', 
        path: '/dashboard/operations/leads', 
        icon: MessageCircle,
        badgeKey: 'leads'
      },
      { name: 'Logistics', path: '/dashboard/operations/logistics', icon: Building2 },
      { name: 'Schedule', path: '/dashboard/operations/schedule', icon: Calendar },
      { 
        name: 'Leave Directory', 
        path: '/dashboard/operations/leave-approvals', 
        icon: CheckCircle,
        badgeKey: 'leaves'
      }, 
      { name: 'Settings', path: '/dashboard/operations/settings', icon: Settings }, // ✅ ADDED OP SETTINGS
    ],

    [ROLES.REPORTING_MANAGER]: [
      { name: 'Overview', path: '/dashboard/reporting-manager', icon: BarChart },
      { name: 'Team Performance', path: '/dashboard/reporting-manager/team', icon: Users },
      { 
        name: 'Leave Approvals', 
        path: '/dashboard/reporting-manager/leave-approvals', 
        icon: CheckCircle,
        badgeKey: 'leaves'
      },
      { name: 'Analytics', path: '/dashboard/reporting-manager/analytics', icon: Activity },
      { name: 'Reports', path: '/dashboard/reporting-manager/reports', icon: FileText },
      { name: 'Settings', path: '/dashboard/reporting-manager/settings', icon: Settings },
    ],

    [ROLES.ADMISSION_MANAGER]: [
      { name: 'Overview', path: '/dashboard/admission-manager', icon: BarChart },
      { 
        name: 'Leads & Enquiries', 
        path: '/dashboard/admission-manager/leads', 
        icon: MessageCircle,
        badgeKey: 'leads'
      },
      { name: 'Student Management', path: '/dashboard/admission-manager/student-management', icon: Users },
      { name: 'Settings', path: '/dashboard/admission-manager/settings', icon: Settings },
    ],

    [ROLES.GRAPHIC_DESIGNER]: [
      { name: 'Overview', path: '/dashboard/graphic-designer', icon: BarChart },
      { name: 'Promotions & Banners', path: '/dashboard/graphic-designer/promotions-banners', icon: ImageIcon },
      { name: 'Media Center', path: '/dashboard/graphic-designer/media-center', icon: Video },
      { name: 'Settings', path: '/dashboard/graphic-designer/settings', icon: Settings },
    ],

    // ✅ ADDED COMPLETE COORDINATOR CONFIG
    [ROLES.COORDINATOR]: [
      { name: 'Overview', path: '/dashboard/coordinator', icon: BarChart },
      { name: 'Settings', path: '/dashboard/coordinator/settings', icon: Settings }, 
    ],
  };

  const allItems = navigationItems[user?.role] || [];
  const items = filterNavigationByPermissions(allItems, user);

  const isActive = (path) => {
    if (location.pathname === path) return true;
    
    const basePaths = [
      '/dashboard/super-admin/dashboard',
      '/dashboard/admin',
      '/dashboard/technical',
      '/dashboard/faculty',
      '/dashboard/student',
      '/dashboard/parent',
      '/dashboard/hr',
      '/dashboard/operations',
      '/dashboard/reporting-manager',
      '/dashboard/admission-manager',
      '/dashboard/graphic-designer',
      '/dashboard/coordinator' // ✅ ADDED
    ];

    if (basePaths.includes(path)) {
      return false; 
    }

    return location.pathname.startsWith(path + '/');
  };

  return (
    <aside className="w-72 bg-gradient-to-b from-slate-800 to-slate-900 flex flex-col h-full shadow-2xl relative z-20 border-r border-white/5">
      
      <div className="p-8 pb-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 border border-blue-500/20 shadow-inner">
             {user?.role === ROLES.STUDENT ? <GraduationCap className="w-5 h-5" /> : <UserCog className="w-5 h-5" />}
          </div>
          <div>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] leading-none mb-1">Navigation</p>
            <p className="text-sm font-bold text-white tracking-tight">{user?.role?.replace('_', ' ')}</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 custom-scrollbar">
        <nav className="space-y-1.5 mt-4">
          {items.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            const count = item.badgeKey ? badgeCounts[item.badgeKey] : null;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  group flex items-center justify-between px-5 py-3.5 rounded-2xl transition-all duration-300 relative
                  ${active 
                    ? 'text-white bg-blue-600 shadow-lg shadow-blue-900/40 translate-x-1' 
                    : 'text-slate-400 hover:bg-white/5 hover:text-white hover:translate-x-1'
                  }
                `}
              >
                <div className="flex items-center gap-3.5 relative z-10">
                  <Icon 
                    strokeWidth={active ? 2.5 : 2}
                    className={`w-[18px] h-[18px] transition-colors duration-300 ${active ? 'text-white' : 'text-slate-500 group-hover:text-white'}`} 
                  />
                  <span className={`text-[14px] tracking-tight ${active ? 'font-bold' : 'font-medium'}`}>
                    {item.name}
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  {/* Notification Badge */}
                  {!active && count > 0 && (
                    <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-red-500 px-1.5 text-[10px] font-bold text-white shadow-lg animate-pulse">
                      {count > 99 ? '99+' : count}
                    </span>
                  )}
                  {active && (
                    <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]"></div>
                  )}
                </div>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-6 border-t border-white/5 bg-slate-900/50">
         <div className="text-center">
            <p className="text-[10px] text-slate-600 font-bold tracking-[0.3em] uppercase">Centum Academy</p>
         </div>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
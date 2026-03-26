import React, { useState, useEffect } from 'react';
import { Megaphone, AlertCircle, Info, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import notificationService from '../../services/notificationService';

const AnnouncementWidget = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const fetchLatest = async () => {
      try {
        const res = await notificationService.getMyNotifications();
        if (res.success && res.data) {
          // Only take the 3 most recent notifications for the dashboard widget
          setNotifications(res.data.slice(0, 3));
        }
      } catch (error) {
        console.error("Failed to fetch widget notifications", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLatest();
  }, []);

  const getBasePath = (role) => {
    const rolePathMap = {
      'SUPER_ADMIN': '/dashboard/super-admin',
      'ADMIN': '/dashboard/admin',
      'TECHNICAL_HEAD': '/dashboard/technical',
      'FACULTY': '/dashboard/faculty',
      'STUDENT': '/dashboard/student',
      'PARENT': '/dashboard/parent',
      'HR': '/dashboard/hr',
      'OPERATIONS_MANAGER': '/dashboard/operations',
      'ADMISSION_MANAGER': '/dashboard/admission-manager',
      'GRAPHIC_DESIGNER': '/dashboard/graphic-designer',
      'COORDINATOR': '/dashboard/coordinator'
    };
    return rolePathMap[role] || '/dashboard';
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 flex flex-col h-full">
      <div className="p-5 border-b border-slate-100 flex justify-between items-center">
        <h3 className="font-bold text-slate-800 flex items-center gap-2">
          <Megaphone className="w-5 h-5 text-blue-600" />
          Recent Announcements
        </h3>
        <button 
          onClick={() => navigate(`${getBasePath(user?.role)}/notifications`)}
          className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors"
        >
          View All <ArrowRight size={14} />
        </button>
      </div>

      <div className="flex-1 p-2">
        {loading ? (
          <div className="p-6 text-center text-sm text-slate-400">Loading...</div>
        ) : notifications.length === 0 ? (
          <div className="p-8 text-center flex flex-col items-center justify-center h-full">
            <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mb-2 border border-slate-100">
              <Megaphone className="w-5 h-5 text-slate-300" />
            </div>
            <p className="text-sm text-slate-500 font-medium">No recent announcements.</p>
          </div>
        ) : (
          <ul className="divide-y divide-slate-50">
            {notifications.map((n) => (
              <li key={n.id} className="p-3 hover:bg-slate-50 transition-colors rounded-xl">
                <div className="flex gap-3">
                  <div className="mt-0.5 flex-shrink-0">
                    {n.priority === 'IMPORTANT' ? (
                      <AlertCircle className="w-4 h-4 text-red-500" />
                    ) : (
                      <Info className="w-4 h-4 text-blue-500" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className={`text-sm truncate pr-2 ${!n.isRead ? 'font-bold text-slate-800' : 'font-medium text-slate-600'}`}>
                      {n.message}
                    </p>
                    <p className="text-[10px] text-slate-400 font-semibold mt-1 uppercase tracking-wider">
                      {new Date(n.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AnnouncementWidget;
import React, { useState, useEffect, useRef } from 'react';
import { Bell, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import notificationService from '../../services/notificationService';
import { useAuth } from '../../context/AuthContext';

const NotificationCenter = () => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 300000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fetchNotifications = async () => {
    try {
      const [countRes, listRes] = await Promise.all([
        notificationService.getUnreadCount(),
        notificationService.getMyNotifications()
      ]);
      if (countRes.success) setUnreadCount(countRes.data);
      if (listRes.success) setNotifications(listRes.data);
    } catch (error) {
      console.error("Failed to fetch notifications", error);
    }
  };

  const handleMarkAsRead = async (id, isRead) => {
    if (isRead) return; 
    try {
      await notificationService.markAsRead(id);
      setUnreadCount(prev => Math.max(0, prev - 1));
      setNotifications(notifications.map(n => 
        n.id === id ? { ...n, isRead: true } : n
      ));
    } catch (error) {
      console.error("Failed to mark as read", error);
    }
  };

  const handleMarkAllRead = async () => {
    try {
      await notificationService.markAllAsRead();
      setUnreadCount(0);
      setNotifications(notifications.map(n => ({ ...n, isRead: true })));
    } catch (error) {
      console.error("Failed to mark all as read", error);
    }
  };

  // Dynamically map the user's role to their dashboard base path
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

  const handleViewAll = () => {
    setIsOpen(false);
    navigate(`${getBasePath(user?.role)}/notifications`);
  };

  // Only show the top 5 most recent in the dropdown
  const displayNotifications = notifications.slice(0, 5);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bell Icon Trigger */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors focus:outline-none"
      >
        <Bell size={22} strokeWidth={2.5} />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white bg-red-500 ring-2 ring-white rounded-full">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <div className="absolute right-0 mt-3 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-100 z-50 overflow-hidden animate-in fade-in zoom-in-95 origin-top-right">
          <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/80">
            <h3 className="font-bold text-slate-800">Notifications</h3>
            {unreadCount > 0 && (
              <button 
                onClick={handleMarkAllRead}
                className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors"
              >
                <CheckCircle size={14} /> Mark all read
              </button>
            )}
          </div>

          <div className="max-h-[350px] overflow-y-auto custom-scrollbar">
            {displayNotifications.length === 0 ? (
              <div className="p-8 text-center text-slate-400 flex flex-col items-center">
                <Bell size={28} className="text-slate-300 mb-3" />
                <p className="text-sm font-medium">No notifications yet</p>
              </div>
            ) : (
              <ul className="divide-y divide-slate-50">
                {displayNotifications.map((notification) => (
                  <li 
                    key={notification.id}
                    onClick={() => handleMarkAsRead(notification.id, notification.isRead)}
                    className={`p-4 hover:bg-slate-50 cursor-pointer transition-colors ${!notification.isRead ? 'bg-blue-50/30' : ''}`}
                  >
                    <div className="flex gap-3">
                      <div className="flex-shrink-0 mt-0.5">
                        {notification.priority === 'IMPORTANT' ? (
                          <AlertCircle size={18} className="text-red-500" />
                        ) : (
                          <Info size={18} className="text-blue-500" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-1">
                          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                            notification.priority === 'IMPORTANT' 
                              ? 'bg-red-100 text-red-700' 
                              : 'bg-blue-100 text-blue-700'
                          }`}>
                            {notification.priority === 'IMPORTANT' ? 'Important' : 'Announcement'}
                          </span>
                          <span className="text-[10px] font-semibold text-slate-400">
                            {new Date(notification.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <p className={`text-sm truncate ${!notification.isRead ? 'text-slate-800 font-bold' : 'text-slate-600 font-medium'}`}>
                          {notification.message}
                        </p>
                      </div>
                      {!notification.isRead && (
                        <div className="w-2 h-2 mt-2 bg-blue-600 rounded-full flex-shrink-0 shadow-[0_0_8px_rgba(37,99,235,0.6)]"></div>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
          
          {/* === THE VIEW ALL FOOTER === */}
          <div className="p-3 bg-slate-50 border-t border-slate-100 text-center">
            <button 
              onClick={handleViewAll}
              className="text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors w-full"
            >
              View All Notifications
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationCenter;
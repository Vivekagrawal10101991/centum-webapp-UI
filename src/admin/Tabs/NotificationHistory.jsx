import React, { useState, useEffect } from 'react';
import { Bell, AlertCircle, Info, CheckCircle, Clock } from 'lucide-react';
import notificationService from '../services/notificationService';

const NotificationHistory = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const res = await notificationService.getMyNotifications();
      if (res.success && res.data) {
        setNotifications(res.data);
      }
    } catch (error) {
      console.error("Failed to fetch notification history", error);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (id, isRead) => {
    if (isRead) return; 
    try {
      await notificationService.markAsRead(id);
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
      setNotifications(notifications.map(n => ({ ...n, isRead: true })));
    } catch (error) {
      console.error("Failed to mark all as read", error);
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="p-6 max-w-5xl mx-auto animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <Bell className="text-blue-600" />
            Notification History
          </h1>
          <p className="text-slate-500 mt-1">View all your past announcements and alerts.</p>
        </div>
        
        {unreadCount > 0 && (
          <button 
            onClick={handleMarkAllRead}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 font-semibold rounded-lg hover:bg-slate-50 hover:text-blue-600 transition-colors shadow-sm"
          >
            <CheckCircle size={18} />
            Mark All as Read
          </button>
        )}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-slate-400">Loading notifications...</div>
        ) : notifications.length === 0 ? (
          <div className="p-16 flex flex-col items-center justify-center text-slate-400">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4 border border-slate-100">
              <Bell size={32} className="text-slate-300" />
            </div>
            <h3 className="text-lg font-bold text-slate-700">No Notifications</h3>
            <p className="text-sm mt-1">You are all caught up! No messages to display.</p>
          </div>
        ) : (
          <ul className="divide-y divide-slate-100">
            {notifications.map((notification) => (
              <li 
                key={notification.id}
                onClick={() => handleMarkAsRead(notification.id, notification.isRead)}
                className={`p-5 hover:bg-slate-50 transition-colors cursor-pointer flex gap-4 ${!notification.isRead ? 'bg-blue-50/20' : ''}`}
              >
                <div className="flex-shrink-0 mt-1">
                  {notification.priority === 'IMPORTANT' ? (
                    <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center border border-red-100">
                      <AlertCircle size={20} className="text-red-500" />
                    </div>
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center border border-blue-100">
                      <Info size={20} className="text-blue-500" />
                    </div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-2">
                    <div className="flex items-center gap-3">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                        notification.priority === 'IMPORTANT' 
                          ? 'bg-red-100 text-red-700' 
                          : 'bg-blue-100 text-blue-700'
                      }`}>
                        {notification.priority === 'IMPORTANT' ? 'Important' : 'Announcement'}
                      </span>
                      {!notification.isRead && (
                        <span className="flex h-2 w-2 rounded-full bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.6)]"></span>
                      )}
                    </div>
                    
                    <span className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
                      <Clock size={12} />
                      {new Date(notification.createdAt).toLocaleString(undefined, { 
                        month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' 
                      })}
                    </span>
                  </div>
                  
                  <p className={`text-sm md:text-base leading-relaxed ${!notification.isRead ? 'text-slate-800 font-medium' : 'text-slate-600'}`}>
                    {notification.message}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default NotificationHistory;
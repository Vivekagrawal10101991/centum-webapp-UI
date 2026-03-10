import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Megaphone, Search } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import cmsService from "../../services/cmsService";

const AnnouncementBar = () => {
  const { isAuthenticated } = useAuth();
  
  // News ticker state
  const [newsIdx, setNewsIdx] = useState(0);
  const [news, setNews] = useState([]);

  // Fetch announcements from backend
  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const data = await cmsService.getAnnouncements();
        // Filter out any inactive announcements if returned by the backend
        const activeNews = data.filter(item => item.isActive !== false && item.active !== false);
        setNews(activeNews);
      } catch (error) {
        console.error("Failed to fetch announcements:", error);
      }
    };

    fetchAnnouncements();
  }, []);

  // Handle ticker rotation based on fetched data length
  useEffect(() => {
    if (news.length === 0) return;
    const timer = setInterval(() => setNewsIdx(p => (p + 1) % news.length), 4000);
    return () => clearInterval(timer);
  }, [news.length]);

  return (
    <div className="bg-slate-900 text-white py-2.5 overflow-hidden border-b border-white/5 font-sans">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* News Section */}
        <div className="flex items-center gap-3">
          <Megaphone className="h-4 w-4 text-amber-400 flex-shrink-0" />
          <span className="hidden sm:inline text-xs font-bold uppercase tracking-wider text-amber-400">Update:</span>
          <p className="text-xs sm:text-sm font-medium animate-fade-in truncate max-w-[200px] sm:max-w-none">
            {news.length > 0 ? (
              news[newsIdx].linkUrl ? (
                <a 
                  href={news[newsIdx].linkUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-amber-200 transition-colors"
                >
                  {news[newsIdx].message}
                </a>
              ) : (
                news[newsIdx].message
              )
            ) : (
              "Loading updates..."
            )}
          </p>
        </div>

        {/* Right Side: Search & Login */}
        <div className="hidden lg:flex items-center gap-6">
          <div className="flex items-center gap-2 bg-slate-800 rounded-lg px-3 py-1.5 border border-white/10">
            <Search className="h-3.5 w-3.5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="bg-transparent border-none outline-none text-xs text-white w-32 placeholder:text-slate-500" 
            />
          </div>
          {!isAuthenticated && (
            <Link to="/login" className="text-xs font-bold uppercase tracking-wider hover:text-purple-400 transition-colors">
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnnouncementBar;
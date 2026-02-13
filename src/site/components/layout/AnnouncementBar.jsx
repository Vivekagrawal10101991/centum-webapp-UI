import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Megaphone, Search } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const AnnouncementBar = () => {
  const { isAuthenticated } = useAuth();
  
  // News ticker state
  const [newsIdx, setNewsIdx] = useState(0);
  const news = [
    "Admissions Open for JEE/NEET 2026 Batch",
    "97% Students Secured Top Ranks in JEE Advanced",
    "New Foundation Program Launched for Class 8-10"
  ];

  useEffect(() => {
    const timer = setInterval(() => setNewsIdx(p => (p + 1) % news.length), 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-slate-900 text-white py-2.5 overflow-hidden border-b border-white/5 font-sans">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* News Section */}
        <div className="flex items-center gap-3">
          <Megaphone className="h-4 w-4 text-amber-400 flex-shrink-0" />
          <span className="hidden sm:inline text-xs font-bold uppercase tracking-wider text-amber-400">Update:</span>
          <p className="text-xs sm:text-sm font-medium animate-fade-in truncate max-w-[200px] sm:max-w-none">
            {news[newsIdx]}
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
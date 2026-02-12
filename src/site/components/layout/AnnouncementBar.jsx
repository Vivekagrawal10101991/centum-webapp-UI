import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, ExternalLink, Megaphone, Search } from 'lucide-react';
import { cmsService } from '../../services/cmsService';

/**
 * Refined Premium AnnouncementBar Component
 * - Typography: Updated to font-medium for better readability ("a little bold").
 * - Sizing: Announcement message remains synchronized with the label size.
 * - Layout: Maintained left-side spacing and high-contrast interactive elements.
 */
const AnnouncementBar = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const data = await cmsService.getAnnouncements();
        const list = Array.isArray(data) ? data : (data ? [data] : []);
        const activeItems = list.filter(item => item.active === true);
        
        setAnnouncements(activeItems);
      } catch (error) {
        console.error("Failed to load announcements:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

  useEffect(() => {
    if (announcements.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % announcements.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [announcements.length]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/courses?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  if (!isVisible || loading || announcements.length === 0) return null;

  const currentItem = announcements[currentIndex];

  return (
    <div className="relative z-[60] w-full bg-[#1a154d] border-b border-white/10 shadow-2xl">
      <div className="container mx-auto flex items-center h-10 md:h-12 px-4 gap-6">
        
        {/* Left: Icon + Label with refined bolding and spacing */}
        <div className="flex-shrink-0 flex items-center gap-2.5 pl-4 md:pl-6">
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 bg-amber-400/30 blur-md rounded-full animate-pulse" />
            <Megaphone 
              size={16} 
              className="text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.8)] relative z-10" 
              fill="currentColor" 
            />
          </div>
          <span className="text-white text-[11px] md:text-xs font-medium uppercase tracking-[0.2em] hidden sm:inline-block">
            Announcements
          </span>
        </div>

        {/* Middle: Announcement Display (Medium weight for readability) */}
        <div className="flex-1 overflow-hidden relative h-full flex items-center">
          <div 
            key={currentIndex}
            onClick={() => navigate('/announcements', { state: { targetId: currentItem.id || currentItem._id } })} 
            className="flex items-center gap-4 cursor-pointer group animate-slide-up"
          >
            <span className="text-[11px] md:text-xs font-medium text-white group-hover:text-amber-200 transition-colors tracking-wide truncate max-w-[140px] sm:max-w-xs md:max-w-md lg:max-w-3xl">
              {currentItem.message}
            </span>
            {currentItem.linkUrl && (
              <a 
                href={currentItem.linkUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()} 
                className="hidden lg:flex items-center gap-1.5 text-[10px] text-white/60 hover:text-white transition-all uppercase font-medium tracking-widest border-b border-white/20 hover:border-white"
              >
                Details <ExternalLink size={10} />
              </a>
            )}
          </div>
        </div>

        {/* Right: Counter, Search & Close */}
        <div className="flex items-center gap-4 lg:gap-8 pr-2">
          
          {/* Announcement Counter */}
          <div className="text-white/80 text-[11px] md:text-xs font-medium tracking-widest tabular-nums border-l border-white/20 pl-4 lg:pl-8">
            {currentIndex + 1}<span className="mx-1.5 opacity-40">/</span>{announcements.length}
          </div>

          {/* Functional Search bar (Maintained brightness) */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center relative">
            <input
              type="text"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white/10 border border-white/30 text-white text-[11px] px-3 py-1.5 pr-8 rounded focus:outline-none focus:bg-white/15 focus:border-white/60 placeholder:text-white/50 transition-all w-32 lg:w-48 font-normal shadow-inner"
            />
            <button type="submit" className="absolute right-2 text-white/60 hover:text-white transition-colors">
              <Search size={14} />
            </button>
          </form>

          {/* Close Button */}
          <button
            onClick={() => setIsVisible(false)}
            className="p-1 text-white/40 hover:text-white hover:bg-white/10 rounded-full transition-all"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-up {
          animation: slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
};

export default AnnouncementBar;
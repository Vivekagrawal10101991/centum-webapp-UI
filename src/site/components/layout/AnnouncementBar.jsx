import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, ExternalLink, Megaphone } from 'lucide-react';
import { cmsService } from '../../services/cmsService';

const AnnouncementBar = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [isVisible, setIsVisible] = useState(true);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // 1. Define a palette of "light faded" but visible colors
  const colorVariants = [
    "bg-blue-100 border-blue-200 text-blue-900 hover:bg-blue-200",
    "bg-purple-100 border-purple-200 text-purple-900 hover:bg-purple-200",
    "bg-amber-100 border-amber-200 text-amber-900 hover:bg-amber-200",
    "bg-emerald-100 border-emerald-200 text-emerald-900 hover:bg-emerald-200",
    "bg-rose-100 border-rose-200 text-rose-900 hover:bg-rose-200",
  ];

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

  if (!isVisible || loading || announcements.length === 0) return null;

  return (
    <div className="bg-white border-b border-gray-200 shadow-sm relative z-30">
      <div className="container mx-auto flex items-center h-12 md:h-14 px-4 gap-4">
        
        {/* Red Badge */}
        <div className="flex-shrink-0 flex items-center gap-2">
          <span className="bg-red-600 text-white text-[10px] md:text-xs font-bold px-3 py-1 md:py-1.5 rounded-md uppercase tracking-wider shadow-sm flex items-center gap-1.5">
            <Megaphone size={12} className="text-white" />
            Updates
          </span>
        </div>

        {/* Scrolling Area */}
        <div className="flex-1 overflow-hidden relative h-full flex items-center mask-image-gradient">
          <div className="animate-marquee whitespace-nowrap flex items-center absolute">
            {[...announcements, ...announcements].map((item, index) => {
              
              const styleClass = colorVariants[index % colorVariants.length];
              const uniqueKey = item.id || item._id;

              return (
                <div 
                  key={`${uniqueKey}-${index}`}
                  // 1. UPDATED: Navigate with state (targetId)
                  onClick={() => navigate('/announcements', { state: { targetId: uniqueKey } })} 
                  className={`inline-flex items-center mx-2 px-4 py-1.5 md:py-2 rounded-full border shadow-sm transition-all duration-200 cursor-pointer ${styleClass} group`}
                >
                  <span className="text-xs md:text-sm font-semibold tracking-wide">
                    {item.message}
                  </span>

                  {/* Link (Only if linkUrl exists) */}
                  {item.linkUrl && (
                    <a 
                      href={item.linkUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()} 
                      className="ml-3 pl-3 border-l border-black/10 flex items-center gap-1 text-[10px] md:text-xs font-bold hover:underline"
                    >
                      Check it out <ExternalLink size={10} />
                    </a>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={() => setIsVisible(false)}
          className="flex-shrink-0 p-1.5 md:p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
        >
          <X size={18} />
        </button>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          animation: marquee 45s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
        .mask-image-gradient {
          mask-image: linear-gradient(to right, transparent, black 2%, black 98%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 2%, black 98%, transparent);
        }
      `}</style>
    </div>
  );
};

export default AnnouncementBar;
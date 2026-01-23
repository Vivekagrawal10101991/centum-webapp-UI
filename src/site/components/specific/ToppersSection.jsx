import React, { useState, useEffect } from 'react';
import { cmsService } from '../../services/cmsService';

const ToppersSection = () => {
  const [toppers, setToppers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchToppers = async () => {
      try {
        const data = await cmsService.getToppers();
        // Filter only published toppers
        const publishedToppers = Array.isArray(data) ? data.filter(t => t.isPublished !== false) : [];
        setToppers(publishedToppers);
      } catch (error) {
        console.error('Failed to load toppers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchToppers();
  }, []);

  // Premium Fade Themes (Samsung One UI Inspired)
  const themes = [
    {
      main: 'from-indigo-100 to-blue-50',
      accent: 'text-indigo-900',
      badge: 'bg-indigo-100 text-indigo-800',
      highlight: 'bg-white border-indigo-200 text-indigo-700',
      yearBadge: 'bg-indigo-600 text-white'
    },
    {
      main: 'from-fuchsia-100 to-pink-50',
      accent: 'text-fuchsia-900',
      badge: 'bg-fuchsia-100 text-fuchsia-800',
      highlight: 'bg-white border-fuchsia-200 text-fuchsia-700',
      yearBadge: 'bg-fuchsia-600 text-white'
    },
    {
      main: 'from-emerald-100 to-teal-50',
      accent: 'text-emerald-900',
      badge: 'bg-emerald-100 text-emerald-800',
      highlight: 'bg-white border-emerald-200 text-emerald-700',
      yearBadge: 'bg-emerald-600 text-white'
    },
    {
      main: 'from-orange-100 to-amber-50',
      accent: 'text-orange-900',
      badge: 'bg-orange-100 text-orange-800',
      highlight: 'bg-white border-orange-200 text-orange-700',
      yearBadge: 'bg-orange-600 text-white'
    },
    {
      main: 'from-cyan-100 to-sky-50',
      accent: 'text-cyan-900',
      badge: 'bg-cyan-100 text-cyan-800',
      highlight: 'bg-white border-cyan-200 text-cyan-700',
      yearBadge: 'bg-cyan-600 text-white'
    }
  ];

  // Logic: Only animate if there are more than 4 students
  const shouldScroll = toppers.length > 4;

  const visibleToppers = shouldScroll ? [...toppers, ...toppers] : toppers;

  if (!loading && toppers.length === 0) return null;

  return (
    <div className="w-full bg-slate-50 py-16 border-b border-gray-200 overflow-hidden">
      
      {/* Title Section */}
      <div className="max-w-7xl mx-auto px-4 mb-12 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2 tracking-tight">
          Splendid Performance of Our Students
        </h2>
        
        <div className="relative inline-block">
          <span className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 font-serif tracking-wide">
            Trailblazers
          </span>
          <div className="absolute -bottom-2 left-0 right-0 h-1 bg-yellow-400 rounded-full w-1/2 mx-auto shadow-sm"></div>
        </div>
      </div>

      {/* Content Container */}
      <div className="flex w-full overflow-hidden relative group py-4">
        {loading ? (
             <div className="w-full text-center py-4">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-indigo-600 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
             </div>
        ) : (
            <div className={`flex w-full ${shouldScroll ? 'animate-scroll hover:pause-scroll' : 'justify-center flex-wrap gap-8'}`}>
            
            {visibleToppers.map((student, index) => {
                const theme = themes[index % themes.length];
                
                return (
                <div
                    key={`${student.id}-${index}`} 
                    className={`flex-shrink-0 w-72 rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-white/60 relative overflow-hidden bg-gradient-to-br ${theme.main} ${!shouldScroll ? 'mx-0' : 'mx-5'}`}
                >
                    {/* Decorative Top Circle */}
                    <div className="absolute -top-16 -right-16 w-40 h-40 bg-white/30 rounded-full blur-2xl"></div>
                    <div className="absolute top-10 -left-10 w-24 h-24 bg-white/40 rounded-full blur-xl"></div>

                    {/* Card Header/Image Area */}
                    <div className="relative pt-8 flex justify-center mb-4">
                        <div className="w-36 h-36 rounded-full border-4 border-white shadow-xl overflow-hidden bg-white z-10 relative">
                            <img
                            src={student.imageUrl || 'https://via.placeholder.com/150'}
                            alt={student.studentName}
                            className="w-full h-full object-cover"
                            onError={(e) => {e.target.src = 'https://via.placeholder.com/150'}}
                            />
                        </div>
                        {/* Year Badge */}
                        <div className="absolute top-6 right-4 z-20">
                            <span className={`${theme.yearBadge} text-xs font-bold px-3 py-1 rounded-full shadow-md bg-opacity-95 backdrop-blur-sm`}>
                            {student.year}
                            </span>
                        </div>
                    </div>

                    {/* Card Content */}
                    <div className="px-6 pb-8 text-center relative z-10">
                        <h3 className={`font-bold text-xl ${theme.accent} mb-1 tracking-tight line-clamp-1`}>
                            {student.studentName}
                        </h3>
                        
                        {/* Result Highlight */}
                        <div className={`my-3 py-3 rounded-xl border ${theme.highlight} shadow-sm flex items-center justify-center gap-2`}>
                            <span className={`text-base font-bold opacity-80 ${theme.accent}`}>
                                AIR
                            </span>
                            <span className={`${theme.accent} text-base font-black`}>
                                {student.rank}
                            </span>
                        </div>

                        <div className="space-y-1">
                            {/* UPDATE: Changed to text-black */}
                            <p className="text-black text-[10px] font-bold uppercase tracking-widest">
                            Secured In
                            </p>
                            <span className={`inline-block ${theme.badge} text-xs font-bold px-4 py-1.5 rounded-lg`}>
                            {student.examName}
                            </span>
                        </div>
                    </div>
                </div>
                );
            })}
            </div>
        )}
      </div>

      {shouldScroll && (
        <style>{`
            @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
            }
            .animate-scroll {
            animation: scroll 40s linear infinite;
            width: max-content;
            }
            .hover\\:pause-scroll:hover {
            animation-play-state: paused;
            }
        `}</style>
      )}
    </div>
  );
};

export default ToppersSection;
import React from 'react';
import { BookOpen, Clock, Users, Check, ArrowRight } from 'lucide-react';

/**
 * CourseCard Component
 * Displays a program summary using backend data for core details,
 * and standard static highlights for the features list.
 */
const CourseCard = ({ course, index = 0, onViewDetails }) => {

  // Vibrant themes for icons, backgrounds, and buttons based on index
  const themes = [
    { gradient: "from-[#8B5CF6] to-[#6D28D9]", solid: "#8B5CF6", lightBg: "bg-purple-50", textColor: "text-purple-600" },
    { gradient: "from-[#2DD4BF] to-[#0F766E]", solid: "#2DD4BF", lightBg: "bg-teal-50", textColor: "text-teal-600" },
    { gradient: "from-[#FB923C] to-[#C2410C]", solid: "#FB923C", lightBg: "bg-orange-50", textColor: "text-orange-600" },
    { gradient: "from-[#3B82F6] to-[#1D4ED8]", solid: "#3B82F6", lightBg: "bg-blue-50", textColor: "text-blue-600" },
    { gradient: "from-[#EC4899] to-[#BE185D]", solid: "#EC4899", lightBg: "bg-pink-50", textColor: "text-pink-600" },
    { gradient: "from-[#10B981] to-[#047857]", solid: "#10B981", lightBg: "bg-emerald-50", textColor: "text-emerald-600" }
  ];

  const theme = themes[index % themes.length];

  const handleViewDetailClick = (e) => {
    e.stopPropagation(); 
    if (onViewDetails) {
      onViewDetails(course);
    }
  };

  const handleCardClick = () => {
    if (onViewDetails) {
      onViewDetails(course);
    }
  };

  // Fetch duration/batch from backend (shows N/A if empty)
  const displayDuration = course?.duration || "N/A"; 
  const displayBatch = course?.batchSize || "N/A";
  
  // Hardcoded features for every card as requested
  const displayFeatures = [
    "Expert Mentorship",
    "Comprehensive Material",
    "Regular Mock Tests"
  ];

  return (
    <div 
      onClick={handleCardClick}
      className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col h-full group"
    >
      {/* Top Section (Solid Vibrant Gradient) */}
      <div className={`p-6 flex flex-col items-start bg-gradient-to-br ${theme.gradient} relative min-h-[180px]`}>
        
        {/* NEW: TOP RIGHT TAG BADGE */}
        {course?.tag && (
          <span className="absolute top-4 right-4 px-3 py-1 bg-amber-400 text-amber-950 rounded-full text-[10px] font-black tracking-widest uppercase shadow-md border border-amber-300 z-20">
            {course.tag}
          </span>
        )}

        <BookOpen className="h-8 w-8 mb-4 text-white opacity-90 relative z-10" strokeWidth={1.5} />
        
        {course?.category && (
          <span className="inline-block px-3 py-1 bg-white/20 text-white rounded-full text-[11px] font-bold tracking-wide mb-3 uppercase backdrop-blur-sm relative z-10">
            {course.category}
          </span>
        )}
        
        {course?.title && (
          <h3 className="text-xl font-bold mb-2 text-white leading-tight relative z-10 pr-4">
            {course.title}
          </h3>
        )}
        
        {course?.shortDescription && (
          <p className="text-sm text-white/90 line-clamp-2 leading-relaxed font-medium relative z-10">
            {course.shortDescription}
          </p>
        )}
      </div>

      {/* Bottom Section (White Background) */}
      <div className="p-5 flex flex-col flex-grow bg-white">
        
        {/* Info Boxes Row - Always visible to maintain structure */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          {/* Duration Box */}
          <div className={`p-3 rounded-xl border border-slate-100 flex items-center gap-3 ${theme.lightBg}`}>
            <div className={`p-2 rounded-lg bg-white shadow-sm flex-shrink-0 ${theme.textColor}`}>
              <Clock size={16} strokeWidth={2.5} />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Duration</p>
              <p className="text-sm font-bold text-slate-900 truncate" title={displayDuration}>
                {displayDuration}
              </p>
            </div>
          </div>

          {/* Batch Size Box */}
          <div className={`p-3 rounded-xl border border-slate-100 flex items-center gap-3 ${theme.lightBg}`}>
            <div className={`p-2 rounded-lg bg-white shadow-sm flex-shrink-0 ${theme.textColor}`}>
              <Users size={16} strokeWidth={2.5} />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Batch</p>
              <p className="text-sm font-bold text-slate-900 truncate" title={displayBatch}>
                {displayBatch}
              </p>
            </div>
          </div>
        </div>

        {/* Features List - Static list applied to every card */}
        <div className="flex-grow mb-5">
          <div className="space-y-2">
            {displayFeatures.map((feature, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <Check className={`h-4 w-4 flex-shrink-0 mt-0.5 ${theme.textColor}`} strokeWidth={3} />
                <span className="text-sm text-slate-600 font-medium leading-tight">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer: View Detail Button Only */}
        <div className="pt-4 border-t border-slate-100 mt-auto">
          <button 
            onClick={handleViewDetailClick}
            style={{ backgroundColor: theme.solid }}
            className="w-full py-3.5 rounded-xl font-bold text-white text-sm uppercase tracking-wider transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 flex items-center justify-center gap-2"
          >
            View Detail <ArrowRight size={16} />
          </button>
        </div>
        
      </div>
    </div>
  );
};

export default CourseCard;
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Clock, Users, Check, ArrowRight } from 'lucide-react';

/**
 * CourseCard Component
 * Displays a program summary with backend data integration.
 * Includes a "View Detail" button that triggers a modal without 
 * conflicting with the card's general navigation.
 */
const CourseCard = ({ course, index = 0, onViewDetails }) => {
  const navigate = useNavigate();

  // Vibrant themes for icons, backgrounds, and buttons based on index
  const themes = [
    { 
      gradient: "from-[#8B5CF6] to-[#6D28D9]", // Purple
      solid: "#8B5CF6",
      lightBg: "bg-purple-50",
      textColor: "text-purple-600"
    },
    { 
      gradient: "from-[#2DD4BF] to-[#0F766E]", // Teal
      solid: "#2DD4BF",
      lightBg: "bg-teal-50",
      textColor: "text-teal-600"
    },
    { 
      gradient: "from-[#FB923C] to-[#C2410C]", // Orange
      solid: "#FB923C",
      lightBg: "bg-orange-50",
      textColor: "text-orange-600"
    },
    { 
      gradient: "from-[#3B82F6] to-[#1D4ED8]", // Blue
      solid: "#3B82F6",
      lightBg: "bg-blue-50",
      textColor: "text-blue-600"
    },
    { 
      gradient: "from-[#EC4899] to-[#BE185D]", // Pink
      solid: "#EC4899",
      lightBg: "bg-pink-50",
      textColor: "text-pink-600"
    },
    { 
      gradient: "from-[#10B981] to-[#047857]", // Emerald
      solid: "#10B981",
      lightBg: "bg-emerald-50",
      textColor: "text-emerald-600"
    }
  ];

  const theme = themes[index % themes.length];

  /**
   * Triggers the Detail Modal
   * stopPropagation() is critical here to prevent the parent 
   * div's onClick (navigation) from firing simultaneously.
   */
  const handleViewDetailClick = (e) => {
    e.stopPropagation(); 
    if (onViewDetails) {
      onViewDetails(course);
    }
  };

  /**
   * General Navigation
   * Navigates to the dedicated course page on card click.
   */
  const handleCardClick = () => {
    const path = course?.slug || course?.id;
    if (path) navigate(`/courses/${path}`);
  };

  // DUMMY DATA FALLBACKS: Keeps the UI beautiful even if backend fields are empty
  const displayFeatures = course?.features?.length > 0 
    ? course.features.slice(0, 3) 
    : ["Expert Mentorship", "Comprehensive Material", "Regular Mock Tests"];
    
  const displayDuration = course?.duration || "2 Years";
  const displayBatch = course?.batchSize || "30-35 Students";
  const displayPrice = course?.price 
    ? `₹${course.price.toLocaleString()}` 
    : "₹1,80,000";

  return (
    <div 
      onClick={handleCardClick}
      className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col h-full group"
    >
      {/* Top Section (Solid Vibrant Gradient) */}
      <div className={`p-6 flex flex-col items-start bg-gradient-to-br ${theme.gradient} relative min-h-[180px]`}>
        {/* Optional Background Image from Backend */}
        {course?.imageUrl && (
          <div className="absolute inset-0 opacity-10 overflow-hidden">
            <img src={course.imageUrl} alt="" className="w-full h-full object-cover" />
          </div>
        )}
        
        <BookOpen className="h-8 w-8 mb-4 text-white opacity-90 relative z-10" strokeWidth={1.5} />
        <span className="inline-block px-3 py-1 bg-white/20 text-white rounded-full text-[11px] font-bold tracking-wide mb-3 uppercase backdrop-blur-sm relative z-10">
          {course?.category || "Program"}
        </span>
        <h3 className="text-xl font-bold mb-2 text-white leading-tight relative z-10">
          {course?.title || "Course Title"}
        </h3>
        <p className="text-sm text-white/90 line-clamp-2 leading-relaxed font-medium relative z-10">
          {course?.shortDescription || "Complete preparation guidance and structured curriculum details."}
        </p>
      </div>

      {/* Bottom Section (White Background) */}
      <div className="p-5 flex flex-col flex-grow bg-white">
        
        {/* Info Boxes Row */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          {/* Duration Box */}
          <div className={`p-3 rounded-xl border border-slate-100 flex items-center gap-3 ${theme.lightBg}`}>
            <div className={`p-2 rounded-lg bg-white shadow-sm ${theme.textColor}`}>
              <Clock size={16} strokeWidth={2.5} />
            </div>
            <div>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Duration</p>
              <p className="text-sm font-bold text-slate-900">{displayDuration}</p>
            </div>
          </div>

          {/* Batch Size Box */}
          <div className={`p-3 rounded-xl border border-slate-100 flex items-center gap-3 ${theme.lightBg}`}>
            <div className={`p-2 rounded-lg bg-white shadow-sm ${theme.textColor}`}>
              <Users size={16} strokeWidth={2.5} />
            </div>
            <div>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Batch</p>
              <p className="text-sm font-bold text-slate-900">{displayBatch}</p>
            </div>
          </div>
        </div>

        {/* Features List */}
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

        {/* Footer: Price & View Detail Button */}
        <div className="pt-4 border-t border-slate-100 flex flex-col gap-4 mt-auto">
          <div>
            <p className="text-[11px] font-bold text-slate-400 mb-0.5 uppercase tracking-widest">Course Fee</p>
            <div className="text-2xl font-black text-slate-900 tracking-tight">
              {displayPrice}
            </div>
          </div>
          
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
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Clock, Users, Check, ArrowRight } from 'lucide-react';

const CourseCard = ({ course, index = 0 }) => {
  const navigate = useNavigate();

  // UPDATED THEMES: Now includes solid colors for icons, backgrounds, and buttons to match the gradient.
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
    },
    { 
      gradient: "from-[#F43F5E] to-[#BE123C]", // Rose
      solid: "#F43F5E",
      lightBg: "bg-rose-50",
      textColor: "text-rose-600"
    },
    { 
      gradient: "from-[#6366F1] to-[#4338CA]", // Indigo
      solid: "#6366F1",
      lightBg: "bg-indigo-50",
      textColor: "text-indigo-600"
    }
  ];

  // Pick theme based on index to guarantee unique colors
  let themeIndex = 0;
  if (index !== undefined && index !== null) {
    themeIndex = index % themes.length;
  } else {
    const fallbackStr = course?.title || course?.id || Math.random().toString();
    themeIndex = fallbackStr.length % themes.length;
  }
  const theme = themes[themeIndex];

  const handleViewDetails = () => {
    const path = course?.slug || course?.id || course?._id || '#';
    if(path !== '#') navigate(`/courses/${path}`);
  };

  const featuresList = course?.features?.length > 0 
    ? course.features.slice(0, 3) // Reduced to 3 to fit new elements better
    : ["Developmental solutions", "Volonte for Aniscals", "Easy Carratonemogics"];

  return (
    <div 
      onClick={handleViewDetails}
      className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col h-full group"
    >
      {/* 1. TOP SECTION (Solid Vibrant Gradient) */}
      <div className={`p-6 flex flex-col items-start bg-gradient-to-br ${theme.gradient}`}>
        <BookOpen className="h-8 w-8 mb-4 text-white opacity-90" strokeWidth={1.5} />
        <span className="inline-block px-3 py-1 bg-white/20 text-white rounded-full text-[11px] font-bold tracking-wide mb-3 uppercase backdrop-blur-sm">
          {course?.category || "Category"}
        </span>
        <h3 className="text-xl font-bold mb-2 text-white leading-tight">
          {course?.title || course?.name || "Course Title"}
        </h3>
        <p className="text-sm text-white/90 line-clamp-2 leading-relaxed font-medium">
          {course?.shortDescription || course?.description || "Complete course description and preparation guidance details."}
        </p>
      </div>

      {/* 2. BOTTOM SECTION (White Background) */}
      <div className="p-5 flex flex-col flex-grow bg-white">
        
        {/* --- NEW: Info Boxes Row --- */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          {/* Duration Box */}
          <div className={`p-3 rounded-xl border border-slate-100 flex items-center gap-3 ${theme.lightBg}`}>
            <div className={`p-2 rounded-lg bg-white shadow-sm ${theme.textColor}`}>
              <Clock size={16} strokeWidth={2.5} />
            </div>
            <div>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Duration</p>
              <p className="text-sm font-bold text-slate-900">{course?.duration || "6 Months"}</p>
            </div>
          </div>

          {/* Enrolled Box */}
          <div className={`p-3 rounded-xl border border-slate-100 flex items-center gap-3 ${theme.lightBg}`}>
            <div className={`p-2 rounded-lg bg-white shadow-sm ${theme.textColor}`}>
              <Users size={16} strokeWidth={2.5} />
            </div>
            <div>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Enrolled</p>
              <p className="text-sm font-bold text-slate-900">{course?.batchSize || "1.2k+"}</p>
            </div>
          </div>
        </div>
        {/* --------------------------- */}

        {/* Features List */}
        <div className="flex-grow mb-5 pl-1">
          <div className="space-y-2">
            {featuresList.map((feature, idx) => (
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
              ₹{(course?.price || 5000).toLocaleString()}
            </div>
          </div>
          
          {/* --- NEW: View Detail Button --- */}
          <button 
            // Using inline style for solid background color to match theme perfectly
            style={{ backgroundColor: theme.solid }}
            className="w-full py-3.5 rounded-xl font-bold text-white text-sm uppercase tracking-wider transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 flex items-center justify-center gap-2"
          >
            View Detail <ArrowRight size={16} />
          </button>
          {/* ------------------------------- */}
        </div>
        
      </div>
    </div>
  );
};

export default CourseCard;
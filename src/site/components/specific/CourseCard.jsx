import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen } from 'lucide-react';

const CourseCard = ({ id, title, shortDescription, imageUrl, colorTheme, tag }) => {
  
  // Badge Styles
  const badgeStyles = {
    primary: "bg-blue-100/60 text-blue-700 border-blue-200/50",
    emerald: "bg-emerald-100/60 text-emerald-700 border-emerald-200/50",
    rose: "bg-rose-100/60 text-rose-700 border-rose-200/50",
    purple: "bg-purple-100/60 text-purple-700 border-purple-200/50",
    orange: "bg-orange-100/60 text-orange-700 border-orange-200/50",
    teal: "bg-teal-100/60 text-teal-700 border-teal-200/50",
    pink: "bg-pink-100/60 text-pink-700 border-pink-200/50",
    cyan: "bg-cyan-100/60 text-cyan-700 border-cyan-200/50",
  };

  const currentBadgeStyle = badgeStyles[colorTheme] || badgeStyles.primary;

  const btnGradients = {
    primary: "bg-gradient-to-r from-blue-600 to-indigo-500",
    emerald: "bg-gradient-to-r from-emerald-600 to-teal-500",
    rose: "bg-gradient-to-r from-rose-600 to-pink-500",
    purple: "bg-gradient-to-r from-purple-600 to-indigo-500",
    orange: "bg-gradient-to-r from-orange-600 to-amber-500",
    teal: "bg-gradient-to-r from-teal-600 to-cyan-500",
    pink: "bg-gradient-to-r from-pink-600 to-rose-500",
    cyan: "bg-gradient-to-r from-cyan-600 to-blue-500",
  };

  const currentBtnGradient = btnGradients[colorTheme] || btnGradients.primary;

  return (
    <div className="group relative bg-white rounded-3xl p-5 w-full max-w-[360px] border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-1 overflow-hidden">
      
      {tag && (
        <div className={`absolute top-5 right-5 z-20 px-4 py-1.5 rounded-full text-[11px] font-bold tracking-wide uppercase border backdrop-blur-md ${currentBadgeStyle}`}>
          {tag}
        </div>
      )}

      {/* Course Image - Using 'imageUrl' directly */}
      <div className="relative h-48 w-full mb-6 rounded-2xl overflow-hidden bg-gray-50">
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
            onError={(e) => {
                e.target.style.display = 'none';
                if(e.target.nextSibling) e.target.nextSibling.style.display = 'flex';
            }}
          />
        ) : null}
        
        {/* Fallback */}
        <div 
            className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-300 absolute inset-0"
            style={{ display: imageUrl ? 'none' : 'flex' }}
        >
          <BookOpen className="w-12 h-12" />
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      </div>

      <div className="px-2 pb-2">
        <h3 className="text-2xl font-black text-gray-900 mb-3 tracking-tight group-hover:text-blue-600 transition-colors">
          {title}
        </h3>
        
        <p className="text-gray-500 text-sm mb-8 leading-relaxed line-clamp-2 font-medium">
          {shortDescription}
        </p>

        <Link to={`/courses/${id}`}>
          <button className={`w-full py-4 px-6 rounded-xl text-white font-bold flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transition-all active:scale-95 ${currentBtnGradient}`}>
            Explore Program <ArrowRight className="w-4 h-4" />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CourseCard;
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Users } from 'lucide-react';
import Button from '../../../components/common/Button';

const CourseCard = ({ 
  id, 
  title, 
  shortDescription, 
  imageUrl, 
  tag,
  duration,
  colorTheme = 'blue' 
}) => {
  
  const themeColors = {
    blue: {
      badge: 'bg-blue-600 text-white shadow-sm',
      accent: 'text-blue-600',
      hoverBorder: 'hover:border-blue-500',
      iconBg: 'bg-blue-50',
      btnClass: 'bg-blue-600 hover:bg-blue-700 text-white border-transparent'
    },
    emerald: {
      badge: 'bg-emerald-600 text-white shadow-sm',
      accent: 'text-emerald-600',
      hoverBorder: 'hover:border-emerald-500',
      iconBg: 'bg-emerald-50',
      btnClass: 'bg-emerald-600 hover:bg-emerald-700 text-white border-transparent'
    },
    rose: {
      badge: 'bg-rose-600 text-white shadow-sm',
      accent: 'text-rose-600',
      hoverBorder: 'hover:border-rose-500',
      iconBg: 'bg-rose-50',
      btnClass: 'bg-rose-600 hover:bg-rose-700 text-white border-transparent'
    },
    purple: {
      badge: 'bg-purple-600 text-white shadow-sm',
      accent: 'text-purple-600',
      hoverBorder: 'hover:border-purple-500',
      iconBg: 'bg-purple-50',
      btnClass: 'bg-purple-600 hover:bg-purple-700 text-white border-transparent'
    },
    orange: {
      badge: 'bg-orange-600 text-white shadow-sm',
      accent: 'text-orange-600',
      hoverBorder: 'hover:border-orange-500',
      iconBg: 'bg-orange-50',
      btnClass: 'bg-orange-600 hover:bg-orange-700 text-white border-transparent'
    },
    teal: {
      badge: 'bg-teal-600 text-white shadow-sm',
      accent: 'text-teal-600',
      hoverBorder: 'hover:border-teal-500',
      iconBg: 'bg-teal-50',
      btnClass: 'bg-teal-600 hover:bg-teal-700 text-white border-transparent'
    },
    cyan: {
      badge: 'bg-cyan-600 text-white shadow-sm',
      accent: 'text-cyan-600',
      hoverBorder: 'hover:border-cyan-500',
      iconBg: 'bg-cyan-50',
      btnClass: 'bg-cyan-600 hover:bg-cyan-700 text-white border-transparent'
    },
    pink: {
      badge: 'bg-pink-600 text-white shadow-sm',
      accent: 'text-pink-600',
      hoverBorder: 'hover:border-pink-500',
      iconBg: 'bg-pink-50',
      btnClass: 'bg-pink-600 hover:bg-pink-700 text-white border-transparent'
    },
    indigo: {
      badge: 'bg-indigo-600 text-white shadow-sm',
      accent: 'text-indigo-600',
      hoverBorder: 'hover:border-indigo-500',
      iconBg: 'bg-indigo-50',
      btnClass: 'bg-indigo-600 hover:bg-indigo-700 text-white border-transparent'
    },
    red: {
      badge: 'bg-red-600 text-white shadow-sm',
      accent: 'text-red-600',
      hoverBorder: 'hover:border-red-500',
      iconBg: 'bg-red-50',
      btnClass: 'bg-red-600 hover:bg-red-700 text-white border-transparent'
    }
  };

  const theme = themeColors[colorTheme] || themeColors.blue;

  return (
    <div className={`
      group bg-white rounded-xl overflow-hidden 
      border border-secondary-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)] 
      transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_24px_rgba(0,0,0,0.08)] 
      ${theme.hoverBorder} 
      flex flex-col 
      w-full max-w-[360px] h-[400px]
    `}>
      
      {/* Image Container Changes:
         1. Increased height to 'h-56' (was h-48) to show more image.
         2. Removed 'p-2' and 'bg-white' to remove the box effect.
         3. Changed back to 'object-cover' so it fills the width fully.
         4. Removed 'group-hover:scale-105' and 'transition-transform' to stop zooming.
      */}
      <div className="relative h-56 w-full bg-secondary-100 shrink-0 overflow-hidden border-b border-secondary-50">
        <img 
          src={imageUrl || "https://via.placeholder.com/400x250?text=Course+Image"} 
          alt={title} 
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        {/* Badge/Tag */}
        {tag && (
          <div className={`absolute top-3 right-3 ${theme.badge} text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full z-20 shadow-sm`}>
            {tag}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow relative">
        {/* Meta Info (Duration Only) */}
        {duration && (
          <div className="flex items-center gap-4 mb-3 text-xs text-secondary-500 font-medium">
            <div className="flex items-center gap-1.5">
              <Clock className={`w-3.5 h-3.5 ${theme.accent}`} />
              <span>{duration}</span>
            </div>
          </div>
        )}

        {/* Title */}
        <h3 className="text-lg font-bold text-secondary-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
          <Link to={`/courses/${id}`}>
            {title}
          </Link>
        </h3>
        
        {/* Description */}
        <p className="text-secondary-600 text-sm line-clamp-3 mb-4 flex-grow">
          {shortDescription}
        </p>
        
        {/* Footer / Action */}
        <div className="mt-auto pt-4 border-t border-secondary-100 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-secondary-500 font-medium">
            <div className={`p-1.5 rounded-full ${theme.iconBg}`}>
              <Users className={`w-4 h-4 ${theme.accent}`} />
            </div>
            <span>Enrolling</span>
          </div>
          
          <Link to={`/courses/${id}`}>
            <Button 
              size="sm" 
              className={`rounded-lg px-4 gap-1.5 group-hover:gap-2 transition-all ${theme.btnClass}`}
            >
              View Details
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
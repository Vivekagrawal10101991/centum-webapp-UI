import React from 'react';
import { Award, TrendingUp, Quote } from 'lucide-react';

const StudentCard = ({ student }) => {
  return (
    <div className="w-[340px] h-[480px] relative rounded-[2rem] overflow-hidden flex-shrink-0 group shadow-xl shadow-slate-200 hover:shadow-2xl hover:shadow-indigo-500/20 hover:-translate-y-2 transition-all duration-500 cursor-pointer border border-slate-100/10">
      
      {/* Background Image - Smooth Deep Zoom on Hover */}
      <img 
        src={student.image} 
        alt={student.name} 
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
      />
      
      {/* Deep Dark Gradient Overlay - Darkens slightly on hover for better text focus */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent opacity-90 group-hover:opacity-95 transition-opacity duration-500" />

      {/* TOP BADGES */}
      <div className="absolute top-5 left-5 right-5 flex justify-between items-start z-10">
        
        {/* Left Award Squircle - Subtle jump on hover */}
        <div className={`h-12 w-12 rounded-2xl flex items-center justify-center shadow-lg ${student.theme.badgeBg} group-hover:-translate-y-1 transition-transform duration-500`}>
          <Award className="text-white h-6 w-6" strokeWidth={2.5} />
        </div>
        
        {/* Right Pill Badge - Background darkens to make text pop more on hover */}
        <div className={`px-4 py-2 rounded-full border ${student.theme.borderColor} bg-black/40 backdrop-blur-md flex items-center gap-2 group-hover:bg-black/70 transition-colors duration-500`}>
          <TrendingUp className={`h-4 w-4 ${student.theme.textColor}`} strokeWidth={3} />
          <span className={`text-sm font-black tracking-wider uppercase ${student.theme.textColor}`}>
            {student.badgeText}
          </span>
        </div>
      </div>

      {/* BOTTOM CONTENT - Slides up smoothly on hover */}
      <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col items-start z-10 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
        
        {/* Colored Accent Line - Expands width on hover */}
        <div className={`h-1 w-10 group-hover:w-20 rounded-full mb-3 ${student.theme.badgeBg} transition-all duration-500 ease-out`} />
        
        {/* Name */}
        <h3 className="text-3xl font-bold text-white mb-2 tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-300 transition-all duration-300">
          {student.name}
        </h3>
        
        {/* Achievement Bullet Point */}
        <div className="flex items-center gap-2 mb-1.5">
          {/* Bullet dot scales up on hover */}
          <div className={`h-2.5 w-2.5 rounded-full ${student.theme.badgeBg} group-hover:scale-125 transition-transform duration-300`} />
          <span className={`text-sm font-bold uppercase tracking-wider ${student.theme.textColor}`}>
            {student.achievement}
          </span>
        </div>
        
        {/* Program Description */}
        <p className="text-xs font-bold text-slate-300 mb-5 tracking-wide">
          {student.program}
        </p>
        
        {/* Quote Icon - Brightens, scales, and tilts on hover */}
        <Quote className={`h-8 w-8 mb-2 opacity-40 group-hover:opacity-80 group-hover:scale-110 group-hover:-rotate-6 transition-all duration-300 ${student.theme.textColor}`} fill="currentColor" />
        
        {/* Quote Text */}
        <p className="text-sm text-slate-200 italic line-clamp-4 leading-relaxed whitespace-normal font-medium">
          {student.quote}
        </p>
      </div>
    </div>
  );
};

export default StudentCard;
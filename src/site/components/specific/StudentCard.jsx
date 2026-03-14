import React from 'react';
import { Award, TrendingUp, User } from 'lucide-react';

/**
 * StudentCard Component
 * Refined with premium typography and bottom alignment.
 * NEW: Displays a themed User Icon if no student image is provided.
 * UPDATED: Card size reduced by ~25% along with proportional internal spacing.
 */
const StudentCard = ({ student }) => {
  const hasImage = !!student.image && student.image.trim() !== "";

  return (
    <div className="w-[248px] h-[352px] relative rounded-[1.5rem] overflow-hidden flex-shrink-0 group shadow-xl shadow-slate-200 hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-2 transition-all duration-500 cursor-pointer border border-slate-100/5">
      
      {/* BACKGROUND LAYER */}
      {hasImage ? (
        <img 
          src={student.image} 
          alt={student.name} 
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
        />
      ) : (
        /* PREMIUM PLACEHOLDER: Shown if image is missing */
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
          <div className={`w-24 h-24 rounded-full bg-black/20 flex items-center justify-center border-2 border-dashed ${student.theme.borderColor} group-hover:scale-110 transition-transform duration-700`}>
            <User className={`w-12 h-12 ${student.theme.textColor} opacity-40`} />
          </div>
        </div>
      )}
      
      {/* Deep Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/70 to-transparent opacity-90 group-hover:opacity-95 transition-opacity duration-500" />

      {/* TOP BADGES */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-10">
        <div className={`h-9 w-9 rounded-xl flex items-center justify-center shadow-lg ${student.theme.badgeBg} group-hover:-translate-y-1 transition-transform duration-500`}>
          <Award className="text-white h-4 w-4" strokeWidth={2.5} />
        </div>
        
        <div className={`px-3 py-1.5 rounded-full border ${student.theme.borderColor} bg-black/30 backdrop-blur-md flex items-center gap-1.5 group-hover:bg-black/60 transition-colors duration-500`}>
          <TrendingUp className={`h-3 w-3 ${student.theme.textColor}`} strokeWidth={3} />
          <span className={`text-[9px] font-black tracking-[0.12em] uppercase ${student.theme.textColor}`}>
            {student.badgeText}
          </span>
        </div>
      </div>

      {/* BOTTOM CONTENT - Identity Details */}
      <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col items-start z-10 transform translate-y-1 group-hover:translate-y-0 transition-transform duration-500">
        <div className={`h-[3px] w-8 group-hover:w-16 rounded-full mb-4 ${student.theme.badgeBg} transition-all duration-700 ease-in-out`} />
        
        <h3 className="text-xl font-black text-white mb-1.5 tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-300 transition-all duration-300">
          {student.name}
        </h3>
        
        <div className="flex items-center gap-2 mb-1">
          <div className={`h-1.5 w-1.5 rounded-full ${student.theme.badgeBg} group-hover:scale-125 transition-transform duration-300`} />
          <span className={`text-[11px] font-extrabold uppercase tracking-[0.08em] ${student.theme.textColor}`}>
            {student.achievement}
          </span>
        </div>
        
        <p className="text-[10px] font-bold text-slate-300 tracking-[0.02em] uppercase opacity-90">
          {student.program}
        </p>
      </div>
    </div>
  );
};

export default StudentCard;
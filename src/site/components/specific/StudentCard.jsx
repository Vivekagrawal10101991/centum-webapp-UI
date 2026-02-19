import React from 'react';
import { Award, TrendingUp, User } from 'lucide-react';

/**
 * StudentCard Component
 * Refined with premium typography and bottom alignment.
 * NEW: Displays a themed User Icon if no student image is provided.
 */
const StudentCard = ({ student }) => {
  const hasImage = !!student.image && student.image.trim() !== "";

  return (
    <div className="w-[330px] h-[470px] relative rounded-[2rem] overflow-hidden flex-shrink-0 group shadow-xl shadow-slate-200 hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-2 transition-all duration-500 cursor-pointer border border-slate-100/5">
      
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
          <div className={`w-32 h-32 rounded-full bg-black/20 flex items-center justify-center border-2 border-dashed ${student.theme.borderColor} group-hover:scale-110 transition-transform duration-700`}>
            <User className={`w-16 h-16 ${student.theme.textColor} opacity-40`} />
          </div>
        </div>
      )}
      
      {/* Deep Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/70 to-transparent opacity-90 group-hover:opacity-95 transition-opacity duration-500" />

      {/* TOP BADGES */}
      <div className="absolute top-6 left-6 right-6 flex justify-between items-start z-10">
        <div className={`h-11 w-11 rounded-xl flex items-center justify-center shadow-lg ${student.theme.badgeBg} group-hover:-translate-y-1 transition-transform duration-500`}>
          <Award className="text-white h-5 w-5" strokeWidth={2.5} />
        </div>
        
        <div className={`px-3.5 py-2 rounded-full border ${student.theme.borderColor} bg-black/30 backdrop-blur-md flex items-center gap-2 group-hover:bg-black/60 transition-colors duration-500`}>
          <TrendingUp className={`h-3.5 w-3.5 ${student.theme.textColor}`} strokeWidth={3} />
          <span className={`text-[11px] font-black tracking-[0.12em] uppercase ${student.theme.textColor}`}>
            {student.badgeText}
          </span>
        </div>
      </div>

      {/* BOTTOM CONTENT - Identity Details */}
      <div className="absolute bottom-0 left-0 right-0 p-8 flex flex-col items-start z-10 transform translate-y-1 group-hover:translate-y-0 transition-transform duration-500">
        <div className={`h-[4px] w-10 group-hover:w-20 rounded-full mb-6 ${student.theme.badgeBg} transition-all duration-700 ease-in-out`} />
        
        <h3 className="text-2xl font-black text-white mb-2 tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-300 transition-all duration-300">
          {student.name}
        </h3>
        
        <div className="flex items-center gap-2.5 mb-1.5">
          <div className={`h-2 w-2 rounded-full ${student.theme.badgeBg} group-hover:scale-125 transition-transform duration-300`} />
          <span className={`text-[13px] font-extrabold uppercase tracking-[0.08em] ${student.theme.textColor}`}>
            {student.achievement}
          </span>
        </div>
        
        <p className="text-[12px] font-bold text-slate-300 tracking-[0.02em] uppercase opacity-90">
          {student.program}
        </p>
      </div>
    </div>
  );
};

export default StudentCard;
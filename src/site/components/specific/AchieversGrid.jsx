import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Award } from 'lucide-react';
import StudentCard from './StudentCard';
import cmsService from '../../services/cmsService';

/**
 * AchieversGrid Component
 * Fetches data from backend and displays in an optimized, slower marquee.
 */
const AchieversGrid = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchToppers = async () => {
      try {
        const response = await cmsService.getToppers();
        const rawData = Array.isArray(response) ? response : (response?.content || []);
        
        const themes = [
          { badgeBg: "bg-amber-500", textColor: "text-amber-500", borderColor: "border-amber-500/40" },
          { badgeBg: "bg-rose-500", textColor: "text-rose-500", borderColor: "border-rose-500/40" },
          { badgeBg: "bg-purple-500", textColor: "text-purple-400", borderColor: "border-purple-500/40" },
          { badgeBg: "bg-emerald-500", textColor: "text-emerald-400", borderColor: "border-emerald-500/40" },
          { badgeBg: "bg-blue-500", textColor: "text-blue-400", borderColor: "border-blue-500/40" }
        ];

        const mappedStudents = rawData.map((item, index) => ({
          name: item.studentName || "Centum Student",
          achievement: `${item.examName || 'Achiever'} ${item.rank ? `| ${item.rank}` : ''}`,
          badgeText: item.rank || "AIR",
          program: item.year > 0 ? `${item.examName} - Batch of ${item.year}` : `${item.examName} Program`,
          image: item.imageUrl, // No fallback here; handled by StudentCard User Icon
          theme: themes[index % themes.length]
        }));
          
        setStudents(mappedStudents);
      } catch (error) {
        console.error("AchieversGrid Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchToppers();
  }, []);

  const duplicatedStudents = students.length > 0 ? [...students, ...students, ...students] : [];

  const stats = [
    { value: "95%", label: "Success Rate", textColor: "text-purple-700", borderColor: "border-purple-200", hoverBorder: "group-hover:border-purple-500", bgColor: "bg-purple-50/50" },
    { value: "150+", label: "Top 100 Ranks", textColor: "text-blue-700", borderColor: "border-blue-200", hoverBorder: "group-hover:border-blue-500", bgColor: "bg-blue-50/50" },
    { value: "500+", label: "IIT Selections", textColor: "text-amber-600", borderColor: "border-amber-200", hoverBorder: "group-hover:border-amber-500", bgColor: "bg-amber-50/50" },
    { value: "300+", label: "Medical Seats", textColor: "text-emerald-700", borderColor: "border-emerald-200", hoverBorder: "group-hover:border-emerald-500", bgColor: "bg-emerald-50/50" }
  ];

  return (
    <section className="py-24 bg-white overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 bg-[#4F46E5] text-white px-5 py-2.5 rounded-full mb-6 shadow-lg shadow-indigo-500/30"
        >
          <Award className="h-4 w-4" />
          <span className="text-sm font-bold uppercase tracking-widest">Success Stories</span>
        </motion.div>
        
        <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-5">
          Our Students' <span className="text-[#4F46E5]">Achievements</span>
        </h2>
        
        <p className="text-slate-500 text-lg max-w-2xl mx-auto font-medium">
          Hear from students who transformed their dreams into reality with Centum Academy
        </p>
      </div>

      <div className="relative w-full overflow-hidden mb-24 min-h-[480px] flex items-center justify-center">
        {/* FADE GRADIENTS: Width reduced to w-8/md:w-16 */}
        <div className="absolute top-0 bottom-0 left-0 w-8 md:w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-8 md:w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        {loading ? (
          <div className="flex flex-col items-center gap-4">
            <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-slate-400 font-medium">Loading achievements...</p>
          </div>
        ) : students.length > 0 ? (
          <motion.div
            className="flex gap-6 w-max px-6"
            animate={{ x: ["0%", "-33.33%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 57 }} // 30% slower speed
          >
            {duplicatedStudents.map((student, idx) => (
              <StudentCard key={idx} student={student} />
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-20 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200 px-20">
            <p className="text-slate-400 text-lg font-bold">Waiting for Achievement Data</p>
          </div>
        )}
      </div>

      {/* STATS ROW */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <div key={idx} className={`relative rounded-2xl p-6 md:py-8 text-center shadow-sm hover:shadow-md transition-all duration-300 border-2 ${stat.borderColor} ${stat.hoverBorder} ${stat.bgColor} group cursor-default`}>
              <h3 className={`text-3xl md:text-4xl font-extrabold mb-2 tracking-tight ${stat.textColor} group-hover:scale-105 transition-transform duration-300`}>
                {stat.value}
              </h3>
              <p className="text-xs md:text-sm font-bold text-slate-600 uppercase tracking-widest group-hover:text-slate-900 transition-colors duration-300">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AchieversGrid;
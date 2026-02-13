import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Award } from "lucide-react";

const ToppersSection = () => {
  const results = [
    { exam: "JEE Main 2025", result: "99.98 Percentile", student: "Aarav Sharma", color: "from-amber-400 to-orange-500" },
    { exam: "JEE Advanced", result: "AIR 42", student: "Priya Reddy", color: "from-purple-500 to-indigo-600" },
    { exam: "NEET 2025", result: "710/720 Marks", student: "Suresh Kumar", color: "from-emerald-400 to-teal-600" },
    { exam: "KCET Rank", result: "Rank 1", student: "Sneha Iyer", color: "from-blue-400 to-cyan-600" },
  ];

  // Duplicate for infinite scroll
  const scrollItems = [...results, ...results];

  return (
    <motion.section 
      className="bg-slate-900 py-12 overflow-hidden border-y border-white/5 font-sans"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-7xl mx-auto px-6 mb-10 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 bg-amber-400/10 text-amber-400 px-3 py-1 rounded-full mb-3 border border-amber-400/20">
            <Trophy className="h-3 w-3" />
            <span className="text-sm font-bold uppercase tracking-widest">Hall of Fame</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
            Our <span className="text-amber-400">Achievers</span> 2025
          </h2>
        </div>
        <p className="text-slate-400 font-medium text-sm max-w-xs md:text-right">
          Celebrating the dedication and excellence of our top-performing students.
        </p>
      </div>

      <div className="flex animate-scroll-left hover:[animation-play-state:paused] gap-6">
        {scrollItems.map((item, idx) => (
          <div 
            key={idx}
            className="flex-shrink-0 w-72 bg-white/5 backdrop-blur-sm rounded-[2rem] p-6 border border-white/10 group hover:bg-white/10 transition-all duration-500"
          >
            <div className={`h-12 w-12 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
              <Award className="h-6 w-6 text-white" />
            </div>
            <p className="text-[10px] font-black text-amber-400 uppercase tracking-widest mb-1">{item.exam}</p>
            <h3 className="text-xl font-black text-white mb-1">{item.result}</h3>
            <p className="text-sm font-bold text-slate-400">{item.student}</p>
          </div>
        ))}
      </div>
    </motion.section>
  );
};

export default ToppersSection;
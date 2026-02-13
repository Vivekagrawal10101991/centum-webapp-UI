import React from 'react';
import { motion } from 'framer-motion';
import { Award } from 'lucide-react';
import StudentCard from './StudentCard';

const AchieversGrid = () => {
  const students = [
    {
      name: "Arjun Nair",
      achievement: "NEET AIR 567",
      badgeText: "AIR 567",
      program: "NEET Preparation Program",
      quote: "\"The comprehensive test series and personalized feedback helped me identify and improve my weak areas. Excellent coaching!\"",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&h=800&fit=crop",
      theme: { badgeBg: "bg-amber-500", textColor: "text-amber-500", borderColor: "border-amber-500/40" }
    },
    {
      name: "Sneha Reddy",
      achievement: "JEE Advanced AIR 89",
      badgeText: "AIR 89",
      program: "JEE Preparation Program",
      quote: "\"Amazing faculty and well-structured curriculum. The study material was comprehensive and the doubt-clearing sessions were very helpful.\"",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&h=800&fit=crop",
      theme: { badgeBg: "bg-rose-500", textColor: "text-rose-500", borderColor: "border-rose-500/40" }
    },
    {
      name: "Karthik Iyer",
      achievement: "JEE Main 99.5 Percentile",
      badgeText: "99.5%",
      program: "JEE Preparation Program",
      quote: "\"The mentorship program and regular performance tracking kept me motivated throughout. Highly recommend Centum Academy!\"",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop",
      theme: { badgeBg: "bg-purple-500", textColor: "text-purple-400", borderColor: "border-purple-500/40" }
    },
    {
      name: "Rajesh Kumar",
      achievement: "JEE Advanced AIR 247",
      badgeText: "AIR 247",
      program: "JEE Preparation Program",
      quote: "\"Centum Academy's personalized mentorship and expert faculty helped me achieve my dream of getting into IIT. The mock tests were game-changing.\"",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&h=800&fit=crop",
      theme: { badgeBg: "bg-emerald-500", textColor: "text-emerald-400", borderColor: "border-emerald-500/40" }
    },
    {
      name: "Priya Sharma",
      achievement: "NEET AIR 312",
      badgeText: "AIR 312",
      program: "NEET Preparation Program",
      quote: "\"The biology modules and accuracy of Centum's test series ensured my admission into my dream medical college. Truly grateful!\"",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&h=800&fit=crop",
      theme: { badgeBg: "bg-blue-500", textColor: "text-blue-400", borderColor: "border-blue-500/40" }
    }
  ];

  const duplicatedStudents = [...students, ...students, ...students];

  // --- UPGRADED: Classic, elegant stat cards with solid colors & borders ---
  const stats = [
    { 
      value: "95%", 
      label: "Success Rate", 
      textColor: "text-purple-700",
      borderColor: "border-purple-200",
      hoverBorder: "group-hover:border-purple-500",
      bgColor: "bg-purple-50/50"
    },
    { 
      value: "150+", 
      label: "Top 100 Ranks", 
      textColor: "text-blue-700",
      borderColor: "border-blue-200",
      hoverBorder: "group-hover:border-blue-500",
      bgColor: "bg-blue-50/50"
    },
    { 
      value: "500+", 
      label: "IIT Selections", 
      textColor: "text-amber-600",
      borderColor: "border-amber-200",
      hoverBorder: "group-hover:border-amber-500",
      bgColor: "bg-amber-50/50"
    },
    { 
      value: "300+", 
      label: "Medical Seats", 
      textColor: "text-emerald-700",
      borderColor: "border-emerald-200",
      hoverBorder: "group-hover:border-emerald-500",
      bgColor: "bg-emerald-50/50"
    }
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
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-5"
        >
          Our Students' <span className="text-[#4F46E5]">Achievements</span>
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-slate-500 text-lg max-w-2xl mx-auto font-medium"
        >
          Hear from students who transformed their dreams into reality with Centum Academy
        </motion.p>
      </div>

      {/* 1. Infinite Marquee Container */}
      <div className="relative w-full overflow-hidden mb-24">
        <div className="absolute top-0 bottom-0 left-0 w-20 md:w-40 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-20 md:w-40 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <motion.div
          className="flex gap-6 w-max px-6"
          animate={{ x: ["0%", "-33.33%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 35 }}
        >
          {duplicatedStudents.map((student, idx) => (
            <StudentCard key={idx} student={student} />
          ))}
        </motion.div>
      </div>

      {/* 2. Classic Stat Cards Row */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              // Classic Styling applied here: 2px border, soft background, neat padding
              className={`relative rounded-2xl p-6 md:py-8 text-center shadow-sm hover:shadow-md transition-all duration-300 border-2 ${stat.borderColor} ${stat.hoverBorder} ${stat.bgColor} group cursor-default`}
            >
              <div className="relative z-10">
                {/* Number Size Decreased and made Solid Color */}
                <h3 className={`text-3xl md:text-4xl font-extrabold mb-2 tracking-tight ${stat.textColor} group-hover:scale-105 transition-transform duration-300`}>
                  {stat.value}
                </h3>
                
                {/* Classic Label Typography */}
                <p className="text-xs md:text-sm font-bold text-slate-600 uppercase tracking-widest group-hover:text-slate-900 transition-colors duration-300">
                  {stat.label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

    </section>
  );
};

export default AchieversGrid;
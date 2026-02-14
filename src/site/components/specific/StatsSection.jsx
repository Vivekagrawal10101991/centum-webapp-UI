import React from 'react';
import { motion } from "framer-motion";
import { Award, Clock, Users, Target, ShieldCheck, Zap } from "lucide-react";

const StatsSection = () => {
  const stats = [
    {
      label: "Students Cracked JEE Advanced",
      value: "20+",
      description: "Top performers securing seats in premier IITs across India.",
      icon: Award,
      color: "#4F46E5", // Indigo
      delay: 0.1
    },
    {
      label: "Years of Academic Excellence",
      value: "10+",
      description: "A decade-long track record of consistent competitive success.",
      icon: Clock,
      color: "#7E3AF2", // Purple
      delay: 0.2
    },
    {
      label: "Faculty Support & Expertise",
      value: "IIT Alumni",
      description: "Learn from mentors who have successfully cleared the journey themselves.",
      icon: Users,
      color: "#00A67E", // Green
      delay: 0.3
    },
    {
      label: "Personalized Mentorship",
      value: "100%",
      description: "Individual attention and customized learning plans for every student.",
      icon: Target,
      color: "#F59E0B", // Amber
      delay: 0.4
    }
  ];

  return (
    <section className="py-24 bg-slate-100 relative overflow-hidden font-sans">
      {/* Premium Background Decorative Elements */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-indigo-50 rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-96 h-96 bg-purple-50 rounded-full blur-3xl opacity-50" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* SECTION HEADING */}
        <div className="text-center mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-white text-[#4F46E5] px-5 py-2.5 rounded-full mb-6 shadow-sm border border-slate-200"
          >
            <ShieldCheck className="h-4 w-4" />
            <span className="text-sm font-bold uppercase tracking-widest">The Centum Advantage</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-5"
          >
            Why choose <span className="text-[#4F46E5]">Centum Academy</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 text-lg max-w-2xl mx-auto font-medium"
          >
            Empowering students through concept-driven learning and a proven ecosystem for academic excellence.
          </motion.p>
        </div>

        {/* STATS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: stat.delay }}
                whileHover={{ y: -10 }}
                className="group relative bg-white rounded-[1.25rem] p-8 shadow-sm border border-slate-200 transition-all duration-300 hover:shadow-2xl hover:border-transparent"
              >
                {/* Bright Border on Hover Effect */}
                <div 
                  className="absolute inset-0 rounded-[1.25rem] border-2 border-transparent group-hover:opacity-100 opacity-0 transition-opacity duration-300 pointer-events-none"
                  style={{ borderColor: stat.color }}
                />

                {/* Icon Container with Animated Pulse */}
                <div className="relative mb-8">
                  <div 
                    className="w-16 h-16 rounded-2xl flex items-center justify-center text-white relative z-10 shadow-lg transform transition-transform duration-500 group-hover:rotate-12"
                    style={{ background: `linear-gradient(135deg, ${stat.color}, #6749D4)` }}
                  >
                    <Icon className="h-8 w-8" />
                  </div>
                  <div 
                    className="absolute inset-0 w-16 h-16 rounded-2xl blur-lg opacity-40 animate-pulse"
                    style={{ backgroundColor: stat.color }}
                  />
                </div>

                {/* VALUE - text-3xl font-black (900 weight) */}
                <h3 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">
                  {stat.value}
                </h3>

                {/* LABEL - text-base font-bold (700 weight) */}
                <h4 className="text-base font-bold text-slate-800 mb-4 leading-snug">
                  {stat.label}
                </h4>

                {/* DESCRIPTION - text-sm font-normal (400 weight) */}
                <p className="text-sm font-normal text-slate-500 leading-relaxed">
                  {stat.description}
                </p>

                {/* Premium Background Accent on Hover */}
                <div 
                  className="absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                  style={{ backgroundColor: stat.color }}
                />
              </motion.div>
            );
          })}
        </div>

        {/* BOTTOM CTA STRIP */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-20 p-8 rounded-[1.25rem] bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl"
        >
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="p-3 bg-white/10 rounded-full">
              <Zap className="h-6 w-6 text-yellow-400" />
            </div>
            <div>
              <h5 className="text-lg font-bold">Ready to start your journey?</h5>
              <p className="text-white/70 text-sm">Join the league of toppers today with expert mentorship.</p>
            </div>
          </div>
          <button className="px-8 py-3 bg-[#4F46E5] hover:bg-[#4338CA] text-white font-bold rounded-full transition-all shadow-lg shadow-indigo-500/30 whitespace-nowrap">
            Apply Now
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection;
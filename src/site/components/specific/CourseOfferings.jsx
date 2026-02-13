import React, { useState } from 'react';
import { motion } from "framer-motion";
import { 
  BookOpen, GraduationCap, Target, Award, Users, 
  Clock, Sparkles, CheckCircle, ArrowRight 
} from "lucide-react";

export const CourseOfferings = () => {
  const programCategories = [
    { name: "JEE Preparation", icon: GraduationCap, color: "#1C64F2", desc: "Comprehensive engineering entrance preparation", count: 2 },
    { name: "NEET Preparation", icon: BookOpen, color: "#00A67E", desc: "Complete medical entrance coaching", count: 2 },
    { name: "Foundation Courses", icon: Target, color: "#F59E0B", desc: "Building strong basics for future success", count: 2 }
  ];

  const highlights = [
    { icon: Award, title: "Expert Faculty", desc: "IIT & AIIMS alumni with proven track record" },
    { icon: Users, title: "Small Batches", desc: "Personalized attention with 25-35 students" },
    { icon: Target, title: "Result-Oriented", desc: "95% success rate with 500+ IIT selections" },
    { icon: Clock, title: "Flexible Timings", desc: "School-integrated and full-time programs" }
  ];

  return (
    <section className="bg-gradient-to-br from-white via-purple-50/30 to-blue-50/30 py-24 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 px-4 py-2 rounded-full mb-6">
            <Sparkles className="h-4 w-4 text-white" />
            <span className="text-[10px] font-black uppercase tracking-widest text-white">Our Programs</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-6 tracking-tighter">
            Discover Your Path to <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Success</span>
          </h2>
          <p className="text-xl text-slate-500 max-w-3xl mx-auto leading-relaxed">
            Comprehensive programs designed by experts to help you crack JEE, NEET, and build a strong foundation.
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {programCategories.map((cat, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -10 }}
              className="bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/50 border border-slate-100"
            >
              <div 
                className="h-16 w-16 rounded-2xl flex items-center justify-center mb-6"
                style={{ background: `${cat.color}15` }}
              >
                <cat.icon className="h-8 w-8" style={{ color: cat.color }} />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-2">{cat.name}</h3>
              <p className="text-sm font-medium text-slate-500 mb-6 leading-relaxed">{cat.desc}</p>
              <div className="text-xs font-black uppercase tracking-widest" style={{ color: cat.color }}>
                {cat.count} Programs Available
              </div>
            </motion.div>
          ))}
        </div>

        {/* Highlights Grid */}
        <div className="grid md:grid-cols-4 gap-6">
          {highlights.map((h, i) => (
            <div key={i} className="bg-white/50 backdrop-blur-sm p-6 rounded-2xl border border-white/50 flex gap-4 items-center">
              <h.icon className="h-10 w-10 text-purple-600 flex-shrink-0" />
              <div>
                <h4 className="font-black text-slate-900 text-sm mb-1">{h.title}</h4>
                <p className="text-xs text-slate-500 font-medium">{h.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
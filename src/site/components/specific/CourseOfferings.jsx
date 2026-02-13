import React from 'react';
import { motion } from "framer-motion";
import { 
  BookOpen, GraduationCap, Target, Award, Users, 
  Clock, Sparkles
} from "lucide-react";

export const CourseOfferings = () => {
  const programCategories = [
    { 
      name: "JEE Preparation", 
      icon: GraduationCap, 
      desc: "Comprehensive engineering entrance preparation", 
      count: 2,
      iconColor: "text-blue-600",
      iconBg: "bg-white shadow-sm",
      cardBg: "bg-blue-50/60",
      cardBorder: "border-blue-200/60",
      hoverCardBg: "hover:bg-blue-100/60",
      hoverBorder: "hover:border-blue-400",
      hoverTitle: "group-hover:text-blue-700",
      countColor: "text-blue-600"
    },
    { 
      name: "NEET Preparation", 
      icon: BookOpen, 
      desc: "Complete medical entrance coaching", 
      count: 2,
      iconColor: "text-emerald-600",
      iconBg: "bg-white shadow-sm",
      cardBg: "bg-emerald-50/60",
      cardBorder: "border-emerald-200/60",
      hoverCardBg: "hover:bg-emerald-100/60",
      hoverBorder: "hover:border-emerald-400",
      hoverTitle: "group-hover:text-emerald-700",
      countColor: "text-emerald-600"
    },
    { 
      name: "Foundation Courses", 
      icon: Target, 
      desc: "Building strong basics for future success", 
      count: 2,
      iconColor: "text-amber-600",
      iconBg: "bg-white shadow-sm",
      cardBg: "bg-amber-50/60",
      cardBorder: "border-amber-200/60",
      hoverCardBg: "hover:bg-amber-100/60",
      hoverBorder: "hover:border-amber-400",
      hoverTitle: "group-hover:text-amber-700",
      countColor: "text-amber-600"
    }
  ];

  // UPDATED: Added specific color tokens and hover effects to the 4 bottom highlights
  const highlights = [
    { 
      icon: Award, 
      title: "Expert Faculty", 
      desc: "IIT & AIIMS alumni with proven track record",
      iconColor: "text-purple-600",
      cardBg: "bg-purple-50/60",
      cardBorder: "border-purple-200/60",
      hoverCardBg: "hover:bg-purple-100/60",
      hoverBorder: "hover:border-purple-400",
      hoverTitle: "group-hover:text-purple-700"
    },
    { 
      icon: Users, 
      title: "Small Batches", 
      desc: "Personalized attention with 25-35 students",
      iconColor: "text-blue-600",
      cardBg: "bg-blue-50/60",
      cardBorder: "border-blue-200/60",
      hoverCardBg: "hover:bg-blue-100/60",
      hoverBorder: "hover:border-blue-400",
      hoverTitle: "group-hover:text-blue-700"
    },
    { 
      icon: Target, 
      title: "Result-Oriented", 
      desc: "95% success rate with 500+ IIT selections",
      iconColor: "text-emerald-600",
      cardBg: "bg-emerald-50/60",
      cardBorder: "border-emerald-200/60",
      hoverCardBg: "hover:bg-emerald-100/60",
      hoverBorder: "hover:border-emerald-400",
      hoverTitle: "group-hover:text-emerald-700"
    },
    { 
      icon: Clock, 
      title: "Flexible Timings", 
      desc: "School-integrated and full-time programs",
      iconColor: "text-amber-600",
      cardBg: "bg-amber-50/60",
      cardBorder: "border-amber-200/60",
      hoverCardBg: "hover:bg-amber-100/60",
      hoverBorder: "hover:border-amber-400",
      hoverTitle: "group-hover:text-amber-700"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section className="bg-gradient-to-br from-white via-purple-50/30 to-blue-50/30 py-24 px-6 overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 px-4 py-2 rounded-full mb-6">
            <Sparkles className="h-4 w-4 text-white" />
            <span className="text-sm font-bold uppercase tracking-widest text-white">Our Programs</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
            Discover Your Path to <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Success</span>
          </h2>
          
          <p className="text-lg font-normal text-slate-500 max-w-3xl mx-auto leading-relaxed">
            Comprehensive programs designed by experts to help you crack JEE, NEET, and build a strong foundation.
          </p>
        </motion.div>

        {/* Categories Grid (Top 3 Large Cards) */}
        <motion.div 
          className="grid md:grid-cols-3 gap-8 mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {programCategories.map((cat, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ y: -12 }}
              className={`group rounded-3xl p-8 border shadow-xl hover:shadow-2xl hover:shadow-slate-300/60 ${cat.cardBg} ${cat.cardBorder} ${cat.hoverCardBg} ${cat.hoverBorder} transition-all duration-300`}
            >
              <div 
                className={`h-16 w-16 rounded-2xl flex items-center justify-center mb-6 ${cat.iconBg} ${cat.iconColor}`}
              >
                <cat.icon className="h-8 w-8" />
              </div>
              
              <h3 className={`text-2xl font-bold text-slate-900 mb-3 ${cat.hoverTitle} transition-colors`}>
                {cat.name}
              </h3>
              
              <p className="text-base font-medium text-slate-500 mb-6 leading-relaxed">
                {cat.desc}
              </p>
              
              <div className={`text-sm font-black uppercase tracking-widest ${cat.countColor}`}>
                {cat.count} Programs Available
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Highlights Grid (Bottom 4 Small Cards) */}
        <motion.div 
          className="grid md:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {highlights.map((h, i) => (
            <motion.div 
              key={i} 
              variants={itemVariants}
              // UPDATED: Added group, dynamic background, border, shadow, and lift effect
              className={`group p-6 rounded-2xl border flex gap-4 items-center shadow-md hover:shadow-xl hover:shadow-slate-200/60 hover:-translate-y-1 transition-all duration-300 ${h.cardBg} ${h.cardBorder} ${h.hoverCardBg} ${h.hoverBorder}`}
            >
              {/* UPDATED: Put the icon in a white box to make it pop against the tinted background */}
              <div className={`h-12 w-12 rounded-xl bg-white shadow-sm flex items-center justify-center flex-shrink-0 ${h.iconColor}`}>
                 <h.icon className="h-6 w-6" />
              </div>
              
              <div>
                {/* UPDATED: Title color changes on group hover */}
                <h4 className={`font-bold text-slate-900 text-base mb-1 transition-colors ${h.hoverTitle}`}>
                  {h.title}
                </h4>
                <p className="text-sm text-slate-500 font-medium">
                  {h.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
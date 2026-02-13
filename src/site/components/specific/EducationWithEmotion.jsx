import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Users, GraduationCap, Laptop, Trophy, ArrowRight } from 'lucide-react';

const EducationWithEmotion = () => {
  // Enhanced data structure: Added permanent base colors (cardBg, cardBorder)
  // and changed iconBg to white so the icons pop against the tinted cards.
  const features = [
    {
      icon: Users,
      title: "PERSONALIZED MENTORING",
      desc: "Individual attention with customized learning plans tailored to each student's strengths and areas for improvement",
      iconColor: "text-purple-600",
      iconBg: "bg-white shadow-sm",
      cardBg: "bg-purple-50/60",
      cardBorder: "border-purple-200/60",
      hoverCardBg: "hover:bg-purple-100/60",
      hoverBorder: "hover:border-purple-400",
      hoverTitle: "group-hover:text-purple-700"
    },
    {
      icon: GraduationCap,
      title: "EXPERT FACULTY SUPPORT",
      desc: "Learn from IIT alumni faculty who have been through the journey and understand what it takes to succeed",
      iconColor: "text-emerald-600",
      iconBg: "bg-white shadow-sm",
      cardBg: "bg-emerald-50/60",
      cardBorder: "border-emerald-200/60",
      hoverCardBg: "hover:bg-emerald-100/60",
      hoverBorder: "hover:border-emerald-400",
      hoverTitle: "group-hover:text-emerald-700"
    },
    {
      icon: Laptop,
      title: "FLEXIBLE LEARNING",
      desc: "Comprehensive curriculum with flexible batch timings, online & offline options, and adaptive learning structure",
      iconColor: "text-blue-600",
      iconBg: "bg-white shadow-sm",
      cardBg: "bg-blue-50/60",
      cardBorder: "border-blue-200/60",
      hoverCardBg: "hover:bg-blue-100/60",
      hoverBorder: "hover:border-blue-400",
      hoverTitle: "group-hover:text-blue-700"
    },
    {
      icon: Trophy,
      title: "PROVEN TRACK RECORD",
      desc: "20+ students cracked JEE Advanced with 10+ years of academic excellence in preparing students for success",
      iconColor: "text-amber-600",
      iconBg: "bg-white shadow-sm",
      cardBg: "bg-amber-50/60",
      cardBorder: "border-amber-200/60",
      hoverCardBg: "hover:bg-amber-100/60",
      hoverBorder: "hover:border-amber-400",
      hoverTitle: "group-hover:text-amber-700"
    }
  ];

  // Animations for the Left Text Column
  const textContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const textItemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  // Animations for the Right Cards Column
  const cardsContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  const cardItemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section className="py-24 px-6 bg-slate-50 font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column: Text & CTA */}
          <motion.div
            variants={textContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="max-w-xl"
          >
            <motion.div variants={textItemVariants} className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full mb-6">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-bold uppercase tracking-widest">Why Choose Centum Academy</span>
            </motion.div>

            <motion.h2 variants={textItemVariants} className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight leading-tight">
              Education with <span className="text-purple-600">Emotion</span>
            </motion.h2>

            <motion.p variants={textItemVariants} className="text-lg font-normal text-slate-600 mb-10 leading-relaxed">
              Experience the perfect blend of academic excellence and personalized care. We focus on quality mentorship and building an ecosystem where learning is enjoyable, effective, and future-ready.
            </motion.p>

            <motion.div variants={textItemVariants} className="flex flex-wrap gap-4">
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-xl text-sm font-bold uppercase tracking-wider shadow-lg shadow-purple-600/20 transition-all flex items-center gap-2 hover:-translate-y-1">
                Learn More <ArrowRight className="h-4 w-4" />
              </button>
              <button className="bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 px-8 py-4 rounded-xl text-sm font-bold uppercase tracking-wider shadow-sm transition-all hover:-translate-y-1">
                Our Faculty
              </button>
            </motion.div>
          </motion.div>

          {/* Right Column: Features Grid */}
          <motion.div
            variants={cardsContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid sm:grid-cols-2 gap-6"
          >
            {features.map((f, i) => (
              <motion.div
                key={i}
                variants={cardItemVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                // UPDATED: Base state now uses f.cardBg and f.cardBorder instead of bg-white
                className={`group p-8 rounded-[2rem] border shadow-xl hover:shadow-2xl hover:shadow-slate-300/60 ${f.cardBg} ${f.cardBorder} ${f.hoverCardBg} ${f.hoverBorder} transition-all duration-300`}
              >
                <div className={`h-14 w-14 rounded-2xl ${f.iconBg} ${f.iconColor} flex items-center justify-center mb-6`}>
                  <f.icon className="h-7 w-7" />
                </div>
                <h3 className={`text-sm font-bold text-slate-900 mb-3 uppercase tracking-wider leading-snug ${f.hoverTitle} transition-colors`}>
                  {f.title}
                </h3>
                <p className="text-base font-normal text-slate-500 leading-relaxed">
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default EducationWithEmotion;
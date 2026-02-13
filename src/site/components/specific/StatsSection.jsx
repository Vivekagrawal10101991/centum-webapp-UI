import React from 'react';
import { motion } from "framer-motion";
import { Award, Clock, Users, Target } from "lucide-react";

const StatsSection = () => {
  const stats = [
    {
      icon: Award,
      value: "20+",
      label: "Students Cracked JEE Advanced",
      description: "Top performers securing seats in premier IITs",
      color: "#F59E0B"
    },
    {
      icon: Clock,
      value: "10+",
      label: "Years of Academic Excellence",
      description: "Consistent track record in competitive exam preparation",
      color: "#7E3AF2"
    },
    {
      icon: Users,
      value: "IIT Alumni",
      label: "Faculty Support",
      description: "Learn from the best mentors who have been through the journey",
      color: "#1C64F2"
    },
    {
      icon: Target,
      value: "100%",
      label: "Personalized Mentorship",
      description: "Individual attention and customized learning plans for every student",
      color: "#00A67E"
    }
  ];

  return (
    <section className="py-16 md:py-20 px-4 md:px-6 bg-gradient-to-br from-[#1E3A8A] via-[#2563EB] to-[#1E40AF] relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
            Why Choose Centum Academy
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Empowering students through concept-driven learning and proven results
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
          {stats.map((stat, idx) => (
            <motion.div 
              key={idx} 
              className="relative group"
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <div className="text-center bg-white/10 backdrop-blur-md rounded-2xl p-5 md:p-6 lg:p-8 hover:bg-white/20 transition-all duration-500 border border-white/20 hover:border-white/40 shadow-xl hover:shadow-2xl">
                {/* Icon Container */}
                <motion.div
                  className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full mb-4 mx-auto"
                  style={{ backgroundColor: `${stat.color}30` }}
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 + 0.3 }}
                >
                  <stat.icon 
                    className="h-7 w-7 md:h-8 md:w-8" 
                    style={{ color: stat.color }}
                  />
                </motion.div>

                {/* Value */}
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
                  {stat.value}
                </h3>

                {/* Label */}
                <p className="text-sm md:text-base lg:text-lg font-bold text-white mb-2 leading-tight">
                  {stat.label}
                </p>

                {/* Description */}
                <p className="text-xs md:text-sm text-white/80 leading-relaxed">
                  {stat.description}
                </p>

                {/* Decorative Bottom Accent */}
                <motion.div
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 h-1 rounded-full"
                  style={{ backgroundColor: stat.color }}
                  initial={{ width: 0 }}
                  whileInView={{ width: "50%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 + 0.5 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
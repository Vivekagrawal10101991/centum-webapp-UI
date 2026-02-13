import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, Award, Sparkles } from 'lucide-react';

const AchieversGrid = () => {
  const achievers = [
    {
      name: "Aditya Verma",
      achievement: "JEE Advanced - AIR 124",
      quote: "The conceptual clarity I gained at Centum was the key to cracking the advanced paper. The mentors were always there for my doubts.",
      image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&fit=crop"
    },
    {
      name: "Riya Kapoor",
      achievement: "NEET - 695 Marks",
      quote: "Centum's biology modules and regular mock tests made me feel confident. They don't just teach; they mentor you emotionally too.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop"
    },
    {
      name: "Ishaan Singh",
      achievement: "IIT Bombay - CSE",
      quote: "The environment here is competitive yet supportive. Every subject became a window to understanding the world better.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop"
    }
  ];

  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-purple-50 text-purple-600 px-4 py-2 rounded-full mb-4">
            <Sparkles className="h-4 w-4" />
            <span className="text-[10px] font-black uppercase tracking-widest">Student Testimonials</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
            Voices of <span className="text-purple-600">Success</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {achievers.map((item, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ y: -12 }}
              className="bg-slate-50 rounded-[3rem] p-10 border border-slate-100 relative group"
            >
              <Quote className="h-10 w-10 text-slate-200 absolute top-10 right-10 group-hover:text-purple-100 transition-colors" />
              
              <div className="relative z-10">
                <div className="h-20 w-20 rounded-3xl overflow-hidden mb-8 shadow-xl">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                
                <p className="text-lg text-slate-600 font-medium italic leading-relaxed mb-8">
                  "{item.quote}"
                </p>
                
                <div className="pt-8 border-t border-slate-200">
                  <h4 className="text-xl font-black text-slate-900 mb-1">{item.name}</h4>
                  <p className="text-xs font-bold text-purple-600 uppercase tracking-widest flex items-center gap-2">
                    <Award className="h-3 w-3" /> {item.achievement}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AchieversGrid;
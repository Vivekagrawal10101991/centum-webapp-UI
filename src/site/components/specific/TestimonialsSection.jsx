import React from 'react';
import { motion } from "framer-motion";
import { Quote, Sparkles } from "lucide-react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      parent: "Mrs. Lakshmi Sharma",
      student: "Mother of Aarav (AIR 15, JEE Adv)",
      quote: "Centum Academy provided the perfect blend of academic rigor and emotional support. The faculty's dedication to each student's success is truly remarkable.",
      color: "#7E3AF2"
    },
    {
      parent: "Dr. Rajesh Kumar",
      student: "Father of Priya (AIR 42, NEET)",
      quote: "The personalized attention and systematic approach made all the difference. We're grateful for the transformative education she received.",
      color: "#1C64F2"
    },
    {
      parent: "Mr. Suresh Patel",
      student: "Father of Rohan (99.98%ile, JEE Main)",
      quote: "What sets Centum apart is their holistic approach. They focus not just on scores but on building character and critical thinking.",
      color: "#00A67E"
    },
    {
      parent: "Mrs. Meena Iyer",
      student: "Mother of Sneha (AIR 89, NEET)",
      quote: "The caring environment and excellent teaching methodology helped our daughter achieve her dream of becoming a doctor.",
      color: "#F59E0B"
    }
  ];

  // Duplicate for seamless loop
  const scrollItems = [...testimonials, ...testimonials];

  return (
    <section className="py-24 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full mb-4">
            <Sparkles className="h-4 w-4" />
            <span className="text-[10px] font-black uppercase tracking-widest">Community Voice</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
            What <span className="text-purple-600">Parents</span> Say
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Trusted by hundreds of families for delivering concept-driven excellence.
          </p>
        </div>
      </div>

      {/* Infinite Scroll Container */}
      <div className="relative flex">
        <motion.div 
          className="flex gap-8 px-4"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear"
            }
          }}
        >
          {scrollItems.map((item, idx) => (
            <div 
              key={idx}
              className="w-[400px] flex-shrink-0 bg-white p-10 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 relative group"
            >
              <Quote className="h-12 w-12 text-slate-100 absolute top-8 right-8 group-hover:text-purple-50 transition-colors" />
              
              <div className="relative z-10">
                <p className="text-lg text-slate-600 leading-relaxed italic mb-8">
                  "{item.quote}"
                </p>
                
                <div className="pt-8 border-t border-slate-50">
                  <h4 className="font-black text-slate-900 text-lg mb-1">{item.parent}</h4>
                  <p className="text-xs font-bold text-purple-600 uppercase tracking-widest">{item.student}</p>
                </div>
              </div>

              {/* Decorative Accent */}
              <div 
                className="absolute bottom-0 left-10 right-10 h-1 rounded-full transition-all duration-500 group-hover:h-2"
                style={{ backgroundColor: item.color }}
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
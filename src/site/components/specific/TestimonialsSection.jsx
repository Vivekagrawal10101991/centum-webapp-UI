import React from 'react';
import { motion } from "framer-motion";
import { Star, Quote, Sparkles } from "lucide-react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      parent: "Mrs. Meena Iyer",
      student: "Mother of Sneha (AIR 89, NEET)",
      quote: "The caring environment and excellent teaching methodology helped our daughter achieve her dream of becoming a doctor.",
      initial: "M",
      color: "#4F46E5" 
    },
    {
      parent: "Mrs. Lakshmi Sharma",
      student: "Mother of Aarav (AIR 15, JEE Adv)",
      quote: "Centum Academy provided the perfect blend of academic rigor and emotional support. The faculty's dedication to each student's success is truly remarkable.",
      initial: "L",
      color: "#7E3AF2" 
    },
    {
      parent: "Dr. Rajesh Kumar",
      student: "Father of Priya (AIR 42, NEET)",
      quote: "The personalized attention and systematic approach made all the difference. We're grateful for the transformative education she received.",
      initial: "R",
      color: "#00A67E" 
    },
    {
      parent: "Mr. Suresh Patel",
      student: "Father of Rohan (99.98%ile, JEE Main)",
      quote: "What sets Centum apart is their holistic approach. They focus not just on scores but on building character and critical thinking.",
      initial: "S",
      color: "#F59E0B" 
    }
  ];

  const scrollItems = [...testimonials, ...testimonials];

  return (
    <section className="py-24 bg-white overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
        {/* HEADING BADGE - Matches AchieversGrid */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 bg-[#4F46E5] text-white px-5 py-2.5 rounded-full mb-6 shadow-lg shadow-indigo-500/30"
        >
          <Sparkles className="h-4 w-4" />
          <span className="text-sm font-bold uppercase tracking-widest">Community Voice</span>
        </motion.div>
        
        {/* MAIN HEADING - text-4xl md:text-5xl font-black (Sentence Case) */}
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-5"
        >
          What <span className="text-[#4F46E5]">parents</span> say about us
        </motion.h2>
        
        {/* SUBHEADING - text-lg font-medium */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-slate-500 text-lg max-w-2xl mx-auto font-medium"
        >
          Trusted by hundreds of families for delivering excellence with emotion.
        </motion.p>
      </div>

      {/* INFINITE SLIDE TRACK */}
      <div className="relative flex w-full">
        <motion.div 
          className="flex gap-6 px-4 py-8"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 35,
              ease: "linear"
            }
          }}
          whileHover={{ animationPlayState: "paused" }}
        >
          {scrollItems.map((item, idx) => (
            <motion.div
              key={idx}
              // Card Pop-up Effect
              whileHover={{ y: -15, scale: 1.02 }}
              // FIXED: Changed aspect-square to min-h-[400px] to prevent bottom clipping
              className="relative w-[340px] md:w-[380px] min-h-[400px] bg-white rounded-[1.25rem] p-8 md:p-10 shadow-sm hover:shadow-2xl border-2 flex flex-col group transition-all duration-300 overflow-visible flex-shrink-0"
              style={{ 
                borderColor: `${item.color}40`,
              }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = `${item.color}BF`}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = `${item.color}40`}
            >
              {/* Faded Background Hover Effect */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-[0.06] transition-opacity duration-500 pointer-events-none rounded-[1.25rem]"
                style={{ backgroundColor: item.color }}
              />

              {/* Star Rating */}
              <div className="flex gap-1 mb-6 relative z-10">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>

              <Quote className="h-10 w-10 text-slate-100 mb-6 group-hover:text-slate-200 transition-colors duration-500 relative z-10" />

              {/* TESTIMONIAL TEXT - text-base font-normal (16px, 400 weight) */}
              <div className="flex-grow relative z-10 mb-6">
                <p className="text-base font-normal text-slate-600 leading-relaxed italic">
                  "{item.quote}"
                </p>
              </div>

              {/* PARENT INFO FOOTER */}
              <div className="flex items-center gap-4 pt-6 border-t border-slate-100 relative z-10">
                <div 
                  className="h-12 w-12 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0 shadow-md transition-transform duration-500 group-hover:scale-110"
                  style={{ background: `linear-gradient(135deg, ${item.color}, #6749D4)` }}
                >
                  {item.initial}
                </div>
                <div className="min-w-0 text-left">
                  {/* Parent Name - text-lg font-bold (18px, 700 weight) */}
                  <h4 className="font-bold text-slate-900 text-lg leading-tight truncate">{item.parent}</h4>
                  {/* Designation - Sentence case, text-sm font-medium (14px, 500 weight) */}
                  <p className="text-sm font-medium text-[#4F46E5] tracking-tight mt-1.5">
                    {item.student}
                  </p>
                </div>
              </div>

              {/* Bottom Decorative Line */}
              <div 
                className="absolute bottom-0 left-0 right-0 h-1 transition-all duration-500 group-hover:h-2"
                style={{ backgroundColor: item.color }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
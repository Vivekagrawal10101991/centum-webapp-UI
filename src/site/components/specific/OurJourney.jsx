import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Trophy, TrendingUp, Award, Star, Sparkles } from "lucide-react";

// Animated Counter Component from Figma
function AnimatedCounter({ value, duration = 1 }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let startTime;
    let animationFrame;
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      setCount(Math.floor(progress * value));
      if (progress < 1) animationFrame = requestAnimationFrame(animate);
    };
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [value, duration]);
  return <span>{count}</span>;
}

export const OurJourney = () => {
  const milestones = [
    { year: "2014", jeeAdv: 45, jeeMain: 280, neet: 38, highlight: "The Beginning", desc: "Centum Academy established with a vision" },
    { year: "2015", jeeAdv: 72, jeeMain: 425, neet: 56, highlight: "Building Foundation", desc: "Expanded faculty and infrastructure" },
    { year: "2018", jeeAdv: 178, jeeMain: 980, neet: 135, highlight: "Rapid Expansion", desc: "Opened second campus" },
    { year: "2021", jeeAdv: 356, jeeMain: 1890, neet: 267, highlight: "Excellence Peak", desc: "Highest success rate achieved" },
    { year: "2024", jeeAdv: 612, jeeMain: 3290, neet: 462, highlight: "Record Breaking", desc: "Highest selections in history" },
    { year: "2025", jeeAdv: 698, jeeMain: 3840, neet: 536, highlight: "Decade of Excellence", desc: "Celebrating 11 years of success" },
    { year: "2026", jeeAdv: 750, jeeMain: 4200, neet: 595, highlight: "Now", desc: "Continuing the legacy of excellence", isCurrent: true }
  ];

  const duplicatedMilestones = [...milestones, ...milestones];
  const [startPos, setStartPos] = useState({ x: 1000, y: 500 });

  useEffect(() => {
    const calculatePosition = () => {
      setStartPos({ x: window.innerWidth - 200, y: 540 });
    };
    calculatePosition();
    window.addEventListener('resize', calculatePosition);
    return () => window.removeEventListener('resize', calculatePosition);
  }, []);

  return (
    <section className="relative py-28 px-6 bg-white overflow-hidden border-t border-slate-100">
      <div className="max-w-7xl mx-auto relative z-10 text-center mb-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mb-6 shadow-lg"
        >
          <TrendingUp className="h-5 w-5 text-white" />
          <span className="text-sm font-black text-white uppercase tracking-widest">2014 - 2026</span>
        </motion.div>
        <h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-6 tracking-tighter">
          Our <span className="text-purple-600">Journey</span>
        </h2>
        <p className="text-xl text-slate-500 max-w-2xl mx-auto">12 years of transforming dreams into reality through academic excellence.</p>
      </div>

      <div className="relative h-[600px] overflow-hidden">
        {/* Diagonal Path Background */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
          <motion.path
            d="M 90% 90%, L 70% 70%, L 50% 50%, L 30% 30%, L 10% 10%"
            stroke="#7E3AF2"
            strokeWidth="4"
            strokeDasharray="12,8"
            fill="none"
            animate={{ strokeDashoffset: [0, -20] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
        </svg>

        <motion.div
          className="absolute"
          animate={{ x: [startPos.x, -startPos.x - 2000], y: [startPos.y, -startPos.y - 2000] }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        >
          {duplicatedMilestones.map((m, idx) => (
            <div 
              key={idx} 
              className="absolute" 
              style={{ left: `${idx * 320}px`, top: `${idx * 320}px` }}
            >
              <div className="relative flex flex-col items-center">
                {/* Trophy/Star Icon */}
                <div className={`h-16 w-16 rounded-2xl flex items-center justify-center mb-6 shadow-2xl ${m.isCurrent ? 'bg-purple-600' : 'bg-amber-500'} text-white`}>
                  {m.isCurrent ? <Star className="h-8 w-8 fill-current" /> : <Trophy className="h-8 w-8" />}
                </div>
                
                {/* Year Card */}
                <div className="bg-white p-6 rounded-[2rem] shadow-xl border border-slate-100 w-64">
                  <h3 className="text-4xl font-black text-slate-900 mb-2">{m.year}</h3>
                  <p className="text-[10px] font-black text-purple-600 uppercase tracking-widest mb-4">{m.highlight}</p>
                  <div className="space-y-2 border-t pt-4">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-slate-400 uppercase">JEE Adv</span>
                      <span className="text-slate-900">{m.jeeAdv}</span>
                    </div>
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-slate-400 uppercase">JEE Main</span>
                      <span className="text-slate-900">{m.jeeMain}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Summary Stats Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 relative z-10">
        {[
          { label: "JEE Adv Selections", val: 4800, color: "bg-amber-500", icon: Trophy },
          { label: "JEE Main Qualified", val: 26000, color: "bg-blue-600", icon: Award },
          { label: "NEET Selections", val: 3400, color: "bg-emerald-600", icon: Star },
          { label: "Years of Excellence", val: 12, color: "bg-purple-600", icon: TrendingUp }
        ].map((stat, i) => (
          <div key={i} className={`${stat.color} p-8 rounded-[2rem] text-white shadow-2xl`}>
            <stat.icon className="h-8 w-8 mb-4 opacity-50" />
            <h4 className="text-4xl font-black mb-1"><AnimatedCounter value={stat.val} />+</h4>
            <p className="text-xs font-bold uppercase tracking-widest opacity-80">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
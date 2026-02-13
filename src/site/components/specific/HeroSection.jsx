import React, { useState, useEffect } from 'react';
import { ArrowRight, Play, ChevronLeft, ChevronRight } from 'lucide-react';

const HeroSection = () => {
  const [active, setActive] = useState(0);
  const slides = [
    {
      title: "ADMISSIONS OPEN 2026-27",
      sub: "Join the League of Toppers",
      desc: "Experience concept-driven learning designed by IIT alumni to help you crack JEE, NEET, and Foundation exams.",
      img: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070",
      color: "from-purple-900/90 to-slate-900/95"
    },
    {
      title: "CRACK JEE ADVANCED",
      sub: "97% Success Rate",
      desc: "Master Physics, Chemistry, and Math with our rigorous testing and personalized mentorship program.",
      img: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2132",
      color: "from-blue-900/90 to-indigo-950/95"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => setActive(p => (p + 1) % slides.length), 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[85vh] bg-slate-950 overflow-hidden">
      {slides.map((s, i) => (
        <div key={i} className={`absolute inset-0 transition-opacity duration-1000 ${i === active ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
          <div className="absolute inset-0">
            <img src={s.img} className="w-full h-full object-cover animate-slow-zoom" alt="" />
            <div className={`absolute inset-0 bg-gradient-to-r ${s.color}`}></div>
          </div>
          <div className="relative z-20 h-full max-w-7xl mx-auto px-6 flex items-center">
            <div className="max-w-2xl text-white">
              <div className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6 animate-fade-in">
                <span className="text-[10px] font-black uppercase tracking-widest text-amber-400">Enroll Now</span>
              </div>
              <h2 className="text-xl font-bold text-emerald-400 mb-2 animate-fade-in delay-100">{s.sub}</h2>
              <h1 className="text-5xl md:text-7xl font-black mb-6 leading-[1.1] animate-fade-in delay-200">{s.title}</h1>
              <p className="text-lg text-slate-300 mb-10 leading-relaxed max-w-xl animate-fade-in delay-300">{s.desc}</p>
              <div className="flex gap-4 animate-fade-in delay-400">
                <button className="bg-purple-600 hover:bg-purple-700 px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[11px] flex items-center gap-2 transition-all shadow-xl">
                  View Programs <ArrowRight className="h-4 w-4" />
                </button>
                <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[11px] border border-white/20 flex items-center gap-2">
                  <Play className="h-3 w-3 fill-current" /> Demo Class
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
      {/* Navigation Dots */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex gap-3">
        {slides.map((_, i) => (
          <button key={i} onClick={() => setActive(i)} className={`h-1.5 rounded-full transition-all ${i === active ? 'w-12 bg-purple-500' : 'w-4 bg-white/30'}`} />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
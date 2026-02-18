import React, { useState, useEffect } from 'react';
import { ArrowRight, Play } from 'lucide-react';

const HeroSection = () => {
  const [active, setActive] = useState(0);
  const slides = [
    {
      title: "ADMISSIONS OPEN 2026-27",
      sub: "Join the League of Toppers",
      desc: "Experience concept-driven learning designed by IIT alumni to help you crack JEE, NEET, and Foundation exams.",
      img: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070",
      // Updated Gradient to Indigo
      color: "from-indigo-900/90 to-slate-900/95"
    },
    {
      title: "CRACK JEE ADVANCED",
      sub: "97% Success Rate",
      desc: "Master Physics, Chemistry, and Math with our rigorous testing and personalized mentorship program.",
      img: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2132",
      // Updated Gradient to Indigo/Blue mix
      color: "from-blue-900/90 to-indigo-950/95"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => setActive(p => (p + 1) % slides.length), 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[85vh] bg-slate-950 overflow-hidden font-sans">
      {slides.map((s, i) => (
        <div key={i} className={`absolute inset-0 transition-opacity duration-1000 ${i === active ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
          {/* Background Image & Gradient */}
          <div className="absolute inset-0">
            <img src={s.img} className="w-full h-full object-cover animate-slow-zoom" alt="" />
            <div className={`absolute inset-0 bg-gradient-to-r ${s.color}`}></div>
          </div>

          {/* Content Container */}
          <div className="relative z-20 h-full max-w-7xl mx-auto px-6 flex items-center">
            <div className="max-w-3xl text-white">
              {/* Badge */}
              <div className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6 animate-fade-in">
                <span className="text-sm font-bold uppercase tracking-widest text-amber-400">Enroll Now</span>
              </div>

              {/* Subheadline */}
              <h2 className="text-xl md:text-2xl font-medium text-emerald-400 mb-3 animate-fade-in delay-100">
                {s.sub}
              </h2>

              {/* Main Headline */}
              <h1 className="text-5xl md:text-6xl font-black mb-6 leading-[1.1] animate-fade-in delay-200">
                {s.title}
              </h1>

              {/* Body Text */}
              <p className="text-lg font-normal text-slate-200 mb-10 leading-relaxed max-w-xl animate-fade-in delay-300">
                {s.desc}
              </p>

              {/* Buttons */}
              <div className="flex flex-wrap gap-4 animate-fade-in delay-400">
                {/* Updated Button Color to Indigo */}
                <button className="bg-indigo-600 hover:bg-indigo-700 px-8 py-4 rounded-2xl text-base font-bold uppercase tracking-wide flex items-center gap-2 transition-all shadow-xl">
                  View Programs <ArrowRight className="h-5 w-5" />
                </button>
                <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md px-8 py-4 rounded-2xl text-base font-bold uppercase tracking-wide border border-white/20 flex items-center gap-2">
                  <Play className="h-4 w-4 fill-current" /> Demo Class
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Dots */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex gap-3">
        {slides.map((_, i) => (
          <button 
            key={i} 
            onClick={() => setActive(i)} 
            // Updated Dot Color to Indigo
            className={`h-1.5 rounded-full transition-all ${i === active ? 'w-12 bg-indigo-500' : 'w-4 bg-white/30'}`} 
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
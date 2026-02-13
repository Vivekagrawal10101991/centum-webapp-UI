import React from 'react';
import { motion } from "framer-motion";
import { ArrowRight, Phone, Mail } from "lucide-react";

export const CallToAction = () => {
  return (
    <section className="relative py-24 px-6 bg-gradient-to-br from-[#1E3A8A] via-[#2563EB] to-[#0D9488] overflow-hidden rounded-[4rem] mx-6 mb-12">
      <div className="absolute inset-0 opacity-20">
        <motion.div 
          className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      <div className="max-w-5xl mx-auto text-center relative z-10 text-white">
        <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight tracking-tighter">
          Start Your Academic Journey <br/>with Centum Academy
        </h2>
        <p className="text-xl text-white/90 mb-12 max-w-3xl mx-auto font-medium leading-relaxed">
          Join thousands of successful students who achieved their dreams with our expert guidance and personalized mentorship.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
          <button className="bg-white text-[#1E3A8A] px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs shadow-2xl hover:scale-105 transition-all flex items-center gap-3">
            Enquire Today <ArrowRight className="h-4 w-4" />
          </button>
          <button className="bg-white/10 backdrop-blur-md border-2 border-white/30 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-white hover:text-slate-900 transition-all">
            Download Brochure
          </button>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-8 text-sm font-black uppercase tracking-widest">
          <div className="flex items-center gap-3">
             <div className="h-10 w-10 bg-white/20 rounded-full flex items-center justify-center"><Phone className="h-4 w-4" /></div>
             <span>+91 91089 3332</span>
          </div>
          <div className="hidden md:block opacity-30">|</div>
          <div className="flex items-center gap-3">
             <div className="h-10 w-10 bg-white/20 rounded-full flex items-center justify-center"><Mail className="h-4 w-4" /></div>
             <span>contactus@centumacademy.com</span>
          </div>
        </div>
      </div>
    </section>
  );
};
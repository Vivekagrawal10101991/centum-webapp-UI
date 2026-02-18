import React from 'react';
import { motion } from "framer-motion";
import { ArrowRight, Phone, Mail, Download } from "lucide-react";

export const CallToAction = () => {
  return (
    <section className="py-12 md:py-16 bg-white font-sans">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div 
          className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#0b0a2e] via-indigo-900 to-[#1e1b4b] shadow-2xl shadow-indigo-900/20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Premium Background Glow Effects */}
          <div className="absolute inset-0 pointer-events-none">
            <motion.div 
              className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-500 rounded-full blur-[128px] opacity-20"
              animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
              transition={{ duration: 8, repeat: Infinity }}
            />
            <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-purple-500 rounded-full blur-[128px] opacity-20" />
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 mix-blend-overlay"></div>
          </div>

          <div className="relative z-10 px-6 py-12 md:py-16 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <span className="inline-block py-1 px-3 rounded-full bg-indigo-500/10 border border-indigo-400/20 text-indigo-300 text-[10px] font-bold uppercase tracking-widest mb-6 backdrop-blur-sm">
                Join the League of Toppers
              </span>
            </motion.div>

            <motion.h2 
              className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight tracking-tight font-display"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              Start Your Academic Journey <br className="hidden md:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 to-white">
                with Centum Academy
              </span>
            </motion.h2>
            
            <motion.p 
              className="text-sm md:text-base text-indigo-100/80 mb-8 max-w-xl mx-auto font-medium leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              Join thousands of successful students who achieved their dreams with our expert guidance and personalized mentorship.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <button className="w-full sm:w-auto bg-white text-indigo-950 px-6 py-3 rounded-xl font-bold uppercase tracking-wider text-xs shadow-xl shadow-indigo-900/20 hover:bg-indigo-50 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 group">
                Enquire Today 
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button className="w-full sm:w-auto bg-white/5 backdrop-blur-md border border-white/10 text-white px-6 py-3 rounded-xl font-bold uppercase tracking-wider text-xs hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2">
                <Download className="h-3.5 w-3.5" />
                Download Brochure
              </button>
            </motion.div>

            <motion.div 
              className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 pt-6 border-t border-white/5 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              <div className="flex items-center gap-3 group cursor-pointer">
                 <div className="h-8 w-8 bg-indigo-500/20 rounded-full flex items-center justify-center group-hover:bg-indigo-500/30 transition-colors">
                    <Phone className="h-4 w-4 text-indigo-300" />
                 </div>
                 <div className="text-left">
                    <p className="text-[10px] text-indigo-300 uppercase font-bold tracking-wider">Call Us</p>
                    <p className="text-xs text-white font-bold tracking-wide">+91 91089 3332</p>
                 </div>
              </div>

              <div className="hidden md:block w-px h-8 bg-white/10"></div>

              <div className="flex items-center gap-3 group cursor-pointer">
                 <div className="h-8 w-8 bg-indigo-500/20 rounded-full flex items-center justify-center group-hover:bg-indigo-500/30 transition-colors">
                    <Mail className="h-4 w-4 text-indigo-300" />
                 </div>
                 <div className="text-left">
                    <p className="text-[10px] text-indigo-300 uppercase font-bold tracking-wider">Email Us</p>
                    <p className="text-xs text-white font-bold tracking-wide">contactus@centumacademy.com</p>
                 </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
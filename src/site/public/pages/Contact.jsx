import React, { useState } from 'react';
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, Building2, Sparkles } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", subject: "", message: ""
  });

  const contactInfo = [
    {
      icon: Phone,
      title: "Direct Line",
      details: ["+91 91089 3332", "+91 80 4112 3456"],
      color: "#1C64F2"
    },
    {
      icon: Mail,
      title: "Email Support",
      details: ["contactus@centumacademy.com", "admissions@centumacademy.com"],
      color: "#7E3AF2"
    },
    {
      icon: MapPin,
      title: "Main Campus",
      details: ["HSR Layout, Sector 1", "Bengaluru, Karnataka 560102"],
      color: "#00A67E"
    },
    {
      icon: Clock,
      title: "Visiting Hours",
      details: ["Mon - Sat: 8:00 AM - 8:00 PM", "Sunday: 9:00 AM - 5:00 PM"],
      color: "#F59E0B"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full mb-4"
          >
            <MessageSquare className="h-4 w-4" />
            <span className="text-[10px] font-black uppercase tracking-widest">Connect With Us</span>
          </motion.div>
          <h1 className="text-5xl font-black text-slate-900 mb-4 tracking-tight">
            Let’s Start a <span className="text-purple-600">Conversation</span>
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
            Have questions about our programs or admissions? Our team is here to help you guide your academic journey.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {contactInfo.map((info, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-500"
            >
              <div 
                className="h-12 w-12 rounded-xl flex items-center justify-center mb-6 shadow-lg"
                style={{ backgroundColor: `${info.color}15`, color: info.color }}
              >
                <info.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-black text-slate-900 mb-2">{info.title}</h3>
              {info.details.map((detail, i) => (
                <p key={i} className="text-sm text-slate-500 font-bold mb-1">{detail}</p>
              ))}
            </motion.div>
          ))}
        </div>

        {/* Form and Map */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white p-10 rounded-[3rem] shadow-xl border border-slate-100"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="h-12 w-12 bg-purple-600 text-white rounded-2xl flex items-center justify-center">
                <Send className="h-6 w-6" />
              </div>
              <div>
                <h4 className="text-2xl font-black text-slate-900">Send a Message</h4>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Typical response: 2 hours</p>
              </div>
            </div>

            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Full Name</label>
                  <input type="text" className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-purple-600 outline-none font-bold text-slate-900" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Email</label>
                  <input type="email" className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-purple-600 outline-none font-bold text-slate-900" placeholder="john@example.com" />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Phone</label>
                <input type="tel" className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-purple-600 outline-none font-bold text-slate-900" placeholder="+91 98765 43210" />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Your Message</label>
                <textarea rows="5" className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-purple-600 outline-none font-bold text-slate-900 resize-none" placeholder="How can we help you?"></textarea>
              </div>
              <button className="w-full py-5 bg-slate-900 hover:bg-purple-600 text-white rounded-2xl font-black uppercase tracking-[0.2em] text-xs transition-all shadow-xl active:scale-95">
                Send Message
              </button>
            </form>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div className="bg-white p-4 rounded-[3rem] shadow-xl border border-slate-100 overflow-hidden">
              <div className="h-[400px] rounded-[2.5rem] bg-slate-100 relative overflow-hidden">
                {/* Placeholder for Map - You can embed your iframe here */}
                <div className="absolute inset-0 flex items-center justify-center bg-slate-200">
                   <p className="font-black text-slate-400 italic">MAP INTEGRATION AREA</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden group">
               <div className="absolute -bottom-12 -right-12 h-48 w-48 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000"></div>
               <Building2 className="h-12 w-12 text-white/50 mb-6" />
               <h4 className="text-3xl font-black mb-4 tracking-tight">Visit Our Campus</h4>
               <p className="text-slate-200 font-medium mb-8 leading-relaxed">
                 Experience our environment firsthand. We welcome parents and students for guided tours and faculty interactions.
               </p>
               <button className="px-8 py-3 bg-white text-purple-700 rounded-xl font-black uppercase tracking-widest text-xs shadow-lg hover:shadow-purple-900/40 transition-all">
                 Schedule Tour
               </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
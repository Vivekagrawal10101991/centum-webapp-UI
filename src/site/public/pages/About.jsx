import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Target, Award, BookOpen, Heart, CheckCircle } from 'lucide-react';
import { OurJourney } from '../../components/specific/OurJourney';
import { MentorsSection } from '../../components/specific';

const About = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const values = [
    { icon: Target, title: "Our Mission", desc: "Empower students through high-quality mentorship and personalised attention.", color: "text-purple-600", bg: "bg-purple-50" },
    { icon: Award, title: "Our Vision", desc: "Create an education ecosystem where every student enjoys learning and thinks critically.", color: "text-blue-600", bg: "bg-blue-50" },
    { icon: BookOpen, title: "Learning by Doing", desc: "True conceptual understanding through practical and innovative curriculum models.", color: "text-amber-600", bg: "bg-amber-50" },
    { icon: Heart, title: "Emotion-Driven", desc: "Combining academic excellence with emotional intelligence and growth.", color: "text-rose-600", bg: "bg-rose-50" }
  ];

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Hero Section */}
      <section className="py-24 bg-slate-50 overflow-hidden px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}>
            <div className="inline-flex items-center gap-2 bg-purple-100 px-4 py-2 rounded-full mb-6">
              <Sparkles className="h-4 w-4 text-purple-600" />
              <span className="text-[10px] font-black uppercase tracking-widest text-purple-700">Our Story</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-6 leading-tight tracking-tighter">
              Shaping <span className="text-purple-600">Thinkers</span>,<br/>Not Test Takers
            </h1>
            <p className="text-xl text-slate-500 leading-relaxed mb-10 max-w-xl">
              Founded by IIT alumni, we're dedicated to transforming higher secondary education through mentorship and innovation.
            </p>
            <button className="bg-slate-900 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-purple-600 transition-all shadow-xl">
              Download Brochure
            </button>
          </motion.div>
          <div className="relative">
            <div className="absolute inset-0 bg-purple-600/10 rounded-[4rem] rotate-3 translate-x-4"></div>
            <img 
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071" 
              className="relative z-10 rounded-[4rem] shadow-2xl grayscale-[0.2] hover:grayscale-0 transition-all duration-700 h-[500px] object-cover" 
              alt="Classroom" 
            />
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((v, i) => (
            <div key={i} className="p-10 rounded-[3rem] border border-slate-100 bg-slate-50 hover:bg-white hover:shadow-2xl transition-all duration-500 group">
              <div className={`${v.bg} ${v.color} h-14 w-14 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                <v.icon className="h-7 w-7" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-3">{v.title}</h3>
              <p className="text-sm font-medium text-slate-500 leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <MentorsSection />
      
      {/* THE JOURNEY LADDER (Matches Figma flow) */}
      <OurJourney />
      
      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto bg-slate-900 rounded-[4rem] p-12 md:p-20 text-white text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px]"></div>
          <h2 className="text-4xl md:text-6xl font-black mb-8">Ready to Join Us?</h2>
          <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">Take the first step towards academic excellence and concept-driven learning.</p>
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-purple-600/20 transition-all">
            Enquire Now
          </button>
        </div>
      </section>
    </div>
  );
};

export default About;
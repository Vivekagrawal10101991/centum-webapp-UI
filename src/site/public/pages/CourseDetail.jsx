import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  X, Clock, Users, BookOpen, Award, CheckCircle, Star, 
  Calendar, Target, TrendingUp, Phone, Mail, ArrowRight,
  Sparkles, ShieldCheck, GraduationCap
} from "lucide-react";
import { cmsService } from '../../services/cmsService';

const CourseDetail = () => {
  const { slug } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchDetail = async () => {
      try {
        setLoading(true);
        const data = await cmsService.getCourseBySlug(slug);
        setCourse(data);
      } catch (err) {
        console.error("Error fetching course detail:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [slug]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin h-10 w-10 border-4 border-purple-600 border-t-transparent rounded-full"></div>
    </div>
  );

  if (!course) return <div className="text-center py-20 font-black">Course Not Found</div>;

  // Map category to Figma gradients
  const gradients = {
    JEE: "from-[#1C64F2] to-[#1E40AF]",
    NEET: "from-[#00A67E] to-[#065F46]",
    Foundation: "from-[#F59E0B] to-[#D97706]"
  };
  const activeGradient = gradients[course.category] || gradients.JEE;

  return (
    <div className="min-h-screen bg-white">
      {/* 1. Header with Gradient (Figma Design) */}
      <div className={`bg-gradient-to-br ${activeGradient} py-20 px-6 relative overflow-hidden`}>
        {/* Background Decorations */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
        
        <div className="max-w-7xl mx-auto relative z-10 text-white">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Program Icon */}
            <div className="h-24 w-24 rounded-[2rem] bg-white/20 backdrop-blur-xl border-2 border-white/30 flex items-center justify-center shadow-2xl">
              <GraduationCap className="h-12 w-12" />
            </div>

            <div className="flex-1">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/30 mb-4">
                <Sparkles className="h-3.5 w-3.5 text-amber-300" />
                <span className="text-[10px] font-black uppercase tracking-widest">{course.tag || course.category}</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tighter leading-tight">
                {course.title || course.name}
              </h1>
              <p className="text-xl text-white/90 font-medium max-w-3xl leading-relaxed">
                {course.shortDescription || "Comprehensive preparation program designed by IIT Alumni for academic excellence."}
              </p>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { icon: Clock, label: "Duration", val: course.duration || "2 Years" },
              { icon: Users, label: "Batch Size", val: course.batchSize || "30-35" },
              { icon: Award, label: "Success Rate", val: "95%+" },
              { icon: Star, label: "Rating", val: "4.8/5" }
            ].map((stat, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <stat.icon className="h-6 w-6 mb-3 opacity-80" />
                <p className="text-white/60 text-[10px] font-black uppercase tracking-widest mb-1">{stat.label}</p>
                <p className="text-xl font-black">{stat.val}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Main Content Grid */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-3 gap-16">
          
          {/* LEFT: Content Details */}
          <div className="lg:col-span-2 space-y-20">
            
            {/* Program Highlights */}
            <section>
              <div className="flex items-center gap-3 mb-10">
                <Target className="h-8 w-8 text-purple-600" />
                <h2 className="text-3xl font-black text-slate-900 tracking-tighter">Program Highlights</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {(course.highlights || [
                  "IIT & AIIMS Alumni Faculty",
                  "Small Batch Sizes for Individual Focus",
                  "Comprehensive Study Material",
                  "Regular Mock Tests & Analytics"
                ]).map((item, idx) => (
                  <div key={idx} className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 flex items-start gap-4">
                    <CheckCircle className="h-5 w-5 text-emerald-500 mt-1 flex-shrink-0" />
                    <span className="font-bold text-slate-700 leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Curriculum Sections */}
            <section>
              <div className="flex items-center gap-3 mb-10">
                <BookOpen className="h-8 w-8 text-blue-600" />
                <h2 className="text-3xl font-black text-slate-900 tracking-tighter">Curriculum Overview</h2>
              </div>
              <div className="space-y-6">
                {(course.curriculum || [
                  { phase: "Foundation Phase", topics: ["Basic Physics Concepts", "Calculus Essentials", "Atomic Structure"] },
                  { phase: "Advanced Applications", topics: ["Mechanics Mastery", "Organic Synthesis", "Complex Algebra"] }
                ]).map((phase, idx) => (
                  <div key={idx} className="bg-blue-50/50 p-8 rounded-[2.5rem] border border-blue-100">
                    <h3 className="text-xl font-black text-blue-700 mb-4">{phase.phase}</h3>
                    <ul className="grid md:grid-cols-2 gap-3">
                      {phase.topics.map((topic, tIdx) => (
                        <li key={tIdx} className="flex items-center gap-2 text-slate-600 font-medium text-sm">
                          <div className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                          {topic}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* Expert Faculty */}
            <section>
              <div className="flex items-center gap-3 mb-10">
                <Users className="h-8 w-8 text-amber-500" />
                <h2 className="text-3xl font-black text-slate-900 tracking-tighter">Expert Mentors</h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-6">
                {(course.faculty || [
                  { name: "Dr. Rajesh Kumar", info: "IIT Delhi Alumni, 12+ Years Exp" },
                  { name: "Prof. Anita Sharma", info: "Organic Chemistry Specialist" }
                ]).map((f, i) => (
                  <div key={i} className="bg-slate-900 text-white p-8 rounded-[2.5rem] relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -mr-10 -mt-10"></div>
                    <h4 className="text-xl font-black mb-2">{f.name}</h4>
                    <p className="text-amber-400 text-xs font-black uppercase tracking-widest">{f.info}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* RIGHT: Sticky Enrollment Sidebar (Figma Design) */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 bg-white rounded-[3rem] border border-slate-200 shadow-2xl p-10 overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-purple-600 to-blue-600"></div>
              
              <h3 className="text-2xl font-black text-slate-900 mb-8 tracking-tight">Enroll Now</h3>
              
              {/* Fee Information */}
              <div className="bg-slate-50 p-6 rounded-2xl mb-8 border border-slate-100">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Full Course Fee</p>
                <div className="flex items-baseline gap-1">
                   <span className="text-3xl font-black text-slate-900">₹{course.price?.toLocaleString() || "85,000"}</span>
                   <span className="text-slate-400 text-xs font-bold">/ Year</span>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-200">
                  <p className="text-xs font-bold text-purple-600 uppercase tracking-widest">EMI Starting from ₹6,500/mo</p>
                </div>
              </div>

              {/* Course Details List */}
              <div className="space-y-6 mb-10">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Schedule</p>
                    <p className="text-sm font-bold text-slate-700">Mon - Sat | 4PM - 8PM</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Mode</p>
                    <p className="text-sm font-bold text-slate-700">Hybrid (Online + Offline)</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                <button className="w-full py-5 bg-slate-900 hover:bg-purple-600 text-white rounded-2xl font-black uppercase tracking-[0.2em] text-xs transition-all shadow-xl active:scale-95 flex items-center justify-center gap-2">
                  Apply Today <ArrowRight className="h-4 w-4" />
                </button>
                <button className="w-full py-5 border-2 border-slate-100 hover:bg-slate-50 text-slate-600 rounded-2xl font-black uppercase tracking-[0.2em] text-xs transition-all flex items-center justify-center gap-2">
                  <Phone className="h-4 w-4" /> Book Free Demo
                </button>
              </div>

              <div className="mt-8 text-center">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Limited Seats Available for 2026</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Bottom Success Banner (Social Proof) */}
      <section className="bg-slate-50 py-24 px-6 border-t border-slate-200">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-black text-slate-900 tracking-tighter">Success Stories from this Program</h2>
        </div>
        <div className="flex overflow-x-auto gap-8 pb-8 no-scrollbar">
          {[1, 2, 3].map((_, i) => (
             <div key={i} className="min-w-[400px] bg-white p-10 rounded-[3rem] shadow-xl border border-slate-100">
               <div className="flex items-center gap-2 mb-4">
                 {[1,2,3,4,5].map(s => <Star key={s} className="h-4 w-4 fill-amber-400 text-amber-400" />)}
               </div>
               <p className="text-lg text-slate-600 font-medium italic mb-8">
                 "The personalized mentorship in this batch helped me clear my doubts immediately. Truly transformative!"
               </p>
               <h4 className="text-xl font-black text-slate-900">Student Name {i+1}</h4>
               <p className="text-xs font-bold text-purple-600 uppercase tracking-widest">AIR {i * 10 + 42} (2025)</p>
             </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default CourseDetail;
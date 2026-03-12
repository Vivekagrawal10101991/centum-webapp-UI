import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Clock, Users, BookOpen, Award, CheckCircle, 
  Target, Phone, ArrowRight, Sparkles, GraduationCap, 
  Info
} from "lucide-react";
import { cmsService } from '../../services/cmsService';
import usePageTitle from '../hooks/usePageTitle'; 

const CourseDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  // --- Dynamic SEO Meta Title ---
  const pageTitle = course 
    ? `${course.title || 'Course'} | Centum Academy` 
    : 'Loading Course... | Centum Academy';
  usePageTitle(pageTitle);

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

  if (!course) return (
    <div className="min-h-screen flex flex-col items-center justify-center py-20">
      <h2 className="text-2xl font-black text-slate-800 mb-4">Course Not Found</h2>
      <button onClick={() => navigate('/program')} className="text-purple-600 font-bold hover:underline">
        Browse All Programs
      </button>
    </div>
  );

  // --- DYNAMIC DATA EXTRACTION ---
  const details = course.details || {};
  
  const hasAbout = details.about && details.about !== '<p><br></p>';
  
  const highlights = details.highlights || [];
  const faculty = details.faculty || [];
  
  const curriculum = details.curriculum?.length > 0 
    ? details.curriculum.map(c => ({
        phase: c.subject || "Subject",
        topics: Array.isArray(c.topics) ? c.topics : typeof c.topics === 'string' ? c.topics.split(',').filter(t=>t.trim()) : []
      })).filter(c => c.topics.length > 0)
    : [];

  // Map program to Figma gradients
  const gradients = {
    "IIT JEE": "from-[#1C64F2] to-[#1E40AF]",
    "NEET": "from-[#00A67E] to-[#065F46]",
    "FOUNDATION": "from-[#F59E0B] to-[#D97706]"
  };
  const activeGradient = gradients[course.program?.toUpperCase()] || "from-[#7E3AF2] to-[#1C64F2]";

  return (
    <div className="min-h-screen bg-white">
      {/* 1. Header with Gradient */}
      <div className={`bg-gradient-to-br ${activeGradient} py-20 px-6 relative overflow-hidden`}>
        {/* Background Decorations */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
        
        <div className="max-w-7xl mx-auto relative z-10 text-white">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Program Icon */}
            <div className="h-24 w-24 rounded-[2rem] bg-white/20 backdrop-blur-xl border-2 border-white/30 flex items-center justify-center shadow-2xl shrink-0">
              <GraduationCap className="h-12 w-12" />
            </div>

            <div className="flex-1">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/30 mb-4">
                <Sparkles className="h-3.5 w-3.5 text-amber-300" />
                <span className="text-[10px] font-black uppercase tracking-widest">
                  {course.program || course.category || "Program"}
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tighter leading-tight">
                {course.title}
              </h1>
              {course.shortDescription && (
                <p className="text-xl text-white/90 font-medium max-w-3xl leading-relaxed">
                  {course.shortDescription}
                </p>
              )}
            </div>
          </div>

          {/* Quick Stats Grid - Only shows if data exists */}
          {(course.duration || course.batchSize || details.eligibility) && (
            <div className="flex flex-wrap gap-4 mt-12">
              {course.duration && (
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 min-w-[160px] flex-1 md:flex-none">
                  <Clock className="h-6 w-6 mb-3 opacity-80" />
                  <p className="text-white/60 text-[10px] font-black uppercase tracking-widest mb-1">Duration</p>
                  <p className="text-xl font-black">{course.duration}</p>
                </div>
              )}
              {course.batchSize && (
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 min-w-[160px] flex-1 md:flex-none">
                  <Users className="h-6 w-6 mb-3 opacity-80" />
                  <p className="text-white/60 text-[10px] font-black uppercase tracking-widest mb-1">Batch Size</p>
                  <p className="text-xl font-black">{course.batchSize}</p>
                </div>
              )}
              {details.eligibility && (
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 min-w-[160px] flex-1 md:flex-none">
                  <Target className="h-6 w-6 mb-3 opacity-80" />
                  <p className="text-white/60 text-[10px] font-black uppercase tracking-widest mb-1">Eligibility</p>
                  <p className="text-xl font-black">{details.eligibility}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 2. Main Content Grid */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-3 gap-16">
          
          {/* LEFT: Content Details */}
          <div className="lg:col-span-2 space-y-20">
            
            {/* DYNAMIC ABOUT SECTION - Upgraded UI */}
            {hasAbout && (
              <section className="bg-gradient-to-br from-slate-50 to-indigo-50/40 p-8 md:p-10 rounded-[2.5rem] border border-slate-200/60 shadow-sm relative overflow-hidden">
                {/* Decorative background glows */}
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-100 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
                <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-emerald-50 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
                
                <div className="flex items-center gap-4 mb-8 relative z-10">
                  <div className="h-12 w-12 bg-white rounded-2xl shadow-sm border border-indigo-50 flex items-center justify-center shrink-0">
                    <Info className="h-6 w-6 text-indigo-600" />
                  </div>
                  <h2 className="text-3xl font-black text-slate-900 tracking-tighter">About Program</h2>
                </div>
                
                <div 
                  className="
                    prose prose-lg max-w-none text-slate-600 font-medium leading-relaxed relative z-10
                    prose-p:mb-5 prose-p:leading-relaxed
                    prose-strong:text-indigo-950 prose-strong:font-bold
                    [&>ul]:list-none [&>ul]:pl-0 [&>ul]:space-y-4 [&>ul]:my-6
                    [&>ul>li]:relative [&>ul>li]:pl-10 
                    [&>ul>li::before]:content-['✓'] [&>ul>li::before]:absolute [&>ul>li::before]:left-0 [&>ul>li::before]:top-1 
                    [&>ul>li::before]:flex [&>ul>li::before]:items-center [&>ul>li::before]:justify-center
                    [&>ul>li::before]:h-6 [&>ul>li::before]:w-6 [&>ul>li::before]:rounded-full 
                    [&>ul>li::before]:bg-gradient-to-br [&>ul>li::before]:from-emerald-400 [&>ul>li::before]:to-emerald-500 
                    [&>ul>li::before]:text-white [&>ul>li::before]:text-xs [&>ul>li::before]:font-bold [&>ul>li::before]:shadow-sm
                    [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:space-y-3 [&>ol]:my-6
                    [&>ol>li::marker]:text-indigo-600 [&>ol>li::marker]:font-bold
                  "
                  dangerouslySetInnerHTML={{ __html: details.about }} 
                />
              </section>
            )}

            {/* DYNAMIC HIGHLIGHTS */}
            {highlights.length > 0 && (
              <section>
                <div className="flex items-center gap-3 mb-10">
                  <Target className="h-8 w-8 text-purple-600" />
                  <h2 className="text-3xl font-black text-slate-900 tracking-tighter">Program Highlights</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {highlights.map((item, idx) => (
                    <div key={idx} className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 flex items-start gap-4">
                      <CheckCircle className="h-5 w-5 text-emerald-500 mt-1 flex-shrink-0" />
                      <span className="font-bold text-slate-700 leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* DYNAMIC CURRICULUM */}
            {curriculum.length > 0 && (
              <section>
                <div className="flex items-center gap-3 mb-10">
                  <BookOpen className="h-8 w-8 text-blue-600" />
                  <h2 className="text-3xl font-black text-slate-900 tracking-tighter">Curriculum Overview</h2>
                </div>
                <div className="space-y-6">
                  {curriculum.map((phase, idx) => (
                    <div key={idx} className="bg-blue-50/50 p-8 rounded-[2.5rem] border border-blue-100">
                      <h3 className="text-xl font-black text-blue-700 mb-4">{phase.phase}</h3>
                      <ul className="grid md:grid-cols-2 gap-3">
                        {phase.topics.map((topic, tIdx) => (
                          <li key={tIdx} className="flex items-start gap-2 text-slate-700 font-medium text-sm">
                            <div className="h-1.5 w-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                            <span className="leading-tight">{topic}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* DYNAMIC FACULTY */}
            {faculty.length > 0 && (
              <section>
                <div className="flex items-center gap-3 mb-10">
                  <Users className="h-8 w-8 text-amber-500" />
                  <h2 className="text-3xl font-black text-slate-900 tracking-tighter">Expert Mentors</h2>
                </div>
                <div className="grid sm:grid-cols-2 gap-6">
                  {faculty.map((f, i) => (
                    <div key={i} className="bg-slate-900 text-white p-8 rounded-[2.5rem] relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -mr-10 -mt-10"></div>
                      <h4 className="text-xl font-black mb-2">{f.name}</h4>
                      {f.qualification && (
                        <p className="text-amber-400 text-xs font-black uppercase tracking-widest">{f.qualification}</p>
                      )}
                      {f.experience && (
                        <p className="text-slate-400 text-xs mt-2">{f.experience}</p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* RIGHT: Sticky Enrollment Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 bg-white rounded-[3rem] border border-slate-200 shadow-2xl p-10 overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-purple-600 to-blue-600"></div>
              
              <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">Interested in this program?</h3>
              <p className="text-slate-500 text-sm font-medium mb-8">
                Get in touch with our academic counselors to understand how this program fits your career goals.
              </p>
              
              {/* Action Buttons */}
              <div className="space-y-4">
                <button 
                  onClick={() => {
                    window.scrollTo(0, 0);
                    navigate('/contact');
                  }}
                  className="w-full py-5 bg-slate-900 hover:bg-purple-600 text-white rounded-2xl font-black uppercase tracking-[0.2em] text-xs transition-all shadow-xl active:scale-95 flex items-center justify-center gap-2"
                >
                  Enquire Now <ArrowRight className="h-4 w-4" />
                </button>
                <a 
                  href="tel:+916366411473"
                  className="w-full py-5 border-2 border-slate-100 hover:bg-slate-50 text-slate-600 rounded-2xl font-black uppercase tracking-[0.2em] text-xs transition-all flex items-center justify-center gap-2"
                >
                  <Phone className="h-4 w-4" /> Call Us Directly
                </a>
              </div>

              <div className="mt-8 text-center pt-8 border-t border-slate-100">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Start your journey to excellence
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
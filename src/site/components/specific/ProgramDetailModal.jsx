import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  X, CheckCircle, Clock, Users, BookOpen, 
  Target, Award, Sparkles 
} from 'lucide-react';

export const ProgramDetailModal = ({ course, onClose }) => {
  const navigate = useNavigate();

  if (!course) return null;

  // --- EXTRACT ACTUAL BACKEND DATA ONLY ---
  const details = course?.details || {};

  // Map backend curriculum format { subject, topics: [] }
  const curriculum = details.curriculum?.length > 0 
    ? details.curriculum.map(c => ({
        phase: c.subject || "Subject",
        topics: Array.isArray(c.topics) ? c.topics : typeof c.topics === 'string' ? c.topics.split(',').filter(t=>t.trim()) : []
      })).filter(c => c.topics.length > 0)
    : [];

  const highlights = details.highlights || [];
  const faculty = details.faculty || [];
  
  // Make sure the rich text isn't just an empty paragraph tag
  const hasAboutContent = details.about && details.about !== '<p><br></p>';

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        />
        
        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-5xl max-h-[90vh] bg-white rounded-[32px] shadow-2xl overflow-hidden flex flex-col"
        >
          {/* Header Section */}
          <div className="relative p-8 md:p-10 bg-gradient-to-br from-[#7E3AF2] to-[#1C64F2] text-white">
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-all z-10"
            >
              <X className="h-6 w-6" />
            </button>

            <div className="relative z-0">
              {course?.category && (
                <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-widest mb-4 border border-white/30">
                  <Sparkles className="h-3.5 w-3.5" /> {course.category}
                </span>
              )}
              
              <h2 className="text-3xl md:text-4xl font-black leading-tight mb-4">
                {course.title}
              </h2>
              
              {course?.shortDescription && (
                <p className="text-white/80 text-lg max-w-2xl font-medium leading-relaxed">
                  {course.shortDescription}
                </p>
              )}
            </div>
          </div>

          {/* Scrollable Body */}
          <div className="overflow-y-auto p-8 md:p-10">
            <div className="grid lg:grid-cols-3 gap-10">
              
              {/* Left Column: Details & Curriculum */}
              <div className="lg:col-span-2 space-y-10">
                
                {/* DYNAMIC ABOUT SECTION (Rich Text from Backend) - Beautiful UI Upgrade */}
                {hasAboutContent && (
                  <section className="bg-gradient-to-br from-slate-50 to-indigo-50/40 p-6 md:p-8 rounded-[2rem] border border-slate-200/60 shadow-sm relative overflow-hidden">
                    {/* Decorative background glows */}
                    <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-100 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
                    <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-emerald-50 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
                    
                    <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-3 relative z-10">
                      <div className="h-8 w-1 bg-[#7E3AF2] rounded-full" /> About The Program
                    </h3>
                    
                    <div 
                      className="
                        prose prose-slate max-w-none text-slate-600 font-medium leading-relaxed relative z-10
                        prose-p:mb-4 prose-p:leading-relaxed
                        prose-strong:text-slate-900 prose-strong:font-bold
                        [&>ul]:list-none [&>ul]:pl-0 [&>ul]:space-y-3 [&>ul]:my-5
                        [&>ul>li]:relative [&>ul>li]:pl-8 
                        [&>ul>li::before]:content-['✓'] [&>ul>li::before]:absolute [&>ul>li::before]:left-0 [&>ul>li::before]:top-0.5 
                        [&>ul>li::before]:flex [&>ul>li::before]:items-center [&>ul>li::before]:justify-center
                        [&>ul>li::before]:h-5 [&>ul>li::before]:w-5 [&>ul>li::before]:rounded-full 
                        [&>ul>li::before]:bg-gradient-to-br [&>ul>li::before]:from-emerald-400 [&>ul>li::before]:to-emerald-500 
                        [&>ul>li::before]:text-white [&>ul>li::before]:text-[10px] [&>ul>li::before]:font-bold [&>ul>li::before]:shadow-sm
                        [&>ol]:list-decimal [&>ol]:pl-5 [&>ol]:space-y-2 [&>ol]:my-5
                        [&>ol>li::marker]:text-[#7E3AF2] [&>ol>li::marker]:font-bold
                      "
                      dangerouslySetInnerHTML={{ __html: details.about }} 
                    />
                  </section>
                )}

                {/* Highlights Grid */}
                {highlights.length > 0 && (
                  <section>
                    <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                      <div className="h-8 w-1 bg-[#7E3AF2] rounded-full" /> Key Highlights
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {highlights.map((item, i) => (
                        <div key={i} className="flex items-start gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-purple-200 transition-colors">
                          <CheckCircle className="h-5 w-5 text-[#00A67E] flex-shrink-0 mt-0.5" />
                          <span className="text-sm font-semibold text-slate-700">{item}</span>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* DYNAMIC CURRICULUM SECTION */}
                {curriculum.length > 0 && (
                  <section>
                    <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                      <div className="h-8 w-1 bg-[#7E3AF2] rounded-full" /> Detailed Curriculum
                    </h3>
                    <div className="space-y-4">
                      {curriculum.map((phase, i) => (
                        <div key={i} className="p-6 rounded-2xl border border-slate-200 bg-white">
                          <h4 className="font-bold text-[#7E3AF2] mb-3 uppercase tracking-wider text-sm">{phase.phase}</h4>
                          <ul className="grid md:grid-cols-2 gap-3">
                            {phase.topics.map((topic, j) => (
                              <li key={j} className="text-sm text-slate-600 flex items-start gap-2">
                                <div className="h-1.5 w-1.5 bg-slate-300 rounded-full mt-1.5 flex-shrink-0" /> 
                                <span className="leading-tight">{topic}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </section>
                )}
              </div>

              {/* Right Column: Stats & Enquire Action */}
              <div className="space-y-6">
                <div className="bg-slate-900 rounded-[24px] p-6 text-white shadow-xl">
                  
                  <h4 className="text-lg font-bold mb-6 border-b border-white/10 pb-4">Batch Details</h4>
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center">
                        <Clock className="h-5 w-5 text-purple-400" />
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-400 font-bold uppercase">Duration</p>
                        <p className="font-bold">{course.duration || "N/A"}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center">
                        <Users className="h-5 w-5 text-purple-400" />
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-400 font-bold uppercase">Batch Size</p>
                        <p className="font-bold">{course.batchSize || "N/A"}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center">
                        <Target className="h-5 w-5 text-purple-400" />
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-400 font-bold uppercase">Eligibility</p>
                        <p className="font-bold">{details.eligibility || "N/A"}</p>
                      </div>
                    </div>
                  </div>

                  {/* Enquire Button Section */}
                  <div className="mt-8 pt-6 border-t border-white/10">
                    <button 
                      onClick={() => {
                        onClose();
                        navigate('/contact');
                        window.scrollTo(0, 0);
                      }}
                      className="w-full bg-[#7E3AF2] hover:bg-white hover:text-[#7E3AF2] text-white py-4 rounded-xl font-bold transition-all shadow-lg uppercase tracking-wider text-sm"
                    >
                      Enquire Now
                    </button>
                  </div>
                </div>

                {/* Expert Faculty Mini Section */}
                {faculty.length > 0 && (
                  <div className="bg-purple-50 rounded-[24px] p-6 border border-purple-100">
                    <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                      <Award className="h-5 w-5 text-[#7E3AF2]" /> Top Faculty
                    </h4>
                    <div className="space-y-4">
                      {faculty.slice(0, 2).map((f, i) => (
                        <div key={i} className="border-b border-purple-200 last:border-0 pb-3 last:pb-0">
                          <p className="text-sm font-bold text-slate-800">{f.name}</p>
                          {f.qualification && (
                            <p className="text-[11px] text-slate-500 font-medium">{f.qualification}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
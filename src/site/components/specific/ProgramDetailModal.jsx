import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, CheckCircle, Clock, Users, BookOpen, 
  Target, Award, Calendar, ShieldCheck, Sparkles 
} from 'lucide-react';

export const ProgramDetailModal = ({ course, onClose }) => {
  if (!course) return null;

  // --- RESTORE ORIGINAL DATA STRUCTURE ---
  // If backend data is missing these complex objects, we use your original dummy data
  const highlights = course.highlights || [
    "Dual Focus: Board Exams + JEE/KCET",
    "Weekend doubt clearing sessions",
    "Regular parent-teacher meetings",
    "Comprehensive study material",
    "Online test series access",
    "Personal mentorship program",
    "Career counseling sessions",
    "Time management training"
  ];

  const curriculum = course.curriculum || [
    {
      phase: "Phase 1: Foundation (Months 1-8)",
      topics: ["Complete Class 11 syllabus coverage", "Fundamental concepts", "Weekly chapter tests"]
    },
    {
      phase: "Phase 2: Advanced (Months 9-16)",
      topics: ["Class 12 syllabus with JEE integration", "Advanced problem solving", "Previous year questions"]
    }
  ];

  const faculty = course.faculty || [
    { name: "Dr. Rajesh Kumar", qualification: "IIT Delhi, M.Sc Physics", experience: "12+ years experience" },
    { name: "Prof. Anita Sharma", qualification: "IIT Bombay, PhD Chemistry", experience: "10+ years experience" }
  ];

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
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-widest mb-4 border border-white/30">
                <Sparkles className="h-3.5 w-3.5" /> {course.category || "Competitive Program"}
              </span>
              <h2 className="text-3xl md:text-4xl font-black leading-tight mb-4">
                {course.title}
              </h2>
              <p className="text-white/80 text-lg max-w-2xl font-medium leading-relaxed">
                {course.fullDescription || course.shortDescription || "Master the concepts with our result-oriented coaching methodology."}
              </p>
            </div>
          </div>

          {/* Scrollable Body */}
          <div className="overflow-y-auto p-8 md:p-10">
            <div className="grid lg:grid-cols-3 gap-10">
              
              {/* Left Column: Details & Faculty */}
              <div className="lg:col-span-2 space-y-10">
                
                {/* Highlights Grid */}
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

                {/* Curriculum Section */}
                <section>
                  <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                    <div className="h-8 w-1 bg-[#7E3AF2] rounded-full" /> Detailed Curriculum
                  </h3>
                  <div className="space-y-4">
                    {curriculum.map((phase, i) => (
                      <div key={i} className="p-6 rounded-2xl border border-slate-200 bg-white">
                        <h4 className="font-bold text-[#7E3AF2] mb-3">{phase.phase}</h4>
                        <ul className="grid md:grid-cols-2 gap-2">
                          {phase.topics.map((topic, j) => (
                            <li key={j} className="text-sm text-slate-600 flex items-center gap-2">
                              <div className="h-1.5 w-1.5 bg-slate-300 rounded-full" /> {topic}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              {/* Right Column: Stats & Pricing */}
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
                        <p className="font-bold">{course.duration || "2 Years"}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center">
                        <Users className="h-5 w-5 text-purple-400" />
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-400 font-bold uppercase">Batch Size</p>
                        <p className="font-bold">{course.batchSize || "30-35 Students"}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center">
                        <Target className="h-5 w-5 text-purple-400" />
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-400 font-bold uppercase">Eligibility</p>
                        <p className="font-bold">{course.eligibility || "Class 11/12"}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-white/10">
                    <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Program Fee</p>
                    <div className="text-3xl font-black text-white">
                      ₹{course.price ? course.price.toLocaleString() : "1,80,000"}
                    </div>
                    <button className="w-full mt-6 bg-[#7E3AF2] hover:bg-white hover:text-[#7E3AF2] text-white py-4 rounded-xl font-bold transition-all shadow-lg uppercase tracking-wider text-sm">
                      Enroll Now
                    </button>
                  </div>
                </div>

                {/* Expert Faculty Mini Section */}
                <div className="bg-purple-50 rounded-[24px] p-6 border border-purple-100">
                  <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <Award className="h-5 w-5 text-[#7E3AF2]" /> Top Faculty
                  </h4>
                  <div className="space-y-4">
                    {faculty.slice(0, 2).map((f, i) => (
                      <div key={i} className="border-b border-purple-200 last:border-0 pb-3 last:pb-0">
                        <p className="text-sm font-bold text-slate-800">{f.name}</p>
                        <p className="text-[11px] text-slate-500 font-medium">{f.qualification}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
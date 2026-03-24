import React, { useState, useEffect } from 'react';
import usePageTitle from '../hooks/usePageTitle';
import { 
  BookOpen, 
  GraduationCap, 
  Target, 
  Users, 
  Clock, 
  Award, 
  Sparkles, 
  Loader2,
  Filter,
  Tag,
  X,
  CheckCircle2,
  Microscope,
  Dna,
  Atom,
  BrainCircuit,
  ShieldCheck,
  HeartPulse,
  Zap,
  Cpu,
  FileText,
  Lightbulb,
  Trophy,
  MapPin,
  Building,
  Compass,
  Briefcase,
  Rocket,
  ArrowRight,
  Activity,
  TrendingUp
} from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { cmsService } from '../../services/cmsService';
import { ProgramDetailModal } from "../../components/specific/ProgramDetailModal";
import CourseCard from "../../components/specific/CourseCard";
import DownloadBrochureButton from '../../components/layout/DownloadBrochureButton';

// IMPORT THE NEW FOUNDATION PAGES DIRECTLY
import IitFoundation from './IitFoundation';
import NeetFoundation from './NeetFoundation';

const Courses = () => {
  const navigate = useNavigate();
  // We use useParams now to grab the dynamic segment /program/:programId
  const { programId } = useParams(); 
  
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState(null);

  // --- FILTER STATES ---
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [tagFilter, setTagFilter] = useState('All');

  // Map the new SEO URL path param to the internal program identifier
  let programFilter = null;
  if (programId) {
    if (programId.toLowerCase() === 'iit-jee-coaching-bangalore') programFilter = 'IIT JEE';
    else if (programId.toLowerCase() === 'neet-coaching-bangalore') programFilter = 'NEET';
    else if (programId.toLowerCase() === 'foundation-coaching-bangalore') programFilter = 'FOUNDATION';
    else programFilter = programId; // Fallback
  }

  // --- DYNAMIC META TITLE ---
  let pageTitle = 'Our Courses | JEE, NEET & Foundation Programs | Centum Academy';
  if (programFilter?.toUpperCase() === 'IIT JEE') {
    pageTitle = 'IIT JEE Coaching in Bangalore for JEE Main and Advanced';
  } else if (programFilter?.toUpperCase() === 'NEET') {
    pageTitle = 'NEET Coaching in Bangalore for Medical Entrance Exams';
  } else if (programFilter?.toUpperCase() === 'FOUNDATION') {
    pageTitle = 'Foundation Coaching in Bangalore for Classes 8 to 10';
  }
  
  usePageTitle(pageTitle);

  // Scroll to top and reset local filters whenever the program URL changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCategoryFilter('All');
    setTagFilter('All');
  }, [programId]);

  // Fetch courses from backend on mount
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const data = await cmsService.getCourses();
        setCourses(data);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  // --- FILTERING LOGIC ---
  const displayedCourses = courses.filter(course => {
    const matchProgram = programFilter 
      ? course.program?.toUpperCase() === programFilter.toUpperCase() 
      : true;
    const matchCategory = categoryFilter !== 'All' 
      ? course.category === categoryFilter 
      : true;
    const matchTag = tagFilter !== 'All' 
      ? course.tag === tagFilter 
      : true;

    return matchProgram && matchCategory && matchTag;
  });

  // --- PREMIUM DYNAMIC HEADER TITLE & DESCRIPTION ---
  // DEFAULT: Shows on the main /programs page
  let headerTitle = (
    <>Explore Our <br className="hidden md:block"/><span className="bg-gradient-to-r from-[#7E3AF2] via-[#4F46E5] to-[#1C64F2] bg-clip-text text-transparent">Coaching Programs</span></>
  );
  let headerDescription = "Expert-led coaching classes in Bangalore for JEE, NEET, and foundation courses designed to build strong concepts and long-term success.";

  // SPECIFIC Overrides
  if (programFilter?.toUpperCase() === 'IIT JEE') {
    headerTitle = (
      <>IIT JEE Coaching in Bangalore for <br className="hidden md:block"/><span className="bg-gradient-to-r from-[#7E3AF2] via-[#4F46E5] to-[#1C64F2] bg-clip-text text-transparent">JEE Main and Advanced</span></>
    );
    headerDescription = "At Centum Academy, our IIT JEE coaching in Bangalore helps students crack JEE Main and Advanced through clear concepts and structured guidance. We build a strong foundation in Physics, Chemistry, and Mathematics to enhance problem-solving skills and achieve higher scores.";
  } else if (programFilter?.toUpperCase() === 'NEET') {
    headerTitle = (
      <>NEET Coaching in Bangalore for <br className="hidden md:block"/><span className="bg-gradient-to-r from-[#7E3AF2] via-[#4F46E5] to-[#1C64F2] bg-clip-text text-transparent">Medical Entrance Exams</span></>
    );
    headerDescription = "For Students preparing for NEET coaching in Bangalore, Centum Academy ensures they are confident for medical entrance exams through structured learning and strong conceptual and visual understanding. We ensure that students have a strong knowledge in  Biology, Physics, and Chemistry, along with problem-solving skills, so that they are fear- free in their exams.";
  } else if (programFilter?.toUpperCase() === 'FOUNDATION') {
    headerTitle = (
      <>Foundation Coaching in Bangalore for <br className="hidden md:block"/><span className="bg-gradient-to-r from-[#7E3AF2] via-[#4F46E5] to-[#1C64F2] bg-clip-text text-transparent">Classes 8 to 10</span></>
    );
    headerDescription = "Our IIT & NEET Foundation program at Centum Academy helps students develop strong academic fundamentals through a systematic approach and clear conceptual understanding. We focus on building core concepts in Mathematics and Science, along with enhancing analytical thinking and problem-solving abilities to strengthen academic confidence.";
  }

  // ==========================================
  // 🚀 BULLETPROOF ROUTING FIX:
  // If the URL perfectly matches our new foundation pages, 
  // intercept it and render the correct component instantly!
  // ==========================================
  if (programId === 'iit-foundation-coaching-bangalore') {
    return <IitFoundation />;
  }
  
  if (programId === 'neet-foundation-coaching-bangalore') {
    return <NeetFoundation />;
  }

  // ==========================================
  // ADVANCED ANIMATION VARIANTS
  // ==========================================
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const slideInLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } }
  };

  const slideInRight = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } }
  };

  const scaleUp = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const programCategories = [
    {
      name: "JEE Preparation",
      icon: GraduationCap,
      color: "#1C64F2",
      description: "Comprehensive engineering entrance preparation",
      count: courses.filter(c => c.program?.toUpperCase().includes('JEE')).length || 0
    },
    {
      name: "NEET Preparation",
      icon: BookOpen,
      color: "#00A67E",
      description: "Complete medical entrance coaching",
      count: courses.filter(c => c.program?.toUpperCase().includes('NEET')).length || 0
    },
    {
      name: "Foundation Courses",
      icon: Target,
      color: "#F59E0B",
      description: "Building strong basics for future success",
      count: courses.filter(c => c.program?.toUpperCase().includes('FOUNDATION')).length || 0
    }
  ];

  return (
    <div className="min-h-screen bg-white font-sans">
      <section id="programs" className="bg-gradient-to-br from-white via-purple-50/30 to-blue-50/30 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10 py-20 px-6">
          
          {/* ========================================================= */}
          {/* PREMIUM HEADER SECTION                                      */}
          {/* ========================================================= */}
          <motion.div className="text-center mb-24 relative" initial="hidden" animate="visible" variants={fadeInUp}>
            
            {/* Subtle premium background glow behind the text */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-r from-purple-400/20 to-blue-400/20 blur-[100px] rounded-full pointer-events-none -z-10"></div>

            {/* Sleek Badge */}
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-slate-200/60 px-5 py-2.5 rounded-full mb-8 shadow-sm shadow-indigo-100/50"
            >
              <Sparkles className="h-4 w-4 text-[#7E3AF2]" />
              <span className="text-xs font-black text-slate-800 uppercase tracking-[0.2em]">
                {programFilter ? `${programFilter} PROGRAMS` : 'OUR PROGRAMS'}
              </span>
            </motion.div>
            
            {/* Premium H1 Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-[4rem] font-bold text-slate-900 mb-8 tracking-tighter leading-[1.1]">
              {headerTitle}
            </h1>

            {/* Elegant Divider Line */}
            <div className="w-20 h-1.5 bg-gradient-to-r from-[#7E3AF2] to-[#1C64F2] mx-auto rounded-full mb-8 opacity-80 shadow-sm"></div>
            
            {/* Premium Paragraph Text - REDUCED FONT SIZE HERE */}
            <p className="text-base md:text-lg lg:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-normal tracking-wide">
              {headerDescription}
            </p>

          </motion.div>

          {/* Categories Grid - Only show if NO specific Program filter is applied via Navbar */}
          {!programFilter && (
            <motion.div className="grid md:grid-cols-3 gap-6 mb-20" variants={staggerContainer} initial="hidden" animate="visible">
              {programCategories.map((category, idx) => (
                <motion.div 
                  key={idx} 
                  variants={scaleUp} 
                  whileHover={{ y: -8 }}
                  className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100 group cursor-pointer"
                >
                  <div className="h-16 w-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform" style={{ background: `${category.color}20` }}>
                    <category.icon className="h-8 w-8" style={{ color: category.color }} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{category.name}</h3>
                  <p className="text-slate-600 mb-4 font-medium">{category.description}</p>
                  <span className="text-xs font-bold uppercase tracking-wide" style={{ color: category.color }}>{category.count} Programs Available</span>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Courses & Filters Section */}
          <motion.div className="mb-20" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeInUp}>
            <h3 className="text-3xl font-bold text-slate-900 mb-8 text-center">
              {programFilter ? `Explore ${programFilter} Courses` : "Explore All Programs"}
            </h3>

            {/* FILTER BAR */}
            <div className="flex flex-wrap justify-center items-center gap-4 mb-10">
              <motion.div whileHover={{ scale: 1.02 }} className="flex items-center bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm focus-within:border-indigo-500 transition-colors">
                <div className="bg-slate-50 px-4 py-2.5 border-r border-slate-200 flex items-center gap-2">
                  <Filter className="w-4 h-4 text-slate-500" />
                  <span className="text-sm font-bold text-slate-700 hidden sm:inline">Category</span>
                </div>
                <select 
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="px-4 py-2.5 outline-none text-sm font-medium text-slate-700 bg-white cursor-pointer min-w-[150px] sm:min-w-[180px]"
                >
                  <option value="All">All Categories</option>
                  <option value="regular">Regular Program</option>
                  <option value="crash-course">Crash Course</option>
                  <option value="test-series">Test Series</option>
                </select>
              </motion.div>

              <motion.div whileHover={{ scale: 1.02 }} className="flex items-center bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm focus-within:border-indigo-500 transition-colors">
                <div className="bg-slate-50 px-4 py-2.5 border-r border-slate-200 flex items-center gap-2">
                  <Tag className="w-4 h-4 text-slate-500" />
                  <span className="text-sm font-bold text-slate-700 hidden sm:inline">Tag</span>
                </div>
                <select 
                  value={tagFilter}
                  onChange={(e) => setTagFilter(e.target.value)}
                  className="px-4 py-2.5 outline-none text-sm font-medium text-slate-700 bg-white cursor-pointer min-w-[150px] sm:min-w-[180px]"
                >
                  <option value="All">All Tags</option>
                  <option value="Weekends">Weekends</option>
                  <option value="School integrated Programs">School integrated Programs</option>
                </select>
              </motion.div>

              {(categoryFilter !== 'All' || tagFilter !== 'All') && (
                <motion.button 
                  initial={{ opacity: 0, scale: 0.8 }} 
                  animate={{ opacity: 1, scale: 1 }} 
                  whileHover={{ scale: 1.05 }}
                  onClick={() => { setCategoryFilter('All'); setTagFilter('All'); }}
                  className="flex items-center gap-2 px-4 py-2.5 bg-red-50 text-red-600 rounded-xl text-sm font-bold hover:bg-red-100 transition-colors border border-red-100 shadow-sm"
                >
                  <X className="w-4 h-4" /> Clear
                </motion.button>
              )}
            </div>
            
            {/* Courses Grid */}
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="h-12 w-12 text-[#7E3AF2] animate-spin mb-4" />
                <p className="text-slate-500 font-medium">Loading excellence...</p>
              </div>
            ) : displayedCourses.length === 0 ? (
               <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-300">
                <Filter className="h-12 w-12 text-slate-300 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-slate-900">No programs found</h3>
                <p className="text-slate-500 mt-1">Try adjusting your filters to find what you're looking for.</p>
                <button 
                  onClick={() => { setCategoryFilter('All'); setTagFilter('All'); }}
                  className="mt-6 text-indigo-600 font-bold hover:text-indigo-700 underline underline-offset-4"
                >
                  Clear all filters
                </button>
              </motion.div>
            ) : (
              <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" variants={staggerContainer} initial="hidden" animate="visible">
                {displayedCourses.map((course, idx) => (
                  <motion.div key={course.id || idx} variants={scaleUp} whileHover={{ y: -8 }}>
                    <CourseCard 
                      course={course} 
                      index={idx} 
                      onViewDetails={() => setSelectedCourse(course)} 
                    />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </motion.div>

          {/* ========================================================= */}
          {/* IIT JEE EXTRA CONTENT (Only shows when Program is IIT JEE) */}
          {/* ========================================================= */}
          {programFilter?.toUpperCase() === 'IIT JEE' && (
            <motion.div 
              className="mb-20 space-y-24 bg-white/50 rounded-3xl p-8 lg:p-12 border border-slate-100 shadow-sm"
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
            >
              
              {/* 1. Intro Section */}
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <motion.div variants={slideInLeft} className="space-y-6">
                  <div className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 font-bold rounded-full text-sm">
                    Engineering Excellence
                  </div>
                  <h2 className="text-4xl font-black text-slate-900 leading-tight">
                    Structured preparation for IITs, NITs and Beyond
                  </h2>
                  <p className="text-slate-600 leading-relaxed text-lg">
                    Cracking JEE requires strategic planning and strong basics. As a trusted IIT coaching institute in Bangalore, Centum Academy provides students with the exact tools needed to excel in Physics, Chemistry, and Mathematics.
                  </p>
                  <p className="text-slate-600 leading-relaxed text-lg">
                    Through AI-supported practice, personalised mentoring, and guidance from IIT graduates, we help students secure spots in IITs, NITs, and other top engineering institutes.
                  </p>
                </motion.div>
                <motion.div variants={slideInRight} className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800" 
                    alt="Students preparing for engineering" 
                    className="rounded-2xl shadow-2xl object-cover h-[450px] w-full"
                  />
                  <motion.div whileHover={{ scale: 1.05 }} className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl">
                    <div className="flex items-center gap-4">
                      <div className="bg-blue-100 p-3 rounded-full"><GraduationCap className="text-blue-600 h-8 w-8"/></div>
                      <div>
                        <p className="text-sm text-slate-500 font-bold uppercase">Target</p>
                        <p className="text-xl font-black text-slate-900">Top IITs & NITs</p>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </div>

              {/* 2. Why Choose Section */}
              <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <motion.h3 variants={fadeInUp} className="text-3xl font-black text-center text-slate-900 mb-12">
                  Why students and parents prefer <span className="text-blue-600">Centum Academy</span>
                </motion.h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <motion.div variants={scaleUp} whileHover={{ y: -5 }} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all">
                    <BookOpen className="h-10 w-10 text-blue-500 mb-4" />
                    <h4 className="text-xl font-bold text-slate-900 mb-2">Strong Concepts</h4>
                    <p className="text-slate-600">We build a solid foundation aligned with NCERT while covering advanced topics, ensuring students are conceptually prepared for JEE.</p>
                  </motion.div>
                  <motion.div variants={scaleUp} whileHover={{ y: -5 }} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all">
                    <Zap className="h-10 w-10 text-blue-500 mb-4" />
                    <h4 className="text-xl font-bold text-slate-900 mb-2">Speed & Accuracy</h4>
                    <p className="text-slate-600">Learn essential time management methods to handle complex problems and improve overall exam efficiency.</p>
                  </motion.div>
                  <motion.div variants={scaleUp} whileHover={{ y: -5 }} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all">
                    <Cpu className="h-10 w-10 text-blue-500 mb-4" />
                    <h4 className="text-xl font-bold text-slate-900 mb-2">AI Analytics</h4>
                    <p className="text-slate-600">AI-based assignments identify learning gaps instantly, allowing for highly targeted areas of improvement.</p>
                  </motion.div>
                  <motion.div variants={scaleUp} whileHover={{ y: -5 }} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all">
                    <FileText className="h-10 w-10 text-blue-500 mb-4" />
                    <h4 className="text-xl font-bold text-slate-900 mb-2">Mock Tests</h4>
                    <p className="text-slate-600">Detailed test analysis highlights your strengths and systematically guides you to overcome weak areas.</p>
                  </motion.div>
                  <motion.div variants={scaleUp} whileHover={{ y: -5 }} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all">
                    <Users className="h-10 w-10 text-blue-500 mb-4" />
                    <h4 className="text-xl font-bold text-slate-900 mb-2">Personal Mentorship</h4>
                    <p className="text-slate-600">Small batches ensure all doubts are cleared, and students are guided in a way that best fits their learning style.</p>
                  </motion.div>
                  <motion.div variants={scaleUp} whileHover={{ y: -5 }} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all">
                    <Award className="h-10 w-10 text-blue-500 mb-4" />
                    <h4 className="text-xl font-bold text-slate-900 mb-2">Expert Faculty</h4>
                    <p className="text-slate-600">Programs are designed and taught by IIT graduates who utilize proven, structured problem-solving approaches.</p>
                  </motion.div>
                </div>
              </motion.div>

              {/* 3. Program Highlights */}
              <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="bg-blue-50 rounded-3xl p-8 md:p-12">
                <motion.h3 variants={fadeInUp} className="text-3xl font-black text-slate-900 mb-8 text-center">Program <span className="text-blue-600">Highlights</span></motion.h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    "Faculty with proven IIT, BITS, and NIT experience.",
                    "Progressive syllabus coverage from Class XI to XII.",
                    "Foundation building and Olympiad prep integration.",
                    "Topic-wise assignments and extensive question banks.",
                    "Dedicated Class XII revision module for final prep.",
                    "Frequent parent-teacher meetings to track progress."
                  ].map((highlight, i) => (
                    <motion.div key={i} variants={fadeInUp} whileHover={{ scale: 1.02 }} className="flex items-start gap-3 bg-white p-4 rounded-xl shadow-sm">
                      <CheckCircle2 className="h-6 w-6 text-blue-500 flex-shrink-0" />
                      <span className="text-slate-700 font-medium">{highlight}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* 4. JEE Success Formula */}
              <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <motion.div variants={fadeInUp} className="text-center mb-12">
                  <h3 className="text-3xl font-black text-slate-900 mb-4">JEE Success Formula at <span className="text-blue-600">Centum Academy</span></h3>
                  <p className="text-slate-600 text-lg max-w-2xl mx-auto">Our three-layered integrated system ensures students are not only prepared, but at their absolute best on exam day.</p>
                </motion.div>
                <div className="grid md:grid-cols-3 gap-8 relative">
                  <motion.div variants={scaleUp} whileHover={{ y: -5 }} className="bg-white p-8 rounded-2xl border-2 border-slate-100 text-center relative z-10 hover:border-blue-200 transition-colors">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Lightbulb className="h-8 w-8 text-blue-600" />
                    </div>
                    <h4 className="text-xl font-bold text-slate-900 mb-3">Concept Mastery</h4>
                    <p className="text-slate-600">A deep, practical understanding of all foundational concepts.</p>
                  </motion.div>
                  <motion.div variants={scaleUp} whileHover={{ y: -5 }} className="bg-white p-8 rounded-2xl border-2 border-slate-100 text-center relative z-10 hover:border-blue-200 transition-colors">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Target className="h-8 w-8 text-blue-600" />
                    </div>
                    <h4 className="text-xl font-bold text-slate-900 mb-3">Problem Solving</h4>
                    <p className="text-slate-600">Improved accuracy and speed through targeted, repetitive practice.</p>
                  </motion.div>
                  <motion.div variants={scaleUp} whileHover={{ y: -5 }} className="bg-white p-8 rounded-2xl border-2 border-slate-100 text-center relative z-10 hover:border-blue-200 transition-colors">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Trophy className="h-8 w-8 text-blue-600" />
                    </div>
                    <h4 className="text-xl font-bold text-slate-900 mb-3">Exam Strategy</h4>
                    <p className="text-slate-600">Mock tests, statistical analysis, and guidance to maximize scores.</p>
                  </motion.div>
                </div>
              </motion.div>

              {/* 5. Why Bangalore Prefers Centum */}
              <div className="pt-8 border-t border-slate-200">
                <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="bg-gradient-to-r from-slate-50 to-blue-50 p-8 md:p-12 rounded-2xl flex flex-col md:flex-row items-center gap-12">
                  <div className="md:w-1/3">
                    <div className="bg-white p-6 rounded-2xl shadow-sm inline-block">
                      <MapPin className="h-16 w-16 text-blue-600 mb-4" />
                      <h4 className="text-2xl font-black text-slate-900">Why Students in Bangalore Prefer Us</h4>
                    </div>
                  </div>
                  <div className="md:w-2/3">
                    <ul className="space-y-4">
                      <motion.li variants={fadeInUp} className="flex items-start gap-4">
                        <div className="bg-white p-2 rounded-lg shadow-sm"><Building className="h-6 w-6 text-blue-600" /></div>
                        <span className="text-slate-700 text-lg">Convenient centers in HSR Layout, Whitefield, and Rajajinagar.</span>
                      </motion.li>
                      <motion.li variants={fadeInUp} className="flex items-start gap-4">
                        <div className="bg-white p-2 rounded-lg shadow-sm"><School className="h-6 w-6 text-blue-600" /></div>
                        <span className="text-slate-700 text-lg">Close partnerships with reputed schools (NPS, NAFL, etc).</span>
                      </motion.li>
                      <motion.li variants={fadeInUp} className="flex items-start gap-4">
                        <div className="bg-white p-2 rounded-lg shadow-sm"><Target className="h-6 w-6 text-blue-600" /></div>
                        <span className="text-slate-700 text-lg">Seamlessly combining board exams with JEE preparation.</span>
                      </motion.li>
                      <motion.li variants={fadeInUp} className="flex items-start gap-4">
                        <div className="bg-white p-2 rounded-lg shadow-sm"><Users className="h-6 w-6 text-blue-600" /></div>
                        <span className="text-slate-700 text-lg">Highly valued for personalized mentorship and small batch sizes.</span>
                      </motion.li>
                    </ul>
                  </div>
                </motion.div>
              </div>

            </motion.div>
          )}

          {/* ========================================================= */}
          {/* NEET EXTRA CONTENT (Only shows when Program is NEET) */}
          {/* ========================================================= */}
          {programFilter?.toUpperCase() === 'NEET' && (
            <motion.div 
              className="mb-20 space-y-24 bg-white/50 rounded-3xl p-8 lg:p-12 border border-slate-100 shadow-sm"
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
            >
              
              {/* 1. Intro Section */}
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <motion.div variants={slideInLeft} className="space-y-6">
                  <div className="inline-block px-4 py-1.5 bg-emerald-100 text-emerald-700 font-bold rounded-full text-sm">
                    Medical Excellence
                  </div>
                  <h2 className="text-4xl font-black text-slate-900 leading-tight">
                    Your Road to High-Ranking Medical Positions
                  </h2>
                  <p className="text-slate-600 leading-relaxed text-lg">
                    NEET is the gateway to realizing your dream of becoming a doctor. As a leading NEET coaching institute in Bangalore, our program is designed to help you master Biology, Physics, and Chemistry while enhancing exam readiness.
                  </p>
                  <p className="text-slate-600 leading-relaxed text-lg">
                    With expert mentors, comprehensive study materials, and continuous testing, we ensure our students are fully prepared to secure top ranks in India’s premier medical colleges.
                  </p>
                </motion.div>
                <motion.div variants={slideInRight} className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800" 
                    alt="Medical aspirational students" 
                    className="rounded-2xl shadow-2xl object-cover h-[450px] w-full"
                  />
                  <motion.div whileHover={{ scale: 1.05 }} className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl">
                    <div className="flex items-center gap-4">
                      <div className="bg-emerald-100 p-3 rounded-full"><Target className="text-emerald-600 h-8 w-8"/></div>
                      <div>
                        <p className="text-sm text-slate-500 font-bold uppercase">Target</p>
                        <p className="text-xl font-black text-slate-900">Top Medical Colleges</p>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </div>

              {/* 2. Why Choose Section */}
              <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <motion.h3 variants={fadeInUp} className="text-3xl font-black text-center text-slate-900 mb-12">
                  Why Choose Centum Academy for <span className="text-emerald-600">NEET</span>
                </motion.h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <motion.div variants={scaleUp} whileHover={{ y: -5 }} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all">
                    <Microscope className="h-10 w-10 text-emerald-500 mb-4" />
                    <h4 className="text-xl font-bold text-slate-900 mb-2">Focused Coverage</h4>
                    <p className="text-slate-600">Our curriculum aligns with NCERT, offering a NEET-focused problem-solving approach to enhance conceptual knowledge in all sciences.</p>
                  </motion.div>
                  <motion.div variants={scaleUp} whileHover={{ y: -5 }} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all">
                    <Lightbulb className="h-10 w-10 text-emerald-500 mb-4" />
                    <h4 className="text-xl font-bold text-slate-900 mb-2">Simplified Teaching</h4>
                    <p className="text-slate-600">Complex topics are broken down using visual demonstrations, diagrams, and real-life examples for faster understanding.</p>
                  </motion.div>
                  <motion.div variants={scaleUp} whileHover={{ y: -5 }} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all">
                    <Activity className="h-10 w-10 text-emerald-500 mb-4" />
                    <h4 className="text-xl font-bold text-slate-900 mb-2">Targeted Testing</h4>
                    <p className="text-slate-600">Daily tests and intensive error review sessions aligned with the recent NEET scheme instantly identify learning gaps.</p>
                  </motion.div>
                  <motion.div variants={scaleUp} whileHover={{ y: -5 }} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all">
                    <Users className="h-10 w-10 text-emerald-500 mb-4" />
                    <h4 className="text-xl font-bold text-slate-900 mb-2">Personal Mentorship</h4>
                    <p className="text-slate-600">Small batches guarantee individual attention, regular doubt-clearing sessions, and pacing adjusted to each student.</p>
                  </motion.div>
                  <motion.div variants={scaleUp} whileHover={{ y: -5 }} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all">
                    <BookOpen className="h-10 w-10 text-emerald-500 mb-4" />
                    <h4 className="text-xl font-bold text-slate-900 mb-2">Exclusive Materials</h4>
                    <p className="text-slate-600">Students receive structured study modules, curated assignments, and extensive access to past NEET papers.</p>
                  </motion.div>
                  <motion.div variants={scaleUp} whileHover={{ y: -5 }} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all">
                    <Award className="h-10 w-10 text-emerald-500 mb-4" />
                    <h4 className="text-xl font-bold text-slate-900 mb-2">Experienced Faculty</h4>
                    <p className="text-slate-600">Our faculty brings years of specialized NEET teaching experience, building deep confidence in our students.</p>
                  </motion.div>
                </div>
              </motion.div>

              {/* 3. Program Highlights */}
              <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="bg-emerald-50 rounded-3xl p-8 md:p-12">
                <motion.h3 variants={fadeInUp} className="text-3xl font-black text-slate-900 mb-8 text-center">Program <span className="text-emerald-600">Highlights</span></motion.h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    "Faculty from IIT, BITS, and premier institutes.",
                    "Specialized courses in Zoology, Botany, Physics, and Chemistry.",
                    "Early preparation modules for Class XI students.",
                    "Intensive revision crash courses for Class XII.",
                    "Individual mentoring and frequent parent-teacher meetings."
                  ].map((highlight, i) => (
                    <motion.div key={i} variants={fadeInUp} whileHover={{ scale: 1.02 }} className="flex items-start gap-3 bg-white p-4 rounded-xl shadow-sm">
                      <CheckCircle2 className="h-6 w-6 text-emerald-500 flex-shrink-0" />
                      <span className="text-slate-700 font-medium">{highlight}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* 4. Success & Trust */}
              <div className="grid lg:grid-cols-2 gap-12 pt-8 border-t border-slate-200">
                <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                  <motion.h4 variants={fadeInUp} className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                    <Trophy className="text-emerald-500 h-8 w-8" />
                    NEET Success Starts Here
                  </motion.h4>
                  <motion.p variants={fadeInUp} className="text-slate-600 mb-6">
                    We combine mastery of concepts with exam-focused practice. Students grasp subjects in-depth and learn to work efficiently under time constraints. This holistic approach ensures consistent improvement and stellar final results.
                  </motion.p>
                </motion.div>
                
                <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="bg-slate-50 p-8 rounded-2xl">
                  <h4 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                    <ShieldCheck className="text-emerald-500 h-8 w-8" />
                    Why Bangalore Trusts Us
                  </h4>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <div className="bg-white p-2 rounded-lg shadow-sm"><MapPin className="h-5 w-5 text-emerald-600" /></div>
                      <span className="text-slate-700">Convenient centers in HSR Layout, Whitefield, and Koramangala.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="bg-white p-2 rounded-lg shadow-sm"><Building className="h-5 w-5 text-emerald-600" /></div>
                      <span className="text-slate-700">Integrated programs with well-known schools (NPS, NAFL).</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="bg-white p-2 rounded-lg shadow-sm"><TrendingUp className="h-5 w-5 text-emerald-600" /></div>
                      <span className="text-slate-700">Consistently high student outcomes in NEET and Olympiads.</span>
                    </li>
                  </ul>
                </motion.div>
              </div>

            </motion.div>
          )}

          {/* ========================================================= */}
          {/* FOUNDATION EXTRA CONTENT (Only shows when Program is Foundation) */}
          {/* ========================================================= */}
          {programFilter?.toUpperCase() === 'FOUNDATION' && (
            <motion.div 
              className="mb-20 space-y-24 bg-white/50 rounded-3xl p-8 lg:p-12 border border-slate-100 shadow-sm"
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
            >
              
              {/* 1. Intro Section */}
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <motion.div variants={slideInLeft} className="space-y-6">
                  <div className="inline-block px-4 py-1.5 bg-amber-100 text-amber-700 font-bold rounded-full text-sm">
                    Classes 8 to 10
                  </div>
                  <h2 className="text-4xl font-black text-slate-900 leading-tight">
                    Laying a Strong Academic Base for Future Aspirants
                  </h2>
                  <p className="text-slate-600 leading-relaxed text-lg">
                    Our Foundation Coaching Program reinforces basics in Mathematics and Science, systematically preparing Class 8-10 students for future competitive exams like IIT JEE and NEET.
                  </p>
                  <p className="text-slate-600 leading-relaxed text-lg">
                    Rather than pushing exam stress early on, we focus on deep concept understanding, analytical thinking, and rational reasoning to build long-lasting academic confidence.
                  </p>
                </motion.div>
                <motion.div variants={slideInRight} className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&q=80&w=800" 
                    alt="Young students learning science" 
                    className="rounded-2xl shadow-2xl object-cover h-[450px] w-full"
                  />
                  <motion.div whileHover={{ scale: 1.05 }} className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl">
                    <div className="flex items-center gap-4">
                      <div className="bg-amber-100 p-3 rounded-full"><Target className="text-amber-600 h-8 w-8"/></div>
                      <div>
                        <p className="text-sm text-slate-500 font-bold uppercase">Focus</p>
                        <p className="text-xl font-black text-slate-900">Early Excellence</p>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </div>

              {/* 2. Why Choose Section */}
              <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <motion.h3 variants={fadeInUp} className="text-3xl font-black text-center text-slate-900 mb-12">
                  Why Choose Our <span className="text-amber-600">Foundation Program</span>
                </motion.h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <motion.div variants={scaleUp} whileHover={{ y: -5 }} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all">
                    <BrainCircuit className="h-10 w-10 text-amber-500 mb-4" />
                    <h4 className="text-xl font-bold text-slate-900 mb-2">No Rote Learning</h4>
                    <p className="text-slate-600">We encourage deep concept understanding over memorization, building critical thinking skills that last a lifetime.</p>
                  </motion.div>
                  <motion.div variants={scaleUp} whileHover={{ y: -5 }} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all">
                    <Trophy className="h-10 w-10 text-amber-500 mb-4" />
                    <h4 className="text-xl font-bold text-slate-900 mb-2">Olympiad Prep</h4>
                    <p className="text-slate-600">Specialized modules for Mental Maths and Speed Maths give our students a sharp edge early on.</p>
                  </motion.div>
                  <motion.div variants={scaleUp} whileHover={{ y: -5 }} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all">
                    <Users className="h-10 w-10 text-amber-500 mb-4" />
                    <h4 className="text-xl font-bold text-slate-900 mb-2">Small Batches</h4>
                    <p className="text-slate-600">Limited batch sizes mean faculty can closely track progress and customize support for every learner.</p>
                  </motion.div>
                  <motion.div variants={scaleUp} whileHover={{ y: -5 }} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all">
                    <Compass className="h-10 w-10 text-amber-500 mb-4" />
                    <h4 className="text-xl font-bold text-slate-900 mb-2">Practical Exposure</h4>
                    <p className="text-slate-600">We connect academics with real-world applications through science fairs, projects, and industrial visits.</p>
                  </motion.div>
                  <motion.div variants={scaleUp} whileHover={{ y: -5 }} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all">
                    <Briefcase className="h-10 w-10 text-amber-500 mb-4" />
                    <h4 className="text-xl font-bold text-slate-900 mb-2">Career Exploration</h4>
                    <p className="text-slate-600">Students are introduced to various STEM career paths, helping them discover interests before high school.</p>
                  </motion.div>
                  <motion.div variants={scaleUp} whileHover={{ y: -5 }} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all">
                    <Award className="h-10 w-10 text-amber-500 mb-4" />
                    <h4 className="text-xl font-bold text-slate-900 mb-2">Expert Alumni</h4>
                    <p className="text-slate-600">Learn from IIT graduates who combine strong academics with real-world insight to make concepts engaging.</p>
                  </motion.div>
                </div>
              </motion.div>

              {/* 3. Explore Our Foundation Program */}
              <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="bg-amber-50 rounded-3xl p-8 md:p-12">
                <motion.div variants={fadeInUp} className="text-center mb-12">
                  <h3 className="text-3xl font-black text-slate-900 mb-4">Explore Our <span className="text-amber-600">Foundation Program</span></h3>
                  <p className="text-slate-600 text-lg max-w-2xl mx-auto">Choose the right path to begin your early preparation journey with Centum Academy.</p>
                </motion.div>
                
                <div className="grid md:grid-cols-2 gap-8">
                  {/* IIT Foundation Card */}
                  <motion.div variants={scaleUp} whileHover={{ y: -5 }} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col h-full hover:shadow-md transition-all">
                    <div className="w-14 h-14 bg-amber-100 rounded-xl flex items-center justify-center mb-6">
                      <Rocket className="h-7 w-7 text-amber-600" />
                    </div>
                    <h4 className="text-2xl font-bold text-slate-900 mb-4">IIT Foundation Coaching</h4>
                    <p className="text-slate-600 mb-6 flex-grow">
                      Designed for Classes 8-10, this program builds strong fundamentals in Math and Science. We focus on concept clarity, logical reasoning, and analytical thinking to lay a solid groundwork for future IIT JEE preparation without early exam stress.
                    </p>
                    <button 
                      onClick={() => navigate('/program/iit-foundation-coaching-bangalore')} 
                      className="inline-flex items-center gap-2 text-amber-600 font-bold hover:text-amber-700 transition-colors mt-auto"
                    >
                      Read More <ArrowRight className="h-4 w-4" />
                    </button>
                  </motion.div>

                  {/* NEET Foundation Card */}
                  <motion.div variants={scaleUp} whileHover={{ y: -5 }} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col h-full hover:shadow-md transition-all">
                    <div className="w-14 h-14 bg-emerald-100 rounded-xl flex items-center justify-center mb-6">
                      <Microscope className="h-7 w-7 text-emerald-600" />
                    </div>
                    <h4 className="text-2xl font-bold text-slate-900 mb-4">NEET Foundation Coaching</h4>
                    <p className="text-slate-600 mb-6 flex-grow">
                      Aimed at aspiring medical students in Classes 8-10. This program builds a strong base in Biology, Physics, and Chemistry through application-based learning, setting the stage for future NEET success.
                    </p>
                    <button 
                      onClick={() => navigate('/program/neet-foundation-coaching-bangalore')} 
                      className="inline-flex items-center gap-2 text-emerald-600 font-bold hover:text-emerald-700 transition-colors mt-auto"
                    >
                      Read More <ArrowRight className="h-4 w-4" />
                    </button>
                  </motion.div>
                </div>
              </motion.div>

            </motion.div>
          )}

          {/* CTA Section */}
          <motion.div 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true }} 
            variants={scaleUp}
            whileHover={{ scale: 1.01 }}
            className="bg-gradient-to-br from-[#7E3AF2] to-[#1C64F2] rounded-3xl p-12 text-white text-center shadow-2xl relative overflow-hidden mt-10"
          >
            <h3 className="text-3xl font-bold mb-4">Not Sure Which Program is Right for You?</h3>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto font-medium">
              Our expert counselors will help you choose the perfect program based on your goals and career aspirations.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <motion.button 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  window.scrollTo(0, 0);
                  navigate('/contact');
                }}
                className="bg-white text-[#7E3AF2] font-bold px-8 py-3.5 rounded-xl shadow-xl hover:bg-slate-50 transition-colors"
              >
                Get Free Counseling
              </motion.button>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <DownloadBrochureButton 
                  isFixed={false} 
                  className="!bg-transparent !border-2 !border-white !text-white hover:!bg-white/10 !shadow-none !rounded-xl !py-3.5 !m-0 !transform-none !transition-colors" 
                />
              </motion.div>

            </div>
          </motion.div>
        </div>
      </section>

      {selectedCourse && (
        <ProgramDetailModal course={selectedCourse} onClose={() => setSelectedCourse(null)} />
      )}
    </div>
  );
};

// Simple inline component for an icon not exported in older Lucide versions
const School = ({className}) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>
  </svg>
);

export default Courses;
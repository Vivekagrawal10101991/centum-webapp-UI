import React, { useState, useEffect } from 'react';
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
  X
} from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate, useSearchParams } from "react-router-dom";
import { cmsService } from '../../services/cmsService';
import { ProgramDetailModal } from "../../components/specific/ProgramDetailModal";
import CourseCard from "../../components/specific/CourseCard";

/**
 * Courses Component
 * Updated with Dynamic Header Descriptions based on the Program Filter
 */
const Courses = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams(); 
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState(null);

  // --- FILTER STATES ---
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [tagFilter, setTagFilter] = useState('All');

  // Get the program filter from URL (e.g., ?program=IIT+JEE)
  const programFilter = searchParams.get('program');

  // Scroll to top and reset local filters whenever the program URL changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCategoryFilter('All');
    setTagFilter('All');
  }, [programFilter]);

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
    // 1. Filter by Program (from URL)
    const matchProgram = programFilter 
      ? course.program?.toUpperCase() === programFilter.toUpperCase() 
      : true;
    
    // 2. Filter by Category
    const matchCategory = categoryFilter !== 'All' 
      ? course.category === categoryFilter 
      : true;
      
    // 3. Filter by Badge/Tag
    const matchTag = tagFilter !== 'All' 
      ? course.tag === tagFilter 
      : true;

    return matchProgram && matchCategory && matchTag;
  });

  // --- DYNAMIC HEADER DESCRIPTION ---
  let headerDescription = "Comprehensive programs designed by experts to help you crack JEE, NEET, and build a strong foundation for your future.";
  if (programFilter?.toUpperCase() === 'IIT JEE') {
    headerDescription = "IIT JEE Coaching in Bangalore for JEE Main and Advanced";
  } else if (programFilter?.toUpperCase() === 'NEET') {
    headerDescription = "NEET Coaching in Bangalore for Medical Entrance Exams";
  } else if (programFilter?.toUpperCase() === 'FOUNDATION') {
    headerDescription = "Foundation Coaching in Bangalore for Classes 8 to 10";
  }

  // Animation Variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
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
          
          {/* Header */}
          <motion.div className="text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#7E3AF2] to-[#1C64F2] px-4 py-2 rounded-full mb-4 shadow-sm">
              <Sparkles className="h-5 w-5 text-white" />
              <span className="text-sm font-bold text-white uppercase tracking-wider">
                {programFilter ? `${programFilter} PROGRAMS` : 'OUR PROGRAMS'}
              </span>
            </div>
            <h2 className="text-5xl font-black text-slate-900 mb-4 tracking-tight">
              Discover Your Path to <span className="bg-gradient-to-r from-[#7E3AF2] to-[#1C64F2] bg-clip-text text-transparent">Success</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-medium">
              {headerDescription}
            </p>
          </motion.div>

          {/* Categories Grid - Only show if NO specific Program filter is applied via Navbar */}
          {!programFilter && (
            <motion.div className="grid md:grid-cols-3 gap-6 mb-20" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              {programCategories.map((category, idx) => (
                <motion.div key={idx} variants={fadeInUp} className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100 group">
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
          <div className="mb-20">
            <h3 className="text-3xl font-bold text-slate-900 mb-8 text-center">
              {programFilter ? `Explore ${programFilter} Courses` : "Explore All Programs"}
            </h3>

            {/* FILTER BAR */}
            <div className="flex flex-wrap justify-center items-center gap-4 mb-10">
              {/* Category Filter */}
              <div className="flex items-center bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm focus-within:border-indigo-500 transition-colors">
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
              </div>

              {/* Tag Filter */}
              <div className="flex items-center bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm focus-within:border-indigo-500 transition-colors">
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
              </div>

              {/* Clear All Button */}
              {(categoryFilter !== 'All' || tagFilter !== 'All') && (
                <button 
                  onClick={() => { setCategoryFilter('All'); setTagFilter('All'); }}
                  className="flex items-center gap-2 px-4 py-2.5 bg-red-50 text-red-600 rounded-xl text-sm font-bold hover:bg-red-100 transition-colors border border-red-100 shadow-sm"
                >
                  <X className="w-4 h-4" /> Clear
                </button>
              )}
            </div>
            
            {/* Courses Grid */}
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="h-12 w-12 text-[#7E3AF2] animate-spin mb-4" />
                <p className="text-slate-500 font-medium">Loading excellence...</p>
              </div>
            ) : displayedCourses.length === 0 ? (
               <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-300">
                <Filter className="h-12 w-12 text-slate-300 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-slate-900">No programs found</h3>
                <p className="text-slate-500 mt-1">Try adjusting your filters to find what you're looking for.</p>
                <button 
                  onClick={() => { setCategoryFilter('All'); setTagFilter('All'); }}
                  className="mt-6 text-indigo-600 font-bold hover:text-indigo-700 underline underline-offset-4"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" variants={staggerContainer} initial="hidden" animate="visible">
                {displayedCourses.map((course, idx) => (
                  <motion.div key={course.id || idx} variants={fadeInUp}>
                    <CourseCard 
                      course={course} 
                      index={idx} 
                      onViewDetails={() => setSelectedCourse(course)} 
                    />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>

          {/* CTA Section */}
          <motion.div className="bg-gradient-to-br from-[#7E3AF2] to-[#1C64F2] rounded-3xl p-12 text-white text-center shadow-2xl relative overflow-hidden" initial="hidden" whileInView="visible" variants={fadeInUp}>
            <h3 className="text-3xl font-bold mb-4">Not Sure Which Program is Right for You?</h3>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto font-medium">
              Our expert counselors will help you choose the perfect program based on your goals and career aspirations.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button 
                onClick={() => {
                  window.scrollTo(0, 0);
                  navigate('/contact');
                }}
                className="bg-white text-[#7E3AF2] font-bold px-8 py-3.5 rounded-xl shadow-xl hover:bg-slate-50 transition-colors"
              >
                Get Free Counseling
              </button>
              <button className="border-2 border-white text-white font-bold px-8 py-3.5 rounded-xl hover:bg-white/10 transition-colors">
                Download Brochure
              </button>
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

export default Courses;
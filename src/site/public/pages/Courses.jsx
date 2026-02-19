import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  GraduationCap, 
  Target, 
  Users, 
  Clock, 
  Award, 
  Sparkles, 
  CheckCircle,
  ArrowRight,
  Loader2
} from "lucide-react";
import { motion } from "framer-motion";
import { cmsService } from '../../services/cmsService';
import { ProgramDetailModal } from "../../components/specific/ProgramDetailModal";
import CourseCard from "../../components/specific/CourseCard";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState(null);

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

  // Animation Variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const programCategories = [
    {
      name: "JEE Preparation",
      icon: GraduationCap,
      color: "#1C64F2",
      description: "Comprehensive engineering entrance preparation",
      count: courses.filter(c => c.category?.toUpperCase().includes('JEE')).length || 2
    },
    {
      name: "NEET Preparation",
      icon: BookOpen,
      color: "#00A67E",
      description: "Complete medical entrance coaching",
      count: courses.filter(c => c.category?.toUpperCase().includes('NEET')).length || 2
    },
    {
      name: "Foundation Courses",
      icon: Target,
      color: "#F59E0B",
      description: "Building strong basics for future success",
      count: courses.filter(c => c.category?.toUpperCase().includes('FOUNDATION')).length || 2
    }
  ];

  const highlights = [
    { icon: Award, title: "Expert Faculty", description: "IIT & AIIMS alumni with proven track record" },
    { icon: Users, title: "Small Batches", description: "Personalized attention with 25-35 students per batch" },
    { icon: Target, title: "Result-Oriented", description: "95% success rate with 500+ IIT & 300+ medical selections" },
    { icon: Clock, title: "Flexible Timings", description: "School-integrated and full-time programs available" }
  ];

  return (
    <div className="min-h-screen bg-white font-sans">
      <section id="programs" className="bg-gradient-to-br from-white via-purple-50/30 to-blue-50/30 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10 py-20 px-6">
          
          {/* Header */}
          <motion.div className="text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#7E3AF2] to-[#1C64F2] px-4 py-2 rounded-full mb-4 shadow-sm">
              <Sparkles className="h-5 w-5 text-white" />
              <span className="text-sm font-bold text-white uppercase tracking-wider">OUR PROGRAMS</span>
            </div>
            <h2 className="text-5xl font-black text-slate-900 mb-4 tracking-tight">
              Discover Your Path to <span className="bg-gradient-to-r from-[#7E3AF2] to-[#1C64F2] bg-clip-text text-transparent">Success</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-medium">
              Comprehensive programs designed by experts to help you crack JEE, NEET, and build a strong foundation for your future.
            </p>
          </motion.div>

          {/* Categories */}
          <motion.div className="grid md:grid-cols-3 gap-6 mb-20" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {programCategories.map((category, idx) => (
              <motion.div key={idx} variants={fadeInUp} className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100 group">
                <div className="h-16 w-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform" style={{ background: `${category.color}20` }}>
                  <category.icon className="h-8 w-8" style={{ color: category.color }} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{category.name}</h3>
                <p className="text-slate-600 mb-4 font-medium">{category.description}</p>
                <span className="text-xs font-bold uppercase tracking-wide" style={{ color: category.color }}>{category.count} Programs</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Courses Grid */}
          <div className="mb-20">
            <h3 className="text-3xl font-bold text-slate-900 mb-10 text-center">Explore All Programs</h3>
            
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="h-12 w-12 text-[#7E3AF2] animate-spin mb-4" />
                <p className="text-slate-500 font-medium">Loading excellence...</p>
              </div>
            ) : (
              <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" variants={staggerContainer} initial="hidden" animate="visible">
                {courses.map((course, idx) => (
                  <motion.div key={course.id || idx} variants={fadeInUp}>
                    {/* Reusing CourseCard with backend data */}
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
              <button className="bg-white text-[#7E3AF2] font-bold px-8 py-3.5 rounded-xl shadow-xl">Get Free Counseling</button>
              <button className="border-2 border-white text-white font-bold px-8 py-3.5 rounded-xl">Download Brochure</button>
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
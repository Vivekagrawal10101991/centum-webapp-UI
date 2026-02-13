import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Loader2 } from 'lucide-react';
import { cmsService } from '../../services/cmsService';
import CourseCard from './CourseCard';

const FeaturedCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await cmsService.getCourses();
        // Extract only the first 6 courses for the homepage preview
        setCourses(Array.isArray(data) ? data.slice(0, 6) : []);
      } catch (err) {
        console.error('Failed to load courses', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section className="py-24 px-6 bg-white font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-purple-50 text-purple-600 px-4 py-2 rounded-full mb-6 border border-purple-100"
          >
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-bold uppercase tracking-widest">Explore Programs</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight"
          >
            Explore All <span className="text-purple-600">Programs</span>
          </motion.h2>
        </div>

        {/* Courses Grid */}
        {loading ? (
          <div className="flex flex-col justify-center items-center py-20">
            <Loader2 className="w-10 h-10 text-purple-600 animate-spin mb-4" />
            <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">Loading Programs...</span>
          </div>
        ) : (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
          >
            {courses.map((course, idx) => (
              <motion.div key={course.id || course._id || idx} variants={itemVariants}>
                <CourseCard course={course} index={idx} />
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Explore More Courses Button */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center mb-24"
        >
          <Link to="/courses">
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-xl text-base font-bold uppercase tracking-wider shadow-lg shadow-purple-600/20 transition-all flex items-center gap-2 hover:-translate-y-1">
              Explore More Courses <ArrowRight className="h-5 w-5" />
            </button>
          </Link>
        </motion.div>

        {/* --- NEW: "Not Sure Which Program is Right for You?" Banner --- */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-[#6366F1] to-[#3B82F6] rounded-[2.5rem] p-10 md:p-16 text-center shadow-2xl shadow-indigo-500/20 max-w-5xl mx-auto"
        >
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
            Not Sure Which Program is Right for You?
          </h3>
          <p className="text-white/90 text-base md:text-lg max-w-2xl mx-auto mb-10 font-medium leading-relaxed">
            Our expert counselors will help you choose the perfect program based on your goals, current preparation level, and career aspirations.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-5">
            {/* Button 1: Solid White */}
            <button className="bg-white text-indigo-600 font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto">
              Get Free Counseling
            </button>
            
            {/* Button 2: Outline / Glass (Fixed visibility) */}
            <button className="bg-white/10 border-2 border-white/50 text-white font-bold px-8 py-4 rounded-xl hover:bg-white/20 transition-all duration-300 w-full sm:w-auto backdrop-blur-sm">
              Download Brochure
            </button>
          </div>
        </motion.div>
        {/* ----------------------------------------------------------------- */}

      </div>
    </section>
  );
};

export default FeaturedCourses;
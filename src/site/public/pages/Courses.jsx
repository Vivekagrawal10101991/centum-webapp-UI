import React, { useState, useEffect } from 'react';
import { Loader2, AlertCircle, Sparkles, Filter } from 'lucide-react';
import { cmsService } from '../../services/cmsService';
import CourseCard from '../../components/specific/CourseCard';

const Courses = () => {
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const data = await cmsService.getCourses();
        setCourses(Array.isArray(data) ? data : []);
      } catch (err) {
        setError('Failed to load courses. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const categories = ['all', 'JEE', 'NEET', 'Foundation', 'Crash', 'Test'];
  
  const filteredCourses = activeFilter === 'all' 
    ? courses 
    : courses.filter(c => c.category?.toUpperCase() === activeFilter.toUpperCase());

  if (loading) return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center">
      <Loader2 className="w-10 h-10 text-purple-600 animate-spin mb-4" />
      <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Loading Catalog...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <div className="bg-gradient-to-br from-purple-50 via-white to-blue-50 py-16 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full mb-6 shadow-sm border border-purple-100">
            <Sparkles className="h-4 w-4 text-purple-600" />
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Our Programs</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight">
            Premium <span className="text-purple-600">Learning Paths</span>
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium">
            Expert-led coaching designed to help you dominate competitive exams.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-12">
        <div className="flex flex-wrap items-center gap-3 mb-12">
          <Filter className="h-4 w-4 text-slate-400 mr-2" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                activeFilter === cat 
                  ? 'bg-purple-600 text-white shadow-xl shadow-purple-200' 
                  : 'bg-white text-slate-500 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredCourses.map((course) => (
            <CourseCard 
              key={course.id || course._id} 
              course={course} // PASSING THE WHOLE OBJECT TO FIX THE CRASH
              onEnroll={(c) => console.log('Enrolling in:', c.name)} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;
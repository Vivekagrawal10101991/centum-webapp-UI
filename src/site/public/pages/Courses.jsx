import React, { useState, useEffect } from 'react';
import { 
  Target, 
  Timer,
  FileCheck,
  Loader2,
  AlertCircle
} from 'lucide-react';
import Button from '../../../components/common/Button';
import { Link } from 'react-router-dom';
import { cmsService } from '../../services/cmsService';
import CourseCard from '../../components/specific/CourseCard';

const Courses = () => {
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // FIX: Scroll to top immediately when the page loads
    window.scrollTo(0, 0);

    const fetchCourses = async () => {
      try {
        setLoading(true);
        const data = await cmsService.getCourses();
        // Ensure data is an array
        setCourses(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Failed to fetch courses:', err);
        setError('Failed to load courses. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // --- Helper to distribute colors cyclically ---
  const getColor = (index) => {
    const colors = ['blue', 'emerald', 'rose', 'purple', 'orange', 'teal', 'cyan', 'pink', 'indigo', 'red'];
    return colors[index % colors.length];
  };

  // --- Filtering Logic ---
  // Group 'regular' and 'foundation' into the main "Regular Batches" section
  const regularBatches = courses.filter(c => 
    c.category === 'regular' || c.category === 'foundation'
  );

  const crashCourses = courses.filter(c => 
    c.category === 'crash-course'
  );

  const testSeries = courses.filter(c => 
    c.category === 'test-series'
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-secondary-50 flex flex-col items-center justify-center">
        <Loader2 className="w-10 h-10 text-primary-500 animate-spin mb-4" />
        <p className="text-secondary-500 font-medium">Loading courses...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-secondary-50 flex flex-col items-center justify-center text-center px-4">
        <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
        <h3 className="text-xl font-bold text-secondary-900 mb-2">Oops! Something went wrong</h3>
        <p className="text-secondary-600 mb-6">{error}</p>
        <Button onClick={() => window.location.reload()}>Try Again</Button>
      </div>
    );
  }

  return (
    <div className="bg-secondary-50 min-h-screen pb-20">
      
      {/* ==================== HERO SECTION ==================== */}
      <div className="relative bg-gradient-to-br from-primary-50 via-white to-primary-100 py-12 overflow-hidden border-b border-primary-100">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #0056D2 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-block px-3 py-1 mb-3 text-[10px] font-bold text-primary-700 bg-white/80 rounded-full uppercase tracking-widest shadow-sm border border-primary-100">
            Our Programs
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-secondary-900 tracking-tight mb-4">
            Our Premium Courses
          </h1>
          <p className="text-xl text-secondary-600 max-w-2xl mx-auto font-light leading-relaxed mb-6">
            Choose the right path for your success. We offer specialized coaching for all major competitive exams.
          </p>
          <div className="w-16 h-1.5 bg-gradient-to-r from-primary-500 to-accent rounded-full mx-auto opacity-90"></div>
        </div>
      </div>

      {/* ==================== SECTION 1: REGULAR BATCHES ==================== */}
      {regularBatches.length > 0 && (
        <div className="container mx-auto px-4 py-16">
          <div className="flex items-center gap-3 mb-10">
            <div className="p-2 bg-primary-100 text-primary-600 rounded-lg"><Target className="w-6 h-6"/></div>
            <h2 className="text-3xl font-bold text-secondary-900">Regular Batches</h2>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8">
            {regularBatches.map((course, index) => (
              <CourseCard 
                key={course._id || course.id} 
                id={course.slug || course.id || course._id} // Prefer slug for cleaner URLs
                title={course.title}
                shortDescription={course.shortDescription}
                imageUrl={course.imageUrl}
                tag={course.tag}
                colorTheme={getColor(index)} // Assign dynamic color
              />
            ))}
          </div>
        </div>
      )}

      {/* ==================== SECTION 2: CRASH COURSES ==================== */}
      {crashCourses.length > 0 && (
        <div className="bg-white py-16 border-y border-secondary-100">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-3 mb-10">
              <div className="p-2 bg-rose-100 text-rose-600 rounded-lg"><Timer className="w-6 h-6"/></div>
              <h2 className="text-3xl font-bold text-secondary-900">Crash Courses</h2>
            </div>
            
            <div className="flex flex-wrap justify-center gap-8">
              {crashCourses.map((course, index) => (
                <CourseCard 
                  key={course._id || course.id}
                  id={course.slug || course.id || course._id}
                  title={course.title}
                  shortDescription={course.shortDescription}
                  imageUrl={course.imageUrl}
                  tag={course.tag}
                  colorTheme={getColor(index + 2)} // Offset index for variety
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ==================== SECTION 3: TEST SERIES ==================== */}
      {testSeries.length > 0 && (
        <div className="container mx-auto px-4 py-16">
          <div className="flex items-center gap-3 mb-10">
            <div className="p-2 bg-purple-100 text-purple-600 rounded-lg"><FileCheck className="w-6 h-6"/></div>
            <h2 className="text-3xl font-bold text-secondary-900">Test Series</h2>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8">
            {testSeries.map((course, index) => (
              <CourseCard 
                key={course._id || course.id}
                id={course.slug || course.id || course._id}
                title={course.title}
                shortDescription={course.shortDescription}
                imageUrl={course.imageUrl}
                tag={course.tag}
                colorTheme={getColor(index + 5)} // Offset index for variety
              />
            ))}
          </div>
        </div>
      )}

      {/* Empty State if no courses found */}
      {!loading && courses.length === 0 && (
        <div className="container mx-auto px-4 py-20 text-center">
          <h2 className="text-2xl font-bold text-gray-400">No active courses found</h2>
          <p className="text-gray-500 mt-2">Please check back later for new programs.</p>
        </div>
      )}

      {/* ==================== FOOTER CTA ==================== */}
      <div className="container mx-auto px-4 mt-8 text-center pb-10">
        <div className="inline-block p-1 rounded-2xl bg-gradient-to-r from-secondary-50 to-white shadow-sm border border-secondary-100">
          <div className="px-8 py-4 flex flex-col md:flex-row items-center gap-6">
            <div className="text-left">
              <h2 className="text-lg font-bold text-secondary-900">Not sure which course to choose?</h2>
              <p className="text-secondary-500 text-sm mt-0.5">Our academic counsellors are here to help you.</p>
            </div>
            <Link to="/contact">
              <Button variant="outline" className="rounded-lg border-secondary-200 hover:border-primary-500 hover:text-primary-600">
                Talk to Counsellors
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;
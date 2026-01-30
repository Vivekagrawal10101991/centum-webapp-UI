import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Clock, 
  BookOpen, 
  CheckCircle2, 
  AlertCircle, 
  FileText,
  Share2,
  Calendar,
  Award
} from 'lucide-react';
import { cmsService } from '../../services/cmsService';
import Button from '../../../components/common/Button';

const CourseDetail = () => {
  const { slug } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        setLoading(true);
        const data = await cmsService.getCourseBySlug(slug);
        
        if (!data) {
          setError('Course not found');
        } else {
          setCourse(data);
        }
      } catch (err) {
        console.error(err);
        setError('Failed to load course details');
      } finally {
        setLoading(false);
      }
    };

    fetchCourseData();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
        <AlertCircle className="w-16 h-16 text-gray-400 mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Course Not Found</h2>
        <p className="text-gray-600 mb-6">The course you are looking for does not exist or has been removed.</p>
        <Link to="/courses">
          <Button variant="outline">Browse All Courses</Button>
        </Link>
      </div>
    );
  }

  // --- DATA MAPPING (DB Schema -> Component) ---
  // We handle both snake_case (DB default) and camelCase (API transformed)
  const title = course.title;
  const tag = course.tag;
  const image = course.image_url || course.imageUrl || "https://via.placeholder.com/1920x600?text=Course+Banner";
  const desc = course.short_description || course.shortDescription;
  
  // Parse the JSONB 'details' column
  const details = course.details || {};
  const { 
    about, 
    curriculum = [], 
    price = { original: 0, discounted: 0 } 
  } = details;

  const discountPercentage = price.original > 0 
    ? Math.round(((price.original - price.discounted) / price.original) * 100) 
    : 0;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      
      {/* --- HERO SECTION --- */}
      <div className="relative bg-blue-900 text-white overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-blue-900 via-blue-900/80 to-blue-900/60"></div>
        </div>

        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          <div className="max-w-4xl">
            {tag && (
              <span className="inline-block px-3 py-1 mb-6 text-xs font-bold tracking-widest uppercase bg-blue-500/30 border border-blue-400/50 rounded-full text-blue-100">
                {tag}
              </span>
            )}
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6 leading-tight">
              {title}
            </h1>
            <p className="text-xl text-blue-100/90 font-light leading-relaxed max-w-2xl mb-8">
              {desc}
            </p>
            
            <div className="flex flex-wrap gap-6 text-sm font-medium text-blue-200">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-400" />
                <span>New Batch Starting Soon</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-blue-400" />
                <span>Certified Program</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- MAIN CONTENT GRID --- */}
      <div className="container mx-auto px-4 -mt-10 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT COLUMN: Content */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Navigation Tabs */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-2 flex overflow-x-auto">
              <button 
                onClick={() => setActiveTab('overview')}
                className={`flex-1 py-3 px-6 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${
                  activeTab === 'overview' ? 'bg-blue-50 text-blue-700' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Overview
              </button>
              <button 
                onClick={() => setActiveTab('curriculum')}
                className={`flex-1 py-3 px-6 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${
                  activeTab === 'curriculum' ? 'bg-blue-50 text-blue-700' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Curriculum ({curriculum.length})
              </button>
            </div>

            {/* Content Area */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 min-h-[400px]">
              
              {activeTab === 'overview' && (
                <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <FileText className="w-6 h-6 text-blue-600" />
                    About This Course
                  </h3>
                  <div className="prose prose-blue max-w-none text-gray-600 leading-relaxed whitespace-pre-line">
                    {about || "No detailed description available for this course yet."}
                  </div>
                </div>
              )}

              {activeTab === 'curriculum' && (
                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <BookOpen className="w-6 h-6 text-blue-600" />
                    Syllabus & Topics
                  </h3>
                  
                  {curriculum.length > 0 ? (
                    curriculum.map((item, idx) => (
                      <div key={idx} className="border border-gray-200 rounded-xl overflow-hidden hover:border-blue-300 transition-colors">
                        <div className="bg-gray-50 p-4 flex flex-col md:flex-row md:items-center justify-between gap-2">
                          <span className="font-bold text-gray-800 flex items-center gap-2">
                            <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm">
                              {idx + 1}
                            </span>
                            {item.subject}
                          </span>
                        </div>
                        <div className="p-4 bg-white text-sm text-gray-600 border-t border-gray-100">
                          {Array.isArray(item.topics) ? (
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              {item.topics.map((topic, tIdx) => (
                                <li key={tIdx} className="flex items-start gap-2">
                                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                                  <span>{topic}</span>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p>{item.topics || "Topics to be announced."}</p>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-10 text-gray-400">
                      <BookOpen className="w-12 h-12 mx-auto mb-2 opacity-50" />
                      <p>Curriculum details coming soon.</p>
                    </div>
                  )}
                </div>
              )}

            </div>
          </div>

          {/* RIGHT COLUMN: Sidebar (Pricing & Action) */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sticky top-24">
              <div className="mb-6">
                <p className="text-sm text-gray-500 font-medium mb-1">Total Course Fee</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-extrabold text-gray-900">
                    ₹{price.discounted?.toLocaleString()}
                  </span>
                  {price.original > price.discounted && (
                    <span className="text-lg text-gray-400 line-through">
                      ₹{price.original?.toLocaleString()}
                    </span>
                  )}
                </div>
                {discountPercentage > 0 && (
                  <div className="mt-2 inline-block px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full uppercase tracking-wide">
                    {discountPercentage}% Discount Active
                  </div>
                )}
              </div>

              <Link to="/contact">
                <Button className="w-full py-4 text-lg font-bold shadow-blue-200 shadow-xl mb-4">
                  Enroll Now
                </Button>
              </Link>
              
              <Link to="/contact">
                <button className="w-full py-3 text-gray-600 font-medium border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                  Request Callback
                </button>
              </Link>

              <div className="mt-6 pt-6 border-t border-gray-100 space-y-4">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                    <Clock className="w-4 h-4" />
                  </div>
                  <span>Flexible Schedule</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <span>Comprehensive Material</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <div className="p-2 bg-orange-50 text-orange-600 rounded-lg">
                    <Share2 className="w-4 h-4" />
                  </div>
                  <span>Lifetime Access</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { cmsService } from '../../services/cmsService';
import { 
  CheckCircle2, 
  ArrowLeft, 
  BookOpen, 
  Share2, 
  Clock, 
  ShieldCheck,
  Tag,
  Sparkles,
  Zap,
  Beaker,
  Calculator,
  Microscope,
  BrainCircuit,
  Globe
} from 'lucide-react';
import Button from '../../../components/common/Button';

const CourseDetail = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const allCourses = await cmsService.getAllCourses();
        const foundCourse = allCourses.find(c => c.id === courseId || c.slug === courseId);
        
        if (foundCourse) {
          setCourse(foundCourse);
        } else {
          console.error("Course not found");
        }
      } catch (error) {
        console.error("Failed to fetch course details:", error);
      } finally {
        setLoading(false);
      }
    };
    
    if (courseId) fetchCourse();
  }, [courseId]);

  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-gray-50">
      <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  if (!course) return (
    <div className="min-h-screen flex flex-col items-center justify-center text-gray-500 gap-4">
      <h2 className="text-xl font-bold">Course Not Found</h2>
      <Link to="/courses"><Button variant="outline">Back to Courses</Button></Link>
    </div>
  );

  // --- 1. DYNAMIC THEME GENERATOR (Samsung Style) ---
  const theme = course.colorTheme || 'primary';
  
  const themeStyles = {
    primary: { 
      cardBg: "bg-blue-50/80", borderColor: "border-blue-100", textColor: "text-blue-900", accentColor: "text-blue-600",
      btnGradient: "bg-gradient-to-r from-blue-600 to-indigo-600", lightBadge: "bg-blue-100 text-blue-700"
    },
    emerald: { 
      cardBg: "bg-emerald-50/80", borderColor: "border-emerald-100", textColor: "text-emerald-900", accentColor: "text-emerald-600",
      btnGradient: "bg-gradient-to-r from-emerald-600 to-teal-600", lightBadge: "bg-emerald-100 text-emerald-700"
    },
    rose: { 
      cardBg: "bg-rose-50/80", borderColor: "border-rose-100", textColor: "text-rose-900", accentColor: "text-rose-600",
      btnGradient: "bg-gradient-to-r from-rose-600 to-pink-600", lightBadge: "bg-rose-100 text-rose-700"
    },
    purple: { 
      cardBg: "bg-purple-50/80", borderColor: "border-purple-100", textColor: "text-purple-900", accentColor: "text-purple-600",
      btnGradient: "bg-gradient-to-r from-purple-600 to-indigo-600", lightBadge: "bg-purple-100 text-purple-700"
    },
    orange: { 
      cardBg: "bg-orange-50/80", borderColor: "border-orange-100", textColor: "text-orange-900", accentColor: "text-orange-600",
      btnGradient: "bg-gradient-to-r from-orange-600 to-amber-600", lightBadge: "bg-orange-100 text-orange-700"
    },
  }[theme] || themeStyles['primary'];

  // --- 2. SUBJECT COLOR MAPPING (Colorful Divs) ---
  const getSubjectStyle = (subjectName) => {
    const sub = subjectName?.toLowerCase() || '';
    if (sub.includes('physic')) return { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-200', icon: Zap, iconColor: 'text-blue-600' };
    if (sub.includes('chem')) return { bg: 'bg-orange-100', text: 'text-orange-700', border: 'border-orange-200', icon: Beaker, iconColor: 'text-orange-600' };
    if (sub.includes('math')) return { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-200', icon: Calculator, iconColor: 'text-red-600' };
    if (sub.includes('bio')) return { bg: 'bg-emerald-100', text: 'text-emerald-700', border: 'border-emerald-200', icon: Microscope, iconColor: 'text-emerald-600' };
    if (sub.includes('logic') || sub.includes('reason')) return { bg: 'bg-purple-100', text: 'text-purple-700', border: 'border-purple-200', icon: BrainCircuit, iconColor: 'text-purple-600' };
    return { bg: 'bg-gray-100', text: 'text-gray-700', border: 'border-gray-200', icon: Globe, iconColor: 'text-gray-600' };
  };

  const { original, discounted, currency } = course.details?.price || {};
  const discountPercentage = original > 0 ? Math.round(((original - discounted) / original) * 100) : 0;
  const formatPrice = (amount, curr = 'INR') => new Intl.NumberFormat('en-IN', { style: 'currency', currency: curr, maximumFractionDigits: 0 }).format(amount || 0);

  return (
    <div className="bg-[#fcfdfe] min-h-screen pb-20 pt-10 font-sans">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Back Navigation */}
        <Link to="/courses" className="inline-flex items-center gap-2 text-gray-500 hover:text-blue-600 mb-8 transition-colors font-medium">
          <ArrowLeft className="w-4 h-4" /> Back to Courses
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* =========================================================
             LEFT SIDE: Sticky Course Card (Samsung UI Style)
             ========================================================= */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-4">
            
            {/* Main Card */}
            <div className={`
              ${themeStyles.cardBg} 
              rounded-2xl 
              p-5 
              shadow-[0_8px_30px_rgba(0,0,0,0.04)] 
              border ${themeStyles.borderColor} 
              backdrop-blur-sm
            `}>
              {/* Image Container */}
              <div className="relative h-60 w-full rounded-xl overflow-hidden bg-white/50 mb-5 shadow-inner group">
                {course.imageUrl ? (
                  <img src={course.imageUrl} alt={course.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"/>
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-300"><BookOpen className="w-12 h-12" /></div>
                )}
                {discountPercentage > 0 && (
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-gray-900 text-[10px] font-black px-3 py-1.5 rounded-lg shadow-sm uppercase tracking-wider">
                    {discountPercentage}% Save
                  </div>
                )}
              </div>

              {/* Pricing */}
              <div className="px-1 mb-6">
                <p className={`text-xs font-bold uppercase tracking-widest opacity-60 mb-1 ${themeStyles.textColor}`}>Total Fee</p>
                <div className="flex items-baseline gap-3">
                  <span className={`text-3xl font-black ${themeStyles.textColor}`}>{formatPrice(discounted, currency)}</span>
                  {original > discounted && <span className="text-sm text-gray-400 line-through font-semibold decoration-2">{formatPrice(original, currency)}</span>}
                </div>
                <p className={`text-[10px] font-bold mt-2 flex items-center gap-1 opacity-80 ${themeStyles.accentColor}`}>
                  <ShieldCheck className="w-3 h-3" /> Best Price Guaranteed
                </p>
              </div>

              {/* Buttons */}
              <div className="space-y-3">
                <Link to="/contact">
                  <Button className={`w-full py-3.5 rounded-xl text-white font-bold shadow-lg shadow-black/5 active:scale-95 transition-transform ${themeStyles.btnGradient}`}>
                    Enquire Now
                  </Button>
                </Link>
                <button className={`w-full py-3 rounded-xl bg-white font-bold hover:bg-white/80 transition-colors flex items-center justify-center gap-2 border border-white/50 ${themeStyles.accentColor}`}>
                   <Share2 className="w-4 h-4" /> Share Course
                </button>
              </div>
            </div>

            {/* Mini Info Card */}
            <div className={`rounded-2xl p-5 border ${themeStyles.borderColor} bg-white`}>
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl ${themeStyles.lightBadge}`}>
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">Limited Seats</h4>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">Admissions are closing soon for this batch. Secure your spot today.</p>
                </div>
              </div>
            </div>
          </div>


          {/* =========================================================
             RIGHT SIDE: Details Content (Colorful & Vibrant)
             ========================================================= */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Header Area */}
            <div>
              <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest mb-4 border ${themeStyles.lightBadge} ${themeStyles.borderColor}`}>
                <Tag className="w-3 h-3" />
                {course.category}
              </div>
              <h1 className="text-3xl md:text-5xl font-black text-gray-900 leading-tight mb-4 tracking-tight">{course.title}</h1>
              {course.tag && (
                 <span className="inline-block px-3 py-1.5 bg-gray-100 rounded-lg text-gray-600 text-xs font-bold uppercase tracking-wider">
                   {course.tag}
                 </span>
              )}
            </div>

            {/* --- DIFFERENT COLORED DIV #1: ABOUT SECTION (Soft Violet) --- */}
            <div className="bg-violet-50/50 rounded-3xl p-8 shadow-sm border border-violet-100 hover:border-violet-200 transition-colors">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-3 text-violet-700">
                <div className="p-2 bg-violet-100 rounded-lg"><Sparkles className="w-5 h-5 text-violet-600" /></div>
                About this Course
              </h2>
              <div className="prose prose-gray leading-relaxed text-gray-600 max-w-none">
                {course.details?.about?.split('\n').map((line, i) => (
                  <p key={i} className="mb-4 text-base">{line}</p>
                ))}
              </div>
            </div>

            {/* --- DIFFERENT COLORED DIV #2: CURRICULUM SECTION (Soft Teal) --- */}
            <div className="bg-teal-50/50 rounded-3xl p-8 shadow-sm border border-teal-100 hover:border-teal-200 transition-colors">
               <h2 className="text-xl font-bold mb-8 flex items-center gap-3 text-teal-700">
                <div className="p-2 bg-teal-100 rounded-lg"><BookOpen className="w-5 h-5 text-teal-600" /></div>
                Course Curriculum
              </h2>
              
              <div className="space-y-4">
                {course.details?.curriculum?.length > 0 ? (
                  course.details.curriculum.map((item, index) => {
                    // Get dynamic styles based on subject name
                    const style = getSubjectStyle(item.subject);
                    const SubjectIcon = style.icon;

                    return (
                      <div 
                        key={index} 
                        className="group bg-white border border-gray-100 hover:border-gray-200 rounded-2xl p-5 transition-all duration-300 hover:shadow-md"
                      >
                        <div className="flex flex-col md:flex-row md:items-start md:gap-6">
                          
                          {/* Colorful Subject Badge */}
                          <div className="md:w-1/4 mb-3 md:mb-0">
                             <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border ${style.bg} ${style.border} ${style.text} shadow-sm`}>
                               <SubjectIcon className={`w-3.5 h-3.5 ${style.iconColor}`} />
                               <span className="text-sm font-bold">{item.subject}</span>
                             </div>
                          </div>
                          
                          {/* Topics with Check Icons */}
                          <div className="md:w-3/4">
                            <div className="flex flex-wrap gap-2">
                              {item.topics?.map((topic, tIndex) => (
                                <span 
                                  key={tIndex} 
                                  className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-50 text-gray-600 text-xs font-semibold rounded-lg border border-gray-200 group-hover:bg-white group-hover:border-gray-300 transition-colors"
                                >
                                  <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                                  {topic}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center py-10 text-gray-400 bg-white/50 rounded-2xl border border-dashed border-gray-300 text-sm">
                    Detailed curriculum will be updated shortly.
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
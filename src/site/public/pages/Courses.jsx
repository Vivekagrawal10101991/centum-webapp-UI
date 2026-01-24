import React from 'react';
import { 
  Target, 
  Atom,          // For JEE Advance
  Dna,           // For NEET
  Award,         // For KCET
  Layers,        // For Foundation
  ArrowRight
} from 'lucide-react';
import Button from '../../../components/common/Button';
import { Link } from 'react-router-dom';

const Courses = () => {
  const coursesList = [
    {
      id: 'jee-mains',
      title: 'JEE MAINS',
      description: 'Comprehensive preparation for JEE Mains with focus on speed, accuracy, and NCERT fundamentals.',
      icon: Target,
      color: 'blue',
      link: '/courses/jee-mains'
    },
    {
      id: 'jee-advance',
      title: 'JEE ADVANCE',
      description: 'Deep dive into advanced concepts, analytical problem solving, and rigorous testing for IIT entrance.',
      icon: Atom,
      color: 'orange',
      link: '/courses/jee-advance'
    },
    {
      id: 'neet',
      title: 'NEET',
      description: 'Expert guidance for Medical Entrance covering Physics, Chemistry, and Biology with high yield strategies.',
      icon: Dna,
      color: 'emerald',
      link: '/courses/neet'
    },
    {
      id: 'kcet',
      title: 'KCET',
      description: 'Specialized coaching for Karnataka Common Entrance Test ensuring top ranks in state engineering colleges.',
      icon: Award,
      color: 'purple',
      link: '/courses/kcet'
    },
    {
      id: 'foundation',
      title: 'FOUNDATION',
      description: 'Building strong bases for Class 8, 9 & 10. Early preparation for Olympiads and JEE/NEET.',
      icon: Layers,
      color: 'rose',
      link: '/courses/foundation'
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      
      {/* ==================== HERO SECTION (Updated: Reduced Height) ==================== */}
      <div className="relative bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-12 overflow-hidden border-b border-indigo-100/50">
        {/* Radial Pattern Overlay */}
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #1e3a8a 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          {/* Breadcrumb / Tag - Reduced bottom margin */}
          <div className="inline-block px-3 py-1 mb-3 text-[10px] font-semibold text-indigo-700 bg-white/60 rounded-full uppercase tracking-widest shadow-sm border border-indigo-100/50">
            Our Programs
          </div>
          
          {/* Heading - Reduced bottom margin */}
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight mb-4">
            Our Premium Courses
          </h1>
          
          {/* Subheading - Reduced bottom margin */}
          <p className="text-xl text-gray-600 max-w-2xl mx-auto font-light leading-relaxed mb-6">
            Choose the right path for your success. We offer specialized coaching for all major competitive exams.
          </p>

          {/* Decorative Line */}
          <div className="w-12 h-1 bg-indigo-500 rounded-full mx-auto opacity-90"></div>
        </div>
      </div>

      {/* ==================== COURSE CARDS ==================== */}
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-wrap justify-center gap-8">
          {coursesList.map((course) => {
            const Icon = course.icon;
            
            // Premium Styling Config (Faded/Pastel Gradients)
            const styles = {
              blue: {
                iconBg: "bg-blue-50 text-blue-500",
                gradient: "bg-gradient-to-r from-blue-400 to-cyan-400 hover:shadow-blue-100",
                border: "border-blue-100 hover:border-blue-200"
              },
              orange: {
                iconBg: "bg-orange-50 text-orange-500",
                gradient: "bg-gradient-to-r from-orange-400 to-rose-400 hover:shadow-orange-100",
                border: "border-orange-100 hover:border-orange-200"
              },
              emerald: {
                iconBg: "bg-emerald-50 text-emerald-500",
                gradient: "bg-gradient-to-r from-emerald-400 to-teal-400 hover:shadow-emerald-100",
                border: "border-emerald-100 hover:border-emerald-200"
              },
              purple: {
                iconBg: "bg-purple-50 text-purple-500",
                gradient: "bg-gradient-to-r from-violet-400 to-fuchsia-400 hover:shadow-purple-100",
                border: "border-purple-100 hover:border-purple-200"
              },
              rose: {
                iconBg: "bg-rose-50 text-rose-500",
                gradient: "bg-gradient-to-r from-rose-400 to-pink-400 hover:shadow-rose-100",
                border: "border-rose-100 hover:border-rose-200"
              }
            };

            const activeStyle = styles[course.color];

            return (
              <div 
                key={course.id}
                className={`
                  group bg-white rounded-xl p-6 
                  w-full max-w-[340px] flex-shrink-0
                  shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_10px_30px_rgb(0,0,0,0.06)] 
                  transition-all duration-300 transform hover:-translate-y-2
                  border ${activeStyle.border}
                  flex flex-col
                `}
              >
                {/* Icon */}
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 duration-300 ${activeStyle.iconBg}`}>
                  <Icon className="w-7 h-7" />
                </div>
                
                {/* Content */}
                <h3 className="text-2xl font-bold text-gray-900 mb-3 tracking-tight">{course.title}</h3>
                <p className="text-gray-500 mb-8 leading-relaxed flex-grow font-light">
                  {course.description}
                </p>
                
                {/* Gradient Button */}
                <Link to={course.link} className="mt-auto">
                  <button className={`
                    w-full py-3.5 px-6 rounded-xl text-white font-medium 
                    flex items-center justify-center space-x-2 
                    transition-all duration-300 shadow-md hover:shadow-lg
                    ${activeStyle.gradient}
                  `}>
                    <span>Explore Course</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      {/* ==================== ADDITIONAL INFO ==================== */}
      <div className="container mx-auto px-4 mt-8 text-center">
        <div className="inline-block p-1 rounded-2xl bg-gradient-to-r from-gray-100 to-gray-50">
          <div className="bg-white px-8 py-6 rounded-xl flex flex-col md:flex-row items-center gap-6 shadow-sm">
            <div className="text-left">
              <h2 className="text-xl font-bold text-gray-800">Not sure which course to choose?</h2>
              <p className="text-gray-500 text-sm mt-1">Our academic counsellors are here to help you.</p>
            </div>
            <Link to="/contact">
              <Button variant="outline" className="rounded-lg border-gray-300 hover:border-indigo-600 hover:text-indigo-600">
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
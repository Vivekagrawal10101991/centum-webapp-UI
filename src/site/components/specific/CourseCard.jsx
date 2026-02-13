import React from 'react';
import { useNavigate } from 'react-router-dom'; // Added for navigation
import { BookOpen, Clock, Users, CheckCircle, IndianRupee, ArrowRight } from 'lucide-react';

const CourseCard = ({ course }) => {
  const navigate = useNavigate();

  // Map categories to Figma gradients
  const categoryStyles = {
    JEE: "from-[#7E3AF2] to-[#6749D4]",
    NEET: "from-[#00A67E] to-[#065F46]",
    Foundation: "from-[#F59E0B] to-[#D97706]",
    Crash: "from-[#EF4444] to-[#B91C1C]",
    Test: "from-[#1C64F2] to-[#1E40AF]"
  };

  const gradient = categoryStyles[course.category] || categoryStyles.JEE;

  // Function to handle clicking anywhere on the card or the button
  const handleViewDetails = () => {
    // Navigate using the slug or ID
    const path = course.slug || course.id || course._id;
    navigate(`/courses/${path}`);
  };

  return (
    <div 
      onClick={handleViewDetails}
      className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-2xl transition-all duration-300 group hover:-translate-y-2 cursor-pointer"
    >
      {/* Course Header */}
      <div className={`bg-gradient-to-br ${gradient} p-6 text-white relative`}>
        <div className="flex items-start justify-between mb-4">
          <div className="p-3 bg-white/20 backdrop-blur-md rounded-xl border border-white/30">
            <BookOpen className="h-6 w-6" />
          </div>
          <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/30">
            {course.category}
          </span>
        </div>
        <h3 className="text-xl font-black mb-2 leading-tight group-hover:scale-105 transition-transform origin-left">
          {course.title || course.name}
        </h3>
        <p className="text-sm text-white/80 line-clamp-2">{course.shortDescription || course.description}</p>
      </div>

      {/* Course Details */}
      <div className="p-6">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-tighter">
            <Clock className="h-4 w-4 text-purple-500" />
            <span>{course.duration || "2 Years"}</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-tighter">
            <Users className="h-4 w-4 text-purple-500" />
            <span>{course.batchSize || "30-35 Students"}</span>
          </div>
        </div>

        {/* Features Preview */}
        <div className="mb-6 space-y-2">
          {(course.features || []).slice(0, 3).map((feature, idx) => (
            <div key={idx} className="flex items-center gap-2 text-sm text-slate-600">
              <CheckCircle className="h-4 w-4 text-emerald-500 flex-shrink-0" />
              <span className="font-medium">{feature}</span>
            </div>
          ))}
        </div>

        {/* Price & Action */}
        <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Full Course Fee</p>
            <div className="flex items-center gap-1">
              <IndianRupee className="h-4 w-4 text-slate-900" />
              <span className="text-2xl font-black text-slate-900">
                {(course.price || 0).toLocaleString()}
              </span>
            </div>
          </div>
          <button 
            className="h-12 w-12 bg-slate-900 hover:bg-purple-600 text-white rounded-xl flex items-center justify-center transition-all shadow-lg active:scale-90"
          >
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
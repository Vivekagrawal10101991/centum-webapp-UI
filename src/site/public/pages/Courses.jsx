import React from 'react';
import { 
  Target, 
  Atom,          
  Dna,           
  Award,         
  Layers,        
  ArrowRight,
  Zap,
  Rocket,
  Timer,
  FileCheck,
  BookOpen,
  Sigma,
  PenTool,
  Globe,
  Cpu
} from 'lucide-react';
import Button from '../../../components/common/Button';
import { Link } from 'react-router-dom';

const Courses = () => {

  // --- DATA CONFIGURATION ---

  const regularBatches = [
    {
      id: 'reg-jee-school',
      title: 'JEE MAIN + ADV + KCET',
      tag: 'School Integrated Program',
      description: 'Complete syllabus coverage integrated with school curriculum. Stress-free preparation.',
      icon: Target,
      color: 'primary',
      link: '/courses/jee-mains'
    },
    {
      id: 'reg-jee-weekend',
      title: 'JEE MAIN + ADV + KCET',
      tag: 'Weekends Batch',
      description: 'Intensive weekend classes designed for students who want focused prep without disturbing school days.',
      icon: Atom,
      color: 'blue', // Variation
      link: '/courses/jee-advance'
    },
    {
      id: 'reg-neet-school',
      title: 'NEET',
      tag: 'School Integrated Program',
      description: 'Two-year integrated program for medical aspirants covering Boards + NEET syllabus simultaneously.',
      icon: Dna,
      color: 'emerald',
      link: '/courses/neet'
    },
    {
      id: 'reg-neet-weekend',
      title: 'NEET',
      tag: 'WEEKEND BATCHES',
      description: 'Specialized weekend sessions focusing on high-yield topics and rigorous testing for NEET.',
      icon: Dna, // Same icon, different tag
      color: 'teal', // Variation
      link: '/courses/neet'
    },
    {
      id: 'reg-found-school',
      title: 'FOUNDATIONAL',
      tag: 'School Integrated Program',
      description: 'Strong foundation building for Class 8, 9 & 10 embedded within the school timetable.',
      icon: Layers,
      color: 'rose',
      link: '/courses/foundation'
    },
    {
      id: 'reg-found-weekend',
      title: 'FOUNDATIONAL',
      tag: 'WEEKEND',
      description: 'Concept strengthening weekend classes for early starters aiming for Olympiads.',
      icon: Layers,
      color: 'pink', // Variation
      link: '/courses/foundation'
    },
    {
      id: 'reg-sigma',
      title: 'SIGMA BATCH',
      tag: 'JEE ADVANCE ONLINE BATCH',
      description: 'Elite online batch for top rankers focusing purely on advanced problem solving and analysis.',
      icon: Sigma,
      color: 'orange',
      link: '/courses/jee-advance'
    },
    {
      id: 'reg-accelerator',
      title: 'ACCELERATOR BATCH',
      tag: 'OLYMPIAD PREPERATION',
      description: 'Dedicated mentorship for Mathematics and Science Olympiads (RMO, INMO, NSEJS).',
      icon: Rocket,
      color: 'purple',
      link: '/contact'
    }
  ];

  const crashCourses = [
    { id: 'cc-jee-mains', title: 'JEE MAIN', icon: Target, color: 'blue', link: '/courses/jee-mains' },
    { id: 'cc-jee-adv', title: 'JEE ADVANCE', icon: Atom, color: 'orange', link: '/courses/jee-advance' },
    { id: 'cc-kcet', title: 'KCET', icon: Award, color: 'purple', link: '/courses/kcet' },
    { id: 'cc-neet', title: 'NEET', icon: Dna, color: 'emerald', link: '/courses/neet' },
    { id: 'cc-10', title: 'CLASS 10', icon: BookOpen, color: 'rose', link: '/courses/foundation' },
    { id: 'cc-12', title: 'CLASS 12', icon: BookOpen, color: 'indigo', link: '/contact' },
  ];

  const testSeries = [
    { id: 'ts-jee-m', title: 'JEE MAIN', icon: FileCheck, color: 'blue', link: '/contact' },
    { id: 'ts-jee-a', title: 'JEE ADVANCE', icon: FileCheck, color: 'orange', link: '/contact' },
    { id: 'ts-kcet', title: 'KCET', icon: FileCheck, color: 'purple', link: '/contact' },
    { id: 'ts-neet', title: 'NEET', icon: FileCheck, color: 'emerald', link: '/contact' },
    { id: 'ts-10', title: '10th BOARDS', icon: PenTool, color: 'rose', link: '/contact' },
    { id: 'ts-viteee', title: 'VITEEE', icon: Globe, color: 'cyan', link: '/contact' },
    { id: 'ts-bitsat', title: 'BITSAT', icon: Cpu, color: 'red', link: '/contact' },
    { id: 'ts-cuet', title: 'CUET', icon: BookOpen, color: 'teal', link: '/contact' },
  ];


  // --- HELPER COMPONENT FOR CARDS ---
  const CourseCard = ({ title, description, icon: Icon, color, tag, link }) => {
    // Styles mapping (Extended for new variations)
    const styles = {
      primary: { iconBg: "bg-primary-50 text-primary-600", gradient: "bg-gradient-to-r from-primary-500 to-blue-400", border: "border-primary-100 hover:border-primary-200", tagBg: "bg-primary-100 text-primary-700" },
      blue: { iconBg: "bg-blue-50 text-blue-500", gradient: "bg-gradient-to-r from-blue-400 to-cyan-400", border: "border-blue-100 hover:border-blue-200", tagBg: "bg-blue-100 text-blue-700" },
      orange: { iconBg: "bg-orange-50 text-orange-500", gradient: "bg-gradient-to-r from-orange-400 to-rose-400", border: "border-orange-100 hover:border-orange-200", tagBg: "bg-orange-100 text-orange-700" },
      emerald: { iconBg: "bg-emerald-50 text-emerald-500", gradient: "bg-gradient-to-r from-emerald-400 to-teal-400", border: "border-emerald-100 hover:border-emerald-200", tagBg: "bg-emerald-100 text-emerald-700" },
      teal: { iconBg: "bg-teal-50 text-teal-500", gradient: "bg-gradient-to-r from-teal-400 to-emerald-400", border: "border-teal-100 hover:border-teal-200", tagBg: "bg-teal-100 text-teal-700" },
      purple: { iconBg: "bg-purple-50 text-purple-500", gradient: "bg-gradient-to-r from-purple-500 to-fuchsia-400", border: "border-purple-100 hover:border-purple-200", tagBg: "bg-purple-100 text-purple-700" },
      rose: { iconBg: "bg-rose-50 text-rose-500", gradient: "bg-gradient-to-r from-rose-500 to-pink-400", border: "border-rose-100 hover:border-rose-200", tagBg: "bg-rose-100 text-rose-700" },
      pink: { iconBg: "bg-pink-50 text-pink-500", gradient: "bg-gradient-to-r from-pink-400 to-rose-400", border: "border-pink-100 hover:border-pink-200", tagBg: "bg-pink-100 text-pink-700" },
      indigo: { iconBg: "bg-indigo-50 text-indigo-500", gradient: "bg-gradient-to-r from-indigo-400 to-purple-400", border: "border-indigo-100 hover:border-indigo-200", tagBg: "bg-indigo-100 text-indigo-700" },
      cyan: { iconBg: "bg-cyan-50 text-cyan-500", gradient: "bg-gradient-to-r from-cyan-400 to-blue-400", border: "border-cyan-100 hover:border-cyan-200", tagBg: "bg-cyan-100 text-cyan-700" },
      red: { iconBg: "bg-red-50 text-red-500", gradient: "bg-gradient-to-r from-red-500 to-orange-400", border: "border-red-100 hover:border-red-200", tagBg: "bg-red-100 text-red-700" },
    };

    const activeStyle = styles[color] || styles.primary;

    return (
      <div className={`
        group bg-white rounded-2xl p-6 
        w-full max-w-[340px] flex-shrink-0
        shadow-[0_4px_20px_rgb(0,0,0,0.02)] hover:shadow-[0_15px_30px_rgb(0,0,0,0.08)] 
        transition-all duration-300 transform hover:-translate-y-2
        border ${activeStyle.border}
        flex flex-col relative overflow-hidden
      `}>
        {/* Top Right Tag (Only if exists) */}
        {tag && (
          <div className={`absolute top-0 right-0 px-4 py-1.5 rounded-bl-xl text-[10px] font-bold uppercase tracking-wider ${activeStyle.tagBg}`}>
            {tag}
          </div>
        )}

        {/* Icon */}
        <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 duration-300 ${activeStyle.iconBg}`}>
          <Icon className="w-7 h-7" />
        </div>
        
        {/* Content */}
        <h3 className="text-xl font-bold text-secondary-900 mb-3 tracking-tight leading-tight">{title}</h3>
        {description && (
          <p className="text-secondary-600 mb-8 leading-relaxed flex-grow font-light text-sm">
            {description}
          </p>
        )}
        
        {/* Spacer if no description (for crash course/test series to align buttons) */}
        {!description && <div className="mb-6 flex-grow"></div>}

        {/* Gradient Button */}
        <Link to={link} className="mt-auto">
          <button className={`
            w-full py-3.5 px-6 rounded-xl text-white font-medium 
            flex items-center justify-center space-x-2 
            transition-all duration-300 shadow-lg hover:shadow-xl
            ${activeStyle.gradient}
          `}>
            <span>Explore</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </Link>
      </div>
    );
  };


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
      <div className="container mx-auto px-4 py-16">
        <div className="flex items-center gap-3 mb-10">
          <div className="p-2 bg-primary-100 text-primary-600 rounded-lg"><Target className="w-6 h-6"/></div>
          <h2 className="text-3xl font-bold text-secondary-900">Regular Batches</h2>
        </div>
        
        <div className="flex flex-wrap justify-center gap-8">
          {regularBatches.map((batch) => (
            <CourseCard key={batch.id} {...batch} />
          ))}
        </div>
      </div>

      {/* ==================== SECTION 2: CRASH COURSES ==================== */}
      <div className="bg-white py-16 border-y border-secondary-100">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-10">
            <div className="p-2 bg-rose-100 text-rose-600 rounded-lg"><Timer className="w-6 h-6"/></div>
            <h2 className="text-3xl font-bold text-secondary-900">Crash Courses</h2>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8">
            {crashCourses.map((course) => (
              <CourseCard key={course.id} {...course} description="Fast-track your preparation with our intensive crash course modules." />
            ))}
          </div>
        </div>
      </div>

      {/* ==================== SECTION 3: TEST SERIES ==================== */}
      <div className="container mx-auto px-4 py-16">
        <div className="flex items-center gap-3 mb-10">
          <div className="p-2 bg-purple-100 text-purple-600 rounded-lg"><FileCheck className="w-6 h-6"/></div>
          <h2 className="text-3xl font-bold text-secondary-900">Test Series</h2>
        </div>
        
        <div className="flex flex-wrap justify-center gap-8">
          {testSeries.map((test) => (
            <CourseCard key={test.id} {...test} description="Simulate the real exam environment with our All India Test Series." />
          ))}
        </div>
      </div>

      {/* ==================== FOOTER CTA ==================== */}
      <div className="container mx-auto px-4 mt-8 text-center">
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
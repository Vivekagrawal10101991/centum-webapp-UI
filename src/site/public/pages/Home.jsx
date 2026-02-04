import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  HeroSection, 
  StatsSection, 
  ToppersSection, 
  TestimonialsSection,
  MentorsSection
} from '../../components/specific';
import { Button } from '../../../components/common';
import { 
  ArrowRight, 
  Trophy, 
  UserCheck, 
  Calendar, 
  GraduationCap, 
  TrendingUp,
  Target,
  Zap,
  Cpu,
  BarChart3,
  Microscope,
  Lightbulb,
  ClipboardCheck,
  Stethoscope,
  BrainCircuit,
  Award,
  Bus,
  Users,
  Compass,
  Brain,
  Clock,
  Smartphone,
  BookOpen,
  Heart
} from 'lucide-react';

// Assets
import StudentImage from '../../../assets/Home/Student1.png';
import JeePrograme from '../../../assets/Home/Jee-Programe.png';
import NeetPrograme from '../../../assets/Home/Neet-Programe.png';
import FoundationPrograme from '../../../assets/Home/Foundation-Programe.png';

/**
 * Home Page Component
 */
const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-0 font-sans bg-white">
      <HeroSection />
      <StatsSection />
      
      {/* 1. Splendid Performance Section */}
      <ToppersSection />

      {/* 2. Built on Trust Section */}
      <section className="py-20 bg-[#fcfdfe] overflow-hidden">
        <div className="max-container px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            
            {/* Left Column: Student Image Spotlight */}
            <div className="w-full lg:w-5/12 relative">
              <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl border-[6px] border-white bg-white animate-float">
                <img 
                  src={StudentImage} 
                  alt="Centum Academy Success" 
                  className="w-full max-h-[480px] object-contain transform hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute bottom-6 left-6 bg-[#002B6B] text-white p-4 rounded-2xl shadow-lg flex items-center gap-3 animate-bounce">
                  <Trophy className="w-6 h-6 text-yellow-400" />
                  <div>
                    <p className="text-[10px] font-medium uppercase tracking-widest opacity-80">Rank Holder</p>
                    <p className="text-sm font-bold">JEE Advanced 2025</p>
                  </div>
                </div>
              </div>
              <div className="absolute -top-12 -left-12 w-48 h-48 bg-blue-200/30 blur-3xl rounded-full -z-0"></div>
              <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-indigo-100/30 blur-3xl rounded-full -z-0"></div>
            </div>

            <div className="w-full lg:w-7/12">
              <div className="mb-10 text-center lg:text-left">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2 tracking-tight">
                  Built on Trust
                </h2>
                
                <div className="relative inline-block">
                  <span className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 font-serif tracking-wide">
                    Why Students Choose Centum Academy
                  </span>
                  <div className="absolute -bottom-2 left-0 right-0 h-1 bg-yellow-400 rounded-full w-1/2 mx-auto lg:mx-auto shadow-sm"></div>
                </div>

                <p className="text-gray-500 text-lg mt-8 font-medium max-w-xl mx-auto lg:mx-0">
                  At Centum Academy, we believe in "Education with Emotion." Our success is built on the
                  unwavering trust of parents and the dedication of our students.
                </p>
              </div>

              {/* Feature Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="bg-[#eef2ff] p-6 rounded-[2rem] shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-blue-100/50 hover:border-blue-300 transition-all duration-300 group hover:-translate-y-1">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-4 shadow-sm group-hover:bg-[#002B6B] transition-colors duration-300">
                    <UserCheck className="text-[#4f46e5] group-hover:text-white w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-[#1e1b4b] text-xl mb-2">Personalized Mentoring</h3>
                  <p className="text-sm text-[#475569] leading-relaxed">Dedicated guidance to unlock full potential, addressing academic and personal growth.</p>
                </div>

                <div className="bg-[#fff7ed] p-6 rounded-[2rem] shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-orange-100/50 hover:border-orange-200 transition-all duration-300 group hover:-translate-y-1">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-4 shadow-sm group-hover:bg-[#ea580c] transition-colors duration-300">
                    <Calendar className="text-[#ea580c] group-hover:text-white w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-[#431407] text-xl mb-2">Flexible Schedules</h3>
                  <p className="text-sm text-[#7c2d12] leading-relaxed">Balance school and exam preparation with schedules designed for your unique pace.</p>
                </div>

                <div className="bg-[#f0fdf4] p-6 rounded-[2rem] shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-green-100/50 hover:border-green-200 transition-all duration-300 group hover:-translate-y-1">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-4 shadow-sm group-hover:bg-[#16a34a] transition-colors duration-300">
                    <GraduationCap className="text-[#16a34a] group-hover:text-white w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-[#064e3b] text-xl mb-2">Expert Faculty</h3>
                  <p className="text-sm text-[#065f46] leading-relaxed">Available 24/7 to resolve doubts and ensure consistent progress.</p>
                </div>

                <div className="bg-[#faf5ff] p-6 rounded-[2rem] shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-purple-100/50 hover:border-purple-200 transition-all duration-300 group hover:-translate-y-1">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-4 shadow-sm group-hover:bg-[#7e22ce] transition-colors duration-300">
                    <TrendingUp className="text-[#7e22ce] group-hover:text-white w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-[#3b0764] text-xl mb-2">Proven Results</h3>
                  <p className="text-sm text-[#581c87] leading-relaxed">Trusted by thousands to achieve top results in JEE and NEET.</p>
                </div>
              </div>

              <div className="mt-12 flex justify-center lg:justify-start">
                <Button 
                  onClick={() => navigate('/courses')}
                  className="rounded-2xl px-12 py-4 bg-[#002B6B] hover:bg-[#001c45] text-white shadow-xl flex items-center gap-3 transform transition-all active:scale-95"
                >
                  <span className="font-bold">Explore All Programs</span>
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Course Offerings Section */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-container px-4">
          
          {/* Main Section Heading */}
          <div className="mb-20 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2 tracking-tight">
              Explore Our Comprehensive
            </h2>
            <div className="relative inline-block">
              <span className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 font-serif tracking-wide">
                Course Offerings
              </span>
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-yellow-400 rounded-full w-1/2 mx-auto shadow-sm"></div>
            </div>
          </div>

          {/* JEE PROGRAM */}
          <div className="flex flex-col lg:flex-row gap-16 mb-32">
            <div className="w-full lg:w-7/12">
              <div className="mb-10 text-left">
                <h3 className="text-2xl md:text-3xl font-bold text-[#002B6B] mb-6">
                  JEE (Main & Advanced) Preparation
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed mb-8">
                  Centum Academy is your gateway to success in JEE Main and Advanced. Our expert-designed 
                  curriculum and experienced faculty ensure students master concepts with confidence.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-[#f0f7ff] p-5 rounded-[1.5rem] border border-blue-100 hover:shadow-md transition-all duration-300">
                    <div className="flex items-center gap-3 mb-2">
                      <Target className="text-[#002B6B] w-5 h-5" />
                      <h4 className="font-bold text-[#1e1b4b]">Fundamental Concept Building</h4>
                    </div>
                    <p className="text-sm text-gray-500">Master Physics, Chemistry, and Mathematics fundamentals.</p>
                  </div>

                  <div className="bg-[#fff4f4] p-5 rounded-[1.5rem] border border-red-100 hover:shadow-md transition-all duration-300">
                    <div className="flex items-center gap-3 mb-2">
                      <Zap className="text-red-500 w-5 h-5" />
                      <h4 className="font-bold text-[#431407]">Speed & Accuracy</h4>
                    </div>
                    <p className="text-sm text-gray-500">Techniques tailored for JEE’s tricky questions.</p>
                  </div>

                  <div className="bg-[#f5f3ff] p-5 rounded-[1.5rem] border border-purple-100 hover:shadow-md transition-all duration-300">
                    <div className="flex items-center gap-3 mb-2">
                      <Cpu className="text-purple-500 w-5 h-5" />
                      <h4 className="font-bold text-[#3b0764]">AI Based Assignments</h4>
                    </div>
                    <p className="text-sm text-gray-500">Surgically strike problem solving vulnerabilities.</p>
                  </div>

                  <div className="bg-[#f0fdfa] p-5 rounded-[1.5rem] border border-teal-100 hover:shadow-md transition-all duration-300">
                    <div className="flex items-center gap-3 mb-2">
                      <BarChart3 className="text-teal-600 w-5 h-5" />
                      <h4 className="font-bold text-[#064e3b]">Mock Tests & Analytics</h4>
                    </div>
                    <p className="text-sm text-gray-500">Detailed performance insights and exam simulation.</p>
                  </div>
                </div>

                <div className="mt-10">
                  <p className="text-[#002B6B] font-bold text-lg italic mb-6">
                    Take your first step toward becoming a top-ranked engineer with Centum Academy!
                  </p>
                  <Button 
                    onClick={() => navigate('/courses')}
                    className="bg-[#002B6B] hover:bg-[#001c45] text-white px-8 py-3 rounded-xl flex items-center gap-2 shadow-lg"
                  >
                    View Details <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-5/12">
              <div className="relative group h-full flex items-center">
                <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white bg-white animate-float transition-all duration-500">
                  <img 
                    src={JeePrograme} 
                    alt="JEE Programme" 
                    className="w-full h-auto object-cover transform transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#002B6B]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-100/40 blur-[80px] rounded-full -z-0 animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* NEET PROGRAM */}
          <div className="flex flex-col-reverse lg:flex-row gap-16 mb-32">
            
            <div className="w-full lg:w-5/12">
              <div className="relative group h-full flex items-center">
                <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white bg-white animate-float-delayed transition-all duration-500">
                  <img 
                    src={NeetPrograme} 
                    alt="NEET Programme" 
                    className="w-full h-auto object-cover transform transition-transform duration-1000 group-hover:scale-110"
                    onError={(e) => {
                      e.target.onerror = null; 
                      e.target.src = 'https://placehold.co/600x800?text=NEET+Program'; 
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-emerald-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-emerald-100/40 blur-[80px] rounded-full -z-0 animate-pulse"></div>
                
                <div className="absolute -bottom-8 -right-8 bg-white p-4 rounded-2xl shadow-xl animate-bounce hidden md:block z-20">
                    <Stethoscope className="w-8 h-8 text-emerald-600" />
                </div>
              </div>
            </div>

            <div className="w-full lg:w-7/12">
              <div className="mb-10 text-left">
                <h3 className="text-2xl md:text-3xl font-bold text-emerald-900 mb-6">
                  NEET Preparation
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed mb-8">
                  Centum Academy’s NEET program equips aspiring doctors to excel in Biology, Physics, and Chemistry. 
                  Our innovative teaching, detailed study material, and regular mock exams build confidence and accuracy. 
                  We ensure students are fully prepared to secure top medical seats in India.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-[#f0fdf4] p-5 rounded-[1.5rem] border border-emerald-100 hover:shadow-md transition-all duration-300">
                    <div className="flex items-center gap-3 mb-2">
                      <Microscope className="text-emerald-700 w-5 h-5" />
                      <h4 className="font-bold text-emerald-900">Comprehensive Subject Focus</h4>
                    </div>
                    <p className="text-sm text-gray-500">Strengthen your grasp on Biology, Physics, and Chemistry with detailed explanations.</p>
                  </div>

                  <div className="bg-[#fffbeb] p-5 rounded-[1.5rem] border border-amber-100 hover:shadow-md transition-all duration-300">
                    <div className="flex items-center gap-3 mb-2">
                      <Lightbulb className="text-amber-500 w-5 h-5" />
                      <h4 className="font-bold text-amber-900">Simplified Concepts</h4>
                    </div>
                    <p className="text-sm text-gray-500">Break down complex topics into easy-to-understand concepts.</p>
                  </div>

                  <div className="bg-[#fdf2f8] p-5 rounded-[1.5rem] border border-pink-100 hover:shadow-md transition-all duration-300">
                    <div className="flex items-center gap-3 mb-2">
                      <Target className="text-pink-600 w-5 h-5" />
                      <h4 className="font-bold text-pink-900">Topic-Wise Practice</h4>
                    </div>
                    <p className="text-sm text-gray-500">Improve accuracy and speed with focused practice questions.</p>
                  </div>

                  <div className="bg-[#eff6ff] p-5 rounded-[1.5rem] border border-blue-100 hover:shadow-md transition-all duration-300">
                    <div className="flex items-center gap-3 mb-2">
                      <ClipboardCheck className="text-blue-600 w-5 h-5" />
                      <h4 className="font-bold text-blue-900">Regular Mock Exams</h4>
                    </div>
                    <p className="text-sm text-gray-500">Prepare for the exam day with the latest NEET patterns and real-time analysis.</p>
                  </div>
                </div>

                <div className="mt-10">
                  <p className="text-emerald-800 font-bold text-lg italic mb-6">
                    Turn your medical career dreams into reality with Centum Academy’s NEET program!
                  </p>
                  <Button 
                    onClick={() => navigate('/courses')}
                    className="bg-emerald-700 hover:bg-emerald-800 text-white px-8 py-3 rounded-xl flex items-center gap-2 shadow-lg"
                  >
                    View Details <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

          </div>

          {/* FOUNDATION COURSES */}
          <div className="flex flex-col lg:flex-row gap-16">
            <div className="w-full lg:w-7/12">
              <div className="mb-10 text-left">
                <h3 className="text-2xl md:text-3xl font-bold text-orange-900 mb-6">
                  Foundation Courses
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed mb-8">
                  Centum Academy's Foundation Courses are tailored for students from Grades VIII to X. 
                  These programs foster critical thinking, problem-solving, and innovation by going beyond traditional textbooks.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-[#fff7ed] p-5 rounded-[1.5rem] border border-orange-100 hover:shadow-md transition-all duration-300">
                    <div className="flex items-center gap-3 mb-2">
                      <BrainCircuit className="text-orange-600 w-5 h-5" />
                      <h4 className="font-bold text-orange-900">Methodologies for Effective Learning</h4>
                    </div>
                    <p className="text-sm text-gray-500">Focus on understanding concepts, not rote learning.</p>
                  </div>

                  <div className="bg-[#fef2f2] p-5 rounded-[1.5rem] border border-red-100 hover:shadow-md transition-all duration-300">
                    <div className="flex items-center gap-3 mb-2">
                      <Award className="text-red-600 w-5 h-5" />
                      <h4 className="font-bold text-red-900">Olympiad and Speed Math</h4>
                    </div>
                    <p className="text-sm text-gray-500">Develop an edge in Mathematics and Science.</p>
                  </div>

                  <div className="bg-[#f0f9ff] p-5 rounded-[1.5rem] border border-sky-100 hover:shadow-md transition-all duration-300">
                    <div className="flex items-center gap-3 mb-2">
                      <Bus className="text-sky-600 w-5 h-5" />
                      <h4 className="font-bold text-sky-900">Field Trips</h4>
                    </div>
                    <p className="text-sm text-gray-500">Connect academics to real-world industrial applications.</p>
                  </div>

                  <div className="bg-[#f5f3ff] p-5 rounded-[1.5rem] border border-violet-100 hover:shadow-md transition-all duration-300">
                    <div className="flex items-center gap-3 mb-2">
                      <Users className="text-violet-600 w-5 h-5" />
                      <h4 className="font-bold text-violet-900">Small Class Sizes</h4>
                    </div>
                    <p className="text-sm text-gray-500">Ensure personalized mentoring and focus on individual aptitude.</p>
                  </div>

                   <div className="bg-[#ecfccb] p-5 rounded-[1.5rem] border border-lime-100 hover:shadow-md transition-all duration-300 md:col-span-2">
                    <div className="flex items-center gap-3 mb-2">
                      <Compass className="text-lime-700 w-5 h-5" />
                      <h4 className="font-bold text-lime-900">Career Exposure</h4>
                    </div>
                    <p className="text-sm text-gray-500">Help students explore various vocational paths.</p>
                  </div>

                </div>

                <div className="mt-10">
                  <p className="text-orange-800 font-bold text-lg italic mb-6">
                    Start early to lead tomorrow with Centum Academy's Foundation Program!
                  </p>
                  <Button 
                    onClick={() => navigate('/courses')}
                    className="bg-orange-700 hover:bg-orange-800 text-white px-8 py-3 rounded-xl flex items-center gap-2 shadow-lg"
                  >
                    Read More <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-5/12">
              <div className="relative group h-full flex items-center">
                <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white bg-white animate-float transition-all duration-500">
                  <img 
                    src={FoundationPrograme} 
                    alt="Foundation Programme" 
                    className="w-full h-auto object-cover transform transition-transform duration-1000 group-hover:scale-110"
                    onError={(e) => {
                      e.target.onerror = null; 
                      e.target.src = 'https://placehold.co/600x800?text=Foundation+Program'; 
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-orange-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-orange-100/40 blur-[80px] rounded-full -z-0 animate-pulse"></div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 4. Course Features Section */}
      <section className="py-20 bg-gray-50 overflow-hidden">
        <div className="max-container px-4">
          
          <div className="mb-16 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2 tracking-tight">
              The Centum Advantage
            </h2>
            <div className="relative inline-block">
              <span className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 font-serif tracking-wide">
                Course Features
              </span>
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-yellow-400 rounded-full w-1/2 mx-auto shadow-sm"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-indigo-50 group hover:-translate-y-2">
              <div className="w-14 h-14 bg-indigo-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-indigo-600 transition-colors duration-300">
                <Users className="text-indigo-600 group-hover:text-white w-7 h-7" />
              </div>
              <h3 className="font-bold text-xl text-gray-900 mb-3">Small Batch Sizes</h3>
              <p className="text-gray-600 leading-relaxed">Personalized attention for every student to ensure no one is left behind.</p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-pink-50 group hover:-translate-y-2">
              <div className="w-14 h-14 bg-pink-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-pink-600 transition-colors duration-300">
                <Brain className="text-pink-600 group-hover:text-white w-7 h-7" />
              </div>
              <h3 className="font-bold text-xl text-gray-900 mb-3">Concept Building</h3>
              <p className="text-gray-600 leading-relaxed">Strengthen fundamentals before progressing to advanced problems.</p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-teal-50 group hover:-translate-y-2">
              <div className="w-14 h-14 bg-teal-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-teal-600 transition-colors duration-300">
                <ClipboardCheck className="text-teal-600 group-hover:text-white w-7 h-7" />
              </div>
              <h3 className="font-bold text-xl text-gray-900 mb-3">Rigorous Testing</h3>
              <p className="text-gray-600 leading-relaxed">Regular evaluations with detailed performance analysis and feedback.</p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-orange-50 group hover:-translate-y-2">
              <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-orange-600 transition-colors duration-300">
                <Clock className="text-orange-600 group-hover:text-white w-7 h-7" />
              </div>
              <h3 className="font-bold text-xl text-gray-900 mb-3">Mock Exams</h3>
              <p className="text-gray-600 leading-relaxed">Practice with the latest exam patterns to build speed and accuracy.</p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-blue-50 group hover:-translate-y-2">
              <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors duration-300">
                <Smartphone className="text-blue-600 group-hover:text-white w-7 h-7" />
              </div>
              <h3 className="font-bold text-xl text-gray-900 mb-3">24/7 Doubt Support</h3>
              <p className="text-gray-600 leading-relaxed">Access faculty anytime for instant help via mobile apps and chats.</p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-violet-50 group hover:-translate-y-2">
              <div className="w-14 h-14 bg-violet-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-violet-600 transition-colors duration-300">
                <BookOpen className="text-violet-600 group-hover:text-white w-7 h-7" />
              </div>
              <h3 className="font-bold text-xl text-gray-900 mb-3">Specialized Material</h3>
              <p className="text-gray-600 leading-relaxed">Resources tailored to JEE and NEET requirements for focused study.</p>
            </div>

             <div className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-yellow-50 group hover:-translate-y-2">
              <div className="w-14 h-14 bg-yellow-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-yellow-500 transition-colors duration-300">
                <Trophy className="text-yellow-600 group-hover:text-white w-7 h-7" />
              </div>
              <h3 className="font-bold text-xl text-gray-900 mb-3">Proven Track Record</h3>
              <p className="text-gray-600 leading-relaxed">Centum students consistently secure top ranks in JEE & NEET exams.</p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-rose-50 group hover:-translate-y-2">
              <div className="w-14 h-14 bg-rose-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-rose-500 transition-colors duration-300">
                <Heart className="text-rose-500 group-hover:text-white w-7 h-7" />
              </div>
              <h3 className="font-bold text-xl text-gray-900 mb-3">Wellness Support</h3>
              <p className="text-gray-600 leading-relaxed">Counseling sessions to manage stress, build resilience, and stay focused.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Mentors Section */}
      <MentorsSection />

      {/* ✅ MOVED: Testimonials section is now at the end with a dedicated background wrapper */}
      <div className="bg-gradient-to-b from-white to-gray-50 border-t border-gray-100">
        <TestimonialsSection />
      </div>
    </div>
  );
};

export default Home;
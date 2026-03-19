import React from 'react';
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';
import { 
  BookOpen, GraduationCap, Target, Award, Users, 
  Clock, Sparkles, CheckCircle2, ArrowRight
} from "lucide-react";

export const CourseOfferings = () => {
  // DETAILED PROGRAM DATA
  const programs = [
    { 
      name: "JEE (Main and Advanced) Preparation", 
      icon: GraduationCap, 
      desc: "Centum Academy offers an integrated course that is developed by the IIT alumni to develop a profound knowledge of Physics, Chemistry, and Mathematics. The step-by-step mentoring and problem-solving activities will prepare the students to face the tough questions with confidence.", 
      featuresTitle: "Highlights:",
      features: [
        { title: "Strong Fundamentals", text: "Learn the fundamentals before advancing." },
        { title: "Problem-Solving Strategies", text: "A logical method to improve speed and accuracy." },
        { title: "AI-Assisted Assignments", text: "Error analysis and weakness identification for improvement." },
        { title: "Simulated Exams", text: "Practice test with real-time feedback to improve performance." }
      ],
      conclusion: "Begin your path to becoming a top-ranked engineer with Centum’s expert coaching classes in Bangalore.",
      link: "/program/iit-jee-coaching-bangalore",
      theme: {
        textGradient: "from-blue-600 to-indigo-600",
        bgLight: "bg-blue-50",
        iconText: "text-blue-600",
        glow: "shadow-blue-500/20",
        border: "border-blue-100",
        btn: "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/30",
        check: "text-blue-500"
      }
    },
    { 
      name: "NEET Preparation", 
      icon: BookOpen, 
      desc: "Our NEET program builds subject strength in Biology, Physics, and Chemistry through structured learning, practice tests and personalised mentoring.", 
      featuresTitle: "Key Features:",
      features: [
        { title: "Complete Subject Coverage", text: "Build confidence in any topic." },
        { title: "Streamlined Concepts", text: "Break complicated concepts into simple lessons." },
        { title: "Focused Practice", text: "Topic-based practice to enhance accuracy." },
        { title: "Mock Exams", text: "Exposure to the exam conditions and patterns." }
      ],
      conclusion: "Are you ready to take medical entrance exams at Centum, recognised as the best tuition centre in Bangalore for its individual approach and consistent results?",
      link: "/program/neet-coaching-bangalore",
      theme: {
        textGradient: "from-emerald-600 to-teal-600",
        bgLight: "bg-emerald-50",
        iconText: "text-emerald-600",
        glow: "shadow-emerald-500/20",
        border: "border-emerald-100",
        btn: "bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/30",
        check: "text-emerald-500"
      }
    },
    { 
      name: "Foundation Courses (Grades VIII–X)", 
      icon: Target, 
      desc: "Our foundation programs foster critical thinking, problem-solving and innovative learning at an early age, ensuring a smooth transition into competitive exam preparation.", 
      featuresTitle: "Key Features:",
      features: [
        { title: "Conceptual Learning", text: "Understanding first, not memorisation." },
        { title: "Olympiad & Speed Math", text: "Gain high-level skills at an early age." },
        { title: "Practical Exposure", text: "Field trips help connect classroom learning to the real world." },
        { title: "Small Class Sizes", text: "Provide selective mentorship for every student." },
        { title: "Career Insights", text: "Discover career options." }
      ],
      conclusion: "",
      link: "/program/foundation-coaching-bangalore",
      theme: {
        textGradient: "from-amber-600 to-orange-600",
        bgLight: "bg-amber-50",
        iconText: "text-amber-600",
        glow: "shadow-amber-500/20",
        border: "border-amber-100",
        btn: "bg-amber-600 hover:bg-amber-700 text-white shadow-amber-600/30",
        check: "text-amber-500"
      }
    }
  ];

  // Highlights at the bottom
  const highlights = [
    { icon: Award, title: "Expert Faculty", desc: "IIT & AIIMS alumni with proven track record", color: "text-purple-600", bg: "bg-purple-100" },
    { icon: Users, title: "Small Batches", desc: "Personalized attention with 25-35 students", color: "text-blue-600", bg: "bg-blue-100" },
    { icon: Target, title: "Result-Oriented", desc: "95% success rate with 500+ IIT selections", color: "text-emerald-600", bg: "bg-emerald-100" },
    { icon: Clock, title: "Flexible Timings", desc: "School-integrated and full-time programs", color: "text-amber-600", bg: "bg-amber-100" }
  ];

  return (
    <section className="bg-white py-24 px-6 overflow-hidden font-sans relative">
      {/* Background soft blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[10%] left-[5%] w-[500px] h-[500px] rounded-full bg-blue-50/50 blur-3xl"></div>
        <div className="absolute top-[40%] right-[5%] w-[400px] h-[400px] rounded-full bg-purple-50/50 blur-3xl"></div>
        <div className="absolute bottom-[10%] left-[10%] w-[600px] h-[600px] rounded-full bg-emerald-50/30 blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <motion.div 
          className="text-center mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 bg-slate-900 px-5 py-2.5 rounded-full mb-6 shadow-lg shadow-slate-200">
            <Sparkles className="h-4 w-4 text-white" />
            <span className="text-sm font-bold uppercase tracking-widest text-white">Our Programs</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight">
            Discover Your Path to <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Success</span>
          </h2>
          
          <p className="text-lg md:text-xl font-medium text-slate-500 max-w-3xl mx-auto leading-relaxed">
            Comprehensive programs designed by experts to help you crack JEE, NEET, and build a strong foundation.
          </p>
        </motion.div>

        {/* Alternating Program Layouts */}
        <div className="space-y-32 mb-32">
          {programs.map((program, idx) => {
            const isEven = idx % 2 === 0;

            return (
              <div 
                key={idx} 
                className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-20 items-center`}
              >
                {/* 1. TEXT CONTENT SIDE */}
                <motion.div 
                  className="w-full lg:w-1/2"
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                >
                  <div className={`inline-flex items-center justify-center h-16 w-16 rounded-2xl mb-8 ${program.theme.bgLight} ${program.theme.iconText}`}>
                    <program.icon className="h-8 w-8" />
                  </div>
                  
                  <h3 className="text-3xl md:text-4xl font-black text-slate-900 mb-6 leading-tight">
                    {program.name}
                  </h3>
                  
                  <p className="text-lg text-slate-600 mb-8 leading-relaxed font-medium">
                    {program.desc}
                  </p>

                  {program.conclusion && (
                    <div className="pl-5 border-l-4 border-slate-200 mb-10">
                      <p className="text-base font-semibold text-slate-700 italic leading-relaxed">
                        "{program.conclusion}"
                      </p>
                    </div>
                  )}

                  <Link to={program.link} onClick={() => window.scrollTo(0,0)}>
                    <button className={`px-8 py-4 rounded-xl font-bold uppercase tracking-wider text-sm flex items-center justify-center gap-2 transition-all duration-300 shadow-lg hover:-translate-y-1 ${program.theme.btn}`}>
                      Explore Program <ArrowRight className="h-5 w-5" />
                    </button>
                  </Link>
                </motion.div>

                {/* 2. FEATURES HIGHLIGHT PANEL SIDE */}
                <motion.div 
                  className="w-full lg:w-1/2 relative"
                  initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
                >
                  {/* Decorative Background Element */}
                  <div className={`absolute inset-0 translate-x-4 translate-y-4 rounded-3xl opacity-50 ${program.theme.bgLight}`}></div>
                  
                  {/* Main Feature Box */}
                  <div className={`relative bg-white p-8 md:p-10 rounded-3xl border ${program.theme.border} shadow-2xl ${program.theme.glow}`}>
                    <h4 className={`text-xl font-black mb-8 uppercase tracking-widest bg-gradient-to-r ${program.theme.textGradient} bg-clip-text text-transparent`}>
                      {program.featuresTitle}
                    </h4>
                    
                    <ul className="space-y-6">
                      {program.features.map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-4">
                          <div className={`mt-1 p-1 rounded-full ${program.theme.bgLight} ${program.theme.check}`}>
                            <CheckCircle2 className="h-5 w-5" />
                          </div>
                          <div>
                            <h5 className="text-slate-900 font-bold text-lg mb-1">{feature.title}</h5>
                            <p className="text-slate-500 font-medium leading-relaxed">
                              {feature.text}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>

        {/* Bottom Highlights Row */}
        <motion.div 
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 pt-16 border-t border-slate-100"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {highlights.map((h, i) => (
            <div key={i} className="flex flex-col items-center text-center group">
              <div className={`h-16 w-16 rounded-full flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110 ${h.bg} ${h.color}`}>
                <h.icon className="h-8 w-8" />
              </div>
              <h4 className="font-bold text-slate-900 text-lg mb-2">
                {h.title}
              </h4>
              <p className="text-sm text-slate-500 font-medium leading-relaxed max-w-[200px]">
                {h.desc}
              </p>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};
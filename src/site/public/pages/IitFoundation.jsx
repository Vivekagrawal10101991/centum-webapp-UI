import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import usePageTitle from '../hooks/usePageTitle';
import DownloadBrochureButton from '../../components/layout/DownloadBrochureButton';
import { 
  CheckCircle2, 
  Users, 
  Target, 
  Rocket, 
  Lightbulb, 
  Sparkles, 
  BrainCircuit, 
  Trophy, 
  Compass, 
  Briefcase, 
  Award,
  ShieldCheck,
  BookOpen,
  Calculator,
  Atom
} from 'lucide-react';

const IitFoundation = () => {
  const navigate = useNavigate();
  usePageTitle('IIT Foundation Coaching in Bangalore | Centum Academy');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const fadeInUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } };
  const slideInLeft = { hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } } };
  const slideInRight = { hidden: { opacity: 0, x: 50 }, visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } } };
  const scaleUp = { hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } } };
  const staggerContainer = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.15 } } };

  return (
    <div className="min-h-screen bg-white font-sans">
      <section className="bg-gradient-to-br from-white via-purple-50/30 to-blue-50/30 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10 py-20 px-6">
          
          <motion.div className="text-center mb-16" initial="hidden" animate="visible" variants={fadeInUp}>
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 rounded-full mb-4 shadow-sm"
            >
              <Sparkles className="h-5 w-5 text-white" />
              <span className="text-sm font-bold text-white uppercase tracking-wider">
                IIT FOUNDATION PROGRAM
              </span>
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
              IIT Foundation Coaching in Bangalore <br/> <span className="text-blue-600">for Classes 8 to 10</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-medium">
              Start building a strong foundation for your IIT dream from an early stage. Learn concepts in a very simple and clear way with regular practice. This helps you gain confidence and do better step by step.
            </p>
          </motion.div>

          <motion.div 
            className="mb-20 space-y-24 bg-white/50 rounded-3xl p-8 lg:p-12 border border-slate-100 shadow-sm"
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
          >
            {/* Intro Section */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div variants={slideInLeft} className="space-y-6">
                <div className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 font-bold rounded-full text-sm">
                  Classes 8, 9 & 10
                </div>
                <h2 className="text-3xl font-black text-slate-900 leading-tight">
                  Laying a Strong Academic Base for Future IIT Aspirants
                </h2>
                <p className="text-slate-600 leading-relaxed text-lg">
                  At Centum Academy, our IIT Foundation Coaching program is designed to help students from Classes 8, 9, and 10 develop strong fundamentals in Mathematics and Science—laying the groundwork for IIT JEE preparation.
                </p>
                <p className="text-slate-600 leading-relaxed text-lg">
                  Rather than rushing students into exam pressure, our foundation course focuses on concept clarity, logical reasoning, and analytical thinking. This structured approach ensures students are confident, curious, and academically prepared as they progress toward JEE Main and Advanced.
                </p>
              </motion.div>
              <motion.div variants={slideInRight} className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&q=80&w=800" 
                  alt="Young students learning science" 
                  className="rounded-2xl shadow-2xl object-cover h-[450px] w-full"
                />
                <motion.div whileHover={{ scale: 1.05 }} className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl">
                  <div className="flex items-center gap-4">
                    <div className="bg-blue-100 p-3 rounded-full"><Target className="text-blue-600 h-8 w-8"/></div>
                    <div>
                      <p className="text-sm text-slate-500 font-bold uppercase">Focus</p>
                      <p className="text-xl font-black text-slate-900">Early Excellence</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>

            {/* Why Choose Section */}
            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <motion.h3 variants={fadeInUp} className="text-3xl font-black text-center text-slate-900 mb-12">
                Why Choose Centum’s <span className="text-blue-600">IIT Foundation Coaching</span>
              </motion.h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <motion.div variants={scaleUp} whileHover={{ y: -5 }} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all">
                  <BrainCircuit className="h-10 w-10 text-blue-500 mb-4" />
                  <h4 className="text-xl font-bold text-slate-900 mb-2">Concept-Based Learning</h4>
                  <p className="text-slate-600">Our IIT Foundation classes focus on helping students understand why concepts work, encouraging deep learning instead of short-term memorisation.</p>
                </motion.div>
                <motion.div variants={scaleUp} whileHover={{ y: -5 }} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all">
                  <Trophy className="h-10 w-10 text-blue-500 mb-4" />
                  <h4 className="text-xl font-bold text-slate-900 mb-2">Olympiad Preparation</h4>
                  <p className="text-slate-600">Students are trained in advanced problem-solving techniques through Olympiad-oriented questions and speed math modules.</p>
                </motion.div>
                <motion.div variants={scaleUp} whileHover={{ y: -5 }} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all">
                  <Users className="h-10 w-10 text-blue-500 mb-4" />
                  <h4 className="text-xl font-bold text-slate-900 mb-2">Small Batch Sizes</h4>
                  <p className="text-slate-600">Limited batch sizes allow mentors to closely track each student’s progress and provide personalised academic guidance.</p>
                </motion.div>
                <motion.div variants={scaleUp} whileHover={{ y: -5 }} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all">
                  <Compass className="h-10 w-10 text-blue-500 mb-4" />
                  <h4 className="text-xl font-bold text-slate-900 mb-2">Real-World Application</h4>
                  <p className="text-slate-600">Learning is enhanced through projects, experiments, and practical activities that connect classroom concepts to real-life applications.</p>
                </motion.div>
                <motion.div variants={scaleUp} whileHover={{ y: -5 }} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all">
                  <Briefcase className="h-10 w-10 text-blue-500 mb-4" />
                  <h4 className="text-xl font-bold text-slate-900 mb-2">Early Career Awareness</h4>
                  <p className="text-slate-600">Students gain exposure to engineering pathways and competitive exams early, helping them make informed decisions.</p>
                </motion.div>
                <motion.div variants={scaleUp} whileHover={{ y: -5 }} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all">
                  <Award className="h-10 w-10 text-blue-500 mb-4" />
                  <h4 className="text-xl font-bold text-slate-900 mb-2">IIT Alumni Faculty</h4>
                  <p className="text-slate-600">Learn from IIT graduates who combine strong academics with real-world insight to make concepts clear and engaging.</p>
                </motion.div>
              </div>
            </motion.div>

            {/* Course Structure */}
            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <motion.h3 variants={fadeInUp} className="text-3xl font-black text-slate-900 mb-12 text-center">Our IIT Foundation <span className="text-blue-600">Course Structure</span></motion.h3>
              <div className="grid md:grid-cols-3 gap-8">
                <motion.div variants={fadeInUp} className="border-l-4 border-blue-500 pl-6 space-y-3">
                  <div className="flex items-center gap-3"><Calculator className="text-blue-500 h-6 w-6"/><h4 className="text-xl font-bold text-slate-900">Mathematics</h4></div>
                  <ul className="space-y-2 text-slate-600 list-disc list-inside marker:text-blue-500">
                    <li>Algebra, Geometry, Number Systems</li>
                    <li>Logical reasoning and problem-solving</li>
                    <li>Olympiad-style questions</li>
                    <li>Preparation for JEE Foundation classes</li>
                  </ul>
                </motion.div>
                <motion.div variants={fadeInUp} className="border-l-4 border-indigo-500 pl-6 space-y-3">
                  <div className="flex items-center gap-3"><Atom className="text-indigo-500 h-6 w-6"/><h4 className="text-xl font-bold text-slate-900">Science</h4></div>
                  <ul className="space-y-2 text-slate-600 list-disc list-inside marker:text-indigo-500">
                    <li>Core concepts in Physics and Chemistry</li>
                    <li>Application-based learning</li>
                    <li>Strong focus on analytical thinking</li>
                    <li>Builds readiness for Classes 8-10</li>
                  </ul>
                </motion.div>
                <motion.div variants={fadeInUp} className="border-l-4 border-purple-500 pl-6 space-y-3">
                  <div className="flex items-center gap-3"><BrainCircuit className="text-purple-500 h-6 w-6"/><h4 className="text-xl font-bold text-slate-900">Integrated</h4></div>
                  <ul className="space-y-2 text-slate-600 list-disc list-inside marker:text-purple-500">
                    <li>Early exposure to JEE-style questions</li>
                    <li>Logical reasoning & time management</li>
                    <li>Smooth transition to advanced JEE</li>
                  </ul>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

          {/* CTA Section */}
          <motion.div 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true }} 
            variants={scaleUp}
            className="bg-gradient-to-br from-[#7E3AF2] to-[#1C64F2] rounded-3xl p-12 text-white text-center shadow-2xl relative overflow-hidden mt-10 hover:scale-[1.01] transition-transform duration-300"
          >
            <h3 className="text-3xl font-bold mb-4">Ready to Start the Journey?</h3>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto font-medium">
              Our expert counselors will help you understand how our foundation program can set you up for long-term success.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button 
                onClick={() => {
                  window.scrollTo(0, 0);
                  navigate('/contact');
                }}
                className="bg-white text-[#7E3AF2] font-bold px-8 py-3.5 rounded-xl shadow-xl hover:bg-slate-50 hover:scale-105 active:scale-95 transition-all duration-200"
              >
                Get Free Counseling
              </button>
              
              <div className="hover:scale-105 active:scale-95 transition-transform duration-200">
                <DownloadBrochureButton 
                  isFixed={false} 
                  className="border-2 !border-white !text-white hover:!bg-white/10 !bg-transparent !shadow-none !rounded-xl !py-3.5 !m-0" 
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default IitFoundation;
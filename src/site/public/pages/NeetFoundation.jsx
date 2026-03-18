import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import usePageTitle from '../hooks/usePageTitle';
import DownloadBrochureButton from '../../components/layout/DownloadBrochureButton';
import { 
  CheckCircle2, 
  Users, 
  Target, 
  BrainCircuit, 
  Award,
  ShieldCheck,
  BookOpen,
  Dna,
  Microscope,
  Atom,
  HeartPulse,
  Sparkles,
  Clock
} from 'lucide-react';

const NeetFoundation = () => {
  const navigate = useNavigate();
  usePageTitle('NEET Foundation Coaching in Bangalore | Centum Academy');

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
      <section className="bg-gradient-to-br from-white via-teal-50/30 to-emerald-50/30 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10 py-20 px-6">
          
          <motion.div className="text-center mb-16" initial="hidden" animate="visible" variants={fadeInUp}>
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-600 to-emerald-600 px-4 py-2 rounded-full mb-4 shadow-sm"
            >
              <Sparkles className="h-5 w-5 text-white" />
              <span className="text-sm font-bold text-white uppercase tracking-wider">
                NEET FOUNDATION PROGRAM
              </span>
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
              NEET Foundation Coaching <br/> <span className="text-emerald-600">for Classes 8 to 10</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-medium">
              Start Building Medical Excellence Early
            </p>
          </motion.div>

          <motion.div 
            className="mb-20 space-y-24 bg-white/50 rounded-3xl p-8 lg:p-12 border border-slate-100 shadow-sm"
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
          >
            {/* Intro Section */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div variants={slideInLeft} className="space-y-6">
                <div className="inline-block px-4 py-1.5 bg-emerald-100 text-emerald-700 font-bold rounded-full text-sm">
                  Classes 8, 9 & 10
                </div>
                <h2 className="text-3xl font-black text-slate-900 leading-tight">
                  Start Building Medical Excellence Early
                </h2>
                <p className="text-slate-600 leading-relaxed text-lg">
                  The NEET foundation classes of Centum Academy are carefully designed for students in Classes 8, 9, and 10 who wish to pursue a future in medicine. The program is aimed at building fundamentals in Biology, Physics, and Chemistry.
                </p>
                <p className="text-slate-600 leading-relaxed text-lg">
                  Instead of subjecting students to the competitive demands of the world at a tender age, our foundation NEET course focuses on conceptual grasp, scientific thinking, and practice to build confidence without pressure.
                </p>
              </motion.div>
              <motion.div variants={slideInRight} className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=800" 
                  alt="Students studying science" 
                  className="rounded-2xl shadow-2xl object-cover h-[450px] w-full"
                />
                <motion.div whileHover={{ scale: 1.05 }} className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl">
                  <div className="flex items-center gap-4">
                    <div className="bg-emerald-100 p-3 rounded-full"><HeartPulse className="text-emerald-600 h-8 w-8"/></div>
                    <div>
                      <p className="text-sm text-slate-500 font-bold uppercase">Target</p>
                      <p className="text-xl font-black text-slate-900">Medical Entrance</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>

            {/* Why Choose Section */}
            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <motion.h3 variants={fadeInUp} className="text-3xl font-black text-center text-slate-900 mb-12">
                Why Choose Centum’s <span className="text-emerald-600">NEET Foundation Coaching</span>
              </motion.h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <motion.div variants={scaleUp} whileHover={{ y: -5 }} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all">
                  <Dna className="h-10 w-10 text-emerald-500 mb-4" />
                  <h4 className="text-xl font-bold text-slate-900 mb-2">Early Emphasis on Biology</h4>
                  <p className="text-slate-600">Our foundation classes for NEET place special focus on Biology from the early grades to clearly understand essential concepts.</p>
                </motion.div>
                <motion.div variants={scaleUp} whileHover={{ y: -5 }} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all">
                  <Microscope className="h-10 w-10 text-emerald-500 mb-4" />
                  <h4 className="text-xl font-bold text-slate-900 mb-2">Concept-Driven Instruction</h4>
                  <p className="text-slate-600">Physics and Chemistry are taught through principles and reasoning as opposed to memorisation of formulae.</p>
                </motion.div>
                <motion.div variants={scaleUp} whileHover={{ y: -5 }} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all">
                  <Users className="h-10 w-10 text-emerald-500 mb-4" />
                  <h4 className="text-xl font-bold text-slate-900 mb-2">Minimal Batch Sizes</h4>
                  <p className="text-slate-600">With small classes, mentors can closely monitor each student and individually guide them based on their academic needs.</p>
                </motion.div>
                <motion.div variants={scaleUp} whileHover={{ y: -5 }} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all">
                  <BrainCircuit className="h-10 w-10 text-emerald-500 mb-4" />
                  <h4 className="text-xl font-bold text-slate-900 mb-2">Learning Through Application</h4>
                  <p className="text-slate-600">The concepts are reinforced with diagrams, activities, experiments, and problem-solving exercises.</p>
                </motion.div>
                <motion.div variants={scaleUp} whileHover={{ y: -5 }} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all lg:col-span-2">
                  <Target className="h-10 w-10 text-emerald-500 mb-4" />
                  <h4 className="text-xl font-bold text-slate-900 mb-2">Gentle Introduction to Medical Entrance Thinking</h4>
                  <p className="text-slate-600">Students are introduced to NEET-style questions and problem patterns gradually, enabling them to learn how to think competitively.</p>
                </motion.div>
              </div>
            </motion.div>

            {/* Course Structure */}
            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <motion.h3 variants={fadeInUp} className="text-3xl font-black text-slate-900 mb-12 text-center">Our NEET Foundation <span className="text-emerald-600">Course Structure</span></motion.h3>
              <div className="grid md:grid-cols-2 gap-8">
                <motion.div variants={fadeInUp} className="border-l-4 border-green-500 pl-6 space-y-3">
                  <div className="flex items-center gap-3"><Dna className="text-green-500 h-6 w-6"/><h4 className="text-xl font-bold text-slate-900">Biology Foundation</h4></div>
                  <ul className="space-y-2 text-slate-600 list-disc list-inside marker:text-green-500">
                    <li>Cell biology, human physiology, and genetics</li>
                    <li>Strong concept development through diagrams</li>
                    <li>Guided solutions to application questions</li>
                  </ul>
                </motion.div>
                <motion.div variants={fadeInUp} className="border-l-4 border-blue-500 pl-6 space-y-3">
                  <div className="flex items-center gap-3"><Atom className="text-blue-500 h-6 w-6"/><h4 className="text-xl font-bold text-slate-900">Physics Foundation</h4></div>
                  <ul className="space-y-2 text-slate-600 list-disc list-inside marker:text-blue-500">
                    <li>Motion, force, energy, and mechanics</li>
                    <li>Development of reasoning and concepts application</li>
                    <li>Develops confidence on NEET level physics</li>
                  </ul>
                </motion.div>
                <motion.div variants={fadeInUp} className="border-l-4 border-yellow-500 pl-6 space-y-3">
                  <div className="flex items-center gap-3"><Microscope className="text-yellow-500 h-6 w-6"/><h4 className="text-xl font-bold text-slate-900">Chemistry Foundation</h4></div>
                  <ul className="space-y-2 text-slate-600 list-disc list-inside marker:text-yellow-500">
                    <li>Atoms, molecules, and chemical reactions</li>
                    <li>Visual and experiment-based teaching methods</li>
                    <li>Preparation in NEET-based Chemistry studies</li>
                  </ul>
                </motion.div>
                <motion.div variants={fadeInUp} className="border-l-4 border-purple-500 pl-6 space-y-3">
                  <div className="flex items-center gap-3"><BrainCircuit className="text-purple-500 h-6 w-6"/><h4 className="text-xl font-bold text-slate-900">Integrated Approach</h4></div>
                  <ul className="space-y-2 text-slate-600 list-disc list-inside marker:text-purple-500">
                    <li>Incremental exposure to NEET-like patterns</li>
                    <li>Time management and examination temperament</li>
                    <li>Seamless transition to NEET coaching</li>
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
            className="bg-gradient-to-br from-[#00A67E] to-[#047857] rounded-3xl p-12 text-white text-center shadow-2xl relative overflow-hidden mt-10 hover:scale-[1.01] transition-transform duration-300"
          >
            <h3 className="text-3xl font-bold mb-4">Ready to Start the Journey?</h3>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto font-medium">
              Our expert counselors will help you understand how our foundation program can set you up for long-term success in NEET.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button 
                onClick={() => {
                  window.scrollTo(0, 0);
                  navigate('/contact');
                }}
                className="bg-white text-[#047857] font-bold px-8 py-3.5 rounded-xl shadow-xl hover:bg-slate-50 hover:scale-105 active:scale-95 transition-all duration-200"
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

export default NeetFoundation;
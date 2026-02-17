import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Brain, 
  Target, 
  Users, 
  TrendingUp, 
  ArrowLeft, 
  Sparkles, 
  Heart, 
  Award, 
  FileText, 
  MessageCircle, 
  Shield, 
  Lightbulb 
} from 'lucide-react';

const MindgaugeDetail = () => {
  const assessmentAreas = [
    {
      icon: Brain,
      title: "Cognitive Abilities",
      description: "Reasoning patterns and problem-solving approaches"
    },
    {
      icon: Target,
      title: "Subject-wise Strengths",
      description: "Natural inclinations and development areas"
    },
    {
      icon: Lightbulb,
      title: "Learning Styles",
      description: "Visual, auditory, kinesthetic, or reading preferences"
    },
    {
      icon: Users,
      title: "Personality Traits",
      description: "Behavioural tendencies and interaction patterns"
    },
    {
      icon: Heart,
      title: "Emotional Orientation",
      description: "Stress response and emotional intelligence"
    },
    {
      icon: TrendingUp,
      title: "Career Inclinations",
      description: "Natural stream and career pathway alignment"
    }
  ];

  const howItWorks = [
    {
      step: "01",
      title: "Student completes the assessment online",
      description: "Simple, structured questionnaire designed for students"
    },
    {
      step: "02",
      title: "AI-assisted analysis generates detailed report",
      description: "Research-backed algorithms process responses"
    },
    {
      step: "03",
      title: "Parents receive clear summary",
      description: "Easy-to-understand, actionable insights"
    },
    {
      step: "04",
      title: "Optional expert counseling session",
      description: "One-to-one guidance with trained professionals"
    }
  ];

  const parentConcerns = [
    "Is my child naturally inclined towards science, commerce, or humanities?",
    "Are they choosing subjects because of interest or pressure?",
    "Do they really understand their strengths?"
  ];

  const whyTrust = [
    "Reduces confusion during stream selection",
    "Removes guesswork and peer pressure",
    "Encourages confidence in students",
    "Supports long-term academic planning"
  ];

  return (
    <section className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-slate-50 font-sans">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-purple-600 via-purple-500 to-indigo-600 text-white py-20 px-6 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Back Button */}
          <Link to="/ai-innovation">
            <motion.button
              className="inline-flex items-center gap-2 text-white/90 hover:text-white mb-8 transition-colors group"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ x: -5 }}
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="font-semibold">Back to Innovations</span>
            </motion.button>
          </Link>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                <Sparkles className="h-5 w-5" />
                <span className="text-sm font-bold uppercase tracking-wider">Psychometric Assessment & Future Clarity</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                Understand your child — beyond marks
              </h1>
              
              <p className="text-lg md:text-xl text-purple-100 mb-8 leading-relaxed">
                Mindgauge is Centum's AI-assisted psychometric assessment that helps students and parents discover strengths, learning styles, personality traits, and future pathways with clarity and confidence.
              </p>

              <div className="flex flex-wrap gap-4">
                {/* --- UPDATED BUTTON WITH LINK --- */}
                <button 
                  className="px-6 py-3 bg-white text-purple-600 font-semibold rounded-xl hover:bg-purple-50 transition-colors shadow-lg"
                  onClick={() => window.open('https://mindgauge.in/', '_blank')}
                >
                  Take the Mindgauge Assessment
                </button>
                
                <button 
                  className="px-6 py-3 bg-white/10 backdrop-blur-sm border-2 border-white text-white font-semibold rounded-xl hover:bg-white/20 transition-colors"
                  onClick={() => window.open('https://mindgauge.in/', '_blank')}
                >
                  View a Sample Report
                </button>
              </div>
            </motion.div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20">
                <img
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80"
                  alt="Mindgauge - Student Assessment"
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/30 to-transparent"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Parent Concern Section */}
      <div className="py-20 px-6 bg-gradient-to-br from-slate-50 to-purple-50/30">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              "My child is doing okay, but is this the right direction?"
            </h2>
            <p className="text-lg text-slate-600 mb-8">
              Many students perform reasonably well in school, yet parents still wonder:
            </p>
          </motion.div>

          <div className="space-y-4">
            {parentConcerns.map((concern, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg border-2 border-purple-100"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <MessageCircle className="h-5 w-5 text-purple-600" />
                  </div>
                  <p className="text-slate-700 text-lg leading-relaxed">{concern}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="mt-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <p className="text-xl font-bold text-purple-600">
              Mindgauge answers these questions scientifically — not emotionally or comparatively.
            </p>
          </motion.div>
        </div>
      </div>

      {/* What is Mindgauge */}
      <div className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                A scientific way to understand the student
              </h2>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                Mindgauge is a structured, research-backed psychometric assessment designed for students of <strong>Grades 8–10</strong>. It evaluates how a student thinks, learns, feels, and responds — going far beyond academic marks.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed">
                This helps families make informed academic and career decisions early, without stress.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80"
                  alt="Scientific Assessment"
                  className="w-full h-[400px] object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* What Mindgauge Assesses */}
      <div className="py-20 px-6 bg-gradient-to-b from-purple-50/50 to-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              What <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">Mindgauge</span> Assesses
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {assessmentAreas.map((area, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-slate-100 hover:border-purple-200"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="h-14 w-14 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center mb-4">
                  <area.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{area.title}</h3>
                <p className="text-slate-600 leading-relaxed">{area.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Simple for students, insightful for parents
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((step, index) => (
              <motion.div
                key={index}
                className="relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl text-white font-black text-2xl mb-4 shadow-lg">
                    {step.step}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{step.title}</h3>
                  <p className="text-sm text-slate-600">{step.description}</p>
                </div>
                {index < howItWorks.length - 1 && (
                  <div className="hidden lg:block absolute top-8 -right-4 w-8 h-0.5 bg-gradient-to-r from-purple-300 to-transparent"></div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* The Mindgauge Report */}
      <div className="py-20 px-6 bg-gradient-to-br from-purple-50 to-indigo-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80"
                  alt="Mindgauge Report"
                  className="w-full h-[400px] object-cover"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                Clear. Practical. <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">Parent-friendly.</span>
              </h2>
              <p className="text-lg text-slate-600 mb-6 font-semibold">
                The Mindgauge report does not label students. It explains:
              </p>
              <div className="space-y-4">
                {[
                  "Where the student naturally excels",
                  "Areas that need support",
                  "Suitable academic streams and pathways",
                  "How parents can support learning effectively"
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <FileText className="h-6 w-6 text-purple-600 flex-shrink-0 mt-1" />
                    <p className="text-slate-700 text-lg leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Expert Counseling */}
      <div className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              AI insights supported by <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">human guidance</span>
            </h2>
            <p className="text-lg text-slate-600">
              Families can opt for a one-to-one session with trained counselors or psychologists to:
            </p>
          </motion.div>

          <motion.div
            className="bg-gradient-to-br from-purple-100 to-indigo-100 rounded-3xl p-10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: MessageCircle, text: "Understand the report deeply" },
                { icon: Users, text: "Ask questions specific to the child" },
                { icon: FileText, text: "Receive personalised guidance summary" }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl shadow-lg mb-4">
                    <item.icon className="h-8 w-8 text-purple-600" />
                  </div>
                  <p className="text-slate-800 font-semibold">{item.text}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Why Parents Trust */}
      <div className="py-20 px-6 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Why Parents Trust Mindgauge
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {whyTrust.map((reason, index) => (
              <motion.div
                key={index}
                className="flex items-start gap-4 bg-white rounded-2xl p-6 shadow-lg border-2 border-purple-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Shield className="h-6 w-6 text-purple-600 flex-shrink-0 mt-1" />
                <p className="text-slate-700 text-lg leading-relaxed">{reason}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Closing CTA */}
      <div className="py-20 px-6">
        <motion.div
          className="max-w-4xl mx-auto text-center bg-gradient-to-br from-purple-600 via-purple-500 to-indigo-600 rounded-3xl p-12 md:p-16 relative overflow-hidden shadow-2xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
          </div>

          <div className="relative z-10">
            <Award className="h-16 w-16 text-white mx-auto mb-6" />
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Right understanding leads to right decisions
            </h3>
            <p className="text-lg text-purple-100 mb-8 max-w-2xl mx-auto">
              Take the first step towards clarity and confidence in your child's future
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              {/* --- UPDATED BUTTON WITH LINK --- */}
              <button 
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-purple-600 font-semibold rounded-xl hover:bg-purple-50 transition-colors shadow-xl"
                onClick={() => window.open('https://mindgauge.in/', '_blank')}
              >
                Take the Mindgauge Assessment
                <Brain className="h-5 w-5" />
              </button>
              
              <button 
                className="inline-flex items-center gap-2 px-8 py-4 bg-purple-700/50 backdrop-blur-sm border-2 border-white text-white font-semibold rounded-xl hover:bg-purple-700/70 transition-colors"
                onClick={() => window.open('https://mindgauge.in/', '_blank')}
              >
                Book a Counseling Session
                <MessageCircle className="h-5 w-5" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MindgaugeDetail;
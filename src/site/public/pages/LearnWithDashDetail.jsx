import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Video, 
  Map, 
  FileText, 
  Clock, 
  AlertTriangle, 
  ArrowLeft, 
  Sparkles, 
  LayoutDashboard, 
  CheckCircle,
  TrendingUp,
  Brain
} from 'lucide-react';

const LearnWithDashDetail = () => {
  const features = [
    {
      icon: BookOpen,
      title: "Topic-wise Learning",
      description: "Organized by topics and subtopics for structured learning"
    },
    {
      icon: Video,
      title: "Recorded Videos",
      description: "Video lessons for every concept, watch anytime"
    },
    {
      icon: Map,
      title: "Mind Maps",
      description: "Visual connections for conceptual clarity"
    },
    {
      icon: FileText,
      title: "Practice Assessments",
      description: "Tests and quizzes to reinforce learning"
    },
    {
      icon: Clock,
      title: "Revise Anytime",
      description: "Learn at your own pace, anywhere"
    },
    {
      icon: AlertTriangle,
      title: "Learn from Mistakes",
      description: "Nuggets feature tracks and teaches from errors"
    }
  ];

  const parentBenefits = [
    "Encourages independent learning",
    "Reduces dependence on extra tuition",
    "Builds confidence and consistency",
    "Supports exam readiness calmly"
  ];

  return (
    <section className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-slate-50 font-sans">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 text-white py-20 px-6 overflow-hidden">
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
                <span className="text-sm font-bold uppercase tracking-wider">Personalised Learning Platform</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                Learn at your pace. Improve every day.
              </h1>
              
              <p className="text-lg md:text-xl text-amber-50 mb-8 leading-relaxed">
                Learn with Dash is Centum's AI-powered learning companion that helps students revise concepts, practice effectively, and improve continuously anytime, anywhere.
              </p>

              <div className="flex flex-wrap gap-4">
                <button className="px-6 py-3 bg-white text-orange-600 font-semibold rounded-xl hover:bg-orange-50 transition-colors shadow-lg">
                  Explore Learn with Dash
                </button>
                <button className="px-6 py-3 bg-white/10 backdrop-blur-sm border-2 border-white text-white font-semibold rounded-xl hover:bg-white/20 transition-colors">
                  View Student Dashboard
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
                  src="https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&q=80"
                  alt="Student Learning"
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-orange-900/30 to-transparent"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Problem Statement */}
      <div className="py-20 px-6 bg-gradient-to-br from-slate-50 to-amber-50/30">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              Classroom speed is fixed — students are not
            </h2>
            <div className="grid md:grid-cols-3 gap-6 mb-8 text-left">
              {[
                "Some students need more revision",
                "Some need more practice",
                "Some need concepts explained differently"
              ].map((item, i) => (
                <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center gap-3">
                  <div className="h-2 w-2 bg-orange-500 rounded-full"></div>
                  <p className="text-slate-700 font-medium">{item}</p>
                </div>
              ))}
            </div>
            <div className="inline-block bg-gradient-to-r from-amber-500 to-orange-600 rounded-2xl p-8 text-white shadow-xl">
              <p className="text-xl font-bold">
                Learn with Dash adapts learning to the student, not the other way around.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Key Features Grid */}
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
              A personal learning companion
            </h2>
            <p className="text-lg text-slate-600">
              Revise difficult topics. Catch up on missed concepts. Practice independently.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100 hover:border-orange-200 group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="h-14 w-14 bg-gradient-to-br from-amber-100 to-orange-100 rounded-xl flex items-center justify-center mb-6 group-hover:from-amber-500 group-hover:to-orange-500 transition-colors duration-300">
                  <feature.icon className="h-7 w-7 text-orange-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Deep Dive: Mistakes & Mind Maps */}
      <div className="py-20 px-6 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="max-w-7xl mx-auto space-y-24">
          
          {/* Mistakes Section */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 bg-red-100 px-4 py-2 rounded-full mb-4">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                <span className="text-sm font-bold text-red-700 uppercase">The Nuggets Feature</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                Mistakes that teach, not discourage
              </h2>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                Learn with Dash doesn't just mark answers wrong. It tracks repeated error patterns and creates focused "Nuggets" — bite-sized lessons to fix specific gaps.
              </p>
              <div className="bg-white p-6 rounded-xl border-l-4 border-red-500 shadow-sm">
                <p className="font-semibold text-slate-800">
                  "Focus on weak areas intelligently, rather than practicing blindly."
                </p>
              </div>
            </motion.div>
            <motion.div
               initial={{ opacity: 0, x: 30 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.6 }}
               className="relative"
            >
               <div className="bg-white rounded-3xl p-8 shadow-xl">
                  {/* Mock UI for Mistakes */}
                  <div className="space-y-4">
                     <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-100">
                        <span className="font-semibold text-slate-700">Calculus Error Pattern</span>
                        <span className="text-red-600 font-bold">High Priority</span>
                     </div>
                     <div className="h-4 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-red-500 w-3/4"></div>
                     </div>
                     <p className="text-sm text-slate-500">3 similar mistakes found in last test</p>
                  </div>
               </div>
            </motion.div>
          </div>

          {/* Mind Maps Section */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
             <motion.div
               className="lg:order-2"
               initial={{ opacity: 0, x: 30 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.6 }}
             >
              <div className="inline-flex items-center gap-2 bg-blue-100 px-4 py-2 rounded-full mb-4">
                <Brain className="h-5 w-5 text-blue-600" />
                <span className="text-sm font-bold text-blue-700 uppercase">Visual Learning</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                See the Bigger Picture
              </h2>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                Visual mind maps help students understand how ideas link together, making learning structured and logical instead of fragmented.
              </p>
              <p className="text-xl font-bold text-blue-800">
                Concepts connected, not isolated.
              </p>
            </motion.div>
            <motion.div
               className="lg:order-1 relative"
               initial={{ opacity: 0, x: -30 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.6 }}
            >
               <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-200">
                 <img 
                   src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&q=80" 
                   alt="Mind Map Illustration" 
                   className="w-full h-auto object-cover opacity-90"
                 />
               </div>
            </motion.div>
          </div>

        </div>
      </div>

      {/* Dashboard & Benefits */}
      <div className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Clear progress for students and parents
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* Dashboard Mockup */}
            <div className="bg-slate-900 rounded-3xl p-8 shadow-2xl text-white">
               <div className="flex items-center gap-3 mb-8 border-b border-slate-700 pb-4">
                  <LayoutDashboard className="h-6 w-6 text-amber-500" />
                  <span className="font-bold text-lg">Student Dashboard</span>
               </div>
               <div className="space-y-6">
                  <div className="flex justify-between items-center">
                     <span>Topic Strength</span>
                     <span className="text-green-400">Improving</span>
                  </div>
                  <div className="h-2 bg-slate-700 rounded-full">
                     <div className="h-full bg-gradient-to-r from-amber-500 to-orange-500 w-[78%] rounded-full"></div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                     <div className="bg-slate-800 p-4 rounded-xl">
                        <span className="text-slate-400 text-sm">Tests Taken</span>
                        <p className="text-2xl font-bold">24</p>
                     </div>
                     <div className="bg-slate-800 p-4 rounded-xl">
                        <span className="text-slate-400 text-sm">Avg Score</span>
                        <p className="text-2xl font-bold">82%</p>
                     </div>
                  </div>
               </div>
            </div>

            {/* Parent Benefits */}
            <div>
               <h3 className="text-2xl font-bold text-slate-900 mb-6">Why Parents Value Learn with Dash</h3>
               <div className="space-y-4">
                  {parentBenefits.map((benefit, index) => (
                     <motion.div 
                        key={index}
                        className="flex items-center gap-4 bg-amber-50 p-4 rounded-xl border border-amber-100"
                        whileHover={{ x: 10 }}
                     >
                        <CheckCircle className="h-6 w-6 text-orange-600 flex-shrink-0" />
                        <span className="text-slate-700 font-medium text-lg">{benefit}</span>
                     </motion.div>
                  ))}
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Closing CTA */}
      <div className="py-20 px-6">
        <motion.div
          className="max-w-4xl mx-auto text-center bg-gradient-to-br from-amber-500 via-orange-600 to-red-600 rounded-3xl p-12 md:p-16 relative overflow-hidden shadow-2xl"
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
            <TrendingUp className="h-16 w-16 text-white mx-auto mb-6" />
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              When learning adapts, confidence grows
            </h3>
            <p className="text-lg text-amber-100 mb-8 max-w-2xl mx-auto">
              Experience personalized learning that helps students excel at their own pace
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button className="inline-flex items-center gap-2 px-8 py-4 bg-white text-orange-600 font-semibold rounded-xl hover:bg-orange-50 transition-colors shadow-xl">
                Try Learn with Dash
                <BookOpen className="h-5 w-5" />
              </button>
              <button className="inline-flex items-center gap-2 px-8 py-4 bg-orange-700/50 backdrop-blur-sm border-2 border-white text-white font-semibold rounded-xl hover:bg-orange-700/70 transition-colors">
                View a Sample Dashboard
                <LayoutDashboard className="h-5 w-5" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LearnWithDashDetail;
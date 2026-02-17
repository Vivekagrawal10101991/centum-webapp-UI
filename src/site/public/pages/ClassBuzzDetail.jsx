import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Zap, 
  Users, 
  CheckCircle, 
  ArrowLeft, 
  Sparkles, 
  BarChart, 
  Eye, 
  Smartphone, 
  Radio, 
  Target, 
  AlertCircle 
} from 'lucide-react';

// Using Unsplash images to match Figma design 100%
const classroomImage1 = "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80";
const classroomImage2 = "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&q=80";

const ClassBuzzDetail = () => {
  const benefits = [
    {
      icon: Eye,
      title: "Assurance",
      description: "Attention is maintained in class"
    },
    {
      icon: BarChart,
      title: "Transparency",
      description: "Daily learning visibility"
    },
    {
      icon: AlertCircle,
      title: "Early Intervention",
      description: "Weak areas spotted before exams"
    },
    {
      icon: CheckCircle,
      title: "Reduced Pressure",
      description: "Less exam stress through continuous assessment"
    }
  ];

  const whyStudentsLove = [
    "Classes feel interactive and engaging",
    "Students actively participate",
    "Learning becomes fun, not passive",
    "Feedback is immediate"
  ];

  const trackingFeatures = [
    "Correct and incorrect responses",
    "Topic-wise understanding",
    "Speed and confidence of answers"
  ];

  const aiInsights = [
    "Weak topics",
    "Weak sub-topics",
    "Common misunderstanding patterns"
  ];

  return (
    <section className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-slate-50 font-sans">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-600 text-white py-20 px-6 overflow-hidden">
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
                <span className="text-sm font-bold uppercase tracking-wider">Classroom Engagement & Learning Visibility</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                Making classrooms attentive and learning measurable
              </h1>
              
              <p className="text-lg md:text-xl text-blue-100 mb-8 leading-relaxed">
                ClassBuzz uses AI-powered in-class quizzes to ensure students stay engaged, understanding is checked immediately, and parents get real visibility into daily learning.
              </p>

              <div className="flex flex-wrap gap-4">
                <button className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-colors shadow-lg">
                  See ClassBuzz in Action
                </button>
                <button className="px-6 py-3 bg-white/10 backdrop-blur-sm border-2 border-white text-white font-semibold rounded-xl hover:bg-white/20 transition-colors">
                  How It Helps My Child
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
                  src={classroomImage1}
                  alt="ClassBuzz - Interactive Classroom"
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 to-transparent"></div>
              </div>
              
              {/* Floating Icon */}
              <motion.div
                className="absolute -bottom-6 -right-6 w-24 h-24 bg-white rounded-2xl shadow-2xl flex items-center justify-center"
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Zap className="h-12 w-12 text-blue-600" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* The Classroom Reality */}
      <div className="py-20 px-6 bg-gradient-to-br from-slate-50 to-blue-50/30">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              Attention drops faster than we realise
            </h2>
            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
              In any classroom, attention naturally fades over time.<br />
              But the moment students know there will be a quiz, focus increases instantly.
            </p>
            <div className="inline-block bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-8 text-white shadow-2xl">
              <p className="text-xl font-bold">
                ClassBuzz combines this natural student psychology with technology.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* What is ClassBuzz */}
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
                Smart quizzes, right after teaching
              </h2>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                ClassBuzz is a classroom intelligence system that works during regular classes.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                  <p className="text-slate-700 text-lg">Teachers teach normally</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                  <p className="text-slate-700 text-lg">Immediately after the lesson, a short quiz checks how well students understood what was just taught</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src={classroomImage2}
                  alt="Engaged Classroom"
                  className="w-full h-[400px] object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* How Students Answer */}
      <div className="py-20 px-6 bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Focused learning without distractions
            </h2>
            <p className="text-lg text-slate-600 mb-8">
              Each student uses a simple handheld clicker with four buttons — A, B, C, and D.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Smartphone, text: "No mobile phones", color: "from-red-500 to-red-600" },
              { icon: Radio, text: "No apps", color: "from-orange-500 to-orange-600" },
              { icon: Target, text: "No distractions", color: "from-green-500 to-green-600" }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl p-8 text-center shadow-lg"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${item.color} rounded-2xl mb-4`}>
                  <item.icon className="h-8 w-8 text-white" />
                </div>
                <p className="text-slate-900 font-bold text-xl">{item.text}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <p className="text-lg text-slate-700 font-semibold">
              Questions appear on the smartboard and results are recorded instantly.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Why Students Enjoy */}
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
              Why Students Enjoy ClassBuzz
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {whyStudentsLove.map((reason, index) => (
              <motion.div
                key={index}
                className="flex items-start gap-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border-2 border-blue-100"
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Zap className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                <p className="text-slate-700 text-lg leading-relaxed">{reason}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Continuous Learning Tracking */}
      <div className="py-20 px-6 bg-gradient-to-br from-slate-50 to-blue-50/30">
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
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80"
                  alt="Learning Analytics"
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
                Parents don't just see marks — <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">they see learning</span>
              </h2>
              <p className="text-lg text-slate-600 mb-6">
                Every quiz captures:
              </p>
              <div className="space-y-4">
                {trackingFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <BarChart className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                    <p className="text-slate-700 text-lg leading-relaxed">{feature}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 bg-blue-100 border-l-4 border-blue-600 rounded-lg p-4">
                <p className="text-blue-900 font-semibold">
                  This data builds a year-long learning profile for every student.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* AI Insights */}
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
              Problems spotted <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">before exams</span>
            </h2>
            <p className="text-lg text-slate-600 mb-8">
              ClassBuzz uses AI to analyse quiz data and identify:
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {aiInsights.map((insight, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl p-8 text-white text-center shadow-xl"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <AlertCircle className="h-12 w-12 mx-auto mb-4" />
                <p className="text-xl font-bold">{insight}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="text-center bg-gradient-to-r from-green-100 to-emerald-100 rounded-2xl p-8 border-2 border-green-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-green-900 text-xl font-bold">
              Teachers can address gaps immediately — before they grow.
            </p>
          </motion.div>
        </div>
      </div>

      {/* What Parents Gain */}
      <div className="py-20 px-6 bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              What Parents Gain
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="h-14 w-14 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center mb-4 mx-auto">
                  <benefit.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{benefit.title}</h3>
                <p className="text-sm text-slate-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Closing CTA */}
      <div className="py-20 px-6">
        <motion.div
          className="max-w-4xl mx-auto text-center bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-600 rounded-3xl p-12 md:p-16 relative overflow-hidden shadow-2xl"
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
            <Users className="h-16 w-16 text-white mx-auto mb-6" />
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Attentive classrooms create confident learners
            </h3>
            <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
              See how ClassBuzz transforms classroom engagement and learning visibility
            </p>
            <Link to="/contact">
              <button className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-colors shadow-xl">
                Experience ClassBuzz
                <Zap className="h-5 w-5" />
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ClassBuzzDetail;
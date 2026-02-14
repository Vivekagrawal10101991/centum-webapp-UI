import React from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  Target, 
  Award, 
  BookOpen, 
  Heart, 
  CheckCircle,
  HandHeart,
  Library,
  GraduationCap,
  TrendingUp,
  ExternalLink
} from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: Target,
      title: "Our Mission",
      description: "To empower students through high-quality mentorship, innovative teaching practices, and personalised attention so that they excel in both academics and life.",
      color: "#7E3AF2" 
    },
    {
      icon: Award,
      title: "Our Vision",
      description: "To create an education ecosystem where every student enjoys learning, thinks critically, and grows into a confident contributor to society.",
      color: "#1C64F2" 
    },
    {
      icon: BookOpen,
      title: "Learning by Doing",
      description: "Students don't just memorise concepts but truly understand and apply them through practical, engaging, and innovative curriculum models.",
      color: "#F59E0B" 
    },
    {
      icon: Heart,
      title: "Education with Emotion",
      description: "We believe learning goes beyond textbooks. Our approach combines academic excellence with emotional intelligence and holistic development.",
      color: "#EF4444" 
    }
  ];

  const features = [
    "IIT & AIIMS Alumni Faculty",
    "Personalized Mentorship Programs",
    "Advanced Learning Management System",
    "Regular Parent-Teacher Meetings",
    "Comprehensive Study Material",
    "Mock Tests & Performance Analytics",
    "Doubt Clearing Sessions",
    "Career Counseling Support"
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans overflow-hidden">
      
      {/* 1. HEADER & OUR STORY SECTION */}
      <section id="about" className="py-20 md:py-28 px-6 bg-gradient-to-br from-white via-purple-50/30 to-blue-50/30 relative overflow-hidden">
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#7E3AF2] to-[#1C64F2] px-4 py-2 rounded-full mb-6 shadow-lg shadow-purple-500/20"
            >
              <Sparkles className="h-5 w-5 text-white" />
              <span className="text-sm font-bold text-white uppercase tracking-wider">ABOUT US</span>
            </motion.div>

            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight whitespace-nowrap"
            >
              Shaping Thinkers, <span className="bg-gradient-to-r from-[#7E3AF2] to-[#1C64F2] bg-clip-text text-transparent">Not Just Test-Takers</span>
            </motion.h2>

            <p className="text-lg md:text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
              At Centum Academy, we believe every student has the potential to excel when guided with the right mentorship and approach.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h3 className="text-3xl font-bold text-slate-900 mb-6 tracking-tight">Our Story</h3>
              <div className="space-y-5 text-slate-600 leading-relaxed text-lg font-normal">
                <p>Founded in Bangalore by a team of passionate IIT alumni, we are dedicated to transforming how education is delivered at the higher secondary level.</p>
                <p>Our philosophy of <strong className="text-slate-900 font-bold">"Learning by Doing"</strong> ensures that students don't just memorise concepts but truly understand and apply them.</p>
                <p>We design innovative curriculum models that make learning engaging, practical, and relevant to real life.</p>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative">
              <motion.div className="rounded-2xl overflow-hidden shadow-2xl border border-slate-100" whileHover={{ scale: 1.05 }}>
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1080"
                  alt="Students learning"
                  className="w-full h-[450px] object-cover"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. OUR CORE VALUES SECTION */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-slate-900 mb-12 text-center"
          >
            Our Core Values
          </motion.h3>
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {values.map((v, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100"
              >
                <div 
                  className="h-14 w-14 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: `linear-gradient(135deg, ${v.color}20, ${v.color}40)` }}
                >
                  <v.icon className="h-7 w-7" style={{ color: v.color }} />
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-2">{v.title}</h4>
                <p className="text-sm text-slate-600 leading-relaxed">{v.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 3. WHY CHOOSE SECTION */}
      <section className="py-24 px-6 bg-slate-50">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto bg-gradient-to-br from-[#7E3AF2] to-[#1C64F2] rounded-3xl p-12 text-white shadow-2xl"
        >
          <h3 className="text-3xl font-bold mb-10 text-center">Why Choose Centum Academy?</h3>
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="flex items-start gap-3"
              >
                <CheckCircle className="h-5 w-5 text-[#F59E0B] flex-shrink-0 mt-0.5" />
                <span className="text-sm font-medium">{feature}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* 4. CONTRIBUTIONS SECTION - EXACT FIGMA MATCH */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#00A67E] to-[#059669] px-4 py-2 rounded-full mb-6 shadow-lg shadow-emerald-500/20"
            >
              <HandHeart className="h-5 w-5 text-white" />
              <span className="text-sm font-bold text-white uppercase tracking-wider">
                Our Contributions
              </span>
            </motion.div>
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl font-bold text-slate-900 mb-4"
            >
              Centum Academy's <span className="bg-gradient-to-r from-[#00A67E] to-[#059669] bg-clip-text text-transparent">Contribution</span> In Education
            </motion.h3>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed"
            >
              Empowering learners nationwide and shaping futures through strategic partnerships and social initiatives
            </motion.p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* NDLI Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="bg-white rounded-3xl shadow-xl border-2 border-slate-50 overflow-hidden hover:shadow-2xl transition-all duration-300"
            >
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-8 text-white">
                <div className="flex items-start justify-between mb-4">
                  <div className="h-16 w-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                    <Library className="h-8 w-8 text-white" />
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="text-xs font-bold uppercase tracking-wider">Since 2020</span>
                  </div>
                </div>
                <h4 className="text-2xl font-bold mb-2">National Digital Library of India (NDLI)</h4>
                <p className="text-blue-100 text-sm leading-relaxed">
                  Empowering learners nationwide — Centum resources, now part of India's largest digital learning hub
                </p>
              </div>
              
              <div className="p-8">
                <h5 className="text-lg font-bold text-slate-900 mb-3">Expanding Access Through NDLI Partnership</h5>
                <p className="text-slate-600 mb-6 text-sm leading-relaxed">
                  Centum Academy proudly partners with the National Digital Library of India (NDLI) to make quality academic and competitive exam resources accessible to every learner, anywhere in the country.
                </p>

                <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-4 mb-6">
                  <div className="flex items-start gap-3">
                    <TrendingUp className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-blue-900 text-sm mb-1">Impact</p>
                      <p className="text-blue-800 text-xs leading-relaxed">
                        Breaking barriers of geography and access, empowering students across India to prepare smarter and achieve more.
                      </p>
                    </div>
                  </div>
                </div>

                <a
                  href="https://ndl.iitkgp.ac.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-bold text-xs uppercase tracking-widest transition-colors group"
                >
                  Visit NDLI Platform
                  <ExternalLink className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </motion.div>

            {/* PRAYAS Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="bg-white rounded-3xl shadow-xl border-2 border-slate-50 overflow-hidden hover:shadow-2xl transition-all duration-300"
            >
              <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 p-8 text-white">
                <div className="flex items-start justify-between mb-4">
                  <div className="h-16 w-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                    <GraduationCap className="h-8 w-8 text-white" />
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="text-xs font-bold uppercase tracking-wider">Since 2020</span>
                  </div>
                </div>
                <h4 className="text-2xl font-bold mb-2">PRAYAS Project, Chhattisgarh</h4>
                <p className="text-emerald-100 text-sm leading-relaxed">
                  Shaping futures in the heart of Chhattisgarh — free coaching for tribal girls since 2020
                </p>
              </div>
              
              <div className="p-8">
                <h5 className="text-lg font-bold text-slate-900 mb-3">Free Coaching & Mentorship for Tribal Girls</h5>
                <p className="text-slate-600 mb-6 text-sm leading-relaxed">
                  Since 2020, Centum Academy has been teaching and mentoring tribal girls for free under the PRAYAS Project, helping them crack national entrance exams.
                </p>

                <div className="bg-emerald-50 border-l-4 border-emerald-500 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Award className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-emerald-900 text-sm mb-1">Impact</p>
                      <p className="text-emerald-800 text-xs leading-relaxed">
                        Multiple PRAYAS students have secured MBBS seats and admissions in top institutions, proving that with the right guidance, talent knows no boundaries.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;
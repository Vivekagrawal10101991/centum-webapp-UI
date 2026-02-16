import React from 'react';
import { motion } from 'framer-motion';
import { 
  Target, 
  Eye, 
  Heart, 
  Lightbulb, 
  Users, 
  Award, 
  TrendingUp, 
  Globe 
} from 'lucide-react';

/**
 * VisionMission Component
 * Fully updated to match Figma design exactly in terms of layout, colors, and typography.
 *
 */
const VisionMission = () => {
  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* 1. Hero Section - Matches Figma Gradient and Height */}
      <div className="relative bg-gradient-to-br from-[#1E3A8A] via-[#2563EB] to-[#0D9488] text-white py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-6 text-center z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full mb-6"
          >
            <Target className="h-6 w-6" />
            <span className="text-sm font-semibold uppercase tracking-wider">Our Purpose</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            Vision & Mission
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed"
          >
            Transforming lives through education with emotion, building futures with excellence
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        {/* 2. Vision Section - 2 Column Layout */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 bg-purple-100 text-[#7E3AF2] px-4 py-2 rounded-full mb-6">
              <Eye className="h-5 w-5" />
              <span className="text-sm font-semibold uppercase tracking-wide">Our Vision</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 tracking-tight leading-tight">
              Building Tomorrow's Leaders Today
            </h2>
            <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
              <p>
                At Centum Academy, we envision a world where every student has access to world-class education 
                that not only prepares them for competitive examinations but also shapes them into compassionate, 
                innovative, and responsible citizens.
              </p>
              <p>
                We strive to be the most trusted and respected education institution, setting benchmarks in 
                academic excellence, student care, and holistic development. Our vision extends beyond classroom 
                success to creating leaders who will positively impact society.
              </p>
            </div>
          </motion.div>

          {/* Vision Feature Cards with Specific Brand Gradients */}
          <div className="grid grid-cols-2 gap-4">
            <motion.div 
              whileHover={{ y: -5 }}
              className="p-6 bg-gradient-to-br from-purple-50 to-blue-50 border-none rounded-2xl shadow-sm transition-all"
            >
              <Globe className="h-10 w-10 text-[#7E3AF2] mb-4" />
              <h3 className="font-bold text-slate-900 mb-2">Global Standards</h3>
              <p className="text-sm text-slate-600">World-class education for every student</p>
            </motion.div>
            
            <motion.div 
              whileHover={{ y: -5 }}
              className="p-6 bg-gradient-to-br from-blue-50 to-teal-50 border-none rounded-2xl shadow-sm transition-all"
            >
              <Users className="h-10 w-10 text-[#1C64F2] mb-4" />
              <h3 className="font-bold text-slate-900 mb-2">Inclusive Growth</h3>
              <p className="text-sm text-slate-600">Accessible quality education for all</p>
            </motion.div>
            
            <motion.div 
              whileHover={{ y: -5 }}
              className="p-6 bg-gradient-to-br from-teal-50 to-green-50 border-none rounded-2xl shadow-sm transition-all"
            >
              <Lightbulb className="h-10 w-10 text-[#00A67E] mb-4" />
              <h3 className="font-bold text-slate-900 mb-2">Innovation</h3>
              <p className="text-sm text-slate-600">Modern teaching methodologies</p>
            </motion.div>
            
            <motion.div 
              whileHover={{ y: -5 }}
              className="p-6 bg-gradient-to-br from-green-50 to-yellow-50 border-none rounded-2xl shadow-sm transition-all"
            >
              <Award className="h-10 w-10 text-[#F59E0B] mb-4" />
              <h3 className="font-bold text-slate-900 mb-2">Excellence</h3>
              <p className="text-sm text-slate-600">Uncompromising quality standards</p>
            </motion.div>
          </div>
        </div>

        {/* 3. Mission Section - Large Split-Layout Card */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl shadow-xl overflow-hidden mb-24"
        >
          <div className="grid lg:grid-cols-2">
            {/* Mission Left Panel (Colored) */}
            <div className="bg-gradient-to-br from-[#7E3AF2] to-[#1C64F2] text-white p-8 md:p-12">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                <Target className="h-5 w-5" />
                <span className="text-sm font-semibold uppercase tracking-wide">Our Mission</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
                Empowering Students Through Education with Emotion
              </h2>
              <p className="text-white/90 text-lg leading-relaxed">
                Our mission is to provide comprehensive, emotion-driven education that nurtures intellectual 
                curiosity, builds strong character, and prepares students for success in competitive examinations 
                and life beyond.
              </p>
            </div>

            {/* Mission Right Panel (List Items) */}
            <div className="p-8 md:p-12 bg-slate-50">
              <div className="space-y-6">
                {[
                  { icon: Heart, color: "#7E3AF2", bg: "bg-purple-100", title: "Student-Centric Approach", text: "Understanding and addressing individual learning needs with care and empathy" },
                  { icon: Award, color: "#1C64F2", bg: "bg-blue-100", title: "Academic Excellence", text: "Delivering top-tier education through expert faculty and proven methodologies" },
                  { icon: TrendingUp, color: "#00A67E", bg: "bg-teal-100", title: "Continuous Improvement", text: "Regular assessment, feedback, and adaptation to ensure optimal learning outcomes" },
                  { icon: Users, color: "#F59E0B", bg: "bg-amber-100", title: "Holistic Development", text: "Fostering overall growth - academic, emotional, and social competencies" }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className={`flex-shrink-0 w-12 h-12 rounded-lg ${item.bg} flex items-center justify-center shadow-sm`}>
                      <item.icon className="h-6 w-6" style={{ color: item.color }} />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
                      <p className="text-slate-600 leading-snug">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* 4. Core Values Section - Card Grid with Top Borders */}
        <div>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Our Core Values</h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
              The principles that guide everything we do at Centum Academy
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Heart, color: "#7E3AF2", bg: "bg-purple-100", title: "Empathy", text: "Understanding and caring for each student's unique journey" },
              { icon: Award, color: "#1C64F2", bg: "bg-blue-100", title: "Excellence", text: "Striving for the highest standards in everything we do" },
              { icon: Lightbulb, color: "#00A67E", bg: "bg-green-100", title: "Innovation", text: "Embracing new ideas and modern teaching methods" },
              { icon: Users, color: "#F59E0B", bg: "bg-amber-100", title: "Integrity", text: "Maintaining honesty, transparency, and ethical practices" }
            ].map((value, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -8 }}
                className="p-8 text-center bg-white rounded-2xl shadow-md border-t-4 hover:shadow-lg transition-all"
                style={{ borderTopColor: value.color }}
              >
                <div className={`w-16 h-16 ${value.bg} rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner`}>
                  <value.icon className="h-8 w-8" style={{ color: value.color }} />
                </div>
                <h3 className="font-bold text-xl text-slate-900 mb-3 tracking-tight">{value.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{value.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisionMission;
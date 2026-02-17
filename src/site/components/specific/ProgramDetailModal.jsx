import React from 'react';
import { X, Clock, Users, BookOpen, Award, CheckCircle, Star, Calendar, Target, TrendingUp, Phone, Mail, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from 'framer-motion';

export function ProgramDetailModal({ course, onClose }) {
  return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 overflow-y-auto font-sans"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="min-h-screen py-8 px-4 flex items-center justify-center">
          <motion.div 
            className="max-w-6xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
          >
            {/* Header with Gradient */}
            <div className={`bg-gradient-to-br ${course.color} p-8 md:p-12 relative`}>
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 h-10 w-10 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors flex items-center justify-center border border-white/30"
              >
                <X className="h-5 w-5 text-white" />
              </button>

              <div className="flex flex-col md:flex-row gap-6 items-start">
                {/* Icon */}
                <div className="h-20 w-20 rounded-2xl bg-white/20 backdrop-blur-sm border-2 border-white/30 flex items-center justify-center shadow-xl">
                  <course.icon className="h-10 w-10 text-white" />
                </div>

                {/* Title and Badge */}
                <div className="flex-1">
                  <span className="inline-block bg-white/20 backdrop-blur-sm text-white text-sm font-semibold px-4 py-1.5 rounded-full border border-white/30 mb-3">
                    {course.badge}
                  </span>
                  <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
                    {course.title}
                  </h1>
                  <p className="text-white/90 text-lg max-w-3xl">
                    {course.fullDescription}
                  </p>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <Clock className="h-6 w-6 text-white mb-2" />
                  <p className="text-white/80 text-xs uppercase tracking-wider font-semibold">Duration</p>
                  <p className="text-white font-bold">{course.duration}</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <Users className="h-6 w-6 text-white mb-2" />
                  <p className="text-white/80 text-xs uppercase tracking-wider font-semibold">Batch Size</p>
                  <p className="text-white font-bold">{course.batchSize}</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <Award className="h-6 w-6 text-white mb-2" />
                  <p className="text-white/80 text-xs uppercase tracking-wider font-semibold">Success Rate</p>
                  <p className="text-white font-bold">95%+</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <Star className="h-6 w-6 text-white mb-2" />
                  <p className="text-white/80 text-xs uppercase tracking-wider font-semibold">Rating</p>
                  <p className="text-white font-bold">4.8/5</p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-8 md:p-12">
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Main Content - Left 2/3 */}
                <div className="lg:col-span-2 space-y-10">
                  {/* Program Highlights */}
                  <div>
                    <div className="flex items-center gap-2 mb-6">
                      <Target className="h-6 w-6 text-[#7E3AF2]" />
                      <h2 className="text-2xl font-bold text-slate-900">Program Highlights</h2>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      {course.highlights.map((highlight, idx) => (
                        <div key={idx} className="flex items-start gap-3 bg-purple-50 p-4 rounded-xl border border-purple-100">
                          <CheckCircle className="h-5 w-5 text-[#7E3AF2] flex-shrink-0 mt-0.5" />
                          <span className="text-slate-700 text-sm font-medium">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Curriculum */}
                  <div>
                    <div className="flex items-center gap-2 mb-6">
                      <BookOpen className="h-6 w-6 text-[#1C64F2]" />
                      <h2 className="text-2xl font-bold text-slate-900">Curriculum Overview</h2>
                    </div>
                    <div className="space-y-4">
                      {course.curriculum.map((phase, idx) => (
                        <div key={idx} className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                          <h3 className="text-lg font-bold text-[#1C64F2] mb-3">{phase.phase}</h3>
                          <ul className="space-y-2">
                            {phase.topics.map((topic, topicIdx) => (
                              <li key={topicIdx} className="flex items-start gap-2">
                                <div className="h-1.5 w-1.5 rounded-full bg-[#1C64F2] mt-2 flex-shrink-0"></div>
                                <span className="text-slate-700 text-sm font-medium">{topic}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Faculty */}
                  <div>
                    <div className="flex items-center gap-2 mb-6">
                      <Users className="h-6 w-6 text-[#F59E0B]" />
                      <h2 className="text-2xl font-bold text-slate-900">Expert Faculty</h2>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      {course.faculty.map((teacher, idx) => (
                        <div key={idx} className="bg-amber-50 rounded-xl p-6 border border-amber-100">
                          <h3 className="text-lg font-bold text-slate-900 mb-1">{teacher.name}</h3>
                          <p className="text-[#F59E0B] text-sm font-bold mb-2">{teacher.qualification}</p>
                          <p className="text-slate-600 text-sm">{teacher.experience}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Success Stories */}
                  <div>
                    <div className="flex items-center gap-2 mb-6">
                      <TrendingUp className="h-6 w-6 text-[#00A67E]" />
                      <h2 className="text-2xl font-bold text-slate-900">Success Stories</h2>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      {course.successStories.map((story, idx) => (
                        <div key={idx} className="bg-green-50 rounded-xl p-6 border border-green-100">
                          <div className="flex items-center gap-1 mb-3">
                            {[1, 2, 3, 4, 5].map((_, i) => (
                              <Star key={i} className="h-4 w-4 text-[#F59E0B] fill-[#F59E0B]" />
                            ))}
                          </div>
                          <h3 className="text-lg font-bold text-slate-900 mb-1">{story.name}</h3>
                          <p className="text-[#00A67E] text-xs font-bold mb-3 uppercase tracking-wide">{story.achievement}</p>
                          <p className="text-slate-600 text-sm italic">"{story.review}"</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Sidebar - Right 1/3 */}
                <div className="lg:col-span-1 space-y-6">
                  {/* Enrollment Card */}
                  <div className="bg-gradient-to-br from-[#7E3AF2] to-[#6749D4] rounded-2xl p-6 text-white sticky top-4 shadow-xl">
                    <h3 className="text-xl font-bold mb-6">Enroll Now</h3>
                    
                    {/* Fee Structure */}
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-4 border border-white/20">
                      <p className="text-white/80 text-sm mb-1">Course Fee</p>
                      <p className="text-3xl font-bold mb-2">{course.feeStructure.total}</p>
                      <p className="text-white/80 text-xs">or {course.feeStructure.installments}</p>
                      <div className="mt-3 pt-3 border-t border-white/20">
                        <p className="text-sm">
                          <span className="font-semibold text-yellow-300">Early Bird Offer:</span> {course.feeStructure.earlyBird}
                        </p>
                      </div>
                    </div>

                    {/* Schedule */}
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-6 border border-white/20">
                      <div className="flex items-center gap-2 mb-3">
                        <Calendar className="h-5 w-5" />
                        <p className="font-semibold">Class Schedule</p>
                      </div>
                      <div className="space-y-2 text-sm">
                        <p><span className="text-white/80">Days:</span> {course.schedule.days}</p>
                        <p><span className="text-white/80">Timing:</span> {course.schedule.timing}</p>
                        <p><span className="text-white/80">Mode:</span> {course.schedule.mode}</p>
                      </div>
                    </div>

                    {/* CTA Buttons */}
                    <button className="w-full bg-white text-[#7E3AF2] hover:bg-slate-100 font-bold py-3 px-6 rounded-xl mb-3 flex items-center justify-center gap-2 transition-colors shadow-lg">
                      Apply Now
                      <ArrowRight className="h-4 w-4" />
                    </button>
                    <button className="w-full border-2 border-white text-white hover:bg-white/10 font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-colors">
                      <Phone className="h-4 w-4" />
                      Book Free Demo
                    </button>
                  </div>

                  {/* Eligibility */}
                  <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                    <h3 className="font-bold text-slate-900 mb-3">Eligibility</h3>
                    <p className="text-slate-600 text-sm font-medium">{course.eligibility}</p>
                  </div>

                  {/* Contact */}
                  <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                    <h3 className="font-bold text-slate-900 mb-3">Need Help?</h3>
                    <div className="space-y-3">
                      <a href="tel:+919108933332" className="flex items-center gap-2 text-sm text-slate-600 hover:text-[#7E3AF2] font-medium transition-colors">
                        <Phone className="h-4 w-4" />
                        +91 91089 33332
                      </a>
                      <a href="mailto:contactus@centumacademy.com" className="flex items-center gap-2 text-sm text-slate-600 hover:text-[#7E3AF2] font-medium transition-colors">
                        <Mail className="h-4 w-4" />
                        contactus@centumacademy.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
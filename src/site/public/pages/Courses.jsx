import React, { useState } from 'react';
import { 
  BookOpen, 
  GraduationCap, 
  School, 
  Zap, 
  ArrowRight, 
  Target, 
  Users, 
  Clock, 
  Award, 
  Sparkles, 
  CheckCircle 
} from "lucide-react";
import { motion } from "framer-motion";
import { ProgramDetailModal } from "../../components/specific/ProgramDetailModal";

const Courses = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);

  // Animation Variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const programCategories = [
    {
      name: "JEE Preparation",
      icon: GraduationCap,
      color: "#1C64F2",
      description: "Comprehensive engineering entrance preparation",
      count: 2
    },
    {
      name: "NEET Preparation",
      icon: BookOpen,
      color: "#00A67E",
      description: "Complete medical entrance coaching",
      count: 2
    },
    {
      name: "Foundation Courses",
      icon: Target,
      color: "#F59E0B",
      description: "Building strong basics for future success",
      count: 2
    }
  ];

  const courses = [
    {
      title: "JEE Main + Advanced + KCET",
      badge: "School Integrated",
      category: "JEE",
      description: "Comprehensive program for students in school with integrated curriculum",
      icon: GraduationCap,
      features: ["Live Classes", "Study Material", "Mock Tests", "Doubt Clearing"],
      color: "from-blue-500 to-cyan-500",
      fullDescription: "Complete preparation program for JEE Main, Advanced & KCET while continuing school education. Perfect blend of board exam preparation and competitive exam coaching.",
      duration: "2 Years",
      batchSize: "30-35 Students",
      eligibility: "Students currently in Class 11 or 12",
      highlights: [
        "Dual Focus: Board Exams + JEE/KCET",
        "Weekend doubt clearing sessions",
        "Regular parent-teacher meetings",
        "Comprehensive study material",
        "Online test series access",
        "Personal mentorship program",
        "Career counseling sessions",
        "Time management training"
      ],
      curriculum: [
        {
          phase: "Phase 1: Foundation (Months 1-8)",
          topics: [
            "Complete Class 11 syllabus coverage",
            "Fundamental concepts in Physics, Chemistry & Mathematics",
            "Weekly chapter tests",
            "Monthly comprehensive tests"
          ]
        },
        {
          phase: "Phase 2: Advanced (Months 9-16)",
          topics: [
            "Class 12 syllabus with JEE integration",
            "Advanced problem solving",
            "Previous year JEE questions",
            "State board exam preparation"
          ]
        },
        {
          phase: "Phase 3: Revision & Practice (Months 17-24)",
          topics: [
            "Complete syllabus revision",
            "Full-length mock tests",
            "Exam strategy sessions",
            "Final preparation guidance"
          ]
        }
      ],
      faculty: [
        {
          name: "Dr. Rajesh Kumar",
          qualification: "IIT Delhi, M.Sc Physics",
          experience: "12+ years teaching JEE Physics with 500+ selections"
        },
        {
          name: "Prof. Anita Sharma",
          qualification: "IIT Bombay, PhD Chemistry",
          experience: "10+ years experience with specialization in Organic Chemistry"
        },
        {
          name: "Mr. Suresh Patel",
          qualification: "IIT Madras, B.Tech",
          experience: "8+ years teaching Mathematics with focus on calculus"
        }
      ],
      feeStructure: {
        total: "₹1,80,000",
        installments: "₹20,000/month",
        earlyBird: "Save ₹20,000"
      },
      schedule: {
        days: "Mon-Sat",
        timing: "4:00 PM - 8:00 PM",
        mode: "Hybrid (Online + Offline)"
      },
      successStories: [
        {
          name: "Rahul Verma",
          achievement: "AIR 142 in JEE Advanced 2024",
          review: "The integrated program helped me balance board exams and JEE preparation perfectly. The faculty support was exceptional!"
        },
        {
          name: "Priya Singh",
          achievement: "99.2 percentile in JEE Mains 2024",
          review: "Best decision I made was joining Centum Academy. The study material and teaching methodology are top-notch."
        }
      ]
    },
    {
      title: "JEE Main + Advanced + KCET",
      badge: "Non-School Integrated",
      category: "JEE",
      description: "Intensive program for droppers and non-school students",
      icon: Zap,
      features: ["Full Day Classes", "Comprehensive Study Material", "Weekly Tests", "Personal Mentor"],
      color: "from-purple-500 to-pink-500",
      fullDescription: "Intensive full-time program designed specifically for dropper students and those who want dedicated JEE preparation without school commitments.",
      duration: "1 Year",
      batchSize: "25-30 Students",
      eligibility: "12th passed or dropper students",
      highlights: [
        "Full day dedicated coaching",
        "Crash course option available",
        "Daily practice sessions",
        "Personal mentor assigned",
        "Weekly performance analysis",
        "Comprehensive test series",
        "Study hall facility",
        "Doubt clearing sessions"
      ],
      curriculum: [
        {
          phase: "Phase 1: Complete Syllabus (Months 1-6)",
          topics: [
            "Rapid coverage of entire JEE syllabus",
            "Daily 8 hours of intensive classes",
            "Topic-wise tests after each chapter",
            "Focus on problem-solving techniques"
          ]
        },
        {
          phase: "Phase 2: Advanced Practice (Months 7-9)",
          topics: [
            "Advanced level problems",
            "Previous 10 years JEE questions",
            "Time-bound practice sessions",
            "Weak area identification and improvement"
          ]
        },
        {
          phase: "Phase 3: Final Revision (Months 10-12)",
          topics: [
            "Complete syllabus revision",
            "Daily full-length mock tests",
            "Exam strategy and time management",
            "Last-minute tips and tricks"
          ]
        }
      ],
      faculty: [
        {
          name: "Mr. Vikram Mehta",
          qualification: "IIT Kanpur, B.Tech + M.Tech",
          experience: "15+ years experience with focus on dropper batches"
        },
        {
          name: "Dr. Meera Reddy",
          qualification: "IIT Roorkee, PhD",
          experience: "12+ years experience, ex-FIITJEE faculty"
        }
      ],
      feeStructure: {
        total: "₹1,50,000",
        installments: "₹15,000/month",
        earlyBird: "Save ₹15,000"
      },
      schedule: {
        days: "Mon-Sat",
        timing: "8:00 AM - 5:00 PM",
        mode: "Offline Only"
      },
      successStories: [
        {
          name: "Arjun Kapoor",
          achievement: "AIR 89 in JEE Advanced (Dropper)",
          review: "After one unsuccessful attempt, Centum Academy helped me achieve my IIT dream. The intensive program was exactly what I needed."
        }
      ]
    },
    {
      title: "NEET Program",
      badge: "School Integrated",
      category: "NEET",
      description: "Complete NEET preparation while continuing school education",
      icon: BookOpen,
      features: ["Medical Entrance Prep", "NCERT Based", "Regular Tests", "Biology Focus"],
      color: "from-green-500 to-emerald-500",
      fullDescription: "Comprehensive NEET preparation program integrated with school schedule. NCERT-focused approach with emphasis on conceptual clarity in Biology, Physics and Chemistry.",
      duration: "2 Years",
      batchSize: "30-35 Students",
      eligibility: "Students in Class 11 or 12",
      highlights: [
        "NCERT-based teaching methodology",
        "Special focus on Biology",
        "Board exam + NEET preparation",
        "Regular mock tests",
        "Previous year question analysis",
        "Medical career counseling",
        "AIIMS pattern practice",
        "Hospital visit programs"
      ],
      curriculum: [
        {
          phase: "Phase 1: NCERT Foundation (Months 1-8)",
          topics: [
            "Complete Class 11 NCERT coverage",
            "Biology: Botany & Zoology basics",
            "Physics: Mechanics & Thermodynamics",
            "Chemistry: Organic & Inorganic fundamentals"
          ]
        },
        {
          phase: "Phase 2: Advanced Concepts (Months 9-18)",
          topics: [
            "Class 12 NCERT with NEET integration",
            "Advanced Biology topics",
            "Medical entrance problem solving",
            "Regular NEET pattern tests"
          ]
        },
        {
          phase: "Phase 3: Revision & Testing (Months 19-24)",
          topics: [
            "Complete NCERT revision",
            "Full-length NEET mock tests",
            "Previous 15 years NEET questions",
            "Exam strategy and time management"
          ]
        }
      ],
      faculty: [
        {
          name: "Dr. Kavita Joshi",
          qualification: "MBBS, MD from AIIMS",
          experience: "10+ years teaching Biology, 200+ NEET selections"
        },
        {
          name: "Prof. Amit Desai",
          qualification: "M.Sc Chemistry, PhD",
          experience: "12+ years NEET Chemistry expert"
        }
      ],
      feeStructure: {
        total: "₹1,60,000",
        installments: "₹18,000/month",
        earlyBird: "Save ₹18,000"
      },
      schedule: {
        days: "Mon-Sat",
        timing: "4:00 PM - 8:00 PM",
        mode: "Hybrid (Online + Offline)"
      },
      successStories: [
        {
          name: "Sneha Patel",
          achievement: "AIR 234 in NEET 2024",
          review: "The NCERT-focused approach and excellent Biology faculty helped me achieve my dream of becoming a doctor."
        }
      ]
    },
    {
      title: "NEET Program",
      badge: "Full Time",
      category: "NEET",
      description: "Dedicated NEET preparation program with intensive training",
      icon: School,
      features: ["Full Day Program", "Medical Mentorship", "AIIMS Pattern", "Hospital Visits"],
      color: "from-teal-500 to-cyan-500",
      fullDescription: "Full-time dedicated NEET preparation for dropper students and those seeking complete focus on medical entrance exams.",
      duration: "1 Year",
      batchSize: "25-30 Students",
      eligibility: "12th passed or dropper students",
      highlights: [
        "Full day medical entrance coaching",
        "NEET + AIIMS pattern coverage",
        "Daily practice sessions",
        "Medical mentor guidance",
        "Hospital internship programs",
        "Career counseling",
        "Comprehensive test series",
        "Biology lab sessions"
      ],
      curriculum: [
        {
          phase: "Phase 1: Complete Syllabus (Months 1-6)",
          topics: [
            "Rapid NCERT coverage",
            "Daily 8 hours intensive classes",
            "Special Biology focus sessions",
            "Weekly chapter tests"
          ]
        },
        {
          phase: "Phase 2: Advanced & Practice (Months 7-9)",
          topics: [
            "Advanced medical concepts",
            "Previous years NEET analysis",
            "AIIMS pattern questions",
            "Time management practice"
          ]
        },
        {
          phase: "Phase 3: Final Preparation (Months 10-12)",
          topics: [
            "Complete revision program",
            "Daily full-length tests",
            "Exam strategy sessions",
            "Last minute preparation"
          ]
        }
      ],
      faculty: [
        {
          name: "Dr. Ramesh Gupta",
          qualification: "MBBS, MD from CMC Vellore",
          experience: "15+ years NEET coaching, 500+ selections"
        }
      ],
      feeStructure: {
        total: "₹1,40,000",
        installments: "₹14,000/month",
        earlyBird: "Save ₹14,000"
      },
      schedule: {
        days: "Mon-Sat",
        timing: "8:00 AM - 5:00 PM",
        mode: "Offline Only"
      },
      successStories: [
        {
          name: "Aditya Kumar",
          achievement: "AIR 156 in NEET (Dropper)",
          review: "The full-time program transformed my preparation. The faculty knows exactly what NEET demands."
        }
      ]
    },
    {
      title: "Foundation Program",
      badge: "School Integrated",
      category: "Foundation",
      description: "Building strong fundamentals for Classes 8, 9 & 10",
      icon: BookOpen,
      features: ["Conceptual Learning", "Board + Competition", "Olympiad Prep", "Career Guidance"],
      color: "from-orange-500 to-yellow-500",
      fullDescription: "Strong foundation program for classes 8-10 that builds conceptual clarity and prepares students for future competitive exams.",
      duration: "1-3 Years",
      batchSize: "30-35 Students",
      eligibility: "Students in Class 8, 9 or 10",
      highlights: [
        "Strong conceptual foundation",
        "Board exam excellence",
        "Olympiad preparation",
        "NTSE/KVPY preparation",
        "Critical thinking development",
        "Problem-solving skills",
        "Early career guidance",
        "Aptitude development"
      ],
      curriculum: [
        {
          phase: "Core Subjects",
          topics: [
            "Mathematics: Advanced problem solving",
            "Science: Physics, Chemistry, Biology basics",
            "Mental ability and logical reasoning",
            "Olympiad level questions practice"
          ]
        },
        {
          phase: "Skill Development",
          topics: [
            "Communication skills",
            "Time management",
            "Study techniques",
            "Exam strategies"
          ]
        }
      ],
      faculty: [
        {
          name: "Mrs. Deepa Rao",
          qualification: "M.Sc Mathematics",
          experience: "10+ years teaching foundation courses"
        }
      ],
      feeStructure: {
        total: "₹60,000/year",
        installments: "₹6,000/month",
        earlyBird: "Save ₹5,000"
      },
      schedule: {
        days: "Mon-Fri",
        timing: "5:00 PM - 7:00 PM",
        mode: "Hybrid (Online + Offline)"
      },
      successStories: [
        {
          name: "Rohan Malhotra",
          achievement: "Gold Medal in NMTC",
          review: "The foundation program built my basics so strong that I excel in every competition now."
        }
      ]
    },
    {
      title: "Foundation Program",
      badge: "Fast Track",
      category: "Foundation",
      description: "Accelerated learning program for quick skill development",
      icon: Zap,
      features: ["Intensive Batches", "Quick Revision", "Smart Learning", "Practice Sessions"],
      color: "from-red-500 to-orange-500",
      fullDescription: "Fast-track foundation program for students who want intensive preparation in a shorter duration.",
      duration: "6 Months",
      batchSize: "20-25 Students",
      eligibility: "Students in Class 9 or 10",
      highlights: [
        "Intensive learning schedule",
        "Crash course format",
        "Board exam focus",
        "Quick revision techniques",
        "Smart learning methods",
        "Daily practice sessions",
        "Doubt clearing",
        "Test series included"
      ],
      curriculum: [
        {
          phase: "Accelerated Learning (Months 1-4)",
          topics: [
            "Rapid syllabus coverage",
            "Important topics focus",
            "Smart study techniques",
            "Time-saving methods"
          ]
        },
        {
          phase: "Practice & Revision (Months 5-6)",
          topics: [
            "Complete revision",
            "Mock tests",
            "Board exam patterns",
            "Last minute preparation"
          ]
        }
      ],
      faculty: [
        {
          name: "Mr. Karthik Iyer",
          qualification: "B.Tech IIT Madras",
          experience: "8+ years fast-track programs expert"
        }
      ],
      feeStructure: {
        total: "₹40,000",
        installments: "₹7,000/month",
        earlyBird: "Save ₹4,000"
      },
      schedule: {
        days: "Mon-Sat",
        timing: "6:00 PM - 9:00 PM",
        mode: "Offline Only"
      },
      successStories: [
        {
          name: "Divya Nair",
          achievement: "95% in Board Exams",
          review: "The fast-track program was perfect for my last-minute preparation. Highly recommended!"
        }
      ]
    }
  ];

  const highlights = [
    {
      icon: Award,
      title: "Expert Faculty",
      description: "IIT & AIIMS alumni with proven track record"
    },
    {
      icon: Users,
      title: "Small Batches",
      description: "Personalized attention with 25-35 students per batch"
    },
    {
      icon: Target,
      title: "Result-Oriented",
      description: "95% success rate with 500+ IIT & 300+ medical selections"
    },
    {
      icon: Clock,
      title: "Flexible Timings",
      description: "School-integrated and full-time programs available"
    }
  ];

  return (
    <div className="min-h-screen bg-white font-sans">
      <section id="programs" className="bg-gradient-to-br from-white via-purple-50/30 to-blue-50/30 relative overflow-hidden">
        {/* Animated Background */}
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        <div className="max-w-7xl mx-auto relative z-10 py-20 px-6">
          {/* Header */}
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#7E3AF2] to-[#1C64F2] px-4 py-2 rounded-full mb-4 shadow-sm">
              <Sparkles className="h-5 w-5 text-white" />
              <span className="text-sm font-bold text-white uppercase tracking-wider">
                OUR PROGRAMS
              </span>
            </div>
            <h2 className="text-5xl font-black text-slate-900 mb-4 tracking-tight">
              Discover Your Path to <span className="bg-gradient-to-r from-[#7E3AF2] to-[#1C64F2] bg-clip-text text-transparent">Success</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-medium">
              Comprehensive programs designed by experts to help you crack JEE, NEET, and build a strong foundation for your future.
            </p>
          </motion.div>

          {/* Program Categories Overview */}
          <motion.div
            className="grid md:grid-cols-3 gap-6 mb-20"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {programCategories.map((category, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-100 group"
                whileHover={{ y: -5 }}
              >
                <div 
                  className="h-16 w-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
                  style={{ background: `linear-gradient(135deg, ${category.color}20, ${category.color}40)` }}
                >
                  <category.icon className="h-8 w-8" style={{ color: category.color }} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{category.name}</h3>
                <p className="text-slate-600 mb-4 font-medium">{category.description}</p>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-100">
                  <span className="text-xs font-bold uppercase tracking-wide" style={{ color: category.color }}>
                    {category.count} Programs Available
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Program Highlights */}
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {highlights.map((highlight, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-slate-100"
              >
                <div className="h-12 w-12 bg-purple-50 rounded-lg flex items-center justify-center mb-4">
                  <highlight.icon className="h-6 w-6 text-[#7E3AF2]" />
                </div>
                <h4 className="font-bold text-slate-900 mb-2 text-lg">{highlight.title}</h4>
                <p className="text-sm text-slate-600 leading-relaxed">{highlight.description}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* All Programs Section */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h3 className="text-3xl font-bold text-slate-900 mb-10 text-center">
              Explore All Programs
            </h3>

            {/* Course Cards Grid */}
            <motion.div 
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
              variants={staggerContainer}
            >
              {courses.map((course, idx) => (
                <motion.div
                  key={idx}
                  variants={fadeInUp}
                  className="bg-white rounded-2xl border border-slate-200 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group flex flex-col h-full"
                  whileHover={{ y: -8 }}
                >
                  {/* Card Header */}
                  <div className={`bg-gradient-to-br ${course.color} p-6 relative`}>
                    <div className="absolute top-4 right-4">
                      <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full border border-white/30 uppercase tracking-wide">
                        {course.badge}
                      </span>
                    </div>
                    <div className="h-14 w-14 rounded-xl bg-white/20 backdrop-blur-sm border-2 border-white/30 flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform">
                      <course.icon className="h-7 w-7 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white leading-tight min-h-[3rem]">{course.title}</h3>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 flex flex-col flex-1">
                    <p className="text-slate-600 mb-6 leading-relaxed text-sm font-medium">{course.description}</p>
                    
                    <div className="space-y-3 mb-6 flex-1">
                      {course.features.map((feature, featureIdx) => (
                        <div key={featureIdx} className="flex items-center gap-3 text-sm text-slate-700">
                          <CheckCircle className="h-4 w-4 text-[#00A67E] flex-shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Program Info */}
                    <div className="grid grid-cols-2 gap-3 mb-6 text-xs">
                      <div className="bg-slate-50 rounded-lg p-3 border border-slate-100">
                        <Clock className="h-4 w-4 text-[#7E3AF2] mb-1" />
                        <div className="font-bold text-slate-900">{course.duration}</div>
                      </div>
                      <div className="bg-slate-50 rounded-lg p-3 border border-slate-100">
                        <Users className="h-4 w-4 text-[#7E3AF2] mb-1" />
                        <div className="font-bold text-slate-900">{course.batchSize}</div>
                      </div>
                    </div>

                    <button 
                      className="w-full bg-gradient-to-r from-[#7E3AF2] to-[#6749D4] hover:from-[#6749D4] hover:to-[#7E3AF2] text-white shadow-lg hover:shadow-xl transition-all py-3 rounded-xl font-bold flex items-center justify-center gap-2 group-hover:translate-y-[-2px]" 
                      onClick={() => setSelectedCourse(course)}
                    >
                      View Details
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            className="bg-gradient-to-br from-[#7E3AF2] to-[#1C64F2] rounded-3xl p-12 text-white text-center shadow-2xl relative overflow-hidden"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            {/* Decorative Background Circles */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

            <h3 className="text-3xl font-bold mb-4 relative z-10">
              Not Sure Which Program is Right for You?
            </h3>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto relative z-10 font-medium">
              Our expert counselors will help you choose the perfect program based on your goals, current preparation level, and career aspirations.
            </p>
            <div className="flex flex-wrap gap-4 justify-center relative z-10">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-[#7E3AF2] hover:bg-slate-50 font-bold px-8 py-3.5 rounded-xl shadow-xl hover:shadow-2xl transition-all"
              >
                Get Free Counseling
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white text-white hover:bg-white/10 font-bold px-8 py-3.5 rounded-xl transition-all"
              >
                Download Brochure
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {selectedCourse && (
        <ProgramDetailModal course={selectedCourse} onClose={() => setSelectedCourse(null)} />
      )}
    </div>
  );
};

export default Courses;
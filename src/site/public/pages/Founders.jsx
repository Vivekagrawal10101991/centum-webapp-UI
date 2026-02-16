import React from 'react';
import { motion } from 'framer-motion';
import { 
  Award, 
  BookOpen, 
  Target, 
  Users, 
  Briefcase, 
  GraduationCap, 
  Heart, 
  Quote 
} from 'lucide-react';

// Assets from your project structure
import tusharSinhaImage from '../../../assets/About/Tushar Sinha.png';
import dheerajSinghImage from '../../../assets/About/Dheeraj Singh.png';
import akhilUpadhyayImage from '../../../assets/About/Akhil Kumar.png';

/**
 * Founders Component
 * Fixed syntax error in Philosophy section.
 * Maintains alternating alignment: Even = Image Left, Odd = Image Right.
 */
const Founders = () => {
  const founders = [
    {
      name: "Mr. Tushar Sinha",
      role: "Co-Founder & Director",
      image: tusharSinhaImage,
      qualifications: "B.Tech & M.Tech, IIT Kharagpur (Mechanical & Manufacturing Systems)",
      experience: "Former Regional Manager at ITC Limited (6 yrs 7 mos)",
      expertise: ["Academic Strategy", "AI & Robotics in Education", "Problem-Solving Methodologies"],
      bio: "Tushar is a passionate educational entrepreneur and Director at Centum Academy, where he leads academic strategy and innovation. An alumnus of IIT Kharagpur in Mechanical & Manufacturing Systems, Tushar brings deep expertise in research, problem-solving, and practical teaching methodologies. His experience spans applying cutting-edge tools such as AI and robotics in educational practice, and he is committed to transforming how students learn foundational and competitive subjects. Under his leadership, Centum Academy has grown into a student-centric hub focused on conceptual understanding and critical thinking, preparing thousands of students for academic success.",
      achievements: [
        "Led academic strategy and innovation at Centum Academy",
        "Expertise in AI and robotics applications in education",
        "Built student-centric learning hub focused on conceptual understanding",
        "Transformed teaching methodologies using cutting-edge tools"
      ]
    },
    {
      name: "Mr. Dheeraj Singh",
      role: "Co-Founder & Director",
      image: dheerajSinghImage,
      qualifications: "B.Tech & M.Tech, IIT Bombay",
      experience: "Former Lead Analyst at Honeywell",
      expertise: ["Curriculum Design", "Faculty Mentoring", "Analytical Frameworks"],
      bio: "Dheeraj is a co-founder and Director at Centum Academy with an excellent blend of academic excellence and corporate leadership experience. An IIT Bombay graduate, he has previously served as a Lead Analyst at Honeywell, bringing invaluable industry insight into education delivery and analytical rigor. At Centum, Dheeraj focuses on curriculum design, faculty mentoring, and ensuring high-quality educational outcomes. His work emphasizes adaptive teaching frameworks that help students master complex scientific and mathematical concepts with clarity and confidence.",
      achievements: [
        "Former Lead Analyst at Honeywell with industry expertise",
        "Pioneered adaptive teaching frameworks at Centum Academy",
        "Excellence in curriculum design and faculty development",
        "Bridging industry insights with educational delivery"
      ]
    },
    {
      name: "Mr. Akhil Upadhyay",
      role: "Co-Founder & Director",
      image: akhilUpadhyayImage,
      qualifications: "B.Tech, IIT Kharagpur (Electrical Engineering)",
      experience: "International Professional Experience (Austin, Texas)",
      expertise: ["Learning Module Development", "Problem-Solving Frameworks", "Student Mentoring"],
      bio: "Akhil is a dedicated educator and Director at Centum Academy, holding a B.Tech from the prestigious IIT Kharagpur in Electrical Engineering. With international professional experience in Austin, Texas, Akhil chose to bring his engineering expertise and passion for teaching back to India. He plays a key role in developing cutting-edge learning modules, refining problem-solving frameworks, and guiding students through rigorous preparation for foundational academics and competitive exams. Akhil's commitment to mentoring students empowers them to succeed not just academically, but as lifelong learners.",
      achievements: [
        "International professional experience in Austin, Texas",
        "Developed cutting-edge learning modules for competitive exams",
        "Expert in problem-solving frameworks and student mentoring",
        "Empowers students as lifelong learners beyond academics"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* 1. Hero Section */}
      <div className="relative bg-gradient-to-br from-[#1E3A8A] via-[#2563EB] to-[#0D9488] text-white py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-6 text-center z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2.5 bg-white/10 backdrop-blur-sm px-5 py-2.5 rounded-full mb-6"
          >
            <Users className="h-5 w-5" />
            <span className="text-xs font-semibold uppercase tracking-wider">Leadership</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold mb-5"
          >
            Meet Our Founders
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed"
          >
            Visionary educators committed to transforming lives through quality education
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
        {/* 2. The Story Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-purple-50 via-blue-50 to-teal-50 rounded-3xl p-8 md:p-12 mb-20 shadow-sm border border-slate-100"
        >
          <div className="flex items-start gap-4 mb-8">
            <Quote className="h-10 w-10 text-[#7E3AF2] flex-shrink-0 opacity-40" />
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-4 tracking-tight">
                The Centum Academy Story
              </h2>
              <div className="space-y-4 text-base md:text-lg text-slate-700 leading-relaxed">
                <p>
                  Centum Academy was born from a simple yet powerful vision: to create an educational 
                  institution that doesn't just prepare students for exams, but nurtures them holistically 
                  with care, emotion, and individual attention.
                </p>
                <p>
                  Our founders, united by their passion for education and student welfare, came together 
                  to build a learning ecosystem where academic excellence meets emotional intelligence, 
                  where every student is valued, and where dreams are transformed into reality.
                </p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-white/50 transition-all hover:bg-white">
              <Award className="h-8 w-8 text-[#F59E0B] mb-3" />
              <h3 className="font-bold text-slate-900 text-xl mb-1">75+ Years</h3>
              <p className="text-xs text-slate-600 font-medium">Combined teaching experience</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-white/50 transition-all hover:bg-white">
              <Users className="h-8 w-8 text-[#1C64F2] mb-3" />
              <h3 className="font-bold text-slate-900 text-xl mb-1">10,000+</h3>
              <p className="text-xs text-slate-600 font-medium">Students mentored successfully</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-white/50 transition-all hover:bg-white">
              <GraduationCap className="h-8 w-8 text-[#00A67E] mb-3" />
              <h3 className="font-bold text-slate-900 text-xl mb-1">500+</h3>
              <p className="text-xs text-slate-600 font-medium">Students in top IITs & NITs</p>
            </div>
          </div>
        </motion.div>

        {/* 3. Founders Profiles - Strictly Alternating Layout */}
        <div className="space-y-20">
          {founders.map((founder, index) => (
            <div 
              key={founder.name}
              className={`grid gap-12 items-start ${
                index % 2 === 1 
                  ? 'lg:grid-cols-[1.15fr_0.85fr]' 
                  : 'lg:grid-cols-[0.85fr_1.15fr]'
              }`}
            >
              {/* Profile Image & Essential Info */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className={`max-w-sm md:max-w-md mx-auto lg:mx-0 ${
                  index % 2 === 1 ? 'lg:order-2' : 'lg:order-1'
                }`}
              >
                <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-100 group">
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <img 
                      src={founder.image} 
                      alt={founder.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="text-2xl font-bold mb-0.5 tracking-tight">{founder.name}</h3>
                      <p className="text-base text-white/90 font-medium">{founder.role}</p>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-[#7E3AF2] to-[#1C64F2] text-white p-6 md:p-8">
                    <div className="space-y-5">
                      <div className="flex items-start gap-4">
                        <GraduationCap className="h-5 w-5 mt-1 flex-shrink-0" />
                        <div>
                          <p className="font-bold text-[10px] uppercase tracking-wider mb-1 opacity-80">Qualifications</p>
                          <p className="text-xs md:text-sm font-medium leading-relaxed">{founder.qualifications}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <Briefcase className="h-5 w-5 mt-1 flex-shrink-0" />
                        <div className="w-full">
                          <p className="font-bold text-[10px] uppercase tracking-wider mb-1 opacity-80">Professional Experience</p>
                          <p className="text-xs md:text-sm font-medium leading-relaxed">{founder.experience}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Bio Content & Details */}
              <motion.div 
                initial={{ opacity: 0, x: index % 2 === 1 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className={index % 2 === 1 ? 'lg:order-1' : 'lg:order-2'}
              >
                <div className="inline-flex items-center gap-2 bg-purple-100 text-[#7E3AF2] px-3.5 py-1.5 rounded-full mb-5">
                  <Heart className="h-3.5 w-3.5" />
                  <span className="text-[11px] font-bold uppercase tracking-wide">About {founder.name.split(' ')[1]}</span>
                </div>
                
                <p className="text-base md:text-lg text-slate-700 leading-relaxed mb-8">
                  {founder.bio}
                </p>

                <div className="mb-8">
                  <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2 tracking-tight text-sm uppercase">
                    <Target className="h-4 w-4 text-[#7E3AF2]" />
                    Expertise & Strategy
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {founder.expertise.map((skill) => (
                      <span 
                        key={skill}
                        className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border border-blue-100"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2 tracking-tight text-sm uppercase">
                    <Award className="h-4 w-4 text-[#F59E0B]" />
                    Impact & Key Achievements
                  </h4>
                  <ul className="grid sm:grid-cols-1 gap-2.5">
                    {founder.achievements.map((achievement, idx) => (
                      <li key={idx} className="flex items-start gap-3 p-3 bg-white rounded-xl border border-slate-100 shadow-sm transition-all hover:shadow-md">
                        <span className="text-[#00A67E] font-bold text-sm">✓</span>
                        <span className="text-slate-700 font-medium text-sm">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </div>
          ))}
        </div>

        {/* 4. Philosophy Section */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-28 bg-white rounded-[2.5rem] shadow-2xl p-10 md:p-14 border border-slate-100"
        >
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight">
              Our Educational Philosophy
            </h2>
            <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              The guiding principles that shape our approach to education and ensure success for every student
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center mx-auto mb-5 shadow-inner transition-transform group-hover:scale-105">
                <Heart className="h-8 w-8 text-[#7E3AF2]" />
              </div>
              <h3 className="font-bold text-slate-900 text-lg mb-2 tracking-tight">Education with Emotion</h3>
              <p className="text-sm text-slate-600 leading-relaxed px-4">We believe in understanding and addressing the emotional needs of every student</p>
            </div>
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-5 shadow-inner transition-transform group-hover:scale-105">
                <Users className="h-8 w-8 text-[#1C64F2]" />
              </div>
              <h3 className="font-bold text-slate-900 text-lg mb-2 tracking-tight">Individual Attention</h3>
              <p className="text-sm text-slate-600 leading-relaxed px-4">Each student receives personalized guidance tailored to their unique learning style</p>
            </div>
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-teal-100 to-teal-200 rounded-full flex items-center justify-center mx-auto mb-5 shadow-inner transition-transform group-hover:scale-105">
                <BookOpen className="h-8 w-8 text-[#00A67E]" />
              </div>
              <h3 className="font-bold text-slate-900 text-lg mb-2 tracking-tight">Holistic Development</h3>
              <p className="text-sm text-slate-600 leading-relaxed px-4">We focus on overall growth - academic, emotional, and personal excellence</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Founders;
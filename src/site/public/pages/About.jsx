import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Modal from '../../../components/common/Modal'; 
import EnquiryForm from '../../components/specific/EnquiryForm'; 

// --- IMPORTING IMAGES ---
import educationImg from '../../../assets/about/education with emotion.png';
import tusharImg from '../../../assets/about/Tushar Sinha.png';
import dheerajImg from '../../../assets/about/Dheeraj Singh.png';
import akhilImg from '../../../assets/about/Akhil Kumar.png';

// --- Animations ---
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: "easeOut" } 
  }
};

// Hover effect for stats cards
const cardHover = {
  rest: { scale: 1, y: 0, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)" },
  hover: { 
    scale: 1.02, 
    y: -5, 
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    transition: { type: "spring", stiffness: 300, damping: 20 } 
  }
};

// --- Helper Components ---
const SectionHeader = ({ title, subtitle, center = true }) => (
  <div className={`mb-12 ${center ? 'text-center' : 'text-left'}`}>
    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">{title}</h2>
    {subtitle && <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>}
  </div>
);

// --- MENTOR CARD ---
const MentorCard = ({ name, degree, college, shortBio, fullBio, image }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-2xl hover:border-blue-100 transition-all duration-500 group flex flex-col h-full transform hover:-translate-y-2">
      <div className="h-64 bg-gradient-to-b from-blue-50 via-indigo-50/50 to-white relative flex items-end justify-center pt-6">
        <img 
          src={image} 
          alt={name} 
          className="h-full w-auto object-contain drop-shadow-sm transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-6 text-center flex flex-col flex-grow relative z-10 bg-white">
        <h3 className="text-xl font-extrabold text-gray-900 mb-1">{name}</h3>
        <p className="text-blue-600 text-sm font-semibold mb-3">{degree}</p>
        <div className="mb-4">
          <span className="inline-block px-3 py-1 rounded-full bg-gray-50 border border-gray-200 text-[10px] font-bold text-gray-600 uppercase tracking-wider group-hover:bg-blue-50 group-hover:text-blue-700 group-hover:border-blue-200 transition-colors">
            {college}
          </span>
        </div>
        <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-grow transition-all duration-300">
          {isExpanded ? fullBio : shortBio}
        </p>
        <div className="mt-auto">
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="inline-flex items-center text-gray-900 font-bold text-sm hover:text-blue-600 transition-colors group/btn"
          >
            {isExpanded ? "Read Less" : "Read More"}
            <span className={`ml-2 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center group-hover/btn:bg-blue-600 group-hover/btn:text-white transition-all duration-300 transform ${isExpanded ? 'rotate-180' : ''}`}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

// --- USPCard Component ---
const USPCard = ({ title, description, icon, colorTheme }) => {
  const themes = {
    blue: {
      bg: "bg-gradient-to-br from-blue-50 to-indigo-50/50",
      border: "border-blue-100",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600"
    },
    orange: {
      bg: "bg-gradient-to-br from-orange-50 to-amber-50/50",
      border: "border-orange-100",
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600"
    },
    purple: {
      bg: "bg-gradient-to-br from-purple-50 to-fuchsia-50/50",
      border: "border-purple-100",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600"
    },
    green: {
      bg: "bg-gradient-to-br from-emerald-50 to-teal-50/50",
      border: "border-emerald-100",
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600"
    }
  };

  const theme = themes[colorTheme] || themes.blue;

  return (
    <div className={`${theme.bg} border ${theme.border} rounded-3xl p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group`}>
      <div className={`${theme.iconBg} ${theme.iconColor} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300`}>
        {icon}
      </div>
      <h3 className="text-xl font-extrabold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed font-medium opacity-80">{description}</p>
    </div>
  );
};

const StatCard = ({ number, label, icon, gradient, textColor, iconColor, borderColor }) => (
  <motion.div 
    variants={cardHover}
    initial="rest"
    whileHover="hover"
    className={`p-6 rounded-2xl ${gradient} border ${borderColor} flex flex-col items-center justify-center text-center group cursor-default`}
  >
    <div className={`mb-4 p-4 bg-white/90 rounded-2xl shadow-sm ${iconColor}`}>
      {icon}
    </div>
    <h3 className={`text-4xl font-extrabold ${textColor} mb-2 tracking-tight`}>{number}</h3>
    <p className={`text-sm font-bold uppercase tracking-wider ${textColor} opacity-90`}>{label}</p>
  </motion.div>
);

const About = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      {/* ==================== PAGE HEADER ==================== */}
      {/* Updated to py-12 to match Courses page */}
      <div className="relative bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-12 overflow-hidden border-b border-indigo-100/50">
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #1e3a8a 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center text-center">
           <div className="inline-block px-3 py-1 mb-3 text-[10px] font-semibold text-indigo-700 bg-white/60 rounded-full uppercase tracking-widest shadow-sm border border-indigo-100/50">
              Home / About Us
           </div>
           <h1 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight mb-4">
              About Us
           </h1>
           {/* Adjusted margin to match Courses page style */}
           <div className="w-12 h-1 bg-indigo-500 rounded-full opacity-90"></div>
        </div>
      </div>

      {/* ==================== HERO SECTION ==================== */}
      <section className="relative pt-6 pb-28 bg-white overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-6">
            <motion.div 
              className="w-full lg:w-1/2 text-left"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <p className="text-blue-600 font-bold tracking-wider uppercase mb-3 text-sm">
                Who We Are
              </p>
              <h1 className="text-2xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-6 leading-tight">
                Shaping Thinkers Not Just <br />
                <span className="text-blue-600">Test Takers</span>
              </h1>
              <div className="prose text-gray-600 leading-relaxed mb-6">
                <p className="mb-4">
                  At <strong>Centum Academy</strong>, we believe every student has the potential to excel when guided with the right mentorship. Founded by a team of passionate <strong>IIT alumni</strong>, we are dedicated to transforming how education is delivered.
                </p>
                <p>
                  Our philosophy of <em>"Learning by Doing"</em> ensures that students don't just memorize concepts but truly understand and apply them. We design innovative curriculum models that make learning engaging, practical, and relevant to real life. To us, no subject is ever boring—when taught effectively, every subject becomes a window to understanding the world.
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={openModal}
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition shadow-lg hover:shadow-blue-500/30"
                >
                  Enquire Now
                </button>
                <button className="border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:border-blue-600 hover:text-blue-600 hover:bg-blue-50 transition">
                  Download Brochure
                </button>
              </div>
            </motion.div>
            <motion.div 
              className="w-full lg:w-1/2"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="aspect-[4/3] bg-gray-100 rounded-2xl overflow-hidden shadow-2xl relative border-4 border-white group">
                <img 
                  src={educationImg} 
                  alt="Students in Classroom" 
                  className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ==================== STATS SECTION ==================== */}
      <div className="relative z-10 -mt-16 mb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            <StatCard 
              number="25+" label="Years Experience" 
              gradient="bg-gradient-to-br from-blue-100 via-blue-200 to-indigo-200"
              borderColor="border-blue-200" textColor="text-blue-900" iconColor="text-blue-600"
              icon={<svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>}
            />
            <StatCard 
              number="100+" label="Instructors" 
              gradient="bg-gradient-to-br from-purple-100 via-purple-200 to-fuchsia-200"
              borderColor="border-purple-200" textColor="text-purple-900" iconColor="text-purple-600"
              icon={<svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>}
            />
            <StatCard 
              number="3k+" label="Students Enrolled" 
              gradient="bg-gradient-to-br from-emerald-100 via-teal-200 to-teal-300"
              borderColor="border-teal-200" textColor="text-teal-900" iconColor="text-teal-600"
              icon={<svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 14l9-5-9-5-9 5 9 5z" /><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /></svg>}
            />
            <StatCard 
              number="25+" label="Courses" 
              gradient="bg-gradient-to-br from-amber-100 via-orange-200 to-orange-300"
              borderColor="border-orange-200" textColor="text-orange-900" iconColor="text-orange-600"
              icon={<svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>}
            />
          </motion.div>
        </div>
      </div>

      {/* ==================== MISSION & VISION ==================== */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            
            {/* Mission Card */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50/50 p-8 lg:p-12 rounded-3xl shadow-sm border border-blue-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 shadow-sm group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                </div>
                <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Our Mission</h2>
              </div>
              <p className="text-gray-600 leading-relaxed text-lg font-medium opacity-90">
                To empower students through high-quality mentorship, innovative teaching practices, and personalised attention so that they excel in both academics and life.
              </p>
            </div>

            {/* Vision Card */}
            <div className="bg-gradient-to-br from-purple-50 to-fuchsia-50/50 p-8 lg:p-12 rounded-3xl shadow-sm border border-purple-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-600 shadow-sm group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                </div>
                <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Our Vision</h2>
              </div>
              <p className="text-gray-600 leading-relaxed text-lg font-medium opacity-90">
                To create an education ecosystem where every student enjoys learning, thinks critically, and grows into a confident contributor to society.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ==================== WHAT MAKES US DIFFERENT ==================== */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title="What Makes Us Different" subtitle={true} />
          
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
             <USPCard 
               title="High-Quality Mentorship" 
               description="We treat every student as an asset. Our faculty goes the extra mile to provide personalised attention and guidance, ensuring no student is left behind."
               colorTheme="blue"
               icon={<svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>}
             />
             <USPCard 
               title="Learning By Doing" 
               description="Our curriculum emphasises practical application. We move beyond rote memorization to foster true conceptual understanding through experiments and real-world examples."
               colorTheme="orange"
               icon={<svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>}
             />
             <USPCard 
               title="IIT Alumni Network" 
               description="Learn directly from those who have cracked the toughest exams. Our core team consists of alumni from top IITs who understand the path to success."
               colorTheme="purple"
               icon={<svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 14l9-5-9-5-9 5 9 5z" /><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /></svg>}
             />
             <USPCard 
               title="Holistic Development" 
               description="We don't just focus on marks. We focus on building confidence, critical thinking, and the emotional resilience required for competitive environments."
               colorTheme="green"
               icon={<svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>}
             />
          </div>
        </div>
      </section>

      {/* ==================== MEET OUR MENTORS ==================== */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title="Meet Our Mentors" subtitle={true} />
          <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
            <MentorCard 
              image={tusharImg}
              name="Tushar Sinha"
              degree="B.Tech & M.Tech"
              college="IIT Kharagpur"
              shortBio="Tushar is an IIT Kharagpur alumnus in Mechanical & Manufacturing Systems. With experience in AI and Robotics research and industry"
              fullBio="Tushar is an IIT Kharagpur alumnus in Mechanical & Manufacturing Systems. With experience in AI and Robotics research and industry exposure in manufacturing, he followed his passion for teaching. Today, he leads a team dedicated to simplifying learning for school students."
            />
            <MentorCard 
              image={dheerajImg}
              name="Dheeraj Singh"
              degree="B.Tech & M.Tech"
              college="IIT Bombay"
              shortBio="Dheeraj, an IIT Bombay graduate and former Lead Analyst at Honeywell, combines academic brilliance with corporate expertise."
              fullBio="Dheeraj, an IIT Bombay graduate and former Lead Analyst at Honeywell, combines academic brilliance with corporate expertise. He is passionate about Physics, making it relatable to daily life through engaging examples. His mission: help students develop strong problem-solving skills using advanced visualisation techniques."
            />
            <MentorCard 
              image={akhilImg}
              name="Akhil Kumar"
              degree="B.Tech & M.Tech"
              college="IIT Kharagpur"
              shortBio="Akhil is an IIT Kharagpur alumnus in Electrical Engineering. With professional experience in Austin, Texas, he left a promising corporate"
              fullBio="Akhil is an IIT Kharagpur alumnus in Electrical Engineering. With professional experience in Austin, Texas, he left a promising corporate career to pursue his vision: “Padhega India, Badhega India.” An ardent lover of Mathematics, he is dedicated to making math accessible, enjoyable, and deeply impactful for every student."
            />
          </div>
        </div>
      </section>

      {/* ==================== BOTTOM CTA (UPDATED) ==================== */}
      <section className="py-20 bg-blue-900 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-100 to-blue-200">
            Want to transform your learning journey?
          </h2>
          <p className="text-blue-100 mb-10 text-lg max-w-2xl mx-auto">
            Join Centum Academy and experience the power of high-quality mentorship and innovative education.
          </p>
          <button 
            onClick={openModal}
            className="bg-white text-blue-900 px-10 py-4 rounded-full font-bold text-lg hover:bg-blue-50 transition shadow-lg transform hover:-translate-y-1"
          >
            Enquire Now
          </button>
        </div>
      </section>

      {/* ==================== MODAL INTEGRATION ==================== */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Enquire Now"
      >
        <EnquiryForm onSuccess={closeModal} />
      </Modal>
    </>
  );
};

export default About;
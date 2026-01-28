import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Modal from '../../../components/common/Modal'; 
import EnquiryForm from '../../components/specific/EnquiryForm'; 
import { MentorsSection } from '../../components/specific'; // Imported Shared Component

// --- IMPORTING IMAGES ---
import educationImg from '../../../assets/about/education with emotion.png';

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
  rest: { scale: 1, y: 0, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.02)" },
  hover: { 
    scale: 1.02, 
    y: -5, 
    boxShadow: "0 15px 30px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -5px rgba(0, 0, 0, 0.04)",
    transition: { type: "spring", stiffness: 300, damping: 20 } 
  }
};

// --- Helper Components ---
const SectionHeader = ({ title, subtitle, center = true }) => (
  <div className={`mb-16 ${center ? 'text-center' : 'text-left'}`}>
    <h2 className="text-3xl md:text-4xl font-extrabold text-secondary-900 mb-4 tracking-tight">{title}</h2>
    {subtitle && <div className="w-20 h-1.5 bg-gradient-to-r from-primary-500 to-accent mx-auto rounded-full opacity-90"></div>}
  </div>
);

// --- USPCard Component ---
const USPCard = ({ title, description, icon, colorTheme }) => {
  const themes = {
    blue: {
      bg: "bg-gradient-to-br from-primary-50 to-white",
      border: "border-primary-100 hover:border-primary-200",
      iconBg: "bg-primary-100 text-primary-600",
    },
    orange: {
      bg: "bg-gradient-to-br from-orange-50 to-white",
      border: "border-orange-100 hover:border-orange-200",
      iconBg: "bg-orange-100 text-orange-600",
    },
    purple: {
      bg: "bg-gradient-to-br from-purple-50 to-white",
      border: "border-purple-100 hover:border-purple-200",
      iconBg: "bg-purple-100 text-purple-600",
    },
    green: {
      bg: "bg-gradient-to-br from-emerald-50 to-white",
      border: "border-emerald-100 hover:border-emerald-200",
      iconBg: "bg-emerald-100 text-emerald-600",
    }
  };

  const theme = themes[colorTheme] || themes.blue;

  return (
    <div className={`${theme.bg} border ${theme.border} rounded-2xl p-8 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 group`}>
      <div className={`${theme.iconBg} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold text-secondary-900 mb-3 tracking-tight">{title}</h3>
      <p className="text-secondary-600 text-sm leading-relaxed font-light">{description}</p>
    </div>
  );
};

const StatCard = ({ number, label, icon, gradient, textColor, iconColor, borderColor }) => (
  <motion.div 
    variants={cardHover}
    initial="rest"
    whileHover="hover"
    className={`p-6 rounded-2xl bg-white border border-secondary-100 flex flex-col items-center justify-center text-center group cursor-default shadow-sm hover:border-primary-200`}
  >
    <div className={`mb-4 p-4 rounded-2xl ${gradient} ${iconColor}`}>
      {icon}
    </div>
    <h3 className={`text-4xl font-extrabold text-secondary-900 mb-2 tracking-tight group-hover:text-primary-600 transition-colors`}>{number}</h3>
    <p className={`text-xs font-bold uppercase tracking-widest text-secondary-500`}>{label}</p>
  </motion.div>
);

const About = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="bg-secondary-50 min-h-screen">
      
      {/* ==================== PAGE HEADER ==================== */}
      <div className="relative bg-gradient-to-br from-primary-50 via-white to-primary-100 py-12 overflow-hidden border-b border-primary-100">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #0056D2 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
        <div className="container mx-auto px-4 text-center relative z-10">
           <div className="inline-block px-3 py-1 mb-3 text-[10px] font-bold text-primary-700 bg-white/80 rounded-full uppercase tracking-widest shadow-sm border border-primary-100">
              Home / About Us
           </div>
           <h1 className="text-3xl md:text-5xl font-extrabold text-secondary-900 tracking-tight mb-4">
              About Us
           </h1>
           <div className="w-16 h-1.5 bg-gradient-to-r from-primary-500 to-accent rounded-full mx-auto opacity-90"></div>
        </div>
      </div>

      {/* ==================== HERO SECTION ==================== */}
      <section className="relative pt-16 pb-24 bg-white overflow-hidden border-b border-secondary-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <motion.div 
              className="w-full lg:w-1/2 text-left"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <div className="inline-flex items-center space-x-2 mb-6">
                <span className="w-8 h-[2px] bg-primary-500"></span>
                <p className="text-primary-600 font-bold tracking-widest uppercase text-xs">Who We Are</p>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-extrabold text-secondary-900 tracking-tight mb-8 leading-[1.15]">
                Shaping Thinkers <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-500 pr-2">Not Just Test Takers</span>
              </h1>
              
              <div className="prose text-secondary-600 leading-relaxed mb-8 text-lg font-light">
                <p className="mb-4">
                  At <strong className="text-secondary-900 font-semibold">Centum Academy</strong>, we believe every student has the potential to excel when guided with the right mentorship. Founded by a team of passionate <strong className="text-secondary-900 font-semibold">IIT alumni</strong>, we are dedicated to transforming how education is delivered.
                </p>
                <p>
                  Our philosophy of <em className="text-primary-600 not-italic font-medium">"Learning by Doing"</em> ensures that students don't just memorize concepts but truly understand and apply them. We design innovative curriculum models that make learning engaging, practical, and relevant to real life.
                </p>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={openModal}
                  className="bg-primary-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-primary-700 transition-all shadow-lg shadow-primary-500/20 hover:shadow-primary-500/40 transform hover:-translate-y-1"
                >
                  Enquire Now
                </button>
                <button className="border-2 border-secondary-200 text-secondary-700 px-8 py-4 rounded-xl font-bold hover:border-primary-600 hover:text-primary-600 hover:bg-primary-50 transition-all">
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
              <div className="aspect-[4/3] bg-secondary-100 rounded-3xl overflow-hidden shadow-2xl relative border-[8px] border-white ring-1 ring-secondary-200 transform rotate-2 hover:rotate-0 transition-transform duration-700">
                <img 
                  src={educationImg} 
                  alt="Students in Classroom" 
                  className="w-full h-full object-cover scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary-900/40 to-transparent opacity-60"></div>
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
              gradient="bg-blue-50 text-blue-600"
              borderColor="border-secondary-100" 
              icon={<svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>}
            />
            <StatCard 
              number="100+" label="Instructors" 
              gradient="bg-purple-50 text-purple-600"
              borderColor="border-secondary-100" 
              icon={<svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>}
            />
            <StatCard 
              number="3k+" label="Students Enrolled" 
              gradient="bg-emerald-50 text-emerald-600"
              borderColor="border-secondary-100" 
              icon={<svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 14l9-5-9-5-9 5 9 5z" /><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /></svg>}
            />
            <StatCard 
              number="25+" label="Courses" 
              gradient="bg-orange-50 text-orange-600"
              borderColor="border-secondary-100" 
              icon={<svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>}
            />
          </motion.div>
        </div>
      </div>

      {/* ==================== MISSION & VISION ==================== */}
      <section className="py-20 bg-white border-y border-secondary-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            
            {/* Mission Card */}
            <div className="bg-gradient-to-br from-primary-50 via-white to-secondary-50 p-10 lg:p-12 rounded-3xl shadow-sm border border-primary-100 hover:shadow-xl hover:border-primary-200 transition-all duration-300 transform hover:-translate-y-1 group">
              <div className="flex items-center gap-5 mb-6">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-primary-600 shadow-md group-hover:scale-110 transition-transform duration-300 border border-primary-100">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                </div>
                <h2 className="text-3xl font-extrabold text-secondary-900 tracking-tight">Our Mission</h2>
              </div>
              <p className="text-secondary-600 leading-relaxed text-lg font-light">
                To empower students through high-quality mentorship, innovative teaching practices, and personalised attention so that they excel in both academics and life.
              </p>
            </div>

            {/* Vision Card */}
            <div className="bg-gradient-to-br from-purple-50 via-white to-secondary-50 p-10 lg:p-12 rounded-3xl shadow-sm border border-purple-100 hover:shadow-xl hover:border-purple-200 transition-all duration-300 transform hover:-translate-y-1 group">
              <div className="flex items-center gap-5 mb-6">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-purple-600 shadow-md group-hover:scale-110 transition-transform duration-300 border border-purple-100">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                </div>
                <h2 className="text-3xl font-extrabold text-secondary-900 tracking-tight">Our Vision</h2>
              </div>
              <p className="text-secondary-600 leading-relaxed text-lg font-light">
                To create an education ecosystem where every student enjoys learning, thinks critically, and grows into a confident contributor to society.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ==================== WHAT MAKES US DIFFERENT ==================== */}
      <section className="py-24 bg-secondary-50">
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
      <MentorsSection />

      {/* ==================== BOTTOM CTA ==================== */}
      <section className="py-24 bg-primary-900 text-white text-center relative overflow-hidden">
        {/* Abstract Background */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-primary-500 rounded-full mix-blend-screen filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-accent rounded-full mix-blend-screen filter blur-3xl opacity-20"></div>
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white via-primary-100 to-primary-200">
            Want to transform your learning journey?
          </h2>
          <p className="text-primary-100 mb-12 text-lg max-w-2xl mx-auto font-light">
            Join Centum Academy and experience the power of high-quality mentorship and innovative education.
          </p>
          <button 
            onClick={openModal}
            className="bg-white text-primary-900 px-12 py-5 rounded-full font-bold text-lg hover:bg-primary-50 transition-all shadow-[0_20px_40px_-15px_rgba(255,255,255,0.3)] transform hover:-translate-y-1"
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
    </div>
  );
};

export default About;
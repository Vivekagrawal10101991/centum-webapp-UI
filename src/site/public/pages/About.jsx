import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Modal from '../../../components/common/Modal'; 
import EnquiryForm from '../../components/specific/EnquiryForm'; 

// --- IMPORTING THE NEW IMAGE ---
// NOTE: Check if your file is .png, .jpg, or .jpeg and update the extension below if needed
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

const MentorCard = ({ name, degree, college, bio }) => (
  <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300">
    <div className="h-48 bg-gray-200 relative">
      {/* Image Placeholder */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500 bg-gray-100">
        <svg className="w-12 h-12 mb-2 text-gray-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>
        <span className="text-sm font-medium">Photo: {name}</span>
      </div>
    </div>
    <div className="p-6">
      <h3 className="text-xl font-bold text-gray-900">{name}</h3>
      <p className="text-blue-600 text-sm font-semibold mb-1">{degree}</p>
      <p className="text-gray-500 text-xs font-bold mb-4 uppercase tracking-wide">{college}</p>
      <p className="text-gray-600 text-sm leading-relaxed mb-4">
        {bio}
      </p>
      <button className="text-blue-600 font-semibold text-sm hover:text-blue-800 transition-colors inline-flex items-center">
        Read More <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
      </button>
    </div>
  </div>
);

const USPBox = ({ title, description }) => (
  <div className="p-6 bg-blue-50 rounded-lg border-l-4 border-blue-600 hover:bg-blue-100 transition-colors duration-300">
    <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-700 text-sm leading-relaxed">{description}</p>
  </div>
);

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
  // State to manage Modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      {/* ==================== PAGE HEADER ==================== */}
      <div className="relative bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-10 overflow-hidden border-b border-indigo-100/50">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #1e3a8a 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
        
        {/* Content Container */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center text-center">
           {/* Smaller Badge Breadcrumb */}
           <div className="inline-block px-3 py-1 mb-3 text-[10px] font-semibold text-indigo-700 bg-white/60 rounded-full uppercase tracking-widest shadow-sm border border-indigo-100/50">
              Home / About Us
           </div>
           {/* Main Heading */}
           <h1 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight mb-2">
              About Us
           </h1>
           {/* Smaller Divider */}
           <div className="w-12 h-1 bg-indigo-500 rounded-full mt-1 opacity-90"></div>
        </div>
      </div>

      {/* ==================== HERO SECTION ==================== */}
      <section className="relative pt-6 pb-28 bg-white overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            
            {/* Text Content */}
            <motion.div 
              className="w-full lg:w-1/2 text-left"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              {/* SMALL PRE-HEADER */}
              <p className="text-blue-600 font-bold tracking-wider uppercase mb-3 text-sm">
                Who We Are
              </p>
              
              {/* MAIN HEADING */}
              <h1 className="text-2xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-8 leading-tight">
                Shaping Thinkers Not Just <br />
                <span className="text-blue-600">Test Takers</span>
              </h1>
              
              <div className="prose text-gray-600 leading-relaxed mb-8">
                <p className="mb-4">
                  At <strong>Centum Academy</strong>, we believe every student has the potential to excel when guided with the right mentorship. Founded by a team of passionate <strong>IIT alumni</strong>, we are dedicated to transforming how education is delivered.
                </p>
                {/* UPDATED PARAGRAPH WITH NEW CONTENT */}
                <p>
                  Our philosophy of <em>"Learning by Doing"</em> ensures that students don't just memorize concepts but truly understand and apply them. We design innovative curriculum models that make learning engaging, practical, and relevant to real life. To us, no subject is ever boring—when taught effectively, every subject becomes a window to understanding the world.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                {/* ACTIVE ENQUIRY BUTTON */}
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

            {/* Hero Image */}
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
            {/* Experience - Rich Blue */}
            <StatCard 
              number="25+" 
              label="Years Experience" 
              gradient="bg-gradient-to-br from-blue-100 via-blue-200 to-indigo-200"
              borderColor="border-blue-200"
              textColor="text-blue-900"
              iconColor="text-blue-600"
              icon={<svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>}
            />
            
            {/* Instructors - Rich Purple + User Icon */}
            <StatCard 
              number="100+" 
              label="Instructors" 
              gradient="bg-gradient-to-br from-purple-100 via-purple-200 to-fuchsia-200"
              borderColor="border-purple-200"
              textColor="text-purple-900"
              iconColor="text-purple-600"
              icon={<svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>}
            />
            
            {/* Students - Rich Teal */}
            <StatCard 
              number="3k+" 
              label="Students Enrolled" 
              gradient="bg-gradient-to-br from-emerald-100 via-teal-200 to-teal-300"
              borderColor="border-teal-200"
              textColor="text-teal-900"
              iconColor="text-teal-600"
              icon={<svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 14l9-5-9-5-9 5 9 5z" /><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /></svg>}
            />
            
            {/* Courses - Rich Amber */}
            <StatCard 
              number="25+" 
              label="Courses" 
              gradient="bg-gradient-to-br from-amber-100 via-orange-200 to-orange-300"
              borderColor="border-orange-200"
              textColor="text-orange-900"
              iconColor="text-orange-600"
              icon={<svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>}
            />
          </motion.div>
        </div>
      </div>

      {/* ==================== MISSION & VISION ==================== */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Mission */}
            <div className="bg-white p-8 lg:p-10 rounded-xl shadow-sm border-t-4 border-blue-500 hover:shadow-md transition-shadow">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="bg-blue-100 text-blue-600 p-2 rounded-lg mr-3">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                </span>
                Our Mission
              </h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                To empower students through high-quality mentorship, innovative teaching practices, and personalised attention so that they excel in both academics and life.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-white p-8 lg:p-10 rounded-xl shadow-sm border-t-4 border-purple-500 hover:shadow-md transition-shadow">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="bg-purple-100 text-purple-600 p-2 rounded-lg mr-3">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                </span>
                Our Vision
              </h2>
              <p className="text-gray-600 leading-relaxed text-lg">
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
             <USPBox 
               title="High-Quality Mentorship" 
               description="We treat every student as an asset. Our faculty goes the extra mile to provide personalised attention and guidance, ensuring no student is left behind."
             />
             <USPBox 
               title="Learning By Doing" 
               description="Our curriculum emphasises practical application. We move beyond rote memorization to foster true conceptual understanding through experiments and real-world examples."
             />
             <USPBox 
               title="IIT Alumni Network" 
               description="Learn directly from those who have cracked the toughest exams. Our core team consists of alumni from top IITs who understand the path to success."
             />
             <USPBox 
               title="Holistic Development" 
               description="We don't just focus on marks. We focus on building confidence, critical thinking, and the emotional resilience required for competitive environments."
             />
          </div>
        </div>
      </section>

      {/* ==================== MEET OUR MENTORS ==================== */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title="Meet Our Mentors" subtitle={true} />

          <div className="grid md:grid-cols-3 gap-8">
            <MentorCard 
              name="Tushar Sinha"
              degree="B.Tech & M.Tech"
              college="IIT Kharagpur"
              bio="Tushar is an IIT Kharagpur alumnus in Mechanical & Manufacturing Systems. With deep experience in AI and Robotics research, he brings a modern technological edge to teaching physics and maths."
            />
            <MentorCard 
              name="Dheeraj Singh"
              degree="B.Tech & M.Tech"
              college="IIT Bombay"
              bio="An IIT Bombay graduate and former Lead Analyst at Honeywell, Dheeraj combines academic brilliance with corporate expertise to guide students in logical reasoning and data interpretation."
            />
            <MentorCard 
              name="Akhil Kumar"
              degree="B.Tech & M.Tech"
              college="IIT Kharagpur"
              bio="Akhil is an IIT Kharagpur alumnus in Electrical Engineering. With professional experience in Austin, Texas, he left a promising corporate career to follow his passion for teaching."
            />
          </div>
        </div>
      </section>

      {/* ==================== BOTTOM CTA ==================== */}
      <section className="py-20 bg-blue-900 text-white text-center relative overflow-hidden">
        {/* Abstract Background pattern */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Want to train with us?</h2>
          <p className="text-blue-100 mb-10 text-lg max-w-2xl mx-auto">
            Join Centum Academy and experience the power of high-quality mentorship and innovative education.
          </p>
          {/* ACTIVE ENQUIRY BUTTON */}
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
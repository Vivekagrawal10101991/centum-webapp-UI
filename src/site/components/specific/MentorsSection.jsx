import React from 'react';
import { motion } from "framer-motion";
import { Mail, GraduationCap } from "lucide-react";

const MentorsSection = () => {
  const facultyMembers = [
    {
      name: "Dr. Rajesh Kumar",
      title: "Professor",
      qualification: "Ph.D. (IIT Delhi)",
      department: "PHYSICS",
      specialization: "IIT-JEE Physics & Mechanics",
      email: "rajesh.kumar@centumacademy.com",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop"
    },
    {
      name: "Prof. Sneha Sharma",
      title: "Associate Professor",
      qualification: "M.Sc. (Delhi University)",
      department: "CHEMISTRY",
      specialization: "Organic & Inorganic Chemistry",
      email: "sneha.sharma@centumacademy.com",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop"
    },
    {
      name: "Dr. Amit Verma",
      title: "Professor",
      qualification: "Ph.D. (IIT Bombay)",
      department: "MATHEMATICS",
      specialization: "Advanced Calculus & Algebra",
      email: "amit.verma@centumacademy.com",
      image: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=400&h=400&fit=crop"
    },
    {
      name: "Ms. Priya Reddy",
      title: "Assistant Professor",
      qualification: "M.Sc. (AIIMS)",
      department: "BIOLOGY",
      specialization: "NEET Biology & Zoology",
      email: "priya.reddy@centumacademy.com",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop"
    }
  ];

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section className="py-24 bg-white px-6 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full mb-4">
            <GraduationCap className="h-4 w-4" />
            <span className="text-sm font-bold uppercase tracking-widest">Expert Faculty</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
            Learn from the <span className="text-emerald-600">Best Minds</span>
          </h2>
          <p className="text-lg font-normal text-slate-500 max-w-2xl mx-auto">
            Our mentors are IIT & AIIMS alumni with years of experience in training students for competitive excellence.
          </p>
        </motion.div>

        {/* Faculty Grid */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {facultyMembers.map((faculty, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="bg-white rounded-[2rem] border border-slate-100 overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group"
            >
              {/* Image Container */}
              <div className="relative h-72 overflow-hidden bg-slate-100">
                <img
                  src={faculty.image}
                  alt={faculty.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4">
                   <div className="bg-emerald-600 text-white px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase shadow-lg">
                    {faculty.department}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-black text-slate-900 mb-1 group-hover:text-emerald-600 transition-colors">
                  {faculty.name}
                </h3>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
                  {faculty.qualification}
                </p>
                <p className="text-sm text-slate-600 mb-6 leading-relaxed italic">
                  "{faculty.specialization}"
                </p>

                {/* Contact */}
                <div className="pt-6 border-t border-slate-50 flex items-center justify-between">
                  <a 
                    href={`mailto:${faculty.email}`}
                    className="h-10 w-10 bg-slate-50 hover:bg-emerald-50 text-slate-400 hover:text-emerald-600 rounded-xl flex items-center justify-center transition-all"
                  >
                    <Mail className="h-4 w-4" />
                  </a>
                  <button className="text-[10px] font-black text-emerald-600 uppercase tracking-widest hover:translate-x-1 transition-transform">
                    View Profile
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default MentorsSection;
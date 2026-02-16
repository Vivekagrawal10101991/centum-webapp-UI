import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, Target, Award, BookOpen, Heart, 
  CheckCircle, HandHeart, Library, GraduationCap, 
  TrendingUp, ExternalLink, Trophy, Star, Zap,
  ShieldCheck, Clock 
} from 'lucide-react';

// Animated Counter for Journey Stats
function AnimatedCounter({ value, duration = 1 }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let startTime;
    let animationFrame;
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      setCount(Math.floor(progress * value));
      if (progress < 1) animationFrame = requestAnimationFrame(animate);
    };
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [value, duration]);
  return <span>{count}</span>;
}

const About = () => {
  const values = [
    { icon: Target, title: "Our Mission", description: "To empower students through high-quality mentorship, innovative teaching practices, and personalised attention so that they excel in both academics and life.", color: "#7E3AF2" },
    { icon: Award, title: "Our Vision", description: "To create an education ecosystem where every student enjoys learning, thinks critically, and grows into a confident contributor to society.", color: "#1C64F2" },
    { icon: BookOpen, title: "Learning by Doing", description: "Students don't just memorise concepts but truly understand and apply them through practical, engaging, and innovative curriculum models.", color: "#F59E0B" },
    { icon: Heart, title: "Education with Emotion", description: "We believe learning goes beyond textbooks. Our approach combines academic excellence with emotional intelligence and holistic development.", color: "#EF4444" }
  ];

  const features = [
    "IIT & AIIMS Alumni Faculty", "Personalized Mentorship Programs", "Advanced Learning Management System", "Regular Parent-Teacher Meetings",
    "Comprehensive Study Material", "Mock Tests & Performance Analytics", "Doubt Clearing Sessions", "Career Counseling Support"
  ];

  const milestones = [
    { year: "2016", title: "Growing Strong", adv: "98", main: "580", neet: "74", highlight: "Growing Strong", description: "First batch of outstanding results", color: "#10B981" },
    { year: "2017", title: "Making Waves", adv: "134", main: "765", neet: "102", highlight: "Making Waves", description: "Recognition in educational community", color: "#6366F1" },
    { year: "2018", title: "Rapid Expansion", adv: "178", main: "980", neet: "135", highlight: "Campus Expansion", description: "Opened second campus", color: "#F59E0B" },
    { year: "2019", title: "Milestone Year", adv: "223", main: "1240", neet: "176", highlight: "Milestone Year", description: "Crossed 200 JEE Advanced selections", color: "#EF4444" },
    { year: "2021", title: "Digital Integration", adv: "289", main: "1520", neet: "218", highlight: "Digital Integration", description: "Partnered with NDLI for open learning", color: "#8B5CF6" },
    { year: "2023", title: "Excellence Peak", adv: "518", main: "2780", neet: "389", highlight: "Excellence Peak", description: "Mentoring tribal girls for medical exams", color: "#06B6D4" },
    { year: "2025", title: "Decade of Excellence", adv: "698", main: "3840", neet: "536", highlight: "Decade Strong", description: "Celebrating 11 years of success", color: "#F43F5E" },
    { year: "2026", title: "The Future Unfolds", adv: "750", main: "4200", neet: "595", highlight: "Future Ready", description: "Continuing the legacy of excellence", color: "#14B8A6", isCurrent: true }
  ];

  const duplicatedMilestones = [...milestones, ...milestones];
  const [startPos, setStartPos] = useState({ x: 1500, y: 500 });

  useEffect(() => {
    const calc = () => setStartPos({ x: window.innerWidth - 200, y: 540 });
    calc(); window.addEventListener('resize', calc);
    return () => window.removeEventListener('resize', calc);
  }, []);

  // Impact Statistics Data with Custom Gradients
  const impactStats = [
    { icon: Award, value: "4,800+", label: "JEE Adv Selections", gradient: "from-[#F59E0B] to-[#D97706]" },
    { icon: ShieldCheck, value: "26,000+", label: "JEE Main Qualified", gradient: "from-[#1C64F2] to-[#1E40AF]" },
    { icon: Target, value: "3,400+", label: "NEET Selections", gradient: "from-[#00A67E] to-[#047857]" },
    { icon: Clock, value: "13 Years", label: "Of Excellence", gradient: "from-[#7E3AF2] to-[#6D28D9]" }
  ];

  return (
    <div className="min-h-screen bg-white font-sans overflow-hidden">
      
      {/* 1. HEADER & OUR STORY */}
      <section className="py-20 md:py-28 px-6 bg-gradient-to-br from-white via-purple-50/30 to-blue-50/30 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10 text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#7E3AF2] to-[#1C64F2] px-4 py-2 rounded-full mb-6 shadow-lg">
            <Sparkles className="h-5 w-5 text-white" />
            <span className="text-sm font-bold text-white uppercase tracking-wider">ABOUT US</span>
          </div>
          <h2 className="text-5xl font-bold text-slate-900 mb-6 tracking-tight">
            Shaping Thinkers, <span className="bg-gradient-to-r from-[#7E3AF2] to-[#1C64F2] bg-clip-text text-transparent">Not Just Test-Takers</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">At Centum Academy, we believe every student has the potential to excel when guided with the right mentorship and approach.</p>
        </div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="space-y-6 text-slate-600 leading-relaxed text-lg">
            <h3 className="text-3xl font-bold text-slate-900 mb-2">Our Story</h3>
            <p>Founded in Bangalore by a team of passionate IIT alumni, we are dedicated to transforming how education is delivered at the higher secondary level. At Centum Academy, we believe every student has the potential to excel when guided with the right mentorship and approach.</p>
            <p>Our philosophy of <strong>"Learning by Doing"</strong> ensures that students don't just memorise concepts but truly understand and apply them. We design innovative curriculum models that make learning engaging, practical, and relevant to real life.</p>
            <p>To us, no subject is ever boring—when taught effectively, every subject becomes a window to understanding the world. We're committed to shaping thinkers who can excel in both academics and life.</p>
          </div>
          <motion.div whileHover={{ scale: 1.02 }} className="rounded-2xl overflow-hidden shadow-2xl border border-slate-100">
            <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1080" alt="Students" className="w-full h-[400px] object-cover" />
          </motion.div>
        </div>
      </section>

      {/* 2. VALUES & 3. WHY CHOOSE */}
      <section className="py-24 px-6 bg-white">
        <h3 className="text-3xl font-bold text-slate-900 mb-12 text-center">Our Core Values</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-20">
          {values.map((v, i) => (
            <motion.div key={i} whileHover={{ y: -5 }} className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
              <div className="h-14 w-14 rounded-xl flex items-center justify-center mb-4" style={{ background: `${v.color}20` }}><v.icon className="h-7 w-7" style={{ color: v.color }} /></div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">{v.title}</h4>
              <p className="text-sm text-slate-600 leading-relaxed">{v.description}</p>
            </motion.div>
          ))}
        </div>
        <div className="bg-gradient-to-br from-[#7E3AF2] to-[#1C64F2] rounded-3xl p-12 text-white max-w-7xl mx-auto">
          <h3 className="text-3xl font-bold mb-8 text-center">Why Choose Centum Academy?</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (<div key={i} className="flex items-start gap-3"><CheckCircle className="h-5 w-5 text-[#F59E0B] flex-shrink-0 mt-0.5" /><span>{f}</span></div>))}
          </div>
        </div>
      </section>

      {/* 4. CONTRIBUTIONS */}
      <section className="py-24 px-6 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-[#059669] px-4 py-2 rounded-full mb-4 shadow-lg">
              <HandHeart className="h-5 w-5 text-white" />
              <span className="text-sm font-bold text-white uppercase tracking-wider">Our Contributions</span>
            </div>
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-4 whitespace-nowrap">
              Centum Academy's <span className="bg-gradient-to-r from-[#00A67E] to-[#059669] bg-clip-text text-transparent">Contribution</span> in Education
            </h3>
          </div>
          <div className="grid lg:grid-cols-2 gap-8">
            <motion.div whileHover={{ y: -5 }} className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-8 text-white">
                <div className="flex items-start justify-between mb-4"><Library className="h-12 w-12 text-white" /><span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">Since 2020</span></div>
                <h4 className="text-xl md:text-2xl font-black mb-2 tracking-tight">National Digital Library of India (NDLI)</h4>
                <p className="text-blue-100 text-sm">Empowering learners nationwide — Centum resources, now part of India's largest digital learning hub.</p>
              </div>
              <div className="p-8 space-y-6">
                <div><h5 className="text-lg font-bold text-slate-900 mb-2">Expanding Access Through NDLI Partnership</h5><p className="text-slate-600 text-sm leading-relaxed mb-4">Centum Academy proudly partners with the National Digital Library of India (NDLI) to make quality academic and competitive exam resources accessible to every learner, anywhere in the country.</p></div>
                <h6 className="font-bold text-slate-900 text-sm mb-2 uppercase tracking-widest">Our Contribution</h6>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">The National Digital Library of India (NDLI), an initiative by the Ministry of Education and hosted by IIT Kharagpur, is a one-stop platform bringing together millions of educational resources. Since our collaboration, Centum Academy has been contributing curated study materials, detailed notes, video lessons, and practice tests to NDLI.</p>
                <div className="bg-blue-50 border-l-4 border-blue-600 p-5 rounded-r-xl">
                  <h6 className="font-bold text-blue-900 text-xs tracking-widest uppercase mb-1">Impact</h6>
                  <p className="text-blue-800 text-sm font-medium">Breaking barriers of geography and access, empowering students across India to prepare smarter and achieve more.</p>
                </div>
                <a href="https://ndl.iitkgp.ac.in/" target="_blank" className="inline-flex items-center gap-2 text-blue-600 font-bold hover:text-blue-800 transition-colors uppercase text-xs tracking-widest">Visit NDLI Platform <ExternalLink className="h-4 w-4" /></a>
              </div>
            </motion.div>
            <motion.div whileHover={{ y: -5 }} className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
              <div className="bg-gradient-to-br from-green-500 to-green-600 p-8 text-white">
                <div className="flex items-start justify-between mb-4"><GraduationCap className="h-12 w-12 text-white" /><span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">Since 2020</span></div>
                <h4 className="text-xl md:text-2xl font-black mb-2 tracking-tight">PRAYAS Project, Chhattisgarh</h4>
                <p className="text-green-100 text-sm">Shaping futures in the heart of Chhattisgarh — free coaching for tribal girls since 2020.</p>
              </div>
              <div className="p-8 space-y-6">
                <div><h5 className="text-lg font-bold text-slate-900 mb-2">Free Coaching & Mentorship for Tribal Girls</h5><p className="text-slate-600 text-sm leading-relaxed mb-4">Since 2020, Centum Academy has been teaching and mentoring tribal girls for free under the PRAYAS Project, helping them crack national-level entrance exams and achieve their dreams.</p></div>
                <h6 className="font-bold text-slate-900 text-sm mb-2 uppercase tracking-widest">Centum's Role in the PRAYAS Initiative</h6>
                <p className="text-slate-600 text-sm leading-relaxed mb-4 italic">The PRAYAS Project, initiated by the Tribal & Scheduled Caste Development Department of Chhattisgarh, provides quality residential education and competitive exam coaching to talented students from tribal and Left-Wing-Extremism–affected (LWE) districts. Since 2020, Centum Academy has been a proud academic partner, delivering concept-based learning and regular mock testing—all at zero cost.</p>
                <div className="bg-emerald-50 border-l-4 border-emerald-600 p-5 rounded-r-xl">
                  <h6 className="font-bold text-emerald-900 text-xs tracking-widest uppercase mb-1">Impact</h6>
                  <p className="text-emerald-800 text-sm font-medium">Multiple PRAYAS students have secured MBBS seats and admissions in top institutions, proving that with the right guidance, talent knows no boundaries.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. OUR JOURNEY */}
      <section className="py-24 bg-white overflow-hidden relative min-h-[950px] flex flex-col justify-center border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 relative z-20 mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#7E3AF2] to-[#1C64F2] rounded-full mb-6 shadow-lg"><TrendingUp className="h-5 w-5 text-white" /><span className="text-sm font-bold text-white uppercase tracking-wider">2014 - 2026</span></div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-6">Our <span className="bg-gradient-to-r from-[#7E3AF2] to-[#1C64F2] bg-clip-text text-transparent">Journey</span></h2>
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">Climbing the ladder of success - 13 years of transforming dreams into reality</p>
        </div>

        <div className="relative min-h-[640px] overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-white via-purple-50/10 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-white via-purple-50/10 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-white via-purple-50/10 to-transparent z-10 pointer-events-none"></div>

          <motion.div
            className="absolute"
            style={{ width: '6000px', height: '6000px', left: '0', top: '0' }}
            animate={{ x: [startPos.x, -startPos.x - 4000], y: [startPos.y, -startPos.y - 4000] }}
            transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
          >
            {duplicatedMilestones.map((m, idx) => {
              const offset = idx * 280;
              return (
                <div key={idx} className="absolute flex flex-col items-center" style={{ left: `${offset}px`, top: `${offset}px` }}>
                  <motion.div whileHover={{ scale: 1.2, rotate: 5 }} className="relative mb-4 z-20 w-16 h-20">
                    <div className={`absolute inset-0 rounded-2xl blur-xl ${m.isCurrent ? 'bg-purple-400' : 'bg-yellow-400'} opacity-40`} />
                    <div className={`relative w-full h-full rounded-2xl shadow-xl flex items-center justify-center ${m.isCurrent ? 'bg-gradient-to-br from-purple-500 to-blue-500' : 'bg-gradient-to-br from-yellow-400 to-orange-500'}`}>
                      {m.isCurrent ? <Star className="text-white h-8 w-8" /> : <Trophy className="text-white h-8 w-8" />}
                    </div>
                  </motion.div>
                  <motion.div whileHover={{ y: -8 }} className="relative bg-white rounded-3xl shadow-2xl p-5 border border-slate-100 w-[240px]">
                    <div className="text-center mb-3">
                      <h3 className="text-5xl font-black mb-1">
                        <span className="text-orange-500">{m.year.slice(0,2)}</span>
                        <span className="text-blue-500">{m.year.slice(2)}</span>
                      </h3>
                      <p className="text-[10px] font-bold text-[#7E3AF2] uppercase tracking-wide">{m.highlight}</p>
                    </div>
                    <div className="space-y-1.5 mb-3">
                      <div className="flex justify-between text-[10px] font-bold"><span className="text-orange-600 uppercase">JEE ADV</span><span className="text-slate-900 font-black text-xs"><AnimatedCounter value={m.adv} /></span></div>
                      <div className="flex justify-between text-[10px] font-bold border-y border-slate-50 py-1"><span className="text-blue-600 uppercase">JEE MAIN</span><span className="text-slate-900 font-black text-xs"><AnimatedCounter value={m.main} /></span></div>
                      <div className="flex justify-between text-[10px] font-bold"><span className="text-green-600 uppercase">NEET</span><span className="text-slate-900 font-black text-xs"><AnimatedCounter value={m.neet} /></span></div>
                    </div>
                    <div className="pt-2 border-t border-slate-100 italic text-[10px] text-slate-500 text-center">"{m.description}"</div>
                  </motion.div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* 6. IMPACT STATISTICS (MODIFIED: 50% REDUCED HEIGHT, GRADIENT CARDS & REDUCED RADIUS) */}
      <section className="py-16 bg-white border-t border-slate-100 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {impactStats.map((stat, idx) => (
              <motion.div 
                key={idx} 
                className="relative group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
              >
                {/* 50% Reduced Height (p-5), Reduced Radius (rounded-2xl) and Solid Theme Gradient */}
                <div 
                  className={`text-center rounded-2xl p-5 shadow-lg transition-all duration-500 flex flex-col items-center justify-center border border-transparent hover:shadow-xl bg-gradient-to-br ${stat.gradient}`}
                >
                  {/* Smaller Icon Container */}
                  <motion.div
                    className="inline-flex items-center justify-center w-10 h-10 rounded-full mb-3 bg-white/20 shadow-inner"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 + 0.2 }}
                  >
                    <stat.icon className="h-5 w-5 text-white" />
                  </motion.div>

                  {/* Smaller Value Text Size */}
                  <motion.h3 
                    className="text-2xl lg:text-3xl font-black text-white mb-1 tracking-tight"
                    initial={{ scale: 0.9 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.1 + 0.3 }}
                  >
                    {stat.value}
                  </motion.h3>

                  {/* Smaller Label Text Size */}
                  <p className="text-xs lg:text-sm font-bold text-white uppercase tracking-widest opacity-90">
                    {stat.label}
                  </p>

                  {/* Smaller Decorative Accent */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10 blur-xl group-hover:bg-white/20 transition-all duration-500"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;
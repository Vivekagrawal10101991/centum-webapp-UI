import React, { useState, useEffect } from "react";
import { 
  Briefcase, MapPin, Clock, DollarSign, GraduationCap, Users, 
  Award, TrendingUp, Heart, Zap, Shield, Smile, ArrowRight 
} from "lucide-react";

const Careers = () => {
  const [jobPostings, setJobPostings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fallback data
  const dummyJobs = [
    {
      id: '1', title: 'Senior Physics Faculty', department: 'Academics', 
      location: 'Bangalore', type: 'Full Time', experience: '5+ Years', 
      salary: 'Competitive', description: 'Lead the Physics department for JEE Advanced batches.', status: 'active'
    },
    {
      id: '2', title: 'Academic Counselor', department: 'Sales', 
      location: 'Bangalore', type: 'Full Time', experience: '1-3 Years', 
      salary: 'Best in Industry', description: 'Guide students and parents through the admission process.', status: 'active'
    }
  ];

  useEffect(() => {
    // Simulate API load
    const timer = setTimeout(() => {
      setJobPostings(dummyJobs);
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleApply = (job) => {
    alert(`Application started for ${job.title}. (Integration pending)`);
  };

  const scrollToOpenings = () => {
    document.getElementById('openings')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white font-sans animate-fade-in">
      
      {/* --- HERO SECTION --- */}
      <section className="relative py-32 px-6 bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
             <img src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop" alt="Background" className="w-full h-full object-cover" />
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <div className="transition-all duration-700 transform translate-y-0 opacity-100">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full mb-6 border border-white/20 text-[#10B981] font-bold tracking-wider uppercase text-sm">
              <span className="w-2 h-2 rounded-full bg-[#10B981]"></span> Join Our Team
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Work With Us at <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#10B981] to-[#34D399]">Centum Academy</span>
            </h1>
            
            <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
              Be part of a mission-driven team that's transforming education and shaping the future of thousands of students.
            </p>
            
            <button 
              className="bg-[#10B981] hover:bg-[#059669] text-white px-8 py-4 text-lg font-bold rounded-full shadow-lg shadow-[#10B981]/25 hover:-translate-y-1 transition-all flex items-center gap-2 mx-auto"
              onClick={scrollToOpenings}
            >
              View Open Positions <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      {/* --- WHY JOIN US --- */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-[#10B981] font-bold tracking-widest uppercase text-sm mb-2">Why Centum Academy</h2>
            <h3 className="text-4xl font-bold text-slate-900">Why Join Us</h3>
            <p className="text-slate-600 mt-4 max-w-2xl mx-auto">Discover what makes Centum Academy an exceptional place to build your career.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: TrendingUp, title: "Career Growth", text: "Continuous learning opportunities and clear career progression paths.", color: "#10B981" },
              { icon: Smile, title: "Work-Life Balance", text: "Flexible schedules and supportive work environment.", color: "#F59E0B" },
              { icon: DollarSign, title: "Competitive Pay", text: "Industry-leading salary packages and performance bonuses.", color: "#3B82F6" },
              { icon: Users, title: "Collaborative Culture", text: "Work with passionate educators and innovative thinkers.", color: "#8B5CF6" },
              { icon: GraduationCap, title: "Development", text: "Regular training sessions and skill enhancement programs.", color: "#EC4899" },
              { icon: Heart, title: "Impact & Purpose", text: "Shape the future by transforming young minds.", color: "#EF4444" }
            ].map((item, i) => (
              <div 
                key={i}
                className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl transition-all hover:-translate-y-1 duration-300"
              >
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6" style={{ backgroundColor: `${item.color}15`, color: item.color }}>
                  <item.icon className="w-7 h-7" />
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h4>
                <p className="text-slate-600 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CORE VALUES --- */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-[#10B981] font-bold tracking-widest uppercase text-sm mb-2">Our Core Values</h2>
            <h3 className="text-4xl font-bold text-slate-900">What We Stand For</h3>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { title: "Excellence", text: "We strive for excellence in everything we do.", icon: Award },
              { title: "Innovation", text: "We embrace innovative teaching methods.", icon: Zap },
              { title: "Integrity", text: "We maintain the highest standards of honesty.", icon: Shield },
              { title: "Empathy", text: "We support our students' emotional needs.", icon: Heart }
            ].map((val, i) => (
              <div key={i} className="group bg-slate-50 p-8 rounded-3xl text-center hover:bg-[#10B981] transition-all duration-300 cursor-default">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm group-hover:scale-110 transition-transform">
                  <val.icon className="w-8 h-8 text-[#10B981]" />
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-white transition-colors">{val.title}</h4>
                <p className="text-slate-600 text-sm group-hover:text-white/90 transition-colors">{val.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- LIFE AT CENTUM --- */}
      <section className="py-24 px-6 bg-[#0F172A] text-white overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6">Life at Centum Academy</h2>
            <p className="text-slate-400 text-lg mb-8 leading-relaxed">
              A vibrant, supportive, and growth-oriented environment where educators thrive.
            </p>
            <div className="space-y-8">
              {[
                { title: "Mission-Driven", text: "Make a real difference in students' lives.", icon: Heart, color: "text-emerald-400", bg: "bg-emerald-400/10" },
                { title: "Growth Opportunities", text: "Clear paths for advancement in your career.", icon: TrendingUp, color: "text-blue-400", bg: "bg-blue-400/10" },
                { title: "Collaborative Team", text: "Work alongside passionate educators.", icon: Users, color: "text-amber-400", bg: "bg-amber-400/10" }
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className={`h-12 w-12 rounded-full ${item.bg} flex items-center justify-center flex-shrink-0 ${item.color}`}>
                    <item.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-1">{item.title}</h4>
                    <p className="text-slate-400">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[#10B981] to-[#3B82F6] rounded-3xl transform rotate-3 blur-sm opacity-30"></div>
            <img 
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1771&auto=format&fit=crop" 
              alt="Team" 
              className="relative rounded-3xl shadow-2xl border border-white/10 w-full"
            />
          </div>
        </div>
      </section>

      {/* --- CURRENT OPENINGS --- */}
      <section id="openings" className="py-24 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Ready to Make an Impact?</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Explore our current openings and take the first step towards a rewarding career.
            </p>
          </div>

          <div className="space-y-4">
            {loading ? (
              <div className="text-center py-10">Loading positions...</div>
            ) : jobPostings.length === 0 ? (
               <div className="bg-white p-12 rounded-2xl text-center border border-slate-200">
                 <Briefcase className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                 <h3 className="text-xl font-bold text-slate-900">No Current Openings</h3>
                 <p className="text-slate-500 mt-2">Please check back later or email us your resume.</p>
               </div>
            ) : (
              jobPostings.map((job) => (
                <div 
                  key={job.id} 
                  className="bg-white rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-lg transition-all border border-slate-100 flex flex-col lg:flex-row lg:items-center justify-between gap-6"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-2xl font-bold text-slate-900">{job.title}</h3>
                      <span className="bg-[#10B981]/10 text-[#10B981] text-xs font-bold px-3 py-1 rounded-full uppercase">
                        {job.department}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-slate-500 mb-3">
                      <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {job.location}</span>
                      <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {job.type}</span>
                      <span className="flex items-center gap-1"><GraduationCap className="w-4 h-4" /> {job.experience}</span>
                      <span className="flex items-center gap-1"><DollarSign className="w-4 h-4" /> {job.salary}</span>
                    </div>
                    <p className="text-slate-600 line-clamp-2">{job.description}</p>
                  </div>
                  <button 
                    onClick={() => handleApply(job)}
                    className="bg-[#10B981] hover:bg-[#059669] text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-[#10B981]/20 whitespace-nowrap h-auto"
                  >
                    Apply Now
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Careers;
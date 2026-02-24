import React, { useState, useEffect } from "react";
import { 
  Briefcase, MapPin, Clock, Users, 
  Award, TrendingUp, Heart, Zap, Shield, Smile, ArrowRight, Calendar, X 
} from "lucide-react";
import api from "../../../services/api";

const Careers = () => {
  const [jobPostings, setJobPostings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [selectedJob, setSelectedJob] = useState(null);
  const [formData, setFormData] = useState({
    applicantName: "",
    email: "",
    phone: "",
    resumeUrl: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        // Using the public endpoint to fetch active jobs
        const response = await api.get('/api/public/jobs');
        
        // Handle standard nested response or direct array response
        const activeJobs = response.data?.success ? response.data.data : (response.data || []);
        
        setJobPostings(activeJobs);
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleApplyClick = (job) => {
    setSelectedJob(job);
    setFormData({ applicantName: "", email: "", phone: "", resumeUrl: "" });
    setSubmitMessage({ type: "", text: "" });
  };

  const handleCloseModal = () => {
    setSelectedJob(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitApplication = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage({ type: "", text: "" });

    try {
      await api.post(`/api/public/jobs/${selectedJob.id}/apply`, formData);
      setSubmitMessage({ type: "success", text: "Application submitted successfully! Our HR team will review it." });
      
      // Close modal after 3 seconds on success
      setTimeout(() => {
        handleCloseModal();
      }, 3000);
    } catch (error) {
      setSubmitMessage({ type: "error", text: error || "Failed to submit application. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToOpenings = () => {
    document.getElementById('openings')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white font-sans animate-fade-in relative">
      
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
              { icon: Award, title: "Competitive Pay", text: "Industry-leading salary packages and performance bonuses.", color: "#3B82F6" },
              { icon: Users, title: "Collaborative Culture", text: "Work with passionate educators and innovative thinkers.", color: "#8B5CF6" },
              { icon: Briefcase, title: "Development", text: "Regular training sessions and skill enhancement programs.", color: "#EC4899" },
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
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#10B981]"></div>
              </div>
            ) : jobPostings.length === 0 ? (
               <div className="bg-white p-12 rounded-2xl text-center border border-slate-200">
                 <Briefcase className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                 <h3 className="text-xl font-bold text-slate-900">No Current Openings</h3>
                 <p className="text-slate-500 mt-2">We are fully staffed at the moment. Please check back later!</p>
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
                      {job.department && (
                        <span className="bg-[#10B981]/10 text-[#10B981] text-xs font-bold px-3 py-1 rounded-full uppercase">
                          {job.department}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-slate-500 mb-3">
                      {job.location && (
                        <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {job.location}</span>
                      )}
                      {job.employmentType && (
                        <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {job.employmentType}</span>
                      )}
                      {job.postedDate && (
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" /> 
                          Posted {new Date(job.postedDate).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                    <p className="text-slate-600 line-clamp-2">{job.description}</p>
                  </div>
                  <button 
                    onClick={() => handleApplyClick(job)}
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

      {/* --- APPLICATION MODAL --- */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl p-6 md:p-8 w-full max-w-lg shadow-2xl relative transform transition-all">
            <button 
              onClick={handleCloseModal} 
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 p-1 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="mb-6 pr-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Apply for {selectedJob.title}</h3>
              <p className="text-slate-500 text-sm">Fill out the form below to submit your application for the {selectedJob.department} department.</p>
            </div>
            
            {submitMessage.text && (
              <div className={`p-4 rounded-xl mb-6 text-sm font-medium ${submitMessage.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                {submitMessage.text}
              </div>
            )}

            {!submitMessage.text || submitMessage.type === 'error' ? (
              <form onSubmit={handleSubmitApplication} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Full Name</label>
                  <input 
                    required 
                    type="text" 
                    name="applicantName" 
                    value={formData.applicantName} 
                    onChange={handleInputChange} 
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#10B981]/50 focus:border-[#10B981] outline-none transition-all" 
                    placeholder="Enter your full name" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email Address</label>
                  <input 
                    required 
                    type="email" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleInputChange} 
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#10B981]/50 focus:border-[#10B981] outline-none transition-all" 
                    placeholder="Enter your email" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Phone Number</label>
                  <input 
                    required 
                    type="tel" 
                    name="phone" 
                    value={formData.phone} 
                    onChange={handleInputChange} 
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#10B981]/50 focus:border-[#10B981] outline-none transition-all" 
                    placeholder="Enter your phone number" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Resume Link</label>
                  <input 
                    required 
                    type="url" 
                    name="resumeUrl" 
                    value={formData.resumeUrl} 
                    onChange={handleInputChange} 
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#10B981]/50 focus:border-[#10B981] outline-none transition-all" 
                    placeholder="Google Drive, Dropbox, or Portfolio Link" 
                  />
                  <p className="text-xs text-slate-500 mt-2">Please ensure the link access is set to "Anyone with the link can view".</p>
                </div>
                
                <button 
                  type="submit" 
                  disabled={isSubmitting} 
                  className="w-full bg-[#10B981] hover:bg-[#059669] text-white font-bold py-3.5 rounded-xl mt-4 transition-all shadow-md shadow-[#10B981]/20 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> 
                      Submitting...
                    </span>
                  ) : 'Submit Application'}
                </button>
              </form>
            ) : null}
          </div>
        </div>
      )}

    </div>
  );
};

export default Careers;
import React, { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send, User, BookOpen, MessageSquare } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted", formData);
    alert("Thank you! We will contact you shortly.");
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* --- HERO SECTION --- */}
      <section className="relative py-20 px-4 md:px-6 bg-gradient-to-br from-[#1E3A8A] via-[#7E3AF2] to-[#0D9488] text-white overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <div className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full mb-6 border border-white/10">
            <span className="text-sm font-semibold tracking-wider uppercase">Get in Touch</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Contact Centum Academy
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
            Have questions about our courses? We're here to help you take the first step towards your dream career.
          </p>
        </div>
      </section>

      {/* --- MAIN CONTENT --- */}
      <section className="py-16 md:py-24 px-4 md:px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          
          {/* LEFT COLUMN: Contact Info */}
          <div className="space-y-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Let's Talk About Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7E3AF2] to-[#1C64F2]">Future</span>
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                Whether you're interested in JEE, NEET, or Foundation programs, our team is ready to guide you through the admission process.
              </p>
            </div>

            <div className="grid gap-6">
              {/* Phone */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-start gap-4 hover:shadow-md transition-shadow">
                <div className="h-12 w-12 bg-[#7E3AF2]/10 rounded-xl flex items-center justify-center flex-shrink-0 text-[#7E3AF2]">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Call Us</h3>
                  <a href="tel:+919108933332" className="text-slate-600 hover:text-[#7E3AF2] font-medium block mt-1">+91 91089 33332</a>
                  <p className="text-sm text-slate-400 mt-1">Mon-Sat, 9:00 AM - 7:00 PM</p>
                </div>
              </div>

              {/* Email */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-start gap-4 hover:shadow-md transition-shadow">
                <div className="h-12 w-12 bg-[#1C64F2]/10 rounded-xl flex items-center justify-center flex-shrink-0 text-[#1C64F2]">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Email Us</h3>
                  <a href="mailto:contactus@centumacademy.com" className="text-slate-600 hover:text-[#1C64F2] font-medium block mt-1 break-all">contactus@centumacademy.com</a>
                  <p className="text-sm text-slate-400 mt-1">We'll respond within 24 hours</p>
                </div>
              </div>

              {/* Address */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-start gap-4 hover:shadow-md transition-shadow">
                <div className="h-12 w-12 bg-[#059669]/10 rounded-xl flex items-center justify-center flex-shrink-0 text-[#059669]">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Visit Us</h3>
                  <p className="text-slate-600 font-medium mt-1">HSR Layout, Bengaluru</p>
                  <p className="text-sm text-slate-400 mt-1">Karnataka, India</p>
                </div>
              </div>

              {/* Hours */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-start gap-4 hover:shadow-md transition-shadow">
                <div className="h-12 w-12 bg-[#F59E0B]/10 rounded-xl flex items-center justify-center flex-shrink-0 text-[#F59E0B]">
                  <Clock className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Office Hours</h3>
                  <p className="text-slate-600 font-medium mt-1">Monday - Saturday</p>
                  <p className="text-sm text-slate-400 mt-1">9:00 AM - 7:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Enquiry Form */}
          <div className="bg-white rounded-[2rem] shadow-xl border border-slate-100 p-8 md:p-10 relative overflow-hidden">
             {/* Decorative blob */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#7E3AF2]/10 to-transparent rounded-bl-full pointer-events-none"></div>

            <div className="mb-8">
              <h3 className="text-2xl font-bold text-slate-900">Send Us a Message</h3>
              <p className="text-slate-500 mt-2">Fill out the form and we'll get back to you as soon as possible.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                  <User className="h-4 w-4 text-[#7E3AF2]" /> Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#7E3AF2] focus:ring-2 focus:ring-[#7E3AF2]/20 outline-none transition-all bg-slate-50 focus:bg-white"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                  <Mail className="h-4 w-4 text-[#7E3AF2]" /> Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#7E3AF2] focus:ring-2 focus:ring-[#7E3AF2]/20 outline-none transition-all bg-slate-50 focus:bg-white"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                  <Phone className="h-4 w-4 text-[#7E3AF2]" /> Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="+91 XXXXX XXXXX"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#7E3AF2] focus:ring-2 focus:ring-[#7E3AF2]/20 outline-none transition-all bg-slate-50 focus:bg-white"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-[#7E3AF2]" /> Course Interested In
                </label>
                <select
                  name="course"
                  required
                  value={formData.course}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#7E3AF2] focus:ring-2 focus:ring-[#7E3AF2]/20 outline-none transition-all bg-slate-50 focus:bg-white appearance-none"
                >
                  <option value="">Select a course</option>
                  <option value="JEE">JEE Main + Advanced</option>
                  <option value="NEET">NEET Program</option>
                  <option value="Foundation">Foundation (Class 8-10)</option>
                  <option value="KCET">KCET</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-[#7E3AF2]" /> Your Message
                </label>
                <textarea
                  name="message"
                  rows="4"
                  placeholder="Tell us more about your requirements..."
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#7E3AF2] focus:ring-2 focus:ring-[#7E3AF2]/20 outline-none transition-all bg-slate-50 focus:bg-white resize-none"
                />
              </div>

              <button 
                type="submit" 
                className="w-full py-4 text-base font-bold bg-gradient-to-r from-[#7E3AF2] to-[#1C64F2] hover:from-[#6C2BD9] hover:to-[#1E40AF] text-white shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all rounded-xl flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" /> Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* --- MAP SECTION --- */}
      <section className="bg-white py-16 px-4 md:px-6 border-t border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-slate-900">Find Us on Map</h2>
            <p className="text-slate-500 mt-2">Located in the heart of HSR Layout, Bengaluru</p>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-slate-100 h-[500px]">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.750939884846!2d77.6382063750756!3d12.923722787387346!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae148d4808a047%3A0x673966504620060c!2sCentum%20Academy!5e0!3m2!1sen!2sin!4v1708428234823!5m2!1sen!2sin" 
              width="100%" 
              height="100%" 
              style={{border:0}} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Centum Academy Location"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
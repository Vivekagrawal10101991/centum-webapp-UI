import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-purple-600 rounded-full flex items-center justify-center font-bold text-lg">C</div>
              <div>
                <h3 className="font-bold text-lg">CENTUM ACADEMY</h3>
                <p className="text-xs text-purple-400 font-bold italic">Education with Emotion</p>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Empowering students through concept-driven learning. Founded by IIT alumni, we focus on quality mentorship and building a future-ready ecosystem.
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="h-10 w-10 bg-slate-800 rounded-xl flex items-center justify-center hover:bg-purple-600 transition-all hover:-translate-y-1">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-purple-400 mb-6 uppercase text-sm tracking-widest">Quick Links</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/courses" className="hover:text-white transition-colors">JEE Preparation</Link></li>
              <li><Link to="/courses" className="hover:text-white transition-colors">NEET Preparation</Link></li>
              <li><Link to="/student-success" className="hover:text-white transition-colors">Success Stories</Link></li>
              <li><Link to="/blogs" className="hover:text-white transition-colors">Blog</Link></li>
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 className="font-bold text-purple-400 mb-6 uppercase text-sm tracking-widest">Programs</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><Link to="/courses" className="hover:text-white transition-colors">JEE Main + Advanced</Link></li>
              <li><Link to="/courses" className="hover:text-white transition-colors">NEET Coaching</Link></li>
              <li><Link to="/courses" className="hover:text-white transition-colors">KCET Prep</Link></li>
              <li><Link to="/courses" className="hover:text-white transition-colors">Foundation (8-10)</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-purple-400 mb-6 uppercase text-sm tracking-widest">Contact Us</h4>
            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <Mail className="h-4 w-4 text-purple-400 mt-1" />
                <div>
                  <p className="text-slate-500 text-[10px] font-bold uppercase">Email</p>
                  <p className="text-white">contactus@centumacademy.com</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="h-4 w-4 text-purple-400 mt-1" />
                <div>
                  <p className="text-slate-500 text-[10px] font-bold uppercase">Phone</p>
                  <p className="text-white">+91 91089 3332</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-purple-400 mt-1" />
                <div>
                  <p className="text-slate-500 text-[10px] font-bold uppercase">Location</p>
                  <p className="text-white leading-relaxed">HSR Layout, Bengaluru,<br/>Karnataka</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800 py-6 bg-slate-950/50">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>© 2026 Centum Academy. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-purple-400">Terms of Service</a>
            <a href="#" className="hover:text-purple-400">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, ChevronDown, Search, Megaphone, User, LogOut, LayoutDashboard } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import logo from "../../../assets/logo.png";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  // News ticker state from Figma
  const [newsIdx, setNewsIdx] = useState(0);
  const news = [
    "Admissions Open for JEE/NEET 2026 Batch",
    "97% Students Secured Top Ranks in JEE Advanced",
    "New Foundation Program Launched for Class 8-10"
  ];

  useEffect(() => {
    const timer = setInterval(() => setNewsIdx(p => (p + 1) % news.length), 4000);
    return () => clearInterval(timer);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { 
      name: "About Us", 
      path: "/about",
      submenu: [{ name: "Our Story", path: "/about" }, { name: "Contributions", path: "/contributions" }]
    },
    { name: "Courses", path: "/courses" },
    { name: "Success Stories", path: "/student-success" },
    { name: "Media", path: "/blogs" },
    { name: "Contact", path: "/contact" }
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white">
      {/* 1. News Bar (Figma Design) */}
      <div className="bg-slate-900 text-white py-2 overflow-hidden border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Megaphone className="h-3.5 w-3.5 text-amber-400" />
            <span className="text-[10px] font-black uppercase tracking-widest text-amber-400">Update:</span>
            <p className="text-[11px] font-bold animate-fade-in">{news[newsIdx]}</p>
          </div>
          <div className="hidden lg:flex items-center gap-6">
            <div className="flex items-center gap-2 bg-slate-800 rounded-lg px-3 py-1 border border-white/10">
              <Search className="h-3 w-3 text-slate-400" />
              <input type="text" placeholder="Search..." className="bg-transparent border-none outline-none text-[10px] w-24" />
            </div>
            {!isAuthenticated && <Link to="/login" className="text-[10px] font-black uppercase tracking-widest hover:text-purple-400">Login</Link>}
          </div>
        </div>
      </div>

      {/* 2. Main Navigation (Figma Design) */}
      <div className="max-w-7xl mx-auto px-6 h-20 md:h-24 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="h-12 w-12 bg-purple-600 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-lg">C</div>
          <div className="flex flex-col">
            <span className="text-xl font-black text-slate-900 leading-none">CENTUM ACADEMY</span>
            <span className="text-[10px] font-bold italic text-emerald-600 uppercase mt-1 tracking-widest">Education with emotion</span>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-2">
          {navLinks.map((link, idx) => (
            <div key={idx} className="relative group" onMouseEnter={() => setActiveDropdown(idx)} onMouseLeave={() => setActiveDropdown(null)}>
              <Link to={link.path} className="px-4 py-2 text-[11px] font-black uppercase tracking-[0.15em] text-slate-600 hover:text-purple-600 transition-all flex items-center gap-1">
                {link.name}
                {link.submenu && <ChevronDown className="h-3 w-3" />}
              </Link>
              {link.submenu && activeDropdown === idx && (
                <div className="absolute top-full left-0 pt-2 w-48 animate-fade-in">
                  <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 py-2 overflow-hidden">
                    {link.submenu.map((sub, sIdx) => (
                      <Link key={sIdx} to={sub.path} className="block px-6 py-3 text-[11px] font-bold text-slate-500 hover:bg-purple-50 hover:text-purple-600">
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
          <Link to="/contact" className="ml-4 bg-purple-600 hover:bg-purple-700 text-white px-8 py-3.5 rounded-xl font-black uppercase tracking-widest text-[10px] shadow-xl shadow-purple-600/20 transition-all">
            Enquire Now
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden p-2 bg-slate-50 rounded-xl">
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
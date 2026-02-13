import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

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
    <nav className="sticky top-0 z-50 bg-white font-sans shadow-sm border-b border-slate-100">
      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-6 h-20 md:h-24 flex items-center justify-between">
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="h-12 w-12 bg-purple-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg group-hover:scale-105 transition-transform">
            C
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold text-slate-900 leading-none tracking-tight">CENTUM ACADEMY</span>
            <span className="text-xs font-medium italic text-emerald-600 uppercase mt-1 tracking-wider">Education with emotion</span>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link, idx) => (
            <div 
              key={idx} 
              className="relative group" 
              onMouseEnter={() => setActiveDropdown(idx)} 
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link 
                to={link.path} 
                className="px-5 py-2.5 text-sm font-semibold uppercase tracking-wide text-slate-600 hover:text-purple-600 transition-all flex items-center gap-1"
              >
                {link.name}
                {link.submenu && <ChevronDown className="h-4 w-4 opacity-50" />}
              </Link>
              
              {/* Dropdown Menu */}
              {link.submenu && activeDropdown === idx && (
                <div className="absolute top-full left-0 pt-4 w-56 animate-fade-in z-50">
                  <div className="bg-white rounded-xl shadow-xl border border-slate-100 py-2 overflow-hidden">
                    {link.submenu.map((sub, sIdx) => (
                      <Link 
                        key={sIdx} 
                        to={sub.path} 
                        className="block px-6 py-3 text-sm font-medium text-slate-500 hover:bg-purple-50 hover:text-purple-600 transition-colors"
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
          
          {/* CTA Buttons */}
          <div className="flex items-center gap-4 ml-6">
            <Link 
              to="/contact" 
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-xl font-bold uppercase tracking-wider text-sm shadow-lg shadow-purple-600/20 transition-all hover:-translate-y-0.5"
            >
              Enquire Now
            </Link>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
          className="lg:hidden p-2.5 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-xl transition-colors"
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-100 bg-white absolute top-full left-0 right-0 shadow-xl">
          <div className="px-6 py-6 space-y-2 max-h-[80vh] overflow-y-auto">
            {navLinks.map((link, idx) => (
              <div key={idx}>
                {link.submenu ? (
                  <div className="space-y-1">
                    <div className="px-4 py-3 text-sm font-bold text-slate-900 uppercase tracking-wide">
                      {link.name}
                    </div>
                    <div className="pl-4 border-l-2 border-slate-100 ml-4 space-y-1">
                      {link.submenu.map((sub, sIdx) => (
                        <Link
                          key={sIdx}
                          to={sub.path}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block px-4 py-2 text-sm font-medium text-slate-500 hover:text-purple-600"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-4 py-3 text-sm font-bold text-slate-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg uppercase tracking-wide"
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}
            
            <div className="h-px bg-slate-100 my-4" />
            
            <div className="space-y-3">
              {!isAuthenticated && (
                <Link 
                  to="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full text-center py-3 text-sm font-bold text-slate-600 border border-slate-200 rounded-xl uppercase tracking-wide"
                >
                  Login
                </Link>
              )}
              <Link 
                to="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full text-center py-3 bg-purple-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-purple-600/20 uppercase tracking-wide"
              >
                Enquire Now
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
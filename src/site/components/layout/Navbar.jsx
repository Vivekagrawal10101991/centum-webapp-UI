import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
// Import the logo image
import logo from "../../../assets/logo.png";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Handle scroll effect for shadow/transparency
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { 
      name: "About Us", 
      path: "/about",
      submenu: [
        { name: "Vision & Mission", path: "/vision-mission" }, 
        { name: "Founders", path: "/founders" }, 
        { name: "Associations", path: "/associations" },
        { name: "AI Innovation", path: "/ai-innovation" }, 
      ]
    },
    { name: "Programs", path: "/courses" },
    { name: "Library", path: "/library" },
    { name: "Success Stories", path: "/student-success" },
    { 
      name: "Media", 
      path: "#", 
      submenu: [
        { name: "Blogs", path: "/blogs" },
        { name: "Explore Youtube", path: "https://www.youtube.com/@centumacademy", external: true }
      ]
    },
    { 
      name: "Contact", 
      path: "#", 
      submenu: [
        { name: "Course Enquiry", path: "/contact" },
        { name: "Career", path: "/careers" }
      ]
    }
  ];

  return (
    <nav 
      className={`sticky top-0 z-50 w-full transition-all duration-300 border-b ${
        scrolled 
          ? "bg-white/95 backdrop-blur-md border-slate-200 shadow-sm" 
          : "bg-white border-slate-100"
      }`}
    >
      {/* Height: Mobile h-20 (80px), Desktop h-24 (96px) */}
      <div className="max-w-7xl mx-auto px-6 h-20 md:h-24 flex items-center justify-between">
        
        {/* LOGO SECTION */}
        <Link to="/" className="flex items-center gap-3 group">
          <img 
            src={logo} 
            alt="Centum Academy Logo" 
            className="h-12 md:h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
          <div className="flex flex-col">
            {/* UPDATED: Changed to font-extrabold for maximum boldness */}
            <span className="text-lg md:text-xl font-extrabold text-[#27295c] leading-none tracking-tight font-display">
              CENTUM ACADEMY
            </span>
            <span className="text-[10px] md:text-xs font-semibold text-purple-600 uppercase mt-1 tracking-widest">
              Education with emotion
            </span>
          </div>
        </Link>

        {/* DESKTOP NAVIGATION */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link, idx) => (
            <div 
              key={idx} 
              className="relative" 
              onMouseEnter={() => setActiveDropdown(idx)} 
              onMouseLeave={() => setActiveDropdown(null)}
            >
              {/* Main Link */}
              <Link 
                to={link.path} 
                className={`px-4 py-2 text-[15px] font-medium transition-colors duration-200 flex items-center gap-1 ${
                  activeDropdown === idx ? "text-purple-600" : "text-slate-700 hover:text-purple-600"
                }`}
                onClick={(e) => {
                  if (link.submenu && link.path === '#') e.preventDefault();
                }}
              >
                {link.name}
                {link.submenu && (
                  <ChevronDown 
                    className={`h-4 w-4 transition-transform duration-200 ${
                      activeDropdown === idx ? "rotate-180 text-purple-600" : "text-slate-400"
                    }`} 
                  />
                )}
              </Link>
              
              {/* Dropdown Menu */}
              {link.submenu && (
                <div 
                  className={`absolute top-full left-0 pt-2 w-60 z-50 transition-all duration-200 origin-top-left ${
                    activeDropdown === idx 
                      ? "opacity-100 translate-y-0 visible" 
                      : "opacity-0 translate-y-2 invisible"
                  }`}
                >
                  <div className="bg-white rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-slate-100 ring-1 ring-slate-900/5 p-2 overflow-hidden">
                    {link.submenu.map((sub, sIdx) => (
                      sub.external ? (
                        <a 
                          key={sIdx}
                          href={sub.path}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block px-4 py-2.5 text-sm font-medium text-slate-600 rounded-lg hover:bg-purple-50 hover:text-purple-700 transition-colors"
                        >
                          {sub.name}
                        </a>
                      ) : (
                        <Link 
                          key={sIdx} 
                          to={sub.path} 
                          className="block px-4 py-2.5 text-sm font-medium text-slate-600 rounded-lg hover:bg-purple-50 hover:text-purple-700 transition-colors"
                        >
                          {sub.name}
                        </Link>
                      )
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
          
          {/* Action Buttons */}
          <div className="flex items-center gap-4 ml-6 pl-6 border-l border-slate-200 h-8">
            <Link 
              to="/contact" 
              className="bg-slate-900 hover:bg-purple-600 text-white px-6 py-2.5 rounded-lg font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
            >
              Enquire Now
            </Link>
          </div>
        </div>

        {/* MOBILE MENU TOGGLE */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
          className="lg:hidden p-2 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-lg transition-colors border border-slate-100"
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* MOBILE DRAWER */}
      <div 
        className={`lg:hidden fixed inset-0 z-40 bg-white/95 backdrop-blur-xl transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ top: '80px', height: 'calc(100vh - 80px)' }}
      >
        <div className="flex flex-col h-full overflow-y-auto pb-20">
          <div className="px-6 py-8 space-y-6">
            {navLinks.map((link, idx) => (
              <div key={idx} className="border-b border-slate-100 last:border-0 pb-4 last:pb-0">
                {link.submenu ? (
                  <div className="space-y-3">
                    {/* Mobile Parent Link */}
                    {link.path !== '#' ? (
                      <Link
                        to={link.path}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center justify-between text-base font-bold text-slate-900"
                      >
                        {link.name}
                      </Link>
                    ) : (
                      <div className="text-base font-bold text-slate-900">
                        {link.name}
                      </div>
                    )}
                    
                    {/* Mobile Submenu */}
                    <div className="pl-4 space-y-3 border-l-2 border-purple-100 ml-1">
                      {link.submenu.map((sub, sIdx) => (
                        sub.external ? (
                          <a
                            key={sIdx}
                            href={sub.path}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="block text-sm font-medium text-slate-500 hover:text-purple-600"
                          >
                            {sub.name}
                          </a>
                        ) : (
                          <Link
                            key={sIdx}
                            to={sub.path}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="block text-sm font-medium text-slate-500 hover:text-purple-600"
                          >
                            {sub.name}
                          </Link>
                        )
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-base font-bold text-slate-900 hover:text-purple-600"
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}
            
            <div className="pt-6 space-y-3">
              <Link 
                to="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full text-center py-3.5 bg-slate-900 text-white rounded-xl text-sm font-bold shadow-lg shadow-slate-900/20 active:scale-95 transition-transform"
              >
                Enquire Now
              </Link>
              {!isAuthenticated && (
                <Link 
                  to="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full text-center py-3.5 text-slate-600 font-bold text-sm bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors"
                >
                  Admin Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
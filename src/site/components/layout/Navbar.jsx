import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import logo from "../../../assets/logo.png";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

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
        // Removed Associations link from here
        { name: "AI Innovation", path: "/ai-innovation" }, 
      ]
    },
    { 
      name: "Programs", 
      path: "/program",
      submenu: [
        { name: "IIT JEE", path: "/program/iit-jee-coaching-bangalore" }, 
        { name: "NEET", path: "/program/neet-coaching-bangalore" }, 
        { name: "Foundation", path: "/program/foundation-coaching-bangalore" }
      ]
    },
    { name: "Library", path: "/library" },
    { name: "Announcements", path: "/announcements" },
    { name: "Success Stories", path: "/student-success" },
    { 
      name: "Media", 
      path: "#", 
      submenu: [
        { name: "Blogs", path: "/blog" },
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
      <div className="max-w-[1400px] mx-auto px-4 lg:px-6 h-20 md:h-24 flex items-center justify-between">
        
        {/* LOGO SECTION */}
        <Link to="/" className="flex items-center gap-2 lg:gap-3 group shrink-0">
          <img 
            src={logo} 
            alt="Centum Academy Logo" 
            className="h-10 md:h-14 lg:h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
          <div className="flex flex-col">
            <span className="text-base md:text-lg lg:text-xl font-extrabold text-[#27295c] leading-none tracking-tight font-display whitespace-nowrap">
              CENTUM ACADEMY
            </span>
            <span className="text-[9px] md:text-[10px] lg:text-xs font-semibold text-indigo-600 uppercase mt-1 tracking-widest whitespace-nowrap">
              Education with emotion
            </span>
          </div>
        </Link>

        {/* DESKTOP NAVIGATION */}
        <div className="hidden lg:flex items-center gap-0.5 xl:gap-1">
          {navLinks.map((link, idx) => (
            <div 
              key={idx} 
              className="relative" 
              onMouseEnter={() => setActiveDropdown(idx)} 
              onMouseLeave={() => setActiveDropdown(null)}
            >
              {/* Main Link */}
              <div className="relative group/main">
                <Link 
                  to={link.path} 
                  className={`px-2 lg:px-2.5 xl:px-3 py-2 text-[13px] xl:text-[14px] font-semibold transition-colors duration-200 flex items-center gap-1 whitespace-nowrap ${
                    activeDropdown === idx ? "text-indigo-600" : "text-slate-700 hover:text-indigo-600"
                  }`}
                  onClick={(e) => {
                    // Prevent default only if the path is literally '#'
                    if (link.submenu && link.path === '#') e.preventDefault();
                  }}
                >
                  {link.name}
                  {link.submenu && (
                    <ChevronDown 
                      className={`h-3.5 w-3.5 transition-transform duration-200 ${
                        activeDropdown === idx ? "rotate-180 text-indigo-600" : "text-slate-400"
                      }`} 
                    />
                  )}
                </Link>
              </div>
              
              {/* Dropdown Menu */}
              {link.submenu && (
                <div 
                  className={`absolute top-full left-0 pt-2 w-56 z-50 transition-all duration-200 origin-top-left ${
                    activeDropdown === idx 
                      ? "opacity-100 translate-y-0 visible" 
                      : "opacity-0 translate-y-2 invisible"
                  }`}
                >
                  <div className="bg-white rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-slate-100 ring-1 ring-slate-900/5 p-2 overflow-hidden">
                    {link.submenu.map((sub, sIdx) => (
                      <div key={sIdx}>
                        {sub.external ? (
                          <a 
                            href={sub.path}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block px-4 py-2.5 text-[13px] font-medium text-slate-600 rounded-lg hover:bg-indigo-50 hover:text-indigo-700 transition-colors whitespace-nowrap"
                          >
                            {sub.name}
                          </a>
                        ) : (
                          <Link 
                            to={sub.path} 
                            className="block px-4 py-2.5 text-[13px] font-medium text-slate-600 rounded-lg hover:bg-indigo-50 hover:text-indigo-700 transition-colors whitespace-nowrap"
                          >
                            {sub.name}
                          </Link>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
          
          {/* Action Buttons */}
          <div className="flex items-center ml-2 xl:ml-4 pl-2 xl:pl-4 border-l border-slate-200 h-8 shrink-0">
            <Link 
              to="/contact" 
              className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 xl:px-5 py-2 rounded-lg font-bold text-[13px] shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 whitespace-nowrap"
            >
              Enquire Now
            </Link>
          </div>
        </div>

        {/* MOBILE MENU TOGGLE */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
          className="lg:hidden p-2 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-lg transition-colors border border-slate-100 shrink-0"
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
                    <div className="pl-4 space-y-3 border-l-2 border-indigo-100 ml-1">
                      {link.submenu.map((sub, sIdx) => (
                        <div key={sIdx}>
                          {sub.external ? (
                            <a
                              href={sub.path}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={() => setIsMobileMenuOpen(false)}
                              className="block text-sm font-medium text-slate-500 hover:text-indigo-600"
                            >
                              {sub.name}
                            </a>
                          ) : (
                            <Link
                              to={sub.path}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className="block text-sm font-medium text-slate-500 hover:text-indigo-600"
                            >
                              {sub.name}
                            </Link>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-base font-bold text-slate-900 hover:text-indigo-600"
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
                className="block w-full text-center py-3.5 bg-yellow-600 hover:bg-yellow-700 text-white rounded-xl text-sm font-bold shadow-lg shadow-yellow-600/20 active:scale-95 transition-transform"
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
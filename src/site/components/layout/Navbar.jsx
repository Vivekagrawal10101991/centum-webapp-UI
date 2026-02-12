import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  User,
  ChevronDown,
  Home,
  Info,
  BookOpen,
  Trophy,
  Video,
  Mail,
  Megaphone, 
  LogOut,
  LayoutDashboard
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import logo from "../../../assets/logo.png";

/**
 * Premium Navbar Component
 * UPDATED: 
 * - Tagline font size increased.
 */
const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const timeoutRef = useRef(null);

  const handleLogout = () => {
    logout(); 
    setIsUserMenuOpen(false);
    navigate('/'); 
  };

  const handleDashboard = () => {
    navigate('/dashboard');
    setIsUserMenuOpen(false);
  };

  const navLinks = [
    { name: "Home", path: "/", icon: Home, dropdown: null },
    {
      name: "About",
      path: "/about",
      icon: Info,
      dropdown: [
        { name: "About Us", path: "/about", icon: Info },
        { name: "Contributions", path: "/contributions", icon: Trophy },
      ],
    },
    { name: "Courses", path: "/courses", icon: BookOpen, dropdown: null },
    { name: "Announcements", path: "/announcements", icon: Megaphone, dropdown: null },
    {
      name: "Success Stories",
      path: "/success-stories",
      icon: Trophy,
      dropdown: [
        { name: "Achievers", path: "/achievers", icon: Trophy },
        { name: "Student Success", path: "/student-success", icon: Trophy },
      ],
    },
    {
      name: "Media",
      path: "/media",
      icon: Video,
      dropdown: [
        { name: "Blogs", path: "/blogs", icon: BookOpen },
        { name: "Explore Videos", path: "/videos", icon: Video },
      ],
    },
    { name: "Contact", path: "/contact", icon: Mail, dropdown: null },
  ];

  const handleMouseEnter = (index) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(index);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setActiveDropdown(null), 150);
  };

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 transition-all duration-300 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          
          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-4 group">
            <div className="relative overflow-hidden rounded-lg">
              <img
                src={logo}
                alt="Centum Academy"
                className="h-10 w-10 md:h-12 md:w-12 object-cover transition-transform duration-500"
              />
            </div>
            <div className="flex flex-col items-center justify-center">
              {/* Main Title: Playfair Display, Uppercase, Larger Size */}
              <span 
                className="text-xl md:text-2xl font-bold leading-none tracking-wide uppercase"
                style={{ 
                    color: '#2a2275', 
                    fontFamily: "'Playfair Display', serif" 
                }}
              >
                CENTUM ACADEMY
              </span>
              {/* Tagline: Playfair Display, Italic, Wide Tracking. Size increased from text-[10px] md:text-xs */}
              <span 
                className="text-xs md:text-sm font-medium italic tracking-[0.1em] mt-1 opacity-90"
                style={{ 
                    color: '#2a2275', 
                    fontFamily: "'Playfair Display', serif" 
                }}
              >
                Education with emotion
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link, index) => {
              const Icon = link.icon;
              const isActive = activeDropdown === index;

              return (
                <div
                  key={link.path}
                  className="relative group/item"
                  onMouseEnter={() => link.dropdown && handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                >
                  {link.dropdown ? (
                    <>
                      <button 
                        className={`flex items-center gap-1.5 px-3 py-2 text-sm font-semibold transition-all duration-200 rounded-md
                          ${isActive ? 'text-[#2a2275] bg-blue-50/50' : 'text-gray-600 hover:text-[#2a2275] hover:bg-gray-50'}`}
                      >
                        <span>{link.name}</span>
                        <ChevronDown 
                          className={`w-3.5 h-3.5 transition-transform duration-300 ${isActive ? "rotate-180" : ""}`} 
                        />
                      </button>

                      {isActive && (
                        <div className="absolute top-full left-0 pt-2 w-60 z-50" onMouseEnter={() => clearTimeout(timeoutRef.current)} onMouseLeave={handleMouseLeave}>
                          <div className="bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden ring-1 ring-black/5">
                            {link.dropdown.map((item) => (
                              <Link
                                key={item.path}
                                to={item.path}
                                className="flex items-center gap-3 px-4 py-3 text-sm text-gray-600 hover:text-[#2a2275] hover:bg-gray-50 transition-colors border-l-2 border-transparent hover:border-[#2a2275]"
                                onClick={() => setActiveDropdown(null)}
                              >
                                <item.icon className="w-4 h-4 opacity-70" />
                                <span className="font-medium">{item.name}</span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      to={link.path}
                      className="flex items-center gap-1.5 px-3 py-2 text-sm font-semibold text-gray-600 hover:text-[#2a2275] hover:bg-gray-50 transition-all duration-200 rounded-md"
                    >
                      <span>{link.name}</span>
                    </Link>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Section: Auth & Mobile Toggle */}
          <div className="flex items-center gap-4">
            
            <div className="hidden lg:flex items-center gap-3">
              {isAuthenticated && user ? (
                <div className="relative">
                  <button onClick={() => setIsUserMenuOpen(!isUserMenuOpen)} className="group p-0.5 rounded-full ring-2 ring-transparent hover:ring-[#2a2275]/20 transition-all">
                    <div 
                      className="w-9 h-9 rounded-full text-white flex items-center justify-center shadow-md transition-transform group-hover:scale-105"
                      style={{ backgroundColor: '#2a2275' }}
                    >
                      <User className="w-5 h-5" />
                    </div>
                  </button>

                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-1 z-50 ring-1 ring-black/5">
                      <div className="px-4 py-3 border-b border-gray-50">
                         <p className="text-sm font-bold text-gray-900 truncate">{user.name || "User"}</p>
                         <p className="text-xs text-gray-500 truncate">{user.email}</p>
                      </div>
                      <button onClick={handleDashboard} className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2.5 transition-colors">
                        <LayoutDashboard className="w-4 h-4" /> Dashboard
                      </button>
                      <button onClick={handleLogout} className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2.5 transition-colors">
                        <LogOut className="w-4 h-4" /> Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link 
                  to="/login"
                  className="px-6 py-2.5 text-white text-sm font-bold tracking-wide rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                  style={{ backgroundColor: '#2a2275' }}
                >
                  Login
                </Link>
              )}
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-gray-600 hover:text-[#2a2275] hover:bg-gray-100 rounded-md transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-100 bg-white absolute top-full left-0 right-0 shadow-xl z-40">
            <div className="flex flex-col p-4 space-y-1">
              {navLinks.map((link) => (
                <div key={link.path}>
                  {link.dropdown ? (
                    <div>
                      <button
                        onClick={() => setActiveDropdown(activeDropdown === link.name ? null : link.name)}
                        className="w-full flex items-center justify-between px-4 py-3 text-gray-700 hover:text-[#2a2275] hover:bg-gray-50 font-medium rounded-lg transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <link.icon className="w-5 h-5 opacity-70" />
                          <span>{link.name}</span>
                        </div>
                        <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === link.name ? "rotate-180" : ""}`} />
                      </button>
                      {activeDropdown === link.name && (
                        <div className="ml-4 mt-1 border-l-2 border-gray-100 pl-4 space-y-1">
                          {link.dropdown.map((item) => (
                            <Link key={item.path} to={item.path} onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-gray-600 hover:text-[#2a2275] text-sm rounded-md">
                              <span>{item.name}</span>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link to={link.path} onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:text-[#2a2275] hover:bg-gray-50 font-medium rounded-lg transition-colors">
                      <link.icon className="w-5 h-5 opacity-70" />
                      <span>{link.name}</span>
                    </Link>
                  )}
                </div>
              ))}
              
              <div className="pt-4 mt-2 border-t border-gray-100">
                {!isAuthenticated && (
                  <Link
                    to="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block w-full text-center px-4 py-3 text-white rounded-lg shadow-md font-bold text-sm"
                    style={{ backgroundColor: '#2a2275' }}
                  >
                    Login
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
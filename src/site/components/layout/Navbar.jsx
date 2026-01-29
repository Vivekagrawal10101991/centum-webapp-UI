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
 * Navbar Component
 * UPDATED: Logout now redirects to Home Page ('/') instead of Login page.
 */
const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  
  // Get Auth State
  const { isAuthenticated, user, logout } = useAuth();
  
  const navigate = useNavigate();
  const timeoutRef = useRef(null);

  // Handlers
  const handleLogout = () => {
    logout(); 
    setIsUserMenuOpen(false);
    navigate('/'); // CHANGED: Redirect to Home Page after logout
  };

  const handleDashboard = () => {
    navigate('/dashboard');
    setIsUserMenuOpen(false);
  };

  // Navigation structure
  const navLinks = [
    {
      name: "Home",
      path: "/",
      icon: Home,
      dropdown: null,
    },
    {
      name: "About",
      path: "/about",
      icon: Info,
      dropdown: [
        { name: "About Us", path: "/about", icon: Info },
        { name: "Contributions", path: "/contributions", icon: Trophy },
      ],
    },
    {
      name: "Courses",
      path: "/courses", 
      icon: BookOpen,
      dropdown: null,
    },
    {
      name: "Announcements",
      path: "/announcements",
      icon: Megaphone,
      dropdown: null,
    },
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
    {
      name: "Contact",
      path: "/contact",
      icon: Mail,
      dropdown: null,
    },
  ];

  const handleMouseEnter = (index) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveDropdown(index);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  const handleDropdownEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  return (
    <nav className="bg-gradient-to-r from-white via-blue-50 to-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-md px-6 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-4 group">
              <div className="relative flex-shrink-0">
                <img
                  src={logo}
                  alt="Centum Academy Logo"
                  className="h-14 w-14 md:h-16 md:w-16 rounded-xl object-cover shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-300"
                />
              </div>

              <div className="flex flex-col items-center">
                <span className="text-xl md:text-2xl lg:text-3xl font-bold text-primary leading-tight group-hover:text-primary-600 transition-colors duration-300">
                  Centum Academy
                </span>
                <span className="text-xs md:text-sm text-primary-600 font-medium italic tracking-wider">
                  Education with Emotion
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link, index) => {
                const Icon = link.icon;
                return (
                  <div
                    key={link.path}
                    className="relative"
                    onMouseEnter={() =>
                      link.dropdown && handleMouseEnter(index)
                    }
                    onMouseLeave={handleMouseLeave}
                  >
                    {link.dropdown ? (
                      <>
                        <button className="flex items-center space-x-2 px-4 py-2.5 text-gray-700 hover:text-primary font-medium transition-all duration-200 rounded-xl hover:bg-gradient-to-r hover:from-primary-50 hover:to-blue-50 group">
                          <Icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                          <span>{link.name}</span>
                          <ChevronDown
                            className={`w-4 h-4 transition-transform duration-300 ${
                              activeDropdown === index ? "rotate-180" : ""
                            }`}
                          />
                        </button>

                        {/* Dropdown Menu */}
                        {activeDropdown === index && (
                          <div
                            className="absolute top-full left-0 mt-1 w-64 z-50"
                            onMouseEnter={handleDropdownEnter}
                            onMouseLeave={handleMouseLeave}
                          >
                            <div className="h-2 w-full" />
                            <div className="bg-white/95 backdrop-blur-md rounded-xl shadow-2xl border border-primary-100 py-2 animate-fade-in overflow-hidden">
                              <div className="absolute inset-0 bg-gradient-to-br from-primary-50/50 to-transparent pointer-events-none" />
                              {link.dropdown.map((item) => {
                                const ItemIcon = item.icon;
                                return (
                                  <Link
                                    key={item.path}
                                    to={item.path}
                                    className="relative flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-primary-100 hover:to-blue-100 hover:text-primary transition-all duration-200 font-medium group"
                                    onClick={() => setActiveDropdown(null)}
                                  >
                                    <ItemIcon className="w-5 h-5 text-primary-400 group-hover:text-primary group-hover:scale-110 transition-all" />
                                    <span className="flex-1">{item.name}</span>
                                    <ChevronDown className="w-4 h-4 -rotate-90 opacity-0 group-hover:opacity-100 transition-opacity" />
                                  </Link>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </>
                    ) : (
                      <Link
                        to={link.path}
                        className="flex items-center space-x-2 px-4 py-2.5 text-gray-700 hover:text-primary font-medium transition-all duration-200 rounded-xl hover:bg-gradient-to-r hover:from-primary-50 hover:to-blue-50 group"
                      >
                        <Icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        <span>{link.name}</span>
                      </Link>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Auth Buttons / User Menu */}
            <div className="hidden lg:flex items-center space-x-3">
              {isAuthenticated && user ? (
                // LOGGED IN: User Dropdown
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="relative group p-1 rounded-full hover:bg-gray-100 transition-colors focus:outline-none"
                    title="User Menu"
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-600 text-white flex items-center justify-center shadow-md group-hover:shadow-lg group-hover:scale-105 transition-all duration-300">
                      <User className="w-6 h-6" />
                    </div>
                  </button>

                  {/* User Dropdown Menu */}
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl py-2 border border-gray-100 z-50">
                      <div className="px-4 py-2 border-b border-gray-100">
                         <p className="text-sm font-bold text-gray-800 truncate">{user.name || "User"}</p>
                         <p className="text-xs text-gray-500 truncate">{user.email}</p>
                      </div>
                      <button 
                        onClick={handleDashboard}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary flex items-center gap-2"
                      >
                        <LayoutDashboard className="w-4 h-4" /> Dashboard
                      </button>
                      <button 
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                      >
                        <LogOut className="w-4 h-4" /> Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                // NOT LOGGED IN: Login Button Only
                <div className="flex items-center gap-3">
                  <Link 
                    to="/login"
                    className="px-6 py-2.5 bg-primary text-white font-bold rounded-xl shadow-md hover:bg-primary-700 hover:shadow-lg hover:scale-105 transition-all"
                  >
                    Login
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-gray-700 hover:text-primary p-2 rounded-lg hover:bg-primary-50 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden pt-4 mt-4 border-t border-gray-100">
              <div className="flex flex-col space-y-2">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <div key={link.path}>
                      {link.dropdown ? (
                        <div>
                          <button
                            onClick={() =>
                              setActiveDropdown(
                                activeDropdown === link.name ? null : link.name
                              )
                            }
                            className="w-full flex items-center justify-between px-4 py-3 text-gray-700 hover:text-primary hover:bg-gradient-to-r hover:from-primary-50 hover:to-blue-50 font-medium transition-colors rounded-xl"
                          >
                            <div className="flex items-center space-x-2">
                              <Icon className="w-5 h-5" />
                              <span>{link.name}</span>
                            </div>
                            <ChevronDown
                              className={`w-4 h-4 transition-transform duration-200 ${
                                activeDropdown === link.name ? "rotate-180" : ""
                              }`}
                            />
                          </button>
                          {activeDropdown === link.name && (
                            <div className="ml-4 mt-1 space-y-1 bg-gradient-to-r from-primary-50/50 to-blue-50/50 rounded-lg p-2">
                              {link.dropdown.map((item) => {
                                const ItemIcon = item.icon;
                                return (
                                  <Link
                                    key={item.path}
                                    to={item.path}
                                    onClick={() => {
                                      setIsMobileMenuOpen(false);
                                      setActiveDropdown(null);
                                    }}
                                    className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-primary hover:bg-white/80 transition-colors rounded-lg"
                                  >
                                    <ItemIcon className="w-4 h-4" />
                                    <span>{item.name}</span>
                                  </Link>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      ) : (
                        <Link
                          to={link.path}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="flex items-center space-x-2 px-4 py-3 text-gray-700 hover:text-primary hover:bg-gradient-to-r hover:from-primary-50 hover:to-blue-50 font-medium transition-colors rounded-xl"
                        >
                          <Icon className="w-5 h-5" />
                          <span>{link.name}</span>
                        </Link>
                      )}
                    </div>
                  );
                })}

                {/* Mobile Auth Buttons */}
                <div className="pt-4 border-t border-gray-100 space-y-2">
                  {isAuthenticated && user ? (
                    <>
                      <button
                        onClick={handleDashboard}
                        className="w-full flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-primary-50 to-blue-50 rounded-xl hover:from-primary-100 hover:to-blue-100 transition-all"
                      >
                        <LayoutDashboard className="w-5 h-5 text-primary" />
                        <span className="font-medium text-gray-700">Dashboard</span>
                      </button>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-xl transition-all"
                      >
                        <LogOut className="w-5 h-5" />
                        <span className="font-medium">Logout</span>
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block w-full text-center px-4 py-2 bg-primary text-white rounded-xl shadow-md hover:bg-primary-600 transition-colors font-medium"
                      >
                        Login
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
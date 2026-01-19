import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  User,
  LogOut,
  ChevronDown,
  Home,
  Info,
  BookOpen,
  Trophy,
  Video,
  Mail,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import Button from "../../../components/common/Button";
import logo from "../../../assets/logo.png";

/**
 * Navbar Component
 * Sticky header with logo, navigation links with dropdowns, and auth buttons
 */
const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const timeoutRef = useRef(null);

  // Navigation structure with dropdowns and icons
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
      dropdown: [
        { name: "JEE Course", path: "/courses/jee", icon: BookOpen },
        { name: "NEET Course", path: "/courses/neet", icon: BookOpen },
        {
          name: "Foundation Course",
          path: "/courses/foundation",
          icon: BookOpen,
        },
      ],
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

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsMobileMenuOpen(false);
  };

  const handleMouseEnter = (index) => {
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveDropdown(index);
  };

  const handleMouseLeave = () => {
    // Add a small delay before closing
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  const handleDropdownEnter = () => {
    // Cancel the close timeout when entering dropdown
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  return (
    <nav className="bg-gradient-to-r from-white via-blue-50 to-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-md px-6 py-3">
          <div className="flex items-center justify-between">
            {/* Logo with Centered Slogan */}
            <Link to="/" className="flex items-center space-x-4 group">
              {/* Logo Image */}
              <div className="relative flex-shrink-0">
                <img
                  src={logo}
                  alt="Centum Academy Logo"
                  className="h-14 w-14 md:h-16 md:w-16 rounded-xl object-cover shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-300"
                />
              </div>

              {/* Brand Text with Centered Slogan */}
              <div className="flex flex-col items-center">
                <span className="text-xl md:text-2xl lg:text-3xl font-bold text-primary leading-tight group-hover:text-primary-600 transition-colors duration-300">
                  Centum Academy
                </span>
                <span className="text-xs md:text-sm text-primary-600 font-medium italic tracking-wider">
                  Education with Emotion
                </span>
              </div>
            </Link>

            {/* Desktop Navigation with Dropdowns */}
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

                        {/* Dropdown Menu with Translucent Effect */}
                        {activeDropdown === index && (
                          <div
                            className="absolute top-full left-0 mt-1 w-64 z-50"
                            onMouseEnter={handleDropdownEnter}
                            onMouseLeave={handleMouseLeave}
                          >
                            {/* Invisible bridge to prevent dropdown from closing */}
                            <div className="h-2 w-full" />

                            <div className="bg-white/95 backdrop-blur-md rounded-xl shadow-2xl border border-primary-100 py-2 animate-fade-in overflow-hidden">
                              {/* Gradient overlay for extra depth */}
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

            {/* Auth Buttons - Desktop */}
            <div className="hidden lg:flex items-center space-x-3">
              {isAuthenticated ? (
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => navigate('/dashboard')}
                    className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-primary-50 to-blue-50 rounded-xl backdrop-blur-sm hover:from-primary-100 hover:to-blue-100 transition-all cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary-600 text-white flex items-center justify-center shadow-md">
                      <User className="w-5 h-5" />
                    </div>
                    <span className="font-medium text-gray-700">
                      {user?.name || "User"}
                    </span>
                  </button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleLogout}
                    className="flex items-center rounded-xl hover:bg-red-50 hover:text-red-600 hover:border-red-300 transition-all"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                </div>
              ) : (
                <>
                  <Link to="/login">
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-xl hover:scale-105 transition-transform"
                    >
                      Login
                    </Button>
                  </Link>
                  <Link to="/signup">
                    <Button
                      variant="primary"
                      size="sm"
                      className="rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition-all"
                    >
                      Sign Up
                    </Button>
                  </Link>
                </>
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
                  {isAuthenticated ? (
                    <>
                      <button
                        onClick={() => {
                          navigate('/dashboard');
                          setIsMobileMenuOpen(false);
                        }}
                        className="w-full flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-primary-50 to-blue-50 rounded-xl hover:from-primary-100 hover:to-blue-100 transition-all"
                      >
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary-600 text-white flex items-center justify-center">
                          <User className="w-5 h-5" />
                        </div>
                        <span className="font-medium text-gray-700">
                          {user?.name || "User"}
                        </span>
                      </button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleLogout}
                        className="w-full rounded-xl"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                      </Button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full rounded-xl"
                        >
                          Login
                        </Button>
                      </Link>
                      <Link
                        to="/signup"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Button
                          variant="primary"
                          size="sm"
                          className="w-full rounded-xl"
                        >
                          Sign Up
                        </Button>
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

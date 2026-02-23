// src/admin/components/layout/DashboardNavbar.jsx
import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Menu, 
  Home, 
  UserCircle, 
  LogIn, 
  Clock,
  Loader2,
  LogOut
} from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';
import { ROLE_NAMES, ROLES } from '../../../utils/roles';
import logo from '../../../assets/logo.png';
import { attendanceService } from '../../services/attendanceService';

const DashboardNavbar = ({ onToggleSidebar }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [isLoadingAttendance, setIsLoadingAttendance] = useState(false);
  
  // Timer States
  const [checkInEpochMillis, setCheckInEpochMillis] = useState(null);
  const [timerDisplay, setTimerDisplay] = useState("00:00:00");
  
  const userMenuRef = useRef(null);

  const showAttendance = user?.role !== ROLES.STUDENT && user?.role !== ROLES.PARENT;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch initial attendance status on mount
  useEffect(() => {
    const fetchInitialStatus = async () => {
      if (!showAttendance) return;

      try {
        const res = await attendanceService.getHistory();
        if (res.success && res.data && res.data.length > 0) {
          const latestRecord = res.data[0];
          const today = new Date().toLocaleDateString('en-CA'); 
          
          if (latestRecord.date === today && latestRecord.workdayStatus === 'In-Progress') {
            setIsCheckedIn(true);
            setCheckInEpochMillis(latestRecord.checkInEpochMillis);
          }
        }
      } catch (error) {
        console.error("Failed to fetch initial attendance status", error);
      }
    };

    if (user) {
      fetchInitialStatus();
    }
  }, [user, showAttendance]);

  // Real-Time Timer Logic
  useEffect(() => {
    let interval;
    if (isCheckedIn && checkInEpochMillis) {
      interval = setInterval(() => {
        const now = Date.now();
        const diffInSeconds = Math.floor((now - checkInEpochMillis) / 1000);
        
        if (diffInSeconds >= 0) {
          const h = String(Math.floor(diffInSeconds / 3600)).padStart(2, '0');
          const m = String(Math.floor((diffInSeconds % 3600) / 60)).padStart(2, '0');
          const s = String(diffInSeconds % 60).padStart(2, '0');
          setTimerDisplay(`${h}:${m}:${s}`);
        }
      }, 1000);
    } else {
      setTimerDisplay("00:00:00");
    }
    
    return () => clearInterval(interval);
  }, [isCheckedIn, checkInEpochMillis]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Foolproof function to get exact Neighborhood/Street (e.g., HSR Layout, Bengaluru)
  const fetchAddress = async (lat, lng) => {
    // 1. Try OpenStreetMap Nominatim FIRST with ALL possible detailed keys
    try {
      const osmResponse = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}&zoom=18`);
      if (osmResponse.ok) {
        const osmData = await osmResponse.json();
        
        if (osmData && osmData.address) {
          // Extract every possible level of detail
          const { 
            building, amenity, road, residential, neighbourhood, 
            suburb, village, town, city_district, city, state 
          } = osmData.address;
          
          const osmParts = [building, amenity, road, residential, neighbourhood, suburb, village, town, city_district, city, state].filter(Boolean);
          const uniqueOsmParts = [...new Set(osmParts)];
          
          if (uniqueOsmParts.length > 0) {
            return uniqueOsmParts.join(', ');
          }
        }
        
        // Backup if the address object is missing but display_name exists
        if (osmData && osmData.display_name) {
          const parts = osmData.display_name.split(',').map(p => p.trim());
          const filtered = parts.filter(p => !/^\d+$/.test(p) && p !== 'India');
          return filtered.slice(0, 4).join(', ');
        }
      }
    } catch (osmError) {
      console.warn("OSM Geocoding failed, trying fallback...", osmError);
    }

    // 2. Try Photon Komoot API (Highly reliable backup OSM API)
    try {
      const photonRes = await fetch(`https://photon.komoot.io/reverse?lon=${lng}&lat=${lat}`);
      if (photonRes.ok) {
        const photonData = await photonRes.json();
        if (photonData.features && photonData.features.length > 0) {
          const { name, street, district, locality, city, state } = photonData.features[0].properties;
          const photonParts = [name, street, district, locality, city, state].filter(Boolean);
          const uniquePhotonParts = [...new Set(photonParts)];
          if (uniquePhotonParts.length > 0) {
            return uniquePhotonParts.join(', ');
          }
        }
      }
    } catch (photonError) {
      console.warn("Photon Geocoding failed", photonError);
    }

    // 3. Fallback to BigDataCloud API
    try {
      const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`);
      if (response.ok) {
        const data = await response.json();
        const parts = [data.locality, data.city, data.principalSubdivision].filter(Boolean);
        const uniqueParts = [...new Set(parts)]; 
        
        if (uniqueParts.length > 0) {
          return uniqueParts.join(', ');
        }
      }
    } catch (error) {
      console.warn("BigDataCloud Geocoding failed", error);
    }

    // 4. Final Fallback (If no internet or APIs blocked)
    return `Lat: ${lat.toFixed(4)}, Lng: ${lng.toFixed(4)}`; 
  };

  const processAttendanceApi = async (payload) => {
    try {
      if (isCheckedIn) {
        const res = await attendanceService.checkOut(payload);
        if (res.success) {
          toast.success("Checked out successfully!");
          setIsCheckedIn(false);
          setCheckInEpochMillis(null);
        } else {
          toast.error(res.message || "Failed to check out.");
        }
      } else {
        const res = await attendanceService.checkIn(payload);
        if (res.success) {
          toast.success("Checked in successfully!");
          setIsCheckedIn(true);
          setCheckInEpochMillis(res.data.checkInEpochMillis);
        } else {
          toast.error(res.message || "Failed to check in.");
        }
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message || "Attendance request failed.");
    } finally {
      setIsLoadingAttendance(false);
    }
  };

  const handleAttendanceAction = async () => {
    setIsLoadingAttendance(true);

    if (!navigator.geolocation) {
      await processAttendanceApi({ latitude: null, longitude: null, address: "Location not supported by browser" });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const address = await fetchAddress(latitude, longitude);
        await processAttendanceApi({ latitude, longitude, address });
      },
      async (error) => {
        toast.error("Location denied. Proceeding with time-tracking only.");
        await processAttendanceApi({ latitude: null, longitude: null, address: "Location access denied by user" });
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  return (
    <nav className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all duration-300">
      <div className="px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-6">
            <button 
              onClick={onToggleSidebar} 
              className="lg:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>

            <Link to="/" className="flex items-center gap-3 group">
              <img 
                src={logo} 
                alt="Logo" 
                className="h-9 w-9 rounded-lg object-cover shadow-sm group-hover:scale-105 transition-all" 
              />
              <div className="flex flex-col">
                <span className="text-lg font-bold text-[#002B6B] tracking-tight leading-none uppercase">Centum Academy</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Education with Emotion</span>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            
            {/* --- VISIBLE DASHBOARD TIMER --- */}
            {showAttendance && (
              <div className={`hidden sm:flex items-center gap-3 px-4 py-2 border rounded-xl shadow-sm transition-colors ${isCheckedIn ? 'bg-emerald-50 border-emerald-200' : 'bg-slate-50 border-slate-200'}`}>
                <Clock className={`w-4 h-4 ${isCheckedIn ? 'text-emerald-500 animate-pulse' : 'text-slate-400'}`} />
                <span className={`font-mono font-bold tracking-wider ${isCheckedIn ? 'text-emerald-700' : 'text-slate-500'}`}>
                  {timerDisplay}
                </span>
              </div>
            )}

            {/* Visit Site Link */}
            <Link to="/" className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-slate-600 hover:bg-blue-50 hover:text-blue-700 transition-all">
              <Home className="w-4 h-4" />
              <span>Visit Site</span>
            </Link>

            {/* User Icon & Dropdown */}
            <div className="relative" ref={userMenuRef}>
              <button 
                onClick={() => setShowUserMenu(!showUserMenu)} 
                className="flex items-center justify-center w-10 h-10 rounded-full hover:ring-4 hover:ring-blue-50 transition-all border border-slate-200 shadow-sm overflow-hidden"
              >
                <div className="w-full h-full bg-gradient-to-tr from-[#002B6B] to-blue-500 text-white flex items-center justify-center font-bold">
                  {user?.name?.charAt(0) || 'U'}
                </div>
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-2xl border border-slate-200 py-2 animate-in fade-in zoom-in-95 origin-top-right overflow-hidden">
                  <div className="px-5 py-3 border-b border-slate-100 bg-slate-50/50">
                    <p className="text-sm font-bold text-slate-800">{user?.name}</p>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{ROLE_NAMES[user?.role]}</p>
                  </div>

                  <div className="p-2 space-y-1">
                    <Link 
                      to="/dashboard/settings" 
                      onClick={() => setShowUserMenu(false)}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-slate-700 rounded-xl hover:bg-slate-50 transition-colors"
                    >
                      <UserCircle className="w-4 h-4 text-blue-600" />
                      <span>My Profile</span>
                    </Link>

                    {/* Attendance Dropdown Button */}
                    {showAttendance && (
                      <>
                        <button 
                          onClick={handleAttendanceAction}
                          disabled={isLoadingAttendance}
                          className={`w-full flex items-center justify-between px-4 py-3 text-sm font-bold rounded-xl transition-all duration-300 ${
                            isLoadingAttendance ? 'opacity-70 cursor-not-allowed bg-slate-50 text-slate-500' :
                            isCheckedIn 
                            ? 'bg-rose-50 text-rose-600 hover:bg-rose-100' 
                            : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            {isLoadingAttendance ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : isCheckedIn ? (
                              <Clock className="w-4 h-4" />
                            ) : (
                              <LogIn className="w-4 h-4" />
                            )}
                            <span>
                              {isLoadingAttendance 
                                ? 'Processing...' 
                                : isCheckedIn ? 'Check Out' : 'Check In'}
                            </span>
                          </div>
                          {!isLoadingAttendance && (
                            <div className={`w-2 h-2 rounded-full animate-pulse ${isCheckedIn ? 'bg-rose-500' : 'bg-emerald-500'}`}></div>
                          )}
                        </button>

                        <div className="my-1 border-t border-slate-100"></div>
                      </>
                    )}

                    <button 
                      onClick={handleLogout} 
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-slate-500 rounded-xl hover:bg-slate-100 hover:text-rose-600 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default DashboardNavbar;
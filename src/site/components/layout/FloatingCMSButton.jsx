import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, Shield } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const FloatingCMSButton = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleClick = () => {
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  };

  return (
    <button
      onClick={handleClick}
      // Updated to dark yellow theme (yellow-600)
      className="fixed bottom-6 right-6 z-50 group flex items-center gap-2 bg-yellow-600 hover:bg-yellow-700 text-white px-5 py-3 rounded-full shadow-2xl hover:shadow-yellow-600/30 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 border border-yellow-700 hover:border-yellow-600"
      aria-label="CMS Login"
    >
      <div className="relative">
        <Shield className="h-5 w-5" />
        <div className="absolute -top-1 -right-1 h-2 w-2 bg-emerald-500 rounded-full animate-pulse" />
      </div>
      
      <span className="font-bold text-sm tracking-wide pr-1">
        CMS Login
      </span>
    </button>
  );
};

export default FloatingCMSButton;
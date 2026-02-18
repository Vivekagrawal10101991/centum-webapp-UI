import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, UserPlus, AlertCircle, ArrowLeft } from 'lucide-react';
import logo from "../../../assets/logo.png";

/**
 * LoginForm Component
 * Design: Matches the provided Figma/CMS Login style
 * Logic: Integrates with Site's react-hook-form architecture
 */
export const LoginForm = ({ 
  handleSubmit, 
  onSubmit, 
  register, 
  errors, 
  isSubmitting 
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1E3A8A] via-[#2563EB] to-[#0D9488] flex items-center justify-center p-4 md:p-6 font-sans">
      
      {/* Back to Website (Absolute Positioned for Site Navigation) */}
      <Link 
        to="/" 
        className="absolute top-6 left-6 text-white/80 hover:text-white flex items-center gap-2 text-sm font-medium transition-colors z-10"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Website
      </Link>

      <div className="w-full max-w-6xl">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden grid lg:grid-cols-2">
          
          {/* LEFT SIDE - BRANDING */}
          <div className="bg-gradient-to-br from-[#1E3A8A] to-[#0D9488] p-8 md:p-12 flex flex-col justify-center items-center text-white relative overflow-hidden">
            {/* Background Pattern Overlay */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            
            <div className="relative z-10 flex flex-col items-center">
              
              {/* LOGO SECTION: Solid White Circle Container to ensure visibility */}
              <div className="bg-white w-32 h-32 rounded-full flex items-center justify-center mb-6 shadow-2xl border-4 border-white/20">
                <img 
                  src={logo} 
                  alt="Centum Academy Logo" 
                  className="w-20 h-auto object-contain"
                />
              </div>

              <h1 className="text-3xl md:text-5xl font-bold text-center tracking-tight font-display drop-shadow-md">
                CENTUM ACADEMY
              </h1>
              <p className="text-lg md:text-xl text-center mt-3 text-blue-100 font-medium tracking-wide">
                Education with Emotion
              </p>
            </div>
          </div>

          {/* RIGHT SIDE - LOGIN FORM */}
          <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center">
            <div className="mb-6 md:mb-8">
              <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">Welcome Back</h3>
              <p className="text-slate-600 text-base">Please sign in to continue</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              
              {/* Email Field */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 ml-1">
                  Email Address
                </label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-[#7E3AF2] transition-colors" />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className={`w-full pl-12 pr-4 h-12 bg-slate-50 border rounded-xl outline-none transition-all duration-200 font-medium
                      ${errors.email 
                        ? 'border-red-300 focus:border-red-500 bg-red-50/50' 
                        : 'border-slate-200 focus:border-[#7E3AF2] focus:bg-white focus:shadow-lg focus:shadow-[#7E3AF2]/10'
                      }`}
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address"
                      }
                    })}
                  />
                </div>
                {errors.email && <span className="text-red-500 text-xs ml-1 font-medium">{errors.email.message}</span>}
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 ml-1">
                  Password
                </label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-[#7E3AF2] transition-colors" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    className={`w-full pl-12 pr-12 h-12 bg-slate-50 border rounded-xl outline-none transition-all duration-200 font-medium
                      ${errors.password 
                        ? 'border-red-300 focus:border-red-500 bg-red-50/50' 
                        : 'border-slate-200 focus:border-[#7E3AF2] focus:bg-white focus:shadow-lg focus:shadow-[#7E3AF2]/10'
                      }`}
                    {...register('password', {
                      required: 'Password is required',
                      minLength: { value: 6, message: 'Min 6 characters' }
                    })}
                  />
                  <button
                    type="button"
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {errors.password && <span className="text-red-500 text-xs ml-1 font-medium">{errors.password.message}</span>}
              </div>

              {/* Submit Button */}
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full h-12 bg-[#7E3AF2] hover:bg-[#6749D4] text-white rounded-xl font-bold text-lg shadow-lg shadow-[#7E3AF2]/20 hover:shadow-xl hover:shadow-[#7E3AF2]/30 transition-all duration-200 transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  'Sign In'
                )}
              </button>

              {/* Signup Link Button */}
              <Link
                to="/signup"
                className="flex items-center justify-center w-full h-12 border-2 border-[#7E3AF2] text-[#7E3AF2] bg-white hover:bg-[#7E3AF2] hover:text-white rounded-xl font-bold text-lg transition-all duration-200 group"
              >
                <UserPlus className="h-5 w-5 mr-2" />
                Create New Account
              </Link>

              {/* Footer Links */}
              <div className="flex items-center justify-center gap-4 text-sm text-slate-500 mt-6">
                <Link to="/forgot-password" class="hover:text-[#7E3AF2] font-medium transition-colors">
                  Forgot Password?
                </Link>
                <span className="text-slate-300">|</span>
                <Link to="/contact" class="hover:text-[#7E3AF2] font-medium transition-colors">
                  Need Help?
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, UserPlus, ArrowLeft, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';
import logo from "../../../assets/logo.png";

/**
 * SignupForm Component
 * Design: Matches the Figma "Create Account" design with split layout
 * Fix: Applied exact Logo visibility fixes from LoginForm
 */
export const SignupForm = ({ 
  handleSubmit, 
  onSubmit, 
  register, 
  errors, 
  isSubmitting,
  watch
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const password = watch ? watch("password") : "";

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1E3A8A] via-[#2563EB] to-[#0D9488] flex items-center justify-center p-4 md:p-6 font-sans">
      
      {/* Back to Website Button */}
      <Link 
        to="/" 
        className="absolute top-6 left-6 text-white/90 hover:text-white flex items-center gap-2 text-sm font-bold tracking-wide transition-colors z-50 drop-shadow-md"
      >
        <ArrowLeft className="h-4 w-4 stroke-[3]" />
        Back to Website
      </Link>

      <div className="w-full max-w-6xl relative z-10">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden grid lg:grid-cols-2">
          
          {/* LEFT SIDE - BRANDING */}
          <div className="hidden lg:flex relative bg-[#1E3A8A] overflow-hidden flex-col justify-center items-center text-white p-12">
            
            {/* CSS-only Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#1E3A8A] to-[#0D9488] z-0"></div>
            
            {/* Decorative Glow Orbs */}
            <div className="absolute top-[-20%] left-[-20%] w-[500px] h-[500px] bg-blue-500/30 rounded-full blur-[100px] z-0"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-teal-500/30 rounded-full blur-[80px] z-0"></div>
            
            {/* Content Container - Highest Z-Index */}
            <div className="relative z-50 flex flex-col items-center text-center">
              
              <div className="inline-block py-1 px-3 rounded-full bg-white/10 border border-white/20 text-blue-100 text-[10px] font-bold uppercase tracking-widest mb-8 backdrop-blur-md">
                Decade of Excelling
              </div>

              {/* LOGO - Exact Working Config from LoginForm */}
              <div className="mb-8 relative z-50">
                <img 
                  src={logo} 
                  alt="Centum Academy Logo" 
                  loading="eager"
                  className="h-32 w-auto md:h-40 object-contain drop-shadow-2xl"
                  style={{ 
                    filter: "brightness(0) invert(1)",
                    WebkitFilter: "brightness(0) invert(1)",
                    transform: "translateZ(0)" // Forces GPU layer to prevent disappearing on refresh
                  }}
                />
              </div>

              <h1 className="text-4xl md:text-5xl font-extrabold text-center tracking-tight font-display drop-shadow-lg mb-4">
                CENTUM ACADEMY
              </h1>
              <p className="text-lg text-blue-100 font-medium tracking-wide max-w-md leading-relaxed border-t border-blue-400/30 pt-6 mt-2">
                Join our community of learners and start your journey towards academic excellence.
              </p>
            </div>
          </div>

          {/* RIGHT SIDE - SIGNUP FORM */}
          <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center relative bg-white z-20">
            
            {/* Mobile Logo (Visible only on small screens - Dark Version) */}
            <div className="lg:hidden flex flex-col items-center mb-10">
               <img 
                 src={logo} 
                 alt="Centum Academy Logo" 
                 className="h-16 w-auto object-contain mb-3"
               />
               <h2 className="text-xl font-extrabold text-[#1E3A8A] text-center font-display">CENTUM ACADEMY</h2>
            </div>

            <div className="mb-8">
              <h3 className="text-3xl font-bold text-slate-900 mb-2 font-display">Create Account</h3>
              <p className="text-slate-500 text-base">Sign up to get started</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              
              {/* Email Field */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 uppercase tracking-wide ml-1">
                  Email Address
                </label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-[#2563EB] transition-colors" />
                  <input
                    type="email"
                    placeholder="your.email@example.com"
                    className={`w-full pl-12 pr-4 h-12 bg-slate-50 border-2 rounded-xl outline-none transition-all duration-200 font-medium text-slate-900
                      ${errors.email 
                        ? 'border-red-300 focus:border-red-500 bg-red-50/50' 
                        : 'border-slate-100 focus:border-[#2563EB] focus:bg-white focus:shadow-lg focus:shadow-blue-500/10'
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
                {errors.email && <span className="text-red-500 text-xs ml-1 font-bold flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.email.message}</span>}
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 uppercase tracking-wide ml-1">
                  Password
                </label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-[#2563EB] transition-colors" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Create a password (min 6 chars)"
                    className={`w-full pl-12 pr-12 h-12 bg-slate-50 border-2 rounded-xl outline-none transition-all duration-200 font-medium text-slate-900
                      ${errors.password 
                        ? 'border-red-300 focus:border-red-500 bg-red-50/50' 
                        : 'border-slate-100 focus:border-[#2563EB] focus:bg-white focus:shadow-lg focus:shadow-blue-500/10'
                      }`}
                    {...register('password', {
                      required: 'Password is required',
                      minLength: { value: 6, message: 'Password must be at least 6 characters' }
                    })}
                  />
                  <button
                    type="button"
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none p-1 hover:bg-slate-100 rounded-full transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {errors.password && <span className="text-red-500 text-xs ml-1 font-bold flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.password.message}</span>}
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 uppercase tracking-wide ml-1">
                  Confirm Password
                </label>
                <div className="relative group">
                  <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-[#2563EB] transition-colors" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Re-enter your password"
                    className={`w-full pl-12 pr-12 h-12 bg-slate-50 border-2 rounded-xl outline-none transition-all duration-200 font-medium text-slate-900
                      ${errors.confirmPassword 
                        ? 'border-red-300 focus:border-red-500 bg-red-50/50' 
                        : 'border-slate-100 focus:border-[#2563EB] focus:bg-white focus:shadow-lg focus:shadow-blue-500/10'
                      }`}
                    {...register('confirmPassword', {
                      required: 'Please confirm your password',
                      validate: val => {
                        if (watch && val !== watch("password")) {
                          return "Passwords do not match";
                        }
                        return true;
                      }
                    })}
                  />
                  <button
                    type="button"
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none p-1 hover:bg-slate-100 rounded-full transition-colors"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {errors.confirmPassword && <span className="text-red-500 text-xs ml-1 font-bold flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.confirmPassword.message}</span>}
              </div>

              {/* Submit Button */}
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full h-14 bg-[#0b0a2e] hover:bg-[#2563EB] text-white rounded-xl font-bold text-lg uppercase tracking-wider shadow-xl shadow-blue-900/20 hover:shadow-blue-600/30 transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3 mt-6"
              >
                {isSubmitting ? (
                  <span className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Sign Up
                    <ArrowRight className="h-5 w-5" />
                  </>
                )}
              </button>

              {/* Login Link */}
              <div className="text-center pt-4">
                <p className="text-slate-500 font-medium text-sm">
                  Already have an account?{' '}
                  <Link 
                    to="/login" 
                    className="text-[#2563EB] font-bold hover:text-[#1E3A8A] transition-colors underline decoration-2 underline-offset-4"
                  >
                    Login
                  </Link>
                </p>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
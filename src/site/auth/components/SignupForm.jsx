import { Link } from 'react-router-dom';
import { Input } from '../../../components/common'; 
import logo from "../../../assets/logo.png";
import { ArrowRight, User, Mail, Phone, Lock, CheckCircle } from 'lucide-react';

/**
 * SignupForm Component
 * UPDATED: Fixed Logo to show original colors without filters.
 */
export const SignupForm = ({ 
  handleSubmit, 
  onSubmit, 
  register, 
  errors, 
  password, 
  isSubmitting, 
  validators 
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-slate-50">
      
      {/* BACKGROUND DECORATION */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-[10%] left-[20%] w-[400px] h-[400px] rounded-full bg-teal-200/30 blur-[90px] animate-pulse"></div>
        <div className="absolute bottom-[10%] right-[10%] w-[500px] h-[500px] rounded-full bg-blue-300/30 blur-[100px] animate-pulse" style={{ animationDelay: '3s' }}></div>
      </div>

      <div className="w-full max-w-6xl z-10 flex rounded-[2rem] shadow-2xl overflow-hidden bg-white/90 backdrop-blur-xl border border-white/50 min-h-[700px]">
        
        {/* LEFT SIDE: Decorative (Signup Theme) */}
        <div className="hidden lg:flex w-5/12 bg-gradient-to-bl from-gray-900 via-slate-800 to-slate-900 relative flex-col justify-between p-12 text-white">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
          
           {/* Logo - FIXED: Original Colors Preserved */}
           <div className="relative z-10">
            <div className="bg-white p-4 rounded-2xl shadow-lg w-fit">
              <img 
                src={logo} 
                alt="Centum Logo" 
                className="h-12 w-auto object-contain" // Removed grayscale/brightness filters
              />
            </div>
          </div>

          <div className="relative z-10 space-y-8">
            <h1 className="text-4xl font-bold leading-tight">
              Start Your <br/>
              <span className="text-teal-400">Journey Here.</span>
            </h1>
            
            {/* Feature List */}
            <div className="space-y-4">
                {[
                    "Access exclusive study materials",
                    "Track your progress in real-time",
                    "Connect with expert mentors",
                    "Join a community of achievers"
                ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-slate-300">
                        <div className="bg-teal-500/20 p-1.5 rounded-full">
                            <CheckCircle className="w-4 h-4 text-teal-400" />
                        </div>
                        <span className="text-sm font-medium">{item}</span>
                    </div>
                ))}
            </div>
          </div>

          <div className="relative z-10 text-xs text-slate-400 font-medium">
            Join 10,000+ students today
          </div>
        </div>

        {/* RIGHT SIDE: Signup Form */}
        <div className="w-full lg:w-7/12 p-8 md:p-12 lg:p-12 flex flex-col justify-center bg-white">
          <div className="max-w-lg mx-auto w-full">
            
            {/* Mobile Logo View */}
            <div className="lg:hidden text-center mb-6">
               <img src={logo} alt="Logo" className="h-16 mx-auto" />
            </div>

            <div className="text-center lg:text-left mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
              <p className="text-gray-500 mt-2">Fill in the form below to get instant access.</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              
              {/* Name Input */}
              <div className="relative group">
                 <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-teal-600 transition-colors">
                    <User className="w-5 h-5" />
                 </div>
                 <input 
                    type="text"
                    placeholder="Full Name"
                    className={`w-full pl-12 pr-4 py-3.5 bg-gray-50 border rounded-xl outline-none transition-all
                        ${errors.name ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10'}
                    `}
                    {...register('name', { required: 'Name is required', minLength: { value: 2, message: 'Too short' } })}
                 />
                 {errors.name && <span className="absolute right-3 top-3.5 text-xs text-red-500">{errors.name.message}</span>}
              </div>

              {/* Email & Phone Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-teal-600 transition-colors">
                        <Mail className="w-5 h-5" />
                    </div>
                    <input 
                        type="email"
                        placeholder="Email Address"
                        className={`w-full pl-12 pr-4 py-3.5 bg-gray-50 border rounded-xl outline-none transition-all
                            ${errors.email ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10'}
                        `}
                        {...register('email', { required: 'Required', validate: v => validators.isValidEmail(v) || 'Invalid email' })}
                    />
                     {errors.email && <span className="text-xs text-red-500 absolute -bottom-5 left-1">{errors.email.message}</span>}
                  </div>

                  <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-teal-600 transition-colors">
                        <Phone className="w-5 h-5" />
                    </div>
                    <input 
                        type="tel"
                        placeholder="Phone Number"
                        className={`w-full pl-12 pr-4 py-3.5 bg-gray-50 border rounded-xl outline-none transition-all
                            ${errors.phone ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10'}
                        `}
                        {...register('phone', { required: 'Required', validate: v => validators.isValidPhone(v) || 'Invalid phone' })}
                    />
                     {errors.phone && <span className="text-xs text-red-500 absolute -bottom-5 left-1">{errors.phone.message}</span>}
                  </div>
              </div>

              {/* Password & Confirm Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
                 <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-teal-600 transition-colors">
                        <Lock className="w-5 h-5" />
                    </div>
                    <input 
                        type="password"
                        placeholder="Password"
                        className={`w-full pl-12 pr-4 py-3.5 bg-gray-50 border rounded-xl outline-none transition-all
                            ${errors.password ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10'}
                        `}
                        {...register('password', { required: 'Required', minLength: { value: 6, message: 'Min 6 chars' } })}
                    />
                  </div>

                  <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-teal-600 transition-colors">
                        <Lock className="w-5 h-5" />
                    </div>
                    <input 
                        type="password"
                        placeholder="Confirm Password"
                        className={`w-full pl-12 pr-4 py-3.5 bg-gray-50 border rounded-xl outline-none transition-all
                            ${errors.confirmPassword ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10'}
                        `}
                        {...register('confirmPassword', { required: 'Required', validate: v => v === password || 'No match' })}
                    />
                  </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-gray-900 text-white rounded-xl font-bold text-lg shadow-xl shadow-gray-900/20 hover:shadow-2xl hover:bg-black hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2"
                >
                    {isSubmitting ? (
                    <span className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                    <>
                        Create Account
                        <ArrowRight className="w-5 h-5" />
                    </>
                    )}
                </button>
              </div>
            </form>

            <div className="text-center pt-6 border-t border-gray-100 mt-6">
              <p className="text-gray-500 text-sm">
                Already have an account? 
                <Link to="/login" className="ml-2 font-bold text-teal-600 hover:text-teal-800 transition-colors">
                  Log In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
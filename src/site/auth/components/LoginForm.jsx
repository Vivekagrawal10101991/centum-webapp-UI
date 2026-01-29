import { Link } from 'react-router-dom';
import { Input } from '../../../components/common';
import logo from "../../../assets/logo.png";
import { ArrowRight, Mail, Lock, Home } from 'lucide-react'; // Added Home icon

/**
 * LoginForm Component
 * UPDATED: Added "Take to Website" button in top-right corner
 */
export const LoginForm = ({ 
  handleSubmit, 
  onSubmit, 
  register, 
  errors, 
  isSubmitting, 
  validators 
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-slate-50">
      
      {/* BACKGROUND DECORATION */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-purple-300/30 blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-blue-300/30 blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="w-full max-w-5xl z-10 flex rounded-[2rem] shadow-2xl overflow-hidden bg-white/80 backdrop-blur-xl border border-white/50 min-h-[600px]">
        
        {/* LEFT SIDE: Brand Section */}
        <div className="hidden lg:flex w-5/12 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-600 relative flex-col justify-between p-12 text-white">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          
          <div className="relative z-10">
            <div className="bg-white/20 w-fit p-3 rounded-2xl backdrop-blur-md border border-white/10 shadow-lg">
              <img src={logo} alt="Centum Logo" className="h-12 w-auto" />
            </div>
          </div>

          <div className="relative z-10 space-y-6">
            <h1 className="text-4xl font-bold leading-tight">
              Master Your <br/>
              <span className="text-blue-300">Future Today.</span>
            </h1>
            <p className="text-blue-100/80 text-lg font-light leading-relaxed">
              "Education is not just about learning facts, but the training of the mind to think."
            </p>
          </div>

          <div className="relative z-10 text-xs text-blue-200/60 font-medium">
            © Centum Academy 2026
          </div>

          <div className="absolute bottom-0 right-0 translate-x-1/3 translate-y-1/3 w-64 h-64 bg-white/10 rounded-full blur-2xl"></div>
        </div>

        {/* RIGHT SIDE: Login Form */}
        <div className="w-full lg:w-7/12 p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-white/50 relative"> {/* Added relative for positioning */}
          
          {/* NEW: "Take to Website" Button */}
          <Link 
            to="/" 
            className="absolute top-6 right-6 flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 bg-white/50 hover:bg-white hover:text-primary rounded-full transition-all shadow-sm hover:shadow-md border border-gray-100 backdrop-blur-sm group"
          >
            <Home className="w-4 h-4 group-hover:scale-110 transition-transform" />
            <span>Take to Website</span>
          </Link>

          <div className="max-w-md mx-auto w-full space-y-8">
            
            {/* Mobile Logo */}
            <div className="lg:hidden text-center mb-6">
               <img src={logo} alt="Logo" className="h-14 mx-auto drop-shadow-md" />
            </div>

            <div className="text-center lg:text-left space-y-2">
              <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
              <p className="text-gray-500">Please enter your details to sign in.</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-8">
              {/* Email Field */}
              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-700 ml-1">Email Address</label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <input 
                    type="email"
                    placeholder="student@example.com"
                    className={`w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 rounded-xl outline-none transition-all duration-200 font-medium
                      ${errors.email ? 'border-red-300 focus:border-red-500 bg-red-50/50' : 'border-gray-100 focus:border-primary/50 focus:bg-white focus:shadow-lg focus:shadow-primary/5'}
                    `}
                    {...register('email', {
                      required: 'Email is required',
                      validate: (value) => validators.isValidEmail(value) || 'Please enter a valid email',
                    })}
                  />
                </div>
                {errors.email && <span className="text-red-500 text-xs ml-1">{errors.email.message}</span>}
              </div>

              {/* Password Field */}
              <div className="space-y-1">
                <div className="flex justify-between items-center ml-1">
                   <label className="text-sm font-semibold text-gray-700">Password</label>
                   <Link to="/forgot-password" class="text-xs font-semibold text-primary hover:text-primary-700 transition-colors">
                     Forgot Password?
                   </Link>
                </div>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors">
                    <Lock className="w-5 h-5" />
                  </div>
                  <input 
                    type="password"
                    placeholder="••••••••"
                    className={`w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 rounded-xl outline-none transition-all duration-200 font-medium
                      ${errors.password ? 'border-red-300 focus:border-red-500 bg-red-50/50' : 'border-gray-100 focus:border-primary/50 focus:bg-white focus:shadow-lg focus:shadow-primary/5'}
                    `}
                    {...register('password', {
                      required: 'Password is required',
                      minLength: { value: 6, message: 'Min 6 characters' },
                    })}
                  />
                </div>
                {errors.password && <span className="text-red-500 text-xs ml-1">{errors.password.message}</span>}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-gradient-to-r from-primary to-primary-700 text-white rounded-xl font-bold text-lg shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/30 hover:scale-[1.01] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 group"
              >
                {isSubmitting ? (
                  <span className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>

            <div className="text-center pt-4">
              <p className="text-gray-500 text-sm">
                Don't have an account? 
                <Link to="/signup" className="ml-2 font-bold text-primary hover:text-primary-800 transition-colors">
                  Create Account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Smartphone, 
  Trophy, 
  Zap, 
  Target,
  Brain,
  TrendingUp,
  ArrowLeft, 
  CheckCircle2,
  Clock,
  Award,
  ChevronRight,
  Star,
  Sparkles
} from 'lucide-react';

const CentumAiQuDetail = () => {
  return (
    <section className="min-h-screen bg-[#F8FAFC] font-sans selection:bg-indigo-100 selection:text-indigo-900">
      
      {/* --- HERO SECTION --- */}
      <div className="relative bg-[#0B1120] text-white pt-32 pb-20 px-6 overflow-hidden">
        {/* Background Gradients (Subtle Glows) */}
        <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Back Button */}
          <Link to="/ai-innovation">
            <motion.button
              className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-12 transition-colors group"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
              <span className="font-semibold tracking-wide">Back to Innovations</span>
            </motion.button>
          </Link>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 px-4 py-1.5 rounded-full mb-8">
                <Smartphone className="h-4 w-4" />
                <span className="text-xs font-bold uppercase tracking-widest">AI Quiz App</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-[1.1] tracking-tight">
                Play. Compete.<br />
                Improve. <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">With AI.</span>
              </h1>
              
              <p className="text-lg md:text-xl text-slate-400 mb-10 leading-relaxed max-w-xl">
                Centum AiQu is a 100% AI-powered quiz and learning app that transforms studying into an engaging, competitive, and intelligent experience designed for students from school level to competitive exams.
              </p>

              <div className="flex flex-wrap gap-4">
                <button className="px-8 py-4 bg-white text-slate-900 font-bold rounded-full hover:bg-slate-100 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.3)] flex items-center gap-2">
                  Download Now
                  <ChevronRight className="h-4 w-4" />
                </button>
                <button className="px-8 py-4 bg-slate-800 text-white font-bold rounded-full hover:bg-slate-700 transition-colors border border-slate-700">
                  See How AiQu Works
                </button>
              </div>
            </motion.div>

            {/* Right Image (Phone Mockup) */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative flex justify-center lg:justify-end"
            >
              {/* Phone Frame */}
              <div className="relative w-[340px] h-[680px] bg-[#020617] rounded-[3rem] border-[8px] border-slate-800 shadow-2xl overflow-hidden z-20">
                {/* Dynamic Island */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-black rounded-b-2xl z-30"></div>

                {/* Screen Content */}
                <div className="w-full h-full bg-[#0F172A] text-white p-6 pt-12 overflow-y-auto no-scrollbar font-sans">
                  {/* App Header */}
                  <div className="flex justify-between items-center mb-8">
                    <div>
                      <p className="text-slate-400 text-[10px] uppercase tracking-wider font-bold">Good Evening</p>
                      <h3 className="font-bold text-xl">Hi, John</h3>
                    </div>
                    {/* User Avatar Placeholder */}
                    <div className="h-10 w-10 bg-indigo-500 rounded-full border-2 border-white/10 flex items-center justify-center text-sm font-bold">
                       J
                    </div>
                  </div>

                  {/* Student Performance Index Card (Purple Gradient) */}
                  <div className="bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] rounded-3xl p-6 mb-8 shadow-lg relative overflow-hidden">
                    {/* Abstract Shapes */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
                    
                    <p className="text-white/80 text-[10px] font-bold uppercase tracking-wider mb-2">Student Performance Index</p>
                    <h2 className="text-5xl font-bold mb-6 text-white">83.56%</h2>
                    
                    <div className="space-y-4">
                      {/* Physics Bar */}
                      <div>
                        <div className="flex justify-between text-xs mb-1 font-bold text-white/90">
                          <span>Physics</span>
                          <span>83.56%</span>
                        </div>
                        <div className="h-1.5 bg-black/20 rounded-full overflow-hidden">
                          <div className="h-full bg-white rounded-full" style={{ width: '83.56%' }}></div>
                        </div>
                      </div>
                      
                      {/* Chemistry Bar */}
                      <div>
                        <div className="flex justify-between text-xs mb-1 font-bold text-white/90">
                          <span>Chemistry</span>
                          <span>91.65%</span>
                        </div>
                        <div className="h-1.5 bg-black/20 rounded-full overflow-hidden">
                          <div className="h-full bg-white rounded-full" style={{ width: '91.65%' }}></div>
                        </div>
                      </div>

                      {/* Maths Bar */}
                      <div>
                         <div className="flex justify-between text-xs mb-1 font-bold text-white/90">
                          <span>Maths</span>
                          <span>78.20%</span>
                        </div>
                        <div className="h-1.5 bg-black/20 rounded-full overflow-hidden">
                          <div className="h-full bg-white rounded-full" style={{ width: '78.20%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Recent Quizzes Section */}
                  <div className="flex justify-between items-end mb-4">
                    <h4 className="font-bold text-lg">Recent Quizzes</h4>
                    <span className="text-xs text-indigo-400 font-bold cursor-pointer">View All</span>
                  </div>
                  
                  <div className="space-y-3">
                    {/* Quiz Item 1 - Yellow */}
                    <div className="flex items-center gap-4 bg-slate-800/50 p-3 rounded-2xl border border-white/5 hover:bg-slate-800 transition-colors">
                        <div className="h-10 w-10 bg-amber-500/10 rounded-xl flex items-center justify-center">
                          <Zap className="h-5 w-5 text-amber-400" />
                        </div>
                        <div className="flex-1">
                          <p className="font-bold text-sm">Thermodynamics</p>
                          <p className="text-[10px] text-slate-400">10 Qs • Score: 80%</p>
                        </div>
                        <ChevronRight className="h-4 w-4 text-slate-600" />
                    </div>

                    {/* Quiz Item 2 - Green */}
                    <div className="flex items-center gap-4 bg-slate-800/50 p-3 rounded-2xl border border-white/5 hover:bg-slate-800 transition-colors">
                        <div className="h-10 w-10 bg-emerald-500/10 rounded-xl flex items-center justify-center">
                          <Brain className="h-5 w-5 text-emerald-400" />
                        </div>
                        <div className="flex-1">
                          <p className="font-bold text-sm">Organic Chem</p>
                          <p className="text-[10px] text-slate-400">15 Qs • Score: 92%</p>
                        </div>
                        <ChevronRight className="h-4 w-4 text-slate-600" />
                    </div>

                    {/* Quiz Item 3 - Red */}
                    <div className="flex items-center gap-4 bg-slate-800/50 p-3 rounded-2xl border border-white/5 hover:bg-slate-800 transition-colors">
                        <div className="h-10 w-10 bg-rose-500/10 rounded-xl flex items-center justify-center">
                          <Target className="h-5 w-5 text-rose-400" />
                        </div>
                        <div className="flex-1">
                          <p className="font-bold text-sm">Calculus II</p>
                          <p className="text-[10px] text-slate-400">10 Qs • Score: 75%</p>
                        </div>
                        <ChevronRight className="h-4 w-4 text-slate-600" />
                    </div>
                  </div>

                  {/* Bottom Nav Mockup */}
                  <div className="absolute bottom-0 left-0 w-full h-16 bg-[#0B1120]/95 backdrop-blur-md border-t border-white/5 flex justify-around items-center px-4 z-20">
                     <div className="flex flex-col items-center gap-1 text-indigo-400">
                        <Smartphone className="h-5 w-5" />
                        <span className="text-[8px] font-bold">Home</span>
                     </div>
                     <div className="flex flex-col items-center gap-1 text-slate-600">
                        <TrendingUp className="h-5 w-5" />
                        <span className="text-[8px] font-bold">Stats</span>
                     </div>
                     <div className="flex flex-col items-center gap-1 text-slate-600">
                        <Target className="h-5 w-5" />
                        <span className="text-[8px] font-bold">Practice</span>
                     </div>
                  </div>

                </div>
              </div>

              {/* Decorative Floating Elements (Behind Phone) */}
              <motion.div 
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-32 -left-12 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 shadow-xl z-30 hidden md:block"
              >
                <Trophy className="h-8 w-8 text-yellow-400" />
              </motion.div>
              <motion.div 
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-40 -right-8 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 shadow-xl z-30 hidden md:block"
              >
                <Star className="h-8 w-8 text-purple-400" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* --- PHILOSOPHY SECTION --- */}
      <div className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-8 leading-tight">
              Studying feels boring. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Competing feels exciting.</span>
            </h2>
            <p className="text-xl text-slate-600 mb-12 leading-relaxed max-w-3xl mx-auto">
              Most students struggle not because they lack ability — but because learning feels repetitive and passive. <br className="hidden md:block" />
              Centum AiQu turns learning into:
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {[
                { icon: Zap, text: "A Challenge", color: "text-amber-500", bg: "bg-amber-50", border: "hover:border-amber-200" },
                { icon: Trophy, text: "A Competition", color: "text-blue-500", bg: "bg-blue-50", border: "hover:border-blue-200" },
                { icon: Award, text: "A Reward", color: "text-rose-500", bg: "bg-rose-50", border: "hover:border-rose-200" }
              ].map((item, i) => (
                <div key={i} className={`${item.bg} p-8 rounded-3xl flex flex-col items-center justify-center gap-4 border-2 border-transparent ${item.border} transition-all duration-300 transform hover:-translate-y-1`}>
                  <div className="h-16 w-16 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                     <item.icon className={`h-8 w-8 ${item.color}`} />
                  </div>
                  <span className="font-bold text-slate-900 text-xl">{item.text}</span>
                </div>
              ))}
            </div>

            <div className="inline-block px-8 py-6 bg-[#0B1120] rounded-2xl shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-full bg-indigo-500/10 group-hover:bg-indigo-500/20 transition-colors"></div>
              <p className="text-xl font-bold text-white relative z-10">
                "Because when learning feels like a game, effort becomes natural."
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* --- FEATURES & HOW IT WORKS --- */}
      <div className="py-24 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            {/* Left: Features List */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-1.5 rounded-full mb-6">
                <Brain className="h-4 w-4" />
                <span className="text-xs font-bold uppercase tracking-widest">Intelligent Learning</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-8 leading-tight">
                A powerful learning companion in your pocket
              </h2>
              <p className="text-lg text-slate-600 mb-8">
                  Centum AiQu is an intelligent quiz-based application that helps students:
              </p>
              <div className="space-y-4">
                {[
                  "Practice daily with adaptive quizzes",
                  "Strengthen weak areas automatically",
                  "Compete with peers on leaderboards",
                  "Track real-time improvement",
                  "Earn rewards and badges"
                ].map((text, i) => (
                  <div key={i} className="flex items-center gap-4 bg-white p-5 rounded-2xl shadow-sm border border-slate-200 hover:border-indigo-200 transition-colors">
                    <div className="h-6 w-6 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="h-4 w-4 text-indigo-600" />
                    </div>
                    <span className="text-lg font-bold text-slate-700">{text}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right: How It Works Steps */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-[3rem] p-10 md:p-12 shadow-2xl border border-slate-100 relative overflow-hidden"
            >
              {/* Decorative Circle */}
              <div className="absolute -top-20 -right-20 w-80 h-80 bg-indigo-50 rounded-full z-0 opacity-50"></div>
              
              <div className="relative z-10">
                <h3 className="text-3xl font-bold mb-10 text-slate-900">How It Works</h3>
                <div className="space-y-10">
                  {[
                    { step: "01", title: "Select Subject", desc: "Choose your topic or let AI recommend one based on your syllabus.", color: "bg-indigo-600" },
                    { step: "02", title: "Play Quiz", desc: "Engage in gamified questions with timers, streaks, and lifelines.", color: "bg-purple-600" },
                    { step: "03", title: "Get Analysis", desc: "Instant feedback on speed, accuracy, and conceptual clarity.", color: "bg-pink-600" },
                    { step: "04", title: "Rank Up", desc: "Climb the leaderboard, earn XP, and unlock new levels.", color: "bg-amber-500" }
                  ].map((s, i) => (
                    <div key={i} className="flex gap-6 relative group">
                      {/* Connector Line */}
                      {i !== 3 && <div className="absolute left-[19px] top-10 w-0.5 h-20 bg-slate-100 group-hover:bg-indigo-50 transition-colors"></div>}
                      
                      {/* Step Number Bubble */}
                      <div className={`h-10 w-10 ${s.color} rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg z-10 flex-shrink-0`}>
                        {s.step}
                      </div>
                      
                      {/* Content */}
                      <div>
                        <h4 className="text-xl font-bold text-slate-900 mb-2">{s.title}</h4>
                        <p className="text-slate-500 leading-relaxed text-sm md:text-base">{s.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* --- AI STRATEGY SECTION (Dark) --- */}
      <div className="py-24 px-6 bg-[#0B1120] text-white overflow-hidden relative">
        {/* Background Mesh */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-indigo-900/20 rounded-[100%] blur-[100px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 px-4 py-1.5 rounded-full mb-6">
              <TrendingUp className="h-4 w-4" />
              <span className="text-xs font-bold uppercase tracking-widest">Performance Analytics</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              Not just a score — a strategy
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-16">
              The AI engine analyses your speed, accuracy, and conceptual gaps to provide personalized recommendations.
            </p>

            <div className="grid md:grid-cols-3 gap-8 text-left">
              {/* Card 1 */}
              <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-3xl border border-slate-700 hover:border-indigo-500/50 transition-colors group">
                <div className="h-14 w-14 bg-indigo-900/50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Clock className="h-7 w-7 text-indigo-400" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">Speed Analysis</h3>
                <p className="text-slate-400 leading-relaxed">Identifies questions where you spend too much time and suggests time-management hacks.</p>
              </div>

              {/* Card 2 */}
              <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-3xl border border-slate-700 hover:border-emerald-500/50 transition-colors group">
                <div className="h-14 w-14 bg-emerald-900/50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Target className="h-7 w-7 text-emerald-400" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">Accuracy Check</h3>
                <p className="text-slate-400 leading-relaxed">Pinpoints specific sub-topics where errors occur frequently, distinguishing between silly mistakes and concept gaps.</p>
              </div>

              {/* Card 3 */}
              <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-3xl border border-slate-700 hover:border-purple-500/50 transition-colors group">
                <div className="h-14 w-14 bg-purple-900/50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Zap className="h-7 w-7 text-purple-400" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">Gap Filling</h3>
                <p className="text-slate-400 leading-relaxed">Automatically generates "Repair Quizzes" focusing solely on your weak areas to turn them into strengths.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* --- CTA SECTION --- */}
      <div className="py-24 px-6 bg-gradient-to-br from-indigo-600 to-violet-700 text-white text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold mb-8">
            Ready to play smarter?
          </h2>
          <p className="text-xl text-indigo-100 mb-12">
            Small daily practice. Big long-term success.<br />
            Download Centum AiQu today and start improving daily.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            {/* App Store Button */}
            <button className="flex items-center justify-center gap-3 bg-[#000000] text-white px-8 py-4 rounded-xl hover:bg-slate-900 transition-all shadow-xl hover:-translate-y-1 w-full sm:w-auto min-w-[200px] border border-slate-800">
              <svg className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.78.81-.05 2.22-.92 3.73-.78 1.55.13 2.76.65 3.53 1.76-3.3 1.95-2.78 5.75.29 7.02-.27 1.55-1.25 3.07-2.63 4.19zM12.03 5.08c-.73 2.89-3.66 4.39-5.55 3.5.34-2.82 2.85-5.01 5.55-3.5z"/>
              </svg>
              <div className="text-left">
                <div className="text-[10px] uppercase font-bold leading-none mb-1 opacity-80">Download on the</div>
                <div className="text-xl font-bold leading-none">App Store</div>
              </div>
            </button>

            {/* Google Play Button */}
            <button className="flex items-center justify-center gap-3 bg-[#000000] text-white px-8 py-4 rounded-xl hover:bg-slate-900 transition-all shadow-xl hover:-translate-y-1 w-full sm:w-auto min-w-[200px] border border-slate-800">
              <svg className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm11.96 11.455l-1.26-1.27-5.022 5.023 6.282 3.58a1 1 0 0 0 1.053-.05l-1.053-7.283zm3.923-3.14l-3.32-1.9-5.023 5.023 8.343 4.757a1 1 0 0 0 .524-1.26 1 1 0 0 0-.524-6.62zm-5.897-4.148L8.29 11 13.313 5.977l1.282 1.283-6.282-3.58a1 1 0 0 0-1.053-.05l6.335 3.61z"/>
              </svg>
              <div className="text-left">
                <div className="text-[10px] uppercase font-bold leading-none mb-1 opacity-80">GET IT ON</div>
                <div className="text-xl font-bold leading-none">Google Play</div>
              </div>
            </button>
          </div>
        </div>
      </div>

    </section>
  );
};

export default CentumAiQuDetail;
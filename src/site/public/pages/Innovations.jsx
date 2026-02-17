import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Zap, 
  Brain, 
  LayoutDashboard, 
  PlayCircle, 
  ArrowRight, 
  Target, 
  ChevronRight,
  MessageSquare,
  Trophy,
  Sparkles,
  BarChart3
} from 'lucide-react';
import Card from '../../../components/common/Card';
import Button from '../../../components/common/Button';

// Asset Imports
import mindgaugeImg from '../../../assets/AI Innovation/Mindguage.png';
import classBuzzImg from '../../../assets/AI Innovation/class buzz.png';
import learnWithDashImg from '../../../assets/AI Innovation/learn with dash.png';
import centumAiQuImg from '../../../assets/AI Innovation/Centum AiQu.png';

const Innovations = () => {
  const innovationList = [
    {
      title: "ClassBuzz",
      description: "ClassBuzz makes classrooms more attentive and measurable by conducting short quizzes right after teaching. Students stay engaged, teachers get instant feedback, and parents get visibility into topic-wise learning trends beyond exam marks.",
      image: classBuzzImg,
      features: [
        { icon: PlayCircle, label: "Live Quizzes" },
        { icon: MessageSquare, label: "Instant Feedback" },
        { icon: LayoutDashboard, label: "Parent Dashboard" }
      ],
      linkText: "Explore ClassBuzz",
      reverse: false
    },
    {
      title: "Mindgauge",
      description: "Mindgauge helps students and parents understand strengths, learning styles, personality traits, and career inclinations using an Al-assisted psychometric approach—so stream decisions are made with clarity, not confusion.",
      image: mindgaugeImg,
      features: [
        { icon: Brain, label: "Al-Powered" },
        { icon: Target, label: "Career Guidance" },
        { icon: ChevronRight, label: "Stream Selection" }
      ],
      linkText: "Explore Mindgauge",
      reverse: true
    },
    {
      title: "Learn with Dash",
      description: "Learn with Dash is a personalised learning companion that helps students revise anytime, practice effectively, learn from mistakes, and improve continuously through dashboards, mind maps, assessments, and recorded learning support.",
      image: learnWithDashImg,
      features: [
        { icon: Zap, label: "Personalized" },
        { icon: LayoutDashboard, label: "Mind Maps" },
        { icon: Target, label: "Practice Tests" }
      ],
      linkText: "Explore Learn with Dash",
      reverse: false
    },
    {
      title: "Centum AiQu",
      description: "Centum AiQu is a 100% Al-powered learning and quiz application designed to make studying interactive, competitive, and rewarding. It transforms learning into a game-like experience while providing personalized recommendations and instant performance tracking.",
      image: centumAiQuImg,
      features: [
        { icon: Trophy, label: "Game-Like Quizes" },
        { icon: Brain, label: "Al Recommendations" },
        { icon: Zap, label: "Rewards & Rankings" }
      ],
      linkText: "Download App",
      reverse: true
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans overflow-x-hidden">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-[#1E3A8A] via-[#2563EB] to-[#0D9488] text-white py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative max-w-7xl mx-auto px-6 text-center z-10"
        >
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full mb-6">
            <Zap className="h-6 w-6 text-yellow-400" />
            <span className="text-sm font-semibold uppercase tracking-wider">AI-Powered Solutions</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            Our Innovations
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Leveraging cutting-edge technology to revolutionize learning experiences for students, teachers, and parents
          </p>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 space-y-32">
        {innovationList.map((item, index) => {
          const MainIcon = item.features[0].icon;
          return (
            <motion.div 
              key={item.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid lg:grid-cols-2 gap-16 items-center"
            >
              <motion.div 
                variants={{
                  hidden: { opacity: 0, x: item.reverse ? 50 : -50 },
                  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
                }}
                className={item.reverse ? 'lg:order-2' : 'lg:order-1'}
              >
                <div className="inline-block p-4 bg-purple-100 rounded-2xl mb-6 shadow-sm">
                  <MainIcon className="h-8 w-8 text-purple-600" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 tracking-tight">
                  {item.title}
                </h2>
                <p className="text-lg text-slate-600 leading-relaxed mb-8 font-medium">
                  {item.description}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
                  {item.features.map((feature, fIdx) => {
                    const FeatureIcon = feature.icon;
                    return (
                      <div key={fIdx} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 text-center transition-all hover:shadow-md">
                        <FeatureIcon className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                        <span className="text-[10px] font-bold uppercase tracking-wide text-slate-500">{feature.label}</span>
                      </div>
                    );
                  })}
                </div>
                <Link to="/contact">
                  <Button variant="ghost" className="text-purple-600 font-bold flex items-center gap-2 group p-0 hover:bg-transparent">
                    {item.linkText} <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-2" />
                  </Button>
                </Link>
              </motion.div>

              <motion.div 
                variants={{
                  hidden: { opacity: 0, scale: 0.9 },
                  visible: { opacity: 1, scale: 1, transition: { duration: 0.8 } }
                }}
                className={`${item.reverse ? 'lg:order-1' : 'lg:order-2'} relative`}
              >
                <div className="absolute -inset-4 bg-gradient-to-tr from-purple-100 to-blue-100 rounded-[3rem] -rotate-2 opacity-60"></div>
                <img src={item.image} alt={item.title} className="relative w-full rounded-[2.5rem] shadow-2xl border border-white z-10" />
              </motion.div>
            </motion.div>
          );
        })}

        {/* --- EXACT FIGMA CTA SECTION --- */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative bg-[#0B1120] rounded-[3rem] overflow-hidden shadow-2xl border border-white/5"
        >
          {/* Futuristic Mesh Glows */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
            <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-purple-600/20 blur-[120px] rounded-full"></div>
            <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-blue-600/20 blur-[120px] rounded-full"></div>
          </div>

          <div className="relative z-10 grid lg:grid-cols-[1.2fr_0.8fr] gap-12 items-center p-12 md:p-24">
            {/* Left Content */}
            <div className="text-left">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight leading-[1.1]">
                Ready to Experience the <br />
                <span className="text-blue-400 italic">Future of Learning?</span>
              </h2>
              <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-xl leading-relaxed">
                Connect with us to learn more about our innovative solutions and how they can transform your learning journey.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <Link to="/contact">
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-10 py-5 bg-white text-[#0B1120] rounded-2xl font-black uppercase tracking-[0.15em] text-xs shadow-2xl transition-all flex items-center gap-3"
                  >
                    Get Started Today
                    <ChevronRight className="h-5 w-5" />
                  </motion.button>
                </Link>
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-3">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="w-10 h-10 rounded-full border-2 border-[#0B1120] bg-slate-800 overflow-hidden">
                        <img src={`https://i.pravatar.cc/100?img=${i+15}`} alt="user" />
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-slate-500 font-bold">Joined by 10k+ Students</p>
                </div>
              </div>
            </div>

            {/* Right: Glassmorphism Floating UI (Matching Figma PDF) */}
            <div className="hidden lg:block relative h-full">
              <motion.div 
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] max-w-[320px] ml-auto"
              >
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                    <BarChart3 className="h-5 w-5 text-emerald-400" />
                  </div>
                  <span className="text-[10px] font-black text-white/50 uppercase tracking-widest">Performance Index</span>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-end mb-2">
                      <span className="text-sm font-bold text-white">Physics</span>
                      <span className="text-xl font-black text-emerald-400">83.56%</span>
                    </div>
                    <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: '83.56%' }}
                        className="h-full bg-gradient-to-r from-emerald-500 to-teal-400"
                      ></motion.div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/5">
                    <div className="flex items-center gap-2 text-blue-400 text-xs font-bold">
                      <Brain className="h-4 w-4" />
                      AI Analysis Complete
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Decorative Sparkle */}
              <motion.div 
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute top-[-20px] right-[-20px]"
              >
                <Sparkles className="h-8 w-8 text-blue-400" />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Innovations;
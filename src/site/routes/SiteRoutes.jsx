import { Route, useParams } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import PageMeta from '../../components/common/PageMeta';

// Auth pages
import { Login, Signup, ChangePassword, Unauthorized } from '../auth';

// Public pages
import { 
  Home, 
  About, 
  Contact, 
  Courses, 
  Careers,
  Announcements,
  VisionMission,
  Founders,
  Innovations, 
  JeeMains,
  JeeAdvance,
  NeetCourses,
  KcetCourses,
  FoundationCourses,
  IitFoundation, 
  NeetFoundation 
} from '../public';

// Import New Detail Pages
import ClassGaugeDetail from '../public/pages/ClassGaugeDetail'; 
import MindgaugeDetail from '../public/pages/MindgaugeDetail';
import LearnWithDashDetail from '../public/pages/LearnWithDashDetail';
import CentumAiQuDetail from '../public/pages/CentumAiQuDetail';
import Library from '../public/pages/Library'; 

// Import the new Dynamic Template
import CourseDetail from '../public/pages/CourseDetail';

// Content pages
import { Blogs, BlogDetail, Videos, Achievers, StudentSuccess, Contributions } from '../content';

// =====================================================================
// DYNAMIC SEO WRAPPER FOR PROGRAM ROUTES
// This ensures <Courses /> gets the :programId to filter correctly,
// while strictly applying the custom SEO tags for specific URLs.
// =====================================================================
const ProgramSeoWrapper = () => {
  const { programId } = useParams();

  if (programId === 'iit-jee-coaching-bangalore') {
    return (
      <PageMeta 
        title="IIT JEE Coaching in Bangalore | JEE Main & Advanced" 
        description="Expert IIT JEE coaching in Bangalore for JEE Main & Advanced. Concept-focused teaching, personalised mentoring & proven results. Enrol at Centum Academy." 
        path={`/program/${programId}`}>
        <Layout><Courses /></Layout>
      </PageMeta>
    );
  }
  
  if (programId === 'neet-coaching-bangalore') {
    return (
      <PageMeta 
        title="NEET Coaching in Bangalore | Best Medical Entrance Prep" 
        description="Top NEET coaching in Bangalore with expert faculty, structured study plans, mock tests & mentoring. Prepare confidently for NEET with Centum Academy." 
        path={`/program/${programId}`}>
        <Layout><Courses /></Layout>
      </PageMeta>
    );
  }
  
  if (programId === 'foundation-coaching-bangalore') {
    return (
      <PageMeta 
        title="Foundation Program in Bangalore for Class 8–10 | Centum Academy" 
        description="Join our Foundation coaching in Bangalore for Class 8–10. Build strong academic basics and prepare early for IIT JEE & NEET success." 
        path={`/program/${programId}`}>
        <Layout><Courses /></Layout>
      </PageMeta>
    );
  }

  if (programId === 'iit-foundation-coaching-bangalore') {
    return (
      <PageMeta 
        title="IIT Foundation Coaching in Bangalore for Class 8, 9 & 10" 
        description="IIT Foundation coaching in Bangalore for Class 8, 9 & 10. Build strong Maths & Science basics and start early IIT JEE preparation with Centum Academy." 
        path={`/program/${programId}`}>
        <Layout><IitFoundation /></Layout>
      </PageMeta>
    );
  }

  if (programId === 'neet-foundation-coaching-bangalore') {
    return (
      <PageMeta 
        title="NEET Foundation Coaching in Bangalore for Class 8, 9 & 10" 
        description="NEET Foundation coaching in Bangalore for Class 8, 9 & 10. Build strong Biology, Physics & Chemistry basics and prepare early for medical entrance exams." 
        path={`/program/${programId}`}>
        <Layout><NeetFoundation /></Layout>
      </PageMeta>
    );
  }

  // Fallback for any other dynamically generated program category
  return (
    <PageMeta title="Programs | Centum Academy" path={`/program/${programId}`}>
      <Layout><Courses /></Layout>
    </PageMeta>
  );
};


export const SiteRoutes = () => {
  return (
    <>
      {/* ========================================= */}
      {/* CORE PROGRAM SEO PAGES                    */}
      {/* ========================================= */}
      <Route path="/" element={
        <PageMeta 
          title="Best Coaching Centre in Bangalore for JEE & NEET | Centum Academy" 
          description="Centum Academy is a leading coaching centre in Bangalore offering JEE, NEET & Foundation classes with expert faculty, mentoring & proven results." 
          path="/">
          <Layout><Home /></Layout>
        </PageMeta>
      } />

      {/* THE FIX: Single dynamic route passes params to the wrapper to apply correct SEO & Component */}
      <Route path="/program/:programId" element={<ProgramSeoWrapper />} />

      {/* General Program Landing Page */}
      <Route path="/program" element={
        <PageMeta 
          title="Coaching Programs in Bangalore | JEE, NEET & Foundation" 
          description="Explore Centum Academy’s coaching programs in Bangalore for IIT JEE, NEET & Foundation courses designed for structured learning and success." 
          path="/program">
          <Layout><Courses /></Layout>
        </PageMeta>
      } />

      {/* ========================================= */}
      {/* STATIC & CONTENT PAGES SEO ENHANCED       */}
      {/* ========================================= */}
      <Route path="/about" element={
        <PageMeta 
          title="About Centum Academy | IIT-Led Coaching in Bangalore" 
          description="Learn about Centum Academy’s vision, IIT-led approach, and commitment to JEE, NEET & Foundation coaching excellence in Bangalore." 
          path="/about">
          <Layout><About /></Layout>
        </PageMeta>
      } />

      <Route path="/vision-mission" element={
        <PageMeta 
          title="Vision & Mission | Centum Academy Bangalore" 
          description="Explore Centum Academy’s vision and mission focused on strong foundations, academic excellence, and success in JEE, NEET & future careers." 
          path="/vision-mission">
          <Layout><VisionMission /></Layout>
        </PageMeta>
      } />

      <Route path="/founders" element={
        <PageMeta 
          title="Founders of Centum Academy | IIT Alumni Leadership" 
          description="Meet the founders of Centum Academy, IIT alumni dedicated to building strong academic foundations and guiding students for JEE & NEET success." 
          path="/founders">
          <Layout><Founders /></Layout>
        </PageMeta>
      } />

      <Route path="/ai-innovation" element={
        <PageMeta 
          title="AI Learning at Centum Academy | Smart Exam Preparation" 
          description="Discover how Centum Academy uses AI-based learning, assignments, and analytics to improve student performance in JEE, NEET & Foundation programs." 
          path="/ai-innovation">
          <Layout><Innovations /></Layout>
        </PageMeta>
      } />

      <Route path="/library" element={
        <PageMeta 
          title="Student Library & Resources | Centum Academy" 
          description="Access study materials, resources, and academic support tools for JEE, NEET, and Foundation students at Centum Academy." 
          path="/library">
          <Layout><Library /></Layout>
        </PageMeta>
      } />

      <Route path="/announcements" element={
        <PageMeta 
          title="Announcements | Centum Academy Updates & News" 
          description="Stay updated with the latest announcements, admissions, and academic updates from Centum Academy in Bangalore." 
          path="/announcements">
          <Layout><Announcements /></Layout>
        </PageMeta>
      } />

      <Route path="/student-success" element={
        <PageMeta 
          title="Student Success Stories | Centum Academy Results" 
          description="Explore student success stories and academic achievements at Centum Academy in JEE, NEET, and Foundation programs." 
          path="/student-success">
          <Layout><StudentSuccess /></Layout>
        </PageMeta>
      } />

      <Route path="/blog" element={
        <PageMeta 
          title="Centum Academy Blog | JEE, NEET & Study Tips" 
          description="Read expert blogs, study tips, and exam strategies for JEE, NEET, and Foundation students from Centum Academy." 
          path="/blog">
          <Layout><Blogs /></Layout>
        </PageMeta>
      } />

      <Route path="/contact" element={
        <PageMeta 
          title="Contact Centum Academy | Coaching in Bangalore" 
          description="Contact Centum Academy for admissions, counselling, and enquiries about JEE, NEET, and Foundation coaching in Bangalore." 
          path="/contact">
          <Layout><Contact /></Layout>
        </PageMeta>
      } />

      <Route path="/careers" element={
        <PageMeta 
          title="Careers at Centum Academy | Join Our Teaching Team" 
          description="Explore career opportunities at Centum Academy. Join our team of educators and contribute to JEE, NEET & Foundation coaching excellence." 
          path="/careers">
          <Layout><Careers /></Layout>
        </PageMeta>
      } />

      {/* ========================================= */}
      {/* OTHER SUB-ROUTES (WITH CANONICALS)        */}
      {/* ========================================= */}
      <Route path="/ai-innovation/class-gauge" element={<PageMeta title="Class Gauge | Centum Academy" path="/ai-innovation/class-gauge"><Layout><ClassGaugeDetail /></Layout></PageMeta>} />
      <Route path="/ai-innovation/mindgauge" element={<PageMeta title="Mindgauge | Centum Academy" path="/ai-innovation/mindgauge"><Layout><MindgaugeDetail /></Layout></PageMeta>} />
      <Route path="/ai-innovation/learn-with-dash" element={<PageMeta title="Learn With Dash | Centum Academy" path="/ai-innovation/learn-with-dash"><Layout><LearnWithDashDetail /></Layout></PageMeta>} />
      <Route path="/ai-innovation/centum-aiqu" element={<PageMeta title="Centum AiQu | Centum Academy" path="/ai-innovation/centum-aiqu"><Layout><CentumAiQuDetail /></Layout></PageMeta>} />
      
      {/* Dynamic Course Template (Matches Slug or ID) */}
      <Route path="/courses/:slug" element={<Layout><CourseDetail /></Layout>} />
      
      {/* Legacy Specific Pages */}
      <Route path="/courses/jee-mains-legacy" element={<Layout><JeeMains /></Layout>} />
      <Route path="/courses/jee-advance-legacy" element={<Layout><JeeAdvance /></Layout>} />
      <Route path="/courses/neet-legacy" element={<Layout><NeetCourses /></Layout>} />
      <Route path="/courses/kcet-legacy" element={<Layout><KcetCourses /></Layout>} />
      <Route path="/courses/foundation-legacy" element={<Layout><FoundationCourses /></Layout>} />

      {/* Extra Content Routes */}
      <Route path="/blog/:id" element={<Layout><BlogDetail /></Layout>} />
      <Route path="/videos" element={<PageMeta title="Videos | Centum Academy" path="/videos"><Layout><Videos /></Layout></PageMeta>} />
      <Route path="/achievers" element={<PageMeta title="Achievers | Centum Academy" path="/achievers"><Layout><Achievers /></Layout></PageMeta>} />
      <Route path="/contributions" element={<PageMeta title="Contributions | Centum Academy" path="/contributions"><Layout><Contributions /></Layout></PageMeta>} />

      {/* Auth Routes */}
      <Route path="/login" element={<PageMeta title="Login | Centum Academy" path="/login"><Login /></PageMeta>} />
      <Route path="/signup" element={<PageMeta title="Sign Up | Centum Academy" path="/signup"><Signup /></PageMeta>} />
      <Route path="/change-password" element={<PageMeta title="Change Password | Centum Academy" path="/change-password"><ChangePassword /></PageMeta>} />
      <Route path="/unauthorized" element={<PageMeta title="Unauthorized | Centum Academy" path="/unauthorized"><Layout><Unauthorized /></Layout></PageMeta>} />
    </>
  );
};
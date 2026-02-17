import { Route } from 'react-router-dom';
import Layout from '../components/layout/Layout';

// Auth pages
import { Login, Signup, ChangePassword, Unauthorized } from '../auth';

// Public pages
import { 
  Home, 
  About, 
  Contact, 
  Courses, 
  Announcements,
  VisionMission,
  Founders,
  Associations,
  Innovations, 
  JeeMains,
  JeeAdvance,
  NeetCourses,
  KcetCourses,
  FoundationCourses
} from '../public';

// Import New Detail Pages
import ClassBuzzDetail from '../public/pages/ClassBuzzDetail';
import MindgaugeDetail from '../public/pages/MindgaugeDetail';
import LearnWithDashDetail from '../public/pages/LearnWithDashDetail';
import CentumAiQuDetail from '../public/pages/CentumAiQuDetail';
import Library from '../public/pages/Library'; // Import Library Page

// Import the new Dynamic Template
import CourseDetail from '../public/pages/CourseDetail';

// Content pages
import { Blogs, BlogDetail, Videos, Achievers, StudentSuccess, Contributions } from '../content';

export const SiteRoutes = () => {
  return (
    <>
      {/* Public Routes with Layout */}
      <Route path="/" element={<Layout><Home /></Layout>} />
      <Route path="/about" element={<Layout><About /></Layout>} />
      <Route path="/vision-mission" element={<Layout><VisionMission /></Layout>} />
      <Route path="/founders" element={<Layout><Founders /></Layout>} />
      <Route path="/associations" element={<Layout><Associations /></Layout>} />
      <Route path="/ai-innovation" element={<Layout><Innovations /></Layout>} />
      
      {/* --- INNOVATION DETAIL ROUTES --- */}
      <Route path="/ai-innovation/class-buzz" element={<Layout><ClassBuzzDetail /></Layout>} />
      <Route path="/ai-innovation/mindgauge" element={<Layout><MindgaugeDetail /></Layout>} />
      <Route path="/ai-innovation/learn-with-dash" element={<Layout><LearnWithDashDetail /></Layout>} />
      <Route path="/ai-innovation/centum-aiqu" element={<Layout><CentumAiQuDetail /></Layout>} />
      
      {/* --- NEW LIBRARY ROUTE --- */}
      <Route path="/library" element={<Layout><Library /></Layout>} />

      <Route path="/contact" element={<Layout><Contact /></Layout>} />
      
      {/* Announcements */}
      <Route path="/announcements" element={<Layout><Announcements /></Layout>} />
      
      {/* Main Course Listing */}
      <Route path="/courses" element={<Layout><Courses /></Layout>} />
      
      {/* --- DYNAMIC COURSE TEMPLATE (Matches Slug or ID) --- */}
      <Route path="/courses/:slug" element={<Layout><CourseDetail /></Layout>} />
      
      {/* Legacy Specific Pages */}
      <Route path="/courses/jee-mains-legacy" element={<Layout><JeeMains /></Layout>} />
      <Route path="/courses/jee-advance-legacy" element={<Layout><JeeAdvance /></Layout>} />
      <Route path="/courses/neet-legacy" element={<Layout><NeetCourses /></Layout>} />
      <Route path="/courses/kcet-legacy" element={<Layout><KcetCourses /></Layout>} />
      <Route path="/courses/foundation-legacy" element={<Layout><FoundationCourses /></Layout>} />

      {/* Content Routes */}
      <Route path="/blogs" element={<Layout><Blogs /></Layout>} />
      <Route path="/blogs/:id" element={<Layout><BlogDetail /></Layout>} />
      <Route path="/videos" element={<Layout><Videos /></Layout>} />
      <Route path="/achievers" element={<Layout><Achievers /></Layout>} />
      <Route path="/student-success" element={<Layout><StudentSuccess /></Layout>} />
      <Route path="/contributions" element={<Layout><Contributions /></Layout>} />

      {/* Auth Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/change-password" element={<ChangePassword />} />
      <Route path="/unauthorized" element={<Layout><Unauthorized /></Layout>} />
    </>
  );
};
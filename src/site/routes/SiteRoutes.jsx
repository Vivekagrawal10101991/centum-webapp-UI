import { Route } from 'react-router-dom';
import Layout from '../components/layout/Layout';

// Auth pages
import { Login, Signup, ChangePassword, Unauthorized } from '../auth';

// Public pages
import { Home, About, Contact, Courses } from '../public';

// Content pages
import { Blogs, BlogDetail, Videos, Achievers, StudentSuccess, Contributions } from '../content';

/**
 * Site Routes Component
 * All public-facing routes for the website
 */
export const SiteRoutes = () => {
  return (
    <>
      {/* Public Routes with Layout */}
      <Route path="/" element={<Layout><Home /></Layout>} />
      <Route path="/about" element={<Layout><About /></Layout>} />
      <Route path="/contact" element={<Layout><Contact /></Layout>} />
      <Route path="/courses" element={<Layout><Courses /></Layout>} />

      {/* Content Routes with Layout */}
      <Route path="/blogs" element={<Layout><Blogs /></Layout>} />
      <Route path="/blogs/:id" element={<Layout><BlogDetail /></Layout>} />
      <Route path="/videos" element={<Layout><Videos /></Layout>} />
      <Route path="/achievers" element={<Layout><Achievers /></Layout>} />
      <Route path="/student-success" element={<Layout><StudentSuccess /></Layout>} />
      <Route path="/contributions" element={<Layout><Contributions /></Layout>} />

      {/* Auth Routes (no layout for login/signup) */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/change-password" element={<ChangePassword />} />
      <Route path="/unauthorized" element={<Layout><Unauthorized /></Layout>} />
    </>
  );
};

import { Route } from 'react-router-dom';
import Layout from '../components/layout/Layout';
// Ensure 'Careers' and 'Announcements' are in the import list below
import { Home, About, Contact, Courses, Careers, Announcements } from '../public'; 

/**
 * Public Routes
 * Routes for main public pages (with Layout)
 */
export const publicRoutes = (
  <>
    <Route path="/" element={<Layout><Home /></Layout>} />
    <Route path="/about" element={<Layout><About /></Layout>} />
    <Route path="/contact" element={<Layout><Contact /></Layout>} />
    <Route path="/courses" element={<Layout><Courses /></Layout>} />
    <Route path="/careers" element={<Layout><Careers /></Layout>} />
    <Route path="/announcements" element={<Layout><Announcements /></Layout>} />
  </>
);
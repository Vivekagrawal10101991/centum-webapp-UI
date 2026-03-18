import { Route } from 'react-router-dom';
import Layout from '../components/layout/Layout';
// Added IitFoundation and NeetFoundation to the import list below
import { Home, About, Contact, Courses, Careers, Announcements, IitFoundation, NeetFoundation } from '../public'; 

/**
 * Public Routes
 * Routes for main public pages (with Layout)
 */
export const publicRoutes = (
  <>
    <Route path="/" element={<Layout><Home /></Layout>} />
    <Route path="/about" element={<Layout><About /></Layout>} />
    <Route path="/contact" element={<Layout><Contact /></Layout>} />
    
    <Route path="/program" element={<Layout><Courses /></Layout>} />
    
    {/* NEW ROUTING FOR FOUNDATION COACHING PAGES - MUST BE ABOVE THE DYNAMIC ROUTE */}
    <Route path="/program/iit-foundation-coaching-bangalore" element={<Layout><IitFoundation /></Layout>} />
    <Route path="/program/neet-foundation-coaching-bangalore" element={<Layout><NeetFoundation /></Layout>} />
    
    {/* Dynamic route to handle specific programs like /program/IIT-JEE */}
    <Route path="/program/:programId" element={<Layout><Courses /></Layout>} />
    
    <Route path="/careers" element={<Layout><Careers /></Layout>} />
    <Route path="/announcements" element={<Layout><Announcements /></Layout>} />
  </>
);
import { Route, Navigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
// Added IitFoundation and NeetFoundation to the import list below
import { Home, About, Contact, Courses, Careers, Announcements, IitFoundation, NeetFoundation } from '../public'; 
import PageMeta from '../../components/common/PageMeta';

// Centralized SEO Data Mapping
const seoData = {
  home: {
    title: "Best Coaching Centre in Bangalore for JEE & NEET | Centum Academy",
    description: "Centum Academy is a leading coaching centre in Bangalore offering JEE, NEET & Foundation classes with expert faculty, mentoring & proven results.",
    path: "/"
  },
  iitJee: {
    title: "IIT JEE Coaching in Bangalore | JEE Main & Advanced",
    description: "Expert IIT JEE coaching in Bangalore for JEE Main & Advanced. Concept-focused teaching, personalised mentoring & proven results. Enrol at Centum Academy.",
    path: "/program/iit-jee-coaching-bangalore"
  },
  neet: {
    title: "NEET Coaching in Bangalore | Best Medical Entrance Prep",
    description: "Top NEET coaching in Bangalore with expert faculty, structured study plans, mock tests & mentoring. Prepare confidently for NEET with Centum Academy.",
    path: "/program/neet-coaching-bangalore"
  },
  foundation: {
    title: "Foundation Program in Bangalore for Class 8–10 | Centum Academy",
    description: "Join our Foundation coaching in Bangalore for Class 8–10. Build strong academic basics and prepare early for IIT JEE & NEET success.",
    path: "/program/foundation-coaching-bangalore"
  },
  iitFoundation: {
    title: "IIT Foundation Coaching in Bangalore for Class 8, 9 & 10",
    description: "IIT Foundation coaching in Bangalore for Class 8, 9 & 10. Build strong Maths & Science basics and start early IIT JEE preparation with Centum Academy.",
    path: "/program/iit-foundation-coaching-bangalore"
  },
  neetFoundation: {
    title: "NEET Foundation Coaching in Bangalore for Class 8, 9 & 10",
    description: "NEET Foundation coaching in Bangalore for Class 8, 9 & 10. Build strong Biology, Physics & Chemistry basics and prepare early for medical entrance exams.",
    path: "/program/neet-foundation-coaching-bangalore"
  }
};

/**
 * Public Routes
 * Routes for main public pages (with Layout)
 */
export const publicRoutes = (
  <>
    {/* --- SEO Optimized Core Pages --- */}
    <Route path="/" element={<PageMeta {...seoData.home}><Layout><Home /></Layout></PageMeta>} />
    <Route path="/program/iit-jee-coaching-bangalore" element={<PageMeta {...seoData.iitJee}><Layout><Courses /></Layout></PageMeta>} />
    <Route path="/program/neet-coaching-bangalore" element={<PageMeta {...seoData.neet}><Layout><Courses /></Layout></PageMeta>} />
    <Route path="/program/foundation-coaching-bangalore" element={<PageMeta {...seoData.foundation}><Layout><Courses /></Layout></PageMeta>} />
    <Route path="/program/iit-foundation-coaching-bangalore" element={<PageMeta {...seoData.iitFoundation}><Layout><IitFoundation /></Layout></PageMeta>} />
    <Route path="/program/neet-foundation-coaching-bangalore" element={<PageMeta {...seoData.neetFoundation}><Layout><NeetFoundation /></Layout></PageMeta>} />

    {/* --- Old URL Redirects --- */}
    <Route path="/iit-jee-coaching-bangalore" element={<Navigate to="/program/iit-jee-coaching-bangalore" replace />} />
    <Route path="/neet-coaching-bangalore" element={<Navigate to="/program/neet-coaching-bangalore" replace />} />
    <Route path="/foundation-program-bangalore" element={<Navigate to="/program/foundation-coaching-bangalore" replace />} />
    <Route path="/iit-foundation-coaching-bangalore" element={<Navigate to="/program/iit-foundation-coaching-bangalore" replace />} />
    <Route path="/neet-foundation-coaching-bangalore" element={<Navigate to="/program/neet-foundation-coaching-bangalore" replace />} />

    {/* --- Standard Routes --- */}
    <Route path="/about" element={<PageMeta title="About Us | Centum Academy" path="/about"><Layout><About /></Layout></PageMeta>} />
    <Route path="/contact" element={<PageMeta title="Contact Us | Centum Academy" path="/contact"><Layout><Contact /></Layout></PageMeta>} />
    <Route path="/program" element={<PageMeta title="Programs | Centum Academy" path="/program"><Layout><Courses /></Layout></PageMeta>} />
    
    {/* Dynamic route to handle specific programs like /program/IIT-JEE */}
    <Route path="/program/:programId" element={<PageMeta title="Course Details | Centum Academy"><Layout><Courses /></Layout></PageMeta>} />
    
    <Route path="/careers" element={<PageMeta title="Careers | Centum Academy" path="/careers"><Layout><Careers /></Layout></PageMeta>} />
    <Route path="/announcements" element={<PageMeta title="Announcements | Centum Academy" path="/announcements"><Layout><Announcements /></Layout></PageMeta>} />
  </>
);
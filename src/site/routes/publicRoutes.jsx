import { Route } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { Home, About, Contact, Courses } from '../public';

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
  </>
);

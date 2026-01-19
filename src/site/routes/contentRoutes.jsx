import { Route } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { Blogs, Videos, Achievers, StudentSuccess, Contributions } from '../content';

/**
 * Content Routes
 * Routes for content pages (blogs, videos, etc.) with Layout
 */
export const  contentRoutes = (
  <>
    <Route path="/blogs" element={<Layout><Blogs /></Layout>} />
    <Route path="/videos" element={<Layout><Videos /></Layout>} />
    <Route path="/achievers" element={<Layout><Achievers /></Layout>} />
    <Route path="/student-success" element={<Layout><StudentSuccess /></Layout>} />
    <Route path="/contributions" element={<Layout><Contributions /></Layout>} />
  </>
);

import { Route } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { Login, Signup, ChangePassword, Unauthorized } from '../auth';

/**
 * Auth Routes
 * Routes for authentication pages
 */
export const authRoutes = (
  <>
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/change-password" element={<ChangePassword />} />
    <Route path="/unauthorized" element={<Layout><Unauthorized /></Layout>} />
  </>
);

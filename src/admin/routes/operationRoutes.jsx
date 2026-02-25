import React from 'react';
import { Route } from 'react-router-dom';
import { Inbox } from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import ProtectedRoute from '../../components/common/ProtectedRoute';
import { ROLES } from '../../utils/roles';
import OperationsDashboard from '../dashboard/operations/pages/OperationsDashboard';

/**
 * Reusable Empty State Component
 */
const EmptyState = ({ title, description }) => (
  <div className="w-full h-full min-h-[60vh] flex flex-col items-center justify-center p-8 bg-white rounded-2xl shadow-sm border border-gray-100 mt-6 animate-in fade-in zoom-in duration-300">
    <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-5 border border-slate-100 shadow-inner">
      <Inbox className="w-10 h-10 text-slate-300" />
    </div>
    <h2 className="text-2xl font-bold text-slate-900 mb-2">{title}</h2>
    <p className="text-slate-500 text-center max-w-md">{description}</p>
  </div>
);

/**
 * Operations Dashboard Routes
 */
export const operationRoutes = (
  <>
    <Route
      path="/dashboard/operations"
      element={
        <ProtectedRoute allowedRoles={[ROLES.OPERATIONS_MANAGER]}>
          <DashboardLayout>
            <OperationsDashboard />
          </DashboardLayout>
        </ProtectedRoute>
      }
    />
    
    <Route
      path="/dashboard/operations/logistics"
      element={
        <ProtectedRoute allowedRoles={[ROLES.OPERATIONS_MANAGER]}>
          <DashboardLayout>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Logistics</h1>
              <p className="text-gray-600 mb-6">Manage branch resources and supplies.</p>
              <EmptyState title="No Data" description="Logistics module is currently empty." />
            </div>
          </DashboardLayout>
        </ProtectedRoute>
      }
    />

    <Route
      path="/dashboard/operations/schedule"
      element={
        <ProtectedRoute allowedRoles={[ROLES.OPERATIONS_MANAGER]}>
          <DashboardLayout>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Schedule Management</h1>
              <p className="text-gray-600 mb-6">Manage master timetables and events.</p>
              <EmptyState title="No Schedules" description="There are no active schedules to display." />
            </div>
          </DashboardLayout>
        </ProtectedRoute>
      }
    />
  </>
);
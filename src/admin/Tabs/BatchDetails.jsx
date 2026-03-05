import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Layers, Calendar, 
  Users, BookOpen, Loader2, AlertCircle 
} from 'lucide-react';
import api from '../../services/api';

const BatchDetails = () => {
  const { batchId } = useParams();
  const navigate = useNavigate();
  const [batchData, setBatchData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBatchDetails = async () => {
      try {
        const response = await api.get(`/api/batches/${batchId}`);
        setBatchData(response.data?.data || response.data);
      } catch (err) {
        setError('Failed to load batch details. Please try again.');
        console.error("Error fetching batch details:", err);
      } finally {
        setLoading(false);
      }
    };

    if (batchId) {
      fetchBatchDetails();
    }
  }, [batchId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error || !batchData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6">
        <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
        <h2 className="text-xl font-bold text-slate-800 mb-2">Error Loading Data</h2>
        <p className="text-slate-600 mb-6">{error || 'Batch not found.'}</p>
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto animate-fade-in">
      {/* Header Section */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm text-slate-500 hover:text-blue-600 transition-colors mb-3"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Batches
          </button>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
              <Layers className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold text-slate-800">{batchData.name}</h1>
            <span className={`px-2.5 py-1 text-xs font-bold rounded-full border ${batchData.active ? 'bg-green-100 text-green-700 border-green-200' : 'bg-slate-100 text-slate-600 border-slate-200'}`}>
              {batchData.active ? 'Active' : 'Inactive'}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Info & Subjects */}
        <div className="lg:col-span-1 space-y-6">
          {/* Quick Info Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-800 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">Batch Overview</h3>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-slate-400 mt-0.5" />
                <div>
                  <p className="text-xs text-slate-500 font-medium">Academic Year</p>
                  <p className="text-sm text-slate-800 font-semibold">{batchData.academicYear || 'Not Specified'}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Users className="w-5 h-5 text-slate-400 mt-0.5" />
                <div>
                  <p className="text-xs text-slate-500 font-medium">Total Students</p>
                  <p className="text-sm text-slate-800 font-semibold">{batchData.students?.length || 0} Enrolled</p>
                </div>
              </div>
            </div>
          </div>

          {/* Subjects Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
             <div className="flex items-center gap-2 mb-4 border-b border-slate-100 pb-2">
                <BookOpen className="w-4 h-4 text-blue-600" />
                <h3 className="text-sm font-semibold text-slate-800 uppercase tracking-wider">Curriculum / Subjects</h3>
             </div>
             
             {batchData.subjects && batchData.subjects.length > 0 ? (
               <div className="flex flex-col gap-2">
                 {batchData.subjects.map(subject => (
                   <div key={subject.id} className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
                     <span className="font-medium text-slate-700">{subject.name}</span>
                     <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-md">{subject.gradeName}</span>
                   </div>
                 ))}
               </div>
             ) : (
               <div className="text-center py-6 text-slate-500 bg-slate-50 rounded-xl border border-slate-100 border-dashed">
                 <p className="text-sm">No subjects assigned yet.</p>
               </div>
             )}
          </div>
        </div>

        {/* Right Column: Students List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm h-full flex flex-col">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 rounded-t-2xl">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-slate-600" />
                <h3 className="font-semibold text-slate-800">Enrolled Students</h3>
              </div>
              <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2.5 py-1 rounded-full">
                {batchData.students?.length || 0}
              </span>
            </div>

            <div className="flex-1 overflow-auto p-0">
              {batchData.students && batchData.students.length > 0 ? (
                <table className="w-full text-left">
                  <thead className="sticky top-0 bg-white shadow-sm">
                    <tr className="text-slate-500 text-xs uppercase tracking-wider border-b border-slate-100">
                      <th className="px-6 py-3 font-semibold">Student ID</th>
                      <th className="px-6 py-3 font-semibold">Name</th>
                      <th className="px-6 py-3 font-semibold">Email</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {batchData.students.map(student => (
                      <tr key={student.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4 text-sm font-medium text-slate-600">{student.id}</td>
                        <td className="px-6 py-4 text-sm font-semibold text-slate-800">{student.name}</td>
                        <td className="px-6 py-4 text-sm text-slate-500">{student.email}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="flex flex-col items-center justify-center h-full min-h-[300px] text-slate-500 p-8 text-center">
                  <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4 border border-slate-100">
                    <Users className="w-8 h-8 text-slate-300" />
                  </div>
                  <p className="font-medium text-slate-700 text-lg">No Students Enrolled</p>
                  <p className="text-sm mt-1 max-w-sm">There are currently no students assigned to this batch. You can assign students from the LMS Center or Admission module.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BatchDetails;
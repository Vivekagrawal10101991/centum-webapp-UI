import React, { useState, useEffect } from 'react';
import { Search, Filter, Download, Trash2, Eye, MoreVertical, CheckCircle, Clock, XCircle } from 'lucide-react';
import { Card } from '../../components/common';
import toast from 'react-hot-toast';
import { leadsService } from '../services/leadsService';

const LeadsEnquiries = () => {
  const [activeTab, setActiveTab] = useState('admission');
  const [searchTerm, setSearchTerm] = useState('');
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data on component mount
  useEffect(() => {
    fetchEnquiries();
  }, []);

  const fetchEnquiries = async () => {
    try {
      setLoading(true);
      const data = await leadsService.getAllEnquiries();
      // Ensure data is an array before setting
      setEnquiries(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching enquiries:', error);
      toast.error('Failed to load enquiries');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await leadsService.updateStatus(id, newStatus);
      
      // Update local state
      setEnquiries(prev => prev.map(item => 
        item.id === id ? { ...item, status: newStatus } : item
      ));
      
      toast.success(`Status updated to ${newStatus}`);
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Failed to update status');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this enquiry?')) return;

    try {
      await leadsService.deleteEnquiry(id);
      
      // Remove from local state
      setEnquiries(prev => prev.filter(item => item.id !== id));
      
      toast.success('Enquiry deleted successfully');
    } catch (error) {
      console.error('Error deleting enquiry:', error);
      toast.error('Failed to delete enquiry');
    }
  };

  // Filter based on active tab and search term
  const filteredEnquiries = enquiries.filter(item => {
    // 1. Tab Filtering
    let tabMatch = true;
    const interest = item.courseInterest || '';
    
    if (activeTab === 'brochure') {
      tabMatch = interest === 'Brochure Download';
    } else if (activeTab === 'contact') {
      tabMatch = interest.toLowerCase().includes('contact') || interest.toLowerCase() === 'general inquiry';
    } else {
      // Admission tab: Exclude Brochure and Contact forms
      tabMatch = interest !== 'Brochure Download' && !interest.toLowerCase().includes('contact') && interest.toLowerCase() !== 'general inquiry';
    }

    // 2. Search Filtering
    const searchLower = searchTerm.toLowerCase();
    const searchMatch = 
      item.studentName?.toLowerCase().includes(searchLower) ||
      item.email?.toLowerCase().includes(searchLower) ||
      item.phoneNumber?.includes(searchTerm);

    return tabMatch && searchMatch;
  });

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'contacted': return 'bg-yellow-100 text-yellow-800';
      case 'enrolled': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-blue-50 text-blue-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Leads & Enquiries</h1>
          <p className="text-gray-500">Manage contact requests, admissions, and brochure downloads</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex gap-6 overflow-x-auto">
          <button
            onClick={() => setActiveTab('admission')}
            className={`pb-4 px-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'admission'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Admission Enquiries
          </button>
          <button
            onClick={() => setActiveTab('contact')}
            className={`pb-4 px-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'contact'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Contact Form Submissions
          </button>
          <button
            onClick={() => setActiveTab('brochure')}
            className={`pb-4 px-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'brochure'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Brochure Downloads
          </button>
        </nav>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by name, email or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <select className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-600">
              <option value="">All Status</option>
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="enrolled">Enrolled</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Student Info
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Contact Info
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Source / Interest
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                    Loading enquiries...
                  </td>
                </tr>
              ) : filteredEnquiries.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                    No records found for {activeTab === 'brochure' ? 'Brochure Downloads' : activeTab === 'contact' ? 'Contact Submissions' : 'Admission Enquiries'}.
                  </td>
                </tr>
              ) : (
                filteredEnquiries.map((enquiry) => (
                  <tr key={enquiry.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-lg">
                          {enquiry.studentName?.charAt(0) || 'S'}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{enquiry.studentName}</div>
                          <div className="text-xs text-gray-500">{enquiry.location || 'Location N/A'}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{enquiry.email}</div>
                      <div className="text-sm text-gray-500">{enquiry.phoneNumber}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 font-medium">{enquiry.courseInterest}</div>
                      {enquiry.message && (
                        <div className="text-xs text-gray-500 truncate max-w-xs mt-1" title={enquiry.message}>
                          {enquiry.message}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {new Date(enquiry.createdAt || Date.now()).toLocaleDateString()}
                      </div>
                      <div className="text-xs text-gray-500">
                        {new Date(enquiry.createdAt || Date.now()).toLocaleTimeString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={enquiry.status || 'New'}
                        onChange={(e) => handleStatusUpdate(enquiry.id, e.target.value)}
                        className={`text-xs font-semibold px-2.5 py-1 rounded-full border-0 cursor-pointer focus:ring-2 focus:ring-offset-1 outline-none ${getStatusColor(enquiry.status)}`}
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Enrolled">Enrolled</option>
                        <option value="Closed">Closed</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => handleDelete(enquiry.id)}
                          className="text-red-400 hover:text-red-600 p-1 hover:bg-red-50 rounded transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LeadsEnquiries;
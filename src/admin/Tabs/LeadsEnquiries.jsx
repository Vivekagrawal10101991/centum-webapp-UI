import { useState } from 'react';
import { Search, Filter, Download, Eye, Mail, Phone, Calendar, X } from 'lucide-react';

export default function LeadsEnquiries() {
  const [activeSubTab, setActiveSubTab] = useState('contact');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedLead, setSelectedLead] = useState(null);

  const [contacts, setContacts] = useState([
    {
      id: 1,
      name: 'Ramesh Gupta',
      email: 'ramesh@example.com',
      phone: '+91 98765 43210',
      message: 'I want to know about JEE 2026 batch fees and schedule',
      submittedAt: '2026-01-10 10:30 AM',
      status: 'New',
      source: 'Contact Form',
    },
    {
      id: 2,
      name: 'Sunita Sharma',
      email: 'sunita@example.com',
      phone: '+91 98765 43211',
      message: 'My daughter is interested in NEET preparation. Please share details.',
      submittedAt: '2026-01-09 03:45 PM',
      status: 'Contacted',
      source: 'Contact Form',
    },
    {
      id: 3,
      name: 'Vikram Singh',
      email: 'vikram@example.com',
      phone: '+91 98765 43212',
      message: 'Need information about Foundation courses for Class 9',
      submittedAt: '2026-01-09 11:20 AM',
      status: 'Contacted',
      source: 'WhatsApp',
    },
  ]);

  const [admissions, setAdmissions] = useState([
    {
      id: 1,
      studentName: 'Rahul Kumar',
      parentName: 'Rajesh Kumar',
      email: 'rajesh@example.com',
      phone: '+91 98765 54321',
      course: 'JEE Mains 2026',
      class: '11th',
      preferredBatch: 'Morning Batch',
      enquiryDate: '2026-01-10',
      status: 'New',
      notes: '',
    },
    {
      id: 2,
      studentName: 'Priya Patel',
      parentName: 'Amit Patel',
      email: 'amit@example.com',
      phone: '+91 98765 54322',
      course: 'NEET 2026',
      class: '12th',
      preferredBatch: 'Evening Batch',
      enquiryDate: '2026-01-09',
      status: 'Follow-up',
      notes: 'Interested, asked for demo class',
    },
    {
      id: 3,
      studentName: 'Aarav Mehta',
      parentName: 'Deepak Mehta',
      email: 'deepak@example.com',
      phone: '+91 98765 54323',
      course: 'Foundation Course',
      class: '9th',
      preferredBatch: 'Weekend Batch',
      enquiryDate: '2026-01-08',
      status: 'Enrolled',
      notes: 'Enrolled in Foundation batch starting Jan 15',
    },
  ]);

  const updateContactStatus = (id) => {
    setContacts(contacts.map(c => c.id === id ? { ...c, status } : c));
  };

  const updateAdmissionStatus = (id) => {
    setAdmissions(admissions.map(a => a.id === id ? { ...a, status } : a));
  };

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.phone.includes(searchTerm);
    const matchesFilter = filterStatus === 'all' || contact.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const filteredAdmissions = admissions.filter(admission => {
    const matchesSearch = admission.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admission.parentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admission.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admission.phone.includes(searchTerm);
    const matchesFilter = filterStatus === 'all' || admission.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'New':
        return 'bg-green-100 text-green-700';
      case 'Contacted':
      case 'Follow-up':
        return 'bg-blue-100 text-blue-700';
      case 'Converted':
      case 'Enrolled':
        return 'bg-purple-100 text-purple-700';
      case 'Closed':
      case 'Not Interested':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Leads & Enquiries</h2>
        <p className="text-gray-600 mt-1">Manage contact requests and admission enquiries</p>
      </div>

      {/* Sub Tabs */}
      <div className="flex gap-4 mb-6 border-b border-gray-200">
        <button
          onClick={() => {
            setActiveSubTab('contact');
            setFilterStatus('all');
            setSearchTerm('');
          }}
          className={`pb-3 px-4 font-medium transition-colors ${
            activeSubTab === 'contact'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          Contact Form Submissions
        </button>
        <button
          onClick={() => {
            setActiveSubTab('admission');
            setFilterStatus('all');
            setSearchTerm('');
          }}
          className={`pb-3 px-4 font-medium transition-colors ${
            activeSubTab === 'admission'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          Admission Enquiries 2026-27
        </button>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name, email, or phone..."
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {activeSubTab === 'contact' ? (
                <>
                  <option value="all">All Status</option>
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Converted">Converted</option>
                  <option value="Closed">Closed</option>
                </>
              ) : (
                <>
                  <option value="all">All Status</option>
                  <option value="New">New</option>
                  <option value="Follow-up">Follow-up</option>
                  <option value="Enrolled">Enrolled</option>
                  <option value="Not Interested">Not Interested</option>
                </>
              )}
            </select>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>
      </div>

      {/* Contact Form Submissions Tab */}
      {activeSubTab === 'contact' && (
        <div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-4">
            <div className="p-4 border-b border-gray-200 bg-gray-50">
              <div className="grid grid-cols-5 gap-4 text-sm font-medium text-gray-700">
                <div>Contact Info</div>
                <div>Message</div>
                <div>Source</div>
                <div>Date & Time</div>
                <div>Status/Actions</div>
              </div>
            </div>
            <div className="divide-y divide-gray-200">
              {filteredContacts.map((contact) => (
                <div key={contact.id} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="grid grid-cols-5 gap-4">
                    <div>
                      <p className="font-medium text-gray-800">{contact.name}</p>
                      <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
                        <Mail className="w-3 h-3" />
                        {contact.email}
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Phone className="w-3 h-3" />
                        {contact.phone}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-700 line-clamp-3">{contact.message}</p>
                      <button
                        onClick={() => setSelectedLead(contact)}
                        className="text-blue-600 text-xs hover:underline mt-1 flex items-center gap-1"
                      >
                        <Eye className="w-3 h-3" />
                        View Full
                      </button>
                    </div>
                    <div>
                      <span className="inline-block px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                        {contact.source}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {contact.submittedAt}
                      </div>
                    </div>
                    <div>
                      <select
                        value={contact.status}
                        onChange={(e) => updateContactStatus(contact.id, e.target.value)}
                        className={`w-full px-3 py-1 rounded text-sm font-medium ${getStatusColor(contact.status)}`}
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Converted">Converted</option>
                        <option value="Closed">Closed</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {filteredContacts.length === 0 && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
              <p className="text-gray-500">No contact submissions found</p>
            </div>
          )}
        </div>
      )}

      {/* Admission Enquiries Tab */}
      {activeSubTab === 'admission' && (
        <div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-4">
            <div className="p-4 border-b border-gray-200 bg-gray-50">
              <div className="grid grid-cols-6 gap-4 text-sm font-medium text-gray-700">
                <div>Student Info</div>
                <div>Parent Info</div>
                <div>Course Details</div>
                <div>Preferred Batch</div>
                <div>Enquiry Date</div>
                <div>Status/Actions</div>
              </div>
            </div>
            <div className="divide-y divide-gray-200">
              {filteredAdmissions.map((admission) => (
                <div key={admission.id} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="grid grid-cols-6 gap-4">
                    <div>
                      <p className="font-medium text-gray-800">{admission.studentName}</p>
                      <p className="text-sm text-gray-600">Class {admission.class}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-700">{admission.parentName}</p>
                      <div className="flex items-center gap-1 text-xs text-gray-600 mt-1">
                        <Mail className="w-3 h-3" />
                        {admission.email}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-600">
                        <Phone className="w-3 h-3" />
                        {admission.phone}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">{admission.course}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-700">{admission.preferredBatch}</p>
                    </div>
                    <div className="text-sm text-gray-600">{admission.enquiryDate}</div>
                    <div>
                      <select
                        value={admission.status}
                        onChange={(e) => updateAdmissionStatus(admission.id, e.target.value)}
                        className={`w-full px-3 py-1 rounded text-sm font-medium mb-2 ${getStatusColor(admission.status)}`}
                      >
                        <option value="New">New</option>
                        <option value="Follow-up">Follow-up</option>
                        <option value="Enrolled">Enrolled</option>
                        <option value="Not Interested">Not Interested</option>
                      </select>
                      <button
                        onClick={() => setSelectedLead(admission)}
                        className="text-blue-600 text-xs hover:underline flex items-center gap-1"
                      >
                        <Eye className="w-3 h-3" />
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {filteredAdmissions.length === 0 && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
              <p className="text-gray-500">No admission enquiries found</p>
            </div>
          )}
        </div>
      )}

      {/* Detail Modal */}
      {selectedLead && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-800">
                {activeSubTab === 'contact' ? 'Contact Details' : 'Admission Enquiry Details'}
              </h3>
              <button
                onClick={() => setSelectedLead(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6">
              {activeSubTab === 'contact' && 'message' in selectedLead && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <p className="text-gray-900">{selectedLead.name}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <p className="text-gray-900">{selectedLead.email}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                      <p className="text-gray-900">{selectedLead.phone}</p>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                    <p className="text-gray-900 bg-gray-50 p-4 rounded">{selectedLead.message}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Source</label>
                      <p className="text-gray-900">{selectedLead.source}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Submitted</label>
                      <p className="text-gray-900">{selectedLead.submittedAt}</p>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <span className={`inline-block px-3 py-1 rounded text-sm font-medium ${getStatusColor(selectedLead.status)}`}>
                      {selectedLead.status}
                    </span>
                  </div>
                </div>
              )}

              {activeSubTab === 'admission' && 'studentName' in selectedLead && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Student Name</label>
                      <p className="text-gray-900">{selectedLead.studentName}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
                      <p className="text-gray-900">{selectedLead.class}</p>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Parent Name</label>
                    <p className="text-gray-900">{selectedLead.parentName}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <p className="text-gray-900">{selectedLead.email}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                      <p className="text-gray-900">{selectedLead.phone}</p>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Course</label>
                    <p className="text-gray-900">{selectedLead.course}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Batch</label>
                    <p className="text-gray-900">{selectedLead.preferredBatch}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Enquiry Date</label>
                    <p className="text-gray-900">{selectedLead.enquiryDate}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <span className={`inline-block px-3 py-1 rounded text-sm font-medium ${getStatusColor(selectedLead.status)}`}>
                      {selectedLead.status}
                    </span>
                  </div>
                  {selectedLead.notes && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                      <p className="text-gray-900 bg-gray-50 p-4 rounded">{selectedLead.notes}</p>
                    </div>
                  )}
                </div>
              )}

              <div className="mt-6 flex gap-3">
                <a
                  href={`mailto:${selectedLead.email}`}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  Send Email
                </a>
                <a
                  href={`tel:${selectedLead.phone}`}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  Call Now
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

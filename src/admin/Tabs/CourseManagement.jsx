import { useState, useEffect } from 'react';
import { 
  Plus, Edit2, Trash2, Loader2, 
  Search, BookOpen, IndianRupee, Tag, Layout, FileText, X, GraduationCap 
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { cmsService } from '../services/cmsService';

// ✅ IMPORT REACT QUILL (Rich Text Editor)
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

export default function CourseManagement() {
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modals & Forms
  const [showCourseForm, setShowCourseForm] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);

  // --- EDITOR CONFIGURATION ---
  const quillModules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['blockquote', 'code-block'],
      [{ 'color': [] }, { 'background': [] }],
      ['link'],
      ['clean']
    ],
  };

  const quillFormats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet',
    'blockquote', 'code-block',
    'color', 'background',
    'link'
  ];

  // Form State
  const initialFormState = {
    title: '',
    category: 'regular',
    tag: '',
    program: '', // <--- NEW STATE FIELD
    shortDescription: '',
    slug: '',
    details: {
      about: '', 
      curriculum: [
        { subject: 'Physics', topics: '' },
        { subject: 'Chemistry', topics: '' },
        { subject: 'Mathematics', topics: '' }
      ],
      price: {
        original: 0,
        discounted: 0,
        currency: 'INR'
      }
    }
  };

  const [courseForm, setCourseForm] = useState(initialFormState);

  // Diverse gradients for the course cards
  const cardGradients = [
    "from-blue-600 to-indigo-700",
    "from-emerald-500 to-teal-700",
    "from-purple-500 to-fuchsia-700",
    "from-orange-500 to-red-600",
    "from-pink-500 to-rose-700",
    "from-cyan-500 to-blue-700"
  ];

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const data = await cmsService.getCourses();
      setCourses(Array.isArray(data) ? data : []);
    } catch (error) {
      toast.error("Failed to fetch courses");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveCourse = async () => {
    // Validation
    if (!courseForm.title || !courseForm.slug || !courseForm.program) {
      toast.error("Title, Slug, and Program are required");
      return;
    }

    try {
      setLoading(true);
      const payload = {
        ...courseForm,
        details: {
          ...courseForm.details,
          curriculum: courseForm.details.curriculum.map(c => ({
            ...c,
            topics: typeof c.topics === 'string' ? c.topics.split(',').map(t => t.trim()).filter(t => t !== '') : c.topics
          }))
        }
      };

      if (editingCourse) {
        await cmsService.updateCourse(editingCourse.id, payload);
        toast.success("Course updated successfully");
      } else {
        await cmsService.addCourse(payload);
        toast.success("Course added successfully");
      }
      setShowCourseForm(false);
      fetchCourses();
    } catch (error) {
      console.error(error);
      toast.error(typeof error === 'string' ? error : "Failed to save course");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this course? This action cannot be undone.")) return;
    try {
      await cmsService.deleteCourse(id);
      toast.success("Course deleted");
      fetchCourses();
    } catch (error) {
      toast.error("Failed to delete course");
    }
  };

  const openEdit = (course) => {
    setEditingCourse(course);
    const formattedCourse = {
      ...course,
      program: course.program || '', // Ensure program is mapped
      details: {
        ...course.details,
        about: course.details?.about || '',
        curriculum: course.details.curriculum.map(c => ({
          ...c,
          topics: Array.isArray(c.topics) ? c.topics.join(', ') : c.topics
        }))
      }
    };
    setCourseForm(formattedCourse);
    setShowCourseForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addCurriculumItem = () => {
    setCourseForm({
      ...courseForm,
      details: {
        ...courseForm.details,
        curriculum: [
          ...courseForm.details.curriculum,
          { subject: '', topics: '' }
        ]
      }
    });
  };

  const removeCurriculumItem = (index) => {
    const newCurriculum = courseForm.details.curriculum.filter((_, i) => i !== index);
    setCourseForm({
      ...courseForm,
      details: {
        ...courseForm.details,
        curriculum: newCurriculum
      }
    });
  };

  const updateCurriculumItem = (index, field, value) => {
    const newCurriculum = [...courseForm.details.curriculum];
    newCurriculum[index][field] = value;
    setCourseForm({
      ...courseForm,
      details: {
        ...courseForm.details,
        curriculum: newCurriculum
      }
    });
  };

  const filteredCourses = courses.filter(course => 
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.tag?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.program?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 tracking-tight">Course Management</h2>
          <p className="text-gray-500 text-sm mt-1">Create and manage your academic programs</p>
        </div>
        <div className="flex gap-3">
          {!showCourseForm && (
            <button
              onClick={() => {
                setCourseForm(initialFormState);
                setEditingCourse(null);
                setShowCourseForm(true);
              }}
              className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition-all shadow-md hover:shadow-lg font-medium"
            >
              <Plus className="w-4 h-4" /> 
              Add New Course
            </button>
          )}
        </div>
      </div>

      {showCourseForm ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="border-b border-gray-100 bg-gray-50/50 p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                {editingCourse ? <Edit2 className="w-5 h-5 text-blue-600" /> : <Plus className="w-5 h-5 text-blue-600" />}
                {editingCourse ? 'Edit Course Details' : 'Create New Course'}
              </h3>
              <button 
                onClick={() => setShowCourseForm(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
          
          <div className="p-6 space-y-8">
            {/* Section 1: Basic Information */}
            <section>
              <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                <Layout className="w-4 h-4" /> Basic Information
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Course Title <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    value={courseForm.title}
                    onChange={(e) => setCourseForm({ ...courseForm, title: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                    placeholder="e.g. JEE MAIN + ADV 2026"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">URL Slug <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    value={courseForm.slug}
                    onChange={(e) => setCourseForm({ ...courseForm, slug: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all bg-gray-50"
                    placeholder="e.g. jee-main-2026"
                  />
                </div>

                {/* --- PROGRAM DROPDOWN (NEW) --- */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Program <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <select
                      value={courseForm.program}
                      onChange={(e) => setCourseForm({ ...courseForm, program: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all appearance-none bg-white"
                    >
                      <option value="">Select Program</option>
                      <option value="IIT JEE">IIT JEE</option>
                      <option value="NEET">NEET</option>
                      <option value="FOUNDATION">FOUNDATION</option>
                    </select>
                    <div className="absolute right-3 top-3 pointer-events-none text-gray-500">
                      <GraduationCap className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* --- UPDATED TAG DROPDOWN --- */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Badge / Tag</label>
                  <div className="relative">
                    <select
                      value={courseForm.tag}
                      onChange={(e) => setCourseForm({ ...courseForm, tag: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all appearance-none bg-white"
                    >
                      <option value="">No Tag</option>
                      <option value="Weekends">Weekends</option>
                      <option value="School integrated Programs">School integrated Programs</option>
                    </select>
                    <div className="absolute right-3 top-3 pointer-events-none text-gray-500">
                      <Tag className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* --- UPDATED CATEGORY (Foundation Removed) --- */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Category</label>
                  <div className="relative">
                    <select
                      value={courseForm.category}
                      onChange={(e) => setCourseForm({ ...courseForm, category: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all appearance-none bg-white"
                    >
                      <option value="regular">Regular Program</option>
                      <option value="crash-course">Crash Course</option>
                      <option value="test-series">Test Series</option>
                    </select>
                    <div className="absolute right-3 top-3 pointer-events-none text-gray-500">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-2 space-y-2">
                  <label className="text-sm font-medium text-gray-700">Short Description</label>
                  <textarea
                    value={courseForm.shortDescription}
                    onChange={(e) => setCourseForm({ ...courseForm, shortDescription: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all resize-y min-h-[80px]"
                    placeholder="Brief overview of the course (for cards)..."
                  />
                </div>
              </div>
            </section>

            <hr className="border-gray-100" />

            {/* Section 2: Pricing */}
            <section>
              <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                <IndianRupee className="w-4 h-4" /> Pricing Information
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Original Price (₹)</label>
                  <div className="relative">
                    <input
                      type="number"
                      value={courseForm.details.price.original}
                      onChange={(e) => setCourseForm({ 
                        ...courseForm, 
                        details: { ...courseForm.details, price: { ...courseForm.details.price, original: parseInt(e.target.value) || 0 } } 
                      })}
                      className="w-full pl-8 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                    />
                    <span className="absolute left-3 top-2.5 text-gray-400">₹</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Discounted Price (₹)</label>
                  <div className="relative">
                    <input
                      type="number"
                      value={courseForm.details.price.discounted}
                      onChange={(e) => setCourseForm({ 
                        ...courseForm, 
                        details: { ...courseForm.details, price: { ...courseForm.details.price, discounted: parseInt(e.target.value) || 0 } } 
                      })}
                      className="w-full pl-8 pr-4 py-2.5 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500/20 focus:border-green-500 outline-none text-green-700 font-semibold"
                    />
                    <span className="absolute left-3 top-2.5 text-green-600">₹</span>
                  </div>
                </div>
              </div>
            </section>

            <hr className="border-gray-100" />

            {/* Section 3: About Course */}
            <section>
              <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                <FileText className="w-4 h-4" /> About Course (Detailed Overview)
              </h4>
              <div className="space-y-2">
                <div className="bg-white">
                  <ReactQuill
                    theme="snow"
                    value={courseForm.details.about}
                    onChange={(content) => setCourseForm({ 
                      ...courseForm, 
                      details: { ...courseForm.details, about: content } 
                    })}
                    modules={quillModules}
                    formats={quillFormats}
                    className="h-64 mb-12"
                    placeholder="Enter the full course description..."
                  />
                </div>
              </div>
            </section>

            <hr className="border-gray-100" />

            {/* Section 4: Curriculum */}
            <section>
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                  <BookOpen className="w-4 h-4" /> Curriculum Details
                </h4>
                <button
                  type="button"
                  onClick={addCurriculumItem}
                  className="text-xs flex items-center gap-1 bg-blue-50 text-blue-600 px-3 py-1.5 rounded-lg hover:bg-blue-100 font-medium transition-colors border border-blue-200"
                >
                  <Plus className="w-3 h-3" /> Add Subject
                </button>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 space-y-4">
                {courseForm.details.curriculum.map((item, index) => (
                  <div key={index} className="flex flex-col md:flex-row gap-4 items-start bg-white p-4 rounded-lg border border-gray-200 shadow-sm group">
                    <div className="w-full md:w-1/3 space-y-1">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Subject Name</label>
                      <input
                        type="text"
                        value={item.subject}
                        onChange={(e) => updateCurriculumItem(index, 'subject', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none text-sm font-medium"
                      />
                    </div>
                    <div className="flex-1 w-full space-y-1">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Topics</label>
                      <input
                        type="text"
                        value={item.topics}
                        onChange={(e) => updateCurriculumItem(index, 'topics', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none text-sm"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeCurriculumItem(index)}
                      className="md:mt-6 p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-end gap-3">
            <button 
              type="button"
              onClick={() => setShowCourseForm(false)} 
              className="px-6 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-100"
            >
              Cancel
            </button>
            <button 
              type="button"
              onClick={handleSaveCourse} 
              disabled={loading}
              className="px-6 py-2.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-all flex items-center gap-2"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              {editingCourse ? 'Update Course' : 'Publish Course'}
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl outline-none"
            />
            <Search className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course, index) => (
                <div key={course.id} className="group bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full">
                  <div className={`relative h-28 bg-gradient-to-br ${cardGradients[index % cardGradients.length]} flex items-center justify-center p-4`}>
                    <div className="absolute top-3 left-3 flex flex-col gap-1">
                      <span className="px-2 py-0.5 bg-white/20 text-white text-[10px] font-bold rounded uppercase tracking-wide border border-white/30">
                        {course.program || 'N/A'}
                      </span>
                      {course.tag && (
                        <span className="px-2 py-0.5 bg-yellow-400 text-black text-[10px] font-bold rounded uppercase tracking-wide">
                          {course.tag}
                        </span>
                      )}
                    </div>
                    <h4 className="text-white font-bold text-center z-10 line-clamp-2">{course.title}</h4>
                  </div>

                  <div className="p-5 flex-1 flex flex-col">
                    <p className="text-sm text-gray-600 line-clamp-3 mb-4">{course.shortDescription}</p>
                    <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-[10px] text-gray-400 font-bold uppercase">Price</span>
                        <span className="text-lg font-black text-gray-900">₹{course.details?.price?.discounted?.toLocaleString()}</span>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => openEdit(course)} className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(course.id)} className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
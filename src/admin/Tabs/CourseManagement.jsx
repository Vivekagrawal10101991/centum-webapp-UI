import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Image as ImageIcon, Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { cmsService } from '../services/cmsService';
import ImagePicker from '../components/ImagePicker';

export default function CourseManagement() {
  const [activeSubTab, setActiveSubTab] = useState('courses');
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState([]);
  
  // Modals
  const [showCourseForm, setShowCourseForm] = useState(false);
  const [isImagePickerOpen, setIsImagePickerOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);

  // Form State
  const initialFormState = {
    title: '',
    category: 'regular',
    tag: '',
    shortDescription: '',
    slug: '',
    imageUrl: '',
    details: {
      about: '',
      curriculum: [
        { subject: 'Physics', topics: '' },
        { subject: 'Chemistry', topics: '' },
        { subject: 'Math', topics: '' }
      ],
      price: {
        original: 0,
        discounted: 0,
        currency: 'INR'
      }
    }
  };

  const [courseForm, setCourseForm] = useState(initialFormState);

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
    try {
      // Transform topics from comma-separated string to array for backend
      const payload = {
        ...courseForm,
        details: {
          ...courseForm.details,
          curriculum: courseForm.details.curriculum.map(c => ({
            ...c,
            topics: typeof c.topics === 'string' ? c.topics.split(',').map(t => t.trim()) : c.topics
          }))
        }
      };

      if (editingCourse) {
        // Ensure we pass the ID explicitly to the service
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
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;
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
    // Flatten topics back to string for the input field
    const formattedCourse = {
      ...course,
      details: {
        ...course.details,
        curriculum: course.details.curriculum.map(c => ({
          ...c,
          topics: Array.isArray(c.topics) ? c.topics.join(', ') : c.topics
        }))
      }
    };
    setCourseForm(formattedCourse);
    setShowCourseForm(true);
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Course Management</h2>
        <p className="text-gray-600 mt-1">Manage course offerings and details</p>
      </div>

      {/* Sub Tabs */}
      <div className="flex gap-4 mb-6 border-b border-gray-200">
        <button
          onClick={() => setActiveSubTab('courses')}
          className={`pb-3 px-4 font-medium transition-colors ${activeSubTab === 'courses' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
        >
          Course Details
        </button>
      </div>

      {activeSubTab === 'courses' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <p className="text-gray-600">Manage JEE, NEET, and Foundation courses</p>
            <button
              onClick={() => {
                setCourseForm(initialFormState);
                setEditingCourse(null);
                setShowCourseForm(true);
              }}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              <Plus className="w-4 h-4" /> Add Course
            </button>
          </div>

          {showCourseForm && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
              <h3 className="font-semibold text-gray-800 mb-4">{editingCourse ? 'Edit Course' : 'Add New Course'}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Basic Info */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    value={courseForm.title}
                    onChange={(e) => setCourseForm({ ...courseForm, title: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg"
                    placeholder="JEE MAIN + ADV + KCET"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
                  <input
                    type="text"
                    value={courseForm.slug}
                    onChange={(e) => setCourseForm({ ...courseForm, slug: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg"
                    placeholder="jee-mains-integrated"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tag</label>
                  <input
                    type="text"
                    value={courseForm.tag}
                    onChange={(e) => setCourseForm({ ...courseForm, tag: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg"
                    placeholder="School Integrated Program"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    value={courseForm.category}
                    onChange={(e) => setCourseForm({ ...courseForm, category: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg"
                  >
                    <option value="regular">Regular</option>
                    <option value="crash-course">Crash Course</option>
                    <option value="foundation">Foundation</option>
                  </select>
                </div>

                {/* Image Section with Picker */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Course Image URL</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={courseForm.imageUrl}
                      onChange={(e) => setCourseForm({ ...courseForm, imageUrl: e.target.value })}
                      className="flex-1 px-3 py-2 border rounded-lg"
                      placeholder="https://..."
                    />
                    <button
                      type="button"
                      onClick={() => setIsImagePickerOpen(true)}
                      className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200 text-gray-700 font-medium border border-gray-300"
                    >
                      <ImageIcon className="w-4 h-4" /> Select
                    </button>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Short Description</label>
                  <textarea
                    value={courseForm.shortDescription}
                    onChange={(e) => setCourseForm({ ...courseForm, shortDescription: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg"
                    rows={2}
                  />
                </div>

                {/* Pricing */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Original Price</label>
                  <input
                    type="number"
                    value={courseForm.details.price.original}
                    onChange={(e) => setCourseForm({ 
                      ...courseForm, 
                      details: { ...courseForm.details, price: { ...courseForm.details.price, original: parseInt(e.target.value) || 0 } } 
                    })}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Discounted Price</label>
                  <input
                    type="number"
                    value={courseForm.details.price.discounted}
                    onChange={(e) => setCourseForm({ 
                      ...courseForm, 
                      details: { ...courseForm.details, price: { ...courseForm.details.price, discounted: parseInt(e.target.value) || 0 } } 
                    })}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>

                {/* Curriculum */}
                <div className="md:col-span-2 bg-gray-50 p-4 rounded-lg">
                  <h4 className="text-sm font-bold mb-3">Curriculum Topics (Comma Separated)</h4>
                  <div className="space-y-3">
                    {courseForm.details.curriculum.map((item, index) => (
                      <div key={index}>
                        <label className="block text-xs font-semibold text-gray-500 uppercase">{item.subject}</label>
                        <input
                          type="text"
                          value={item.topics}
                          onChange={(e) => {
                            const newCurriculum = [...courseForm.details.curriculum];
                            newCurriculum[index].topics = e.target.value;
                            setCourseForm({ ...courseForm, details: { ...courseForm.details, curriculum: newCurriculum } });
                          }}
                          className="w-full px-3 py-2 border rounded-lg bg-white"
                          placeholder="Mechanics, Thermodynamics, Optics..."
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-4 mt-6">
                <button onClick={handleSaveCourse} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                  {editingCourse ? 'Update Course' : 'Save Course'}
                </button>
                <button onClick={() => setShowCourseForm(false)} className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300">
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Courses List */}
          {loading ? (
            <div className="flex justify-center py-10"><Loader2 className="animate-spin text-blue-600" /></div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {courses.map((course) => (
                <div key={course.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                  <img src={course.imageUrl} alt={course.title} className="w-full h-40 object-cover" />
                  <div className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">{course.tag}</span>
                        <h4 className="font-bold text-lg text-gray-800">{course.title}</h4>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => openEdit(course)} className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Edit2 className="w-4 h-4" /></button>
                        <button onClick={() => handleDelete(course.id)} className="p-2 bg-red-50 text-red-600 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mt-2 line-clamp-2">{course.shortDescription}</p>
                    <div className="mt-4 flex justify-between items-center">
                      <div className="text-green-600 font-bold">₹{course.details?.price?.discounted?.toLocaleString()}</div>
                      <div className="text-gray-400 line-through text-xs">₹{course.details?.price?.original?.toLocaleString()}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Image Picker Modal */}
      <ImagePicker 
        isOpen={isImagePickerOpen}
        onClose={() => setIsImagePickerOpen(false)}
        onSelect={(url) => setCourseForm({ ...courseForm, imageUrl: url })}
        title="Select Course Image"
      />
    </div>
  );
}
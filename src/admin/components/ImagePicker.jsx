// src/admin/components/ImagePicker.jsx
import { useState, useEffect } from 'react';
import { X, Upload, Image as ImageIcon, Loader2, RefreshCw, Check, Trash2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { storageService } from '../services/storageService';

export default function ImagePicker({ isOpen, onClose, onSelect, title = "Select Image" }) {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [deletingUrl, setDeletingUrl] = useState(null);

  // Fetch images whenever the modal opens
  useEffect(() => {
    if (isOpen) {
      fetchImages();
    }
  }, [isOpen]);

  const fetchImages = async () => {
    try {
      setLoading(true);
      const data = await storageService.getImages();
      setImages(data);
    } catch (error) {
      console.error("Failed to load images:", error);
      toast.error("Failed to load media library");
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      await storageService.uploadImage(file);
      toast.success("Image uploaded successfully!");
      
      // Refresh the list to show the new image
      await fetchImages();
    } catch (error) {
      console.error("Upload failed:", error);
      toast.error("Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (e, url) => {
    e.stopPropagation(); // Prevent triggering onSelect
    
    // Extract fileName from URL (last segment)
    const fileName = url.split('/').pop();
    
    if (!window.confirm(`Are you sure you want to delete this image?`)) {
      return;
    }

    try {
      setDeletingUrl(url);
      await storageService.deleteImage(fileName);
      toast.success("Image deleted successfully");
      await fetchImages();
    } catch (error) {
      console.error("Delete failed:", error);
      toast.error("Failed to delete image");
    } finally {
      setDeletingUrl(null);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-5xl max-h-[85vh] flex flex-col">
        
        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b border-gray-100">
          <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <ImageIcon className="w-6 h-6 text-blue-600" />
            {title}
          </h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {/* Upload Area */}
        <div className="p-6 bg-gray-50 border-b border-gray-100">
          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              {uploading ? (
                <div className="flex flex-col items-center">
                   <Loader2 className="w-10 h-10 text-blue-600 animate-spin mb-2" />
                   <p className="text-sm text-blue-600 font-medium">Uploading to Supabase...</p>
                </div>
              ) : (
                <>
                  <Upload className="w-10 h-10 mb-3 text-gray-400" />
                  <p className="text-sm text-gray-500">
                    <span className="font-semibold text-blue-600">Click to upload</span> new image
                  </p>
                  <p className="text-xs text-gray-400 mt-1">PNG, JPG, WEBP (Max 10MB)</p>
                </>
              )}
            </div>
            <input 
              type="file" 
              className="hidden" 
              accept="image/*"
              onChange={handleFileUpload}
              disabled={uploading}
            />
          </label>
        </div>

        {/* Gallery Grid */}
        <div className="flex-1 overflow-y-auto p-6 bg-white">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-medium text-gray-500">{images.length} images found</span>
            <button 
              onClick={fetchImages} 
              className="text-blue-600 hover:text-blue-700 text-sm flex items-center gap-1 font-medium"
            >
              <RefreshCw className="w-4 h-4" /> Refresh List
            </button>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
            </div>
          ) : images.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <ImageIcon className="w-16 h-16 mx-auto mb-4 opacity-20" />
              <p>No images found. Upload your first one!</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {images.map((url, index) => (
                <div 
                  key={index} 
                  className="group relative aspect-square bg-gray-100 rounded-xl overflow-hidden border border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all cursor-pointer"
                  onClick={() => {
                    if (onSelect) {
                      onSelect(url);
                      onClose();
                    }
                  }}
                >
                  <img 
                    src={url} 
                    alt={`Gallery ${index}`} 
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all flex flex-col items-center justify-center gap-2">
                     {onSelect && (
                       <button className="opacity-0 group-hover:opacity-100 bg-white text-blue-600 px-4 py-2 rounded-lg font-bold text-sm shadow-lg flex items-center gap-2">
                         <Check className="w-4 h-4" /> Select
                       </button>
                     )}
                     
                     {/* Delete Button */}
                     <button 
                        onClick={(e) => handleDelete(e, url)}
                        disabled={deletingUrl === url}
                        className="opacity-0 group-hover:opacity-100 bg-red-600 text-white px-4 py-2 rounded-lg font-bold text-sm shadow-lg flex items-center gap-2 hover:bg-red-700 transition-colors"
                     >
                       {deletingUrl === url ? (
                         <Loader2 className="w-4 h-4 animate-spin" />
                       ) : (
                         <Trash2 className="w-4 h-4" />
                       )}
                       Delete
                     </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
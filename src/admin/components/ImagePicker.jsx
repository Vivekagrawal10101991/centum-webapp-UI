import { useState, useEffect } from 'react';
import { X, Upload, Image as ImageIcon, Loader2, RefreshCw, Check, Trash2, Eye } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { storageService } from '../services/storageService';

export default function ImagePicker({ isOpen, onClose, onSelect, title = "Select Image" }) {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [deletingUrl, setDeletingUrl] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

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
      await fetchImages();
    } catch (error) {
      console.error("Upload failed:", error);
      toast.error("Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (e, url) => {
    e.stopPropagation();
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

  /**
   * ✅ SMART NAME FORMATTER
   * 1. Detects "New System" names (Name_UUID.ext) -> Shows "Name.ext"
   * 2. Detects "Old System" names (UUID-UUID.ext) -> Shows "Untitled (Hash)"
   */
  const getDisplayName = (url) => {
    if (!url) return '';
    try {
      let fileName = decodeURIComponent(url.split('/').pop());

      // Regex for Old UUIDs (36 chars like fd5d99c9-100a-4860...)
      const isOldUUID = /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}/i.test(fileName);
      
      if (isOldUUID) {
        // Option A: Show "Legacy Image" 
        // return "Legacy Image"; 
        // Option B: Show shortened hash (e.g. "Image (fd5d...)")
        return `Image (${fileName.substring(0, 6)}...)`;
      }

      // Regex for New System (Ends with _[8 chars].ext)
      // Example: "My_Banner_a1b2c3d4.png" -> "My_Banner.png"
      const newSystemPattern = /_([a-f0-9-]{8})(\.[a-zA-Z0-9]+)$/;
      if (newSystemPattern.test(fileName)) {
         return fileName.replace(newSystemPattern, '$2'); // Keeps only extension
      }
      
      return fileName;
    } catch (e) {
      return 'Image';
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
          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all group">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              {uploading ? (
                <div className="flex flex-col items-center">
                   <Loader2 className="w-10 h-10 text-blue-600 animate-spin mb-2" />
                   <p className="text-sm text-blue-600 font-medium">Uploading...</p>
                </div>
              ) : (
                <>
                  <div className="p-3 bg-blue-50 rounded-full mb-3 group-hover:bg-blue-100 transition-colors">
                    <Upload className="w-6 h-6 text-blue-600" />
                  </div>
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
              {images.map((url, index) => {
                const displayName = getDisplayName(url);
                return (
                  <div 
                    key={index} 
                    className="group bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all flex flex-col h-full relative"
                  >
                    {/* Image Wrapper */}
                    <div 
                      className="relative aspect-square bg-gray-100 w-full cursor-pointer" 
                      onClick={() => onSelect && onClose() || onSelect(url)}
                    >
                      <img 
                        src={url} 
                        alt={displayName} 
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      
                      {/* Hover Overlay Actions */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                        {onSelect && (
                          <button 
                            onClick={(e) => { e.stopPropagation(); onSelect(url); onClose(); }}
                            className="bg-blue-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-lg flex items-center gap-1 hover:bg-blue-700 transform translate-y-2 group-hover:translate-y-0 transition-transform"
                          >
                            <Check className="w-3 h-3" /> Select
                          </button>
                        )}
                         <button 
                            onClick={(e) => { e.stopPropagation(); setPreviewImage(url); }}
                            className="bg-white text-gray-700 px-3 py-1.5 rounded-lg text-xs font-bold shadow-lg flex items-center gap-1 hover:bg-gray-100 transform translate-y-2 group-hover:translate-y-0 transition-transform delay-75"
                         >
                            <Eye className="w-3 h-3" /> View
                          </button>
                        <button 
                            onClick={(e) => handleDelete(e, url)}
                            disabled={deletingUrl === url}
                            className="bg-red-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-lg flex items-center gap-1 hover:bg-red-700 transform translate-y-2 group-hover:translate-y-0 transition-transform delay-100"
                        >
                          {deletingUrl === url ? <Loader2 className="w-3 h-3 animate-spin" /> : <Trash2 className="w-3 h-3" />}
                          Delete
                        </button>
                      </div>
                    </div>
                    
                    {/* Filename Footer */}
                    <div className="p-2 bg-gray-50 border-t border-gray-100">
                      <p className="text-[10px] text-gray-600 font-medium truncate text-center select-all" title={decodeURIComponent(url.split('/').pop())}>
                        {displayName}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Lightbox Preview Modal */}
      {previewImage && (
        <div className="fixed inset-0 z-[60] bg-black/90 flex items-center justify-center p-4 backdrop-blur-md animate-in fade-in duration-200">
          <button 
            className="absolute top-4 right-4 text-white/70 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors"
            onClick={() => setPreviewImage(null)}
          >
            <X className="w-8 h-8" />
          </button>
          <img 
            src={previewImage} 
            alt="Preview" 
            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl" 
          />
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 px-4 py-2 rounded-full text-white text-sm backdrop-blur-sm border border-white/10">
             {getDisplayName(previewImage)}
          </div>
        </div>
      )}
    </div>
  );
}
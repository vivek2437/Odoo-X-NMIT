import React, { useState, useRef } from 'react';
import { toast } from 'react-hot-toast';
import '../styles/ImageUpload.css';

interface ImageUploadProps {
  onImageUpload: (imageUrl: string) => void;
  currentImage?: string;
  maxImages?: number;
  multiple?: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ 
  onImageUpload, 
  currentImage, 
  maxImages = 5,
  multiple = false 
}) => {
  const [uploading, setUploading] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<string[]>(
    currentImage ? [currentImage] : []
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Please log in to upload images');
      return;
    }

    setUploading(true);

    try {
      for (let i = 0; i < Math.min(files.length, maxImages); i++) {
        const file = files[i];
        
        // Validate file type
        if (!file.type.startsWith('image/')) {
          toast.error(`${file.name} is not an image file`);
          continue;
        }

        // Validate file size (5MB limit)
        if (file.size > 5 * 1024 * 1024) {
          toast.error(`${file.name} is too large. Maximum size is 5MB`);
          continue;
        }

        const formData = new FormData();
        formData.append('image', file);

        const response = await fetch('http://localhost:5000/api/images/upload', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          body: formData,
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Upload failed');
        }

        const data = await response.json();
        const fullImageUrl = `http://localhost:5000${data.imageUrl}`;
        
        setUploadedImages(prev => {
          const newImages = [...prev, fullImageUrl];
          onImageUpload(fullImageUrl);
          return newImages;
        });
        
        toast.success(`${file.name} uploaded successfully!`);
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast.error(error instanceof Error ? error.message : 'Upload failed');
    } finally {
      setUploading(false);
      // Clear the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleImageUpload(event.target.files);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    handleImageUpload(files);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const removeImage = async (imageUrl: string, index: number) => {
    try {
      // Extract filename from URL
      const filename = imageUrl.split('/').pop();
      if (!filename) return;

      const token = localStorage.getItem('token');
      
      const response = await fetch(`http://localhost:5000/api/images/${filename}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setUploadedImages(prev => prev.filter((_, i) => i !== index));
        toast.success('Image removed successfully');
      }
    } catch (error) {
      console.error('Error removing image:', error);
      toast.error('Failed to remove image');
    }
  };

  return (
    <div className="image-upload">
      <label className="image-upload-label">Product Image{multiple ? 's' : ''}</label>
      
      {/* Upload Area */}
      <div
        className={`upload-area ${uploading ? 'uploading' : ''}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => fileInputRef.current?.click()}
      >
        {uploading ? (
          <div className="upload-progress">
            <div className="spinner"></div>
            <span>Uploading...</span>
          </div>
        ) : (
          <div className="upload-prompt">
            <div className="upload-icon">📸</div>
            <p>Click here or drag & drop images</p>
            <small>Maximum file size: 5MB | Formats: JPG, PNG, GIF</small>
          </div>
        )}
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple={multiple}
        onChange={handleFileSelect}
        style={{ display: 'none' }}
      />

      {/* Preview Uploaded Images */}
      {uploadedImages.length > 0 && (
        <div className="uploaded-images">
          <h4>Uploaded Images:</h4>
          <div className="image-grid">
            {uploadedImages.map((imageUrl, index) => (
              <div key={index} className="image-preview">
                <img src={imageUrl} alt={`Product ${index + 1}`} />
                <button
                  type="button"
                  className="remove-image"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeImage(imageUrl, index);
                  }}
                  title="Remove image"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Upload Instructions */}
      {uploadedImages.length === 0 && (
        <div className="upload-instructions">
          <p>• Upload high-quality images of your product</p>
          <p>• Multiple angles help buyers make better decisions</p>
          <p>• Images should clearly show the item's condition</p>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;

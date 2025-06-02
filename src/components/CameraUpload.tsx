
import { useState, useRef } from "react";
import { Camera, Upload, Image } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface CameraUploadProps {
  onImageUpload: (imageUrl: string) => void;
}

export const CameraUpload = ({ onImageUpload }: CameraUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (file: File) => {
    setIsUploading(true);
    
    // Create a local URL for the uploaded image
    const imageUrl = URL.createObjectURL(file);
    
    // Simulate upload delay
    setTimeout(() => {
      onImageUpload(imageUrl);
      setIsUploading(false);
    }, 1000);
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  const triggerCamera = () => {
    cameraInputRef.current?.click();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <Image className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">
            Furniture Visualizer
          </h1>
          <p className="text-gray-600 text-lg">
            Take a photo of your room or upload an existing image to get started
          </p>
        </div>

        {/* Upload Options */}
        <div className="space-y-4">
          <Card className="p-6">
            <Button
              onClick={triggerCamera}
              disabled={isUploading}
              className="w-full h-16 bg-green-600 hover:bg-green-700 text-white text-lg font-semibold rounded-xl"
            >
              <Camera className="w-6 h-6 mr-3" />
              Take Photo
            </Button>
          </Card>

          <div className="flex items-center space-x-4">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="text-gray-500 text-sm">OR</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          <Card className="p-6">
            <Button
              onClick={triggerFileUpload}
              disabled={isUploading}
              variant="outline"
              className="w-full h-16 border-2 border-orange-200 hover:bg-orange-50 text-orange-700 text-lg font-semibold rounded-xl"
            >
              <Upload className="w-6 h-6 mr-3" />
              Upload from Gallery
            </Button>
          </Card>
        </div>

        {isUploading && (
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
            <p className="mt-2 text-gray-600">Processing image...</p>
          </div>
        )}

        {/* Hidden File Inputs */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />
        <input
          ref={cameraInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>
    </div>
  );
};

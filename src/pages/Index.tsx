
import { useState } from "react";
import { CameraUpload } from "@/components/CameraUpload";
import { FurnitureSelection } from "@/components/FurnitureSelection";
import { VisualizationResults } from "@/components/VisualizationResults";

export type FurnitureType = "sofa" | "table" | "chair" | "bed" | "carpet";
export type StyleType = "italian" | "oriental" | "classic" | "modern" | "minimalistic";

export interface UserSelections {
  furnitureType: FurnitureType;
  style: StyleType;
}

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<1 | 2 | 3>(1);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [selections, setSelections] = useState<UserSelections | null>(null);

  const handleImageUpload = (imageUrl: string) => {
    setUploadedImage(imageUrl);
    setCurrentScreen(2);
  };

  const handleSelections = (userSelections: UserSelections) => {
    setSelections(userSelections);
    setCurrentScreen(3);
  };

  const handleBack = () => {
    if (currentScreen === 2) {
      setCurrentScreen(1);
    } else if (currentScreen === 3) {
      setCurrentScreen(2);
    }
  };

  const handleStartOver = () => {
    setCurrentScreen(1);
    setUploadedImage(null);
    setSelections(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-orange-50">
      {currentScreen === 1 && (
        <CameraUpload onImageUpload={handleImageUpload} />
      )}
      
      {currentScreen === 2 && uploadedImage && (
        <FurnitureSelection 
          roomImage={uploadedImage}
          onSelections={handleSelections}
          onBack={handleBack}
        />
      )}
      
      {currentScreen === 3 && uploadedImage && selections && (
        <VisualizationResults 
          roomImage={uploadedImage}
          selections={selections}
          onBack={handleBack}
          onStartOver={handleStartOver}
        />
      )}
    </div>
  );
};

export default Index;

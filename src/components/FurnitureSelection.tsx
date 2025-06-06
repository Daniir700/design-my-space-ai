
import { useState } from "react";
import { ArrowDown, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { UserSelections, FurnitureType, StyleType } from "@/pages/Index";

interface FurnitureSelectionProps {
  roomImage: string;
  onSelections: (selections: UserSelections) => void;
  onBack: () => void;
}

const furnitureOptions: { value: FurnitureType; label: string; icon: string }[] = [
  { value: "sofa", label: "Sofa", icon: "🛋️" },
  { value: "table", label: "Table", icon: "☕" },
  { value: "chair", label: "Chair", icon: "🪑" },
  { value: "bed", label: "Bed", icon: "🛏️" },
  { value: "carpet", label: "Carpet", icon: "🟫" },
];

const styleOptions: { value: StyleType; label: string; description: string }[] = [
  { value: "italian", label: "Italian", description: "Elegant & luxurious" },
  { value: "oriental", label: "Oriental", description: "Traditional & ornate" },
  { value: "classic", label: "Classic", description: "Timeless & refined" },
  { value: "modern", label: "Modern", description: "Sleek & contemporary" },
  { value: "minimalistic", label: "Minimalistic", description: "Clean & simple" },
];

export const FurnitureSelection = ({ roomImage, onSelections, onBack }: FurnitureSelectionProps) => {
  const [selectedFurniture, setSelectedFurniture] = useState<FurnitureType | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<StyleType | null>(null);

  const handleVisualize = () => {
    if (selectedFurniture && selectedStyle) {
      onSelections({
        furnitureType: selectedFurniture,
        style: selectedStyle,
      });
    }
  };

  const canVisualize = selectedFurniture && selectedStyle;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-orange-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="flex items-center justify-between p-4">
          <Button variant="ghost" onClick={onBack}>
            <ArrowDown className="w-5 h-5 mr-2" />
            Back
          </Button>
          <h1 className="text-xl font-semibold">Choose Furniture</h1>
          <div className="w-16"></div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Room Preview */}
        <Card className="p-4">
          <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
            <img 
              src={roomImage} 
              alt="Your room" 
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-sm text-gray-600 mt-2 text-center">Your room</p>
        </Card>

        {/* Furniture Type Selection */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-gray-900">Select Furniture Type</h2>
          <div className="grid grid-cols-2 gap-3">
            {furnitureOptions.map((option) => (
              <Card 
                key={option.value}
                className={`p-4 cursor-pointer transition-all ${
                  selectedFurniture === option.value 
                    ? 'border-green-500 bg-green-50' 
                    : 'hover:bg-gray-50'
                }`}
                onClick={() => setSelectedFurniture(option.value)}
              >
                <div className="text-center space-y-2">
                  <div className="text-2xl">{option.icon}</div>
                  <div className="font-medium text-gray-900">{option.label}</div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Style Selection */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-gray-900">Select Style</h2>
          <div className="space-y-2">
            {styleOptions.map((option) => (
              <Card 
                key={option.value}
                className={`p-4 cursor-pointer transition-all ${
                  selectedStyle === option.value 
                    ? 'border-orange-500 bg-orange-50' 
                    : 'hover:bg-gray-50'
                }`}
                onClick={() => setSelectedStyle(option.value)}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium text-gray-900">{option.label}</div>
                    <div className="text-sm text-gray-600">{option.description}</div>
                  </div>
                  {selectedStyle === option.value && (
                    <div className="w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Visualize Button */}
        <div className="pt-4">
          <Button
            onClick={handleVisualize}
            disabled={!canVisualize}
            className="w-full h-14 bg-gradient-to-r from-green-600 to-orange-600 hover:from-green-700 hover:to-orange-700 text-white text-lg font-semibold rounded-xl"
          >
            Visualize Furniture
            <ArrowUp className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

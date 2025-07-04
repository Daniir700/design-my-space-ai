import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FurnitureOverlay } from "@/components/FurnitureOverlay";
import { FURNITURE_CATALOGUE, Product } from "@/data/furnitureCatalogue";
import { UserSelections } from "@/pages/Index";

interface VisualizationScreenProps {
  roomImage: string;
  selections: UserSelections;
  onBack: () => void;
  onStartOver: () => void;
}

export const VisualizationScreen: React.FC<VisualizationScreenProps> = ({
  roomImage,
  selections,
  onBack,
  onStartOver
}) => {
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [currentProductIndex, setCurrentProductIndex] = useState(0);

  useEffect(() => {
    const filtered = FURNITURE_CATALOGUE.filter(
      (item) =>
        item.furnitureType.toLowerCase() === selections.furnitureType.toLowerCase() &&
        item.style.toLowerCase() === selections.style.toLowerCase()
    );
    setSelectedProducts(filtered);
    setCurrentProductIndex(0);
  }, [selections]);

  const currentProduct = selectedProducts[currentProductIndex];

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Room Mockup</h2>
      
      {/* Visualization Area */}
      <div className="relative border-2 border-gray-200 rounded-lg overflow-hidden mb-6 min-h-[500px] bg-gray-50">
        <img 
          src={roomImage} 
          alt="Your room" 
          className="w-full h-auto object-contain" 
        />
        
        {currentProduct && (
          <FurnitureOverlay
            furnitureImage={currentProduct.image}
            furnitureName={currentProduct.name}
            onPositionChange={(position) => {
              console.log(`${currentProduct.name} moved to:`, position);
            }}
          />
        )}
        
        <div className="absolute top-4 left-4 bg-white bg-opacity-90 p-2 rounded-lg">
          <p className="text-sm font-medium">
            {selections.style.charAt(0).toUpperCase() + selections.style.slice(1)} {selections.furnitureType.charAt(0).toUpperCase() + selections.furnitureType.slice(1)}
          </p>
          {currentProduct && (
            <p className="text-xs text-gray-600">{currentProduct.name}</p>
          )}
        </div>
        
        <div className="absolute bottom-4 left-4 bg-black bg-opacity-70 text-white p-2 rounded-lg text-sm">
          💡 Scroll over furniture to resize, drag to move
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-4 mb-6">
        <Button onClick={onBack} variant="outline">
          ← Back to Selection
        </Button>
        <Button onClick={onStartOver} variant="outline">
          🔄 Start Over
        </Button>
      </div>

      {/* Product Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {selectedProducts.map((product, index) => (
          <Card 
            key={product.id} 
            className={`p-4 cursor-pointer transition-all duration-200 ${
              index === currentProductIndex 
                ? 'ring-2 ring-blue-500 bg-blue-50' 
                : 'hover:shadow-md'
            }`}
            onClick={() => setCurrentProductIndex(index)}
          >
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-40 object-cover rounded-lg mb-3" 
            />
            <div className="space-y-1">
              <h3 className="font-semibold text-sm">{product.name}</h3>
              <p className="text-xs text-gray-600">{product.store}</p>
              <p className="text-sm font-bold text-green-600">{product.price}</p>
              <a
                href={product.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-xs text-blue-600 hover:text-blue-800 underline mt-2"
                onClick={(e) => e.stopPropagation()}
              >
                View Product →
              </a>
            </div>
          </Card>
        ))}
      </div>
      
      {selectedProducts.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No furniture found for your selection.</p>
        </div>
      )}
    </div>
  );
};
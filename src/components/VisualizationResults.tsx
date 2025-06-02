
import { useState, useEffect } from "react";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { UserSelections } from "@/pages/Index";
import { removeBackground } from "@/utils/backgroundRemoval";

interface Product {
  id: string;
  name: string;
  price: string;
  image: string;
  store: string;
  link: string;
}

interface VisualizationResultsProps {
  roomImage: string;
  selections: UserSelections;
  onBack: () => void;
  onStartOver: () => void;
}

// Mock furniture overlay images based on selections
const getFurnitureOverlay = (furnitureType: string, style: string): string => {
  const furnitureImages = {
    sofa: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop&auto=format",
    table: "https://images.unsplash.com/photo-1549497538-303791108f95?w=400&h=300&fit=crop&auto=format",
    chair: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop&auto=format",
    bed: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400&h=300&fit=crop&auto=format",
    carpet: "https://images.unsplash.com/photo-1541558869434-2840d308329a?w=400&h=300&fit=crop&auto=format"
  };
  
  return furnitureImages[furnitureType as keyof typeof furnitureImages] || "";
};

// Mock product data based on selections with real working links
const getProductsBySelection = (furnitureType: string, style: string): Product[] => {
  const baseProducts = {
    sofa: [
      {
        id: "1",
        name: "KLIPPAN 2-seat sofa",
        price: "£199",
        image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=300&h=200&fit=crop",
        store: "IKEA UK",
        link: "https://www.ikea.com/gb/en/p/klippan-2-seat-sofa-vissle-grey-70185395/"
      },
      {
        id: "2", 
        name: "FRIHETEN Corner sofa-bed",
        price: "£450",
        image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=300&h=200&fit=crop",
        store: "IKEA UK",
        link: "https://www.ikea.com/gb/en/p/friheten-corner-sofa-bed-with-storage-skiftebo-dark-grey-s79307468/"
      }
    ],
    table: [
      {
        id: "3",
        name: "EKEDALEN Extendable table",
        price: "£180",
        image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=300&h=200&fit=crop",
        store: "IKEA UK", 
        link: "https://www.ikea.com/gb/en/p/ekedalen-extendable-table-white-00346721/"
      }
    ],
    chair: [
      {
        id: "4",
        name: "TOBIAS Chair",
        price: "£79",
        image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=300&h=200&fit=crop",
        store: "IKEA UK",
        link: "https://www.ikea.com/gb/en/p/tobias-chair-clear-chrome-plated-70263847/"
      }
    ],
    bed: [
      {
        id: "5",
        name: "MALM Bed frame",
        price: "£129", 
        image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=300&h=200&fit=crop",
        store: "IKEA UK",
        link: "https://www.ikea.com/gb/en/p/malm-bed-frame-high-white-stained-oak-veneer-s99141591/"
      }
    ],
    carpet: [
      {
        id: "6",
        name: "STOENSE Rug",
        price: "£45",
        image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=300&h=200&fit=crop",
        store: "IKEA UK", 
        link: "https://www.ikea.com/gb/en/p/stoense-rug-low-pile-medium-grey-40438172/"
      }
    ]
  };

  return baseProducts[furnitureType as keyof typeof baseProducts] || [];
};

export const VisualizationResults = ({ roomImage, selections, onBack, onStartOver }: VisualizationResultsProps) => {
  const [processedFurnitureImage, setProcessedFurnitureImage] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const products = getProductsBySelection(selections.furnitureType, selections.style);
  const furnitureOverlay = getFurnitureOverlay(selections.furnitureType, selections.style);

  // Set the first product as selected by default
  useEffect(() => {
    if (products.length > 0 && !selectedProduct) {
      setSelectedProduct(products[0]);
    }
  }, [products, selectedProduct]);

  useEffect(() => {
    const processImage = async () => {
      if (furnitureOverlay) {
        setIsProcessing(true);
        console.log('Processing furniture image for background removal...');
        try {
          const processedImage = await removeBackground(furnitureOverlay);
          setProcessedFurnitureImage(processedImage);
        } catch (error) {
          console.error('Failed to process image:', error);
          setProcessedFurnitureImage(furnitureOverlay);
        } finally {
          setIsProcessing(false);
        }
      }
    };

    processImage();
  }, [furnitureOverlay]);

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    // Process the selected product's image for the mockup
    setIsProcessing(true);
    removeBackground(product.image)
      .then(processedImage => {
        setProcessedFurnitureImage(processedImage);
      })
      .catch(error => {
        console.error('Failed to process selected product image:', error);
        setProcessedFurnitureImage(product.image);
      })
      .finally(() => {
        setIsProcessing(false);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-orange-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="flex items-center justify-between p-4">
          <Button variant="ghost" onClick={onBack}>
            <ArrowDown className="w-5 h-5 mr-2" />
            Back
          </Button>
          <h1 className="text-xl font-semibold">Your Visualization</h1>
          <Button variant="ghost" onClick={onStartOver} className="text-sm">
            Start Over
          </Button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Selection Summary */}
        <Card className="p-4 bg-gradient-to-r from-green-100 to-orange-100">
          <div className="text-center space-y-2">
            <h2 className="text-lg font-semibold text-gray-900">
              {selections.style.charAt(0).toUpperCase() + selections.style.slice(1)} {selections.furnitureType.charAt(0).toUpperCase() + selections.furnitureType.slice(1)}
            </h2>
            <p className="text-gray-600">AI-powered visualization</p>
          </div>
        </Card>

        {/* Visualized Room with Furniture Overlay */}
        <Card className="p-4">
          <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden relative">
            {/* Original room image */}
            <img 
              src={roomImage} 
              alt="Your room" 
              className="w-full h-full object-cover"
            />
            
            {/* Processing indicator */}
            {isProcessing && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                <div className="bg-white rounded-lg p-4 flex items-center space-x-3">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-600"></div>
                  <p className="text-sm font-medium">Processing furniture...</p>
                </div>
              </div>
            )}
            
            {/* Furniture overlay with removed background */}
            {!isProcessing && processedFurnitureImage && (
              <div className="absolute inset-0 flex items-center justify-center">
                <img 
                  src={processedFurnitureImage}
                  alt={selectedProduct ? selectedProduct.name : `${selections.style} ${selections.furnitureType}`}
                  className="max-w-[60%] max-h-[60%] object-contain"
                  style={{
                    filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.3))',
                  }}
                />
              </div>
            )}
            
            {/* AI Enhancement Badge */}
            <div className="absolute top-4 right-4">
              <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg">
                <p className="text-sm font-medium text-gray-900">✨ AI Enhanced</p>
              </div>
            </div>
            
            {/* Style and furniture type indicator */}
            <div className="absolute bottom-4 left-4">
              <div className="bg-black/70 backdrop-blur-sm rounded-lg px-3 py-2">
                <p className="text-sm font-medium text-white">
                  {selectedProduct ? selectedProduct.name : `${selections.style.charAt(0).toUpperCase() + selections.style.slice(1)} ${selections.furnitureType}`}
                </p>
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-2 text-center">
            Your room with {selectedProduct ? selectedProduct.name : `${selections.style} ${selections.furnitureType}`} visualization
          </p>
        </Card>

        {/* Product Recommendations */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">Choose Your Furniture</h2>
          
          {products.length > 0 ? (
            <div className="space-y-4">
              {products.map((product) => (
                <Card 
                  key={product.id} 
                  className={`p-4 cursor-pointer transition-all ${
                    selectedProduct?.id === product.id 
                      ? 'border-green-500 bg-green-50' 
                      : 'hover:bg-gray-50'
                  }`}
                  onClick={() => handleProductSelect(product)}
                >
                  <div className="flex space-x-4">
                    <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 space-y-2">
                      <h3 className="font-semibold text-gray-900">{product.name}</h3>
                      <p className="text-lg font-bold text-green-600">{product.price}</p>
                      <p className="text-sm text-gray-600">{product.store}</p>
                      {selectedProduct?.id === product.id && (
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <span className="text-sm text-green-600 font-medium">Selected for visualization</span>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
              
              {/* Buy Selected Product Button */}
              {selectedProduct && (
                <Button 
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white h-12"
                  onClick={() => window.open(selectedProduct.link, '_blank')}
                >
                  Buy {selectedProduct.name} - {selectedProduct.price}
                </Button>
              )}
            </div>
          ) : (
            <Card className="p-8 text-center">
              <p className="text-gray-600">No products found for this combination.</p>
              <Button variant="outline" className="mt-4" onClick={onBack}>
                Try Different Options
              </Button>
            </Card>
          )}
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pt-4">
          <Button
            onClick={onStartOver}
            variant="outline"
            className="w-full h-12 border-2 border-gray-300 text-gray-700"
          >
            Try Different Room
          </Button>
          <Button
            onClick={onBack}
            className="w-full h-12 bg-green-600 hover:bg-green-700 text-white"
          >
            Change Furniture Selection
          </Button>
        </div>
      </div>
    </div>
  );
};

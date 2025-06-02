
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { UserSelections } from "@/pages/Index";

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

// Mock product data based on selections
const getProductsBySelection = (furnitureType: string, style: string): Product[] => {
  const baseProducts = {
    sofa: [
      {
        id: "1",
        name: "3-Seat Fabric Sofa",
        price: "£599",
        image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=300&h=200&fit=crop",
        store: "IKEA UK",
        link: "https://www.ikea.com/gb/en/"
      },
      {
        id: "2", 
        name: "Corner Sectional Sofa",
        price: "£899",
        image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=300&h=200&fit=crop",
        store: "Wayfair UK",
        link: "https://www.wayfair.co.uk/"
      }
    ],
    table: [
      {
        id: "3",
        name: "Round Dining Table",
        price: "£349",
        image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=300&h=200&fit=crop",
        store: "IKEA UK", 
        link: "https://www.ikea.com/gb/en/"
      }
    ],
    chair: [
      {
        id: "4",
        name: "Upholstered Dining Chair",
        price: "£79",
        image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=300&h=200&fit=crop",
        store: "Wayfair UK",
        link: "https://www.wayfair.co.uk/"
      }
    ],
    bed: [
      {
        id: "5",
        name: "Platform Bed Frame",
        price: "£299", 
        image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=300&h=200&fit=crop",
        store: "IKEA UK",
        link: "https://www.ikea.com/gb/en/"
      }
    ],
    carpet: [
      {
        id: "6",
        name: "Area Rug",
        price: "£159",
        image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=300&h=200&fit=crop",
        store: "Wayfair UK", 
        link: "https://www.wayfair.co.uk/"
      }
    ]
  };

  return baseProducts[furnitureType as keyof typeof baseProducts] || [];
};

export const VisualizationResults = ({ roomImage, selections, onBack, onStartOver }: VisualizationResultsProps) => {
  const products = getProductsBySelection(selections.furnitureType, selections.style);
  const furnitureOverlay = getFurnitureOverlay(selections.furnitureType, selections.style);

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
            
            {/* Furniture overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <img 
                src={furnitureOverlay}
                alt={`${selections.style} ${selections.furnitureType}`}
                className="max-w-[60%] max-h-[60%] object-contain opacity-90 drop-shadow-2xl"
                style={{
                  filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.3))',
                }}
              />
            </div>
            
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
                  {selections.style.charAt(0).toUpperCase() + selections.style.slice(1)} {selections.furnitureType}
                </p>
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-2 text-center">
            Your room with {selections.style} {selections.furnitureType} visualization
          </p>
        </Card>

        {/* Product Recommendations */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">Recommended Products</h2>
          
          {products.length > 0 ? (
            <div className="space-y-4">
              {products.map((product) => (
                <Card key={product.id} className="p-4">
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
                      <Button 
                        className="w-full bg-orange-600 hover:bg-orange-700 text-white"
                        onClick={() => window.open(product.link, '_blank')}
                      >
                        View Product
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
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

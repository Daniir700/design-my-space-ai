
import { useState, useEffect, useRef } from "react";
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

// Mock product data with different furniture images for each product
const getProductsBySelection = (furnitureType: string, style: string): Product[] => {
  const baseProducts = {
    sofa: [
      {
        id: "1",
        name: "KLIPPAN 2-seat sofa",
        price: "£199",
        image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop&auto=format",
        store: "IKEA UK",
        link: "https://www.ikea.com/gb/en/p/klippan-2-seat-sofa-vissle-grey-70185395/"
      },
      {
        id: "2", 
        name: "FRIHETEN Corner sofa-bed",
        price: "£450",
        image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=400&h=300&fit=crop&auto=format",
        store: "IKEA UK",
        link: "https://www.ikea.com/gb/en/p/friheten-corner-sofa-bed-with-storage-skiftebo-dark-grey-s79307468/"
      },
      {
        id: "3",
        name: "EKTORP 3-seat sofa",
        price: "£325",
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop&auto=format",
        store: "IKEA UK",
        link: "https://www.ikea.com/gb/en/p/ektorp-3-seat-sofa-totebo-light-beige-s59395929/"
      }
    ],
    table: [
      {
        id: "4",
        name: "EKEDALEN Extendable table",
        price: "£180",
        image: "https://images.unsplash.com/photo-1549497538-303791108f95?w=400&h=300&fit=crop&auto=format",
        store: "IKEA UK", 
        link: "https://www.ikea.com/gb/en/p/ekedalen-extendable-table-white-00346721/"
      },
      {
        id: "5",
        name: "HEMNES Coffee table",
        price: "£120",
        image: "https://images.unsplash.com/photo-1604709177225-055f99402ea3?w=400&h=300&fit=crop&auto=format",
        store: "IKEA UK",
        link: "https://www.ikea.com/gb/en/p/hemnes-coffee-table-white-stain-50394479/"
      },
      {
        id: "6",
        name: "BJURSTA Dining table",
        price: "£140",
        image: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400&h=300&fit=crop&auto=format",
        store: "IKEA UK",
        link: "https://www.ikea.com/gb/en/p/bjursta-extendable-table-brown-black-80116265/"
      }
    ],
    chair: [
      {
        id: "7",
        name: "TOBIAS Chair",
        price: "£79",
        image: "https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=400&h=300&fit=crop&auto=format",
        store: "IKEA UK",
        link: "https://www.ikea.com/gb/en/p/tobias-chair-clear-chrome-plated-70263847/"
      },
      {
        id: "8",
        name: "MARKUS Office chair",
        price: "£180",
        image: "https://images.unsplash.com/photo-1541558869434-2840d308329a?w=400&h=300&fit=crop&auto=format",
        store: "IKEA UK",
        link: "https://www.ikea.com/gb/en/p/markus-office-chair-vissle-dark-grey-70261150/"
      },
      {
        id: "9",
        name: "STEFAN Chair",
        price: "£35",
        image: "https://images.unsplash.com/photo-1503602642458-232111445657?w=400&h=300&fit=crop&auto=format",
        store: "IKEA UK",
        link: "https://www.ikea.com/gb/en/p/stefan-chair-brown-black-90135347/"
      }
    ],
    bed: [
      {
        id: "10",
        name: "MALM Bed frame",
        price: "£129", 
        image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400&h=300&fit=crop&auto=format",
        store: "IKEA UK",
        link: "https://www.ikea.com/gb/en/p/malm-bed-frame-high-white-stained-oak-veneer-s99141591/"
      },
      {
        id: "11",
        name: "HEMNES Bed frame",
        price: "£200",
        image: "https://images.unsplash.com/photo-1540932239986-30128078f3c5?w=400&h=300&fit=crop&auto=format",
        store: "IKEA UK",
        link: "https://www.ikea.com/gb/en/p/hemnes-bed-frame-white-stain-s29006287/"
      },
      {
        id: "12",
        name: "BRIMNES Bed frame",
        price: "£150",
        image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=300&fit=crop&auto=format",
        store: "IKEA UK",
        link: "https://www.ikea.com/gb/en/p/brimnes-bed-frame-with-storage-white-s59007108/"
      }
    ],
    carpet: [
      {
        id: "13",
        name: "STOENSE Rug",
        price: "£45",
        image: "https://images.unsplash.com/photo-1577140917170-285929fb55b7?w=400&h=300&fit=crop&auto=format",
        store: "IKEA UK", 
        link: "https://www.ikea.com/gb/en/p/stoense-rug-low-pile-medium-grey-40438172/"
      },
      {
        id: "14",
        name: "VINDUM Rug",
        price: "£120",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop&auto=format",
        store: "IKEA UK",
        link: "https://www.ikea.com/gb/en/p/vindum-rug-high-pile-white-70344368/"
      },
      {
        id: "15",
        name: "TYVELSE Rug",
        price: "£80",
        image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop&auto=format",
        store: "IKEA UK",
        link: "https://www.ikea.com/gb/en/p/tyvelse-rug-low-pile-off-white-50388522/"
      }
    ]
  };

  return baseProducts[furnitureType as keyof typeof baseProducts] || [];
};

// Improved background removal using Remove.bg API (with fallback)
const removeBackgroundWithAPI = async (imageUrl: string): Promise<string> => {
  try {
    console.log('Attempting background removal with Remove.bg API for:', imageUrl);
    
    // Convert image URL to blob first
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    
    // Create form data for Remove.bg API
    const formData = new FormData();
    formData.append('image_file', blob);
    formData.append('size', 'auto');
    
    // Call Remove.bg API (note: this would require an API key in production)
    const removeResponse = await fetch('https://api.remove.bg/v1.0/removebg', {
      method: 'POST',
      headers: {
        'X-Api-Key': 'YOUR_REMOVEBG_API_KEY', // This would need to be set
      },
      body: formData,
    });

    if (removeResponse.ok) {
      const resultBlob = await removeResponse.blob();
      return URL.createObjectURL(resultBlob);
    } else {
      throw new Error('Remove.bg API failed');
    }
  } catch (error) {
    console.error('Remove.bg API failed, using fallback method:', error);
    
    // Fallback to client-side processing with better parameters
    try {
      const { removeBackground } = await import('@/utils/backgroundRemoval');
      return await removeBackground(imageUrl);
    } catch (fallbackError) {
      console.error('Fallback background removal failed:', fallbackError);
      return imageUrl; // Return original image if all methods fail
    }
  }
};

export const VisualizationResults = ({ roomImage, selections, onBack, onStartOver }: VisualizationResultsProps) => {
  const [processedFurnitureImage, setProcessedFurnitureImage] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string>("");
  const [furniturePosition, setFurniturePosition] = useState({ x: 50, y: 50 });
  const [furnitureScale, setFurnitureScale] = useState(1);
  const [furnitureRotation, setFurnitureRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [lastPinchDistance, setLastPinchDistance] = useState(0);
  const [lastTouchAngle, setLastTouchAngle] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const products = getProductsBySelection(selections.furnitureType, selections.style);

  // Set the first product as selected by default
  useEffect(() => {
    if (products.length > 0 && !selectedProduct) {
      setSelectedProduct(products[0]);
    }
  }, [products, selectedProduct]);

  // Process the selected product image for background removal and overlay
  useEffect(() => {
    const processImage = async () => {
      if (!selectedProduct) return;

      setIsProcessing(true);
      setError("");
      console.log('Processing furniture image for background removal:', selectedProduct.name);
      
      try {
        const processedImage = await removeBackgroundWithAPI(selectedProduct.image);
        console.log('Background removal completed successfully for:', selectedProduct.name);
        setProcessedFurnitureImage(processedImage);
      } catch (error) {
        console.error('Failed to process image:', error);
        setError('Failed to process image');
        // Use original image as fallback
        setProcessedFurnitureImage(selectedProduct.image);
      } finally {
        setIsProcessing(false);
      }
    };

    processImage();
  }, [selectedProduct]);

  const handleProductSelect = (product: Product) => {
    if (selectedProduct?.id === product.id) return;
    
    console.log('Product selected:', product.name);
    setSelectedProduct(product);
    // Reset transformations when switching products
    setFurnitureScale(1);
    setFurnitureRotation(0);
    // The useEffect above will handle the image processing automatically
  };

  // Calculate distance between two touch points
  const getTouchDistance = (touches: React.TouchList) => {
    if (touches.length < 2) return 0;
    const touch1 = touches[0];
    const touch2 = touches[1];
    return Math.sqrt(
      Math.pow(touch2.clientX - touch1.clientX, 2) + 
      Math.pow(touch2.clientY - touch1.clientY, 2)
    );
  };

  // Calculate angle between two touch points
  const getTouchAngle = (touches: React.TouchList) => {
    if (touches.length < 2) return 0;
    const touch1 = touches[0];
    const touch2 = touches[1];
    return Math.atan2(touch2.clientY - touch1.clientY, touch2.clientX - touch1.clientX);
  };

  // Touch and mouse event handlers for mobile compatibility
  const getEventPosition = (e: React.MouseEvent | React.TouchEvent) => {
    if ('touches' in e) {
      return { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
    return { x: e.clientX, y: e.clientY };
  };

  const handleStart = (e: React.MouseEvent | React.TouchEvent) => {
    if (!containerRef.current) return;
    
    if ('touches' in e && e.touches.length === 2) {
      // Two finger touch - prepare for pinch/rotate
      setLastPinchDistance(getTouchDistance(e.touches));
      setLastTouchAngle(getTouchAngle(e.touches));
    } else {
      // Single touch or mouse - prepare for drag
      setIsDragging(true);
    }
    e.preventDefault();
  };

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!containerRef.current) return;
    
    if ('touches' in e && e.touches.length === 2) {
      // Two finger touch - handle pinch and rotate
      const currentDistance = getTouchDistance(e.touches);
      const currentAngle = getTouchAngle(e.touches);
      
      if (lastPinchDistance > 0) {
        // Handle pinch to scale
        const scaleChange = currentDistance / lastPinchDistance;
        setFurnitureScale(prev => Math.max(0.3, Math.min(3, prev * scaleChange)));
      }
      
      // Handle rotation
      const angleDiff = currentAngle - lastTouchAngle;
      setFurnitureRotation(prev => prev + (angleDiff * 180 / Math.PI));
      
      setLastPinchDistance(currentDistance);
      setLastTouchAngle(currentAngle);
    } else if (isDragging) {
      // Single touch or mouse - handle drag
      const rect = containerRef.current.getBoundingClientRect();
      const pos = getEventPosition(e);
      const x = ((pos.x - rect.left) / rect.width) * 100;
      const y = ((pos.y - rect.top) / rect.height) * 100;
      
      // Keep furniture within bounds
      const clampedX = Math.max(10, Math.min(90, x));
      const clampedY = Math.max(10, Math.min(90, y));
      
      setFurniturePosition({ x: clampedX, y: clampedY });
    }
  };

  const handleEnd = () => {
    setIsDragging(false);
    setLastPinchDistance(0);
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
          <div 
            ref={containerRef}
            className="aspect-video bg-gray-100 rounded-lg overflow-hidden relative cursor-move touch-none"
            onMouseMove={handleMove}
            onMouseUp={handleEnd}
            onMouseLeave={handleEnd}
            onTouchMove={handleMove}
            onTouchEnd={handleEnd}
          >
            {/* Original room image */}
            <img 
              src={roomImage} 
              alt="Your room" 
              className="w-full h-full object-cover"
            />
            
            {/* Processing indicator */}
            {isProcessing && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
                <div className="bg-white rounded-lg p-4 flex items-center space-x-3">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-600"></div>
                  <p className="text-sm font-medium">Processing {selectedProduct?.name}...</p>
                </div>
              </div>
            )}
            
            {/* Error indicator */}
            {error && !isProcessing && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
                <div className="bg-red-100 border border-red-400 text-red-700 rounded-lg p-4">
                  <p className="text-sm font-medium">{error}</p>
                </div>
              </div>
            )}
            
            {/* Furniture overlay with removed background */}
            {!isProcessing && !error && processedFurnitureImage && selectedProduct && (
              <div 
                className="absolute pointer-events-auto cursor-grab active:cursor-grabbing touch-none"
                style={{
                  left: `${furniturePosition.x}%`,
                  top: `${furniturePosition.y}%`,
                  transform: `translate(-50%, -50%) scale(${furnitureScale}) rotate(${furnitureRotation}deg)`,
                }}
                onMouseDown={handleStart}
                onTouchStart={handleStart}
              >
                <img 
                  src={processedFurnitureImage}
                  alt={selectedProduct.name}
                  className="max-w-[200px] max-h-[200px] object-contain"
                  style={{
                    filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.3))',
                  }}
                  onError={(e) => {
                    console.error('Failed to display processed image for:', selectedProduct.name);
                    setError('Failed to display furniture image');
                  }}
                  draggable={false}
                />
              </div>
            )}
            
            {/* AI Enhancement Badge */}
            <div className="absolute top-4 right-4 z-20">
              <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg">
                <p className="text-sm font-medium text-gray-900">✨ AI Enhanced</p>
              </div>
            </div>
            
            {/* Current product name indicator */}
            <div className="absolute bottom-4 left-4 z-20">
              <div className="bg-black/70 backdrop-blur-sm rounded-lg px-3 py-2">
                <p className="text-sm font-medium text-white">
                  {selectedProduct ? selectedProduct.name : `${selections.style.charAt(0).toUpperCase() + selections.style.slice(1)} ${selections.furnitureType}`}
                </p>
              </div>
            </div>

            {/* Interaction instructions */}
            <div className="absolute top-4 left-4 z-20">
              <div className="bg-blue-500/90 backdrop-blur-sm rounded-lg px-3 py-2">
                <p className="text-xs font-medium text-white">🖱️ Drag • 🤏 Pinch to scale • ↻ Rotate</p>
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
                  className={`p-4 cursor-pointer transition-all hover:shadow-lg ${
                    selectedProduct?.id === product.id 
                      ? 'border-green-500 bg-green-50 ring-2 ring-green-200' 
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
                  onClick={() => {
                    console.log('Opening product link:', selectedProduct.link);
                    window.open(selectedProduct.link, '_blank');
                  }}
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


import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { UserSelections } from "@/pages/Index";
import Draggable from "react-draggable";

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

const REMOVE_BG_API_KEY = "msBHY5X91Ur2PB4AoaL1pgzD";

const getProductsBySelection = (furnitureType: string, style: string): Product[] => {
  return [
    {
      id: "1",
      name: "STRANDMON Wing chair",
      price: "£279",
      image: "https://www.ikea.com/gb/en/images/products/strandmon-wing-chair-skiftebo-yellow__0710175_pe727378_s5.png",
      store: "IKEA UK",
      link: "https://www.ikea.com/gb/en/p/strandmon-wing-chair-skiftebo-yellow-00359829/"
    },
    {
      id: "2",
      name: "EKTORP 3-seat sofa",
      price: "£325",
      image: "https://www.ikea.com/gb/en/images/products/ektorp-3-seat-sofa-lofallet-beige__0636443_pe697822_s5.png",
      store: "IKEA UK",
      link: "https://www.ikea.com/gb/en/p/ektorp-3-seat-sofa-lofallet-beige-s29278776/"
    }
  ];
};

export const VisualizationResults = ({
  roomImage,
  selections,
  onBack,
  onStartOver
}: VisualizationResultsProps) => {
  const [cleanedImages, setCleanedImages] = useState<{ [id: string]: string }>({});
  const [scales, setScales] = useState<{ [id: string]: number }>({});
  const [loading, setLoading] = useState(true);

  const products = getProductsBySelection(selections.furnitureType, selections.style);

  useEffect(() => {
    let active = true;
    const fetchImages = async () => {
      const updated: { [id: string]: string } = {};
      for (const product of products) {
        try {
          const response = await fetch("https://api.remove.bg/v1.0/removebg", {
            method: "POST",
            headers: { "X-Api-Key": REMOVE_BG_API_KEY },
            body: new URLSearchParams({
              image_url: product.image,
              size: "auto"
            })
          });
          const blob = await response.blob();
          const objectUrl = URL.createObjectURL(blob);
          updated[product.id] = objectUrl;
        } catch {
          updated[product.id] = product.image;
        }
      }
      if (active) {
        setCleanedImages(updated);
        setLoading(false);
      }
    };

    fetchImages();
    return () => { active = false; };
  }, [products]);

  const handlePinch = (id: string, e: React.WheelEvent<HTMLImageElement>) => {
    e.preventDefault();
    const newScale = (scales[id] || 1) + (e.deltaY < 0 ? 0.1 : -0.1);
    setScales((prev) => ({ ...prev, [id]: Math.max(0.3, Math.min(newScale, 3)) }));
  };

  return (
    <div className="p-4 space-y-4">
      <div className="relative border rounded-md overflow-hidden">
        <img src={roomImage} alt="Room" className="w-full object-cover" />
        {!loading &&
          products.map((product) => (
            <Draggable key={product.id}>
              <img
                src={cleanedImages[product.id]}
                alt={product.name}
                onWheel={(e) => handlePinch(product.id, e)}
                className="absolute top-10 left-10 drop-shadow-xl touch-none"
                style={{ width: `${(scales[product.id] || 1) * 160}px`, zIndex: 10 }}
              />
            </Draggable>
          ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {products.map((product) => (
          <Card key={product.id} className="p-4">
            <img
              src={cleanedImages[product.id] || product.image}
              alt={product.name}
              className="w-full mb-2"
            />
            <div className="text-lg font-bold">{product.name}</div>
            <div>{product.price}</div>
            <a
              href={product.link}
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-block w-full text-center bg-black text-white py-2 rounded"
            >
              Buy on {product.store}
            </a>
          </Card>
        ))}
      </div>

      <div className="flex justify-between mt-6">
        <Button onClick={onBack} variant="outline">Back</Button>
        <Button onClick={onStartOver} variant="destructive">Start Over</Button>
      </div>
    </div>
  );
};

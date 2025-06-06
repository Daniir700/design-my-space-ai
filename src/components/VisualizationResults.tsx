import { useState, useEffect } from "react";
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

const REMOVE_BG_API_KEY = "msBHY5X91Ur2PB4AoaL1pgzD"; // Replace this

const getProductsBySelection = (furnitureType: string, style: string): Product[] => {
  return [
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

  const products = getProductsBySelection(selections.furnitureType, selections.style);

  useEffect(() => {
    products.forEach((product) => {
      fetch("https://api.remove.bg/v1.0/removebg", {
        method: "POST",
        headers: {
          "X-Api-Key": REMOVE_BG_API_KEY
        },
        body: new URLSearchParams({
          image_url: product.image,
          size: "auto"
        })
      })
        .then((res) => res.blob())
        .then((blob) => {
          const objectUrl = URL.createObjectURL(blob);
          setCleanedImages((prev) => ({ ...prev, [product.id]: objectUrl }));
        })
        .catch(() => {
          // fallback to original image
          setCleanedImages((prev) => ({ ...prev, [product.id]: product.image }));
        });
    });
  }, [products]);

  return (
    <div className="p-4 space-y-4">
      <div className="relative border rounded-md overflow-hidden">
        <img src={roomImage} alt="Room" className="w-full object-cover" />
        {products.map((product) => (
          <img
            key={product.id}
            src={cleanedImages[product.id]}
            alt={product.name}
            className="absolute top-10 left-10 w-40 drop-shadow-lg"
          />
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {products.map((product) => (
          <Card key={product.id} className="p-4">
            <img src={cleanedImages[product.id]} alt={product.name} className="w-full mb-2" />
            <div className="text-lg font-bold">{product.name}</div>
            <div>{product.price}</div>
            <a href={product.link} target="_blank" rel="noreferrer">
              <Button className="mt-2 w-full">Buy on {product.store}</Button>
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

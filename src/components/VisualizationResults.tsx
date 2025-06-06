import { useState, useEffect } from "react";
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
  furnitureType: string;
  style: string;
}

interface VisualizationResultsProps {
  roomImage: string;
  selections: UserSelections;
  onBack: () => void;
  onStartOver: () => void;
}

const REMOVE_BG_API_KEY = "msBHY5X91Ur2PB4AoaL1pgzD";

const CATALOGUE: Product[] = [
  {
    id: "c1", name: "Italian Leather Chair", price: "£199", furnitureType: "chair", style: "Italian",
    image: "https://www.ikea.com/gb/en/images/products/remsta-armchair-gunnared-beige__1042527_pe841199_s5.png",
    store: "IKEA UK", link: "https://www.ikea.com/gb/en/p/remsta-armchair-gunnared-beige-20493547/"
  },
  {
    id: "c2", name: "Classic Italian Lounge", price: "£349", furnitureType: "chair", style: "Italian",
    image: "https://www.ikea.com/gb/en/images/products/strandmon-wing-chair-skiftebo-dark-grey__0710183_pe727379_s5.png",
    store: "IKEA UK", link: "https://www.ikea.com/gb/en/p/strandmon-wing-chair-skiftebo-dark-grey-70359827/"
  },
  {
    id: "c3", name: "Minimalist Armchair", price: "£129", furnitureType: "chair", style: "Minimalistic",
    image: "https://www.ikea.com/gb/en/images/products/poaeng-armchair-birch-veneer-knisa-light-beige__1008460_pe827354_s5.png",
    store: "IKEA UK", link: "https://www.ikea.com/gb/en/p/poaeng-armchair-birch-veneer-knisa-light-beige-70362447/"
  },
  {
    id: "c4", name: "Scandinavian Lounge Chair", price: "£159", furnitureType: "chair", style: "Scandinavian",
    image: "https://www.ikea.com/gb/en/images/products/froset-armchair-birch-veneer-katorp-natural__1152555_pe885926_s5.png",
    store: "IKEA UK", link: "https://www.ikea.com/gb/en/p/froset-armchair-birch-veneer-katorp-natural-40516499/"
  },
  {
    id: "s1", name: "Minimalist Sofa 2-Seater", price: "£279", furnitureType: "sofa", style: "Minimalistic",
    image: "https://www.ikea.com/gb/en/images/products/klippan-2-seat-sofa-vissle-grey__0910187_pe787996_s5.png",
    store: "IKEA UK", link: "https://www.ikea.com/gb/en/p/klippan-2-seat-sofa-vissle-grey-40392519/"
  },
  {
    id: "s2", name: "Scandinavian 3-Seater", price: "£379", furnitureType: "sofa", style: "Scandinavian",
    image: "https://www.ikea.com/gb/en/images/products/friheten-corner-sofa-bed-with-storage-skiftebo-dark-grey__0635986_pe697395_s5.png",
    store: "IKEA UK", link: "https://www.ikea.com/gb/en/p/friheten-corner-sofa-bed-with-storage-skiftebo-dark-grey-90431763/"
  },
  {
    id: "s3", name: "Italian Velvet Sofa", price: "£459", furnitureType: "sofa", style: "Italian",
    image: "https://www.ikea.com/gb/en/images/products/landskrona-3-seat-sofa-gunnared-blue__0857516_pe780769_s5.png",
    store: "IKEA UK", link: "https://www.ikea.com/gb/en/p/landskrona-3-seat-sofa-gunnared-blue-60413550/"
  },
  {
    id: "s4", name: "Modern Compact Sofa", price: "£199", furnitureType: "sofa", style: "Minimalistic",
    image: "https://www.ikea.com/gb/en/images/products/lycksele-lovas-2-seat-sofa-bed-lycksele-gra__0187025_pe338383_s5.png",
    store: "IKEA UK", link: "https://www.ikea.com/gb/en/p/lycksele-lovas-2-seat-sofa-bed-lycksele-gra-s69290299/"
  }
];

export const VisualizationResults = ({
  roomImage, selections, onBack, onStartOver
}: VisualizationResultsProps) => {
  const [cleanedImages, setCleanedImages] = useState<{ [id: string]: string }>({});
  const [loading, setLoading] = useState(true);
  const [scales, setScales] = useState<{ [id: string]: number }>({});

  const products = CATALOGUE.filter(p =>
    p.furnitureType === selections.furnitureType && p.style === selections.style
  );

  useEffect(() => {
    let active = true;
    const loadImages = async () => {
      const updated: { [id: string]: string } = {};
      for (const product of products) {
        try {
          const response = await fetch("https://api.remove.bg/v1.0/removebg", {
            method: "POST",
            headers: { "X-Api-Key": REMOVE_BG_API_KEY },
            body: new URLSearchParams({ image_url: product.image, size: "auto" })
          });
          const blob = await response.blob();
          updated[product.id] = URL.createObjectURL(blob);
        } catch {
          updated[product.id] = product.image;
        }
      }
      if (active) {
        setCleanedImages(updated);
        setLoading(false);
      }
    };
    loadImages();
    return () => { active = false; };
  }, [products]);

  const handlePinch = (id: string, e: React.WheelEvent<HTMLImageElement>) => {
    e.preventDefault();
    const newScale = (scales[id] || 1) + (e.deltaY < 0 ? 0.1 : -0.1);
    setScales(prev => ({ ...prev, [id]: Math.max(0.3, Math.min(newScale, 3)) }));
  };

  return (
    <div className="p-4 space-y-4">
      <div className="relative border rounded overflow-hidden">
        <img src={roomImage} alt="Room" className="w-full object-cover" />
        {!loading && products.map(product => (
          <Draggable key={product.id}>
            <img
              src={cleanedImages[product.id]}
              alt={product.name}
              className="absolute top-10 left-10 drop-shadow-xl touch-none"
              onWheel={(e) => handlePinch(product.id, e)}
              style={{ width: `${(scales[product.id] || 1) * 160}px`, zIndex: 10 }}
            />
          </Draggable>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {products.map(product => (
          <Card key={product.id} className="p-4">
            <img src={cleanedImages[product.id] || product.image} className="w-full mb-2" />
            <div className="text-lg font-bold">{product.name}</div>
            <div>{product.price}</div>
            <a
              href={product.link}
              target="_blank"
              rel="noreferrer"
              className="mt-2 block bg-black text-white text-center py-2 rounded"
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

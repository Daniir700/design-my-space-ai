
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Draggable from "react-draggable";

interface Product {
  furnitureType: string;
  style: string;
  name: string;
  image: string;
  link: string;
  store: string;
  price: string;
}

interface VisualizationResultsProps {
  roomImage: string;
  furnitureType: string;
  style: string;
}

const CATALOGUE: Product[] = [
  {
    furnitureType: "chair",
    style: "minimalistic",
    name: "Vågö Chair",
    image: "https://www.ikea.com/gb/en/images/products/vago-chair-outdoor-white__0710563_pe727627_s5.jpg",
    link: "https://www.ikea.com/gb/en/p/vago-chair-outdoor-white-90219122/",
    store: "IKEA UK",
    price: "£25"
  },
  {
    furnitureType: "sofa",
    style: "italian",
    name: "Landskrona Sofa",
    image: "https://www.ikea.com/gb/en/images/products/landskrona-sofa-gunnared-medium-grey__0724703_pe734113_s5.jpg",
    link: "https://www.ikea.com/gb/en/p/landskrona-sofa-gunnared-medium-grey-90413576/",
    store: "IKEA UK",
    price: "£449"
  },
  // Additional items should be added here...
];

async function removeBackgroundPixian(imageUrl: string): Promise<string> {
  const response = await fetch(imageUrl);
  const blob = await response.blob();
  const formData = new FormData();
  formData.append("image_file", new File([blob], "furniture.png", { type: blob.type }));

  const removeRes = await fetch("https://api.pixian.ai/remove-background", {
    method: "POST",
    body: formData,
  });

  if (!removeRes.ok) {
    throw new Error("Background removal failed");
  }

  const cleanedBlob = await removeRes.blob();
  return URL.createObjectURL(cleanedBlob);
}

export default function VisualizationResults({ roomImage, furnitureType, style }: VisualizationResultsProps) {
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [processedImages, setProcessedImages] = useState<string[]>([]);

  useEffect(() => {
    const filtered = CATALOGUE.filter(
      (item) =>
        item.furnitureType.toLowerCase() === furnitureType.toLowerCase() &&
        item.style.toLowerCase() === style.toLowerCase()
    );
    setResults(filtered);
  }, [furnitureType, style]);

  useEffect(() => {
    const processImages = async () => {
      try {
        setLoading(true);
        const cleanedImages = await Promise.all(
          results.map((product) => removeBackgroundPixian(product.image))
        );
        setProcessedImages(cleanedImages);
      } catch (error) {
        console.error("Background processing failed:", error);
      } finally {
        setLoading(false);
      }
    };

    if (results.length > 0) {
      processImages();
    }
  }, [results]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Mockup</h2>
      <div className="relative border rounded-lg overflow-hidden mb-4">
        <img src={roomImage} alt="Room" className="w-full object-cover" />
        {!loading &&
          processedImages.map((imgUrl, idx) => (
            <Draggable key={idx}>
              <img
                src={imgUrl}
                alt={`Furniture ${idx + 1}`}
                style={{
                  position: "absolute",
                  top: 50 + idx * 30,
                  left: 50 + idx * 30,
                  width: "150px",
                  zIndex: 10,
                }}
              />
            </Draggable>
          ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {results.map((product, index) => (
          <Card key={index} className="p-4 border">
            <img src={product.image} alt={product.name} className="mb-2 w-full h-40 object-cover" />
            <div className="font-semibold">{product.name}</div>
            <div className="text-sm">{product.store}</div>
            <div className="text-sm text-gray-600">{product.price}</div>
            <a
              href={product.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline mt-2 inline-block"
            >
              Buy Now
            </a>
          </Card>
        ))}
      </div>
    </div>
  );
}

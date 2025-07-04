import React, { useEffect, useState } from "react";
import { DraggableFurniture } from "./DraggableFurniture";

interface FurnitureItem {
  id: string;
  type: string;
  style: string;
  image: string;
  purchase_url: string;
}

interface VisualizerProps {
  roomImage: string;
  selectedType: string;
  selectedStyle: string;
}

export const Visualizer: React.FC<VisualizerProps> = ({
  roomImage,
  selectedType,
  selectedStyle
}) => {
  const [furnitureItem, setFurnitureItem] = useState<FurnitureItem | null>(null);

  useEffect(() => {
    fetch("/furniture.json")
      .then(res => res.json())
      .then((data: FurnitureItem[]) => {
        const match = data.find(
          item => item.type === selectedType && item.style === selectedStyle
        );
        setFurnitureItem(match || null);
      });
  }, [selectedType, selectedStyle]);

  return (
    <div className="relative w-full h-screen bg-gray-100">
      <img src={roomImage} alt="Room" className="w-full h-auto" />

      {furnitureItem && (
        <DraggableFurniture
          imageUrl={furnitureItem.image}
          alt={`${furnitureItem.style} ${furnitureItem.type}`}
          purchaseUrl={furnitureItem.purchase_url}
          initialPosition={{ x: 100, y: 100 }}
        />
      )}
    </div>
  );
};

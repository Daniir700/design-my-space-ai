
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

// VisualizationResults.tsx

import React from 'react';

interface Product {
  name: string;
  image: string;
  style: string;
  type: string;
  price: string;
  store: string;
  link: string;
}

const CATALOGUE: Product[] = [
  // Minimalistic Sofas
  {
    name: "Sienna 3 Seater Sofa",
    image: "https://www.scs.co.uk/productimages/large/si3s.jpg",
    style: "Minimalistic",
    type: "sofa",
    price: "£799",
    store: "ScS",
    link: "https://www.scs.co.uk/sienna-3-seater-sofa/si3s",
  },
  {
    name: "Marion Modern Sofa",
    image: "https://moderndesignsofas.co.uk/images/marion-sofa.jpg",
    style: "Minimalistic",
    type: "sofa",
    price: "£779",
    store: "Modern Design Sofas",
    link: "https://moderndesignsofas.co.uk/marion-modern-sofa",
  },
  {
    name: "Amsterdam 3 Seater Sofa",
    image: "https://www.wayfair.co.uk/images/amsterdam-sofa.jpg",
    style: "Minimalistic",
    type: "sofa",
    price: "£699",
    store: "Wayfair UK",
    link: "https://www.wayfair.co.uk/furniture/pdp/amsterdam-3-seater-sofa-wf123456.html",
  },

  // Classic Sofas
  {
    name: "Arlington Traditional Sofa",
    image: "https://www.theenglishsofacompany.co.uk/images/arlington-sofa.jpg",
    style: "Classic",
    type: "sofa",
    price: "£1,450",
    store: "The English Sofa Company",
    link: "https://www.theenglishsofacompany.co.uk/fabric-sofas/arlington-traditional-sofa/",
  },
  {
    name: "Chesterfield Leather Sofa",
    image: "https://www.dfs.co.uk/images/chesterfield-sofa.jpg",
    style: "Classic",
    type: "sofa",
    price: "£1,199",
    store: "DFS",
    link: "https://www.dfs.co.uk/chesterfield-leather-sofa/df123456",
  },
  {
    name: "Cambridge Scroll Arm Sofa",
    image: "https://www.furniturevillage.co.uk/images/cambridge-sofa.jpg",
    style: "Classic",
    type: "sofa",
    price: "£1,299",
    store: "Furniture Village",
    link: "https://www.furniturevillage.co.uk/cambridge-scroll-arm-sofa/fv123456",
  },

  // Scandinavian Sofas
  {
    name: "Eider Corner Sofa",
    image: "https://uk.privatefloor.com/images/eider-sofa.jpg",
    style: "Scandinavian",
    type: "sofa",
    price: "£899",
    store: "Private Floor",
    link: "https://uk.privatefloor.com/catalog/product/scandinavian-style-corner-sofa-eider-912/",
  },
  {
    name: "Fuuga 3 Seater Sofa",
    image: "https://slf24.co.uk/images/fuuga-sofa.jpg",
    style: "Scandinavian",
    type: "sofa",
    price: "£799",
    store: "SLF24",
    link: "https://slf24.co.uk/fuuga-3-seater-sofa.html",
  },
  {
    name: "Nordic 3 Seater Sofa",
    image: "https://www.johnlewis.com/images/nordic-sofa.jpg",
    style: "Scandinavian",
    type: "sofa",
    price: "£850",
    store: "John Lewis & Partners",
    link: "https://www.johnlewis.com/nordic-3-seater-sofa/p1234567",
  },

  // Minimalistic Tables
  {
    name: "Minimalist Oak Dining Table",
    image: "https://www.eatsleeplive.co.uk/images/minimalist-oak-table.jpg",
    style: "Minimalistic",
    type: "table",
    price: "£840",
    store: "Eat Sleep Live",
    link: "https://www.eatsleeplive.co.uk/collections/minimalist-tables/products/minimalist-oak-dining-table",
  },
  {
    name: "Modern Glass Coffee Table",
    image: "https://www.wayfair.co.uk/images/modern-glass-table.jpg",
    style: "Minimalistic",
    type: "table",
    price: "£299",
    store: "Wayfair UK",
    link: "https://www.wayfair.co.uk/furniture/pdp/modern-glass-coffee-table-wf123456.html",
  },
  {
    name: "White Minimalist Desk",
    image: "https://www.ikea.com/gb/en/images/products/white-minimalist-desk.jpg",
    style: "Minimalistic",
    type: "table",
    price: "£150",
    store: "IKEA UK",
    link: "https://www.ikea.com/gb/en/p/white-minimalist-desk-12345678/",
  },

  // Classic Tables
  {
    name: "Hudson Dining Table",
    image: "https://www.eatsleeplive.co.uk/images/hudson-table.jpg",
    style: "Classic",
    type: "table",
    price: "£1,030",
    store: "Eat Sleep Live",
    link: "https://www.eatsleeplive.co.uk/collections/classic-tables/products/hudson-dining-table",
  },
  {
    name: "Cherry Grove Extendable Table",
    image: "https://colemanfurniture.com/images/cherry-grove-table.jpg",
    style: "Classic",
    type: "table",
    price: "£1,200",
    store: "Coleman Furniture",
    link: "https://colemanfurniture.com/cherry-grove-classic-antique-extendable-cherry-pedestal-dining-table.htm",
  },
  {
    name: "Classic Round Dining Table",
    image: "https://www.furniturechoice.co.uk/images/classic-round-table.jpg",
    style: "Classic",
    type: "table",
    price: "£499",
    store: "Furniture Choice",
    link: "https://www.furniturechoice.co.uk/dining-room-furniture/dining-tables-and-chairs/f/style/traditional/",
  },

  // Scandinavian Tables
  {
    name: "Norgaard Extension Dining Table",
    image: "https://scandinaviandesigns.com/images/norgaard-table.jpg",
    style: "Scandinavian",
    type: "table",
    price: "£899",
    store: "Scandinavian Designs",
    link: "https://scandinaviandesigns.com/products/norgaard-extension-dining-table",
  },
  {
    name: "Skandi Oak Dining Table",
    image: "https://olsonbaker.com/images/skandi-table.jpg",
    style: "Scandinavian",
    type: "table",
    price: "£950",
    store: "Olson and Baker",
    link: "https://olsonbaker.com/product-tag/scandinavian-dining-tables/",
  },
  {
    name: "Light Scandinavian Dining Table",
    image: "https://www.grainandframe.com/images/light-scandinavian-table.jpg",
    style: "Scandinavian",
    type: "table",
    price: "£1,100",
    store: "Grain and Frame",
    link: "https://www.grainandframe.com/kitchen-and-dining-sets/extendable-light-scandinavian-dining-set/",
  },

  // Minimalistic Carpets
  {
    name: "Beige Minimalist Rug",
    image: "https://www.designhunter.co.uk/images/beige-minimalist-rug.jpg",
    style: "Minimalistic",
    type: "carpet",
    price: "£250",
    store: "Design Hunter",
    link: "https://www.designhunter.co.uk/10-of-the-best-modern-minimalist-rugs/",
  },
  {
    name: "Grey Geometric Rug",
    image: "https://ruggable.co.uk/images/grey-geometric-rug.jpg",
    style: "Minimalistic",
    type: "carpet",
    price: "£199",
    store: "Ruggable UK",
    link: "https://ruggable.co.uk/collections/minimalist-rugs",
  },
  {
    name: "Striped Area Rug",
    image: "https://www.amazon.co.uk/images/striped-area-rug.jpg",
    style: "Minimalistic",
    type: "carpet",
    price: "£89",
    store: "Amazon UK",
    link: "https://www.amazon.co.uk/minimalist-rug/s?k=minimalist+rug",
  },

  // Classic Carpets
  {
    name: "Classic Persian Rug",
    image: "https://www.oramaworld.com/images/classic-persian-rug.jpg",
    style: "Classic",
    type: "carpet",
    price: "£1,800",
    store: "OramaWorld",
    link: "https://www.oramaworld.com/en/p/300664/Classic_Ecclesiastical_Carpet_Lydia_A487C",
  },
  {
    name: "Traditional Floral Carpet",
    image: "https://classiccarpet.co.uk/images/traditional-floral-carpet.jpg",
    style: "Classic",
    type: "carpet",
    price: "£1,200",
    store: "Classic Carpet Company",
    link: "https://classiccarpet.co.uk/",
  },
  {
    name: "Red Oriental Rug",
    image: "https://classiccarpetsportsmouth.co.uk/images/red-oriental-rug.jpg",
    style: "Classic",
    type: "carpet",
    price: "£1, 
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

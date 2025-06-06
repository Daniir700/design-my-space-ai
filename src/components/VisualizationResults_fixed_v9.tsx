
const CATALOGUE: Product[] = [
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
  link: string;,
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
  },
  // ... existing products

  // Minimalistic Tables
  {
    id: "mi_tb_1",
    name: "Ebern Designs Lift-Top Storage Coffee Table",
    price: "£68.99",
    furnitureType: "table",
    style: "Minimalistic",
    image: "https://secure.img1-fg.wfcdn.com/im/79954654/resize-h445-w445%5Ecompr-r85/2461/246113778/default_name.jpg",
    store: "Wayfair UK",
    link: "https://www.wayfair.co.uk/furniture/pdp/ebern-designs-lift-top-storage-coffee-table-u001146215.html"
  },
  {
    id: "mi_tb_2",
    name: "Ivy Bronx Chalsea Coffee Table with Storage",
    price: "£205.99",
    furnitureType: "table",
    style: "Minimalistic",
    image: "https://secure.img1-fg.wfcdn.com/im/84937117/resize-h445-w445%5Ecompr-r85/2461/246113778/default_name.jpg",
    store: "Wayfair UK",
    link: "https://www.wayfair.co.uk/furniture/pdp/ivy-bronx-chalsea-coffee-table-with-storage-u001146215.html"
  },
  {
    id: "mi_tb_3",
    name: "Cloud Modern Irregular Indoor Tea Table",
    price: "£213.12",
    furnitureType: "table",
    style: "Minimalistic",
    image: "https://m.media-amazon.com/images/I/61tFzJ5V2pL._AC_SL1500_.jpg",
    store: "Amazon UK",
    link: "https://www.amazon.co.uk/dp/B0C7K5X7YF"
  },

  // Italian Tables
  {
    id: "it_tb_1",
    name: "Arredoclassic Romantica Italian Dining Table",
    price: "£864.00",
    furnitureType: "table",
    style: "Italian",
    image: "https://www.furnituredirectuk.net/media/catalog/product/cache/1/image/800x800/9df78eab33525d08d6e5fb8d27136e95/a/r/arredoclassic_romantica_italian_fixed_top_pedestal_base_rectangular_dining_table_only.jpg",
    store: "Furniture Direct UK",
    link: "https://www.furnituredirectuk.net/arredoclassic-romantica-italian-fixed-top-pedestal-base-rectangular-dining-table-only.html"
  },
  {
    id: "it_tb_2",
    name: "Viadurini Modern Dining Table in Knotted Oak",
    price: "£1,525.51",
    furnitureType: "table",
    style: "Italian",
    image: "https://www.viadurini.co.uk/media/catalog/product/cache/1/image/800x800/9df78eab33525d08d6e5fb8d27136e95/m/o/modern-table-in-knotted-oak-wood-made-in-italy-zerba.jpg",
    store: "Viadurini",
    link: "https://www.viadurini.co.uk/modern-table-in-knotted-oak-wood-made-in-italy-zerba"
  },
  {
    id: "it_tb_3",
    name: "Cassoni Acco Table by Miniforms",
    price: "£4,756.00",
    furnitureType: "table",
    style: "Italian",
    image: "https://cassoni.com/wp-content/uploads/2021/04/Acco-Table.jpg",
    store: "Cassoni",
    link: "https://cassoni.com/product/acco-table/"
  },

  // Oriental Tables
  {
    id: "or_tb_1",
    name: "Marrakesch Oriental Folding Side Table",
    price: "£49.69",
    furnitureType: "table",
    style: "Oriental",
    image: "https://m.media-amazon.com/images/I/71ZqON9a1FL._AC_SL1500_.jpg",
    store: "Amazon UK",
    link: "https://www.amazon.co.uk/dp/B07Y5VJ8L5"
  },
  {
    id: "or_tb_2",
    name: "Shimu Chinese Antique Side Table",
    price: "£495.00",
    furnitureType: "table",
    style: "Oriental",
    image: "https://www.shimu.co.uk/wp-content/uploads/2021/06/CT09N-600x600.jpg",
    store: "Shimu",
    link: "https://www.shimu.co.uk/product/chinese-antique-side-table/"
  },
  {
    id: "or_tb_3",
    name: "Orchid Chinese Console Table",
    price: "£1,195.00",
    furnitureType: "table",
    style: "Oriental",
    image: "https://www.orchidfurniture.co.uk/wp-content/uploads/2019/06/CHC-01-1.jpg",
    store: "Orchid Furniture",
    link: "https://www.orchidfurniture.co.uk/product/chinese-console-table/"
  },

  // Minimalistic Carpets
  {
    id: "mi_ca_1",
    name: "Next Mid Natural Minimalist Block Rug",
    price: "£50.00",
    furnitureType: "carpet",
    style: "Minimalistic",
    image: "https://media.next.co.uk/i/Next/936-312s",
    store: "Next",
    link: "https://www.next.co.uk/style/st936312"
  },
  {
    id: "mi_ca_2",
    name: "Ruggable Minimalist Rug",
    price: "£129.00",
    furnitureType: "carpet",
    style: "Minimalistic",
    image: "https://ruggable.co.uk/cdn/shop/products/MinimalistRug.jpg",
    store: "Ruggable UK",
    link: "https://ruggable.co.uk/collections/minimalist-rugs"
  },
  {
    id: "mi_ca_3",
    name: "Rugette Minimalist Solid Colour Rug",
    price: "£99.00",
    furnitureType: "carpet",
    style: "Minimalistic",
    image: "https://rugette.co.uk/cdn/shop/products/SolidColourRug.jpg",
    store: "Rugette",
    link: "https://rugette.co.uk/collections/minimalist-rugs"
  },

  // Italian Carpets
  {
    id: "it_ca_1",
    name: "SayRug Italian Designer Rug",
    price: "£356.00",
    furnitureType: "carpet",
    style: "Italian",
    image: "https://sayrug.co.uk/media/catalog/product/cache/1/image/800x800/9df78eab33525d08d6e5fb8d27136e95/i/t/italian-designer-rug.jpg",
    store: "SayRug",
    link: "https://sayrug.co.uk/italian-rugs/"
  },
  {
    id: "it_ca_2",
    name: "ItaliaHome Luxury Italian Rug",
    price: "£499.00",
    furnitureType: "carpet",
    style: "Italian",
    image: "https://www.italiahome.co.uk/cdn/shop/products/LuxuryItalianRug.jpg",
    store: "ItaliaHome",
    link: "https://www.italiahome.co.uk/collections/italian-luxury-rugs"
  },
  {
    id: "it_ca_3",
    name: "Design Italy Contemporary Rug",
    price: "£650.00",
    furnitureType: "carpet",
    style: "Italian",
    image: "https://designitaly.com/cdn/shop/products/ContemporaryRug.jpg",
    store: "Design Italy",
    link: "https://designitaly.com/collections/rugs"
  },

  // Oriental Carpets
  {
    id: "or_ca_1",
    name: "Little-Persia Handmade Oriental Rug",
    price: "£1,200.00",
    furnitureType: "carpet",
    style: "Oriental",
    image: "https://www.little-persia.com/cdn/shop/products/HandmadeOrientalRug.jpg",
    store: "Little-Persia",
    link: "https://www.little-persia.com/"
  },
  {
    id: "or_ca_2",
    name: "Oriental Rug Merchant Persian Carpet",
    price: "£950.00",
    furnitureType: "carpet",
    style: "Oriental",
    image: "https://www.theorientalrugshop.co.uk/cdn/shop/products/PersianCarpet.jpg",
    store: "Oriental Rug Merchant",
    link: "https://www.theorientalrugshop.co.uk/"
  },
  {
    id: "or_ca_3",
    name: "Olney Oriental Rugs Traditional Rug",
    price: "£1,100.00",
    furnitureType: "carpet",
    style: "Oriental",
    image: "https://www.olneyrugs.co.uk/cdn/shop/products/TraditionalRug.jpg",
    store: "Olney Oriental Rugs",
    link: "https://www.olneyrugs.co.uk/",
  }

  // ... additional products as needed
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

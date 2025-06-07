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
  // Italian Chairs
  {
    id: "it_c1", name: "IKEA REMSTA Armchair", price: "£199", furnitureType: "chair", style: "italian",
    image: "https://www.ikea.com/gb/en/images/products/remsta-armchair-gunnared-beige__1042527_pe841199_s5.jpg",
    store: "IKEA UK", link: "https://www.ikea.com/gb/en/p/remsta-armchair-gunnared-beige-20493547/"
  },
  {
    id: "it_c2", name: "IKEA STRANDMON Wing Chair", price: "£349", furnitureType: "chair", style: "italian",
    image: "https://www.ikea.com/gb/en/images/products/strandmon-wing-chair-skiftebo-dark-grey__0710183_pe727379_s5.jpg",
    store: "IKEA UK", link: "https://www.ikea.com/gb/en/p/strandmon-wing-chair-skiftebo-dark-grey-70359827/"
  },
  {
    id: "it_c3", name: "Made Margot Accent Chair", price: "£449", furnitureType: "chair", style: "italian",
    image: "https://img.made.com/image/upload/c_pad,d_madex_photogrey.svg,f_auto,w_982,h_654/v1/catalogue/product/furniture/seating/armchairs/CHRMAR007NEU_UK/Margot_Accent_Chair_Sage_Green_Velvet_angle.png",
    store: "Made.com", link: "https://www.made.com/margot-accent-chair-sage-green-velvet"
  },

  // Minimalistic Chairs
  {
    id: "mi_c1", name: "IKEA POÄNG Armchair", price: "£129", furnitureType: "chair", style: "minimalistic",
    image: "https://www.ikea.com/gb/en/images/products/poaeng-armchair-birch-veneer-knisa-light-beige__1008460_pe827354_s5.jpg",
    store: "IKEA UK", link: "https://www.ikea.com/gb/en/p/poaeng-armchair-birch-veneer-knisa-light-beige-70362447/"
  },
  {
    id: "mi_c2", name: "IKEA VEDBO Armchair", price: "£179", furnitureType: "chair", style: "minimalistic",
    image: "https://www.ikea.com/gb/en/images/products/vedbo-armchair-gunnared-beige__0873514_pe720311_s5.jpg",
    store: "IKEA UK", link: "https://www.ikea.com/gb/en/p/vedbo-armchair-gunnared-beige-60461839/"
  },
  {
    id: "mi_c3", name: "Habitat Eve Chair", price: "£250", furnitureType: "chair", style: "minimalistic",
    image: "https://images.habitat.co.uk/is/image/Habitat/198806_1?$PRODUCT_LISTING$",
    store: "Habitat", link: "https://www.habitat.co.uk/eve-chair-198806"
  },

  // Oriental Chairs
  {
    id: "or_c1", name: "John Lewis Ming Chair", price: "£599", furnitureType: "chair", style: "oriental",
    image: "https://johnlewis.scene7.com/is/image/JohnLewis/238027195?$rsp-pdp-port-640$",
    store: "John Lewis", link: "https://www.johnlewis.com/ming-chair-dark-wood/p238027195"
  },
  {
    id: "or_c2", name: "Swoon Orient Chair", price: "£459", furnitureType: "chair", style: "oriental",
    image: "https://cdn.swooneditions.com/images/v1/product-images/CHROR01BLA_1.jpg",
    store: "Swoon Editions", link: "https://swooneditions.com/orient-chair-black"
  },
  {
    id: "or_c3", name: "Heals Kyoto Armchair", price: "£899", furnitureType: "chair", style: "oriental",
    image: "https://www.heals.com/media/catalog/product/k/y/kyoto-armchair-black-walnut_1.jpg",
    store: "Heals", link: "https://www.heals.com/kyoto-armchair-black-walnut.html"
  },

  // Classic Chairs
  {
    id: "cl_c1", name: "Cotswold Windsor Chair", price: "£399", furnitureType: "chair", style: "classic",
    image: "https://www.cotswoldco.com/media/catalog/product/c/h/chair-windsor-oak_1.jpg",
    store: "Cotswold Co", link: "https://www.cotswoldco.com/windsor-chair-oak"
  },
  {
    id: "cl_c2", name: "Furniture Village Chesterfield Chair", price: "£699", furnitureType: "chair", style: "classic",
    image: "https://images.furniturevillage.co.uk/f_auto,t_product_large/v1567757364/catalog/sofas-chairs/1031/1031_hero_chair_chesterfield_dark_brown.jpg",
    store: "Furniture Village", link: "https://www.furniturevillage.co.uk/chesterfield-chair"
  },
  {
    id: "cl_c3", name: "DFS Cambridge Chair", price: "£549", furnitureType: "chair", style: "classic",
    image: "https://images.dfs.co.uk/i/dfs/cambridge_chair_brown_leather?$large$",
    store: "DFS", link: "https://www.dfs.co.uk/cambridge-chair"
  },

  // Modern Chairs
  {
    id: "mo_c1", name: "Made Ziggy Swivel Chair", price: "£329", furnitureType: "chair", style: "modern",
    image: "https://img.made.com/image/upload/c_pad,d_madex_photogrey.svg,f_auto,w_982,h_654/v1/catalogue/product/furniture/seating/armchairs/CHRZIG001BLU_UK/Ziggy_Swivel_Chair_Royal_Blue_Velvet_angle.png",
    store: "Made.com", link: "https://www.made.com/ziggy-swivel-chair-royal-blue-velvet"
  },
  {
    id: "mo_c2", name: "Wayfair Penelope Chair", price: "£279", furnitureType: "chair", style: "modern",
    image: "https://secure.img1-fg.wfcdn.com/im/30359482/resize-h800-w800%5Ecompr-r85/1396/139622901/penelope-armchair.jpg",
    store: "Wayfair UK", link: "https://www.wayfair.co.uk/furniture/pdp/penelope-armchair-BNRS2071.html"
  },
  {
    id: "mo_c3", name: "Habitat Storm Chair", price: "£395", furnitureType: "chair", style: "modern",
    image: "https://images.habitat.co.uk/is/image/Habitat/197445_1?$PRODUCT_LISTING$",
    store: "Habitat", link: "https://www.habitat.co.uk/storm-chair-197445"
  },

  // Italian Sofas
  {
    id: "it_s1", name: "Made Romano 3 Seater Sofa", price: "£1299", furnitureType: "sofa", style: "italian",
    image: "https://img.made.com/image/upload/c_pad,d_madex_photogrey.svg,f_auto,w_982,h_654/v1/catalogue/product/furniture/seating/sofas/SOFROM006NAV_UK/Romano_3_Seater_Sofa_Navy_Blue_Velvet_angle.png",
    store: "Made.com", link: "https://www.made.com/romano-3-seater-sofa-navy-blue-velvet"
  },
  {
    id: "it_s2", name: "DFS Bella Italia Sofa", price: "£1599", furnitureType: "sofa", style: "italian",
    image: "https://images.dfs.co.uk/i/dfs/bella_italia_3_seater_sofa_brown_leather?$large$",
    store: "DFS", link: "https://www.dfs.co.uk/bella-italia-3-seater-sofa"
  },
  {
    id: "it_s3", name: "Furniture Village Milano Sofa", price: "£1899", furnitureType: "sofa", style: "italian",
    image: "https://images.furniturevillage.co.uk/f_auto,t_product_large/v1567757364/catalog/sofas-chairs/milano/milano_hero_sofa_cream_leather.jpg",
    store: "Furniture Village", link: "https://www.furniturevillage.co.uk/milano-sofa"
  },

  // Minimalistic Sofas
  {
    id: "mi_s1", name: "IKEA KLIPPAN 2-seat Sofa", price: "£279", furnitureType: "sofa", style: "minimalistic",
    image: "https://www.ikea.com/gb/en/images/products/klippan-2-seat-sofa-vissle-grey__0910187_pe787996_s5.jpg",
    store: "IKEA UK", link: "https://www.ikea.com/gb/en/p/klippan-2-seat-sofa-vissle-grey-40392519/"
  },
  {
    id: "mi_s2", name: "IKEA SODERHAMN 3-seat Sofa", price: "£495", furnitureType: "sofa", style: "minimalistic",
    image: "https://www.ikea.com/gb/en/images/products/soederhamn-3-seat-sofa-viarp-beige-brown__0978715_pe814328_s5.jpg",
    store: "IKEA UK", link: "https://www.ikea.com/gb/en/p/soederhamn-3-seat-sofa-viarp-beige-brown-s49305151/"
  },
  {
    id: "mi_s3", name: "Made Tubby 2 Seater Sofa", price: "£649", furnitureType: "sofa", style: "minimalistic",
    image: "https://img.made.com/image/upload/c_pad,d_madex_photogrey.svg,f_auto,w_982,h_654/v1/catalogue/product/furniture/seating/sofas/SOFTUB002CHA_UK/Tubby_2_Seater_Sofa_Charcoal_Grey_angle.png",
    store: "Made.com", link: "https://www.made.com/tubby-2-seater-sofa-charcoal-grey"
  },

  // Tables - Italian
  {
    id: "it_t1", name: "Made Dante Dining Table", price: "£899", furnitureType: "table", style: "italian",
    image: "https://img.made.com/image/upload/c_pad,d_madex_photogrey.svg,f_auto,w_982,h_654/v1/catalogue/product/furniture/dining/dining-tables/TABDAN001WAL_UK/Dante_Dining_Table_Walnut_angle.png",
    store: "Made.com", link: "https://www.made.com/dante-dining-table-walnut"
  },
  {
    id: "it_t2", name: "John Lewis Carrara Marble Table", price: "£1299", furnitureType: "table", style: "italian",
    image: "https://johnlewis.scene7.com/is/image/JohnLewis/238520948?$rsp-pdp-port-640$",
    store: "John Lewis", link: "https://www.johnlewis.com/carrara-marble-dining-table/p238520948"
  },
  {
    id: "it_t3", name: "Heals Milano Oak Table", price: "£1599", furnitureType: "table", style: "italian",
    image: "https://www.heals.com/media/catalog/product/m/i/milano-oak-dining-table_1.jpg",
    store: "Heals", link: "https://www.heals.com/milano-oak-dining-table.html"
  },

  // Tables - Minimalistic
  {
    id: "mi_t1", name: "IKEA LISABO Table", price: "£149", furnitureType: "table", style: "minimalistic",
    image: "https://www.ikea.com/gb/en/images/products/lisabo-table-ash-veneer__0737092_pe740877_s5.jpg",
    store: "IKEA UK", link: "https://www.ikea.com/gb/en/p/lisabo-table-ash-veneer-70297479/"
  },
  {
    id: "mi_t2", name: "Habitat Kilo Dining Table", price: "£350", furnitureType: "table", style: "minimalistic",
    image: "https://images.habitat.co.uk/is/image/Habitat/195628_1?$PRODUCT_LISTING$",
    store: "Habitat", link: "https://www.habitat.co.uk/kilo-dining-table-195628"
  },
  {
    id: "mi_t3", name: "Wayfair Karla Table", price: "£289", furnitureType: "table", style: "minimalistic",
    image: "https://secure.img1-fg.wfcdn.com/im/30359482/resize-h800-w800%5Ecompr-r85/1396/139622901/karla-dining-table.jpg",
    store: "Wayfair UK", link: "https://www.wayfair.co.uk/furniture/pdp/karla-dining-table-BNRS2072.html"
  },

  // Carpets - Italian
  {
    id: "it_ca1", name: "Made Fara Italian Rug", price: "£249", furnitureType: "carpet", style: "italian",
    image: "https://img.made.com/image/upload/c_pad,d_madex_photogrey.svg,f_auto,w_982,h_654/v1/catalogue/product/home/rugs/large-rugs/RUGFAR001RED_UK/Fara_Large_Rug_Red_angle.png",
    store: "Made.com", link: "https://www.made.com/fara-large-rug-red"
  },
  {
    id: "it_ca2", name: "John Lewis Venetian Rug", price: "£399", furnitureType: "carpet", style: "italian",
    image: "https://johnlewis.scene7.com/is/image/JohnLewis/238027195?$rsp-pdp-port-640$",
    store: "John Lewis", link: "https://www.johnlewis.com/venetian-rug/p238027195"
  },
  {
    id: "it_ca3", name: "Heals Palazzo Rug", price: "£599", furnitureType: "carpet", style: "italian",
    image: "https://www.heals.com/media/catalog/product/p/a/palazzo-rug-cream_1.jpg",
    store: "Heals", link: "https://www.heals.com/palazzo-rug-cream.html"
  },

  // Carpets - Minimalistic
  {
    id: "mi_ca1", name: "IKEA STOENSE Rug", price: "£85", furnitureType: "carpet", style: "minimalistic",
    image: "https://www.ikea.com/gb/en/images/products/stoense-rug-low-pile-medium-grey__0607144_pe683061_s5.jpg",
    store: "IKEA UK", link: "https://www.ikea.com/gb/en/p/stoense-rug-low-pile-medium-grey-00308791/"
  },
  {
    id: "mi_ca2", name: "Habitat Harper Rug", price: "£149", furnitureType: "carpet", style: "minimalistic",
    image: "https://images.habitat.co.uk/is/image/Habitat/197563_1?$PRODUCT_LISTING$",
    store: "Habitat", link: "https://www.habitat.co.uk/harper-rug-197563"
  },
  {
    id: "mi_ca3", name: "Made Loma Rug", price: "£199", furnitureType: "carpet", style: "minimalistic",
    image: "https://img.made.com/image/upload/c_pad,d_madex_photogrey.svg,f_auto,w_982,h_654/v1/catalogue/product/home/rugs/large-rugs/RUGLOM001BEI_UK/Loma_Large_Rug_Beige_angle.png",
    store: "Made.com", link: "https://www.made.com/loma-large-rug-beige"
  }
];

export const VisualizationResults = ({
  roomImage, selections, onBack, onStartOver
}: VisualizationResultsProps) => {
  const [cleanedImages, setCleanedImages] = useState<{ [id: string]: string }>({});
  const [loading, setLoading] = useState(true);
  const [scales, setScales] = useState<{ [id: string]: number }>({});
  const [rotations, setRotations] = useState<{ [id: string]: number }>({});
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Fix case sensitivity issue by converting to lowercase for comparison
  const products = CATALOGUE.filter(p =>
    p.furnitureType.toLowerCase() === selections.furnitureType.toLowerCase() && 
    p.style.toLowerCase() === selections.style.toLowerCase()
  ).slice(0, 3);

  console.log('VisualizationResults - selections:', selections);
  console.log('VisualizationResults - filtered products:', products);
  console.log('VisualizationResults - selectedProduct:', selectedProduct);

  useEffect(() => {
    // Set the first product as selected by default
    if (products.length > 0 && !selectedProduct) {
      console.log('Setting first product as selected:', products[0]);
      setSelectedProduct(products[0]);
    }
  }, [products, selectedProduct]);

  useEffect(() => {
    let active = true;
    const loadImages = async () => {
      console.log('Starting to load images for products:', products.length);
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
          console.log('Background removed for product:', product.id);
        } catch (error) {
          console.log('Failed to remove background for product:', product.id, error);
          updated[product.id] = product.image;
        }
      }
      if (active) {
        setCleanedImages(updated);
        setLoading(false);
        console.log('All images loaded, loading set to false');
      }
    };
    
    if (products.length > 0) {
      loadImages();
    } else {
      setLoading(false);
      console.log('No products found, setting loading to false');
    }
    
    return () => { active = false; };
  }, [products]);

  const handleTouchStart = (id: string, e: React.TouchEvent<HTMLImageElement>) => {
    if (e.touches.length === 2) {
      e.preventDefault();
    }
  };

  const handleTouchMove = (id: string, e: React.TouchEvent<HTMLImageElement>) => {
    if (e.touches.length === 2) {
      e.preventDefault();
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const distance = Math.sqrt(
        Math.pow(touch2.clientX - touch1.clientX, 2) + 
        Math.pow(touch2.clientY - touch1.clientY, 2)
      );
      
      // Simple pinch detection
      const newScale = Math.max(0.3, Math.min(distance / 100, 3));
      setScales(prev => ({ ...prev, [id]: newScale }));
    }
  };

  const handleWheel = (id: string, e: React.WheelEvent<HTMLImageElement>) => {
    e.preventDefault();
    const newScale = (scales[id] || 1) + (e.deltaY < 0 ? 0.1 : -0.1);
    setScales(prev => ({ ...prev, [id]: Math.max(0.3, Math.min(newScale, 3)) }));
  };

  const handleDoubleClick = (id: string) => {
    const newRotation = (rotations[id] || 0) + 90;
    setRotations(prev => ({ ...prev, [id]: newRotation % 360 }));
  };

  if (products.length === 0) {
    return (
      <div className="p-4 space-y-4">
        <div className="text-center py-8">
          <h3 className="text-lg font-semibold text-gray-600">
            No furniture found for {selections.style} {selections.furnitureType}
          </h3>
          <p className="text-gray-500 mt-2">Please try a different combination.</p>
        </div>
        <div className="flex justify-between mt-6">
          <Button onClick={onBack} variant="outline">Back</Button>
          <Button onClick={onStartOver} variant="destructive">Start Over</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      {/* Visualization Mockup */}
      <div className="relative border rounded overflow-hidden">
        <img src={roomImage} alt="Room" className="w-full object-cover" />
        {!loading && selectedProduct && cleanedImages[selectedProduct.id] && (
          <Draggable key={selectedProduct.id}>
            <img
              src={cleanedImages[selectedProduct.id]}
              alt={selectedProduct.name}
              className="absolute top-10 left-10 drop-shadow-xl touch-none cursor-move"
              onTouchStart={(e) => handleTouchStart(selectedProduct.id, e)}
              onTouchMove={(e) => handleTouchMove(selectedProduct.id, e)}
              onWheel={(e) => handleWheel(selectedProduct.id, e)}
              onDoubleClick={() => handleDoubleClick(selectedProduct.id)}
              style={{ 
                width: `${(scales[selectedProduct.id] || 1) * 160}px`, 
                zIndex: 10,
                transform: `rotate(${rotations[selectedProduct.id] || 0}deg)`
              }}
            />
          </Draggable>
        )}
      </div>

      {/* Product Selection Cards */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Choose from {products.length} options:</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {products.map(product => (
            <Card 
              key={product.id} 
              className={`p-4 cursor-pointer transition-all ${
                selectedProduct?.id === product.id 
                  ? 'border-green-500 bg-green-50' 
                  : 'hover:bg-gray-50'
              }`}
              onClick={() => setSelectedProduct(product)}
            >
              <img 
                src={cleanedImages[product.id] || product.image} 
                alt={product.name}
                className="w-full h-40 object-contain mb-2 bg-white rounded" 
              />
              <div className="text-lg font-bold">{product.name}</div>
              <div className="text-green-600 font-semibold">{product.price}</div>
              <a
                href={product.link}
                target="_blank"
                rel="noreferrer"
                className="mt-2 block bg-black text-white text-center py-2 rounded hover:bg-gray-800 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                Buy on {product.store}
              </a>
            </Card>
          ))}
        </div>
      </div>

      <div className="flex justify-between mt-6">
        <Button onClick={onBack} variant="outline">Back</Button>
        <Button onClick={onStartOver} variant="destructive">Start Over</Button>
      </div>
    </div>
  );
};

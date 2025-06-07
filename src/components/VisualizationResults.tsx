import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { UserSelections } from "@/pages/Index";
import Draggable from "react-draggable";
import { removeBackground, loadImage } from "@/utils/backgroundRemoval";

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

  // Oriental Sofas
  {
    id: "or_s1", name: "John Lewis Kyoto Sofa", price: "£1199", furnitureType: "sofa", style: "oriental",
    image: "https://johnlewis.scene7.com/is/image/JohnLewis/238520945?$rsp-pdp-port-640$",
    store: "John Lewis", link: "https://www.johnlewis.com/kyoto-sofa/p238520945"
  },
  {
    id: "or_s2", name: "Swoon Hanoi Sofa", price: "£1349", furnitureType: "sofa", style: "oriental",
    image: "https://cdn.swooneditions.com/images/v1/product-images/SOFHAN003NAV_1.jpg",
    store: "Swoon Editions", link: "https://swooneditions.com/hanoi-sofa-navy"
  },
  {
    id: "or_s3", name: "Heals Oriental Style Sofa", price: "£1599", furnitureType: "sofa", style: "oriental",
    image: "https://www.heals.com/media/catalog/product/o/r/oriental-style-sofa_1.jpg",
    store: "Heals", link: "https://www.heals.com/oriental-style-sofa.html"
  },

  // Classic Sofas
  {
    id: "cl_s1", name: "Cotswold Chesterfield Sofa", price: "£1499", furnitureType: "sofa", style: "classic",
    image: "https://www.cotswoldco.com/media/catalog/product/c/h/chesterfield-sofa-brown_1.jpg",
    store: "Cotswold Co", link: "https://www.cotswoldco.com/chesterfield-sofa-brown"
  },
  {
    id: "cl_s2", name: "DFS Heritage Sofa", price: "£1299", furnitureType: "sofa", style: "classic",
    image: "https://images.dfs.co.uk/i/dfs/heritage_sofa_brown_leather?$large$",
    store: "DFS", link: "https://www.dfs.co.uk/heritage-sofa"
  },
  {
    id: "cl_s3", name: "Furniture Village Classic Sofa", price: "£1699", furnitureType: "sofa", style: "classic",
    image: "https://images.furniturevillage.co.uk/f_auto,t_product_large/v1567757364/catalog/sofas-chairs/classic/classic_hero_sofa_cream.jpg",
    store: "Furniture Village", link: "https://www.furniturevillage.co.uk/classic-sofa"
  },

  // Modern Sofas
  {
    id: "mo_s1", name: "Made Oskar Sofa", price: "£999", furnitureType: "sofa", style: "modern",
    image: "https://img.made.com/image/upload/c_pad,d_madex_photogrey.svg,f_auto,w_982,h_654/v1/catalogue/product/furniture/seating/sofas/SOFOS003NAV_UK/Oskar_3_Seater_Sofa_Navy_Blue_angle.png",
    store: "Made.com", link: "https://www.made.com/oskar-3-seater-sofa-navy-blue"
  },
  {
    id: "mo_s2", name: "Wayfair Modern Sectional", price: "£1199", furnitureType: "sofa", style: "modern",
    image: "https://secure.img1-fg.wfcdn.com/im/30359482/resize-h800-w800%5Ecompr-r85/1396/139622902/modern-sectional-sofa.jpg",
    store: "Wayfair UK", link: "https://www.wayfair.co.uk/furniture/pdp/modern-sectional-sofa-BNRS2073.html"
  },
  {
    id: "mo_s3", name: "Habitat Bond Sofa", price: "£899", furnitureType: "sofa", style: "modern",
    image: "https://images.habitat.co.uk/is/image/Habitat/197446_1?$PRODUCT_LISTING$",
    store: "Habitat", link: "https://www.habitat.co.uk/bond-sofa-197446"
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

  // Tables - Oriental
  {
    id: "or_t1", name: "John Lewis Bamboo Table", price: "£699", furnitureType: "table", style: "oriental",
    image: "https://johnlewis.scene7.com/is/image/JohnLewis/238520950?$rsp-pdp-port-640$",
    store: "John Lewis", link: "https://www.johnlewis.com/bamboo-dining-table/p238520950"
  },
  {
    id: "or_t2", name: "Swoon Oriental Dining Table", price: "£799", furnitureType: "table", style: "oriental",
    image: "https://cdn.swooneditions.com/images/v1/product-images/TABORI001DAR_1.jpg",
    store: "Swoon Editions", link: "https://swooneditions.com/oriental-dining-table-dark"
  },
  {
    id: "or_t3", name: "Heals Japanese Style Table", price: "£1199", furnitureType: "table", style: "oriental",
    image: "https://www.heals.com/media/catalog/product/j/a/japanese-style-table_1.jpg",
    store: "Heals", link: "https://www.heals.com/japanese-style-table.html"
  },

  // Tables - Classic
  {
    id: "cl_t1", name: "Cotswold Oak Dining Table", price: "£899", furnitureType: "table", style: "classic",
    image: "https://www.cotswoldco.com/media/catalog/product/o/a/oak-dining-table_1.jpg",
    store: "Cotswold Co", link: "https://www.cotswoldco.com/oak-dining-table"
  },
  {
    id: "cl_t2", name: "DFS Traditional Table", price: "£799", furnitureType: "table", style: "classic",
    image: "https://images.dfs.co.uk/i/dfs/traditional_dining_table?$large$",
    store: "DFS", link: "https://www.dfs.co.uk/traditional-dining-table"
  },
  {
    id: "cl_t3", name: "Furniture Village Heritage Table", price: "£1099", furnitureType: "table", style: "classic",
    image: "https://images.furniturevillage.co.uk/f_auto,t_product_large/v1567757364/catalog/dining/heritage/heritage_hero_table_oak.jpg",
    store: "Furniture Village", link: "https://www.furniturevillage.co.uk/heritage-dining-table"
  },

  // Tables - Modern
  {
    id: "mo_t1", name: "Made Enzo Dining Table", price: "£649", furnitureType: "table", style: "modern",
    image: "https://img.made.com/image/upload/c_pad,d_madex_photogrey.svg,f_auto,w_982,h_654/v1/catalogue/product/furniture/dining/dining-tables/TABENZ001BLA_UK/Enzo_Dining_Table_Black_angle.png",
    store: "Made.com", link: "https://www.made.com/enzo-dining-table-black"
  },
  {
    id: "mo_t2", name: "Wayfair Contemporary Table", price: "£549", furnitureType: "table", style: "modern",
    image: "https://secure.img1-fg.wfcdn.com/im/30359482/resize-h800-w800%5Ecompr-r85/1396/139622903/contemporary-dining-table.jpg",
    store: "Wayfair UK", link: "https://www.wayfair.co.uk/furniture/pdp/contemporary-dining-table-BNRS2074.html"
  },
  {
    id: "mo_t3", name: "Habitat Matrix Table", price: "£599", furnitureType: "table", style: "modern",
    image: "https://images.habitat.co.uk/is/image/Habitat/197447_1?$PRODUCT_LISTING$",
    store: "Habitat", link: "https://www.habitat.co.uk/matrix-table-197447"
  },

  // Beds - Italian
  {
    id: "it_b1", name: "Made Ricola Bed", price: "£999", furnitureType: "bed", style: "italian",
    image: "https://img.made.com/image/upload/c_pad,d_madex_photogrey.svg,f_auto,w_982,h_654/v1/catalogue/product/furniture/bedroom/beds/BEDRIC001VEL_UK/Ricola_Bed_Velvet_angle.png",
    store: "Made.com", link: "https://www.made.com/ricola-bed-velvet"
  },
  {
    id: "it_b2", name: "John Lewis Tuscan Bed", price: "£1299", furnitureType: "bed", style: "italian",
    image: "https://johnlewis.scene7.com/is/image/JohnLewis/238520951?$rsp-pdp-port-640$",
    store: "John Lewis", link: "https://www.johnlewis.com/tuscan-bed/p238520951"
  },
  {
    id: "it_b3", name: "Heals Milano Leather Bed", price: "£1899", furnitureType: "bed", style: "italian",
    image: "https://www.heals.com/media/catalog/product/m/i/milano-leather-bed_1.jpg",
    store: "Heals", link: "https://www.heals.com/milano-leather-bed.html"
  },

  // Beds - Minimalistic
  {
    id: "mi_b1", name: "IKEA MALM Bed", price: "£199", furnitureType: "bed", style: "minimalistic",
    image: "https://www.ikea.com/gb/en/images/products/malm-bed-frame-high-white__0749131_pe745499_s5.jpg",
    store: "IKEA UK", link: "https://www.ikea.com/gb/en/p/malm-bed-frame-high-white-00160867/"
  },
  {
    id: "mi_b2", name: "Habitat Scandi Bed", price: "£399", furnitureType: "bed", style: "minimalistic",
    image: "https://images.habitat.co.uk/is/image/Habitat/197448_1?$PRODUCT_LISTING$",
    store: "Habitat", link: "https://www.habitat.co.uk/scandi-bed-197448"
  },
  {
    id: "mi_b3", name: "Wayfair Clean Line Bed", price: "£349", furnitureType: "bed", style: "minimalistic",
    image: "https://secure.img1-fg.wfcdn.com/im/30359482/resize-h800-w800%5Ecompr-r85/1396/139622904/clean-line-bed.jpg",
    store: "Wayfair UK", link: "https://www.wayfair.co.uk/furniture/pdp/clean-line-bed-BNRS2075.html"
  },

  // Beds - Oriental
  {
    id: "or_b1", name: "John Lewis Zen Platform Bed", price: "£899", furnitureType: "bed", style: "oriental",
    image: "https://johnlewis.scene7.com/is/image/JohnLewis/238520952?$rsp-pdp-port-640$",
    store: "John Lewis", link: "https://www.johnlewis.com/zen-platform-bed/p238520952"
  },
  {
    id: "or_b2", name: "Swoon Futon Style Bed", price: "£749", furnitureType: "bed", style: "oriental",
    image: "https://cdn.swooneditions.com/images/v1/product-images/BEDFUT001DAR_1.jpg",
    store: "Swoon Editions", link: "https://swooneditions.com/futon-style-bed-dark"
  },
  {
    id: "or_b3", name: "Heals Japanese Low Bed", price: "£1299", furnitureType: "bed", style: "oriental",
    image: "https://www.heals.com/media/catalog/product/j/a/japanese-low-bed_1.jpg",
    store: "Heals", link: "https://www.heals.com/japanese-low-bed.html"
  },

  // Beds - Classic
  {
    id: "cl_b1", name: "Cotswold Oak Sleigh Bed", price: "£1199", furnitureType: "bed", style: "classic",
    image: "https://www.cotswoldco.com/media/catalog/product/o/a/oak-sleigh-bed_1.jpg",
    store: "Cotswold Co", link: "https://www.cotswoldco.com/oak-sleigh-bed"
  },
  {
    id: "cl_b2", name: "DFS Traditional Upholstered Bed", price: "£999", furnitureType: "bed", style: "classic",
    image: "https://images.dfs.co.uk/i/dfs/traditional_upholstered_bed?$large$",
    store: "DFS", link: "https://www.dfs.co.uk/traditional-upholstered-bed"
  },
  {
    id: "cl_b3", name: "Furniture Village Heritage Bed", price: "£1399", furnitureType: "bed", style: "classic",
    image: "https://images.furniturevillage.co.uk/f_auto,t_product_large/v1567757364/catalog/bedroom/heritage/heritage_hero_bed_oak.jpg",
    store: "Furniture Village", link: "https://www.furniturevillage.co.uk/heritage-bed"
  },

  // Beds - Modern
  {
    id: "mo_b1", name: "Made Alexia Bed", price: "£799", furnitureType: "bed", style: "modern",
    image: "https://img.made.com/image/upload/c_pad,d_madex_photogrey.svg,f_auto,w_982,h_654/v1/catalogue/product/furniture/bedroom/beds/BEDALE001BLA_UK/Alexia_Bed_Black_angle.png",
    store: "Made.com", link: "https://www.made.com/alexia-bed-black"
  },
  {
    id: "mo_b2", name: "Wayfair Platform Bed", price: "£649", furnitureType: "bed", style: "modern",
    image: "https://secure.img1-fg.wfcdn.com/im/30359482/resize-h800-w800%5Ecompr-r85/1396/139622905/platform-bed-modern.jpg",
    store: "Wayfair UK", link: "https://www.wayfair.co.uk/furniture/pdp/platform-bed-modern-BNRS2076.html"
  },
  {
    id: "mo_b3", name: "Habitat Curve Bed", price: "£899", furnitureType: "bed", style: "modern",
    image: "https://images.habitat.co.uk/is/image/Habitat/197449_1?$PRODUCT_LISTING$",
    store: "Habitat", link: "https://www.habitat.co.uk/curve-bed-197449"
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
  },

  // Carpets - Oriental
  {
    id: "or_ca1", name: "John Lewis Persian Rug", price: "£799", furnitureType: "carpet", style: "oriental",
    image: "https://johnlewis.scene7.com/is/image/JohnLewis/238520953?$rsp-pdp-port-640$",
    store: "John Lewis", link: "https://www.johnlewis.com/persian-rug/p238520953"
  },
  {
    id: "or_ca2", name: "Swoon Oriental Pattern Rug", price: "£649", furnitureType: "carpet", style: "oriental",
    image: "https://cdn.swooneditions.com/images/v1/product-images/RUGORI001RED_1.jpg",
    store: "Swoon Editions", link: "https://swooneditions.com/oriental-pattern-rug-red"
  },
  {
    id: "or_ca3", name: "Heals Mandala Rug", price: "£899", furnitureType: "carpet", style: "oriental",
    image: "https://www.heals.com/media/catalog/product/m/a/mandala-rug-blue_1.jpg",
    store: "Heals", link: "https://www.heals.com/mandala-rug-blue.html"
  },

  // Carpets - Classic
  {
    id: "cl_ca1", name: "Cotswold Traditional Rug", price: "£399", furnitureType: "carpet", style: "classic",
    image: "https://www.cotswoldco.com/media/catalog/product/t/r/traditional-rug-red_1.jpg",
    store: "Cotswold Co", link: "https://www.cotswoldco.com/traditional-rug-red"
  },
  {
    id: "cl_ca2", name: "DFS Heritage Carpet", price: "£499", furnitureType: "carpet", style: "classic",
    image: "https://images.dfs.co.uk/i/dfs/heritage_carpet_cream?$large$",
    store: "DFS", link: "https://www.dfs.co.uk/heritage-carpet"
  },
  {
    id: "cl_ca3", name: "Furniture Village Classic Rug", price: "£549", furnitureType: "carpet", style: "classic",
    image: "https://images.furniturevillage.co.uk/f_auto,t_product_large/v1567757364/catalog/rugs/classic/classic_hero_rug_burgundy.jpg",
    store: "Furniture Village", link: "https://www.furniturevillage.co.uk/classic-rug"
  },

  // Carpets - Modern
  {
    id: "mo_ca1", name: "Made Kala Abstract Rug", price: "£299", furnitureType: "carpet", style: "modern",
    image: "https://img.made.com/image/upload/c_pad,d_madex_photogrey.svg,f_auto,w_982,h_654/v1/catalogue/product/home/rugs/large-rugs/RUGKAL001BLU_UK/Kala_Large_Rug_Blue_angle.png",
    store: "Made.com", link: "https://www.made.com/kala-large-rug-blue"
  },
  {
    id: "mo_ca2", name: "Wayfair Contemporary Rug", price: "£349", furnitureType: "carpet", style: "modern",
    image: "https://secure.img1-fg.wfcdn.com/im/30359482/resize-h800-w800%5Ecompr-r85/1396/139622906/contemporary-rug-modern.jpg",
    store: "Wayfair UK", link: "https://www.wayfair.co.uk/furniture/pdp/contemporary-rug-modern-BNRS2077.html"
  },
  {
    id: "mo_ca3", name: "Habitat Matrix Pattern Rug", price: "£279", furnitureType: "carpet", style: "modern",
    image: "https://images.habitat.co.uk/is/image/Habitat/197450_1?$PRODUCT_LISTING$",
    store: "Habitat", link: "https://www.habitat.co.uk/matrix-pattern-rug-197450"
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
          console.log('Processing background removal for:', product.name);
          
          // Fetch the image as a blob first
          const response = await fetch(product.image);
          const imageBlob = await response.blob();
          
          // Load the image element from the blob
          const imageElement = await loadImage(imageBlob);
          
          // Remove background and get the processed blob
          const processedBlob = await removeBackground(imageElement);
          
          // Create URL from the processed blob
          updated[product.id] = URL.createObjectURL(processedBlob);
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

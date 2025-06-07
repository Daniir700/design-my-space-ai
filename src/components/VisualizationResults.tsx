import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Draggable from "react-draggable";
import { UserSelections } from "@/pages/Index";

interface Product {
  id: string;
  name: string;
  image: string;
  style: string;
  furnitureType: string;
  price: string;
  store: string;
  link: string;
}

interface VisualizationResultsProps {
  roomImage: string;
  selections: UserSelections;
  onBack: () => void;
  onStartOver: () => void;
}

const CATALOGUE: Product[] = [
  // Italian Sofas
  {
    id: "it_s1",
    name: "Milano 3 Seater Sofa",
    image: "https://images.made.com/image/upload/c_pad,d_madeplusgrey.svg,f_auto,w_982/v1/catalog/product/asset/SOFMIL031GRY_UK_FRONT.png",
    style: "italian",
    furnitureType: "sofa",
    price: "£1,299",
    store: "Made.com",
    link: "https://www.made.com/milano-3-seater-sofa-sterling-grey"
  },
  {
    id: "it_s2", 
    name: "Pisa Corner Sofa",
    image: "https://www.dfs.co.uk/dfsie/content/images/catalog/PIS0000000000052677/large/dfs-pisa-fabric-corner-sofa-mink.jpg",
    style: "italian",
    furnitureType: "sofa",
    price: "£1,899",
    store: "DFS",
    link: "https://www.dfs.co.uk/pisa"
  },
  {
    id: "it_s3",
    name: "Verona Leather Sofa",
    image: "https://www.furniturevillage.co.uk/images/verona-3-seater-sofa-tan-leather.jpg",
    style: "italian",
    furnitureType: "sofa", 
    price: "£2,199",
    store: "Furniture Village",
    link: "https://www.furniturevillage.co.uk/sofas/leather-sofas"
  },

  // Minimalistic Sofas
  {
    id: "min_s1",
    name: "KIVIK 3-seat sofa",
    image: "https://www.ikea.com/gb/en/images/products/kivik-3-seat-sofa-hillared-dark-blue__0603016_pe681506_s5.jpg",
    style: "minimalistic",
    furnitureType: "sofa",
    price: "£450",
    store: "IKEA",
    link: "https://www.ikea.com/gb/en/p/kivik-3-seat-sofa-hillared-dark-blue-s29307176/"
  },
  {
    id: "min_s2",
    name: "Zara 3 Seater Sofa",
    image: "https://images.made.com/image/upload/c_pad,d_madeplusgrey.svg,f_auto,w_982/v1/catalog/product/asset/SOFZAR003GRY_UK_FRONT.png",
    style: "minimalistic", 
    furnitureType: "sofa",
    price: "£999",
    store: "Made.com",
    link: "https://www.made.com/zara-3-seater-sofa-sterling-grey"
  },
  {
    id: "min_s3",
    name: "Oslo 3 Seater Sofa",
    image: "https://www.heals.com/media/catalog/product/o/s/oslo-3-seater-sofa-grey_1.jpg",
    style: "minimalistic",
    furnitureType: "sofa",
    price: "£1,199",
    store: "Heals",
    link: "https://www.heals.com/oslo-3-seater-sofa.html"
  },

  // Oriental Sofas
  {
    id: "or_s1",
    name: "Kyoto 3 Seater Sofa",
    image: "https://cdn.swooneditions.com/images/v1/product-images/SOFKYO003TAN_1.jpg",
    style: "oriental",
    furnitureType: "sofa",
    price: "£1,399",
    store: "Swoon Editions", 
    link: "https://swooneditions.com/kyoto-3-seater-sofa"
  },
  {
    id: "or_s2",
    name: "Bamboo Style Sofa",
    image: "https://www.habitat.co.uk/media/catalog/product/b/a/bamboo-3-seater-sofa_1.jpg",
    style: "oriental",
    furnitureType: "sofa",
    price: "£899",
    store: "Habitat",
    link: "https://www.habitat.co.uk/sofas"
  },
  {
    id: "or_s3",
    name: "Zen 3 Seater Sofa",
    image: "https://www.wayfair.co.uk/furniture/pdp/zen-3-seater-sofa-wfuk1234.html",
    style: "oriental",
    furnitureType: "sofa",
    price: "£1,099",
    store: "Wayfair UK",
    link: "https://www.wayfair.co.uk/furniture/sb0/sofas-c215386.html"
  },

  // Classic Sofas
  {
    id: "cl_s1",
    name: "Chesterfield 3 Seater",
    image: "https://www.dfs.co.uk/dfsie/content/images/catalog/CHE0000000000052677/large/dfs-chesterfield-leather-sofa-tan.jpg",
    style: "classic",
    furnitureType: "sofa",
    price: "£1,799",
    store: "DFS",
    link: "https://www.dfs.co.uk/chesterfield"
  },
  {
    id: "cl_s2",
    name: "Hampton 3 Seater Sofa",
    image: "https://www.johnlewis.com/content/dam/jl-customer-images/hampton-3-seater-sofa.jpg",
    style: "classic",
    furnitureType: "sofa",
    price: "£1,499",
    store: "John Lewis",
    link: "https://www.johnlewis.com/browse/home-garden/furniture/sofas/_/N-bvr"
  },
  {
    id: "cl_s3",
    name: "Kensington 3 Seater",
    image: "https://www.cotswoldco.com/media/catalog/product/k/e/kensington-3-seater-sofa_1.jpg",
    style: "classic",
    furnitureType: "sofa",
    price: "£1,899",
    store: "Cotswold Co",
    link: "https://www.cotswoldco.com/furniture/sofas"
  },

  // Modern Sofas
  {
    id: "mod_s1",
    name: "Flynn 3 Seater Sofa",
    image: "https://images.made.com/image/upload/c_pad,d_madeplusgrey.svg,f_auto,w_982/v1/catalog/product/asset/SOFFLN003GRY_UK_FRONT.png",
    style: "modern",
    furnitureType: "sofa",
    price: "£1,199",
    store: "Made.com",
    link: "https://www.made.com/flynn-3-seater-sofa"
  },
  {
    id: "mod_s2",
    name: "Nova 3 Seater Sofa",
    image: "https://www.wayfair.co.uk/furniture/pdp/nova-3-seater-sofa-modern-grey.html",
    style: "modern",
    furnitureType: "sofa",
    price: "£899",
    store: "Wayfair UK",
    link: "https://www.wayfair.co.uk/furniture/sb0/modern-sofas-c215386.html"
  },
  {
    id: "mod_s3",
    name: "Atlas 3 Seater Sofa",
    image: "https://www.heals.com/media/catalog/product/a/t/atlas-3-seater-sofa-charcoal_1.jpg",
    style: "modern",
    furnitureType: "sofa",
    price: "£1,399",
    store: "Heals",
    link: "https://www.heals.com/sofas"
  },

  // Italian Tables
  {
    id: "it_t1",
    name: "Venezia Dining Table",
    image: "https://images.made.com/image/upload/c_pad,d_madeplusgrey.svg,f_auto,w_982/v1/catalog/product/asset/TABVEN006WAL_UK_FRONT.png",
    style: "italian",
    furnitureType: "table",
    price: "£899",
    store: "Made.com",
    link: "https://www.made.com/venezia-6-seat-dining-table"
  },
  {
    id: "it_t2",
    name: "Tuscany Oak Table",
    image: "https://www.furniturevillage.co.uk/images/tuscany-dining-table-oak.jpg",
    style: "italian",
    furnitureType: "table",
    price: "£1,299",
    store: "Furniture Village",
    link: "https://www.furniturevillage.co.uk/dining-room/dining-tables"
  },
  {
    id: "it_t3",
    name: "Roma Marble Table",
    image: "https://www.heals.com/media/catalog/product/r/o/roma-marble-dining-table_1.jpg",
    style: "italian",
    furnitureType: "table",
    price: "£1,799",
    store: "Heals",
    link: "https://www.heals.com/dining-tables"
  },

  // Minimalistic Tables
  {
    id: "min_t1",
    name: "LISABO Table",
    image: "https://www.ikea.com/gb/en/images/products/lisabo-table-ash-veneer__0737092_pe740877_s5.jpg",
    style: "minimalistic",
    furnitureType: "table",
    price: "£180",
    store: "IKEA",
    link: "https://www.ikea.com/gb/en/p/lisabo-table-ash-veneer-40297952/"
  },
  {
    id: "min_t2",
    name: "Endo 6 Seat Table",
    image: "https://images.made.com/image/upload/c_pad,d_madeplusgrey.svg,f_auto,w_982/v1/catalog/product/asset/TABEND006OAK_UK_FRONT.png",
    style: "minimalistic",
    furnitureType: "table",
    price: "£699",
    store: "Made.com",
    link: "https://www.made.com/endo-6-seat-dining-table"
  },
  {
    id: "min_t3",
    name: "Oslo Dining Table",
    image: "https://www.heals.com/media/catalog/product/o/s/oslo-dining-table-white_1.jpg",
    style: "minimalistic",
    furnitureType: "table",
    price: "£899",
    store: "Heals",
    link: "https://www.heals.com/oslo-dining-table.html"
  },

  // Oriental Tables  
  {
    id: "or_t1",
    name: "Kyoto Dining Table",
    image: "https://cdn.swooneditions.com/images/v1/product-images/TABKYO006WAL_1.jpg",
    style: "oriental",
    furnitureType: "table",
    price: "£1,199",
    store: "Swoon Editions",
    link: "https://swooneditions.com/kyoto-6-seat-dining-table"
  },
  {
    id: "or_t2",
    name: "Bamboo Dining Table",
    image: "https://www.habitat.co.uk/media/catalog/product/b/a/bamboo-dining-table_1.jpg",
    style: "oriental",
    furnitureType: "table",
    price: "£799",
    store: "Habitat",
    link: "https://www.habitat.co.uk/dining-room/dining-tables"
  },
  {
    id: "or_t3",
    name: "Zen Dining Table",
    image: "https://www.wayfair.co.uk/furniture/pdp/zen-dining-table-natural-wood.html",
    style: "oriental",
    furnitureType: "table",
    price: "£999",
    store: "Wayfair UK",
    link: "https://www.wayfair.co.uk/furniture/sb0/dining-tables-c215728.html"
  },

  // Classic Tables
  {
    id: "cl_t1",
    name: "Henley Dining Table",
    image: "https://www.johnlewis.com/content/dam/jl-customer-images/henley-dining-table.jpg",
    style: "classic",
    furnitureType: "table",
    price: "£1,399",
    store: "John Lewis",
    link: "https://www.johnlewis.com/browse/home-garden/furniture/dining-room/_/N-bvs"
  },
  {
    id: "cl_t2",
    name: "Windsor Oak Table",
    image: "https://www.cotswoldco.com/media/catalog/product/w/i/windsor-oak-dining-table_1.jpg",
    style: "classic",
    furnitureType: "table",
    price: "£1,599",
    store: "Cotswold Co",
    link: "https://www.cotswoldco.com/furniture/dining-tables"
  },
  {
    id: "cl_t3",
    name: "Heritage Dining Table",
    image: "https://www.furniturevillage.co.uk/images/heritage-oak-dining-table.jpg",
    style: "classic",
    furnitureType: "table",
    price: "£1,799",
    store: "Furniture Village",
    link: "https://www.furniturevillage.co.uk/dining-room/dining-tables"
  },

  // Modern Tables
  {
    id: "mod_t1",
    name: "Apex 6 Seat Table",
    image: "https://images.made.com/image/upload/c_pad,d_madeplusgrey.svg,f_auto,w_982/v1/catalog/product/asset/TABAPE006BLK_UK_FRONT.png",
    style: "modern",
    furnitureType: "table",
    price: "£999",
    store: "Made.com",
    link: "https://www.made.com/apex-6-seat-dining-table"
  },
  {
    id: "mod_t2",
    name: "Linear Dining Table",
    image: "https://www.heals.com/media/catalog/product/l/i/linear-dining-table-walnut_1.jpg",
    style: "modern",
    furnitureType: "table",
    price: "£1,199",
    store: "Heals",
    link: "https://www.heals.com/linear-dining-table.html"
  },
  {
    id: "mod_t3",
    name: "Nova Glass Table",
    image: "https://www.wayfair.co.uk/furniture/pdp/nova-glass-dining-table-modern.html",
    style: "modern",
    furnitureType: "table",
    price: "£799",
    store: "Wayfair UK",
    link: "https://www.wayfair.co.uk/furniture/sb0/glass-dining-tables-c215728.html"
  },

  // Italian Chairs
  {
    id: "it_c1",
    name: "Milano Dining Chair",
    image: "https://images.made.com/image/upload/c_pad,d_madeplusgrey.svg,f_auto,w_982/v1/catalog/product/asset/CHMIL001TAN_UK_FRONT.png",
    style: "italian",
    furnitureType: "chair",
    price: "£199",
    store: "Made.com",
    link: "https://www.made.com/milano-dining-chair"
  },
  {
    id: "it_c2",
    name: "Pisa Leather Chair",
    image: "https://www.furniturevillage.co.uk/images/pisa-leather-dining-chair.jpg",
    style: "italian",
    furnitureType: "chair",
    price: "£299",
    store: "Furniture Village",
    link: "https://www.furniturevillage.co.uk/dining-room/dining-chairs"
  },
  {
    id: "it_c3",
    name: "Verona Chair",
    image: "https://www.heals.com/media/catalog/product/v/e/verona-dining-chair-tan_1.jpg",
    style: "italian",
    furnitureType: "chair",
    price: "£249",
    store: "Heals",
    link: "https://www.heals.com/dining-chairs"
  },

  // Minimalistic Chairs
  {
    id: "min_c1",
    name: "ODGER Chair",
    image: "https://www.ikea.com/gb/en/images/products/odger-chair-blue-green__0727320_pe735593_s5.jpg",
    style: "minimalistic",
    furnitureType: "chair",
    price: "£70",
    store: "IKEA",
    link: "https://www.ikea.com/gb/en/p/odger-chair-blue-green-70335228/"
  },
  {
    id: "min_c2",
    name: "Rae Dining Chair",
    image: "https://images.made.com/image/upload/c_pad,d_madeplusgrey.svg,f_auto,w_982/v1/catalog/product/asset/CHRAE001GRY_UK_FRONT.png",
    style: "minimalistic",
    furnitureType: "chair",
    price: "£149",
    store: "Made.com",
    link: "https://www.made.com/rae-dining-chair"
  },
  {
    id: "min_c3",
    name: "Oslo Chair",
    image: "https://www.heals.com/media/catalog/product/o/s/oslo-chair-white_1.jpg",
    style: "minimalistic",
    furnitureType: "chair",
    price: "£199",
    store: "Heals",
    link: "https://www.heals.com/oslo-chair.html"
  },

  // Oriental Chairs
  {
    id: "or_c1",
    name: "Kyoto Dining Chair",
    image: "https://cdn.swooneditions.com/images/v1/product-images/CHKYO001NAT_1.jpg",
    style: "oriental",
    furnitureType: "chair",
    price: "£179",
    store: "Swoon Editions",
    link: "https://swooneditions.com/kyoto-dining-chair"
  },
  {
    id: "or_c2",
    name: "Bamboo Chair",
    image: "https://www.habitat.co.uk/media/catalog/product/b/a/bamboo-dining-chair_1.jpg",
    style: "oriental",
    furnitureType: "chair",
    price: "£129",
    store: "Habitat",
    link: "https://www.habitat.co.uk/dining-room/dining-chairs"
  },
  {
    id: "or_c3",
    name: "Zen Chair",
    image: "https://www.wayfair.co.uk/furniture/pdp/zen-dining-chair-natural.html",
    style: "oriental",
    furnitureType: "chair",
    price: "£159",
    store: "Wayfair UK",
    link: "https://www.wayfair.co.uk/furniture/sb0/dining-chairs-c215485.html"
  },

  // Classic Chairs
  {
    id: "cl_c1",
    name: "Windsor Chair",
    image: "https://www.johnlewis.com/content/dam/jl-customer-images/windsor-dining-chair.jpg",
    style: "classic",
    furnitureType: "chair",
    price: "£229",
    store: "John Lewis",
    link: "https://www.johnlewis.com/browse/home-garden/furniture/dining-room/_/N-bvs"
  },
  {
    id: "cl_c2",
    name: "Heritage Oak Chair",
    image: "https://www.cotswoldco.com/media/catalog/product/h/e/heritage-oak-chair_1.jpg",
    style: "classic",
    furnitureType: "chair",
    price: "£279",
    store: "Cotswold Co",
    link: "https://www.cotswoldco.com/furniture/dining-chairs"
  },
  {
    id: "cl_c3",
    name: "Traditional Chair",
    image: "https://www.furniturevillage.co.uk/images/traditional-dining-chair.jpg",
    style: "classic",
    furnitureType: "chair",
    price: "£299",
    store: "Furniture Village",
    link: "https://www.furniturevillage.co.uk/dining-room/dining-chairs"
  },

  // Modern Chairs
  {
    id: "mod_c1",
    name: "Flynn Dining Chair",
    image: "https://images.made.com/image/upload/c_pad,d_madeplusgrey.svg,f_auto,w_982/v1/catalog/product/asset/CHFLN001GRY_UK_FRONT.png",
    style: "modern",
    furnitureType: "chair",
    price: "£179",
    store: "Made.com",
    link: "https://www.made.com/flynn-dining-chair"
  },
  {
    id: "mod_c2",
    name: "Linear Chair",
    image: "https://www.heals.com/media/catalog/product/l/i/linear-chair-charcoal_1.jpg",
    style: "modern",
    furnitureType: "chair",
    price: "£219",
    store: "Heals",
    link: "https://www.heals.com/linear-chair.html"
  },
  {
    id: "mod_c3",
    name: "Nova Chair",
    image: "https://www.wayfair.co.uk/furniture/pdp/nova-modern-chair-grey.html",
    style: "modern",
    furnitureType: "chair",
    price: "£189",
    store: "Wayfair UK",
    link: "https://www.wayfair.co.uk/furniture/sb0/modern-dining-chairs-c215485.html"
  },

  // Italian Beds
  {
    id: "it_b1",
    name: "Milano King Bed",
    image: "https://images.made.com/image/upload/c_pad,d_madeplusgrey.svg,f_auto,w_982/v1/catalog/product/asset/BEDMIL005TAN_UK_FRONT.png",
    style: "italian",
    furnitureType: "bed",
    price: "£1,299",
    store: "Made.com",
    link: "https://www.made.com/milano-king-size-bed"
  },
  {
    id: "it_b2",
    name: "Pisa Leather Bed",
    image: "https://www.furniturevillage.co.uk/images/pisa-leather-king-bed.jpg",
    style: "italian",
    furnitureType: "bed",
    price: "£1,599",
    store: "Furniture Village",
    link: "https://www.furniturevillage.co.uk/bedroom/beds"
  },
  {
    id: "it_b3",
    name: "Verona Upholstered Bed",
    image: "https://www.heals.com/media/catalog/product/v/e/verona-king-bed-grey_1.jpg",
    style: "italian",
    furnitureType: "bed",
    price: "£1,799",
    store: "Heals",
    link: "https://www.heals.com/beds"
  },

  // Minimalistic Beds
  {
    id: "min_b1",
    name: "MALM Bed frame",
    image: "https://www.ikea.com/gb/en/images/products/malm-bed-frame-white__0637519_pe698355_s5.jpg",
    style: "minimalistic",
    furnitureType: "bed",
    price: "£179",
    store: "IKEA",
    link: "https://www.ikea.com/gb/en/p/malm-bed-frame-white-s59009475/"
  },
  {
    id: "min_b2",
    name: "Rae King Bed",
    image: "https://images.made.com/image/upload/c_pad,d_madeplusgrey.svg,f_auto,w_982/v1/catalog/product/asset/BEDRAE005GRY_UK_FRONT.png",
    style: "minimalistic",
    furnitureType: "bed",
    price: "£899",
    store: "Made.com",
    link: "https://www.made.com/rae-king-size-bed"
  },
  {
    id: "min_b3",
    name: "Oslo Platform Bed",
    image: "https://www.heals.com/media/catalog/product/o/s/oslo-platform-bed-white_1.jpg",
    style: "minimalistic",
    furnitureType: "bed",
    price: "£1,199",
    store: "Heals",
    link: "https://www.heals.com/oslo-platform-bed.html"
  },

  // Oriental Beds
  {
    id: "or_b1",
    name: "Kyoto Platform Bed",
    image: "https://cdn.swooneditions.com/images/v1/product-images/BEDKYO005NAT_1.jpg",
    style: "oriental",
    furnitureType: "bed",
    price: "£1,199",
    store: "Swoon Editions",
    link: "https://swooneditions.com/kyoto-platform-bed"
  },
  {
    id: "or_b2",
    name: "Bamboo Bed Frame",
    image: "https://www.habitat.co.uk/media/catalog/product/b/a/bamboo-bed-frame_1.jpg",
    style: "oriental",
    furnitureType: "bed",
    price: "£899",
    store: "Habitat",
    link: "https://www.habitat.co.uk/bedroom/beds"
  },
  {
    id: "or_b3",
    name: "Zen Platform Bed",
    image: "https://www.wayfair.co.uk/furniture/pdp/zen-platform-bed-natural.html",
    style: "oriental",
    furnitureType: "bed",
    price: "£999",
    store: "Wayfair UK",
    link: "https://www.wayfair.co.uk/furniture/sb0/beds-c215356.html"
  },

  // Classic Beds
  {
    id: "cl_b1",
    name: "Windsor Sleigh Bed",
    image: "https://www.johnlewis.com/content/dam/jl-customer-images/windsor-sleigh-bed.jpg",
    style: "classic",
    furnitureType: "bed",
    price: "£1,399",
    store: "John Lewis",
    link: "https://www.johnlewis.com/browse/home-garden/furniture/bedroom/_/N-bvt"
  },
  {
    id: "cl_b2",
    name: "Heritage Oak Bed",
    image: "https://www.cotswoldco.com/media/catalog/product/h/e/heritage-oak-bed_1.jpg",
    style: "classic",
    furnitureType: "bed",
    price: "£1,599",
    store: "Cotswold Co",
    link: "https://www.cotswoldco.com/furniture/beds"
  },
  {
    id: "cl_b3",
    name: "Traditional Panel Bed",
    image: "https://www.furniturevillage.co.uk/images/traditional-panel-bed.jpg",
    style: "classic",
    furnitureType: "bed",
    price: "£1,799",
    store: "Furniture Village",
    link: "https://www.furniturevillage.co.uk/bedroom/beds"
  },

  // Modern Beds
  {
    id: "mod_b1",
    name: "Flynn Platform Bed",
    image: "https://images.made.com/image/upload/c_pad,d_madeplusgrey.svg,f_auto,w_982/v1/catalog/product/asset/BEDFLN005GRY_UK_FRONT.png",
    style: "modern",
    furnitureType: "bed",
    price: "£1,199",
    store: "Made.com",
    link: "https://www.made.com/flynn-platform-bed"
  },
  {
    id: "mod_b2",
    name: "Linear Upholstered Bed",
    image: "https://www.heals.com/media/catalog/product/l/i/linear-upholstered-bed-charcoal_1.jpg",
    style: "modern",
    furnitureType: "bed",
    price: "£1,399",
    store: "Heals",
    link: "https://www.heals.com/linear-upholstered-bed.html"
  },
  {
    id: "mod_b3",
    name: "Nova King Bed",
    image: "https://www.wayfair.co.uk/furniture/pdp/nova-modern-king-bed.html",
    style: "modern",
    furnitureType: "bed",
    price: "£999",
    store: "Wayfair UK",
    link: "https://www.wayfair.co.uk/furniture/sb0/modern-beds-c215356.html"
  },

  // Italian Carpets
  {
    id: "it_r1",
    name: "Milano Persian Rug",
    image: "https://images.made.com/image/upload/c_pad,d_madeplusgrey.svg,f_auto,w_982/v1/catalog/product/asset/RUGMIL200RED_UK_FRONT.png",
    style: "italian",
    furnitureType: "carpet",
    price: "£399",
    store: "Made.com",
    link: "https://www.made.com/milano-persian-rug"
  },
  {
    id: "it_r2",
    name: "Venetian Silk Rug",
    image: "https://www.heals.com/media/catalog/product/v/e/venetian-silk-rug_1.jpg",
    style: "italian",
    furnitureType: "carpet",
    price: "£899",
    store: "Heals",
    link: "https://www.heals.com/rugs"
  },
  {
    id: "it_r3",
    name: "Tuscany Wool Rug",
    image: "https://www.johnlewis.com/content/dam/jl-customer-images/tuscany-wool-rug.jpg",
    style: "italian",
    furnitureType: "carpet",
    price: "£599",
    store: "John Lewis",
    link: "https://www.johnlewis.com/browse/home-garden/home-accessories/rugs/_/N-bwa"
  },

  // Minimalistic Carpets
  {
    id: "min_r1",
    name: "STOCKHOLM Rug",
    image: "https://www.ikea.com/gb/en/images/products/stockholm-rug-flatwoven-handmade-stripe-grey__0607179_pe681771_s5.jpg",
    style: "minimalistic",
    furnitureType: "carpet",
    price: "£149",
    store: "IKEA",
    link: "https://www.ikea.com/gb/en/p/stockholm-rug-flatwoven-handmade-stripe-grey-50397246/"
  },
  {
    id: "min_r2",
    name: "Rae Geometric Rug",
    image: "https://images.made.com/image/upload/c_pad,d_madeplusgrey.svg,f_auto,w_982/v1/catalog/product/asset/RUGRAE200GRY_UK_FRONT.png",
    style: "minimalistic",
    furnitureType: "carpet",
    price: "£299",
    store: "Made.com",
    link: "https://www.made.com/rae-geometric-rug"
  },
  {
    id: "min_r3",
    name: "Oslo Minimal Rug",
    image: "https://www.heals.com/media/catalog/product/o/s/oslo-minimal-rug-cream_1.jpg",
    style: "minimalistic",
    furnitureType: "carpet",
    price: "£399",
    store: "Heals",
    link: "https://www.heals.com/oslo-minimal-rug.html"
  },

  // Oriental Carpets
  {
    id: "or_r1",
    name: "Kyoto Tatami Rug",
    image: "https://cdn.swooneditions.com/images/v1/product-images/RUGKYO200NAT_1.jpg",
    style: "oriental",
    furnitureType: "carpet",
    price: "£499",
    store: "Swoon Editions",
    link: "https://swooneditions.com/kyoto-tatami-rug"
  },
  {
    id: "or_r2",
    name: "Bamboo Weave Rug",
    image: "https://www.habitat.co.uk/media/catalog/product/b/a/bamboo-weave-rug_1.jpg",
    style: "oriental",
    furnitureType: "carpet",
    price: "£299",
    store: "Habitat",
    link: "https://www.habitat.co.uk/home-accessories/rugs"
  },
  {
    id: "or_r3",
    name: "Zen Garden Rug",
    image: "https://www.wayfair.co.uk/decor-pillows/pdp/zen-garden-rug-natural.html",
    style: "oriental",
    furnitureType: "carpet",
    price: "£399",
    store: "Wayfair UK",
    link: "https://www.wayfair.co.uk/decor-pillows/sb0/rugs-c215386.html"
  },

  // Classic Carpets
  {
    id: "cl_r1",
    name: "Windsor Traditional Rug",
    image: "https://www.johnlewis.com/content/dam/jl-customer-images/windsor-traditional-rug.jpg",
    style: "classic",
    furnitureType: "carpet",
    price: "£699",
    store: "John Lewis",
    link: "https://www.johnlewis.com/browse/home-garden/home-accessories/rugs/_/N-bwa"
  },
  {
    id: "cl_r2",
    name: "Heritage Persian Rug",
    image: "https://www.cotswoldco.com/media/catalog/product/h/e/heritage-persian-rug_1.jpg",
    style: "classic",
    furnitureType: "carpet",
    price: "£899",
    store: "Cotswold Co",
    link: "https://www.cotswoldco.com/home-accessories/rugs"
  },
  {
    id: "cl_r3",
    name: "Traditional Wool Rug",
    image: "https://www.furniturevillage.co.uk/images/traditional-wool-rug.jpg",
    style: "classic",
    furnitureType: "carpet",
    price: "£799",
    store: "Furniture Village",
    link: "https://www.furniturevillage.co.uk/home-accessories/rugs"
  },

  // Modern Carpets
  {
    id: "mod_r1",
    name: "Flynn Abstract Rug",
    image: "https://images.made.com/image/upload/c_pad,d_madeplusgrey.svg,f_auto,w_982/v1/catalog/product/asset/RUGFLN200GRY_UK_FRONT.png",
    style: "modern",
    furnitureType: "carpet",
    price: "£399",
    store: "Made.com",
    link: "https://www.made.com/flynn-abstract-rug"
  },
  {
    id: "mod_r2",
    name: "Linear Contemporary Rug",
    image: "https://www.heals.com/media/catalog/product/l/i/linear-contemporary-rug_1.jpg",
    style: "modern",
    furnitureType: "carpet",
    price: "£599",
    store: "Heals",
    link: "https://www.heals.com/linear-contemporary-rug.html"
  },
  {
    id: "mod_r3",
    name: "Nova Modern Rug",
    image: "https://www.wayfair.co.uk/decor-pillows/pdp/nova-modern-rug-grey.html",
    style: "modern",
    furnitureType: "carpet",
    price: "£499",
    store: "Wayfair UK",
    link: "https://www.wayfair.co.uk/decor-pillows/sb0/modern-rugs-c215386.html"
  }
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

export default function VisualizationResults({ roomImage, selections, onBack, onStartOver }: VisualizationResultsProps) {
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [processedImages, setProcessedImages] = useState<string[]>([]);

  useEffect(() => {
    const filtered = CATALOGUE.filter(
      (item) =>
        item.furnitureType.toLowerCase() === selections.furnitureType.toLowerCase() &&
        item.style.toLowerCase() === selections.style.toLowerCase()
    );
    setResults(filtered);
  }, [selections.furnitureType, selections.style]);

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

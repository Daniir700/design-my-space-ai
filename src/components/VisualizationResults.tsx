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
    name: "Luxury Italian Sofa",
    image: "https://media.johnlewiscontent.com/i/JohnLewis/240134234/Scott-Sofa-Range-RH.png",
    style: "italian",
    furnitureType: "sofa",
    price: "£1,299",
    store: "John Lewis",
    link: "https://www.johnlewis.com/furniture-lights/sofas/3-seater"
  },
  {
    id: "it_s2", 
    name: "Milano Style Sofa",
    image: "https://media.johnlewiscontent.com/i/JohnLewis/240134234/Scott-Sofa-Range-RH.png",
    style: "italian",
    furnitureType: "sofa",
    price: "£1,899",
    store: "Made.com",
    link: "https://www.made.com/shop/sofas"
  },
  {
    id: "it_s3",
    name: "Venetian Leather Sofa",
    image: "https://media.johnlewiscontent.com/i/JohnLewis/240134234/Scott-Sofa-Range-RH.png",
    style: "italian",
    furnitureType: "sofa", 
    price: "£2,199",
    store: "Wayfair UK",
    link: "https://www.wayfair.co.uk/furniture/sb1/3-seater-sofas-c1772837-a125355~399409.html"
  },

  // Minimalistic Sofas
  {
    id: "min_s1",
    name: "KIVIK 3-seat sofa",
    image: "https://www.ikea.com/gb/en/images/products/kivik-3-seat-sofa-tibbleby-beige-grey__0837214_pe732317_s5.jpg",
    style: "minimalistic",
    furnitureType: "sofa",
    price: "£450",
    store: "IKEA",
    link: "https://www.ikea.com/gb/en/p/kivik-3-seat-sofa-tibbleby-beige-grey-s69440596/"
  },
  {
    id: "min_s2",
    name: "KIVIK Anthracite Sofa",
    image: "https://www.ikea.com/gb/en/images/products/kivik-3-seat-sofa-tresund-anthracite__1023826_pe832602_s5.jpg",
    style: "minimalistic", 
    furnitureType: "sofa",
    price: "£399",
    store: "IKEA",
    link: "https://www.ikea.com/gb/en/p/kivik-3-seat-sofa-tresund-anthracite-s79482835/"
  },
  {
    id: "min_s3",
    name: "Simple Modern Sofa",
    image: "https://media.johnlewiscontent.com/i/JohnLewis/240134234/Scott-Sofa-Range-RH.png",
    style: "minimalistic",
    furnitureType: "sofa",
    price: "£899",
    store: "John Lewis",
    link: "https://www.johnlewis.com/furniture-lights/sofas"
  },

  // Oriental Sofas
  {
    id: "or_s1",
    name: "Zen Style Sofa",
    image: "https://media.johnlewiscontent.com/i/JohnLewis/240134234/Scott-Sofa-Range-RH.png",
    style: "oriental",
    furnitureType: "sofa",
    price: "£1,199",
    store: "John Lewis",
    link: "https://www.johnlewis.com/furniture-lights/sofas"
  },
  {
    id: "or_s2",
    name: "Eastern Inspired Sofa",
    image: "https://media.johnlewiscontent.com/i/JohnLewis/240134234/Scott-Sofa-Range-RH.png",
    style: "oriental",
    furnitureType: "sofa",
    price: "£999",
    store: "Made.com",
    link: "https://www.made.com/shop/sofas"
  },
  {
    id: "or_s3",
    name: "Asian Style Sofa",
    image: "https://media.johnlewiscontent.com/i/JohnLewis/240134234/Scott-Sofa-Range-RH.png",
    style: "oriental",
    furnitureType: "sofa",
    price: "£1,299",
    store: "Wayfair UK",
    link: "https://www.wayfair.co.uk/furniture/sb1/3-seater-sofas-c1772837-a125355~399409.html"
  },

  // Classic Sofas
  {
    id: "cl_s1",
    name: "Traditional Chesterfield",
    image: "https://media.johnlewiscontent.com/i/JohnLewis/240134234/Scott-Sofa-Range-RH.png",
    style: "classic",
    furnitureType: "sofa",
    price: "£1,799",
    store: "John Lewis",
    link: "https://www.johnlewis.com/furniture-lights/sofas"
  },
  {
    id: "cl_s2",
    name: "Heritage 3 Seater",
    image: "https://media.johnlewiscontent.com/i/JohnLewis/240134234/Scott-Sofa-Range-RH.png",
    style: "classic",
    furnitureType: "sofa",
    price: "£1,499",
    store: "Made.com",
    link: "https://www.made.com/shop/sofas"
  },
  {
    id: "cl_s3",
    name: "Classic English Sofa",
    image: "https://media.johnlewiscontent.com/i/JohnLewis/240134234/Scott-Sofa-Range-RH.png",
    style: "classic",
    furnitureType: "sofa",
    price: "£1,899",
    store: "Wayfair UK",
    link: "https://www.wayfair.co.uk/furniture/sb1/3-seater-sofas-c1772837-a125355~399409.html"
  },

  // Modern Sofas
  {
    id: "mod_s1",
    name: "Contemporary 3 Seater",
    image: "https://media.johnlewiscontent.com/i/JohnLewis/240134234/Scott-Sofa-Range-RH.png",
    style: "modern",
    furnitureType: "sofa",
    price: "£1,199",
    store: "Made.com",
    link: "https://www.made.com/shop/sofas"
  },
  {
    id: "mod_s2",
    name: "Modern Designer Sofa",
    image: "https://media.johnlewiscontent.com/i/JohnLewis/240134234/Scott-Sofa-Range-RH.png",
    style: "modern",
    furnitureType: "sofa",
    price: "£899",
    store: "IKEA",
    link: "https://www.ikea.com/gb/en/cat/kivik-series-18329/"
  },
  {
    id: "mod_s3",
    name: "Sleek Modern Sofa",
    image: "https://media.johnlewiscontent.com/i/JohnLewis/240134234/Scott-Sofa-Range-RH.png",
    style: "modern",
    furnitureType: "sofa",
    price: "£1,399",
    store: "Wayfair UK",
    link: "https://www.wayfair.co.uk/furniture/sb1/3-seater-sofas-c1772837-a125355~399409.html"
  },

  // Italian Tables
  {
    id: "it_t1",
    name: "Italian Dining Table",
    image: "https://www.ikea.com/gb/en/images/products/lisabo-table-ash-veneer__0737092_pe740877_s5.jpg",
    style: "italian",
    furnitureType: "table",
    price: "£899",
    store: "Made.com",
    link: "https://www.made.com/shop/dining-room-furniture/dining-tables"
  },
  {
    id: "it_t2",
    name: "Tuscan Oak Table",
    image: "https://www.ikea.com/gb/en/images/products/lisabo-table-ash-veneer__0737092_pe740877_s5.jpg",
    style: "italian",
    furnitureType: "table",
    price: "£1,299",
    store: "John Lewis",
    link: "https://www.johnlewis.com/furniture-lights/dining-room/dining-tables"
  },
  {
    id: "it_t3",
    name: "Roman Style Table",
    image: "https://www.ikea.com/gb/en/images/products/lisabo-table-ash-veneer__0737092_pe740877_s5.jpg",
    style: "italian",
    furnitureType: "table",
    price: "£1,799",
    store: "Wayfair UK",
    link: "https://www.wayfair.co.uk/furniture/c/dining-tables"
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
    link: "https://www.ikea.com/gb/en/cat/tables-chairs-fu002/"
  },
  {
    id: "min_t2",
    name: "Simple Dining Table",
    image: "https://www.ikea.com/gb/en/images/products/lisabo-table-ash-veneer__0737092_pe740877_s5.jpg",
    style: "minimalistic",
    furnitureType: "table",
    price: "£699",
    store: "Made.com",
    link: "https://www.made.com/shop/dining-room-furniture/dining-tables"
  },
  {
    id: "min_t3",
    name: "Clean Line Table",
    image: "https://www.ikea.com/gb/en/images/products/lisabo-table-ash-veneer__0737092_pe740877_s5.jpg",
    style: "minimalistic",
    furnitureType: "table",
    price: "£899",
    store: "John Lewis",
    link: "https://www.johnlewis.com/furniture-lights/dining-room/dining-tables"
  },

  // Oriental Tables  
  {
    id: "or_t1",
    name: "Eastern Style Table",
    image: "https://www.ikea.com/gb/en/images/products/lisabo-table-ash-veneer__0737092_pe740877_s5.jpg",
    style: "oriental",
    furnitureType: "table",
    price: "£1,199",
    store: "Made.com",
    link: "https://www.made.com/shop/dining-room-furniture/dining-tables"
  },
  {
    id: "or_t2",
    name: "Zen Dining Table",
    image: "https://www.ikea.com/gb/en/images/products/lisabo-table-ash-veneer__0737092_pe740877_s5.jpg",
    style: "oriental",
    furnitureType: "table",
    price: "£799",
    store: "John Lewis",
    link: "https://www.johnlewis.com/furniture-lights/dining-room/dining-tables"
  },
  {
    id: "or_t3",
    name: "Asian Inspired Table",
    image: "https://www.ikea.com/gb/en/images/products/lisabo-table-ash-veneer__0737092_pe740877_s5.jpg",
    style: "oriental",
    furnitureType: "table",
    price: "£999",
    store: "Wayfair UK",
    link: "https://www.wayfair.co.uk/furniture/c/dining-tables"
  },

  // Classic Tables
  {
    id: "cl_t1",
    name: "Traditional Dining Table",
    image: "https://www.ikea.com/gb/en/images/products/lisabo-table-ash-veneer__0737092_pe740877_s5.jpg",
    style: "classic",
    furnitureType: "table",
    price: "£1,399",
    store: "John Lewis",
    link: "https://www.johnlewis.com/furniture-lights/dining-room/dining-tables"
  },
  {
    id: "cl_t2",
    name: "Heritage Oak Table",
    image: "https://www.ikea.com/gb/en/images/products/lisabo-table-ash-veneer__0737092_pe740877_s5.jpg",
    style: "classic",
    furnitureType: "table",
    price: "£1,599",
    store: "Made.com",
    link: "https://www.made.com/shop/dining-room-furniture/dining-tables"
  },
  {
    id: "cl_t3",
    name: "Classic Wooden Table",
    image: "https://www.ikea.com/gb/en/images/products/lisabo-table-ash-veneer__0737092_pe740877_s5.jpg",
    style: "classic",
    furnitureType: "table",
    price: "£1,799",
    store: "Wayfair UK",
    link: "https://www.wayfair.co.uk/furniture/c/dining-tables"
  },

  // Modern Tables
  {
    id: "mod_t1",
    name: "Contemporary Dining Table",
    image: "https://www.ikea.com/gb/en/images/products/lisabo-table-ash-veneer__0737092_pe740877_s5.jpg",
    style: "modern",
    furnitureType: "table",
    price: "£999",
    store: "Made.com",
    link: "https://www.made.com/shop/dining-room-furniture/dining-tables"
  },
  {
    id: "mod_t2",
    name: "Modern Design Table",
    image: "https://www.ikea.com/gb/en/images/products/lisabo-table-ash-veneer__0737092_pe740877_s5.jpg",
    style: "modern",
    furnitureType: "table",
    price: "£1,199",
    store: "John Lewis",
    link: "https://www.johnlewis.com/furniture-lights/dining-room/dining-tables"
  },
  {
    id: "mod_t3",
    name: "Sleek Modern Table",
    image: "https://www.ikea.com/gb/en/images/products/lisabo-table-ash-veneer__0737092_pe740877_s5.jpg",
    style: "modern",
    furnitureType: "table",
    price: "£799",
    store: "IKEA",
    link: "https://www.ikea.com/gb/en/cat/tables-chairs-fu002/"
  },

  // Italian Chairs
  {
    id: "it_c1",
    name: "Italian Dining Chair",
    image: "https://www.ikea.com/gb/en/images/products/odger-chair-blue-green__0727320_pe735593_s5.jpg",
    style: "italian",
    furnitureType: "chair",
    price: "£199",
    store: "Made.com",
    link: "https://www.made.com/shop/dining-room-furniture/dining-chairs"
  },
  {
    id: "it_c2",
    name: "Milano Style Chair",
    image: "https://www.ikea.com/gb/en/images/products/odger-chair-blue-green__0727320_pe735593_s5.jpg",
    style: "italian",
    furnitureType: "chair",
    price: "£299",
    store: "John Lewis",
    link: "https://www.johnlewis.com/furniture-lights/dining-room/dining-chairs"
  },
  {
    id: "it_c3",
    name: "Venetian Chair",
    image: "https://www.ikea.com/gb/en/images/products/odger-chair-blue-green__0727320_pe735593_s5.jpg",
    style: "italian",
    furnitureType: "chair",
    price: "£249",
    store: "Wayfair UK",
    link: "https://www.wayfair.co.uk/furniture/c/dining-chairs"
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
    link: "https://www.ikea.com/gb/en/cat/tables-chairs-fu002/"
  },
  {
    id: "min_c2",
    name: "Simple Dining Chair",
    image: "https://www.ikea.com/gb/en/images/products/odger-chair-blue-green__0727320_pe735593_s5.jpg",
    style: "minimalistic",
    furnitureType: "chair",
    price: "£149",
    store: "Made.com",
    link: "https://www.made.com/shop/dining-room-furniture/dining-chairs"
  },
  {
    id: "min_c3",
    name: "Clean Line Chair",
    image: "https://www.ikea.com/gb/en/images/products/odger-chair-blue-green__0727320_pe735593_s5.jpg",
    style: "minimalistic",
    furnitureType: "chair",
    price: "£199",
    store: "John Lewis",
    link: "https://www.johnlewis.com/furniture-lights/dining-room/dining-chairs"
  },

  // Oriental Chairs
  {
    id: "or_c1",
    name: "Eastern Style Chair",
    image: "https://www.ikea.com/gb/en/images/products/odger-chair-blue-green__0727320_pe735593_s5.jpg",
    style: "oriental",
    furnitureType: "chair",
    price: "£179",
    store: "Made.com",
    link: "https://www.made.com/shop/dining-room-furniture/dining-chairs"
  },
  {
    id: "or_c2",
    name: "Zen Style Chair",
    image: "https://www.ikea.com/gb/en/images/products/odger-chair-blue-green__0727320_pe735593_s5.jpg",
    style: "oriental",
    furnitureType: "chair",
    price: "£129",
    store: "John Lewis",
    link: "https://www.johnlewis.com/furniture-lights/dining-room/dining-chairs"
  },
  {
    id: "or_c3",
    name: "Asian Inspired Chair",
    image: "https://www.ikea.com/gb/en/images/products/odger-chair-blue-green__0727320_pe735593_s5.jpg",
    style: "oriental",
    furnitureType: "chair",
    price: "£159",
    store: "Wayfair UK",
    link: "https://www.wayfair.co.uk/furniture/c/dining-chairs"
  },

  // Classic Chairs
  {
    id: "cl_c1",
    name: "Traditional Chair",
    image: "https://www.ikea.com/gb/en/images/products/odger-chair-blue-green__0727320_pe735593_s5.jpg",
    style: "classic",
    furnitureType: "chair",
    price: "£229",
    store: "John Lewis",
    link: "https://www.johnlewis.com/furniture-lights/dining-room/dining-chairs"
  },
  {
    id: "cl_c2",
    name: "Heritage Style Chair",
    image: "https://www.ikea.com/gb/en/images/products/odger-chair-blue-green__0727320_pe735593_s5.jpg",
    style: "classic",
    furnitureType: "chair",
    price: "£279",
    store: "Made.com",
    link: "https://www.made.com/shop/dining-room-furniture/dining-chairs"
  },
  {
    id: "cl_c3",
    name: "Classic Wooden Chair",
    image: "https://www.ikea.com/gb/en/images/products/odger-chair-blue-green__0727320_pe735593_s5.jpg",
    style: "classic",
    furnitureType: "chair",
    price: "£299",
    store: "Wayfair UK",
    link: "https://www.wayfair.co.uk/furniture/c/dining-chairs"
  },

  // Modern Chairs
  {
    id: "mod_c1",
    name: "Contemporary Chair",
    image: "https://www.ikea.com/gb/en/images/products/odger-chair-blue-green__0727320_pe735593_s5.jpg",
    style: "modern",
    furnitureType: "chair",
    price: "£179",
    store: "Made.com",
    link: "https://www.made.com/shop/dining-room-furniture/dining-chairs"
  },
  {
    id: "mod_c2",
    name: "Modern Design Chair",
    image: "https://www.ikea.com/gb/en/images/products/odger-chair-blue-green__0727320_pe735593_s5.jpg",
    style: "modern",
    furnitureType: "chair",
    price: "£219",
    store: "John Lewis",
    link: "https://www.johnlewis.com/furniture-lights/dining-room/dining-chairs"
  },
  {
    id: "mod_c3",
    name: "Sleek Modern Chair",
    image: "https://www.ikea.com/gb/en/images/products/odger-chair-blue-green__0727320_pe735593_s5.jpg",
    style: "modern",
    furnitureType: "chair",
    price: "£189",
    store: "IKEA",
    link: "https://www.ikea.com/gb/en/cat/tables-chairs-fu002/"
  },

  // Italian Beds
  {
    id: "it_b1",
    name: "Italian King Bed",
    image: "https://www.ikea.com/gb/en/images/products/malm-bed-frame-white__0637519_pe698355_s5.jpg",
    style: "italian",
    furnitureType: "bed",
    price: "£1,299",
    store: "Made.com",
    link: "https://www.made.com/shop/bedroom/beds"
  },
  {
    id: "it_b2",
    name: "Milano Style Bed",
    image: "https://www.ikea.com/gb/en/images/products/malm-bed-frame-white__0637519_pe698355_s5.jpg",
    style: "italian",
    furnitureType: "bed",
    price: "£1,599",
    store: "John Lewis",
    link: "https://www.johnlewis.com/furniture-lights/bedroom/beds"
  },
  {
    id: "it_b3",
    name: "Venetian Upholstered Bed",
    image: "https://www.ikea.com/gb/en/images/products/malm-bed-frame-white__0637519_pe698355_s5.jpg",
    style: "italian",
    furnitureType: "bed",
    price: "£1,799",
    store: "Wayfair UK",
    link: "https://www.wayfair.co.uk/furniture/c/beds"
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
    link: "https://www.ikea.com/gb/en/cat/beds-bm003/"
  },
  {
    id: "min_b2",
    name: "Simple Platform Bed",
    image: "https://www.ikea.com/gb/en/images/products/malm-bed-frame-white__0637519_pe698355_s5.jpg",
    style: "minimalistic",
    furnitureType: "bed",
    price: "£899",
    store: "Made.com",
    link: "https://www.made.com/shop/bedroom/beds"
  },
  {
    id: "min_b3",
    name: "Clean Line Bed",
    image: "https://www.ikea.com/gb/en/images/products/malm-bed-frame-white__0637519_pe698355_s5.jpg",
    style: "minimalistic",
    furnitureType: "bed",
    price: "£1,199",
    store: "John Lewis",
    link: "https://www.johnlewis.com/furniture-lights/bedroom/beds"
  },

  // Oriental Beds
  {
    id: "or_b1",
    name: "Eastern Platform Bed",
    image: "https://www.ikea.com/gb/en/images/products/malm-bed-frame-white__0637519_pe698355_s5.jpg",
    style: "oriental",
    furnitureType: "bed",
    price: "£1,199",
    store: "Made.com",
    link: "https://www.made.com/shop/bedroom/beds"
  },
  {
    id: "or_b2",
    name: "Zen Style Bed",
    image: "https://www.ikea.com/gb/en/images/products/malm-bed-frame-white__0637519_pe698355_s5.jpg",
    style: "oriental",
    furnitureType: "bed",
    price: "£899",
    store: "John Lewis",
    link: "https://www.johnlewis.com/furniture-lights/bedroom/beds"
  },
  {
    id: "or_b3",
    name: "Asian Inspired Bed",
    image: "https://www.ikea.com/gb/en/images/products/malm-bed-frame-white__0637519_pe698355_s5.jpg",
    style: "oriental",
    furnitureType: "bed",
    price: "£999",
    store: "Wayfair UK",
    link: "https://www.wayfair.co.uk/furniture/c/beds"
  },

  // Classic Beds
  {
    id: "cl_b1",
    name: "Traditional Sleigh Bed",
    image: "https://www.ikea.com/gb/en/images/products/malm-bed-frame-white__0637519_pe698355_s5.jpg",
    style: "classic",
    furnitureType: "bed",
    price: "£1,399",
    store: "John Lewis",
    link: "https://www.johnlewis.com/furniture-lights/bedroom/beds"
  },
  {
    id: "cl_b2",
    name: "Heritage Oak Bed",
    image: "https://www.ikea.com/gb/en/images/products/malm-bed-frame-white__0637519_pe698355_s5.jpg",
    style: "classic",
    furnitureType: "bed",
    price: "£1,599",
    store: "Made.com",
    link: "https://www.made.com/shop/bedroom/beds"
  },
  {
    id: "cl_b3",
    name: "Classic Panel Bed",
    image: "https://www.ikea.com/gb/en/images/products/malm-bed-frame-white__0637519_pe698355_s5.jpg",
    style: "classic",
    furnitureType: "bed",
    price: "£1,799",
    store: "Wayfair UK",
    link: "https://www.wayfair.co.uk/furniture/c/beds"
  },

  // Modern Beds
  {
    id: "mod_b1",
    name: "Contemporary Platform Bed",
    image: "https://www.ikea.com/gb/en/images/products/malm-bed-frame-white__0637519_pe698355_s5.jpg",
    style: "modern",
    furnitureType: "bed",
    price: "£1,199",
    store: "Made.com",
    link: "https://www.made.com/shop/bedroom/beds"
  },
  {
    id: "mod_b2",
    name: "Modern Upholstered Bed",
    image: "https://www.ikea.com/gb/en/images/products/malm-bed-frame-white__0637519_pe698355_s5.jpg",
    style: "modern",
    furnitureType: "bed",
    price: "£1,399",
    store: "John Lewis",
    link: "https://www.johnlewis.com/furniture-lights/bedroom/beds"
  },
  {
    id: "mod_b3",
    name: "Sleek Modern Bed",
    image: "https://www.ikea.com/gb/en/images/products/malm-bed-frame-white__0637519_pe698355_s5.jpg",
    style: "modern",
    furnitureType: "bed",
    price: "£999",
    store: "IKEA",
    link: "https://www.ikea.com/gb/en/cat/beds-bm003/"
  },

  // Italian Carpets
  {
    id: "it_r1",
    name: "Italian Persian Rug",
    image: "https://www.ikea.com/gb/en/images/products/stockholm-rug-flatwoven-handmade-stripe-grey__0607179_pe681771_s5.jpg",
    style: "italian",
    furnitureType: "carpet",
    price: "£399",
    store: "Made.com",
    link: "https://www.made.com/shop/rugs"
  },
  {
    id: "it_r2",
    name: "Venetian Style Rug",
    image: "https://www.ikea.com/gb/en/images/products/stockholm-rug-flatwoven-handmade-stripe-grey__0607179_pe681771_s5.jpg",
    style: "italian",
    furnitureType: "carpet",
    price: "£899",
    store: "John Lewis",
    link: "https://www.johnlewis.com/home-garden/rugs"
  },
  {
    id: "it_r3",
    name: "Tuscan Wool Rug",
    image: "https://www.ikea.com/gb/en/images/products/stockholm-rug-flatwoven-handmade-stripe-grey__0607179_pe681771_s5.jpg",
    style: "italian",
    furnitureType: "carpet",
    price: "£599",
    store: "Wayfair UK",
    link: "https://www.wayfair.co.uk/rugs"
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
    link: "https://www.ikea.com/gb/en/cat/rugs-10653/"
  },
  {
    id: "min_r2",
    name: "Simple Geometric Rug",
    image: "https://www.ikea.com/gb/en/images/products/stockholm-rug-flatwoven-handmade-stripe-grey__0607179_pe681771_s5.jpg",
    style: "minimalistic",
    furnitureType: "carpet",
    price: "£299",
    store: "Made.com",
    link: "https://www.made.com/shop/rugs"
  },
  {
    id: "min_r3",
    name: "Clean Minimal Rug",
    image: "https://www.ikea.com/gb/en/images/products/stockholm-rug-flatwoven-handmade-stripe-grey__0607179_pe681771_s5.jpg",
    style: "minimalistic",
    furnitureType: "carpet",
    price: "£399",
    store: "John Lewis",
    link: "https://www.johnlewis.com/home-garden/rugs"
  },

  // Oriental Carpets
  {
    id: "or_r1",
    name: "Eastern Style Rug",
    image: "https://www.ikea.com/gb/en/images/products/stockholm-rug-flatwoven-handmade-stripe-grey__0607179_pe681771_s5.jpg",
    style: "oriental",
    furnitureType: "carpet",
    price: "£499",
    store: "Made.com",
    link: "https://www.made.com/shop/rugs"
  },
  {
    id: "or_r2",
    name: "Zen Garden Rug",
    image: "https://www.ikea.com/gb/en/images/products/stockholm-rug-flatwoven-handmade-stripe-grey__0607179_pe681771_s5.jpg",
    style: "oriental",
    furnitureType: "carpet",
    price: "£299",
    store: "John Lewis",
    link: "https://www.johnlewis.com/home-garden/rugs"
  },
  {
    id: "or_r3",
    name: "Asian Inspired Rug",
    image: "https://www.ikea.com/gb/en/images/products/stockholm-rug-flatwoven-handmade-stripe-grey__0607179_pe681771_s5.jpg",
    style: "oriental",
    furnitureType: "carpet",
    price: "£399",
    store: "Wayfair UK",
    link: "https://www.wayfair.co.uk/rugs"
  },

  // Classic Carpets
  {
    id: "cl_r1",
    name: "Traditional Persian Rug",
    image: "https://www.ikea.com/gb/en/images/products/stockholm-rug-flatwoven-handmade-stripe-grey__0607179_pe681771_s5.jpg",
    style: "classic",
    furnitureType: "carpet",
    price: "£699",
    store: "John Lewis",
    link: "https://www.johnlewis.com/home-garden/rugs"
  },
  {
    id: "cl_r2",
    name: "Heritage Style Rug",
    image: "https://www.ikea.com/gb/en/images/products/stockholm-rug-flatwoven-handmade-stripe-grey__0607179_pe681771_s5.jpg",
    style: "classic",
    furnitureType: "carpet",
    price: "£899",
    store: "Made.com",
    link: "https://www.made.com/shop/rugs"
  },
  {
    id: "cl_r3",
    name: "Classic Wool Rug",
    image: "https://www.ikea.com/gb/en/images/products/stockholm-rug-flatwoven-handmade-stripe-grey__0607179_pe681771_s5.jpg",
    style: "classic",
    furnitureType: "carpet",
    price: "£799",
    store: "Wayfair UK",
    link: "https://www.wayfair.co.uk/rugs"
  },

  // Modern Carpets
  {
    id: "mod_r1",
    name: "Contemporary Abstract Rug",
    image: "https://www.ikea.com/gb/en/images/products/stockholm-rug-flatwoven-handmade-stripe-grey__0607179_pe681771_s5.jpg",
    style: "modern",
    furnitureType: "carpet",
    price: "£399",
    store: "Made.com",
    link: "https://www.made.com/shop/rugs"
  },
  {
    id: "mod_r2",
    name: "Modern Design Rug",
    image: "https://www.ikea.com/gb/en/images/products/stockholm-rug-flatwoven-handmade-stripe-grey__0607179_pe681771_s5.jpg",
    style: "modern",
    furnitureType: "carpet",
    price: "£599",
    store: "John Lewis",
    link: "https://www.johnlewis.com/home-garden/rugs"
  },
  {
    id: "mod_r3",
    name: "Sleek Modern Rug",
    image: "https://www.ikea.com/gb/en/images/products/stockholm-rug-flatwoven-handmade-stripe-grey__0607179_pe681771_s5.jpg",
    style: "modern",
    furnitureType: "carpet",
    price: "£499",
    store: "IKEA",
    link: "https://www.ikea.com/gb/en/cat/rugs-10653/"
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
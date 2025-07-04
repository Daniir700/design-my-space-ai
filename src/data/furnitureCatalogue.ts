export interface Product {
  id: string;
  name: string;
  image: string;
  style: string;
  furnitureType: string;
  price: string;
  store: string;
  link: string;
}

export const FURNITURE_CATALOGUE: Product[] = [
  // Italian Sofas
  {
    id: "it_s1",
    name: "KIVIK 3-seat Sofa Beige",
    image: "https://www.ikea.com/gb/en/images/products/kivik-3-seat-sofa-tibbleby-beige-grey__0837214_pe732317_s5.jpg",
    style: "italian",
    furnitureType: "sofa",
    price: "£599",
    store: "IKEA",
    link: "https://www.ikea.com/gb/en/p/kivik-3-seat-sofa-tibbleby-beige-grey-s69440596/"
  },
  {
    id: "it_s2",
    name: "KIVIK 3-seat Sofa Anthracite",
    image: "https://www.ikea.com/gb/en/images/products/kivik-3-seat-sofa-tresund-anthracite__1023826_pe832602_s5.jpg",
    style: "italian",
    furnitureType: "sofa",
    price: "£399",
    store: "IKEA",
    link: "https://www.ikea.com/gb/en/p/kivik-3-seat-sofa-tresund-anthracite-s79482835/"
  },
  {
    id: "it_s3",
    name: "EKTORP 3-seat Sofa",
    image: "https://www.ikea.com/gb/en/images/products/ektorp-3-seat-sofa-totebo-light-beige__1101808_pe866663_s5.jpg",
    style: "italian",
    furnitureType: "sofa",
    price: "£450",
    store: "IKEA",
    link: "https://www.ikea.com/gb/en/p/ektorp-3-seat-sofa-totebo-light-beige-s99479063/"
  },

  // Minimalistic Sofas
  {
    id: "min_s1",
    name: "FRIHETEN Corner Sofa",
    image: "https://www.ikea.com/gb/en/images/products/friheten-corner-sofa-bed-with-storage-hyllie-dark-grey__0355811_pe383044_s5.jpg",
    style: "minimalistic",
    furnitureType: "sofa",
    price: "£599",
    store: "IKEA",
    link: "https://www.ikea.com/gb/en/p/friheten-corner-sofa-bed-with-storage-hyllie-dark-grey-s69217093/"
  },
  {
    id: "min_s2",
    name: "KLIPPAN 2-seat Sofa",
    image: "https://www.ikea.com/gb/en/images/products/klippan-2-seat-sofa-vissle-grey__0325656_pe517964_s5.jpg",
    style: "minimalistic",
    furnitureType: "sofa",
    price: "£219",
    store: "IKEA",
    link: "https://www.ikea.com/gb/en/p/klippan-2-seat-sofa-vissle-grey-s99359117/"
  },
  {
    id: "min_s3",
    name: "SÖDERHAMN 3-seat Sofa",
    image: "https://www.ikea.com/gb/en/images/products/soederhamn-3-seat-sofa-viarp-beige-brown__0738271_pe741529_s5.jpg",
    style: "minimalistic",
    furnitureType: "sofa",
    price: "£495",
    store: "IKEA",
    link: "https://www.ikea.com/gb/en/p/soederhamn-3-seat-sofa-viarp-beige-brown-s59305621/"
  },

  // Oriental Sofas
  {
    id: "or_s1",
    name: "STOCKHOLM 3-seat Sofa",
    image: "https://www.ikea.com/gb/en/images/products/stockholm-3-seat-sofa-sandbacka-dark-beige__0325700_pe517977_s5.jpg",
    style: "oriental",
    furnitureType: "sofa",
    price: "£1,200",
    store: "IKEA",
    link: "https://www.ikea.com/gb/en/p/stockholm-3-seat-sofa-sandbacka-dark-beige-s29305511/"
  },
  {
    id: "or_s2",
    name: "VALLENTUNA 3-seat Sofa",
    image: "https://www.ikea.com/gb/en/images/products/vallentuna-3-seat-modular-sofa-orrsta-light-grey__0355695_pe383026_s5.jpg",
    style: "oriental",
    furnitureType: "sofa",
    price: "£680",
    store: "IKEA",
    link: "https://www.ikea.com/gb/en/p/vallentuna-3-seat-modular-sofa-orrsta-light-grey-s79305617/"
  },
  {
    id: "or_s3",
    name: "NORSBORG 3-seat Sofa",
    image: "https://www.ikea.com/gb/en/images/products/norsborg-3-seat-sofa-finnsta-white-birch__0355424_pe382963_s5.jpg",
    style: "oriental",
    furnitureType: "sofa",
    price: "£750",
    store: "IKEA",
    link: "https://www.ikea.com/gb/en/p/norsborg-3-seat-sofa-finnsta-white-birch-s19305138/"
  },

  // Classic Sofas
  {
    id: "cl_s1",
    name: "LANDSKRONA 3-seat Sofa",
    image: "https://www.ikea.com/gb/en/images/products/landskrona-3-seat-sofa-grann-bomstad-golden-brown-wood__0602933_pe680748_s5.jpg",
    style: "classic",
    furnitureType: "sofa",
    price: "£1,100",
    store: "IKEA",
    link: "https://www.ikea.com/gb/en/p/landskrona-3-seat-sofa-grann-bomstad-golden-brown-wood-s99305138/"
  },
  {
    id: "cl_s2",
    name: "STRANDMON Wing Chair",
    image: "https://www.ikea.com/gb/en/images/products/strandmon-wing-chair-vissle-grey__0325659_pe517975_s5.jpg",
    style: "classic",
    furnitureType: "sofa",
    price: "£249",
    store: "IKEA",
    link: "https://www.ikea.com/gb/en/p/strandmon-wing-chair-vissle-grey-s69084809/"
  },
  {
    id: "cl_s3",
    name: "MORABO 3-seat Sofa",
    image: "https://www.ikea.com/gb/en/images/products/morabo-3-seat-sofa-grann-bomstad-golden-brown-wood__0879465_pe782032_s5.jpg",
    style: "classic",
    furnitureType: "sofa",
    price: "£1,350",
    store: "IKEA",
    link: "https://www.ikea.com/gb/en/p/morabo-3-seat-sofa-grann-bomstad-golden-brown-wood-s69453264/"
  },

  // Modern Sofas
  {
    id: "mod_s1",
    name: "VIMLE 3-seat Sofa",
    image: "https://www.ikea.com/gb/en/images/products/vimle-3-seat-sofa-gunnared-medium-grey__0513267_pe639411_s5.jpg",
    style: "modern",
    furnitureType: "sofa",
    price: "£520",
    store: "IKEA",
    link: "https://www.ikea.com/gb/en/p/vimle-3-seat-sofa-gunnared-medium-grey-s59305617/"
  },
  {
    id: "mod_s2",
    name: "UPPLAND 3-seat Sofa",
    image: "https://www.ikea.com/gb/en/images/products/uppland-3-seat-sofa-blekinge-white__0818355_pe774488_s5.jpg",
    style: "modern",
    furnitureType: "sofa",
    price: "£575",
    store: "IKEA",
    link: "https://www.ikea.com/gb/en/p/uppland-3-seat-sofa-blekinge-white-s99305138/"
  },
  {
    id: "mod_s3",
    name: "GRÖNLID 3-seat Sofa",
    image: "https://www.ikea.com/gb/en/images/products/groenlid-3-seat-sofa-sporda-dark-grey__0603273_pe680783_s5.jpg",
    style: "modern",
    furnitureType: "sofa",
    price: "£695",
    store: "IKEA",
    link: "https://www.ikea.com/gb/en/p/groenlid-3-seat-sofa-sporda-dark-grey-s79305138/"
  },

  // Tables
  {
    id: "it_t1",
    name: "LISABO Table",
    image: "https://www.ikea.com/gb/en/images/products/lisabo-table-ash-veneer__0737092_pe740877_s5.jpg",
    style: "italian",
    furnitureType: "table",
    price: "£180",
    store: "IKEA",
    link: "https://www.ikea.com/gb/en/p/lisabo-table-ash-veneer-40297952/"
  },
  {
    id: "min_t1",
    name: "MÖLLEKULLA Table",
    image: "https://www.ikea.com/gb/en/images/products/moellekulla-table-oak-veneer__0975330_pe813395_s5.jpg",
    style: "minimalistic",
    furnitureType: "table",
    price: "£220",
    store: "IKEA",
    link: "https://www.ikea.com/gb/en/p/moellekulla-table-oak-veneer-80453898/"
  },
  {
    id: "or_t1",
    name: "STOCKHOLM Table",
    image: "https://www.ikea.com/gb/en/images/products/stockholm-table-walnut-veneer__0737093_pe740878_s5.jpg",
    style: "oriental",
    furnitureType: "table",
    price: "£450",
    store: "IKEA",
    link: "https://www.ikea.com/gb/en/p/stockholm-table-walnut-veneer-50297950/"
  },
  {
    id: "cl_t1",
    name: "INGATORP Table",
    image: "https://www.ikea.com/gb/en/images/products/ingatorp-extendable-table-white__0737088_pe740874_s5.jpg",
    style: "classic",
    furnitureType: "table",
    price: "£280",
    store: "IKEA",
    link: "https://www.ikea.com/gb/en/p/ingatorp-extendable-table-white-20297951/"
  },
  {
    id: "mod_t1",
    name: "EKEDALEN Table",
    image: "https://www.ikea.com/gb/en/images/products/ekedalen-extendable-table-white__0737083_pe740870_s5.jpg",
    style: "modern",
    furnitureType: "table",
    price: "£320",
    store: "IKEA",
    link: "https://www.ikea.com/gb/en/p/ekedalen-extendable-table-white-80297948/"
  },

  // Chairs
  {
    id: "it_c1",
    name: "ODGER Chair",
    image: "https://www.ikea.com/gb/en/images/products/odger-chair-blue-green__0727320_pe735593_s5.jpg",
    style: "italian",
    furnitureType: "chair",
    price: "£70",
    store: "IKEA",
    link: "https://www.ikea.com/gb/en/p/odger-chair-blue-green-70335228/"
  },
  {
    id: "min_c1",
    name: "FRÖSVI Chair",
    image: "https://www.ikea.com/gb/en/images/products/froesvi-swivel-chair-beige__0975326_pe813392_s5.jpg",
    style: "minimalistic",
    furnitureType: "chair",
    price: "£89",
    store: "IKEA",
    link: "https://www.ikea.com/gb/en/p/froesvi-swivel-chair-beige-20487903/"
  },
  {
    id: "or_c1",
    name: "TOBIAS Chair",
    image: "https://www.ikea.com/gb/en/images/products/tobias-chair-clear-chrome-plated__0727318_pe735591_s5.jpg",
    style: "oriental",
    furnitureType: "chair",
    price: "£55",
    store: "IKEA",
    link: "https://www.ikea.com/gb/en/p/tobias-chair-clear-chrome-plated-90297912/"
  },
  {
    id: "cl_c1",
    name: "INGOLF Chair",
    image: "https://www.ikea.com/gb/en/images/products/ingolf-chair-white-stain__0727316_pe735589_s5.jpg",
    style: "classic",
    furnitureType: "chair",
    price: "£65",
    store: "IKEA",
    link: "https://www.ikea.com/gb/en/p/ingolf-chair-white-stain-50103022/"
  },
  {
    id: "mod_c1",
    name: "EKEDALEN Chair",
    image: "https://www.ikea.com/gb/en/images/products/ekedalen-chair-white-orrsta-light-grey__0727314_pe735587_s5.jpg",
    style: "modern",
    furnitureType: "chair",
    price: "£90",
    store: "IKEA",
    link: "https://www.ikea.com/gb/en/p/ekedalen-chair-white-orrsta-light-grey-s99254026/"
  },

  // Beds
  {
    id: "it_b1",
    name: "MALM Bed frame",
    image: "https://www.ikea.com/gb/en/images/products/malm-bed-frame-white__0637519_pe698355_s5.jpg",
    style: "italian",
    furnitureType: "bed",
    price: "£179",
    store: "IKEA",
    link: "https://www.ikea.com/gb/en/p/malm-bed-frame-white-s59009475/"
  },
  {
    id: "min_b1",
    name: "HEMNES Bed frame",
    image: "https://www.ikea.com/gb/en/images/products/hemnes-bed-frame-white-stain__0637517_pe698354_s5.jpg",
    style: "minimalistic",
    furnitureType: "bed",
    price: "£219",
    store: "IKEA",
    link: "https://www.ikea.com/gb/en/p/hemnes-bed-frame-white-stain-s59126287/"
  },
  {
    id: "or_b1",
    name: "TARVA Bed frame",
    image: "https://www.ikea.com/gb/en/images/products/tarva-bed-frame-pine__0637521_pe698357_s5.jpg",
    style: "oriental",
    furnitureType: "bed",
    price: "£99",
    store: "IKEA",
    link: "https://www.ikea.com/gb/en/p/tarva-bed-frame-pine-s59126621/"
  },
  {
    id: "cl_b1",
    name: "SONGESAND Bed frame",
    image: "https://www.ikea.com/gb/en/images/products/songesand-bed-frame-white__0637520_pe698356_s5.jpg",
    style: "classic",
    furnitureType: "bed",
    price: "£149",
    store: "IKEA",
    link: "https://www.ikea.com/gb/en/p/songesand-bed-frame-white-s59126556/"
  },
  {
    id: "mod_b1",
    name: "NEIDEN Bed frame",
    image: "https://www.ikea.com/gb/en/images/products/neiden-bed-frame-pine__0637518_pe698355_s5.jpg",
    style: "modern",
    furnitureType: "bed",
    price: "£65",
    store: "IKEA",
    link: "https://www.ikea.com/gb/en/p/neiden-bed-frame-pine-s59126287/"
  },

  // Carpets
  {
    id: "it_r1",
    name: "STOCKHOLM Rug",
    image: "https://www.ikea.com/gb/en/images/products/stockholm-rug-flatwoven-handmade-stripe-grey__0607179_pe681771_s5.jpg",
    style: "italian",
    furnitureType: "carpet",
    price: "£149",
    store: "IKEA",
    link: "https://www.ikea.com/gb/en/p/stockholm-rug-flatwoven-handmade-stripe-grey-50397246/"
  },
  {
    id: "min_r1",
    name: "TYVELSE Rug",
    image: "https://www.ikea.com/gb/en/images/products/tyvelse-rug-low-pile-off-white__0607180_pe681772_s5.jpg",
    style: "minimalistic",
    furnitureType: "carpet",
    price: "£80",
    store: "IKEA",
    link: "https://www.ikea.com/gb/en/p/tyvelse-rug-low-pile-off-white-40428276/"
  },
  {
    id: "or_r1",
    name: "VONSBÄK Rug",
    image: "https://www.ikea.com/gb/en/images/products/vonsbaek-rug-low-pile-dark-green__0928177_pe789745_s5.jpg",
    style: "oriental",
    furnitureType: "carpet",
    price: "£120",
    store: "IKEA",
    link: "https://www.ikea.com/gb/en/p/vonsbaek-rug-low-pile-dark-green-20428399/"
  },
  {
    id: "cl_r1",
    name: "HULSIG Rug",
    image: "https://www.ikea.com/gb/en/images/products/hulsig-rug-low-pile-beige__0928175_pe789743_s5.jpg",
    style: "classic",
    furnitureType: "carpet",
    price: "£95",
    store: "IKEA",
    link: "https://www.ikea.com/gb/en/p/hulsig-rug-low-pile-beige-80428273/"
  },
  {
    id: "mod_r1",
    name: "LANGSTED Rug",
    image: "https://www.ikea.com/gb/en/images/products/langsted-rug-low-pile-light-blue__0607181_pe681773_s5.jpg",
    style: "modern",
    furnitureType: "carpet",
    price: "£25",
    store: "IKEA",
    link: "https://www.ikea.com/gb/en/p/langsted-rug-low-pile-light-blue-80428278/"
  }
];
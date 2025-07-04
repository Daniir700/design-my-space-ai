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
  // Italian Style Sofas
  {
    id: "it_s1",
    name: "Ercol Mondello 3 Seater Sofa",
    image: "https://images.made.com/image/upload/c_pad,d_madeplusgrey.svg,f_auto,w_982,h_736/v1/spree/assets/images/attachments/ercol-mondello-3-seater-sofa-walnut-and-cream.jpg",
    style: "italian",
    furnitureType: "sofa",
    price: "£2,199",
    store: "Made.com",
    link: "https://www.made.com/ercol-mondello-3-seater-sofa-walnut-and-cream"
  },
  {
    id: "it_s2", 
    name: "Habitat Chester 3 Seater Leather Sofa",
    image: "https://media.dfs.co.uk/is/image/dfs/Chester_3_Seater_Sofa_Tan_Leather_01?$dfs-pdp-main-desktop$",
    style: "italian",
    furnitureType: "sofa",
    price: "£1,699",
    store: "DFS",
    link: "https://www.dfs.co.uk/chester/3-seater-sofa-tan-leather"
  },
  {
    id: "it_s3",
    name: "Loaf Sloucher 3 Seater Sofa",
    image: "https://images.loaf.com/fit-in/2048x2048/images/products/sloucher-3-seater-sofa-in-clever-linen-dove-grey.jpg",
    style: "italian", 
    furnitureType: "sofa",
    price: "£1,895",
    store: "Loaf",
    link: "https://loaf.com/products/sloucher-sofa"
  },

  // Minimalistic Sofas
  {
    id: "min_s1",
    name: "Made Como 3 Seater Sofa",
    image: "https://images.made.com/image/upload/c_pad,d_madeplusgrey.svg,f_auto,w_982,h_736/v1/spree/assets/images/attachments/como-3-seater-sofa-eucalyptus-green-velvet.jpg",
    style: "minimalistic",
    furnitureType: "sofa", 
    price: "£899",
    store: "Made.com",
    link: "https://www.made.com/como-3-seater-sofa-eucalyptus-green-velvet"
  },
  {
    id: "min_s2",
    name: "The White Company Richmond Sofa",
    image: "https://thewhitecompany.scene7.com/is/image/TheWhiteCompany/Richmond-Sofa-3-Seater-Linen-Natural/FURRI3NLNATU_1_large?$D_PDP_412x412$",
    style: "minimalistic",
    furnitureType: "sofa",
    price: "£2,450",
    store: "The White Company", 
    link: "https://www.thewhitecompany.com/furniture/sofas/richmond-sofa-3-seater/"
  },
  {
    id: "min_s3",
    name: "Habitat Hyde 3 Seater Sofa",
    image: "https://media.dfs.co.uk/is/image/dfs/Hyde_3_Seater_Sofa_Charcoal_Fabric_01?$dfs-pdp-main-desktop$",
    style: "minimalistic",
    furnitureType: "sofa",
    price: "£599",
    store: "Habitat",
    link: "https://www.habitat.co.uk/hyde-3-seater-sofa-charcoal-fabric/p/1234567"
  },

  // Oriental Sofas
  {
    id: "or_s1",
    name: "Made Yoko 3 Seater Sofa",
    image: "https://images.made.com/image/upload/c_pad,d_madeplusgrey.svg,f_auto,w_982,h_736/v1/spree/assets/images/attachments/yoko-3-seater-sofa-midnight-blue-velvet.jpg",
    style: "oriental",
    furnitureType: "sofa",
    price: "£1,199",
    store: "Made.com",
    link: "https://www.made.com/yoko-3-seater-sofa-midnight-blue-velvet"
  },
  {
    id: "or_s2",
    name: "Dunelm Kyoto 3 Seater Sofa",
    image: "https://media.dunelm.com/i/dunelm/30813844_alt12?$standardplayerdefault$&img404=noimagedefault",
    style: "oriental",
    furnitureType: "sofa",
    price: "£899",
    store: "Dunelm",
    link: "https://www.dunelm.com/product/kyoto-3-seater-sofa-1000172413"
  },
  {
    id: "or_s3",
    name: "Furniture Village Osaka Sofa",
    image: "https://www.furniturevillage.co.uk/media/catalog/product/o/s/osaka_3_seater_sofa_charcoal_fabric_01.jpg",
    style: "oriental",
    furnitureType: "sofa",
    price: "£1,299",
    store: "Furniture Village",
    link: "https://www.furniturevillage.co.uk/osaka-3-seater-sofa-charcoal"
  },

  // Classic Sofas
  {
    id: "cl_s1",
    name: "DFS Windsor 3 Seater Sofa",
    image: "https://media.dfs.co.uk/is/image/dfs/Windsor_3_Seater_Sofa_Heritage_Brown_Leather_01?$dfs-pdp-main-desktop$",
    style: "classic",
    furnitureType: "sofa",
    price: "£1,999",
    store: "DFS",
    link: "https://www.dfs.co.uk/windsor/3-seater-sofa-heritage-brown-leather"
  },
  {
    id: "cl_s2",
    name: "Loaf Crumpet 3 Seater Sofa",
    image: "https://images.loaf.com/fit-in/2048x2048/images/products/crumpet-3-seater-sofa-in-easy-velvet-midnight.jpg",
    style: "classic",
    furnitureType: "sofa",
    price: "£1,745",
    store: "Loaf",
    link: "https://loaf.com/products/crumpet-sofa"
  },
  {
    id: "cl_s3",
    name: "The White Company Hampton Sofa",
    image: "https://thewhitecompany.scene7.com/is/image/TheWhiteCompany/Hampton-Sofa-3-Seater-Linen-Natural/FURHP3NLNATU_1_large?$D_PDP_412x412$",
    style: "classic",
    furnitureType: "sofa",
    price: "£2,650",
    store: "The White Company",
    link: "https://www.thewhitecompany.com/furniture/sofas/hampton-sofa-3-seater/"
  },

  // Modern Sofas
  {
    id: "mod_s1",
    name: "Made Scott 3 Seater Sofa",
    image: "https://images.made.com/image/upload/c_pad,d_madeplusgrey.svg,f_auto,w_982,h_736/v1/spree/assets/images/attachments/scott-3-seater-sofa-sterling-grey-fabric.jpg",
    style: "modern",
    furnitureType: "sofa",
    price: "£799",
    store: "Made.com",
    link: "https://www.made.com/scott-3-seater-sofa-sterling-grey-fabric"
  },
  {
    id: "mod_s2",
    name: "Habitat Hendricks 3 Seater Sofa",
    image: "https://media.dfs.co.uk/is/image/dfs/Hendricks_3_Seater_Sofa_Steel_Fabric_01?$dfs-pdp-main-desktop$",
    style: "modern",
    furnitureType: "sofa",
    price: "£899",
    store: "Habitat",
    link: "https://www.habitat.co.uk/hendricks-3-seater-sofa-steel-fabric/p/2345678"
  },
  {
    id: "mod_s3",
    name: "Dunelm Metro 3 Seater Sofa",
    image: "https://media.dunelm.com/i/dunelm/30813845_alt13?$standardplayerdefault$&img404=noimagedefault",
    style: "modern",
    furnitureType: "sofa",
    price: "£699",
    store: "Dunelm",
    link: "https://www.dunelm.com/product/metro-3-seater-sofa-1000172414"
  },

  // Tables
  {
    id: "it_t1",
    name: "Made Edelweiss Dining Table",
    image: "https://images.made.com/image/upload/c_pad,d_madeplusgrey.svg,f_auto,w_982,h_736/v1/spree/assets/images/attachments/edelweiss-dining-table-walnut.jpg",
    style: "italian",
    furnitureType: "table",
    price: "£899",
    store: "Made.com",
    link: "https://www.made.com/edelweiss-dining-table-walnut"
  },
  {
    id: "min_t1",
    name: "The White Company Whitstable Table",
    image: "https://thewhitecompany.scene7.com/is/image/TheWhiteCompany/Whitstable-Dining-Table-Natural/FURWS6STNATU_1_large?$D_PDP_412x412$",
    style: "minimalistic",
    furnitureType: "table",
    price: "£1,450",
    store: "The White Company",
    link: "https://www.thewhitecompany.com/furniture/dining-tables/whitstable-dining-table/"
  },
  {
    id: "or_t1",
    name: "Dunelm Kyoto Dining Table",
    image: "https://media.dunelm.com/i/dunelm/30813846_alt14?$standardplayerdefault$&img404=noimagedefault",
    style: "oriental",
    furnitureType: "table",
    price: "£649",
    store: "Dunelm",
    link: "https://www.dunelm.com/product/kyoto-dining-table-1000172415"
  },
  {
    id: "cl_t1",
    name: "Furniture Village Henley Table",
    image: "https://www.furniturevillage.co.uk/media/catalog/product/h/e/henley_dining_table_oak_01.jpg",
    style: "classic",
    furnitureType: "table",
    price: "£1,199",
    store: "Furniture Village",
    link: "https://www.furniturevillage.co.uk/henley-dining-table-oak"
  },
  {
    id: "mod_t1",
    name: "Made Heston Dining Table",
    image: "https://images.made.com/image/upload/c_pad,d_madeplusgrey.svg,f_auto,w_982,h_736/v1/spree/assets/images/attachments/heston-dining-table-black-marble.jpg",
    style: "modern",
    furnitureType: "table",
    price: "£1,299",
    store: "Made.com",
    link: "https://www.made.com/heston-dining-table-black-marble"
  },

  // Chairs
  {
    id: "it_c1",
    name: "Made Lule Dining Chair",
    image: "https://images.made.com/image/upload/c_pad,d_madeplusgrey.svg,f_auto,w_982,h_736/v1/spree/assets/images/attachments/lule-dining-chair-walnut-and-teal-velvet.jpg",
    style: "italian",
    furnitureType: "chair",
    price: "£199",
    store: "Made.com",
    link: "https://www.made.com/lule-dining-chair-walnut-and-teal-velvet"
  },
  {
    id: "min_c1",
    name: "The White Company Portobello Chair",
    image: "https://thewhitecompany.scene7.com/is/image/TheWhiteCompany/Portobello-Dining-Chair-Natural/FURPO1STNATU_1_large?$D_PDP_412x412$",
    style: "minimalistic",
    furnitureType: "chair",
    price: "£295",
    store: "The White Company",
    link: "https://www.thewhitecompany.com/furniture/dining-chairs/portobello-dining-chair/"
  },
  {
    id: "or_c1",
    name: "Dunelm Tokyo Dining Chair",
    image: "https://media.dunelm.com/i/dunelm/30813847_alt15?$standardplayerdefault$&img404=noimagedefault",
    style: "oriental",
    furnitureType: "chair",
    price: "£89",
    store: "Dunelm",
    link: "https://www.dunelm.com/product/tokyo-dining-chair-1000172416"
  },
  {
    id: "cl_c1",
    name: "Furniture Village Windsor Chair",
    image: "https://www.furniturevillage.co.uk/media/catalog/product/w/i/windsor_dining_chair_oak_01.jpg",
    style: "classic",
    furnitureType: "chair",
    price: "£159",
    store: "Furniture Village",
    link: "https://www.furniturevillage.co.uk/windsor-dining-chair-oak"
  },
  {
    id: "mod_c1",
    name: "Made Rae Chrome Chair",
    image: "https://images.made.com/image/upload/c_pad,d_madeplusgrey.svg,f_auto,w_982,h_736/v1/spree/assets/images/attachments/rae-dining-chair-chrome-and-black.jpg",
    style: "modern",
    furnitureType: "chair",
    price: "£149",
    store: "Made.com",
    link: "https://www.made.com/rae-dining-chair-chrome-and-black"
  },

  // Beds
  {
    id: "it_b1",
    name: "Made Cesare King Bed",
    image: "https://images.made.com/image/upload/c_pad,d_madeplusgrey.svg,f_auto,w_982,h_736/v1/spree/assets/images/attachments/cesare-king-size-bed-walnut.jpg",
    style: "italian",
    furnitureType: "bed",
    price: "£899",
    store: "Made.com",
    link: "https://www.made.com/cesare-king-size-bed-walnut"
  },
  {
    id: "min_b1",
    name: "The White Company Portobello Bed",
    image: "https://thewhitecompany.scene7.com/is/image/TheWhiteCompany/Portobello-Bed-King-Natural/FURPO5KNATU_1_large?$D_PDP_412x412$",
    style: "minimalistic",
    furnitureType: "bed",
    price: "£1,450",
    store: "The White Company",
    link: "https://www.thewhitecompany.com/furniture/beds/portobello-bed/"
  },
  {
    id: "or_b1",
    name: "Dunelm Fuji Platform Bed",
    image: "https://media.dunelm.com/i/dunelm/30813848_alt16?$standardplayerdefault$&img404=noimagedefault",
    style: "oriental",
    furnitureType: "bed",
    price: "£449",
    store: "Dunelm",
    link: "https://www.dunelm.com/product/fuji-platform-bed-1000172417"
  },
  {
    id: "cl_b1",
    name: "Furniture Village Heritage Bed",
    image: "https://www.furniturevillage.co.uk/media/catalog/product/h/e/heritage_king_bed_oak_01.jpg",
    style: "classic",
    furnitureType: "bed",
    price: "£1,299",
    store: "Furniture Village",
    link: "https://www.furniturevillage.co.uk/heritage-king-bed-oak"
  },
  {
    id: "mod_b1",
    name: "Made Knox Platform Bed",
    image: "https://images.made.com/image/upload/c_pad,d_madeplusgrey.svg,f_auto,w_982,h_736/v1/spree/assets/images/attachments/knox-king-size-bed-charcoal-grey.jpg",
    style: "modern",
    furnitureType: "bed",
    price: "£649",
    store: "Made.com",
    link: "https://www.made.com/knox-king-size-bed-charcoal-grey"
  },

  // Carpets
  {
    id: "it_r1", 
    name: "Made Ruben Vintage Rug",
    image: "https://images.made.com/image/upload/c_pad,d_madeplusgrey.svg,f_auto,w_982,h_736/v1/spree/assets/images/attachments/ruben-vintage-rug-terracotta-and-blue.jpg",
    style: "italian",
    furnitureType: "carpet",
    price: "£299",
    store: "Made.com",
    link: "https://www.made.com/ruben-vintage-rug-terracotta-and-blue"
  },
  {
    id: "min_r1",
    name: "The White Company Jute Rug",
    image: "https://thewhitecompany.scene7.com/is/image/TheWhiteCompany/Jute-Rug-Natural/RUNAJ2XLNATU_1_large?$D_PDP_412x412$",
    style: "minimalistic",
    furnitureType: "carpet",
    price: "£195",
    store: "The White Company",
    link: "https://www.thewhitecompany.com/rugs/jute-rug/"
  },
  {
    id: "or_r1",
    name: "Dunelm Sakura Blossom Rug",
    image: "https://media.dunelm.com/i/dunelm/30813849_alt17?$standardplayerdefault$&img404=noimagedefault",
    style: "oriental",
    furnitureType: "carpet",
    price: "£129",
    store: "Dunelm",
    link: "https://www.dunelm.com/product/sakura-blossom-rug-1000172418"
  },
  {
    id: "cl_r1",
    name: "Loaf Persian Garden Rug",
    image: "https://images.loaf.com/fit-in/2048x2048/images/products/persian-garden-rug-in-rose-pink.jpg",
    style: "classic",
    furnitureType: "carpet",
    price: "£495",
    store: "Loaf",
    link: "https://loaf.com/products/persian-garden-rug"
  },
  {
    id: "mod_r1",
    name: "Made Novi Geometric Rug",
    image: "https://images.made.com/image/upload/c_pad,d_madeplusgrey.svg,f_auto,w_982,h_736/v1/spree/assets/images/attachments/novi-geometric-rug-charcoal-and-gold.jpg",
    style: "modern",
    furnitureType: "carpet",
    price: "£249",
    store: "Made.com",
    link: "https://www.made.com/novi-geometric-rug-charcoal-and-gold"
  }
];
/**
 * FLOWER TRICKS — Catálogo Maestro de Datos
 * Modelo unificado de productos, categorías, diapositivas y cesta inicial.
 */

// 1. Productos individuales con identificadores únicos y consistentes
const PRODUCT_TOP_PREVIEW = {
  id: 'top-preview',
  name: 'Ramo de Autor Mostaza',
  price: 28.5,
  image: '/media/img/peonies-autor.webp',
  alt: 'Ramo artesanal de peonías y rosas en tonos marfil y rosa empolvado',
  description:
    'Exclusiva composición de autor con peonías, eucalipto y paniculata silvestre, envuelta en papel artesanal de tono mostaza.',
  category: 'ramos',
};

const PRODUCT_TOP_1 = {
  id: 'top-1',
  name: 'Ramo Silvestre Primaveral',
  price: 19.99,
  image: '/media/img/lirios-blancos.webp',
  alt: 'Ramo de lirios blancos frescos atados con cuerda natural sobre madera cálida',
  description:
    'Bouquet fresco con lirios blancos, paniculata y rosas pastel, ideal para iluminar estancias y transmitir armonía natural.',
  category: 'variados',
};

const PRODUCT_TOP_2 = {
  id: 'top-2',
  name: 'Ramo de Girasoles Silvestres',
  price: 19.99,
  image: '/media/img/girasol-campo.webp',
  alt: 'Girasol amarillo en plena floración rodeado de hojas verdes en el campo',
  description:
    'Girasoles naturales de cultivo sostenible con follaje rústico, llenos de luz y vitalidad para regalar optimismo.',
  category: 'de-temporada',
};

const PRODUCT_TOP_3 = {
  id: 'top-3',
  name: 'Ramo de Tulipanes Escarlata',
  price: 19.99,
  image: '/media/img/tulipanes-rojos.webp',
  alt: 'Campo luminoso de tulipanes rojos con bordes dorados bajo luz natural',
  description:
    'Tulipanes rojos holandeses de primera calidad con tallo esbelto, símbolo tradicional de elegancia, pureza y afecto.',
  category: 'de-temporada',
};

const PRODUCT_TOP_4 = {
  id: 'top-4',
  name: 'Ramo Variado de Ensueño',
  price: 19.99,
  image: '/media/img/centro-botanico-jarron.webp',
  alt: 'Arreglo floral de flores secas y hierbas de la pampa en jarrón blanco acanalado',
  description:
    'Combinación primaveral de margaritas, rosas mini y follaje aromático, preparada con envoltorio eco-responsable.',
  category: 'ramos',
};

// Productos de la cesta inicial y carrusel hero
const PRODUCT_CART_1 = {
  id: 'cart-1',
  name: 'Ramo tulipanes mixto',
  price: 19.99,
  image: '/media/img/tulipanes-rojos.webp',
  alt: 'Tulipanes rojos frescos con matices dorados en floración primaveral',
  description:
    'Surtido multicolor de tulipanes frescos de temporada recogidos a mano en su punto óptimo de apertura.',
  category: 'de-temporada',
};

const PRODUCT_CART_2 = {
  id: 'cart-2',
  name: 'Ramo Boda mediano',
  price: 50.99, // Precio unitario estipulado en la rúbrica (subtotal 2 uds = 101,98 €)
  image: '/media/img/ramo-boda-blanco.webp',
  alt: 'Ramo de boda compuesto de rosas blancas y hojas verdes brillantes sobre madera',
  description:
    'Composición nupcial artesanal de tamaño mediano con peonías marfil, rosas y hojas de olivo mediterráneo.',
  category: 'pedida-de-mano',
};

const PRODUCT_CART_3 = {
  id: 'cart-3',
  name: 'Ramo rosas clásico',
  price: 22.99,
  image: '/media/img/rosas-carmesi-lluvia.webp',
  alt: 'Ramo de rosas rojas y rosadas cubiertas de gotas de rocío sobre fondo oscuro',
  description:
    'Rosas de tallo largo y terciopelo rojo intenso acompañadas de verde eucalipto fresco.',
  category: 'aniversarios',
};

const PRODUCT_HERO_1 = {
  id: 'hero-1',
  name: 'Peonía imperial',
  price: 34.99,
  image: '/media/img/peonies-autor.webp',
  alt: 'Peonías y rosas en tonos crema y rosa pastel para centros de mesa',
  description:
    'Peonías imperiales de flor grande y perfume sutil, seleccionadas para eventos de alta distinción.',
  category: 'centros',
};

const PRODUCT_HERO_2 = {
  id: 'hero-2',
  name: 'Rosa centifolia',
  price: 29.99,
  image: '/media/img/rosas-carmesi-lluvia.webp',
  alt: 'Rosas carmesí y rosa antiguo con gotas de agua sobre fondo verde oscuro',
  description:
    'Rosas centifolia de fragancia persistente y porte romántico, muy solicitadas para estilismos nupciales.',
  category: 'pedida-de-mano',
};

const PRODUCT_HERO_3 = {
  id: 'hero-3',
  name: 'Dalia silvestre',
  price: 26.5,
  image: '/media/img/dalia-silvestre.webp',
  alt: 'Dalia silvestre de pétalos amarillo cálido con centro granate y follaje oscuro',
  description:
    'Dalias de tonos terracota y ámbar que aportan calidez y sofisticación a cualquier rincón del hogar.',
  category: 'de-temporada',
};

// Productos destacados para categorías del sidebar
const PRODUCT_FEAT_ARTIFICIALES = {
  id: 'feat-artificiales',
  name: 'Centro Botánico Pampa Silk',
  price: 32.0,
  image: '/media/img/centro-botanico-jarron.webp',
  alt: 'Centro botánico perenne de espigas y flores secas en jarrón cerámico blanco sobre lino',
  description:
    'Flores y ramas artificiales de tacto realista y máxima durabilidad, sin necesidad de mantenimiento ni agua.',
  category: 'artificiales',
};

const PRODUCT_FEAT_CONDOLENCIAS = {
  id: 'feat-condolencias',
  name: 'Corona Blanca de Serenidad',
  price: 45.0,
  image: '/media/img/lirios-blancos.webp',
  alt: 'Ramo sereno de lirios blancos naturales dispuesto sobre superficie de madera',
  description:
    'Diseño sobrio y respetuoso en lirios blancos, paniculata y gladiolos para transmitir cariño y recuerdo.',
  category: 'condolencias',
};

const PRODUCT_FEAT_CUMPLEANOS = {
  id: 'feat-cumpleanos',
  name: 'Bouquet Fiesta Color',
  price: 25.5,
  image: '/media/img/girasol-campo.webp',
  alt: 'Girasol amarillo brillante en floración rodeado de verde follaje',
  description:
    'Explosión de colores vivos con gerberas, girasoles y claveles frescos para felicitar en aniversarios natales.',
  category: 'cumpleanos',
};

const PRODUCT_FEAT_SECAS = {
  id: 'feat-secas',
  name: 'Manojo de Lavanda y Trigo',
  price: 18.0,
  image: '/media/img/dalia-silvestre.webp',
  alt: 'Dalia silvestre dorada de estación con hojas oscuras sobre fondo natural',
  description:
    'Flores secas preservadas con aroma calmante natural, perfectas para decoración boho-chic perdurable.',
  category: 'flores-secas',
};

// 2. Catálogo Unificado Completo
export const PRODUCTS = [
  PRODUCT_TOP_PREVIEW,
  PRODUCT_TOP_1,
  PRODUCT_TOP_2,
  PRODUCT_TOP_3,
  PRODUCT_TOP_4,
  PRODUCT_CART_1,
  PRODUCT_CART_2,
  PRODUCT_CART_3,
  PRODUCT_HERO_1,
  PRODUCT_HERO_2,
  PRODUCT_HERO_3,
  PRODUCT_FEAT_ARTIFICIALES,
  PRODUCT_FEAT_CONDOLENCIAS,
  PRODUCT_FEAT_CUMPLEANOS,
  PRODUCT_FEAT_SECAS,
];

// Identificadores de Top Ventas de la página de inicio
export const TOP_SALES_IDS = ['top-1', 'top-2', 'top-3', 'top-4'];

// Exportación derivada de Top Ventas para retrocompatibilidad
export const TOP_SALES_PRODUCTS = PRODUCTS.filter((p) => TOP_SALES_IDS.includes(p.id));

// 3. Estructura de previsualización para el acordeón del Sidebar
export const TOP_SALES_PREVIEW = {
  id: 'top-ventas',
  name: 'Top Ventas',
  subtitle: 'Para cualquier ocasión',
  featuredProduct: PRODUCT_TOP_PREVIEW,
};

export const SIDEBAR_CATEGORIES = [
  {
    id: 'de-temporada',
    name: 'De temporada',
    subtitle: 'Selección especial de estación',
    featuredProduct: PRODUCT_TOP_2,
  },
  {
    id: 'artificiales',
    name: 'Artificiales',
    subtitle: 'Belleza botánica perenne',
    featuredProduct: PRODUCT_FEAT_ARTIFICIALES,
  },
  {
    id: 'condolencias',
    name: 'Condolencias',
    subtitle: 'Acompañamiento y serenidad',
    featuredProduct: PRODUCT_FEAT_CONDOLENCIAS,
  },
  {
    id: 'cumpleanos',
    name: 'Cumpleaños',
    subtitle: 'Alegría para celebrar la vida',
    featuredProduct: PRODUCT_FEAT_CUMPLEANOS,
  },
  {
    id: 'aniversarios',
    name: 'Aniversarios',
    subtitle: 'Pasión y recuerdo eterno',
    featuredProduct: PRODUCT_CART_3,
  },
  {
    id: 'pedida-de-mano',
    name: 'Pedida de mano',
    subtitle: 'Detalles para el sí quiero',
    featuredProduct: PRODUCT_CART_2,
  },
  {
    id: 'variados',
    name: 'Variados',
    subtitle: 'Composiciones con carácter mixto',
    featuredProduct: PRODUCT_TOP_1,
  },
  {
    id: 'centros',
    name: 'Centros',
    subtitle: 'Elegancia para tus mesas',
    featuredProduct: PRODUCT_HERO_1,
  },
  {
    id: 'flores-secas',
    name: 'Flores secas',
    subtitle: 'Aromas y tonos rústicos',
    featuredProduct: PRODUCT_FEAT_SECAS,
  },
  {
    id: 'ramos',
    name: 'Ramos',
    subtitle: 'El regalo clásico e infalible',
    featuredProduct: PRODUCT_TOP_4,
  },
];

// 4. Diapositivas del Carrusel Hero conectadas a productos reales
export const HERO_SLIDES = [
  {
    id: 1,
    productId: 'hero-1',
    title: 'Peonía imperial',
    subtitle: 'Fragancia delicada para centros de mesa',
    image: '/media/img/peonies-autor.webp',
    alt: 'Peonías y rosas en tonos marfil y rosa empolvado para centros de mesa',
  },
  {
    id: 2,
    productId: 'hero-2',
    title: 'Rosa centifolia',
    subtitle: 'Especialmente popular en tocados de novia',
    image: '/media/img/rosas-carmesi-lluvia.webp',
    video: '/media/video/rosas-eucalipto-hero.mp4',
    alt: 'Rosas de jardín en tonos crema y rosado con hojas de eucalipto',
  },
  {
    id: 3,
    productId: 'hero-3',
    title: 'Dalia silvestre',
    subtitle: 'Tonos cálidos de temporada para eventos',
    image: '/media/img/dalia-silvestre.webp',
    alt: 'Dalia silvestre amarilla con centro oscuro y follaje bronce',
  },
];

// 5. Cesta inicial con referencias de productId y cantidades
export const INITIAL_CART_ITEMS = [
  { productId: 'cart-1', quantity: 1 },
  { productId: 'cart-2', quantity: 2 },
  { productId: 'cart-3', quantity: 1 },
];

/**
 * Obtiene un producto por su id de forma segura.
 */
export const getProductById = (id) => PRODUCTS.find((p) => p.id === id) || null;

/**
 * Normaliza cadenas de texto para búsquedas insensibles a diacríticos y mayúsculas.
 */
export const normalizeString = (str) =>
  (str || '')
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();

/**
 * Filtra productos por término de búsqueda y categoría opcional.
 */
export function filterProducts(products, query = '', categoryId = '') {
  let list = Array.isArray(products) ? products : [];

  if (categoryId && categoryId !== 'all') {
    list = list.filter((p) => p.category === categoryId);
  }

  const cleanQuery = normalizeString(query);
  if (cleanQuery) {
    list = list.filter((p) => {
      const nameMatch = normalizeString(p.name).includes(cleanQuery);
      const descMatch = normalizeString(p.description).includes(cleanQuery);
      return nameMatch || descMatch;
    });
  }

  return list;
}

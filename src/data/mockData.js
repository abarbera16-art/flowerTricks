/**
 * FLOWER TRICKS — Catálogo Maestro de Datos
 * Modelo unificado de productos, categorías, diapositivas y cesta inicial.
 */

// 1. Productos individuales con identificadores únicos y consistentes
const PRODUCT_TOP_PREVIEW = {
  id: 'top-preview',
  name: 'Ramo de Autor Mostaza',
  price: 28.5,
  image:
    'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?auto=format&fit=crop&w=600&q=80',
  alt: 'Ramo floral artesanal envuelto en papel mostaza para celebraciones especiales',
  description:
    'Exclusiva composición de autor con peonías, eucalipto y paniculata silvestre, envuelta en papel artesanal de tono mostaza.',
  category: 'ramos',
};

const PRODUCT_TOP_1 = {
  id: 'top-1',
  name: 'Ramo Silvestre Primaveral',
  price: 19.99,
  image:
    'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=800&q=80',
  alt: 'Ramo de rosas rosas, lirios blancos y paniculata con luz solar cálida',
  description:
    'Bouquet fresco con lirios blancos, paniculata y rosas pastel, ideal para iluminar estancias y transmitir armonía natural.',
  category: 'variados',
};

const PRODUCT_TOP_2 = {
  id: 'top-2',
  name: 'Ramo de Girasoles Silvestres',
  price: 19.99,
  image:
    'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=800&q=80',
  alt: 'Ramo de girasoles amarillos sobre fondo de cielo azul despejado',
  description:
    'Girasoles naturales de cultivo sostenible con follaje rústico, llenos de luz y vitalidad para regalar optimismo.',
  category: 'de-temporada',
};

const PRODUCT_TOP_3 = {
  id: 'top-3',
  name: 'Ramo de Tulipanes Escarlata',
  price: 19.99,
  image:
    'https://images.unsplash.com/photo-1520763185298-1b434c919102?auto=format&fit=crop&w=800&q=80',
  alt: 'Ramo de tulipanes rojos intensos con tallos verdes sobre fondo oscuro',
  description:
    'Tulipanes rojos holandeses de primera calidad con tallo esbelto, símbolo tradicional de elegancia, pureza y afecto.',
  category: 'de-temporada',
};

const PRODUCT_TOP_4 = {
  id: 'top-4',
  name: 'Ramo Variado de Ensueño',
  price: 19.99,
  image:
    'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=800&q=80',
  alt: 'Ramo envuelto en papel blanco con rosas rosas, margaritas blancas y paniculata',
  description:
    'Combinación primaveral de margaritas, rosas mini y follaje aromático, preparada con envoltorio eco-responsable.',
  category: 'ramos',
};

// Productos de la cesta inicial y carrusel hero
const PRODUCT_CART_1 = {
  id: 'cart-1',
  name: 'Ramo tulipanes mixto',
  price: 19.99,
  image:
    'https://images.unsplash.com/photo-1520763185298-1b434c919102?auto=format&fit=crop&w=700&q=80',
  alt: 'Ramo de tulipanes mixtos en tonos vivos sobre fondo neutro',
  description:
    'Surtido multicolor de tulipanes frescos de temporada recogidos a mano en su punto óptimo de apertura.',
  category: 'de-temporada',
};

const PRODUCT_CART_2 = {
  id: 'cart-2',
  name: 'Ramo Boda mediano',
  price: 50.99, // Precio unitario estipulado en la rúbrica (subtotal 2 uds = 101,98 €)
  image:
    'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=700&q=80',
  alt: 'Ramo de boda mediano compuesto de peonías y rosas blancas',
  description:
    'Composición nupcial artesanal de tamaño mediano con peonías marfil, rosas y hojas de olivo mediterráneo.',
  category: 'pedida-de-mano',
};

const PRODUCT_CART_3 = {
  id: 'cart-3',
  name: 'Ramo rosas clásico',
  price: 22.99,
  image:
    'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=700&q=80',
  alt: 'Ramo de rosas rojas clásicas de tallo largo para ocasiones románticas',
  description:
    'Rosas de tallo largo y terciopelo rojo intenso acompañadas de verde eucalipto fresco.',
  category: 'aniversarios',
};

const PRODUCT_HERO_1 = {
  id: 'hero-1',
  name: 'Peonía imperial',
  price: 34.99,
  image:
    'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?auto=format&fit=crop&w=1600&q=80',
  alt: 'Flores de peonía imperial de gran porte para centros de mesa florales',
  description:
    'Peonías imperiales de flor grande y perfume sutil, seleccionadas para eventos de alta distinción.',
  category: 'centros',
};

const PRODUCT_HERO_2 = {
  id: 'hero-2',
  name: 'Rosa centifolia',
  price: 29.99,
  image:
    'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1600&q=80',
  alt: 'Rosa centifolia de pétalos densos popular en tocados y ramos nupciales',
  description:
    'Rosas centifolia de fragancia persistente y porte romántico, muy solicitadas para estilismos nupciales.',
  category: 'pedida-de-mano',
};

const PRODUCT_HERO_3 = {
  id: 'hero-3',
  name: 'Dalia silvestre',
  price: 26.5,
  image:
    'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=1600&q=80',
  alt: 'Dalias silvestres en tonos cálidos anaranjados y ocres',
  description:
    'Dalias de tonos terracota y ámbar que aportan calidez y sofisticación a cualquier rincón del hogar.',
  category: 'de-temporada',
};

// Productos destacados para categorías del sidebar
const PRODUCT_FEAT_ARTIFICIALES = {
  id: 'feat-artificiales',
  name: 'Centro Botánico Pampa Silk',
  price: 32.0,
  image:
    'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=800&q=80',
  alt: 'Arreglo botánico artificial de flores de seda y hojas realistas',
  description:
    'Flores y ramas artificiales de tacto realista y máxima durabilidad, sin necesidad de mantenimiento ni agua.',
  category: 'artificiales',
};

const PRODUCT_FEAT_CONDOLENCIAS = {
  id: 'feat-condolencias',
  name: 'Corona Blanca de Serenidad',
  price: 45.0,
  image:
    'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=800&q=80',
  alt: 'Centro floral solemne en tonos blancos para condolencias',
  description:
    'Diseño sobrio y respetuoso en lirios blancos, paniculata y gladiolos para transmitir cariño y recuerdo.',
  category: 'condolencias',
};

const PRODUCT_FEAT_CUMPLEANOS = {
  id: 'feat-cumpleanos',
  name: 'Bouquet Fiesta Color',
  price: 25.5,
  image:
    'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=800&q=80',
  alt: 'Bouquet alegre y lleno de color para celebración de cumpleaños',
  description:
    'Explosión de colores vivos con gerberas, girasoles y claveles frescos para felicitar en aniversarios natales.',
  category: 'cumpleanos',
};

const PRODUCT_FEAT_SECAS = {
  id: 'feat-secas',
  name: 'Manojo de Lavanda y Trigo',
  price: 18.0,
  image:
    'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=800&q=80',
  alt: 'Flores secas y aromáticas preservadas de lavanda silvestre y espigas',
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
    image:
      'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?auto=format&fit=crop&w=1600&q=80',
  },
  {
    id: 2,
    productId: 'hero-2',
    title: 'Rosa centifolia',
    subtitle: 'Especialmente popular en tocados de novia',
    image:
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1600&q=80',
  },
  {
    id: 3,
    productId: 'hero-3',
    title: 'Dalia silvestre',
    subtitle: 'Tonos cálidos de temporada para eventos',
    image:
      'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=1600&q=80',
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

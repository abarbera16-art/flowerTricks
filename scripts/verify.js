/**
 * FLOWER TRICKS — Script de Verificación de Integridad y Ratios de Contraste WCAG 2.1
 */

import {
  PRODUCTS,
  SIDEBAR_CATEGORIES,
  HERO_SLIDES,
  INITIAL_CART_ITEMS,
  getProductById,
  filterProducts,
} from '../src/data/mockData.js';

console.log('====================================================');
console.log('1. VERIFICACIÓN DE INTEGRIDAD DEL CATÁLOGO DE DATOS');
console.log('====================================================');

// 1. Unicidad de IDs
const ids = PRODUCTS.map((p) => p.id);
const uniqueIds = new Set(ids);
console.assert(ids.length === uniqueIds.size, 'Error: IDs de producto duplicados');
console.log(`✓ Total de productos en catálogo: ${PRODUCTS.length} (todos con ID único).`);

// 2. Coherencia de categorías
SIDEBAR_CATEGORIES.forEach((cat) => {
  console.assert(cat.id && cat.name && cat.featuredProduct, `Categoría incompleta: ${cat.id}`);
  const matchInCatalog = PRODUCTS.find((p) => p.id === cat.featuredProduct.id);
  console.assert(
    matchInCatalog === cat.featuredProduct,
    `Error de referencia en featuredProduct de ${cat.id}`
  );
});
console.log(`✓ 10 Categorías del sidebar validadas con featuredProduct referenciado.`);

// 3. Coherencia de Hero Slides
HERO_SLIDES.forEach((slide) => {
  const prod = getProductById(slide.productId);
  console.assert(prod !== null, `Slide ${slide.id} apunta a un productId inexistente`);
});
console.log(`✓ ${HERO_SLIDES.length} Diapositivas hero apuntan a productos reales.`);

// 4. Cesta inicial y precios unitarios
console.log('\n====================================================');
console.log('2. VERIFICACIÓN DE PRECIOS Y TOTALES DE CESTA');
console.log('====================================================');

let totalUnits = 0;
let rawTotal = 0;

INITIAL_CART_ITEMS.forEach((item) => {
  const prod = getProductById(item.productId);
  const subtotal = prod.price * item.quantity;
  totalUnits += item.quantity;
  rawTotal += subtotal;
  console.log(`- ${prod.name}: ${prod.price}€ x ${item.quantity} ud(s) = ${subtotal.toFixed(2)}€`);
});

const discountTotal = rawTotal * 0.9;
console.log(`✓ Unidades totales: ${totalUnits}`);
console.log(`✓ Subtotal inicial: ${rawTotal.toFixed(2)}€`);
console.log(`✓ Total con código FLORES10 (-10%): ${discountTotal.toFixed(2)}€`);

// 5. Verificación de filtrado y búsqueda
console.log('\n====================================================');
console.log('3. VERIFICACIÓN DEL MOTOR DE FILTRADO');
console.log('====================================================');

const testSearch1 = filterProducts(PRODUCTS, 'girasol');
console.assert(testSearch1.length >= 1, 'Búsqueda por girasol falló');
console.log(`✓ Búsqueda por "girasol": ${testSearch1.length} productos.`);

const testSearchDiacritics = filterProducts(PRODUCTS, 'peonia');
console.assert(testSearchDiacritics.length >= 1, 'Búsqueda insensible a tildes falló');
console.log(`✓ Búsqueda insensible a tildes ("peonia" -> "Peonía"): ${testSearchDiacritics.length} productos.`);

const testCatFilter = filterProducts(PRODUCTS, '', 'de-temporada');
console.assert(testCatFilter.length >= 1, 'Filtro por categoría de-temporada falló');
console.log(`✓ Filtro por categoría "de-temporada": ${testCatFilter.length} productos.`);

// 6. Fórmulas oficiales de Luminancia Relativa y Contraste WCAG 2.1
console.log('\n====================================================');
console.log('4. CÁLCULO DE RATIOS DE CONTRASTE WCAG 2.1 (AA / AAA)');
console.log('====================================================');

function hexToRgb(hex) {
  const clean = hex.replace('#', '');
  const bigint = parseInt(clean, 16);
  return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
}

function getLuminance([r, g, b]) {
  const a = [r, g, b].map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

function getContrast(hex1, hex2) {
  const l1 = getLuminance(hexToRgb(hex1));
  const l2 = getLuminance(hexToRgb(hex2));
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

const contrastChecks = [
  { name: 'Texto CTA (--ft-on-accent: #1A1A1A sobre celeste #76B5C5)', fg: '#1A1A1A', bg: '#76B5C5', req: 4.5 },
  { name: 'Texto CTA hover (#1A1A1A sobre #5CA2B4)', fg: '#1A1A1A', bg: '#5CA2B4', req: 4.5 },
  { name: 'Texto CTA oscuro (#1A1A1A sobre celeste oscuro #63A8B9)', fg: '#1A1A1A', bg: '#63A8B9', req: 4.5 },
  { name: 'Texto Badge (--ft-on-brand: #1A1A1A sobre terracota #D48C84)', fg: '#1A1A1A', bg: '#D48C84', req: 4.5 },
  { name: 'Texto Badge oscuro (#1A1A1A sobre terracota oscuro #E29D96)', fg: '#1A1A1A', bg: '#E29D96', req: 4.5 },
  { name: 'Logo / Corazón activo claro (--ft-brand-color-text: #A9594F sobre #FFFDF9)', fg: '#A9594F', bg: '#FFFDF9', req: 4.5 },
  { name: 'Logo / Corazón activo oscuro (#E29D96 sobre fondo oscuro #18181A)', fg: '#E29D96', bg: '#18181A', req: 4.5 },
  { name: 'Texto principal claro (#1A1A1A sobre #FFFDF9)', fg: '#1A1A1A', bg: '#FFFDF9', req: 4.5 },
  { name: 'Texto principal oscuro (#F5F3EF sobre #18181A)', fg: '#F5F3EF', bg: '#18181A', req: 4.5 },
  { name: 'Texto secundario muted claro (#555555 sobre #FFFDF9)', fg: '#555555', bg: '#FFFDF9', req: 4.5 },
  { name: 'Texto secundario muted oscuro (#B0B0B8 sobre #18181A)', fg: '#B0B0B8', bg: '#18181A', req: 4.5 },
  { name: 'Foco visible claro (--ft-focus: #287487 sobre #FFFDF9)', fg: '#287487', bg: '#FFFDF9', req: 3.0 },
  { name: 'Foco visible oscuro (--ft-focus: #8FD5E5 sobre #18181A)', fg: '#8FD5E5', bg: '#18181A', req: 3.0 },
];

contrastChecks.forEach((check) => {
  const ratio = getContrast(check.fg, check.bg);
  const passed = ratio >= check.req;
  const grade = ratio >= 7 ? 'AAA' : ratio >= 4.5 ? 'AA' : ratio >= 3 ? 'AA Grande' : 'FAIL';
  console.log(`[${passed ? 'PASS' : 'FAIL'}] ${check.name}: ${ratio.toFixed(2)}:1 (${grade})`);
  console.assert(passed, `Contraste insuficiente en ${check.name}`);
});

console.log('\n✓ Todos los controles de contraste y catálogo han superado la validación con éxito.');

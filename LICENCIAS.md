# Licencias y optimización multimedia - FlowerTricks (RA3 DIW)

Originales en `/media-bruto/` y versiones finales en `/src/media/` (copiadas en `/public/media/` para Vite). Ningún archivo supera los 100 MB (el mayor pesa 2.81 MB en bruto y 1.29 MB optimizado).

## 1. Licencias y fuentes

Las licencias de Pexels, Unsplash y Pixabay permiten uso comercial/no comercial y edición sin atribución obligatoria. El SVG de Wikimedia Commons y el origen Freesound de `favorite.mp3` son CC0 / Dominio Público.

### Imágenes y SVG

| Archivo final | Archivo original | Autor | Fuente | Licencia |
| :--- | :--- | :--- | :--- | :--- |
| `peonies-autor.webp` | `peonies-autor.jpg` | Magda Ehlers | <https://www.pexels.com/photo/bouquet-of-pink-and-white-roses-14025718/> | Pexels License |
| `lirios-blancos.webp` | `lirios-blancos.jpg` | Woki Nguyn | <https://www.pexels.com/photo/madonna-lily-19883359/> | Pexels License |
| `girasol-campo.webp` | `girasol-campo.jpg` | Ambareesh Sridhar Photography | <https://www.pexels.com/photo/sunflower-19062800/> | Pexels License |
| `tulipanes-rojos.webp` | `tulipanes-rojos.jpg` | Jan van der Wolf | <https://www.pexels.com/photo/field-of-red-tulips-16972778/> | Pexels License |
| `centro-botanico-jarron.webp` | `centro-botanico-jarron.jpg` | Karolina Grabowska (Karola G) | <https://www.pexels.com/photo/flowers-in-white-ceramic-vase-on-brown-textile-6958729/> | Pexels License |
| `ramo-boda-blanco.webp` | `ramo-boda-blanco.jpg` | Jennifer Kalenberg (@jkalen71) | <https://unsplash.com/photos/a-beautiful-bouquet-of-white-roses-930aae912ef1> | Unsplash License |
| `rosas-carmesi-lluvia.webp` | `rosas-carmesi-lluvia.jpg` | Wyxina Tresse | <https://www.pexels.com/photo/a-bunch-of-red-and-pink-rose-flowers-with-rain-drops-20138925/> | Pexels License |
| `dalia-silvestre.webp` | `dalia-silvestre.jpg` | Richard REVEL (Hermaion) | <https://www.pexels.com/photo/a-dahlia-mystic-illusion-flower-in-bloom-13255387/> | Pexels License |
| `logo-flor.svg` | `logo-flor.svg` | Maja Kocoń (OpenClipart / Wikimedia Commons) | <https://commons.wikimedia.org/wiki/File:Flower_03.svg> | CC0 1.0 / Dominio Público |

### Vídeo

| Archivo final | Archivo original | Autor | Fuente | Licencia |
| :--- | :--- | :--- | :--- | :--- |
| `rosas-eucalipto-hero.mp4` | `rosas-eucalipto-hero.mp4` | Mikhail Nilov | <https://www.pexels.com/video/a-beautiful-roses-with-leaves-8247218/> | Pexels License |

### Audio

| Archivo final | Archivo original | Autor | Fuente | Licencia |
| :--- | :--- | :--- | :--- | :--- |
| `add-cart.mp3` | `freesound_community-water-drop-3-84577.mp3` | freesound_community | <https://pixabay.com/sound-effects/film-special-effects-water-drop-3-84577/> | Pixabay Content License |
| `favorite.mp3` | `freesound_community-chime-74910.mp3` | freesound_community (origen Freesound: ikonochris, `Chime.aif` ID 213380) | <https://pixabay.com/sound-effects/film-special-effects-chime-74910/> | CC0 1.0 (Freesound ID 213380) / Pixabay Content License |
| `dark-mode.mp3` | `freesound_community-ui-click-43196.mp3` | freesound_community | <https://pixabay.com/sound-effects/ui-click-43196/> | Pixabay Content License |
| `remove-cart.mp3` | `universfield-air-swoosh-352049.mp3` | Universfield | <https://pixabay.com/sound-effects/air-swoosh-352049/> | Pixabay Content License |

## 2. Comparativa técnica (antes vs. después)

### Imágenes y SVG

| Archivo | Antes (`/media-bruto/img`) | Después (`/src/media/img`) | Reducción | Qué se hizo |
| :--- | :--- | :--- | :--- | :--- |
| `peonies-autor` | JPG, 1600×1067, 141.03 KB (144,414 B) | WebP, 1600×1067, 54.84 KB (56,158 B) | -61.1% | Pasada a WebP manteniendo tamaño Hero |
| `lirios-blancos` | JPG, 1000×667, 73.72 KB (75,487 B) | WebP, 1000×667, 33.36 KB (34,164 B) | -54.7% | Pasada a WebP para fichas de catálogo |
| `girasol-campo` | JPG, 1000×667, 103.05 KB (105,523 B) | WebP, 1000×667, 58.45 KB (59,856 B) | -43.3% | Pasada a WebP para fichas de catálogo |
| `tulipanes-rojos` | JPG, 1000×667, 218.30 KB (223,541 B) | WebP, 800×534, 141.33 KB (144,726 B) | -35.3% | WebP a 800px (q=80) para bajar de 150 KB sin perder nitidez |
| `centro-botanico-jarron` | JPG, 1000×667, 44.98 KB (46,064 B) | WebP, 1000×667, 22.30 KB (22,840 B) | -50.4% | Pasada a WebP para tarjetas de producto |
| `ramo-boda-blanco` | JPG, 1000×1500, 206.99 KB (211,961 B) | WebP, 1000×1500, 61.12 KB (62,584 B) | -70.5% | WebP vertical 3:4 para la tarjeta de cesta |
| `rosas-carmesi-lluvia` | JPG, 1600×1067, 142.49 KB (145,908 B) | WebP, 1600×1067, 64.96 KB (66,516 B) | -54.4% | WebP ancho para carrusel Hero y banner de rebajas |
| `dalia-silvestre` | JPG, 1600×1067, 144.82 KB (148,298 B) | WebP, 1000×667, 25.73 KB (26,352 B) | -82.2% | Reescalada a 1000px en WebP para el slide 3 |
| `logo-flor.svg` | SVG Inkscape 0.39, 18.04 KB (18,476 B) | SVG limpio (`viewBox="0 0 656.6 669.86"`), 8.73 KB (8,940 B) | -51.6% | Limpiados metadatos RDF/Inkscape, trazados invisibles y gradientes repetidos |
| Subtotal imágenes + SVG | 1,093.43 KB (1,119,672 B) | 470.84 KB (482,136 B) | -56.9% | Todas por debajo de 150 KB y vector limpio |

### Vídeo

| Archivo | Antes (`/media-bruto/video`) | Después (`/src/media/video`) | Reducción | Qué se hizo |
| :--- | :--- | :--- | :--- | :--- |
| `rosas-eucalipto-hero.mp4` | MP4 H.264, 1280×720, 25 fps, 12.24 s, 1922.6 kbps, sin audio, 2.81 MB (2,941,605 B) | MP4 H.264, 1280×720, 25 fps, 10.00 s, 1078.7 kbps, sin audio, 1.29 MB (1,348,407 B) | -54.2% | Recortado a 10s a 720p y bajado el bitrate para que cargue rápido en el Hero |

### Audio

| Archivo | Antes (`/media-bruto/audio`) | Después (`/src/media/audio`) | Reducción | Qué se hizo |
| :--- | :--- | :--- | :--- | :--- |
| `add-cart.mp3` | MP3, 24 kHz, 2 ch, 160 kbps, 1.46 s, mean -50.4 dB / max -24.1 dB, 28.59 KB (29,280 B) | MP3, 44.1 kHz, 2 ch, 96 kbps, 0.52 s, mean -24.2 dB / max -2.3 dB, 6.47 KB (6,627 B) | -77.4% | Quitados silencios, subida ganancia (+22.1 dB) porque apenas se oía, fade in/out (15ms/180ms) a 96 kbps |
| `favorite.mp3` | MP3, 48 kHz, 1 ch, 256 kbps, 52.20 s, mean -37.2 dB / max -3.2 dB, 1631.25 KB (1,670,400 B) | MP3, 44.1 kHz, 1 ch, 96 kbps, 2.64 s, mean -25.4 dB / max -2.3 dB, 31.27 KB (32,018 B) | -98.1% | Recortado al primer toque de campana, normalizado (+7.3 dB), fade in/out (10ms/600ms) a 96 kbps |
| `dark-mode.mp3` | MP3, 24 kHz, 2 ch, 160 kbps, 0.55 s, mean -36.0 dB / max -13.5 dB, 10.78 KB (11,040 B) | MP3, 44.1 kHz, 2 ch, 96 kbps, 0.26 s, mean -21.1 dB / max -2.3 dB, 3.41 KB (3,493 B) | -68.4% | Ajustado al golpe del clic, normalizado (+11.5 dB), fade in/out (8ms/50ms) a 96 kbps |
| `remove-cart.mp3` | MP3, 48 kHz, 2 ch, 256 kbps, 2.95 s, mean -27.1 dB / max -5.8 dB, 92.25 KB (94,464 B) | MP3, 44.1 kHz, 2 ch, 96 kbps, 1.54 s, mean -20.9 dB / max -2.7 dB, 18.41 KB (18,853 B) | -80.0% | Recortado a 1.54s, normalizado (+3.8 dB) con fade in/out (50ms/450ms) a 44.1 kHz y 96 kbps |
| Subtotal audio | 1,762.88 KB (1,805,184 B) | 59.56 KB (60,991 B) | -96.6% | Todos a 96 kbps y volumen igualado |

### Total

| Categoría | Bruto (`/media-bruto`) | Final (`/src/media`) | Reducción |
| :--- | :--- | :--- | :--- |
| Imágenes + SVG (9) | 1,093.43 KB | 470.84 KB | -56.9% |
| Vídeo (1) | 2.81 MB | 1.29 MB | -54.2% |
| Audio (4) | 1,762.88 KB | 59.56 KB | -96.6% |
| Total (14 archivos) | 5.59 MB (5,866,461 B) | 1.80 MB (1,891,534 B) | -67.8% |

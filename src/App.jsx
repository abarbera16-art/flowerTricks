import { useState, useEffect, useRef, useCallback } from 'react';
import Header from './components/Header';
import SidebarMenu from './components/SidebarMenu';
import HeroCarousel from './components/HeroCarousel';
import ProductCard from './components/ProductCard';
import ProductDetailView from './components/ProductDetailView';
import CartView from './components/CartView';
import Footer from './components/Footer';
import MobileBottomNav from './components/MobileBottomNav';
import { mountVanillaAuth } from './vanilla/authVanilla';
import { preloadSounds, playSound } from './utils/soundEffects';
import {
  PRODUCTS,
  TOP_SALES_PRODUCTS,
  INITIAL_CART_ITEMS,
  getProductById,
  filterProducts,
  SIDEBAR_CATEGORIES,
} from './data/mockData';

export default function App() {
  // 1. Estado de navegación de vistas
  const [currentView, setCurrentView] = useState('home'); // 'home' | 'cart' | 'product' | 'auth'
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isSidebarClosing, setIsSidebarClosing] = useState(false);
  const closingTimeoutRef = useRef(null);
  const [user, setUser] = useState(null);

  // 2. Persistencia en localStorage con recuperación segura
  const [theme, setTheme] = useState(() => {
    try {
      const savedTheme = localStorage.getItem('ft_theme');
      if (savedTheme === 'light' || savedTheme === 'dark') return savedTheme;
      if (
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches
      ) {
        return 'dark';
      }
    } catch {
      // Fallback si localStorage no está disponible
    }
    return 'light';
  });

  const [wishlistIds, setWishlistIds] = useState(() => {
    try {
      const savedWishlist = localStorage.getItem('ft_wishlist');
      if (savedWishlist) {
        const parsed = JSON.parse(savedWishlist);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // Fallback
    }
    return [];
  });

  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem('ft_cart');
      if (savedCart) {
        const parsed = JSON.parse(savedCart);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // Fallback
    }
    return INITIAL_CART_ITEMS;
  });

  // Precarga inicial de efectos de sonido
  useEffect(() => {
    preloadSounds();
  }, []);

  // 3. Sincronización de tema (data-theme y data-bs-theme)
  useEffect(() => {
    try {
      localStorage.setItem('ft_theme', theme);
    } catch {
      // Ignorar error de cuota
    }
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.setAttribute('data-bs-theme', theme);
  }, [theme]);

  // Persistencia de Wishlist
  useEffect(() => {
    try {
      localStorage.setItem('ft_wishlist', JSON.stringify(wishlistIds));
    } catch {
      // Ignorar
    }
  }, [wishlistIds]);

  // Persistencia de Carrito
  useEffect(() => {
    try {
      localStorage.setItem('ft_cart', JSON.stringify(cartItems));
    } catch {
      // Ignorar
    }
  }, [cartItems]);

  // 4. Gestión de título de documento y desplazamiento al cambiar de vista
  useEffect(() => {
    window.scrollTo(0, 0);

    let viewTitle = 'FLOWER TRICKS | Floristería Online';
    if (currentView === 'cart') {
      viewTitle = 'Tu Cesta y Deseos | FLOWER TRICKS';
    } else if (currentView === 'product') {
      const prod = getProductById(selectedProductId);
      viewTitle = prod
        ? `${prod.name} | FLOWER TRICKS`
        : 'Detalle de Producto | FLOWER TRICKS';
    } else if (currentView === 'auth') {
      viewTitle = 'Acceso de Usuario | FLOWER TRICKS';
    }
    document.title = viewTitle;

    // Foco accesible al encabezado h1 de la nueva vista
    const timer = setTimeout(() => {
      const heading = document.querySelector('main h1');
      if (heading) heading.focus();
    }, 100);

    return () => clearTimeout(timer);
  }, [currentView, selectedProductId]);

  // 5. Montaje de la vista de autenticación Vanilla JS pura
  const authContainerRef = useRef(null);
  const handleAuthSuccess = useCallback((userObj) => {
    setUser(userObj);
    setTimeout(() => {
      setCurrentView('home');
    }, 1500);
  }, []);

  useEffect(() => {
    if (currentView !== 'auth' || !authContainerRef.current) return undefined;
    const destroy = mountVanillaAuth(authContainerRef.current, handleAuthSuccess);
    return destroy;
  }, [currentView, handleAuthSuccess]);

  // 6. Manejadores de acciones de catálogo, compras y tema
  const handleToggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    if (nextTheme === 'dark') {
      playSound('darkMode');
    }
    setTheme(nextTheme);
  };

  const handleToggleWishlist = (productId) => {
    const isAdding = !wishlistIds.includes(productId);
    if (isAdding) {
      playSound('favorite');
    }
    setWishlistIds((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const handleAddToCart = (productId) => {
    playSound('addCart');
    setCartItems((prev) => {
      const existing = prev.find((item) => item.productId === productId);
      if (existing) {
        return prev.map((item) =>
          item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { productId, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (productId, delta) => {
    const currentItem = cartItems.find((item) => item.productId === productId);
    if (currentItem && currentItem.quantity + delta <= 0) {
      playSound('removeCart');
    }
    setCartItems((prev) => {
      const existing = prev.find((item) => item.productId === productId);
      if (!existing) return prev;
      const newQty = existing.quantity + delta;
      if (newQty <= 0) {
        return prev.filter((item) => item.productId !== productId);
      }
      return prev.map((item) =>
        item.productId === productId ? { ...item, quantity: newQty } : item
      );
    });
  };

  const handleRemoveCartItem = (productId) => {
    playSound('removeCart');
    setCartItems((prev) => prev.filter((item) => item.productId !== productId));
  };

  // Limpieza de temporizadores de animación
  useEffect(() => {
    return () => {
      if (closingTimeoutRef.current) {
        clearTimeout(closingTimeoutRef.current);
      }
    };
  }, []);

  const handleToggleSidebar = useCallback(() => {
    if (closingTimeoutRef.current) {
      clearTimeout(closingTimeoutRef.current);
      closingTimeoutRef.current = null;
    }

    if (sidebarOpen) {
      setIsSidebarClosing(true);
      closingTimeoutRef.current = setTimeout(() => {
        setSidebarOpen(false);
        setIsSidebarClosing(false);
        closingTimeoutRef.current = null;
      }, 280);
    } else {
      setIsSidebarClosing(false);
      setSidebarOpen(true);
    }
  }, [sidebarOpen]);

  const handleCloseSidebar = useCallback(() => {
    if (closingTimeoutRef.current) {
      clearTimeout(closingTimeoutRef.current);
      closingTimeoutRef.current = null;
    }
    setIsSidebarClosing(false);
    setSidebarOpen(false);
  }, []);

  const handleOpenProduct = (productId) => {
    setSelectedProductId(productId);
    setCurrentView('product');
    handleCloseSidebar();
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentView('home');
    if (window.innerWidth < 768) handleCloseSidebar();
  };

  const handleSelectCategory = (categoryId) => {
    setSelectedCategory(categoryId);
    setCurrentView('home');
    if (window.innerWidth < 768) handleCloseSidebar();
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
  };

  // Cálculo de productos a mostrar en Inicio (con o sin filtro)
  const isFiltering = Boolean(searchQuery.trim() || selectedCategory);
  const displayedProducts = isFiltering
    ? filterProducts(PRODUCTS, searchQuery, selectedCategory)
    : TOP_SALES_PRODUCTS;

  const activeCategoryObj = SIDEBAR_CATEGORIES.find((c) => c.id === selectedCategory);
  const totalCartUnits = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="container-fluid p-0 min-vh-100 d-flex flex-column ft-app-root">
      {/* 1. Header Global con enlaces accesibles y cambio de tema */}
      <Header
        sidebarOpen={sidebarOpen}
        onToggleSidebar={handleToggleSidebar}
        onNavigateHome={() => {
          setCurrentView('home');
          handleClearFilters();
        }}
        onNavigateCart={() => setCurrentView('cart')}
        onNavigateAuth={() => setCurrentView('auth')}
        currentView={currentView}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        cartCount={totalCartUnits}
        user={user}
      />

      {/* 2. Cuerpo Principal de la Aplicación */}
      <div className="d-flex flex-column flex-md-row flex-grow-1 position-relative">
        {/* Menú Lateral Desplegable accesible en todas las vistas con animación de slide */}
        {(sidebarOpen || isSidebarClosing) && (
          <SidebarMenu
            isClosing={isSidebarClosing}
            searchQuery={searchQuery}
            onSearch={handleSearch}
            onSelectCategory={handleSelectCategory}
            onSelectProduct={handleOpenProduct}
          />
        )}

        {/* VISTA 1: Inicio / Catálogo / Resultados de Búsqueda */}
        {currentView === 'home' && (
          <main className="ft-main flex-grow-1 d-flex flex-column" tabIndex={-1}>
            {/* Encabezado h1 único semántico oculto visualmente */}
            <h1 className="visually-hidden">
              FLOWER TRICKS — Floristería Online, Ramos de Autor y Decoración Floral
            </h1>

            {/* Carrusel Hero (solo en home sin búsqueda específica) */}
            {!isFiltering && (
              <HeroCarousel
                wishlistIds={wishlistIds}
                onAddWishlist={handleToggleWishlist}
                onBuyNow={(productId) => {
                  handleAddToCart(productId);
                  setCurrentView('cart');
                }}
              />
            )}

            {/* Sección de Catálogo / Top Ventas o Resultados */}
            <section
              className="ft-top-sales container-fluid px-4 px-md-5 py-4"
              aria-labelledby="catalogo-heading"
            >
              <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
                <h2 id="catalogo-heading" className="ft-top-sales__heading mb-0">
                  {isFiltering
                    ? `Resultados ${
                        activeCategoryObj ? `en "${activeCategoryObj.name}"` : ''
                      } ${searchQuery ? `para "${searchQuery}"` : ''}`
                    : 'Top Ventas'}
                </h2>

                {isFiltering && (
                  <button
                    type="button"
                    className="ft-btn-cta ft-btn-cta--secondary"
                    onClick={handleClearFilters}
                  >
                    Mostrar todos / Limpiar filtros
                  </button>
                )}
              </div>

              {/* Mensaje aria-live anunciando resultados */}
              <p className="visually-hidden" aria-live="polite" role="status">
                {displayedProducts.length} productos disponibles
              </p>

              {displayedProducts.length === 0 ? (
                <div className="py-5 text-center" role="status">
                  <p className="lead text-muted mb-3">
                    No se han encontrado flores que coincidan con tu criterio.
                  </p>
                  <button
                    type="button"
                    className="ft-btn-cta"
                    onClick={handleClearFilters}
                  >
                    Ver catálogo completo
                  </button>
                </div>
              ) : (
                <div className="row g-4">
                  {displayedProducts.map((product) => (
                    <div
                      key={product.id}
                      className={
                        sidebarOpen
                          ? 'col-12 col-sm-6 col-lg-4'
                          : 'col-12 col-sm-6 col-lg-3'
                      }
                    >
                      <ProductCard
                        product={product}
                        isWishlisted={wishlistIds.includes(product.id)}
                        onToggleWishlist={handleToggleWishlist}
                        onAddToCart={handleAddToCart}
                        onSelectProduct={handleOpenProduct}
                      />
                    </div>
                  ))}
                </div>
              )}
            </section>
          </main>
        )}

        {/* VISTA 2: Cesta y Lista de Deseos */}
        {currentView === 'cart' && (
          <CartView
            cartItems={cartItems}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveCartItem}
            wishlistIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
            onAddToCart={handleAddToCart}
            onNavigateHome={() => setCurrentView('home')}
          />
        )}

        {/* VISTA 3: Detalle de Producto */}
        {currentView === 'product' && (
          <ProductDetailView
            product={getProductById(selectedProductId)}
            isWishlisted={wishlistIds.includes(selectedProductId)}
            onToggleWishlist={handleToggleWishlist}
            onAddToCart={handleAddToCart}
            onBack={() => setCurrentView('home')}
          />
        )}

        {/* VISTA 4: Autenticación Vanilla JavaScript pura */}
        {currentView === 'auth' && (
          <main
            ref={authContainerRef}
            className="ft-main flex-grow-1 d-flex align-items-center justify-content-center py-5 px-3"
            tabIndex={-1}
          />
        )}
      </div>

      {/* 3. Footer Global en todas las vistas */}
      <Footer />

      {/* 4. Barra de Navegación Inferior Fija en Móvil estilo Instagram */}
      <MobileBottomNav
        onNavigateHome={() => {
          setCurrentView('home');
          handleClearFilters();
        }}
        onToggleTheme={handleToggleTheme}
        onNavigateCart={() => setCurrentView('cart')}
        onNavigateAuth={() => setCurrentView('auth')}
        theme={theme}
        cartCount={totalCartUnits}
        user={user}
      />
    </div>
  );
}

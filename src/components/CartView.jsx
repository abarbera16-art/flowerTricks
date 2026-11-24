import { useState } from 'react';
import { getProductById } from '../data/mockData';

export default function CartView({
  cartItems = [],
  onUpdateQuantity,
  onRemoveItem,
  wishlistIds = [],
  onToggleWishlist,
  onAddToCart,
  onNavigateHome,
}) {
  const [activeTab, setActiveTab] = useState('cesta');
  const [giftTicket, setGiftTicket] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [promoFeedback, setPromoFeedback] = useState({ text: '', type: '' });

  const PROMO_CODE = 'FLORES10';
  const PROMO_RATE = 0.1;

  // Cálculo de subtotales y total derivado (nunca duplicado en estado)
  const cartWithDetails = cartItems
    .map((item) => {
      const product = getProductById(item.productId);
      if (!product) return null;
      const subtotal = product.price * item.quantity;
      return { ...item, product, subtotal };
    })
    .filter(Boolean);

  const rawTotal = cartWithDetails.reduce((sum, item) => sum + item.subtotal, 0);
  const discountAmount = discountApplied ? rawTotal * PROMO_RATE : 0;
  const finalTotal = rawTotal - discountAmount;

  const currencyFormatter = new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
  });

  const handlePromoSubmit = (e) => {
    e.preventDefault();
    const cleanCode = promoCode.trim().toUpperCase();

    if (!cleanCode) {
      setDiscountApplied(false);
      setPromoFeedback({
        text: 'Por favor, introduce un código promocional.',
        type: 'error',
      });
      return;
    }

    if (cleanCode === PROMO_CODE) {
      setDiscountApplied(true);
      setPromoFeedback({
        text: '¡Código FLORES10 aplicado! 10% de descuento incluido.',
        type: 'success',
      });
    } else {
      setDiscountApplied(false);
      setPromoFeedback({
        text: 'Código promocional no válido o caducado.',
        type: 'error',
      });
    }
  };

  const wishlistProducts = wishlistIds.map((id) => getProductById(id)).filter(Boolean);

  return (
    <main
      className="ft-main ft-cart w-100 flex-grow-1"
      aria-labelledby="cart-main-heading"
    >
      <div className="container-fluid px-4 px-md-5 py-2 ft-cart__container">
        {/* Encabezado semántico accesible (oculto visualmente para ganar espacio limpio) */}
        <h1 id="cart-main-heading" className="visually-hidden">
          {activeTab === 'cesta' ? 'Tu Cesta de Compra' : 'Tu Lista de Deseos'}
        </h1>

        {/* Pestañas Cesta y Wishlist con aria-pressed */}
        <div
          className="d-flex align-items-center gap-3 mb-3"
          role="group"
          aria-label="Secciones de compra"
        >
          <button
            type="button"
            className={`ft-btn-tab ${activeTab === 'cesta' ? 'ft-btn-tab--active' : ''}`}
            onClick={() => setActiveTab('cesta')}
            aria-pressed={activeTab === 'cesta'}
          >
            <span>Cesta ({cartItems.reduce((acc, i) => acc + i.quantity, 0)})</span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 26 26"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <rect x="3.5" y="5.5" width="19" height="16.5" rx="2.5" />
              <path d="M8.5 9.5c0 2.5 2 4.2 4.5 4.2s4.5-1.7 4.5-4.2" />
            </svg>
          </button>

          <button
            type="button"
            className={`ft-btn-tab ${activeTab === 'wishlist' ? 'ft-btn-tab--active' : ''}`}
            onClick={() => setActiveTab('wishlist')}
            aria-pressed={activeTab === 'wishlist'}
          >
            <span>Wishlist ({wishlistIds.length})</span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>
        </div>

        {/* Contenido Condicional: Pestaña Cesta */}
        {activeTab === 'cesta' && (
          <div className="row g-4 align-items-start">
            <div className="col-12 col-lg-8 col-xl-9">
              {cartWithDetails.length === 0 ? (
                <div className="py-5 text-center">
                  <p className="lead text-muted mb-4">Tu cesta está vacía actualmente.</p>
                  <button type="button" className="ft-btn-cta" onClick={onNavigateHome}>
                    Explorar flores y ramos
                  </button>
                </div>
              ) : (
                <div className="row g-4">
                  {cartWithDetails.map(({ product, quantity, subtotal }) => {
                    const isFav = wishlistIds.includes(product.id);
                    return (
                      <div key={product.id} className="col-12 col-sm-6 col-md-4">
                        <article className="ft-card">
                          <img
                            src={product.image}
                            alt={product.alt || product.name}
                            className="ft-cart__item-img"
                            loading="lazy"
                          />
                          <div className="d-flex justify-content-between align-items-start mt-1">
                            <div>
                              <h2 className="ft-card__title">{product.name}</h2>
                              <span className="ft-cart__unit-label d-block">
                                {currencyFormatter.format(product.price)} / ud.
                              </span>

                              {/* Controles accesibles de cantidad */}
                              <div className="ft-cart__quantity-control">
                                <button
                                  type="button"
                                  className="ft-cart__qty-btn"
                                  onClick={() => onUpdateQuantity(product.id, -1)}
                                  aria-label={`Reducir cantidad de ${product.name}`}
                                >
                                  −
                                </button>
                                <span
                                  className="ft-cart__qty-value"
                                  aria-label={`Cantidad: ${quantity}`}
                                >
                                  {quantity}
                                </span>
                                <button
                                  type="button"
                                  className="ft-cart__qty-btn"
                                  onClick={() => onUpdateQuantity(product.id, 1)}
                                  aria-label={`Aumentar cantidad de ${product.name}`}
                                >
                                  +
                                </button>
                              </div>
                            </div>

                            <div className="text-end">
                              <span className="ft-card__price d-block mb-1">
                                {currencyFormatter.format(subtotal)}
                              </span>
                              <div className="d-flex justify-content-end gap-1">
                                <button
                                  type="button"
                                  className={`ft-btn-icon ft-btn-icon--sm ${
                                    isFav ? 'ft-btn-icon--active' : ''
                                  }`}
                                  onClick={() => onToggleWishlist(product.id)}
                                  aria-pressed={isFav}
                                  aria-label={`Añadir a favoritos: ${product.name}`}
                                  title="Añadir a favoritos"
                                >
                                  <svg
                                    width="13"
                                    height="13"
                                    viewBox="0 0 24 24"
                                    fill={isFav ? 'currentColor' : 'none'}
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                    aria-hidden="true"
                                  >
                                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                                  </svg>
                                </button>
                                <button
                                  type="button"
                                  className="ft-btn-icon ft-btn-icon--sm"
                                  onClick={() => onRemoveItem(product.id)}
                                  aria-label={`Eliminar ${product.name} de la cesta`}
                                  title="Eliminar de la cesta"
                                >
                                  <svg
                                    width="13"
                                    height="13"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                    aria-hidden="true"
                                  >
                                    <polyline points="3 6 5 6 21 6" />
                                    <path d="M19 6l-1 14H6L5 6m5 0V4h4v2" />
                                  </svg>
                                </button>
                              </div>
                            </div>
                          </div>
                        </article>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Resumen lateral de compra */}
            {cartWithDetails.length > 0 && (
              <aside className="col-12 col-lg-4 col-xl-3" aria-label="Resumen del pedido">
                <div className="ft-cart__summary">
                  <h2 className="h6 mb-3 fw-semibold">Resumen de compra</h2>

                  <div className="d-flex justify-content-between align-items-center mb-2 small">
                    <span>Subtotal</span>
                    <span>{currencyFormatter.format(rawTotal)}</span>
                  </div>

                  {discountApplied && (
                    <div className="d-flex justify-content-between align-items-center mb-2 small text-success">
                      <span>Descuento (10%)</span>
                      <span>-{currencyFormatter.format(discountAmount)}</span>
                    </div>
                  )}

                  <div className="d-flex justify-content-between align-items-center mb-3 fw-bold border-top pt-2">
                    <span>Total</span>
                    <span>{currencyFormatter.format(finalTotal)}</span>
                  </div>

                  {/* Opción Ticket Regalo */}
                  <div className="ft-cart__row">
                    <label htmlFor="gift-ticket-check" className="mb-0 cursor-pointer">
                      Ticket Regalo
                    </label>
                    <input
                      id="gift-ticket-check"
                      type="checkbox"
                      checked={giftTicket}
                      onChange={(e) => setGiftTicket(e.target.checked)}
                      className="form-check-input mt-0"
                    />
                  </div>

                  {/* Formulario autónomo de Código Promocional */}
                  <form onSubmit={handlePromoSubmit} className="mt-3">
                    <div className="ft-cart__row mb-2">
                      <label htmlFor="promo-code-input" className="mb-0">
                        Código promocional
                      </label>
                      <input
                        id="promo-code-input"
                        type="text"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        placeholder="FLORES10"
                        className="ft-cart__input"
                      />
                    </div>

                    <button type="submit" className="ft-btn-cta ft-btn-cta--full mt-2">
                      Aplicar cupón
                    </button>

                    <p
                      className={`ft-cart__promo-feedback ${
                        promoFeedback.type === 'success'
                          ? 'ft-cart__promo-feedback--success'
                          : 'ft-cart__promo-feedback--error'
                      }`}
                      aria-live="polite"
                      role="status"
                    >
                      {promoFeedback.text}
                    </p>
                  </form>
                </div>
              </aside>
            )}
          </div>
        )}

        {/* Contenido Condicional: Pestaña Wishlist */}
        {activeTab === 'wishlist' && (
          <div className="row g-4">
            {wishlistProducts.length === 0 ? (
              <div className="col-12 py-5 text-center">
                <p className="lead text-muted mb-4">
                  No tienes flores marcadas en tu lista de deseos.
                </p>
                <button type="button" className="ft-btn-cta" onClick={onNavigateHome}>
                  Ver novedades
                </button>
              </div>
            ) : (
              wishlistProducts.map((product) => (
                <div key={product.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
                  <article className="ft-card">
                    <img
                      src={product.image}
                      alt={product.alt || product.name}
                      className="ft-cart__item-img"
                      loading="lazy"
                    />
                    <div className="d-flex justify-content-between align-items-start mt-2">
                      <div>
                        <h2 className="ft-card__title">{product.name}</h2>
                        <span className="ft-card__price">
                          {currencyFormatter.format(product.price)}
                        </span>
                      </div>
                      <div className="d-flex gap-1">
                        <button
                          type="button"
                          className="ft-btn-cta py-1 px-2"
                          style={{ fontSize: '0.75rem' }}
                          onClick={() => onAddToCart(product.id)}
                          aria-label={`Pasar ${product.name} a la cesta`}
                        >
                          Añadir
                        </button>
                        <button
                          type="button"
                          className="ft-btn-icon ft-btn-icon--sm ft-btn-icon--active"
                          onClick={() => onToggleWishlist(product.id)}
                          aria-pressed="true"
                          aria-label={`Eliminar ${product.name} de la lista de deseos`}
                          title="Eliminar de favoritos"
                        >
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            aria-hidden="true"
                          >
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </article>
                </div>
              ))
            )}
          </div>
        )}

        <p className="small fw-medium mt-2 mb-1 text-muted">¡Puede interesarte!</p>
      </div>

      {/* Banner inferior de Rebajas */}
      <section
        className="ft-cart__banner w-100"
        aria-label="Promoción especial de temporada"
      >
        <img
          src="/media/img/rosas-carmesi-lluvia.jpg"
          alt="Fondo de rosas carmesí y rosadas con gotas de rocío para promoción de rebajas"
          className="ft-cart__banner-img"
          loading="lazy"
        />
        <div className="ft-cart__banner-overlay">
          <p className="ft-cart__banner-overlay__top">REBAJAS</p>
          <p className="ft-cart__banner-overlay__main">
            HASTA <strong>-50%</strong> DTO.
          </p>
          <span className="ft-cart__banner-overlay__sub">SOLO POR TIEMPO LIMITADO</span>
        </div>
      </section>
    </main>
  );
}

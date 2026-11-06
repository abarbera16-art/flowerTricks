import { useState } from 'react';

export default function ProductDetailView({
  product,
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
  onBack,
}) {
  const [addedMessage, setAddedMessage] = useState('');

  if (!product) {
    return (
      <main className="ft-main ft-product-detail flex-grow-1 container py-5 text-center">
        <h1 className="h3 mb-3">Producto no encontrado</h1>
        <p className="text-muted mb-4">
          El artículo seleccionado no está disponible en este momento.
        </p>
        <button type="button" className="ft-btn-cta" onClick={onBack}>
          ← Volver a la tienda
        </button>
      </main>
    );
  }

  const handleAdd = () => {
    onAddToCart(product.id);
    setAddedMessage(`¡${product.name} se ha añadido a la cesta!`);
    setTimeout(() => setAddedMessage(''), 3000);
  };

  const formattedPrice = new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
  }).format(product.price);

  return (
    <main className="ft-main ft-product-detail flex-grow-1 container py-4 px-3 px-md-5">
      <button
        type="button"
        className="ft-product-detail__back-btn"
        onClick={onBack}
        aria-label="Volver a la vista anterior"
      >
        <span aria-hidden="true">←</span> Volver al catálogo
      </button>

      <div className="row g-4 align-items-center">
        {/* Columna Izquierda: Fotografía Grande en proporción */}
        <div className="col-12 col-md-6">
          <div className="ft-product-detail__image-container">
            <img
              src={product.image}
              alt={product.alt || product.name}
              className="ft-product-detail__image"
            />
          </div>
        </div>

        {/* Columna Derecha: Información y Acciones */}
        <div className="col-12 col-md-6 ft-product-detail__info">
          <span className="ft-product-detail__category">
            Categoría: {product.category}
          </span>
          <h1 className="ft-product-detail__title">{product.name}</h1>
          <p className="ft-product-detail__price">{formattedPrice}</p>

          <p className="ft-product-detail__description">{product.description}</p>

          <div className="ft-product-detail__actions">
            <button
              type="button"
              className="ft-btn-cta px-4 py-2"
              onClick={handleAdd}
              aria-label={`Añadir ${product.name} a la cesta`}
            >
              Añadir a la cesta
            </button>

            <button
              type="button"
              className={`ft-btn-icon ${isWishlisted ? 'ft-btn-icon--active' : ''}`}
              onClick={() => onToggleWishlist(product.id)}
              aria-pressed={isWishlisted}
              aria-label={`Añadir a favoritos: ${product.name}`}
              title="Añadir a favoritos"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill={isWishlisted ? 'currentColor' : 'none'}
                stroke="currentColor"
                strokeWidth="1.8"
                aria-hidden="true"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </button>
          </div>

          {/* Notificación en vivo accesible */}
          <p className="ft-product-detail__feedback" aria-live="polite" role="status">
            {addedMessage}
          </p>
        </div>
      </div>
    </main>
  );
}

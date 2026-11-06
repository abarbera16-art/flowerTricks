export default function ProductCard({
  product,
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
  onSelectProduct,
}) {
  return (
    <article className="ft-card card border-0 bg-transparent w-100">
      {/* Cabecera situada arriba de la imagen según diseño */}
      <div className="ft-card__header">
        <h3 className="ft-card__title">{product.name}</h3>

        <div className="ft-card__meta">
          {/* Fila superior: Iconos de corazón y bolsa aumentados a 19px x 19px */}
          <div className="d-flex gap-2 mb-1 align-items-center">
            <button
              type="button"
              className={`ft-btn-icon ft-btn-icon--sm ${
                isWishlisted ? 'ft-btn-icon--active' : ''
              }`}
              onClick={() => onToggleWishlist(product.id)}
              aria-pressed={isWishlisted}
              aria-label={`Añadir a favoritos: ${product.name}`}
              title="Añadir a favoritos"
            >
              <svg
                width="19"
                height="19"
                viewBox="0 0 24 24"
                fill={isWishlisted ? 'currentColor' : 'none'}
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
              onClick={() => onAddToCart(product.id)}
              aria-label={`Añadir a la bolsa de compra: ${product.name}`}
              title="Añadir a la bolsa de compra"
            >
              <svg
                width="19"
                height="19"
                viewBox="0 0 26 26"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                aria-hidden="true"
              >
                <rect x="3.5" y="5.5" width="19" height="16.5" rx="2.5" />
                <path d="M8.5 9.5c0 2.5 2 4.2 4.5 4.2s4.5-1.7 4.5-4.2" />
              </svg>
            </button>
          </div>

          {/* Fila inferior: Precio */}
          <span className="ft-card__price">
            {product.price.toFixed(2).replace('.', ',')}€
          </span>
        </div>
      </div>

      {/* Imagen rectangular interactiva que conduce al detalle */}
      <button
        type="button"
        className="ft-card__image-wrapper"
        onClick={() => onSelectProduct && onSelectProduct(product.id)}
        aria-label={`Ver detalle y ficha completa de ${product.name}`}
      >
        <img
          src={product.image}
          alt={product.alt || product.name}
          className="ft-card__image rounded-0"
          loading="lazy"
        />
      </button>
    </article>
  );
}

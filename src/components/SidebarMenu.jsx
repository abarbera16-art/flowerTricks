import { useState, useEffect } from 'react';
import { TOP_SALES_PREVIEW, SIDEBAR_CATEGORIES } from '../data/mockData';

export default function SidebarMenu({
  searchQuery = '',
  onSearch,
  onSelectCategory,
  onSelectProduct,
  isClosing = false,
}) {
  const [queryDraft, setQueryDraft] = useState(searchQuery);
  const [expandedCategory, setExpandedCategory] = useState('top-ventas'); // Abierto por defecto

  useEffect(() => {
    setQueryDraft(searchQuery);
  }, [searchQuery]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(queryDraft);
  };

  const handleToggleAccordion = (categoryId) => {
    setExpandedCategory((prev) => (prev === categoryId ? null : categoryId));
  };

  const allItems = [TOP_SALES_PREVIEW, ...SIDEBAR_CATEGORIES];

  return (
    <aside
      id="sidebar-navigation"
      className={`ft-sidebar ${isClosing ? 'ft-sidebar--closing' : 'ft-sidebar--open'}`}
      aria-label="Menú lateral de búsqueda y categorías"
    >
      {/* Bloque 1: Búsqueda de productos */}
      <div className="ft-sidebar__section">
        <form onSubmit={handleSearchSubmit} role="search">
          <label htmlFor="sidebar-search-input" className="ft-sidebar__label">
            Búsqueda de productos
          </label>
          <div className="ft-sidebar__search-box">
            <button
              type="submit"
              className="ft-btn-icon ft-btn-icon--sm"
              aria-label="Ejecutar búsqueda de productos"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="7" />
                <line x1="20" y1="20" x2="16.2" y2="16.2" />
              </svg>
            </button>
            <input
              id="sidebar-search-input"
              type="search"
              className="ft-sidebar__search-input"
              value={queryDraft}
              onChange={(e) => setQueryDraft(e.target.value)}
              placeholder="Buscar por nombre o variedad..."
            />
          </div>
        </form>
      </div>

      {/* Bloque 2: Acordeón exclusivo de Categorías con Previsualización */}
      <nav
        className="ft-sidebar__section border-bottom-0"
        aria-label="Categorías florales"
      >
        <ul className="list-unstyled mb-0 d-flex flex-column gap-2">
          {allItems.map((item) => {
            const isExpanded = expandedCategory === item.id;
            const isFeaturedTop = item.id === 'top-ventas';
            const panelId = `sidebar-panel-${item.id}`;

            return (
              <li key={item.id} className="ft-sidebar__item pb-2">
                {/* Cabecera del Acordeón */}
                <button
                  type="button"
                  className={`ft-sidebar__category-btn ${
                    isFeaturedTop ? 'ft-sidebar__category-btn--featured' : ''
                  } ${isExpanded ? 'ft-sidebar__category-btn--active' : ''}`}
                  onClick={() => handleToggleAccordion(item.id)}
                  aria-expanded={isExpanded}
                  aria-controls={panelId}
                >
                  <span>
                    {isFeaturedTop ? '★ ' : '• '}
                    {item.name}
                  </span>
                  <span
                    className="ft-sidebar__category-indicator"
                    aria-hidden="true"
                    style={{ transform: isExpanded ? 'rotate(90deg)' : 'none' }}
                  >
                    ›
                  </span>
                </button>

                {/* Panel desplegado con vista previa */}
                <div id={panelId} className="ft-sidebar__preview" hidden={!isExpanded}>
                  <p className="ft-sidebar__featured-subtitle">{item.subtitle}</p>

                  {item.featuredProduct && (
                    <button
                      type="button"
                      className="ft-sidebar__preview-btn"
                      onClick={() => onSelectProduct(item.featuredProduct.id)}
                      aria-label={`Ver detalle de ${item.featuredProduct.name}, precio ${item.featuredProduct.price
                        .toFixed(2)
                        .replace('.', ',')} euros`}
                    >
                      <img
                        src={item.featuredProduct.image}
                        alt="" // Vacío porque el texto visible accesible ya identifica el botón
                        className="ft-sidebar__featured-img"
                        loading="lazy"
                      />
                      <p className="ft-sidebar__preview-name">
                        {item.featuredProduct.name}
                      </p>
                      <p className="ft-sidebar__preview-price">
                        {item.featuredProduct.price.toFixed(2).replace('.', ',')}€
                      </p>
                    </button>
                  )}

                  {!isFeaturedTop && (
                    <button
                      type="button"
                      className="ft-sidebar__filter-all-btn"
                      onClick={() => onSelectCategory(item.id)}
                    >
                      Ver todos los productos de {item.name} →
                    </button>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}

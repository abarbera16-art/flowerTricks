export default function MobileBottomNav({
  onNavigateHome,
  onToggleTheme,
  onNavigateCart,
  onNavigateAuth,
  theme,
  cartCount = 0,
  user = null,
}) {
  return (
    <nav
      className="ft-mobile-nav d-flex d-md-none justify-content-around align-items-center w-100 px-3"
      aria-label="Navegación móvil inferior"
    >
      {/* Icono 1: Casa / Home */}
      <button
        type="button"
        className="ft-btn-icon"
        onClick={onNavigateHome}
        aria-label="Ir a la página principal"
        title="Inicio"
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      </button>

      {/* Icono 2: Modo Oscuro / Claro */}
      <button
        type="button"
        className="ft-btn-icon"
        onClick={onToggleTheme}
        aria-pressed={theme === 'dark'}
        aria-label="Conmutar modo oscuro"
        title={theme === 'light' ? 'Activar modo oscuro' : 'Activar modo claro'}
      >
        {theme === 'light' ? (
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        ) : (
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
          </svg>
        )}
      </button>

      {/* Icono 3: Carrito / Bolsa de compra con Badge */}
      <button
        type="button"
        className="ft-btn-icon position-relative"
        onClick={onNavigateCart}
        aria-label={`Ver bolsa de compra (${cartCount} artículos)`}
        title={`Bolsa de compra (${cartCount})`}
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 26 26"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect x="3.5" y="5.5" width="19" height="16.5" rx="2.5" />
          <path d="M8.5 9.5c0 2.5 2 4.2 4.5 4.2s4.5-1.7 4.5-4.2" />
        </svg>
        {cartCount > 0 && (
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill ft-header__badge">
            {cartCount}
          </span>
        )}
      </button>

      {/* Icono 4: Cuenta / Usuario */}
      <button
        type="button"
        className="ft-btn-icon"
        onClick={onNavigateAuth}
        aria-label={user ? `Cuenta de ${user.name}` : 'Iniciar sesión o registrarse'}
        title="Cuenta de usuario"
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 26 26"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <circle cx="13" cy="8.5" r="4.2" />
          <path d="M4.5 22c0-4.2 3.8-7.2 8.5-7.2s8.5 3 8.5 7.2" />
        </svg>
      </button>
    </nav>
  );
}

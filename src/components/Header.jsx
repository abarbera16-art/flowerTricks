export default function Header({
  sidebarOpen,
  onToggleSidebar,
  onNavigateHome,
  onNavigateCart,
  onNavigateAuth,
  currentView,
  theme,
  onToggleTheme,
  cartCount,
  user,
}) {
  return (
    <header
      className={`ft-header navbar d-flex justify-content-between align-items-center w-100 px-4 px-md-5 ${
        sidebarOpen || currentView !== 'home' ? 'ft-header--bordered' : ''
      }`}
    >
      {/* 1. Zona Izquierda: Menú Hamburguesa (32px x 32px) */}
      <div className="d-flex align-items-center">
        <button
          type="button"
          className="ft-btn-icon"
          onClick={onToggleSidebar}
          aria-expanded={sidebarOpen}
          aria-controls="sidebar-navigation"
          aria-label="Menú de navegación"
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 28 28"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <line x1="4" y1="8" x2="24" y2="8" />
            <line x1="4" y1="14" x2="24" y2="14" />
            <line x1="4" y1="20" x2="24" y2="20" />
          </svg>
        </button>
      </div>

      {/* 2. Zona Central: Branding / Logo con Tipografía Lostar */}
      <div className="mx-auto">
        <button
          type="button"
          className="ft-header__logo"
          onClick={onNavigateHome}
          aria-label="Ir a la página principal de FLOWER TRICKS"
        >
          FLOWER &nbsp; TRICKS
        </button>
      </div>

      {/* 3. Zona Derecha: Oculto en móvil (d-none d-md-flex) con iconos aumentados a 30-32px */}
      <div className="d-none d-md-flex align-items-center gap-3 gap-lg-4">
        {/* Icono Modo Noche / Día */}
        <button
          type="button"
          className="ft-btn-icon"
          onClick={onToggleTheme}
          aria-pressed={theme === 'dark'}
          aria-label="Modo oscuro"
          title={theme === 'light' ? 'Activar modo oscuro' : 'Activar modo claro'}
        >
          {theme === 'light' ? (
            <svg
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              aria-hidden="true"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          ) : (
            <svg
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
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

        {/* Icono de Perfil / Usuario */}
        <button
          type="button"
          className="ft-btn-icon"
          onClick={onNavigateAuth}
          aria-label={user ? `Cuenta de ${user.name}` : 'Iniciar sesión o registrarse'}
          title={user ? `Conectado como ${user.name}` : 'Iniciar sesión o registrarse'}
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 26 26"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <circle cx="13" cy="8.5" r="4.2" />
            <path d="M4.5 22c0-4.2 3.8-7.2 8.5-7.2s8.5 3 8.5 7.2" />
          </svg>
        </button>

        {/* Icono de Carrito / Bolsa de compra */}
        <button
          type="button"
          className="ft-btn-icon position-relative"
          onClick={onNavigateCart}
          aria-label={`Ver bolsa de compra (${cartCount} artículos)`}
          title={`Ver bolsa de compra (${cartCount} artículos)`}
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 26 26"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
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
      </div>
    </header>
  );
}

import { useState, useEffect } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState({ text: '', type: '' });
  const [isDesktop, setIsDesktop] = useState(true);
  const [openCol, setOpenCol] = useState(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mediaQuery = window.matchMedia('(min-width: 768px)');
    setIsDesktop(mediaQuery.matches);

    const handleResize = (e) => setIsDesktop(e.matches);
    mediaQuery.addEventListener('change', handleResize);
    return () => mediaQuery.removeEventListener('change', handleResize);
  }, []);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    const cleanEmail = email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!cleanEmail || !emailRegex.test(cleanEmail)) {
      setFeedback({
        text: 'Por favor, introduce un correo electrónico válido.',
        type: 'error',
      });
      return;
    }

    setFeedback({
      text: '¡Gracias por suscribirte a nuestro boletín de novedades!',
      type: 'success',
    });
    setEmail('');
    setTimeout(() => setFeedback({ text: '', type: '' }), 4000);
  };

  const toggleColumn = (colName) => {
    if (isDesktop) return;
    setOpenCol((prev) => (prev === colName ? null : colName));
  };

  return (
    <footer className="ft-footer" aria-label="Pie de página global">
      {/* 1. Bloque Newsletter Superior */}
      <div className="ft-footer__newsletter">
        <p className="ft-footer__brand">FLOWER TRICKS</p>
        <h2 className="ft-footer__newsletter-title">Suscríbete a nuestra newsletter</h2>
        <p className="ft-footer__newsletter-text">
          Recibe consejos botánicos, inspiración para eventos y descuentos exclusivos.
        </p>

        <form onSubmit={handleNewsletterSubmit} className="ft-footer__newsletter-form">
          <label htmlFor="footer-newsletter-email" className="visually-hidden">
            Correo electrónico para suscripción a la newsletter
          </label>
          <input
            id="footer-newsletter-email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Introduce tu correo electrónico..."
            className="ft-footer__newsletter-input"
          />
          <button type="submit" className="ft-btn-cta">
            Suscribirme
          </button>
        </form>

        <p
          className={`ft-footer__newsletter-feedback ${
            feedback.type === 'success'
              ? 'ft-footer__newsletter-feedback--success'
              : 'ft-footer__newsletter-feedback--error'
          }`}
          aria-live="polite"
          role="status"
        >
          {feedback.text}
        </p>
      </div>

      {/* 2. Grid Central (4 Columnas inspiradas en Pull&Bear con Acordeón Móvil) */}
      <div className="row ft-footer__nav-grid">
        {/* Columna 1: Ayuda */}
        <div className="col-12 col-md-6 col-lg-3 ft-footer__col">
          {isDesktop ? (
            <h2 className="ft-footer__col-title">Ayuda</h2>
          ) : (
            <h2 className="mb-0">
              <button
                type="button"
                className="ft-footer__accordion-btn"
                onClick={() => toggleColumn('ayuda')}
                aria-expanded={openCol === 'ayuda'}
                aria-controls="footer-col-ayuda"
              >
                <span>Ayuda</span>
                <span
                  className="ft-footer__accordion-icon"
                  style={{ transform: openCol === 'ayuda' ? 'rotate(90deg)' : 'none' }}
                  aria-hidden="true"
                >
                  ›
                </span>
              </button>
            </h2>
          )}
          <nav aria-label="Menú de ayuda">
            <ul
              id="footer-col-ayuda"
              className="ft-footer__list"
              hidden={!isDesktop && openCol !== 'ayuda'}
            >
              <li>
                <a
                  href="#faq"
                  className="ft-footer__link"
                  onClick={(e) => e.preventDefault()}
                >
                  Preguntas frecuentes
                </a>
              </li>
              <li>
                <a
                  href="#estado-pedido"
                  className="ft-footer__link"
                  onClick={(e) => e.preventDefault()}
                >
                  Estado de mi pedido
                </a>
              </li>
              <li>
                <a
                  href="#envios"
                  className="ft-footer__link"
                  onClick={(e) => e.preventDefault()}
                >
                  Envío de flores y entregas
                </a>
              </li>
              <li>
                <a
                  href="#devoluciones"
                  className="ft-footer__link"
                  onClick={(e) => e.preventDefault()}
                >
                  Devoluciones y reembolsos
                </a>
              </li>
            </ul>
          </nav>
        </div>

        {/* Columna 2: Empresa */}
        <div className="col-12 col-md-6 col-lg-3 ft-footer__col">
          {isDesktop ? (
            <h2 className="ft-footer__col-title">Empresa</h2>
          ) : (
            <h2 className="mb-0">
              <button
                type="button"
                className="ft-footer__accordion-btn"
                onClick={() => toggleColumn('empresa')}
                aria-expanded={openCol === 'empresa'}
                aria-controls="footer-col-empresa"
              >
                <span>Empresa</span>
                <span
                  className="ft-footer__accordion-icon"
                  style={{ transform: openCol === 'empresa' ? 'rotate(90deg)' : 'none' }}
                  aria-hidden="true"
                >
                  ›
                </span>
              </button>
            </h2>
          )}
          <nav aria-label="Información corporativa">
            <ul
              id="footer-col-empresa"
              className="ft-footer__list"
              hidden={!isDesktop && openCol !== 'empresa'}
            >
              <li>
                <a
                  href="#quienes-somos"
                  className="ft-footer__link"
                  onClick={(e) => e.preventDefault()}
                >
                  Quiénes somos
                </a>
              </li>
              <li>
                <a
                  href="#tiendas"
                  className="ft-footer__link"
                  onClick={(e) => e.preventDefault()}
                >
                  Nuestras floristerías
                </a>
              </li>
              <li>
                <a
                  href="#sostenibilidad"
                  className="ft-footer__link"
                  onClick={(e) => e.preventDefault()}
                >
                  Sostenibilidad
                </a>
              </li>
              <li>
                <a
                  href="#empleo"
                  className="ft-footer__link"
                  onClick={(e) => e.preventDefault()}
                >
                  Trabaja con nosotros
                </a>
              </li>
            </ul>
          </nav>
        </div>

        {/* Columna 3: Métodos de Pago */}
        <div className="col-12 col-md-6 col-lg-3 ft-footer__col">
          {isDesktop ? (
            <h2 className="ft-footer__col-title">Métodos de pago</h2>
          ) : (
            <h2 className="mb-0">
              <button
                type="button"
                className="ft-footer__accordion-btn"
                onClick={() => toggleColumn('pagos')}
                aria-expanded={openCol === 'pagos'}
                aria-controls="footer-col-pagos"
              >
                <span>Métodos de pago</span>
                <span
                  className="ft-footer__accordion-icon"
                  style={{ transform: openCol === 'pagos' ? 'rotate(90deg)' : 'none' }}
                  aria-hidden="true"
                >
                  ›
                </span>
              </button>
            </h2>
          )}
          <ul
            id="footer-col-pagos"
            className="ft-footer__list"
            hidden={!isDesktop && openCol !== 'pagos'}
            aria-label="Métodos de pago aceptados"
          >
            <li>
              <span className="ft-footer__payment-badge">Visa</span>
            </li>
            <li>
              <span className="ft-footer__payment-badge">Mastercard</span>
            </li>
            <li>
              <span className="ft-footer__payment-badge">PayPal</span>
            </li>
            <li>
              <span className="ft-footer__payment-badge">Bizum</span>
            </li>
            <li>
              <span className="ft-footer__payment-badge">Apple Pay</span>
            </li>
          </ul>
        </div>

        {/* Columna 4: Síguenos (Redes Sociales) */}
        <div className="col-12 col-md-6 col-lg-3 ft-footer__col">
          {isDesktop ? (
            <h2 className="ft-footer__col-title">Síguenos</h2>
          ) : (
            <h2 className="mb-0">
              <button
                type="button"
                className="ft-footer__accordion-btn"
                onClick={() => toggleColumn('social')}
                aria-expanded={openCol === 'social'}
                aria-controls="footer-col-social"
              >
                <span>Síguenos</span>
                <span
                  className="ft-footer__accordion-icon"
                  style={{ transform: openCol === 'social' ? 'rotate(90deg)' : 'none' }}
                  aria-hidden="true"
                >
                  ›
                </span>
              </button>
            </h2>
          )}
          <nav aria-label="Redes sociales">
            <div
              id="footer-col-social"
              className="ft-footer__social-links"
              hidden={!isDesktop && openCol !== 'social'}
            >
              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="ft-footer__social-btn"
                aria-label="Instagram (se abre en una pestaña nueva)"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>

              {/* TikTok */}
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="ft-footer__social-btn"
                aria-label="TikTok (se abre en una pestaña nueva)"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                </svg>
              </a>

              {/* Pinterest */}
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noopener noreferrer"
                className="ft-footer__social-btn"
                aria-label="Pinterest (se abre en una pestaña nueva)"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <line x1="12" y1="8" x2="12" y2="16" />
                  <circle cx="12" cy="12" r="10" />
                </svg>
              </a>

              {/* YouTube */}
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="ft-footer__social-btn"
                aria-label="YouTube (se abre en una pestaña nueva)"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
                  <polygon
                    points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"
                    fill="currentColor"
                  />
                </svg>
              </a>
            </div>
          </nav>
        </div>
      </div>

      {/* 3. Bloque Legal Inferior */}
      <div className="ft-footer__bottom">
        <nav aria-label="Información legal" className="ft-footer__legal-nav">
          <a
            href="#privacidad"
            className="ft-footer__link"
            onClick={(e) => e.preventDefault()}
          >
            Política de privacidad
          </a>
          <a
            href="#condiciones"
            className="ft-footer__link"
            onClick={(e) => e.preventDefault()}
          >
            Condiciones de compra
          </a>
          <a
            href="#cookies"
            className="ft-footer__link"
            onClick={(e) => e.preventDefault()}
          >
            Política de cookies
          </a>
        </nav>

        <p className="ft-footer__copyright">
          © 2026 FLOWER TRICKS. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}

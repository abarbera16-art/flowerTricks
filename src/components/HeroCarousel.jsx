import { useState, useEffect, useRef } from 'react';
import { HERO_SLIDES } from '../data/mockData';

export default function HeroCarousel({ wishlistIds = [], onAddWishlist, onBuyNow }) {
  // Inicia en índice 1 ("Rosa centifolia") tal como estipula el diseño original
  const [activeIndex, setActiveIndex] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const isHoveredRef = useRef(false);
  const heroVideoRef = useRef(null);

  // Detección de preferencia de movimiento reducido (WCAG 2.2.2)
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Sincronización del vídeo del banner central con pausa o movimiento reducido
  useEffect(() => {
    const videoEl = heroVideoRef.current;
    if (!videoEl) return;

    if (prefersReducedMotion || isPaused || activeIndex !== 1) {
      videoEl.pause();
    } else {
      const playPromise = videoEl.play();
      if (playPromise && typeof playPromise.catch === 'function') {
        playPromise.catch(() => {});
      }
    }
  }, [activeIndex, isPaused, prefersReducedMotion]);

  // Autoavance cada 4500 ms con pausa en interacción o movimiento reducido
  useEffect(() => {
    if (prefersReducedMotion || isPaused) return undefined;

    const intervalId = setInterval(() => {
      if (!isHoveredRef.current) {
        setActiveIndex((prev) => (prev === HERO_SLIDES.length - 1 ? 0 : prev + 1));
      }
    }, 4500);

    return () => clearInterval(intervalId);
  }, [activeIndex, isPaused, prefersReducedMotion]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === HERO_SLIDES.length - 1 ? 0 : prev + 1));
  };

  const handleMouseEnter = () => {
    isHoveredRef.current = true;
  };

  const handleMouseLeave = () => {
    isHoveredRef.current = false;
  };

  const togglePause = () => {
    setIsPaused((prev) => !prev);
  };

  return (
    <section
      className="ft-hero w-100"
      aria-label="Carrusel de flores destacadas"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleMouseEnter}
      onBlur={handleMouseLeave}
    >
      {/* Pista deslizante horizontal */}
      <div
        className="ft-hero__track"
        style={{
          transform: `translateX(-${activeIndex * 100}%)`,
          transition: prefersReducedMotion ? 'none' : undefined,
        }}
        aria-live={isPaused ? 'polite' : 'off'}
      >
        {HERO_SLIDES.map((slide, index) => {
          const isActive = index === activeIndex;
          const isFav = wishlistIds.includes(slide.productId);

          return (
            <div
              key={slide.id}
              className="ft-hero__slide"
              aria-hidden={!isActive}
              aria-label={`Diapositiva ${index + 1} de ${HERO_SLIDES.length}`}
            >
              {slide.video ? (
                <video
                  ref={heroVideoRef}
                  src={slide.video}
                  poster={slide.image}
                  className="ft-hero__image ft-hero__video"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-label={slide.alt || slide.title}
                />
              ) : (
                <img
                  src={slide.image}
                  alt={slide.alt || slide.title}
                  className="ft-hero__image"
                  loading={index === 1 ? 'eager' : 'lazy'}
                />
              )}

              <div className="ft-hero__caption">
                <h2 className="ft-hero__title">{slide.title}</h2>
                <p className="ft-hero__subtitle">{slide.subtitle}</p>
                <div className="ft-hero__actions">
                  <button
                    type="button"
                    className="ft-btn-cta"
                    tabIndex={isActive ? 0 : -1}
                    aria-pressed={isFav}
                    aria-label={`Añadir a favoritos: ${slide.title}`}
                    onClick={() => onAddWishlist(slide.productId)}
                  >
                    Wishlist {isFav ? '✓' : ''}
                  </button>
                  <button
                    type="button"
                    className="ft-btn-cta"
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => onBuyNow(slide.productId)}
                  >
                    Comprar
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Flecha Lateral Izquierda */}
      <button
        type="button"
        className="ft-btn-arrow ft-btn-arrow--prev"
        onClick={handlePrev}
        aria-label="Ver fotografía anterior del carrusel"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <line x1="19" y1="12" x2="5" y2="12" />
          <polyline points="12 19 5 12 12 5" />
        </svg>
      </button>

      {/* Flecha Lateral Derecha */}
      <button
        type="button"
        className="ft-btn-arrow ft-btn-arrow--next"
        onClick={handleNext}
        aria-label="Ver fotografía siguiente del carrusel"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      </button>

      {/* 3 Círculos Indicadores Inferiores */}
      <div className="ft-hero__dots" role="group" aria-label="Indicadores de diapositiva">
        {HERO_SLIDES.map((slide, index) => {
          const isActive = index === activeIndex;
          return (
            <button
              key={slide.id}
              type="button"
              aria-pressed={isActive}
              aria-label={`Ir a la imagen ${index + 1}: ${slide.title}`}
              className={`ft-btn-dot ${isActive ? 'ft-btn-dot--active' : ''}`}
              onClick={() => setActiveIndex(index)}
            />
          );
        })}
      </div>

      {/* Botón Accesible Pausar/Reanudar rotación automática (WCAG 2.2.2) */}
      <button
        type="button"
        className="ft-hero__control-btn"
        onClick={togglePause}
        aria-pressed={isPaused}
        aria-label={
          isPaused ? 'Reanudar rotación automática' : 'Pausar rotación automática'
        }
        title={isPaused ? 'Reanudar rotación automática' : 'Pausar rotación automática'}
      >
        {isPaused ? (
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
        ) : (
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <rect x="6" y="4" width="4" height="16" />
            <rect x="14" y="4" width="4" height="16" />
          </svg>
        )}
      </button>
    </section>
  );
}

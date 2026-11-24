/**
 * FLOWER TRICKS — Gestor de efectos de sonido de interfaz
 * Precarga los audios estáticos locales y reproduce instancias clonadas para evitar cortes.
 */

const SOUND_PATHS = {
  addCart: '/media/audio/add-cart.mp3',
  favorite: '/media/audio/favorite.mp3',
  darkMode: '/media/audio/dark-mode.mp3',
  removeCart: '/media/audio/remove-cart.mp3',
};

const preloadedAudioMap = new Map();

function getOrCreateAudio(soundKey) {
  if (typeof window === 'undefined' || typeof Audio === 'undefined') {
    return null;
  }

  const src = SOUND_PATHS[soundKey];
  if (!src) return null;

  if (!preloadedAudioMap.has(soundKey)) {
    const audio = new Audio(src);
    audio.preload = 'auto';
    audio.volume = 1.0;
    preloadedAudioMap.set(soundKey, audio);
  }

  return preloadedAudioMap.get(soundKey);
}

/**
 * Precarga todos los efectos de sonido en memoria del navegador.
 */
export function preloadSounds() {
  Object.keys(SOUND_PATHS).forEach((soundKey) => {
    const audio = getOrCreateAudio(soundKey);
    if (audio) {
      audio.load();
    }
  });
}

/**
 * Reproduce un efecto de sonido con volumen 1.0 sin cortar reproducciones previas.
 * @param {'addCart' | 'favorite' | 'darkMode' | 'removeCart'} soundKey
 */
export function playSound(soundKey) {
  const baseAudio = getOrCreateAudio(soundKey);
  if (!baseAudio) return;

  try {
    // Clonamos la instancia precargada para evitar cortes en clics rápidos (p. ej. favorite.mp3)
    const instance = baseAudio.cloneNode();
    instance.volume = 1.0;
    instance.currentTime = 0;

    const playPromise = instance.play();
    if (playPromise && typeof playPromise.catch === 'function') {
      playPromise.catch(() => {});
    }
  } catch {
    // Ignorar errores en entornos sin reproducción de audio
  }
}

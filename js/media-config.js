/* HACIENDA MADRE DE DIOS — CONFIGURACIÓN CENTRAL DE MEDIOS
   =========================================================
   Cambia fotografías, videos, música y WhatsApp únicamente desde este archivo.
   Para reemplazar un medio, conserva exactamente su nombre y ubicación.

   GALERÍA ACTUAL:
   - assets/images/galeria/galeria-01.jpg
   - assets/images/galeria/galeria-02.png
   - assets/images/galeria/galeria-03.png
   - assets/images/galeria/galeria-04.png

   El cargador también reconoce JPG, JPEG, PNG, WEBP y AVIF si se mantiene
   la misma base de nombre: galeria-01, galeria-02, etc.
*/
window.HMD_MEDIA = {
  whatsapp: '51906233671',

  // No se modifican los MP4: solo se respetan estas rutas y nombres.
  heroVideo: 'assets/video/hero.mp4',
  heroPoster: 'assets/images/galeria/galeria-01.jpg',
  droneVideo: 'assets/video/vuelo-hacienda.mp4',
  dronePoster: 'assets/images/galeria/galeria-03.png',

  // Reemplaza este archivo manteniendo exactamente el mismo nombre.
  backgroundAudio: 'assets/audio/musica-ambiente.mp3',
  backgroundAudioVolume: 0.24,
  autoplayAudio: true,

  youtubeId: '',

  // Imágenes del bloque “Una hacienda completa en la Amazonia peruana”.
  propertyImages: {
    main: {
      src: 'assets/images/galeria/galeria-01.jpg',
      alt: 'Área de pasturas — 300 hectáreas',
      caption: 'Área de pasturas · 300 hectáreas'
    },
    card: {
      src: 'assets/images/galeria/galeria-02.png',
      alt: 'Ganado Brahman incluido',
      caption: '319 cabezas Brahman · Incluidas en el precio'
    }
  },

  // La galería usa únicamente archivos locales.
  gallery: [
    {
      src: 'assets/images/galeria/galeria-01.jpg',
      alt: 'Área de pasturas',
      title: 'Área de Pasturas — 300 Hectáreas'
    },
    {
      src: 'assets/images/galeria/galeria-02.png',
      alt: 'Ganado Brahman',
      title: 'Ganado Brahman — 319 Cabezas Incluidas'
    },
    {
      src: 'assets/images/galeria/galeria-03.png',
      alt: 'Vista aérea',
      title: 'Vista Aérea — 526 Hectáreas Totales'
    },
    {
      src: 'assets/images/galeria/galeria-04.png',
      alt: 'Reserva natural',
      title: 'Reserva Natural — Amazonia Peruana'
    }
  ],

  // El visor 360 utiliza una sola panorámica local.
  tourScenes: {
    'vista-general': 'assets/images/360/vista-general.jpg'
  }
};

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
  heroVideo: 'https://res.cloudinary.com/dvq6nci9k/video/upload/q_auto:good/hero_1080_eiud6c.mp4',
  heroPoster: 'assets/images/galeria/galeria-01.jpg',
  droneVideo: 'https://res.cloudinary.com/dvq6nci9k/video/upload/q_auto:good/demo_1080_r3qs7p.mp4',
  dronePoster: 'assets/images/galeria/galeria-03.jpg',

  // Reemplaza este archivo manteniendo exactamente el mismo nombre.
  backgroundAudio: '',
  backgroundAudioVolume: 0.24,
  autoplayAudio: false,

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
      alt: 'Ganado Nelore incluido',
      caption: 'Más de 300 cabezas Nelore · Incluidas'
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
      alt: 'Ganado Nelore',
      title: 'Ganado Nelore — Más de 300 Cabezas'
    },
    {
      src: 'assets/images/galeria/galeria-03.png',
      alt: 'Vista aérea',
      title: 'Vista Aérea — Más de 500 Hectáreas'
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

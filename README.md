# Hacienda Madre de Dios — versión final

Proyecto web listo para publicación, con medios locales y estructura de reemplazo por nombre.

## Ejecución
Abra la carpeta en Visual Studio Code y use **Open with Live Server**. No se recomienda abrir `index.html` directamente con doble clic porque varios navegadores restringen recursos multimedia y WebGL bajo `file://`.

## Medios
La configuración central está en `js/media-config.js`.

### Galería
- `assets/images/galeria/galeria-01.jpg`
- `assets/images/galeria/galeria-02.png`
- `assets/images/galeria/galeria-03.png`
- `assets/images/galeria/galeria-04.png`

La imagen grande del bloque de propiedad usa `galeria-01.jpg` y la tarjeta superpuesta usa `galeria-02.png`.

### Vista 360°
El visor tiene una sola escena llamada **Vista General** y utiliza:
- `assets/images/360/vista-general.jpg`

Formato recomendado: equirectangular 2:1, máximo 8192 × 4096 px para una mejor compatibilidad móvil.

### Videos
Los MP4 conservan su nomenclatura y no fueron modificados:
- `assets/video/hero.mp4`
- `assets/video/vuelo-hacienda.mp4`

### Música
- `assets/audio/musica-ambiente.mp3`

## Estabilidad
- Animaciones de entrada unificadas con `IntersectionObserver`.
- Sin motores de scroll duplicados.
- Respeta `prefers-reduced-motion`.
- El contenido permanece visible aunque JavaScript falle.
- El visor 360 muestra un aviso local y controlado si falta la panorámica.

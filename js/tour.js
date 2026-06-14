/* HACIENDA MADRE DE DIOS — VISOR 360° FINAL
   Una sola escena local: Vista General.
   No utiliza panorámicas externas ni cambia la nomenclatura del archivo.
*/

const TOUR_MEDIA = window.HMD_MEDIA || {};
const TOUR_PATHS = TOUR_MEDIA.tourScenes || {};
const TOUR_SCENE = {
  id: 'vista-general',
  area: 'Vista General',
  desc: 'Panorámica de las 526 hectáreas sobre la Carretera Interoceánica',
  file: TOUR_PATHS['vista-general'] || 'assets/images/360/vista-general.jpg',
  pitch: -5,
  yaw: 0
};

let viewer = null;
let autoRotating = true;
const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches === true;

function imageExists(src) {
  return new Promise(resolve => {
    if (!src) return resolve(false);
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = src;
  });
}

let loaderGone = false;
function hideLoader() {
  if (loaderGone) return;
  loaderGone = true;
  const el = document.getElementById('pload');
  if (!el) return;
  el.classList.add('out');
  window.setTimeout(() => { el.hidden = true; }, reduceMotion ? 0 : 500);
}

function showTourError() {
  const panorama = document.getElementById('panorama');
  if (panorama) {
    panorama.innerHTML = `
      <div class="tour-local-error" role="status">
        <i class="fas fa-panorama" aria-hidden="true"></i>
        <strong>Vista 360° no disponible</strong>
        <span>Verifique el archivo assets/images/360/vista-general.jpg</span>
      </div>`;
  }
  hideLoader();
}

async function initTour() {
  const el = document.getElementById('panorama');
  if (!el || typeof pannellum === 'undefined') {
    showTourError();
    return;
  }

  const exists = await imageExists(TOUR_SCENE.file);
  if (!exists) {
    console.warn(`Tour 360: no se encontró ${TOUR_SCENE.file}`);
    showTourError();
    return;
  }

  try {
    viewer = pannellum.viewer('panorama', {
      type: 'equirectangular',
      panorama: TOUR_SCENE.file,
      title: TOUR_SCENE.area,
      autoLoad: true,
      showControls: false,
      showFullscreenCtrl: false,
      compass: false,
      hfov: 100,
      pitch: TOUR_SCENE.pitch,
      yaw: TOUR_SCENE.yaw,
      autoRotate: reduceMotion ? false : -1.35,
      autoRotateInactivityDelay: 5000,
      friction: 0.18,
      keyboardZoom: true,
      mouseZoom: true,
      draggable: true,
      disableKeyboardCtrl: false
    });

    viewer.on('load', hideLoader);
    viewer.on('error', showTourError);
    document.getElementById('ttot').textContent = '1';

    window.setTimeout(hideLoader, 12000);
    window.setTimeout(() => {
      const instruction = document.getElementById('pinstr');
      if (!instruction) return;
      instruction.style.opacity = '0';
      window.setTimeout(() => { instruction.hidden = true; }, reduceMotion ? 0 : 400);
    }, reduceMotion ? 500 : 4200);
  } catch (error) {
    console.warn('Pannellum:', error);
    showTourError();
  }
}

function bindControls() {
  document.getElementById('tzin')?.addEventListener('click', () => {
    if (viewer) viewer.setHfov(Math.max(40, viewer.getHfov() - 15), true);
  });
  document.getElementById('tzout')?.addEventListener('click', () => {
    if (viewer) viewer.setHfov(Math.min(120, viewer.getHfov() + 15), true);
  });

  const autoButton = document.getElementById('tauto');
  if (reduceMotion && autoButton) {
    autoRotating = false;
    autoButton.setAttribute('aria-pressed', 'false');
  }
  autoButton?.addEventListener('click', () => {
    if (!viewer) return;
    autoRotating = !autoRotating;
    if (autoRotating) {
      viewer.startAutoRotate(-1.35);
      autoButton.classList.add('spin');
    } else {
      viewer.stopAutoRotate();
      autoButton.classList.remove('spin');
    }
    autoButton.setAttribute('aria-pressed', String(autoRotating));
  });

  const fullscreenButton = document.getElementById('tfs');
  const panorama = document.getElementById('panorama');
  fullscreenButton?.addEventListener('click', async () => {
    if (!panorama) return;
    try {
      if (!document.fullscreenElement && !document.webkitFullscreenElement) {
        const request = panorama.requestFullscreen || panorama.webkitRequestFullscreen;
        if (request) await request.call(panorama);
      } else {
        const exit = document.exitFullscreen || document.webkitExitFullscreen;
        if (exit) await exit.call(document);
      }
    } catch (error) {
      console.warn('Pantalla completa no disponible:', error);
    }
  });

  const syncFullscreenIcon = () => {
    const icon = fullscreenButton?.querySelector('i');
    if (icon) icon.className = (document.fullscreenElement || document.webkitFullscreenElement)
      ? 'fas fa-compress'
      : 'fas fa-expand';
  };
  document.addEventListener('fullscreenchange', syncFullscreenIcon);
  document.addEventListener('webkitfullscreenchange', syncFullscreenIcon);
}

document.addEventListener('DOMContentLoaded', () => {
  initTour();
  bindControls();
});

window.haciendaTour = {
  getViewer: () => viewer,
  scene: TOUR_SCENE
};

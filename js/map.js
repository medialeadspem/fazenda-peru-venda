/* HACIENDA MADRE DE DIOS — map.js (Leaflet — efectos mejorados) */

document.addEventListener('DOMContentLoaded',()=>{
  const reduceMotion=window.matchMedia?.('(prefers-reduced-motion: reduce)').matches===true;
  const el=document.getElementById('map');
  if(!el||typeof L==='undefined')return;

  const PROP   =[-12.42,-69.18];
  const AIRPORT=[-12.60,-69.19];
  const CITY   =[-12.60,-69.19];
  const BRAZIL =[-10.87,-69.85];

  /* Map */
  const map=L.map('map',{center:[-11.85,-69.25],zoom:7,zoomControl:false,scrollWheelZoom:false,attributionControl:false});

  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',{maxZoom:18,subdomains:'abcd'}).addTo(map);
  L.control.attribution({position:'bottomleft',prefix:'<span style="color:rgba(255,255,255,.2);font-size:9px">© CartoDB</span>'}).addTo(map);
  L.control.zoom({position:'bottomright'}).addTo(map);

  /* Icon factory */
  function mkIcon(html,size=50){
    return L.divIcon({html,iconSize:[size,size],iconAnchor:[size/2,size/2],className:''});
  }

  /* PROPIEDAD marker */
  const propIco=mkIcon(`
    <div style="width:54px;height:54px;background:#FFD100;border-radius:50%;border:3px solid #080808;
      box-shadow:0 0 0 3px rgba(255,209,0,.25),0 0 32px rgba(255,209,0,.4),0 8px 24px rgba(0,0,0,.6);
      display:flex;align-items:center;justify-content:center;font-size:22px;
      animation:${reduceMotion?'none':'mapPulse 3s ease-in-out infinite'}">🏡</div>
    <style>@keyframes mapPulse{0%,100%{box-shadow:0 0 0 3px rgba(255,209,0,.25),0 0 32px rgba(255,209,0,.4),0 8px 24px rgba(0,0,0,.6)}50%{box-shadow:0 0 0 8px rgba(255,209,0,.1),0 0 48px rgba(255,209,0,.6),0 8px 24px rgba(0,0,0,.6)}}</style>
  `);

  const propM=L.marker(PROP,{icon:propIco}).addTo(map);
  propM.bindPopup(popup('🏡 Hacienda Madre de Dios','526 ha · 319 cabezas Brahman','#FFD100','rgba(255,209,0,.1)'));

  /* AEROPUERTO */
  const airIco=mkIcon(`
    <div style="width:36px;height:36px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.2);
      border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:16px">✈️</div>`,36);
  L.marker(AIRPORT,{icon:airIco}).addTo(map)
    .bindPopup(popup('✈️ Puerto Maldonado','~42 km de la propiedad','rgba(255,255,255,.8)','rgba(255,255,255,.05)'));

  /* BRASIL */
  const brIco=mkIcon(`
    <div style="width:46px;height:46px;background:rgba(0,156,59,.18);border:1.5px solid rgba(0,156,59,.5);
      border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:20px;
      box-shadow:0 0 20px rgba(0,156,59,.35),0 0 0 6px rgba(0,156,59,.08)">🇧🇷</div>`,46);
  L.marker(BRAZIL,{icon:brIco}).addTo(map)
    .bindPopup(popup('🇧🇷 Frontera con Brasil','Conectado por la Carretera Interoceánica','#5DE896','rgba(0,156,59,.1)'));

  /* Propiedad pulse circle */
  L.circle(PROP,{radius:3200,color:'#FFD100',weight:1.5,opacity:.35,fillColor:'#FFD100',fillOpacity:.06}).addTo(map);

  /* Brasil zone */
  L.circle(BRAZIL,{radius:4000,color:'#1A6B3C',weight:1,opacity:.3,fillColor:'#1A6B3C',fillOpacity:.05}).addTo(map);

  /* Route — animated dashed line */
  const route=L.polyline([PROP,[-11.65,-69.35],[-11.1,-69.6],BRAZIL],{
    color:'#FFD100',weight:2.5,opacity:0,dashArray:'10,8',className:'route-line'
  }).addTo(map);

  /* Animate route opacity in */
  if(reduceMotion){
    route.setStyle({opacity:.5});
  }else setTimeout(()=>{
    let op=0;
    const ti=setInterval(()=>{
      op=Math.min(op+.04,.5);
      route.setStyle({opacity:op});
      if(op>=.5)clearInterval(ti);
    },40);
  },600);

  /* Distance label */
  const midPoint=[-11.4,-69.5];
  L.marker(midPoint,{icon:mkIcon(`
    <div style="background:rgba(8,8,8,.88);border:1px solid rgba(255,255,255,.1);
      border-radius:3px;padding:4px 9px;white-space:nowrap;
      font-family:'Barlow Condensed',sans-serif;font-size:11px;font-weight:700;
      letter-spacing:.1em;color:rgba(237,232,220,.6)">CARRETERA INTEROCEÁNICA</div>`,200),zIndexOffset:-1})
    .addTo(map);

  /* Open popup on load */
  setTimeout(()=>propM.openPopup(),700);

  /* Scroll wheel on click */
  map.on('focus',()=>map.scrollWheelZoom.enable());
  map.on('blur',()=>map.scrollWheelZoom.disable());

  /* Movimiento del mapa solo cuando el sistema permite animaciones. */
  if(!reduceMotion && typeof IntersectionObserver!=='undefined'){
    const mapObs=new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        if(!entry.isIntersecting)return;
        setTimeout(()=>{
          map.flyTo(PROP,9,{duration:1.4,easeLinearity:.3});
          setTimeout(()=>map.flyTo([-11.85,-69.25],7,{duration:1.6,easeLinearity:.3}),2200);
        },350);
        mapObs.disconnect();
      });
    },{threshold:.45});
    mapObs.observe(el);
  }

  /* Popup HTML */
  function popup(title,sub,tc,bg){
    return L.popup({className:'hmd-popup'}).setContent(`
      <div style="background:#111;border:1px solid rgba(255,255,255,.12);border-radius:4px;
        padding:12px 14px;min-width:200px;font-family:'DM Sans',sans-serif">
        <strong style="color:${tc};font-size:13px;display:block;margin-bottom:4px">${title}</strong>
        <span style="font-size:11px;color:rgba(237,232,220,.5)">${sub}</span>
      </div>`);
  }

  /* Popup CSS */
  const st=document.createElement('style');
  st.textContent='.hmd-popup .leaflet-popup-content-wrapper{background:transparent!important;box-shadow:none!important;padding:0!important;border-radius:4px!important}.hmd-popup .leaflet-popup-content{margin:0!important}';
  document.head.appendChild(st);
});

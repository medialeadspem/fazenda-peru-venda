/* HACIENDA MADRE DE DIOS — main.js FINAL / funcional
   ─────────────────────────────────────────
   La configuración de videos, WhatsApp y tour está en js/media-config.js */

const MEDIA = window.HMD_MEDIA || {};
const WA = (MEDIA.whatsapp || '51906233671').replace(/\D/g,'');
const YT = (MEDIA.youtubeId || '').trim();
const REDUCE_MOTION = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches === true;

/* ══ IMÁGENES LOCALES / GALERÍA CONFIGURABLE ════════
   Las rutas se leen desde js/media-config.js. Si una foto local no existe,
   se prueba automáticamente con JPG, JPEG, PNG, WEBP y AVIF. Todo se mantiene
   dentro de la carpeta local del proyecto. */
function getImageCandidates(primary='', fallback=''){
  const out=[];
  const add=value=>{if(value && !out.includes(value))out.push(value);};
  add(primary);
  if(primary && !primary.startsWith('data:')){
    const match=primary.match(/^(.*)\.(jpe?g|png|webp|avif)(\?.*)?$/i);
    if(match){
      const base=match[1], query=match[3]||'';
      ['jpg','jpeg','png','webp','avif'].forEach(ext=>add(`${base}.${ext}${query}`));
    }
  }
  add(fallback);
  return out;
}

function loadResilientImage(img, primary, fallback=''){
  if(!img)return;
  const candidates=getImageCandidates(primary, fallback);
  let cursor=0;
  img.classList.add('media-loading');
  const next=()=>{
    if(cursor>=candidates.length){
      img.classList.remove('media-loading');
      img.classList.add('media-missing');
      return;
    }
    img.src=candidates[cursor++];
  };
  img.addEventListener('load',()=>{
    img.classList.remove('media-loading','media-missing');
    img.classList.add('media-ready');
  });
  img.addEventListener('error',next);
  next();
}

(function initPropertyImagesAndGallery(){
  const property=MEDIA.propertyImages||{};
  const mainCfg=property.main||{};
  const cardCfg=property.card||{};
  const mainImg=document.getElementById('propertyMainImage');
  const cardImg=document.getElementById('propertyCardImage');
  const mainCaption=document.getElementById('propertyMainCaption');
  const cardCaption=document.getElementById('propertyCardCaption');

  if(mainImg){
    mainImg.alt=mainCfg.alt||mainImg.alt;
    loadResilientImage(mainImg,mainCfg.src||mainImg.getAttribute('src'),mainCfg.fallback||'');
  }
  if(cardImg){
    cardImg.alt=cardCfg.alt||cardImg.alt;
    loadResilientImage(cardImg,cardCfg.src||cardImg.getAttribute('src'),cardCfg.fallback||'');
  }
  if(mainCaption&&mainCfg.caption)mainCaption.textContent=mainCfg.caption;
  if(cardCaption&&cardCfg.caption)cardCaption.textContent=cardCfg.caption;

  const defaults=[
    {src:'assets/images/galeria/galeria-01.jpg',alt:'Área de pasturas',title:'Área de Pasturas — 300 Hectáreas'},
    {src:'assets/images/galeria/galeria-02.png',alt:'Ganado Brahman',title:'Ganado Brahman — 319 Cabezas Incluidas'},
    {src:'assets/images/galeria/galeria-03.png',alt:'Vista aérea',title:'Vista Aérea — 526 Hectáreas Totales'},
    {src:'assets/images/galeria/galeria-04.png',alt:'Reserva natural',title:'Reserva Natural — Amazonia Peruana'}
  ];
  const items=Array.isArray(MEDIA.gallery)&&MEDIA.gallery.length?MEDIA.gallery:defaults;
  const wrapper=document.getElementById('gallerySlides');
  if(!wrapper)return;
  wrapper.replaceChildren();
  const total=String(items.length).padStart(2,'0');

  items.forEach((item,index)=>{
    const slide=document.createElement('div');
    slide.className='swiper-slide gslide';

    const img=document.createElement('img');
    img.alt=item.alt||item.title||`Foto ${index+1} de la propiedad`;
    img.loading=index===0?'eager':'lazy';
    img.decoding='async';
    if(index===0)img.fetchPriority='high';
    loadResilientImage(img,item.src||'',item.fallback||'');

    const caption=document.createElement('div');
    caption.className='gcap';
    const number=document.createElement('span');
    number.className='gcap-n';
    number.textContent=`${String(index+1).padStart(2,'0')} / ${total}`;
    const title=document.createElement('span');
    title.className='gcap-t';
    title.textContent=item.title||item.alt||`Imagen ${index+1}`;
    caption.append(number,title);
    slide.append(img,caption);
    wrapper.append(slide);
  });
})();


/* ══ TRANSLATIONS ══════════════════════════════════ */
const LANGS = {
  es:{
    'nav.prop':'Propiedad','nav.gal':'Galería','nav.video':'Video','nav.infra':'Infraestructura','nav.contact':'Contacto',
    'hero.eyebrow':'PROPIEDAD PRIVADA · MADRE DE DIOS, PERÚ',
    'hero.cta1':'Ver la propiedad','hero.cta2':'Solicitar información',
    'fi.ha':'hectáreas totales','fi.cab':'cabezas Brahman incluidas','fi.past':'ha de pasturas','fi.llave':'llave en mano',
    'form.nombre':'Nombre completo *','form.tel':'WhatsApp / Teléfono *',
    'form.interes':'¿Qué tan interesado está en la propiedad?',
    'form.msg':'Mensaje','form.send':'Enviar solicitud por WhatsApp',
    'form.note':'Su información es confidencial y solo se usará para contactarle',
    'opt0':'Seleccione una opción...','opt1':'Muy interesado — quiero coordinar una visita',
    'opt2':'Interesado — quisiera ficha técnica, fotos y video','opt3':'Estoy evaluando opciones de inversión',
    'form.perfil':'Perfil','form.recibir':'Deseo recibir','form.plazo':'Tiempo de decisión',
    'perfil0':'Seleccione...','perfil1':'Comprador directo','perfil2':'Inversionista','perfil3':'Empresa / grupo','perfil4':'Intermediario',
    'recibir1':'Ficha técnica + ubicación','recibir2':'Video completo + fotos','recibir3':'Coordinar visita privada','recibir4':'Toda la información disponible',
    'plazo1':'Lo antes posible','plazo2':'Esta semana','plazo3':'Durante este mes','plazo4':'Aún sin fecha definida',
    'ph.nombre':'Su nombre completo','ph.tel':'+51 900 000 000','ph.msg':'Deseo recibir más información sobre la Hacienda Madre de Dios...',
    'wa.greeting':'Hola, soy','wa.interest':'y me interesa la *Hacienda Madre de Dios* 🏡',
    'wa.data':'Mis datos:','wa.msg':'Mensaje:','wa.thanks':'Quedo a la espera. ¡Gracias!',
    'wa.interes_label':'Nivel de interés:','wa.perfil_label':'Perfil:','wa.recibir_label':'Solicita recibir:','wa.plazo_label':'Tiempo de decisión:',
    'loading':'Cargando panorámica...',
    'drag':'Arrastra para explorar · Pellizca para hacer zoom',
    'confirm.sending':'Abriendo WhatsApp...','confirm.sent':'¡Enviado!',
    'err.nombre':'Por favor ingrese su nombre.','err.tel':'Ingrese su WhatsApp o teléfono.',
  },
  pt:{
    'nav.prop':'Propriedade','nav.gal':'Galeria','nav.video':'Vídeo','nav.infra':'Infraestrutura','nav.contact':'Contato',
    'hero.eyebrow':'PROPRIEDADE PRIVADA · MADRE DE DIOS, PERU',
    'hero.cta1':'Ver a propriedade','hero.cta2':'Solicitar informações',
    'fi.ha':'hectares totais','fi.cab':'cabeças Brahman incluídas','fi.past':'ha de pastagens','fi.llave':'chave na mão',
    'form.nombre':'Nome completo *','form.tel':'WhatsApp / Telefone *',
    'form.interes':'Qual é o seu nível de interesse na propriedade?',
    'form.msg':'Mensagem','form.send':'Enviar solicitação pelo WhatsApp',
    'form.note':'Suas informações são confidenciais e serão usadas apenas para entrar em contato',
    'opt0':'Selecione uma opção...','opt1':'Muito interessado — quero coordenar uma visita',
    'opt2':'Interessado — gostaria da ficha técnica, fotos e vídeo','opt3':'Estou avaliando opções de investimento',
    'form.perfil':'Perfil','form.recibir':'Desejo receber','form.plazo':'Tempo de decisão',
    'perfil0':'Selecione...','perfil1':'Comprador direto','perfil2':'Investidor','perfil3':'Empresa / grupo','perfil4':'Intermediário',
    'recibir1':'Ficha técnica + localização','recibir2':'Vídeo completo + fotos','recibir3':'Coordenar visita privada','recibir4':'Todas as informações disponíveis',
    'plazo1':'O quanto antes','plazo2':'Esta semana','plazo3':'Durante este mês','plazo4':'Ainda sem data definida',
    'ph.nombre':'Seu nome completo','ph.tel':'+55 ou +51 ...','ph.msg':'Desejo receber mais informações sobre a Hacienda Madre de Dios...',
    'wa.greeting':'Olá, me chamo','wa.interest':'e tenho interesse na *Hacienda Madre de Dios* 🏡',
    'wa.data':'Meus dados:','wa.msg':'Mensagem:','wa.thanks':'Fico à disposição. Obrigado!',
    'wa.interes_label':'Nível de interesse:','wa.perfil_label':'Perfil:','wa.recibir_label':'Deseja receber:','wa.plazo_label':'Tempo de decisão:',
    'loading':'Carregando panorâmica...','drag':'Arraste para explorar · Aperte para zoom',
    'confirm.sending':'Abrindo WhatsApp...','confirm.sent':'Enviado!',
    'err.nombre':'Por favor, informe seu nome.','err.tel':'Informe seu WhatsApp ou telefone.',
  },
  en:{
    'nav.prop':'Property','nav.gal':'Gallery','nav.video':'Video','nav.infra':'Infrastructure','nav.contact':'Contact',
    'hero.eyebrow':'PRIVATE PROPERTY · MADRE DE DIOS, PERU',
    'hero.cta1':'View property','hero.cta2':'Request information',
    'fi.ha':'total hectares','fi.cab':'Brahman head included','fi.past':'ha of pastures','fi.llave':'turnkey',
    'form.nombre':'Full name *','form.tel':'WhatsApp / Phone *',
    'form.interes':'How interested are you in this property?',
    'form.msg':'Message','form.send':'Send request via WhatsApp',
    'form.note':'Your information is confidential and will only be used to contact you',
    'opt0':'Select an option...','opt1':'Very interested — I want to arrange a visit',
    'opt2':'Interested — I would like technical sheet, photos and video','opt3':'I am evaluating investment options',
    'form.perfil':'Profile','form.recibir':'I want to receive','form.plazo':'Decision timing',
    'perfil0':'Select...','perfil1':'Direct buyer','perfil2':'Investor','perfil3':'Company / group','perfil4':'Broker',
    'recibir1':'Technical sheet + location','recibir2':'Full video + photos','recibir3':'Arrange a private visit','recibir4':'All available information',
    'plazo1':'As soon as possible','plazo2':'This week','plazo3':'During this month','plazo4':'No defined date yet',
    'ph.nombre':'Your full name','ph.tel':'+1, +55 or +51 ...','ph.msg':'I would like to receive more information about Hacienda Madre de Dios...',
    'wa.greeting':'Hello, my name is','wa.interest':'and I am interested in *Hacienda Madre de Dios* 🏡',
    'wa.data':'My details:','wa.msg':'Message:','wa.thanks':'I look forward to hearing from you. Thank you!',
    'wa.interes_label':'Level of interest:','wa.perfil_label':'Profile:','wa.recibir_label':'Wants to receive:','wa.plazo_label':'Decision timing:',
    'loading':'Loading panoramic...','drag':'Drag to explore · Pinch to zoom',
    'confirm.sending':'Opening WhatsApp...','confirm.sent':'Sent!',
    'err.nombre':'Please enter your full name.','err.tel':'Please enter your WhatsApp or phone number.',
  }
};

let currentLang = 'es';

function detectLang() {
  const nav = navigator.language || navigator.userLanguage || 'es';
  const code = nav.split('-')[0].toLowerCase();
  if(code==='pt') return 'pt';
  if(code==='en') return 'en';
  return 'es';
}

function t(key) {
  return (LANGS[currentLang]||LANGS.es)[key] || (LANGS.es[key]) || key;
}

function applyLang(lang) {
  currentLang = lang;
  const L = LANGS[lang] || LANGS.es;

  // HTML lang attr
  document.getElementById('htmlRoot')?.setAttribute('lang', lang==='pt'?'pt-BR':lang==='en'?'en':lang);

  // data-i18n elements
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const k = el.dataset.i18n;
    if(L[k] !== undefined) {
      if(el.tagName==='INPUT'||el.tagName==='TEXTAREA') el.placeholder = L[k];
      else el.textContent = L[k];
    }
  });

  // Select options (data-i18n-opt)
  document.querySelectorAll('[data-i18n-opt]').forEach(el => {
    const k = el.dataset.i18nOpt;
    if(L[k] !== undefined) el.textContent = L[k];
  });

  // Placeholders
  const fns = {fn:'ph.nombre',ft:'ph.tel',fm:'ph.msg'};
  Object.entries(fns).forEach(([id,k]) => {
    const el=document.getElementById(id); if(el&&L[k]) el.placeholder=L[k];
  });

  // Tour loading + instructions text
  const pl=document.querySelector('#pload p'); if(pl&&L['loading']) pl.textContent=L['loading'];
  const pi=document.querySelector('#pinstr span'); if(pi&&L['drag']) pi.textContent=L['drag'];

  // Language buttons active state
  document.querySelectorAll('.lbtn').forEach(b=>b.classList.toggle('active',b.dataset.lang===lang));
}

/* ══ LOADING SCREEN ═════════════════════════════════ */
(function(){
  const ls=document.getElementById('loadingScreen');
  const bar=document.getElementById('lsBar');
  const cnv=document.getElementById('lsCnv');
  if(!ls)return;
  document.body.style.overflow='hidden';
  if(cnv){
    const c=cnv.getContext('2d'); cnv.width=window.innerWidth; cnv.height=window.innerHeight;
    const pts=Array.from({length:28},()=>({x:Math.random()*cnv.width,y:Math.random()*cnv.height,vx:(Math.random()-.5)*.4,vy:(Math.random()-.5)*.4,a:Math.random()*.3+.05,r:Math.random()*1.4+.3}));
    let alive=true;
    (function tick(){if(!alive)return;c.clearRect(0,0,cnv.width,cnv.height);pts.forEach(p=>{c.beginPath();c.arc(p.x,p.y,p.r,0,Math.PI*2);c.fillStyle=`rgba(255,209,0,${p.a})`;c.fill();p.x+=p.vx;p.y+=p.vy;if(p.x<0)p.x=cnv.width;if(p.x>cnv.width)p.x=0;if(p.y<0)p.y=cnv.height;if(p.y>cnv.height)p.y=0;});requestAnimationFrame(tick);})();
    setTimeout(()=>{alive=false;},3200);
  }
  let pct=0;
  const timer=setInterval(()=>{
    pct+=Math.random()*14+3;
    if(pct>=100){pct=100;clearInterval(timer);setTimeout(()=>{ls.classList.add('out');document.body.style.overflow='';},350);}
    if(bar)bar.style.width=Math.min(pct,100)+'%';
  },80);
})();

/* ══ PROGRESS BAR ════════════════════════════════════ */
(function(){
  const bar=document.getElementById('prog');if(!bar)return;
  window.addEventListener('scroll',()=>{bar.style.width=Math.min((window.scrollY/(document.body.scrollHeight-window.innerHeight))*100,100)+'%';},{passive:true});
})();

/* ══ CURSOR ══════════════════════════════════════════ */
(function(){
  if(REDUCE_MOTION||!window.matchMedia('(pointer:fine)').matches)return;
  const cur=document.getElementById('cursor'),ring=document.getElementById('cring');
  if(!cur||!ring)return;
  let mx=0,my=0,rx=0,ry=0;
  document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;cur.style.left=mx+'px';cur.style.top=my+'px';});
  (function loop(){rx+=(mx-rx)*.11;ry+=(my-ry)*.11;ring.style.left=rx+'px';ring.style.top=ry+'px';requestAnimationFrame(loop);})();
  const targets='a,button,.tt,.cm,.plist li,.icol li,.gslide,.ur,.lbtn';
  document.querySelectorAll(targets).forEach(el=>{el.addEventListener('mouseenter',()=>{cur.classList.add('hv');ring.classList.add('hv');});el.addEventListener('mouseleave',()=>{cur.classList.remove('hv');ring.classList.remove('hv');});});
})();

/* ══ NAV ═════════════════════════════════════════════ */
(function(){
  const nav=document.getElementById('nav');if(!nav)return;
  const upd=()=>nav.classList.toggle('scrolled',window.scrollY>80);
  window.addEventListener('scroll',upd,{passive:true});upd();
})();

/* ══ LANGUAGE SWITCHER ═══════════════════════════════ */
(function(){
  const auto=detectLang();
  applyLang(auto);
  document.querySelectorAll('.lbtn').forEach(btn=>{
    btn.addEventListener('click',()=>applyLang(btn.dataset.lang));
  });
})();


/* ══ HERO MP4 BACKGROUND ═══════════════════════════════
   El video se muestra por CSS desde el inicio. JS solo asegura autoplay y fallback. */
(function(){
  const wrap=document.getElementById('hvidWrap');
  const video=document.getElementById('hvid');
  const source=document.getElementById('hvidSrc');
  const hero=document.querySelector('.hero');
  if(!wrap||!video||!source||!hero)return;

  const src=(MEDIA.heroVideo || source.getAttribute('src') || 'assets/video/hero.mp4').trim();
  const poster=(MEDIA.heroPoster || video.getAttribute('poster') || '').trim();
  if(poster) video.setAttribute('poster', poster);
  if(!src){wrap.classList.add('error');hero.classList.add('video-error');return;}

  source.src=src;
  video.src=src;
  video.muted=true;
  video.defaultMuted=true;
  video.loop=true;
  video.autoplay=true;
  video.playsInline=true;
  video.preload='auto';
  video.setAttribute('muted','');
  video.setAttribute('loop','');
  video.setAttribute('autoplay','');
  video.setAttribute('playsinline','');
  video.setAttribute('webkit-playsinline','');

  const showVideo=()=>{
    wrap.classList.add('ready');
    wrap.classList.remove('error');
    hero.classList.add('video-ready');
    hero.classList.remove('video-error');
  };
  const hideVideo=()=>{
    wrap.classList.add('error');
    wrap.classList.remove('ready');
    hero.classList.add('video-error');
  };

  // Importante: se marca visible desde el inicio para no depender de un evento tardío.
  showVideo();
  ['loadedmetadata','loadeddata','canplay','playing'].forEach(ev=>video.addEventListener(ev, showVideo, {once:true}));
  video.addEventListener('error', hideVideo, {once:true});

  const play=()=>{
    const p=video.play();
    if(p && typeof p.catch==='function') p.catch(()=>{});
  };
  try{ video.load(); }catch(e){}
  play();
  document.addEventListener('visibilitychange',()=>{ if(!document.hidden) play(); });
  ['click','touchstart','mousemove','scroll'].forEach(ev=>window.addEventListener(ev,play,{once:true,passive:true}));
})();

/* ══ MOBILE MENU ══════════════════════════════════════ */
(function(){
  const btn=document.getElementById('burger'),menu=document.getElementById('mnav');
  if(!btn||!menu)return;
  const close=()=>{menu.classList.remove('open');btn.classList.remove('open');btn.setAttribute('aria-expanded','false');menu.setAttribute('aria-hidden','true');document.body.style.overflow='';};
  btn.addEventListener('click',()=>{const o=menu.classList.toggle('open');btn.classList.toggle('open',o);btn.setAttribute('aria-expanded',o);menu.setAttribute('aria-hidden',!o);document.body.style.overflow=o?'hidden':'';});
  menu.querySelectorAll('.ml,.mcta').forEach(l=>l.addEventListener('click',close));
  document.addEventListener('keydown',e=>{if(e.key==='Escape')close();});
})();

/* ══ SMOOTH SCROLL ════════════════════════════════════ */
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click',e=>{
    const target=document.querySelector(a.getAttribute('href'));if(!target)return;
    e.preventDefault();
    const top=target.getBoundingClientRect().top+window.scrollY-80;
    window.scrollTo({top,behavior:REDUCE_MOTION?'auto':'smooth'});
  });
});

/* ══ HERO PARALLAX ════════════════════════════════════ */
(function(){
  if(REDUCE_MOTION||window.matchMedia('(pointer:coarse)').matches)return;
  const bg=document.getElementById('hbg'),vid=document.getElementById('hvid');if(!bg)return;
  let ticking=false;
  window.addEventListener('scroll',()=>{
    if(ticking)return;
    requestAnimationFrame(()=>{
      if(window.scrollY<window.innerHeight*1.2){
        const t=window.scrollY*.2;
        bg.style.transform=`scale(1.07) translateY(${t}px)`;
        if(vid)vid.style.transform=`scale(1.07) translateY(${t}px)`;
      }
      ticking=false;
    });ticking=true;
  },{passive:true});
})();

/* ══ HERO PARTICLES ═══════════════════════════════════ */
(function(){
  if(REDUCE_MOTION)return;
  const cnv=document.getElementById('hcnv');if(!cnv)return;
  const ctx=cnv.getContext('2d');
  const resize=()=>{cnv.width=window.innerWidth;cnv.height=window.innerHeight;};
  resize();
  const pts=Array.from({length:40},()=>({x:Math.random()*cnv.width,y:Math.random()*cnv.height,vx:(Math.random()-.5)*.25,vy:(Math.random()-.5)*.25,r:Math.random()*1.4+.3,a:Math.random()*.32+.05}));
  function draw(){ctx.clearRect(0,0,cnv.width,cnv.height);pts.forEach(p=>{ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fillStyle=`rgba(255,209,0,${p.a})`;ctx.fill();p.x+=p.vx;p.y+=p.vy;if(p.x<-5)p.x=cnv.width+5;if(p.x>cnv.width+5)p.x=-5;if(p.y<-5)p.y=cnv.height+5;if(p.y>cnv.height+5)p.y=-5;});requestAnimationFrame(draw);}
  draw();window.addEventListener('resize',resize,{passive:true});
})();

/* ══ ANIMACIONES DE ENTRADA LIGERAS ════════════════════ */
(function(){
  const directional=document.querySelectorAll('.sl-l,.sl-r,.ru');
  const textTargets=document.querySelectorAll('.ey,.sh,.pbody,.plist li,.icol h3,.icol li,.ur,.ctxt,.ftitle');
  textTargets.forEach((el,index)=>{
    el.classList.add('text-fx');
    el.style.setProperty('--fx-delay',`${Math.min(index%6,5)*45}ms`);
  });

  const targets=[...directional,...textTargets];
  if(REDUCE_MOTION||typeof IntersectionObserver==='undefined'){
    targets.forEach(el=>el.classList.add('in'));
    return;
  }

  const observer=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(!entry.isIntersecting)return;
      entry.target.classList.add('in');
      observer.unobserve(entry.target);
    });
  },{threshold:.08,rootMargin:'0px 0px -24px 0px'});
  targets.forEach(el=>observer.observe(el));
})();

/* ══ REVELADO SUAVE DE IMÁGENES ═══════════════════════ */
(function(){
  const images=document.querySelectorAll('.pmain img,.pfloat img');
  if(REDUCE_MOTION||typeof IntersectionObserver==='undefined'){
    images.forEach(img=>img.classList.add('revealed'));
    return;
  }
  const observer=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(!entry.isIntersecting)return;
      entry.target.classList.add('revealed');
      observer.unobserve(entry.target);
    });
  },{threshold:.08});
  images.forEach(img=>observer.observe(img));
})();

/* ══ SWIPER ════════════════════════════════════════════ */
(function(){
  const gallery=document.querySelector('.gswiper');
  if(!gallery)return;
  const slides=gallery.querySelectorAll('.gslide').length;
  if(typeof Swiper==='undefined'){
    gallery.classList.add('swiper-fallback');
    return;
  }
  new Swiper(gallery,{
    loop:slides>1,
    speed:900,
    autoplay:slides>1?{delay:5000,disableOnInteraction:false,pauseOnMouseEnter:true}:false,
    pagination:{el:'.g-dots',clickable:true},
    navigation:{prevEl:'.g-prev',nextEl:'.g-next'},
    keyboard:{enabled:true},
    a11y:{enabled:true},
    observer:true,
    observeParents:true
  });
})();

/* ══ MAGNETIC BUTTONS ══════════════════════════════════ */
(function(){
  if(REDUCE_MOTION||!window.matchMedia('(pointer:fine)').matches)return;
  document.querySelectorAll('.mag,.ncta').forEach(btn=>{
    btn.addEventListener('mousemove',e=>{const r=btn.getBoundingClientRect();const x=(e.clientX-r.left-r.width/2)*.12;const y=(e.clientY-r.top-r.height/2)*.12;btn.style.transition='transform .12s ease';btn.style.transform=`translate(${x}px,${y}px) scale(1.04)`;});
    btn.addEventListener('mouseleave',()=>{btn.style.transition='transform .5s var(--spr)';btn.style.transform='';});
  });
})();

/* ══ VIDEO SECTION ══════════════════════════════════
   Reproduce automáticamente el MP4 local en “Vuelo sobre la hacienda”. */
(function(){
  const media=document.getElementById('vmedia');
  const video=document.getElementById('vdrone');
  const source=document.getElementById('vdroneSrc');
  const sound=document.getElementById('vsound');
  const bad=document.getElementById('vbad');
  if(!media||!video||!source)return;

  const localVideo=(MEDIA.droneVideo || source.getAttribute('src') || 'assets/video/vuelo-hacienda.mp4').trim();
  const localPoster=(MEDIA.dronePoster || video.getAttribute('poster') || '').trim();
  if(localPoster) video.setAttribute('poster', localPoster);

  source.src=localVideo;
  video.src=localVideo;
  video.muted=true;
  video.defaultMuted=true;
  video.loop=true;
  video.autoplay=true;
  video.playsInline=true;
  video.preload='auto';
  video.controls=true;
  video.setAttribute('muted','');
  video.setAttribute('loop','');
  video.setAttribute('autoplay','');
  video.setAttribute('playsinline','');
  video.setAttribute('webkit-playsinline','');

  function showReady(){
    media.classList.add('is-ready');
    media.classList.remove('has-error');
    video.style.display='block';
    if(sound) sound.style.display='inline-flex';
    if(bad) bad.hidden=true;
  }
  function showError(){
    media.classList.add('has-error');
    media.classList.remove('is-ready');
    video.style.display='none';
    if(sound) sound.style.display='none';
    if(bad) bad.hidden=false;
  }

  showReady();
  ['loadedmetadata','loadeddata','canplay','playing'].forEach(ev=>video.addEventListener(ev, showReady, {once:true}));
  video.addEventListener('error', showError, {once:true});

  const start=()=>{
    const p=video.play();
    if(p && typeof p.catch==='function') p.catch(()=>{});
  };
  try{ video.load(); }catch(e){}
  start();
  ['click','touchstart','mousemove','scroll'].forEach(ev=>window.addEventListener(ev,start,{once:true,passive:true}));

  sound?.addEventListener('click',()=>{
    video.muted=!video.muted;
    video.volume=video.muted ? 0 : 1;
    start();
    sound.classList.toggle('on', !video.muted);
    const icon=sound.querySelector('i');
    const text=sound.querySelector('span');
    if(icon) icon.className=video.muted?'fas fa-volume-xmark':'fas fa-volume-high';
    if(text) text.textContent=video.muted?'Activar sonido':'Silenciar';
  });
})();

/* ══ AUDIO AMBIENTAL ═════════════════════════════════
   Se intenta reproducir al abrir. Los navegadores que bloquean audio con
   sonido lo activan automáticamente en la primera interacción del usuario. */
(function(){
  const btn=document.getElementById('abtn');
  const ico=document.getElementById('aico');
  const audio=document.getElementById('audio');
  const source=document.getElementById('audioSrc');
  const notice=document.getElementById('audioNotice');
  if(!btn||!ico||!audio)return;

  const src=(MEDIA.backgroundAudio||source?.getAttribute('src')||'assets/audio/musica-ambiente.mp3').trim();
  const configuredVolume=Number(MEDIA.backgroundAudioVolume);
  audio.volume=Number.isFinite(configuredVolume)?Math.max(0,Math.min(1,configuredVolume)):.24;
  audio.loop=true;
  audio.preload='auto';
  if(src){
    if(source)source.src=src;
    audio.src=src;
  }

  let userPaused=false;
  let unlockAttached=false;

  function setUi(state){
    const playing=state==='playing';
    const pending=state==='pending';
    btn.classList.toggle('on',playing);
    btn.classList.toggle('pending',pending);
    ico.className=playing?'fas fa-pause':'fas fa-music';
    btn.setAttribute('aria-label',playing?'Pausar música ambiental':'Reproducir música ambiental');
    btn.setAttribute('aria-pressed',String(playing));
    if(notice)notice.hidden=!pending;
  }

  function removeUnlock(){
    if(!unlockAttached)return;
    document.removeEventListener('pointerdown',unlockAudio,true);
    document.removeEventListener('keydown',unlockAudio,true);
    unlockAttached=false;
  }

  async function attemptPlay(){
    if(userPaused||!src)return false;
    try{
      await audio.play();
      setUi('playing');
      removeUnlock();
      return true;
    }catch(error){
      setUi('pending');
      attachUnlock();
      return false;
    }
  }

  function unlockAudio(event){
    if(event?.target?.closest?.('#abtn'))return;
    attemptPlay();
  }

  function attachUnlock(){
    if(unlockAttached)return;
    document.addEventListener('pointerdown',unlockAudio,true);
    document.addEventListener('keydown',unlockAudio,true);
    unlockAttached=true;
  }

  btn.addEventListener('click',async()=>{
    if(!audio.paused){
      userPaused=true;
      audio.pause();
      setUi('paused');
      return;
    }
    userPaused=false;
    await attemptPlay();
  });

  audio.addEventListener('play',()=>setUi('playing'));
  audio.addEventListener('pause',()=>{if(!userPaused&&document.visibilityState==='visible')return;setUi('paused');});
  audio.addEventListener('error',()=>{
    setUi('paused');
    btn.title='Reemplaza assets/audio/musica-ambiente.mp3 por un archivo MP3 válido';
    if(notice)notice.hidden=true;
  });
  document.addEventListener('visibilitychange',()=>{
    if(!document.hidden&&!userPaused&&MEDIA.autoplayAudio!==false)attemptPlay();
  });

  setUi('paused');
  try{audio.load();}catch(error){}
  if(MEDIA.autoplayAudio!==false)attemptPlay();
})();

/* ══ BACK TO TOP ════════════════════════════════════ */
(function(){
  const btn=document.getElementById('btop');if(!btn)return;
  window.addEventListener('scroll',()=>btn.classList.toggle('show',window.scrollY>600),{passive:true});
  btn.addEventListener('click',()=>window.scrollTo({top:0,behavior:REDUCE_MOTION?'auto':'smooth'}));
})();

/* ══ AÑO AUTOMÁTICO ═════════════════════════════════ */
(function(){
  const year=document.getElementById('currentYear');
  if(year)year.textContent=String(new Date().getFullYear());
})();

/* ══ FORM → WHATSAPP ════════════════════════════════ */
(function(){
  const form=document.getElementById('cform');if(!form)return;

  function showErr(id,msg){const el=document.getElementById(id);if(el)el.textContent=msg;}
  function clearErr(){document.querySelectorAll('.ferr').forEach(e=>e.textContent='');form.querySelectorAll('[aria-invalid="true"]').forEach(el=>el.removeAttribute('aria-invalid'));}
  function markBad(el){if(!el)return;el.setAttribute('aria-invalid','true');el.addEventListener('input',function f(){el.removeAttribute('aria-invalid');el.removeEventListener('input',f);},{once:true});}
  function selectedText(el){return el?.options?.[el.selectedIndex]?.text?.trim() || '';}
  function cleanPhone(v){return (v||'').replace(/[^\d+ ]/g,'').trim();}

  form.addEventListener('submit',e=>{
    e.preventDefault();clearErr();
    const nombre=form.querySelector('[name="nombre"]');
    const tel=form.querySelector('[name="telefono"]');
    const msg=form.querySelector('[name="mensaje"]');
    const interes=form.querySelector('[name="interes"]');
    const perfil=form.querySelector('[name="perfil"]');
    const recibir=form.querySelector('[name="recibir"]');
    const plazo=form.querySelector('[name="plazo"]');
    let ok=true;
    if(!nombre?.value.trim()){showErr('errnombre',t('err.nombre'));markBad(nombre);ok=false;}
    const phone=cleanPhone(tel?.value);
    if(!phone || phone.replace(/\D/g,'').length<7){showErr('errcontact',t('err.tel'));markBad(tel);ok=false;}
    if(!ok)return;

    const n=nombre.value.trim();
    const m=msg?.value.trim()||'';
    const lines=[
      `${t('wa.greeting')} *${n}* ${t('wa.interest')}`,
      '',
      t('wa.data'),
      `• ${t('form.nombre')}: ${n}`,
      `• WhatsApp: ${phone}`
    ];
    if(interes?.value) lines.push(`• ${t('wa.interes_label')} ${selectedText(interes)}`);
    if(perfil?.value) lines.push(`• ${t('wa.perfil_label')} ${selectedText(perfil)}`);
    if(recibir?.value) lines.push(`• ${t('wa.recibir_label')} ${selectedText(recibir)}`);
    if(plazo?.value) lines.push(`• ${t('wa.plazo_label')} ${selectedText(plazo)}`);
    lines.push('', 'Propiedad: 526 ha · 319 cabezas Brahman · Km 42 Interoceánica · Madre de Dios');
    if(m) lines.push('', t('wa.msg'), m);
    lines.push('', t('wa.thanks'));
    const text=lines.join('\n');

    const btn=document.getElementById('fsbtn');
    const txt=document.getElementById('fsbtntxt');
    const ico=document.getElementById('fsbtnico');
    btn.disabled=true;
    txt.textContent=t('confirm.sending');
    ico.className='fas fa-spinner fa-spin';
    btn.style.background='#1A6B3C';

    const waUrl=`https://wa.me/${WA}?text=${encodeURIComponent(text)}`;
    const opened=window.open(waUrl,'_blank');
    if(opened){
      try{opened.opener=null;}catch(error){}
    }else{
      window.location.href=waUrl;
    }
    setTimeout(()=>{btn.disabled=false;txt.dataset.i18n='form.send';txt.textContent=t('form.send');ico.className='fab fa-whatsapp';btn.style.background='';form.reset();},1800);
  });
})();

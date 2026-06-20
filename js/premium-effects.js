/* SSJ Premium Effects — aditivo, no altera textos ni datos */
(function(){
  'use strict';
  const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = window.matchMedia && window.matchMedia('(pointer:fine)').matches;
  document.documentElement.classList.add('premium-ready');

  const revealItems = [
    ...document.querySelectorAll('.ey,.sh,.pbody,.plist li,.fi,.gslide,.tstage,.vmedia,.icol,.ur,.cm,.fwrap,.mapel,.upanel,.tsub,.usub,.ctxt,.tdev')
  ];
  revealItems.forEach((el, i) => {
    if(el.closest('.hero')) return;
    el.classList.add('premium-reveal');
    el.style.setProperty('--reveal-delay', `${Math.min((i % 7) * 70, 420)}ms`);
  });
  if('IntersectionObserver' in window && !reduce){
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          entry.target.classList.add('premium-in','in');
          io.unobserve(entry.target);
        }
      });
    }, {threshold:.12, rootMargin:'0px 0px -8% 0px'});
    revealItems.forEach(el=>io.observe(el));
  } else {
    revealItems.forEach(el=>el.classList.add('premium-in','in'));
  }

  document.querySelectorAll('.pmain,.pfloat,.gslide,.vmedia,.tstage,.icol,.upanel,.fwrap,.cm').forEach(el=>el.classList.add('spotlight-card'));
  if(fine){
    document.addEventListener('pointermove', (event)=>{
      const x = Math.round(event.clientX / Math.max(1, window.innerWidth) * 100);
      const y = Math.round(event.clientY / Math.max(1, window.innerHeight) * 100);
      document.querySelectorAll('.prop,.gal,.tour,.vsec,.infra,.ubic,.contact').forEach(sec=>{
        sec.style.setProperty('--mx', `${x}%`);
        sec.style.setProperty('--my', `${y}%`);
      });
      const card = event.target.closest && event.target.closest('.spotlight-card');
      if(card){
        const r = card.getBoundingClientRect();
        card.style.setProperty('--sx', `${event.clientX - r.left}px`);
        card.style.setProperty('--sy', `${event.clientY - r.top}px`);
      }
    }, {passive:true});
  }

  const parallax = [
    ['#hbg', .11], ['.hvid-wrap', .065], ['.hbody', -.045], ['.pfloat', -.07], ['.pmain', .025]
  ].map(([sel, speed]) => [document.querySelector(sel), speed]).filter(([el]) => el);
  if(!reduce && parallax.length){
    let ticking = false;
    const update = () => {
      const sy = window.scrollY || 0;
      parallax.forEach(([el, speed])=>{
        const rect = el.getBoundingClientRect();
        if(rect.bottom > -160 && rect.top < window.innerHeight + 160){
          const move = sy * speed;
          el.style.transform = `translate3d(0, ${move.toFixed(2)}px, 0) ${el.id === 'hbg' ? 'scale(1.08)' : ''}`;
        }
      });
      ticking = false;
    };
    window.addEventListener('scroll', ()=>{ if(!ticking){ ticking = true; requestAnimationFrame(update); } }, {passive:true});
    update();
  }

  const navLinks = [...document.querySelectorAll('.nl,.ml')].filter(a => a.hash);
  const sections = navLinks.map(a => document.querySelector(a.hash)).filter(Boolean);
  if('IntersectionObserver' in window && sections.length){
    const active = new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{
        if(!entry.isIntersecting) return;
        navLinks.forEach(a => a.classList.toggle('is-active', a.hash === `#${entry.target.id}`));
      });
    }, {rootMargin:'-35% 0px -55% 0px', threshold:0});
    sections.forEach(sec => active.observe(sec));
  }

  document.querySelectorAll('.btn,.ncta,.cm,.wafloat').forEach(el=>{
    el.addEventListener('pointerdown',()=>{
      el.animate([{transform:'scale(1)'},{transform:'scale(.97)'},{transform:'scale(1)'}],{duration:260,easing:'cubic-bezier(.34,1.56,.64,1)'});
    }, {passive:true});
  });
})();

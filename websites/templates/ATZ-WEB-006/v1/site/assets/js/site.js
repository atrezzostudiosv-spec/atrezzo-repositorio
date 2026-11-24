
(()=>{const d=document,h=d.querySelector('.site-header'),t=d.querySelector('.toggle'),n=d.querySelector('.navigation');const scroll=()=>h?.classList.toggle('scrolled',window.scrollY>24);window.addEventListener('scroll',scroll,{passive:true});scroll();t?.addEventListener('click',()=>{let open=t.getAttribute('aria-expanded')!=='true';t.setAttribute('aria-expanded',String(open));h.classList.toggle('menu-open',open)});d.addEventListener('keydown',e=>{if(e.key==='Escape'){h?.classList.remove('menu-open');t?.setAttribute('aria-expanded','false');n?.querySelectorAll('details[open]').forEach(x=>x.open=false)}});n?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{h.classList.remove('menu-open');t?.setAttribute('aria-expanded','false')}));const reduced=window.matchMedia('(prefers-reduced-motion: reduce)'),v=d.querySelector('#hero-film');if(v){const mobile=window.matchMedia('(max-width: 640px)');const update=()=>{if(reduced.matches||navigator.connection?.saveData){v.pause();v.hidden=true;return}const useWebm=!!v.canPlayType('video/webm; codecs="vp9"');const url=mobile.matches?(useWebm&&v.dataset.mobileWebmSrc?v.dataset.mobileWebmSrc:(v.dataset.mobileSrc||v.dataset.src)):(useWebm&&v.dataset.webmSrc?v.dataset.webmSrc:v.dataset.src);if(!url){v.hidden=true;return}if(v.getAttribute('src')!==url){v.src=url;v.load()}v.hidden=false;const play=v.play();play?.catch?.(()=>{v.hidden=true})};v.addEventListener('error',()=>{v.hidden=true});update();mobile.addEventListener?.('change',update);reduced.addEventListener?.('change',update)}if('IntersectionObserver'in window&&!reduced.matches){d.documentElement.classList.add('enhanced');const io=new IntersectionObserver(es=>es.forEach(x=>{if(x.isIntersecting){x.target.classList.add('visible');io.unobserve(x.target)}}),{threshold:.06,rootMargin:'0px 0px -25px 0px'});d.querySelectorAll('.reveal').forEach(el=>io.observe(el))}})();
/* ATREZZO — Internal-page reading rhythm, November 2026.
   The approved Home never loads this script. Native scroll / wheel / touch are
   never intercepted. No photographic scroll on reduced-motion devices. */
(()=>{
  'use strict';
  const d=document;
  if(!d.body.matches('body[data-page]'))return;
  const hero=d.querySelector('main .hero:not(.hero--home)');
  const photograph=hero?.querySelector('.hero__background');
  const reduce=matchMedia('(prefers-reduced-motion: reduce)');
  let frame=0;
  const refresh=()=>{
    frame=0;
    if(!photograph)return;
    if(reduce.matches){
      photograph.style.removeProperty('--at-subpage-hero-scale');
      return;
    }
    const height=Math.max(hero.offsetHeight,1);
    const progress=Math.min(1,Math.max(0,-hero.getBoundingClientRect().top/height));
    const mobile=matchMedia('(max-width:700px)').matches;
    const base=mobile?1.01:1.015;
    const distance=mobile?.03:.055;
    photograph.style.setProperty('--at-subpage-hero-scale',(base+progress*distance).toFixed(4));
  };
  const queue=()=>{
    if(!frame)frame=requestAnimationFrame(refresh);
  };
  window.addEventListener('scroll',queue,{passive:true});
  window.addEventListener('resize',queue,{passive:true});
  reduce.addEventListener?.('change',queue);
  queue();

  // Visual elements enter only when read; section text remains in normal flow.
  // Existing .reveal observer still handles editorial copy independently.
  const visuals=[...d.querySelectorAll(
    '.section.section--white .scene--portrait, .service-row .scene, .gallery-grid .scene'
  )];
  if(!reduce.matches&&'IntersectionObserver'in window){
    const observer=new IntersectionObserver(entries=>{
      for(const entry of entries){
        if(!entry.isIntersecting)continue;
        entry.target.classList.add('em-scene-visible');
        observer.unobserve(entry.target);
      }
    },{rootMargin:'0px 0px -45px 0px',threshold:.07});
    for(const element of visuals){
      element.classList.add('em-scene-enter');
      observer.observe(element);
    }
    reduce.addEventListener?.('change',event=>{
      if(event.matches){
        observer.disconnect();
        visuals.forEach(el=>el.classList.add('em-scene-visible'));
      }
    });
  }
})();

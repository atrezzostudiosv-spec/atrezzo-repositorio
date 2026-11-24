/* Elegant Massage — Touch, Considered. Scroll remains native; no Lenis, hijacking or JS-only content. */
(() => {
  'use strict';
  const header = document.getElementById('site-header');
  const toggle = document.getElementById('menu-toggle');
  const nav = document.getElementById('main-nav');
  const intro = document.getElementById('introduction');
  const introFilm = document.getElementById('intro-film');
  const frames = [...document.querySelectorAll('.depth-frame')];
  const chapters = [...document.querySelectorAll('.chapter')];
  const jump = document.getElementById('chapter-selector');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const compact = matchMedia('(max-width: 700px)');
  const clamp = (n, lo = 0, hi = 1) => Math.max(lo, Math.min(hi, n));
  let scrollTick = false;
  const closeMenu = () => {
    if (!nav || !toggle) return;
    nav.removeAttribute('data-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open navigation');
  };
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const opening = toggle.getAttribute('aria-expanded') !== 'true';
      toggle.setAttribute('aria-expanded', String(opening));
      toggle.setAttribute('aria-label', opening ? 'Close navigation' : 'Open navigation');
      if (opening) nav.setAttribute('data-open', 'true'); else nav.removeAttribute('data-open');
    });
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') { closeMenu(); toggle.focus(); } });
    document.addEventListener('click', e => { if (!header.contains(e.target)) closeMenu(); });
    matchMedia('(min-width: 861px)').addEventListener('change', e => { if (e.matches) closeMenu(); });
  }
  if (jump) jump.addEventListener('change', () => {
    const target = document.getElementById(jump.value);
    if (!target) return;
    target.scrollIntoView({behavior: 'instant',block:'start'});
    history.replaceState(null,'','#'+target.id);
  });
  // Honor data saving and explicit reduced-motion preferences, even if the browser allows autoplay.
  function syncVideo(){
    if (!introFilm) return;
    if (reduced.matches || (navigator.connection && navigator.connection.saveData)) {
      introFilm.pause(); introFilm.hidden = true;
    } else {
      introFilm.hidden = false;
      const p = introFilm.play(); if (p && p.catch) p.catch(() => { introFilm.hidden = true; });
    }
  }
  function onScroll(){
    scrollTick = false;
    header?.classList.toggle('is-scrolled', scrollY > 60);
    if (!intro || compact.matches || reduced.matches) return;
    const range = Math.max(1,intro.offsetHeight - innerHeight);
    const p = clamp(-intro.getBoundingClientRect().top / range);
    intro.querySelector('.intro__film')?.style.setProperty('transform',`scale(${(1+0.055*p).toFixed(4)})`);
    const intervals = [[.10,.30],[.27,.48],[.45,.67]];
    const displacements = [[-22,100,-8],[22,-30,7],[20,50,4]];
    frames.forEach((f,i) => {
      const [a,b]=intervals[i], local=clamp((p-a)/(b-a));
      const fadeOut=1-clamp((p-.8)/.18);
      f.style.opacity=(Math.min(local*1.4,1)*fadeOut*.91).toFixed(3);
      const [x,y,r]=displacements[i];
      f.style.transform=`translate3d(${(x*(1-local)).toFixed(1)}px,${(y*(1-local)-p*22).toFixed(1)}px,0) rotate(${r}deg) scale(${(0.93+.07*local).toFixed(3)})`;
    });
  }
  // Chapter wipe uses the section's own naturally changing viewport position.
  // No scroll locking, wheel interception, pinned proxy scroll, or forced duration.
  function onChapterScroll(){
    if (compact.matches || reduced.matches) return;
    const height=Math.max(innerHeight,1);
    chapters.forEach((ch,i)=>{
      const rect=ch.getBoundingClientRect();
      if (i>0) ch.style.setProperty('--chapter-wipe',clamp(rect.top/height).toFixed(4));
      const prog=clamp((height-rect.top)/height);
      ch.style.setProperty('--chapter-zoom',(1.028+0.025*prog).toFixed(4));
    });
  }
  function requestScrollTick(){
    if (scrollTick) return;
    scrollTick=true;
    requestAnimationFrame(()=>{onScroll();onChapterScroll();});
  }
  const motionState=()=>{
    document.documentElement.classList.toggle('has-motion', !reduced.matches && !compact.matches);
    frames.forEach(f=>{if(reduced.matches || compact.matches){f.removeAttribute('style');}});
    chapters.forEach(ch=>{if(reduced.matches || compact.matches){ch.style.removeProperty('--chapter-wipe');ch.style.removeProperty('--chapter-zoom');}});
    syncVideo(); requestScrollTick();
  };
  addEventListener('scroll', requestScrollTick, {passive:true});
  addEventListener('resize', requestScrollTick, {passive:true});
  reduced.addEventListener('change',motionState);
  compact.addEventListener('change',motionState);
  document.addEventListener('visibilitychange',()=>{if(document.hidden)introFilm?.pause();else syncVideo();});
  // The selector reflects the chapter in view, but never steals focus or changes navigation itself.
  if ('IntersectionObserver' in window && jump) {
    const observer=new IntersectionObserver(entries=>{
      for(const e of entries){if(e.isIntersecting) jump.value=e.target.id;}
    },{rootMargin:'-35% 0px -35% 0px',threshold:0});
    chapters.forEach(ch=>observer.observe(ch));
  }
  motionState();
})();
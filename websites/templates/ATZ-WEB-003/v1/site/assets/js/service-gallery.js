/* ATREZZO / McBride — Services Overview scroll narrative.
   Cards enter once from right on mobile. Images gently zoom with real scroll.
   No pinning, wheel interception, forced scrolling or request for user input. */
(() => {
  const gallery=document.querySelector('html[data-page="services"] [data-at-gallery-grid]');
  if(!gallery || !window.matchMedia) return;
  const cards=Array.from(gallery.querySelectorAll('[data-at-gallery-card]'));
  if(cards.length!==6)return;
  const mobile=window.matchMedia('(max-width: 767px)');
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
  if(typeof IntersectionObserver!=='function'||typeof requestAnimationFrame!=='function') return;
  const motionAllowed=()=>mobile.matches&&!reduced.matches;
  const visible=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(!entry.isIntersecting)return;
      entry.target.classList.add('is-visible');
      visible.unobserve(entry.target);
    });
  },{threshold:0.06,rootMargin:'0px 0px 65px 0px'});
  const photos=cards.map(card=>({frame:card.querySelector('.at-gallery-media'),photo:card.querySelector('.at-gallery-media img')}));
  let framePending=false;
  const refreshZoom=()=>{
    framePending=false;
    if(!mobile.matches||reduced.matches)return;
    const vh=Math.max(1,window.innerHeight);
    photos.forEach(({frame,photo})=>{
      if(!frame||!photo)return;
      const rect=frame.getBoundingClientRect();
      if(rect.bottom < -60||rect.top > vh+60)return;
      const p=Math.max(0,Math.min(1,(vh-rect.top)/(vh+rect.height)));
      // Scale changes only as the photo travels through the viewport: 1.025 to 1.125.
      photo.style.setProperty('--at-gallery-scroll-zoom',(1.025+0.10*p).toFixed(4));
    });
  };
  const schedule=()=>{
    if(framePending)return;
    framePending=true;
    requestAnimationFrame(refreshZoom);
  };
  const syncMode=()=>{
    const enabled=motionAllowed();
    gallery.classList.toggle('at-gallery-motion-ready',enabled);
    if(enabled){
      cards.forEach(card=>{
        if(card.classList.contains('is-visible'))return;
        const bounds=card.getBoundingClientRect();
        if(bounds.top < innerHeight - 30)card.classList.add('is-visible');
        else visible.observe(card);
      });
      schedule();
    }else{
      photos.forEach(({photo})=>photo?.style.removeProperty('--at-gallery-scroll-zoom'));
    }
  };
  window.addEventListener('scroll',schedule,{passive:true});
  window.addEventListener('resize',schedule,{passive:true});
  mobile.addEventListener?.('change',syncMode);
  reduced.addEventListener?.('change',syncMode);
  syncMode();
})();

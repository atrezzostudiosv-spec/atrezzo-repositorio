/* ATREZZO / Unified booking ribbon, scroll-aware internal navigation,
   and accessible Treatments disclosure. No Unicode pictograms or emoji. */
(()=>{'use strict';
  const d=document;
  const booking=new URL('../../contact/',document.currentScript.src).href;
  const header=d.querySelector('.glass-header,.site-header');
  d.querySelectorAll('.em-mobile-booking,.em-booking-ribbon').forEach(el=>el.remove());
  const ribbon=d.createElement('div');
  ribbon.className='em-booking-ribbon';
  ribbon.setAttribute('role','region');
  ribbon.setAttribute('aria-label','Appointment options');
  ribbon.innerHTML='<div class="em-booking-ribbon__message"><span class="em-booking-ribbon__overline">WELLNESS STUDIO</span><span class="em-booking-ribbon__headline">Make time for yourself.</span></div><div class="em-booking-ribbon__actions"><a class="em-booking-ribbon__secondary" href="'+booking+'">Contact</a><a class="em-booking-ribbon__primary" href="'+booking+'" target="_blank" rel="noopener noreferrer">Booking Demo</a></div>';
  d.body.appendChild(ribbon);
  if(header?.classList.contains('site-header')){
    const btn=header.querySelector('.toggle');
    const nav=header.querySelector('.navigation');
    d.addEventListener('pointerdown',e=>{
      if(!header.contains(e.target)&&header.classList.contains('menu-open')){
        header.classList.remove('menu-open');
        btn?.setAttribute('aria-expanded','false');
      }
    },{passive:true});
    btn?.addEventListener('click',()=>{
      btn.setAttribute('aria-label',btn.getAttribute('aria-expanded')==='true'?'Close navigation':'Open navigation');
      header.classList.remove('em-header-hidden');
    });
    d.addEventListener('keydown',e=>{
      if(e.key==='Escape'&&nav?.contains(d.activeElement))btn?.focus();
    });
    let lastY=Math.max(0,scrollY),travel=0,direction=0,queued=false;
    const expanded=()=>header.classList.contains('menu-open')||btn?.getAttribute('aria-expanded')==='true'||!!header.querySelector('.treatments-menu[open]');
    const hoverCapable=matchMedia('(hover:hover) and (pointer:fine)');
    const interacting=()=>expanded()||header.matches(':focus-within')||(hoverCapable.matches&&header.matches(':hover'));
    function update(){
      queued=false;
      const y=Math.max(0,scrollY),delta=y-lastY;
      lastY=y;
      if(y<110||interacting()){travel=0;direction=0;header.classList.remove('em-header-hidden');return;}
      if(Math.abs(delta)<1)return;
      const next=Math.sign(delta);
      if(next!==direction){direction=next;travel=0;}
      travel+=Math.abs(delta);
      if(direction>0&&y>150&&travel>=26){header.classList.add('em-header-hidden');travel=0;}
      if(direction<0&&travel>=12){header.classList.remove('em-header-hidden');travel=0;}
    }
    addEventListener('scroll',()=>{if(!queued){queued=true;requestAnimationFrame(update)}},{passive:true});
    addEventListener('pageshow',()=>{lastY=Math.max(0,scrollY);travel=0;header.classList.remove('em-header-hidden')});
    header.addEventListener('focusin',()=>header.classList.remove('em-header-hidden'));
    header.addEventListener('pointerenter',()=>header.classList.remove('em-header-hidden'));
  }
})();
(()=>{
  'use strict';
  const d=document;
  const desktop=matchMedia('(min-width:871px)');
  const header=d.querySelector('.glass-header,.site-header');
  const details=d.querySelector('.treatments-menu');
  if(!details||!header)return;
  const summary=details.querySelector('summary');
  const primaryToggle=header.querySelector('.menu-toggle,.toggle');
  const mobileNav=header.querySelector('.main-nav,.navigation');
  const close=()=>{details.open=false};
  let hoverExitTimer=0;
  const cancelHoverExit=()=>{if(hoverExitTimer){clearTimeout(hoverExitTimer);hoverExitTimer=0}};
  details.addEventListener('pointerenter',e=>{if(desktop.matches&&e.pointerType!=='touch'){cancelHoverExit();details.open=true}});
  details.addEventListener('pointerleave',e=>{
    if(desktop.matches&&e.pointerType!=='touch'){
      cancelHoverExit();hoverExitTimer=setTimeout(()=>{
        hoverExitTimer=0;
        if(!details.matches(':hover')&&!details.contains(d.activeElement))close();
      },200);
    }
  });
  summary.addEventListener('click',e=>{if(desktop.matches){e.preventDefault();details.open=true}});
  details.addEventListener('focusout',()=>{
    if(desktop.matches)requestAnimationFrame(()=>{
      if(!details.contains(d.activeElement)&&!details.matches(':hover'))close();
    });
  });
  d.addEventListener('keydown',e=>{if(e.key==='Escape'&&details.open){close();if(details.contains(d.activeElement))summary.focus()}});
  d.addEventListener('pointerdown',e=>{if(!details.contains(e.target)&&details.open)close()},{passive:true});
  mobileNav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',close));
  primaryToggle?.addEventListener('click',()=>{if(primaryToggle.getAttribute('aria-expanded')==='false')close()});
  desktop.addEventListener?.('change',close);
})();

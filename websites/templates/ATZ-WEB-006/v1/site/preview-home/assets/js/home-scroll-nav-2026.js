/* ATREZZO / Home scroll-aware navigation.
   Only the floating Home header, never internal pages or sticky booking dock.
   Native scroll stays untouched; menu/focus prevent accidental disappearing. */
(()=>{'use strict';
  if(!document.body.classList.contains('touch-home'))return;
  const header=document.querySelector('.glass-header');
  if(!header)return;
  const mq=window.matchMedia('(prefers-reduced-motion: reduce)');
  let lastY=Math.max(0,window.scrollY);
  let accumulated=0;
  let direction=0;
  let ticking=false;
  const openMenu=()=>header.querySelector('#main-nav[data-open="true"],.treatments-menu[open]')!==null;
  const interacting=()=>openMenu()||header.contains(document.activeElement);
  function reveal(){header.classList.remove('em-home-header-hidden');}
  function update(){
    ticking=false;
    const y=Math.max(0,window.scrollY);
    const delta=y-lastY;
    lastY=y;
    if(y<110||interacting()){accumulated=0;direction=0;reveal();return;}
    if(Math.abs(delta)<1)return;
    const nextDirection=Math.sign(delta);
    if(nextDirection!==direction){direction=nextDirection;accumulated=0;}
    accumulated+=Math.abs(delta);
    if(direction>0&&y>150&&accumulated>=24){
      header.classList.add('em-home-header-hidden');accumulated=0;
    }else if(direction<0&&accumulated>=12){
      reveal();accumulated=0;
    }
  }
  function onScroll(){if(!ticking){ticking=true;requestAnimationFrame(update);}}
  window.addEventListener('scroll',onScroll,{passive:true});
  header.addEventListener('focusin',reveal);
  header.addEventListener('pointerenter',reveal);
  header.querySelector('.menu-toggle')?.addEventListener('click',reveal);
  header.querySelector('.treatments-menu')?.addEventListener('toggle',()=>{if(openMenu())reveal()});
  window.addEventListener('pageshow',()=>{
    lastY=Math.max(0,window.scrollY);
    accumulated=0;direction=0;reveal();
  });
  // Avoid hiding the menu because scrolling is animated/programmatic; the
  // accumulated-direction threshold naturally resets at every reversal.
  window.addEventListener('pagehide',()=>window.removeEventListener('scroll',onScroll),{once:true});
})();

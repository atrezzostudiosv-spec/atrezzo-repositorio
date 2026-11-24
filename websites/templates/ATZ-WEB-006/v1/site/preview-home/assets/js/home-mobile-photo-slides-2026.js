/* Elegant Massage — mobile-only photographic chapters.
 * Native scroll, no wheel/touch interception. Desktop Codrops masks untouched. */
(()=>{
 'use strict';
 if(!document.body.classList.contains('touch-home'))return;
 const root=document.documentElement;
 const track=document.querySelector('#cinema-track');
 const stage=track?.querySelector('.at-mask-stage');
 const chapters=stage?[...stage.querySelectorAll(':scope > .chapter')]:[];
 const phone=matchMedia('(max-width:870px)');
 const small=matchMedia('(max-width:870px) and (min-height:540px) and (prefers-reduced-motion:no-preference)');
 const grid=document.querySelector('#atrezzo-original-grid');
 if(!track||!stage||chapters.length!==5)return;
 let queued=false;
 const clamp=n=>Math.max(0,Math.min(1,n));
 const active=()=>small.matches;
 function update(){
   queued=false;
   if(grid){grid.hidden=phone.matches;grid.setAttribute('aria-hidden',String(phone.matches));}
   const enabled=active();
   root.classList.toggle('em-mobile-photo-slides',enabled);
   chapters.forEach((ch,i)=>{
     if(!enabled){
       ch.style.removeProperty('--em-mobile-slide-wipe');
       ch.style.removeProperty('--em-mobile-slide-zoom');
       return;
     }
     const rect=ch.getBoundingClientRect(),height=Math.max(1,innerHeight);
     // Enter from the bottom into the previous full-bleed photograph.
     if(i>0)ch.style.setProperty('--em-mobile-slide-wipe',clamp(rect.top/height).toFixed(4));
     const scale=1.012+clamp((height-rect.top)/height)*.027;
     ch.style.setProperty('--em-mobile-slide-zoom',scale.toFixed(4));
   });
 }
 function schedule(){if(!queued){queued=true;requestAnimationFrame(update)}}
 addEventListener('scroll',schedule,{passive:true});
 addEventListener('resize',schedule,{passive:true});
 addEventListener('pageshow',schedule);
 small.addEventListener?.('change',schedule);
 phone.addEventListener?.('change',schedule);
 schedule();
})();

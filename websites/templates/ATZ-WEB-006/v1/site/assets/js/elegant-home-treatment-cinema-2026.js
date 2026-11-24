/* ATREZZO — Elegant Massage / responsive treatment cinema.
   Matches the approved Thaissage storytelling system:
   one full-screen sticky scene, native scroll, 68% hold + soft transition.
   Desktop/tablet: photographic crossfade. Mobile: slide enters from right.
   The original Elegant Massage photographs, copy and booking URLs are reused.
   No scroll interception, external dependency, emojis, or new claims. */
(()=>{
 'use strict';
 const section=document.getElementById('find-your-massage');
 const track=document.getElementById('cinema-track');
 const stage=document.getElementById('atrezzo-mask-stage');
 if(!section||!track||!stage)return;
 const chapters=[...stage.querySelectorAll(':scope > .chapter')];
 if(chapters.length!==5)return;
 const opening=stage.querySelector(':scope > .treatments__opening');
 const mobile=matchMedia('(max-width:870px)');
 const motion=matchMedia('(min-height:560px) and (prefers-reduced-motion:no-preference)');
 const grid=document.getElementById('atrezzo-original-grid');
 const clamp=n=>Math.max(0,Math.min(1,n));
 const ease=n=>{const v=clamp(n);return v*v*(3-2*v)};
 const labels=['Body Massage','Foot & Back','Couples Massage','Chair & Thai','Four Hands'];
 /* Portrait assets supplied by the owner. Preload before swapping so a pending
    upload or failed request never produces a broken photo in the live slider.
    Image URLs resolve from this JS file on root and /preview-home/ equally. */
 const portraitFiles=[
   'mobile-slide-01-body-massage.webp',
   'mobile-slide-02-foot-back.webp',
   'mobile-slide-03-couples-massage.webp',
   'mobile-slide-04-chair-massage.webp',
   'mobile-slide-05-four-hands.webp'
 ];
 const imageBase=new URL('../../preview-home/assets/images/home-2026/',document.currentScript?.src || location.href);
 const originals=chapters.map(ch=>{
   const picture=ch.querySelector('.chapter__image');
   const img=picture?.querySelector('img');
   const source=picture?.querySelector('source');
   return {ch,img,source,
     imgSrc:img?.getAttribute('src')||'',
     srcset:source?.getAttribute('srcset')||'',
     media:source?.getAttribute('media')||''};
 });
 const available=new Map();
 let requestVersion=0;
 function updatePortraits(){
   const version=++requestVersion;
   if(!mobile.matches){
     originals.forEach(({ch,img,source,imgSrc,srcset,media})=>{
       if(img)img.setAttribute('src',imgSrc);
       if(source){
         source.setAttribute('srcset',srcset);
         source.setAttribute('media',media);
       }
       ch.style.removeProperty('--em-focus-x');
       ch.style.removeProperty('--em-focus-y');
     });
     return;
   }
   originals.forEach(({ch,img,source},i)=>{
     if(!img)return;
     const url=new URL(portraitFiles[i],imageBase).href+'?v=20261109-mobile5';
     const apply=()=>{
       if(version!==requestVersion||!mobile.matches)return;
       // Set both picture source and img for correct behavior on Safari iOS.
       if(source){source.setAttribute('media','(max-width: 870px)');source.setAttribute('srcset',url);}
       img.src=url;
       ch.style.setProperty('--em-focus-x','50%');
       ch.style.setProperty('--em-focus-y','50%');
     };
     if(available.get(url)===true){apply();return;}
     const preloader=new Image();
     preloader.onload=()=>{available.set(url,true);apply();};
     preloader.onerror=()=>{available.set(url,false);}; // retain original
     preloader.src=url;
   });
 }
 mobile.addEventListener?.('change',updatePortraits);
 updatePortraits();

 let chrome,buttons=[],active=-1,raf=0,enabled=false;
 if(opening){section.insertBefore(opening,track);}
 function createChrome(){
   if(chrome)return;
   chrome=document.createElement('div');
   chrome.className='em-treatment-chrome';
   chrome.setAttribute('aria-label','Treatment slide navigation');
   const top=document.createElement('div');
   top.className='em-treatment-chrome__top';
   const counter=document.createElement('span');
   counter.className='em-treatment-chrome__counter';
   counter.textContent='01 / 05';
   top.append(counter);
   const nav=document.createElement('nav');
   nav.className='em-treatment-chrome__nav';
   nav.setAttribute('aria-label','Choose a massage treatment');
   labels.forEach((name,i)=>{
     const button=document.createElement('button');
     button.type='button';
     button.className='em-treatment-chrome__button';
     button.textContent=name;
     button.setAttribute('aria-label','Show '+name);
     button.setAttribute('aria-current',i===0?'step':'false');
     button.addEventListener('click',()=>{
       const top=window.scrollY+track.getBoundingClientRect().top;
       const distance=Math.max(1,track.offsetHeight-stage.offsetHeight);
       const fraction=(i+.12)/chapters.length;
       window.scrollTo({top:top+distance*fraction,behavior:'instant'});
       schedule();
     });
     nav.append(button);buttons.push(button);
   });
   chrome.append(top,nav);stage.append(chrome);
 }
 function clear(){
   document.documentElement.classList.remove('em-cinema-ready');
   chapters.forEach(ch=>{
     ch.inert=false;
     ch.removeAttribute('aria-hidden');
     ch.style.removeProperty('opacity');
     ch.style.removeProperty('transform');
     ch.style.removeProperty('z-index');
     ch.style.removeProperty('--em-cinema-zoom');
     ch.style.removeProperty('pointer-events');
   });
   chrome?.remove();chrome=null;buttons=[];active=-1;
 }
 function paint(){
   raf=0;
   if(grid){
     grid.hidden=mobile.matches;
     grid.setAttribute('aria-hidden',String(mobile.matches));
   }
   const shouldRun=motion.matches;
   if(!shouldRun){if(enabled){enabled=false;clear();}return;}
   if(!enabled){enabled=true;createChrome();document.documentElement.classList.add('em-cinema-ready');}
   if(document.hidden)return;
   const distance=Math.max(1,track.offsetHeight-stage.offsetHeight);
   const progress=clamp(-track.getBoundingClientRect().top/distance);
   const position=Math.min(chapters.length-0.000001,progress*chapters.length);
   const index=Math.min(chapters.length-1,Math.floor(position));
   const local=clamp(position-index);
   // The first 68% of each scroll chapter is held completely still and legible.
   // The remaining 32% introduces the next photograph. The last slide holds
   // until its scroll track releases into the next Home section.
   const incoming=index===chapters.length-1?0:ease((local-.68)/.32);
   const selected=incoming>=.60?Math.min(index+1,chapters.length-1):index;
   if(selected!==active){
     active=selected;
     const counter=chrome?.querySelector('.em-treatment-chrome__counter');
     if(counter)counter.textContent=String(selected+1).padStart(2,'0')+' / 05';
     buttons.forEach((b,i)=>b.setAttribute('aria-current',i===selected?'step':'false'));
   }
   chapters.forEach((ch,i)=>{
     const current=i===index,arriving=i===index+1&&index<chapters.length-1;
     const visible=current||arriving;
     const op=current?(mobile.matches?1:1-incoming):arriving?incoming:0;
     ch.style.opacity=String(op);
     ch.style.zIndex=arriving?'2':current?'1':'0';
     // On phones the next slide moves horizontally, as in Thaissage.
     ch.style.transform=mobile.matches&&arriving
       ?'translate3d('+((1-incoming)*100).toFixed(3)+'%,0,0)'
       :'translate3d(0,0,0)';
     const zoom=1.025+.055*ease(current?local:0);
     ch.style.setProperty('--em-cinema-zoom',zoom.toFixed(4));
     const interactive=i===selected;
     ch.inert=!interactive;
     ch.setAttribute('aria-hidden',String(!interactive));
     ch.style.pointerEvents=interactive?'auto':'none';
   });
   buttons.forEach((b,i)=>b.style.setProperty('--em-progress',
     String(i<index?1:i===index?local:0)));
 }
 function schedule(){if(!raf)raf=requestAnimationFrame(paint)}
 addEventListener('scroll',schedule,{passive:true});
 addEventListener('resize',schedule,{passive:true});
 addEventListener('pageshow',schedule);
 document.addEventListener('visibilitychange',schedule);
 mobile.addEventListener?.('change',schedule);
 motion.addEventListener?.('change',schedule);
 schedule();
})();

/* ATREZZO — ELEGANT MASSAGE
 * Three cinematic chapters in native scroll (descending replacement scenes).
 * 0–27%   Body photo slowly zooms as the first scene is held.
 * 27–35%  Foot scene drops from the top over the first.
 * 35–61%  Foot zoom holds.
 * 61–69%  Combination drops from the top.
 * 69–100% Single Combination photo keeps zooming until section exits.
 * Mobile/reduced-motion/no-JS: three normal-flow full-bleed scenes.
 * Does not capture wheel/touch/keyboard or freeze the browser scrollbar.
 */
(() => {
 'use strict';
 const root=document.getElementById('treatments-cinema');
 if (!root) return;
 const stage=root.querySelector('.em-cinema__stage');
 const scenes=[...stage.querySelectorAll(':scope > .em-treatment-feature')];
 const bars=[...stage.querySelectorAll('.em-cinema__bars span')];
 const counter=stage.querySelector('.em-cinema__counter');
 if(scenes.length!==3) return;
 const media=window.matchMedia('(min-width:1024px) and (min-height:650px) and (prefers-reduced-motion:no-preference)');
 const clamp=v=>Math.min(1,Math.max(0,v));
 const ease=v=>{v=clamp(v);return v*v*(3-2*v)};
 const ratio=(value,a,b)=>clamp((value-a)/(b-a));
 let active=false,frame=0,lastCurrent=-1;
 function setA11y(current){
   if(current===lastCurrent) return;
   lastCurrent=current;
   scenes.forEach((panel,index)=>{
     const isCurrent=index===current;
     panel.classList.toggle('is-current',isCurrent);
     const focused=panel.contains(document.activeElement);
     panel.inert=!isCurrent&&!focused;
     panel.setAttribute('aria-hidden',String(!isCurrent&&!focused));
   });
   bars.forEach((bar,index)=>bar.classList.toggle('is-on',index===current));
   if(counter)counter.textContent=String(current+1).padStart(2,'0')+' / 03';
 }
 function paint(){
   frame=0;
   if(!active||document.hidden) return;
   const rect=root.getBoundingClientRect();
   const distance=Math.max(1,root.offsetHeight-stage.offsetHeight);
   const progress=clamp(-rect.top/distance);
   // The two full-viewport layers physically DROP from above.
   const drop2=ease(ratio(progress,.27,.35));
   const drop3=ease(ratio(progress,.61,.69));
   const offsets=[0,-100*(1-drop2),-100*(1-drop3)];
   const zooms=[
     1.018+.062*ease(ratio(progress,0,.27)),
     1.018+.062*ease(ratio(progress,.35,.61)),
     1.018+.094*ease(ratio(progress,.69,1))
   ];
   const entry=[1,drop2,drop3];
   const visible=progress<.31?0:progress<.65?1:2;
   setA11y(visible);
   scenes.forEach((panel,index)=>{
     panel.style.setProperty('--em-slide',offsets[index].toFixed(3)+'%');
     panel.style.setProperty('--em-zoom',zooms[index].toFixed(4));
     panel.style.setProperty('--em-copy-opacity',String(index===0?1:Math.max(.07,entry[index]).toFixed(3)));
     panel.style.setProperty('--em-copy-y',(index===0?0:(1-entry[index])*19).toFixed(2)+'px');
   });
 }
 function tick(){if(!frame&&active)frame=requestAnimationFrame(paint)}
 function reset(){
   active=false;lastCurrent=-1;
   if(frame)cancelAnimationFrame(frame);
   frame=0;
   root.classList.remove('is-immersive');
   for(const panel of scenes){
     panel.inert=false;panel.removeAttribute('aria-hidden');
     panel.classList.remove('is-current');
     for(const key of ['--em-slide','--em-zoom','--em-copy-opacity','--em-copy-y'])
       panel.style.removeProperty(key);
   }
 }
 function setup(){
   reset();
   if(!media.matches) return;
   active=true;
   root.classList.add('is-immersive');
   paint();
 }
 window.addEventListener('scroll',tick,{passive:true});
 window.addEventListener('resize',tick,{passive:true});
 media.addEventListener?.('change',setup);
 document.addEventListener('visibilitychange',tick);
 setup();
})();

function initCollection(){
 const track=$('[data-collection-track]'),stage=$('[data-collection-stage]');
 if(!track||!stage)return;
 const section=track.closest('.collection-section');
 const panels=$$('[data-collection-panel]',track);
 const tabs=$$('[data-collection-tab]',track);
 const counter=$('[data-collection-counter]',track);
 const propertyLink=$('[data-collection-property-link]',stage);
 if(!section||!panels.length||panels.length!==tabs.length)return;
 const media=matchMedia('(min-height:700px) and (prefers-reduced-motion:no-preference)');
 const clamp=x=>Math.min(1,Math.max(0,x));
 const ease=x=>{const n=clamp(x);return n*n*(3-2*n);};
 let raf=0,active=-1;
 function paint(index,local,blend){
  const selected=blend>=.5?Math.min(panels.length-1,index+1):index;
  if(selected!==active){
   active=selected;
   counter.textContent=String(selected+1).padStart(2,'0')+' / '+String(panels.length).padStart(2,'0');
   // Keep the one visible CTA, anchored at the bottom left, synchronized
   // with the active property. Do not render any duplicate right-side button.
   const selectedPanel=panels[selected];
   if(propertyLink&&selectedPanel.dataset.collectionPropertyUrl){
    propertyLink.href=selectedPanel.dataset.collectionPropertyUrl;
    propertyLink.setAttribute('aria-label','Discover '+(selectedPanel.dataset.collectionPropertyTitle||'this home'));
   }
   tabs.forEach((tab,i)=>{tab.setAttribute('aria-selected',String(i===selected));tab.setAttribute('aria-current',i===selected?'step':'false');tab.tabIndex=i===selected?0:-1;});
   panels.forEach((panel,i)=>{const visible=i===selected;panel.inert=!visible;panel.setAttribute('aria-hidden',String(!visible));panel.style.pointerEvents=visible?'auto':'none';});
  }
  panels.forEach((panel,i)=>{
   let opacity=0,within=0;
   if(i===index){opacity=1-blend;within=local;}
   if(i===index+1&&index<panels.length-1){opacity=blend;within=0;}
   if(index===panels.length-1&&i===index){opacity=1;within=local;}
   panel.style.opacity=String(clamp(opacity));
   const photo=panel.querySelector('.collection-photo');
   if(photo&&opacity>.003){
    const scale=1.025+ease(within)*(i===panels.length-1?.060:.052);
    photo.style.transform='scale('+scale.toFixed(4)+')';
   }
  });
  tabs.forEach((tab,i)=>tab.style.setProperty('--chapter-fill',String(i<index?1:i===index?local:0)));
 }
 function update(){
  raf=0;if(!media.matches||document.hidden)return;
  const rect=track.getBoundingClientRect();
  if(rect.top>innerHeight||rect.bottom<0)return;
  const distance=Math.max(1,track.offsetHeight-stage.offsetHeight);
  const progress=clamp(-rect.top/distance);
  const position=Math.min(panels.length-0.000001,progress*panels.length);
  const index=Math.min(panels.length-1,Math.floor(position));
  const local=clamp(position-index);
  const blend=index===panels.length-1?0:ease((local-.68)/.30);
  paint(index,local,blend);
 }
 function schedule(){if(!raf)raf=requestAnimationFrame(update);}
 function goTo(index){
  if(!media.matches){panels[index]?.scrollIntoView({behavior:'instant',block:'start'});return;}
  const top=track.getBoundingClientRect().top+window.scrollY;
  const distance=Math.max(1,track.offsetHeight-stage.offsetHeight);
  const offset=((index+.16)/panels.length)*distance;
  window.scrollTo({top:top+offset,behavior:'instant'});
  schedule();
 }
 tabs.forEach((tab,i)=>{
  tab.addEventListener('click',()=>goTo(i));
  tab.addEventListener('keydown',event=>{
   let next;
   if(event.key==='ArrowRight')next=(i+1)%tabs.length;
   else if(event.key==='ArrowLeft')next=(i-1+tabs.length)%tabs.length;
   else if(event.key==='Home')next=0;
   else if(event.key==='End')next=tabs.length-1;
   else return;
   event.preventDefault();goTo(next);tabs[next].focus({preventScroll:true});
  });
 });
 function reconcile(){
  const enabled=media.matches;
  section.classList.toggle('is-cinema-active',enabled);
  if(!enabled){
   active=-1;
   panels.forEach(p=>{p.inert=false;p.setAttribute('aria-hidden','false');p.style.opacity='';p.style.pointerEvents='';p.querySelector('.collection-photo')?.style.removeProperty('transform');});
   tabs.forEach(t=>t.style.removeProperty('--chapter-fill'));
  }else{active=-1;paint(0,0,0);schedule();}
 }
 addEventListener('scroll',schedule,{passive:true});
 addEventListener('resize',schedule,{passive:true});
 addEventListener('pageshow',schedule);
 document.addEventListener('visibilitychange',schedule);
 media.addEventListener('change',reconcile);
 reconcile();
}

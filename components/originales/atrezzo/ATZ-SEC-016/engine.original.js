// Literal source functions: Team-Hodnett/public/src/ui.js and luxury.js @ 98d354c5b1349d1457af0f1cbc5d12256a011f1b
function initHeader(){
 const header=$('.site-header');if(!header)return;
 const dropdowns=$$('details[data-header-nav]',header);
 const hoverMedia=matchMedia('(hover:hover) and (pointer:fine)');
 let previous=Math.max(0,window.scrollY),frame=false,hidden=false,directionTravel=0;
 const syncHeaderHeight=()=>document.documentElement.style.setProperty('--catalog-header-height',header.offsetHeight+'px');
 const closeDropdowns=(except=null)=>dropdowns.forEach(item=>{if(item!==except)item.open=false;});
 const show=()=>{
  if(!hidden)return;
  hidden=false;header.classList.remove('is-hidden');
  document.body.classList.remove('has-hidden-header');header.inert=false;
 };
 const hide=()=>{
  // Closing an opened menu is essential: an old focused menu should never keep
  // the global header visible or prevent the Selected Homes scroll controller.
  if(hidden)return;
  closeDropdowns();
  hidden=true;header.classList.add('is-hidden');
  document.body.classList.add('has-hidden-header');header.inert=true;
 };
 document.body.classList.remove('has-hidden-header');
 header.classList.remove('is-hidden');
 header.inert=false;syncHeaderHeight();
 dropdowns.forEach(item=>{
  const summary=item.querySelector('summary');
  // Desktop: mouse enters → immediately open; mouse leaves → immediately close.
  // The entire <details>, including its absolutely-positioned panel, is the
  // hover region, so moving from the label into links does not close it.
  item.addEventListener('pointerenter',event=>{
   if(!hoverMedia.matches||event.pointerType==='touch')return;
   closeDropdowns(item);item.open=true;show();
  });
  item.addEventListener('pointerleave',event=>{
   if(!hoverMedia.matches||event.pointerType==='touch')return;
   item.open=false;
   if(document.activeElement===summary)summary.blur();
  });
  // Keep keyboard/touch activation native. An ordinary desktop mouse click
  // must not toggle shut a dropdown that is already opened by hover.
  summary?.addEventListener('click',event=>{
   if(!hoverMedia.matches||event.detail===0)return;
   event.preventDefault();closeDropdowns(item);item.open=true;show();
  });
  item.addEventListener('toggle',()=>{
   if(item.open){closeDropdowns(item);show();}
  });
  item.addEventListener('click',event=>{
   if(event.target.closest('a'))item.open=false;
  });
 });
 function update(){
  frame=false;
  const current=Math.max(0,window.scrollY),delta=current-previous;
  header.classList.toggle('is-scrolled',current>65);
  syncHeaderHeight();
  // Sum fine trackpad/wheel increments. A single scroll frame can be 1-4px,
  // so instantaneous delta thresholds must not leave the header stuck open.
  if(delta>0)directionTravel=Math.max(0,directionTravel)+delta;
  else if(delta<0)directionTravel=Math.min(0,directionTravel)+delta;
  if(current<Math.max(130,header.offsetHeight+28)){
   directionTravel=0;closeDropdowns();show();
  }else if(directionTravel>=18&&!document.querySelector('dialog[open]')){
   // Downward scroll always closes menus and hides navigation, even after focus.
   hide();directionTravel=0;
  }else if(directionTravel<=-12){
   show();directionTravel=0;
  }
  previous=current;
 }
 const schedule=()=>{if(!frame){frame=true;requestAnimationFrame(update);}};
 addEventListener('scroll',schedule,{passive:true});
 addEventListener('resize',()=>{
  closeDropdowns();directionTravel=0;syncHeaderHeight();show();previous=window.scrollY;schedule();
 },{passive:true});
 addEventListener('pageshow',()=>{
  closeDropdowns();directionTravel=0;show();previous=window.scrollY;schedule();
 });
 document.addEventListener('pointerdown',event=>{
  if(!event.target.closest('.site-header details[data-header-nav]'))closeDropdowns();
 });
 document.addEventListener('keydown',event=>{
  if(event.key!=='Escape')return;
  const current=dropdowns.find(item=>item.open);
  if(current){
   closeDropdowns();current.querySelector('summary')?.focus();
   event.preventDefault();
  }
 });
 header.addEventListener('focusin',show);
 update();
}

function initFilm(){
  const video=$('[data-hero-video]'),button=$('[data-hero-video-toggle]');if(!video||!button)return;
  const media=matchMedia('(prefers-reduced-motion: reduce)');let manualPause=false;
  const reduced=()=>media.matches||document.body.classList.contains('reduced-motion');
  const paint=()=>{if(reduced()){button.disabled=true;button.textContent='Motion reduced';button.setAttribute('aria-label','Background film paused for reduced motion');return;}button.disabled=false;button.innerHTML=video.paused?'Play film <span aria-hidden="true">▷</span>':'Pause film <span aria-hidden="true">Ⅱ</span>';button.setAttribute('aria-label',video.paused?'Play background film':'Pause background film');};
  const play=()=>{video.play().then(paint).catch(paint);};
  const sync=()=>{if(reduced()||manualPause||document.hidden)video.pause();else play();paint();};
  button.addEventListener('click',()=>{if(video.paused){manualPause=false;play();}else{manualPause=true;video.pause();}paint();});
  video.addEventListener('play',paint);video.addEventListener('pause',paint);media.addEventListener('change',sync);document.addEventListener('visibilitychange',sync);
  new MutationObserver(sync).observe(document.body,{attributes:true,attributeFilter:['class']});
  // Stop decoding the background film once the hero leaves the viewport.
  const visibility=new IntersectionObserver(entries=>{if(!entries[0].isIntersecting)video.pause();else sync();},{threshold:0});visibility.observe(video);
  sync();
 }

function openDialog(id){const dialog=document.getElementById(id);if(!dialog)return;$$('dialog[open]').filter(d=>d!==dialog).forEach(d=>d.close());if(id==='favorites-dialog')renderFavorites();if(id==='account-dialog')renderProfile();if(!dialog.open)dialog.showModal();document.body.style.overflow='hidden';}
function closeDialog(dialog){dialog?.close();if(!document.querySelector('dialog[open]'))document.body.style.overflow='';}

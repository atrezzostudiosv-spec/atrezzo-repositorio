/* ATREZZO · Elegant Massage Body scroll narration
   Derived from the supplied Guided Service Atlas interaction model:
   native scroll + current section detection + photograph crossfade.
   Dialog interaction adapted to native <dialog> for accessible focus/Escape. */
(()=>{'use strict';
  const d=document;
  const root=d.querySelector('.em-body');
  if(!root)return;
  const journey=root.querySelector('[data-em-journey]');
  const chapters=[...journey.querySelectorAll('[data-em-journey-chapter]')];
  const cta=root.querySelector('[data-em-body-cta]');
  const photo=cta.querySelector('.em-body-cta__photo');
  const reduce=matchMedia('(prefers-reduced-motion: reduce)');
  const desktop=matchMedia('(min-width: 871px) and (min-height: 650px)');
  const clamp=n=>Math.max(0,Math.min(1,n));
  let queued=false;
  function update(){
    queued=false;
    const cinematic=desktop.matches&&!reduce.matches;
    journey.classList.toggle('is-cinematic',cinematic);
    chapters.forEach((chapter,i)=>{
      if(!cinematic){chapter.style.removeProperty('--em-slide-wipe');chapter.style.removeProperty('--em-slide-zoom');return}
      const rect=chapter.getBoundingClientRect();
      if(i>0)chapter.style.setProperty('--em-slide-wipe',clamp(rect.top/Math.max(1,innerHeight)).toFixed(4));
      const progress=clamp((innerHeight-rect.top)/Math.max(1,innerHeight));
      chapter.style.setProperty('--em-slide-zoom',(1.025+progress*.025).toFixed(4));
    });
    if(cinematic){
      const r=cta.getBoundingClientRect();
      if(r.bottom>=0&&r.top<=innerHeight){const distance=Math.max(1,r.height-innerHeight);photo.style.setProperty('--em-body-cta-zoom',(1.025+clamp(-r.top/distance)*.055).toFixed(4))}
    }else photo.style.removeProperty('--em-body-cta-zoom');
  }
  function schedule(){if(!queued){queued=true;requestAnimationFrame(update)}}
  addEventListener('scroll',schedule,{passive:true});
  addEventListener('resize',schedule,{passive:true});
  addEventListener('pageshow',schedule);
  reduce.addEventListener?.('change',schedule);
  desktop.addEventListener?.('change',schedule);
  schedule();

  const dialog=root.querySelector('#body-treatment-dialog');
  const title=root.querySelector('#body-dialog-title');
  const description=root.querySelector('#body-dialog-description');
  const image=root.querySelector('#body-dialog-image');
  const closeBtn=root.querySelector('[data-em-close-dialog]');
  const treatments={
    pressure:{
      title:'Light & Deep Tissue',
      description:'Light massage and deep-tissue massage offer different pressure experiences. Tell Elegant Massage your preference and ask which approach is appropriate for your chosen appointment.',
      image:'../../assets/images/elegant-massage-massage-touch-detail.webp'
    },
    oil:{
      title:'Swedish & Warm Oil',
      description:'Swedish massage and warm oil are techniques described by Elegant Massage. Confirm which options, if any, are available or included in the appointment you select.',
      image:'../../assets/images/elegant-massage-warm-oil-cinematic.webp'
    },
    stone:{
      title:'Hot Stone Therapy',
      description:'Hot stone therapy uses smooth, warmed stones during massage. It is mentioned in historical Elegant Massage content; please confirm current availability and whether it is included.',
      image:'../../assets/images/elegant-massage-relaxation-atmosphere-cinematic.webp'
    }
  };
  let opener=null;
  root.querySelectorAll('[data-em-detail]').forEach(trigger=>{
    trigger.addEventListener('click',e=>{
      const item=treatments[trigger.dataset.emDetail];
      if(!item || typeof dialog.showModal!=='function')return;
      e.preventDefault();
      opener=trigger;
      title.textContent=item.title;
      description.textContent=item.description;
      image.src=item.image;
      image.alt='Illustrative massage atmosphere; not a photograph of Elegant Massage staff or premises';
      dialog.showModal();
      closeBtn.focus();
    });
  });
  closeBtn.addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',e=>{
    if(e.target!==dialog)return;
    const r=dialog.getBoundingClientRect();
    if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();
  });
  dialog.addEventListener('close',()=>{
    if(opener?.isConnected)opener.focus({preventScroll:true});
    opener=null;
  });
})();
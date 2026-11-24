/* Home cinematic closing scenes only. Does not touch Hero, Sticky Grid,
 * treatment chapters, their timelines or their scroll handlers. */
(() => {
  'use strict';
  function initClosingScenes(){
    const gsap=window.gsap;
    const Trigger=window.ScrollTrigger;
    if(!gsap||!Trigger || matchMedia('(prefers-reduced-motion: reduce)').matches)return;
    gsap.registerPlugin(Trigger);
    const motions=[];
    // A native-scroll reading hold (one full viewport + ~0.86–0.88 extra
    // viewport of travel) for EACH of the two final photographic chapters.
    // Their interiors remain sticky. Zoom ONLY the photograph, never the
    // map, the wordmark, buttons, address or any other readable content.
    // Short screens and phones retain natural non-sticky content flow.
    const immersiveClosing=matchMedia(
      '(min-height:740px) and (prefers-reduced-motion:no-preference)'
    );
    const shots=[
      {section:document.querySelector('.real-place--cinematic'),
       photo:document.querySelector('.real-place__scene img'),zoom:1.115},
      {section:document.querySelector('.visit--mapped'),
       photo:document.querySelector('.visit__backdrop img'),zoom:1.095}
    ];
    if(immersiveClosing.matches){
      for(const shot of shots){
        if(!shot.section || !shot.photo)continue;
        motions.push(gsap.fromTo(shot.photo,
          {scale:1.01},
          {scale:shot.zoom,ease:'none',scrollTrigger:{
            trigger:shot.section,start:'top top',end:'bottom bottom',
            scrub:.75,invalidateOnRefresh:true
          }}
        ));
      }
    }
    // The new Menu chapter stays visually fixed while native scroll spends
    // its dedicated reading distance. Only the photo changes scale: the text
    // and CTA remain fully readable, with no wheel or touch interception.
    const menu=document.querySelector('.menu-pause');
    const menuPhoto=menu?.querySelector('.menu-pause__photo img');
    const immersiveMenu=matchMedia('(min-height:740px) and (prefers-reduced-motion:no-preference)');
    if(menu&&menuPhoto&&immersiveMenu.matches){
      motions.push(gsap.fromTo(menuPhoto,{scale:1.015},{
        scale:1.092,ease:'none',
        scrollTrigger:{
          trigger:menu,start:'top top',end:'bottom bottom',
          scrub:.7,invalidateOnRefresh:true
        }
      }));
    }
    // ONE introductory copy block is now part of the same floral SVG-mask
    // stage, not a standalone section above it. While the scene is held, the
    // text naturally dissolves as the Body Massage blinds begin to open.
    // No modifications to Codrops/Hiroki's original five treatment timeline.
    const treatmentTrack=document.querySelector('#cinema-track');
    const stageIntro=treatmentTrack?.querySelector('.at-mask-stage > .treatments__opening');
    if(treatmentTrack&&stageIntro&&matchMedia('(min-width:768px) and (min-height:650px)').matches){
      // First ~115svh is now a reading hold in the mask master timeline.
      // Give the original floral photograph a tiny scroll-linked zoom with
      // no scroll interception. The text remains fully readable most of
      // that distance, then dissolves as the first blind begins.
      const stage=treatmentTrack.querySelector('.at-mask-stage');
      if(stage){
        // The white wash exists ONLY to merge the gallery with the floral
        // introduction. Dissolve it well before the first SVG blind opens;
        // reversing scroll naturally restores the seamless upper handoff.
        motions.push(gsap.fromTo(stage,
          {'--at-gallery-fade-opacity':1},
          {'--at-gallery-fade-opacity':0,ease:'none',scrollTrigger:{
            trigger:treatmentTrack,
            start:'top top',
            end:()=>`top top-=${Math.round(window.innerHeight*.65)}`,
            scrub:.45,invalidateOnRefresh:true
          }}
        ));
        motions.push(gsap.fromTo(stage,
          {'--at-intro-scale':1},
          {'--at-intro-scale':1.065,ease:'none',scrollTrigger:{
            trigger:treatmentTrack,
            start:'top top',
            end:()=>`top top-=${Math.round(window.innerHeight*1.16)}`,
            scrub:.65,invalidateOnRefresh:true
          }}
        ));
      }
      motions.push(gsap.fromTo(stageIntro,
        {autoAlpha:1,y:0},
        {autoAlpha:0,y:-14,ease:'none',scrollTrigger:{
          trigger:treatmentTrack,
          start:()=>`top top-=${Math.round(window.innerHeight*.88)}`,
          end:()=>`top top-=${Math.round(window.innerHeight*1.20)}`,
          scrub:.48,invalidateOnRefresh:true,
          onUpdate:self=>{stageIntro.style.pointerEvents=self.progress>.70?'none':'auto';},
          onLeave:()=>{stageIntro.style.pointerEvents='none';},
          onEnterBack:()=>{stageIntro.style.pointerEvents='auto';}
        }}
      ));
    }
    // Text remains in the DOM and visible even if animations never initialize.
    const reveals=[
      {root:'.menu-pause',selectors:'.menu-pause__eyebrow,.menu-pause h2,.menu-pause__copy,.menu-pause__footer'},
      {root:'.real-place--cinematic',selectors:'.real-place__inner > .eyebrow,.real-place h2,.real-place__description,.real-place__actions,.real-place__source'}
    ];
    for(const item of reveals){
      const root=document.querySelector(item.root);
      if(!root)continue;
      const nodes=[...root.querySelectorAll(item.selectors)];
      for(const [i,node] of nodes.entries()){
        motions.push(gsap.fromTo(node,
          {y:18,opacity:.70},
          {y:0,opacity:1,duration:.75,ease:'power2.out',delay:i*.07,
           scrollTrigger:{trigger:root,start:'top 73%',toggleActions:'play none none reverse'}}
        ));
      }
    }
    window.addEventListener('pagehide',()=>{
      for(const motion of motions){motion.scrollTrigger?.kill();motion.kill();}
    },{once:true});
  }
  if(document.readyState==='complete')initClosingScenes();
  else window.addEventListener('load',initClosingScenes,{once:true});
})();
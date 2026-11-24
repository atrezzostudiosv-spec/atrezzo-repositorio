/* ATREZZO — service reviews: CSS infinite rail with keyboard/motion pause.
   No autoplay where reduced motion is requested; all original reviews readable without JS. */
(()=>{const section=document.querySelector(".at-reviews");if(!section)return;
const btn=section.querySelector("[data-review-pause]");if(!btn)return;
btn.hidden=false;
const reduced=window.matchMedia?.("(prefers-reduced-motion: reduce)");
/* The first group of cards is visible before animation starts. Arm motion only
   when the cards enter view, not while visitors read previous sections. */
const reviewViewport=section.querySelector(".at-review-viewport");
const activate=()=>{if(!reduced?.matches)section.dataset.motionReady="true";};
if(reviewViewport && typeof IntersectionObserver==="function"){
  const watcher=new IntersectionObserver(entries=>{
    if(entries.some(entry=>entry.isIntersecting)){
      activate();
      watcher.disconnect();
    }
  },{threshold:0.05,rootMargin:"0px 0px 40px 0px"});
  watcher.observe(reviewViewport);
}else activate();
const update=()=>{const paused=section.dataset.paused==="true";btn.setAttribute("aria-pressed",String(paused));btn.innerHTML=paused?'<svg class="mc-ui-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M8 5l11 7-11 7V5z"/></svg> Resume motion':'<svg class="mc-ui-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M9 5v14m6-14v14"/></svg> Pause motion';btn.disabled=Boolean(reduced?.matches);btn.setAttribute("aria-label",reduced?.matches?"Automatic review movement disabled by reduced-motion preference":paused?"Resume automatic review movement":"Pause automatic review movement");};
btn.addEventListener("click",()=>{section.dataset.paused=section.dataset.paused==="true"?"false":"true";update();});
reduced?.addEventListener?.("change",update);update();
})();

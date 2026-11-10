/* ATREZZO Sticky Sections 15 — per-instance lifecycle, original Codrops motion.
 * No global Lenis or body changes: scroll remains native.
 * ScrollTrigger is injected by the integrating site.
 */
export function mountSticky(host, effect, {gsap=globalThis.gsap, ScrollTrigger=globalThis.ScrollTrigger}={}){
  if(!(host instanceof Element))throw new TypeError("ATREZZO sticky host must be an Element");
  const section=host.matches(".atz-sticky")?host:host.querySelector(".atz-sticky");
  if(!section)throw Error("ATREZZO sticky section not found");
  const parts=[...section.querySelectorAll(".content--sticky")];
  if(parts.length<2)throw Error("ATREZZO sticky requires at least two panels");
  const motion=matchMedia("(prefers-reduced-motion: reduce)");
  let context=null,mode="static",destroyed=false;
  const available=Boolean(gsap&&ScrollTrigger&&typeof gsap.context==="function");
  function refresh(){
    if(destroyed)return;
    if(context){context.revert();context=null;}
    if(motion.matches){mode="static";return;}
    if(!available){mode="unavailable";return;}
    gsap.registerPlugin(ScrollTrigger);
    context=gsap.context(()=>{
      parts.forEach((el,position)=>effect({el,position,total:parts.length,isLast:position===parts.length-1,gsap}));
    },section);
    mode="animated";
    ScrollTrigger.refresh();
  }
  motion.addEventListener("change",refresh);
  const images=[...section.querySelectorAll("img")];
  const onMedia=()=>{if(!destroyed&&available)ScrollTrigger.refresh();};
  for(const img of images){img.addEventListener("load",onMedia);img.addEventListener("error",onMedia);}
  refresh();
  return {get mode(){return mode;},get panelCount(){return parts.length;},refresh,
    destroy(){
      if(destroyed)return;
      destroyed=true;motion.removeEventListener("change",refresh);
      for(const img of images){img.removeEventListener("load",onMedia);img.removeEventListener("error",onMedia);}
      if(context)context.revert();context=null;mode="destroyed";
    }
  };
}

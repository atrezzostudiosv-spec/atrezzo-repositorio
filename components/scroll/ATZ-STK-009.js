/* ATZ-STK-009 — Paneles laterales y contraste fotográfico. Adaptation of Codrops StickySections (MIT).
 * GSAP start/end, scrub, easing and transforms retained from approved ZIP demo9.
 * Image placeholders are illustrative only. 
 */
import {mountSticky} from "../runtime/sticky-lifecycle.js";
export const id="ATZ-STK-009";
export const variant=9;
export function mount(host,options={}){
  return mountSticky(host,({el,position,total,isLast,gsap})=>{
  const isPreLast=position===total-2;
gsap.timeline({scrollTrigger:{trigger:el,start:()=>isLast?"top top":isPreLast?"bottom top":"bottom+=100% top",end:"+=100%",scrub:true}})
.to(el,{ease:"none",yPercent:-100},0)
.fromTo(el.querySelector(".content__img"),{yPercent:20,rotation:40,scale:.8,filter:"contrast(400%)"},
 {ease:"none",yPercent:-100,rotation:0,scale:1,filter:"contrast(100%)",
 scrollTrigger:{trigger:el,start:"top bottom",end:"max",scrub:true}},0);
  },options);
}

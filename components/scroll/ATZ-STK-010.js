/* ATZ-STK-010 — Salida vertical de paneles divididos. Adaptation of Codrops StickySections (MIT).
 * GSAP start/end, scrub, easing and transforms retained from approved ZIP demo10.
 * Image placeholders are illustrative only. 
 */
import {mountSticky} from "../runtime/sticky-lifecycle.js";
export const id="ATZ-STK-010";
export const variant=10;
export function mount(host,options={}){
  return mountSticky(host,({el,position,total,isLast,gsap})=>{
  gsap.timeline({scrollTrigger:{trigger:el,start:isLast?"top top":"bottom top",end:"+=100%",scrub:true}})
.to(el,{ease:"none",yPercent:-100},0);
  },options);
}

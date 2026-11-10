/* ATZ-STK-003 — Contracción central en capas. Adaptation of Codrops StickySections (MIT).
 * GSAP start/end, scrub, easing and transforms retained from approved ZIP demo3.
 * Image placeholders are illustrative only. 
 */
import {mountSticky} from "../runtime/sticky-lifecycle.js";
export const id="ATZ-STK-003";
export const variant=3;
export function mount(host,options={}){
  return mountSticky(host,({el,position,total,isLast,gsap})=>{
  gsap.timeline({scrollTrigger:{trigger:el,start:"top top",end:"+=100%",scrub:true}})
.set(el,{transformOrigin:`50% ${isLast?100:0}%`}).to(el,{ease:"none",scale:0},0);
  },options);
}

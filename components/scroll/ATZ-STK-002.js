/* ATZ-STK-002 — Reducción con esquinas redondeadas. Adaptation of Codrops StickySections (MIT).
 * GSAP start/end, scrub, easing and transforms retained from approved ZIP demo2.
 * Image placeholders are illustrative only. 
 */
import {mountSticky} from "../runtime/sticky-lifecycle.js";
export const id="ATZ-STK-002";
export const variant=2;
export function mount(host,options={}){
  return mountSticky(host,({el,position,total,isLast,gsap})=>{
  gsap.timeline({scrollTrigger:{trigger:el,start:"top top",end:"+=100%",scrub:true}})
.to(el,{ease:"none",startAt:{filter:"brightness(100%)"},filter:isLast?"none":"brightness(50%)",scale:.95,borderRadius:40},0);
  },options);
}

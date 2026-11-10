/* ATZ-STK-001 — Oscurecimiento y giro fotográfico. Adaptation of Codrops StickySections (MIT).
 * GSAP start/end, scrub, easing and transforms retained from approved ZIP demo1.
 * Image placeholders are illustrative only. 
 */
import {mountSticky} from "../runtime/sticky-lifecycle.js";
export const id="ATZ-STK-001";
export const variant=1;
export function mount(host,options={}){
  return mountSticky(host,({el,position,total,isLast,gsap})=>{
  const timeline=gsap.timeline({scrollTrigger:{trigger:el,start:"top top",end:"+=100%",scrub:true}});
timeline.to(el,{ease:"none",startAt:{filter:"brightness(100%) contrast(100%)"},filter:isLast?"none":"brightness(60%) contrast(135%)",yPercent:isLast?0:-15},0)
.to(el.querySelector(".content__img"),{ease:"power1.in",yPercent:-40,rotation:-20},0);
  },options);
}

/* ATZ-STK-006 — Plegado tridimensional hacia atrás. Adaptation of Codrops StickySections (MIT).
 * GSAP start/end, scrub, easing and transforms retained from approved ZIP demo6.
 * Image placeholders are illustrative only. 
 */
import {mountSticky} from "../runtime/sticky-lifecycle.js";
export const id="ATZ-STK-006";
export const variant=6;
export function mount(host,options={}){
  return mountSticky(host,({el,position,total,isLast,gsap})=>{
  const inner=el.querySelector(".content__inner");
gsap.timeline({scrollTrigger:{trigger:el,start:"top top",end:"+=200%",scrub:true}})
.set(inner,{transformOrigin:"50% 0%"}).to(inner,{ease:"power1",startAt:{filter:"brightness(100%)"},filter:"brightness(60%)",scale:.9,rotationX:-90,yPercent:isLast?100:0},0);
  },options);
}

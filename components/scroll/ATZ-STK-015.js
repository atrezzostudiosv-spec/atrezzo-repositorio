/* ATZ-STK-015 — Paralaje fotográfico con rotación. Adaptation of Codrops StickySections (MIT).
 * GSAP start/end, scrub, easing and transforms retained from approved ZIP demo15.
 * Image placeholders are illustrative only. 
 */
import {mountSticky} from "../runtime/sticky-lifecycle.js";
export const id="ATZ-STK-015";
export const variant=15;
export function mount(host,options={}){
  return mountSticky(host,({el,position,total,isLast,gsap})=>{
  gsap.timeline({scrollTrigger:{trigger:el,start:"top top",end:"+=100%",scrub:true}})
.fromTo(el.querySelector(".content__img"),{yPercent:10,rotation:20},
 {ease:"power1",yPercent:-60,rotation:-20,scrollTrigger:{trigger:el,start:"top bottom",end:"max",scrub:true}},0);
  },options);
}

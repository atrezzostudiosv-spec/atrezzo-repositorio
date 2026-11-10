/* ATZ-STK-014 — Compresión vertical con expansión interna. Adaptation of Codrops StickySections (MIT).
 * GSAP start/end, scrub, easing and transforms retained from approved ZIP demo14.
 * Image placeholders are illustrative only. 
 */
import {mountSticky} from "../runtime/sticky-lifecycle.js";
export const id="ATZ-STK-014";
export const variant=14;
export function mount(host,options={}){
  return mountSticky(host,({el,position,total,isLast,gsap})=>{
  gsap.timeline({scrollTrigger:{trigger:el,start:"top top",end:"+=100%",scrub:true}})
.set(el,{transformOrigin:`50% ${isLast?100:0}%`})
.to(el,{ease:"none",scaleY:0},0)
.to(el.querySelectorAll(".content__title, .content__text, .content__img"),{ease:"back.in(0.1)",scale:1.7,opacity:0},0);
  },options);
}

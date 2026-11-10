/* ATZ-STK-013 — Desplazamiento horizontal y descomposición. Adaptation of Codrops StickySections (MIT).
 * GSAP start/end, scrub, easing and transforms retained from approved ZIP demo13.
 * Image placeholders are illustrative only. 
 */
import {mountSticky} from "../runtime/sticky-lifecycle.js";
export const id="ATZ-STK-013";
export const variant=13;
export function mount(host,options={}){
  return mountSticky(host,({el,position,total,isLast,gsap})=>{
  gsap.timeline({defaults:{ease:"none"},scrollTrigger:{trigger:el,start:"top top",end:isLast?"+=100%":"+=200%",scrub:true}})
.set(el,{transformOrigin:`${position%2===0?100:0}% ${isLast?0:100}%`})
.to(el,{startAt:{filter:"brightness(100%)"},xPercent:position%2===0?-150:150,yPercent:isLast?100:0,
rotation:position%2===0?-20:20,scale:.8,filter:"brightness(0%)"},0)
.to(el.querySelector(".content__title"),{scale:.5,yPercent:-400},0)
.to(el.querySelector(".content__text"),{yPercent:100},0)
.to(el.querySelector(".content__img"),{scale:.2},0);
  },options);
}

/* ATZ-STK-012 — Paneles alternos con alto contraste. Adaptation of Codrops StickySections (MIT).
 * GSAP start/end, scrub, easing and transforms retained from approved ZIP demo12.
 * Image placeholders are illustrative only. 
 */
import {mountSticky} from "../runtime/sticky-lifecycle.js";
export const id="ATZ-STK-012";
export const variant=12;
export function mount(host,options={}){
  return mountSticky(host,({el,position,total,isLast,gsap})=>{
  gsap.timeline({scrollTrigger:{trigger:el,start:"top top",end:"+=200%",scrub:true}})
.set(el,{transformOrigin:`${position%2===0?100:0}% 0%`})
.to(el,{ease:"none",startAt:{filter:"brightness(100%) contrast(100%)"},yPercent:-100,scale:.9,
 rotation:position%2===0?-2:2,filter:"brightness(50%) contrast(300%)"},0)
.to(el.querySelectorAll(".content__img"),{ease:"power1.in",xPercent:-40,rotation:position%2===0?-20:20},0);
  },options);
}

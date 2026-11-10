/* ATZ-STK-011 — Despedida diagonal con rotación. Adaptation of Codrops StickySections (MIT).
 * GSAP start/end, scrub, easing and transforms retained from approved ZIP demo11.
 * Image placeholders are illustrative only. 
 */
import {mountSticky} from "../runtime/sticky-lifecycle.js";
export const id="ATZ-STK-011";
export const variant=11;
export function mount(host,options={}){
  return mountSticky(host,({el,position,total,isLast,gsap})=>{
  gsap.timeline({scrollTrigger:{trigger:el,start:"top top",end:"+=100%",scrub:true}})
.set(el,{transformOrigin:"100% 0%"}).to(el,{ease:"none",opacity:0,borderRadius:20,yPercent:isLast?105:5,scale:.75,rotation:-20},0);
  },options);
}

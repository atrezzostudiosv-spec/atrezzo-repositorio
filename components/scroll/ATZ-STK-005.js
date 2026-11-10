/* ATZ-STK-005 — Giro diagonal de paneles. Adaptation of Codrops StickySections (MIT).
 * GSAP start/end, scrub, easing and transforms retained from approved ZIP demo5.
 * Image placeholders are illustrative only. 
 */
import {mountSticky} from "../runtime/sticky-lifecycle.js";
export const id="ATZ-STK-005";
export const variant=5;
export function mount(host,options={}){
  return mountSticky(host,({el,position,total,isLast,gsap})=>{
  gsap.timeline({scrollTrigger:{trigger:el,start:"top top",end:"+=100%",scrub:true}})
.set(el,{transformOrigin:`${position%2===0?2:98}% ${isLast?0:2}%`})
.to(el,{ease:"none",scale:0,yPercent:isLast?100:0,rotation:position%2===0?10:-10},0);
  },options);
}

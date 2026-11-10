/* ATZ-STK-007 — Tarjetas que se alejan y desvanecen. Adaptation of Codrops StickySections (MIT).
 * GSAP start/end, scrub, easing and transforms retained from approved ZIP demo7.
 * Image placeholders are illustrative only. 
 */
import {mountSticky} from "../runtime/sticky-lifecycle.js";
export const id="ATZ-STK-007";
export const variant=7;
export function mount(host,options={}){
  return mountSticky(host,({el,position,total,isLast,gsap})=>{
  gsap.timeline({scrollTrigger:{trigger:el,start:"center center",end:"+=100%",scrub:true}})
.to(el,{ease:"none",scale:.6,opacity:0,yPercent:isLast?125:0},0);
  },options);
}

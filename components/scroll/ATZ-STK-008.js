/* ATZ-STK-008 — Desenfoque progresivo en tarjetas. Adaptation of Codrops StickySections (MIT).
 * GSAP start/end, scrub, easing and transforms retained from approved ZIP demo8.
 * Image placeholders are illustrative only. 
 */
import {mountSticky} from "../runtime/sticky-lifecycle.js";
export const id="ATZ-STK-008";
export const variant=8;
export function mount(host,options={}){
  return mountSticky(host,({el,position,total,isLast,gsap})=>{
  gsap.timeline({scrollTrigger:{trigger:el,start:"center center",end:"max",scrub:true}})
.to(el,{ease:"none",startAt:{filter:"blur(0px)"},filter:"blur(3px)",
  scrollTrigger:{trigger:el,start:"center center",end:"+=100%",scrub:true}},0)
.to(el,{ease:"none",scale:.4,yPercent:-50},0);
  },options);
}

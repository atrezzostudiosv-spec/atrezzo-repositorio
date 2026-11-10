/* ATZ-STK-004 — Contracción desde esquinas alternas. Adaptation of Codrops StickySections (MIT).
 * GSAP start/end, scrub, easing and transforms retained from approved ZIP demo4.
 * Image placeholders are illustrative only. 
 */
import {mountSticky} from "../runtime/sticky-lifecycle.js";
export const id="ATZ-STK-004";
export const variant=4;
export function mount(host,options={}){
  return mountSticky(host,({el,position,total,isLast,gsap})=>{
  gsap.timeline({scrollTrigger:{trigger:el,start:"top top",end:"+=100%",scrub:true}})
.set(el,{transformOrigin:`${position%2===0?0:100}% ${isLast?100:0}%`}).to(el,{ease:"none",scale:0,borderRadius:200},0);
  },options);
}

import {mountPattern,clamp,mix} from "./runtime.js";
export const id="ATZ-MOT-005";
export function mount(host){
 return mountPattern(host,id,({node,onScroll,cleanup})=>{
  const hero=node.querySelector("[data-am-wedding-hero]");
  if(!hero)return;
  const clip=hero.querySelector("[data-am-wedding-clip]");
  const visual=hero.querySelector("[data-am-wedding-visual]");
  const sub=hero.querySelector("[data-am-wedding-subtitle]");
  hero.setAttribute("data-am-ready","");
  onScroll(()=>{
   const r=hero.getBoundingClientRect(),t=clamp(-r.top/Math.max(1,r.height));
   if(clip)clip.style.clipPath="inset("+mix(42,0,t)+"%)";
   if(visual)visual.style.transform="scale("+mix(.2,1,t).toFixed(4)+")";
   if(sub){const q=clamp((t-.82)/.18);sub.style.opacity=String(q);sub.style.transform="translateY("+((1-q)*15)+"px)";}
  });
  cleanup(()=>{hero.removeAttribute("data-am-ready");if(clip)clip.style.removeProperty("clip-path");if(visual)visual.style.removeProperty("transform");if(sub){sub.style.removeProperty("opacity");sub.style.removeProperty("transform");}});
 });
}

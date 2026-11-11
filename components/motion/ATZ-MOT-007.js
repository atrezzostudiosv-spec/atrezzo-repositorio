import {mountPattern,clamp,mix} from "./runtime.js";
export const id="ATZ-MOT-007";
export function mount(host){
 return mountPattern(host,id,({node,onScroll,cleanup})=>{
  const el=node.querySelector("[data-am-burned]");
  if(!el)return;
  el.setAttribute("data-am-ready","");
  onScroll(()=>{
   const r=el.getBoundingClientRect(),t=clamp((innerHeight-r.top)/Math.max(1,innerHeight+r.height));
   const desktop=matchMedia("(min-width: 1101px)").matches;
   el.style.setProperty("--am-burned-t",t.toFixed(4));
   el.style.setProperty("--am-brightness",mix(1.3,1,t).toFixed(3));
   el.style.setProperty("--am-contrast",mix(2,1,t).toFixed(3));
   el.style.setProperty("--am-sepia",mix(.2,0,t).toFixed(3));
   el.style.setProperty("--am-burned-y",mix(desktop?-80:-20,desktop?80:20,t).toFixed(1)+"px");
  });
  cleanup(()=>{el.removeAttribute("data-am-ready");for(const name of ["--am-burned-t","--am-brightness","--am-contrast","--am-sepia","--am-burned-y"])el.style.removeProperty(name);});
 });
}

import {mountPattern,clamp,mix} from "./runtime.js";
export const id="ATZ-MOT-004";
function heroFrame(index,progress,width,height,desktop){
 const t=clamp(progress),w=width,h=height;
 if(index===5)return {x:0,y:desktop&&t?-.15*w*t:0,scale:desktop?mix(.4,1,t):1,innerScale:desktop?mix(1.4,1,t):1};
 const base=desktop?[[-.5*w,-h],[0,-h],[.5*w,-h],[-.5*w,-h],[.5*w,-h]]:[[-.10*w,-.05*h],[.10*w,-.075*h],[.15*w,-.125*h],[-.15*w,.10*h],[.10*w,.05*h]];
 const [x,y]=base[index];return {x:x*t,y:y*t,scale:1,innerScale:1};
}
export function mount(host){
 return mountPattern(host,id,({node,onScroll,cleanup})=>{
  const hero=node.querySelector("[data-am-home-hero]");
  if(!hero)return;
  const media=[...hero.querySelectorAll("[data-am-media-index]")],title=hero.querySelector("[data-am-hero-title]");
  if(media.length!==6)throw Error(id+": exactly 6 media are required");
  media.forEach((el,i)=>el.style.setProperty("--am-index",i));hero.setAttribute("data-am-ready","");
  onScroll(()=>{
   const r=hero.getBoundingClientRect(),t=clamp(-r.top/Math.max(1,r.height)),w=innerWidth,h=innerHeight;
   const desktop=matchMedia("(min-width: 1101px)").matches;
   media.forEach((el,i)=>{
    const frame=heroFrame(i,t,w,h,desktop);
    el.style.setProperty("--am-x",frame.x.toFixed(1)+"px");
    el.style.setProperty("--am-y",frame.y.toFixed(1)+"px");
    el.style.setProperty("--am-scale",frame.scale.toFixed(4));
    if(i===5)el.style.setProperty("--am-inner-scale",frame.innerScale.toFixed(4));
   });
   if(title){const q=desktop?clamp((t-.82)/.18):1;title.style.opacity=String(q);title.style.transform="translateY("+((1-q)*15)+"px)";}
   hero.style.setProperty("--am-progress",String(t));
  });
  cleanup(()=>{for(const el of media)for(const key of ["--am-index","--am-x","--am-y","--am-scale","--am-inner-scale"])el.style.removeProperty(key);hero.style.removeProperty("--am-progress");hero.removeAttribute("data-am-ready");if(title){title.style.removeProperty("opacity");title.style.removeProperty("transform");}});
 });
}

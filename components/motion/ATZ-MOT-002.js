import {mountPattern} from "./runtime.js";
export const id="ATZ-MOT-002";
export function mount(host){
 return mountPattern(host,id,({node,onScroll,cleanup,reduced,clamp,mix})=>{
  const text=node.querySelector('[data-am-text="scrub"]');
  if(!text||reduced)return;
  const source=text.textContent;
  const visual=document.createElement("span");visual.className="am-text__visual";visual.setAttribute("aria-hidden","true");
  let index=0;
  for(const part of source.match(/\S+|\s+/gu)||[]){
   if(/^\s+$/u.test(part)){visual.append(document.createTextNode(part));continue;}
   const word=document.createElement("span");word.className="am-word";
   for(const char of [...part]){const c=document.createElement("span");c.className="am-char";c.textContent=char;c.style.setProperty("--am-delay",Math.min(index++,500)*5+"ms");word.append(c);}
   visual.append(word);
  }
  text.setAttribute("aria-label",source.trim());text.replaceChildren(visual);text.setAttribute("data-am-ready","");
  const chars=[...text.querySelectorAll(".am-char")];
  onScroll(()=>{
   const r=text.getBoundingClientRect(),start=innerHeight,end=innerHeight*.6-r.height;
   const t=clamp((start-r.top)/Math.max(1,start-end));
   const count=chars.length;
   chars.forEach((c,j)=>{const q=clamp((t-j/Math.max(1,count)*.35)/.65);c.style.opacity=String(q);c.style.transform="translateY("+mix(-20,0,q)+"%) scaleX("+mix(.7,1,q)+")";});
  });
  cleanup(()=>{text.replaceChildren(document.createTextNode(source));text.removeAttribute("aria-label");text.removeAttribute("data-am-ready");});
 });
}

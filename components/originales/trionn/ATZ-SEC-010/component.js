import {mountOriginalLines} from "./engine.original.js";
import three from "./three-adapter.js";
const id="ATZ-SEC-010";
export {id};
export async function mount(config,{scrollSmoother={ScrollSmoother:{get:()=>null}}}={}){
 const grid=document.querySelector("#projects-grid"),state=document.querySelector("#state"),sound=document.querySelector("#sound");
 const L={current:false},T={current:null};let lab=null;
 if(!Array.isArray(config.projects)||!config.projects.length)throw Error("At least one project is required");
 const el=(tag,cls,text)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(text)e.textContent=text;return e;};
 document.querySelector("#page-header h1").textContent=config.title;
 document.querySelector("#page-header p").textContent=config.subtitle;
 document.querySelector("#contact-btn").textContent=config.endLabel||"Explore more";
 grid.replaceChildren();
 for(const p of config.projects){
  const card=el("article","project-card card-revealed");card.dataset.pos=p.position||"left";card.dataset.size=p.size||"medium";
  const thumb=el("div","card-thumb");const img=el("img","");img.alt=p.title;img.width=812;img.height=568;img.loading="eager";
  const colors=(p.palette||["#27343e","#8195a5"]).map(c=>/^#[0-9a-fA-F]{6}$/.test(c)?c:"#8195a5");
  const svg='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 812 568"><rect width="812" height="568" fill="'+colors[0]+'"/><rect x="112" y="80" width="588" height="408" rx="8" fill="'+colors[1]+'"/><path d="M170 420 L330 150 L450 365 L610 190" fill="none" stroke="'+colors[0]+'" stroke-width="24"/><circle cx="406" cy="284" r="70" fill="none" stroke="'+colors[0]+'" stroke-width="4"/></svg>';
  img.src=p.image||("data:image/svg+xml,"+encodeURIComponent(svg));
  if(p.href){const a=el("a","thumb-link");a.href=p.href;a.append(img);thumb.append(a);}else thumb.append(img);
  const info=el("div","card-info");info.append(el("h2","",p.title),el("p","",p.description||""));card.append(thumb,info);grid.append(card);
 }
 await document.fonts.ready;await Promise.all([...grid.querySelectorAll("img")].map(e=>e.decode().catch(()=>{})));
 if(matchMedia("(prefers-reduced-motion: reduce)").matches){document.documentElement.dataset.motion="static";state.textContent="Reduced motion · static content";return {mode:"static",destroy(){}};}
 if(!document.createElement("canvas").getContext("webgl2"))throw Error("WebGL2 unavailable");
 lab=mountOriginalLines({three,scrollSmoother,soundRef:L,audioRef:T,audioUrl:config.audioUrl||null});
 document.documentElement.dataset.motion="animated";state.textContent="Original line engine · ready";
 if(config.audioUrl){sound.hidden=false;sound.onclick=()=>{L.current=!L.current;sound.textContent=L.current?"Sound on":"Sound off";sound.setAttribute("aria-pressed",String(L.current));if(L.current)T.current?.resume().catch(()=>{});else T.current?.suspend().catch(()=>{});};}
 return {mode:"animated",progress:lab.progress,anchors:lab.anchors,rebuild:lab.rebuild,destroy(){lab.stop();sound.onclick=null;document.documentElement.dataset.motion="static";}};
}
async function boot(){
 try{const response=await fetch(new URL("./projects.json",import.meta.url));if(!response.ok)throw Error("Configuration unavailable");const instance=await mount(await response.json());window.__atrezzoPreviewInstance=instance;addEventListener("pagehide",()=>instance.destroy(),{once:true});}
 catch(error){document.documentElement.dataset.motion="error";document.querySelector("#state").textContent="Preview not validated";document.querySelector("#lab-error").textContent=String(error);console.error(error);}
}
if(document.querySelector("#projects-grid")&&document.querySelector("#state"))boot();

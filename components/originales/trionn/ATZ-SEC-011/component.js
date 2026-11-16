// Narrow adapter for the captured Turbopack module factories. No React or network runtime.
const factories=new Map(),cache=new Map();
for(const entry of globalThis.TURBOPACK){for(let j=1;j<entry.length;j+=2){if(typeof entry[j]==="number"&&typeof entry[j+1]==="function")factories.set(entry[j],entry[j+1]);}}
function originalModule(id){
 if(id===89970){if(!globalThis.gsap)throw Error('GSAP 3.15.0 unavailable');return {default:globalThis.gsap};}
 if(id===83495){if(!globalThis.ScrollTrigger)throw Error('ScrollTrigger 3.15.0 unavailable');return {ScrollTrigger:globalThis.ScrollTrigger};}
 if(cache.has(id))return cache.get(id);
 const factory=factories.get(id);if(!factory)throw Error("Missing original module "+id);
 const out={};cache.set(id,out);
 factory({i:originalModule,s:(items,moduleId=id)=>{const target=cache.get(moduleId)||out;for(let n=0;n<items.length;){const name=items[n++],kind=items[n++];if(kind===0)target[name]=items[n++];else if(typeof kind==="function")Object.defineProperty(target,name,{get:kind,enumerable:true});else throw Error("Unknown original export "+name);}}});
 return out;
}
const state=document.querySelector("#state"),root=document.querySelector("#projects-grid");
const positions={left:{ml:"4%",mr:"auto"},right:{ml:"auto",mr:"4%"},center:{ml:"auto",mr:"auto"}},sizes={small:"29%",medium:"36%",large:"41%",xlarge:"46%"};
const el=(tag,cls,value)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(value)n.textContent=value;return n;};
(async()=>{let instance;try{
const response=await fetch("./projects.json");if(!response.ok)throw Error("Project data unavailable");const projects=await response.json();
for(const p of projects){const card=el("article","project-card");card.dataset.pos=p.position;card.dataset.size=p.size;const pos=positions[p.position]||positions.left;Object.assign(card.style,{marginLeft:pos.ml,marginRight:pos.mr,width:sizes[p.size]||sizes.medium});const thumb=el("div","card-thumb"),img=el("img");img.src=p.image;img.alt=p.title;img.width=812;img.height=568;thumb.append(img);const info=el("div","card-info");info.append(el("h2",null,p.title),el("p",null,p.description));card.append(thumb,info);root.append(card);}
await Promise.all([...root.querySelectorAll("img")].map(i=>i.decode()));await document.fonts.ready;
if(matchMedia("(prefers-reduced-motion: reduce)").matches){document.documentElement.dataset.lab="static";state.textContent="Reduced motion · static";return;}
if(!document.createElement("canvas").getContext("webgl2"))throw Error("WebGL2 unavailable");
if(globalThis.gsap?.version!=="3.15.0"||globalThis.ScrollTrigger?.version!=="3.15.0")throw Error("GSAP / ScrollTrigger 3.15.0 required");const {initFlagwave}=originalModule(64741);instance=initFlagwave(root);window.__TRIONN_WAVE__=instance;const dispose=instance.dispose.bind(instance);instance.dispose=()=>{dispose();document.documentElement.dataset.lab="static";root.querySelectorAll(".card-thumb img").forEach(img=>img.style.removeProperty("visibility"));};document.documentElement.dataset.lab="ready";state.textContent="Original WebGL engine · ready";window.addEventListener("pagehide",()=>instance.dispose(),{once:true});
}catch(error){instance?.dispose();document.documentElement.dataset.lab="error";state.textContent="Preview error";document.querySelector("#lab-error").textContent=String(error);console.error(error);}})();
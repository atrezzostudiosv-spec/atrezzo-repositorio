// Original source modules and CSS; only brand literals parameterized.
export async function mountPreloader({container,brand,content,onReady=()=>{},skip=false}={}){
 if(!container||!content)throw Error("Preloader requires container and content");
 const ready=(mode)=>{content.inert=false;content.removeAttribute("aria-busy");document.documentElement.dataset.trionnReady="true";document.documentElement.dataset.lab=mode;onReady();};
 if(skip||matchMedia("(prefers-reduced-motion: reduce)").matches){ready("static");return {mode:"static"}}
 try{
 if(!brand||!Array.isArray(brand.paths)||brand.paths.length!==3||brand.paths.some(p=>typeof p!=="string"||!p.trim()||p.length>20000)||!Array.isArray(brand.words)||brand.words.length!==3||brand.words.some(w=>typeof w!=="string"||w.length>60))throw Error("Three authorized paths and three tagline words required");
 const [{React,JSX,createRoot},{originalFactories}]=await Promise.all([import("./runtime.react.js"),import("./engine.original.js")]);
 const factories=new Map(),cache=new Map([[71645,{exports:React}],[43476,{exports:JSX}],[999999,{exports:brand}]]);
 for(let i=1;i<originalFactories.length;i++){if(typeof originalFactories[i]==="number"&&typeof originalFactories[i+1]==="function"){factories.set(originalFactories[i],originalFactories[i+1]);i++;}}
 function originalModule(id){if(cache.has(id))return cache.get(id).exports;const factory=factories.get(id);if(!factory)throw Error("Missing module "+id);const module={exports:{}};cache.set(id,module);const ctx={g:globalThis,r:originalModule,i:originalModule,s:(items,mid=id)=>{let m=cache.get(mid)||module;for(let n=0;n<items.length;){let name=items[n++],kind=items[n++];if(kind===0)m.exports[name]=items[n++];else if(typeof kind==="function")Object.defineProperty(m.exports,name,{get:kind,enumerable:true});else throw Error("Unknown export "+name);}}};factory(ctx,module,module.exports);return module.exports;}
 const Preloader=originalModule(36526).default,Provider=originalModule(53477).TransitionProvider;
 const root=createRoot(container);content.inert=true;content.setAttribute("aria-busy","true");document.documentElement.dataset.lab="loading";
 const complete=()=>{clearTimeout(timer);ready("ready");};window.addEventListener("trionn-loader:complete",complete,{once:true});
 const timer=setTimeout(()=>{if(document.documentElement.dataset.lab==="loading"){container.hidden=true;window.removeEventListener("trionn-loader:complete",complete);ready("fallback");}},15000);
 root.render(React.createElement(Provider,null,React.createElement(Preloader)));return {mode:"animated",root};
 }catch(error){console.warn("Preloader unavailable",error);container.hidden=true;ready("fallback");return {mode:"fallback"};}
}
const host=document.querySelector("[data-preloader-demo]");
if(host){const skip=new URLSearchParams(location.search).get("skip")==="1";const button=document.getElementById("skip-loader");fetch(new URL("./brand.json",import.meta.url)).then(r=>{if(!r.ok)throw Error("Missing brand config");return r.json()}).then(brand=>mountPreloader({container:document.getElementById("preloader-root"),brand,content:host,skip,onReady:()=>{button.hidden=true;}})).catch(()=>{button.hidden=true;document.documentElement.dataset.lab="fallback";});}

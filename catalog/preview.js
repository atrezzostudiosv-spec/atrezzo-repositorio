import {loadFavorites,saveFavorites,listenFavorites} from "./favorites-store.js";
const id = new URLSearchParams(location.search).get("id");
const demo = document.querySelector("#demo");
const repoRoot = "../";
function text(selector,value){document.querySelector(selector).textContent=value}
function instruction(e) {
  return `Integra únicamente ${e.id} (${e.title}) del repositorio https://github.com/atrezzostudiosv-spec/atrezzo-repositorio. Usa exclusivamente ${e.component_html}, ${e.component_css}, ${e.component_js} y su dependencia compartida ${e.component_runtime}. No importes los demás efectos ni fotografías no autorizadas. Respeta la identidad de cliente y verifica móvil, teclado, scroll inverso, reducción de movimiento y las dependencias que correspondan a este ID. Estado ${e.status}; no certificado automáticamente para producción.`;
}
async function boot() {
  try {
    const registryR = await fetch("../registry/components.json");
    if(!registryR.ok) throw Error("Registro no disponible");
    const registry = await registryR.json();
    const e=registry.entries.find(x=>x.id===id);
    if(!e) { text("#pre-title","Componente no encontrado"); throw Error("ID desconocido: "+id); }
    text("#pre-id",e.id+" / "+(e.discovery_group||e.category).toUpperCase());
    text("#pre-title",e.title);
    text("#pre-desc",e.description+" · Uso recomendado: "+e.recommended_for+".");
    text("#pre-use",(e.catalog_qa_status==="passed_internal"?"Demo probada dentro de la biblioteca. ":"Referencia técnica pendiente de pruebas. ")+"Pendiente de verificación dentro de un website cliente. "+e.avoid_when+". Revisar dependencias, medios autorizados, rendimiento y accesibilidad antes de publicar.");
    document.title=e.id+" — "+e.title+" | ATREZZO";
    if(e.id.startsWith("ATZ-STK-"))document.querySelector(".pre-footer").textContent="© Codrops / Sticky Sections · Código MIT · Imágenes originales de Vecteezy excluidas; composiciones abstractas de prueba."; 
    if(e.id.startsWith("ATZ-SEC-"))document.querySelector(".pre-footer").textContent="© ATREZZO Studios · Scroll Sections 01–03 · Código nativo sin dependencias externas · Fotografías de cliente no incluidas.";
    if(e.id.startsWith("ATZ-MOT-"))document.querySelector(".pre-footer").textContent="© ATREZZO Studios · Motion Library V1 · Diseño de muestra e imágenes abstractas · No incluye materiales del cliente original.";
    if(e.id.startsWith("ATZ-PGT-"))document.querySelector(".pre-footer").textContent="© ATREZZO Studios · Transitions 01 / Veil, Split, Iris · Código, CSS e ilustraciones originales del paquete autorizado.";
    if(e.category==="navegacion")document.querySelector(".pre-footer").textContent="© ATREZZO STUDIOS · ATREZZO NAVIGATION 01 · Fotografías originales excluidas por licencia no acreditada.";
    if(e.id.startsWith("ATZ-PGT-"))document.querySelector(".pre-cta").textContent="HAZ CLIC EN UN CAPÍTULO PARA VER LA TRANSICIÓN →";
    document.querySelector("#pre-guide").href="../"+e.technical_guide;
    const favButton=document.querySelector("#preview-favorite");
    let saved=loadFavorites(new Set(registry.entries.map(item=>item.id)));
    const drawFavorite=()=>{
      const active=saved.has(e.id);
      favButton.setAttribute("aria-pressed",String(active));
      favButton.classList.toggle("is-saved",active);
      favButton.textContent=active?"♥ Guardado en favoritos":"♡ Guardar favorito";
      favButton.setAttribute("aria-label",active?"Quitar de favoritos: "+e.title:"Guardar en favoritos: "+e.title);
    };
    drawFavorite();
    favButton.addEventListener("click",()=>{
      saved.has(e.id)?saved.delete(e.id):saved.add(e.id);
      const stored=saveFavorites(saved);
      drawFavorite();
      if(!stored)favButton.title="Guardado solo durante esta visita: el navegador bloquea el almacenamiento";
    });
    listenFavorites(()=>{saved=loadFavorites(new Set(registry.entries.map(item=>item.id)));drawFavorite();});
    const copyButton=document.querySelector("#copy-instruction");
    copyButton.addEventListener("click",async()=>{
      const value=instruction(e);
      try { await navigator.clipboard.writeText(value);copyButton.textContent="Instrucción copiada ✓"; }
      catch {copyButton.textContent="Copia manualmente el ID "+e.id;}
    });
    if(!/^components\/(scroll|transiciones|navegacion|secciones|motion|page-transitions)\/ATZ-(SCR|TRN|NAV|STK|SEC|MOT|PGT)-\d{3}\.html$/.test(e.component_html))throw Error("Ruta HTML inválida");
    if(!/^components\/(scroll|transiciones|navegacion|secciones|motion|page-transitions)\/ATZ-(SCR|TRN|NAV|STK|SEC|MOT|PGT)-\d{3}\.js$/.test(e.component_js))throw Error("Ruta JS inválida");
    const htmlR=await fetch(repoRoot+e.component_html);
    if(!htmlR.ok) throw Error("Fragmento HTML no disponible para "+id);
    const parsed=new DOMParser().parseFromString(await htmlR.text(),"text/html");
    const scene=parsed.body.querySelector(e.id.startsWith("ATZ-PGT-")?".atz-pgt":e.id.startsWith("ATZ-MOT-")?".atz-motion-v1":e.id.startsWith("ATZ-SEC-")?".ats-scope,.ats2-scope,.ss03":e.id.startsWith("ATZ-STK-")?".atz-sticky":e.category==="navegacion"?".atz-nav":".atz-motion");
    if(!scene)throw Error("Escena aislada sin clase .atz-motion");
    if(e.id.startsWith("ATZ-SEC-")){
      if(!/^components\/secciones\/ats[123]\.css$/.test(e.component_css))throw Error("CSS nativo no permitido");
      const style=document.createElement("link");style.rel="stylesheet";style.href=repoRoot+e.component_css;
      document.head.appendChild(style);
      await new Promise((resolve,reject)=>{style.addEventListener("load",resolve,{once:true});style.addEventListener("error",()=>reject(Error("CSS no disponible")),{once:true});});
    }
    if(e.id.startsWith("ATZ-MOT-")){
      if(e.component_css!=="components/motion/atrezzo-motion-v1.css")throw Error("CSS del efecto no permitido");
      const style=document.createElement("link");style.rel="stylesheet";style.href=repoRoot+e.component_css;
      document.head.appendChild(style);
      await new Promise((resolve,reject)=>{style.addEventListener("load",resolve,{once:true});style.addEventListener("error",()=>reject(Error("CSS no disponible")),{once:true});});
    }
    if(e.id.startsWith("ATZ-PGT-")){
      if(e.component_css!=="components/page-transitions/atrezzo-transitions.css")throw Error("CSS original no permitido");
      for(const name of ["atrezzo-transitions.css","showcase.css"]){
        const stylesheet=document.createElement("link");
        stylesheet.rel="stylesheet";stylesheet.href=repoRoot+"components/page-transitions/"+name;
        document.head.appendChild(stylesheet);
        await new Promise((resolve,reject)=>{stylesheet.addEventListener("load",resolve,{once:true});stylesheet.addEventListener("error",()=>reject(Error("CSS de transición no disponible: "+name)),{once:true});});
      }
    }
    if(e.id.startsWith("ATZ-PGT-")){
      for(const img of scene.querySelectorAll("img[src]")){
        const asset=img.getAttribute("src")||"";
        if(!/^\.\.\/components\/page-transitions\/assets\/scene-(atelier|material|night)\.svg$/.test(asset))throw Error("Imagen de preview no autorizada: "+asset);
        img.src=new URL(asset,window.location.href).href;
      }
    }
    demo.replaceChildren(scene);
    if(document.readyState!=="complete")await new Promise(resolve=>window.addEventListener("load",resolve,{once:true}));
    // A single variant module is loaded; the other ten are not imported.
    const {mount}=await import(repoRoot+e.component_js);
    const instance=e.category==="navegacion"||e.id.startsWith("ATZ-SEC-")||e.id.startsWith("ATZ-MOT-")||e.id.startsWith("ATZ-PGT-")?mount(demo):mount(demo,{gsap:window.gsap,ScrollTrigger:window.ScrollTrigger});
    demo.dataset.motion=instance.mode??(e.id.startsWith("ATZ-SEC-")?(window.matchMedia("(prefers-reduced-motion: reduce)").matches?"static":"animated"):"interactive");
    window.__atrezzoPreviewInstance=instance;
    window.addEventListener("pagehide",()=>instance.destroy(),{once:true});
  } catch(err) {
    console.error("ATREZZO preview:",err);
    if(!demo.querySelector(".atz-motion")&&!demo.querySelector(".atz-nav")&&!demo.querySelector(".atz-sticky")&&!demo.querySelector(".ats-scope")&&!demo.querySelector(".ats2-scope")&&!demo.querySelector(".ss03")&&!demo.querySelector(".atz-motion-v1")&&!demo.querySelector(".atz-pgt"))demo.innerHTML='<div class="error">Esta preview no está disponible. Consulta su ficha técnica desde el catálogo.</div>';
    demo.dataset.motion="unavailable";
  }
}
boot();

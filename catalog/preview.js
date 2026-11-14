import {loadFavorites,saveFavorites,listenFavorites} from "./favorites-store.js";
const id = new URLSearchParams(location.search).get("id");
const demo = document.querySelector("#demo");
const repoRoot = "../";
const catalogRevision="20261114-catalog-r3";
function text(selector,value){document.querySelector(selector).textContent=value}
function instruction(e) {
  return `Integra únicamente ${e.id} (${e.title}) del repositorio https://github.com/atrezzostudiosv-spec/atrezzo-repositorio. Usa exclusivamente ${e.component_html}, ${e.component_css}, ${e.component_js} y su dependencia compartida ${e.component_runtime}. No importes los demás efectos ni fotografías no autorizadas. Respeta la identidad de cliente y verifica móvil, teclado, scroll inverso, reducción de movimiento y las dependencias que correspondan a este ID. Si el registro confirma su aprobación en biblioteca, intégralo sin pedir otra aprobación. Conserva el efecto original y verifica su funcionamiento en el proyecto de destino.`;
}
async function boot() {
  try {
    const registryR = await fetch("../registry/components.json?v="+catalogRevision,{cache:"no-cache"});
    if(!registryR.ok) throw Error("Registro no disponible");
    const registry = await registryR.json();
    const e=registry.entries.find(x=>x.id===id);
    if(!e) { text("#pre-title","Componente no encontrado"); throw Error("ID desconocido: "+id); }
    const typography=e.family==="atrezzo-typography-01";
    text("#pre-id",e.id+" / "+(e.discovery_group||e.category).toUpperCase());
    text("#pre-title",e.title);
    text("#pre-desc",e.description+" · Uso recomendado: "+e.recommended_for+".");
    const approved=registry.library_approval?.approved_ids?.includes(e.id)&&e.catalog_qa_status==="passed_internal";
    const approval=document.querySelector("#pre-approval");
    if(approval){approval.textContent=approved?"Aprobado por ATREZZO · Disponible para integrar por ID.":e.catalog_qa_status==="passed_internal"?"Demo verificada en la biblioteca.":"Referencia pendiente de aprobación.";approval.hidden=false;}
    text("#pre-use",(approved?"Componente aprobado. Copia la instrucción para incorporar este ID exacto sin modificar el movimiento. ":"Consulta la ficha técnica antes de integrar. ")+e.avoid_when.replace(/\.$/,"")+".");
    document.title=e.id+" — "+e.title+" | ATREZZO";
    if(e.id.startsWith("ATZ-STK-"))document.querySelector(".pre-footer").textContent="© Codrops / Sticky Sections · Código MIT · Imágenes originales de Vecteezy excluidas; composiciones abstractas de prueba."; 
    if(e.id.startsWith("ATZ-SEC-"))document.querySelector(".pre-footer").textContent="© ATREZZO Studios · Scroll Sections 01–03 · Código nativo sin dependencias externas · Fotografías de cliente no incluidas.";
    if(typography)document.querySelector(".pre-footer").textContent="© ATREZZO Studios · Typography 01 · Implementación original; referencia de movimiento TRIONN, sin recursos de terceros.";
    else if(e.id.startsWith("ATZ-MOT-"))document.querySelector(".pre-footer").textContent="© ATREZZO Studios · Motion Library V1 · Diseño de muestra e imágenes abstractas · No incluye materiales del cliente original.";
    if(e.id.startsWith("ATZ-SVC-"))document.querySelector(".pre-footer").textContent="© ATREZZO STUDIOS · Bento de servicios extraído de la demo Tri-Lane. SVG ilustrativos originales. No atribuir a proyectos reales.";
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
    if(!/^components\/(scroll|transiciones|navegacion|secciones|motion|page-transitions|servicios|typography)\/ATZ-(SCR|TRN|NAV|STK|SEC|MOT|PGT|SVC)-\d{3}\.html$/.test(e.component_html))throw Error("Ruta HTML inválida");
    if(!/^components\/(scroll|transiciones|navegacion|secciones|motion|page-transitions|servicios|typography)\/ATZ-(SCR|TRN|NAV|STK|SEC|MOT|PGT|SVC)-\d{3}\.js$/.test(e.component_js))throw Error("Ruta JS inválida");
    const revision=typography?"?v="+catalogRevision:"";
    const htmlR=await fetch(repoRoot+e.component_html+revision,typography?{cache:"no-cache"}:undefined);
    if(!htmlR.ok) throw Error("Fragmento HTML no disponible para "+id);
    const parsed=new DOMParser().parseFromString(await htmlR.text(),"text/html");
    const scene=parsed.body.querySelector(e.id.startsWith("ATZ-SVC-")?".atz-svc":e.id.startsWith("ATZ-PGT-")?".atz-pgt":typography?".atz-ty":e.id.startsWith("ATZ-MOT-")?".atz-motion-v1":e.id.startsWith("ATZ-SEC-")?".ats-scope,.ats2-scope,.ss03":e.id.startsWith("ATZ-STK-")?".atz-sticky":e.category==="navegacion"?".atz-nav":".atz-motion");
    if(!scene)throw Error("Escena aislada sin clase .atz-motion");
    if(e.id.startsWith("ATZ-SEC-")){
      if(!/^components\/secciones\/ats[123]\.css$/.test(e.component_css))throw Error("CSS nativo no permitido");
      const style=document.createElement("link");style.rel="stylesheet";style.href=repoRoot+e.component_css;
      document.head.appendChild(style);
      await new Promise((resolve,reject)=>{style.addEventListener("load",resolve,{once:true});style.addEventListener("error",()=>reject(Error("CSS no disponible")),{once:true});});
    }
    if(typography){
      if(e.component_css!=="components/typography/atrezzo-typography.css")throw Error("CSS de tipografía no permitido");
      const style=document.createElement("link");style.rel="stylesheet";style.href=repoRoot+e.component_css+revision;
      const loaded=new Promise((ok,no)=>{style.addEventListener("load",ok,{once:true});style.addEventListener("error",()=>no(Error("CSS tipográfico no disponible")),{once:true});});
      document.head.appendChild(style);await loaded;
    } else if(e.id.startsWith("ATZ-MOT-")){
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
    if(e.id.startsWith("ATZ-SVC-")){
      if(e.component_css!=="components/servicios/ATZ-SVC-001.css")throw Error("CSS de servicio no autorizado");
      const base=new URL(repoRoot+e.component_html,location.href);
      for(const img of scene.querySelectorAll(".atz-svc__card>img")){
        const value=img.getAttribute("src")||"";
        if(!/^illustration-0[1-5]\.svg$/.test(value))throw Error("Imagen de bento no autorizada: "+value);
        img.src=new URL(value,base).href;
      }
      // Preview only: match the original Tri-Lane typography. Exported component
      // intentionally has no external font dependency; client selects its brand font.
      const font=document.createElement("link");font.rel="stylesheet";
      font.href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800&family=Manrope:wght@400;600;700&display=swap";
      document.head.appendChild(font);
      const style=document.createElement("link");style.rel="stylesheet";
      style.href=repoRoot+e.component_css;document.head.appendChild(style);
      await new Promise((ok,no)=>{style.addEventListener("load",ok,{once:true});style.addEventListener("error",()=>no(Error("CSS de servicios no disponible")),{once:true});});
    }
    demo.replaceChildren(scene);
    if(document.readyState!=="complete")await new Promise(resolve=>window.addEventListener("load",resolve,{once:true}));
    // A single variant module is loaded; the other ten are not imported.
    const {mount}=await import(repoRoot+e.component_js+revision);
    let instance=e.category==="navegacion"||e.id.startsWith("ATZ-SEC-")||e.id.startsWith("ATZ-MOT-")||e.id.startsWith("ATZ-PGT-")||e.id.startsWith("ATZ-SVC-")?mount(demo):mount(demo,{gsap:window.gsap,ScrollTrigger:window.ScrollTrigger});
    if(typography){
      document.querySelector(".pre-outro").id="next";
      const controls=document.createElement("div");controls.className="pre-bottom";
      const replay=document.createElement("button");replay.type="button";replay.className="pre-button";replay.textContent="Repetir efecto";controls.append(replay);
      const stop=document.createElement("button");stop.type="button";stop.className="pre-button pre-button-secondary";stop.textContent="Desactivar movimiento";controls.append(stop);
      document.querySelector(".pre-intro").append(controls);
      let active=true;
      replay.addEventListener("click",()=>{instance.destroy();instance=mount(demo);window.__atrezzoPreviewInstance=instance;active=true;stop.textContent="Desactivar movimiento";scene.scrollIntoView({block:"start",behavior:"instant"});});
      stop.addEventListener("click",()=>{if(active){instance.destroy();active=false;stop.textContent="Activar movimiento";}else{instance=mount(demo);window.__atrezzoPreviewInstance=instance;active=true;stop.textContent="Desactivar movimiento";}});
      if(e.discovery_trigger==="hover")document.querySelector(".pre-cta").textContent="PASA EL CURSOR O ENFOCA LOS ENLACES ↓";
    }
    demo.dataset.motion=instance.mode??(e.id.startsWith("ATZ-SEC-")?(window.matchMedia("(prefers-reduced-motion: reduce)").matches?"static":"animated"):"interactive");
    window.__atrezzoPreviewInstance=instance;
    window.addEventListener("pagehide",()=>instance.destroy(),{once:true});
  } catch(err) {
    console.error("ATREZZO preview:",err);
    if(!demo.querySelector(".atz-motion")&&!demo.querySelector(".atz-nav")&&!demo.querySelector(".atz-sticky")&&!demo.querySelector(".ats-scope")&&!demo.querySelector(".ats2-scope")&&!demo.querySelector(".ss03")&&!demo.querySelector(".atz-motion-v1")&&!demo.querySelector(".atz-pgt")&&!demo.querySelector(".atz-svc")&&!demo.querySelector(".atz-ty"))demo.innerHTML='<div class="error">Esta preview no está disponible. Consulta su ficha técnica desde el catálogo.</div>';
    demo.dataset.motion="unavailable";
  }
}
boot();

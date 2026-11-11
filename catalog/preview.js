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
    text("#pre-id",e.id+" / "+e.category.toUpperCase());
    text("#pre-title",e.title);
    text("#pre-desc",e.description+" · Uso recomendado: "+e.recommended_for+".");
    text("#pre-use","Patrón de referencia en "+e.status+". "+e.avoid_when+". Antes de migrarlo a un cliente hay que revisar comportamiento, dependencias y contenido autorizado.");
    document.title=e.id+" — "+e.title+" | ATREZZO";
    if(e.id.startsWith("ATZ-STK-"))document.querySelector(".pre-footer").textContent="© Codrops / Sticky Sections · Código MIT · Imágenes originales de Vecteezy excluidas; composiciones abstractas de prueba."; 
    if(e.id.startsWith("ATZ-SEC-"))document.querySelector(".pre-footer").textContent="© ATREZZO Studios · Scroll Sections 01–03 · Código nativo sin dependencias externas · Fotografías de cliente no incluidas.";
    if(e.category==="navegacion")document.querySelector(".pre-footer").textContent="© ATREZZO STUDIOS · ATREZZO NAVIGATION 01 · Fotografías originales excluidas por licencia no acreditada.";
    document.querySelector("#pre-guide").href="../"+e.technical_guide;
    const copyButton=document.querySelector("#copy-instruction");
    copyButton.addEventListener("click",async()=>{
      const value=instruction(e);
      try { await navigator.clipboard.writeText(value);copyButton.textContent="Instrucción copiada ✓"; }
      catch {copyButton.textContent="Copia manualmente el ID "+e.id;}
    });
    if(!/^components\/(scroll|transiciones|navegacion|secciones)\/ATZ-(SCR|TRN|NAV|STK|SEC)-\d{3}\.html$/.test(e.component_html))throw Error("Ruta HTML inválida");
    if(!/^components\/(scroll|transiciones|navegacion|secciones)\/ATZ-(SCR|TRN|NAV|STK|SEC)-\d{3}\.js$/.test(e.component_js))throw Error("Ruta JS inválida");
    const htmlR=await fetch(repoRoot+e.component_html);
    if(!htmlR.ok) throw Error("Fragmento HTML no disponible para "+id);
    const parsed=new DOMParser().parseFromString(await htmlR.text(),"text/html");
    const scene=parsed.body.querySelector(e.id.startsWith("ATZ-SEC-")?".ats-scope,.ats2-scope,.ss03":e.id.startsWith("ATZ-STK-")?".atz-sticky":e.category==="navegacion"?".atz-nav":".atz-motion");
    if(!scene)throw Error("Escena aislada sin clase .atz-motion");
    if(e.id.startsWith("ATZ-SEC-")){
      if(!/^components\/secciones\/ats[123]\.css$/.test(e.component_css))throw Error("CSS nativo no permitido");
      const style=document.createElement("link");style.rel="stylesheet";style.href=repoRoot+e.component_css;
      document.head.appendChild(style);
      await new Promise((resolve,reject)=>{style.addEventListener("load",resolve,{once:true});style.addEventListener("error",()=>reject(Error("CSS no disponible")),{once:true});});
    }
    demo.replaceChildren(scene);
    if(document.readyState!=="complete")await new Promise(resolve=>window.addEventListener("load",resolve,{once:true}));
    // A single variant module is loaded; the other ten are not imported.
    const {mount}=await import(repoRoot+e.component_js);
    const instance=e.category==="navegacion"||e.id.startsWith("ATZ-SEC-")?mount(demo):mount(demo,{gsap:window.gsap,ScrollTrigger:window.ScrollTrigger});
    demo.dataset.motion=instance.mode??(e.id.startsWith("ATZ-SEC-")?(window.matchMedia("(prefers-reduced-motion: reduce)").matches?"static":"animated"):"interactive");
    window.__atrezzoPreviewInstance=instance;
    window.addEventListener("pagehide",()=>instance.destroy(),{once:true});
  } catch(err) {
    console.error("ATREZZO preview:",err);
    if(!demo.querySelector(".atz-motion")&&!demo.querySelector(".atz-nav")&&!demo.querySelector(".atz-sticky")&&!demo.querySelector(".ats-scope")&&!demo.querySelector(".ats2-scope")&&!demo.querySelector(".ss03"))demo.innerHTML='<div class="error">Esta preview no está disponible. Consulta su ficha técnica desde el catálogo.</div>';
    demo.dataset.motion="unavailable";
  }
}
boot();

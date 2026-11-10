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
    if(e.category==="navegacion")document.querySelector(".pre-footer").textContent="© ATREZZO STUDIOS · ATREZZO NAVIGATION 01 · Fotografías originales excluidas por licencia no acreditada.";
    document.querySelector("#pre-guide").href="../"+e.technical_guide;
    const copyButton=document.querySelector("#copy-instruction");
    copyButton.addEventListener("click",async()=>{
      const value=instruction(e);
      try { await navigator.clipboard.writeText(value);copyButton.textContent="Instrucción copiada ✓"; }
      catch {copyButton.textContent="Copia manualmente el ID "+e.id;}
    });
    if(!/^components\/(scroll|transiciones|navegacion)\/ATZ-(SCR|TRN|NAV)-\d{3}\.html$/.test(e.component_html))throw Error("Ruta HTML inválida");
    if(!/^components\/(scroll|transiciones|navegacion)\/ATZ-(SCR|TRN|NAV)-\d{3}\.js$/.test(e.component_js))throw Error("Ruta JS inválida");
    const htmlR=await fetch(repoRoot+e.component_html);
    if(!htmlR.ok) throw Error("Fragmento HTML no disponible para "+id);
    const parsed=new DOMParser().parseFromString(await htmlR.text(),"text/html");
    const scene=parsed.body.querySelector(e.category==="navegacion"?".atz-nav":".atz-motion");
    if(!scene)throw Error("Escena aislada sin clase .atz-motion");
    demo.replaceChildren(scene);
    if(document.readyState!=="complete")await new Promise(resolve=>window.addEventListener("load",resolve,{once:true}));
    // A single variant module is loaded; the other ten are not imported.
    const {mount}=await import(repoRoot+e.component_js);
    const instance=e.category==="navegacion"?mount(demo):mount(demo,{gsap:window.gsap,ScrollTrigger:window.ScrollTrigger});
    demo.dataset.motion=instance.mode;
    window.__atrezzoPreviewInstance=instance;
    window.addEventListener("pagehide",()=>instance.destroy(),{once:true});
  } catch(err) {
    console.error("ATREZZO preview:",err);
    if(!demo.querySelector(".atz-motion")&&!demo.querySelector(".atz-nav"))demo.innerHTML='<div class="error">Esta preview no está disponible. Consulta su ficha técnica desde el catálogo.</div>';
    demo.dataset.motion="unavailable";
  }
}
boot();

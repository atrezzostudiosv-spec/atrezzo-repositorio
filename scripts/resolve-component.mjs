import { readFileSync, existsSync } from "node:fs";
import { dirname, join, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const root=resolve(dirname(fileURLToPath(import.meta.url)),"..");
const registryPath=join(root,"registry/components.json");
const allowedId=/^ATZ-(SCR|TRN|NAV|STK|SEC|MOT|PGT|SVC|MIC|CTR)-\d{3}$/;
const allowedFiles=/^components\/(scroll|transiciones|navegacion|secciones|motion|page-transitions|servicios|runtime|typography|microinteractions|creative-transitions)\/[A-Za-z0-9-]+\.(html|css|js)$/;

const allowedAsset=/^components\/servicios\/illustration-0[1-5]\.svg$/;
function requireAsset(path){if(!allowedAsset.test(path))throw Error("Asset de componentes no permitido: "+path);const full=resolve(root,path);if(!full.startsWith(root+sep)||!existsSync(full))throw Error("Asset ausente: "+path);return path;}
function requireFile(path){
  if(!allowedFiles.test(path))throw Error("Ruta del registro no permitida: "+path);
  const full=resolve(root,path);
  if(!full.startsWith(root+sep)||!existsSync(full))throw Error("Archivo ausente: "+path);
  return path;
}
export function resolveComponent(id){
  if(typeof id!=="string"||!allowedId.test(id))throw Error("ID inválido: "+String(id));
  const registry=JSON.parse(readFileSync(registryPath,"utf8"));
  const pending=(registry.source_approved_entries||[]).find(e=>e.id===id);
  if(pending&&id==="ATZ-SEC-010"){
    const base="components/secciones/ATZ-SEC-010/";
    const manifest=JSON.parse(readFileSync(join(root,base,"manifest.json"),"utf8"));
    if(manifest.id!==id)throw Error("Manifest ID mismatch");
    const files=["index.html","component.css","component.js","engine.original.js","three-r128.original.js","three-adapter.js","projects.json","LICENSE-three.txt","README.md","manifest.json"].map(name=>base+name);
    for(const file of files){if(!existsSync(join(root,file)))throw Error("Archivo ausente: "+file);}
    return {id,title:pending.title,category:pending.category,variant:pending.variant,selector:pending.selector,status:pending.status,client_ready:false,library_approved:false,source_visual_approved:true,files:{html:base+"index.html",css:base+"component.css",js:base+"component.js",runtime:base+"engine.original.js"},package_files:files,technical_guide:pending.technical_guide,preview:pending.preview,licensing:"Original autorizado; Three.js r128 MIT. Sin medios de cliente.",use_for:pending.recommended_for,avoid_when:pending.avoid_when,instruction:"Integrar como página autónoma, una instancia por documento, conservar motor original. QA autónoma pendiente."};
  }
  const matches=registry.entries.filter(e=>e.id===id);
  if(matches.length!==1)throw Error("ID no único o desconocido: "+id);
  const e=matches[0];
  const selected={
    id:e.id,title:e.title,category:e.category,variant:e.variant,
    selector:e.selector,status:e.status,client_ready:e.client_ready===true,
    library_approved:registry.library_approval?.approved_ids?.includes(e.id)===true&&e.catalog_qa_status==="passed_internal",
    use_for:e.recommended_for,avoid_when:e.avoid_when,
    files:{
      html:requireFile(e.component_html),css:requireFile(e.component_css),
      js:requireFile(e.component_js),runtime:requireFile(e.component_runtime),
      ...(e.component_preflight?{preflight:requireFile(e.component_preflight)}:{})
    },
    assets:(e.component_assets||[]).map(requireAsset),
    technical_guide:e.technical_guide,preview:e.preview,
    licensing:(e.category==="navegacion"||(e.id.startsWith("ATZ-SEC-")||e.id.startsWith("ATZ-MOT-")||e.id.startsWith("ATZ-PGT-")||e.id.startsWith("ATZ-SVC-")||e.id.startsWith("ATZ-MIC-")||e.id.startsWith("ATZ-CTR-")))?"Código original Atrezzo. Fotografías no autorizadas automáticamente.":e.id.startsWith("ATZ-STK-")?"Codrops Sticky Sections: código MIT. Verificar por separado imágenes Vecteezy y librerías.":"Código Codrops MIT. Revisar GSAP, fotografías y fuentes por separado.",
    instruction:"Usar únicamente los archivos registrados para el ID; revisar tipo de navegación, auditar cliente y no publicar sin QA."
  };
  if(!selected.files.js.endsWith("/"+id+".js"))throw Error("El JS no coincide con el ID");
  if(!selected.files.html.endsWith("/"+id+".html"))throw Error("El HTML no coincide con el ID");
  if(!selected.files.js.startsWith("components/"+(e.id.startsWith("ATZ-SEC-")?"secciones":e.family==="atrezzo-typography-01"?"typography":e.id.startsWith("ATZ-MOT-")?"motion":selected.category)+"/"))throw Error("Categoría no coincide");
  return selected;
}
export function createIntegrationPrompt(id){
  const e=resolveComponent(id);
  if(e.package_files)return ["ATREZZO — INTEGRACIÓN POR ID EXACTO","Repositorio: https://github.com/atrezzostudiosv-spec/atrezzo-repositorio","ID: "+e.id+" — "+e.title,"Original aprobado visualmente. QA autónoma pendiente; client_ready=false.","Leer AGENTS.md, registry/components.json (source_approved_entries) y "+e.technical_guide,"Exportar: node scripts/export-component.mjs "+e.id+" --out ./salida","Archivos exactos:",...e.package_files.map(x=>"- "+x),"Usar index.html como página autónoma; editar projects.json. Three.js r128 incluido; conservar LICENSE-three.txt. Una instancia por documento; no recrear motor ni copiar medios de TRIONN.","Verificar WebGL2, scroll inverso, responsive 375/768/1024/1440, reduced-motion y errores antes de publicar."].join("\n");
  return [
    "ATREZZO — INTEGRACIÓN POR ID EXACTO",
    "Repositorio: https://github.com/atrezzostudiosv-spec/atrezzo-repositorio",
    "ID: "+e.id+" — "+e.title,
    e.library_approved?"Biblioteca: APROBADO. Integrar este ID exacto sin pedir una nueva aprobación.":"Biblioteca: pendiente de aprobación.",
    "Estado técnico de integración en cliente: client_ready="+e.client_ready+" (no invalida la aprobación de biblioteca).",
    "Antes de modificar: AGENTS.md y "+e.technical_guide,
    "Archivos que se deben incorporar exclusivamente:",
    "- "+e.files.html,"- "+e.files.css,"- "+e.files.js,"- "+e.files.runtime,
    ...(e.files.preflight?["- "+e.files.preflight+" (incluir en <head> de todas las páginas)"]:[]),
    ...(e.assets||[]).map(x=>"- "+x+" (imagen SVG de demo; sustituir por medios del cliente)"),
    (e.category==="navegacion"||e.id.startsWith("ATZ-SEC-")||e.id.startsWith("ATZ-MOT-")||e.id.startsWith("ATZ-PGT-")||e.id.startsWith("ATZ-SVC-")||e.id.startsWith("ATZ-MIC-")||e.id.startsWith("ATZ-CTR-"))?"Dependencias externas: ninguna.":"Dependencias externas: GSAP y ScrollTrigger; comprobar licencia.",
    "Auditar primero el sitio del cliente, conservar su diseño y contenido aprobado.",
    "No importar otros IDs ni fotos del paquete original.",
    "Validar a 375/768/1024/1440 px, teclado, scroll inverso, reduced-motion y rendimiento.",
    "El ejecutor debe comprobar el resultado en el website de destino, sin rediseñar ni volver a someter a aprobación el componente."
  ].join("\n");
}
if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url)){
  try{
    const id=process.argv[2];
    console.log(process.argv.includes("--prompt")?createIntegrationPrompt(id):JSON.stringify(resolveComponent(id),null,2));
  }catch(e){console.error("ATREZZO:",e.message);process.exitCode=1;}
}

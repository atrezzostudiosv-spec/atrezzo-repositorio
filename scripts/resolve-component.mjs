import { readFileSync, existsSync } from "node:fs";
import { dirname, join, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const root=resolve(dirname(fileURLToPath(import.meta.url)),"..");
const registryPath=join(root,"registry/components.json");
const allowedId=/^ATZ-(SCR|TRN|NAV|STK)-\d{3}$/;
const allowedFiles=/^components\/(scroll|transiciones|navegacion|runtime)\/[A-Za-z0-9-]+\.(html|css|js)$/;

function requireFile(path){
  if(!allowedFiles.test(path))throw Error("Ruta del registro no permitida: "+path);
  const full=resolve(root,path);
  if(!full.startsWith(root+sep)||!existsSync(full))throw Error("Archivo ausente: "+path);
  return path;
}
export function resolveComponent(id){
  if(typeof id!=="string"||!allowedId.test(id))throw Error("ID inválido: "+String(id));
  const registry=JSON.parse(readFileSync(registryPath,"utf8"));
  const matches=registry.entries.filter(e=>e.id===id);
  if(matches.length!==1)throw Error("ID no único o desconocido: "+id);
  const e=matches[0];
  const selected={
    id:e.id,title:e.title,category:e.category,variant:e.variant,
    selector:e.selector,status:e.status,client_ready:e.client_ready===true,
    use_for:e.recommended_for,avoid_when:e.avoid_when,
    files:{
      html:requireFile(e.component_html),css:requireFile(e.component_css),
      js:requireFile(e.component_js),runtime:requireFile(e.component_runtime)
    },
    technical_guide:e.technical_guide,preview:e.preview,
    licensing:e.category==="navegacion"?"Código original Atrezzo. Fotografías no autorizadas automáticamente.":e.id.startsWith("ATZ-STK-")?"Codrops Sticky Sections: código MIT. Verificar por separado imágenes Vecteezy y librerías.":"Código Codrops MIT. Revisar GSAP, fotografías y fuentes por separado.",
    instruction:"Usar solo cuatro archivos del ID; auditar proyecto cliente y preservar diseño. No publicar sin QA en cliente."
  };
  if(!selected.files.js.endsWith("/"+id+".js"))throw Error("El JS no coincide con el ID");
  if(!selected.files.html.endsWith("/"+id+".html"))throw Error("El HTML no coincide con el ID");
  if(!selected.files.js.startsWith("components/"+selected.category+"/"))throw Error("Categoría no coincide");
  return selected;
}
export function createIntegrationPrompt(id){
  const e=resolveComponent(id);
  return [
    "ATREZZO — INTEGRACIÓN POR ID EXACTO",
    "Repositorio: https://github.com/atrezzostudiosv-spec/atrezzo-repositorio",
    "ID: "+e.id+" — "+e.title,
    "Estado: "+e.status+"; client_ready="+e.client_ready,
    "Antes de modificar: AGENTS.md y "+e.technical_guide,
    "Archivos que se deben incorporar exclusivamente:",
    "- "+e.files.html,"- "+e.files.css,"- "+e.files.js,"- "+e.files.runtime,
    e.category==="navegacion"?"Dependencias externas: ninguna.":"Dependencias externas: GSAP y ScrollTrigger; comprobar licencia.",
    "Auditar primero el sitio del cliente, conservar su diseño y contenido aprobado.",
    "No importar otros IDs ni fotos del paquete original.",
    "Validar a 375/768/1024/1440 px, teclado, scroll inverso, reduced-motion y rendimiento.",
    "No declarar listo para producción sin verificarlo en la web del cliente."
  ].join("\n");
}
if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url)){
  try{
    const id=process.argv[2];
    console.log(process.argv.includes("--prompt")?createIntegrationPrompt(id):JSON.stringify(resolveComponent(id),null,2));
  }catch(e){console.error("ATREZZO:",e.message);process.exitCode=1;}
}

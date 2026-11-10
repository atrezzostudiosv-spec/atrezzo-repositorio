import { copyFileSync, existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { resolveComponent, createIntegrationPrompt } from "./resolve-component.mjs";

const root=resolve(dirname(fileURLToPath(import.meta.url)),"..");
export function exportComponent(id,out){
  const selected=resolveComponent(id);
  if(typeof out!=="string"||!out.trim())throw Error("Indica carpeta de salida --out.");
  const target=resolve(out,"atrezzo");
  if(existsSync(target))throw Error("La carpeta atrezzo ya existe: no sobrescribir.");
  const needed=[...Object.values(selected.files),...(selected.category==="navegacion"?[]:[selected.id.startsWith("ATZ-STK-")?"sources/codrops-sticky-sections/LICENSE":"sources/codrops-layout-formations/LICENSE"])];
  for(const name of needed){
    if(!existsSync(join(root,name)))throw Error("Dependencia faltante: "+name);
  }
  const instructions=[
    "# ATREZZO: "+selected.id,"",
    "Archivos del paquete:",
    ...needed.map(name=>"- "+name),"",
    "Este paquete contiene UN componente. No modifica HTML, CSS ni JS del cliente.",
    "1. Audita el repositorio y el diseño aprobado del cliente.",
    "2. Inserta el fragmento HTML en la sección elegida.",
    "3. Incluye el CSS del paquete, GSAP y ScrollTrigger con sus licencias.",
    "4. Importa mount desde el JS de la variante y pasa su contenedor.",
    "5. Sustituye gradientes por fotos autorizadas; verifica responsive, scroll y teclado.",
    "6. Estado actual: "+selected.status+"; client_ready="+selected.client_ready+".",
    "",
    "INSTRUCCIÓN PARA CHATGPT:",
    createIntegrationPrompt(id),""
  ].join("\n");
  mkdirSync(target,{recursive:true});
  for(const name of needed){
    const destination=join(target,name);
    mkdirSync(dirname(destination),{recursive:true});
    copyFileSync(join(root,name),destination);
  }
  writeFileSync(join(target,"component.json"),JSON.stringify(selected,null,2)+"\n",{flag:"wx"});
  writeFileSync(join(target,"INTEGRATION.md"),instructions,{flag:"wx"});
  return {id:selected.id,target,files:needed};
}
if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url)){
  try{
    const pos=process.argv.indexOf("--out");
    if(pos<0||!process.argv[pos+1])throw Error("Uso: node scripts/export-component.mjs ATZ-SCR-008 --out ./carpeta");
    const result=exportComponent(process.argv[2],process.argv[pos+1]);
    console.log("Exportado "+result.id+" a "+result.target+" ("+result.files.length+" archivos de origen).");
  }catch(e){console.error("ATREZZO:",e.message);process.exitCode=1;}
}

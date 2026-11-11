import assert from "node:assert/strict";
import { mkdtempSync, readdirSync, readFileSync, rmSync, existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { resolveComponent, createIntegrationPrompt } from "../scripts/resolve-component.mjs";
import { exportComponent } from "../scripts/export-component.mjs";

const registry=JSON.parse(readFileSync(new URL("../registry/components.json",import.meta.url),"utf8"));
assert.equal(registry.entries.length,49);
for(const e of registry.entries){
  const contract=resolveComponent(e.id);
  assert.equal(contract.id,e.id);
  assert.equal(contract.status,"validation");
  assert.equal(contract.client_ready,false);
  assert.equal(Object.keys(contract.files).length,e.id.startsWith("ATZ-PGT-")?5:4,"Exact ID file contract");
  const script=readFileSync(new URL("../"+contract.files.js,import.meta.url),"utf8");
  assert(script.includes((e.category==="navegacion"||e.id.startsWith("ATZ-MOT-")||e.id.startsWith("ATZ-PGT-")||e.id.startsWith("ATZ-SVC-"))?"./runtime.js":e.id.startsWith("ATZ-SEC-")?"./ats"+(e.id.slice(-3)<="003"?"1":e.id.slice(-3)<="006"?"2":"3")+"-engine.js":e.id.startsWith("ATZ-STK-")?"../runtime/sticky-lifecycle.js":"../runtime/lifecycle.js"),e.id+" must import correct shared runtime");
  for(const other of registry.entries.filter(x=>x.id!==e.id)) {
    assert(!script.includes(other.id+".js"),e.id+" has unwanted dependency on "+other.id);
  }
  const prompt=createIntegrationPrompt(e.id);
  assert(prompt.includes("ID: "+e.id),e.id+" prompt missing exact ID");
  assert(prompt.includes("client_ready=false"),e.id+" prompt missing production warning");
  assert(prompt.includes(contract.files.js),e.id+" prompt missing own JS");
}
assert.throws(()=>resolveComponent("ATZ-SCR-000"),/desconocido/);
assert.throws(()=>resolveComponent("ATZ-SCR-008_extra"),/inválido/);
assert.throws(()=>resolveComponent("../registry/components.json"),/inválido/);
const temp=mkdtempSync(join(tmpdir(),"atrezzo-phase4-"));
try{
  const out=exportComponent("ATZ-SCR-008",temp);
  assert.equal(out.id,"ATZ-SCR-008");
  assert.equal(out.files.length,5,"Four functional files plus source license");
  const all=readdirSync(join(temp,"atrezzo"),{recursive:true}).filter(v=>v.endsWith(".html")||v.endsWith(".js")||v.endsWith(".css"));
  assert.equal(all.length,4,"Unexpected extra HTML/JS/CSS in exported package");
  assert(all.some(v=>v.endsWith("ATZ-SCR-008.js")));
  assert(all.some(v=>v.endsWith("ATZ-SCR-008.html")));
  assert(!all.some(v=>v.includes("ATZ-SCR-007")));
  assert(!all.some(v=>v.includes("ATZ-SCR-009")));
  assert(existsSync(join(out.target,"component.json")));
  assert(existsSync(join(out.target,"INTEGRATION.md")));
  assert(existsSync(join(out.target,"sources/codrops-layout-formations/LICENSE")));
  const m=JSON.parse(readFileSync(join(out.target,"component.json"),"utf8"));
  assert.equal(m.id,"ATZ-SCR-008");
  assert.equal(m.client_ready,false);
  assert.throws(()=>exportComponent("ATZ-SCR-008",temp),/ya existe/,"Must not silently overwrite");
  assert(!existsSync(join(temp,"index.html")),"Do not modify host website");
  const navOut=exportComponent("ATZ-NAV-002",join(temp,"navigation"));
  assert.equal(navOut.files.length,4,"Original Atrezzo navigation must not import Codrops license");
  const navItems=readdirSync(join(temp,"navigation","atrezzo"),{recursive:true}).filter(v=>/\.(html|css|js)$/.test(v));
  assert.equal(navItems.length,4,"Navigation export must contain only one pattern plus runtime");
  assert(navItems.some(v=>v.endsWith("ATZ-NAV-002.js")));
  assert(!navItems.some(v=>v.endsWith("ATZ-NAV-001.js")));
  assert(!navItems.some(v=>v.endsWith("ATZ-NAV-003.js")));
  const stickyOut=exportComponent("ATZ-STK-015",join(temp,"sticky"));
  assert.equal(stickyOut.files.length,5,"Sticky export must contain four module files and its original MIT license");
  assert(existsSync(join(stickyOut.target,"sources/codrops-sticky-sections/LICENSE")));
  const stickyItems=readdirSync(stickyOut.target,{recursive:true}).filter(v=>/\.(html|css|js)$/.test(v));
  assert.equal(stickyItems.length,4,"Sticky export must not bring other variants");
  assert(stickyItems.some(v=>v.endsWith("ATZ-STK-015.js")));
  assert(!stickyItems.some(v=>v.endsWith("ATZ-STK-014.js")));
  const native=exportComponent("ATZ-SEC-008",join(temp,"native"));
  assert.equal(native.files.length,4,"Native Atrezzo component does not need third-party MIT license");
  const nativeFiles=readdirSync(native.target,{recursive:true}).filter(v=>/\.(html|css|js)$/.test(v));
  assert.equal(nativeFiles.length,4,"Native export contains one entry and its family CSS/runtime only");
  assert(nativeFiles.some(v=>v.endsWith("ATZ-SEC-008.js")));
  assert(!nativeFiles.some(v=>v.endsWith("ATZ-SEC-007.js")));
  const original=exportComponent("ATZ-MOT-004",join(temp,"motion"));
  assert.equal(original.files.length,4,"Motion V1 export includes only own four source files");
  const onlyMotion=readdirSync(original.target,{recursive:true}).filter(v=>/\.(html|css|js)$/.test(v));
  assert.equal(onlyMotion.length,4,"Original Motion V1 export is isolated");
  assert(onlyMotion.some(v=>v.endsWith("ATZ-MOT-004.js")));
  assert(!onlyMotion.some(v=>v.endsWith("ATZ-MOT-005.js")));
  const page=exportComponent("ATZ-PGT-003",join(temp,"page-transition"));
  assert.equal(page.files.length,5,"Page transition export includes original preflight as fifth file");
  assert(existsSync(join(page.target,"components/page-transitions/preflight.js")));
  const standalone=readdirSync(page.target,{recursive:true}).filter(v=>/\.(html|css|js)$/.test(v));
  assert.equal(standalone.length,5,"Exact 5-file export without unrelated variants or Codrops license");
  assert(standalone.some(v=>v.endsWith("ATZ-PGT-003.js")));
  assert(!standalone.some(v=>v.endsWith("ATZ-PGT-001.js")));
  assert(!standalone.some(v=>v.endsWith("ATZ-PGT-002.js")));
  const bento=exportComponent("ATZ-SVC-001",join(temp,"services"));
  assert.equal(bento.files.length,9,"Bento must export 4 module files and 5 illustrated placeholders");
  const bentoFiles=readdirSync(bento.target,{recursive:true});
  assert.equal(bentoFiles.filter(v=>v.endsWith(".svg")).length,5,"Five SVG placeholders shipped with standalone component");
  assert(bentoFiles.some(v=>v.endsWith("ATZ-SVC-001.html")));
  assert(bentoFiles.some(v=>v.endsWith("ATZ-SVC-001.js")));
  assert(!bentoFiles.some(v=>v.includes("ATZ-PGT-001.js")));



}finally{rmSync(temp,{recursive:true,force:true});}
console.log("PASS FASE 4+5: exact ID resolution for 49, no cross-imports, safe isolated export, overwrite refusal, preserved client website.");

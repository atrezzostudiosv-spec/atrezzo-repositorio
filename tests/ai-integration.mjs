import assert from "node:assert/strict";
import { mkdtempSync, readdirSync, readFileSync, rmSync, existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { resolveComponent, createIntegrationPrompt } from "../scripts/resolve-component.mjs";
import { exportComponent } from "../scripts/export-component.mjs";

const registry=JSON.parse(readFileSync(new URL("../registry/components.json",import.meta.url),"utf8"));
assert.equal(registry.entries.length,14);
for(const e of registry.entries){
  const contract=resolveComponent(e.id);
  assert.equal(contract.id,e.id);
  assert.equal(contract.status,"validation");
  assert.equal(contract.client_ready,false);
  assert.equal(Object.keys(contract.files).length,4,"Only four functional file references");
  const script=readFileSync(new URL("../"+contract.files.js,import.meta.url),"utf8");
  assert(script.includes(e.category==="navegacion"?"./runtime.js":"../runtime/lifecycle.js"),e.id+" must import correct shared runtime");
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
  assert.equal(navOut.files.length,5);
  const navItems=readdirSync(join(temp,"navigation","atrezzo"),{recursive:true}).filter(v=>/\.(html|css|js)$/.test(v));
  assert.equal(navItems.length,4,"Navigation export must contain only one pattern plus runtime");
  assert(navItems.some(v=>v.endsWith("ATZ-NAV-002.js")));
  assert(!navItems.some(v=>v.endsWith("ATZ-NAV-001.js")));
  assert(!navItems.some(v=>v.endsWith("ATZ-NAV-003.js")));
}finally{rmSync(temp,{recursive:true,force:true});}
console.log("PASS FASE 4+5: exact ID resolution for 14, no cross-imports, safe isolated export, overwrite refusal, preserved client website.");

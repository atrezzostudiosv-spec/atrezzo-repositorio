import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
const reg=JSON.parse(readFileSync(new URL("../registry/components.json",import.meta.url),"utf8"));
assert.equal(reg.entries.length,65);
assert.deepEqual(reg.discovery_groups.map(g=>g.id),["servicios","heroes","tipografia","galerias","sticky","narrativa","navegacion","transiciones-paginas","transiciones","microinteracciones","transiciones-creativas"]);
assert.deepEqual(reg.discovery_groups.map(g=>reg.entries.filter(e=>e.discovery_group===g.id).length),[1,2,9,12,15,10,3,3,1,5,4]);
assert(reg.entries.every(e=>!e.client_ready&&e.status==="validation"&&(e.catalog_qa_status==="passed_internal"||(e.family==="atrezzo-typography-01"&&e.catalog_qa_status==="pending"))));
assert.equal(reg.entries.filter(e=>e.family==="atrezzo-typography-01").length,7);assert(reg.entries.filter(e=>e.family!=="atrezzo-typography-01").every(e=>e.catalog_qa_status==="passed_internal"));
assert.equal(reg.entries.find(e=>e.id==="ATZ-NAV-001").discovery_trigger,"click");
assert.equal(reg.entries.find(e=>e.id==="ATZ-NAV-003").discovery_trigger,"mixed");
assert.equal(reg.entries.find(e=>e.id==="ATZ-PGT-003").discovery_trigger,"navigation");
for(const path of ["catalog/app.js","catalog/preview.js","catalog/styles.css","catalog/index.html"]){
  const text=readFileSync(new URL("../"+path,import.meta.url),"utf8");
  assert(text.includes("favorite"),"Missing favorite in "+path);
}
// Registration-to-preview contract: new three-letter families must not silently return to #library.
const app=readFileSync(new URL("../catalog/app.js",import.meta.url),"utf8");
assert(app.includes("ATZ-[A-Z]{3}"),"Generic three-letter component prefixes must be supported");
for(const e of reg.entries){
 assert.match(e.id,/^ATZ-[A-Z]{3}-\d{3}$/,"Invalid component identifier");
 assert.equal(e.preview,"catalog/preview.html?id="+e.id,"Every catalog ID must have an individual preview");
}
const html=readFileSync(new URL("../catalog/index.html",import.meta.url),"utf8");
assert(html.includes('id="count-tested"')&&!html.includes("LISTAS PARA CLIENTES"));
const values=new Map();
globalThis.localStorage={getItem:key=>values.get(key)||null,setItem:(key,value)=>values.set(key,value)};
const {loadFavorites,saveFavorites}=await import("../catalog/favorites-store.js");
const valid=new Set(reg.entries.map(e=>e.id));
assert.equal(loadFavorites(valid).size,0);
assert.equal(saveFavorites(new Set(["ATZ-STK-006","ATZ-SEC-005"])),true);
assert.deepEqual([...loadFavorites(valid)],["ATZ-STK-006","ATZ-SEC-005"]);
values.set("atrezzo:catalog:favorites:v1",'["ATZ-STK-006","X","ATZ-STK-006",42]');
assert.deepEqual([...loadFavorites(valid)],["ATZ-STK-006"]);
values.set("atrezzo:catalog:favorites:v1","{broken");
assert.equal(loadFavorites(valid).size,0);
globalThis.localStorage={getItem(){throw Error("private")},setItem(){throw Error("private")}};
assert.equal(loadFavorites(valid).size,0);
assert.equal(saveFavorites(new Set(["ATZ-STK-006"])),false);
console.log("PASS discovery: 65 components, 11 groups, demo QA != client ready, local favorites persistence and blocked-storage fallback.");

// Keep release URLs coordinated: a fresh registry must not be paired with an old preview loader.
const release="20261114-catalog-r5";
assert(readFileSync(new URL("../catalog/index.html",import.meta.url),"utf8").includes("app.js?v="+release));
assert(readFileSync(new URL("../catalog/preview.html",import.meta.url),"utf8").includes("preview.js?v="+release));
assert(app.includes('const catalogRevision="'+release+'"'));
assert(readFileSync(new URL("../catalog/preview.js",import.meta.url),"utf8").includes('const catalogRevision="'+release+'"'));

assert.deepEqual(reg.library_approval.approved_ids,reg.entries.map(e=>e.id));
assert(reg.entries.every(e=>e.catalog_qa_status==="passed_internal"));
assert(app.includes('approved?"Aprobado"'));

import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
const reg=JSON.parse(readFileSync(new URL("../registry/components.json",import.meta.url),"utf8"));
assert.equal(reg.entries.length,49);
assert.deepEqual(reg.discovery_groups.map(g=>g.id),["servicios","heroes","tipografia","galerias","sticky","narrativa","navegacion","transiciones-paginas","transiciones"]);
assert.deepEqual(reg.discovery_groups.map(g=>reg.entries.filter(e=>e.discovery_group===g.id).length),[1,2,2,12,15,10,3,3,1]);
assert(reg.entries.every(e=>["passed_internal","pending"].includes(e.catalog_qa_status)&&!e.client_ready&&e.status==="validation"));
assert.equal(reg.entries.filter(e=>e.catalog_qa_status==="passed_internal").length,48,"48 existing demos remain tested, Bento pending CI");
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
console.log("PASS discovery: 49 components, 9 groups, demo QA != client ready, local favorites persistence and blocked-storage fallback.");

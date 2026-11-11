import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {join,dirname} from "node:path";
import {fileURLToPath} from "node:url";
const root=join(dirname(fileURLToPath(import.meta.url)),"..");
const registry=JSON.parse(readFileSync(join(root,"registry/components.json"),"utf8"));
const source=JSON.parse(readFileSync(join(root,"registry/native-scroll-components.json"),"utf8"));
const nine=registry.entries.filter(x=>x.id.startsWith("ATZ-SEC-"));
assert.equal(source.count,9);assert.equal(nine.length,9);assert.equal(new Set(nine.map(x=>x.id)).size,9);
globalThis.window={}; // only module evaluation; mount receives a real DOM Element in browser.
for(const e of nine){
  const s=source.variants.find(x=>x.id===e.id);
  assert(s,e.id+" missing source reference");
  assert.equal(e.client_ready,false);assert.equal(e.status,"validation");assert.equal(e.interaction,"scroll");
  assert.deepEqual(e.dependencies,[]);assert.equal(e.component_html,s.html);
  assert.equal(e.component_css,s.css);assert.equal(e.component_js,s.js);assert.equal(e.component_runtime,s.runtime);
  const html=readFileSync(join(root,s.html),"utf8");
  assert(html.includes('data-atz-id="'+e.id+'"'),e.id+" HTML identity mismatch");
  assert(html.includes("data:image/svg+xml,"),e.id+" demo images must be placeholders");
  const css=readFileSync(join(root,s.css),"utf8");
  const rootClass=s.family==="ats1"?".ats-scope":s.family==="ats2"?".ats2-scope":".ss03";
  assert(css.includes(rootClass),e.id+" CSS is not scoped");
  assert(css.includes("prefers-reduced-motion"),e.id+" reduced motion fallback absent");
  const mod=await import("../"+s.js);
  assert.equal(mod.id,e.id);assert.equal(mod.variant,s.variant);
  assert.equal(typeof mod.mount,"function");
  assert(!readFileSync(join(root,s.js),"utf8").includes("new Lenis("),e.id+" cannot install Lenis");
}
for(const family of ["ats1","ats2","ats3"]){
  const js=readFileSync(join(root,"components/secciones/"+family+"-engine.js"),"utf8");
  assert(/requestAnimationFrame/.test(js),family+" must use native frame callbacks");
  assert(/removeEventListener/.test(js),family+" must release listeners on teardown");
  assert(!js.includes("gsap.registerPlugin"),family+" must not install GSAP");
}
console.log("PASS original Atrezzo Scroll Sections: 9 approved variants, 3 isolated native engines, scoped CSS, reduced motion, original progress and no GSAP.");

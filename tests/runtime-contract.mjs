import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const root=join(dirname(fileURLToPath(import.meta.url)),"..");
const registry=JSON.parse(readFileSync(join(root,"registry/components.json"),"utf8"));
assert.equal(registry.entries.length,29,"All approved collections must contain 29 IDs");
assert.equal(new Set(registry.entries.map(e=>e.id)).size,registry.entries.length,"IDs must be unique");
const css=readFileSync(join(root,"components/runtime/atrezzo-motion.css"),"utf8");
assert(css.includes(".atz-motion .grid"),"CSS must be isolated");
assert(!/(^|\n)\s*body\s*\{/.test(css),"Runtime CSS must not override client body");
class StubElement {
  constructor(kind="host"){this.kind=kind;this.offsetLeft=30;this.offsetTop=40;this.offsetWidth=150;this.offsetHeight=170;this.parentNode={querySelector:()=>({})};}
  matches(selector){return this.kind==="scene"&&selector===".frame";}
  querySelector(selector){if(selector===".frame")return new StubElement("scene");return new StubElement("element");}
  querySelectorAll(selector){return selector===".grid__img"?Array.from({length:36},()=>new StubElement("tile")):selector===".grid__item"?[new StubElement("item")]:[];}
}
globalThis.Element=StubElement;
globalThis.window={innerWidth:1440,innerHeight:900};
let reduced=false,compact=false;const media=[];
globalThis.matchMedia=query=>{
  const m={matches:query.includes("reduced")?reduced:compact,callbacks:[],
    addEventListener(_,fn){this.callbacks.push(fn);},
    removeEventListener(_,fn){this.callbacks=this.callbacks.filter(x=>x!==fn);},
    emit(){this.matches=query.includes("reduced")?reduced:compact;this.callbacks.forEach(fn=>fn());}};
  media.push(m);return m;
};
let mounts=0,reverts=0,registers=0;
const timeline=()=>{mounts++;return {to(){return this;},from(){return this;},fromTo(){return this;},set(){return this;}};};
const gsap={timeline,utils:{random:(a,b)=>(a+b)/2},registerPlugin(){registers++;},context(fn){fn();return {revert(){reverts++;}};}};
const ScrollTrigger={refresh(){}};
for(const e of registry.entries.filter(item=>item.id.startsWith("ATZ-SCR-")||item.id.startsWith("ATZ-TRN-"))){
  const markup=readFileSync(join(root,e.component_html),"utf8");
  assert(markup.includes('data-atz-id="'+e.id+'"'),e.id+" HTML identity mismatch");
  assert(markup.includes("atz-motion"),e.id+" missing scoped CSS root");
  assert(!markup.includes("url(img/"),e.id+" uses unlicensed source image reference");
  assert.equal(e.client_ready,false,"Only browser+client validated variants may be production-ready");
  assert.equal(e.status,"validation","Standalone variants remain in validation until browser QA");
  const variantCode=readFileSync(join(root,e.component_js),"utf8");
  assert(!variantCode.includes("document.querySelector"),e.id+" has global selector");
  assert(!variantCode.includes("from \"../scroll/"),e.id+" imports another variant");
  const {id,variant,selector,mount}=await import("../"+e.component_js);
  assert.equal(id,e.id);
  assert.equal(variant,e.variant);
  assert.equal(selector,e.selector);
  const instance=mount(new StubElement(),{gsap,ScrollTrigger});
  assert.equal(instance.mode,"animated",e.id+" mount");
  instance.destroy();
  assert.equal(instance.mode,"destroyed",e.id+" cleanup");
}
assert.equal(mounts,11);assert.equal(reverts,11);
reduced=true;
const {mount}=await import("../components/scroll/ATZ-SCR-001.js");
const motion=mount(new StubElement(),{gsap,ScrollTrigger});
assert.equal(motion.mode,"static");assert.equal(mounts,11);
reduced=false;media.at(-2).emit();
assert.equal(motion.mode,"animated");assert.equal(mounts,12);
compact=true;media.at(-1).emit();
assert.equal(motion.mode,"static");assert.equal(reverts,12);
motion.destroy();
compact=false;
const noDependency=mount(new StubElement(),{gsap:null,ScrollTrigger:null});
assert.equal(noDependency.mode,"unavailable");
noDependency.destroy();
assert.equal(registers,12);
console.log("PASS: 11 isolated scroll variants, unique IDs, HTML/CSS contracts, mount/revert, reduced motion, compact layout and absent GSAP.");

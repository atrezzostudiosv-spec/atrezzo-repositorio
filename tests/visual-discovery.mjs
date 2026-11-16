import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
const read=p=>JSON.parse(readFileSync(new URL("../"+p,import.meta.url),"utf8"));
const r=read("registry/components.json"),v=read("registry/visual-discovery.json");
assert.deepEqual(v.entries.map(e=>e.id),r.entries.map(e=>e.id));
assert.equal(new Set(v.entries.map(e=>e.id)).size,r.entries.length);
for(const e of v.entries){assert(e.roles.length&&e.views.length&&e.styles.length);assert(e.roles.every(x=>v.roles.includes(x)));assert(e.views.every(x=>v.views.includes(x)));assert(e.industries.every(x=>v.profiles.some(p=>p.id===x)));assert(Number.isInteger(e.motion)&&e.motion>=0&&e.motion<=3);}
assert(v.entries.some(e=>e.industries.length>1&&e.roles.length>1));
for(const e of v.entries)for(const p of v.profiles.filter(p=>e.industries.includes(p.id)))assert(e.motion<=p.maxMotion);
console.log("PASS: clasificación transversal "+v.entries.length+" IDs, sin duplicar el registro.");

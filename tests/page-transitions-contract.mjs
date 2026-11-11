import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {createHash} from "node:crypto";
const file=url=>readFileSync(new URL(url,import.meta.url));
const source=[
["../components/page-transitions/runtime.js","d657b223bbf5ea1d41d7b8b56ed89989845ce7ac"],
["../components/page-transitions/atrezzo-transitions.css","a9a65fa1db4e8fff39bc2bdd05e5d27e0ffe8695"],
["../components/page-transitions/preflight.js","ecfc1f5b0d02a91bd7cd6403799ef139b2539236"],
["../components/page-transitions/assets/scene-atelier.svg","475cd1b44b43c2246f44e9384be6435dbdf4a539"],
["../components/page-transitions/assets/scene-material.svg","3d9825b38a3b9301d512ce3dcd20b11f3106f1ae"],
["../components/page-transitions/assets/scene-night.svg","14c01ecd43c3a13ee082b6e92f981eee50596e86"]
];
for(const [path,expected] of source){
 const content=file(path);
 const actual=createHash("sha1").update("blob "+content.length+"\0").update(content).digest("hex");
 assert.equal(actual,expected,"Approved source must be byte-for-byte intact: "+path);
}
const registry=JSON.parse(file("../registry/components.json").toString());
const entries=registry.entries.filter(e=>e.id.startsWith("ATZ-PGT-"));
assert.equal(entries.length,3,"Three independent page transitions");
assert.deepEqual(entries.map(e=>e.variant),["veil","split","iris"]);
assert(entries.every(e=>e.discovery_trigger==="navigation"&&e.discovery_group==="transiciones-paginas"));
assert(entries.every(e=>!e.client_ready&&e.status==="validation"));
for(const entry of entries){
 const html=file("../"+entry.component_html).toString();
 assert(html.includes('data-atz-id="'+entry.id+'"'),entry.id+" identity not scoped");
 assert.equal((html.match(/data-pgt-scene=/g)||[]).length,3,entry.id+" missing demo views");
 assert.equal((html.match(/data-pgt-show=/g)||[]).length,3,entry.id+" missing native buttons");
 assert(html.includes("page-transitions-demo/atelier.html"),"Real cross-document demo not linked");
 const script=file("../"+entry.component_js).toString();
 assert(script.includes('import "./runtime.js"'),entry.id+" must import original source engine");
 assert(script.includes("engine.swap("),entry.id+" must use same original motion engine");
 assert(script.includes('defaultEffect:variant'),entry.id+" must fix its own default variant");
 assert(!script.includes("gsap")&&!script.includes("ScrollTrigger"));
}
for(const scene of ["atelier","material","night"]){
 const html=file("../catalog/page-transitions-demo/"+scene+".html").toString();
 assert(html.includes('data-demo-page="'+scene+'"'));
 assert(html.includes('<script src="../../components/page-transitions/preflight.js"></script>'));
 assert(html.includes('<script src="../../components/page-transitions/runtime.js"></script>'));
 assert(html.includes("new window.AtrezzoTransitions("),"Demo must use original engine");
 assert(html.includes('data-atz-link'),"Demo must use native anchors with opt-in");
 assert(html.includes("noindex,nofollow"));
}
console.log("PASS ATREZZO Transitions 01: exact original JS/CSS/preflight/3 SVG byte hashes, independent VEIL SPLIT IRIS, navigation-only semantics and three real HTML routes.");

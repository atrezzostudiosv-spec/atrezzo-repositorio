import assert from "node:assert/strict";
import {mkdtempSync,rmSync,existsSync,readFileSync} from "node:fs";
import {tmpdir} from "node:os";
import {join} from "node:path";
import {resolveComponent,createIntegrationPrompt} from "../scripts/resolve-component.mjs";
import {exportComponent} from "../scripts/export-component.mjs";
const id="ATZ-SEC-010",c=resolveComponent(id);
assert.equal(c.source_visual_approved,true);assert.equal(c.library_approved,false);
assert.equal(c.package_files.length,10);
const prompt=createIntegrationPrompt(id);for(const f of c.package_files)assert(prompt.includes(f));
const dir=mkdtempSync(join(tmpdir(),"atz-sec010-"));
try{const p=exportComponent(id,dir);assert.equal(p.files.length,10);for(const f of p.files)assert(existsSync(join(p.target,f)));assert(readFileSync(join(p.target,"INTEGRATION.md"),"utf8").includes("QA autónoma pendiente"));}finally{rmSync(dir,{recursive:true,force:true});}
console.log("PASS ATZ-SEC-010 exact package, prompt and export; visual runtime QA pending.");

import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
import assert from 'node:assert/strict';
import {resolve} from 'node:path';
const root=resolve('sources/gsap-vault-collection-01');
const m=JSON.parse(readFileSync(resolve(root,'manifest.json'),'utf8'));
assert.equal(m.entries.length,10); assert.equal(m.originals.length,63);
for(const f of m.originals){const b=readFileSync(resolve(root,f.path));const sha=createHash('sha1').update('blob '+b.length+'\\0'.replace('\\0','\0')).update(b).digest('hex');assert.equal(sha,f.git_blob_sha,f.path);if(f.path.endsWith('.js'))execFileSync(process.execPath,['--check',resolve(root,f.path)],{stdio:'pipe'});}
for(const e of m.entries){for(const p of [e.source_demo,e.technical_guide,e.ai_brief])readFileSync(resolve(root,p));assert.equal(e.client_ready,false);}
console.log('GSAP Vault source integrity: 63 original blobs, 20 JS syntax checks, 10 packages. Browser QA not included.');

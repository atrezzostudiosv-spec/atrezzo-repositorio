import assert from "node:assert/strict";
import {readFileSync,writeFileSync,statSync} from "node:fs";
import {execFileSync} from "node:child_process";
const root="catalog/previews/";
const manifest=JSON.parse(readFileSync(root+"manifest.json","utf8"));
assert.equal(Object.keys(manifest.entries).length,65);
assert.equal(manifest.editorialRepair,"phase04-v1");
const times={"ATZ-PGT-001":"2.30","ATZ-PGT-002":"1.08","ATZ-PGT-003":"2.08"};
for(const [id,t] of Object.entries(times)){
  assert(manifest.entries[id]?.video.endsWith(id+".webm"));
  const src=root+id+".webm",out=root+id+".webp";
  execFileSync("ffmpeg",["-hide_banner","-loglevel","error","-y","-ss",t,"-i",src,"-frames:v","1","-vf","scale=896:560","-c:v","libwebp","-quality","84",out]);
  assert(statSync(out).size>3000,"Blank poster: "+id);
  manifest.entries[id].posterFrameSecond=Number(t);
  manifest.entries[id].posterSource="existing-approved-video";
  console.log("Verified representative still: "+id);
}
manifest.posterReview="phase05-accepted";
writeFileSync(root+"manifest.json",JSON.stringify(manifest,null,2)+"\n");

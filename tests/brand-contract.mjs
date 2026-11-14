import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {createHash} from "node:crypto";
const read=p=>readFileSync(new URL("../"+p,import.meta.url));
const hash=b=>createHash("sha1").update("blob "+b.length+"\0").update(b).digest("hex");
assert.equal(hash(read("catalog/brand/wordmark.svg")),"13470f929e099fda97ebc1676ce8aef8f11872ee");
assert.equal(hash(read("catalog/brand/favicon-32.png")),"8e4fee3dfeb7251479bb03663339bd76754bd24f");
for(const path of ["catalog/index.html","catalog/technical.html","catalog/preview.html","catalog/visual.html","index.html"]){
 const html=read(path).toString();
 assert(html.includes("favicon-32.png"),path+" favicon");
 assert(html.includes("noindex,nofollow"),path+" noindex");
 if(["catalog/index.html","catalog/technical.html","catalog/preview.html"].includes(path)){
 assert(html.includes('src="brand/wordmark.svg"'),path+" logo");
 assert(html.includes('alt="ATREZZO STUDIOS"'),path+" logo text alternative");
 }
}
console.log("PASS: official wordmark exact hash, favicon source derivative and branded library pages.");

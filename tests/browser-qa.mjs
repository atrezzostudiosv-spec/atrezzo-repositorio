import assert from "node:assert/strict";
import { createServer } from "node:http";
import { promises as fs } from "node:fs";
import { resolve, extname, join, sep } from "node:path";
import { chromium } from "playwright";

const root=process.cwd();
const registry=JSON.parse(await fs.readFile(join(root,"registry/components.json"),"utf8"));
const expectedImages={"ATZ-SCR-001":17,"ATZ-SCR-002":5,"ATZ-SCR-003":5,
 "ATZ-SCR-004":36,"ATZ-SCR-005":36,"ATZ-SCR-006":20,"ATZ-SCR-007":9,
 "ATZ-SCR-008":13,"ATZ-SCR-009":36,"ATZ-SCR-010":5,"ATZ-TRN-001":0};
const mime={".html":"text/html; charset=utf-8",".js":"text/javascript; charset=utf-8",
 ".css":"text/css; charset=utf-8",".json":"application/json; charset=utf-8"};
const server=createServer(async(req,res)=>{
 try {
   const requestPath=decodeURIComponent(new URL(req.url,"http://127.0.0.1").pathname);
   if(requestPath==="/__no_js"){
     const html=await fs.readFile(join(root,"components/scroll/ATZ-SCR-001.html"),"utf8");
     res.writeHead(200,{"content-type":"text/html; charset=utf-8"});
     res.end('<!doctype html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="stylesheet" href="/components/runtime/atrezzo-motion.css"></head><body>'+html+'</body></html>');
     return;
   }
   let path=requestPath.endsWith("/")?requestPath+"index.html":requestPath;
   const abs=resolve(root,"."+path);
   if(abs!==root&&!abs.startsWith(root+sep)){res.writeHead(403);res.end();return;}
   const buf=await fs.readFile(abs);
   res.writeHead(200,{"content-type":mime[extname(abs)]||"application/octet-stream","cache-control":"no-store"});
   res.end(buf);
 }catch(e){res.writeHead(404);res.end("Not found");}
});
await new Promise(resolve=>server.listen(0,"127.0.0.1",resolve));
const origin="http://127.0.0.1:"+server.address().port;
const artifacts=join(root,"tests/artifacts");
await fs.mkdir(artifacts,{recursive:true});
const browser=await chromium.launch({headless:true});
const results=[];
const setup=async page=>{
 await page.route("https://fonts.googleapis.com/**",route=>route.fulfill({status:200,contentType:"text/css",body:""}));
 await page.route("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/**",async route=>{
   const src=route.request().url().endsWith("ScrollTrigger.min.js")?
     join(root,"node_modules/gsap/dist/ScrollTrigger.min.js"):
     join(root,"node_modules/gsap/dist/gsap.min.js");
   await route.fulfill({status:200,contentType:"application/javascript",path:src});
 });
};
try {
 for(const width of [375,768,1024,1440]){
   const page=await browser.newPage({viewport:{width,height:900},reducedMotion:"no-preference"});
   await setup(page);
   for(const e of registry.entries){
     const errors=[];
     const onError=err=>errors.push(err.message);
     page.on("pageerror",onError);
     await page.goto(origin+"/catalog/preview.html?id="+encodeURIComponent(e.id),{waitUntil:"domcontentloaded"});
     await page.waitForFunction(()=>Boolean(window.__atrezzoPreviewInstance)||document.querySelector("#demo")?.dataset.motion==="unavailable",{timeout:12000});
     const info=await page.evaluate(()=>({
       mode:window.__atrezzoPreviewInstance?.mode??"unavailable",
       id:document.querySelector(".atz-motion")?.getAttribute("data-atz-id"),
       imageCount:document.querySelectorAll("#demo .grid__img").length,
       scriptErrors:document.querySelector("#demo")?.dataset.motion==="unavailable",
       triggers:window.ScrollTrigger?.getAll().length??0,
       visible:document.querySelector(".atz-motion")?.getBoundingClientRect().height>0,
       overflow:document.documentElement.scrollWidth>window.innerWidth+2,
       height:document.documentElement.scrollHeight
     }));
     assert.equal(info.id,e.id,JSON.stringify({e:e.id,width,info}));
     assert.equal(info.imageCount,expectedImages[e.id],e.id+" tile count");
     assert.equal(info.mode,width<=700?"static":"animated",e.id+" mode at "+width);
     assert.equal(info.triggers,width<=700?0:1,e.id+" unexpected triggers at "+width);
     assert.equal(info.visible,true,e.id+" zero-height scene at "+width);
     assert.equal(info.overflow,false,e.id+" horizontal overflow at "+width);
     assert.equal(errors.length,0,e.id+" JavaScript errors "+errors.join("; "));
     await page.evaluate(()=>window.scrollTo(0,document.documentElement.scrollHeight*.7));
     await page.waitForTimeout(90);
     if(width===1440)await page.screenshot({path:join(artifacts,e.id+".png"),fullPage:false});
     await page.evaluate(()=>window.scrollTo(0,0));
     await page.waitForTimeout(80);
     assert((await page.evaluate(()=>scrollY))<4,e.id+" inverse scroll failed at "+width);
     await page.evaluate(()=>window.__atrezzoPreviewInstance?.destroy());
     assert.equal(await page.evaluate(()=>window.ScrollTrigger?.getAll().length??0),0,e.id+" ScrollTrigger teardown failed");
     results.push({id:e.id,width,mode:info.mode,tiles:info.imageCount,scroll:"ok",teardown:"ok"});
     page.off("pageerror",onError);
   }
   await page.close();
 }
 const reduced=await browser.newPage({viewport:{width:1440,height:900},reducedMotion:"reduce"});
 await setup(reduced);
 await reduced.goto(origin+"/catalog/preview.html?id=ATZ-SCR-005",{waitUntil:"domcontentloaded"});
 await reduced.waitForFunction(()=>Boolean(window.__atrezzoPreviewInstance));
 assert.equal(await reduced.evaluate(()=>window.__atrezzoPreviewInstance.mode),"static");
 assert.equal(await reduced.evaluate(()=>window.ScrollTrigger.getAll().length),0);
 await reduced.close();
 const index=await browser.newPage({viewport:{width:1440,height:900}});
 await setup(index);
 await index.goto(origin+"/catalog/",{waitUntil:"domcontentloaded"});
 await index.waitForFunction(()=>document.querySelectorAll(".component-card").length===11);
 await index.screenshot({path:join(artifacts,"index-desktop.png"),fullPage:false});
 await index.locator("#search").fill("ATZ-SCR-005");
 assert.equal(await index.locator(".component-card").count(),1,"Catalog ID search");
 await index.locator("#search").fill("");
 await index.locator(".filter[data-category='transiciones']").click();
 assert.equal(await index.locator(".component-card").count(),1,"Transition filter");
 await index.close();
 const mobile=await browser.newPage({viewport:{width:375,height:812}});
 await setup(mobile);
 await mobile.goto(origin+"/catalog/",{waitUntil:"domcontentloaded"});
 await mobile.waitForFunction(()=>document.querySelectorAll(".component-card").length===11);
 await mobile.screenshot({path:join(artifacts,"index-mobile.png"),fullPage:false});
 assert.equal(await mobile.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2),true,"mobile catalog overflow");
 await mobile.close();
 const staticPage=await browser.newPage({javaScriptEnabled:false,viewport:{width:375,height:812}});
 await staticPage.goto(origin+"/__no_js",{waitUntil:"load"});
 assert.equal(await staticPage.locator(".atz-motion .grid__img").count(),17,"Static HTML needs visible tiles");
 assert((await staticPage.locator(".atz-motion").boundingBox()).height>0,"No-JS section lacks height");
 await staticPage.close();
 const report={passed:true,checks:results.length,variants:registry.entries.length,widths:[375,768,1024,1440],
   reducedMotion:"passed",noJavaScript:"passed",catalogSearch:"passed",filters:"passed",results};
 await fs.writeFile(join(artifacts,"browser-report.json"),JSON.stringify(report,null,2));
 console.log("BROWSER QA PASSED: "+results.length+" individual viewport/variant checks + reduced motion, no-JS, search and filters");
}catch(err){
 console.error("BROWSER QA FAILED:",err);
 await fs.writeFile(join(artifacts,"browser-error.txt"),String(err.stack||err));
 process.exitCode=1;
}finally{await browser.close();await new Promise(resolve=>server.close(resolve));}

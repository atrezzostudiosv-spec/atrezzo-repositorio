import assert from "node:assert/strict";
import { createServer } from "node:http";
import { promises as fs } from "node:fs";
import { resolve, extname, join, sep } from "node:path";
import { chromium } from "playwright";

const root=process.cwd();
const registry=JSON.parse(await fs.readFile(join(root,"registry/components.json"),"utf8"));
const motionEntries=registry.entries.filter(e=>e.id.startsWith("ATZ-SCR-")||e.id.startsWith("ATZ-TRN-"));
const stickyEntries=registry.entries.filter(e=>e.id.startsWith("ATZ-STK-"));
const navigationEntries=registry.entries.filter(e=>e.category==="navegacion");
const expectedImages={"ATZ-SCR-001":17,"ATZ-SCR-002":5,"ATZ-SCR-003":5,
 "ATZ-SCR-004":36,"ATZ-SCR-005":36,"ATZ-SCR-006":20,"ATZ-SCR-007":9,
 "ATZ-SCR-008":13,"ATZ-SCR-009":36,"ATZ-SCR-010":5,"ATZ-TRN-001":0};
const mime={".html":"text/html; charset=utf-8",".js":"text/javascript; charset=utf-8",
 ".css":"text/css; charset=utf-8",".json":"application/json; charset=utf-8"};
const server=createServer(async(req,res)=>{
 try {
   const requestPath=decodeURIComponent(new URL(req.url,"http://127.0.0.1").pathname);
   if(requestPath==="/__sticky_nojs"){
     const value=new URL(req.url,"http://127.0.0.1").searchParams.get("id");
     if(!/^ATZ-STK-0(0[1-9]|1[0-5])$/.test(value||"")){res.writeHead(400);res.end("Invalid ID");return;}
     const html=await fs.readFile(join(root,"components/scroll/"+value+".html"),"utf8");
     res.writeHead(200,{"content-type":"text/html; charset=utf-8"});
     res.end('<!doctype html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="stylesheet" href="/components/runtime/atrezzo-sticky.css"></head><body style="margin:0">'+html+'</body></html>');
     return;
   }
   if(requestPath==="/__navigation_nojs"){
     const requested=new URL(req.url,"http://127.0.0.1").searchParams.get("id");
     if(!/^ATZ-NAV-00[123]$/.test(requested||"")){res.writeHead(400);res.end("Invalid ID");return;}
     const html=await fs.readFile(join(root,"components/navegacion/"+requested+".html"),"utf8");
     const css="/components/navegacion/"+requested+".css";
     res.writeHead(200,{"content-type":"text/html; charset=utf-8"});
     res.end('<!doctype html><html lang="es"><head><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="stylesheet" href="'+css+'"></head><body style="margin:0">'+html+'</body></html>');
     return;
   }
   if(requestPath==="/__multi"){
     const htmlA=await fs.readFile(join(root,"components/scroll/ATZ-SCR-001.html"),"utf8");
     const htmlB=await fs.readFile(join(root,"components/scroll/ATZ-SCR-003.html"),"utf8");
     const source='<!doctype html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="stylesheet" href="/components/runtime/atrezzo-motion.css"><script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js" defer></script><script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js" defer></script></head><body style="margin:0;background:#0b0f17"><main id="scene-a">'+htmlA+'</main><main id="scene-b">'+htmlB+'</main><script type="module">import {mount as m1} from "/components/scroll/ATZ-SCR-001.js";import {mount as m2} from "/components/scroll/ATZ-SCR-003.js";window.motionA=m1(document.querySelector("#scene-a"));window.motionB=m2(document.querySelector("#scene-b"));</script></body></html>';
     res.writeHead(200,{"content-type":"text/html; charset=utf-8"});res.end(source);return;
   }
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
   for(const e of motionEntries){
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
 // FASE 5 — verify every independent navigation pattern in the real catalog preview.
 for(const width of [375,768,1024,1440]){
   for(const entry of navigationEntries){
     const page=await browser.newPage({viewport:{width,height:900},reducedMotion:"no-preference"});
     await setup(page);
     const errors=[];page.on("pageerror",e=>errors.push(e.message));
     await page.goto(origin+"/catalog/preview.html?id="+entry.id,{waitUntil:"domcontentloaded"});
     await page.waitForFunction(()=>Boolean(window.__atrezzoPreviewInstance),{timeout:12000});
     assert.equal(await page.locator("#demo [data-atz-id]").getAttribute("data-atz-id"),entry.id);
     assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2),true,entry.id+" overflow at "+width);
     if(entry.id==="ATZ-NAV-001"){
       const trigger=page.locator("[data-azn1-menu-trigger]");
       await trigger.click();
       await page.waitForTimeout(100);
       assert.equal(await trigger.getAttribute("aria-expanded"),"true","Menu must open");
       assert.equal(await page.locator("[data-azn1-menu]").getAttribute("aria-modal"),"true");
       assert.equal(await page.evaluate(()=>document.body.classList.contains("atz-nav-scroll-locked")),true);
       await page.keyboard.press("Escape");
       assert.equal(await trigger.getAttribute("aria-expanded"),"false","Escape closes menu");
       assert.equal(await page.evaluate(()=>document.body.classList.contains("atz-nav-scroll-locked")),false);
     } else if(entry.id==="ATZ-NAV-002"){
       await page.locator("#atz-chapter-two").evaluate(el=>el.scrollIntoView({block:"center",behavior:"instant"}));
       await page.waitForTimeout(150);
       assert.equal(await page.locator('[data-azn1-rail] a[href="#atz-chapter-two"]').getAttribute("aria-current"),"location","Rail must track chapter 2");
       await page.locator("#atz-chapter-one").evaluate(el=>el.scrollIntoView({block:"center",behavior:"instant"}));
       await page.waitForTimeout(150);
       assert.equal(await page.locator('[data-azn1-rail] a[href="#atz-chapter-one"]').getAttribute("aria-current"),"location","Rail must track reverse scroll");
     } else {
       await page.locator("[data-azn1-projects]").evaluate(el=>el.scrollIntoView({block:"center",behavior:"instant"}));
       await page.waitForTimeout(150);
       await page.locator("[data-azn1-dock-next]").click();
       assert.equal(await page.locator("[data-azn1-dock-title]").textContent(),"Reflected Forms");
       await page.locator("[data-azn1-dock-prev]").click();
       assert.equal(await page.locator("[data-azn1-dock-title]").textContent(),"Quiet Residence");
       assert.equal(await page.locator('[data-azn1-project].is-active').count(),1);
     }
     assert.equal(errors.length,0,entry.id+" JavaScript errors "+errors.join("; "));
     if(width===1440)await page.screenshot({path:join(artifacts,entry.id+".png"),fullPage:false});
     await page.evaluate(()=>window.__atrezzoPreviewInstance.destroy());
     results.push({id:entry.id,width,mode:"interactive",test:"navigation",teardown:"ok"});
     await page.close();
   }
 }
 // Navigation must remain usable without scripts; only allowed CSS is loaded.
 for(const id of ["ATZ-NAV-001","ATZ-NAV-002","ATZ-NAV-003"]){
   const page=await browser.newPage({javaScriptEnabled:false,viewport:{width:375,height:812}});
   await page.goto(origin+"/__navigation_nojs?id="+id,{waitUntil:"load"});
   assert.equal(await page.locator('[data-atz-id="'+id+'"]').count(),1,id+" static markup missing");
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2),true,id+" no-JS overflow");
   if(id==="ATZ-NAV-001"){
     assert.equal(await page.locator(".atz-nav-fallback a").count(),3,"No-JS menu links missing");
     assert.equal(await page.locator(".atz-nav-trigger").isVisible(),false,"No-JS menu toggle must remain hidden");
   }else if(id==="ATZ-NAV-002"){
     assert.equal(await page.locator("[data-azn1-rail] a").count(),3,"No-JS native chapter anchors missing");
   }else{
     assert.equal(await page.locator("[data-azn1-project].is-active").count(),1,"No-JS active project missing");
     assert.equal(await page.locator("[data-azn1-dock]").isVisible(),false,"No-JS floating dock should stay hidden");
   }
   await page.close();
 }
 // Accessible keyboard flow and motion preference for immersive overlay.
 const menuKeyboard=await browser.newPage({viewport:{width:1440,height:900},reducedMotion:"reduce"});
 await setup(menuKeyboard);
 await menuKeyboard.goto(origin+"/catalog/preview.html?id=ATZ-NAV-001",{waitUntil:"domcontentloaded"});
 await menuKeyboard.waitForFunction(()=>Boolean(window.__atrezzoPreviewInstance));
 const toggle=menuKeyboard.locator("[data-azn1-menu-trigger]");
 await toggle.focus();await menuKeyboard.keyboard.press("Enter");
 await menuKeyboard.waitForTimeout(90);
 assert.equal(await toggle.getAttribute("aria-expanded"),"true");
 assert.equal(await menuKeyboard.evaluate(()=>document.querySelector("main").inert),true,"Background main must be inert");
 const closeButton=menuKeyboard.locator("[data-azn1-menu-close]");
 assert.equal(await closeButton.evaluate(el=>document.activeElement===el),true,"Focus should enter modal");
 await menuKeyboard.keyboard.press("Shift+Tab");
 assert.equal(await menuKeyboard.locator("[data-azn1-menu-link]").last().evaluate(el=>document.activeElement===el),true,"Shift+Tab should wrap to last link");
 await menuKeyboard.keyboard.press("Tab");
 assert.equal(await closeButton.evaluate(el=>document.activeElement===el),true,"Tab should wrap back to close");
 await menuKeyboard.keyboard.press("Escape");
 assert.equal(await toggle.getAttribute("aria-expanded"),"false");
 assert.equal(await menuKeyboard.evaluate(()=>document.querySelector("main").inert),false,"Main inert must be reset");
 assert.equal(await menuKeyboard.evaluate(()=>document.body.classList.contains("atz-nav-scroll-locked")),false,"Scroll lock must clear");
 assert.equal(await toggle.evaluate(el=>document.activeElement===el),true,"Focus should return to trigger");
 await menuKeyboard.close();
 // Approved Sticky Sections source: all 15 original scroll-driven animations at four viewports.
 for(const width of [375,768,1024,1440]){
   const page=await browser.newPage({viewport:{width,height:900},reducedMotion:"no-preference"});
   await setup(page);
   for(const entry of stickyEntries){
     const errors=[];
     const onError=e=>errors.push(e.message);page.on("pageerror",onError);
     await page.goto(origin+"/catalog/preview.html?id="+entry.id,{waitUntil:"domcontentloaded"});
     await page.waitForFunction(()=>Boolean(window.__atrezzoPreviewInstance)||document.querySelector("#demo")?.dataset.motion==="unavailable",{timeout:12000});
     const info=await page.evaluate(()=>({
       id:document.querySelector(".atz-sticky")?.getAttribute("data-atz-id"),
       panels:document.querySelectorAll(".atz-sticky .content--sticky").length,
       pictures:document.querySelectorAll(".atz-sticky .content__img").length,
       mode:window.__atrezzoPreviewInstance?.mode,
       triggers:window.ScrollTrigger?.getAll().length??0,
       overflow:document.documentElement.scrollWidth>innerWidth+2,
       visible:(document.querySelector(".atz-sticky")?.getBoundingClientRect().height??0)>innerHeight*3
     }));
     assert.equal(info.id,entry.id,"Wrong StickySections variant");
     assert.equal(info.panels,6,entry.id+" has wrong scene count");
     assert.equal(info.pictures,6,entry.id+" wrong image count");
     assert.equal(info.mode,"animated",entry.id+" must be scroll-driven at "+width);
     assert(info.triggers>=6,entry.id+" missing ScrollTriggers at "+width);
     assert.equal(info.overflow,false,entry.id+" horizontal overflow at "+width);
     assert.equal(info.visible,true,entry.id+" scene too short");
     assert.equal(errors.length,0,entry.id+" JavaScript error: "+errors.join("; "));
     const first=await page.evaluate(()=>{
       const t=ScrollTrigger.getAll().find(x=>x.trigger?.classList?.contains("content--sticky"));
       if(!t)return null;
       const start=t.start,end=t.end;
       return {start,end};
     });
     assert(first&&Number.isFinite(first.start)&&first.end>first.start,entry.id+" invalid scroll range");
     await page.evaluate(y=>scrollTo(0,y),(first.start+first.end)/2);
     await page.waitForTimeout(150);
     const active=await page.evaluate(()=>ScrollTrigger.getAll().some(x=>x.progress>.05&&x.progress<.95));
     assert(active,entry.id+" scroll was not controlling animation at "+width);
     if(width===1440)await page.screenshot({path:join(artifacts,entry.id+".png"),fullPage:false});
     await page.evaluate(()=>scrollTo(0,0));
     await page.waitForTimeout(120);
     await page.evaluate(()=>window.__atrezzoPreviewInstance.destroy());
     assert.equal(await page.evaluate(()=>window.ScrollTrigger.getAll().length),0,entry.id+" teardown left ScrollTriggers");
     results.push({id:entry.id,width,mode:info.mode,test:"sticky-scroll",teardown:"ok"});
     page.off("pageerror",onError);
   }
   await page.close();
 }
 // Fallback with no JavaScript, and reduced motion static composition.
 for(const id of ["ATZ-STK-001","ATZ-STK-007","ATZ-STK-015"]){
   const staticPage=await browser.newPage({javaScriptEnabled:false,viewport:{width:375,height:812}});
   await staticPage.goto(origin+"/__sticky_nojs?id="+id,{waitUntil:"load"});
   assert.equal(await staticPage.locator(".content--sticky").count(),6,id+" no-JS panels");
   assert.equal(await staticPage.locator(".content__img").count(),6,id+" no-JS images");
   await staticPage.close();
 }
 const staticMotion=await browser.newPage({viewport:{width:1440,height:900},reducedMotion:"reduce"});
 await setup(staticMotion);
 await staticMotion.goto(origin+"/catalog/preview.html?id=ATZ-STK-006",{waitUntil:"domcontentloaded"});
 await staticMotion.waitForFunction(()=>Boolean(window.__atrezzoPreviewInstance));
 assert.equal(await staticMotion.evaluate(()=>window.__atrezzoPreviewInstance.mode),"static","Sticky reduced motion mode");
 assert.equal(await staticMotion.evaluate(()=>window.ScrollTrigger.getAll().length),0,"Sticky reduced motion should not create triggers");
 await staticMotion.close();
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
 await index.waitForFunction(()=>document.querySelectorAll(".component-card").length===29);
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
 await mobile.waitForFunction(()=>document.querySelectorAll(".component-card").length===29);
 await mobile.screenshot({path:join(artifacts,"index-mobile.png"),fullPage:false});
 assert.equal(await mobile.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2),true,"mobile catalog overflow");
 await mobile.close();
 const independent=await browser.newPage({viewport:{width:1440,height:900}});
 await setup(independent);
 await independent.goto(origin+"/__multi",{waitUntil:"domcontentloaded"});
 await independent.waitForFunction(()=>Boolean(window.motionA&&window.motionB));
 assert.equal(await independent.evaluate(()=>ScrollTrigger.getAll().length),2,"Two isolated timelines should coexist");
 await independent.evaluate(()=>window.motionA.destroy());
 assert.equal(await independent.evaluate(()=>ScrollTrigger.getAll().length),1,"Destroying first scene must not affect second");
 await independent.evaluate(()=>window.motionB.destroy());
 assert.equal(await independent.evaluate(()=>ScrollTrigger.getAll().length),0,"Both scenes must release triggers");
 await independent.close();
 for(const width of [375,768,1024,1440]){
   const fixture=await browser.newPage({viewport:{width,height:900}});
   await setup(fixture);
   const requests=[];
   fixture.on("request",r=>{if(r.url().includes("/components/scroll/ATZ-SCR-"))requests.push(r.url());});
   await fixture.goto(origin+"/examples/ai-ATZ-SCR-008/",{waitUntil:"domcontentloaded"});
   await fixture.waitForFunction(()=>Boolean(window.__atrezzoFixture),{timeout:12000});
   const info=await fixture.evaluate(()=>({
     id:document.querySelector(".atz-motion")?.getAttribute("data-atz-id"),
     mode:window.__atrezzoFixture.mode,
     triggers:window.ScrollTrigger?.getAll().length??0,
     hostHeader:getComputedStyle(document.querySelector(".lab-header")).backgroundColor,
     overflow:document.documentElement.scrollWidth>innerWidth+2,
     images:document.querySelectorAll("#atrezzo-scene .grid__img").length
   }));
   assert.equal(info.id,"ATZ-SCR-008","Fixture must use requested ID only");
   assert.equal(info.mode,width<=700?"static":"animated","Fixture motion mismatch at "+width);
   assert.equal(info.triggers,width<=700?0:1,"Fixture trigger mismatch");
   assert.equal(info.images,13,"Fixture must contain only requested grid");
   assert.equal(info.overflow,false,"Fixture horizontal overflow at "+width);
   assert.equal(info.hostHeader,"rgb(21, 27, 43)","Component CSS must not replace host design");
   assert.equal(requests.length,1,"Fixture must import exactly one ATZ-SCR module");
   assert(requests[0].includes("ATZ-SCR-008.js"),"Wrong variant imported");
   if(width===1440 || width===375)await fixture.screenshot({path:join(artifacts,"phase4-integration-"+width+".png"),fullPage:false});
   await fixture.evaluate(()=>window.__atrezzoFixture.destroy());
   assert.equal(await fixture.evaluate(()=>window.ScrollTrigger?.getAll().length??0),0,"Fixture must clean GSAP on exit");
   await fixture.close();
 }
 const withoutJs=await browser.newPage({javaScriptEnabled:false,viewport:{width:375,height:812}});
 await withoutJs.goto(origin+"/examples/ai-ATZ-SCR-008/",{waitUntil:"domcontentloaded"});
 assert.equal(await withoutJs.locator("#atrezzo-scene .grid__img").count(),13,"Fixture content must exist without JS");
 assert((await withoutJs.locator(".atz-motion").boundingBox()).height>0,"No-JS fixture must remain visible");
 await withoutJs.close();
 const staticPage=await browser.newPage({javaScriptEnabled:false,viewport:{width:375,height:812}});
 await staticPage.goto(origin+"/__no_js",{waitUntil:"load"});
 assert.equal(await staticPage.locator(".atz-motion .grid__img").count(),17,"Static HTML needs visible tiles");
 assert((await staticPage.locator(".atz-motion").boundingBox()).height>0,"No-JS section lacks height");
 await staticPage.close();
 const report={passed:true,checks:results.length,variants:registry.entries.length,stickySourceVariants:stickyEntries.length,widths:[375,768,1024,1440],
   reducedMotion:"passed",noJavaScript:"passed",catalogSearch:"passed",filters:"passed",multiInstanceIsolation:"passed",phase4Integration:"passed",navigationNoJs:"passed",navigationKeyboard:"passed",stickyNoJs:"passed",stickyReducedMotion:"passed",results};
 await fs.writeFile(join(artifacts,"browser-report.json"),JSON.stringify(report,null,2));
 console.log("BROWSER QA PASSED: "+results.length+" individual viewport/variant checks + reduced motion, no-JS, search and filters");
}catch(err){
 console.error("BROWSER QA FAILED:",err);
 await fs.writeFile(join(artifacts,"browser-error.txt"),String(err.stack||err));
 process.exitCode=1;
}finally{await browser.close();await new Promise(resolve=>server.close(resolve));}

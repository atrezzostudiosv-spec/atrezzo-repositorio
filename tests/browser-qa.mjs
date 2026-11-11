import assert from "node:assert/strict";
import { createServer } from "node:http";
import { promises as fs } from "node:fs";
import { resolve, extname, join, sep } from "node:path";
import { chromium } from "playwright";

const root=process.cwd();
const registry=JSON.parse(await fs.readFile(join(root,"registry/components.json"),"utf8"));
const motionEntries=registry.entries.filter(e=>e.id.startsWith("ATZ-SCR-")||e.id.startsWith("ATZ-TRN-"));
const stickyEntries=registry.entries.filter(e=>e.id.startsWith("ATZ-STK-"));
const nativeEntries=registry.entries.filter(e=>e.id.startsWith("ATZ-SEC-"));
const motionV1Entries=registry.entries.filter(e=>e.id.startsWith("ATZ-MOT-"));
const navigationEntries=registry.entries.filter(e=>e.category==="navegacion");
const pageTransitionEntries=registry.entries.filter(e=>e.id.startsWith("ATZ-PGT-"));
const serviceBentoEntries=registry.entries.filter(e=>e.id.startsWith("ATZ-SVC-"));
const expectedImages={"ATZ-SCR-001":17,"ATZ-SCR-002":5,"ATZ-SCR-003":5,
 "ATZ-SCR-004":36,"ATZ-SCR-005":36,"ATZ-SCR-006":20,"ATZ-SCR-007":9,
 "ATZ-SCR-008":13,"ATZ-SCR-009":36,"ATZ-SCR-010":5,"ATZ-TRN-001":0};
const mime={".html":"text/html; charset=utf-8",".js":"text/javascript; charset=utf-8",
 ".css":"text/css; charset=utf-8",".svg":"image/svg+xml",".json":"application/json; charset=utf-8"};
const server=createServer(async(req,res)=>{
 try {
   const requestPath=decodeURIComponent(new URL(req.url,"http://127.0.0.1").pathname);
   if(requestPath==="/__native_nojs"){
     const id=new URL(req.url,"http://127.0.0.1").searchParams.get("id");
     if(!/^ATZ-SEC-00[1-9]$/.test(id||"")){res.writeHead(400);res.end("Invalid component ID");return;}
     const n=Number(id.slice(-3)),fam=n<=3?1:n<=6?2:3;
     const html=await fs.readFile(join(root,"components/secciones/"+id+".html"),"utf8");
     res.writeHead(200,{"content-type":"text/html; charset=utf-8"});
     res.end('<!doctype html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="stylesheet" href="/components/secciones/ats'+fam+'.css"></head><body style="margin:0">'+html+'</body></html>');return;
   }
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
   if(requestPath==="/__service_nojs"){
     const html=await fs.readFile(join(root,"components/servicios/ATZ-SVC-001.html"),"utf8");
     res.writeHead(200,{"content-type":"text/html; charset=utf-8"});
     res.end('<!doctype html><html lang="en"><head><meta name="viewport" content="width=device-width,initial-scale=1"><base href="/components/servicios/"><link rel="stylesheet" href="/components/servicios/ATZ-SVC-001.css"></head><body style="margin:0">'+html+'</body></html>');return;
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
 // Original Atrezzo Scroll Sections 01–03: test real scroll, not only a loaded preview.
 for(const width of [375,768,1024,1440]){
   const page=await browser.newPage({viewport:{width,height:900},reducedMotion:"no-preference"});
   await setup(page);
   for(const e of nativeEntries){
     const errors=[];
     const onError=err=>errors.push(err.message);page.on("pageerror",onError);
     await page.goto(origin+"/catalog/preview.html?id="+e.id,{waitUntil:"domcontentloaded"});
     await page.waitForFunction(()=>Boolean(window.__atrezzoPreviewInstance)||document.querySelector("#demo")?.dataset.motion==="unavailable",{timeout:12000});
     const initial=await page.evaluate(()=>{
       const root=document.querySelector("#demo [data-atz-id]");
       const scene=root?.querySelector(".ats-scene,.ats2-scene,.ss03__chapter");
       return {id:root?.dataset.atzId,scene:!!scene,height:scene?.getBoundingClientRect().height,
         family:root?.className,progress:scene?.dataset.atsProgress??scene?.dataset.ats2Progress??null,
         overflow:document.documentElement.scrollWidth>innerWidth+2,
         status:document.querySelector("#demo")?.dataset.motion};
     });
     assert.equal(initial.id,e.id,e.id+" identity missing at "+width);
     assert.equal(initial.scene,true,e.id+" scroll scene missing");
     assert(initial.height>100,e.id+" scene lacks dimensions");
     assert.notEqual(initial.status,"unavailable",e.id+" preview failed");
     assert.equal(initial.overflow,false,e.id+" horizontal overflow at "+width);
     // Each family uses its original native scroll progress, not an automatic timer.
     const n=Number(e.id.slice(-3));
     const pos=await page.evaluate(()=>{
       const root=document.querySelector("#demo [data-atz-id]");
       const scene=root.querySelector(".ats-scene,.ats2-scene,.ss03__chapter");
       const top=scene.getBoundingClientRect().top+scrollY;
       const delta=Math.max(innerHeight*.6,scene.getBoundingClientRect().height-innerHeight);
       return {top,offset:delta*.68};
     });
     await page.evaluate(p=>window.scrollTo(0,p.top+p.offset),pos);
     await page.waitForTimeout(160);
     if(n<=6){
       const now=await page.evaluate(()=>{
         const scene=document.querySelector(".ats-scene,.ats2-scene");
         return Number(scene?.dataset.atsProgress??scene?.dataset.ats2Progress);
       });
       assert(Number.isFinite(now)&&now>.12,e.id+" progress must change from native scroll at "+width+": "+now);
     }else if(width>820){
       const now=await page.evaluate(()=>document.querySelector(".ss03__chapter")?.style.getPropertyValue("--enter"));
       assert(now!==""&&Number.isFinite(Number(now)),e.id+" did not set native chapter progress at "+width);
     }else{
       assert.equal(await page.evaluate(()=>window.__atrezzoPreviewInstance.mode),"static",e.id+" mobile fallback");
     }
     await page.evaluate(()=>scrollTo(0,0));await page.waitForTimeout(120);
     if(width===1440)await page.screenshot({path:join(artifacts,e.id+".png"),fullPage:false});
     await page.evaluate(()=>window.__atrezzoPreviewInstance.destroy());
     assert.equal(errors.length,0,e.id+" JS errors: "+errors.join("; "));
     results.push({id:e.id,width,mode:initial.status,test:"native-scroll",teardown:"ok"});
     page.off("pageerror",onError);
   }
   await page.close();
 }
 for(const id of nativeEntries.map(e=>e.id)){
   const p=await browser.newPage({javaScriptEnabled:false,viewport:{width:375,height:812}});
   await p.goto(origin+"/__native_nojs?id="+id,{waitUntil:"load"});
   assert.equal(await p.locator('[data-atz-id="'+id+'"]').count(),1,id+" has no no-JS root");
   assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2),true,id+" no-JS horizontal overflow");
   await p.close();
 }
 const nativeReduced=await browser.newPage({viewport:{width:1440,height:900},reducedMotion:"reduce"});
 await setup(nativeReduced);
 await nativeReduced.goto(origin+"/catalog/preview.html?id=ATZ-SEC-009",{waitUntil:"domcontentloaded"});
 await nativeReduced.waitForFunction(()=>Boolean(window.__atrezzoPreviewInstance));
 assert.equal(await nativeReduced.evaluate(()=>window.__atrezzoPreviewInstance.mode),"static");
 await nativeReduced.close();
 // Original ATREZZO Motion V1: seven isolated native motion patterns at four viewports.
 for(const width of [375,768,1024,1440]){
   for(const entry of motionV1Entries){
     const page=await browser.newPage({viewport:{width,height:900}});
     await setup(page);
     const errors=[];page.on("pageerror",err=>errors.push(err.message));
     await page.goto(origin+"/catalog/preview.html?id="+entry.id,{waitUntil:"domcontentloaded"});
     await page.waitForFunction(()=>Boolean(window.__atrezzoPreviewInstance),{timeout:12000});
     const info=await page.evaluate(()=>{
       const root=document.querySelector(".atz-motion-v1");
       return {id:root?.dataset.atzId,mode:window.__atrezzoPreviewInstance?.mode,overflow:document.documentElement.scrollWidth>innerWidth+2,
         scrollSize:document.documentElement.scrollHeight,sourcePhotos:[...root.querySelectorAll("img,video")].length};
     });
     assert.equal(info.id,entry.id,"Wrong Motion V1 preview ID");
     assert.equal(info.mode,"animated",entry.id+" must use native scroll when reduced motion is off");
     assert.equal(info.overflow,false,entry.id+" overflows viewport "+width);
     assert(info.scrollSize>900*1.5,"Motion V1 should have enough scroll distance");
     assert.equal(info.sourcePhotos,0,"Customer source media must not appear in public demo");
     const root=page.locator(".atz-motion-v1");
     if(entry.id==="ATZ-MOT-001"||entry.id==="ATZ-MOT-002"){
       const words=root.locator(".am-char");assert((await words.count())>10,entry.id+" missing segmented characters");
       await root.locator(".am-reveal-stage").evaluate(el=>el.scrollIntoView({block:"center",behavior:"instant"}));
       await page.waitForTimeout(160);
       if(entry.id==="ATZ-MOT-002")assert.equal(await words.first().evaluate(el=>el.style.opacity!==""),true,"Scrub letters are not bound to scroll");
     } else if(entry.id==="ATZ-MOT-003"){
       await root.locator("[data-am-parallax]").evaluate(el=>el.scrollIntoView({block:"center",behavior:"instant"}));
       await page.waitForTimeout(130);
       assert.equal(await root.locator("[data-am-parallax] > :first-child").evaluate(el=>el.style.getPropertyValue("--am-y")!==""),true);
     } else if(entry.id==="ATZ-MOT-004"){
       assert.equal(await root.locator("[data-am-media-index]").count(),6);
       await root.locator("[data-am-home-hero]").evaluate(el=>el.scrollIntoView({block:"center",behavior:"instant"}));
       await page.waitForTimeout(130);
       assert.equal(await root.locator("[data-am-home-hero]").evaluate(el=>el.style.getPropertyValue("--am-progress")!==""),true);
     } else if(entry.id==="ATZ-MOT-005"){
       await root.locator("[data-am-wedding-hero]").evaluate(el=>el.scrollIntoView({block:"center",behavior:"instant"}));
       await page.waitForTimeout(130);
       assert.equal(await root.locator("[data-am-wedding-clip]").evaluate(el=>el.style.clipPath.startsWith("inset(")),true);
     } else if(entry.id==="ATZ-MOT-006"){
       assert.equal(await root.locator("[data-am-journey-step]").count(),3);
       assert.equal(await root.locator("[data-am-journey-frame]").count(),3);
       await root.locator("[data-am-journey-step]").last().evaluate(el=>el.scrollIntoView({block:"center",behavior:"instant"}));
       await page.waitForTimeout(130);
       assert.equal(await root.locator("[data-am-journey-frame].am-active").count(),1);
     } else {
       await root.locator("[data-am-burned]").evaluate(el=>el.scrollIntoView({block:"center",behavior:"instant"}));
       await page.waitForTimeout(130);
       assert.equal(await root.locator("[data-am-burned]").evaluate(el=>el.style.getPropertyValue("--am-contrast")!==""),true);
     }
     assert.deepEqual(errors,[],entry.id+" browser errors");
     if(width===1440)await page.screenshot({path:join(artifacts,entry.id+".png"),fullPage:false});
     await page.evaluate(()=>window.__atrezzoPreviewInstance.destroy());
     results.push({id:entry.id,width,mode:info.mode,test:"motion-v1-native-scroll",teardown:"ok"});
     await page.close();
   }
 }
 const reducedMotionV1=await browser.newPage({viewport:{width:375,height:812},reducedMotion:"reduce"});
 await setup(reducedMotionV1);
 await reducedMotionV1.goto(origin+"/catalog/preview.html?id=ATZ-MOT-004",{waitUntil:"domcontentloaded"});
 await reducedMotionV1.waitForFunction(()=>Boolean(window.__atrezzoPreviewInstance));
 assert.equal(await reducedMotionV1.evaluate(()=>window.__atrezzoPreviewInstance.mode),"static");
 await reducedMotionV1.close();
 const reduced=await browser.newPage({viewport:{width:1440,height:900},reducedMotion:"reduce"});
 await setup(reduced);
 await reduced.goto(origin+"/catalog/preview.html?id=ATZ-SCR-005",{waitUntil:"domcontentloaded"});
 await reduced.waitForFunction(()=>Boolean(window.__atrezzoPreviewInstance));
 assert.equal(await reduced.evaluate(()=>window.__atrezzoPreviewInstance.mode),"static");
 assert.equal(await reduced.evaluate(()=>window.ScrollTrigger.getAll().length),0);
 await reduced.close();
 // ATREZZO TRANSITIONS 01: three genuine page-change effects via the approved WAAPI engine.
 for(const width of [375,768,1024,1440]){
   for(const entry of pageTransitionEntries){
     const page=await browser.newPage({viewport:{width,height:900},reducedMotion:"no-preference"});
     await setup(page);
     const errors=[];page.on("pageerror",error=>errors.push(error.message));
     await page.goto(origin+"/catalog/preview.html?id="+entry.id,{waitUntil:"domcontentloaded"});
     await page.waitForFunction(()=>Boolean(window.__atrezzoPreviewInstance),{timeout:12000});
     const result=await page.evaluate(()=>{
       const scene=document.querySelector(".atz-pgt");
       const engine=window.__atrezzoPreviewInstance;
       return {id:scene?.dataset.atzId,variant:engine?.variant,mode:engine?.mode,
         views:scene?.querySelectorAll("[data-pgt-scene]").length,controls:scene?.querySelectorAll("[data-pgt-show]").length,
         overlays:document.querySelectorAll(".atz-transition-layer").length,
         overflow:document.documentElement.scrollWidth>innerWidth+2};
     });
     assert.equal(result.id,entry.id,"Page-transition preview has wrong ID");
     assert.equal(result.variant,entry.variant,"Wrapper must preserve original approved transition");
     assert.equal(result.mode,"interactive","Page transition is click-driven, not scroll scrub");
     assert.equal(result.views,3);assert.equal(result.controls,3);
     assert.equal(result.overlays,1,"Exactly one engine overlay should be mounted");
     await page.waitForFunction(()=>{const imgs=[...document.querySelectorAll(".atz-pgt__art img")];return imgs.length===3&&imgs.every(img=>img.complete&&img.naturalWidth>0);},null,{timeout:12000});
     assert.equal(await page.locator(".atz-pgt__art img").count(),3,"Approved SVGs must be present");

     assert.equal(result.overflow,false,"Page-transition demo overflow at "+width);
     await page.locator('[data-pgt-show="1"]').click();
     await page.waitForFunction(()=>window.__atrezzoPreviewInstance?.currentScene===1&&!window.__atrezzoPreviewInstance.engine.busy,{timeout:12000});
     assert.equal(await page.locator('[data-pgt-scene="1"]').isVisible(),true);
     assert.equal(await page.locator('[data-pgt-scene="1"] img').evaluate(img=>img.naturalWidth>0),true,"Second scene SVG should have decoded before swap");
     assert.equal(await page.locator('[data-pgt-scene="0"]').isVisible(),false);
     assert.equal(await page.locator(".atz-transition-layer--active").count(),0,"Cover should leave screen after scene swap");
     await page.locator('[data-pgt-show="2"]').click();
     await page.waitForFunction(()=>window.__atrezzoPreviewInstance?.currentScene===2&&!window.__atrezzoPreviewInstance.engine.busy,{timeout:12000});
     assert.equal(await page.locator('[data-pgt-scene="2"]').isVisible(),true);
     assert.equal(await page.locator('[data-pgt-scene="2"] img').evaluate(img=>img.naturalWidth>0),true,"Third scene SVG should have decoded before swap");
     assert.equal(await page.locator('[data-pgt-show="2"]').getAttribute("aria-pressed"),"true");
     assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2),true);
     assert.deepEqual(errors,[],entry.id+" JS exceptions");
     if(width===1440)await page.screenshot({path:join(artifacts,entry.id+".png"),fullPage:false});
     await page.evaluate(()=>window.__atrezzoPreviewInstance.destroy());
     assert.equal(await page.locator(".atz-transition-layer").count(),0,"Engine overlay must be removed on destroy");
     results.push({id:entry.id,width,test:"approved-page-transition-swap",variant:entry.variant,teardown:"ok"});
     await page.close();
   }
 }
 // First real multi-document Chromium validation of the exact original engine.
 for(const width of [375,1440]){
   const page=await browser.newPage({viewport:{width,height:900}});
   const errors=[];page.on("pageerror",error=>errors.push(error.message));
   await page.goto(origin+"/catalog/page-transitions-demo/atelier.html",{waitUntil:"domcontentloaded"});
   await page.waitForFunction(()=>Boolean(window.__atrezzoPageEngine));
   for(const [slug,expectedEffect] of [["material","veil"],["night","split"],["atelier","iris"]]){
     const next=page.locator("#go-next");
     assert.equal(await next.getAttribute("data-atz-effect"),expectedEffect);
     await next.click();
     await page.waitForURL("**/catalog/page-transitions-demo/"+slug+".html",{timeout:12000});
     await page.waitForFunction(()=>Boolean(window.__atrezzoPageEngine)&&!window.__atrezzoPageEngine.busy,{timeout:12000});
     assert.equal(await page.locator("body").getAttribute("data-demo-page"),slug);
     await page.locator(".demo-art img").evaluate(async img=>{if(!img.complete)await new Promise((resolve,reject)=>{img.addEventListener("load",resolve,{once:true});img.addEventListener("error",reject,{once:true});});});
     assert.equal(await page.locator(".demo-art img").evaluate(img=>img.naturalWidth>0),true,"Approved SVG must load in cross-document demo");

     assert.equal(await page.locator(".atz-transition-layer--active").count(),0,"Arrival cover must clear");
     assert.equal(await page.evaluate(()=>document.documentElement.classList.contains("atz-arrival-pending")),false,"Arrival preflight must clear");
     assert.equal(await page.evaluate(()=>sessionStorage.getItem("atrezzo.transitions.pending.v1")),null,"Arrival session data consumed once");
     assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2),true,"Multipage overflow");
   }
   await page.goBack({waitUntil:"domcontentloaded"});
   await page.waitForFunction(()=>Boolean(window.__atrezzoPageEngine)&&!window.__atrezzoPageEngine.busy,{timeout:12000});
   assert.equal(await page.locator("body").getAttribute("data-demo-page"),"night","Browser back navigation must still work");
   assert.deepEqual(errors,[],"Cross-document JS errors at "+width);
   await page.close();
 }
 const reducedPageTransitions=await browser.newPage({viewport:{width:375,height:812},reducedMotion:"reduce"});
 await reducedPageTransitions.goto(origin+"/catalog/preview.html?id=ATZ-PGT-003",{waitUntil:"domcontentloaded"});
 await reducedPageTransitions.waitForFunction(()=>Boolean(window.__atrezzoPreviewInstance));
 assert.equal(await reducedPageTransitions.evaluate(()=>window.__atrezzoPreviewInstance.mode),"static");
 await reducedPageTransitions.locator('[data-pgt-show="1"]').click();
 assert.equal(await reducedPageTransitions.locator('[data-pgt-scene="1"]').isVisible(),true);
 assert.equal(await reducedPageTransitions.locator(".atz-transition-layer--active").count(),0);
 await reducedPageTransitions.close();
 const noJsPageTransitions=await browser.newPage({javaScriptEnabled:false,viewport:{width:375,height:812}});
 await noJsPageTransitions.goto(origin+"/catalog/page-transitions-demo/atelier.html",{waitUntil:"domcontentloaded"});
 await noJsPageTransitions.locator("#go-next").click();
 await noJsPageTransitions.waitForURL("**/catalog/page-transitions-demo/material.html",{timeout:12000});
 assert.equal(await noJsPageTransitions.locator("body").getAttribute("data-demo-page"),"material","Native HTML navigation must work without JavaScript");
 await noJsPageTransitions.close();

 // Extracted Tri-Lane Service Bento: isolate 1+4 cards at four responsive widths.
 for(const width of [375,768,1024,1440]){
   const page=await browser.newPage({viewport:{width,height:900},reducedMotion:"no-preference"});
   await setup(page);
   const errors=[];page.on("pageerror",err=>errors.push(err.message));
   await page.goto(origin+"/catalog/preview.html?id=ATZ-SVC-001",{waitUntil:"domcontentloaded"});
   await page.waitForFunction(()=>Boolean(window.__atrezzoPreviewInstance),{timeout:12000});
   const info=await page.evaluate(()=>{
     const root=document.querySelector(".atz-svc");
     const rail=root?.querySelector("[data-svc-rail]");
     const feature=root?.querySelector(".atz-svc__feature");
     const secondary=root?.querySelector(".atz-svc__secondary");
     return {id:root?.dataset.atzId,mode:window.__atrezzoPreviewInstance?.mode,
       cardCount:root?.querySelectorAll("[data-svc-card]").length,
       secondaryCount:secondary?.querySelectorAll("[data-svc-card]").length,
       cssGrid:getComputedStyle(rail).display,
       secondaryDisplay:getComputedStyle(secondary).display,
       railOverflow:rail?.scrollWidth>rail?.clientWidth+20,
       docOverflow:document.documentElement.scrollWidth>innerWidth+2,
       featureWidth:feature?.getBoundingClientRect().width,
       cardWidth:secondary?.querySelector("[data-svc-card]")?.getBoundingClientRect().width,
       links:[...root.querySelectorAll(".atz-svc__card a")].every(a=>Boolean(document.querySelector(a.hash))),
       imgCount:root?.querySelectorAll(".atz-svc__card>img").length};
   });
   assert.equal(info.id,"ATZ-SVC-001","Unexpected Bento root");
   assert.equal(info.mode,"revealed","Entry effects use IntersectionObserver, not scroll hijacking");
   assert.equal(info.cardCount,5,"Feature + four secondary cards");
   assert.equal(info.secondaryCount,4);
   assert.equal(info.imgCount,5);
   assert.equal(info.docOverflow,false,"Bento must not overflow document at "+width);
   assert.equal(info.links,true,"Every CTA must have a working demo destination");
   if(width<768){
     assert.equal(info.cssGrid,"flex","Mobile must use scroll-snap rail");
     assert.equal(info.secondaryDisplay,"contents","All five cards share one swipe track");
     assert.equal(info.railOverflow,true,"Mobile rail must be horizontally scrollable");
     await page.locator("[data-svc-rail]").focus();
     await page.keyboard.press("ArrowRight");
     await page.waitForFunction(()=>document.querySelector("[data-svc-rail]").scrollLeft>30,{timeout:6000});
   } else {
     assert.equal(info.cssGrid,"grid","Tablet/desktop should retain architectural grid");
     assert.equal(info.secondaryDisplay,"grid");
     if(width>=1024)assert(info.featureWidth>info.cardWidth*1.25,"Desktop featured card must dominate");
   }
   await page.waitForFunction(()=>[...document.querySelectorAll(".atz-svc__card>img")].every(img=>img.complete&&img.naturalWidth>0),{timeout:12000});
   await page.locator(".atz-svc__feature a").click();
   assert.equal(new URL(page.url()).hash,"#atz-svc-demo-roofing");
   assert.deepEqual(errors,[],"Bento JS exceptions at "+width);
   if(width===375||width===1440){
     await page.locator(".atz-svc__heading").evaluate(el=>el.scrollIntoView({block:"start",behavior:"instant"}));
     await page.waitForFunction(()=>{
       const cards=[...document.querySelectorAll(".atz-svc__card")];
       return cards.some(c=>{const r=c.getBoundingClientRect();return r.bottom>0&&r.top<innerHeight&&getComputedStyle(c).opacity==="1";});
     },null,{timeout:8000});
     await page.waitForTimeout(960); // Wait for 700ms source reveal + max stagger.
     const presented=await page.evaluate(()=>[...document.querySelectorAll(".atz-svc__card")].filter(card=>{
       const r=card.getBoundingClientRect();
       const overlapH=Math.max(0,Math.min(r.bottom,innerHeight)-Math.max(r.top,0));
       const overlapW=Math.max(0,Math.min(r.right,innerWidth)-Math.max(r.left,0));
       return overlapH>=Math.min(40,r.height*.08)&&overlapW>=Math.min(32,r.width*.10);
     }).map(card=>({opacity:Number(getComputedStyle(card).opacity),visible:card.getBoundingClientRect().width>0,className:card.className})));
     assert(presented.length>0&&presented.every(c=>c.opacity>.95&&c.visible),"Meaningfully visible Bento cards must be painted: "+JSON.stringify({width,presented}));
     await page.screenshot({path:join(artifacts,"ATZ-SVC-001-"+width+".png"),fullPage:false});
   }
   await page.evaluate(()=>window.__atrezzoPreviewInstance.destroy());
   assert.equal(await page.locator(".atz-svc").getAttribute("data-svc-mounted"),null,"Bento must clean up state on destroy");
   results.push({id:"ATZ-SVC-001",width,test:"service-bento-responsive",art:"loaded",interaction:width<768?"keyboard-and-swipe":"bento-grid",teardown:"ok"});
   await page.close();
 }
 const reducedServices=await browser.newPage({viewport:{width:375,height:812},reducedMotion:"reduce"});
 await setup(reducedServices);
 await reducedServices.goto(origin+"/catalog/preview.html?id=ATZ-SVC-001",{waitUntil:"domcontentloaded"});
 await reducedServices.waitForFunction(()=>Boolean(window.__atrezzoPreviewInstance));
 assert.equal(await reducedServices.evaluate(()=>window.__atrezzoPreviewInstance.mode),"static","Reduced motion disables the staged reveal");
 assert.equal(await reducedServices.locator(".atz-svc--waiting").count(),0,"No hidden cards for reduced motion");
 await reducedServices.close();
 const noJsServices=await browser.newPage({javaScriptEnabled:false,viewport:{width:375,height:812}});
 await noJsServices.goto(origin+"/__service_nojs",{waitUntil:"domcontentloaded"});
 assert.equal(await noJsServices.locator(".atz-svc__card").count(),5,"Five service cards visible without JS");
 assert((await noJsServices.locator(".atz-svc__feature").boundingBox()).height>350,"Feature must be visible without JS");
 await noJsServices.waitForFunction(()=>[...document.querySelectorAll(".atz-svc__card>img")].every(img=>img.complete&&img.naturalWidth>0),{timeout:12000});
 await noJsServices.close();

 const index=await browser.newPage({viewport:{width:1440,height:900}});
 await setup(index);
 await index.goto(origin+"/catalog/",{waitUntil:"domcontentloaded"});
 await index.waitForFunction(()=>document.querySelectorAll(".component-card").length===49);
 // Every registered ID must link to its own preview (including new prefixes such as MOT).
 const routes=await index.locator("#component-grid .component-card").evaluateAll(cards=>cards.map(card=>({
   id:card.dataset.id,
   visual:card.querySelector(".card-visual")?.getAttribute("href"),
   action:card.querySelector(".card-action")?.getAttribute("href")
 })));
 assert.equal(routes.length,registry.entries.length,"Every component has a catalog card");
 for(const route of routes){
   const target="preview.html?id="+route.id;
   assert.equal(route.visual,target,route.id+" visual link must open its own preview");
   assert.equal(route.action,target,route.id+" action link must open its own preview");
 }
 await index.screenshot({path:join(artifacts,"index-desktop.png"),fullPage:false});
 await index.locator("#search").fill("ATZ-SCR-005");
 assert.equal(await index.locator(".component-card").count(),1,"Catalog ID search");
 await index.locator("#search").fill("");
 await index.locator(".filter[data-category='transiciones']").click();
 assert.equal(await index.locator(".component-card").count(),1,"Transition filter");
 await index.locator(".filter[data-category='all']").click();
 await index.locator('#component-grid [data-id="ATZ-MOT-006"] .card-action').click();
 await index.waitForURL("**/catalog/preview.html?id=ATZ-MOT-006",{timeout:12000});
 await index.waitForFunction(()=>Boolean(window.__atrezzoPreviewInstance),{timeout:12000});
 assert.equal(await index.locator(".atz-motion-v1").getAttribute("data-atz-id"),"ATZ-MOT-006","Editorial Journey card must open the actual motion");

 await index.close();
 const mobile=await browser.newPage({viewport:{width:375,height:812}});
 await setup(mobile);
 await mobile.goto(origin+"/catalog/",{waitUntil:"domcontentloaded"});
 await mobile.waitForFunction(()=>document.querySelectorAll(".component-card").length===49);
 await mobile.screenshot({path:join(artifacts,"index-mobile.png"),fullPage:false});
 assert.equal(await mobile.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2),true,"mobile catalog overflow");
 await mobile.close();
 // Favorites and behavior filters checked at all four viewport sizes.
 for(const width of [375,768,1024,1440]){
   const page=await browser.newPage({viewport:{width,height:900}});
   await setup(page);
   await page.goto(origin+"/catalog/",{waitUntil:"domcontentloaded"});
   await page.waitForFunction(()=>document.querySelectorAll("#component-grid .component-card").length===49,{timeout:12000});
   assert.equal(await page.locator("[data-category]").count(),10,"All plus nine discovery groups");
   assert.equal(await page.locator(".collection-heading").count(),9);
   assert.equal(await page.locator("#count-tested").textContent(),"49");
   assert.equal(await page.locator('#component-grid [data-id="ATZ-MOT-001"] .card-status').textContent(),"Demo probada");
   assert.equal(await page.locator('#component-grid [data-id="ATZ-SEC-005"] .card-status').textContent(),"Demo probada");
   const favorite=page.locator('#component-grid [data-id="ATZ-SEC-005"] [data-favorite-id]');
   await favorite.click();
   assert.equal(await page.locator("#favorites-grid .component-card").count(),1);
   assert.equal(await favorite.getAttribute("aria-pressed"),"true");
   await page.reload({waitUntil:"domcontentloaded"});
   await page.waitForFunction(()=>document.querySelectorAll("#favorites-grid .component-card").length===1,{timeout:12000});
   assert.equal(await page.locator('#component-grid [data-id="ATZ-SEC-005"] [data-favorite-id]').getAttribute("aria-pressed"),"true");
   await page.locator('[data-category="sticky"]').click();
   assert.equal(await page.locator("#component-grid .component-card").count(),15);
   await page.locator('[data-category="narrativa"]').click();
   assert.equal(await page.locator("#component-grid .component-card").count(),10);
   await page.locator("#search").fill("horizontal");
   assert.equal(await page.locator("#component-grid .component-card").count(),1);
   assert.equal(await page.locator("#component-grid .component-card").first().getAttribute("data-id"),"ATZ-SEC-005");
   await page.locator("#search").fill("");
   await page.locator('[data-category="all"]').click();
   assert.equal(await page.locator("#component-grid .component-card").count(),49);
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2),true,"Catalog overflow at "+width);
   if(width===375||width===1440)await page.screenshot({path:join(artifacts,"favorites-"+width+".png"),fullPage:false});
   await page.goto(origin+"/catalog/preview.html?id=ATZ-SCR-003",{waitUntil:"domcontentloaded"});
   await page.locator("#preview-favorite").waitFor({state:"visible",timeout:12000});
   await page.locator("#preview-favorite").click();
   assert.equal(await page.locator("#preview-favorite").getAttribute("aria-pressed"),"true");
   await page.goto(origin+"/catalog/",{waitUntil:"domcontentloaded"});
   await page.waitForFunction(()=>document.querySelectorAll("#favorites-grid .component-card").length===2,{timeout:12000});
   await page.locator('#favorites-grid [data-id="ATZ-SEC-005"] [data-favorite-id]').click();
   assert.equal(await page.locator("#favorites-grid .component-card").count(),1);
   assert.equal(await page.locator('#component-grid [data-id="ATZ-SEC-005"] [data-favorite-id]').getAttribute("aria-pressed"),"false");
   await page.close();
 }
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
 const report={passed:true,checks:results.length,variants:registry.entries.length,stickySourceVariants:stickyEntries.length,nativeScrollVariants:nativeEntries.length,motionV1Variants:motionV1Entries.length,pageTransitions:pageTransitionEntries.length,serviceBento:serviceBentoEntries.length,widths:[375,768,1024,1440],
   reducedMotion:"passed",noJavaScript:"passed",catalogSearch:"passed",filters:"passed",multiInstanceIsolation:"passed",phase4Integration:"passed",navigationNoJs:"passed",navigationKeyboard:"passed",stickyNoJs:"passed",stickyReducedMotion:"passed",nativeScrollNoJs:"passed",nativeScrollReducedMotion:"passed",favoritesAcrossReload:"passed",discoveryGrouping:"passed",favoritesPreview:"passed",pageTransitionsSwap:"passed",crossDocumentTransitions:"passed",pageTransitionsNoJs:"passed",serviceBentoResponsive:"passed",serviceBentoReducedMotion:"passed",serviceBentoNoJs:"passed",results};
 await fs.writeFile(join(artifacts,"browser-report.json"),JSON.stringify(report,null,2));
 console.log("BROWSER QA PASSED: "+results.length+" individual viewport/variant checks + reduced motion, no-JS, search and filters");
}catch(err){
 console.error("BROWSER QA FAILED:",err);
 await fs.writeFile(join(artifacts,"browser-error.txt"),String(err.stack||err));
 process.exitCode=1;
}finally{await browser.close();await new Promise(resolve=>server.close(resolve));}

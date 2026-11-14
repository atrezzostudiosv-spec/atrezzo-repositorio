import assert from "node:assert/strict";
import {createServer} from "node:http";
import {promises as fs} from "node:fs";
import {join,resolve,extname,sep} from "node:path";
import {tmpdir} from "node:os";
import {execFileSync} from "node:child_process";
import {chromium} from "playwright";
const root=process.cwd(),reg=JSON.parse(await fs.readFile("registry/components.json","utf8"));
const output=join(root,"catalog/previews");
const mime={".html":"text/html",".js":"text/javascript",".css":"text/css",".json":"application/json",".svg":"image/svg+xml",".webp":"image/webp",".webm":"video/webm",".png":"image/png"};
const server=createServer(async(req,res)=>{try{const url=new URL(req.url,"http://localhost");const p=decodeURIComponent(url.pathname);const f=resolve(root,"."+p+(p.endsWith("/")?"index.html":""));if(!f.startsWith(root+sep)){res.writeHead(403);res.end();return}const body=await fs.readFile(f);res.writeHead(200,{"content-type":mime[extname(f)]||"application/octet-stream","cache-control":"no-store"});res.end(body)}catch{res.writeHead(404);res.end("Not found")}});
await new Promise(r=>server.listen(0,"127.0.0.1",r));const origin="http://127.0.0.1:"+server.address().port;
const browser=await chromium.launch({headless:true});
const setup=async page=>{await page.route("https://fonts.googleapis.com/**",r=>r.fulfill({status:200,contentType:"text/css",body:""}));await page.route("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/**",r=>r.fulfill({status:200,contentType:"application/javascript",path:join(root,"node_modules/gsap/dist",r.request().url().endsWith("ScrollTrigger.min.js")?"ScrollTrigger.min.js":"gsap.min.js")}))};
const open=async e=>{const page=await browser.newPage({viewport:{width:1120,height:700},reducedMotion:"no-preference",deviceScaleFactor:1});await setup(page);const errors=[];page.on("pageerror",x=>errors.push(x.message));await page.goto(origin+"/catalog/preview.html?id="+e.id,{waitUntil:"domcontentloaded"});await page.waitForFunction(()=>Boolean(window.__atrezzoPreviewInstance),{timeout:15000});assert.equal(await page.locator("#demo [data-atz-id]").first().getAttribute("data-atz-id"),e.id,e.id+" wrong scene");assert.equal(errors.length,0,e.id+" page error: "+errors.join(";"));return {page,errors}};
const scroll=(p,y)=>p.evaluate(y=>scrollTo({top:y,behavior:"instant"}),y);
const locate={
"ATZ-NAV-001":"[data-azn1-menu-trigger]","ATZ-NAV-003":"[data-azn1-dock-next]",
"ATZ-MOT-015":"[data-swap]","ATZ-MIC-001":"[data-magnet]","ATZ-MIC-002":"[data-cursor]",
"ATZ-MIC-003":".mi-cta","ATZ-MIC-004":"[data-hover-item]","ATZ-MIC-005":"[data-hold]",
"ATZ-CTR-003":"[data-entry-replay]","ATZ-CTR-004":"[data-project-open]",
"ATZ-PGT-001":"[data-pgt-show='1']","ATZ-PGT-002":"[data-pgt-show='1']","ATZ-PGT-003":"[data-pgt-show='1']"
};
const hover=new Set(["ATZ-MOT-015","ATZ-MIC-001","ATZ-MIC-002","ATZ-MIC-003","ATZ-MIC-004"]);
const encode=(args)=>execFileSync("ffmpeg",["-hide_banner","-loglevel","error","-y",...args],{stdio:"inherit"});
async function capture(e){
 const {page,errors}=await open(e);const tmp=await fs.mkdtemp(join(tmpdir(),"atz-media-"));let interaction="scroll";let target=null;
 try{
 const bounds=await page.locator("#demo").evaluate(el=>({top:el.getBoundingClientRect().top+scrollY,height:el.offsetHeight,view:innerHeight,total:document.documentElement.scrollHeight}));
 const start=Math.max(0,bounds.top-0.35*bounds.view),end=Math.min(bounds.total-bounds.view,Math.max(bounds.top,bounds.top+bounds.height-bounds.view));
 if(locate[e.id]){target=page.locator(locate[e.id]).first();await target.scrollIntoViewIfNeeded();await page.waitForTimeout(250);interaction=e.id==="ATZ-MIC-005"?"hold":hover.has(e.id)?"hover":"click";}
 else if(e.discovery_trigger==="time"){await scroll(page,bounds.top);interaction="time";}
 else await scroll(page,start);
 await page.waitForTimeout(140);
 let posterFrame=20;
 for(let i=0;i<40;i++){
   if(interaction==="scroll")await scroll(page,start+(end-start)*i/39);
   if(target&&i===5){if(interaction==="hover"){await target.hover({position:{x:Math.min(25,Math.max(1,(await target.boundingBox()).width/2)),y:10}})}else if(interaction==="hold"){const b=await target.boundingBox();await page.mouse.move(b.x+b.width/2,b.y+b.height/2);await page.mouse.down()}else await target.evaluate(el=>el.click());}
   if(interaction==="hold"&&i===29)await page.mouse.up();
   if(interaction==="hover"&&i===32)await page.mouse.move(1,1);
   await page.waitForTimeout(90);
   await page.screenshot({path:join(tmp,String(i).padStart(3,"0")+".png"),fullPage:false});
 }
 if(interaction==="click"||interaction==="hold")posterFrame=26;
 const poster=join(output,e.id+".webp"),video=join(output,e.id+".webm");
 encode(["-i",join(tmp,String(posterFrame).padStart(3,"0")+".png"),"-vf","scale=896:560","-frames:v","1","-c:v","libwebp","-quality","83",poster]);
 encode(["-framerate","8","-i",join(tmp,"%03d.png"),"-vf","scale=800:500","-c:v","libvpx-vp9","-pix_fmt","yuv420p","-crf","33","-b:v","0","-an",video]);
 assert((await fs.stat(poster)).size>3000,e.id+" poster too small");assert((await fs.stat(video)).size>5000,e.id+" video too small");
 assert.equal(errors.length,0,e.id+" page errors: "+errors.join(";"));
 return {poster:"previews/"+e.id+".webp",video:"previews/"+e.id+".webm",duration:5,source:e.preview,viewport:"1120x700",interaction};
 }finally{await page.close();await fs.rm(tmp,{recursive:true,force:true})}
}
async function smoke(expectMedia){
 for(const width of [375,768,1024,1440]){
   const page=await browser.newPage({viewport:{width,height:900},acceptDownloads:true});await setup(page);const errors=[];page.on("pageerror",x=>errors.push(x.message));await page.goto(origin+"/catalog/visual.html");
   await page.waitForFunction(n=>document.querySelectorAll("#grid .card").length===n,reg.entries.length,{timeout:15000});
   assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2),"Overflow "+width);
   await page.locator("#query").fill("ATZ-MOT-003");assert.equal(await page.locator("#grid .card").count(),1);
   await page.locator("#industry").selectOption("salud");assert.equal(await page.locator("#grid .card").count(),1);
   await page.locator("#role").selectOption("Hero");assert.equal(await page.locator("#grid .card").count(),1);
   await page.locator("[data-fav='ATZ-MOT-003']").click();await page.locator("#saved").selectOption("yes");assert.equal(await page.locator("#grid .card").count(),1);
   await page.locator("[data-add='ATZ-MOT-003']").click();assert.equal(await page.locator("#board-count").textContent(),"1");
   await page.locator("[data-row-role='0']").selectOption("Hero");
   await page.locator("#project-name").fill("Prueba ATREZZO");await page.locator("#project-name").press("Tab");
   await page.reload();await page.waitForFunction(()=>document.querySelector("#board-count").textContent==="1");assert.equal(await page.locator("#project-name").inputValue(),"Prueba ATREZZO");
   await page.locator("#d-industry").selectOption("salud");await page.locator("#d-motion").selectOption("3");await page.locator("#recommend").click();assert.match(await page.locator("#recommendations").textContent(),/M1/);assert.match(await page.locator("#recommendations").textContent(),/Sección estática prioritaria/);
   await page.locator("#d-motion").selectOption("0");await page.locator("#recommend").click();assert.equal(await page.locator("#recommendations [data-add]").count(),0);
   await page.locator("#query").fill("ATZ-MOT-003");await page.locator("[data-play='ATZ-MOT-003']").click();
   if(expectMedia){await page.waitForFunction(()=>document.querySelector(".media video")?.readyState>=2);assert.equal(await page.locator(".media video").count(),1)}else{await page.waitForFunction(()=>document.querySelector("#demo-dialog").open);await page.locator("#close-dialog").click()}
   const downloadPromise=page.waitForEvent("download");await page.locator("#export-json").click();const download=await downloadPromise;assert.equal(download.suggestedFilename(),"ATREZZO-project.json");
   assert.equal(errors.length,0,errors.join(";"));await page.close();console.log("PASS visual catalog "+width);
 }
}
try{
 await smoke(false);
 if(process.argv.includes("--capture")){
  await fs.mkdir(output,{recursive:true});
  const records={};
  for(const e of reg.entries){records[e.id]=await capture(e);console.log("Captured "+e.id)}
  await fs.writeFile(join(output,"manifest.json"),JSON.stringify({status:"captured",sourceCommit:process.env.GITHUB_SHA||"local",entries:records},null,2)+"\n");
  await smoke(true);
 }
}finally{await browser.close();await new Promise(r=>server.close(r))}

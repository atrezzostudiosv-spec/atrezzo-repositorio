import fs from 'node:fs';
import {spawn,execFileSync} from 'node:child_process';
import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import {resolveComponent,createIntegrationPrompt} from '../scripts/resolve-component.mjs';
import {exportComponent} from '../scripts/export-component.mjs';
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const entries=read('registry/components.json').source_approved_entries.filter(e=>e.source_collection==='gsap-vault');
assert.equal(entries.length,10);
const base='http://127.0.0.1:8794',server=spawn('python3',['-m','http.server','8794','--bind','127.0.0.1'],{stdio:'ignore'});
const sleep=ms=>new Promise(r=>setTimeout(r,ms)),dir='qa-gsap-vault';fs.mkdirSync(dir,{recursive:true});
let browser;const report=[];
async function open(ctx,url){const page=await ctx.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto(base+'/'+url,{waitUntil:'load'});await page.evaluate(()=>document.fonts.ready);await page.waitForTimeout(350);return {page,errors}}
async function action(p,i,check=true){const a=(v,msg)=>{if(check)assert(v,msg)};switch(i){
case 0: await p.waitForFunction(()=>window.SpotlightBackground&&document.querySelector('[data-spotlight].is-live'),null,{timeout:15000});await p.mouse.move(100,100);await p.waitForTimeout(900);await p.mouse.move(850,380);await p.waitForTimeout(1000);a(await p.locator('canvas').count()>0,'WebGL canvas');break;
case 1: {const c=p.locator('.flip-card').first();await c.focus();await p.waitForTimeout(800);a(await c.getAttribute('aria-pressed')==='true','card focus flip');await p.keyboard.press('Escape');await p.waitForTimeout(600);break;}
case 2: await p.waitForFunction(()=>!!window.imageClipReveal);await p.locator('[data-clip-replay]').click();await p.waitForTimeout(1550);await p.locator('figure').last().scrollIntoViewIfNeeded();await p.waitForTimeout(1500);break;
case 3: {const l=p.locator('[data-underline]').first();await l.focus();await p.waitForTimeout(650);a(await l.evaluate(e=>e.classList.contains('hu-ready')),'underline initialized');await p.locator('[data-underline]').last().focus();await p.waitForTimeout(850);break;}
case 4: {const tab=p.getByRole('tab').nth(1);await tab.click();await p.waitForTimeout(650);a(await tab.getAttribute('aria-selected')==='true','tab selected');await tab.press('ArrowRight');await p.waitForTimeout(650);break;}
case 5: {const q=p.locator('[data-accordion-trigger]').nth(1);await q.click();await p.waitForTimeout(700);a(await q.getAttribute('aria-expanded')==='true','FAQ opened');await q.click();await p.waitForTimeout(600);a(await q.getAttribute('aria-expanded')==='false','FAQ closed');break;}
case 6: await p.evaluate(()=>window.scrollTo(0,document.documentElement.scrollHeight*.6));await p.waitForTimeout(650);a(Number(await p.locator('[data-progress-style]').first().getAttribute('aria-valuenow'))>0,'progress advanced');await p.evaluate(()=>window.scrollTo(0,0));await p.waitForTimeout(650);break;
case 7: await p.locator('#stepNext').click();await p.waitForTimeout(700);a(await p.locator('.step-node').nth(1).getAttribute('aria-current')==='step','step advanced');await p.locator('#stepBack').click();await p.waitForTimeout(650);break;
case 8: await p.locator('#skReload').click();await p.waitForFunction(()=>document.querySelector('#skFeed').getAttribute('aria-busy')==='false',null,{timeout:15000});await p.waitForTimeout(550);break;
case 9: await p.locator('[data-next]').click();await p.waitForTimeout(800);await p.locator('[data-close]').click();await p.waitForTimeout(750);a(await p.locator('[data-announcement-bar]').evaluate(e=>e.classList.contains('is-dismissed')),'banner dismissed');break;
}}
try{await sleep(900);browser=await chromium.launch({args:['--enable-webgl','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
for(let i=0;i<entries.length;i++){const e=entries[i], id=e.id;console.log('QA',id,e.title);
const contract=resolveComponent(id);assert(contract.package_files.includes(e.package_directory+'LICENSE'));assert(createIntegrationPrompt(id).includes(e.package_manifest) || createIntegrationPrompt(id).includes(e.package_directory+'manifest.json'));
const out=exportComponent(id,dir+'/'+id+'-export');assert.equal(out.files.length,contract.package_files.length);
for(const width of [375,768,1024,1440]){const ctx=await browser.newContext({viewport:{width,height:width===375?812:900},hasTouch:width===375});const {page,errors}=await open(ctx,e.preview);await page.waitForFunction(()=>!!window.gsap);assert(await page.locator(e.selector).count()>0);assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2),'horizontal overflow '+id+' '+width);await action(page,i);assert.deepEqual(errors,[],id+' '+width);await page.screenshot({path:dir+'/'+id+'-'+width+'.png'});report.push({id,width,interaction:'pass',errors});await ctx.close();}
for(const reduced of [true,false]){const ctx=await browser.newContext({viewport:{width:768,height:900},reducedMotion:reduced?'reduce':'no-preference',javaScriptEnabled:reduced});const {page,errors}=await open(ctx,e.preview);assert(await page.locator('main').count()>0);assert(await page.locator('main').isVisible());assert.deepEqual(errors,[]);if(reduced)await page.screenshot({path:dir+'/'+id+'-reduced.png'});report.push({id,mode:reduced?'reduced':'no-js',visible:true,errors});await ctx.close();}
const ctx=await browser.newContext({viewport:{width:1120,height:700},recordVideo:{dir:dir+'/videos',size:{width:1120,height:700}}});const {page,errors}=await open(ctx,e.preview);await page.waitForTimeout(800);await page.screenshot({path:dir+'/'+id+'-poster.png'});await action(page,i);await page.waitForTimeout(550);assert.deepEqual(errors,[]);const v=page.video();await ctx.close();await v.saveAs('catalog/previews/'+id+'.webm');execFileSync('ffmpeg',['-y','-i',dir+'/'+id+'-poster.png','-c:v','libwebp','-quality','85','catalog/previews/'+id+'.webp'],{stdio:'ignore'});
}
const ctx=await browser.newContext({viewport:{width:1280,height:900}}),{page,errors}=await open(ctx,'catalog/index.html#originales');await page.waitForSelector('#original-grid [data-id="ATZ-GSV-001"]');for(const e of entries){await page.locator('#query').fill(e.id);assert.equal(await page.locator('#original-grid .card').count(),1);await page.locator('[data-fav="'+e.id+'"]').click();assert.equal(await page.locator('[data-fav="'+e.id+'"]').getAttribute('aria-pressed'),'true');await page.locator('[data-add="'+e.id+'"]').click();assert.match(await page.locator('#board-items').textContent(),new RegExp(e.id));}assert.deepEqual(errors,[]);await ctx.close();fs.writeFileSync(dir+'/report.json',JSON.stringify(report,null,2));console.log('PASS 10 original packages, four viewport interactions, reduced motion, no JS, catalog and recordings.');
}finally{if(browser)await browser.close();server.kill();}

import { chromium } from 'playwright';
import fs from 'node:fs/promises';
import path from 'node:path';
import http from 'node:http';
import crypto from 'node:crypto';

const root=path.resolve('website-library/8b');
const manifest=JSON.parse(await fs.readFile(path.join(root,'manifest.json'),'utf8'));
const selection=JSON.parse(await fs.readFile(path.join(root,'selection.json'),'utf8'));
const candidates=selection.templates.filter(r=>r.status==='candidate');
const archiveErrors=[];
if (selection.templates.length!==106 || new Set(selection.templates.map(r=>r.slug)).size!==106 || candidates.length!==24) archiveErrors.push('Invalid selection coverage');
for(const row of manifest.templates){
  for(const [name,sha] of Object.entries(row.sha256||{})){
    try{
      const data=await fs.readFile(path.join(root,'templates',row.slug,name));
      if(crypto.createHash('sha256').update(data).digest('hex')!==sha)archiveErrors.push(row.slug+'/'+name+' hash mismatch');
    }catch(e){archiveErrors.push(row.slug+'/'+name+': '+e.message);}
  }
}
if(manifest.imported_count!==106)archiveErrors.push('Unexpected imported count');
const server=http.createServer(async(req,res)=>{
  try{
    const u=new URL(req.url,'http://localhost');
    const p=decodeURIComponent(u.pathname);
    if(!/^\/templates\/[a-z0-9-]+\/index\.html$/.test(p)){res.writeHead(404);res.end();return;}
    const data=await fs.readFile(path.join(root,p.slice(1)));
    res.setHeader('Content-Type','text/html; charset=utf-8');
    res.end(data);
  }catch{res.writeHead(404);res.end();}
});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const base='http://127.0.0.1:'+server.address().port;
const browser=await chromium.launch({headless:true});
const cases=[{width:375,height:812},{width:768,height:1024},{width:1024,height:768},{width:1440,height:900},{width:375,height:812,reducedMotion:'reduce'},{width:375,height:812,javaScriptEnabled:false}];
const results=[];
async function audit(row,mode){
  const ctx=await browser.newContext({viewport:{width:mode.width,height:mode.height},reducedMotion:mode.reducedMotion||'no-preference',javaScriptEnabled:mode.javaScriptEnabled!==false});
  const page=await ctx.newPage();
  const errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  // No remote scripts, fonts, photos or form requests in this source-only QA.
  // Missing remote assets are intentional and not interpreted as visual failures.
  await ctx.route('**/*',route=>route.request().url().startsWith(base+'/templates/')?route.continue():route.abort());
  const out={id:row.id,slug:row.slug,mode,flags:[],errors};
  try{
    const response=await page.goto(base+'/'+row.local_html,{waitUntil:'domcontentloaded',timeout:20000});
    out.http=response?.status();
    if(out.http!==200)out.flags.push('HTTP status not 200');
    await page.waitForTimeout(200);
    const state=await page.evaluate(()=>({
      title:document.title, h1:[...document.querySelectorAll('h1')].map(e=>e.innerText.trim()).filter(Boolean),
      width:document.documentElement.clientWidth,scrollWidth:document.documentElement.scrollWidth,
      height:document.documentElement.scrollHeight,
      links:document.querySelectorAll('a[href]').length,
      brokenAnchors:[...document.querySelectorAll('a[href^="#"]')].map(a=>a.getAttribute('href')).filter(h=>h.length>1&&!document.getElementById(h.slice(1))),
      main:!!document.querySelector('main,[role="main"]'),
      forms:document.querySelectorAll('form').length
    }));
    out.state=state;
    if(!state.h1.length)out.flags.push('Missing readable H1');
    if(!state.title)out.flags.push('Missing title');
    if(state.scrollWidth>state.width+2)out.flags.push('Horizontal overflow');
    if(!state.main)out.flags.push('Missing main landmark');
    if(state.brokenAnchors.length)out.flags.push('Broken fragment links');
    if(mode.javaScriptEnabled!==false){
      const samples=[];
      for(const f of [0,.35,.75,1,.25,0]){
        const v=await page.evaluate(f=>{window.scrollTo({top:Math.round((document.documentElement.scrollHeight-innerHeight)*f),behavior:'instant'});return {target:f,actual:scrollY,range:document.documentElement.scrollHeight-innerHeight};},f);
        await page.waitForTimeout(100);
        samples.push({...v,settled:await page.evaluate(()=>scrollY)});
      }
      out.scroll=samples;
      if(samples[3].range>100&&samples[3].settled<samples[3].range*.8)out.flags.push('End scroll not reached');
    }
    if(errors.length)out.flags.push('JavaScript exception');
  }catch(e){out.flags.push('Browser audit failed');out.errors.push(e.message);}
  finally{await ctx.close();}
  return out;
}
try{
  for(let i=0;i<candidates.length;i+=4){
    const batch=candidates.slice(i,i+4);
    for(const mode of cases){results.push(...await Promise.all(batch.map(row=>audit(row,mode))));}
    console.log('Audited '+Math.min(i+4,candidates.length)+' / '+candidates.length);
  }
}finally{await browser.close();await new Promise(r=>server.close(r));}
const report={scope:'Source-only Chromium smoke test; external resources blocked, CSS variant only. No visual fidelity, GSAP, real forms, Safari or client certification.',archiveErrors,templates:candidates.length,checks:results.length,flagged:results.filter(x=>x.flags.length).length,results};
await fs.mkdir('website-library-qa',{recursive:true});
await fs.writeFile('website-library-qa/report.json',JSON.stringify(report,null,2)+'\n');
const lines=['# 8B source smoke QA','',report.scope,'','Archive hash errors: '+archiveErrors.length,'Candidate checks: '+report.checks,'Flagged cases: '+report.flagged,'','| ID | Width/mode | Flags |','|---|---|---|',...results.filter(x=>x.flags.length).map(x=>'| '+x.id+' | '+x.mode.width+' / '+(x.mode.javaScriptEnabled===false?'no JS':x.mode.reducedMotion||'standard')+' | '+x.flags.join('; ')+' |')];
await fs.writeFile('website-library-qa/report.md',lines.join('\n')+'\n');
console.log(JSON.stringify({archiveErrors,checks:report.checks,flagged:report.flagged,byTemplate:candidates.map(c=>({id:c.id,flags:results.filter(x=>x.id===c.id&&x.flags.length).map(x=>({width:x.mode.width,mode:x.mode.reducedMotion||String(x.mode.javaScriptEnabled),flags:x.flags}))}))}));
if(archiveErrors.length)process.exitCode=1;

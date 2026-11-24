await (async function qa(){
 const fs=await import('node:fs'),{default:assert}=await import('node:assert/strict'),{spawn}=await import('node:child_process'),{chromium}=await import('playwright'),{createHash}=await import('node:crypto');
 const root='websites/templates/ATZ-WEB-004/v1',src=process.argv[2],site=root+'/site',base='http://127.0.0.1:8804/',url=base+site+'/',original='http://127.0.0.1:8814/',server=spawn('python3',['-m','http.server','8804','--bind','127.0.0.1'],{stdio:'ignore'}),os=spawn('python3',['-m','http.server','8814','--bind','127.0.0.1','--directory',src],{stdio:'ignore'});
 const hash=p=>createHash('sha256').update(fs.readFileSync(p)).digest('hex'),walk=d=>fs.readdirSync(d,{withFileTypes:true}).flatMap(f=>f.isDirectory()?walk(d+'/'+f.name):[d+'/'+f.name]);
 assert.equal(hash(src+'/assets/css/styles.css'),hash(site+'/assets/css/styles.css'));
 for(const f of walk(src+'/assets/images').filter(x=>x.endsWith('.webp')))assert.equal(hash(f),hash(site+'/'+f.slice(src.length+1)));
 const orig=fs.readFileSync(src+'/assets/js/app.js','utf8'),copy=fs.readFileSync(site+'/assets/js/app.js','utf8');
 const a=orig.indexOf('/* Cinematic scene reveals'),b=orig.indexOf('/* Careers application',a);assert(a>=0&&b>a);assert(copy.includes(orig.slice(a,b)),'original motion engines');assert(copy.includes(orig.slice(orig.indexOf('function initPremiumReveals()'))),'original premium reveal');
 let browser;const report=[],motion=[];const routes=['home','services','projects','unt','twu','plano','mep','about','careers','contact','policy'];
 try{await new Promise(r=>setTimeout(r,800));browser=await chromium.launch();
 for(const width of [375,768,1024,1440]){
  const ctx=await browser.newContext({viewport:{width,height:900},reducedMotion:'no-preference'}),p=await ctx.newPage(),o=await ctx.newPage(),errors=[],posts=[];
  p.on('pageerror',e=>errors.push(e.message));p.on('request',r=>{if(r.method()!=='GET')posts.push(r.url())});
  await p.goto(url,{waitUntil:'domcontentloaded',timeout:60000});await o.goto(original,{waitUntil:'domcontentloaded',timeout:60000});await p.evaluate(()=>document.fonts.ready);await o.evaluate(()=>document.fonts.ready);
  for(const route of routes){
   await p.evaluate(r=>navigateTo(r),route);await o.evaluate(r=>navigateTo(r),route);const view=p.locator('#page-'+route);
   assert(await view.locator('h1').isVisible(),route+' heading');assert.equal(await p.locator('.page-view:not(.hidden-page)').count(),1);const overflow=await p.evaluate(()=>({width:document.documentElement.scrollWidth,inner:innerWidth,offenders:[...document.querySelectorAll('.page-view:not(.hidden-page) *')].filter(e=>{const r=e.getBoundingClientRect();return r.width&&r.right>innerWidth+3&&getComputedStyle(e).position!=='absolute'}).slice(0,12).map(e=>[e.tagName,e.className,e.getBoundingClientRect().right])}));assert(overflow.width<=overflow.inner+3,route+' overflow '+width+' '+JSON.stringify(overflow));
   const sels=['[data-reveal]','[data-premium-reveal]','[data-scene]','[data-sv-scene]','details','picture'];
   const count=page=>page.evaluate(({route,sels})=>sels.map(s=>document.getElementById('page-'+route).querySelectorAll(s).length),{route,sels});assert.deepEqual(await count(p),await count(o),route+' source targets');
   if(route==='home'||route==='services'){
    const sel=route==='home'?'[data-scene]':'[data-sv-scene]',prop=route==='home'?'--scene-scale':'--sv-image-zoom';assert.equal(await view.locator(sel).count(),3);
    const states=async page=>{await page.locator(sel).nth(1).evaluate(e=>{scrollTo({top:scrollY+e.getBoundingClientRect().top-innerHeight*.35,behavior:'instant'})});await page.waitForFunction(({sel,prop})=>!!document.querySelector(sel)?.style.getPropertyValue(prop),{sel,prop});await page.waitForTimeout(150);return page.locator(sel).first().evaluate((e,prop)=>Number(e.style.getPropertyValue(prop)),prop)};
    const s1=await states(o),s2=await states(p);assert(s1>=1&&s2>=1&&Math.abs(s1-s2)<.08,route+' motion difference');motion.push({width,route,source:s1,template:s2});
    if(route==='home'&&width===1440){await p.evaluate(()=>scrollTo({top:0,behavior:'instant'}));await p.waitForTimeout(500);const png=await p.screenshot();const data=await p.evaluate(async b=>{const im=new Image();im.src='data:image/png;base64,'+b;await im.decode();const c=document.createElement('canvas');c.width=im.width;c.height=im.height;c.getContext('2d').drawImage(im,0,0);return c.toDataURL('image/webp',.86).split(',')[1]},png.toString('base64'));fs.writeFileSync(root+'/poster.webp',Buffer.from(data,'base64'));}
   }
   if(route==='contact'){await p.locator('#ct-name').fill('Demo Test');await p.locator('#ct-email').fill('demo@example.invalid');await p.locator('#ct-message').fill('Test only');await p.locator('[name=demo_route_acknowledged]').check();await p.locator('#ct-submit').click();assert.match(await p.locator('#ct-form-status').textContent(),/No information was sent or stored/);}
   if(route==='careers'){await p.locator('#career-first').fill('Demo');await p.locator('#career-last').fill('Test');await p.locator('#career-email').fill('demo@example.invalid');await p.locator('#career-phone').fill('0000000000');await p.locator('#career-position').selectOption({index:1});for(const input of await p.locator('#career-application-form input[type=file]').all())await input.setInputFiles({name:'example.pdf',mimeType:'application/pdf',buffer:Buffer.from('%PDF-1.4 demo')});await p.locator('#career-consent').check();await p.locator('#career-form-submit').click();assert.match(await p.locator('#career-form-status').textContent(),/no information or attachments were transmitted/);}
   report.push({route,width,pass:true});
  }
  await p.evaluate(()=>navigateTo('home'));if(width<1024){await p.locator('#mobileMenuToggle').click();assert(await p.locator('#mobileMenu').isVisible());await p.keyboard.press('Escape');assert(await p.locator('#mobileMenu').isHidden());}else{await p.locator('#projectsNavToggle').click();assert.equal(await p.locator('#projectsNavToggle').getAttribute('aria-expanded'),'true');await p.keyboard.press('Escape');assert.equal(await p.locator('#projectsNavToggle').getAttribute('aria-expanded'),'false');}
  await p.evaluate(()=>toggleAssistant());await p.locator('#assistantInput').fill('services');await p.locator('#assistantInput').press('Enter');await p.waitForFunction(()=>document.querySelector('#assistantChat').textContent.includes('example planning'));
  assert.deepEqual(posts,[]);assert.deepEqual(errors,[]);await ctx.close();
 }
 const p=await browser.newPage({viewport:{width:375,height:900},reducedMotion:'reduce'});await p.goto(url);assert.equal(await p.evaluate(()=>document.documentElement.classList.contains('scene-motion')),false);assert.equal(await p.locator('.hero-bg-video source').getAttribute('src'),null);await p.close();
 const c=await browser.newPage();await c.goto(base+'catalog/#templates');await c.waitForSelector('[data-template-use="ATZ-WEB-004"]');await c.locator('[data-template-use="ATZ-WEB-004"]').click();await c.locator('#template-name').fill('Construction test');await c.locator('#template-project-form button[type=submit]').click();assert.match(await c.locator('#board-items').textContent(),/ATZ-WEB-004/);await c.close();
 fs.writeFileSync(root+'/qa.json',JSON.stringify(report,null,2));fs.writeFileSync(root+'/motion-qa.json',JSON.stringify(motion,null,2));console.log('PASS '+report.length+' route/viewport checks and '+motion.length+' original motion comparisons.');
 }finally{if(browser)await browser.close();server.kill();os.kill()}
})();

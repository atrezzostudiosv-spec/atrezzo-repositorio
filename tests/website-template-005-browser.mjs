await (async function qa(){
 const fs=await import('node:fs'),{default:assert}=await import('node:assert/strict'),{spawn}=await import('node:child_process'),{chromium}=await import('playwright'),{createHash}=await import('node:crypto');
 const root='websites/templates/ATZ-WEB-005/v1',src=process.argv[2],site=root+'/site',base='http://127.0.0.1:8805/',url=base+site+'/',orig='http://127.0.0.1:8815/',server=spawn('python3',['-m','http.server','8805','--bind','127.0.0.1'],{stdio:'ignore'}),os=spawn('python3',['-m','http.server','8815','--bind','127.0.0.1','--directory',src],{stdio:'ignore'});
 const t=JSON.parse(fs.readFileSync('registry/websites.json')).entries.find(x=>x.id==='ATZ-WEB-005'),hash=p=>createHash('sha256').update(fs.readFileSync(p)).digest('hex');
 for(const n of ['styles.css','inner.css','refinements.css','app.js','inner.js'])assert.equal(hash(src+'/assets/'+n),hash(site+'/assets/'+n),n);
 for(const n of fs.readdirSync(src+'/assets/images'))if(/\.(webp|png)$/.test(n))assert.notEqual(hash(src+'/assets/images/'+n),hash(site+'/assets/images/'+n),n+' client image leaked');
 const old=fs.readFileSync(src+'/assets/refinements.js','utf8'),copy=fs.readFileSync(site+'/assets/refinements.js','utf8');assert(copy.includes(old.slice(old.indexOf("document.querySelectorAll('form.quote-form')"))));
 let browser;const report=[],motion=[];
 try{await new Promise(r=>setTimeout(r,700));browser=await chromium.launch();
 for(const width of [375,768,1024,1440]){
  const ctx=await browser.newContext({viewport:{width,height:900},reducedMotion:'no-preference'});
  for(const file of t.pages){const p=await ctx.newPage(),o=await ctx.newPage(),errors=[],posts=[];p.on('pageerror',e=>errors.push(e.message));p.on('request',r=>{if(r.method()!=='GET')posts.push(r.url())});
   await p.goto(url+file,{waitUntil:'domcontentloaded'});await o.goto(orig+file,{waitUntil:'domcontentloaded'});
   assert(await p.locator('h1').isVisible(),file);assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+3),file+' overflow '+width);
   const sels=['.reveal','[data-zoom]','.project[data-category]','.project-open','picture','[data-filter]'];const count=page=>page.evaluate(s=>s.map(x=>document.querySelectorAll(x).length),sels);assert.deepEqual(await count(p),await count(o),file+' source targets');
   if(file==='index.html'){
    const n=await p.locator('[data-zoom]').count();assert(n>0);for(let i=0;i<n;i++){const state=async page=>{const el=page.locator('[data-zoom]').nth(i);await el.evaluate(e=>scrollTo({top:scrollY+e.getBoundingClientRect().top+e.offsetHeight*.5-innerHeight*.5,behavior:'instant'}));await page.waitForFunction(i=>!!document.querySelectorAll('[data-zoom]')[i].style.getPropertyValue('--photo-scale'),i);await page.waitForTimeout(100);return Number(await el.evaluate(e=>e.style.getPropertyValue('--photo-scale')))};const a=await state(o),b=await state(p);assert(a>1&&b>1&&Math.abs(a-b)<.015);motion.push({width,index:i,source:a,template:b});}
    await p.evaluate(()=>scrollTo({top:0,behavior:'instant'}));
    if(width===1440){await p.waitForTimeout(300);const png=await p.screenshot();const data=await p.evaluate(async b=>{const im=new Image();im.src='data:image/png;base64,'+b;await im.decode();const c=document.createElement('canvas');c.width=im.width;c.height=im.height;c.getContext('2d').drawImage(im,0,0);return c.toDataURL('image/webp',.86).split(',')[1]},png.toString('base64'));fs.writeFileSync(root+'/poster.webp',Buffer.from(data,'base64'))}
    if(width<1024){await p.locator('.menu-toggle').click();assert(await p.locator('.mobile-nav').isVisible());await p.keyboard.press('Escape');assert(await p.locator('.mobile-nav').isHidden())}
   }
   if(file==='gallery/index.html'){assert.equal(await p.locator('.project[data-category]').count(),44);await p.locator('[data-filter=wood]').click();assert.equal(await p.locator('.project:not([hidden])').count(),10);await p.locator('.project:not([hidden]) .project-open').first().click();assert(await p.locator('.gallery-dialog').isVisible());await p.keyboard.press('Escape');assert(await p.locator('.gallery-dialog').isHidden());await p.locator('[data-filter=all]').click();assert.equal(await p.locator('.project:not([hidden])').count(),44);}
   const testForm=async form=>{await form.locator('[name=name]').fill('Demo Test');await form.locator('[name=email]').fill('demo@example.invalid');await form.locator('[name=service]').selectOption({index:1});await form.locator('[name=message]').fill('Illustrative fence inquiry for local validation.');await form.locator('[name=preview_consent]').check();await form.locator('button[type=submit]').click();assert.match(await form.locator('.quote-status').textContent(),/No information was sent or stored/);};
   if(file==='contact/index.html')await testForm(p.locator('form.quote-form').first());
   if(file==='index.html'||file==='services/wood-privacy-fences/index.html'){await p.locator('.header-cta').click();const modal=p.locator('.quote-modal');assert(await modal.isVisible());if(file.includes('wood-privacy'))assert.equal(await modal.locator('[name=service]').inputValue(),'wood-privacy-fences');await testForm(modal.locator('form'));await p.keyboard.press('Escape');assert(await modal.isHidden());}
   assert.deepEqual(posts,[]);assert.deepEqual(errors,[],file+' '+width);report.push({file,width,pass:true});await p.close();await o.close();
  }await ctx.close();
 }
 const p=await browser.newPage({viewport:{width:375,height:900},reducedMotion:'reduce'});await p.goto(url);assert.equal(await p.evaluate(()=>document.documentElement.classList.contains('enhanced')),false);assert.equal(await p.locator('[data-zoom]').first().evaluate(e=>e.style.getPropertyValue('--photo-scale')),'');await p.close();
 const c=await browser.newPage();await c.goto(base+'catalog/#templates');await c.waitForSelector('[data-template-use="ATZ-WEB-005"]');await c.locator('[data-template-use="ATZ-WEB-005"]').click();await c.locator('#template-name').fill('Fence test');await c.locator('#template-project-form button[type=submit]').click();assert.match(await c.locator('#board-items').textContent(),/ATZ-WEB-005/);await c.close();
 fs.writeFileSync(root+'/qa.json',JSON.stringify(report,null,2));fs.writeFileSync(root+'/motion-qa.json',JSON.stringify(motion,null,2));console.log('PASS '+report.length+' page checks and '+motion.length+' motion comparisons, quote/gallery, exact CSS/engines and no client media.');
 }finally{if(browser)await browser.close();server.kill();os.kill()}
})();

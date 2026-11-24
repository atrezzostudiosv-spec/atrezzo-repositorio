await (async function build(){
 const fs=await import('node:fs'),path=await import('node:path'),{execFileSync}=await import('node:child_process'),{default:assert}=await import('node:assert/strict'),{chromium}=await import('playwright');
 const src=process.argv[2],root='websites/templates/ATZ-WEB-005/v1',site=root+'/site';
 assert.equal(execFileSync('git',['-C',src,'rev-parse','HEAD'],{encoding:'utf8'}).trim(),'00852d226ef7b9e96c7b13a2ebd7bf1d4cbf8b45');
 fs.rmSync(site,{recursive:true,force:true});fs.mkdirSync(site,{recursive:true});
 const read=p=>fs.readFileSync(src+'/'+p,'utf8'),write=(p,v)=>{fs.mkdirSync(path.dirname(site+'/'+p),{recursive:true});fs.writeFileSync(site+'/'+p,v)};
 const reg=JSON.parse(fs.readFileSync('registry/websites.json')),entry=reg.entries.find(x=>x.id==='ATZ-WEB-005');
 const guard=`<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'none'; form-action 'none'; object-src 'none'; frame-src 'none'">`;
 const neutral=s=>s.replace(/Denton Fence(?:, LLC)?(?:['’]s)?/gi,m=>/['’]s$/i.test(m)?'Fence Studio’s':m===m.toUpperCase()?'FENCE STUDIO':'Fence Studio')
 .replace(/Cliff Davis/gi,'[Owner]').replace(/more than 35 years of (?:personal )?experience/gi,'experience pending verification').replace(/35\+\s*years/gi,'verified experience pending').replace(/>35<span>\+<\/span>/g,'>—<span></span>')
 .replace(/107 North Bell Avenue, Suite 6/gi,'[Office address]').replace(/Denton,\s*TX\s*76201-4729/gi,'[Service area]')
 .replace(/(?:\+?1)?9403913338|940[- ]391[- ]3338/gi,'[Phone]').replace(/\(940\) 000-0000/g,'Phone number')
 .replace(/Denton,\s*(?:Texas|TX)|Denton area|Denton community|Denton and the surrounding area|Denton and surrounding communities|Denton and nearby communities/gi,'[Service area]').replace(/\bDenton\b/g,'Service area')
 .replace(/My message goes to Atrezzo Studios for testing, not directly to Fence Studio\./gi,'No information is sent or stored.')
 .replace(/Demo messages are routed to Atrezzo Studios for testing[^<]*\./gi,'Demo only: no messages are sent. Use fictional test data.')
 .replace(/<blockquote\b([^>]*)>[\s\S]*?<\/blockquote>/gi,'<blockquote$1>Verified customer feedback goes here. This is not an actual review.</blockquote>')
 .replace(/—\s*L\. Thomas[^<]*/gi,'Verified attribution pending')
 .replace(/Real fence examples from[^<]*/gi,'Illustrative fence diagrams, not actual completed projects.')
 .replace(/A selection of completed fences from[^<]*/gi,'A selection of illustrative fence diagrams organized by material. These are not completed projects.')
 .replace(/has advertised fencing promotions in the past\.[^<]*/gi,'has no configured promotions. Verify any future offers and conditions before publication.')
 .replace(/ATREZZO STUDIOS \/ DESIGN PREVIEW · NOT FOR PUBLICATION/g,'ATREZZO TEMPLATE · EXAMPLE IMAGERY AND CONTENT · NO LIVE ENQUIRIES');
 for(const p of entry.pages){
  let h=read(p),rel=path.posix.relative(path.posix.dirname(p),'contact/')||'.';
  h=h.replace(/href="tel:\+19403913338"/g,'href="'+rel+'/#quote-form"').replace(/action="https:\/\/formsubmit\.co\/[^"]+"/g,'action="#quote-form"');
  h=neutral(h).replace('<head>','<head>'+guard);
  h=h.replace(/(<p class="quote-preview-notice">)[\s\S]*?(<\/p>)/gi,'$1Demonstration only. No quote is issued and no message is sent.$2');
  h=h.replace(/(<img\b[^>]*\balt=")[^"]*("[^>]*>)/gi,(_m,a,b)=>a+'Illustrative template image — replace with authorized photography'+b);
  h=h.replace(/data-caption="([^"]+)"/g,'data-caption="Illustrative diagram — $1"').replace(/Showing all 44 project photographs/g,'Showing all 44 illustrative images');
  write(p,h);
 }
 for(const n of ['styles.css','inner.css','refinements.css','app.js','inner.js'])write('assets/'+n,fs.readFileSync(src+'/assets/'+n));
 let js=read('assets/refinements.js').replace(/const DESTINATION=[^\n]+\nconst AJAX=[^\n]+\n/,'');
 const a=js.indexOf(' form.addEventListener(\'submit\',async function(event){'),b=js.indexOf('\nfunction buildModal()',a);assert(a>=0&&b>a);
 js=js.slice(0,a)+` form.addEventListener('submit',event=>{
  event.preventDefault();if(!form.reportValidity())return;
  form.reset();const status=form.querySelector('.quote-status');status.dataset.state='ok';status.textContent='Demo validation complete. No information was sent or stored.';
 });
}\n`+js.slice(b);
 js=js.replace(`action="https://formsubmit.co/'+DESTINATION+'"`,`action="#quote-form"`).replace(/href="tel:\+19403913338"/g,'href="#quote-form"');
 js=neutral(js).replace(/<p class="quote-preview-notice">[\s\S]*?<\/p>/,'<p class="quote-preview-notice">Demonstration only. No quote is issued and no message is sent.</p>').replace(/Send test enquiry/g,'Check enquiry');
 write('assets/refinements.js',js);
 // Make neutral schematic fence artwork at precisely the original dimensions, without drawing any source pixels.
 const browser=await chromium.launch();try{const page=await browser.newPage();for(const [i,n] of fs.readdirSync(src+'/assets/images').entries()){
  if(!/\.(webp|png)$/i.test(n))continue;
  const ext=n.endsWith('.png')?'png':'webp',bytes=fs.readFileSync(src+'/assets/images/'+n).toString('base64');
  const result=await page.evaluate(async({bytes,ext,n,i})=>{const old=new Image();old.src='data:image/'+ext+';base64,'+bytes;await old.decode();const c=document.createElement('canvas');c.width=old.naturalWidth;c.height=old.naturalHeight;const g=c.getContext('2d'),w=c.width,h=c.height;
   if(n.includes('logo')){g.fillStyle='#fff';g.fillRect(0,0,w,h);g.textAlign='center';g.textBaseline='middle';g.fillStyle='#12382a';g.font='bold '+Math.round(w/8)+'px Georgia';g.fillText('FENCE STUDIO',w/2,h*.44,w*.93);g.font=Math.round(w/18)+'px Arial';g.fillText('ATREZZO TEMPLATE',w/2,h*.73);return c.toDataURL('image/png').split(',')[1]}
   const colors=['#9d7651','#a78662','#c9bba0','#7b8c80','#b1aa91'],sky=g.createLinearGradient(0,0,0,h);sky.addColorStop(0,'#d4dfda');sky.addColorStop(.65,'#9bad9b');sky.addColorStop(1,'#60745f');g.fillStyle=sky;g.fillRect(0,0,w,h);g.fillStyle='#789077';g.fillRect(0,h*.74,w,h*.26);
   const top=h*(.27+(i%4)*.035),bottom=h*.78,step=w/(14+i%6),iron=/iron|chain/.test(n),ranch=/ranch/.test(n),vinyl=/vinyl/.test(n);g.fillStyle=vinyl?'#e9e3d5':iron?'#35413e':colors[i%colors.length];
   if(iron||ranch){for(let x=-step;x<w+step;x+=step*(ranch?3:1))g.fillRect(x,top,step*(ranch?.25:.12),bottom-top);for(const yy of [.13,.57,.88])g.fillRect(0,top+(bottom-top)*yy,w,step*(ranch?.27:.10));if(/chain/.test(n)){g.strokeStyle='#4f615a';g.lineWidth=Math.max(2,w/650);for(let x=-w;x<w*2;x+=step*.7){g.beginPath();g.moveTo(x,top);g.lineTo(x+(bottom-top),bottom);g.stroke();g.beginPath();g.moveTo(x,bottom);g.lineTo(x+(bottom-top),top);g.stroke()}}}
   else{for(let x=-step;x<w+step;x+=step){g.fillStyle=vinyl?'#e9e3d5':colors[(i+Math.floor(x/step)+40)%colors.length];g.fillRect(x,top,step*.95,bottom-top);g.fillStyle='#00000022';g.fillRect(x,top,step*.045,bottom-top)}}
   g.fillStyle='#172d25c9';g.fillRect(0,h*.9,w,h*.1);g.fillStyle='#fff';g.font='600 '+Math.max(12,Math.round(w/52))+'px Arial';g.textAlign='center';g.textBaseline='middle';g.fillText('ILLUSTRATIVE FENCE DIAGRAM · NOT PROJECT PHOTOGRAPHY',w/2,h*.95,w*.94);
   return c.toDataURL('image/webp',.88).split(',')[1]},{bytes,ext,n,i});
  write('assets/images/'+n,Buffer.from(result,'base64'));
 }}finally{await browser.close()}
 write('robots.txt','User-agent: *\nDisallow: /\n');
 for(const p of entry.pages){const h=fs.readFileSync(site+'/'+p,'utf8');assert(!/formsubmit\.co|atrezzostudiosv@gmail|9403913338|940-391-3338|Cliff Davis|107 North Bell/i.test(h),p);assert(h.includes("connect-src 'none'"))}
 assert(!/\bfetch\s*\(|formsubmit\.co|DESTINATION/.test(js));
 entry.status='validated_template';fs.writeFileSync('registry/websites.json',JSON.stringify(reg,null,2)+'\n');console.log('Built 15 routes with new schematic media, original CSS and motion, and local quote forms.');
})();

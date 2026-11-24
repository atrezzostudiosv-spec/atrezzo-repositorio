await (async function build(){
 const fs=await import('node:fs'),path=await import('node:path'),{execFileSync}=await import('node:child_process'),{default:assert}=await import('node:assert/strict'),{chromium}=await import('playwright');
 const src=process.argv[2],root='websites/templates/ATZ-WEB-006/v1',site=root+'/site';
 assert.equal(execFileSync('git',['-C',src,'rev-parse','HEAD'],{encoding:'utf8'}).trim(),'09bfb01c1e21c058bf1faf0f02e836ffb3c67889');
 fs.rmSync(site,{recursive:true,force:true});fs.mkdirSync(site,{recursive:true});
 const read=p=>fs.readFileSync(src+'/'+p,'utf8'),write=(p,v)=>{fs.mkdirSync(path.dirname(site+'/'+p),{recursive:true});fs.writeFileSync(site+'/'+p,v)};
 const walk=d=>fs.readdirSync(d,{withFileTypes:true}).flatMap(f=>f.isDirectory()?walk(d+'/'+f.name):[d+'/'+f.name]);
 const reg=JSON.parse(fs.readFileSync('registry/websites.json')),entry=reg.entries.find(x=>x.id==='ATZ-WEB-006');
 const guard=`<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:; media-src 'self'; connect-src 'self'; form-action 'none'; object-src 'none'; frame-src 'self'">`;
 const neutral=s=>s.replace(/Elegant Massage(?:['’]s)?/gi,m=>/['’]s$/i.test(m)?'Wellness Studio’s':m===m.toUpperCase()?'WELLNESS STUDIO':'Wellness Studio')
 .replace(/(?:\+?1[-. ]?)?\(?214\)?[-. ]*513[-. ]*(?:2288|1155)/g,'[Phone]')
 .replace(/Relax@Elegant-Massage\.com/gi,'[Email]')
 .replace(/2911 Cross Timbers (?:Road|Rd\.?)(?:\s*[,·]?\s*Suite 105)?/gi,'[Studio address]')
 .replace(/\bFlower Mound(?:\s*[,·]\s*(?:Texas|TX)(?:\s*75028)?)?/gi,'[Location]')
 .replace(/\b75028\b/g,'').replace(/\bSuite 105\b/gi,'[Suite]')
 .replace(/The studio's original story mentions techniques learned and practiced in China\./g,'Add verified studio history and practitioner background here.')
 .replace(/Original photographs of[^<"]*/gi,'Illustrative studio imagery. Replace with authorized location photos.')
 .replace(/Original location photography\./gi,'Illustrative location imagery.')
 .replace(/These images document[^<"]*/gi,'Illustrative images, not photographs of actual premises.')
 .replace(/Explore real photographs of[^<"]*/gi,'Explore example image slots for the entrance, reception and treatment rooms.')
 .replace(/THE REAL WELLNESS STUDIO/gi,'ILLUSTRATIVE WELLNESS STUDIO')
 .replace(/\bSetmore\b/g,'the booking provider (not connected)')
 .replace(/\bOriginal Facebook page\b/g,'Social link pending')
 .replace(/<p\b([^>]*class="[^"]*(?:hours|opening-hours)[^"]*"[^>]*)>[\s\S]*?<\/p>/gi,'<p$1>Opening hours pending confirmation.</p>');
 const isPrivate=n=>/flower-mound-(?:building|double|massage|private|reception|storefront|treatment|waiting|exterior)/i.test(n);
 const privateImages=[];
 for(const f of [...walk(src+'/assets'),...walk(src+'/preview-home/assets')]){
  const n=f.slice(src.length+1);
  if(n.endsWith('.md'))continue;
  if(isPrivate(n)&&/\.(webp|png|jpg)$/i.test(n)){privateImages.push(n);continue;}
  if(n==='assets/brand/elegant-massage-social-share.png'||n==='assets/brand/elegant-massage-favicon.svg')continue;
  if(n==='assets/js/unified-glass-nav-2026.js'){
   let s=read(n).replace("const booking='https://elegantmassage.setmore.com/#services';","const booking=new URL('../../contact/',document.currentScript.src).href;").replace('href="tel:+12145132288"','href="\'+booking+\'"').replace('ELEGANT MASSAGE</span>','WELLNESS STUDIO</span>').replace('>Call Us</a>','>Contact</a>').replace('>Book Now</a>','>Booking Demo</a>');
   write(n,s);continue;
  }
  if(n==='assets/js/elegant-gallery-contact-sheet-2026.js'){write(n,read(n).replace('Photograph of Elegant Massage','Illustrative studio image').replace('Inside Elegant Massage','Studio image slot').replace('Photograph of the Elegant Massage location in Flower Mound.','Illustrative image; actual location not configured.'));continue;}
  write(n,fs.readFileSync(f));
 }
 const browser=await chromium.launch();try{
  const page=await browser.newPage(),examples=['assets/images/elegant-massage-relaxation-atmosphere-cinematic.webp','preview-home/assets/images/elegant-massage-spa-stilllife-blossoms-stones-candle.webp','preview-home/assets/images/home-2026/home-grid-03-treatment-room-preparation.webp','assets/images/elegant-massage-cinematic-hero-atrezzo.webp'];
  for(const [i,n] of privateImages.entries()){
   const bytes=fs.readFileSync(src+'/'+n).toString('base64'),art=fs.readFileSync(src+'/'+examples[i%examples.length]).toString('base64');
   const b=await page.evaluate(async({bytes,art})=>{const old=new Image(),im=new Image();old.src='data:image/webp;base64,'+bytes;im.src='data:image/webp;base64,'+art;await Promise.all([old.decode(),im.decode()]);const c=document.createElement('canvas');c.width=old.naturalWidth;c.height=old.naturalHeight;const g=c.getContext('2d'),scale=Math.max(c.width/im.width,c.height/im.height);g.drawImage(im,(c.width-im.width*scale)/2,(c.height-im.height*scale)/2,im.width*scale,im.height*scale);return c.toDataURL('image/webp',.88).split(',')[1]},{bytes,art});
   write(n,Buffer.from(b,'base64'));
  }
 }finally{await browser.close()}
 write('assets/brand/elegant-massage-favicon.svg','<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="9" fill="#254460"/><path d="M13 18 22 46 32 25 42 46 51 18" fill="none" stroke="#faf2df" stroke-width="4"/></svg>');
 write('assets/map-placeholder.html','<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><style>body{margin:0;min-height:100vh;display:grid;place-items:center;background:#e8e4dc;color:#254460;font:14px system-ui;text-align:center}p{padding:20px}strong{font-size:18px}</style></head><body><p><strong>Location map</strong><br>Configure the authorized studio address before launch.</p></body></html>');
 for(const p of entry.pages){
  let h=read(p),relative=path.posix.relative(path.posix.dirname(p),'contact/index.html'),map=path.posix.relative(path.posix.dirname(p),'assets/map-placeholder.html');
  h=h.replace(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/gi,'').replace(/<link\b[^>]*rel=["']canonical["'][^>]*>/gi,'').replace(/<meta\b[^>]*(?:property|name)=["'](?:og:url|og:image[^"']*|twitter:image[^"']*)["'][^>]*>/gi,'');
  h=h.replace(/href=(["'])(?:https?:\/\/(?:elegantmassage\.setmore\.com|www\.google\.com\/maps|www\.facebook\.com)[^"']*|tel:[^"']*|mailto:[^"']*)\1/gi,'href="'+relative+'"').replace(/<iframe\b([^>]*?)src="https:\/\/www\.google\.com\/maps[^"]*"([^>]*?)>/gi,'<iframe$1src="'+map+'"$2>');
  // Preserve all asset paths; only edit visible identity, not file names or selectors.
  h=neutral(h).replace(/data-description="[^"]*"/g,'data-description="Illustrative studio image — replace with authorized photography."').replace(/data-alt="[^"]*"/g,'data-alt="Illustrative studio image"');
  h=h.replace(/(<img\b[^>]*\bsrc="[^"]*flower-mound-[^"]*"[^>]*\balt=")[^"]*(")/gi,'$1Illustrative studio image$2');
  h=h.replace(/<head>/i,'<head>'+guard).replace(/(<footer\b[^>]*>)/i,'$1<p style="text-align:center;padding:8px 16px;font:12px system-ui">ATREZZO TEMPLATE · Illustrative media and services · No actual booking or location</p>');
  h=h.replace(/target="_blank"/g,'').replace(/<p\b([^>]*)>([^<]*(?:open daily|Monday|Sunday|[0-9]+:[0-9]+ [AP]M)[^<]*)<\/p>/gi,'<p$1>Hours pending verification.</p>');
  h=h.replace(/(?:\$\d+(?:\.\d{2})?)/g,'Price pending');
  write(p,h);
  assert(!/elegantmassage\.setmore\.com|Relax@Elegant-Massage\.com|2145132288|2911 Cross Timbers|www\.google\.com\/maps|www\.facebook\.com\/Elegant/i.test(h),p+' external identity');
 }
 write('robots.txt','User-agent: *\nDisallow: /\n');
 entry.status='validated_template';fs.writeFileSync('registry/websites.json',JSON.stringify(reg,null,2)+'\n');console.log('Built 13 routes; '+privateImages.length+' location images replaced. Original cinematic media and motion retained.');
})();

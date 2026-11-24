import fs from 'node:fs';import path from 'node:path';import assert from 'node:assert/strict';import {execFileSync} from 'node:child_process';import {chromium} from 'playwright';
const root='websites/templates/ATZ-WEB-001/v1',src=process.argv[2],site=root+'/site';assert(src,'source checkout required');
const revision=execFileSync('git',['-C',src,'rev-parse','HEAD'],{encoding:'utf8'}).trim();assert.equal(revision,'95a7b80579e4354eba98c2762c13ad1f444f9b83');
const read=p=>fs.readFileSync(path.join(src,p),'utf8'),write=(p,v)=>{fs.mkdirSync(path.dirname(site+'/'+p),{recursive:true});fs.writeFileSync(site+'/'+p,v)};
const entry=JSON.parse(fs.readFileSync('registry/websites.json')).entries[0];fs.rmSync(site,{recursive:true,force:true});
const guard='<meta http-equiv="Content-Security-Policy" content="default-src \'self\'; script-src \'self\' \'unsafe-inline\'; style-src \'self\' \'unsafe-inline\' https://fonts.googleapis.com https://cdnjs.cloudflare.com; font-src \'self\' https://fonts.gstatic.com https://cdnjs.cloudflare.com; img-src \'self\' data:; connect-src \'none\'; form-action \'none\'; object-src \'none\'; base-uri \'none\'">';
const banner='<div role="note" style="background:#102a43;color:white;text-align:center;padding:7px 12px;font:600 12px/1.4 system-ui;position:relative;z-index:99">ATREZZO WEBSITE TEMPLATE · Illustrative content and images · No real business or data delivery</div>';
function neutral(s){
 return s.replace(/Pronto Air(?:’s|'s)?/gi,m=>/['’]s$/i.test(m)?"Service Company's":"Service Company")
 .replace(/prontoairdenton@hotmail\.com|atrezzostudiosv@gmail\.com/gi,'contact@example.invalid')
 .replace(/\(940\)\s*312[- ]3081|(?:\+?1)?9403123081|940[-.]312[-.]3081/gi,'[Phone]')
 .replace(/TACLB28582E/gi,'[License pending]')
 .replace(/Denton County HQ|Denton County/gi,'Service Region')
 .replace(/Denton(?:,\s*(?:TX|Texas))?/gi,'Service City')
 .replace(/Lewisville|Flower Mound|Gainesville|Grapevine/gi,m=>({'lewisville':'Area A','flower mound':'Area B','gainesville':'Area C','grapevine':'Area D'})[m.toLowerCase()])
 .replace(/\bTexas\b|\bTX\b/g,'Service Region')
 .replace(/Family-Owned\. Over 20 Years of Experience\./gi,'About the Company')
 .replace(/20\+ Years of Experience|over 20 years(?: of experience)?|more than 20 years(?: of experience)?|20 years(?: of experience)?/gi,'[Experience pending]')
 .replace(/TACLB[0-9A-Z]+/gi,'[License pending]')
 .replace(/licensed HVAC contractors/gi,'HVAC service providers').replace(/trained &amp; certified technicians|trained and certified technicians|certified and trained technicians|licensed and insured/gi,'[Qualifications pending]')
 .replace(/Two Tune-Ups Per Year|two tune-ups per year|two tune-ups annually/gi,'[Maintenance terms pending]')
 .replace(/8:00\s*AM\s*[-–]\s*6:00\s*PM|8\s*AM\s*[-–]\s*6\s*PM|8:00\s*a\.m\.\s*(?:to|[-–])\s*6:00\s*p\.m\./gi,'[Hours pending]')
 .replace(/by appointment only/gi,'[Schedule pending]')
 .replace(/https:\/\/atrezzostudiosv-spec\.github\.io\/pronto-air\//g,'')
 .replace(/https:\/\/images\.unsplash\.com\/[^"'\s)<>]+/g,'images/home-hero-desktop.webp')
 .replace(/https:\/\/formsubmit\.co\/[^"'\s<>)]*/g,'#demo-form')
 .replace(/https:\/\/pronto-air-assistant\.atrezzostudiosv\.workers\.dev\/chat/g,'')
 .replace(/href=(["'])(?:tel|mailto):[^"']*\1/gi,'href="contact-us.html"')
 .replace(/\bAri\b/g,'Guide');
}
for(const p of entry.pages){
 let s=read(p);
 s=s.replace(/<script\b[^>]*data-ai-endpoint[^>]*>/gi,'<script src="assets/js/pronto-assistant.js">');
 s=s.replace(/<form\b[^>]*>/gi,tag=>tag.replace(/\saction=(["'])[^"']*\1/i,'').replace(/\smethod=(["'])[^"']*\1/i,'')+''); 
 s=s.replace(/<meta\b[^>]*(?:property|name)=["'](?:og:url|og:image|twitter:image)["'][^>]*>/gi,'').replace(/<link\b[^>]*rel=["']canonical["'][^>]*>/gi,'').replace(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/gi,'');
 if(p==='privacy-policy.html'){s=s.replace(/(<article\b[^>]*>)[\s\S]*?(<\/article>)/i,'$1<h2>Privacy policy — not configured</h2><p>This template is a demonstration. Contact and assistant forms do not transmit or retain information. Do not enter personal data. A business-specific privacy policy, consent and processor disclosures must be approved before activation.</p>$2')}
 s=neutral(s).replace(/<head>/i,'<head>'+guard).replace(/(<body\b[^>]*>)/i,'$1'+banner);
 s=s.replace(/<form\b([^>]*)>/gi,'<form$1 action="#demo-form" method="post">');
 s=s.replace(/Your information is processed to handle your request\./gi,'Demonstration only. No information is sent.');
 s=s.replace(/Your information will be[^<.]*\./gi,'Demonstration only. No information is sent.');
 write(p,s);
}
for(const n of fs.readdirSync(src+'/assets/css'))if(n.endsWith('.css'))write('assets/css/'+n,neutral(read('assets/css/'+n)));
write('assets/js/pronto-form-inline.js', 'window.prontoSubmitInline=async function(form,status){if(!form||!status)return;status.classList.remove("hidden");status.classList.add("block");status.setAttribute("role","status");status.textContent="Demo validation complete. No information was sent or stored.";form.reset();};\n');
let a=read('assets/js/pronto-assistant.js');
function section(start,end,replacement){const x=a.indexOf(start),y=a.indexOf(end,x+start.length);assert(x>=0&&y>x,start);a=a.slice(0,x)+replacement+'\n'+a.slice(y)}
section("const site=","const topics=","const site='Service Company',phone='Contact demo',phoneHref='contact-us.html';const endpoint='';");
section("function availability(){","const root=document.createElement", "function availability(){return {afterHours:false,note:'Demo only — business hours not configured.'};}\nfunction localResponse(input,history){const lang=detectLanguage(input,history.filter(x=>x.role==='user').slice(-1)[0]?.lang||'en'),es=lang==='es';if(safety.test(input))return {reply:es?'Si hay peligro inmediato, aléjate y contacta los servicios de emergencia o la compañía de gas.':'If there is immediate danger, leave the area and contact emergency services or the gas utility.',topic:null,offerContact:false,lang};const match=list.find(x=>x[1].test(input));return {reply:es?'Esta es una demostración local. Los servicios y datos del negocio están pendientes de configurar. No se envían solicitudes ni se reservan citas.':'This is a local demonstration. Business services and details are not configured. No requests are sent and no appointments are booked.',topic:match?.[0]||null,offerContact:true,lang};}");
section("directSubmit.addEventListener('click'","function open(){","directSubmit.hidden=true;");
section("async function respond(q,signal){","chatForm.addEventListener('submit'","async function respond(q,signal){return localResponse(q,history);}");
const leadStart=a.indexOf("leadForm.addEventListener('submit',async e=>{");assert(leadStart>=0);a=a.slice(0,leadStart)+"leadForm.addEventListener('submit',e=>{e.preventDefault();if(!leadForm.reportValidity())return;leadStatus.textContent='Demo validation complete. No information was sent or stored.';leadForm.reset();});\n})();\n";
a=neutral(a).replace(/I agree to send my information through FormSubmit to the temporary Atrezzo project inbox for follow-up\./g,'I understand that this is a demonstration and nothing will be sent.').replace(/Hi, I’m Guide,[^<]+/g,'Hi, I’m Guide. This is a local demonstration of the website assistant.').replace(/Chat with Guide/g,'Chat demo').replace(/Call now/g,'Contact demo').replace(/Send Request/g,'Test Request').replace(/Submit directly with FormSubmit/g,'Unavailable in demo');
write('assets/js/pronto-assistant.js',a);
// All source bitmap slots are replaced with local illustrative art; preserve their original dimensions and paths.
const browser=await chromium.launch();try{const page=await browser.newPage();const art=[1,2,3].map(n=>fs.readFileSync('components/servicios/illustration-0'+n+'.svg','utf8'));for(const [i,n] of fs.readdirSync(src+'/images').filter(n=>/\.(png|webp|jpg|jpeg)$/i.test(n)).entries()){const data=fs.readFileSync(src+'/images/'+n).toString('base64'),ext=n.split('.').at(-1),logo=n.includes('logo');const result=await page.evaluate(async ({data,ext,logo,svg,n})=>{const im=new Image();im.src='data:image/'+ext+';base64,'+data;await im.decode();const c=document.createElement('canvas');c.width=im.naturalWidth;c.height=im.naturalHeight;const g=c.getContext('2d');if(logo){g.fillStyle=n.includes('white')?'#ffffff':'#0B2545';g.font='bold '+Math.floor(c.height*.34)+'px sans-serif';g.textAlign='center';g.textBaseline='middle';g.fillText('SERVICE',c.width/2,c.height*.42,c.width*.94);g.font='bold '+Math.floor(c.height*.19)+'px sans-serif';g.fillText('COMPANY',c.width/2,c.height*.70,c.width*.9)}else{const x=new Image();x.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg);await x.decode();const scale=Math.max(c.width/x.naturalWidth,c.height/x.naturalHeight);g.fillStyle='#203745';g.fillRect(0,0,c.width,c.height);g.drawImage(x,(c.width-x.naturalWidth*scale)/2,(c.height-x.naturalHeight*scale)/2,x.naturalWidth*scale,x.naturalHeight*scale)}return c.toDataURL(ext==='png'?'image/png':ext==='webp'?'image/webp':'image/jpeg',.85).split(',')[1]},{data,ext,logo,svg:art[i%art.length],n});write('images/'+n,Buffer.from(result,'base64'))}}finally{await browser.close()}
write('robots.txt','User-agent: *\nDisallow: /\n');
for(const p of entry.pages){const s=fs.readFileSync(site+'/'+p,'utf8');assert(!/formsubmit\.co|workers\.dev\/chat|prontoairdenton@hotmail|atrezzostudiosv@gmail|9403123081|TACLB28582E/i.test(s),p+' retained endpoint/contact');assert(s.includes("form-action 'none'")&&s.includes("connect-src 'none'"))}
console.log('Built 8 source-derived pages, neutral media, local forms and assistant, no external send.');

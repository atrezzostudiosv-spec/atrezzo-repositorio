import fs from 'node:fs';import path from 'node:path';import assert from 'node:assert/strict';import {execFileSync} from 'node:child_process';import {chromium} from 'playwright';
const root='websites/templates/ATZ-WEB-002/v1',src=process.argv[2],site=root+'/site';assert(src);
assert.equal(execFileSync('git',['-C',src,'rev-parse','HEAD'],{encoding:'utf8'}).trim(),'a36c0019f9fb653bd970f2c6ab5777fda37a1ba2');
const read=p=>fs.readFileSync(path.join(src,p),'utf8'),write=(p,v)=>{fs.mkdirSync(path.dirname(site+'/'+p),{recursive:true});fs.writeFileSync(site+'/'+p,v)};
const entry=JSON.parse(fs.readFileSync('registry/websites.json')).entries.find(t=>t.id==='ATZ-WEB-002');fs.rmSync(site,{recursive:true,force:true});
const guard='<meta http-equiv="Content-Security-Policy" content="default-src \'self\'; script-src \'self\' \'unsafe-inline\'; style-src \'self\' \'unsafe-inline\' https://fonts.googleapis.com https://cdnjs.cloudflare.com; font-src \'self\' https://fonts.gstatic.com https://cdnjs.cloudflare.com; img-src \'self\' data:; connect-src \'none\'; form-action \'none\'; object-src \'none\'; base-uri \'none\'">';
const banner='<div role="note" style="background:#171B1E;color:white;text-align:center;padding:7px 12px;font:600 12px/1.4 system-ui">ATREZZO WEBSITE TEMPLATE · Illustrative content and images · No real business or data delivery</div>';
function neutral(s){return s
 .replace(/Inquiries currently go to Atrezzo Studios through FormSubmit, not directly to Tri-Lane Roofing\. Please avoid sharing sensitive personal information\./gi,'Demonstration only. Nothing is sent or stored. Use fictional test data.')
 .replace(/While this website is under review, submitted inquiries are received by Atrezzo Studios\.[^<\n]*/gi,'Demo only. Business contact details and delivery are not configured.')
 .replace(/Tri[-‑ ]Lane(?: Roofing(?: and Construction)?)?(?:['’]s)?/gi,m=>/['’]s$/i.test(m)?"Exterior Company's":"Exterior Company")
 .replace(/https:\/\/images\.unsplash\.com\/[^"'\s)<>]+/gi,'assets/images/gallery-feature-900.webp')
 .replace(/a\[href="tel:(8177173997|5127175933|4054667003)"\]/g,(_m,n)=>'a[data-demo-office="'+({'8177173997':'a','5127175933':'b','4054667003':'c'}[n])+'"]')
 .replace(/href=(["'])tel:(8177173997|5127175933|4054667003)\1/gi,(_m,_q,n)=>'href="contact.html" data-demo-office="'+({'8177173997':'a','5127175933':'b','4054667003':'c'}[n])+'"')
 .replace(/a\[href="contact\.html" data-demo-office="([abc])"\]/g,'a[data-demo-office="$1"]')
 .replace(/\((?:817|512|405)\)\s*(?:717[- ](?:3997|5933)|466[- ]7003)|8177173997|5127175933|4054667003/gi,'[Phone]')
 .replace(/\b(?:North Texas|Texas-based|Texas|Oklahoma|Austin|DFW|Frisco|McKinney|Dallas|Fort Worth)\b/gi,m=>({'dfw':'Region A','austin':'Region B','oklahoma':'Region C'}[m.toLowerCase()]||'Service Region'))
 .replace(/\bOK(?=:|\s+Office)/g,'Region C').replace(/\bTX\b/g,'Region')
 .replace(/Locally Owned &amp; Operated/gi,'Ownership details pending')
 .replace(/A locally operated business with a focus on the communities it serves across Service Region\./gi,'Company ownership and coverage to be confirmed.')
 .replace(/Industry Experience/gi,'Experience details pending')
 .replace(/—\s*(?:JESSICA M\.|MATT D\.)[\s\S]*?<\/p>/gi,'— Verified attribution pending</p>')
 .replace(/<blockquote\b([^>]*)>[\s\S]*?<\/blockquote>/gi,'<blockquote$1>Approved customer testimonial goes here. No review is claimed in this template.</blockquote>')
 .replace(/<meta name="robots" content="[^"]*"\/?>/gi,'<meta name="robots" content="noindex, nofollow"/>')
 .replace(/What customers have shared\./gi,'Customer feedback section')
 .replace(/https:\/\/trilaneroofing\.com\/[^"'\s<>)]*/gi,'contact.html');
}
for(const p of entry.pages){
 let s=neutral(read(p));
 s=s.replace(/<head>/i,'<head>'+guard).replace(/<\/footer>/i,banner+'</footer>');
 s=s.replace(/<form\b([^>]*)>/gi,'<form$1 action="#demo-form" method="post">');
 write(p,s);
}
for(const n of fs.readdirSync(src+'/assets/css'))if(n.endsWith('.css'))write('assets/css/'+n,read('assets/css/'+n));
let js=read('assets/js/site.js');
const start=js.indexOf('const TRILANE_OFFICIAL_CONTACT'),end=js.indexOf('function setTriLaneFeedback',start);assert(start>=0&&end>start);
js=js.slice(0,start)+'let triLaneFormPending = false;\n        '+js.slice(end);
const s=js.indexOf('async function sendTriLaneInquiry('),e=js.indexOf('async function handleContactSubmit(',s);assert(s>=0&&e>s);
js=js.slice(0,s)+"async function sendTriLaneInquiry(statusElement, fields, button) { setTriLaneFeedback(statusElement, 'success', 'Demo validation complete.', 'No information was sent or stored.'); }\n        "+js.slice(e);
js=neutral(js);write('assets/js/site.js',js);
const browser=await chromium.launch();try{const page=await browser.newPage();const art=[1,2,3].map(n=>fs.readFileSync('components/servicios/illustration-0'+n+'.svg','utf8'));for(const [i,n] of fs.readdirSync(src+'/assets/images').filter(n=>/\.(png|webp|jpg|jpeg)$/i.test(n)).entries()){const original=fs.readFileSync(src+'/assets/images/'+n),logo=n.includes('logo');if(!logo){write('assets/images/'+n,original);continue}const data=original.toString('base64'),ext=n.split('.').at(-1);const result=await page.evaluate(async ({data,ext,logo,svg,n})=>{const im=new Image();im.src='data:image/'+ext+';base64,'+data;await im.decode();const c=document.createElement('canvas');c.width=im.naturalWidth;c.height=im.naturalHeight;const g=c.getContext('2d');if(logo){g.fillStyle='#ffffff';g.font='bold '+Math.floor(c.height*.34)+'px sans-serif';g.textAlign='center';g.textBaseline='middle';g.fillText('EXTERIOR',c.width/2,c.height*.42,c.width*.94);g.font='bold '+Math.floor(c.height*.19)+'px sans-serif';g.fillText('SERVICES',c.width/2,c.height*.70,c.width*.9)}else{const x=new Image();x.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg);await x.decode();const scale=Math.max(c.width/x.naturalWidth,c.height/x.naturalHeight);g.fillStyle='#203745';g.fillRect(0,0,c.width,c.height);g.drawImage(x,(c.width-x.naturalWidth*scale)/2,(c.height-x.naturalHeight*scale)/2,x.naturalWidth*scale,x.naturalHeight*scale)}return c.toDataURL(ext==='png'?'image/png':ext==='webp'?'image/webp':'image/jpeg',.85).split(',')[1]},{data,ext,logo,svg:art[i%art.length],n});write('assets/images/'+n,Buffer.from(result,'base64'))}}finally{await browser.close()}

write('robots.txt','User-agent: *\nDisallow: /\n');
for(const p of [...entry.pages,'assets/js/site.js']){const s=fs.readFileSync(site+'/'+p,'utf8');assert(!/formsubmit\.co|atrezzostudiosv@gmail|8177173997|5127175933|4054667003|trilaneroofing\.com|JESSICA M\.|MATT D\./i.test(s),p+' retained contact or attribution');if(p.endsWith('.html'))assert(s.includes("form-action 'none'")&&s.includes("connect-src 'none'"))}
assert(!/\bfetch\s*\(/.test(js));
console.log('Built five original source routes, neutral illustrative media, local-only forms and four-step wizard.');

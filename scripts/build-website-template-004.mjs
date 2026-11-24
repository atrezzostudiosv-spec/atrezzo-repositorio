await (async function build(){
 const fs=await import('node:fs'),path=await import('node:path'),{execFileSync}=await import('node:child_process'),{default:assert}=await import('node:assert/strict');
 const src=process.argv[2],root='websites/templates/ATZ-WEB-004/v1',site=root+'/site';
 assert.equal(execFileSync('git',['-C',src,'rev-parse','HEAD'],{encoding:'utf8'}).trim(),'89dc53f5474a6dc95c10cc89bb5642fdd24e8495');
 fs.rmSync(site,{recursive:true,force:true});fs.mkdirSync(site,{recursive:true});fs.cpSync(src+'/assets',site+'/assets',{recursive:true});
 const read=p=>fs.readFileSync(src+'/'+p,'utf8'),write=(p,v)=>fs.writeFileSync(site+'/'+p,v);
 const neutral=s=>s.replace(/308 Construction(?:'s|’s)?/gi,m=>/['’]s$/i.test(m)?'Construction Studio’s':m===m.toUpperCase()?'CONSTRUCTION STUDIO':'Construction Studio')
 .replace(/(?:Main@308gc\.com|atrezzostudiosv@gmail\.com)/gi,'contact@example.invalid').replace(/940[- .]?387[- .]?4002/g,'[Phone]')
 .replace(/11835\s+Hilltop\s+Rd\.?/gi,'[Office address]').replace(/Argyle,\s*(?:TX\s*76226|Texas|TX)/gi,'[Service area]')
 .replace(/https:\/\/(?:www\.)?308gc\.com(?:\/[a-z-]*)?/gi,'#').replace(/308gc\.com(?:\/careers)?/gi,'company careers page')
 .replace(/UNT MATTHEWS(?:<br><span>|\s+)HALL/gi,m=>m.includes('<br>')?'ACADEMIC RENOVATION<br><span>EXAMPLE':'ACADEMIC RENOVATION')
 .replace(/UNT Matthews(?: Hall)?/gi,'Academic Renovation').replace(/TWU OLD MAIN/gi,'Heritage Restoration').replace(/TWU<br><span>OLD MAIN/gi,'HERITAGE<br><span>RESTORATION').replace(/TWU Old Main/gi,'Heritage Restoration')
 .replace(/PLANO ISD(?:<br><span>|\s+)BLEACHERS/gi,m=>m.includes('<br>')?'ATHLETIC FACILITY<br><span>EXAMPLE':'ATHLETIC FACILITY').replace(/Plano ISD(?: Bleacher Upgrades| Upgrades)?/gi,'Athletic Facility Example')
 .replace(/University of North Texas|Texas Woman['’]s University|City of Denton|Northwest ISD|Town of Addison/gi,'Client placeholder')
 .replace(/ASK 308/gi,'ASK STUDIO').replace(/CONTACT 308/gi,'CONTACT STUDIO').replace(/308 NAVIGATION/gi,'STUDIO NAVIGATION').replace(/<span>308\.<\/span>/g,'<span>US.</span>');
 let h=read('index.html');
 h=h.replace(/<link rel="canonical"[^>]*\/?>/gi,'').replace(/<meta property="og:url"[^>]*\/?>/gi,'').replace(/<meta name="robots"[^>]*\/?>/gi,'<meta name="robots" content="noindex,nofollow"/>');
 const csp=`<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.tailwindcss.com https://unpkg.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https://images.pexels.com https://images.unsplash.com; media-src 'self' https://videos.pexels.com; connect-src 'none'; form-action 'none'; object-src 'none'; frame-src 'none'">`;
 h=h.replace('<head>','<head>'+csp).replace(/https:\/\/static\.wixstatic\.com\/[^"'\s]+/g,'./assets/template-logo.svg');
 h=h.replace(/href="(?:tel:|mailto:)[^"]+"/gi,'href="?view=contact" onclick="navigateTo(\'contact\');return false;"').replace(/href="https:\/\/www\.google\.com\/maps\/[^"]+"/g,'href="?view=contact"');
 h=h.replace(/action="https:\/\/formsubmit\.co\/[^"]+"/g,'action="#"').replace(/data-submission-endpoint="[^"]*"/g,'data-submission-endpoint=""');
 h=h.replace(/(<div class="client-typographic-grid"[^>]*>)([\s\S]*?)(<\/div>)/,(_m,a,b,c)=>a+b.replace(/<span>[^<]*<\/span>/g,()=>'<span>Client placeholder</span>')+c);
 h=h.replace(/(<div class="ab-client"><span>\d+<\/span><strong>)[\s\S]*?(<\/strong><\/div>)/g,'$1Client placeholder$2');
 h=h.replace(/<strong class="font-display" aria-label="Six thousand one hundred twenty-three">6,123<\/strong>/,'<strong class="font-display" aria-label="Metric pending">—</strong>').replace(/<strong class="font-display" aria-label="One thousand eight hundred sixty-five">1,865<\/strong>/,'<strong class="font-display" aria-label="Metric pending">—</strong>').replace(/>45<span>\+<\/span>/,'>—<span></span>').replace(/over 45 years of experience/gi,'experience to be verified');
 h=h.replace(/(<p[^>]*>)[^<]*Messages from this form go to[^<]*(<\/p>)/gi,'$1Demonstration only. Nothing is sent. Use fictional test data.$2').replace(/I understand this independent preview sends my inquiry[^<]*/g,'I understand this is a demonstration and no information will be sent.').replace(/(<p id="ct-form-explanation">)[\s\S]*?(<\/p>)/,'$1Local validation only. No message is sent or stored.$2').replace(/SUBMIT TO ATREZZO/g,'CHECK INQUIRY');
 // Preserve project layout and imagery, but replace actual project assertions in prose and data.
 for(const route of ['unt','twu','plano','mep']){
  const start=h.indexOf('id="page-'+route+'"'),end=h.indexOf('id="page-',start+5);
  assert(start>=0&&end>start,route);
  let part=h.slice(start,end);part=part.replace(/(<p\b[^>]*>)[\s\S]*?(<\/p>)/g,'$1Illustrative project content. Replace with verified project scope and outcomes before publication.$2').replace(/(<dd\b[^>]*>)[\s\S]*?(<\/dd>)/g,'$1Pending verification$2');
  // Remove actual scope descriptions inside work-list text without changing markup.
  part=part.replace(/(<li\b[^>]*>)([\s\S]*?)(<\/li>)/g,(_m,a,b,c)=>a+b.replace(/>([^<>]+)</g,(_m,x)=>x.trim()?'>Verified scope item<':'> '+ '<')+c);
  h=h.slice(0,start)+part+h.slice(end);
 }
 h=h.replace(/(<div class="career-role-facts">)([\s\S]*?)(<\/details>)/g,(_m,a,b,c)=>a+b.replace(/(<p\b[^>]*>)[\s\S]*?(<\/p>)/g,'$1Example role. Confirm vacancy and requirements before use.$2')+c);
 for(const id of ['policy-scope','policy-contact','policy-careers','policy-third-party','policy-pending','policy-questions']){
  const re=new RegExp('(<section id="'+id+'"[^>]*>)([\\s\\S]*?)(<\\/section>)');
  h=h.replace(re,(_m,a,b,c)=>a+b.replace(/(<p\b[^>]*>)[\s\S]*?(<\/p>)/g,'$1Template reference only. No information or files are transmitted. Approve the applicable business-specific privacy terms before launch.$2')+c);
 }
 h=neutral(h).replace(/<footer\b([^>]*)>/,'<footer$1><p class="text-center mb-8">ATREZZO WEBSITE TEMPLATE · Illustrative images, project content, metrics, clients and role examples · No actual inquiries or applications</p>');
 h=h.replace(/Publicly listed clients/gi,'Client examples').replace(/PUBLICLY LISTED<br>/g,'EXAMPLE<br>').replace(/CURRENT<br><span>OPENINGS/gi,'EXAMPLE<br><span>ROLES').replace(/Organizations publicly listed by[^<]*/gi,'Client identity slots; no actual clients are claimed.').replace(/Names follow the original published client roster[^<]*/gi,'Replace with authorized client names.').replace(/Source: figures published by[^<]*/gi,'Business metrics pending verification.');
 // No client endpoint or official logo persists. Preserve external stock media and runtime dependencies.
 h=h.replace(/FormSubmit/gi,'disabled form delivery').replace(/https:\/\/formsubmit\.co[^"'\s<>]*/gi,'#');
 write('index.html',h);
 write('assets/template-logo.svg','<svg xmlns="http://www.w3.org/2000/svg" width="600" height="117" viewBox="0 0 600 117"><rect width="600" height="117" fill="#F3F2EF"/><text x="300" y="76" text-anchor="middle" font-family="Arial,sans-serif" font-size="46" font-weight="700" fill="#151A1D">CONSTRUCTION STUDIO</text></svg>');
 write('assets/favicon.svg','<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" fill="#151A1D"/><path d="M12 48V22l20-12 20 12v26H40V28l-8-5-8 5v20z" fill="#157C88"/></svg>');
 let js=read('assets/js/app.js');
 const a=js.indexOf('const SEO_VIEWS ='),b=js.indexOf('function updatePageMetadata',a);
 const routes=['home','services','projects','unt','twu','plano','mep','about','careers','contact','policy'];
 js=js.slice(0,a)+'const SEO_VIEWS = '+JSON.stringify(Object.fromEntries(routes.map(v=>[v,[v.toUpperCase()+' | Construction Studio','ATREZZO demonstration — illustrative construction website template.']])))+';\nconst SEO_ROOT = location.origin + location.pathname;\n'+js.slice(b);
 const i=js.indexOf('            let reply = "";'),j=js.indexOf('            setTimeout',i);assert(i>=0&&j>i);
 js=js.slice(0,i)+"            let reply = /service/.test(query) ? 'Explore the example planning, construction and management services.' : 'Local demonstration only. Project, contact and business information require verification. No request is sent.';\n"+js.slice(j);
 const start=js.indexOf('  const endpoint = (form.dataset.submissionEndpoint'),end=js.indexOf('  const validExtension',start);assert(start>=0&&end>start);
 js=js.slice(0,start)+'  const verifiedReceiver = false;\n'+js.slice(end);
 const x=js.indexOf('    // Use FormData only when'),y=js.indexOf('  });\n}\ndocument.addEventListener(\'DOMContentLoaded\',initCareersApplication);',x);assert(x>=0&&y>x);
 js=js.slice(0,x)+js.slice(y);
 const cc=js.indexOf('function initContactInquiryForm()'),dd=js.indexOf("document.addEventListener('DOMContentLoaded',initContactInquiryForm);",cc);assert(cc>=0&&dd>cc);
 js=js.slice(0,cc)+`function initContactInquiryForm() {
 const form=document.getElementById('contact-inquiry-form');
 if(!form)return;
 const status=document.getElementById('ct-form-status');
 form.addEventListener('submit',event=>{
  event.preventDefault();
  if(!form.reportValidity()){status.textContent='Complete the required fields.';status.dataset.state='error';return;}
  if(form.querySelector('[name="_honey"]')?.value)return;
  form.reset();status.textContent='Demo validation complete. No information was sent or stored.';status.dataset.state='success';
 });
}\n`+js.slice(dd);
 js=js.replace(/FormSubmit/gi,'local demo').replace(/atrezzostudiosv@gmail\.com/gi,'contact@example.invalid');
 write('assets/js/app.js',js);write('robots.txt','User-agent: *\nDisallow: /\n');
 assert(!/formsubmit\.co|9403874002|940-387-4002|Main@308gc\.com|atrezzostudiosv@gmail\.com|static\.wixstatic\.com/i.test(h+js));assert(!/\bfetch\s*\(/.test(js));
 const reg=JSON.parse(fs.readFileSync('registry/websites.json'));reg.entries.find(x=>x.id==='ATZ-WEB-004').status='validated_template';fs.writeFileSync('registry/websites.json',JSON.stringify(reg,null,2)+'\n');
 console.log('Built eleven original SPA views with local-only forms and original media.');
})();

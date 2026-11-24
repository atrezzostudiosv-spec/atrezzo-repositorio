/* Atrezzo: Fence Studio preview forms (provider confirmation != inbox delivery). */
(()=>{
'use strict';
const SERVICES=[['','Select a service'],['wood-privacy-fences','Wood Privacy Fences'],['ornamental-iron-fences','Ornamental Iron'],['chain-link-fences','Chain Link'],['ranch-style-fences','Ranch Style'],['vinyl-fences','Vinyl Fences'],['fence-staining','Fence Staining'],['fence-repairs','Fence Repairs'],['driveway-gates','Driveway Gates'],['gate-operators','Gate Operators'],['other','Other / Not Sure']];
const serviceOptions=SERVICES.map(p=>'<option value="'+p[0]+'">'+p[1]+'</option>').join('');
const svgArrow='<svg aria-hidden="true" width="17" height="17" viewBox="0 0 24 24" fill="none"><path d="M4 20 20 4M8 4h12v12" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const fields=(prefix)=>'<div class="quote-form-grid">'+
 '<div class="quote-field"><label for="'+prefix+'name">Your name *</label><input id="'+prefix+'name" name="name" type="text" required maxlength="100" autocomplete="name" placeholder="Full name"/></div>'+
 '<div class="quote-field"><label for="'+prefix+'email">Email address *</label><input id="'+prefix+'email" name="email" type="email" required maxlength="150" autocomplete="email" placeholder="you@example.com"/></div>'+
 '<div class="quote-field"><label for="'+prefix+'phone">Phone</label><input id="'+prefix+'phone" name="phone" type="tel" maxlength="35" autocomplete="tel" placeholder="Phone number"/></div>'+
 '<div class="quote-field"><label for="'+prefix+'location">Project city / ZIP</label><input id="'+prefix+'location" name="location" type="text" maxlength="120" autocomplete="address-level2" placeholder="[Service area]"/></div>'+
 '<div class="quote-field wide"><label for="'+prefix+'service">Fence project *</label><select id="'+prefix+'service" name="service" required>'+serviceOptions+'</select></div>'+
 '<div class="quote-field wide"><label for="'+prefix+'message">Tell us about your project *</label><textarea id="'+prefix+'message" name="message" minlength="10" maxlength="4000" required placeholder="What type of fence, approximate scope or repairs are you considering?"></textarea></div></div>'+
 '<input type="hidden" name="_subject" value="[ATREZZO TEST] Fence Studio quote enquiry"/>'+
 '<input type="hidden" name="_template" value="table"/><input type="hidden" name="_captcha" value="false"/>'+
 '<input type="hidden" name="project_source" value="Fence Studio design preview"/>'+
 '<input type="text" name="_honey" class="quote-honey" aria-hidden="true" tabindex="-1" autocomplete="off"/>'+
 '<label class="quote-privacy"><input type="checkbox" name="preview_consent" value="yes" required/><span>I understand this is a design preview. No information is sent or stored.</span></label>'+
 '<p class="quote-preview-notice">Demonstration only. No quote is issued and no message is sent.</p>'+
 '<div class="quote-actions"><button type="submit" class="button button-dark quote-submit">Check enquiry '+svgArrow+'</button><p class="quote-status" role="status" aria-live="polite"></p></div>';
let modal=null;
function attachForm(form){
 if(!form||form.dataset.bound)return;
 form.dataset.bound='true';
 form.addEventListener('submit',event=>{
  event.preventDefault();if(!form.reportValidity())return;
  form.reset();const status=form.querySelector('.quote-status');status.dataset.state='ok';status.textContent='Demo validation complete. No information was sent or stored.';
 });
}

function buildModal(){
 if(modal)return modal;
 modal=document.createElement('dialog');
 modal.className='quote-modal';
 modal.setAttribute('aria-labelledby','quote-modal-title');
 modal.innerHTML='<div class="quote-modal-shell"><div class="quote-modal-art"><p>FENCE STUDIO / PROJECT ENQUIRY</p><h2>Start with your space.</h2></div><div class="quote-editorial"><button type="button" class="quote-modal-close" aria-label="Close quote form"></button><div class="quote-form-head"><small>PROJECT ENQUIRY / DESIGN PREVIEW</small><h3 id="quote-modal-title">Tell us what you have in mind.</h3></div><form class="quote-form" method="POST" action="#quote-form" autocomplete="on">'+fields('qm-')+'</form></div></div>';
 document.body.appendChild(modal);
 modal.querySelector('.quote-modal-close').addEventListener('click',()=>modal.close());
 modal.addEventListener('click',event=>{if(event.target===modal)modal.close()});
 modal.addEventListener('close',()=>{const status=modal.querySelector('.quote-status');status.textContent='';status.removeAttribute('data-state')});
 attachForm(modal.querySelector('form'));
 return modal;
}
document.querySelectorAll('form.quote-form').forEach(attachForm);
document.addEventListener('click',event=>{
 const link=event.target.closest('a');
 if(!link)return;
 const isQuote=link.hasAttribute('data-quote')||((link.classList.contains('header-cta')||link.classList.contains('button'))&&/request a quote/i.test(link.textContent));
 if(!isQuote||!('HTMLDialogElement' in window))return;
 event.preventDefault();
 const dlg=buildModal();
 const slug=location.pathname.replace(/\/index\.html$/,'/').split('/').filter(Boolean).pop();
 const select=dlg.querySelector('[name="service"]');
 if(SERVICES.some(pair=>pair[0]===slug))select.value=slug;
 dlg.showModal();
 dlg.querySelector('[name="name"]').focus();
});
})();
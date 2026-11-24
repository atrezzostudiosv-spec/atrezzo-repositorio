// Extracted literal templates from Team-Hodnett/scripts/home.mjs at 98d354c5b1349d1457af0f1cbc5d12256a011f1b.
const U=path=>String(path).replace(/^\//,'');
const e=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const icon=name=>{const paths={arrow:'<path d="M5 19 19 5M5 5h14v14"/>',right:'<path d="m9 5 7 7-7 7"/>',left:'<path d="m15 5-7 7 7 7"/>',heart:'<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z"/>',search:'<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/>',menu:'<path d="M3 8h18M3 16h18"/>',close:'<path d="m5 5 14 14M19 5 5 19"/>',user:'<circle cx="12" cy="8" r="4"/><path d="M4 22v-2a8 8 0 0 1 16 0v2"/>',grid:'<rect x="3" y="3" width="6" height="6"/><rect x="15" y="3" width="6" height="6"/><rect x="3" y="15" width="6" height="6"/><rect x="15" y="15" width="6" height="6"/>',share:'<path d="M12 15V2m-4 4 4-4 4 4M5 11H3v10h18V11h-2"/>'};return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name]||paths.arrow}</svg>`;};
const link=(path,text,cls='line-link')=>`<a href="${U(path)}" class="${cls}" data-atz-link>${text}${icon('arrow')}</a>`;
const price=(value,status='')=>value===null?'Price not published':new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0}).format(value)+(status==='For Lease'?' / mo':'');
const detailURL=p=>`properties/${p.id}/`;
const stats=p=>[p.beds>0?`${p.beds} beds`:p.beds===0?p.type:null,p.baths!==null?`${p.baths} baths`:null,p.sqft!==null?`${p.sqft.toLocaleString('en-US')} sq ft`:null].filter(Boolean);
export function renderCollection(featured){
 const featuredPanels=featured.map((p,i)=>`<article class="collection-panel" id="collection-panel-${i+1}" data-collection-panel data-collection-property-url="${U(detailURL(p))}" data-collection-property-title="${e(p.title)}" role="tabpanel" aria-labelledby="collection-tab-${i+1}" aria-hidden="false">
  <div class="collection-image-wrap"><img class="collection-photo" src="${U(p.cover)}" alt="${e(p.title)}, ${e(p.city)}" loading="${i===0?'eager':'lazy'}" decoding="async"></div>
  <div class="collection-scrim" aria-hidden="true"></div>
  <div class="collection-overlay">
   <div class="collection-property-copy"><div class="eyebrow">${e(p.city)}, TEXAS</div><h3><a class="collection-property-title-link" href="${U(detailURL(p))}" data-atz-link>${e(p.title)}</a></h3><div class="collection-meta"><span>${price(p.price,p.status)}</span>${stats(p).map(t=>`<span>${e(t)}</span>`).join('')}</div></div>
  </div>
 </article>`).join('');
 const featuredNavigation=featured.map((p,i)=>`<button class="collection-tab" type="button" role="tab" id="collection-tab-${i+1}" data-collection-tab="${i}" aria-selected="${i===0?'true':'false'}" aria-controls="collection-panel-${i+1}" tabindex="${i===0?0:-1}">
  <span class="collection-tab-rule" aria-hidden="true"></span><span class="collection-tab-title">${e(p.title)}</span><span class="collection-tab-city">${e(p.city)}, Texas</span>
 </button>`).join('');

 return ` <section class="collection-section" id="collection" aria-labelledby="selected-homes-heading">
  <div class="collection-intro wrap"><div><div class="eyebrow">SELECTED HOMES</div><h2 id="selected-homes-heading">The exceptional.<br>Up close.</h2></div><p>Discover three distinctive homes represented by The Hodnett Team.</p></div>
  <div class="collection-scroll-track" data-collection-track>
   <div class="collection-stage" data-collection-stage aria-label="Selected properties">
    <div class="collection-frames">${featuredPanels}</div>
    <div class="collection-image-index">SELECTED HOMES / THE HODNETT TEAM</div>
    <div class="collection-image-counter" data-collection-counter aria-hidden="true">01 / 03</div>
    <div class="collection-bottom">
     <div class="collection-bottom-top"><a class="collection-text-link collection-sticky-link" data-collection-property-link href="${U(detailURL(featured[0]))}" data-atz-link aria-label="Discover ${e(featured[0].title)}">Discover This Home <span class="collection-text-plus" aria-hidden="true">+</span></a><a class="collection-all-homes" href="${U('homes/')}" data-atz-link>Explore All Homes ${icon('arrow')}</a></div>
     <div class="collection-tabs" role="tablist" aria-label="Choose a featured home">${featuredNavigation}</div>
    </div>
   </div>
  </div>
  <div class="collection-fallback-link wrap">${link('homes/','Explore All Homes')}</div>
 </section>`;
}

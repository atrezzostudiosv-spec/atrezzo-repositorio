// Original ATREZZO implementation. No third-party runtime.
export const clamp=(n)=>Math.max(0,Math.min(1,n));
export const ease=(n)=>1-Math.pow(1-clamp(n),3);
export const graphemes=s=>typeof Intl.Segmenter==='function'?[...new Intl.Segmenter(undefined,{granularity:'grapheme'}).segment(s)].map(x=>x.segment):Array.from(s);
export function split(el,mode='chars'){
 const old=[...el.childNodes]; const original=el.textContent;const oldLabel=el.getAttribute('aria-label');
 if(mode==='lines')return {units:[...el.children],restore(){}};
 if(el.children.length)return {units:[],restore(){}};
 const wrap=document.createElement('span');wrap.setAttribute('aria-hidden','true');const units=[];
 for(const token of original.match(/\S+|\s+/gu)||[]){if(/^\s+$/u.test(token)){wrap.append(document.createTextNode(token));continue;}const word=document.createElement('span');word.className='ty-word';
 for(const value of mode==='words'?[token]:graphemes(token)){const unit=document.createElement('span');unit.className='ty-unit';unit.textContent=value;units.push(unit);word.append(unit);}wrap.append(word);}
 el.setAttribute('aria-label',original);el.replaceChildren(wrap);
 return {units,restore(){el.replaceChildren(...old);if(oldLabel===null)el.removeAttribute('aria-label');else el.setAttribute('aria-label',oldLabel);}};
}
export function shuffled(n){const a=Array.from({length:n},(_,i)=>i);for(let i=n-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
export function mountPattern(host,id,setup){
 const node=host?.matches?.(`[data-atz-id="${id}"]`)?host:host?.querySelector?.(`[data-atz-id="${id}"]`);if(!node)throw Error('Component not found: '+id);
 const media=matchMedia('(prefers-reduced-motion: reduce)');let cleanup=[],disposed=false;
 const clear=()=>{for(const f of cleanup.splice(0).reverse())f();delete node.dataset.tyReady;};
 function init(){clear();if(disposed||media.matches)return;node.dataset.tyReady='true';const add=f=>cleanup.push(f);
 const ctx={node,add,animate(el,frames,options){const a=el.animate(frames,options);add(()=>a.cancel());return a;},listen(el,type,fn,opts){el.addEventListener(type,fn,opts);add(()=>el.removeEventListener(type,fn,opts));},visible(el,enter,leave=()=>{},once=true){if(!('IntersectionObserver'in window)){enter();return;}const io=new IntersectionObserver(entries=>{for(const e of entries){if(e.isIntersecting){enter();if(once)io.unobserve(el);}else if(!once)leave();}},{threshold:.12});io.observe(el);add(()=>io.disconnect());},timer(fn,ms){const t=setTimeout(fn,ms);add(()=>clearTimeout(t));return t;},interval(fn,ms){const t=setInterval(fn,ms);add(()=>clearInterval(t));return t;}};
 try{setup(ctx);}catch(e){clear();throw e;}}
 media.addEventListener('change',init);init();return {refresh(){init();},destroy(){disposed=true;media.removeEventListener('change',init);clear();}};
}
export function enter(ctx,el,units,make,stagger=65,duration=800,order=null){
 const animations=units.map((u,i)=>ctx.animate(u,make(i),{duration,delay:(order?order[i]:i)*stagger,easing:'cubic-bezier(.22,.61,.36,1)',fill:'backwards'}));animations.forEach(a=>a.pause());
 ctx.visible(el,()=>animations.forEach(a=>a.play()));
}

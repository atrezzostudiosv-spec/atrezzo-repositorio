// ATREZZO Creative Transitions 01 — isolated native lifecycle.
export const clamp=(n,min=0,max=1)=>Math.max(min,Math.min(max,n));
export const smooth=n=>{n=clamp(n);return n*n*(3-2*n);};
export function mountPattern(host,id,setup){
 const root=host?.matches?.(`[data-atz-id="${id}"]`)?host:host?.querySelector?.(`[data-atz-id="${id}"]`);
 if(!root)throw Error('Missing '+id);
 const media=matchMedia('(prefers-reduced-motion: reduce)');let clean=[],dead=false,mode='static';
 function clear(){for(const f of clean.splice(0).reverse())f();delete root.dataset.ctReady;delete root.dataset.ctMotion;}
 function init(){clear();if(dead)return;root.dataset.ctReady='true';root.dataset.ctMotion=media.matches?'off':'on';mode=media.matches?'static':'animated';const add=f=>clean.push(f);try{setup({root,reduced:media.matches,add,listen(el,type,fn,opts){el.addEventListener(type,fn,opts);add(()=>el.removeEventListener(type,fn,opts));},scroll(render){let raf=0;const update=()=>{raf=0;render();};const schedule=()=>{if(!raf)raf=requestAnimationFrame(update);};window.addEventListener('scroll',schedule,{passive:true});window.addEventListener('resize',schedule);add(()=>{window.removeEventListener('scroll',schedule);window.removeEventListener('resize',schedule);cancelAnimationFrame(raf);});render();}});}catch(e){clear();throw e;}}
 media.addEventListener('change',init);init();return{get mode(){return mode;},refresh(){init();},destroy(){dead=true;media.removeEventListener('change',init);clear();mode='destroyed';}};
}

// ATREZZO Microinteractions 01 — runtime local, original.
export const clamp=(n,a,b)=>Math.min(b,Math.max(a,n));
export function mountPattern(host,id,setup){
 const root=host?.matches?.(`[data-atz-id="${id}"]`)?host:host?.querySelector?.(`[data-atz-id="${id}"]`);
 if(!root)throw Error('Component not found: '+id);
 const media=matchMedia('(prefers-reduced-motion: reduce)'); const fine=matchMedia('(hover: hover) and (pointer: fine)');
 let clean=[],disposed=false,mode='static';
 function clear(){for(const f of clean.splice(0).reverse())f();delete root.dataset.miReady;delete root.dataset.miMotion;mode='static';}
 function init(){clear();if(disposed)return;const reduced=media.matches;mode=reduced?'static':'interactive';root.dataset.miMotion=reduced?'off':'on';root.dataset.miReady='true';
 const add=f=>clean.push(f); const listen=(el,type,fn,opts)=>{el.addEventListener(type,fn,opts);add(()=>el.removeEventListener(type,fn,opts));};
 try{setup({root,reduced,fine:fine.matches,add,listen});}catch(e){clear();throw e;}}
 media.addEventListener('change',init);fine.addEventListener('change',init);init();
 return {get mode(){return disposed?'destroyed':mode;},refresh:init,destroy(){if(disposed)return;disposed=true;media.removeEventListener('change',init);fine.removeEventListener('change',init);clear();}};
}

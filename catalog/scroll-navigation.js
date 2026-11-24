// Directional sticky navigation. No changes to catalog state or component scenes.
const bar=document.querySelector('body > .bar');
if(bar){
  const root=document.documentElement;
  const measure=()=>root.style.setProperty('--library-nav-height',Math.ceil(bar.getBoundingClientRect().height)+'px');
  measure();
  if('ResizeObserver' in window)new ResizeObserver(measure).observe(bar);
  else window.addEventListener('resize',measure,{passive:true});
  const show=()=>bar.classList.remove('nav-hidden');
  let last=Math.max(0,window.scrollY),delta=0,frame=0;
  const update=()=>{
    frame=0;
    const y=Math.max(0,window.scrollY),d=y-last;last=y;
    if(y<=bar.offsetHeight+16||bar.contains(document.activeElement)){show();delta=0;return;}
    if(d===0)return;
    delta=(Math.sign(d)===Math.sign(delta)?delta:0)+d;
    if(delta<=-7){show();delta=0;}
    else if(delta>=20){bar.classList.add('nav-hidden');delta=0;}
  };
  window.addEventListener('scroll',()=>{if(!frame)frame=requestAnimationFrame(update)},{passive:true});
  bar.addEventListener('focusin',show);
  window.addEventListener('hashchange',()=>{show();delta=0;last=Math.max(0,window.scrollY);});
  window.addEventListener('pageshow',()=>{show();delta=0;last=Math.max(0,window.scrollY);});
  const search=bar.querySelector('[data-search-shortcut]');
  search?.addEventListener('click',event=>{
    const query=document.querySelector('#query');
    if(!query)return;
    event.preventDefault();show();
    document.querySelector('#filters')?.scrollIntoView({behavior:'instant',block:'start'});
    query.focus({preventScroll:true});
  });
}

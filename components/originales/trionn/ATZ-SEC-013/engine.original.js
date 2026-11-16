// ATREZZO extraction: original module 28236. Named host adapters are outside the exact source blocks.
function mountOriginalSequence({frameURLs,ScrollTrigger,gsap,onStatus=()=>{}}){
const E={useCallback:fn=>fn},u={current:document.getElementById('c')},C={current:{imgs:Array(371),loaded:0,preloading:!1,videoIdx:0,scrollT:0,cardsTL:null}},y={default:gsap};
// Map captured frame paths to authorized local or embedded originals. Keep the preload algorithm unchanged.
let disposed=false;const nativeSrc=Object.getOwnPropertyDescriptor(HTMLImageElement.prototype,'src');
function Image(){const image=new window.Image();Object.defineProperty(image,'src',{get(){return nativeSrc.get.call(this)},set(value){const match=value.match(/frame_(\d{4})\.webp$/);nativeSrc.set.call(this,match?frameURLs[Number(match[1])-1]:value)}});return image;}
/* BEGIN EXACT PHASE LENGTHS */
function l(e){return e?600:800}function n(e){return e?60:150}function a(){return window.innerWidth<768}function i(e){return 200+n(e)+l(e)+200}
/* END EXACT PHASE LENGTHS */
let /* BEGIN EXACT DISPLAY AND SIZE */
L=(0,E.useCallback)(e=>{let t=u.current;if(!t)return;let r=C.current,l=Math.round(e),n=r.imgs[l];n&&n.complete&&t.src!==n.src&&(t.src=n.src)},[]),D=(0,E.useCallback)(()=>{let e,t,r=u.current;if(!r)return;let l=window.matchMedia("(max-width: 677px)").matches,n=window.matchMedia("(max-width: 767px)").matches,a=window.matchMedia("(min-width: 768px) and (max-width: 1023px)").matches;l||n?(e=999,t=594):e=a?Math.round(16/9*(t=Math.round(.75*Math.round(window.visualViewport?.height??window.innerHeight)))):Math.round(16/9*(t=Math.round(window.visualViewport?.height??window.innerHeight))),r.style.width=e+"px",r.style.height=t+"px",C.current.cardsTL=null,L(C.current.videoIdx)},[L]),
/* END EXACT DISPLAY AND SIZE */
/* BEGIN EXACT PRELOAD */
B=(0,E.useCallback)(()=>{let e=C.current;if(e.preloading||e.loaded>0)return;e.preloading=!0;let t="u">typeof requestIdleCallback?requestIdleCallback:e=>setTimeout(e,0),r=l=>{let n=Math.min(l+20,371),a=0,i=n-l,s=()=>{a++,e.loaded++,371===e.loaded&&L(0),a===i&&n<371&&t(()=>r(n))};for(let t=l;t<n;t++){let r=new Image;r.decoding="async",r.src=`/images/stone/frame_${String(t+1).padStart(4,"0")}.webp`,r.decode().then(s,s),e.imgs[t]=r}};r(0)},[L,371]);
/* END EXACT PRELOAD */
const t=C.current;let raf=0,trigger,progress=0;
function render(){if(disposed)return;raf=requestAnimationFrame(render);if(!t.loaded)return;
 // Restore the original parent's normalized progress, using only the isolated services phase.
 {const C=a(),R=(200+n(C)+progress*l(C))/i(C);let r,c,p,x;
 /* BEGIN EXACT PHASE MAPPING */
 r=n(C),p=(200+r)/(c=i(C)),x=(200+r+l(C))/c,t.scrollT=R<p?0:R>x?1:(R-p)/(x-p);
 /* END EXACT PHASE MAPPING */
 }
 let _=t.scrollT;
 /* BEGIN EXACT OPACITY */
 u.current&&(u.current.style.opacity=String(y.default.utils.clamp(0,1,_/.08)));
 /* END EXACT OPACITY */
 /* BEGIN EXACT FRAME INTERPOLATION */
 let c=370*t.scrollT;t.videoIdx+=(c-t.videoIdx)*.12;
 /* END EXACT FRAME INTERPOLATION */
 L(t.videoIdx);onStatus({loaded:t.loaded,index:Math.round(t.videoIdx),progress:t.scrollT});
}
D();B();trigger=ScrollTrigger.create({trigger:'#sequence-pin',start:'top top',end:()=>'+='+l(a())+'%',pin:true,pinSpacing:true,invalidateOnRefresh:true,onUpdate:e=>{progress=e.progress},onRefresh:e=>{progress=e.progress}});const resize=()=>{D();trigger.refresh()};window.addEventListener('resize',resize);raf=requestAnimationFrame(render);
return {get loaded(){return t.loaded},get index(){return Math.round(t.videoIdx)},get progress(){return t.scrollT},dispose(){disposed=true;cancelAnimationFrame(raf);trigger.kill();window.removeEventListener('resize',resize);}};
}

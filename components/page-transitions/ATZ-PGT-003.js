/* ATZ-PGT-003 · Original ATREZZO Transitions 01 engine; its keyframes are not modified.
 * This adapter creates ONE effect-specific instance for the catalog scene swap.
 * In a multi-page website use runtime.js + preflight.js per guide.
 */
import "./runtime.js";
export const id = "ATZ-PGT-003";
export const variant = "iris";
export function mount(host, options={}) {
  if(!(host instanceof Element))throw new TypeError(id+": host must be an Element");
  const section=host.matches('[data-atz-id="'+id+'"]')?host:host.querySelector('[data-atz-id="'+id+'"]');
  if(!section)throw Error(id+": scene not found");
  const scenes=[...section.querySelectorAll("[data-pgt-scene]")];
  const controls=[...section.querySelectorAll("[data-pgt-show]")];
  if(scenes.length!==3||controls.length!==3)throw Error(id+": expected three demo scenes and controls");
  const engine=new window.AtrezzoTransitions({
    defaultEffect:variant,coverColor:options.coverColor||"#211d32",
    coverMs:options.coverMs,revealMs:options.revealMs,
    intercept:options.intercept===true,showLabel:false
  });
  let current=0,destroyed=false;
  const show=index=>{
    current=index;
    for(let n=0;n<scenes.length;n++){
      scenes[n].hidden=n!==index;
      controls[n].setAttribute("aria-pressed",String(n===index));
    }
  };
  show(0);
  async function onClick(event){
    const button=event.target.closest("[data-pgt-show]");
    if(!button||!section.contains(button)||destroyed)return;
    const next=Number(button.dataset.pgtShow);
    if(!Number.isInteger(next)||next<0||next>=scenes.length||next===current||engine.busy)return;
    await engine.swap(()=>show(next),{effect:variant,label:button.textContent.trim()});
  }
  section.addEventListener("click",onClick);
  return {
    id,variant,engine,
    get mode(){return matchMedia("(prefers-reduced-motion: reduce)").matches?"static":"interactive";},
    get currentScene(){return current;},
    swapScene(index){if(destroyed||index===current||index<0||index>=scenes.length)return Promise.resolve(false);return engine.swap(()=>show(index),{effect:variant});},
    destroy(){
      if(destroyed)return;
      destroyed=true;section.removeEventListener("click",onClick);engine.destroy();
    }
  };
}

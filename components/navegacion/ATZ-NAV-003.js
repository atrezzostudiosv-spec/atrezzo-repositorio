import {createNavigationLifecycle,listenFrame} from "./runtime.js";
export const id="ATZ-NAV-003";
export function mount(host){
  if(!(host instanceof Element))throw new TypeError("ATZ-NAV-003: host must be Element");
  const root=host.querySelector('[data-atz-id="ATZ-NAV-003"]')||(host.matches('[data-atz-id="ATZ-NAV-003"]')?host:null);
  if(!root)throw Error("ATZ-NAV-003: fragment missing");
  const stage=root.querySelector("[data-azn1-projects]");
  const dock=root.querySelector("[data-azn1-dock]");
  const projects=[...stage?.querySelectorAll("[data-azn1-project]")||[]];
  if(!stage||!dock||!projects.length)throw Error("ATZ-NAV-003: incomplete project hooks");
  const title=dock.querySelector("[data-azn1-dock-title]");
  const count=dock.querySelector("[data-azn1-dock-counter]");
  const progress=dock.querySelector("[data-azn1-dock-progress]");
  const prev=dock.querySelector("[data-azn1-dock-prev]");
  const next=dock.querySelector("[data-azn1-dock-next]");
  const life=createNavigationLifecycle();
  let index=projects.findIndex(el=>el.classList.contains("is-active"));
  if(index<0)index=0;
  const showProject=value=>{
    index=(value+projects.length)%projects.length;
    projects.forEach((el,i)=>{
      const current=i===index;
      el.classList.toggle("is-active",current);
      el.setAttribute("aria-hidden",String(!current));
    });
    if(title)title.textContent=projects[index].dataset.azn1Title||"Project";
    if(count)count.textContent=String(index+1).padStart(2,"0")+" / "+String(projects.length).padStart(2,"0");
    if(progress)progress.style.width=(100*(index+1)/projects.length)+"%";
  };
  const visibility=()=>{
    const r=stage.getBoundingClientRect();
    dock.classList.toggle("is-visible",r.top<innerHeight*.64&&r.bottom>innerHeight*.47);
  };
  showProject(index);listenFrame(life,visibility);
  if(prev)life.on(prev,"click",()=>showProject(index-1));
  if(next)life.on(next,"click",()=>showProject(index+1));
  life.on(dock,"keydown",e=>{
    if(e.key==="ArrowRight"){e.preventDefault();showProject(index+1);}
    if(e.key==="ArrowLeft"){e.preventDefault();showProject(index-1);}
  });
  life.cleanup(()=>dock.classList.remove("is-visible"));
  return {get mode(){return "interactive"},next:()=>showProject(index+1),previous:()=>showProject(index-1),refresh:visibility,destroy:()=>life.destroy()};
}

import {createNavigationLifecycle,reducedMotion} from "./runtime.js";
export const id="ATZ-NAV-001";
export function mount(host,{inertTarget}={}){
  if(!(host instanceof Element))throw new TypeError("ATZ-NAV-001: host must be Element");
  const root=host.querySelector('[data-atz-id="ATZ-NAV-001"]')|| (host.matches('[data-atz-id="ATZ-NAV-001"]')?host:null);
  if(!root)throw Error("ATZ-NAV-001: HTML fragment missing");
  const trigger=root.querySelector("[data-azn1-menu-trigger]");
  const dialog=root.querySelector("[data-azn1-menu]");
  const close=dialog?.querySelector("[data-azn1-menu-close]");
  if(!trigger||!dialog||!close)throw Error("ATZ-NAV-001: menu hooks missing");
  const life=createNavigationLifecycle();
  const formerParent=dialog.parentNode,formerNext=dialog.nextSibling;
  // Modal belongs outside <main> so setting the page inert never makes the modal inert.
  if(dialog.closest("main"))document.body.appendChild(dialog);
  const links=[...dialog.querySelectorAll("[data-azn1-menu-link]")];
  const photos=[...dialog.querySelectorAll("[data-azn1-menu-photo]")];
  const focusables=()=>[...dialog.querySelectorAll('a[href],button:not([disabled]),[tabindex]:not([tabindex="-1"])')].filter(el=>el.getClientRects().length);
  const preview=i=>photos.forEach((el,k)=>el.classList.toggle("is-active",i===k));
  let open=false,oldFocus=null,focusTimer=0,hideTimer=0,oldInert=false,masked=null;
  const target=inertTarget??document.querySelector("main");
  const mask=()=>{if(target&&!target.contains(dialog)){masked=target;oldInert=target.inert;target.inert=true;}};
  const unmask=()=>{if(masked){masked.inert=oldInert;masked=null;}};
  const openMenu=()=>{
    if(open)return;
    clearTimeout(hideTimer);
    open=true;oldFocus=document.activeElement;dialog.hidden=false;trigger.setAttribute("aria-expanded","true");
    document.body.classList.add("atz-nav-scroll-locked");mask();
    requestAnimationFrame(()=>dialog.classList.add("is-open"));
    focusTimer=setTimeout(()=>{if(open)(focusables()[0]||close).focus({preventScroll:true});},reducedMotion()?0:100);
  };
  const closeMenu=(restore=true)=>{
    if(!open)return;
    open=false;clearTimeout(focusTimer);dialog.classList.remove("is-open");
    trigger.setAttribute("aria-expanded","false");document.body.classList.remove("atz-nav-scroll-locked");unmask();
    if(restore&&oldFocus?.isConnected)oldFocus.focus({preventScroll:true});
    hideTimer=setTimeout(()=>{if(!open)dialog.hidden=true;},reducedMotion()?0:810);
  };
  root.classList.add("is-ready");
  life.on(trigger,"click",openMenu);
  life.on(close,"click",()=>closeMenu());
  life.on(document,"keydown",event=>{
    if(!open)return;
    if(event.key==="Escape"){event.preventDefault();closeMenu();return;}
    if(event.key!=="Tab")return;
    const items=focusables();if(!items.length)return;
    if(event.shiftKey&&document.activeElement===items[0]){event.preventDefault();items.at(-1).focus();}
    else if(!event.shiftKey&&document.activeElement===items.at(-1)){event.preventDefault();items[0].focus();}
  });
  links.forEach((a,i)=>{
    life.on(a,"focus",()=>preview(i));
    life.on(a,"pointerenter",()=>preview(i));
    life.on(a,"click",event=>{
      const url=new URL(a.href,location.href);
      const same=url.origin===location.origin&&url.pathname===location.pathname&&url.search===location.search;
      const hash=same?url.hash:"";
      const dest=hash?document.getElementById(decodeURIComponent(hash.slice(1))):null;
      if(dest){
        event.preventDefault();closeMenu(false);history.pushState(null,"",hash);
        dest.scrollIntoView({behavior:reducedMotion()?"instant":"smooth",block:"start"});
        setTimeout(()=>{if(dest.isConnected)dest.focus?.({preventScroll:true});},70);
      }else closeMenu(false);
    });
  });
  life.cleanup(()=>{
    clearTimeout(focusTimer);clearTimeout(hideTimer);open=false;unmask();
    dialog.hidden=true;dialog.classList.remove("is-open");root.classList.remove("is-ready");
    trigger.setAttribute("aria-expanded","false");document.body.classList.remove("atz-nav-scroll-locked");
    if(formerParent&&dialog.parentNode!==formerParent)formerParent.insertBefore(dialog,formerNext);
  });
  return {get mode(){return "interactive"},open:openMenu,close:closeMenu,destroy:()=>life.destroy()};
}

import { mount } from "../../components/scroll/ATZ-SCR-008.js";
const host=document.querySelector("#atrezzo-scene");
const status=document.querySelector("#lab-state");
try{
  const instance=mount(host,{gsap:window.gsap,ScrollTrigger:window.ScrollTrigger});
  window.__atrezzoFixture=instance;
  status.textContent=instance.mode==="animated"?"Movimiento en funcionamiento":instance.mode==="static"?"Composición estática: móvil o movimiento reducido":"Composición estática: sin dependencias";
  window.addEventListener("pagehide",()=>instance.destroy(),{once:true});
}catch(error){
  console.error("ATREZZO LAB:",error);
  status.textContent="Composición estática · comprobar dependencias";
}

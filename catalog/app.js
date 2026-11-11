import { loadFavorites, saveFavorites, listenFavorites } from "./favorites-store.js";

const root = document.querySelector("#component-grid");
const favoriteGrid = document.querySelector("#favorites-grid");
const favoriteEmpty = document.querySelector("#favorites-empty");
const search = document.querySelector("#search");
const filters = document.querySelector("#filters");
const nav = document.querySelector("#category-nav");
const count = document.querySelector("#result-count");
const toast = document.querySelector("#toast");

let entries = [], groups = [], filter = "all", favorites = new Set(), toastTimer = 0;
const groupFallback = {
  galerias:"Galerías y mosaicos", sticky:"Paneles sticky", narrativa:"Narrativa por scroll",
  navegacion:"Navegación", transiciones:"Transiciones"
};
const idRegex = /^ATZ-[A-Z]{3}-\d{3}$/;
const escapeHTML = value => String(value).replace(/[&<>"']/g, char => ({
  "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;"
}[char]));
const normalize = value => String(value ?? "").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase();
const pad = num => String(num).padStart(2,"0");
const heartIcon = '<svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 1 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78Z"/></svg>';

function notify(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"),2400);
}
function label(group) {
  return groups.find(x=>x.id===group)?.label || groupFallback[group] || group;
}
function instruction(e) {
  return "Integra únicamente " + e.id + " ("+e.title+") del repositorio https://github.com/atrezzostudiosv-spec/atrezzo-repositorio. Lee registry/components.json y " + e.technical_guide + ". Preserva el efecto aprobado y no importes otros componentes. Audita el proyecto cliente, utiliza imágenes autorizadas, verifica móvil, teclado, scroll inverso, reduced-motion y licencias. Demo probada en biblioteca; client_ready=false hasta validación en cliente.";
}
async function copy(value,description) {
  try {
    await navigator.clipboard.writeText(value);
    notify(description+" copiado");
  } catch {
    const input = document.createElement("textarea");
    input.value=value;input.style.position="fixed";input.style.opacity="0";
    document.body.appendChild(input);input.select();
    try { document.execCommand("copy");notify(description+" copiado"); }
    catch { notify("Copia manualmente los identificadores"); }
    input.remove();
  }
}
function tiles(e,i) {
  const n = e.variant==="frame"?4:([4,5,6,9].includes(i)?28:i===7?9:15);
  const palette=[["#5948a6","#102d55"],["#067b9c","#10233d"],["#8c44ab","#222047"],["#284eaa","#151835"],["#1b8d9c","#17305b"]];
  return Array.from({length:n},(_,j)=>{
    const colors=palette[(j+i)%palette.length];
    return '<span class="visual-tile" style="--tile-a:'+colors[0]+';--tile-b:'+colors[1]+';--drift:'+(((j*7+i*11)%39)-20)+'px;--rot:'+(((j*3+i*7)%19)-9)+'deg"></span>';
  }).join("");
}
function previewLink(e) {
  return idRegex.test(e.id)?"preview.html?id="+encodeURIComponent(e.id):"index.html#library";
}
function card(e,i) {
  const id=escapeHTML(e.id);
  const title=escapeHTML(e.title);
  const href=previewLink(e);
  const group=escapeHTML(label(e.discovery_group));
  const trigger=({scroll:"Scroll",click:"Clic / teclado",mixed:"Mixto","scroll-entry":"Entrada en pantalla"})[e.discovery_trigger]||"Interacción";
  const qa=e.catalog_qa_status==="passed_internal"?"Demo probada":e.client_ready?"Cliente verificado":"Por revisar";
  const qaTitle=e.catalog_qa_status==="passed_internal"?"Probada en la biblioteca. Pendiente de validación en cada website cliente.":"Estado de pruebas pendiente";
  const saved=favorites.has(e.id);
  const favLabel=(saved?"Quitar de favoritos: ":"Guardar en favoritos: ")+e.title;
  return '<article class="component-card" data-id="'+id+'">'+
    '<div class="card-media"><a class="card-visual layout-'+(i%11+1)+'" href="'+href+'" aria-label="Abrir demostración de '+title+'">'+
    '<span class="visual-orbit"></span><span class="tile-layout" aria-hidden="true">'+tiles(e,i+1)+'</span>'+
    '<span class="card-id-label">'+id+'</span><span class="card-preview-cue" aria-hidden="true">↗</span></a>'+
    '<button type="button" class="favorite-button'+(saved?' is-saved':'')+'" data-favorite-id="'+id+'" aria-pressed="'+String(saved)+'" aria-label="'+escapeHTML(favLabel)+'" title="'+escapeHTML(favLabel)+'">'+heartIcon+'</button></div>'+
    '<div class="card-body"><div class="card-topline"><span class="card-category">'+group.toUpperCase()+'</span>'+
    '<span class="card-status" title="'+escapeHTML(qaTitle)+'">'+qa+'</span></div>'+
    '<h3 class="card-title">'+title+'</h3><p class="card-description">'+escapeHTML(e.description||"")+'</p>'+
    '<div class="card-specs"><span>'+escapeHTML(trigger)+'</span><span>'+escapeHTML(e.level||"")+'</span></div>'+
    '<div class="card-actions"><a href="'+href+'" class="card-action">Ver movimiento <span aria-hidden="true">↗</span></a>'+
    '<button type="button" class="copy-action" data-prompt="'+id+'" title="Copiar instrucción para ChatGPT">Copiar para IA</button></div></div></article>';
}
function matchesSearch(e,term) {
  if(!term)return true;
  return [e.id,e.title,e.description,e.recommended_for,e.variant,e.family,label(e.discovery_group),e.discovery_trigger,...(e.discovery_tags||[])].some(value=>normalize(value).includes(term));
}
function renderCatalog() {
  const term=normalize(search.value.trim());
  const found=entries.filter(e=>(filter==="all"||e.discovery_group===filter)&&matchesSearch(e,term));
  const groupIds=filter==="all"?groups.map(g=>g.id):[filter];
  root.innerHTML=groupIds.map(group=>{
    const subset=found.filter(e=>e.discovery_group===group);
    if(!subset.length)return "";
    const heading=filter==="all"?'<div class="collection-heading"><span>'+escapeHTML(label(group))+'</span><small>'+subset.length+' efectos</small></div>':"";
    return heading+subset.map(e=>card(e,entries.indexOf(e))).join("");
  }).join("");
  document.querySelector("#empty-state").hidden=found.length>0;
  count.textContent=found.length+" DE "+entries.length+" COMPONENTES";
}
function renderFavorites() {
  const selected=entries.filter(e=>favorites.has(e.id));
  favoriteGrid.innerHTML=selected.map(e=>card(e,entries.indexOf(e))).join("");
  favoriteEmpty.hidden=selected.length>0;
  document.querySelector("#favorites-count").textContent=selected.length+" GUARDADO"+(selected.length===1?"":"S");
  document.querySelector("#copy-favorites").disabled=selected.length===0;
  document.querySelector("#side-favorite-count").textContent=String(selected.length);
  document.querySelector("#header-favorite-count").textContent=String(selected.length);
}
function refreshHeartButtons() {
  document.querySelectorAll("[data-favorite-id]").forEach(button=>{
    const e=entries.find(item=>item.id===button.dataset.favoriteId);
    if(!e)return;
    const saved=favorites.has(e.id);
    const value=(saved?"Quitar de favoritos: ":"Guardar en favoritos: ")+e.title;
    button.classList.toggle("is-saved",saved);
    button.setAttribute("aria-pressed",String(saved));
    button.setAttribute("aria-label",value);
    button.title=value;
  });
}
function updateFavorites(id,source) {
  if(!entries.some(e=>e.id===id))return;
  const wasSaved=favorites.has(id);
  if(wasSaved)favorites.delete(id);else favorites.add(id);
  const persisted=saveFavorites(favorites);
  renderFavorites();
  refreshHeartButtons();
  if(source==="favorites" && wasSaved)document.querySelector("#favorites-title").focus?.({preventScroll:true});
  notify(persisted?(wasSaved?"Quitado de favoritos":"Guardado en favoritos"):"Cambio temporal: este navegador no permite guardar preferencias");
}
function setFilter(value) {
  filter=value;
  document.querySelectorAll("[data-category]").forEach(button=>{
    const selected=button.dataset.category===value;
    button.classList.toggle("active",selected);
    button.setAttribute("aria-pressed",String(selected));
  });
  document.querySelectorAll("[data-side-filter]").forEach(link=>link.classList.toggle("current",link.dataset.sideFilter===value));
  renderCatalog();
}
function setupFilters() {
  const all=[{id:"all",label:"Todos"},...groups];
  filters.innerHTML=all.map(g=>'<button type="button" class="filter'+(g.id==="all"?" active":"")+'" data-category="'+escapeHTML(g.id)+'" aria-pressed="'+(g.id==="all")+'">'+escapeHTML(g.label)+'</button>').join("");
  nav.innerHTML='<a class="side-link favorites-link" href="#favorites">♡ Mis favoritos <span id="side-favorite-count">0</span></a>'+
    all.map(g=>'<a class="side-link'+(g.id==="all"?" current":"")+'" data-side-filter="'+escapeHTML(g.id)+'" href="#library">'+escapeHTML(g.id==="all"?"Todos los componentes":g.label)+' <span>'+entries.filter(e=>g.id==="all"||e.discovery_group===g.id).length+'</span></a>').join("");
}
async function init() {
  try {
    const response=await fetch("../registry/components.json");
    if(!response.ok)throw Error("No disponible");
    const registry=await response.json();
    entries=registry.entries||[];
    groups=registry.discovery_groups||[];
    if(!entries.length||!groups.length)throw Error("Falta la clasificación de componentes");
    favorites=loadFavorites(new Set(entries.map(e=>e.id)));
    document.querySelector("#count-total").textContent=pad(entries.length);
    document.querySelector("#count-categories").textContent=pad(groups.length);
    document.querySelector("#count-tested").textContent=pad(entries.filter(e=>e.catalog_qa_status==="passed_internal").length);
    setupFilters();renderCatalog();renderFavorites();
    search.addEventListener("input",renderCatalog);
    filters.addEventListener("click",event=>{
      const button=event.target.closest("[data-category]");
      if(button)setFilter(button.dataset.category);
    });
    nav.addEventListener("click",event=>{
      const link=event.target.closest("[data-side-filter]");
      if(link)setFilter(link.dataset.sideFilter);
    });
    document.addEventListener("click",event=>{
      const button=event.target.closest("[data-favorite-id]");
      if(button)updateFavorites(button.dataset.favoriteId,button.closest("#favorites-grid")?"favorites":"catalog");
      const promptButton=event.target.closest("[data-prompt]");
      if(promptButton){const e=entries.find(item=>item.id===promptButton.dataset.prompt);if(e)copy(instruction(e),"Instrucción para ChatGPT");}
    });
    document.querySelector("#copy-favorites").addEventListener("click",()=>{
      const list=entries.filter(e=>favorites.has(e.id)).map(e=>e.id);
      if(list.length)copy("ATREZZO — Mis componentes favoritos:\n"+list.join("\n")+"\n\nUtiliza solo el ID indicado al integrar un efecto. Consulta la ficha correspondiente y audita el repositorio del cliente.","Lista de favoritos");
    });
    document.querySelector("#copy-example").addEventListener("click",()=>{
      const e=entries.find(item=>favorites.has(item.id))||entries[0];
      if(e)copy(instruction(e),"Instrucción de ejemplo");
    });
    listenFavorites(()=>{
      favorites=loadFavorites(new Set(entries.map(e=>e.id)));
      renderFavorites();refreshHeartButtons();
    });
  } catch(error) {
    root.innerHTML='<p class="loading-catalog">No se pudo cargar el catálogo. <a href="../registry/components.json">Consultar el registro técnico</a></p>';
    count.textContent="REGISTRO NO DISPONIBLE";
    console.error("ATREZZO catalog:",error);
  }
}
init();

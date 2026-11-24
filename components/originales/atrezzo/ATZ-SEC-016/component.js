// Standalone document owns the lifecycle; original global query helpers.
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
initHeader();initFilm();
const menu=document.getElementById('menu-dialog');
document.querySelector('[data-open="menu-dialog"]').addEventListener('click',()=>openDialog('menu-dialog'));
menu.querySelector('[data-close]').addEventListener('click',()=>closeDialog(menu));
menu.addEventListener('close',()=>{if(!document.querySelector('dialog[open]'))document.body.style.overflow='';});
menu.addEventListener('click',e=>{if(e.target.closest('a'))closeDialog(menu);});

/* Elegant Massage: contact sheet selection without popups or scroll locks. */
(()=>{
'use strict';
const root=document.querySelector('[data-em-contact-sheet]');
if(!root)return;
const buttons=[...root.querySelectorAll('[data-em-photo]')];
const frame=root.querySelector('[data-em-featured-frame]');
const main=root.querySelector('[data-em-featured-image]');
const title=root.querySelector('[data-em-featured-title]');
const description=root.querySelector('[data-em-featured-description]');
const count=root.querySelector('[data-em-featured-count]');
const prev=root.querySelector('[data-em-gallery-prev]');
const next=root.querySelector('[data-em-gallery-next]');
if(!buttons.length||!frame||!main||!title||!description||!count)return;
let selected=0,request=0;
function activate(index){
  const i=(index+buttons.length)%buttons.length;
  const button=buttons[i];
  if(!button)return;
  const src=button.dataset.src;
  if(!src)return;
  const id=++request;
  const commit=()=>{
    if(id!==request)return;
    selected=i;
    main.src=src;
    main.alt=button.dataset.alt||button.dataset.title||'Illustrative studio image';
    title.textContent=button.dataset.title||'Studio image slot';
    description.textContent=button.dataset.description||'Illustrative image; actual location not configured.';
    count.textContent=String(i+1).padStart(2,'0')+' / '+String(buttons.length).padStart(2,'0');
    buttons.forEach((item,n)=>item.setAttribute('aria-pressed',String(n===i)));
    frame.classList.remove('is-changing');
  };
  if(main.getAttribute('src')===src){commit();return}
  frame.classList.add('is-changing');
  const image=new Image();
  image.onload=commit;
  image.onerror=()=>{if(id===request)frame.classList.remove('is-changing')};
  image.src=src;
}
buttons.forEach((button,i)=>{
  button.addEventListener('click',()=>activate(i));
  button.addEventListener('keydown',e=>{
    if(e.key!=='ArrowLeft'&&e.key!=='ArrowRight')return;
    e.preventDefault();
    const target=(i+(e.key==='ArrowRight'?1:-1)+buttons.length)%buttons.length;
    buttons[target].focus();
    activate(target);
  });
});
prev?.addEventListener('click',()=>activate(selected-1));
next?.addEventListener('click',()=>activate(selected+1));
activate(0);
})();

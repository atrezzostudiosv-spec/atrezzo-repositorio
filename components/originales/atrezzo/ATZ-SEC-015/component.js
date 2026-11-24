// Original engine expects the two query helpers from ui.js; standalone document owns its lifecycle.
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
initCollection();

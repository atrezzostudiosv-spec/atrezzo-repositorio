import {mountPattern,split,enter,shuffled,clamp,ease,graphemes} from './runtime.js';
export const id='ATZ-MOT-013';
export function mount(host){return mountPattern(host,id,ctx=>{const {node,add}=ctx;for(const group of node.querySelectorAll('[data-group]')){const units=[...group.children];enter(ctx,group,units,()=>[{opacity:0,transform:'translateY(20px)'},{opacity:1,transform:'translateY(0)'}],120,700);ctx.listen(group,'focusin',()=>{for(const el of units)el.getAnimations().forEach(a=>{try{a.finish();}catch{}});});}});}

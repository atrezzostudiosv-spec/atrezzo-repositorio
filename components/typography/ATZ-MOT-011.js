import {mountPattern,split,enter,shuffled,clamp,ease,graphemes} from './runtime.js';
export const id='ATZ-MOT-011';
export function mount(host){return mountPattern(host,id,ctx=>{const {node,add}=ctx;for(const el of node.querySelectorAll('[data-alternate]')){const parts=split(el);add(parts.restore);enter(ctx,el,parts.units,i=>[{opacity:0,transform:`translateY(${i%2?10:-10}px)`,filter:'blur(5px)'},{opacity:1,transform:'translateY(0)',filter:'blur(0px)'}],42,700);}});}

// Adapter for the exact original Three.js r128 module factory.
import "./three-r128.original.js";
const out={};
const entry=globalThis.TURBOPACK.find(e=>e[1]===32009);
if(!entry)throw Error("Original Three.js factory unavailable");
entry[2]({s(items){for(let i=0;i<items.length;){const key=items[i++],kind=items[i++];if(kind===0)out[key]=items[i++];else if(typeof kind==="function")Object.defineProperty(out,key,{get:kind,enumerable:true});else throw Error("Unknown original Three export "+key);}}});
export default out;

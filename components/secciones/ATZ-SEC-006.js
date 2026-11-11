/* ATZ-SEC-006 — Depth Chapters; original scroll formulas retained in shared family engine. */
import {AtrezzoScrollSections02} from './ats2-engine.js';
export const id='ATZ-SEC-006';
export const variant='depth';
export function mount(host,options={}){
  if(!(host instanceof Element))throw new TypeError('ATZ-SEC-006: Element required');
  const selector='[data-atz-id="ATZ-SEC-006"]';
  const root=host.matches(selector)?host:host.querySelector(selector);
  if(!root)throw new Error('ATZ-SEC-006: HTML scope missing');
  return AtrezzoScrollSections02.init(root,options);
}

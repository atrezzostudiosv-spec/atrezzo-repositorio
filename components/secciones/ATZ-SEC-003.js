/* ATZ-SEC-003 — Sequence; original scroll progress formulas retained in shared family engine. */
import {AtrezzoScrollSections} from './ats1-engine.js';
export const id='ATZ-SEC-003';
export const variant='sequence';
export function mount(host,options={}){
  if(!(host instanceof Element))throw new TypeError('ATZ-SEC-003: Element required');
  const selector='[data-atz-id="ATZ-SEC-003"]';
  const root=host.matches(selector)?host:host.querySelector(selector);
  if(!root)throw new Error('ATZ-SEC-003: HTML scope missing');
  return AtrezzoScrollSections.init(root,options);
}

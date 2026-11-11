/* ATZ-SEC-005 — Horizontal Filmstrip; original scroll formulas retained in shared family engine. */
import {AtrezzoScrollSections02} from './ats2-engine.js';
export const id='ATZ-SEC-005';
export const variant='film';
export function mount(host,options={}){
  if(!(host instanceof Element))throw new TypeError('ATZ-SEC-005: Element required');
  const selector='[data-atz-id="ATZ-SEC-005"]';
  const root=host.matches(selector)?host:host.querySelector(selector);
  if(!root)throw new Error('ATZ-SEC-005: HTML scope missing');
  return AtrezzoScrollSections02.init(root,options);
}

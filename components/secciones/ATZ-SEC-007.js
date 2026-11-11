/* ATZ-SEC-007 — Full-Bleed Chapters; original native-scroll progress math retained. */
import {mountAts3} from './ats3-engine.js';
export const id='ATZ-SEC-007';
export const variant='full';
export function mount(host){
  if(!(host instanceof Element))throw new TypeError('ATZ-SEC-007: Element required');
  const selector='[data-atz-id="ATZ-SEC-007"]';
  const root=host.matches(selector)?host:host.querySelector(selector);
  if(!root)throw new Error('ATZ-SEC-007: HTML scope missing');
  return mountAts3(root);
}

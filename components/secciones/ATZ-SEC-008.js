/* ATZ-SEC-008 — Editorial Layered Panels; original native-scroll progress math retained. */
import {mountAts3} from './ats3-engine.js';
export const id='ATZ-SEC-008';
export const variant='panel';
export function mount(host){
  if(!(host instanceof Element))throw new TypeError('ATZ-SEC-008: Element required');
  const selector='[data-atz-id="ATZ-SEC-008"]';
  const root=host.matches(selector)?host:host.querySelector(selector);
  if(!root)throw new Error('ATZ-SEC-008: HTML scope missing');
  return mountAts3(root);
}

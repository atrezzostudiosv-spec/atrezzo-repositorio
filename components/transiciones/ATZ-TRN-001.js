/* ATZ-TRN-001 — isolated ATREZZO motion variant.
 * Adapted from Codrops OnScrollLayoutFormations, MIT license.
 * See sources/codrops-layout-formations/LICENSE.
 */
import { mountScene } from "../runtime/lifecycle.js";

const animateFrame = (root, gsap) => {
  const frame = root.querySelector('.frame'); 
  const frameTitle = frame.querySelector('.frame__title');
  
  return gsap.timeline({
    defaults: {
      ease: 'none'
    },
    scrollTrigger: {
      trigger: frame,
      start: 'clamp(top bottom)', 
      end: 'bottom top',
      scrub: true
    }
  })
  .to(frame, {
    yPercent: 35,
    scale: 0.95,
    startAt: { filter: 'brightness(100%)' },
    filter: 'brightness(30%)'
  })
  .to(frameTitle, {
    xPercent: -80
  }, 0);
};

export const id="ATZ-TRN-001";
export const variant="frame";
export const selector=".frame";
export function mount(host,options={}) {
  return mountScene(host,selector,animateFrame,options);
}

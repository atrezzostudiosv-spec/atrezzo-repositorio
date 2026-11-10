/* ATZ-SCR-009 — isolated ATREZZO motion variant.
 * Adapted from Codrops OnScrollLayoutFormations, MIT license.
 * See sources/codrops-layout-formations/LICENSE.
 */
import { mountScene } from "../runtime/lifecycle.js";

const animateEighthGrid = (root, gsap) => {
  const grid = root.querySelector('[data-grid-eighth]');
  const gridImages = grid.querySelectorAll('.grid__img');
  
  return gsap.timeline({
    defaults: {
      ease: 'expo'
    },
    scrollTrigger: {
      trigger: grid,
      start: 'center center',
      end: '+=250%',
      pin: grid.parentNode,
      scrub: true,
    }
  })
  .set(grid, {perspective: 2000})
  .from(gridImages, {
    stagger: {
      amount: 0.8,
      from: 'start'
    },
    rotationY: 65,
    transformOrigin: '0% 50%',
    z: -200,
    yPercent: 10 
  })
  .from(gridImages, {
    stagger: {
      amount: 0.8,
      from: 'start'
    },
    duration: 0.2,
    autoAlpha: 0
  }, 0);
};

export const id="ATZ-SCR-009";
export const variant="eighth";
export const selector="[data-grid-eighth]";
export function mount(host,options={}) {
  return mountScene(host,selector,animateEighthGrid,options);
}

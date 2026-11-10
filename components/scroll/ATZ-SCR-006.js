/* ATZ-SCR-006 — isolated ATREZZO motion variant.
 * Adapted from Codrops OnScrollLayoutFormations, MIT license.
 * See sources/codrops-layout-formations/LICENSE.
 */
import { mountScene } from "../runtime/lifecycle.js";

const animateFifthGrid = (root, gsap) => {
  const grid = root.querySelector('[data-grid-fifth]');
  const gridImages = grid.querySelectorAll('.grid__img');
  
  return gsap.timeline({
    defaults: {
      ease: 'sine'
    },
    scrollTrigger: {
      trigger: grid,
      start: 'center center',
      end: '+=250%',
      pin: grid.parentNode,
      scrub: 0.3,
    }
  })
  .set(grid, {perspective: 1000})
  .from(gridImages, {
    stagger: {
      amount: 0.4,
      from: 'random',
      grid: [4,9]
    },
    y: window.innerHeight,
    rotationX: -70,
    transformOrigin: '50% 0%',
    z: -900,
    autoAlpha: 0
  });
};

export const id="ATZ-SCR-006";
export const variant="fifth";
export const selector="[data-grid-fifth]";
export function mount(host,options={}) {
  return mountScene(host,selector,animateFifthGrid,options);
}

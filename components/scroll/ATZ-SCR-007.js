/* ATZ-SCR-007 — isolated ATREZZO motion variant.
 * Adapted from Codrops OnScrollLayoutFormations, MIT license.
 * See sources/codrops-layout-formations/LICENSE.
 */
import { mountScene } from "../runtime/lifecycle.js";

const animateSixthGrid = (root, gsap) => {
  const grid = root.querySelector('[data-grid-sixth]');
  const gridImages = grid.querySelectorAll('.grid__img');
  
  return gsap.timeline({
    defaults: {
      ease: 'none'
    },
    scrollTrigger: {
      trigger: grid,
      start: 'center center',
      end: '+=200%',
      pin: grid.parentNode,
      scrub: 0.5,
    }
  })
  .from(gridImages, {
    stagger: {
      amount: 0.03,
      from: 'edges',
      grid: [3,3]
    },
    scale: 0.7,
    autoAlpha: 0
  })
  .from(grid, {
    scale: .7,
    skewY: 5,
  }, 0);
};

export const id="ATZ-SCR-007";
export const variant="sixth";
export const selector="[data-grid-sixth]";
export function mount(host,options={}) {
  return mountScene(host,selector,animateSixthGrid,options);
}

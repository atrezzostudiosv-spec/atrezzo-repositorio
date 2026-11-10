/* ATZ-SCR-001 — isolated ATREZZO motion variant.
 * Adapted from Codrops OnScrollLayoutFormations, MIT license.
 * See sources/codrops-layout-formations/LICENSE.
 */
import { mountScene } from "../runtime/lifecycle.js";

const animateFirstGrid = (root, gsap) => {
  const grid = root.querySelector('[data-grid-first]');
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
      scrub: 0.5,
    }
  })
  .from(gridImages, {
    stagger: 0.07,
    y: () => gsap.utils.random(window.innerHeight, window.innerHeight * 1.8)
  })
  // text content
  .from(grid.parentNode.querySelector('.content__title'), {
    duration: 1.2,
    ease: 'power4',
    yPercent: 180,
    autoAlpha: 0
  }, 0.8);
};

export const id="ATZ-SCR-001";
export const variant="first";
export const selector="[data-grid-first]";
export function mount(host,options={}) {
  return mountScene(host,selector,animateFirstGrid,options);
}

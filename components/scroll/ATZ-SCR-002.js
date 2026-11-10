/* ATZ-SCR-002 — isolated ATREZZO motion variant.
 * Adapted from Codrops OnScrollLayoutFormations, MIT license.
 * See sources/codrops-layout-formations/LICENSE.
 */
import { mountScene } from "../runtime/lifecycle.js";

const animateSecondGrid = (root, gsap) => {
  const grid = root.querySelector('[data-grid-second]');
  const gridImages = grid.querySelectorAll('.grid__img');
  const middleIndex = Math.floor(gridImages.length / 2);

  return gsap.timeline({
    defaults: {
      ease: 'power3'
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
    stagger: {
      amount: 0.3,
      from: 'center'
    },
    y: window.innerHeight,
    transformOrigin: '50% 0%',
    rotation: pos => {
      const distanceFromCenter = Math.abs(pos - middleIndex);
      return pos < middleIndex ? distanceFromCenter * 3 : distanceFromCenter * -3;
    },
  })
  // text content
  .from(grid.querySelectorAll('.grid__item'), {
    stagger: {
      amount: 0.3,
      from: 'center'
    },
    yPercent: 100,
    autoAlpha: 0
  }, 0);
};

export const id="ATZ-SCR-002";
export const variant="second";
export const selector="[data-grid-second]";
export function mount(host,options={}) {
  return mountScene(host,selector,animateSecondGrid,options);
}

/* ATZ-SCR-003 — isolated ATREZZO motion variant.
 * Adapted from Codrops OnScrollLayoutFormations, MIT license.
 * See sources/codrops-layout-formations/LICENSE.
 */
import { mountScene } from "../runtime/lifecycle.js";

const animateThirdGrid = (root, gsap) => {
  const grid = root.querySelector('[data-grid-third]');
  const gridImages = grid.querySelectorAll('.grid__img');

  return gsap.timeline({
    defaults: {
      ease: 'power3'
    },
    scrollTrigger: {
      trigger: grid,
      start: 'center center',
      end: '+=200%',
      pin: grid.parentNode,
      scrub: 0.2,
    }
  })
  .from(gridImages, {
    stagger: 0.06,
    y: window.innerHeight,
    rotation: () => gsap.utils.random(-15,15),
    transformOrigin: '50% 0%'
  })
  .fromTo(gridImages, {
    filter: 'brightness(100%)'
  }, {
    ease: 'none',
    stagger: 0.06,
    filter: pos => pos < gridImages.length-1 ? 'brightness(20%)' : 'brightness(100%)'
  }, 0)
  // text content
  .from(grid.querySelectorAll('.grid__item'), {
    xPercent: pos => pos%2 ? 100 : -100,
    autoAlpha: 0
  }, 0.06*gridImages.length);
};

export const id="ATZ-SCR-003";
export const variant="third";
export const selector="[data-grid-third]";
export function mount(host,options={}) {
  return mountScene(host,selector,animateThirdGrid,options);
}

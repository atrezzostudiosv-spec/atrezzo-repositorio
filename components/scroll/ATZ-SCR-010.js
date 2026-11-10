/* ATZ-SCR-010 — isolated ATREZZO motion variant.
 * Adapted from Codrops OnScrollLayoutFormations, MIT license.
 * See sources/codrops-layout-formations/LICENSE.
 */
import { mountScene } from "../runtime/lifecycle.js";

const animateNinthGrid = (root, gsap) => {
  const grid = root.querySelector('[data-grid-ninth]');
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
      scrub: true,
    }
  })
  .from(gridImages, {
    transformOrigin: '100% -450%',
    stagger: 0.07,
    scaleX: 1.05,
    skewX: 15,
    xPercent: 50,
    rotation: -10,
    autoAlpha: 0
  });
};

export const id="ATZ-SCR-010";
export const variant="ninth";
export const selector="[data-grid-ninth]";
export function mount(host,options={}) {
  return mountScene(host,selector,animateNinthGrid,options);
}

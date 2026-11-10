/* ATZ-SCR-008 — isolated ATREZZO motion variant.
 * Adapted from Codrops OnScrollLayoutFormations, MIT license.
 * See sources/codrops-layout-formations/LICENSE.
 */
import { mountScene } from "../runtime/lifecycle.js";

const animateSeventhGrid = (root, gsap) => {
  const grid = root.querySelector('[data-grid-seventh]');
  const gridImages = grid.querySelectorAll('.grid__img');
  
  return gsap.timeline({
    defaults: {
      ease: 'power1'
    },
    scrollTrigger: {
      trigger: grid,
      start: 'center center',
      end: '+=150%',
      pin: grid.parentNode,
      scrub: 0.5,
    }
  })
  .fromTo(gridImages, {
    yPercent: -102,
    //filter: 'brightness(300%) contrast(480%)'
  }, {
    stagger: 0.08,
    yPercent: 0,
    //filter: 'brightness(100%) contrast(100%)'
  })
  .from([...gridImages].map(img => img.querySelector('.grid__img-inner')), {
    stagger: 0.08,
    yPercent: 102,
  }, 0)
  // text content
  .from(grid.querySelectorAll('.grid__item'), {
    yPercent: 20,
    stagger: gridImages.length/2*0.08,
    autoAlpha: 0,
  }, 0);
};

export const id="ATZ-SCR-008";
export const variant="seventh";
export const selector="[data-grid-seventh]";
export function mount(host,options={}) {
  return mountScene(host,selector,animateSeventhGrid,options);
}

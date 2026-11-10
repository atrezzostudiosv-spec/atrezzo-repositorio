/* ATZ-SCR-005 — isolated ATREZZO motion variant.
 * Adapted from Codrops OnScrollLayoutFormations, MIT license.
 * See sources/codrops-layout-formations/LICENSE.
 */
import { mountScene } from "../runtime/lifecycle.js";

const calculateInitialTransform = (element, offsetDistance = 250, maxRotation = 300, maxZTranslation = 2000) => {
  const viewportCenter = { width: window.innerWidth / 2, height: window.innerHeight / 2 };
  const elementCenter = { 
    x: element.offsetLeft + element.offsetWidth / 2, 
    y: element.offsetTop + element.offsetHeight / 2 
  };

  // Calculate the angle between the center of the element and the center of the viewport
  const angle = Math.atan2(Math.abs(viewportCenter.height - elementCenter.y), Math.abs(viewportCenter.width - elementCenter.x));

  // Calculate the x and y translation based on the angle and distance
  const translateX = Math.abs(Math.cos(angle) * offsetDistance);
  const translateY = Math.abs(Math.sin(angle) * offsetDistance);

  // Calculate the maximum possible distance from the center (diagonal of the viewport)
  const maxDistance = Math.sqrt(Math.pow(viewportCenter.width, 2) + Math.pow(viewportCenter.height, 2));

  // Calculate the current distance from the center
  const currentDistance = Math.sqrt(Math.pow(viewportCenter.width - elementCenter.x, 2) + Math.pow(viewportCenter.height - elementCenter.y, 2));

  // Scale rotation and Z-translation based on distance from the center (closer elements rotate/translate less, farther ones rotate/translate more)
  const distanceFactor = currentDistance / maxDistance;

  // Calculate the rotation values based on the position relative to the center
  const rotationX = ((elementCenter.y < viewportCenter.height ? -1 : 1) * (translateY / offsetDistance) * maxRotation * distanceFactor);
  const rotationY = ((elementCenter.x < viewportCenter.width ? 1 : -1) * (translateX / offsetDistance) * maxRotation * distanceFactor);

  // Calculate the Z-axis translation (depth) based on the distance from the center
  const translateZ = maxZTranslation * distanceFactor;

  // Determine direction based on position relative to the viewport center
  return {
    x: elementCenter.x < viewportCenter.width ? -translateX : translateX,
    y: elementCenter.y < viewportCenter.height ? -translateY : translateY,
    z: translateZ,
    rotateX: rotationX,
    rotateY: rotationY
  };
};

const animateFourthV2Grid = (root, gsap) => {
  const grid = root.querySelector('[data-grid-fourth-v2]');
  const gridImages = grid.querySelectorAll('.grid__img');

  return gsap.timeline({
    defaults: {
      ease: 'power4',
    },
    scrollTrigger: {
      trigger: grid,
      start: 'center center',
      end: '+=200%',
      pin: grid.parentNode,
      scrub: 0.2,
    }
  })
  .set(grid, {perspective: 1200}) // Add perspective for 3D effect
  .fromTo(gridImages, {
    // Define the starting position based on the pre-calculated translation, rotation, and Z-axis translation values
    x: (_, el) => calculateInitialTransform(el, 900).x,
    y: (_, el) => calculateInitialTransform(el, 600).y,
    z: (_, el) => calculateInitialTransform(el, 600, 300, -3000).z, // Z-axis translation
    rotateX: (_, el) => calculateInitialTransform(el, 250, -160, -3000).rotateX,
    rotateY: (_, el) => calculateInitialTransform(el, 250, -160, -3000).rotateY,
    autoAlpha: 0,
    scale: 0.4,
  }, {
    x: 0,
    y: 0,
    z: 0,
    rotateX: 0,
    rotateY: 0,
    autoAlpha: 1,
    scale: 1,
    stagger: {
      amount: 0.15,
      from: 'center',
      grid: [4, 9]
    }
  })
};

export const id="ATZ-SCR-005";
export const variant="fourth-v2";
export const selector="[data-grid-fourth-v2]";
export function mount(host,options={}) {
  return mountScene(host,selector,animateFourthV2Grid,options);
}

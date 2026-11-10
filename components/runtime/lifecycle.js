/* ATREZZO shared lifecycle — mounts one selected component only. */
export function mountScene(host, selector, animationFunction, {
  gsap = globalThis.gsap,
  ScrollTrigger = globalThis.ScrollTrigger,
  mobileMax = 700
} = {}) {
  if (!(host instanceof Element)) throw new TypeError("ATREZZO: host must be an Element");
  const target = host.matches(selector) ? host : host.querySelector(selector);
  if (!target) throw new Error("ATREZZO: missing selector "+selector+" in this instance");
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  const compact = matchMedia("(max-width: "+mobileMax+"px)");
  const canAnimate = Boolean(gsap && ScrollTrigger && typeof gsap.context === "function");
  let context;
  let mode = "static";
  const scopedRoot = {
    querySelector(query) { return host.matches(query) ? host : host.querySelector(query); }
  };
  function refresh() {
    if (context) { context.revert(); context=undefined; }
    if (reduced.matches || compact.matches) { mode="static"; return; }
    if (!canAnimate) { mode="unavailable"; return; }
    gsap.registerPlugin(ScrollTrigger);
    context = gsap.context(() => { animationFunction(scopedRoot,gsap); }, host);
    mode="animated";
    ScrollTrigger.refresh();
  }
  reduced.addEventListener("change",refresh);
  compact.addEventListener("change",refresh);
  refresh();
  return {
    get mode() { return mode; },
    refresh,
    destroy() {
      reduced.removeEventListener("change",refresh);
      compact.removeEventListener("change",refresh);
      if(context) context.revert();
      context=undefined;
      mode="destroyed";
    }
  };
}

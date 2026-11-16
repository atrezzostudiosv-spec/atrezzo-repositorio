# ATZ-SEC-010 — Connected Portfolio

Original TRIONN Work line engine, approved visually in the private original demonstration by the user on 2026-11-16. This folder is an actual standalone component package, not a redirect. Public package includes the client-authorized original animation algorithm and the exact captured Three.js r128 module (MIT); no TRIONN project images, fonts or original sound recording are published. Neutral vector project placeholders are demo-only.

## Preview
Open index.html through an HTTP server or GitHub Pages. No TRIONN site, Codespaces or ZIP required. WebGL2 required for animation. Reduced motion leaves all content visible.

## Use
Edit projects.json (titles, descriptions, image paths, links, left/right/center, small/medium/large/xlarge). Optional audioUrl must point to an authorized recording; null disables sound. The original native-scroll fallback is used by default. The original engine can also accept a compatible ScrollSmoother instance via mount(config,{scrollSmoother}). One full-page instance per document: the original engine uses global canvas IDs and document selectors. Do not mount multiple instances without a separately validated refactor.

## Files
- engine.original.js — original constants, layout and animation block copied verbatim from TRIONN module 88943; optional audio URL adapter outside the original block.
- three-r128.original.js — captured module 32009; Three.js r128, MIT.
- three-adapter.js — minimal factory loader, no Next.js needed.
- component.js — project data, initialization, teardown, reduced-motion adapter.
- component.css — original card rules + standalone demo layout.
- index.html / projects.json — independent preview.
- LICENSE-three.txt — third-party license.
- manifest.json — source provenance and validation state.

## Status
Original private demonstration approved; public standalone adaptation not yet browser-certified. No claim of full responsive, cross-browser, client production or pixel-identical layout validation. Original GSAP/ScrollSmoother runtime and original sound are deliberately not distributed in this public package. The original renderer, curves, timings and random spark logic remain intact.

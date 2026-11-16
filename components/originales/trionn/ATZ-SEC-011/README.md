# ATZ-SEC-011 — WebGL Image Wave

Originales / TRIONN / 02. Approved visually by the user on 2026-11-16. The exact original module 64741 is preserved byte for byte (c6b3689b8035c7b1261bfff7aa09b848a6b91b81). Private reference Chromium QA completed successfully: https://github.com/atrezzostudiosv-spec/trionn/actions/runs/43867635922. The public package replaces client media with illustrative SVGs and loads official GSAP 3.15.0 / ScrollTrigger 3.15.0 instead of the captured bundle. Public package QA is tracked independently.

## Integration
Copy all files in manifest.json; serve over HTTP. Open index.html or export with `node scripts/export-component.mjs ATZ-SEC-011 --out ./salida`. Modify projects.json (title, description, position, size, image). Preserve the 32×24 plane, shaders, three-second introduction, hover deformation and settle, visibility tracking, and GSAP ticker. The original module is loaded by the thin adapter component.js. Keep one full-page instance because the canvas and renderer are global. Use authorized same-origin images with reserved aspect ratio. Keep GSAP and ScrollTrigger at 3.15.0, or verify compatibility before upgrading. Verify WebGL2, mobile, reverse scroll, hover, reduced motion, teardown, and static image fallback before publishing a client site. Do not combine with Connected Portfolio without separate integration QA.

## Licensing
GSAP and ScrollTrigger 3.15.0 are loaded from the official npm distribution via jsDelivr; not bundled or relicensed. GreenSock/Webflow standard license: https://gsap.com/standard-license. Original captured GSAP bundle remains private. Three.js r128 is included under MIT; see LICENSE-three.txt. Demo SVGs are newly authored illustrations, not TRIONN assets.

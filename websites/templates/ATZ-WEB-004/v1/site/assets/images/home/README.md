# Home service scenes — 308 Construction design demo

Six original client-supplied WebP assets uploaded and integrated on **2026-10-26**.

| Scene | Desktop, 2048 × 1152 | Mobile, 941 × 1672 |
|---|---|---|
| 01 / Preconstruction Planning | `preconstruction-desktop.webp` | `preconstruction-mobile.webp` |
| 02 / Construction | `construction-desktop.webp` | `construction-mobile.webp` |
| 03 / Construction Management | `management-desktop.webp` | `management-mobile.webp` |

Images are served locally from `./assets/images/home/`, unmodified from the uploaded originals. The Home `[data-scene="1"]`, `[data-scene="2"]` and `[data-scene="3"]` background containers use `<picture>` with `(max-width:767px)` mobile source and standard desktop fallback.

- Preserved scene text, internal service CTA, gradient overlay, existing scroll animation and reduced-motion behavior.
- CSS makes `<picture>` fill the existing `.chapter-background` without changing scene sizing.
- Photographs are **illustrative client-provided visuals**. They must not be labeled as 308 Construction staff or completed projects.
- Source code & Git object checks: **VERIFIED**. Actual deployed responsive image rendering/cropping at 375, 768, 1024 and 1440 px: **NOT YET VERIFIED**.

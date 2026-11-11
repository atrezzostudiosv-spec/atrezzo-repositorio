# ATZ-SVC-001 — Extracción de Service Bento 1+4 desde Tri-Lane Roofing

**Fecha:** 11 noviembre 2026.  
**Repositorio de origen:** https://github.com/atrezzostudiosv-spec/tri-lane-roofing  
**Ruta exacta:** `index.html`, sección `.tl-wwd-section` «WHAT WE DO».  
**Vista de origen:** https://atrezzostudiosv-spec.github.io/tri-lane-roofing/  
**ID en biblioteca:** `ATZ-SVC-001`.

## Decisión creativa y técnica

Extraer **una composición de servicios**, no una plantilla de empresa de roofing. El patrón responde al problema de comercializar una especialidad protagonista y cuatro servicios relacionados, con CTA claro y una experiencia táctil móvil. Es una familia **Servicios**, no «Scroll & Motion», porque la interacción principal es la composición y la navegación por servicios.

El origen es una **demo comercial/propuesta de diseño de ATREZZO**, no un website oficial contratado o aceptado por el negocio. Su propio archivo de continuidad y `docs/final-qa-closeout-2026-10-22.md` confirman controles técnicos del sitio de demostración; esto NO prueba aprobación comercial del cliente.

## Contrato visual preservado

- Desktop: contenedor máximo 1280px, espaciado 24px, grid `1.24fr / 1fr`, gap 14px, cuatro secundarios en `2×2`.
- Tarjetas: radio 12px, contorno #55616A, fondo #171B1E, naranja de origen #F58620; una tarjeta principal con lista y CTA, cuatro tarjetas compactas con enlaces.
- Tablet hasta 1023px: columna protagonista completa y secundarios en dos columnas.
- Móvil hasta 767px: carrusel horizontal de cinco tarjetas, ancho `min(82vw,350px)`, `scroll-snap` obligatorio, swipe nativo, teclado ArrowLeft/Right en el rail enfocado.
- Movimiento: entrada discreta mediante IntersectionObserver, 18px, 700ms y curva `cubic-bezier(.33,0,.2,1)`. Sin scrolljacking.
- Reducción de movimiento y ausencia de JavaScript: contenido y destinos accesibles sin ocultación forzada.

## Qué se extrajo y qué no

Se aislaron HTML, CSS, JS y runtime bajo `components/servicios/`, con cinco SVG de arquitectura dibujados para el catálogo. Los SVG **son ilustraciones de muestra**, no imágenes de obras reales. Se conservaron nombres de servicios solo como copy explicativo de la captura; en un negocio real todo el contenido debe reemplazarse según auditoría.

NO se copiaron fotografías, testimonios, logotipos, metadatos, formularios, Tailwind, FontAwesome, menús o JS global del sitio Tri-Lane. La preview puede cargar opcionalmente Barlow Condensed/Manrope desde Google Fonts para aproximar la identidad tipográfica de origen, pero el export independiente no depende de ellas.

El export por ID incluye 4 archivos funcionales y 5 SVG de muestra; sin variantes no relacionadas.

## QA de incorporación

- [Node y contrato de exportación aislada](https://github.com/atrezzostudiosv-spec/atrezzo-repositorio/actions/runs/43026373919) — **PASS**.
- [Chromium: 49 componentes × 4 resoluciones = 196 comprobaciones](https://github.com/atrezzostudiosv-spec/atrezzo-repositorio/actions/runs/43026373886) — **PASS**, incluyendo 375/768/1024/1440 para `ATZ-SVC-001`.
- Se verificó el CSS de grid desktop/tablet y el carrusel mobile; elementos/anchos sin overflow del documento; cinco SVG visibles y descargados; CTA hacia destinos reales de ejemplo; arrow-key scroll en mobile; reduced motion; fallback sin JS y desmontaje `destroy()`.
- QA visual reforzada después de detectar una captura prematura: se verificó **opacidad real** al acabar el revelado, no solo existencia en DOM; capturas de 1440 y 375 fueron revisadas.
- [GitHub Pages](https://github.com/atrezzostudiosv-spec/atrezzo-repositorio/actions/runs/43026373499) — **PASS**.

## Estado

**INGESTA CERRADA · DEMO PROBADA INTERNAMENTE**. `catalog_qa_status:passed_internal`, `status:validation` y `client_ready:false`. Pendiente certificación de uso dentro de una web de cliente, con sus contenidos/medios reales, pruebas Safari/iPhone y Firefox, y validación de rendimiento/SEO específica.

El proyecto de origen Tri-Lane no se ha modificado para realizar la extracción. La decisión de incluir patrones futuros se regirá por `ATREZZO-PROTOCOLO-EXTRACCION-DESDE-PROYECTOS.md`: valor y diferencia real antes que cantidad de componentes.

[Ver preview individual](https://atrezzostudiosv-spec.github.io/atrezzo-repositorio/catalog/preview.html?id=ATZ-SVC-001).

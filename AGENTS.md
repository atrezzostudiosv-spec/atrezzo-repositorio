# ATREZZO — Instrucciones operativas para IA

Este repositorio contiene **patrones**, no páginas completas para copiar. La verdad comercial, el diseño aprobado del cliente y los requisitos de accesibilidad prevalecen sobre el catálogo.

## Flujo obligatorio
1. Leer `registry/components.json` para encontrar el ID exacto, categoría, estado y comportamiento.
2. Consultar la ficha `technical_guide` del ID solicitado, no la descripción de una colección entera.
3. Auditar la estructura y dependencias del **repositorio del cliente** antes de incorporar código.
4. Si existen los campos `component_html`, `component_css`, `component_js` y `component_runtime`, **usar esos cuatro archivos aislados** para el ID solicitado. No importar el motor histórico ni las otras variantes. Consultar la fuente original únicamente para auditoría o corrección.
5. Adaptar paleta, fotografías autorizadas, copy real y dosis de movimiento M0–M3 a la marca. Nunca copiar sin criterio el conjunto de la demo.
6. Implementar fallback sin JavaScript y con `prefers-reduced-motion`; conservar scroll nativo y CTA accesibles.
7. Probar 375 / 768 / 1024 / 1440, móvil, teclado, scroll inverso, scroll rápido, errores JS, rendimiento e imágenes con licencia.
8. Registrar resultado en `ATREZZO-PROJECT-STATUS.md` del cliente. No declarar listo un efecto marcado `reference` o `validation` antes de su aprobación y verificación independiente.

## Cómo resolver una solicitud
Si dice “usa `ATZ-SCR-008`” significa **solo** el patrón `data-grid-seventh` y `animateSeventhGrid()`. No instalar las otras diez secuencias. No reemplazar ese movimiento por otro al interpretarlo.

## Licencias
Código original de Codrops incluido con licencia MIT en `sources/codrops-layout-formations/LICENSE`. Dependencias GSAP y ScrollTrigger, imágenes de demostración y fuentes deben verificarse por separado según su licencia y la implementación elegida.

## Demostración ≠ componente verificado
Las previews son muestras de una mecánica aislada. No certifican por sí solas estabilidad en un sitio de cliente ni accesibilidad de producción.

## Fase 3 — Importación autónoma
Para `ATZ-SCR-004`, usar `components/scroll/ATZ-SCR-004.html` + `components/runtime/atrezzo-motion.css` + `components/scroll/ATZ-SCR-004.js` (que importa `components/runtime/lifecycle.js`). La API del módulo individual es `mount(host,{gsap,ScrollTrigger})`; devolverá una instancia con `refresh()` y `destroy()`. Consulta `components/runtime/README.md`. Los 11 módulos siguen en `validation`, con `client_ready:false`.

## Fase 4 — Identificadores para ChatGPT

Leer `docs/AI-INTEGRATION-WORKFLOW.md`. Resolver el ID exacto en `registry/components.json`. Cuando exista terminal, `node scripts/resolve-component.mjs ATZ-SCR-008` devuelve el contrato JSON y `--prompt` la instrucción de integración. `node scripts/export-component.mjs ATZ-SCR-008 --out ./salida` prepara cuatro archivos aislados sin modificar el código del cliente. Demostración: `examples/ai-ATZ-SCR-008/`. No elegir otro ID, ni publicar una variante `validation` sin QA en cliente.

## Fase 5 — Navegación

Los IDs ATZ-NAV-001, ATZ-NAV-002 y ATZ-NAV-003 proceden de código original Atrezzo y no usan GSAP. Instalar solamente el HTML/CSS/JS del ID solicitado con `components/navegacion/runtime.js`, sin copiar otras variantes. Conservar navegación accesible sin JavaScript, scroll nativo, Escape, flechas o anclas según el patrón. No reutilizar las fotos originales de la demo sin licencia comercial.

## Sticky Sections 15: componentes aprobados por el usuario

El ZIP `ATREZZO_03_StickySections_15_MAC_LISTO(1).zip` aporta quince **efectos controlados por scroll**, identificados `ATZ-STK-001`…`ATZ-STK-015`. Son distintos de `ATZ-NAV-003`, que cambia de imagen mediante clic. Para cualquier STK importar **únicamente** `components/scroll/ATZ-STK-XXX.html`, `.js`, `components/runtime/atrezzo-sticky.css`, `components/runtime/sticky-lifecycle.js`; GSAP y ScrollTrigger deben estar disponibles. Respetar seis paneles, transformaciones y sincronización originales. La demo de origen usa Lenis global; no imponerlo sobre otros websites. Las imágenes de Annas Muslimin/Vecteezy del ZIP no están autorizadas automáticamente y se sustituyen por SVG abstractos en catálogo. **El diseño y movimiento aprobados son fuente maestra; no reinterpretar el efecto.**

# ATREZZO — Instrucciones operativas para IA

Este repositorio contiene **patrones**, no páginas completas para copiar. La verdad comercial, el diseño aprobado del cliente y los requisitos de accesibilidad prevalecen sobre el catálogo.

## Flujo obligatorio
1. Leer `registry/components.json` para encontrar el ID exacto, categoría, estado y comportamiento.
2. Consultar la ficha `technical_guide` del ID solicitado, no la descripción de una colección entera.
3. Auditar la estructura y dependencias del **repositorio del cliente** antes de incorporar código.
4. Extraer únicamente la sección HTML que coincide con `selector`, sus clases CSS relacionadas y la función indicada en `animation_function`; seguir importaciones y dependencias compartidas.
5. Adaptar paleta, fotografías autorizadas, copy real y dosis de movimiento M0–M3 a la marca. Nunca copiar sin criterio el conjunto de la demo.
6. Implementar fallback sin JavaScript y con `prefers-reduced-motion`; conservar scroll nativo y CTA accesibles.
7. Probar 375 / 768 / 1024 / 1440, móvil, teclado, scroll inverso, scroll rápido, errores JS, rendimiento e imágenes con licencia.
8. Registrar resultado en `ATREZZO-PROJECT-STATUS.md` del cliente. No declarar listo un efecto marcado `reference` o `validation` antes de su aprobación y verificación.

## Cómo resolver una solicitud
Si dice “usa `ATZ-SCR-008`” significa **solo** el patrón `data-grid-seventh` y `animateSeventhGrid()`. No instalar las otras diez secuencias. No reemplazar ese movimiento por otro al interpretarlo.

## Licencias
Código original de Codrops incluido con licencia MIT en `sources/codrops-layout-formations/LICENSE`. Dependencias GSAP y ScrollTrigger, imágenes de demostración y fuentes deben verificarse por separado según su licencia y la implementación elegida.

## Demostración ≠ componente verificado
Las previews son muestras de una mecánica aislada. No certifican por sí solas estabilidad en un sitio de cliente ni accesibilidad de producción.

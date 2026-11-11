# ATREZZO — Protocolo de extracción de componentes ya diseñados en proyectos

**Adoptado:** 11 noviembre 2026. **Primer caso práctico:** `ATZ-SVC-001`, Service Bento 1+4, de `atrezzostudiosv-spec/tri-lane-roofing/index.html`.

## Regla operativa

Se reutiliza **el patrón de diseño y comportamiento**, no una página ajena ni una plantilla específica de un sector. Cada extracción requiere una fuente verificable; la captura de pantalla solo guía el reconocimiento, no constituye por sí sola el código.

1. **Identificar fuente exacta:** repo, ruta, clase/sección, fecha y registro de QA. Distinguir diseño aprobado por Atrezzo, probado en demo y aceptado para producción comercial; son estados distintos.
2. **Auditar diferencias:** comparar con las entradas existentes, incluso paquetes ZIP originales que aún no estén registrados; crear componente nuevo solo si cambia realmente la interacción o composición útil.
3. **Separar:** extraer HTML, CSS y JavaScript con scope único; eliminar importaciones globales, Tailwind/fontawesome si no son esenciales, menú, navegación ajena, sobreescrituras del body y cualquier claim o fotografía no autorizada.
4. **Preservar contrato visual:** proporciones, breakpoints, secuencia de movimiento, easing, entrada/salida, estados hover/foco y comportamiento táctil; documentar ajustes de aislamiento. No ampliar animaciones sin justificación.
5. **Documentar contenido:** iconos, fotografía, titular y CTA del origen solo como referencia. En catálogo usar recursos propios explícitamente ilustrativos. Al integrar, sustituir por datos y recursos **confirmados** del cliente.
6. **Integrar por ID y categoría de uso:** elegir familia (`servicios`, `navegacion`, `galerias`, `heroes`, `tipografia`, `sticky`, `narrativa`, `transiciones`), filtros, favoritos, ficha técnica, fuente y prompt de exportación. Nunca poner una tarjeta de servicios en «Scroll & Motion» solo porque tenga un reveal.
7. **QA de catálogo:** test de estructura, exportación, enlaces, recursos visuales, teclado, mobile swipe cuando aplique, reduced-motion, sin JS, 375/768/1024/1440 y navegador real. Corregir errores antes de etiquetar «Demo probada».
8. **Cierre:** no tocar el repositorio original para extraer, registrar los IDs y evidencias en `ATREZZO-PROJECT-STATUS.md`. `client_ready:false` hasta implementación y QA en un negocio real con contenido definitivo.

## Filtro de valor antes de registrar

El patrón debe resolver un problema de UX/negocio reconocible, estar visualmente diferenciado y ser composable con otros componentes sin conflictos. Si la variante solo modifica colores o cambia una foto, **no es un componente nuevo**: es una configuración del mismo.

## Caso piloto ATZ-SVC-001

Fuente original: bloque `.tl-wwd-section`, Home Tri-Lane; demo comercial no oficial. Arquitectura `1.24fr / 1fr` y cuatro secundarios `2×2` de escritorio; en móvil, carrusel `scroll-snap` de cinco tarjetas. Entradas ligeras `700ms`, hover y reduced motion. Se extrajo con CSS y runtime aislados, fotografías sustituidas por cinco SVG de arquitectura ilustrativa, sin alterar el proyecto original.

**El objetivo del repositorio es reducir decisiones y tiempo de implementación, no aumentar el número de piezas indiscriminadamente.**

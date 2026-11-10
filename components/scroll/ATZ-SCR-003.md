# ATZ-SCR-003 — Apilado fotográfico con profundidad

**Categoría:** scroll  
**Estado:** REFERENCIA; pendiente de validación responsive, accesibilidad, scroll inverso y uso real.  
**Intensidad sugerida:** M3 (sujeta a dirección de arte).  
**Fuente:** https://github.com/codrops/OnScrollLayoutFormations  
**Demo original:** https://tympanus.net/Development/OnScrollLayoutFormations/  
**Licencia del código original:** MIT (revisar aparte imágenes, fuentes y dependencias).

## Comportamiento
Las imágenes se apilan con leves rotaciones y oscurecimiento selectivo.

## Identificación precisa
- Selector HTML: `[data-grid-third]`
- Función GSAP: `animateThirdGrid()`
- Sección real en: `sources/codrops-layout-formations/index.html`
- CSS original: `sources/codrops-layout-formations/css/base.css`
- JS original: `sources/codrops-layout-formations/js/index.js`
- Motor de previews aisladas: `sources/codrops-layout-formations/js/pattern-engine.js`
- Preview individual: [Abrir demo](../../catalog/preview.html?id=ATZ-SCR-003)

## Criterio editorial
**Uso recomendado:** Narrativas visuales de proyectos, casos.

**Evitar:** Oscurecimiento limita lectura superpuesta.

## Integración sin arrastrar otros efectos
1. Abrir el HTML de origen y localizar la sección que contiene `[data-grid-third]`; extraer **esa sección completa** con todas las clases de la cuadrícula e hijos anidados.
2. En el JS original, localizar `animateThirdGrid()`; extraer sus dependencias auxiliares. No ejecutar el `init()` global de la demo: invoca todos los movimientos.
3. Migrar únicamente estilos CSS utilizados por esa sección bajo un namespace del cliente. Asegurar una sola instancia de GSAP/ScrollTrigger, no duplicar Lenis.
4. Reemplazar imágenes externas por activos **con derechos verificados** y adaptar contenido al negocio real.
5. El código original fija elementos durante scroll (`pin` de ScrollTrigger). En móvil o reduced-motion se requiere estudiar salida a flujo normal y contenido visible sin JS.
6. Verificar la sección real a 375, 768, 1024 y 1440 px, scroll rápido/inverso, teclado, CTA y rendimiento.

**No es una aprobación de uso comercial:** material de referencia visual exclusivamente hasta completar las pruebas y los derechos de los medios.

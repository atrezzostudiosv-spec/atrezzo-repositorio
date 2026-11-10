# ATZ-SCR-007 — Mosaico central con zoom

**Categoría:** scroll  
**Estado:** EN VALIDACIÓN — batería interna de GitHub Actions aprobada; falta integración real en cliente y certificación de producción.  
**Intensidad sugerida:** M3 (sujeta a dirección de arte).  
**Fuente:** https://github.com/codrops/OnScrollLayoutFormations  
**Demo original:** https://tympanus.net/Development/OnScrollLayoutFormations/  
**Licencia del código original:** MIT (revisar aparte imágenes, fuentes y dependencias).

## Comportamiento
Nueve fotografías amplían desde los bordes mientras el conjunto corrige escala e inclinación.

## Identificación precisa
- Selector HTML: `[data-grid-sixth]`
- Función GSAP: `animateSixthGrid()`
- Sección real en: `sources/codrops-layout-formations/index.html`
- CSS original: `sources/codrops-layout-formations/css/base.css`
- JS original: `sources/codrops-layout-formations/js/index.js`
- Motor vigente: módulo individual y controlador `components/runtime/lifecycle.js` (no importar pattern-engine histórico)
- Preview individual: [Abrir demo](../../catalog/preview.html?id=ATZ-SCR-007)

## Criterio editorial
**Uso recomendado:** Imagen conceptual o proyectos destacados.

**Evitar:** Recorte y desbordamiento deben controlarse.

## Integración sin arrastrar otros efectos
1. Abrir el HTML de origen y localizar la sección que contiene `[data-grid-sixth]`; extraer **esa sección completa** con todas las clases de la cuadrícula e hijos anidados.
2. En el JS original, localizar `animateSixthGrid()`; extraer sus dependencias auxiliares. No ejecutar el `init()` global de la demo: invoca todos los movimientos.
3. Migrar únicamente estilos CSS utilizados por esa sección bajo un namespace del cliente. Asegurar una sola instancia de GSAP/ScrollTrigger, no duplicar Lenis.
4. Reemplazar imágenes externas por activos **con derechos verificados** y adaptar contenido al negocio real.
5. El código original fija elementos durante scroll (`pin` de ScrollTrigger). En móvil o reduced-motion se requiere estudiar salida a flujo normal y contenido visible sin JS.
6. Verificar la sección real a 375, 768, 1024 y 1440 px, scroll rápido/inverso, teclado, CTA y rendimiento.

**No es una aprobación de uso comercial:** material de referencia visual exclusivamente hasta completar las pruebas y los derechos de los medios.

## Fase 3 — Paquete individual extraído

- HTML para copiar al website: [`ATZ-SCR-007.html`](./ATZ-SCR-007.html).
- JS de esta variante **únicamente**: [`ATZ-SCR-007.js`](./ATZ-SCR-007.js). Exporta `mount(host,{gsap,ScrollTrigger})`.
- Dependencias compartidas: `components/runtime/lifecycle.js` y `components/runtime/atrezzo-motion.css`.
- **No utilizar** `sources/codrops-layout-formations/js/index.js` ni copiar el conjunto de la demo para integrar este ID.
- Imágenes de gradiente son marcadores provisionales; sustituirlas por fotografías autorizadas del cliente.
- No declarar listo para producción hasta pasar la batería visual de navegador y una integración real.

Ejemplo:
```js
import { mount } from "/components/scroll/ATZ-SCR-007.js";
const scene = mount(document.querySelector("#mi-contenedor"), {
  gsap: window.gsap,
  ScrollTrigger: window.ScrollTrigger
});
// Al abandonar la página en una SPA: scene.destroy();
```

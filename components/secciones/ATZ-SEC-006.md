# ATZ-SEC-006 — Depth Chapters

**Familia:** ATREZZO SCROLL SECTIONS 02 (original aprobado).  
**Fuente:** `Atrezzo_Scroll_Sections_02(1).zip`.  
**Tipo:** Animación vinculada al scroll vertical; no a clic.  
**Dependencias externas:** ninguna. JavaScript nativo y CSS por familia.  
**Estado:** `validation`, `client_ready:false`.

## Comportamiento aprobado

Capítulos fotográficos superpuestos que se revelan en profundidad mediante recorte y escala. Los cálculos originales de progresión de scroll se mantienen en `components/secciones/ats2-engine.js`; el módulo de este ID selecciona una única variante.

**Uso recomendado:** Narración de tres capítulos con imágenes aprobadas.  
**Evitar:** Evitar en páginas de lectura o formularios densos.

## Archivos para integrar exactamente este componente

- `components/secciones/ATZ-SEC-006.html` — estructura editorial de la variante.
- `components/secciones/ats2.css` — CSS encapsulado de la familia.
- `components/secciones/ATZ-SEC-006.js` — entrada JavaScript individual.
- `components/secciones/ats2-engine.js` — motor original de la familia.

```js
import { mount } from "/components/secciones/ATZ-SEC-006.js";
const instance = mount(document.querySelector("#atrezzo-component"));
// Para navegación SPA: instance.destroy();
```

El contenedor debe incluir el fragmento HTML del ID. No instalar GSAP, Lenis ni ScrollSmoother para estas variantes. Mantener `data-atz-id` y selectores de familia sin cambios.

## Compatibilidad y medios

El HTML funciona como composición estática sin JavaScript. El motor respeta `prefers-reduced-motion`; en la familia 03 la escena pasa a estática también en pantallas reducidas. Las imágenes SVG del ZIP son referencias abstractas y no representan trabajos de un cliente.

Verificar en el sitio de destino: 375 / 768 / 1024 / 1440 px, scroll adelante y atrás, accesibilidad, teclado, imagen real, rendimiento y conflictos CSS antes de marcar `client_ready:true`.

**Prohibido reinterpretar el movimiento aprobado:** cualquier modificación deberá registrarse y probarse por separado.

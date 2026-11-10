# ATZ-NAV-003 — Context Dock

**Colección:** ATREZZO NAVIGATION 01 (código original Atrezzo Studios, ZIP entregado)
**Estado:** EN VALIDACIÓN (no certificado para producción en web de cliente)
**Categoría:** navegación
**Fuente:** `Atrezzo_Navigation_01_COMPLETO.zip`
**Dependencias externas:** ninguna; HTML, CSS, JavaScript y APIs nativas de navegador
**IDs persistentes:** un patrón = un ID; no importar los otros dos.

## Comportamiento

Navegador flotante que aparece dentro del recorrido por los proyectos, con anterior/siguiente, flechas de teclado, nombre, contador y progreso. Cambios de escena mediante opacidad y zoom fotográfico discreto.

## Uso recomendado

Portfolios acreditados con varias imágenes/proyectos. Proyectos sin imágenes autorizadas o interfaces con controles flotantes que se solapen.

## Hooks del patrón

`data-azn1-projects, data-azn1-project, data-azn1-title, data-azn1-dock, data-azn1-dock-title, data-azn1-dock-counter, data-azn1-dock-progress, data-azn1-dock-prev, data-azn1-dock-next`

## Archivos exactos

- `components/navegacion/ATZ-NAV-003.html`
- `components/navegacion/ATZ-NAV-003.css`
- `components/navegacion/ATZ-NAV-003.js`
- `components/navegacion/runtime.js` — pequeño controlador de listeners y limpieza compartido

### Ejemplo de integración

```js
import { mount } from "/components/navegacion/ATZ-NAV-003.js";
const controller = mount(document.querySelector("#contenedor-del-componente"));
// En cambio de ruta SPA / desmontaje:
controller.destroy();
```

Incluir el HTML en la sección pertinente y el CSS de **este mismo ID**. Revisar el HTML original antes de cambiar IDs, atributos `data-azn1-*` y semántica.

## Seguridad de interacción y continuidad

Las escenas inactivas usan aria-hidden=true y no deben incluir controles interactivos que permanezcan enfocados. El dock se oculta fuera de sección y sin JS el primer proyecto sigue visible. Revisar choque con cookies, chat o CTA sticky.

`prefers-reduced-motion:reduce` desactiva las transiciones CSS innecesarias; las acciones siguen disponibles. No hay scroll-jacking.

**Imágenes:** el ZIP incluye fotografías de prueba cuya licencia comercial no está acreditada. Esta adaptación usa gradientes provisionales sin atribuir obras, servicios o proyectos a un cliente. Sustituir por fotos legítimas optimizadas (WebP/AVIF y alt pertinentes) antes de uso comercial.

## Condición para producción

Probar el componente integrado en el repositorio del cliente: 375, 768, 1024 y 1440 px; Chrome/Firefox/Safari cuando sea posible; foco, Escape/flechas/anclas según el ID, scroll inverso, sin JS, reduced motion, coexistencia con menú y otros elementos sticky, navegación multipágina real y rendimiento. Hasta entonces mantener `client_ready:false`.

**Fuente revisada:** `FICHA_TECNICA_MOVIMIENTOS.md`, `GUIA_INSTALACION_E_INTEGRACION.md`, `AUTORIA_Y_RECURSOS.md` y `VALIDACION.md` del ZIP original.

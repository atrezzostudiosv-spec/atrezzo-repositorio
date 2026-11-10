# ATZ-NAV-002 — Chapter Rail

**Colección:** ATREZZO NAVIGATION 01 (código original Atrezzo Studios, ZIP entregado)
**Estado:** EN VALIDACIÓN (no certificado para producción en web de cliente)
**Categoría:** navegación
**Fuente:** `Atrezzo_Navigation_01_COMPLETO.zip`
**Dependencias externas:** ninguna; HTML, CSS, JavaScript y APIs nativas de navegador
**IDs persistentes:** un patrón = un ID; no importar los otros dos.

## Comportamiento

Índice de capítulos sticky. El estado aria-current=location sigue el capítulo próximo al 39% del viewport. Progreso visual calculado con requestAnimationFrame y scroll nativo. En móvil se transforma en banda horizontal sticky.

## Uso recomendado

Páginas largas de historia, servicios secuenciales o metodología. Páginas muy cortas o con rutas que no corresponden a capítulos.

## Hooks del patrón

`data-azn1-rail-region, data-azn1-rail, enlaces href=#id, data-azn1-rail-fill`

## Archivos exactos

- `components/navegacion/ATZ-NAV-002.html`
- `components/navegacion/ATZ-NAV-002.css`
- `components/navegacion/ATZ-NAV-002.js`
- `components/navegacion/runtime.js` — pequeño controlador de listeners y limpieza compartido

### Ejemplo de integración

```js
import { mount } from "/components/navegacion/ATZ-NAV-002.js";
const controller = mount(document.querySelector("#contenedor-del-componente"));
// En cambio de ruta SPA / desmontaje:
controller.destroy();
```

Incluir el HTML en la sección pertinente y el CSS de **este mismo ID**. Revisar el HTML original antes de cambiar IDs, atributos `data-azn1-*` y semántica.

## Seguridad de interacción y continuidad

Cada destino necesita id único y scroll-margin-top apropiado. Las anclas funcionan sin JS. Evitar secciones que no sean capítulos; el primer enlace puede permanecer activo en lectura inicial.

`prefers-reduced-motion:reduce` desactiva las transiciones CSS innecesarias; las acciones siguen disponibles. No hay scroll-jacking.

**Imágenes:** el ZIP incluye fotografías de prueba cuya licencia comercial no está acreditada. Esta adaptación usa gradientes provisionales sin atribuir obras, servicios o proyectos a un cliente. Sustituir por fotos legítimas optimizadas (WebP/AVIF y alt pertinentes) antes de uso comercial.

## Condición para producción

Probar el componente integrado en el repositorio del cliente: 375, 768, 1024 y 1440 px; Chrome/Firefox/Safari cuando sea posible; foco, Escape/flechas/anclas según el ID, scroll inverso, sin JS, reduced motion, coexistencia con menú y otros elementos sticky, navegación multipágina real y rendimiento. Hasta entonces mantener `client_ready:false`.

**Fuente revisada:** `FICHA_TECNICA_MOVIMIENTOS.md`, `GUIA_INSTALACION_E_INTEGRACION.md`, `AUTORIA_Y_RECURSOS.md` y `VALIDACION.md` del ZIP original.

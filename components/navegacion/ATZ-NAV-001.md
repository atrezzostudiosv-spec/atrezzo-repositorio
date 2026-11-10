# ATZ-NAV-001 — Immersive Menu

**Colección:** ATREZZO NAVIGATION 01 (código original Atrezzo Studios, ZIP entregado)
**Estado:** EN VALIDACIÓN (no certificado para producción en web de cliente)
**Categoría:** navegación
**Fuente:** `Atrezzo_Navigation_01_COMPLETO.zip`
**Dependencias externas:** ninguna; HTML, CSS, JavaScript y APIs nativas de navegador
**IDs persistentes:** un patrón = un ID; no importar los otros dos.

## Comportamiento

Menú editorial a pantalla completa. Apertura mediante cortina CSS (aprox. 0,78 s); cambia el panel fotográfico de referencia al pasar el puntero o enfocar enlaces; botón de cierre y Escape; al abrir bloquea únicamente el scroll explícito y conserva trampa de foco.

## Uso recomendado

Sitios con narrativa editorial y varias rutas relevantes. Sitios con navegación urgente; nunca reemplazar navegación existente sin auditoría.

## Hooks del patrón

`data-azn1-menu-trigger, data-azn1-menu, data-azn1-menu-close, data-azn1-menu-link, data-azn1-menu-photo`

## Archivos exactos

- `components/navegacion/ATZ-NAV-001.html`
- `components/navegacion/ATZ-NAV-001.css`
- `components/navegacion/ATZ-NAV-001.js`
- `components/navegacion/runtime.js` — pequeño controlador de listeners y limpieza compartido

### Ejemplo de integración

```js
import { mount } from "/components/navegacion/ATZ-NAV-001.js";
const controller = mount(document.querySelector("#contenedor-del-componente"));
// En cambio de ruta SPA / desmontaje:
controller.destroy();
```

Incluir el HTML en la sección pertinente y el CSS de **este mismo ID**. Revisar el HTML original antes de cambiar IDs, atributos `data-azn1-*` y semántica.

## Seguridad de interacción y continuidad

El diálogo se traslada a body al montar si estuviera dentro de main, para que main pueda quedar inerte sin ocultar el diálogo. La navegación alternativa es visible si JS no carga. Usar anclas y rutas reales, no dejar menú duplicado del cliente.

`prefers-reduced-motion:reduce` desactiva las transiciones CSS innecesarias; las acciones siguen disponibles. No hay scroll-jacking.

**Imágenes:** el ZIP incluye fotografías de prueba cuya licencia comercial no está acreditada. Esta adaptación usa gradientes provisionales sin atribuir obras, servicios o proyectos a un cliente. Sustituir por fotos legítimas optimizadas (WebP/AVIF y alt pertinentes) antes de uso comercial.

## Condición para producción

Probar el componente integrado en el repositorio del cliente: 375, 768, 1024 y 1440 px; Chrome/Firefox/Safari cuando sea posible; foco, Escape/flechas/anclas según el ID, scroll inverso, sin JS, reduced motion, coexistencia con menú y otros elementos sticky, navegación multipágina real y rendimiento. Hasta entonces mantener `client_ready:false`.

**Fuente revisada:** `FICHA_TECNICA_MOVIMIENTOS.md`, `GUIA_INSTALACION_E_INTEGRACION.md`, `AUTORIA_Y_RECURSOS.md` y `VALIDACION.md` del ZIP original.

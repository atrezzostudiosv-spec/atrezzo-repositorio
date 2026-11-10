# ATREZZO MOTION — Integración por ID (fase 3)

Esta carpeta contiene la extracción individual de los 11 movimientos del primer paquete. La demo original queda preservada en `sources/codrops-layout-formations/`.

## Contrato de integración

1. Identificar la variante en `registry/components.json`. Verificar `id`, `variant`, `component_html`, `component_css`, `component_js` y `client_ready`.
2. Incluir **un solo** fragmento HTML, p. ej. `components/scroll/ATZ-SCR-004.html`, en el template/página del cliente. Su `data-grid-*` y estructura interna no deben alterarse sin revisar el motor.
3. Incorporar `components/runtime/atrezzo-motion.css` a la página. Estilos con prefijo `.atz-motion` para no afectar el diseño del cliente. Sustituir colores por tokens del cliente.
4. Cargar **GSAP** y **ScrollTrigger** conforme a su licencia y a la política de dependencias del proyecto. La biblioteca no los redistribuye. No instalar Lenis ni reemplazar el scroll nativo.
5. Importar **solo el módulo JS del ID** y pasarle el contenedor del fragmento. Ese JS importa únicamente el controlador compartido `components/runtime/lifecycle.js`. Ejemplo:

```js
import { mount } from "/components/scroll/ATZ-SCR-004.js";

// El HTML del ID ya está en <main id="atrezzo-scene">.
const instance = mount(document.querySelector("#atrezzo-scene"), {
  gsap: window.gsap,
  ScrollTrigger: window.ScrollTrigger
});

// Navegación SPA: desmontar antes de cambiar de página.
instance.destroy();
```

6. **Sin JavaScript:** el HTML y los fondos permanecen visibles, dado que el CSS no oculta las imágenes por defecto.
7. **Movimiento reducido:** `prefers-reduced-motion: reduce` y `max-width:700px` mantienen composición estática y sin pin; el usuario puede seguir desplazándose.
8. **Fuentes y fotografías:** los gradientes son placeholders del catálogo. Usar imágenes reales autorizadas, optimizadas y accesibles, y contenido comercial confirmado. No importar fotografías de la demo Codrops.
9. **Bloqueo de publicación:** `client_ready:false` en el registro hasta completar pruebas de navegador (375, 768, 1024 y 1440 px; teclado, reversión de scroll, GSAP disponible/no disponible, scroll rápido, performance) y una integración real en un sitio de cliente.

## Ajustes respecto a la fuente

- Eliminado selector global `document.querySelector`: ahora `root.querySelector` por instancia.
- Cada módulo individual devuelve su timeline GSAP y `gsap.context` la revierte al desmontar.
- Corrección de `ATZ-SCR-005`: el cálculo Z de la fuente usaba un argumento de índice como distancia/rotación. La adaptación fija la firma completa `calculateInitialTransform(el, 600, 300, -3000)`.
- El comportamiento original de la transición permanece asociado a su ID; los cambios de CSS son solo encapsulación y configuración responsive.
- Todos los componentes siguen en `validation`; no hay declaración de certificación automática.

**Atribución:** Codrops — On Scroll Layout Formations, licencia MIT para el código; ver `sources/codrops-layout-formations/LICENSE`. La licencia del código no certifica fotografías ni tipografías.

**Importante:** la adaptación monolítica temporal ha sido retirada. Solo se emplean los 11 módulos independientes más `lifecycle.js`. El código histórico de Codrops permanece preservado bajo `sources/`.

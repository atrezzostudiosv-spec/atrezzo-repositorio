# ATZ-CTR-001 — Stripe Wipe

**Estado:** candidato en revisión visual, fuera del catálogo.

**Activación:** Scroll nativo reversible.

**Propósito:** Franjas horizontales revelan una escena luminosa sobre otra oscura.

**Referencia:** Escritorio 03:03 y 03:54; franjas visibles, trayectoria y duración propuestas.

**Diferenciación:** ATZ-SCR-008 usa cortinas verticales en mosaico; ATZ-PGT-001/002 cubren páginas; este patrón revela una sola escena por franjas horizontales vinculadas al scroll.

## Integrar exactamente
Copiar `ATZ-CTR-001.html`, `ATZ-CTR-001.js`, `runtime.js` y `atrezzo-creative-transitions.css` desde esta carpeta. Insertar el fragmento, cargar el CSS y ejecutar `import {mount} from './ATZ-CTR-001.js'; const instance = mount(contenedor);`. Desmontar con `instance.destroy()`; `refresh()` reinicia el componente. No copiar otros IDs ni el laboratorio. Adaptar texto, tokens y medios propios; no cambiar mecánica aprobada. Sin dependencias externas. Los SVG son originales de ejemplo, no proyectos reales.

**Límites:** Scroll nativo, sin bloqueo de rueda ni librerías; con reduced motion el contenido se muestra estático.

**Validar en destino:** 375/768/1024/1440, teclado, touch, reduced motion, sin JS, interacción con header y contenido real. No declarar client_ready sin comprobar proyecto.

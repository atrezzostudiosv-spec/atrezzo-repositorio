# ATZ-CTR-004 — Shared Element Transition

**Estado:** candidato en revisión visual, fuera del catálogo.

**Activación:** Clic, teclado y retorno.

**Propósito:** La misma pieza gráfica se mueve de tarjeta a detalle mediante FLIP.

**Referencia:** Work/proyecto 06:18–06:54, continuidad conceptual; captura no confirma trayectoria exacta.

**Diferenciación:** ATZ-PGT-001/002/003 son cambios de documento con overlay; este patrón mueve el elemento real dentro del mismo documento y no sustituye un router.

## Integrar exactamente
Copiar `ATZ-CTR-004.html`, `ATZ-CTR-004.js`, `runtime.js` y `atrezzo-creative-transitions.css` desde esta carpeta. Insertar el fragmento, cargar el CSS y ejecutar `import {mount} from './ATZ-CTR-004.js'; const instance = mount(contenedor);`. Desmontar con `instance.destroy()`; `refresh()` reinicia el componente. No copiar otros IDs ni el laboratorio. Adaptar texto, tokens y medios propios; no cambiar mecánica aprobada. Sin dependencias externas. Los SVG son originales de ejemplo, no proyectos reales.

**Límites:** FLIP dentro del mismo documento. No intercepta navegación de documentos, no altera historial y conserva enlaces/anclas de fallback. Para multipágina deberá evaluarse una integración específica; no se promete transición entre URLs.

**Validar en destino:** 375/768/1024/1440, teclado, touch, reduced motion, sin JS, interacción con header y contenido real. No declarar client_ready sin comprobar proyecto.

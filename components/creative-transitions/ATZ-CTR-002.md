# ATZ-CTR-002 — Chromatic Transition

**Estado:** aprobado por ATREZZO y disponible para integrar por ID. QA del catálogo aprobada: [260 comprobaciones Chromium](https://github.com/atrezzostudiosv-spec/atrezzo-repositorio/actions/runs/43615886105).

**Activación:** Scroll nativo reversible.

**Propósito:** Atmósfera cromática continua con cambio automático de contraste.

**Referencia:** Escritorio 03:00–03:09, 03:27–03:36; contraste oscuro/claro observado, interpolación propuesta.

**Diferenciación:** ATZ-SEC-004 cambia protagonistas mediante recorte y texto; este patrón cambia exclusivamente el tema local de secciones en flujo natural.

## Integrar exactamente
Copiar `ATZ-CTR-002.html`, `ATZ-CTR-002.js`, `runtime.js` y `atrezzo-creative-transitions.css` desde esta carpeta. Insertar el fragmento, cargar el CSS y ejecutar `import {mount} from './ATZ-CTR-002.js'; const instance = mount(contenedor);`. Desmontar con `instance.destroy()`; `refresh()` reinicia el componente. No copiar otros IDs ni el laboratorio. Adaptar texto, tokens y medios propios; no cambiar mecánica aprobada. Sin dependencias externas. Los SVG son originales de ejemplo, no proyectos reales.

**Límites:** Scroll nativo, sin bloqueo de rueda ni librerías; con reduced motion el contenido se muestra estático.

**Validar en destino:** 375/768/1024/1440, teclado, touch, reduced motion, sin JS, interacción con header y contenido real. No declarar client_ready sin comprobar proyecto.
